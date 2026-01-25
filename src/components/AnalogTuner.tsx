import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface AnalogTunerProps {
    isPlaying: boolean;
}

export function AnalogTuner({ isPlaying }: AnalogTunerProps) {
    const [needlePos, setNeedlePos] = useState(50); // Percent

    // Needle drift effect
    useEffect(() => {
        if (!isPlaying) {
            setNeedlePos(50);
            return;
        }

        const interval = setInterval(() => {
            // Small random drift around center (45% - 55%)
            const drift = (Math.random() - 0.5) * 5;
            setNeedlePos(50 + drift);
        }, 200);

        return () => clearInterval(interval);
    }, [isPlaying]);

    return (
        <div className="w-full h-24 bg-[#3d3228] relative rounded-md overflow-hidden border-2 border-[#1a1510] shadow-[inset_0_0_20px_rgba(0,0,0,0.8)]">
            {/* Backlight Glow */}
            <div className={cn(
                "absolute inset-0 bg-[#ffd7a8] transition-opacity duration-1000 mix-blend-overlay pointer-events-none",
                isPlaying ? "opacity-20" : "opacity-5"
            )} />

            {/* Scale Markings */}
            <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 h-8 flex justify-between items-end px-2">
                {/* Generate ticks */}
                {Array.from({ length: 21 }).map((_, i) => (
                    <div
                        key={i}
                        className={cn(
                            "w-[1px] bg-[#e0c090] opacity-80",
                            i % 5 === 0 ? "h-6" : "h-3"
                        )}
                    />
                ))}
            </div>

            {/* Frequency Numbers */}
            <div className="absolute inset-x-4 top-[65%] flex justify-between px-1 text-[10px] text-[#e0c090] font-mono opacity-80 select-none">
                <span>88</span>
                <span>92</span>
                <span>96</span>
                <span>100</span>
                <span>108</span>
            </div>

            {/* Tuner Needle */}
            <div
                className="absolute top-0 bottom-0 w-[2px] bg-radio-indicator shadow-[0_0_4px_rgba(255,100,0,0.8)] z-10 transition-all duration-300 ease-in-out"
                style={{ left: `${needlePos}%` }}
            >
                <div className="absolute top-0 -translate-x-1/2 w-0 h-0 border-l-[4px] border-r-[4px] border-t-[8px] border-l-transparent border-r-transparent border-t-radio-indicator"></div>
            </div>

            {/* Glass Reflection */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none"></div>
        </div>
    );
}
