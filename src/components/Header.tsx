import { Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Clock } from "./header/Clock";
import { OnAirIndicator } from "./header/OnAirIndicator";
import { ThemeToggle } from "./header/ThemeToggle";
import { RADIO_CONSTANTS } from "@/constants/radio";

interface HeaderProps {
  isPlaying?: boolean;
  playlistButton?: React.ReactNode;
}

export function Header({ isPlaying = false, playlistButton }: HeaderProps) {
  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "안녕 교통정보",
          text: "실시간 교통정보를 들어보세요",
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("링크가 복사되었습니다");
      }
    } catch {
      // User cancelled share
    }
  };

  return (
    <header className="border-b border-border bg-card">
      {/* Top bar with time and frequency */}
      <div className="flex items-center justify-between px-4 py-2 bg-primary/5">
        <OnAirIndicator isPlaying={isPlaying} />

        <div className="text-xs font-mono font-bold text-primary">
          {RADIO_CONSTANTS.FREQUENCY}
        </div>

        <Clock />
      </div>

      {/* Main header */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex-1">{playlistButton}</div>

        <h1 className="text-base font-bold text-foreground">안녕 교통정보</h1>

        <div className="flex-1 flex justify-end gap-1">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-foreground"
            onClick={handleShare}
            title="공유하기"
          >
            <Share2 className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
