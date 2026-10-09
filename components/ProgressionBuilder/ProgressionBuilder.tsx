"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Play, Square, Trash2, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { strumAt, pluck } from "@/lib/synth";
import { ROOTS } from "@/lib/chords";
import { keyName, type KeyMode } from "@/lib/music/scales";
import { libraryChord, chordMidi } from "@/lib/music/libraryChord";
import {
  PRESETS,
  resolveStep,
  paletteSteps,
  encodeSteps,
  decodeSteps,
  type ProgressionStep,
} from "@/lib/progressions";
import { logPractice } from "@/lib/practiceLog";
import { useLoopScheduler } from "@/hooks/useLoopScheduler";
import ChordDiagram from "@/components/Chords/ChordDiagram";
import { Segmented } from "@/components/Segmented";

type Feel = "whole" | "quarters" | "folk" | "arpeggio";

/** Eighth-note grid, one bar of 4/4. */
const FEELS: Record<Feel, { label: string; slots: string }> = {
  whole: { label: "One strum a bar", slots: "D-------" },
  quarters: { label: "Quarter notes", slots: "D-D-D-D-" },
  folk: { label: "Folk strum", slots: "D-DU-UDU" },
  arpeggio: { label: "Picked arpeggio", slots: "pppppppp" },
};
const MAX_CHORDS = 12;

