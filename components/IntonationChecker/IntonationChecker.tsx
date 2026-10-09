"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { Mic, MicOff, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAudioCapture } from "@/hooks/useAudioCapture";
import { PitchDetector } from "@/lib/pitchDetection";
import { midiToFrequency } from "@/lib/synth";
import { SIX_STRING_TUNINGS, getMidiTuning, midiNoteName, frequencyToMidi } from "@/lib/tuningMidi";
import { SelectField } from "@/components/Segmented";

const SAMPLE_RATE = 48000;
/** Readings further than this from the target are ignored as the wrong
 *  string, an octave error, or noise. */
const WINDOW_CENTS = 60;
/** Stable readings needed for a capture. ~0.5 s of sustained note. */
const SAMPLES_NEEDED = 24;
const TIMEOUT_MS = 12000;
/** Within this, intonation is as good as most setups get. */
const TOLERANCE = 3;
const STORAGE_KEY = "gtp-intonation";
/** Pause before the fretted capture, so the still-ringing harmonic (the
 *  same pitch) cannot be mistaken for it. */
const REARM_MS = 2000;

type Phase = "harmonic" | "fretted";

interface StringResult {
  harmonic?: number;
  fretted?: number;
}

const cents = (freq: number, target: number) => 1200 * Math.log2(freq / target);
const median = (xs: number[]) => {
  const s = [...xs].sort((a, b) => a - b);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
};
const fmt = (c: number) => `${c > 0 ? "+" : ""}${c.toFixed(1)}¢`;

function verdict(diff: number) {
  if (Math.abs(diff) <= TOLERANCE) {
    return { tone: "good" as const, text: "Good. Leave this saddle alone." };
  }
  return diff > 0
    ? {
        tone: "bad" as const,
        text: `Fretted note is ${diff.toFixed(1)}¢ sharp. Move the saddle back, away from the neck, to lengthen the string.`,
      }
    : {
        tone: "bad" as const,
        text: `Fretted note is ${Math.abs(diff).toFixed(1)}¢ flat. Move the saddle forward, toward the neck, to shorten the string.`,
      };
}

