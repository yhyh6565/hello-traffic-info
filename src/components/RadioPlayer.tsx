import { useState } from "react";
import { Header } from "./Header";
import { TrackInfo } from "./TrackInfo";
import { ProgressBar } from "./ProgressBar";
import { PlayerControls } from "./PlayerControls";
import { ScriptText } from "./ScriptText";
import { VolumeControl } from "./VolumeControl";
import { SpectrumAnalyzer } from "./SpectrumAnalyzer";
import { LyricsOverlay } from "./LyricsOverlay";
import { VisualizerArea } from "./VisualizerArea";

import { useRadioPlayer } from "@/hooks/useRadioPlayer";
import { useAutoTheme } from "@/hooks/useAutoTheme";

export function RadioPlayer() {
  const {
    isPlaying,
    currentScript,
    progress,
    currentTime,
    duration,
    displayTitle,
    isGlitching,
    volume,
    togglePlay,
    next,
    setVolume,
    playScript,
    isLoading
  } = useRadioPlayer();

  // Auto theme based on time of day
  useAutoTheme();

  const [showLyrics, setShowLyrics] = useState(false);
  const toggleLyrics = () => setShowLyrics(prev => !prev);

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-gray-50 to-gray-100 dark:from-zinc-900 dark:to-zinc-950 font-sans text-foreground transition-colors duration-500 dark:border-x dark:border-white/5 relative shadow-2xl">
      <Header isPlaying={isPlaying} />

      <main className="flex-1 flex flex-col px-6 py-6 overflow-hidden relative max-w-md mx-auto w-full">
        {/* Main Content Layer */}
        <div className={`flex-1 flex flex-col transition-all duration-500 ease-out ${showLyrics ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'}`}>

          {/* Visualizer Area */}
          <VisualizerArea isPlaying={isPlaying} />

          {/* Track Info Area - Minimalist */}
          <div className="mb-8 z-10">
            <TrackInfo
              displayTitle={displayTitle}
              isGlitching={isGlitching}
              type={currentScript?.type}
            />
          </div>
        </div>

        {/* Lyrics Layer - Clean Overlay */}
        <LyricsOverlay
          showLyrics={showLyrics}
          currentScript={currentScript}
          isPlaying={isPlaying}
        />

        {/* Controls Dock - Floating Card Style */}
        <div className="mt-auto pt-6 pb-2 z-30">
          {/* Progress */}
          <div className="mb-6 px-1">
            <ProgressBar
              progress={progress}
              currentTime={currentTime}
              duration={duration}
              isPlaying={isPlaying}
            />
          </div>

          {/* Main Controls */}
          <div className="mb-8">
            <PlayerControls
              isPlaying={isPlaying}
              isLoading={isLoading}
              onTogglePlay={togglePlay}
              onNext={next}
              showLyrics={showLyrics}
              onToggleLyrics={toggleLyrics}
            />
          </div>

          {/* Volume */}
          <div className="px-4">
            <VolumeControl volume={volume} onVolumeChange={setVolume} />
          </div>
        </div>
      </main>

      {/* Modern Footer */}
      <footer className="py-4 text-center space-y-1">
        <p className="text-[9px] text-muted-foreground/40 font-light">
          Based on the novel <span className="font-medium">"괴담에 떨어져도 출근을 해야 하는구나"</span> by 백덕수 (카카오페이지)
        </p>
      </footer>
    </div>
  );
}