export function ProgressionBuilder() {
  const [mounted, setMounted] = useState(false);
  const [keyPitch, setKeyPitch] = useState(7); // G
  const [mode, setMode] = useState<KeyMode>("major");
  const [steps, setSteps] = useState<ProgressionStep[]>(PRESETS[0].steps);
  const [feel, setFeel] = useState<Feel>("folk");
  const [bpm, setBpm] = useState(90);
  const [barsPerChord, setBarsPerChord] = useState(1);

  // Restore ?key=g&mode=major&p=1,5,6,4 so a progression can be shared.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const root = ROOTS.find((r) => r.slug === params.get("key"));
    if (root) setKeyPitch(root.pitchClass);
    const m = params.get("mode");
    if (m === "major" || m === "minor") setMode(m);
    const decoded = decodeSteps(params.get("p"));
    if (decoded) setSteps(decoded);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const params = new URLSearchParams();
    params.set("key", ROOTS.find((r) => r.pitchClass === keyPitch)!.slug);
    params.set("mode", mode);
    params.set("p", encodeSteps(steps));
    window.history.replaceState(null, "", `?${params.toString()}`);
  }, [keyPitch, mode, steps, mounted]);

  const resolved = useMemo(
    () =>
      steps.map((step) => {
        const r = resolveStep(step, keyPitch, mode);
        return { ...r, chord: libraryChord(r.rootPitch, r.suffix) };
      }),
    [steps, keyPitch, mode],
  );

  const palette = useMemo(
    () => paletteSteps(mode).map((step) => ({ step, ...resolveStep(step, keyPitch, mode) })),
    [mode, keyPitch],
  );

  const barSlots = 8;
  const loopLength = Math.max(1, resolved.length) * barsPerChord * barSlots;

  const onSlot = useCallback(
    (slot: number, time: number, ctx: AudioContext) => {
      if (resolved.length === 0) return;
      const bar = Math.floor(slot / barSlots);
      const step = resolved[Math.floor(bar / barsPerChord) % resolved.length];
      if (!step.chord) return;
      const notes = chordMidi(step.chord);
      const inBar = slot % barSlots;
      const stroke = FEELS[feel].slots[inBar];
      if (stroke === "D") strumAt(ctx, notes, time, { gain: inBar === 0 ? 1.1 : 0.95, length: feel === "whole" ? 3 : 1.4 });
      else if (stroke === "U") strumAt(ctx, notes, time, { direction: "up", gain: 0.85 });
      else if (stroke === "p") {
        // Bass note, then walk up and back through the rest of the chord.
        const order = [0, 2, 3, 4, notes.length - 1, 4, 3, 2].map((i) => notes[Math.min(i, notes.length - 1)]);
        pluck(ctx, order[inBar], time, inBar === 0 ? 0.22 : 0.16, 1.6);
      }
    },
    [resolved, barsPerChord, feel],
  );

  const { isPlaying, currentSlot, toggle, stop } = useLoopScheduler({
    bpm,
    slotsPerBeat: 2,
    loopLength,
    onSlot,
  });

  // A shorter progression would leave the loop pointing past its end.
  useEffect(() => {
    stop();
  }, [steps.length, barsPerChord, stop]);

  const activeIndex =
    currentSlot >= 0 && resolved.length > 0
      ? Math.floor(Math.floor(currentSlot / barSlots) / barsPerChord) % resolved.length
      : -1;

  const addStep = (step: ProgressionStep) =>
    setSteps((prev) => (prev.length >= MAX_CHORDS ? prev : [...prev, step]));
  const removeStep = (i: number) => setSteps((prev) => prev.filter((_, j) => j !== i));

  const presets = PRESETS.filter((p) => p.mode === mode);
  const scaleSlug = mode === "major" ? "major" : "natural-minor";
  const rootSlug = ROOTS.find((r) => r.pitchClass === keyPitch)!.slug;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 flex flex-col gap-5">
      {/* Key */}
      <div className="flex flex-wrap items-center gap-3">
        <div role="group" aria-label="Key" className="flex flex-wrap gap-1 rounded-xl border border-line bg-surface/40 p-1">
          {ROOTS.map((root) => (
            <button
              key={root.slug}
              type="button"
              aria-pressed={keyPitch === root.pitchClass}
              onClick={() => setKeyPitch(root.pitchClass)}
              className={cn(
                "min-w-9 rounded-lg px-2 py-1.5 text-sm font-semibold transition-colors",
                keyPitch === root.pitchClass ? "bg-brass text-brass-contrast" : "text-ink-muted hover:text-ink hover:bg-surface-raised/60",
              )}
            >
              {root.name}
            </button>
          ))}
        </div>
        <Segmented<KeyMode>
          label="Mode"
          value={mode}
          onChange={(m) => {
            setMode(m);
            setSteps(PRESETS.find((p) => p.mode === m)!.steps);
          }}
          items={[
            { value: "major", label: "Major" },
            { value: "minor", label: "Minor" },
          ]}
        />
      </div>

      {/* Presets */}
      <div className="flex flex-wrap gap-2">
        {presets.map((preset) => {
          const active = encodeSteps(preset.steps) === encodeSteps(steps);
          return (
            <button
              key={preset.id}
              type="button"
              aria-pressed={active}
              title={preset.description}
              onClick={() => setSteps(preset.steps)}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors",
                active ? "border-brass bg-brass/10 text-brass" : "border-line bg-surface/40 text-ink-muted hover:text-ink hover:border-brass/40",
              )}
            >
              {preset.name}
            </button>
          );
        })}
      </div>

      {/* Stage */}
      <div className="rounded-3xl border border-line bg-surface-sunken/30 p-5 sm:p-8 backdrop-blur-md shadow-2xl">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <h2 className="text-xl sm:text-2xl font-bold text-ink">
            {keyName(keyPitch, mode)}
            <span className="ml-2 text-sm font-mono font-semibold text-ink-subtle">
              {resolved.map((r) => r.numeral).join(" – ")}
            </span>
          </h2>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setSteps([])}
              className="inline-flex items-center gap-1.5 rounded-full border border-line-strong bg-surface/60 px-4 py-2 text-sm font-semibold text-ink-muted hover:text-ink transition-colors"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Clear
            </button>
            <button
              type="button"
              disabled={resolved.length === 0}
              onClick={() => {
                if (!isPlaying) logPractice("chord-progressions");
                toggle();
              }}
              className={cn(
                "inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-bold transition-colors disabled:opacity-40",
                isPlaying ? "bg-off/20 border border-off/40 text-off" : "bg-brass text-brass-contrast hover:bg-brass-hover",
              )}
            >
              {isPlaying ? <Square className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              {isPlaying ? "Stop" : "Loop it"}
            </button>
          </div>
        </div>

        {resolved.length === 0 ? (
          <p className="py-10 text-center text-ink-muted">Add chords from the palette below.</p>
        ) : (
          <ol className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {resolved.map((r, i) => (
              <li
                key={i}
                className={cn(
                  "relative rounded-2xl border p-3 text-center transition-colors",
                  i === activeIndex ? "border-brass bg-brass/10" : "border-line bg-surface/40",
                )}
              >
                <button
                  type="button"
                  onClick={() => removeStep(i)}
                  aria-label={`Remove ${r.name}`}
                  className="absolute right-1.5 top-1.5 rounded-full p-1 text-ink-subtle hover:text-off hover:bg-off/10"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
                <p className="text-2xs font-mono font-semibold text-ink-subtle">{r.numeral}</p>
                {r.chord ? (
                  <Link
                    href={`/chords/${r.chord.slug}`}
                    className={cn("block text-lg font-bold hover:text-brass", i === activeIndex ? "text-brass" : "text-ink")}
                  >
                    {r.name}
                  </Link>
                ) : (
                  <p className={cn("text-lg font-bold", i === activeIndex ? "text-brass" : "text-ink")}>{r.name}</p>
                )}
                {r.chord && (
                  <ChordDiagram
                    voicing={r.chord.voicings[0]}
                    title={`${r.name} chord diagram`}
                    className="mx-auto mt-1 w-full max-w-[96px] text-ink"
                  />
                )}
              </li>
            ))}
          </ol>
        )}

        {/* Palette */}
        <div className="mt-6 border-t border-line pt-5">
          <p className="eyebrow mb-3">Add a chord {steps.length >= MAX_CHORDS && "(maximum reached)"}</p>
          <div className="flex flex-wrap gap-2">
            {palette.map((p, i) => (
              <button
                key={i}
                type="button"
                disabled={steps.length >= MAX_CHORDS}
                onClick={() => addStep(p.step)}
                className="rounded-xl border border-line-strong bg-surface/60 px-3 py-1.5 text-center hover:border-brass/50 hover:text-brass transition-colors disabled:opacity-40"
              >
                <span className="block text-sm font-bold text-ink">{p.name}</span>
                <span className="block text-2xs font-mono text-ink-subtle">{p.numeral}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Playback settings */}
      <div className="flex flex-wrap items-end gap-4">
        <div className="flex flex-col gap-1">
          <span className="eyebrow">Feel</span>
          <Segmented<Feel>
            label="Feel"
            value={feel}
            onChange={setFeel}
            items={(Object.keys(FEELS) as Feel[]).map((f) => ({ value: f, label: FEELS[f].label }))}
          />
        </div>
        <label className="flex flex-col gap-1 min-w-[200px] flex-1 max-w-xs">
          <span className="eyebrow">Tempo · <span className="tabular-nums text-ink">{bpm} BPM</span></span>
          <input type="range" min={50} max={160} value={bpm} onChange={(e) => setBpm(Number(e.target.value))} className="accent-[var(--accent)]" />
        </label>
        <div className="flex flex-col gap-1">
          <span className="eyebrow">Each chord</span>
          <Segmented<number>
            label="Bars per chord"
            value={barsPerChord}
            onChange={setBarsPerChord}
            items={[
              { value: 1, label: "1 bar" },
              { value: 2, label: "2 bars" },
            ]}
          />
        </div>
      </div>

      <p className="text-sm text-ink-muted">
        Soloing over the loop? Every chord here comes from the{" "}
        <Link href={`/scales?root=${rootSlug}&scale=${scaleSlug}`} className="font-semibold text-brass hover:text-brass-hover">
          {keyName(keyPitch, mode)} scale
        </Link>
        {" "}— or keep it simple with the{" "}
        <Link
          href={`/scales?root=${ROOTS.find((r) => r.pitchClass === (mode === "major" ? (keyPitch + 9) % 12 : keyPitch))!.slug}&scale=minor-pentatonic`}
          className="font-semibold text-brass hover:text-brass-hover"
        >
          minor pentatonic
        </Link>
        {mode === "major" ? " of the relative minor" : ""}.
      </p>
    </div>
  );
}
