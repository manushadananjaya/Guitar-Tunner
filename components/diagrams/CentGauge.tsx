/** A still frame of a tuner needle, for explaining what "flat" and "sharp"
 *  look like on the display. Inline SVG, server-rendered, theme-aware.
 */

export interface CentGaugeProps {
  /** Needle position in cents, roughly -50 to +50. */
  cents: number;
  /** Note name shown in the centre. */
  note?: string;
  caption: string;
  className?: string;
}

const WIDTH = 320;
const HEIGHT = 190;
const CX = WIDTH / 2;
const CY = 150;
const RADIUS = 116;
/** Sweep from -60° to +60° maps to -50…+50 cents. */
const MAX_ANGLE = 60;
const MAX_CENTS = 50;

function polar(angleDeg: number, r: number) {
  const a = ((angleDeg - 90) * Math.PI) / 180;
  return { x: CX + r * Math.cos(a), y: CY + r * Math.sin(a) };
}

export default function CentGauge({
  cents,
  note,
  caption,
  className,
}: CentGaugeProps) {
  const clamped = Math.max(-MAX_CENTS, Math.min(MAX_CENTS, cents));
  const angle = (clamped / MAX_CENTS) * MAX_ANGLE;
  const needle = polar(angle, RADIUS - 12);
  const inTune = Math.abs(cents) <= 5;

  const arc = (from: number, to: number) => {
    const a = polar(from, RADIUS);
    const b = polar(to, RADIUS);
    return `M ${a.x.toFixed(1)} ${a.y.toFixed(1)} A ${RADIUS} ${RADIUS} 0 0 1 ${b.x.toFixed(1)} ${b.y.toFixed(1)}`;
  };

  return (
    <figure
      className={`my-8 rounded-xl border border-line bg-surface/40 p-5 ${className ?? ""}`}
    >
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        role="img"
        aria-label={caption}
        className="w-full h-auto max-w-[320px] mx-auto block"
      >
        {/* flat side */}
        <path
          d={arc(-MAX_ANGLE, -8)}
          className="text-line-strong"
          stroke="currentColor"
          strokeWidth={6}
          fill="none"
          strokeLinecap="round"
        />
        {/* in-tune zone */}
        <path
          d={arc(-8, 8)}
          className="text-in-tune"
          stroke="currentColor"
          strokeWidth={6}
          fill="none"
          strokeLinecap="round"
        />
        {/* sharp side */}
        <path
          d={arc(8, MAX_ANGLE)}
          className="text-line-strong"
          stroke="currentColor"
          strokeWidth={6}
          fill="none"
          strokeLinecap="round"
        />

        {[-MAX_ANGLE, -MAX_ANGLE / 2, 0, MAX_ANGLE / 2, MAX_ANGLE].map((t) => {
          const a = polar(t, RADIUS - 14);
          const b = polar(t, RADIUS - 24);
          return (
            <line
              key={t}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              className="text-ink-subtle"
              stroke="currentColor"
              strokeWidth={2}
            />
          );
        })}

        <text x={polar(-MAX_ANGLE, RADIUS + 4).x} y={CY + 6} textAnchor="start" className="text-ink-subtle" fill="currentColor" fontSize={11}>
          ♭ flat
        </text>
        <text x={polar(MAX_ANGLE, RADIUS + 4).x} y={CY + 6} textAnchor="end" className="text-ink-subtle" fill="currentColor" fontSize={11}>
          sharp ♯
        </text>

        {/* needle */}
        <line
          x1={CX}
          y1={CY}
          x2={needle.x}
          y2={needle.y}
          className={inTune ? "text-in-tune" : "text-brass"}
          stroke="currentColor"
          strokeWidth={3}
          strokeLinecap="round"
        />
        <circle cx={CX} cy={CY} r={6} className="text-ink" fill="currentColor" />

        <text
          x={CX}
          y={CY - 46}
          textAnchor="middle"
          className="text-ink"
          fill="currentColor"
          fontSize={26}
          fontWeight={700}
        >
          {note ?? (inTune ? "0" : `${cents > 0 ? "+" : ""}${cents}`)}
        </text>
        <text
          x={CX}
          y={CY - 26}
          textAnchor="middle"
          className="text-ink-subtle"
          fill="currentColor"
          fontSize={12}
        >
          {inTune ? "in tune" : `${cents > 0 ? "+" : ""}${cents} cents`}
        </text>
      </svg>
      <figcaption className="mt-3 text-xs text-ink-subtle text-center">
        {caption}
      </figcaption>
    </figure>
  );
}
