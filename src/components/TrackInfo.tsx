import { cn } from "@/lib/utils";

interface TrackInfoProps {
  displayTitle: string;
  isGlitching: boolean;
  type?: "story" | "traffic";
}

export function TrackInfo({ displayTitle, isGlitching, type }: TrackInfoProps) {
  const artistText = type === "traffic"
    ? "진행: ■■ 리포터"
    : "진행: ■■ DJ / 리포터: ■■■";

  return (
    <div className={cn(
      "text-center space-y-2",
      isGlitching && "crt-scanline vhs-noise"
    )}>
      <h2
        className={cn(
          "text-2xl font-bold tracking-tight transition-all duration-300",
          isGlitching ? "glitch-text font-mono text-red-500" : "text-foreground font-sans"
        )}
        data-text={displayTitle}
      >
        {displayTitle}
      </h2>
      <p className="text-sm font-medium text-muted-foreground/80 uppercase tracking-wider">
        {artistText}
      </p>
    </div>
  );
}
