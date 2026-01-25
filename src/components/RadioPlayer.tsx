import { useState } from "react";
import { Header } from "./Header";
import { TrackInfo } from "./TrackInfo";
import { ProgressBar } from "./ProgressBar";
import { PlayerControls } from "./PlayerControls";
import { ScriptText } from "./ScriptText";
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
    <div className="h-full w-full flex flex-col relative overflow-hidden bg-radio-wood">
      {/* 
        Retro Structure:
        Top: Speaker Grille (with branding)
        Bottom: Control Panel (Faceplate)
      */}

      {/* Speaker Grille Header */}
      <div className="shrink-0 h-16 md:h-20 bg-speaker-grille border-b-4 border-black/20 w-full relative shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)] flex items-center justify-between px-6 z-20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#333] border-2 border-[#555] flex items-center justify-center shadow-lg">
            <div className="w-4 h-4 rounded-full bg-radio-accent opacity-80" />
          </div>

        </div>

        {/* On Air Light */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold text-white/40 tracking-widest uppercase">Stereo</span>
          <div className={`w-3 h-3 rounded-full transition-all duration-500 ${isPlaying ? 'bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.8)]' : 'bg-red-900/50'}`} />
        </div>
      </div>

      {/* Main Faceplate */}
      <main className="flex-1 bg-radio-face text-radio-wood radio-face-theme relative flex flex-col panel-inset overflow-hidden">
        {/* Texture Overlay (Dust/Scratch) */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/dust.png')] mix-blend-multiply z-0"></div>

        <div className="flex-1 flex flex-col px-6 py-4 overflow-y-auto z-10 scrollbar-none relative">
          <Header isPlaying={isPlaying} />

          {/* Main Content Layer */}
          <div className={`flex-1 flex flex-col transition-all duration-500 ease-out ${showLyrics ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'}`}>

            {/* Visualizer Area (Analog Tuner) - Moved to Top */}
            <VisualizerArea isPlaying={isPlaying} />

            {/* Track Info Area */}
            <div className="mb-4 z-10 mt-2">
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
          <div className="mt-auto pt-4 pb-2 z-30 w-full max-w-2xl mx-auto">
            {/* Progress */}
            <div className="mb-4 px-1">
              <ProgressBar
                progress={progress}
                currentTime={currentTime}
                duration={duration}
                isPlaying={isPlaying}
              />
            </div>

            {/* Main Controls */}
            <div className="mb-2">
              <PlayerControls
                isPlaying={isPlaying}
                isLoading={isLoading}
                onTogglePlay={togglePlay}
                onNext={next}
                showLyrics={showLyrics}
                onToggleLyrics={toggleLyrics}
              />
            </div>
          </div>
        </div>

        {/* Footer info embedded in faceplate */}
        <footer className="py-3 text-center bg-[#e8dcc0] border-t border-[#d8ccb0]">
          <p className="text-[10px] text-[#8a7f70] font-mono tracking-tight">
            MODEL NO. 198X-KR • <span className="font-semibold">"괴담에 떨어져도 출근을 해야 하는구나"</span>
          </p>
        </footer>
      </main>
    </div>
  );
}
