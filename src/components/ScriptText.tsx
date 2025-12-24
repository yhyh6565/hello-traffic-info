import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Radio, AlertTriangle } from "lucide-react";
import type { Script } from "@/types/script";

interface ScriptTextProps {
  script: Script | null;
  isPlaying: boolean;
}

export function ScriptText({ script, isPlaying }: ScriptTextProps) {
  if (!script) {
    return (
      <div className="flex flex-col items-center justify-center h-40 text-muted-foreground">
        <Radio className="h-8 w-8 mb-2 opacity-50" />
        <p className="text-sm">재생 버튼을 눌러 라디오를 시작하세요</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        {script.isCreepy ? (
          <AlertTriangle className="h-4 w-4 text-destructive" />
        ) : (
          <Radio className="h-4 w-4 text-primary" />
        )}
        <span className={cn(
          "text-xs font-medium px-2 py-0.5 rounded-full",
          script.type === "story" 
            ? "bg-primary/10 text-primary" 
            : "bg-secondary text-secondary-foreground"
        )}>
          {script.type === "story" ? "청취자 사연" : "교통 정보"}
        </span>
        <span className="text-sm font-medium text-foreground">
          {script.title}
        </span>
      </div>
      
      <ScrollArea className="h-32">
        <p className={cn(
          "text-sm leading-relaxed text-muted-foreground pr-4",
          isPlaying && "animate-fade-in"
        )}>
          {script.text}
        </p>
      </ScrollArea>
    </div>
  );
}
