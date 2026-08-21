"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Light/dark switch.
 *
 * Renders a fixed-size placeholder before mount: the resolved theme is not
 * known during SSR, so drawing the wrong icon first causes a visible flip, and
 * omitting the button entirely shifts the nav layout when it appears.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  // Keep the browser chrome in step with an explicit theme choice. The
  // <meta name="theme-color"> tags in the document are media-query based, so
  // they follow the OS preference and would otherwise be wrong whenever the
  // user picks the theme that differs from it.
  useEffect(() => {
    if (!mounted || !resolvedTheme) return;
    const color = resolvedTheme === "dark" ? "#17120e" : "#ede5d7";

    let override = document.querySelector<HTMLMetaElement>(
      'meta[name="theme-color"][data-app-managed]',
    );
    if (!override) {
      // Drop the media-scoped tags out of contention; last matching wins, so
      // an unqualified tag appended at the end takes precedence.
      override = document.createElement("meta");
      override.name = "theme-color";
      override.setAttribute("data-app-managed", "");
      document.head.appendChild(override);
    }
    override.content = color;
  }, [mounted, resolvedTheme]);

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={
        mounted
          ? `Switch to ${isDark ? "light" : "dark"} theme`
          : "Switch colour theme"
      }
      title={mounted ? `Switch to ${isDark ? "light" : "dark"} theme` : undefined}
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-full",
        "border border-line text-ink-muted transition-colors",
        "hover:border-brass/50 hover:text-brass",
        className,
      )}
    >
      {mounted ? (
        isDark ? (
          <Sun className="h-4 w-4" />
        ) : (
          <Moon className="h-4 w-4" />
        )
      ) : (
        <span className="h-4 w-4" />
      )}
    </button>
  );
}
