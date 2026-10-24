/** The printable sheets themselves. Server components, drawn as SVG or CSS
 *  grids sized relative to the page width, so one layout fits A4 and US
 *  Letter. Colours come from the theme variables, which .print-sheet pins to
 *  black on white — a dark-mode visitor still prints ink on paper. */

import ChordDiagram from "@/components/Chords/ChordDiagram";
import { CHORDS, getChord, type Chord } from "@/lib/chords";
import { ROOTS } from "@/lib/chords/theory";
import { SCALES } from "@/lib/music/scales";

const SHEET_URL = "guitartunepro.com/printable-guitar-charts";

/** The easiest-to-read shape: the voicing closest to the nut. */
const lowestVoicing = (chord: Chord) =>
  [...chord.voicings].sort((a, b) => a.baseFret - b.baseFret)[0];

function SheetHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-[4mm] flex items-end justify-between border-b-2 border-ink pb-[2mm]">
      <div>
        <p className="text-[20pt] font-bold leading-tight text-ink">{title}</p>
        {subtitle && <p className="text-[9pt] text-ink-muted">{subtitle}</p>}
      </div>
      <p className="text-[8pt] text-ink-subtle">GuitarTunePro</p>
    </div>
  );
}

function SheetFooter({ note }: { note?: string }) {
  return (
    <div className="mt-[4mm] flex justify-between border-t border-line-strong pt-[1.5mm] text-[7.5pt] text-ink-subtle">
      <span>{note ?? "Free to print and share for teaching and practice."}</span>
      <span>{SHEET_URL}</span>
    </div>
  );
}

function ChordGrid({ slugs, columns }: { slugs: string[]; columns: number }) {
  const chords = slugs.map((slug) => getChord(slug)).filter((c): c is Chord => !!c);
  return (
    <div className="grid gap-x-[3mm] gap-y-[2mm]" style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
      {chords.map((chord) => (
        <div key={chord.slug} className="flex flex-col items-center">
          <p className="text-[12pt] font-bold text-ink leading-none mb-[0.5mm]">{chord.name}</p>
          <ChordDiagram voicing={lowestVoicing(chord)} title={`${chord.name} chord diagram`} className="w-full text-ink" />
          <p className="font-mono text-[6.5pt] text-ink-subtle -mt-[1mm]">
            {chord.notes.map((n) => n.name).join(" ")}
          </p>
        </div>
      ))}
    </div>
  );
}

export const BEGINNER_CHART_ROWS: { label: string; slugs: string[] }[] = [
  { label: "Major", slugs: ["c", "d", "e", "f", "g", "a"] },
  { label: "Minor", slugs: ["a-minor", "b-minor", "d-minor", "e-minor", "a-m7", "e-m7"] },
  { label: "Dominant 7th", slugs: ["a-7", "b-7", "c-7", "d-7", "e-7", "g-7"] },
  { label: "Major 7th and suspended", slugs: ["c-maj7", "f-maj7", "a-sus2", "d-sus2", "a-sus4", "d-sus4"] },
];

export function BeginnerChordSheet() {
  return (
    <>
      <SheetHeader
        title="Guitar Chord Chart"
        subtitle="24 essential chords · x = don't play the string · o = open string · numbers = starting fret"
      />
      <div className="flex flex-col gap-[3mm]">
        {BEGINNER_CHART_ROWS.map((row) => (
          <div key={row.label}>
            <p className="text-[8pt] font-bold uppercase tracking-widest text-ink-muted mb-[1mm]">{row.label}</p>
            <ChordGrid slugs={row.slugs} columns={6} />
          </div>
        ))}
      </div>
      <SheetFooter />
    </>
  );
}

export function MajorMinorSheet() {
  return (
    <>
      <SheetHeader
        title="Major & Minor Chords in Every Key"
        subtitle="The easiest common shape for each · numbers beside a diagram = the fret it starts on"
      />
      {(["major", "minor"] as const).map((quality) => (
        <div key={quality} className="mb-[3mm]">
          <p className="text-[8pt] font-bold uppercase tracking-widest text-ink-muted mb-[1mm]">{quality}</p>
          <ChordGrid
            slugs={ROOTS.map((root) => (quality === "major" ? root.slug : `${root.slug}-minor`)).filter((slug) =>
              CHORDS.some((c) => c.slug === slug),
            )}
            columns={6}
          />
        </div>
      ))}
      <SheetFooter />
    </>
  );
}

// ── Fretboard sheets ─────────────────────────────────────────────────────────

const NOTE_NAMES = ["C", "C♯", "D", "D♯", "E", "F", "F♯", "G", "G♯", "A", "A♯", "B"];
const FLAT_NAMES = ["C", "D♭", "D", "E♭", "E", "F", "G♭", "G", "A♭", "A", "B♭", "B"];
/** Standard tuning, string 1 (high E) first — the top line of a fretboard
 *  chart, as players read it. */
const STRINGS_HIGH_FIRST = [64, 59, 55, 50, 45, 40];
const INLAYS = [3, 5, 7, 9, 15, 17, 19, 21];

