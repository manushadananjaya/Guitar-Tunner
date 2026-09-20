"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Play, RotateCcw, ArrowRight, Flame, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import { strum, playMelody } from "@/lib/synth";
import { INTERVALS, type Interval } from "@/lib/intervals";
import { QUALITIES, type ChordQuality } from "@/lib/chords/theory";
import { midiNoteName } from "@/lib/tuningMidi";

type Mode = "intervals" | "chords";
type Level = "beginner" | "intermediate" | "advanced";
type Direction = "ascending" | "descending" | "harmonic" | "mixed";
type Voicing = "strum" | "arpeggio" | "mixed";

/** Which intervals each level draws from. Beginner is the consonant set a
 *  guitarist already knows from tuning and power chords. */
const INTERVAL_LEVELS: Record<Level, number[]> = {
  beginner: [3, 4, 5, 7, 12],
  intermediate: [1, 2, 3, 4, 5, 7, 8, 9, 12],
  advanced: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
};

const CHORD_LEVELS: Record<Level, string[]> = {
  beginner: ["major", "minor"],
  intermediate: ["major", "minor", "dim", "aug", "sus4"],
  advanced: ["major", "minor", "dim", "aug", "sus2", "sus4", "7", "maj7", "m7"],
};

/** Lowest and highest root, so every question stays inside guitar range. */
const ROOT_MIN = 45; // A2
const ROOT_MAX = 64; // E4

const STORAGE_KEY = "gtp-ear-training";

interface Stats {
  bestStreak: number;
  /** answer id → [correct, asked] */
  byAnswer: Record<string, [number, number]>;
}

const emptyStats = (): Stats => ({ bestStreak: 0, byAnswer: {} });

function loadStats(): Stats {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyStats();
    const parsed = JSON.parse(raw) as Partial<Stats>;
    return {
      bestStreak: typeof parsed.bestStreak === "number" ? parsed.bestStreak : 0,
      byAnswer: parsed.byAnswer && typeof parsed.byAnswer === "object" ? parsed.byAnswer : {},
    };
  } catch {
    return emptyStats();
  }
}

function saveStats(stats: Stats) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  } catch {
    // Private mode or blocked storage: the session still works, it just
    // won't remember.
  }
}

interface Question {
  /** Answer id: interval semitones as a string, or a chord quality slug. */
  answer: string;
  /** MIDI notes to play, low to high. */
  notes: number[];
  /** Whether the notes are played together or in sequence. */
  together: boolean;
  /** For intervals: ascending or descending, which changes the note order. */
  descending: boolean;
}

const randomItem = <T,>(items: T[]) => items[Math.floor(Math.random() * items.length)];
const randomRoot = () => ROOT_MIN + Math.floor(Math.random() * (ROOT_MAX - ROOT_MIN + 1));

function makeQuestion(
  mode: Mode,
  level: Level,
  direction: Direction,
  voicing: Voicing,
  avoid?: string,
): Question {
  if (mode === "intervals") {
    let pool = INTERVAL_LEVELS[level];
    if (pool.length > 1 && avoid) pool = pool.filter((s) => String(s) !== avoid);
    const semitones = randomItem(pool);
    const dir =
      direction === "mixed"
        ? randomItem<Direction>(["ascending", "descending", "harmonic"])
        : direction;
    const root = randomRoot();
    const descending = dir === "descending";
    // A descending interval starts on the upper note, so drop the root
    // instead of raising it and keep everything inside the range.
    const notes = descending
      ? [root, root - semitones]
      : [root, root + semitones];
    return {
      answer: String(semitones),
      notes,
      together: dir === "harmonic",
      descending,
    };
  }

  let pool = CHORD_LEVELS[level];
  if (pool.length > 1 && avoid) pool = pool.filter((slug) => slug !== avoid);
  const quality = QUALITIES.find((q) => q.slug === randomItem(pool))!;
  const root = randomRoot() - 7; // chords stack upward, so start lower
  const notes = quality.tones.map((tone) => root + tone.semitones);
  const together =
    voicing === "mixed" ? Math.random() < 0.5 : voicing === "strum";
  return { answer: quality.slug, notes, together, descending: false };
}

