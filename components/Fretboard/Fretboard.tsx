import React from "react";
import { cn } from "@/lib/utils";

/** Fret markers as on a real neck; 12 and 24 get the double dot. */
const INLAYS = new Set([3, 5, 7, 9, 12, 15, 17, 19, 21]);

export type FretMarkVariant =
  | "root"
  | "note"
  | "ghost"
  | "prompt"
  | "correct"
  | "wrong";

export interface FretMark {
  /** String index, 0 = lowest (string 6 on a guitar). */
  string: number;
  fret: number;
  label?: string;
  variant: FretMarkVariant;
}

export interface FretboardProps {
  /** Open-string names, lowest string first. */
  stringNames: string[];
  /** Highest fret drawn. Fret 0 is the open string, drawn left of the nut. */
  fretCount: number;
  marks: FretMark[];
  /** Makes every fret a button. */
  onSelect?: (string: number, fret: number) => void;
  /** Frets outside this inclusive range are dimmed. */
  focus?: [number, number];
  /** Restrict clicks (and the hover state) to these strings. */
  clickableStrings?: number[];
  ariaLabel: string;
  /** Accessible label for a fret button. */
  describe?: (string: number, fret: number) => string;
}

const VARIANT_CLASS: Record<FretMarkVariant, string> = {
  root: "bg-brass text-brass-contrast shadow-[0_0_10px_var(--accent)]",
  note: "bg-surface-raised text-ink ring-1 ring-line-strong",
  ghost: "bg-surface-sunken/70 text-ink-subtle ring-1 ring-line",
  prompt: "bg-flat text-white ring-2 ring-flat/40 animate-pulse",
  correct: "bg-in-tune text-white",
  wrong: "bg-off text-white",
};

/**
 * A fretboard drawn as a CSS grid: highest string on top and the nut on the
 * left, the way tab is read and the way you see your own neck when you look
 * down at it. Horizontally scrollable on narrow screens rather than squeezed
 * until the frets are untappable.
 */
export function Fretboard({
  stringNames,
  fretCount,
  marks,
  onSelect,
  focus,
  clickableStrings,
  ariaLabel,
  describe,
}: FretboardProps) {
  const strings = stringNames.length;
  const markAt = new Map(marks.map((m) => [`${m.string}:${m.fret}`, m]));
  const inFocus = (fret: number) => !focus || (fret >= focus[0] && fret <= focus[1]);

  return (
    <div className="overflow-x-auto pb-2 -mx-1 px-1">
      <div
        role={onSelect ? "grid" : "img"}
        aria-label={ariaLabel}
        className="min-w-[720px]"
        style={{
          display: "grid",
          gridTemplateColumns: `2rem 2.5rem repeat(${fretCount}, minmax(0, 1fr))`,
          rowGap: "0.2rem",
        }}
      >
        <div />
        <div className="text-center text-2xs text-ink-subtle pb-1">open</div>
        {Array.from({ length: fretCount }, (_, i) => (
          <div
            key={`h${i}`}
            className={cn(
              "text-center text-2xs pb-1 tabular-nums",
              INLAYS.has(i + 1) ? "text-ink-muted font-semibold" : "text-ink-subtle",
            )}
          >
            {i + 1}
          </div>
        ))}

        {Array.from({ length: strings }, (_, row) => {
          const string = strings - 1 - row;
          const clickable = !!onSelect && (!clickableStrings || clickableStrings.includes(string));
          return (
            <React.Fragment key={`r${row}`}>
              <div className="h-9 flex items-center justify-center text-xs font-mono font-semibold text-ink-subtle">
                {stringNames[string]}
              </div>
              {Array.from({ length: fretCount + 1 }, (_, fret) => {
                const mark = markAt.get(`${string}:${fret}`);
                const dim = !inFocus(fret);
                const content = mark ? (
                  <span
                    className={cn(
                      "relative z-10 flex h-7 min-w-7 items-center justify-center rounded-full px-1 text-2xs font-bold transition-all",
                      VARIANT_CLASS[mark.variant],
                      dim && mark.variant !== "prompt" && "opacity-35",
                    )}
                  >
                    {mark.label ?? ""}
                  </span>
                ) : clickable ? (
                  <span className="relative z-10 h-7 w-7 rounded-full transition-colors group-hover:bg-brass/20" />
                ) : null;

                return (
                  <div
                    key={`c${row}-${fret}`}
                    className={cn(
                      "relative h-9 flex items-center justify-center",
                      fret === 0 ? "border-r-4 border-ink-muted/70" : "border-r border-line-strong",
                      dim && "bg-surface-sunken/30",
                    )}
                  >
                    <div
                      aria-hidden="true"
                      className={cn(
                        "absolute left-0 right-0 top-1/2 -translate-y-1/2 bg-ink-subtle/50",
                        fret === 0 && "hidden",
                      )}
                      // Thin strings on top, wound strings at the bottom.
                      style={{ height: `${1 + row * 0.35}px` }}
                    />
                    {INLAYS.has(fret) &&
                      (row === Math.floor(strings / 2) - 1 ||
                        (fret === 12 && row === Math.floor(strings / 2) + 1)) && (
                        <span
                          aria-hidden="true"
                          className="absolute top-full -translate-y-1/2 h-2 w-2 rounded-full bg-ink-subtle/25"
                        />
                      )}
                    {clickable ? (
                      <button
                        type="button"
                        role="gridcell"
                        aria-label={describe?.(string, fret) ?? `String ${strings - string}, fret ${fret}`}
                        onClick={() => onSelect!(string, fret)}
                        className="group relative z-10 flex h-full w-full items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass/60 rounded"
                      >
                        {content}
                      </button>
                    ) : (
                      content
                    )}
                  </div>
                );
              })}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
