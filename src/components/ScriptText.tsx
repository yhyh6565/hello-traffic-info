import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Radio, AlertTriangle, Music2 } from "lucide-react";
import type { Script } from "@/types/script";

interface ScriptTextProps {
  script: Script | null;
  isPlaying: boolean;
}

export function ScriptText({ script, isPlaying }: ScriptTextProps) {
  if (!script) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-muted-foreground p-8 text-center bg-card/50 backdrop-blur-sm rounded-none">
        <Radio className="h-12 w-12 mb-4 opacity-30" />
        <p className="text-lg font-medium opacity-70">재생 버튼을 눌러<br />라디오를 시작하세요</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Meta Info Header */}
      <div className="flex items-center gap-2 mb-4 shrink-0 px-1">
        {script.isCreepy ? (
          <AlertTriangle className="h-4 w-4 text-destructive animate-pulse" />
        ) : (
          <Radio className="h-4 w-4 text-primary" />
        )}
        <span className={cn(
          "text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wider",
          script.type === "story"
            ? "bg-primary/20 text-primary border border-primary/20"
            : "bg-secondary text-secondary-foreground border border-secondary"
        )}>
          {script.type === "story" ? "ON AIR • 사연" : "ON AIR • 교통정보"}
        </span>
      </div>

      {/* Lyrics Style Text Display */}
      <ScrollArea className="flex-1 -mr-4 pr-4">
        <div className="space-y-8 pb-8">

          <div className={cn(
            "text-base font-medium leading-loose transition-all duration-700",
            isPlaying
              ? "text-foreground/90 opacity-100"
              : "text-muted-foreground opacity-60 blur-[0.5px]"
          )}>
            {script.text.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-8 last:mb-0">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground pt-4 opacity-50">
            <Music2 className="h-3 w-3" />
            <span>안녕 교통정보 오리지널 스크립트</span>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
