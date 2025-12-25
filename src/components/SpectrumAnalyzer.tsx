import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface SpectrumAnalyzerProps {
  isPlaying: boolean;
  barCount?: number;
}

export function SpectrumAnalyzer({ isPlaying, barCount = 20 }: SpectrumAnalyzerProps) {
  const [heights, setHeights] = useState<number[]>(Array(barCount).fill(4));

  useEffect(() => {
    if (!isPlaying) {
      setHeights(Array(barCount).fill(4));
      return;
    }

    const interval = setInterval(() => {
      setHeights(
        Array(barCount)
          .fill(0)
          .map(() => Math.random() * 32 + 4)
      );
    }, 100);

    return () => clearInterval(interval);
  }, [isPlaying, barCount]);

  return (
    <div className="flex items-end justify-center gap-0.5 h-12 px-4">
      {heights.map((height, index) => (
        <div
          key={index}
          className={cn(
            "w-1 rounded-t-sm transition-all duration-100 ease-out",
            isPlaying
              ? "bg-gradient-to-t from-primary to-primary/50"
              : "bg-muted"
          )}
          style={{
            height: `${height}px`,
            animationDelay: `${index * 50}ms`,
          }}
        />
      ))}
    </div>
  );
}
