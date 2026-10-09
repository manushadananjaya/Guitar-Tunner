"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Play, ArrowRight, Flame, Trophy, Timer } from "lucide-react";
import { cn } from "@/lib/utils";
import { getAudioContext, pluck } from "@/lib/synth";
import { OPEN_STRING_MIDI } from "@/lib/chords";
import { logPractice } from "@/lib/practiceLog";
import { Fretboard, type FretMark } from "@/components/Fretboard/Fretboard";
import { Segmented } from "@/components/Segmented";

type Mode = "name" | "find";
type Range = "open" | "low" | "mid" | "full";

const RANGES: Record<Range, { label: string; frets: [number, number] }> = {
  open: { label: "Frets 0–5", frets: [0, 5] },
  low: { label: "Frets 0–12", frets: [0, 12] },
  mid: { label: "Frets 5–12", frets: [5, 12] },
  full: { label: "Whole neck", frets: [0, 15] },
};

const FRET_COUNT = 15;
const STRING_NAMES = ["E", "A", "D", "G", "B", "e"];
/** Sharps and flats both shown — a guitarist reads both. */
const PITCH_LABELS = ["C", "C♯/D♭", "D", "D♯/E♭", "E", "F", "F♯/G♭", "G", "G♯/A♭", "A", "A♯/B♭", "B"];
const NATURALS = [0, 2, 4, 5, 7, 9, 11];
const STORAGE_KEY = "gtp-fretboard-trainer";

const mod12 = (n: number) => ((n % 12) + 12) % 12;
const pitchAt = (string: number, fret: number) => mod12(OPEN_STRING_MIDI[string] + fret);

interface Stats {
  bestStreak: number;
  /** string index → [correct, asked] */
  byString: Record<string, [number, number]>;
}

function loadStats(): Stats {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? (JSON.parse(raw) as Partial<Stats>) : {};
    return {
      bestStreak: typeof parsed.bestStreak === "number" ? parsed.bestStreak : 0,
      byString: parsed.byString && typeof parsed.byString === "object" ? parsed.byString : {},
    };
  } catch {
    return { bestStreak: 0, byString: {} };
  }
}

function saveStats(stats: Stats) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  } catch {
    // Storage blocked — the session still works.
  }
}

interface Question {
  string: number;
  /** For "name it": the fret shown. For "find it": unused. */
  fret: number;
  pitch: number;
}

