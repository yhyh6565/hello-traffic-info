import { useState, useCallback, useMemo, useEffect, useRef } from "react";
import type { Script } from "@/types/script";
import scriptsData from "@/data/scripts.json";
import { getFormattedDate } from "@/lib/dateUtils";
import { useGlitchEffect } from "./useGlitchEffect";

export function useRadioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentScript, setCurrentScript] = useState<Script | null>(null);
  const [playedIds, setPlayedIds] = useState<Set<string>>(new Set());
  const [volume, setVolume] = useState(70);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

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
  const selectRandomScript = useCallback((): Script => {
    const scripts = scriptsData as Script[];

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
  }, [playedIds, lastPlayedType]);

  // Handle track ending (autoplay next)
  const handleEnded = useCallback(() => {
    setIsPlaying(false);
    resetGlitch();

    // Auto play next after a short delay
    setTimeout(() => {
      const nextScript = selectRandomScript();
      startPlayingScript(nextScript);
    }, 1000);
  }, [selectRandomScript, resetGlitch]);

  // Start playing a script
  const startPlayingScript = useCallback(
    (script: Script) => {
      if (!audioRef.current) return;

      setCurrentScript(script);
      setPlayedIds((prev) => new Set(prev).add(script.id));
      setLastPlayedType(script.type);

      resetGlitch();

      // Setup audio
      audioRef.current.src = script.audioUrl;
      audioRef.current.load();

      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            if (script.isCreepy) {
              triggerGlitch();
            }
          })
          .catch((error) => {
            console.error("Playback failed:", error);
            setIsPlaying(false);
          });
      }
    },
    [triggerGlitch, resetGlitch]
  );

  // Event listeners for time and duration
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const onEnded = () => handleEnded();

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", onEnded);
    };
  }, [handleEnded]);

  const play = useCallback(() => {
    if (audioRef.current && currentScript) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      // If no script loaded, pick random
      const script = selectRandomScript();
      startPlayingScript(script);
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
    startPlayingScript(script);
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
  };
}