export function EarTrainer() {
  const [mode, setMode] = useState<Mode>("intervals");
  const [level, setLevel] = useState<Level>("beginner");
  const [direction, setDirection] = useState<Direction>("ascending");
  const [voicing, setVoicing] = useState<Voicing>("strum");

  const [question, setQuestion] = useState<Question | null>(null);
  const [chosen, setChosen] = useState<string | null>(null);
  const [session, setSession] = useState({ correct: 0, asked: 0, streak: 0 });
  const [stats, setStats] = useState<Stats>(emptyStats);
  const [isPlaying, setIsPlaying] = useState(false);
  const playTimeout = useRef<number | null>(null);

  useEffect(() => {
    setStats(loadStats());
  }, []);

  const play = useCallback((q: Question) => {
    const seconds = q.together ? strum(q.notes, 0.02) : playMelody(q.notes);
    setIsPlaying(true);
    if (playTimeout.current !== null) window.clearTimeout(playTimeout.current);
    playTimeout.current = window.setTimeout(() => setIsPlaying(false), seconds * 1000);
  }, []);

  const next = useCallback(() => {
    const q = makeQuestion(mode, level, direction, voicing, question?.answer);
    setQuestion(q);
    setChosen(null);
    play(q);
  }, [mode, level, direction, voicing, question, play]);

  // Changing any setting starts a fresh question so the options match.
  useEffect(() => {
    setQuestion(null);
    setChosen(null);
    setSession({ correct: 0, asked: 0, streak: 0 });
  }, [mode, level, direction, voicing]);

  const answer = useCallback(
    (id: string) => {
      if (!question || chosen !== null) return;
      setChosen(id);
      const correct = id === question.answer;

      setSession((s) => ({
        correct: s.correct + (correct ? 1 : 0),
        asked: s.asked + 1,
        streak: correct ? s.streak + 1 : 0,
      }));

      setStats((prev) => {
        const streak = correct ? session.streak + 1 : 0;
        const key = `${mode}:${question.answer}`;
        const [c, n] = prev.byAnswer[key] ?? [0, 0];
        const nextStats: Stats = {
          bestStreak: Math.max(prev.bestStreak, streak),
          byAnswer: { ...prev.byAnswer, [key]: [c + (correct ? 1 : 0), n + 1] },
        };
        saveStats(nextStats);
        return nextStats;
      });
    },
    [question, chosen, mode, session.streak],
  );

  const options = useMemo<{ id: string; label: string; short?: string }[]>(() => {
    if (mode === "intervals") {
      return INTERVAL_LEVELS[level].map((s) => {
        const interval = INTERVALS.find((i) => i.semitones === s) as Interval;
        return { id: String(s), label: interval.name, short: interval.short };
      });
    }
    return CHORD_LEVELS[level].map((slug) => {
      const quality = QUALITIES.find((q) => q.slug === slug) as ChordQuality;
      return { id: slug, label: quality.name, short: quality.suffix || "maj" };
    });
  }, [mode, level]);

  // Keyboard: R replays, N or Enter advances, 1–9 answer.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "SELECT")) return;
      if (event.key === "r" || event.key === "R") {
        if (question) play(question);
      } else if (event.key === "n" || event.key === "N" || event.key === "Enter") {
        if (!question || chosen !== null) next();
      } else if (/^[1-9]$/.test(event.key)) {
        const option = options[Number(event.key) - 1];
        if (option) answer(option.id);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });

  const correctOption = question ? options.find((o) => o.id === question.answer) : null;
  const cue =
    question && mode === "intervals"
      ? INTERVALS.find((i) => String(i.semitones) === question.answer)
      : null;

  // Weak spots: answers with at least 4 attempts, worst accuracy first.
  const weakSpots = useMemo(() => {
    return Object.entries(stats.byAnswer)
      .filter(([key, [, n]]) => key.startsWith(`${mode}:`) && n >= 4)
      .map(([key, [c, n]]) => {
        const id = key.slice(mode.length + 1);
        const label =
          mode === "intervals"
            ? INTERVALS.find((i) => String(i.semitones) === id)?.name
            : QUALITIES.find((q) => q.slug === id)?.name;
        return { id, label: label ?? id, accuracy: c / n, asked: n };
      })
      .filter((w) => w.accuracy < 0.8)
      .sort((a, b) => a.accuracy - b.accuracy)
      .slice(0, 4);
  }, [stats, mode]);

  // Stats come from localStorage in an effect and start empty, so the first
  // render is deterministic and needs no mount gate to match the server.

  const accuracy = session.asked > 0 ? Math.round((100 * session.correct) / session.asked) : null;

  const segmented = <T extends string>(
    value: T,
    setValue: (v: T) => void,
    items: { value: T; label: string }[],
    label: string,
  ) => (
    <div role="group" aria-label={label} className="flex flex-wrap gap-1 rounded-xl border border-line bg-surface/40 p-1">
      {items.map((item) => (
        <button
          key={item.value}
          type="button"
          aria-pressed={value === item.value}
          onClick={() => setValue(item.value)}
          className={cn(
            "rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors",
            value === item.value
              ? "bg-brass text-brass-contrast"
              : "text-ink-muted hover:text-ink hover:bg-surface-raised/60",
          )}
        >
          {item.label}
        </button>
      ))}
    </div>
  );

  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 flex flex-col gap-5">
      {/* Settings */}
      <div className="flex flex-wrap items-center gap-3">
        {segmented<Mode>(mode, setMode, [
          { value: "intervals", label: "Intervals" },
          { value: "chords", label: "Chord types" },
        ], "Mode")}
        {segmented<Level>(level, setLevel, [
          { value: "beginner", label: "Beginner" },
          { value: "intermediate", label: "Intermediate" },
          { value: "advanced", label: "Advanced" },
        ], "Level")}
        {mode === "intervals"
          ? segmented<Direction>(direction, setDirection, [
              { value: "ascending", label: "Up" },
              { value: "descending", label: "Down" },
              { value: "harmonic", label: "Together" },
              { value: "mixed", label: "Mixed" },
            ], "Direction")
          : segmented<Voicing>(voicing, setVoicing, [
              { value: "strum", label: "Strummed" },
              { value: "arpeggio", label: "Arpeggio" },
              { value: "mixed", label: "Mixed" },
            ], "Voicing")}
      </div>

      {/* Stage */}
      <div className="rounded-3xl border border-line bg-surface-sunken/30 p-6 sm:p-10 backdrop-blur-md shadow-2xl">
        {/* Scoreboard */}
        <div className="flex items-center justify-between gap-4 text-xs font-bold uppercase tracking-[0.18em] text-ink-subtle mb-8">
          <span className="tabular-nums">
            {session.correct} / {session.asked}
            {accuracy !== null && <span className="text-ink-muted"> · {accuracy}%</span>}
          </span>
          <span className="inline-flex items-center gap-1.5 tabular-nums">
            <Flame className={cn("h-3.5 w-3.5", session.streak >= 3 ? "text-brass" : "text-ink-subtle")} />
            {session.streak} streak
          </span>
          <span className="inline-flex items-center gap-1.5 tabular-nums">
            <Trophy className="h-3.5 w-3.5" />
            best {stats.bestStreak}
          </span>
        </div>

        {!question ? (
          <div className="text-center py-6">
            <p className="text-lg text-ink-muted mb-6">
              {mode === "intervals"
                ? "You'll hear two notes. Name the distance between them."
                : "You'll hear a chord. Name its type."}
            </p>
            <button
              type="button"
              onClick={next}
              className="inline-flex items-center gap-2 rounded-full bg-brass px-7 py-3 text-sm font-bold text-brass-contrast hover:bg-brass-hover transition-colors"
            >
              <Play className="h-4 w-4" />
              Start
            </button>
          </div>
        ) : (
          <>
            {/* Feedback line — reserved height so the buttons don't jump */}
            <div className="min-h-[3.5rem] text-center mb-6" role="status" aria-live="polite">
              {chosen === null ? (
                <p className="text-sm text-ink-muted">
                  {mode === "intervals"
                    ? question.together
                      ? "Both notes together."
                      : question.descending
                        ? "Two notes, going down."
                        : "Two notes, going up."
                    : question.together
                      ? "Strummed."
                      : "Played one note at a time, low to high."}
                </p>
              ) : chosen === question.answer ? (
                <p className="text-xl font-bold text-in-tune">
                  Correct — {correctOption?.label}
                </p>
              ) : (
                <div>
                  <p className="text-xl font-bold text-off">
                    Not quite — it was {correctOption?.label}
                  </p>
                  {cue && (
                    <p className="mt-1 text-sm text-ink-muted">
                      Think of{" "}
                      <em>{question.descending ? cue.descendingCue : cue.ascendingCue}</em>
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Answers */}
            <div
              className={cn(
                "grid gap-2",
                options.length <= 5 ? "grid-cols-2 sm:grid-cols-5" : "grid-cols-3 sm:grid-cols-4",
              )}
            >
              {options.map((option, i) => {
                const isAnswer = option.id === question.answer;
                const isChosen = option.id === chosen;
                return (
                  <button
                    key={option.id}
                    type="button"
                    disabled={chosen !== null}
                    onClick={() => answer(option.id)}
                    className={cn(
                      "rounded-xl border px-2 py-3 text-sm font-semibold transition-colors disabled:cursor-default",
                      chosen === null
                        ? "border-line-strong bg-surface/60 text-ink hover:border-brass/50 hover:text-brass"
                        : isAnswer
                          ? "border-in-tune bg-in-tune/15 text-in-tune"
                          : isChosen
                            ? "border-off bg-off/15 text-off"
                            : "border-line text-ink-subtle opacity-60",
                    )}
                  >
                    <span className="block">{option.label}</span>
                    <span className="block text-2xs font-mono text-ink-subtle mt-0.5">
                      {i + 1} · {option.short}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Transport */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => play(question)}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
                  isPlaying
                    ? "border-brass/60 bg-brass/20 text-brass-hover"
                    : "border-line-strong bg-surface/60 text-ink hover:border-brass/50 hover:text-brass",
                )}
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Replay (R)
              </button>
              <button
                type="button"
                onClick={next}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full px-5 py-2 text-sm font-bold transition-colors",
                  chosen !== null
                    ? "bg-brass text-brass-contrast hover:bg-brass-hover"
                    : "border border-line-strong bg-surface/60 text-ink-muted hover:text-ink",
                )}
              >
                {chosen !== null ? "Next (N)" : "Skip"}
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>

            {chosen !== null && (
              <p className="mt-4 text-center text-2xs text-ink-subtle font-mono">
                {question.notes.map(midiNoteName).join(question.together ? " + " : " → ")}
              </p>
            )}
          </>
        )}
      </div>

      {weakSpots.length > 0 && (
        <div className="rounded-2xl border border-line bg-surface/40 px-5 py-4">
          <p className="eyebrow mb-2">Your weak spots</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-1 text-sm">
            {weakSpots.map((w) => (
              <li key={w.id} className="text-ink-muted">
                <span className="font-semibold text-ink">{w.label}</span>{" "}
                <span className="tabular-nums">{Math.round(w.accuracy * 100)}%</span>
                <span className="text-ink-subtle"> of {w.asked}</span>
              </li>
            ))}
          </ul>
          <p className="mt-2 text-2xs text-ink-subtle">
            Tracked on this device only. Nothing is sent anywhere.
          </p>
        </div>
      )}
    </div>
  );
}
