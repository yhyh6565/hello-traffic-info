import { Play, Pause, SkipBack, SkipForward } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PlayerControlsProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  onNext: () => void;
}

export function PlayerControls({ isPlaying, onTogglePlay, onNext }: PlayerControlsProps) {
  return (
    <div className="flex items-center justify-center gap-8">
      <Button 
        variant="ghost" 
        size="icon" 
        className="h-12 w-12 text-muted-foreground hover:text-foreground"
        onClick={onNext}
      >
        <SkipBack className="h-6 w-6" />
      </Button>
      
      <Button
        variant="default"
        size="icon"
        className="h-16 w-16 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg"
        onClick={onTogglePlay}
      >
        {isPlaying ? (
          <Pause className="h-7 w-7" />
        ) : (
          <Play className="h-7 w-7 ml-1" />
        )}
      </Button>
      
      <Button 
        variant="ghost" 
        size="icon" 
        className="h-12 w-12 text-muted-foreground hover:text-foreground"
        onClick={onNext}
      >
        <SkipForward className="h-6 w-6" />
      </Button>
    </div>
  );
}
