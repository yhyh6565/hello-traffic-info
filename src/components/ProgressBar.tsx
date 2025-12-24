import { cn } from "@/lib/utils";

interface ProgressBarProps {
  progress: number;
  isPlaying: boolean;
}

export function ProgressBar({ progress, isPlaying }: ProgressBarProps) {
  const formatTime = (percentage: number) => {
    // Rough estimate: full track is about 2 minutes
    const totalSeconds = Math.round((percentage / 100) * 120);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${String(seconds).padStart(2, "0")}`;
  };

  return (
    <div className="space-y-2">
      <div className="relative h-1 bg-muted rounded-full overflow-hidden">
        <div
          className={cn(
            "absolute left-0 top-0 h-full bg-primary rounded-full transition-all duration-100",
            isPlaying && "progress-playing"
          )}
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>{formatTime(progress)}</span>
        <span>2:00</span>
      </div>
    </div>
  );
}
