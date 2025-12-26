import { cn } from "@/lib/utils";

interface ProgressBarProps {
  progress: number;
  currentTime: number;
  duration: number;
  isPlaying: boolean;
}

export function ProgressBar({ progress, currentTime, duration, isPlaying }: ProgressBarProps) {
  const formatTime = (time: number) => {
    if (Number.isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
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
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
}
