import { AnalogTuner } from "./AnalogTuner";

interface VisualizerAreaProps {
    isPlaying: boolean;
}

export function VisualizerArea({ isPlaying }: VisualizerAreaProps) {
    return (
        <div className="flex-0 shrink-0 mb-6 relative px-2">
            <AnalogTuner isPlaying={isPlaying} />
        </div>
    );
}