export function IntonationChecker() {
  const [tuningKey, setTuningKey] = useState("standard");
  const [results, setResults] = useState<Record<number, StringResult>>({});
  const [active, setActive] = useState<{ string: number; phase: Phase } | null>(null);
  const [live, setLive] = useState<{ cents: number; progress: number; frequency: number } | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const tuning = getMidiTuning(tuningKey);

  // Results persist per tuning, so you can adjust a saddle and come back.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(`${STORAGE_KEY}:${tuningKey}`);
      setResults(raw ? JSON.parse(raw) : {});
    } catch {
      setResults({});
    }
  }, [tuningKey]);

  const saveResults = (next: Record<number, StringResult>) => {
    setResults(next);
    try {
      window.localStorage.setItem(`${STORAGE_KEY}:${tuningKey}`, JSON.stringify(next));
    } catch {
      // Storage blocked.
    }
  };

  const detectorRef = useRef(new PitchDetector({ smoothingWindow: 3 }));
  const activeRef = useRef(active);
  const samplesRef = useRef<number[]>([]);
  const startedRef = useRef(0);
  /** No samples are taken before this time. */
  const armAtRef = useRef(0);
  const [waiting, setWaiting] = useState(false);
  const lastUiRef = useRef(0);
  const tuningRef = useRef(tuning);
  activeRef.current = active;
  tuningRef.current = tuning;

  const finishRef = useRef<(value: number) => void>(() => {});

  // Stable: reads everything through refs so the capture hook never has to
  // re-subscribe while the microphone is running.
  const onData = useCallback((data: Float32Array) => {
    const current = activeRef.current;
    if (!current) return;
    const now = performance.now();
    if (now < armAtRef.current) return;
    if (now - startedRef.current > TIMEOUT_MS) {
      setActive(null);
      setLive(null);
      setMessage("Didn't catch a steady note. Pick a little harder, let it ring, and try again.");
      return;
    }
    const result = detectorRef.current.detect(data, SAMPLE_RATE);
    // Both the harmonic and the fretted 12th sound one octave above the open string.
    const target = midiToFrequency(tuningRef.current.midi[current.string] + 12);
    if (result.detected && result.frequency > 0) {
      const c = cents(result.frequency, target);
      if (Math.abs(c) <= WINDOW_CENTS) samplesRef.current.push(c);
      if (now - lastUiRef.current > 80) {
        lastUiRef.current = now;
        setLive({ cents: c, progress: samplesRef.current.length / SAMPLES_NEEDED, frequency: result.frequency });
      }
      if (samplesRef.current.length >= SAMPLES_NEEDED) {
        // Drop the attack: the first readings of a pluck run sharp.
        finishRef.current(median(samplesRef.current.slice(Math.floor(SAMPLES_NEEDED / 3))));
      }
    }
  }, []);

  const { state: audio, requestMicrophone, stopAudioCapture } = useAudioCapture({ onDataAvailable: onData });

  const begin = (string: number, phase: Phase) => {
    samplesRef.current = [];
    startedRef.current = performance.now();
    armAtRef.current = 0;
    detectorRef.current.reset();
    setMessage(null);
    setLive(null);
    setActive({ string, phase });
    if (!audio.isActive) void requestMicrophone();
  };

  finishRef.current = (value: number) => {
    const current = activeRef.current;
    if (!current) return;
    activeRef.current = null;
    const prev = results[current.string] ?? {};
    const next = { ...results, [current.string]: { ...prev, [current.phase]: value } };
    saveResults(next);
    setLive(null);
    if (current.phase === "harmonic") {
      // On to the fretted note for the same string, after a pause to let
      // the harmonic die away.
      samplesRef.current = [];
      armAtRef.current = performance.now() + REARM_MS;
      startedRef.current = armAtRef.current;
      detectorRef.current.reset();
      setWaiting(true);
      window.setTimeout(() => setWaiting(false), REARM_MS);
      setActive({ string: current.string, phase: "fretted" });
    } else {
      setActive(null);
    }
  };

  const stringLabel = (i: number) => `String ${6 - i} · ${midiNoteName(tuning.midi[i])}`;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 flex flex-col gap-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <SelectField label="Tuning" value={tuningKey} onChange={(v) => { setTuningKey(v); setActive(null); }}>
          {SIX_STRING_TUNINGS.map((t) => (
            <option key={t.key} value={t.key}>
              {t.name} ({t.notes})
            </option>
          ))}
        </SelectField>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => saveResults({})}
            className="inline-flex items-center gap-1.5 rounded-full border border-line-strong bg-surface/60 px-4 py-2 text-sm font-semibold text-ink-muted hover:text-ink transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Clear results
          </button>
          <button
            type="button"
            onClick={() => (audio.isActive ? (stopAudioCapture(), setActive(null)) : void requestMicrophone())}
            className={cn(
              "inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-bold transition-colors",
              audio.isActive ? "bg-off/20 border border-off/40 text-off" : "bg-brass text-brass-contrast hover:bg-brass-hover",
            )}
          >
            {audio.isActive ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            {audio.isActive ? "Stop microphone" : "Start microphone"}
          </button>
        </div>
      </div>

      {audio.permission === "denied" && (
        <p className="rounded-xl border border-off/40 bg-off/10 px-4 py-3 text-sm text-off">
          Microphone access was blocked. Allow it in your browser&apos;s site settings and try again.
        </p>
      )}
      {message && (
        <p role="status" className="rounded-xl border border-brass/40 bg-brass/10 px-4 py-3 text-sm text-ink">
          {message}
        </p>
      )}

      {/* Live capture panel */}
      {active && (
        <div className="rounded-3xl border border-brass/40 bg-brass/5 p-5 sm:p-6" role="status" aria-live="polite">
          <p className="eyebrow mb-1">{stringLabel(active.string)}</p>
          <p className="text-xl font-bold text-ink">
            {waiting
              ? "Got it. Mute the string — get ready to fret the 12th…"
              : active.phase === "harmonic"
              ? "Play the 12th-fret harmonic and let it ring"
              : "Now fret the 12th fret normally and let it ring"}
          </p>
          <p className="mt-1 text-sm text-ink-muted">
            {active.phase === "harmonic"
              ? "Touch the string lightly directly above the 12th fret wire — don't press it down — pluck, then lift your finger."
              : "Press just behind the 12th fret with normal pressure. Don't bend or squeeze harder than you would when playing."}
          </p>
          <div className="mt-4 flex items-center gap-4">
            <div className="h-2 flex-1 rounded-full bg-surface-sunken overflow-hidden">
              <div className="h-full bg-brass transition-[width] duration-100" style={{ width: `${Math.min(100, (live?.progress ?? 0) * 100)}%` }} />
            </div>
            <span className="w-20 text-right font-mono text-sm tabular-nums text-ink">
              {live && Math.abs(live.cents) <= WINDOW_CENTS ? fmt(live.cents) : "listening"}
            </span>
          </div>
          {live && Math.abs(live.cents) > WINDOW_CENTS && (
            <p className="mt-2 text-xs text-off">
              Hearing {midiNoteName(frequencyToMidi(live.frequency))} — that is not this string&apos;s 12th fret.
              Check you are playing the right string, and that it is roughly in tune.
            </p>
          )}
          <p className="mt-2 text-2xs text-ink-subtle">
            Target {midiNoteName(tuning.midi[active.string] + 12)} · {midiToFrequency(tuning.midi[active.string] + 12).toFixed(1)} Hz
          </p>
        </div>
      )}

      {/* Per-string cards */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {[5, 4, 3, 2, 1, 0].map((i) => {
          const r = results[i] ?? {};
          const done = r.harmonic !== undefined && r.fretted !== undefined;
          const diff = done ? r.fretted! - r.harmonic! : null;
          const v = diff !== null ? verdict(diff) : null;
          const busy = active?.string === i;
          return (
            <div
              key={i}
              className={cn(
                "rounded-2xl border p-4 transition-colors",
                busy ? "border-brass bg-brass/5" : v?.tone === "good" ? "border-in-tune/40" : v ? "border-off/40" : "border-line bg-surface/40",
              )}
            >
              <div className="flex items-baseline justify-between">
                <p className="font-bold text-ink">{stringLabel(i)}</p>
                {diff !== null && (
                  <span className={cn("font-mono text-sm font-bold tabular-nums", v?.tone === "good" ? "text-in-tune" : "text-off")}>
                    {fmt(diff)}
                  </span>
                )}
              </div>
              <dl className="mt-2 grid grid-cols-2 gap-2 text-xs">
                <div>
                  <dt className="text-ink-subtle">Harmonic</dt>
                  <dd className="font-mono tabular-nums text-ink">{r.harmonic !== undefined ? fmt(r.harmonic) : "—"}</dd>
                </div>
                <div>
                  <dt className="text-ink-subtle">Fretted 12th</dt>
                  <dd className="font-mono tabular-nums text-ink">{r.fretted !== undefined ? fmt(r.fretted) : "—"}</dd>
                </div>
              </dl>
              {v && <p className={cn("mt-2 text-xs leading-relaxed", v.tone === "good" ? "text-in-tune" : "text-ink")}>{v.text}</p>}
              <button
                type="button"
                disabled={busy}
                onClick={() => begin(i, "harmonic")}
                className="mt-3 w-full rounded-xl border border-line-strong bg-surface/60 px-3 py-2 text-sm font-semibold text-ink hover:border-brass/50 hover:text-brass transition-colors disabled:opacity-50"
              >
                {busy ? "Listening…" : done ? "Check again" : "Check this string"}
              </button>
            </div>
          );
        })}
      </div>
      <p className="text-2xs text-ink-subtle">
        The harmonic reading also tells you whether the open string is in tune: if it is far from 0¢, tune up
        first with the tuner. What matters for intonation is the difference between the two readings.
        Results are kept on this device for each tuning.
      </p>
    </div>
  );
}
