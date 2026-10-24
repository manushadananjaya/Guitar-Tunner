/** Social share images (Open Graph / Twitter cards), drawn with next/og.
 *
 *  Every card shares one frame — wordmark, eyebrow, title, subtitle, footer —
 *  so a link from any page reads as the same site in a chat or feed. Pages
 *  add a visual on the right: a tuner gauge, a chord diagram, a streak.
 *
 *  Inter is vendored in ./fonts rather than fetched, so builds never depend
 *  on the network. It has no ♯ or ♭ glyphs (nor does the font next/og ships
 *  with), so accidentals are drawn as small SVGs by `Words`. */

import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import type { ReactNode } from "react";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

/** The dark theme from app/globals.css. Dark reads better than warm paper
 *  as a thumbnail in both light and dark chat apps. */
export const OG_COLORS = {
  canvas: "#17120e",
  surface: "#201a15",
  raised: "#2a221b",
  ink: "#f4ece0",
  muted: "#b8ab9b",
  subtle: "#968878",
  line: "#382e25",
  lineStrong: "#4d4034",
  brass: "#e0a340",
  brassSoft: "#3a2c17",
  inTune: "#5cc47c",
  off: "#e0705f",
};

const C = OG_COLORS;

let fonts: Promise<{ name: string; data: Buffer; weight: 400 | 700 }[]> | null = null;

function loadFonts() {
  fonts ??= Promise.all(
    ([
      ["Inter-Regular.ttf", 400],
      ["Inter-Bold.ttf", 700],
    ] as const).map(async ([file, weight]) => ({
      name: "Inter",
      data: await readFile(join(process.cwd(), "lib/og/fonts", file)),
      weight,
    })),
  );
  return fonts;
}

/** A sharp or flat sign, sized to sit beside a capital letter. */
function Accidental({ kind, size, color }: { kind: "♯" | "♭"; size: number; color: string }) {
  const h = size * 0.72;
  const w = h * 0.6;
  const style = { width: w, height: h, marginTop: size * 0.1, marginLeft: size * 0.02 };
  return kind === "♯" ? (
    <svg viewBox="0 0 12 20" style={style}>
      <line x1="4" y1="1" x2="4" y2="19" stroke={color} strokeWidth="2.2" />
      <line x1="8" y1="0" x2="8" y2="18" stroke={color} strokeWidth="2.2" />
      <line x1="1" y1="8" x2="11" y2="5.5" stroke={color} strokeWidth="3.2" />
      <line x1="1" y1="14" x2="11" y2="11.5" stroke={color} strokeWidth="3.2" />
    </svg>
  ) : (
    <svg viewBox="0 0 12 20" style={style}>
      <line x1="3" y1="0" x2="3" y2="19" stroke={color} strokeWidth="2.4" />
      <path d="M3 18.5 C 9.5 15, 11.5 11, 8.5 9.5 C 6.5 8.4, 4.5 9.6, 3 11.5" fill="none" stroke={color} strokeWidth="3" />
    </svg>
  );
}

/** Text that wraps word by word, with ♯ and ♭ drawn as SVG. Words break at
 *  plain spaces only, so a non-breaking space keeps "432 Hz" together. */
export function Words({
  text,
  size,
  color = C.ink,
  weight = 700,
  lineHeight = 1.12,
}: {
  text: string;
  size: number;
  color?: string;
  weight?: 400 | 700;
  lineHeight?: number;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        columnGap: size * 0.26,
        fontSize: size,
        fontWeight: weight,
        color,
        lineHeight,
      }}
    >
      {text.split(/[ \t\n]+/).filter(Boolean).map((word, i) => (
        <div key={i} style={{ display: "flex" }}>
          {word.split(/([♯♭])/).filter(Boolean).map((part, j) =>
            part === "♯" || part === "♭" ? (
              <Accidental key={j} kind={part} size={size} color={color} />
            ) : (
              <span key={j}>{part}</span>
            ),
          )}
        </div>
      ))}
    </div>
  );
}

/** Note names as chips, e.g. a tuning's six strings. */
export function NoteChips({ notes, highlight }: { notes: string[]; highlight?: number }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
      {notes.map((note, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minWidth: 72,
            height: 72,
            padding: "0 16px",
            borderRadius: 36,
            background: i === highlight ? C.inTune : C.raised,
            border: `2px solid ${i === highlight ? C.inTune : C.lineStrong}`,
          }}
        >
          <Words text={note} size={32} color={i === highlight ? C.canvas : C.ink} lineHeight={1} />
        </div>
      ))}
    </div>
  );
}

