"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Mic, Square, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { accumulateChroma, rankKeys, type KeyScore } from "@/lib/music/keyFinder";
import { guessKey, parseChordList } from "@/lib/music/transpose";
import { keyName, keyTonic, spellingName, type KeyMode } from "@/lib/music/scales";
import { ROOTS } from "@/lib/chords";
import { Segmented } from "@/components/Segmented";

type Mode = "listen" | "chords";

const PITCH_LABELS = ["C", "C♯", "D", "E♭", "E", "F", "F♯", "G", "A♭", "A", "B♭", "B"];
const mod12 = (n: number) => ((n % 12) + 12) % 12;

/** Seconds of audio before a guess is worth showing. */
const MIN_SECONDS = 4;
const FRAME_MS = 100;

const relative = (pc: number, mode: KeyMode) =>
  mode === "major"
    ? { pitchClass: mod12(pc + 9), mode: "minor" as const }
    : { pitchClass: mod12(pc + 3), mode: "major" as const };

function scaleHref(pc: number, mode: KeyMode) {
  const root = ROOTS.find((r) => r.pitchClass === pc)!;
  return `/scales?root=${root.slug}&scale=${mode === "major" ? "major" : "natural-minor"}`;
}

function KeyResult({ pitchClass, mode, detail }: { pitchClass: number; mode: KeyMode; detail: string }) {
  const rel = relative(pitchClass, mode);
  return (
    <div className="rounded-2xl border border-brass/40 bg-brass/10 p-5">
      <p className="eyebrow mb-1">Most likely key</p>
      <p className="text-3xl sm:text-4xl font-bold text-ink">{keyName(pitchClass, mode)}</p>
      <p className="mt-1 text-sm text-ink-muted">{detail}</p>
      <p className="mt-3 text-sm text-ink-muted">
        Relative {rel.mode}: <strong className="text-ink">{keyName(rel.pitchClass, rel.mode)}</strong> — same
        notes, different home chord. If the song feels like it resolves to{" "}
        {spellingName(keyTonic(rel.pitchClass, rel.mode))}
        {rel.mode === "minor" ? "m" : ""}, that is the key instead.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <Link
          href={scaleHref(pitchClass, mode)}
          className="rounded-full bg-brass px-4 py-2 text-sm font-bold text-brass-contrast hover:bg-brass-hover transition-colors"
        >
          See the scale
        </Link>
        <Link
          href="/circle-of-fifths"
          className="rounded-full border border-line-strong px-4 py-2 text-sm font-semibold text-ink hover:border-brass/50 hover:text-brass transition-colors"
        >
          Chords in this key
        </Link>
        <Link
          href="/capo-calculator"
          className="rounded-full border border-line-strong px-4 py-2 text-sm font-semibold text-ink hover:border-brass/50 hover:text-brass transition-colors"
        >
          Find a capo position
        </Link>
      </div>
    </div>
  );
}

