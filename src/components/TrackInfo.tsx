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
    <div className="text-center space-y-1 mt-10">
      <h2
        className={cn(
          "text-lg font-bold transition-title",
          isGlitching ? "glitch-text font-mono" : "text-foreground"
        )}
      >
        {displayTitle}
      </h2>
      <p className="text-sm text-muted-foreground">
        {artistText}
      </p>
    </div>
  );
}