/** A tuner meter reading dead centre — the picture of "in tune". */
export function GaugeVisual({ label }: { label: string }) {
  const cx = 170;
  const cy = 190;
  const r = 150;
  const point = (cents: number, radius: number) => {
    const angle = Math.PI * (1 - (cents + 50) / 100);
    return [cx + radius * Math.cos(angle), cy - radius * Math.sin(angle)];
  };
  const ticks = Array.from({ length: 11 }, (_, i) => -50 + i * 10);
  const [ax, ay] = point(-50, r);
  const [bx, by] = point(50, r);
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 340 }}>
      <svg width="340" height="210" viewBox="0 0 340 210">
        <path d={`M ${ax} ${ay} A ${r} ${r} 0 0 1 ${bx} ${by}`} fill="none" stroke={C.lineStrong} strokeWidth="6" strokeLinecap="round" />
        {(() => {
          const [gx1, gy1] = point(-5, r);
          const [gx2, gy2] = point(5, r);
          return <path d={`M ${gx1} ${gy1} A ${r} ${r} 0 0 1 ${gx2} ${gy2}`} fill="none" stroke={C.inTune} strokeWidth="10" strokeLinecap="round" />;
        })()}
        {ticks.map((cents) => {
          const [x1, y1] = point(cents, r - 14);
          const [x2, y2] = point(cents, r - (cents % 50 === 0 ? 34 : 26));
          return <line key={cents} x1={x1} y1={y1} x2={x2} y2={y2} stroke={C.subtle} strokeWidth="3" strokeLinecap="round" />;
        })}
        <line x1={cx} y1={cy} x2={cx} y2={cy - r + 8} stroke={C.inTune} strokeWidth="7" strokeLinecap="round" />
        <circle cx={cx} cy={cy} r="14" fill={C.inTune} />
      </svg>
      <div style={{ display: "flex", marginTop: 8 }}>
        <Words text={label} size={34} color={C.inTune} />
      </div>
    </div>
  );
}

/** A chord chart in the same geometry as components/Chords/ChordDiagram,
 *  strings left to right from 6 to 1. */
export function ChordVisual({
  frets,
  baseFret,
  barreFret,
}: {
  frets: (number | null)[];
  baseFret: number;
  barreFret?: number;
}) {
  const FRETS = 5;
  const padX = 34;
  const padTop = 56;
  const gapX = 52;
  const gapY = 64;
  const width = padX * 2 + gapX * 5;
  const height = padTop + gapY * FRETS + 20;
  const x = (i: number) => padX + i * gapX;
  const y = (relative: number) => padTop + (relative - 1) * gapY + gapY / 2;
  const barreRelative = barreFret !== undefined ? barreFret - baseFret + 1 : null;
  const barreStrings =
    barreRelative !== null && barreRelative >= 1 && barreRelative <= FRETS
      ? frets.map((fret, i) => (fret === barreFret ? i : -1)).filter((i) => i >= 0)
      : [];
  const showBarre = barreStrings.length > 1;

  return (
    <div style={{ display: "flex", alignItems: "flex-start" }}>
      {baseFret > 1 && (
        <div style={{ display: "flex", marginTop: padTop + 6, marginRight: 4, fontSize: 30, color: C.muted }}>
          {`${baseFret}fr`}
        </div>
      )}
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        {frets.map((fret, i) =>
          fret === null ? (
            <g key={`m${i}`}>
              <line x1={x(i) - 10} y1={padTop - 40} x2={x(i) + 10} y2={padTop - 20} stroke={C.subtle} strokeWidth="4" strokeLinecap="round" />
              <line x1={x(i) - 10} y1={padTop - 20} x2={x(i) + 10} y2={padTop - 40} stroke={C.subtle} strokeWidth="4" strokeLinecap="round" />
            </g>
          ) : fret === 0 ? (
            <circle key={`o${i}`} cx={x(i)} cy={padTop - 30} r="10" fill="none" stroke={C.subtle} strokeWidth="4" />
          ) : null,
        )}
        {baseFret === 1 && <rect x={padX - 3} y={padTop - 8} width={gapX * 5 + 6} height="10" rx="3" fill={C.muted} />}
        {Array.from({ length: FRETS + 1 }, (_, i) => (
          <line key={`f${i}`} x1={padX} y1={padTop + i * gapY} x2={padX + gapX * 5} y2={padTop + i * gapY} stroke={C.lineStrong} strokeWidth="3" />
        ))}
        {Array.from({ length: 6 }, (_, i) => (
          <line key={`s${i}`} x1={x(i)} y1={padTop} x2={x(i)} y2={padTop + gapY * FRETS} stroke={C.lineStrong} strokeWidth="3" />
        ))}
        {showBarre && barreRelative !== null && (
          <rect
            x={x(Math.min(...barreStrings)) - 17}
            y={y(barreRelative) - 17}
            width={x(Math.max(...barreStrings)) - x(Math.min(...barreStrings)) + 34}
            height="34"
            rx="17"
            fill={C.brass}
          />
        )}
        {frets.map((fret, i) => {
          if (fret === null || fret === 0) return null;
          const relative = fret - baseFret + 1;
          if (relative < 1 || relative > FRETS) return null;
          if (showBarre && fret === barreFret) return null;
          return <circle key={`d${i}`} cx={x(i)} cy={y(relative)} r="17" fill={C.brass} />;
        })}
      </svg>
    </div>
  );
}

