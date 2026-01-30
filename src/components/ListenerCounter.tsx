import { useListenerCounter } from "@/hooks/useListenerCounter";
import { Users, AlertTriangle } from "lucide-react";

interface ListenerCounterProps {
  isPlaying: boolean;
}

export function ListenerCounter({ isPlaying }: ListenerCounterProps) {
  const { count, isGlitching } = useListenerCounter({ isPlaying });

  const formattedCount = count.toLocaleString();

  return (
    <div className="flex items-center justify-center gap-3 py-3">
      {/* Icon */}
      <div className={`transition-all duration-300 ${isGlitching ? 'text-red-500' : 'text-green-600'}`}>
        {isGlitching ? (
          <AlertTriangle className="w-4 h-4 animate-pulse" />
        ) : (
          <Users className="w-4 h-4" />
        )}
      </div>

      {/* Counter Display */}
      <div className="flex flex-col items-center">
        <span className="text-[10px] font-mono tracking-widest text-muted-foreground uppercase mb-1">
          Listeners
        </span>
        
        <div
          className={`
            font-mono text-2xl font-bold tracking-wider
            transition-all duration-100
            ${isGlitching 
              ? 'led-text-red glitch-text' 
              : 'led-text-green'
            }
          `}
          data-text={formattedCount}
        >
          {formattedCount}
        </div>

        <span className="text-[9px] text-muted-foreground mt-0.5">
          청취 중
        </span>
      </div>

      {/* Decorative indicator */}
      <div className={`
        w-2 h-2 rounded-full transition-all duration-300
        ${isGlitching 
          ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)] animate-pulse' 
          : 'bg-green-500 shadow-[0_0_6px_rgba(34,197,94,0.6)]'
        }
      `} />
    </div>
  );
}
