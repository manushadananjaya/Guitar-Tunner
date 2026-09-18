"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Play, RotateCcw, Link2, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { strum } from "@/lib/synth";
import { SIX_STRING_TUNINGS, getMidiTuning } from "@/lib/tuningMidi";
import {
  identifyChord,
  encodeFingering,
  decodeFingering,
} from "@/lib/chords/identify";
import type { Fingering } from "@/lib/chords";

const FRET_COUNT = 15;
const STRING_COUNT = 6;
/** Fret markers as on a real neck, plus the double dot at 12. */
const INLAYS = new Set([3, 5, 7, 9, 12, 15]);

/** Open C — so the page shows a result before the first tap. */
const DEFAULT_FINGERING: Fingering = [null, 3, 2, 0, 1, 0];

export function ChordFinder() {
  const [mounted, setMounted] = useState(false);
  const [tuningKey, setTuningKey] = useState("standard");
  const [frets, setFrets] = useState<Fingering>(DEFAULT_FINGERING);
  const [isPlaying, setIsPlaying] = useState(false);
  const [copied, setCopied] = useState(false);
  const playTimeout = useRef<number | null>(null);

  const tuning = getMidiTuning(tuningKey);

  // Restore a shared shape from the URL, once.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const t = params.get("t");
    if (t && SIX_STRING_TUNINGS.some((tuning) => tuning.key === t)) {
      setTuningKey(t);
    }
    const decoded = decodeFingering(params.get("f"), STRING_COUNT, FRET_COUNT);
    if (decoded) setFrets(decoded);
    setMounted(true);
  }, []);

  // Keep the URL in step so the current shape is always shareable.
  useEffect(() => {
    if (!mounted) return;
    const params = new URLSearchParams();
    if (tuningKey !== "standard") params.set("t", tuningKey);
    params.set("f", encodeFingering(frets));
    window.history.replaceState(null, "", `?${params.toString()}`);
  }, [frets, tuningKey, mounted]);

  const result = useMemo(
    () => identifyChord(frets, tuning.midi),
    [frets, tuning],
  );
  const best = result.matches[0];
  const soundedMidi = result.notes.map((n) => n.midi);

  const setFret = useCallback((string: number, fret: number | null) => {
    setFrets((current) => {
      const next = [...current];
      // Tapping the fret already held releases the string.
      next[string] = current[string] === fret ? null : fret;
      return next;
    });
  }, []);

  const play = useCallback(() => {
    if (soundedMidi.length === 0) return;
    const seconds = strum(soundedMidi);
    setIsPlaying(true);
    if (playTimeout.current !== null) window.clearTimeout(playTimeout.current);
    playTimeout.current = window.setTimeout(
      () => setIsPlaying(false),
      seconds * 1000,
    );
  }, [soundedMidi]);

  const copyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard can be unavailable in insecure contexts; the URL bar still
      // carries the state, so there is nothing else to do.
    }
  }, []);

  // Interval of each sounded note relative to the best match's root.
  const intervalOf = (pitchClass: number) =>
    best?.notes.find((n) => n.pitchClass === pitchClass)?.interval ?? "";

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 flex flex-col gap-6">
      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <label className="flex items-center gap-3 text-sm text-ink-muted">
          <span className="eyebrow">Tuning</span>
          <select
            value={tuningKey}
            onChange={(event) => setTuningKey(event.target.value)}
            className="rounded-lg border border-line bg-surface px-3 py-2 text-sm font-medium text-ink focus:outline-none focus:ring-2 focus:ring-brass/40"
          >
            {SIX_STRING_TUNINGS.map((tuning) => (
              <option key={tuning.key} value={tuning.key}>
                {tuning.name} — {tuning.notes}
              </option>
            ))}
          </select>
        </label>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={play}
            disabled={soundedMidi.length === 0}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-semibold transition-colors disabled:opacity-40",
              isPlaying
                ? "border-brass/60 bg-brass/20 text-brass-hover"
                : "border-line-strong bg-surface/60 text-ink hover:border-brass/50 hover:text-brass",
            )}
          >
            <Play className="h-3.5 w-3.5" />
            Strum
          </button>
          <button
            type="button"
            onClick={() => setFrets(Array(STRING_COUNT).fill(null))}
            className="inline-flex items-center gap-1.5 rounded-full border border-line-strong bg-surface/60 px-4 py-2 text-sm font-semibold text-ink hover:border-brass/50 hover:text-brass transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Clear
          </button>
          <button
            type="button"
            onClick={copyLink}
            className="inline-flex items-center gap-1.5 rounded-full border border-line-strong bg-surface/60 px-4 py-2 text-sm font-semibold text-ink hover:border-brass/50 hover:text-brass transition-colors"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-in-tune" /> : <Link2 className="h-3.5 w-3.5" />}
            {copied ? "Copied" : "Share"}
          </button>
        </div>
      </div>

      {/* Fretboard — high string on top, nut on the left, as a tab is read. */}
      <div className="rounded-3xl border border-line bg-surface-sunken/30 p-4 sm:p-6 backdrop-blur-md shadow-2xl">
        <div className="overflow-x-auto pb-2 -mx-1 px-1">
          <div
            role="grid"
            aria-label="Fretboard"
            className="min-w-[760px]"
            style={{
              display: "grid",
              gridTemplateColumns: `2.25rem 2.5rem repeat(${FRET_COUNT}, minmax(0, 1fr))`,
              rowGap: "0.25rem",
            }}
          >
            {/* Fret numbers */}
            <div />
            <div className="text-center text-2xs text-ink-subtle pb-1">open</div>
            {Array.from({ length: FRET_COUNT }, (_, i) => (
              <div
                key={`h${i}`}
                className="text-center text-2xs text-ink-subtle pb-1 tabular-nums"
              >
                {i + 1}
              </div>
            ))}

            {Array.from({ length: STRING_COUNT }, (_, row) => {
              // Row 0 is string 1 (highest); state index 0 is string 6.
              const string = STRING_COUNT - 1 - row;
              const held = frets[string];
              const openName = tuning.notes.split(" ")[string];
              /** Conventional string number: 1 is the thinnest. */
              const number = STRING_COUNT - string;
              return (
                <React.Fragment key={`r${row}`}>
                  <button
                    type="button"
                    role="gridcell"
                    aria-label={`String ${number} (${openName}): ${held === null ? "muted" : "sounding"}`}
                    onClick={() => setFret(string, null)}
                    className={cn(
                      "h-9 rounded-md text-xs font-mono font-semibold transition-colors",
                      held === null
                        ? "bg-off/15 text-off"
                        : "text-ink-subtle hover:bg-surface-raised/60",
                    )}
                  >
                    {held === null ? "×" : openName}
                  </button>

                  {Array.from({ length: FRET_COUNT + 1 }, (_, fret) => {
                    const active = held === fret;
                    return (
                      <div
                        key={`c${row}-${fret}`}
                        className={cn(
                          "relative h-9 flex items-center justify-center",
                          fret === 0 ? "border-r-4 border-ink-muted/70" : "border-r border-line-strong",
                        )}
                      >
                        {/* The string itself */}
                        <div
                          aria-hidden="true"
                          className={cn(
                            "absolute left-0 right-0 top-1/2 -translate-y-1/2 bg-ink-subtle/50",
                            fret === 0 && "hidden",
                          )}
                          style={{ height: `${1 + (STRING_COUNT - 1 - row) * 0.35}px` }}
                        />
                        {/* Inlay dot, drawn between the two middle strings */}
                        {INLAYS.has(fret) && (row === 2 || (fret === 12 && row === 4)) && (
                          <span
                            aria-hidden="true"
                            className="absolute top-full -translate-y-1/2 h-2 w-2 rounded-full bg-ink-subtle/25"
                          />
                        )}
                        <button
                          type="button"
                          role="gridcell"
                          aria-pressed={active}
                          aria-label={`String ${number}, fret ${fret}`}
                          onClick={() => setFret(string, fret)}
                          className={cn(
                            "relative z-10 h-7 w-7 rounded-full text-2xs font-bold transition-all",
                            active
                              ? "bg-brass text-brass-contrast shadow-[0_0_12px_var(--accent)] scale-110"
                              : "text-transparent hover:bg-brass/20 hover:text-ink",
                          )}
                        >
                          {active ? "●" : "○"}
                        </button>
                      </div>
                    );
                  })}
                </React.Fragment>
              );
            })}
          </div>
        </div>
        <p className="mt-3 text-2xs text-ink-subtle">
          Tap a fret to hold it, tap it again to release the string. The left
          column mutes a string (×) or shows its open note.
        </p>
      </div>

      {/* Result */}
      <div
        className="grid gap-4 md:grid-cols-[1.2fr_1fr]"
        aria-live="polite"
      >
        <div className="rounded-3xl border border-line bg-surface-sunken/30 p-6 sm:p-8">
          {best ? (
            <>
              <p className="eyebrow mb-2">
                {best.omitsFifth ? "Closest match (5th omitted)" : "This chord is"}
              </p>
              <p className="text-5xl sm:text-6xl font-bold tracking-tight text-ink leading-none">
                {best.name}
              </p>
              <p className="mt-3 text-sm text-ink-muted">
                {best.root.name} {best.quality.name}
                {best.slashBass && ` with ${best.slashBass} in the bass`}
                {" — "}
                {best.notes.map((n) => n.name).join(" · ")}
              </p>
              <p className="mt-2 text-sm text-ink-muted leading-relaxed">
                {best.quality.character}
              </p>
              <Link
                href={`/chords/${best.slug}`}
                className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brass hover:text-brass-hover"
              >
                See {best.root.name}
                {best.quality.suffix} shapes and theory →
              </Link>

              {result.matches.length > 1 && (
                <div className="mt-6 border-t border-line pt-5">
                  <p className="eyebrow mb-2">Also spelled as</p>
                  <ul className="flex flex-wrap gap-2">
                    {result.matches.slice(1, 7).map((match) => (
                      <li key={match.name}>
                        <Link
                          href={`/chords/${match.slug}`}
                          className="rounded-full border border-line bg-surface/40 px-3 py-1.5 text-sm text-ink hover:border-brass/40 hover:text-brass transition-colors"
                        >
                          {match.name}
                          {match.omitsFifth && (
                            <span className="text-ink-subtle"> (no 5th)</span>
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          ) : result.notes.length === 0 ? (
            <>
              <p className="eyebrow mb-2">No strings held</p>
              <p className="text-lg text-ink-muted">
                Tap the frets you are playing and the chord name appears here.
              </p>
            </>
          ) : result.intervalName ? (
            <>
              <p className="eyebrow mb-2">Two notes — an interval, not a chord</p>
              <p className="text-4xl sm:text-5xl font-bold tracking-tight text-ink">
                {result.intervalName}
              </p>
              <p className="mt-3 text-sm text-ink-muted">
                Add a third note and it becomes a chord. Practise hearing this
                one in our{" "}
                <Link href="/ear-training" className="text-brass">
                  ear trainer
                </Link>
                .
              </p>
            </>
          ) : result.notes.length === 1 ? (
            <>
              <p className="eyebrow mb-2">One note</p>
              <p className="text-4xl sm:text-5xl font-bold tracking-tight text-ink">
                {result.notes[0].name}
                {result.notes[0].octave}
              </p>
            </>
          ) : (
            <>
              <p className="eyebrow mb-2">No standard name</p>
              <p className="text-lg text-ink leading-relaxed">
                These notes don&apos;t form any of the {13} common chord types
                we recognise. That is fine — plenty of good sounds don&apos;t
                have a tidy name. Try releasing one string.
              </p>
            </>
          )}
        </div>

        {/* Notes table */}
        <div className="rounded-3xl border border-line bg-surface-sunken/30 p-6 sm:p-8">
          <p className="eyebrow mb-3">Notes sounded</p>
          {result.notes.length === 0 ? (
            <p className="text-sm text-ink-muted">Nothing yet.</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-2xs uppercase tracking-wider text-ink-subtle">
                  <th className="pb-2 font-semibold">String</th>
                  <th className="pb-2 font-semibold">Fret</th>
                  <th className="pb-2 font-semibold">Note</th>
                  {best && <th className="pb-2 font-semibold">Interval</th>}
                </tr>
              </thead>
              <tbody className="tabular-nums">
                {[...result.notes].reverse().map((note) => (
                  <tr key={note.string} className="border-t border-line/60">
                    <td className="py-1.5 text-ink-muted">{STRING_COUNT - note.string}</td>
                    <td className="py-1.5 text-ink-muted">
                      {note.fret === 0 ? "open" : note.fret}
                    </td>
                    <td className="py-1.5 font-semibold text-ink">
                      {note.name}
                      <span className="text-ink-subtle font-normal">{note.octave}</span>
                    </td>
                    {best && (
                      <td
                        className={cn(
                          "py-1.5",
                          note.pitchClass === best.root.pitchClass
                            ? "text-brass font-semibold"
                            : "text-ink-muted",
                        )}
                      >
                        {intervalOf(note.pitchClass)}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
