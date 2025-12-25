import { Header } from "./Header";
import { AlbumArt } from "./AlbumArt";
import { TrackInfo } from "./TrackInfo";
import { ProgressBar } from "./ProgressBar";
import { PlayerControls } from "./PlayerControls";
import { ScriptText } from "./ScriptText";
import { VolumeControl } from "./VolumeControl";
import { SpectrumAnalyzer } from "./SpectrumAnalyzer";
import { PlaylistSheet } from "./PlaylistSheet";
import { useRadioPlayer } from "@/hooks/useRadioPlayer";
import { useAutoTheme } from "@/hooks/useAutoTheme";

export function RadioPlayer() {
  const {
    isPlaying,
    currentScript,
    progress,
    displayTitle,
    isGlitching,
    volume,
    togglePlay,
    next,
    setVolume,
    playScript,
  } = useRadioPlayer();

  // Auto theme based on time of day
  useAutoTheme();

  return (
    <div className="h-full flex flex-col bg-card">
      <Header
        isPlaying={isPlaying}
        playlistButton={
          <PlaylistSheet
            currentScript={currentScript}
            onSelectScript={playScript}
          />
        }
      />
      
      <main className="flex-1 flex flex-col px-6 py-8 overflow-hidden">
        {/* Album Art with LP animation */}
        <AlbumArt isPlaying={isPlaying} />

        {/* Spectrum Analyzer */}
        <div className="mt-6">
          <SpectrumAnalyzer isPlaying={isPlaying} />
        </div>

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

        {/* Volume Control */}
        <div className="mt-4">
          <VolumeControl volume={volume} onVolumeChange={setVolume} />
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
