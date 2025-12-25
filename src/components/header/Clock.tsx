import { useEffect, useState } from "react";
import { formatTime } from "@/lib/dateUtils";

export function Clock() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="text-xs font-mono text-muted-foreground">
      {formatTime(currentTime)}
    </div>
  );
}
