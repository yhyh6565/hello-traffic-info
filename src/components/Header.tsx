import { Radio, Sun, Moon } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

interface HeaderProps {
  isPlaying?: boolean;
}

export function Header({ isPlaying = false }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="flex items-center justify-between px-6 py-4 z-50">
      {/* Left: Minimal Station ID */}
      <div className="flex items-center gap-2 text-primary/80">
        <Radio className="w-5 h-5" />
        <span className="text-xs font-bold tracking-widest uppercase hidden sm:block">안녕 교통정보</span>
      </div>

      {/* Center: Live Indicator */}
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-1.5 px-3 py-1 bg-primary/10 rounded-full border border-primary/20 backdrop-blur-sm">
          <div className={`w-1.5 h-1.5 rounded-full ${isPlaying ? 'bg-primary animate-pulse' : 'bg-muted-foreground'}`} />
          <span className="text-[10px] font-bold tracking-widest text-primary uppercase">On Air</span>
        </div>
      </div>

      {/* Right: Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="p-2 -mr-2 text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-muted/50"
      >
        {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>
    </header>
  );
}
