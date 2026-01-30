import { useListenerCounter } from "@/hooks/useListenerCounter";

interface ListenerCounterProps {
  isPlaying: boolean;
}

export function ListenerCounter({ isPlaying }: ListenerCounterProps) {
  const { count, isGlitching } = useListenerCounter({ isPlaying });

  const formattedCount = count.toLocaleString();

  return (
    <div className="flex items-center justify-center gap-2 py-3">
      <span className="text-xs text-muted-foreground">청취 중 :</span>
      <span
        className={`
          font-mono text-lg font-bold tracking-wider
          transition-all duration-100
          ${isGlitching 
            ? 'led-text-red glitch-text' 
            : 'led-text-green'
          }
        `}
        data-text={formattedCount}
      >
        {formattedCount}
      </span>
    </div>
  );
}