function Fretboard({
  frets,
  mark,
}: {
  frets: number;
  /** What to draw at a given string/fret, or null for nothing. */
  mark: (midi: number, fret: number) => { label: string; strong: boolean } | null;
}) {
  const W = 277;
  // Room for the string names, clear of the open-string circles.
  const left = 19;
  const right = 3;
  const top = 6;
  const gap = 13;
  const H = top * 2 + gap * 5 + 8;
  const fretW = (W - left - right) / frets;
  const x = (fret: number) => (fret === 0 ? left - 6 : left + (fret - 0.5) * fretW);
  const y = (s: number) => top + s * gap;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full text-ink" role="img" aria-label={`Fretboard, frets 0 to ${frets}`}>
      <rect x={left - 1.2} y={y(0) - 0.6} width={1.6} height={gap * 5 + 1.2} className="text-ink" fill="currentColor" />
      {Array.from({ length: frets }, (_, i) => (
        <line key={`f${i}`} x1={left + (i + 1) * fretW} x2={left + (i + 1) * fretW} y1={y(0)} y2={y(5)} className="text-line-strong" stroke="currentColor" strokeWidth={0.35} />
      ))}
      {INLAYS.filter((f) => f <= frets).map((f) => (
        <circle key={`i${f}`} cx={x(f)} cy={(y(2) + y(3)) / 2} r={1.3} className="text-line" fill="currentColor" />
      ))}
      {frets >= 12 &&
        [y(1) + gap / 2, y(3) + gap / 2].map((cy) => (
          <circle key={cy} cx={x(12)} cy={cy} r={1.3} className="text-line" fill="currentColor" />
        ))}
      {STRINGS_HIGH_FIRST.map((_, s) => (
        <line key={`s${s}`} x1={left} x2={W - right} y1={y(s)} y2={y(s)} className="text-ink-muted" stroke="currentColor" strokeWidth={0.25 + s * 0.08} />
      ))}
      {STRINGS_HIGH_FIRST.map((open, s) =>
        Array.from({ length: frets + 1 }, (_, fret) => {
          const m = mark(open + fret, fret);
          if (!m) return null;
          return (
            <g key={`${s}-${fret}`}>
              <circle
                cx={x(fret)}
                cy={y(s)}
                r={3.4}
                className={m.strong ? "text-ink" : "text-surface-raised"}
                fill="currentColor"
                stroke="currentColor"
                strokeWidth={0.3}
                style={m.strong ? undefined : { stroke: "var(--border-strong)" }}
              />
              <text
                x={x(fret)}
                y={y(s) + 1.15}
                textAnchor="middle"
                fontSize={m.label.length > 1 ? 2.9 : 3.3}
                fontWeight={700}
                className={m.strong ? "text-surface-raised" : "text-ink"}
                fill="currentColor"
              >
                {m.label}
              </text>
            </g>
          );
        }),
      )}
      {Array.from({ length: frets + 1 }, (_, fret) => (
        <text key={`n${fret}`} x={x(fret)} y={H - 1.5} textAnchor="middle" fontSize={3} className="text-ink-subtle" fill="currentColor">
          {fret}
        </text>
      ))}
      {["E", "B", "G", "D", "A", "E"].map((name, s) => (
        <text key={`l${s}`} x={2} y={y(s) + 1.1} fontSize={3.2} fontWeight={700} className="text-ink-muted" fill="currentColor">
          {name}
        </text>
      ))}
    </svg>
  );
}

export function FretboardNotesSheet() {
  return (
    <>
      <SheetHeader
        title="Guitar Fretboard Notes Chart"
        subtitle="Standard tuning, frets 0–12 · natural notes in black · the pattern repeats from fret 12"
      />
      <Fretboard
        frets={12}
        mark={(midi) => {
          const name = NOTE_NAMES[midi % 12];
          return { label: name, strong: !name.includes("♯") };
        }}
      />
      <div className="mt-[5mm] grid grid-cols-3 gap-[5mm] text-[8.5pt] leading-snug text-ink">
        <div>
          <p className="font-bold">Sharps and flats</p>
          <p className="text-ink-muted">
            Each white dot has two names: C♯ = D♭, D♯ = E♭, F♯ = G♭, G♯ = A♭, A♯ = B♭. There is no sharp between B–C or E–F.
          </p>
        </div>
        <div>
          <p className="font-bold">Octave shapes</p>
          <p className="text-ink-muted">
            The same note sits two strings up and two frets along — three frets when the jump crosses onto the B string.
          </p>
        </div>
        <div>
          <p className="font-bold">Landmarks</p>
          <p className="text-ink-muted">
            5th fret = the next string&apos;s open note (4th fret on the G string). 12th fret = the open note an octave up.
          </p>
        </div>
      </div>
      <SheetFooter />
    </>
  );
}

