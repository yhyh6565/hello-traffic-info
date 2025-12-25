import { useState, useEffect, useRef } from "react";
import { GLITCH_TIMING, RADIO_CONSTANTS } from "@/constants/radio";

export function useGlitchEffect(isCreepy: boolean, defaultTitle: string) {
  const [isGlitching, setIsGlitching] = useState(false);
  const [displayTitle, setDisplayTitle] = useState(defaultTitle);
  const glitchTimeout = useRef<NodeJS.Timeout | null>(null);
  const glitchResetTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setDisplayTitle(defaultTitle);
  }, [defaultTitle]);

  useEffect(() => {
    return () => {
      if (glitchTimeout.current) clearTimeout(glitchTimeout.current);
      if (glitchResetTimeout.current) clearTimeout(glitchResetTimeout.current);
    };
  }, []);

  const triggerGlitch = () => {
    if (!isCreepy) return;

    const startDelay =
      GLITCH_TIMING.START_DELAY_MIN +
      Math.random() * (GLITCH_TIMING.START_DELAY_MAX - GLITCH_TIMING.START_DELAY_MIN);

    glitchTimeout.current = setTimeout(() => {
      setIsGlitching(true);
      setDisplayTitle(RADIO_CONSTANTS.GLITCH_CODE);

      const duration =
        GLITCH_TIMING.DURATION_MIN +
        Math.random() * (GLITCH_TIMING.DURATION_MAX - GLITCH_TIMING.DURATION_MIN);

      glitchResetTimeout.current = setTimeout(() => {
        setIsGlitching(false);
        setDisplayTitle(defaultTitle);
      }, duration);
    }, startDelay);
  };

  const resetGlitch = () => {
    setIsGlitching(false);
    setDisplayTitle(defaultTitle);
    if (glitchTimeout.current) clearTimeout(glitchTimeout.current);
    if (glitchResetTimeout.current) clearTimeout(glitchResetTimeout.current);
  };

  return {
    isGlitching,
    displayTitle,
    triggerGlitch,
    resetGlitch,
  };
}
