"use client";

import React, { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import {
  parseChordList,
  capoOptions,
  guessKey,
  pitchName,
  SHAPE_KEYS,
  type ShapeDifficulty,
} from "@/lib/music/transpose";
import { keyName } from "@/lib/music/scales";
import { SelectField } from "@/components/Segmented";

const mod12 = (n: number) => ((n % 12) + 12) % 12;


const DIFFICULTY_CLASS: Record<ShapeDifficulty, string> = {
  open: "border-in-tune/40 bg-in-tune/10 text-in-tune",
  barre: "border-brass/40 bg-brass/10 text-brass",
  hard: "border-off/40 bg-off/10 text-off",
};

export function CapoCalculator() {
  const [input, setInput] = useState("Bb F Gm Eb");
  const [showAll, setShowAll] = useState(false);

  const [shapeIndex, setShapeIndex] = useState(1); // G shapes
  const [capoFret, setCapoFret] = useState(2);
  const [targetPitch, setTargetPitch] = useState(9);

  const chords = useMemo(() => parseChordList(input), [input]);
  const options = useMemo(() => capoOptions(chords, 9), [chords]);
  const songKey = useMemo(() => guessKey(chords), [chords]);
  const best = options[0];
  const visible = showAll ? options : options.slice(0, 4);

  const shape = SHAPE_KEYS[shapeIndex];
  const sounding = mod12(shape.pitch + capoFret);
  const neededCapo = mod12(targetPitch - shape.pitch);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 flex flex-col gap-5">
      {/* Song chords → best capo */}
      <div className="rounded-3xl border border-line bg-surface-sunken/30 p-5 sm:p-8 backdrop-blur-md shadow-2xl">
        <h2 className="text-xl font-bold text-ink mb-1">Find the easiest capo position</h2>
        <p className="text-sm text-ink-muted mb-4">
          Type the chords of the song as written. Separate them with spaces or commas.
        </p>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          spellCheck={false}
          aria-label="Song chords"
          className="w-full rounded-xl border border-line-strong bg-surface/60 px-4 py-3 font-mono text-base text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass/60"
          placeholder="e.g. Bb F Gm Eb"
        />
        {songKey && (
          <p className="mt-2 text-xs text-ink-subtle">
            Song key looks like <span className="font-semibold text-ink-muted">{keyName(songKey.pitchClass, songKey.mode)}</span>.
          </p>
        )}

        {chords.length === 0 ? (
          <p className="mt-6 text-sm text-ink-muted">No chords recognised yet — try something like <code>F C Dm Bb</code>.</p>
        ) : (
          <>
            {best && (
              <div className="mt-6 rounded-2xl border border-brass/30 bg-brass/5 p-5">
                <p className="eyebrow mb-1">Best option</p>
                <p className="text-2xl font-bold text-ink">
                  {best.capo === 0 ? "No capo" : `Capo on fret ${best.capo}`}
                </p>
                <p className="mt-1 text-sm text-ink-muted">
                  Play{" "}
                  <span className="font-mono font-semibold text-ink">{best.shapes.map((s) => s.name).join(" ")}</span>
                  {songKey && best.capo > 0 && (
                    <> — shapes in {keyName(mod12(songKey.pitchClass - best.capo), songKey.mode)}</>
                  )}
                  . {best.score === 100 ? "Every chord is an open shape." : `${best.score}% open-shape friendly.`}
                </p>
              </div>
            )}

            <div className="mt-5 overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-left text-2xs uppercase tracking-wider text-ink-subtle">
                  <tr>
                    <th className="py-2 pr-4 font-semibold">Capo</th>
                    <th className="py-2 pr-4 font-semibold">Shapes you play</th>
                    <th className="py-2 font-semibold w-32">Ease</th>
                  </tr>
                </thead>
                <tbody>
                  {visible.map((option) => (
                    <tr key={option.capo} className="border-t border-line/60">
                      <td className="py-2.5 pr-4 font-semibold text-ink tabular-nums whitespace-nowrap">
                        {option.capo === 0 ? "None" : `Fret ${option.capo}`}
                      </td>
                      <td className="py-2.5 pr-4">
                        <div className="flex flex-wrap gap-1.5">
                          {option.shapes.map((s, i) => (
                            <span
                              key={i}
                              title={`Sounds as ${s.sounds}`}
                              className={cn("rounded-md border px-2 py-0.5 font-mono text-xs font-semibold", DIFFICULTY_CLASS[s.difficulty])}
                            >
                              {s.name}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-2.5">
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 flex-1 rounded-full bg-surface-sunken overflow-hidden">
                            <div className="h-full rounded-full bg-brass" style={{ width: `${option.score}%` }} />
                          </div>
                          <span className="text-xs tabular-nums text-ink-muted w-9 text-right">{option.score}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-2xs text-ink-subtle">
              <span className="flex flex-wrap gap-3">
                <span><span className="inline-block h-2 w-2 rounded-full bg-in-tune mr-1" />open shape</span>
                <span><span className="inline-block h-2 w-2 rounded-full bg-brass mr-1" />common barre</span>
                <span><span className="inline-block h-2 w-2 rounded-full bg-off mr-1" />harder</span>
              </span>
              {options.length > 4 && (
                <button type="button" onClick={() => setShowAll((v) => !v)} className="font-semibold text-brass hover:text-brass-hover">
                  {showAll ? "Show top 4" : `Show all ${options.length} positions`}
                </button>
              )}
            </div>
          </>
        )}
      </div>

      {/* Key finder */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-line bg-surface/40 p-5">
          <p className="eyebrow mb-3">What key am I really in?</p>
          <div className="flex flex-wrap gap-3">
            <SelectField label="Shapes" value={String(shapeIndex)} onChange={(v) => setShapeIndex(Number(v))}>
              {SHAPE_KEYS.map((k, i) => (
                <option key={k.label} value={i}>
                  {k.label} shapes
                </option>
              ))}
            </SelectField>
            <SelectField label="Capo fret" value={String(capoFret)} onChange={(v) => setCapoFret(Number(v))}>
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i} value={i}>
                  {i === 0 ? "No capo" : `Fret ${i}`}
                </option>
              ))}
            </SelectField>
          </div>
          <p className="mt-4 text-sm text-ink-muted">Sounds in</p>
          <p className="text-3xl font-bold text-brass">{keyName(sounding, shape.mode)}</p>
        </div>

        <div className="rounded-2xl border border-line bg-surface/40 p-5">
          <p className="eyebrow mb-3">Where do I put the capo?</p>
          <div className="flex flex-wrap gap-3">
            <SelectField label="I want to sound in" value={String(targetPitch)} onChange={(v) => setTargetPitch(Number(v))}>
              {Array.from({ length: 12 }, (_, pc) => (
                <option key={pc} value={pc}>
                  {pitchName(pc, shape.mode)}
                  {shape.mode === "minor" ? "m" : ""}
                </option>
              ))}
            </SelectField>
            <SelectField label="Using" value={String(shapeIndex)} onChange={(v) => setShapeIndex(Number(v))}>
              {SHAPE_KEYS.map((k, i) => (
                <option key={k.label} value={i}>
                  {k.label} shapes
                </option>
              ))}
            </SelectField>
          </div>
          <p className="mt-4 text-sm text-ink-muted">Put the capo on</p>
          <p className="text-3xl font-bold text-brass">
            {neededCapo === 0 ? "No capo needed" : `Fret ${neededCapo}`}
          </p>
          {neededCapo > 7 && (
            <p className="mt-1 text-xs text-ink-subtle">
              That high, the neck gets cramped — another shape key will usually sit lower.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
