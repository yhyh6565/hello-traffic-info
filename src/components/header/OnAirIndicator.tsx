import { cn } from "@/lib/utils";

interface OnAirIndicatorProps {
  isPlaying: boolean;
}

export function OnAirIndicator({ isPlaying }: OnAirIndicatorProps) {
  return (
    <div className="flex items-center gap-2">
      <div
        className={cn(
          "w-2 h-2 rounded-full transition-all",
          isPlaying ? "bg-red-500 animate-pulse-led" : "bg-muted"
        )}
      />
      <span
        className={cn(
          "text-xs font-bold transition-colors",
          isPlaying ? "text-red-500" : "text-muted-foreground"
        )}
      >
        {isPlaying ? "ON AIR" : "OFF AIR"}
      </span>
    </div>
  );
}
