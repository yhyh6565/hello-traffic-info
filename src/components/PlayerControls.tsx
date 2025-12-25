import { Play, Pause, SkipBack, SkipForward, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PlayerControlsProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  onNext: () => void;
  showLyrics: boolean;
  onToggleLyrics: () => void;
}

export function PlayerControls({
  isPlaying,
  onTogglePlay,
  onNext,
  showLyrics,
  onToggleLyrics
}: PlayerControlsProps) {
  return (
    <div className="flex items-center justify-between w-full max-w-[280px] mx-auto">
      {/* Lyrics Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "h-10 w-10 text-muted-foreground hover:text-foreground transition-all duration-300",
          showLyrics && "text-primary bg-primary/10"
        )}
        onClick={onToggleLyrics}
        title="가사 보기"
      >
        <Quote className="h-5 w-5" />
      </Button>

      {/* Main Controls Group */}
      <div className="flex items-center gap-6">
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 text-muted-foreground hover:text-foreground"
          onClick={onNext}
        >
          <SkipBack className="h-6 w-6" />
        </Button>

        <Button
          variant="default"
          size="icon"
          className="h-14 w-14 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg transition-transform active:scale-95"
          onClick={onTogglePlay}
        >
          {isPlaying ? (
            <Pause className="h-6 w-6" />
          ) : (
            <Play className="h-6 w-6 ml-1" />
          )}
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 text-muted-foreground hover:text-foreground"
          onClick={onNext}
        >
          <SkipForward className="h-6 w-6" />
        </Button>
      </div>

      {/* Spacer to balance Lyrics button */}
      <div className="w-10" />
    </div>
  );
}
