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

  // Track last played type to alternate
  const [lastPlayedType, setLastPlayedType] = useState<'story' | 'traffic' | null>(null);

  // Select a random script that hasn't been played yet, alternating types
  const selectRandomScript = useCallback((): Script => {
    const scripts = scriptsData as Script[];
    
    // Determine next type
    let nextType: 'story' | 'traffic' = 'story'; // Default start
    if (lastPlayedType === 'story') nextType = 'traffic';
    else if (lastPlayedType === 'traffic') nextType = 'story';
    else {
      // First play: random start
      nextType = Math.random() > 0.5 ? 'story' : 'traffic';
    }

    // Filter by type and unplayed status
    let candidates = scripts.filter(s => s.type === nextType && !playedIds.has(s.id));
    
    // If no unplayed candidates of this type, reset history for this type
    if (candidates.length === 0) {
      // Create a set of IDs to keep (the other type's history)
      const otherTypeIds = scripts
        .filter(s => s.type !== nextType && playedIds.has(s.id))
        .map(s => s.id);
        
      setPlayedIds(new Set(otherTypeIds));
      
      // Re-fetch candidates (all of this type are now valid)
      candidates = scripts.filter(s => s.type === nextType);
    }

    // If still no candidates (shouldn't happen unless data is empty), fallback to any random
    if (candidates.length === 0) {
        return scripts[Math.floor(Math.random() * scripts.length)];
    }

    setLastPlayedType(nextType);
    return candidates[Math.floor(Math.random() * candidates.length)];
  }, [playedIds, lastPlayedType]);

  // Start playing a script
  const startPlayingScript = useCallback(
    (script: Script) => {
      setCurrentScript(script);
      setPlayedIds((prev) => new Set(prev).add(script.id));
      // Ensure we track the type if started manually/arbitrarily
      setLastPlayedType(script.type);
      
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
