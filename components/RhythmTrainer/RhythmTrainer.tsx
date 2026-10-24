"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Play, Square, Timer, RotateCcw, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { getAudioContext } from "@/lib/synth";
import { logPractice } from "@/lib/practiceLog";
import { Segmented } from "@/components/Segmented";
import {
  PERFECT_MS,
  RHYTHMS,
  countLabel,
  getRhythm,
  scoreRound,
  type Rhythm,
  type RoundResult,
} from "@/lib/rhythms";

/** Beats in a scored round: four bars of 4/4. */
const ROUND_BEATS = 16;
const COUNT_IN = 4;
const CALIBRATION_CLICKS = 8;
const CALIBRATION_BPM = 90;
const STORAGE_KEY = "gtp-rhythm-trainer";

type Phase = "idle" | "count-in" | "playing" | "done" | "calibrating";

interface Saved {
  /** Measured tap-to-sound delay for this device, ms. */
  latencyMs?: number;
  best: Record<string, { score: number; bpm: number }>;
}

function load(): Saved {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "null");
    if (parsed && typeof parsed === "object") return { best: {}, ...parsed };
  } catch {
    // fall through
  }
  return { best: {} };
}

function save(data: Saved) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Storage blocked: the trainer works, it just forgets.
  }
}

/** Metronome click, routed through `dest` so a round can be cut at once. */
function tick(ctx: AudioContext, dest: AudioNode, at: number, accent: boolean) {
  const osc = ctx.createOscillator();
  const amp = ctx.createGain();
  osc.type = "square";
  osc.frequency.setValueAtTime(accent ? 1600 : 1000, at);
  amp.gain.setValueAtTime(0.0001, at);
  amp.gain.exponentialRampToValueAtTime(accent ? 0.3 : 0.18, at + 0.002);
  amp.gain.exponentialRampToValueAtTime(0.0001, at + 0.04);
  osc.connect(amp);
  amp.connect(dest);
  osc.start(at);
  osc.stop(at + 0.05);
}

/** The rhythm itself: a woody, lower "tok", distinct from the click. */
function tok(ctx: AudioContext, dest: AudioNode, at: number) {
  const osc = ctx.createOscillator();
  const amp = ctx.createGain();
  osc.type = "triangle";
  osc.frequency.setValueAtTime(620, at);
  osc.frequency.exponentialRampToValueAtTime(420, at + 0.06);
  amp.gain.setValueAtTime(0.0001, at);
  amp.gain.exponentialRampToValueAtTime(0.45, at + 0.003);
  amp.gain.exponentialRampToValueAtTime(0.0001, at + 0.09);
  osc.connect(amp);
  amp.connect(dest);
  osc.start(at);
  osc.stop(at + 0.1);
}

const median = (values: number[]) => {
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
};

/** Targets for a round, in beats from its start. */
const roundOnsets = (rhythm: Rhythm) =>
  Array.from({ length: ROUND_BEATS / rhythm.beats }, (_, c) => rhythm.onsets.map((o) => c * rhythm.beats + o)).flat();

function errorClass(errorMs: number | null) {
  if (errorMs === null) return "text-ink-subtle";
  const e = Math.abs(errorMs);
  return e <= PERFECT_MS ? "text-in-tune" : e <= 60 ? "text-near" : "text-off";
}

