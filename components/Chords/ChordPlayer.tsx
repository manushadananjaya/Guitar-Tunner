"use client";

import React, { useCallback, useRef, useState } from "react";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { strum } from "@/lib/synth";

export interface ChordPlayerProps {
  /** MIDI note numbers, low string to high. */
  notes: number[];
  label: string;
  className?: string;
}

/** Plays a chord as a downward strum. The synthesis lives in lib/synth so the
 *  chord finder and ear trainer sound like the same instrument. */
export function ChordPlayer({ notes, label, className }: ChordPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const play = useCallback(() => {
    const seconds = strum(notes);
    setIsPlaying(true);
    if (timeoutRef.current !== null) window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(
      () => setIsPlaying(false),
      seconds * 1000,
    );
  }, [notes]);

  return (
    <button
      type="button"
      onClick={play}
      aria-label={`Play ${label}`}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors",
        isPlaying
          ? "border-brass/60 bg-brass/20 text-brass-hover"
          : "border-line-strong bg-surface/60 text-ink hover:border-brass/50 hover:text-brass",
        className,
      )}
    >
      <Play className="h-3 w-3" />
      Play
    </button>
  );
}
