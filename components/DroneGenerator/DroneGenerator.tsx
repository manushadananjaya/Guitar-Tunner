"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Play, Square } from "lucide-react";
import { cn } from "@/lib/utils";
import { getAudioContext, pluckFrequency, startDrone, midiToFrequency } from "@/lib/synth";
import { ROOTS } from "@/lib/chords";
import { REFERENCE_PITCH_PRESETS } from "@/lib/tuningPresets";
import { Segmented, SelectField } from "@/components/Segmented";

type Voicing = "root" | "fifth" | "full" | "tanpura";

/** Semitones above the root for each sustained voicing. */
const VOICINGS: Record<Exclude<Voicing, "tanpura">, number[]> = {
  root: [0, 12],
  fifth: [0, 7],
  full: [0, 7, 12],
};

/** One tanpura cycle: Pa, Sa, Sa, low Sa — the fifth below, the tonic twice,
 *  then the tonic an octave down — with the gap between plucks. */
const TANPURA_CYCLE = [-5, 0, 0, -12];
const TANPURA_GAP = 0.95;

const OCTAVES = [
  { value: 2, label: "Low" },
  { value: 3, label: "Middle" },
  { value: 4, label: "High" },
];

/** Plucks a tanpura-style cycle on the audio clock until stopped. The
 *  lookahead keeps it in time when a background tab throttles timers; the
 *  plucks share one gain so stopping silences the ones already scheduled. */
function startTanpura(rootMidi: number, volume: number, a4: number): () => void {
  const ctx = getAudioContext();
  const master = ctx.createGain();
  master.gain.value = 1;
  master.connect(ctx.destination);
  let next = ctx.currentTime + 0.05;
  let step = 0;
  const schedule = () => {
    while (next < ctx.currentTime + 1.5) {
      const midi = rootMidi + TANPURA_CYCLE[step % TANPURA_CYCLE.length];
      const hz = (midiToFrequency(midi) * a4) / 440;
      pluckFrequency(ctx, hz, next, 0.18 * volume + 0.02, 4.5, master);
      next += TANPURA_GAP;
      step++;
    }
  };
  schedule();
  const timer = window.setInterval(schedule, 250);
  return () => {
    window.clearInterval(timer);
    const t = ctx.currentTime;
    master.gain.setValueAtTime(1, t);
    master.gain.exponentialRampToValueAtTime(0.0001, t + 0.3);
    window.setTimeout(() => master.disconnect(), 400);
  };
}

export function DroneGenerator() {
  const [rootPc, setRootPc] = useState(2); // D
  const [voicing, setVoicing] = useState<Voicing>("full");
  const [octave, setOctave] = useState(3);
  // The slider moves `volumeDraft`; the drone restarts at the new level
  // only when it is released, not on every step of a drag.
  const [volume, setVolume] = useState(0.6);
  const [volumeDraft, setVolumeDraft] = useState(0.6);
  const [a4, setA4] = useState(440);
  const [playing, setPlaying] = useState(false);
  const stopRef = useRef<(() => void) | null>(null);

  // Deep links such as ?key=e-flat open on that key.
  useEffect(() => {
    const key = new URLSearchParams(window.location.search).get("key");
    const root = ROOTS.find((r) => r.slug === key);
    if (root) setRootPc(root.pitchClass);
  }, []);

  // (Re)start whenever a setting changes while playing, so every control
  // works live.
  useEffect(() => {
    if (!playing) return;
    const rootMidi = (octave + 1) * 12 + rootPc;
    stopRef.current =
      voicing === "tanpura"
        ? startTanpura(rootMidi + 12, volume, a4)
        : startDrone(
            VOICINGS[voicing].map((step) => rootMidi + step),
            volume,
            a4,
          );
    return () => {
      stopRef.current?.();
      stopRef.current = null;
    };
  }, [playing, rootPc, voicing, octave, volume, a4]);

  const root = ROOTS.find((r) => r.pitchClass === rootPc)!;

  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6">
      <div className="rounded-3xl border border-line bg-surface-sunken/30 p-5 sm:p-8 backdrop-blur-md shadow-2xl flex flex-col gap-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-3xl sm:text-4xl font-bold text-ink">
            {root.name} <span className="text-ink-muted text-xl font-semibold">drone</span>
          </p>
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            aria-pressed={playing}
            className={cn(
              "inline-flex items-center gap-2 rounded-full px-6 py-3 text-base font-bold transition-colors",
              playing
                ? "border border-brass/60 bg-brass/20 text-brass-hover"
                : "bg-brass text-brass-contrast hover:bg-brass-hover",
            )}
          >
            {playing ? <Square className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            {playing ? "Stop" : "Play drone"}
          </button>
        </div>

        <div role="group" aria-label="Key" className="flex flex-wrap gap-1 rounded-xl border border-line bg-surface/40 p-1 w-fit">
          {ROOTS.map((r) => (
            <button
              key={r.slug}
              type="button"
              aria-pressed={rootPc === r.pitchClass}
              onClick={() => setRootPc(r.pitchClass)}
              className={cn(
                "min-w-9 rounded-lg px-2 py-1.5 text-sm font-semibold transition-colors",
                rootPc === r.pitchClass
                  ? "bg-brass text-brass-contrast"
                  : "text-ink-muted hover:text-ink hover:bg-surface-raised/60",
              )}
            >
              {r.name}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-end gap-3">
          <div className="flex flex-col gap-1">
            <span className="eyebrow">Sound</span>
            <Segmented<Voicing>
              label="Sound"
              value={voicing}
              onChange={setVoicing}
              items={[
                { value: "full", label: "Root, 5th, octave" },
                { value: "fifth", label: "Root + 5th" },
                { value: "root", label: "Root only" },
                { value: "tanpura", label: "Tanpura" },
              ]}
            />
          </div>
          <div className="flex flex-col gap-1">
            <span className="eyebrow">Register</span>
            <Segmented<number> label="Register" value={octave} onChange={setOctave} items={OCTAVES} />
          </div>
          <SelectField label="A4" value={String(a4)} onChange={(v) => setA4(Number(v))}>
            {REFERENCE_PITCH_PRESETS.map((hz) => (
              <option key={hz} value={hz}>
                {hz} Hz
              </option>
            ))}
          </SelectField>
          <label className="flex flex-col gap-1">
            <span className="eyebrow">Volume</span>
            <input
              type="range"
              min={0.1}
              max={1}
              step={0.05}
              value={volumeDraft}
              onChange={(e) => setVolumeDraft(Number(e.target.value))}
              onPointerUp={() => setVolume(volumeDraft)}
              onKeyUp={() => setVolume(volumeDraft)}
              onBlur={() => setVolume(volumeDraft)}
              className="w-36 accent-brass h-9"
              aria-label="Volume"
            />
          </label>
        </div>

        <p className="text-sm text-ink-muted">
          The drone keeps playing while you switch tabs, so you can open a{" "}
          <Link href={`/scales?root=${root.slug}&scale=major`} className="text-brass font-semibold hover:text-brass-hover">
            {root.name} scale
          </Link>{" "}
          or the{" "}
          <Link href="/metronome" className="text-brass font-semibold hover:text-brass-hover">
            metronome
          </Link>{" "}
          alongside it. Leaving this page stops it.
        </p>
      </div>
    </div>
  );
}
