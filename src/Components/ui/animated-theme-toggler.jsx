import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export function AnimatedThemeToggler() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch by waiting until mounted
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className={cn('h-9', 'w-9')} />;
  }

  const isDark = resolvedTheme === "dark" || theme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
      className={cn(
        "relative",
        "inline-flex",
        "h-9",
        "w-9",
        "items-center",
        "justify-center",
        "rounded-full",
        "bg-transparent",
        "text-neutral-600",
        "hover:bg-neutral-500/10",
        "hover:text-neutral-900",
        "dark:text-neutral-400",
        "dark:hover:bg-neutral-400/10",
        "dark:hover:text-neutral-100",
        "transition-all",
        "duration-200",
        "cursor-pointer"
      )}
    >
      {isDark ? (
        <Sun
          className={cn(
            "h-5",
            "w-5",
            "text-amber-400",
            "transition-transform",
            "duration-300",
            "hover:rotate-45",
            "hover:scale-110"
          )}
        />
      ) : (
        <Moon
          className={cn(
            "h-5",
            "w-5",
            "text-neutral-700",
            "dark:text-neutral-300",
            "transition-transform",
            "duration-300",
            "hover:-rotate-12",
            "hover:scale-110"
          )}
        />
      )}
    </button>
  );
}