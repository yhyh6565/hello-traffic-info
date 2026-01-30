import { useListenerCounter } from "@/hooks/useListenerCounter";
import { useState, useEffect } from "react";

interface ListenerCounterProps {
  isPlaying: boolean;
}

interface FlipDigitProps {
  digit: string;
  isGlitching: boolean;
  prevDigit: string;
}

function FlipDigit({ digit, isGlitching, prevDigit }: FlipDigitProps) {
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    if (digit !== prevDigit) {
      setIsFlipping(true);
      const timer = setTimeout(() => setIsFlipping(false), 300);
      return () => clearTimeout(timer);
    }
  }, [digit, prevDigit]);

  return (
    <div className="flip-card-container">
      <div 
        className={`
          flip-card
          ${isGlitching ? 'flip-card-glitch' : ''}
          ${isFlipping ? 'flip-card-flipping' : ''}
        `}
      >
        {/* Top half */}
        <div className="flip-card-top">
          <span className="flip-card-digit">{digit}</span>
        </div>
        
        {/* Center divider line */}
        <div className={`flip-card-divider ${isGlitching ? 'flip-card-divider-glitch' : ''}`} />
        
        {/* Bottom half */}
        <div className="flip-card-bottom">
          <span className="flip-card-digit">{digit}</span>
        </div>
      </div>
    </div>
  );
}

export function ListenerCounter({ isPlaying }: ListenerCounterProps) {
  const { count, isGlitching } = useListenerCounter({ isPlaying });
  const [prevCount, setPrevCount] = useState(count);

  useEffect(() => {
    const timer = setTimeout(() => setPrevCount(count), 50);
    return () => clearTimeout(timer);
  }, [count]);

  const formattedCount = count.toLocaleString();
  const prevFormattedCount = prevCount.toLocaleString();
  
  // Pad to ensure consistent width
  const digits = formattedCount.split('');
  const prevDigits = prevFormattedCount.padStart(formattedCount.length, ' ').split('');

  return (
    <div className={`flip-counter-wrapper ${isGlitching ? 'flip-counter-glitch' : ''}`}>
      {/* Label */}
      <div className="flip-counter-label">
        <span>LISTENERS</span>
        <span className="flip-counter-label-divider">·</span>
        <span>청취 중</span>
      </div>

      {/* Flip cards container */}
      <div className="flip-cards-row">
        {digits.map((digit, index) => (
          <FlipDigit
            key={index}
            digit={digit}
            prevDigit={prevDigits[index] || ' '}
            isGlitching={isGlitching}
          />
        ))}
      </div>
    </div>
  );
}
