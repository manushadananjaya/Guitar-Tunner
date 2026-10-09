"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { getAudioContext, strumAt } from "@/lib/synth";
import { ROOTS } from "@/lib/chords";
import {
  CIRCLE_MAJOR_PCS,
  diatonicChords,
  keyName,
  keyScale,
  keySignature,
  type KeyMode,
} from "@/lib/music/scales";
import { libraryChord, chordMidi } from "@/lib/music/libraryChord";

const mod12 = (n: number) => ((n % 12) + 12) % 12;

const SIZE = 420;
const C = SIZE / 2;
const R_OUTER = 200;
const R_MID = 138;
const R_INNER = 86;

/** Outer labels: the bottom of the circle is where sharps and flats meet. */
const MAJOR_LABELS = ["C", "G", "D", "A", "E", "B", "F♯/G♭", "D♭", "A♭", "E♭", "B♭", "F"];
const MINOR_LABELS = ["Am", "Em", "Bm", "F♯m", "C♯m", "G♯m", "E♭m", "B♭m", "Fm", "Cm", "Gm", "Dm"];

function polar(radius: number, angleDeg: number) {
  const a = ((angleDeg - 90) * Math.PI) / 180;
  return [C + radius * Math.cos(a), C + radius * Math.sin(a)];
}

function wedge(index: number, r1: number, r2: number) {
  const start = index * 30 - 15;
  const end = start + 30;
  const [x1, y1] = polar(r2, start);
  const [x2, y2] = polar(r2, end);
  const [x3, y3] = polar(r1, end);
  const [x4, y4] = polar(r1, start);
  return `M ${x1} ${y1} A ${r2} ${r2} 0 0 1 ${x2} ${y2} L ${x3} ${y3} A ${r1} ${r1} 0 0 0 ${x4} ${y4} Z`;
}