function ListenPanel() {
  const [listening, setListening] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Running totals live in a ref and are copied into state once a frame,
  // so the audio loop never depends on React having re-rendered.
  const totals = useRef({ chroma: new Array(12).fill(0) as number[], frames: 0 });
  const [{ chroma, frames }, setSnapshot] = useState(() => ({
    chroma: new Array(12).fill(0) as number[],
    frames: 0,
  }));
  const [level, setLevel] = useState(0);
  const stopRef = useRef<(() => void) | null>(null);

  const stop = useCallback(() => {
    stopRef.current?.();
    stopRef.current = null;
    setListening(false);
    setLevel(0);
  }, []);

  useEffect(() => stop, [stop]);

  const start = async () => {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false },
      });
      const Ctor =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new Ctor();
      const source = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 8192;
      analyser.smoothingTimeConstant = 0;
      source.connect(analyser);
      const spectrum = new Float32Array(analyser.frequencyBinCount);

      const timer = window.setInterval(() => {
        analyser.getFloatFrequencyData(spectrum);
        let peak = -Infinity;
        for (let i = 0; i < spectrum.length; i++) peak = Math.max(peak, spectrum[i]);
        setLevel(Math.max(0, Math.min(1, (peak + 90) / 60)));
        if (accumulateChroma(totals.current.chroma, spectrum, ctx.sampleRate)) {
          totals.current.frames += 1;
          setSnapshot({ chroma: [...totals.current.chroma], frames: totals.current.frames });
        }
      }, FRAME_MS);

      stopRef.current = () => {
        window.clearInterval(timer);
        stream.getTracks().forEach((track) => track.stop());
        void ctx.close();
      };
      setListening(true);
    } catch (err) {
      const name = err instanceof Error ? err.name : "";
      setError(
        name === "NotAllowedError"
          ? "Microphone access was blocked. Allow it in your browser's site settings, or use the chords tab instead."
          : "Could not start the microphone on this device. Try another browser, or use the chords tab instead.",
      );
    }
  };

  const reset = () => {
    totals.current = { chroma: new Array(12).fill(0), frames: 0 };
    setSnapshot({ chroma: new Array(12).fill(0), frames: 0 });
  };

  const seconds = (frames * FRAME_MS) / 1000;
  const ranked: KeyScore[] = useMemo(() => (frames > 0 ? rankKeys(chroma) : []), [chroma, frames]);
  const best = seconds >= MIN_SECONDS ? ranked[0] : undefined;
  const max = Math.max(...chroma, 1e-9);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={listening ? stop : start}
          className={cn(
            "inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition-colors",
            listening
              ? "border border-brass/60 bg-brass/20 text-brass-hover"
              : "bg-brass text-brass-contrast hover:bg-brass-hover",
          )}
        >
          {listening ? <Square className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          {listening ? "Stop listening" : "Start listening"}
        </button>
        <button
          type="button"
          onClick={reset}
          disabled={frames === 0}
          className="inline-flex items-center gap-2 rounded-full border border-line-strong px-4 py-2.5 text-sm font-semibold text-ink hover:border-brass/50 hover:text-brass transition-colors disabled:opacity-40"
        >
          <RotateCcw className="h-4 w-4" />
          Start over
        </button>
        <span className="font-mono text-sm tabular-nums text-ink-muted" aria-live="polite">
          {seconds.toFixed(1)} s heard
        </span>
        {listening && (
          <span className="h-2 w-24 overflow-hidden rounded-full bg-surface-sunken" aria-hidden>
            <span className="block h-full bg-brass transition-[width]" style={{ width: `${level * 100}%` }} />
          </span>
        )}
      </div>

      {error && (
        <p role="alert" className="rounded-xl border border-off/40 bg-off/10 px-4 py-3 text-sm text-ink">
          {error}
        </p>
      )}

      <div>
        <p className="eyebrow mb-2">What it has heard</p>
        <div className="grid grid-cols-12 items-end gap-1 h-28" role="img" aria-label="How much of each note has been heard">
          {chroma.map((value, pc) => (
            <div key={pc} className="flex h-full flex-col items-center justify-end gap-1">
              <div
                className={cn(
                  "w-full rounded-t-md transition-[height]",
                  best && pc === best.pitchClass ? "bg-brass" : "bg-ink-subtle/40",
                )}
                style={{ height: `${Math.max(2, (value / max) * 100)}%` }}
              />
              <span className="font-mono text-2xs text-ink-subtle">{PITCH_LABELS[pc]}</span>
            </div>
          ))}
        </div>
      </div>

      {best ? (
        <>
          <KeyResult
            pitchClass={best.pitchClass}
            mode={best.mode}
            detail={`Match ${Math.round(best.score * 100)}%${best.score < 0.6 ? " — low confidence, keep playing" : ""}.`}
          />
          <div>
            <p className="eyebrow mb-2">Next most likely</p>
            <ul className="flex flex-wrap gap-2">
              {ranked.slice(1, 4).map((k) => (
                <li
                  key={`${k.pitchClass}-${k.mode}`}
                  className="rounded-xl border border-line px-3 py-1.5 text-sm text-ink"
                >
                  {keyName(k.pitchClass, k.mode)}{" "}
                  <span className="font-mono text-2xs text-ink-subtle">{Math.round(k.score * 100)}%</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <p className="rounded-2xl border border-line bg-surface/40 p-5 text-sm text-ink-muted">
          {listening
            ? `Keep playing — a guess appears after ${MIN_SECONDS} seconds of sound, and gets better the longer you play.`
            : "Press Start listening, then play the song on your instrument or from a speaker near the microphone. Chords, a melody or a whole recording all work."}
        </p>
      )}
    </div>
  );
}

function ChordsPanel() {
  const [input, setInput] = useState("G D Em C");
  const chords = useMemo(() => parseChordList(input), [input]);
  const key = useMemo(() => guessKey(chords), [chords]);

  return (
    <div className="flex flex-col gap-5">
      <label className="flex flex-col gap-2">
        <span className="eyebrow">Song chords</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          spellCheck={false}
          placeholder="e.g. Am F C G"
          className="w-full rounded-xl border border-line-strong bg-surface/60 px-4 py-3 font-mono text-base text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass/60"
        />
        <span className="text-xs text-ink-subtle">
          Separate chords with spaces or commas. Write them as they appear in the song, starting with the first.
        </span>
      </label>
      {key ? (
        <KeyResult
          pitchClass={key.pitchClass}
          mode={key.mode}
          detail={`${Math.round(key.fit * 100)}% of the chords you typed belong to this key.${
            key.fit < 0.75 ? " Several do not, so the song may borrow chords or change key." : ""
          }`}
        />
      ) : (
        <p className="rounded-2xl border border-line bg-surface/40 p-5 text-sm text-ink-muted">
          Type at least one chord, such as <span className="font-mono">Am</span> or{" "}
          <span className="font-mono">F#m7</span>.
        </p>
      )}
    </div>
  );
}

export function KeyFinder() {
  const [mode, setMode] = useState<Mode>("listen");
  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6">
      <div className="rounded-3xl border border-line bg-surface-sunken/30 p-5 sm:p-8 backdrop-blur-md shadow-2xl">
        <Segmented<Mode>
          label="How to find the key"
          value={mode}
          onChange={setMode}
          className="mb-6 w-fit"
          items={[
            { value: "listen", label: "Listen with the microphone" },
            { value: "chords", label: "Type the chords" },
          ]}
        />
        {mode === "listen" ? <ListenPanel /> : <ChordsPanel />}
      </div>
    </div>
  );
}