/** Four rows, one per bar: beat lines, the notes to tap, and your taps. */
function Timeline({
  onsets,
  taps,
  result,
  position,
}: {
  onsets: number[];
  /** Tap times in beats. */
  taps: number[];
  result: RoundResult | null;
  /** Playhead in beats, or null. */
  position: number | null;
}) {
  const W = 400;
  const ROW = 42;
  const PAD = 10;
  /** Centre line of a bar's row; the first row has room under it for the count. */
  const rowY = (bar: number) => bar * ROW + 18 + (bar > 0 ? 8 : 0);
  const x = (beatInBar: number) => PAD + (beatInBar / 4) * (W - 2 * PAD);
  const bars = ROUND_BEATS / 4;
  return (
    <svg viewBox={`0 0 ${W} ${bars * ROW + 12}`} className="w-full text-ink" role="img" aria-label="Rhythm timeline">
      {Array.from({ length: bars }, (_, bar) => {
        const y = rowY(bar);
        return (
          <g key={bar}>
            <line x1={PAD} x2={W - PAD} y1={y} y2={y} className="text-line-strong" stroke="currentColor" />
            {[0, 1, 2, 3, 4].map((b) => (
              <line key={b} x1={x(b)} x2={x(b)} y1={y - 9} y2={y + 9} className="text-line" stroke="currentColor" />
            ))}
          </g>
        );
      })}
      {onsets.map((onset, i) => {
        const bar = Math.floor(onset / 4);
        const y = rowY(bar);
        const hit = result?.hits[i];
        return (
          <g key={`t${i}`}>
            <rect
              x={x(onset - bar * 4) - 2}
              y={y - 8}
              width={4}
              height={16}
              rx={1}
              className={hit ? errorClass(hit.errorMs) : "text-brass"}
              fill="currentColor"
              opacity={hit && hit.errorMs === null ? 0.35 : 1}
            />
            {bar === 0 && (
              <text x={x(onset)} y={y + 19} textAnchor="middle" fontSize={8} className="text-ink-subtle" fill="currentColor">
                {countLabel(onset)}
              </text>
            )}
          </g>
        );
      })}
      {taps
        .filter((t) => t >= -0.25 && t < ROUND_BEATS)
        .map((t, i) => {
          const bar = Math.max(0, Math.floor(t / 4));
          return (
            <circle key={`p${i}`} cx={x(t - bar * 4)} cy={rowY(bar) - 13} r={3} className="text-ink" fill="currentColor" />
          );
        })}
      {position !== null && position >= 0 && position < ROUND_BEATS && (
        <line
          x1={x(position % 4)}
          x2={x(position % 4)}
          y1={rowY(Math.floor(position / 4)) - 16}
          y2={rowY(Math.floor(position / 4)) + 11}
          className="text-brass"
          stroke="currentColor"
          strokeWidth={1.5}
        />
      )}
    </svg>
  );
}

