/** Schematic of the six open strings and their target pitches.
 *
 *  Server-rendered inline SVG, theme-aware through Tailwind text-* tokens and
 *  currentColor (same approach as ChordDiagram). Not a photo — it shows the
 *  actual information a tuning is: which string sounds which note, and which
 *  ones move away from standard.
 */

const STANDARD = ["E", "A", "D", "G", "B", "E"] as const;

export interface StringPitchDiagramProps {
  /** Target note for each string, thickest (6th) to thinnest (1st). */
  notes: [string, string, string, string, string, string];
  /** Optional octave/frequency label per string, same order. */
  detail?: [string, string, string, string, string, string];
  /** Heading shown above the diagram. */
  caption: string;
  /** Compare against standard EADGBE and tint the strings that differ. */
  markChangesFromStandard?: boolean;
  className?: string;
}

const ROW_H = 34;
const PAD_TOP = 14;
const PAD_BOTTOM = 10;
const LABEL_W = 92;
const LINE_X1 = LABEL_W + 12;
const WIDTH = 460;
const LINE_X2 = WIDTH - 16;

export default function StringPitchDiagram({
  notes,
  detail,
  caption,
  markChangesFromStandard = false,
  className,
}: StringPitchDiagramProps) {
  const height = PAD_TOP + ROW_H * 6 + PAD_BOTTOM;

  return (
    <figure
      className={`my-8 rounded-xl border border-line bg-surface/40 p-5 ${className ?? ""}`}
    >
      <svg
        viewBox={`0 0 ${WIDTH} ${height}`}
        role="img"
        aria-label={caption}
        className="w-full h-auto"
      >
        {notes.map((note, i) => {
          // Row 0 is the 6th (thickest) string.
          const stringNumber = 6 - i;
          const y = PAD_TOP + ROW_H * i + ROW_H / 2;
          const changed =
            markChangesFromStandard && note !== STANDARD[i];
          const strokeW = 3.4 - i * 0.42;

          return (
            <g key={i}>
              <text
                x={12}
                y={y + 4}
                className="text-ink-subtle"
                fill="currentColor"
                fontSize={12}
              >
                String {stringNumber}
              </text>
              <line
                x1={LINE_X1}
                y1={y}
                x2={LINE_X2}
                y2={y}
                className={changed ? "text-brass" : "text-line-strong"}
                stroke="currentColor"
                strokeWidth={strokeW}
                strokeLinecap="round"
              />
              <circle
                cx={LINE_X1}
                cy={y}
                r={4}
                className={changed ? "text-brass" : "text-ink-subtle"}
                fill="currentColor"
              />
              <text
                x={LINE_X2}
                y={y - 8}
                textAnchor="end"
                className={changed ? "text-brass" : "text-ink"}
                fill="currentColor"
                fontSize={15}
                fontWeight={700}
              >
                {note}
                {changed ? "  ←" : ""}
              </text>
              {detail && (
                <text
                  x={LINE_X2}
                  y={y + 15}
                  textAnchor="end"
                  className="text-ink-subtle"
                  fill="currentColor"
                  fontSize={11}
                >
                  {detail[i]}
                </text>
              )}
            </g>
          );
        })}
      </svg>
      <figcaption className="mt-3 text-xs text-ink-subtle text-center">
        {caption}
        {markChangesFromStandard && (
          <> · strings marked in colour differ from standard EADGBE</>
        )}
      </figcaption>
    </figure>
  );
}
