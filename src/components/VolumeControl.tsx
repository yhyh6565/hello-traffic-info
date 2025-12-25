import { Volume2, VolumeX } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

interface VolumeControlProps {
  volume: number;
  onVolumeChange: (volume: number) => void;
}

export function VolumeControl({ volume, onVolumeChange }: VolumeControlProps) {
  const isMuted = volume === 0;

  const toggleMute = () => {
    if (isMuted) {
      onVolumeChange(50);
    } else {
      onVolumeChange(0);
    }
  };

  return (
    <div className="flex items-center gap-3 px-2">
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 text-muted-foreground hover:text-foreground shrink-0"
        onClick={toggleMute}
      >
        {isMuted ? (
          <VolumeX className="h-4 w-4" />
        ) : (
          <Volume2 className="h-4 w-4" />
        )}
      </Button>

      <Slider
        value={[volume]}
        onValueChange={(values) => onVolumeChange(values[0])}
        max={100}
        step={1}
        className="flex-1"
      />

      <span className="text-xs text-muted-foreground font-mono w-8 text-right shrink-0">
        {volume}%
      </span>
    </div>
  );
}