/** A minor pentatonic on the full neck, with its five box positions. */
export function PentatonicSheet() {
  const scale = SCALES.find((s) => s.slug === "minor-pentatonic")!;
  const ROOT = 9; // A
  const pcs = new Set(scale.steps.map((step) => (ROOT + step) % 12));
  // The fret span each of the five boxes covers, in A.
  const boxes = [
    { n: 1, frets: "5–8" },
    { n: 2, frets: "7–10" },
    { n: 3, frets: "9–13" },
    { n: 4, frets: "12–15" },
    { n: 5, frets: "14–17 (= 2–5)" },
  ];
  return (
    <>
      <SheetHeader
        title="Minor Pentatonic Scale Chart"
        subtitle="A minor pentatonic (A C D E G) on the whole neck · black = root note A"
      />
      <Fretboard
        frets={17}
        mark={(midi) => {
          const pc = midi % 12;
          if (!pcs.has(pc)) return null;
          return { label: FLAT_NAMES[pc], strong: pc === ROOT };
        }}
      />
      <div className="mt-[4mm] grid grid-cols-5 gap-[3mm] text-center text-[8pt]">
        {boxes.map((box) => (
          <div key={box.n} className="rounded border border-line-strong px-[1mm] py-[1.5mm]">
            <p className="font-bold text-ink">Box {box.n}</p>
            <p className="text-ink-muted">frets {box.frets}</p>
          </div>
        ))}
      </div>
      <div className="mt-[4mm] grid grid-cols-2 gap-[5mm] text-[8.5pt] leading-snug">
        <div>
          <p className="font-bold text-ink">Any other key</p>
          <p className="text-ink-muted">
            Slide the whole pattern so a black root sits on your key&apos;s note on the low E string: E at the
            open/12th fret, G at 3, A at 5, B at 7, C at 8, D at 10.
          </p>
        </div>
        <div>
          <p className="font-bold text-ink">The major pentatonic is hiding here</p>
          <p className="text-ink-muted">
            The same notes from C are C major pentatonic. Box 2 of A minor is box 1 of C major — so one chart
            gives you both.
          </p>
        </div>
      </div>
      <SheetFooter />
    </>
  );
}

// ── Blank sheets ─────────────────────────────────────────────────────────────

export function BlankTabSheet() {
  const STAVES = 9;
  const W = 190;
  const LINE = 3.2;
  const STAFF = LINE * 5;
  const GAP = 11.5;
  const H = STAVES * (STAFF + GAP);
  return (
    <>
      <div className="mb-[3mm] grid grid-cols-3 gap-[4mm] text-[9pt] text-ink">
        {["Song", "Artist", "Tuning / capo"].map((label) => (
          <p key={label} className="border-b border-line-strong pb-[1mm]">
            <span className="text-ink-subtle">{label}:</span>
          </p>
        ))}
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full text-ink" role="img" aria-label="Blank guitar tablature staves">
        {Array.from({ length: STAVES }, (_, i) => {
          const top = i * (STAFF + GAP) + GAP / 2;
          return (
            <g key={i}>
              {["e", "B", "G", "D", "A", "E"].map((name, s) => (
                <g key={s}>
                  <text x={0} y={top + s * LINE + 1} fontSize={2.6} className="text-ink-subtle" fill="currentColor">
                    {name}
                  </text>
                  <line x1={4} x2={W} y1={top + s * LINE} y2={top + s * LINE} className="text-ink-muted" stroke="currentColor" strokeWidth={0.2} />
                </g>
              ))}
              <line x1={4} x2={4} y1={top} y2={top + STAFF - LINE} className="text-ink" stroke="currentColor" strokeWidth={0.5} />
              <line x1={W - 0.25} x2={W - 0.25} y1={top} y2={top + STAFF - LINE} className="text-ink" stroke="currentColor" strokeWidth={0.5} />
            </g>
          );
        })}
      </svg>
      <SheetFooter note="Blank guitar tab paper — e is the thinnest string, at the top." />
    </>
  );
}

export function BlankChordSheet() {
  const BOXES = 30;
  return (
    <>
      <div className="mb-[3mm] border-b border-line-strong pb-[1mm] text-[9pt] text-ink-subtle">Title:</div>
      <div className="grid grid-cols-6 gap-x-[4mm] gap-y-[3mm]">
        {Array.from({ length: BOXES }, (_, i) => (
          <svg key={i} viewBox="0 0 60 78" className="w-full text-ink" role="img" aria-label="Blank chord diagram">
            <line x1={6} x2={54} y1={9} y2={9} className="text-line-strong" stroke="currentColor" strokeWidth={0.5} />
            <rect x={10} y={18} width={40} height={2.2} className="text-ink" fill="currentColor" />
            {Array.from({ length: 6 }, (_, f) => (
              <line key={`f${f}`} x1={10} x2={50} y1={19 + f * 11} y2={19 + f * 11} className="text-line-strong" stroke="currentColor" strokeWidth={0.6} />
            ))}
            {Array.from({ length: 6 }, (_, s) => (
              <line key={`s${s}`} x1={10 + s * 8} x2={10 + s * 8} y1={19} y2={74} className="text-line-strong" stroke="currentColor" strokeWidth={0.6} />
            ))}
          </svg>
        ))}
      </div>
      <SheetFooter note="Blank chord diagrams — write the name on the line, mark x or o above the nut." />
    </>
  );
}
