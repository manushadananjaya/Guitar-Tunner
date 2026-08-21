import type { Voicing } from "@/lib/chords";

const FRET_COUNT = 5;
const STRINGS = 6;

// Geometry in SVG user units; the viewBox scales it to whatever CSS width.
const PAD_X = 16;
const PAD_TOP = 26;
const STRING_GAP = 18;
const FRET_GAP = 22;
const WIDTH = PAD_X * 2 + STRING_GAP * (STRINGS - 1);
const HEIGHT = PAD_TOP + FRET_GAP * FRET_COUNT + 14;

export interface ChordDiagramProps {
  voicing: Voicing;
  /** Accessible description, e.g. "C major, open position". */
  title: string;
  className?: string;
}

/**
 * Static SVG chord chart. Deliberately a server component — these diagrams are
 * the substance of a chord page, so they belong in the server-rendered HTML
 * rather than appearing only after hydration.
 *
 * Strings run left to right as string 6 (thickest) to string 1, which is how
 * chord charts are conventionally drawn: the view a player has looking at the
 * fretboard head-on.
 */
export default function ChordDiagram({
  voicing,
  title,
  className,
}: ChordDiagramProps) {
  const { frets, baseFret, barreFret } = voicing;
  const showNut = baseFret === 1;

  const stringX = (i: number) => PAD_X + i * STRING_GAP;
  /** Vertical centre of a fret cell, 1-indexed relative to baseFret. */
  const fretY = (relative: number) =>
    PAD_TOP + (relative - 1) * FRET_GAP + FRET_GAP / 2;

  // Where the barre sits within this diagram's window, if it is visible.
  const barreRelative =
    barreFret !== undefined ? barreFret - baseFret + 1 : null;
  const barreStrings =
    barreRelative !== null && barreRelative >= 1 && barreRelative <= FRET_COUNT
      ? frets
          .map((fret, i) => (fret === barreFret ? i : -1))
          .filter((i) => i >= 0)
      : [];
  const showBarre = barreStrings.length > 1;

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      className={className}
      role="img"
      aria-label={title}
    >
      <title>{title}</title>

      {/* Open / muted markers above the nut */}
      {frets.map((fret, i) => {
        const x = stringX(i);
        if (fret === null) {
          return (
            <g key={`m${i}`} stroke="#71717a" strokeWidth={1.6} strokeLinecap="round">
              <line x1={x - 4} y1={PAD_TOP - 16} x2={x + 4} y2={PAD_TOP - 8} />
              <line x1={x - 4} y1={PAD_TOP - 8} x2={x + 4} y2={PAD_TOP - 16} />
            </g>
          );
        }
        if (fret === 0) {
          return (
            <circle
              key={`o${i}`}
              cx={x}
              cy={PAD_TOP - 12}
              r={4}
              fill="none"
              stroke="#71717a"
              strokeWidth={1.6}
            />
          );
        }
        return null;
      })}

      {/* Nut, or the starting-fret label when the shape sits up the neck */}
      {showNut ? (
        <rect
          x={PAD_X - 1}
          y={PAD_TOP - 3}
          width={STRING_GAP * (STRINGS - 1) + 2}
          height={4}
          rx={1}
          fill="#a1a1aa"
        />
      ) : (
        <text
          x={PAD_X - 7}
          y={fretY(1) + 4}
          textAnchor="end"
          fontSize={11}
          fill="#71717a"
          fontFamily="ui-monospace, monospace"
        >
          {baseFret}
        </text>
      )}

      {/* Frets */}
      {Array.from({ length: FRET_COUNT + 1 }, (_, i) => (
        <line
          key={`f${i}`}
          x1={PAD_X}
          y1={PAD_TOP + i * FRET_GAP}
          x2={PAD_X + STRING_GAP * (STRINGS - 1)}
          y2={PAD_TOP + i * FRET_GAP}
          stroke="#3f3f46"
          strokeWidth={1}
        />
      ))}

      {/* Strings */}
      {Array.from({ length: STRINGS }, (_, i) => (
        <line
          key={`s${i}`}
          x1={stringX(i)}
          y1={PAD_TOP}
          x2={stringX(i)}
          y2={PAD_TOP + FRET_GAP * FRET_COUNT}
          stroke="#3f3f46"
          strokeWidth={1}
        />
      ))}

      {/* Barre */}
      {showBarre && barreRelative !== null && (
        <rect
          x={stringX(Math.min(...barreStrings)) - 6}
          y={fretY(barreRelative) - 6}
          width={
            stringX(Math.max(...barreStrings)) -
            stringX(Math.min(...barreStrings)) +
            12
          }
          height={12}
          rx={6}
          fill="#22d3ee"
        />
      )}

      {/* Finger dots */}
      {frets.map((fret, i) => {
        if (fret === null || fret === 0) return null;
        const relative = fret - baseFret + 1;
        if (relative < 1 || relative > FRET_COUNT) return null;
        // The barre already draws these.
        if (showBarre && fret === barreFret) return null;
        return (
          <circle
            key={`d${i}`}
            cx={stringX(i)}
            cy={fretY(relative)}
            r={6}
            fill="#22d3ee"
          />
        );
      })}
    </svg>
  );
}
