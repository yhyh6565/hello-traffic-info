import { useEffect, useState } from "react";
import { shouldUseDarkTheme } from "@/lib/dateUtils";

type Theme = "light" | "dark";

const THEME_CHECK_INTERVAL = 60000; // 1 minute

function applyTheme(theme: Theme) {
  const root = window.document.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(theme);
}

export function useAutoTheme() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const updateTheme = () => {
      const newTheme: Theme = shouldUseDarkTheme() ? "dark" : "light";

      if (newTheme !== theme) {
        setTheme(newTheme);
        applyTheme(newTheme);
      }
    };

    // Initial theme check
    updateTheme();

    // Check every minute
    const interval = setInterval(updateTheme, THEME_CHECK_INTERVAL);

    return () => clearInterval(interval);
  }, [theme]);

  return { theme };
}
