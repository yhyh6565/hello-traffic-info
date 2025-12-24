import { useState, useCallback, useEffect, useRef } from "react";
import type { Script } from "@/types/script";
import scriptsData from "@/data/scripts.json";

const GLITCH_CODE = "식별코드 Qterw-E-63";

export function useRadioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentScript, setCurrentScript] = useState<Script | null>(null);
  const [progress, setProgress] = useState(0);
  const [displayTitle, setDisplayTitle] = useState<string>("");
  const [isGlitching, setIsGlitching] = useState(false);
  const [playedIds, setPlayedIds] = useState<Set<string>>(new Set());
  
  const progressInterval = useRef<NodeJS.Timeout | null>(null);
  const glitchTimeout = useRef<NodeJS.Timeout | null>(null);
  const glitchResetTimeout = useRef<NodeJS.Timeout | null>(null);

  // Get today's date formatted
  const getFormattedDate = useCallback(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const weekDays = ["일", "월", "화", "수", "목", "금", "토"];
    const dayOfWeek = weekDays[today.getDay()];
    return `${year}.${month}.${day} (${dayOfWeek}) 교통정보`;
  }, []);

  const defaultTitle = getFormattedDate();

  // Initialize display title
  useEffect(() => {
    setDisplayTitle(defaultTitle);
  }, [defaultTitle]);

  // Clean up intervals on unmount
  useEffect(() => {
    return () => {
      if (progressInterval.current) clearInterval(progressInterval.current);
      if (glitchTimeout.current) clearTimeout(glitchTimeout.current);
      if (glitchResetTimeout.current) clearTimeout(glitchResetTimeout.current);
    };
  }, []);

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

  // Handle glitch effect for creepy content
  const triggerGlitch = useCallback(() => {
    if (!currentScript?.isCreepy) return;

    // Glitch starts at random time between 3-6 seconds
    const glitchStartDelay = 3000 + Math.random() * 3000;
    
    glitchTimeout.current = setTimeout(() => {
      setIsGlitching(true);
      setDisplayTitle(GLITCH_CODE);
      
      // Glitch lasts 2-4 seconds
      const glitchDuration = 2000 + Math.random() * 2000;
      
      glitchResetTimeout.current = setTimeout(() => {
        setIsGlitching(false);
        setDisplayTitle(defaultTitle);
      }, glitchDuration);
    }, glitchStartDelay);
  }, [currentScript, defaultTitle]);

  // Play handler
  const play = useCallback(() => {
    const script = selectRandomScript();
    setCurrentScript(script);
    setPlayedIds((prev) => new Set(prev).add(script.id));
    setIsPlaying(true);
    setProgress(0);
    setDisplayTitle(defaultTitle);
    setIsGlitching(false);

    // Clear any existing intervals
    if (progressInterval.current) clearInterval(progressInterval.current);
    if (glitchTimeout.current) clearTimeout(glitchTimeout.current);
    if (glitchResetTimeout.current) clearTimeout(glitchResetTimeout.current);

    // Simulate audio duration based on text length (rough estimate)
    const estimatedDuration = Math.max(15000, script.text.length * 80); // ~80ms per character
    const progressStep = 100 / (estimatedDuration / 100);

    progressInterval.current = setInterval(() => {
      setProgress((prev) => {
        const next = prev + progressStep;
        if (next >= 100) {
          if (progressInterval.current) clearInterval(progressInterval.current);
          setIsPlaying(false);
          return 100;
        }
        return next;
      });
    }, 100);

    // Trigger glitch for creepy content
    if (script.isCreepy) {
      triggerGlitch();
    }
  }, [selectRandomScript, defaultTitle, triggerGlitch]);

  // Pause handler
  const pause = useCallback(() => {
    setIsPlaying(false);
    if (progressInterval.current) clearInterval(progressInterval.current);
    if (glitchTimeout.current) clearTimeout(glitchTimeout.current);
    if (glitchResetTimeout.current) clearTimeout(glitchResetTimeout.current);
  }, []);

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

  return {
    isPlaying,
    currentScript,
    progress,
    displayTitle,
    isGlitching,
    defaultTitle,
    togglePlay,
    next,
    play,
    pause,
  };
}
