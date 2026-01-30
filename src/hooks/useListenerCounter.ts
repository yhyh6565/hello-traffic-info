import { useState, useEffect, useCallback, useRef } from "react";

interface UseListenerCounterProps {
  isPlaying: boolean;
}

interface UseListenerCounterReturn {
  count: number;
  isGlitching: boolean;
}

const COUNTER_CONFIG = {
  START_COUNT: 100,
  TARGET_MIN: 1000,
  TARGET_MAX: 1500,
  INCREMENT_MIN: 5,
  INCREMENT_MAX: 20,
  INTERVAL_MIN: 300,
  INTERVAL_MAX: 800,
  GLITCH_NUMBER: 444,
  GLITCH_DURATION_MIN: 3000,
  GLITCH_DURATION_MAX: 5000,
} as const;

function getRandomInRange(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function useListenerCounter({ isPlaying }: UseListenerCounterProps): UseListenerCounterReturn {
  const [count, setCount] = useState<number>(COUNTER_CONFIG.START_COUNT);
  const [isGlitching, setIsGlitching] = useState(false);
  const targetRef = useRef(getRandomInRange(COUNTER_CONFIG.TARGET_MIN, COUNTER_CONFIG.TARGET_MAX));
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const clearCurrentTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const scheduleNextIncrement = useCallback(() => {
    if (!isPlaying) return;

    const interval = getRandomInRange(COUNTER_CONFIG.INTERVAL_MIN, COUNTER_CONFIG.INTERVAL_MAX);
    
    timeoutRef.current = setTimeout(() => {
      setCount(prevCount => {
        const increment = getRandomInRange(COUNTER_CONFIG.INCREMENT_MIN, COUNTER_CONFIG.INCREMENT_MAX);
        const newCount = prevCount + increment;

        // Check if target reached
        if (newCount >= targetRef.current) {
          // Trigger glitch effect
          setIsGlitching(true);
          
          // Schedule reset after glitch duration
          const glitchDuration = getRandomInRange(
            COUNTER_CONFIG.GLITCH_DURATION_MIN,
            COUNTER_CONFIG.GLITCH_DURATION_MAX
          );
          
          setTimeout(() => {
            setIsGlitching(false);
            setCount(COUNTER_CONFIG.START_COUNT);
            targetRef.current = getRandomInRange(COUNTER_CONFIG.TARGET_MIN, COUNTER_CONFIG.TARGET_MAX);
          }, glitchDuration);

          return COUNTER_CONFIG.GLITCH_NUMBER;
        }

        return newCount;
      });

      // Schedule next increment if not glitching
      if (!isGlitching) {
        scheduleNextIncrement();
      }
    }, interval);
  }, [isPlaying, isGlitching]);

  // Handle play/pause state changes
  useEffect(() => {
    if (isPlaying && !isGlitching) {
      scheduleNextIncrement();
    } else {
      clearCurrentTimeout();
    }

    return clearCurrentTimeout;
  }, [isPlaying, isGlitching, scheduleNextIncrement, clearCurrentTimeout]);

  // Restart counting after glitch ends
  useEffect(() => {
    if (isPlaying && !isGlitching && count === COUNTER_CONFIG.START_COUNT) {
      scheduleNextIncrement();
    }
  }, [isPlaying, isGlitching, count, scheduleNextIncrement]);

  return { count, isGlitching };
}
