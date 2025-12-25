import { cn } from "@/lib/utils";
import albumArt from "@/assets/album-art.jpg";

interface AlbumArtProps {
  isPlaying: boolean;
}

export function AlbumArt({ isPlaying }: AlbumArtProps) {
  return (
    <div className="relative mx-auto w-64 h-64">
      {/* LP Record background */}
      <div
        className={cn(
          "absolute inset-0 rounded-full bg-foreground/90 shadow-album",
          isPlaying && "animate-spin-lp"
        )}
      >
        {/* LP grooves */}
        <div className="absolute inset-2 rounded-full border border-foreground/30" />
        <div className="absolute inset-6 rounded-full border border-foreground/20" />
        <div className="absolute inset-10 rounded-full border border-foreground/10" />
        <div className="absolute inset-14 rounded-full border border-foreground/20" />
        <div className="absolute inset-[4.5rem] rounded-full border border-foreground/10" />

        {/* Center label */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 rounded-full overflow-hidden shadow-lg border-2 border-primary/20">
            <img
              src={albumArt}
              alt="라디오 앨범 아트"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
