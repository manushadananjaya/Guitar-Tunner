"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { RotateCcw } from "lucide-react";
import { frequencyToNote, midiToFrequency } from "@/lib/noteMap";

interface RangeFinderProps {
  midi: number;
  detected: boolean;
  clarity: number;
}

const HOLD_MS = 300;
const MIN_CLARITY = 0.78;

function label(m: number): string {
  const n = frequencyToNote(midiToFrequency(m));
  return `${n.name}${n.octave}`;
}

/** Very rough — voice type depends on tessitura and timbre, not range alone.
 *  Keyed off the lowest note the singer can hold. */
function voiceType(lowMidi: number, highMidi: number): string {
  const span = highMidi - lowMidi;
  if (span < 12) return "Not enough range yet — sing lower and higher";
  if (lowMidi <= 41) return "Bass range";
  if (lowMidi <= 45) return "Baritone range";
  if (lowMidi <= 49) return "Tenor range";
  if (lowMidi <= 53) return "Alto / contralto range";
  if (lowMidi <= 57) return "Mezzo-soprano range";
  return "Soprano range";
}

export function RangeFinder({ midi, detected, clarity }: RangeFinderProps) {
  const [low, setLow] = useState<number | null>(null);
  const [high, setHigh] = useState<number | null>(null);

  const candidateRef = useRef<{ note: number; since: number } | null>(null);

  useEffect(() => {
    if (!detected || midi <= 0 || clarity < MIN_CLARITY) {
      candidateRef.current = null;
      return;
    }
    const note = Math.round(midi);
    const now = Date.now();
    const cand = candidateRef.current;
    if (!cand || cand.note !== note) {
      candidateRef.current = { note, since: now };
      return;
    }
    if (now - cand.since >= HOLD_MS) {
      setLow((prev) => (prev === null || note < prev ? note : prev));
      setHigh((prev) => (prev === null || note > prev ? note : prev));
    }
  }, [midi, detected, clarity]);

  const reset = useCallback(() => {
    setLow(null);
    setHigh(null);
    candidateRef.current = null;
  }, []);

  const haveRange = low !== null && high !== null && high > low;
  const semitones = haveRange ? high - low : 0;
  const octaves = Math.floor(semitones / 12);
  const rem = semitones % 12;

  return (
    <div className="w-full rounded-2xl border border-line bg-surface-sunken/40 p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-sm font-semibold text-ink">Vocal range finder</h3>
          <p className="mt-1 text-2xs text-ink-subtle">
            Sing down to your lowest clear note, then up to your highest. Only
            notes you hold steadily for a moment are counted.
          </p>
        </div>
        <button
          type="button"
          onClick={reset}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-2xs font-semibold text-ink-muted transition-colors hover:border-brass/40 hover:text-brass"
        >
          <RotateCcw className="h-3 w-3" /> Reset
        </button>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3 text-center">
        <div className="rounded-xl border border-line bg-surface/30 p-3">
          <p className="text-2xs font-semibold uppercase tracking-[0.14em] text-ink-subtle">
            Lowest
          </p>
          <p className="mt-1 font-mono text-2xl font-bold text-ink">
            {low !== null ? label(low) : "—"}
          </p>
        </div>
        <div className="rounded-xl border border-line bg-surface/30 p-3">
          <p className="text-2xs font-semibold uppercase tracking-[0.14em] text-ink-subtle">
            Highest
          </p>
          <p className="mt-1 font-mono text-2xl font-bold text-ink">
            {high !== null ? label(high) : "—"}
          </p>
        </div>
        <div className="rounded-xl border border-line bg-surface/30 p-3">
          <p className="text-2xs font-semibold uppercase tracking-[0.14em] text-ink-subtle">
            Range
          </p>
          <p className="mt-1 font-mono text-2xl font-bold text-brass">
            {haveRange ? `${semitones}` : "—"}
          </p>
          <p className="text-2xs text-ink-subtle">
            {haveRange
              ? `semitones${octaves > 0 ? ` · ${octaves} oct${rem ? ` ${rem}` : ""}` : ""}`
              : "semitones"}
          </p>
        </div>
      </div>

      {haveRange && (
        <p className="mt-4 rounded-lg border border-line bg-surface/20 px-3 py-2 text-xs text-ink-muted">
          <span className="font-semibold text-ink">Rough guess:</span>{" "}
          {voiceType(low!, high!)}. This is only an approximation — a real
          classification also considers where your voice sits comfortably and
          its tone, not just the notes you can reach.
        </p>
      )}
    </div>
  );
}
