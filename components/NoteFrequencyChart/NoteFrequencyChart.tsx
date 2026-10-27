"use client";

import React, { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { getAudioContext, pluckFrequency } from "@/lib/synth";
import {
  REFERENCE_PITCH_MAX,
  REFERENCE_PITCH_MIN,
  REFERENCE_PITCH_PRESETS,
  clampReferencePitch,
} from "@/lib/tuningPresets";
import { Segmented } from "@/components/Segmented";

const NOTE_NAMES = ["C", "C♯/D♭", "D", "D♯/E♭", "E", "F", "F♯/G♭", "G", "G♯/A♭", "A", "A♯/B♭", "B"];
const SHORT_NAMES = ["C", "C♯", "D", "D♯", "E", "F", "F♯", "G", "G♯", "A", "A♯", "B"];
const OCTAVES = [0, 1, 2, 3, 4, 5, 6, 7, 8];
/** Speed of sound in air at 20 °C, for the wavelength readout. */
const SPEED_OF_SOUND = 343;

/** The open strings of a guitar in standard tuning, highlighted in the chart. */
const GUITAR_STRINGS = new Set([40, 45, 50, 55, 59, 64]);

const frequencyOf = (midi: number, a4: number) => a4 * Math.pow(2, (midi - 69) / 12);
const midiOf = (pc: number, octave: number) => (octave + 1) * 12 + pc;

const formatHz = (hz: number) => hz.toFixed(2);

function nearestNote(hz: number, a4: number) {
  const exact = 69 + 12 * Math.log2(hz / a4);
  const midi = Math.round(exact);
  const cents = Math.round((exact - midi) * 100);
  return { midi, cents, name: `${SHORT_NAMES[((midi % 12) + 12) % 12]}${Math.floor(midi / 12) - 1}` };
}

export function NoteFrequencyChart() {
  const [a4, setA4] = useState(440);
  const [customA4, setCustomA4] = useState("440");
  const [playing, setPlaying] = useState<number | null>(null);
  const [lookup, setLookup] = useState("196");

  const setReference = (value: number) => {
    const next = clampReferencePitch(value);
    setA4(next);
    setCustomA4(String(next));
  };

  const play = (midi: number) => {
    const ctx = getAudioContext();
    // Very low notes are inaudible on phone speakers, so they ring longer
    // and louder; the pitch is still exact.
    const hz = frequencyOf(midi, a4);
    pluckFrequency(ctx, hz, ctx.currentTime + 0.03, hz < 80 ? 0.45 : 0.28, 2.2);
    setPlaying(midi);
    window.setTimeout(() => setPlaying((p) => (p === midi ? null : p)), 600);
  };

  const lookupResult = useMemo(() => {
    const hz = Number(lookup.replace(",", "."));
    if (!Number.isFinite(hz) || hz < 8 || hz > 20000) return null;
    return { hz, ...nearestNote(hz, a4) };
  }, [lookup, a4]);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 flex flex-col gap-5">
      <div className="flex flex-wrap items-end gap-3">
        <div className="flex flex-col gap-1">
          <span className="eyebrow">Concert pitch (A4)</span>
          <Segmented<number>
            label="Concert pitch"
            value={REFERENCE_PITCH_PRESETS.includes(a4) ? a4 : -1}
            onChange={setReference}
            items={REFERENCE_PITCH_PRESETS.map((value) => ({ value, label: `${value} Hz` }))}
          />
        </div>
        <label className="flex flex-col gap-1">
          <span className="eyebrow">Custom</span>
          <input
            type="number"
            inputMode="numeric"
            min={REFERENCE_PITCH_MIN}
            max={REFERENCE_PITCH_MAX}
            value={customA4}
            onChange={(e) => setCustomA4(e.target.value)}
            onBlur={() => setReference(Number(customA4))}
            onKeyDown={(e) => {
              if (e.key === "Enter") setReference(Number(customA4));
            }}
            className="w-24 rounded-xl border border-line-strong bg-surface/60 px-3 py-1.5 font-mono text-sm text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass/60"
            aria-label="Custom concert pitch in hertz"
          />
        </label>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-line bg-surface/40">
        <table className="w-full min-w-[52rem] text-sm">
          <caption className="sr-only">
            Frequency of every note from C0 to B8 in hertz, at A4 = {a4} Hz
          </caption>
          <thead>
            <tr className="border-b border-line text-left text-2xs uppercase tracking-widest text-ink-subtle">
              <th scope="col" className="sticky left-0 z-10 bg-surface px-3 py-2.5 font-bold">
                Note
              </th>
              {OCTAVES.map((octave) => (
                <th key={octave} scope="col" className="px-2 py-2.5 text-right font-bold">
                  Octave {octave}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {NOTE_NAMES.map((name, pc) => (
              <tr key={name} className="border-b border-line last:border-0">
                <th scope="row" className="sticky left-0 z-10 bg-surface px-3 py-1.5 text-left font-semibold text-ink whitespace-nowrap">
                  {name}
                </th>
                {OCTAVES.map((octave) => {
                  const midi = midiOf(pc, octave);
                  const hz = frequencyOf(midi, a4);
                  const isA4 = midi === 69;
                  const isString = GUITAR_STRINGS.has(midi);
                  return (
                    <td key={octave} className="px-1 py-1 text-right">
                      <button
                        type="button"
                        onClick={() => play(midi)}
                        aria-label={`Play ${SHORT_NAMES[pc]}${octave}, ${formatHz(hz)} hertz`}
                        className={cn(
                          "w-full rounded-lg px-2 py-1 font-mono tabular-nums transition-colors hover:bg-brass/15 hover:text-brass",
                          isA4 && "bg-brass/15 font-bold text-brass",
                          isString && !isA4 && "text-ink font-semibold underline decoration-brass/60 decoration-2 underline-offset-4",
                          !isA4 && !isString && "text-ink-muted",
                          playing === midi && "bg-brass text-brass-contrast",
                        )}
                      >
                        {formatHz(hz)}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-2xs text-ink-subtle">
        Frequencies in hertz at A4 = {a4}&nbsp;Hz, equal temperament. Tap any
        value to hear it. Highlighted: A4, the tuning reference. Underlined: the
        six open strings of a guitar in standard tuning.
      </p>

      <div className="rounded-2xl border border-line bg-surface/40 p-5">
        <p className="eyebrow mb-3">Frequency to note</p>
        <div className="flex flex-wrap items-center gap-3">
          <label className="flex items-center gap-2">
            <input
              type="text"
              inputMode="decimal"
              value={lookup}
              onChange={(e) => setLookup(e.target.value)}
              aria-label="Frequency in hertz"
              className="w-28 rounded-xl border border-line-strong bg-surface/60 px-3 py-2 font-mono text-base text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass/60"
            />
            <span className="text-sm text-ink-muted">Hz</span>
          </label>
          <p className="text-sm text-ink" aria-live="polite">
            {lookupResult ? (
              <>
                is <strong className="text-lg">{lookupResult.name}</strong>
                {lookupResult.cents !== 0 && (
                  <>
                    , {Math.abs(lookupResult.cents)} cents {lookupResult.cents > 0 ? "sharp" : "flat"}
                  </>
                )}
                <span className="text-ink-muted">
                  {" "}
                  · wavelength {((SPEED_OF_SOUND / lookupResult.hz) * 100).toFixed(1)} cm
                </span>
              </>
            ) : (
              <span className="text-ink-muted">Enter a frequency between 8 and 20,000 Hz.</span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
