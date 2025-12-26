import { useState, useEffect, useRef } from "react";
import { RADIO_CONSTANTS } from "@/constants/radio";

export function useGlitchEffect(isCreepy: boolean, defaultTitle: string) {
  const [isGlitching, setIsGlitching] = useState(false);
  const [displayTitle, setDisplayTitle] = useState(defaultTitle);

  // Timer for the 5s interval loop
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Reset state when inputs change or on unmount
    setDisplayTitle(defaultTitle);
    setIsGlitching(false);

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (isCreepy) {
      // Start the 5s loop: 5s Normal -> 5s Glitch -> Repeat
      // We start with "Normal" (Title) for 5s, then switch.
      let isGlitchPhase = false;

      intervalRef.current = setInterval(() => {
        isGlitchPhase = !isGlitchPhase;

        setIsGlitching(isGlitchPhase);
        setDisplayTitle(isGlitchPhase ? "Qterw-E-63" : defaultTitle);
      }, 5000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isCreepy, defaultTitle]);

  // Manual triggers are kept for compatibility but rely on the effect for creepy scripts
  const triggerGlitch = () => {
    if (!isCreepy) {
      // Optional: logic for non-creepy random glitches if desired, or empty
    }
  };

  const resetGlitch = () => {
    if (!isCreepy) {
      setIsGlitching(false);
      setDisplayTitle(defaultTitle);
    }
    // For creepy, the interval controls it, so we don't manually reset unless we want to pause the effect (not requested)
  };

  return {
    isGlitching,
    displayTitle,
    triggerGlitch,
    resetGlitch,
  };
}
