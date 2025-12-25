import { SpectrumAnalyzer } from "./SpectrumAnalyzer";

interface VisualizerAreaProps {
    isPlaying: boolean;
}

export function VisualizerArea({ isPlaying }: VisualizerAreaProps) {
    return (
        <div className="flex-1 flex items-center justify-center min-h-[200px] mb-8 relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent rounded-full blur-3xl opacity-50" />
            <div className="w-full h-48 flex items-center justify-center z-10">
                <SpectrumAnalyzer isPlaying={isPlaying} />
            </div>
        </div>
    );
}