export function CircleOfFifths() {
  const [index, setIndex] = useState(0); // position on the circle, 0 = C / Am
  const [mode, setMode] = useState<KeyMode>("major");

  const majorPc = CIRCLE_MAJOR_PCS[index];
  const pc = mode === "major" ? majorPc : mod12(majorPc + 9);
  const signature = keySignature(pc, mode);
  const notes = keyScale(pc, mode);
  const chords = useMemo(() => diatonicChords(pc, mode), [pc, mode]);
  const neighbours = new Set([mod12(index - 1), index, mod12(index + 1)]);

  const select = (i: number, m: KeyMode) => {
    setIndex(i);
    setMode(m);
  };

  const playCadence = () => {
    // I – IV – V – I (or i – iv – V – i): the sound of a key.
    const degrees = [1, 4, 5, 1];
    const ctx = getAudioContext();
    const t0 = ctx.currentTime + 0.05;
    degrees.forEach((d, i) => {
      const chord = chords[d - 1];
      const suffix = mode === "minor" && d === 5 ? "" : chord.quality === "minor" ? "m" : chord.quality === "dim" ? "dim" : "";
      const lib = libraryChord(chord.rootPitch, suffix);
      if (lib) strumAt(ctx, chordMidi(lib), t0 + i * 0.9, { length: 1.6 });
    });
  };

  const rootSlug = ROOTS.find((r) => r.pitchClass === pc)!.slug;
  const relative = mode === "major" ? keyName(mod12(pc + 9), "minor") : keyName(mod12(pc + 3), "major");

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] items-start">
      <div className="rounded-3xl border border-line bg-surface-sunken/30 p-4 sm:p-6 backdrop-blur-md shadow-2xl">
        <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="w-full max-w-[460px] mx-auto" role="group" aria-label="Circle of fifths">
          {MAJOR_LABELS.map((label, i) => {
            const selected = i === index && mode === "major";
            const near = neighbours.has(i);
            const [tx, ty] = polar((R_OUTER + R_MID) / 2, i * 30);
            return (
              <g
                key={`M${i}`}
                role="button"
                tabIndex={0}
                aria-label={`${label} major`}
                aria-pressed={selected}
                onClick={() => select(i, "major")}
                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), select(i, "major"))}
                className="cursor-pointer focus:outline-none [&:focus-visible>path]:stroke-[var(--accent)] [&:focus-visible>path]:stroke-[3]"
              >
                <path
                  d={wedge(i, R_MID, R_OUTER)}
                  className={cn(
                    "stroke-[var(--border-strong)] transition-colors",
                    selected ? "fill-[var(--accent)]" : near ? "fill-[var(--accent-soft)]" : "fill-[var(--surface)] hover:fill-[var(--surface-raised)]",
                  )}
                  strokeWidth={1}
                />
                <text
                  x={tx}
                  y={ty}
                  textAnchor="middle"
                  dominantBaseline="central"
                  className={cn("pointer-events-none font-bold", selected ? "fill-[var(--accent-contrast)]" : "fill-[var(--foreground)]")}
                  fontSize={label.length > 2 ? 15 : 20}
                >
                  {label}
                </text>
              </g>
            );
          })}
          {MINOR_LABELS.map((label, i) => {
            const selected = i === index && mode === "minor";
            const near = neighbours.has(i);
            const [tx, ty] = polar((R_MID + R_INNER) / 2, i * 30);
            return (
              <g
                key={`m${i}`}
                role="button"
                tabIndex={0}
                aria-label={`${label.replace("m", "")} minor`}
                aria-pressed={selected}
                onClick={() => select(i, "minor")}
                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), select(i, "minor"))}
                className="cursor-pointer focus:outline-none [&:focus-visible>path]:stroke-[var(--accent)] [&:focus-visible>path]:stroke-[3]"
              >
                <path
                  d={wedge(i, R_INNER, R_MID)}
                  className={cn(
                    "stroke-[var(--border-strong)] transition-colors",
                    selected ? "fill-[var(--accent)]" : near ? "fill-[var(--accent-soft)]" : "fill-[var(--surface-sunken)] hover:fill-[var(--surface-raised)]",
                  )}
                  strokeWidth={1}
                />
                <text
                  x={tx}
                  y={ty}
                  textAnchor="middle"
                  dominantBaseline="central"
                  className={cn("pointer-events-none font-semibold", selected ? "fill-[var(--accent-contrast)]" : "fill-[var(--foreground-muted)]")}
                  fontSize={13}
                >
                  {label}
                </text>
              </g>
            );
          })}
          <circle cx={C} cy={C} r={R_INNER} className="fill-[var(--canvas)] stroke-[var(--border-strong)]" />
          <text x={C} y={C - 14} textAnchor="middle" className="fill-[var(--foreground)] font-bold" fontSize={22}>
            {signature.count === 0 ? "♮" : `${signature.count}${signature.type === "sharps" ? "♯" : "♭"}`}
          </text>
          <text x={C} y={C + 14} textAnchor="middle" className="fill-[var(--foreground-subtle)]" fontSize={11}>
            {signature.count === 0 ? "no sharps or flats" : signature.type}
          </text>
        </svg>
        <p className="mt-3 text-center text-2xs text-ink-subtle">
          Outer ring: major keys. Inner ring: their relative minors. Shaded: the six chords that belong to the selected key.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <div className="rounded-2xl border border-line bg-surface/40 p-5">
          <p className="eyebrow mb-1">Selected key</p>
          <h2 className="text-3xl font-bold text-ink">{keyName(pc, mode)}</h2>
          <p className="mt-1 text-sm text-ink-muted">
            {signature.count === 0
              ? "No sharps or flats."
              : `${signature.count} ${signature.count === 1 ? signature.type.slice(0, -1) : signature.type}: ${signature.notes.join(" ")}`}
            {majorPc === 6 && mode === "major" && " (Also written as G♭ major, with 6 flats.)"}
            {index === 6 && mode === "minor" && " (Also written as D♯ minor, with 6 sharps.)"}
          </p>
          <p className="mt-1 text-sm text-ink-muted">
            Relative {mode === "major" ? "minor" : "major"}: <strong className="text-ink">{relative}</strong>
          </p>

          <p className="eyebrow mt-5 mb-2">Scale</p>
          <div className="flex flex-wrap gap-1.5">
            {notes.map((n, i) => (
              <span key={i} className={cn("rounded-lg border px-2.5 py-1 font-bold", i === 0 ? "border-brass/50 bg-brass/10 text-ink" : "border-line text-ink")}>
                {n.name}
              </span>
            ))}
          </div>

          <p className="eyebrow mt-5 mb-2">Chords in this key</p>
          <ul className="grid grid-cols-4 sm:grid-cols-7 lg:grid-cols-4 xl:grid-cols-7 gap-2">
            {chords.map((chord) => {
              const lib = libraryChord(chord.rootPitch, chord.quality === "major" ? "" : chord.quality === "minor" ? "m" : "dim");
              return (
                <li key={chord.degree} className="text-center">
                  {lib ? (
                    <Link href={`/chords/${lib.slug}`} className="block rounded-xl border border-line px-1 py-1.5 font-bold text-ink hover:border-brass/50 hover:text-brass transition-colors">
                      {chord.name}
                    </Link>
                  ) : (
                    <span className="block rounded-xl border border-line px-1 py-1.5 font-bold text-ink">{chord.name}</span>
                  )}
                  <span className="text-2xs font-mono text-ink-subtle">{chord.numeral}</span>
                </li>
              );
            })}
          </ul>

          <div className="mt-5 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={playCadence}
              className="inline-flex items-center gap-1.5 rounded-full bg-brass px-4 py-2 text-sm font-bold text-brass-contrast hover:bg-brass-hover transition-colors"
            >
              <Play className="h-3.5 w-3.5" />
              Hear {mode === "major" ? "I–IV–V–I" : "i–iv–V–i"}
            </button>
            <Link
              href={`/chord-progressions?key=${rootSlug}&mode=${mode}`}
              className="inline-flex items-center rounded-full border border-line-strong bg-surface/60 px-4 py-2 text-sm font-semibold text-ink hover:border-brass/50 hover:text-brass transition-colors"
            >
              Build a progression
            </Link>
            <Link
              href={`/scales?root=${rootSlug}&scale=${mode === "major" ? "major" : "natural-minor"}`}
              className="inline-flex items-center rounded-full border border-line-strong bg-surface/60 px-4 py-2 text-sm font-semibold text-ink hover:border-brass/50 hover:text-brass transition-colors"
            >
              See the scale
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