export function RhythmTrainer() {
  const [rhythmId, setRhythmId] = useState(RHYTHMS[0].id);
  const rhythm = getRhythm(rhythmId);
  const [bpm, setBpm] = useState(rhythm.bpm);
  const [guide, setGuide] = useState(true);
  const [phase, setPhase] = useState<Phase>("idle");
  const [countIn, setCountIn] = useState(0);
  const [position, setPosition] = useState<number | null>(null);
  const [tapBeats, setTapBeats] = useState<number[]>([]);
  const [result, setResult] = useState<RoundResult | null>(null);
  const [saved, setSaved] = useState<Saved>({ best: {} });
  const [calibration, setCalibration] = useState<string | null>(null);

  const master = useRef<GainNode | null>(null);
  const raf = useRef<number | null>(null);
  /** Audio time of beat 0 of the scored part (after the count-in). */
  const t0 = useRef(0);
  const spb = useRef(60 / bpm);
  const taps = useRef<number[]>([]);
  const phaseRef = useRef<Phase>("idle");
  phaseRef.current = phase;

  useEffect(() => setSaved(load()), []);

  // Deep links: ?rhythm=eighths&bpm=70
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("rhythm");
    if (id && RHYTHMS.some((r) => r.id === id)) {
      setRhythmId(id);
      setBpm(getRhythm(id).bpm);
    }
    const requested = Number(params.get("bpm"));
    if (Number.isFinite(requested) && requested >= 40 && requested <= 200) setBpm(Math.round(requested));
  }, []);

  const onsets = useMemo(() => roundOnsets(rhythm), [rhythm]);

  const halt = useCallback(() => {
    if (raf.current !== null) cancelAnimationFrame(raf.current);
    raf.current = null;
    if (master.current) {
      const ctx = getAudioContext();
      master.current.gain.setTargetAtTime(0, ctx.currentTime, 0.01);
      const node = master.current;
      window.setTimeout(() => node.disconnect(), 100);
      master.current = null;
    }
  }, []);

  useEffect(() => halt, [halt]);

  const stop = () => {
    halt();
    setPhase("idle");
    setPosition(null);
    setCountIn(0);
  };

  /** Schedule a count-in plus `beats` beats of clicks, and `notes` (in
   *  beats) on the rhythm sound. Returns the audio time of beat 0. */
  const schedule = (tempo: number, beats: number, notes: number[]) => {
    halt();
    const ctx = getAudioContext();
    const gain = ctx.createGain();
    gain.connect(ctx.destination);
    master.current = gain;
    const beat = 60 / tempo;
    spb.current = beat;
    const start = ctx.currentTime + 0.15 + COUNT_IN * beat;
    for (let i = -COUNT_IN; i < beats; i++) tick(ctx, gain, start + i * beat, i % 4 === 0);
    notes.forEach((n) => tok(ctx, gain, start + n * beat));
    t0.current = start;
    taps.current = [];
    setTapBeats([]);
    return { ctx, start, beat };
  };

  /** Drive the count-in and playhead; call `done` once the last beat has
   *  passed and late taps have had a moment to arrive. */
  const follow = (ctx: AudioContext, start: number, beat: number, beats: number, done: () => void) => {
    const loop = () => {
      const pos = (ctx.currentTime - start) / beat;
      if (pos < 0) {
        setCountIn(Math.min(COUNT_IN, Math.floor(pos + COUNT_IN) + 1));
      } else {
        if (phaseRef.current === "count-in") setPhase("playing");
        setCountIn(0);
        setPosition(pos);
      }
      if (pos > beats + 0.4) {
        raf.current = null;
        done();
        return;
      }
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);
  };

  const start = (tempo = bpm) => {
    setResult(null);
    setPhase("count-in");
    const s = schedule(tempo, ROUND_BEATS, guide ? onsets : []);
    follow(s.ctx, s.start, s.beat, ROUND_BEATS, () => {
      const targetSecs = onsets.map((o) => o * s.beat);
      // Taps are stored as heard-at times; correct them for output delay now.
      // Uncalibrated, use what the browser reports — read at the end of the
      // round because Chrome reports 0 until audio has been running a while.
      const latencySecs =
        (saved.latencyMs ?? ((s.ctx.outputLatency || 0) + (s.ctx.baseLatency || 0)) * 1000) / 1000;
      const corrected = taps.current.map((b) => b - latencySecs / s.beat);
      setTapBeats(corrected);
      // Taps during the count-in are warm-up, not extra notes.
      const tapSecs = corrected.filter((b) => b > -0.5).map((b) => b * s.beat);
      const r = scoreRound(targetSecs, tapSecs);
      setResult(r);
      setPhase("done");
      setPosition(null);
      halt();
      logPractice("rhythm-trainer");
      setSaved((prev) => {
        const best = prev.best[rhythm.id];
        if (best && best.score >= r.score) return prev;
        const next = { ...prev, best: { ...prev.best, [rhythm.id]: { score: r.score, bpm: tempo } } };
        save(next);
        return next;
      });
    });
  };

  const calibrate = () => {
    setResult(null);
    setCalibration(null);
    setPhase("calibrating");
    const s = schedule(CALIBRATION_BPM, CALIBRATION_CLICKS, []);
    follow(s.ctx, s.start, s.beat, CALIBRATION_CLICKS, () => {
      // Each tap's distance from the nearest click; the median ignores the
      // odd fumble.
      const offsets = taps.current
        .map((b) => (b - Math.round(b)) * s.beat * 1000)
        .filter((ms, i) => Math.abs(ms) < 250 && taps.current[i] > -0.5);
      halt();
      setPhase("idle");
      setPosition(null);
      if (offsets.length < 5) {
        setCalibration("Not enough taps to measure — try again and tap every click.");
        return;
      }
      const ms = Math.round(median(offsets));
      setCalibration(`Measured ${ms} ms. Taps are now corrected by that much.`);
      setSaved((prev) => {
        const next = { ...prev, latencyMs: ms };
        save(next);
        return next;
      });
    });
  };

  const resetCalibration = () => {
    setSaved((prev) => {
      const next = { ...prev };
      delete next.latencyMs;
      save(next);
      return next;
    });
    setCalibration("Calibration cleared.");
  };

  /** A tap, timed by the event's own timestamp rather than when the
   *  handler happened to run. Output delay is corrected when scoring. */
  const tap = useCallback((eventTimeStamp: number) => {
    const p = phaseRef.current;
    if (p !== "count-in" && p !== "playing" && p !== "calibrating") return;
    const ctx = getAudioContext();
    const handlerDelay = Math.max(0, performance.now() - eventTimeStamp) / 1000;
    const at = ctx.currentTime - handlerDelay;
    const beatPos = (at - t0.current) / spb.current;
    taps.current.push(beatPos);
    setTapBeats([...taps.current]);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && ["INPUT", "SELECT", "TEXTAREA"].includes(target.tagName)) return;
      if (event.repeat) return;
      if (event.key === " " || event.key === "j" || event.key === "f" || event.key === "Enter") {
        const active = phaseRef.current;
        if (active === "count-in" || active === "playing" || active === "calibrating") {
          event.preventDefault();
          tap(event.timeStamp);
        }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [tap]);

  const choose = (id: string) => {
    stop();
    setRhythmId(id);
    setBpm(getRhythm(id).bpm);
    setResult(null);
    setTapBeats([]);
  };

  const running = phase === "count-in" || phase === "playing" || phase === "calibrating";
  const best = saved.best[rhythm.id];

  const verdict = (r: RoundResult) => {
    if (r.hitCount === 0) return "No taps landed near the notes. Tap the pad or press Space on every note.";
    const lean = Math.abs(r.meanMs) < 8 ? "Right on the beat on average" : r.meanMs < 0 ? `Rushing by ${Math.round(-r.meanMs)} ms on average` : `Dragging by ${Math.round(r.meanMs)} ms on average`;
    return `${lean}, with a spread of ±${Math.round(r.spreadMs)} ms.`;
  };

  const advice = (r: RoundResult) => {
    if (r.score >= 90) return `Solid. Try it ${bpm + 5 <= 200 ? "5 BPM faster" : "again"}.`;
    if (r.hitCount < onsets.length * 0.75) return "Several notes were missed. Slow down 10 BPM and turn the rhythm guide on.";
    if (r.meanMs < -15) return "You are ahead of the click. Relax and let each note come to you — rushing is the most common timing habit.";
    if (r.meanMs > 15) return "You are behind the click. Anticipate slightly: start the motion before the beat, not on it.";
    if (r.spreadMs > 35) return "On average you are close, but uneven. Slow down until every note feels the same.";
    return "Close. Another round at this tempo should tighten it.";
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 flex flex-col gap-5">
      {/* Rhythm picker */}
      <div className="rounded-2xl border border-line bg-surface/40 p-4">
        <label htmlFor="rhythm-select" className="eyebrow mb-2 block">Rhythm</label>
        <select
          id="rhythm-select"
          value={rhythmId}
          onChange={(e) => choose(e.target.value)}
          disabled={running}
          className="w-full rounded-xl border border-line-strong bg-surface px-3 py-2.5 text-sm font-semibold text-ink"
        >
          {(["Beginner", "Intermediate", "Advanced"] as const).map((level) => (
            <optgroup key={level} label={level}>
              {RHYTHMS.filter((r) => r.level === level).map((r) => (
                <option key={r.id} value={r.id}>{r.name}</option>
              ))}
            </optgroup>
          ))}
        </select>
        <p className="mt-2 text-sm text-ink-muted leading-relaxed">{rhythm.description}</p>
        <p className="mt-2 font-mono text-xs text-ink-subtle">
          Count: {rhythm.onsets.map(countLabel).join(" ")}
          {rhythm.beats > 4 ? " (two bars)" : ""}
        </p>
      </div>

      <div className="rounded-3xl border border-line bg-surface-sunken/30 p-5 sm:p-8 backdrop-blur-md shadow-2xl">
        {/* Settings row */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
          <div className="flex items-center gap-3">
            <label htmlFor="rhythm-bpm" className="eyebrow">Tempo</label>
            <input
              id="rhythm-bpm"
              type="range"
              min={40}
              max={200}
              value={bpm}
              disabled={running}
              onChange={(e) => setBpm(Number(e.target.value))}
              className="w-32 sm:w-44 accent-[var(--accent)]"
            />
            <span className="font-mono text-sm font-bold text-ink tabular-nums w-16">{bpm} BPM</span>
          </div>
          <Segmented<"on" | "off">
            label="Rhythm guide"
            value={guide ? "on" : "off"}
            onChange={(v) => setGuide(v === "on")}
            items={[
              { value: "on", label: "Hear the rhythm" },
              { value: "off", label: "Click only" },
            ]}
          />
        </div>

        <Timeline onsets={onsets} taps={tapBeats} result={result} position={phase === "playing" ? position : null} />

        {/* Tap pad */}
        <button
          type="button"
          onPointerDown={(e) => {
            if (!running) return;
            e.preventDefault();
            tap(e.timeStamp);
          }}
          onClick={() => {
            if (!running) start();
          }}
          className={cn(
            "mt-5 w-full select-none touch-none rounded-2xl border-2 py-10 text-center transition-colors",
            running
              ? "border-brass bg-brass/10 active:bg-brass/25"
              : "border-line-strong bg-surface/60 hover:border-brass/50",
          )}
          aria-label={running ? "Tap pad" : "Start a round"}
        >
          {phase === "count-in" || (phase === "calibrating" && countIn > 0) ? (
            <span className="block text-5xl font-bold text-brass tabular-nums">{countIn || ""}</span>
          ) : running ? (
            <span className="block text-2xl font-bold text-ink">
              {phase === "calibrating" ? "Tap with every click" : "Tap"}
            </span>
          ) : (
            <span className="inline-flex items-center gap-2 text-lg font-bold text-ink">
              <Play className="h-5 w-5" /> {phase === "done" ? "Go again" : "Start"}
            </span>
          )}
          <span className="mt-1 block text-xs text-ink-subtle">
            {running ? "Tap here, or press Space" : "Four clicks count you in, then four bars to tap"}
          </span>
        </button>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          {running && (
            <button
              type="button"
              onClick={stop}
              className="inline-flex items-center gap-1.5 rounded-full border border-line-strong bg-surface/60 px-4 py-2 text-sm font-semibold text-ink hover:border-off/50 hover:text-off transition-colors"
            >
              <Square className="h-3.5 w-3.5" /> Stop
            </button>
          )}
        </div>

        {/* Results */}
        {result && phase === "done" && (
          <div className="mt-4 border-t border-line pt-5" role="status">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="eyebrow">Score</p>
                <p className="text-5xl font-bold text-ink tabular-nums leading-none mt-1">{result.score}</p>
              </div>
              <dl className="grid grid-cols-3 gap-4 text-right">
                <div>
                  <dt className="eyebrow">Notes hit</dt>
                  <dd className="font-mono font-bold text-ink tabular-nums">{result.hitCount}/{onsets.length}</dd>
                </div>
                <div>
                  <dt className="eyebrow">Average</dt>
                  <dd className="font-mono font-bold text-ink tabular-nums">
                    {result.hitCount ? `${result.meanMs >= 0 ? "+" : "−"}${Math.abs(Math.round(result.meanMs))} ms` : "—"}
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow">Spread</dt>
                  <dd className="font-mono font-bold text-ink tabular-nums">
                    {result.hitCount ? `±${Math.round(result.spreadMs)} ms` : "—"}
                  </dd>
                </div>
              </dl>
            </div>
            <p className="mt-4 text-sm text-ink">{verdict(result)}</p>
            <p className="mt-1 text-sm text-ink-muted">{advice(result)}</p>
            {result.extra > 0 && (
              <p className="mt-1 text-xs text-ink-subtle">{result.extra} extra tap{result.extra === 1 ? "" : "s"} between notes cost a little.</p>
            )}
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => start()}
                className="inline-flex items-center gap-1.5 rounded-full border border-line-strong bg-surface/60 px-4 py-2 text-sm font-semibold text-ink hover:border-brass/50 hover:text-brass transition-colors"
              >
                <RotateCcw className="h-3.5 w-3.5" /> Same again
              </button>
              {result.score >= 90 && bpm + 5 <= 200 && (
                <button
                  type="button"
                  onClick={() => {
                    setBpm(bpm + 5);
                    start(bpm + 5);
                  }}
                  className="inline-flex items-center gap-1.5 rounded-full bg-brass px-4 py-2 text-sm font-bold text-brass-contrast hover:bg-brass-hover transition-colors"
                >
                  <ArrowUp className="h-3.5 w-3.5" /> Try {bpm + 5} BPM
                </button>
              )}
            </div>
            <p className="mt-4 text-2xs text-ink-subtle">
              <span className="text-in-tune font-semibold">Green</span> within {PERFECT_MS} ms ·{" "}
              <span className="text-near font-semibold">amber</span> within 60 ms ·{" "}
              <span className="text-off font-semibold">red</span> further off · faded = missed. Dots are your taps.
            </p>
          </div>
        )}
        {best && (
          <p className="mt-4 text-center text-xs text-ink-subtle">
            Your best on this rhythm: <span className="font-semibold text-ink">{best.score}</span> at {best.bpm} BPM
          </p>
        )}
      </div>

      {/* Calibration */}
      <div className="rounded-2xl border border-line bg-surface/40 p-4 flex flex-wrap items-center justify-between gap-3">
        <div className="max-w-md">
          <p className="eyebrow flex items-center gap-1.5"><Timer className="h-3.5 w-3.5" /> Latency</p>
          <p className="mt-1 text-xs text-ink-muted leading-relaxed">
            {saved.latencyMs !== undefined
              ? `Calibrated: taps are shifted ${saved.latencyMs} ms to match what you hear.`
              : "Not calibrated. Speakers and especially Bluetooth headphones play sound late, which makes you look late. Calibrate once per device."}
          </p>
          {calibration && <p className="mt-1 text-xs font-semibold text-ink">{calibration}</p>}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={calibrate}
            disabled={running}
            className="rounded-full bg-brass px-4 py-2 text-sm font-bold text-brass-contrast hover:bg-brass-hover transition-colors disabled:opacity-50"
          >
            Calibrate (8 clicks)
          </button>
          {saved.latencyMs !== undefined && (
            <button
              type="button"
              onClick={resetCalibration}
              disabled={running}
              className="rounded-full border border-line-strong bg-surface/60 px-4 py-2 text-sm font-semibold text-ink hover:text-brass transition-colors disabled:opacity-50"
            >
              Reset
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
