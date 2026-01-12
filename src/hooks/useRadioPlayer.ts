import { useState, useCallback, useMemo, useEffect, useRef } from "react";
import type { Script } from "@/types/script";
import { loadScriptsFromCSV } from "@/lib/csvParser";
import { getFormattedDate } from "@/lib/dateUtils";
import { useGlitchEffect } from "./useGlitchEffect";

export function useRadioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentScript, setCurrentScript] = useState<Script | null>(null);
  const [playedIds, setPlayedIds] = useState<Set<string>>(new Set());
  const [volume, setVolume] = useState(70);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [scripts, setScripts] = useState<Script[]>([]);

  // Load scripts from CSV on mount
  useEffect(() => {
    loadScriptsFromCSV().then(setScripts).catch(console.error);
  }, []);

  // Audio instance
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio on mount
  useEffect(() => {
    const audio = new Audio();
    audio.volume = Math.max(0, Math.min(1, volume / 100)); // Clamp volume
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = "";
      audioRef.current = null;
    };
  }, []);

  // Sync volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = Math.max(0, Math.min(1, volume / 100));
    }
  }, [volume]);

  const defaultTitle = useMemo(() => getFormattedDate(), []);

  const { isGlitching, displayTitle, triggerGlitch, resetGlitch } = useGlitchEffect(
    currentScript?.isCreepy ?? false,
    defaultTitle
  );

  // Track last played type to alternate
  const [lastPlayedType, setLastPlayedType] = useState<'story' | 'traffic' | null>(null);

  // Select a random script
  const selectRandomScript = useCallback((): Script | null => {
    if (scripts.length === 0) return null;

    let nextType: 'story' | 'traffic' = 'story';
    if (lastPlayedType === 'story') nextType = 'traffic';
    else if (lastPlayedType === 'traffic') nextType = 'story';
    else {
      nextType = Math.random() > 0.5 ? 'story' : 'traffic';
    }

    let candidates = scripts.filter(s => s.type === nextType && !playedIds.has(s.id));

    if (candidates.length === 0) {
      const otherTypeIds = scripts
        .filter(s => s.type !== nextType && playedIds.has(s.id))
        .map(s => s.id);
      setPlayedIds(new Set(otherTypeIds));
      candidates = scripts.filter(s => s.type === nextType);
    }

    if (candidates.length === 0) {
      return scripts[Math.floor(Math.random() * scripts.length)];
    }

    setLastPlayedType(nextType);
    return candidates[Math.floor(Math.random() * candidates.length)];
  }, [scripts, playedIds, lastPlayedType]);

  // Start playing a script
  const startPlayingScript = useCallback(
    (script: Script) => {
      if (!audioRef.current) return;

      setCurrentScript(script);
      setPlayedIds((prev) => new Set(prev).add(script.id));
      setLastPlayedType(script.type);

      resetGlitch();

      // Setup audio
      setIsLoading(true); // Start loading
      audioRef.current.src = script.audioUrl;
      audioRef.current.load();

      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .catch((error) => {
            // Auto-play policies might block playback if not initiated by user interaction
            console.error("Playback failed:", error);
            setIsPlaying(false);
            setIsLoading(false);
          });
      }
    },
    [triggerGlitch, resetGlitch]
  );

  // Handle track ending (autoplay next)
  const handleEnded = useCallback(() => {
    setIsPlaying(false);
    resetGlitch();

    // Auto play next after a short delay
    setTimeout(() => {
      const nextScript = selectRandomScript();
      if (nextScript) startPlayingScript(nextScript);
    }, 1000);
  }, [resetGlitch, selectRandomScript, startPlayingScript]);

  // Event listeners for state sync
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const onEnded = () => handleEnded();

    // State sync handlers
    const onWaiting = () => setIsLoading(true);
    const onCanPlay = () => setIsLoading(false);
    const onPlaying = () => {
      setIsPlaying(true);
      setIsLoading(false);
      if (currentScript?.isCreepy) triggerGlitch();
    };
    const onPause = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", onEnded);

    // New status events
    audio.addEventListener("waiting", onWaiting);
    audio.addEventListener("canplay", onCanPlay);
    audio.addEventListener("playing", onPlaying);
    audio.addEventListener("pause", onPause);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", onEnded);

      audio.removeEventListener("waiting", onWaiting);
      audio.removeEventListener("canplay", onCanPlay);
      audio.removeEventListener("playing", onPlaying);
      audio.removeEventListener("pause", onPause);
    };
  }, [handleEnded, currentScript, triggerGlitch]);

  const play = useCallback(() => {
    if (audioRef.current && currentScript) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      // If no script loaded, pick random
      const script = selectRandomScript();
      if (script) startPlayingScript(script);
    }
  }, [currentScript, selectRandomScript, startPlayingScript]);

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
      resetGlitch();
    }
  }, [resetGlitch]);

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, play, pause]);

  const next = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
    const script = selectRandomScript();
    if (script) startPlayingScript(script);
  }, [selectRandomScript, startPlayingScript]);

  const playScript = useCallback(
    (script: Script) => {
      startPlayingScript(script);
    },
    [startPlayingScript]
  );

  return {
    isPlaying,
    currentScript,
    progress: duration > 0 ? (currentTime / duration) * 100 : 0,
    currentTime,
    duration,
    displayTitle,
    isGlitching,
    defaultTitle,
    volume,
    togglePlay,
    next,
    play,
    pause,
    setVolume,
    playScript,
    isLoading
  };
}
