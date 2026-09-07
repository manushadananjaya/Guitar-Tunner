"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, Shuffle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAudioTone } from "@/hooks/useAudioTone";
import { noteToFrequency } from "@/lib/noteMap";

interface PitchMatchProps {
  target: number | null;
  onSelectTarget: (frequency: number | null, label: string) => void;
  /** Cents from the current target, from useVocalPitch. */
  cents: number;
  detected: boolean;
}

const NOTES: { name: string; octave: number }[] = [
  { name: "C", octave: 3 },
  { name: "E", octave: 3 },
  { name: "G", octave: 3 },
  { name: "C", octave: 4 },
  { name: "E", octave: 4 },
  { name: "G", octave: 4 },
  { name: "C", octave: 5 },
];

const MATCH_CENTS = 20;
const HOLD_MS = 900;

export function PitchMatch({
  target,
  onSelectTarget,
  cents,
  detected,
}: PitchMatchProps) {
  const { playTone } = useAudioTone();
  const [activeLabel, setActiveLabel] = useState<string | null>(null);
  const [matched, setMatched] = useState(false);
  const inRangeSinceRef = useRef<number | null>(null);

  const select = (name: string, octave: number) => {
    const freq = noteToFrequency(name, octave);
    const label = `${name}${octave}`;
    setActiveLabel(label);
    setMatched(false);
    inRangeSinceRef.current = null;
    onSelectTarget(freq, label);
    playTone(freq, { duration: 1400, volume: 0.25 });
  };

  const randomNote = () => {
    const pick = NOTES[Math.floor(Math.random() * NOTES.length)];
    select(pick.name, pick.octave);
  };

  useEffect(() => {
    if (target === null || !detected) {
      inRangeSinceRef.current = null;
      return;
    }
    const now = Date.now();
    if (Math.abs(cents) <= MATCH_CENTS) {
      if (inRangeSinceRef.current === null) inRangeSinceRef.current = now;
      if (now - inRangeSinceRef.current >= HOLD_MS) setMatched(true);
    } else {
      inRangeSinceRef.current = null;
    }
  }, [cents, detected, target]);

  const meter = target !== null && detected
    ? Math.max(0, 1 - Math.min(Math.abs(cents), 50) / 50)
    : 0;

  return (
    <div className="w-full rounded-2xl border border-line bg-surface-sunken/40 p-5 sm:p-6">
      <h3 className="text-sm font-semibold text-ink">Match the note</h3>
      <p className="mt-1 text-2xs text-ink-subtle">
        Play a reference note, then sing it back. The meter fills as you close
        in; hold it in the green for a second to lock the match.
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {NOTES.map((n) => {
          const label = `${n.name}${n.octave}`;
          return (
            <button
              key={label}
              type="button"
              onClick={() => select(n.name, n.octave)}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-sm font-semibold transition-colors",
                activeLabel === label
                  ? "border-brass bg-brass/10 text-brass"
                  : "border-line text-ink hover:border-brass/40 hover:text-brass",
              )}
            >
              {label}
            </button>
          );
        })}
        <button
          type="button"
          onClick={randomNote}
          className="inline-flex items-center gap-1.5 rounded-full border border-line px-3.5 py-1.5 text-sm font-semibold text-ink-muted transition-colors hover:border-brass/40 hover:text-brass"
        >
          <Shuffle className="h-3.5 w-3.5" /> Random
        </button>
      </div>

      {target !== null && (
        <div className="mt-5">
          <div className="flex items-center justify-between text-xs">
            <button
              type="button"
              onClick={() =>
                activeLabel &&
                playTone(target, { duration: 1400, volume: 0.25 })
              }
              className="inline-flex items-center gap-1.5 font-semibold text-brass hover:text-brass-hover"
            >
              <Volume2 className="h-3.5 w-3.5" /> Play {activeLabel} again
            </button>
            <span
              className={cn(
                "font-mono",
                matched ? "text-in-tune" : "text-ink-muted",
              )}
            >
              {detected ? `${cents > 0 ? "+" : ""}${cents.toFixed(0)}¢` : "—"}
            </span>
          </div>

          <div className="mt-2 h-3 w-full overflow-hidden rounded-full border border-line bg-surface/40">
            <div
              className={cn(
                "h-full rounded-full transition-[width] duration-100",
                matched || Math.abs(cents) <= MATCH_CENTS
                  ? "bg-in-tune"
                  : "bg-brass",
              )}
              style={{ width: `${Math.round(meter * 100)}%` }}
            />
          </div>

          <p
            className={cn(
              "mt-2 text-sm font-semibold",
              matched ? "text-in-tune" : "text-ink-muted",
            )}
          >
            {matched
              ? "Matched — nicely held."
              : !detected
                ? "Sing the note…"
                : Math.abs(cents) <= MATCH_CENTS
                  ? "Hold it steady…"
                  : cents < 0
                    ? "A little higher"
                    : "A little lower"}
          </p>
        </div>
      )}
    </div>
  );
}
