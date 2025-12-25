import { useState, useCallback, useMemo } from "react";
import type { Script } from "@/types/script";
import scriptsData from "@/data/scripts.json";
import { getFormattedDate } from "@/lib/dateUtils";
import { useGlitchEffect } from "./useGlitchEffect";
import { useProgress } from "./useProgress";

export function useRadioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentScript, setCurrentScript] = useState<Script | null>(null);
  const [playedIds, setPlayedIds] = useState<Set<string>>(new Set());
  const [volume, setVolume] = useState(70);

  const defaultTitle = useMemo(() => getFormattedDate(), []);

  const { isGlitching, displayTitle, triggerGlitch, resetGlitch } = useGlitchEffect(
    currentScript?.isCreepy ?? false,
    defaultTitle
  );

  const { progress, startProgress, stopProgress, resetProgress } = useProgress();

  // Select a random script that hasn't been played yet
  const selectRandomScript = useCallback((): Script => {
    const scripts = scriptsData as Script[];
    const unplayedScripts = scripts.filter((s) => !playedIds.has(s.id));

    // If all scripts have been played, reset
    if (unplayedScripts.length === 0) {
      setPlayedIds(new Set());
      return scripts[Math.floor(Math.random() * scripts.length)];
    }

    return unplayedScripts[Math.floor(Math.random() * unplayedScripts.length)];
  }, [playedIds]);

  // Start playing a script
  const startPlayingScript = useCallback(
    (script: Script) => {
      setCurrentScript(script);
      setPlayedIds((prev) => new Set(prev).add(script.id));
      setIsPlaying(true);
      resetGlitch();

      startProgress(script.text.length, () => {
        setIsPlaying(false);
      });

      if (script.isCreepy) {
        triggerGlitch();
      }
    },
    [startProgress, triggerGlitch, resetGlitch]
  );

  // Play random script
  const play = useCallback(() => {
    const script = selectRandomScript();
    startPlayingScript(script);
  }, [selectRandomScript, startPlayingScript]);

  // Pause handler
  const pause = useCallback(() => {
    setIsPlaying(false);
    stopProgress();
    resetGlitch();
  }, [stopProgress, resetGlitch]);

  // Toggle play/pause
  const togglePlay = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, play, pause]);

  // Skip to next
  const next = useCallback(() => {
    pause();
    play();
  }, [pause, play]);

  // Play specific script
  const playScript = useCallback(
    (script: Script) => {
      stopProgress();
      resetGlitch();
      startPlayingScript(script);
    },
    [stopProgress, resetGlitch, startPlayingScript]
  );

  return {
    isPlaying,
    currentScript,
    progress,
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