export function FretboardTrainer() {
  const [mode, setMode] = useState<Mode>("name");
  const [range, setRange] = useState<Range>("open");
  const [strings, setStrings] = useState<number[]>([0, 1, 2, 3, 4, 5]);
  const [naturalsOnly, setNaturalsOnly] = useState(true);
  const [sound, setSound] = useState(true);

  const [question, setQuestion] = useState<Question | null>(null);
  /** Pitch chosen (name mode) or fret tapped (find mode). */
  const [answer, setAnswer] = useState<{ pitch: number; fret?: number } | null>(null);
  const [session, setSession] = useState({ correct: 0, asked: 0, streak: 0, totalMs: 0 });
  const [stats, setStats] = useState<Stats>({ bestStreak: 0, byString: {} });
  const askedAt = useRef(0);

  useEffect(() => setStats(loadStats()), []);

  const [lo, hi] = RANGES[range].frets;

  const playNote = useCallback(
    (string: number, fret: number) => {
      if (!sound) return;
      const ctx = getAudioContext();
      pluck(ctx, OPEN_STRING_MIDI[string] + fret, ctx.currentTime + 0.01, 0.25, 1.2);
    },
    [sound],
  );

  const next = useCallback(() => {
    // Every (string, fret) cell in range whose note is allowed.
    const pool: Question[] = [];
    for (const string of strings) {
      for (let fret = lo; fret <= hi; fret++) {
        const pitch = pitchAt(string, fret);
        if (naturalsOnly && !NATURALS.includes(pitch)) continue;
        pool.push({ string, fret, pitch });
      }
    }
    if (pool.length === 0) return;
    let q = pool[Math.floor(Math.random() * pool.length)];
    // Never ask the exact same thing twice in a row.
    if (question && pool.length > 1) {
      while (q.string === question.string && q.pitch === question.pitch) {
        q = pool[Math.floor(Math.random() * pool.length)];
      }
    }
    setQuestion(q);
    setAnswer(null);
    askedAt.current = performance.now();
    if (mode === "name") playNote(q.string, q.fret);
  }, [strings, lo, hi, naturalsOnly, question, mode, playNote]);

  // A settings change starts a new round.
  useEffect(() => {
    setQuestion(null);
    setAnswer(null);
    setSession({ correct: 0, asked: 0, streak: 0, totalMs: 0 });
  }, [mode, range, strings, naturalsOnly]);

  const submit = useCallback(
    (pitch: number, fret?: number) => {
      if (!question || answer) return;
      const correct = pitch === question.pitch;
      const ms = performance.now() - askedAt.current;
      setAnswer({ pitch, fret });
      if (fret !== undefined) playNote(question.string, fret);

      const streak = correct ? session.streak + 1 : 0;
      setSession((s) => ({
        correct: s.correct + (correct ? 1 : 0),
        asked: s.asked + 1,
        streak,
        totalMs: s.totalMs + ms,
      }));
      setStats((prev) => {
        const key = String(question.string);
        const [c, n] = prev.byString[key] ?? [0, 0];
        const nextStats = {
          bestStreak: Math.max(prev.bestStreak, streak),
          byString: { ...prev.byString, [key]: [c + (correct ? 1 : 0), n + 1] as [number, number] },
        };
        saveStats(nextStats);
        return nextStats;
      });
      logPractice("fretboard-trainer");
    },
    [question, answer, session.streak, playNote],
  );

  // Keyboard: letters A–G answer naturals in "name it"; N / Enter advances.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "SELECT")) return;
      const key = event.key.toUpperCase();
      if ((key === "N" || key === "ENTER") && (!question || answer)) {
        event.preventDefault();
        next();
      } else if (mode === "name" && question && !answer && "CDEFGAB".includes(key) && key.length === 1) {
        submit(NATURALS["CDEFGAB".indexOf(key)]);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });

  const toggleString = (s: number) =>
    setStrings((prev) =>
      prev.includes(s) ? (prev.length > 1 ? prev.filter((x) => x !== s) : prev) : [...prev, s].sort(),
    );

  const marks = useMemo<FretMark[]>(() => {
    if (!question) return [];
    if (mode === "name") {
      const variant = !answer ? "prompt" : answer.pitch === question.pitch ? "correct" : "wrong";
      return [
        {
          string: question.string,
          fret: question.fret,
          variant,
          label: answer ? PITCH_LABELS[question.pitch].split("/")[0] : "?",
        },
      ];
    }
    if (!answer) return [];
    // Find mode: show every correct spot on that string, and the miss if any.
    const out: FretMark[] = [];
    for (let fret = lo; fret <= hi; fret++) {
      if (pitchAt(question.string, fret) === question.pitch) {
        out.push({ string: question.string, fret, variant: "correct", label: PITCH_LABELS[question.pitch].split("/")[0] });
      }
    }
    if (answer.fret !== undefined && answer.pitch !== question.pitch) {
      out.push({ string: question.string, fret: answer.fret, variant: "wrong", label: PITCH_LABELS[answer.pitch].split("/")[0] });
    }
    return out;
  }, [question, answer, mode, lo, hi]);

  const answerOptions = naturalsOnly ? NATURALS : Array.from({ length: 12 }, (_, i) => i);
  const accuracy = session.asked > 0 ? Math.round((100 * session.correct) / session.asked) : null;
  const avgSeconds = session.asked > 0 ? (session.totalMs / session.asked / 1000).toFixed(1) : null;
  const isRight = answer && question && answer.pitch === question.pitch;

  const stringStats = [0, 1, 2, 3, 4, 5]
    .map((s) => {
      const [c, n] = stats.byString[String(s)] ?? [0, 0];
      return { s, c, n };
    })
    .filter((x) => x.n > 0);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 flex flex-col gap-5">
      {/* Settings */}
      <div className="flex flex-wrap items-center gap-3">
        <Segmented<Mode>
          label="Mode"
          value={mode}
          onChange={setMode}
          items={[
            { value: "name", label: "Name the note" },
            { value: "find", label: "Find the note" },
          ]}
        />
        <Segmented<Range>
          label="Fret range"
          value={range}
          onChange={setRange}
          items={(Object.keys(RANGES) as Range[]).map((r) => ({ value: r, label: RANGES[r].label }))}
        />
        <div role="group" aria-label="Strings" className="flex gap-1 rounded-xl border border-line bg-surface/40 p-1">
          {[0, 1, 2, 3, 4, 5].map((s) => (
            <button
              key={s}
              type="button"
              aria-pressed={strings.includes(s)}
              aria-label={`String ${6 - s} (${STRING_NAMES[s]})`}
              onClick={() => toggleString(s)}
              className={cn(
                "w-8 rounded-lg py-1.5 text-xs font-mono font-semibold transition-colors",
                strings.includes(s) ? "bg-brass text-brass-contrast" : "text-ink-subtle hover:text-ink",
              )}
            >
              {STRING_NAMES[s]}
            </button>
          ))}
        </div>
        <label className="inline-flex items-center gap-2 text-xs font-semibold text-ink-muted">
          <input type="checkbox" checked={naturalsOnly} onChange={(e) => setNaturalsOnly(e.target.checked)} className="accent-[var(--accent)]" />
          Natural notes only
        </label>
        <label className="inline-flex items-center gap-2 text-xs font-semibold text-ink-muted">
          <input type="checkbox" checked={sound} onChange={(e) => setSound(e.target.checked)} className="accent-[var(--accent)]" />
          Sound
        </label>
      </div>

      <div className="rounded-3xl border border-line bg-surface-sunken/30 p-4 sm:p-6 backdrop-blur-md shadow-2xl">
        {/* Scoreboard */}
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-bold uppercase tracking-[0.18em] text-ink-subtle mb-5">
          <span className="tabular-nums">
            {session.correct} / {session.asked}
            {accuracy !== null && <span className="text-ink-muted"> · {accuracy}%</span>}
          </span>
          <span className="inline-flex items-center gap-1.5 tabular-nums">
            <Timer className="h-3.5 w-3.5" />
            {avgSeconds ? `${avgSeconds}s avg` : "—"}
          </span>
          <span className="inline-flex items-center gap-1.5 tabular-nums">
            <Flame className={cn("h-3.5 w-3.5", session.streak >= 5 ? "text-brass" : "text-ink-subtle")} />
            {session.streak} streak
          </span>
          <span className="inline-flex items-center gap-1.5 tabular-nums">
            <Trophy className="h-3.5 w-3.5" />
            best {stats.bestStreak}
          </span>
        </div>

        {/* Prompt */}
        <div className="min-h-[3.5rem] text-center mb-4" role="status" aria-live="polite">
          {!question ? (
            <p className="text-lg text-ink-muted">
              {mode === "name"
                ? "A fret lights up. Name the note before you count."
                : "You get a note and a string. Tap where it is."}
            </p>
          ) : !answer ? (
            <p className="text-xl font-bold text-ink">
              {mode === "name" ? (
                <>What note is this?</>
              ) : (
                <>
                  Find <span className="text-brass">{PITCH_LABELS[question.pitch]}</span> on the{" "}
                  <span className="font-mono">{STRING_NAMES[question.string]}</span> string
                  <span className="text-ink-subtle text-sm font-semibold"> (string {6 - question.string})</span>
                </>
              )}
            </p>
          ) : isRight ? (
            <p className="text-xl font-bold text-in-tune">Correct — {PITCH_LABELS[question.pitch]}</p>
          ) : (
            <p className="text-xl font-bold text-off">
              {mode === "name"
                ? `Not quite — it was ${PITCH_LABELS[question.pitch]}`
                : `That was ${PITCH_LABELS[answer.pitch]}. ${PITCH_LABELS[question.pitch]} is shown in green.`}
            </p>
          )}
        </div>

        <Fretboard
          stringNames={STRING_NAMES}
          fretCount={FRET_COUNT}
          marks={marks}
          focus={[lo, hi]}
          onSelect={
            mode === "find" && question && !answer
              ? (string, fret) => {
                  if (fret < lo || fret > hi) return;
                  submit(pitchAt(string, fret), fret);
                }
              : undefined
          }
          clickableStrings={question ? [question.string] : []}
          ariaLabel="Fretboard trainer"
          describe={(string, fret) => `String ${6 - string}, fret ${fret}`}
        />

        {/* Answers (name mode) */}
        {mode === "name" && question && (
          <div className={cn("mt-5 grid gap-2", naturalsOnly ? "grid-cols-4 sm:grid-cols-7" : "grid-cols-4 sm:grid-cols-6")}>
            {answerOptions.map((pitch) => {
              const isAnswer = pitch === question.pitch;
              const isChosen = answer?.pitch === pitch;
              return (
                <button
                  key={pitch}
                  type="button"
                  disabled={!!answer}
                  onClick={() => submit(pitch)}
                  className={cn(
                    "rounded-xl border px-2 py-3 text-sm font-bold transition-colors disabled:cursor-default",
                    !answer
                      ? "border-line-strong bg-surface/60 text-ink hover:border-brass/50 hover:text-brass"
                      : isAnswer
                        ? "border-in-tune bg-in-tune/15 text-in-tune"
                        : isChosen
                          ? "border-off bg-off/15 text-off"
                          : "border-line text-ink-subtle opacity-60",
                  )}
                >
                  {PITCH_LABELS[pitch]}
                </button>
              );
            })}
          </div>
        )}

        <div className="mt-5 flex justify-center">
          <button
            type="button"
            onClick={next}
            className={cn(
              "inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-bold transition-colors",
              !question || answer
                ? "bg-brass text-brass-contrast hover:bg-brass-hover"
                : "border border-line-strong bg-surface/60 text-ink-muted hover:text-ink",
            )}
          >
            {!question ? <Play className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
            {!question ? "Start" : answer ? "Next (N)" : "Skip"}
          </button>
        </div>
      </div>

      {stringStats.length > 0 && (
        <div className="rounded-2xl border border-line bg-surface/40 px-5 py-4">
          <p className="eyebrow mb-3">Accuracy by string (all sessions)</p>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {stringStats.map(({ s, c, n }) => {
              const pct = Math.round((100 * c) / n);
              return (
                <div key={s}>
                  <div className="flex items-baseline justify-between text-xs">
                    <span className="font-mono font-semibold text-ink">{STRING_NAMES[s]}</span>
                    <span className="tabular-nums text-ink-muted">{pct}%</span>
                  </div>
                  <div className="mt-1 h-1.5 rounded-full bg-surface-sunken overflow-hidden">
                    <div
                      className={cn("h-full rounded-full", pct >= 85 ? "bg-in-tune" : pct >= 60 ? "bg-brass" : "bg-off")}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <p className="mt-0.5 text-2xs text-ink-subtle tabular-nums">{n} answered</p>
                </div>
              );
            })}
          </div>
          <p className="mt-3 text-2xs text-ink-subtle">Stored on this device only.</p>
        </div>
      )}
    </div>
  );
}
