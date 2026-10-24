"use client";

import { useState } from "react";
import { Share2, Check, Download } from "lucide-react";
import { streakQuery, streakTitle, type StreakCardParams } from "@/lib/streakShare";

const SITE_URL = "https://www.guitartunepro.com";

/** Share the streak as a link whose preview is a generated card, or save the
 *  card itself. The numbers travel in the URL — there is no account to
 *  look them up from. */
export function ShareStreak(params: StreakCardParams) {
  const [status, setStatus] = useState<"copied" | "failed" | null>(null);
  const query = streakQuery(params);
  const url = `${SITE_URL}/share/streak?${query}`;

  const share = async () => {
    const title = streakTitle(params.days);
    try {
      if (navigator.share) {
        await navigator.share({ title, text: `${title} on GuitarTunePro 🔥`, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setStatus("copied");
    } catch (error) {
      // Closing the share sheet is not a failure.
      if ((error as DOMException)?.name !== "AbortError") setStatus("failed");
    }
    window.setTimeout(() => setStatus(null), 2500);
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={share}
        className="inline-flex items-center gap-1.5 rounded-full bg-brass px-4 py-2 text-sm font-bold text-brass-contrast hover:bg-brass-hover transition-colors"
      >
        {status === "copied" ? <Check className="h-3.5 w-3.5" /> : <Share2 className="h-3.5 w-3.5" />}
        {status === "copied" ? "Link copied" : status === "failed" ? "Couldn't copy" : "Share your streak"}
      </button>
      <a
        href={`/share/streak/image?${query}`}
        download={`guitar-streak-${params.days}-days.png`}
        className="inline-flex items-center gap-1.5 rounded-full border border-line-strong bg-surface/60 px-4 py-2 text-sm font-semibold text-ink hover:border-brass/50 hover:text-brass transition-colors"
      >
        <Download className="h-3.5 w-3.5" />
        Save image
      </a>
    </div>
  );
}