/** A big flame and a number — the streak card's visual. */
export function StreakVisual({ days, label }: { days: number; label: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 340 }}>
      <svg width="150" height="170" viewBox="0 0 24 24">
        <path
          d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"
          fill={C.brass}
          stroke={C.brass}
          strokeWidth="1"
          strokeLinejoin="round"
        />
      </svg>
      <div style={{ display: "flex", fontSize: 150, fontWeight: 700, color: C.ink, lineHeight: 1, marginTop: 8 }}>
        {String(days)}
      </div>
      <div style={{ display: "flex", fontSize: 32, fontWeight: 700, color: C.brass, marginTop: 6, textTransform: "uppercase", letterSpacing: 4 }}>
        {label}
      </div>
    </div>
  );
}

/** A row of result squares, like a daily puzzle's share grid. */
export function ResultsVisual({ results }: { results: (boolean | null)[] }) {
  return (
    <div style={{ display: "flex", gap: 16 }}>
      {results.map((r, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            width: 64,
            height: 64,
            borderRadius: 14,
            background: r === null ? C.raised : r ? C.inTune : C.off,
            border: `2px solid ${r === null ? C.lineStrong : r ? C.inTune : C.off}`,
          }}
        />
      ))}
    </div>
  );
}

export interface OgCardProps {
  /** Small uppercase label above the title, e.g. "Online tuner". */
  eyebrow: string;
  title: string;
  subtitle?: string;
  /** Sits under the subtitle, e.g. note chips. */
  detail?: ReactNode;
  /** Right-hand illustration. */
  visual?: ReactNode;
  /** Bottom-right line; defaults to the site's pitch. */
  footnote?: string;
}

export async function renderOgCard({ eyebrow, title, subtitle, detail, visual, footnote }: OgCardProps) {
  // Long titles step down so they never run past three lines.
  const titleSize = title.length > 34 ? 56 : title.length > 22 ? 66 : 80;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "56px 64px",
          background: `radial-gradient(circle at 85% 20%, ${C.brassSoft} 0%, ${C.canvas} 55%)`,
          color: C.ink,
          fontFamily: "Inter",
        }}
      >
        {/* Wordmark + eyebrow */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <svg width="44" height="44" viewBox="0 0 44 44">
              <circle cx="22" cy="22" r="20" fill="none" stroke={C.brass} strokeWidth="3" />
              <line x1="22" y1="22" x2="22" y2="8" stroke={C.brass} strokeWidth="3.5" strokeLinecap="round" />
              <circle cx="22" cy="22" r="4" fill={C.brass} />
            </svg>
            <div style={{ display: "flex", fontSize: 30, fontWeight: 700 }}>
              GuitarTune<span style={{ color: C.brass }}>Pro</span>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 22,
              fontWeight: 700,
              color: C.brass,
              textTransform: "uppercase",
              letterSpacing: 3,
              padding: "10px 22px",
              borderRadius: 999,
              border: `2px solid ${C.brass}`,
            }}
          >
            {eyebrow}
          </div>
        </div>

        {/* Body */}
        <div style={{ display: "flex", flex: 1, alignItems: "center", gap: 48 }}>
          <div style={{ display: "flex", flexDirection: "column", flex: 1, gap: 22 }}>
            <Words text={title} size={titleSize} />
            {subtitle && <Words text={subtitle} size={30} weight={400} color={C.muted} lineHeight={1.35} />}
            {detail && <div style={{ display: "flex", marginTop: 10 }}>{detail}</div>}
          </div>
          {visual && <div style={{ display: "flex", justifyContent: "center" }}>{visual}</div>}
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: `2px solid ${C.line}`,
            paddingTop: 22,
            fontSize: 24,
          }}
        >
          <div style={{ display: "flex", color: C.brass, fontWeight: 700 }}>guitartunepro.com</div>
          <div style={{ display: "flex", color: C.subtle }}>
            {footnote ?? "Free · Works in your browser · No sign-up"}
          </div>
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts: await loadFonts() },
  );
}
