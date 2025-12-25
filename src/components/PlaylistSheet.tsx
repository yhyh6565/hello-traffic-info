import { List, Radio, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import type { Script } from "@/types/script";
import scriptsData from "@/data/scripts.json";

interface PlaylistSheetProps {
  currentScript: Script | null;
  onSelectScript: (script: Script) => void;
}

export function PlaylistSheet({ currentScript, onSelectScript }: PlaylistSheetProps) {
  const scripts = scriptsData as Script[];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-foreground"
        >
          <List className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[70vh]">
        <SheetHeader>
          <SheetTitle>재생목록</SheetTitle>
          <SheetDescription>
            총 {scripts.length}개의 사연과 교통정보
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="h-[calc(70vh-120px)] mt-4">
          <div className="space-y-2 pr-4">
            {scripts.map((script) => {
              const isActive = currentScript?.id === script.id;
              return (
                <button
                  key={script.id}
                  onClick={() => onSelectScript(script)}
                  className={cn(
                    "w-full text-left p-3 rounded-lg border transition-all hover:bg-accent",
                    isActive
                      ? "bg-primary/10 border-primary"
                      : "bg-card border-border"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div className="shrink-0 mt-1">
                      {script.isCreepy ? (
                        <AlertTriangle className="h-4 w-4 text-destructive" />
                      ) : (
                        <Radio className="h-4 w-4 text-primary" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs text-muted-foreground font-mono">
                          {script.id}
                        </span>
                        <span
                          className={cn(
                            "text-xs font-medium px-2 py-0.5 rounded-full",
                            script.type === "story"
                              ? "bg-primary/10 text-primary"
                              : "bg-secondary text-secondary-foreground"
                          )}
                        >
                          {script.type === "story" ? "사연" : "교통"}
                        </span>
                        {script.isCreepy && (
                          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-destructive/10 text-destructive">
                            크리피
                          </span>
                        )}
                      </div>
                      <h4 className="font-medium text-sm mb-1">{script.title}</h4>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {script.text}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
