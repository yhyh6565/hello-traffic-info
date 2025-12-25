import { ScriptText } from "./ScriptText";
import type { Script } from "@/types/script";

interface LyricsOverlayProps {
    showLyrics: boolean;
    currentScript: Script | null;
    isPlaying: boolean;
}

export function LyricsOverlay({ showLyrics, currentScript, isPlaying }: LyricsOverlayProps) {
    return (
        <div
            className={`absolute top-0 left-0 right-0 bottom-48 px-6 pt-6 pb-6 flex flex-col bg-background/95 backdrop-blur-md z-20 transition-all duration-500 ease-out rounded-b-3xl border-b border-border/50 ${showLyrics
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-[10%] opacity-0 pointer-events-none'
                }`}
        >
            <div className="w-12 h-1.5 bg-muted rounded-full mx-auto mb-6 opacity-50" />
            <div className="flex-1 overflow-hidden">
                <ScriptText script={currentScript} isPlaying={isPlaying} />
            </div>
        </div>
    );
}
