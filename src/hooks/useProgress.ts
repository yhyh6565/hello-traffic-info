import { useState, useRef, useCallback, useEffect } from "react";
import { RADIO_CONSTANTS } from "@/constants/radio";

export function useProgress() {
  const [progress, setProgress] = useState(0);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (progressInterval.current) clearInterval(progressInterval.current);
    };
  }, []);

  const startProgress = useCallback((textLength: number, onComplete: () => void) => {
    setProgress(0);

    if (progressInterval.current) {
      clearInterval(progressInterval.current);
    }

    const estimatedDuration = Math.max(
      RADIO_CONSTANTS.MIN_AUDIO_DURATION,
      textLength * RADIO_CONSTANTS.CHAR_DURATION
    );
    const progressStep = 100 / (estimatedDuration / RADIO_CONSTANTS.PROGRESS_UPDATE_INTERVAL);

    progressInterval.current = setInterval(() => {
      setProgress((prev) => {
        const next = prev + progressStep;
        if (next >= 100) {
          if (progressInterval.current) clearInterval(progressInterval.current);
          onComplete();
          return 100;
        }
        return next;
      });
    }, RADIO_CONSTANTS.PROGRESS_UPDATE_INTERVAL);
  }, []);

  const stopProgress = useCallback(() => {
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
      progressInterval.current = null;
    }
  }, []);

  const resetProgress = useCallback(() => {
    stopProgress();
    setProgress(0);
  }, [stopProgress]);

  return {
    progress,
    startProgress,
    stopProgress,
    resetProgress,
  };
}
