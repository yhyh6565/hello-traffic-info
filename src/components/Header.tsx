import { ChevronLeft, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function Header() {
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
    <header className="flex items-center justify-between px-4 py-3 border-b border-border bg-card">
      <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
        <ChevronLeft className="h-5 w-5" />
      </Button>
      
      <h1 className="text-base font-bold text-foreground">
        실시간 교통정보
      </h1>
      
      <Button 
        variant="ghost" 
        size="icon" 
        className="text-muted-foreground hover:text-foreground"
        onClick={handleShare}
      >
        <Share2 className="h-5 w-5" />
      </Button>
    </header>
  );
}
