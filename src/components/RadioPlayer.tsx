import { Header } from "./Header";
import { AlbumArt } from "./AlbumArt";
import { TrackInfo } from "./TrackInfo";
import { ProgressBar } from "./ProgressBar";
import { PlayerControls } from "./PlayerControls";
import { ScriptText } from "./ScriptText";
import { useRadioPlayer } from "@/hooks/useRadioPlayer";

export function RadioPlayer() {
  const {
    isPlaying,
    currentScript,
    progress,
    displayTitle,
    isGlitching,
    togglePlay,
    next,
  } = useRadioPlayer();

  return (
    <div className="h-full flex flex-col bg-card">
      <Header />
      
      <main className="flex-1 flex flex-col px-6 py-8 overflow-hidden">
        {/* Album Art with LP animation */}
        <AlbumArt isPlaying={isPlaying} />
        
        {/* Track Info with glitch effect */}
        <TrackInfo 
          displayTitle={displayTitle} 
          isGlitching={isGlitching}
          type={currentScript?.type}
        />
        
        {/* Progress Bar */}
        <div className="mt-8">
          <ProgressBar progress={progress} isPlaying={isPlaying} />
        </div>
        
        {/* Player Controls */}
        <div className="mt-6">
          <PlayerControls 
            isPlaying={isPlaying} 
            onTogglePlay={togglePlay}
            onNext={next}
          />
        </div>
        
        {/* Script Text Display */}
        <div className="mt-8 flex-1 bg-secondary/50 rounded-2xl p-4 overflow-hidden">
          <ScriptText script={currentScript} isPlaying={isPlaying} />
        </div>
      </main>
      
      {/* Footer branding */}
      <footer className="py-3 text-center border-t border-border">
        <p className="text-xs text-muted-foreground">
          © 안녕 교통정보센터
        </p>
      </footer>
    </div>
  );
}
