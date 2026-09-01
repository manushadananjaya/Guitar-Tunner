/** The 5th-fret (and 4th-fret) relative-tuning method, drawn on a fretboard.
 *
 *  Each fretted note is the same pitch as the next open string up, so you can
 *  tune the whole guitar from one reference string by ear. Server-rendered
 *  inline SVG, theme-aware.
 */

const STRINGS = ["E", "A", "D", "G", "B", "E"]; // 6th → 1st
/** Fret you press on the lower string to match the next open string.
 *  The G→B pair uses the 4th fret; every other pair uses the 5th. */
const MATCH_FRET = [5, 5, 5, 4, 5];

const FRETS = 5;
const PAD_L = 44;
const PAD_T = 24;
const STRING_GAP = 26;
const FRET_GAP = 46;
const WIDTH = PAD_L + FRET_GAP * FRETS + 24;
const HEIGHT = PAD_T + STRING_GAP * 5 + 34;

export interface FretMatchDiagramProps {
  caption: string;
  className?: string;
}

export default function FretMatchDiagram({
  caption,
  className,
}: FretMatchDiagramProps) {
  const stringY = (i: number) => PAD_T + i * STRING_GAP;
  const fretX = (f: number) => PAD_L + f * FRET_GAP;

  return (
    <figure
      className={`my-8 rounded-xl border border-line bg-surface/40 p-5 ${className ?? ""}`}
    >
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        role="img"
        aria-label={caption}
        className="w-full h-auto"
      >
        {/* nut */}
        <line
          x1={PAD_L}
          y1={stringY(0) - 6}
          x2={PAD_L}
          y2={stringY(5) + 6}
          className="text-ink"
          stroke="currentColor"
          strokeWidth={4}
        />
        {/* frets */}
        {Array.from({ length: FRETS }, (_, f) => (
          <line
            key={f}
            x1={fretX(f + 1)}
            y1={stringY(0) - 6}
            x2={fretX(f + 1)}
            y2={stringY(5) + 6}
            className="text-line-strong"
            stroke="currentColor"
            strokeWidth={1.5}
          />
        ))}
        {/* fret numbers */}
        {Array.from({ length: FRETS }, (_, f) => (
          <text
            key={f}
            x={fretX(f + 0.5) + FRET_GAP / 2}
            y={HEIGHT - 12}
            textAnchor="middle"
            className="text-ink-subtle"
            fill="currentColor"
            fontSize={11}
          >
            {f + 1}
          </text>
        ))}

        {STRINGS.map((label, i) => (
          <g key={i}>
            <line
              x1={PAD_L}
              y1={stringY(i)}
              x2={fretX(FRETS) + 12}
              y2={stringY(i)}
              className="text-line-strong"
              stroke="currentColor"
              strokeWidth={3.2 - i * 0.34}
              strokeLinecap="round"
            />
            <text
              x={20}
              y={stringY(i) + 4}
              textAnchor="middle"
              className="text-ink"
              fill="currentColor"
              fontSize={13}
              fontWeight={700}
            >
              {label}
            </text>
          </g>
        ))}

        {/* matched pairs: fretted note on string i, open note on string i-1 */}
        {MATCH_FRET.map((fret, i) => {
          const lower = i + 1; // row index of the lower string (6th = row 0)
          const upper = i; // row index of the string it matches (open)
          const x = fretX(fret) - FRET_GAP / 2;
          return (
            <g key={i}>
              <circle
                cx={x}
                cy={stringY(lower)}
                r={9}
                className="text-brass"
                fill="currentColor"
              />
              <text
                x={x}
                y={stringY(lower) + 4}
                textAnchor="middle"
                className="text-brass-contrast"
                fill="currentColor"
                fontSize={11}
                fontWeight={700}
              >
                {fret}
              </text>
              {/* open-string marker on the string it should match */}
              <circle
                cx={PAD_L - 16}
                cy={stringY(upper)}
                r={6}
                className="text-brass"
                stroke="currentColor"
                strokeWidth={2}
                fill="none"
              />
              {/* connector */}
              <path
                d={`M ${x} ${stringY(lower) - 9} C ${x} ${stringY(lower) - 26}, ${PAD_L - 16} ${stringY(upper) + 22}, ${PAD_L - 16} ${stringY(upper) + 7}`}
                className="text-ink-subtle"
                stroke="currentColor"
                strokeWidth={1.4}
                strokeDasharray="3 3"
                fill="none"
              />
            </g>
          );
        })}
      </svg>
      <figcaption className="mt-3 text-xs text-ink-subtle text-center">
        {caption}
      </figcaption>
    </figure>
  );
}
