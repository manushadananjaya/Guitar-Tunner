"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Play, Square, Waves } from "lucide-react";
import { cn } from "@/lib/utils";
import { getAudioContext, pluck, playMelody, startDrone } from "@/lib/synth";
import { SIX_STRING_TUNINGS, getMidiTuning } from "@/lib/tuningMidi";
import { ROOTS, CHORD_BY_SLUG } from "@/lib/chords";
import { SCALES, getScale, spellScale, spellingName, QUALITY_SUFFIX } from "@/lib/music/scales";
import { logPractice } from "@/lib/practiceLog";
import { Fretboard, type FretMark } from "@/components/Fretboard/Fretboard";
import { Segmented, SelectField } from "@/components/Segmented";

const FRET_COUNT = 15;
const mod12 = (n: number) => ((n % 12) + 12) % 12;

type LabelMode = "names" | "intervals";

/** Name a triad from the semitone gaps of its 3rd and 5th. */
function triadQuality(third: number, fifth: number): string | null {
  if (third === 4 && fifth === 7) return "major";
  if (third === 3 && fifth === 7) return "minor";
  if (third === 3 && fifth === 6) return "dim";
  if (third === 4 && fifth === 8) return "aug";
  return null;
}

export function ScaleExplorer() {
  const [mounted, setMounted] = useState(false);
  const [rootPc, setRootPc] = useState(9); // A
  const [scaleSlug, setScaleSlug] = useState("minor-pentatonic");
  const [tuningKey, setTuningKey] = useState("standard");
  const [labels, setLabels] = useState<LabelMode>("names");
  const [position, setPosition] = useState<number | "all">("all");
  const [droneOn, setDroneOn] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const stopDroneRef = useRef<(() => void) | null>(null);
  const playTimeout = useRef<number | null>(null);

  const scale = getScale(scaleSlug);
  const tuning = getMidiTuning(tuningKey);
  const stringNames = tuning.notes.split(" ");
  const { tonic, notes } = useMemo(() => spellScale(rootPc, scale), [rootPc, scale]);
  const title = `${spellingName(tonic)} ${scale.name.replace(/ \(.*\)$/, "").toLowerCase()}`;

  // Restore from the URL once, so links like ?root=e&scale=dorian work.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const root = ROOTS.find((r) => r.slug === params.get("root"));
    if (root) setRootPc(root.pitchClass);
    const s = params.get("scale");
    if (s && SCALES.some((x) => x.slug === s)) setScaleSlug(s);
    const t = params.get("t");
    if (t && SIX_STRING_TUNINGS.some((x) => x.key === t)) setTuningKey(t);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const params = new URLSearchParams();
    params.set("root", ROOTS.find((r) => r.pitchClass === rootPc)!.slug);
    params.set("scale", scaleSlug);
    if (tuningKey !== "standard") params.set("t", tuningKey);
    window.history.replaceState(null, "", `?${params.toString()}`);
  }, [rootPc, scaleSlug, tuningKey, mounted]);

  // Positions: one window starting at each scale tone on the lowest string.
  const positions = useMemo(() => {
    const low = tuning.midi[0];
    return notes
      .map((n) => mod12(n.pitchClass - low))
      .sort((a, b) => a - b)
      .map((fret) => {
        const start = fret === 0 ? 0 : fret - 1;
        return [start, start + 4] as [number, number];
      });
  }, [notes, tuning]);

  useEffect(() => setPosition("all"), [rootPc, scaleSlug, tuningKey]);

  const focus = position === "all" ? undefined : positions[position];

  const marks = useMemo<FretMark[]>(() => {
    const out: FretMark[] = [];
    tuning.midi.forEach((open, string) => {
      for (let fret = 0; fret <= FRET_COUNT; fret++) {
        const note = notes.find((n) => n.pitchClass === mod12(open + fret));
        if (!note) continue;
        out.push({
          string,
          fret,
          variant: note.step === 0 ? "root" : "note",
          label: labels === "names" ? note.name : note.interval,
        });
      }
    });
    return out;
  }, [tuning, notes, labels]);

  /** Lowest root on the lowest string — or inside the chosen position. */
  const startMidi = useMemo(() => {
    const low = tuning.midi[0];
    let midi = low + mod12(rootPc - low);
    if (focus) {
      while (midi - low < focus[0]) midi += 12;
      // A root just past the window on string 6 is better played from string 5.
      if (midi - low > focus[1]) midi -= 12;
      if (midi < low) midi += 12;
    }
    return midi;
  }, [tuning, rootPc, focus]);

  const playScale = useCallback(() => {
    const up = [...scale.steps.map((s) => startMidi + s), startMidi + 12];
    const sequence = [...up, ...up.slice(0, -1).reverse()];
    const seconds = playMelody(sequence, 0.32);
    setIsPlaying(true);
    logPractice("scales");
    if (playTimeout.current !== null) window.clearTimeout(playTimeout.current);
    playTimeout.current = window.setTimeout(() => setIsPlaying(false), seconds * 1000);
  }, [scale, startMidi]);

  const playFret = (string: number, fret: number) => {
    const ctx = getAudioContext();
    pluck(ctx, tuning.midi[string] + fret, ctx.currentTime + 0.01, 0.25, 1.4);
  };

  // (Re)start the drone whenever it is on and the root changes.
  useEffect(() => {
    if (!droneOn) return;
    const root = 36 + rootPc; // C2..B2
    stopDroneRef.current = startDrone([root, root + 7, root + 12]);
    logPractice("scales");
    return () => {
      stopDroneRef.current?.();
      stopDroneRef.current = null;
    };
  }, [droneOn, rootPc]);

  // Chords built from the scale — only meaningful for seven-note scales.
  const chords = useMemo(() => {
    if (notes.length !== 7) return [];
    return notes.map((note, i) => {
      const third = mod12(notes[(i + 2) % 7].pitchClass - note.pitchClass);
      const fifth = mod12(notes[(i + 4) % 7].pitchClass - note.pitchClass);
      const quality = triadQuality(third, fifth);
      const root = ROOTS.find((r) => r.pitchClass === note.pitchClass)!;
      const slug = quality === "major" ? root.slug : quality ? `${root.slug}-${quality}` : null;
      return {
        name: quality ? `${note.name}${QUALITY_SUFFIX[quality]}` : note.name,
        degree: note.interval === "R" ? "1" : note.interval,
        href: slug && CHORD_BY_SLUG.has(slug) ? `/chords/${slug}` : null,
      };
    });
  }, [notes]);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 flex flex-col gap-5">
      {/* Controls */}
      <div className="flex flex-col gap-4">
        <div role="group" aria-label="Root note" className="flex flex-wrap gap-1 rounded-xl border border-line bg-surface/40 p-1 w-fit">
          {ROOTS.map((root) => (
            <button
              key={root.slug}
              type="button"
              aria-pressed={rootPc === root.pitchClass}
              onClick={() => setRootPc(root.pitchClass)}
              className={cn(
                "min-w-9 rounded-lg px-2 py-1.5 text-sm font-semibold transition-colors",
                rootPc === root.pitchClass
                  ? "bg-brass text-brass-contrast"
                  : "text-ink-muted hover:text-ink hover:bg-surface-raised/60",
              )}
            >
              {root.name}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-end gap-3">
          <SelectField label="Scale" value={scaleSlug} onChange={setScaleSlug}>
            {SCALES.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.name}
              </option>
            ))}
          </SelectField>
          <SelectField label="Tuning" value={tuningKey} onChange={setTuningKey}>
            {SIX_STRING_TUNINGS.map((t) => (
              <option key={t.key} value={t.key}>
                {t.name} ({t.notes})
              </option>
            ))}
          </SelectField>
          <Segmented<LabelMode>
            label="Labels"
            value={labels}
            onChange={setLabels}
            items={[
              { value: "names", label: "Note names" },
              { value: "intervals", label: "Intervals" },
            ]}
          />
        </div>
      </div>

      {/* Fretboard */}
      <div className="rounded-3xl border border-line bg-surface-sunken/30 p-4 sm:p-6 backdrop-blur-md shadow-2xl">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <h2 className="text-xl sm:text-2xl font-bold text-ink">{title}</h2>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={playScale}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-bold transition-colors",
                isPlaying
                  ? "bg-brass/20 text-brass-hover border border-brass/60"
                  : "bg-brass text-brass-contrast hover:bg-brass-hover",
              )}
            >
              <Play className="h-3.5 w-3.5" />
              Play scale
            </button>
            <button
              type="button"
              aria-pressed={droneOn}
              onClick={() => setDroneOn((on) => !on)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
                droneOn
                  ? "border-brass/60 bg-brass/20 text-brass-hover"
                  : "border-line-strong bg-surface/60 text-ink hover:border-brass/50 hover:text-brass",
              )}
            >
              {droneOn ? <Square className="h-3.5 w-3.5" /> : <Waves className="h-3.5 w-3.5" />}
              {droneOn ? "Stop drone" : `Drone on ${spellingName(tonic)}`}
            </button>
          </div>
        </div>

        <div role="group" aria-label="Position" className="flex flex-wrap gap-1 mb-4">
          <button
            type="button"
            aria-pressed={position === "all"}
            onClick={() => setPosition("all")}
            className={cn(
              "rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors border",
              position === "all" ? "bg-brass text-brass-contrast border-brass" : "border-line text-ink-muted hover:text-ink",
            )}
          >
            Whole neck
          </button>
          {positions.map(([from, to], i) => (
            <button
              key={i}
              type="button"
              aria-pressed={position === i}
              onClick={() => setPosition(i)}
              className={cn(
                "rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors border tabular-nums",
                position === i ? "bg-brass text-brass-contrast border-brass" : "border-line text-ink-muted hover:text-ink",
              )}
            >
              Pos {i + 1} · {from}–{to}
            </button>
          ))}
        </div>

        <Fretboard
          stringNames={stringNames}
          fretCount={FRET_COUNT}
          marks={marks}
          focus={focus}
          onSelect={playFret}
          ariaLabel={`${title} on the fretboard`}
          describe={(string, fret) => {
            const pc = mod12(tuning.midi[string] + fret);
            const note = notes.find((n) => n.pitchClass === pc);
            return `String ${6 - string}, fret ${fret}${note ? `: ${note.name} (${note.interval})` : ""}`;
          }}
        />
        <p className="mt-3 text-2xs text-ink-subtle">
          Tap any fret to hear it. Gold dots are the root. Positions start at
          each scale note on the low string, so position 1 is the lowest box.
        </p>
      </div>

      {/* Notes and chords */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-line bg-surface/40 p-5">
          <p className="eyebrow mb-3">Notes</p>
          <div className="flex flex-wrap gap-2">
            {notes.map((note, i) => (
              <span
                key={i}
                className={cn(
                  "inline-flex flex-col items-center rounded-xl border px-3 py-1.5",
                  note.step === 0 ? "border-brass/50 bg-brass/10" : "border-line",
                )}
              >
                <span className="text-base font-bold text-ink">{note.name}</span>
                <span className="text-2xs font-mono text-ink-subtle">{note.interval}</span>
              </span>
            ))}
          </div>
          <p className="mt-4 text-sm leading-relaxed text-ink-muted">{scale.character}</p>
        </div>
        <div className="rounded-2xl border border-line bg-surface/40 p-5">
          <p className="eyebrow mb-3">{chords.length > 0 ? "Chords in this scale" : "Play it over"}</p>
          {chords.length > 0 ? (
            <ul className="grid grid-cols-4 sm:grid-cols-7 md:grid-cols-4 lg:grid-cols-7 gap-2">
              {chords.map((chord, i) => (
                <li key={i} className="text-center">
                  {chord.href ? (
                    <Link
                      href={chord.href}
                      className="block rounded-xl border border-line px-1 py-1.5 font-bold text-ink hover:border-brass/50 hover:text-brass transition-colors"
                    >
                      {chord.name}
                    </Link>
                  ) : (
                    <span className="block rounded-xl border border-line px-1 py-1.5 font-bold text-ink">
                      {chord.name}
                    </span>
                  )}
                  <span className="text-2xs font-mono text-ink-subtle">{chord.degree}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm leading-relaxed text-ink-muted">
              {scale.minor
                ? `Try it over ${spellingName(tonic)}m or ${spellingName(tonic)}7, a progression in ${spellingName(tonic)} minor, or a 12-bar blues in ${spellingName(tonic)}. Or turn the drone on and improvise over that.`
                : `Try it over ${spellingName(tonic)} or ${spellingName(tonic)}maj7, or a progression in ${spellingName(tonic)} major. Or turn the drone on and improvise over that.`}
            </p>
          )}
          <p className="mt-4 text-sm text-ink-muted">
            Want a backing track instead of a drone?{" "}
            <Link href="/chord-progressions" className="text-brass font-semibold hover:text-brass-hover">
              Loop a progression
            </Link>{" "}
            in the same key.
          </p>
        </div>
      </div>
    </div>
  );
}
