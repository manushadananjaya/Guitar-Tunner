"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Play, Pause, Check, SkipForward, ExternalLink, Flame, Trophy, CalendarDays, Clock, PartyPopper } from "lucide-react";
import { cn } from "@/lib/utils";
import { strum } from "@/lib/synth";
import { chordMidi } from "@/lib/music/libraryChord";
import {
  loadLog,
  logPractice,
  currentStreak,
  bestStreak,
  dateKey,
  dayIndex,
  type PracticeLog,
} from "@/lib/practiceLog";
import { ROUTINES, dailyPicks, type Routine } from "@/lib/practiceRoutines";
import ChordDiagram from "@/components/Chords/ChordDiagram";
import { Segmented } from "@/components/Segmented";
import { ShareStreak } from "@/components/PracticeRoutine/ShareStreak";

const WEEKS = 12;
const ROUTINE_KEY = "gtp-practice-routine";

const fmtClock = (ms: number) => {
  const total = Math.max(0, Math.ceil(ms / 1000));
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, "0")}`;
};

/** Practice calendar: one cell per day for the last WEEKS weeks, Monday-first. */
function Heatmap({ log, today }: { log: PracticeLog; today: Date }) {
  const days = useMemo(() => {
    const end = new Date(today);
    // Start on the Monday WEEKS-1 weeks before this week's Monday.
    const start = new Date(today);
    const weekday = (start.getDay() + 6) % 7;
    start.setDate(start.getDate() - weekday - (WEEKS - 1) * 7);
    const out: { key: string; date: Date; future: boolean }[] = [];
    for (let d = new Date(start); out.length < WEEKS * 7; d.setDate(d.getDate() + 1)) {
      out.push({ key: dateKey(d), date: new Date(d), future: d > end });
    }
    return out;
  }, [today]);

  const level = (key: string) => {
    const day = log[key];
    if (!day) return 0;
    if (day.routines > 0 || day.minutes >= 20) return 3;
    if (day.minutes >= 5 || day.activities.length >= 2) return 2;
    return 1;
  };

  return (
    <div>
      <div
        className="grid grid-flow-col gap-1"
        style={{ gridTemplateRows: "repeat(7, auto)", gridTemplateColumns: `repeat(${WEEKS}, minmax(0, 1fr))` }}
      >
        {days.map(({ key, date, future }) => {
          const l = level(key);
          const day = log[key];
          return (
            <div
              key={key}
              title={
                future
                  ? ""
                  : `${date.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" })}: ${
                      day ? `${Math.round(day.minutes)} min timed · ${day.activities.length} tool${day.activities.length === 1 ? "" : "s"}` : "no practice"
                    }`
              }
              className={cn(
                "aspect-square w-full rounded-[3px]",
                future
                  ? "bg-transparent"
                  : l === 0
                    ? "bg-surface-sunken"
                    : l === 1
                      ? "bg-brass/30"
                      : l === 2
                        ? "bg-brass/60"
                        : "bg-brass",
                key === dateKey(today) && "ring-1 ring-ink-muted",
              )}
            />
          );
        })}
      </div>
      <div className="mt-2 flex items-center justify-end gap-1 text-2xs text-ink-subtle">
        less
        <span className="h-2.5 w-2.5 rounded-[3px] bg-surface-sunken" />
        <span className="h-2.5 w-2.5 rounded-[3px] bg-brass/30" />
        <span className="h-2.5 w-2.5 rounded-[3px] bg-brass/60" />
        <span className="h-2.5 w-2.5 rounded-[3px] bg-brass" />
        more
      </div>
    </div>
  );
}

export function PracticeRoutine() {
  const [log, setLog] = useState<PracticeLog>({});
  const [today, setToday] = useState<Date | null>(null);
  const [routineId, setRoutineId] = useState<Routine["id"]>("quick");
  const [active, setActive] = useState(0);
  const [done, setDone] = useState<number[]>([]);
  const [running, setRunning] = useState(false);
  const [remaining, setRemaining] = useState(0);
  const endAtRef = useRef(0);
  /** Milliseconds actually practised on the active step, for the log. */
  const spentRef = useRef(0);
  const lastTickRef = useRef(0);
  const practisedStepsRef = useRef(0);

  const routine = ROUTINES.find((r) => r.id === routineId)!;
  const picks = useMemo(() => (today ? dailyPicks(dayIndex(today)) : null), [today]);
  const finished = done.length === routine.steps.length;

  // Everything date- or storage-dependent loads after mount, so the server
  // render and the first client render agree.
  useEffect(() => {
    setLog(loadLog());
    setToday(new Date());
    try {
      const saved = window.localStorage.getItem(ROUTINE_KEY);
      if (saved && ROUTINES.some((r) => r.id === saved)) setRoutineId(saved as Routine["id"]);
    } catch {
      // Storage blocked.
    }
  }, []);

  // A fresh routine resets progress and the timer.
  useEffect(() => {
    setActive(0);
    setDone([]);
    setRunning(false);
    setRemaining(routine.steps[0].minutes * 60_000);
    spentRef.current = 0;
    practisedStepsRef.current = 0;
    try {
      window.localStorage.setItem(ROUTINE_KEY, routineId);
    } catch {
      // Ignore.
    }
  }, [routineId, routine]);

  const completeStep = useCallback(
    (index: number, skipped = false) => {
      setRunning(false);
      let nextLog: PracticeLog | null = null;
      // A skipped step is not practice, so it neither logs time nor counts
      // toward the day.
      if (!skipped) {
        nextLog = logPractice("routine", { minutes: spentRef.current / 60_000 });
        practisedStepsRef.current++;
      }
      spentRef.current = 0;

      const nextDone = done.includes(index) ? done : [...done, index];
      if (nextDone.length === routine.steps.length && done.length < routine.steps.length && practisedStepsRef.current > 0) {
        nextLog = logPractice("routine", { routineComplete: true });
      }
      setDone(nextDone);
      const nextIndex = routine.steps.findIndex((_, i) => !nextDone.includes(i));
      if (nextIndex >= 0) {
        setActive(nextIndex);
        setRemaining(routine.steps[nextIndex].minutes * 60_000);
      }
      if (nextLog) setLog(nextLog);
    },
    [routine, done],
  );

  // The timer runs off wall-clock time, so a throttled background tab
  // catches up instead of drifting.
  useEffect(() => {
    if (!running) return;
    lastTickRef.current = Date.now();
    const id = window.setInterval(() => {
      const now = Date.now();
      spentRef.current += now - lastTickRef.current;
      lastTickRef.current = now;
      const left = endAtRef.current - now;
      setRemaining(left);
      if (left <= 0) {
        // Chime: today's chord, so the sound means something.
        if (picks) strum(chordMidi(picks.chordA));
        completeStep(active);
      }
    }, 250);
    return () => window.clearInterval(id);
  }, [running, active, completeStep, picks]);

  const toggleTimer = () => {
    if (running) {
      setRunning(false);
    } else {
      endAtRef.current = Date.now() + remaining;
      setRunning(true);
    }
  };

  const selectStep = (i: number) => {
    if (i === active) return;
    setRunning(false);
    spentRef.current = 0;
    setActive(i);
    setRemaining(routine.steps[i].minutes * 60_000);
  };

  const streak = today ? currentStreak(log, today) : 0;
  const best = bestStreak(log);
  const last30 = today
    ? Array.from({ length: 30 }, (_, i) => {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        return log[dateKey(d)] ? 1 : 0;
      }).reduce<number>((a, b) => a + b, 0)
    : 0;
  const totalMinutes = Math.round(Object.values(log).reduce((sum, d) => sum + (d.minutes || 0), 0));
  const practisedToday = today ? !!log[dateKey(today)] : false;

  const stats = [
    { icon: Flame, label: "Current streak", value: `${streak} day${streak === 1 ? "" : "s"}`, hot: streak >= 3 },
    { icon: Trophy, label: "Best streak", value: `${best} day${best === 1 ? "" : "s"}` },
    { icon: CalendarDays, label: "Last 30 days", value: `${last30} day${last30 === 1 ? "" : "s"}` },
    { icon: Clock, label: "Timed practice", value: `${totalMinutes} min` },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 flex flex-col gap-5">
      {/* Stats + calendar */}
      <div className="grid gap-4 lg:grid-cols-[1fr_auto]">
        <div className="grid grid-cols-2 gap-3">
          {stats.map(({ icon: Icon, label, value, hot }) => (
            <div key={label} className="rounded-2xl border border-line bg-surface/40 p-4">
              <p className="eyebrow flex items-center gap-1.5">
                <Icon className={cn("h-3.5 w-3.5", hot ? "text-brass" : "")} />
                {label}
              </p>
              <p className="mt-1 text-2xl font-bold text-ink tabular-nums">{value}</p>
            </div>
          ))}
        </div>
        <div className="rounded-2xl border border-line bg-surface/40 p-4 lg:w-[19rem]">
          <p className="eyebrow mb-3">Last {WEEKS} weeks</p>
          {today ? <Heatmap log={log} today={today} /> : <div className="h-32" />}
        </div>
      </div>

      {today && !practisedToday && streak > 0 && (
        <p className="rounded-xl border border-brass/40 bg-brass/10 px-4 py-3 text-sm text-ink">
          Your {streak}-day streak is still alive — finish any step today to keep it going.
        </p>
      )}

      {today && practisedToday && streak >= 2 && !finished && (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-line bg-surface/40 px-4 py-3">
          <p className="text-sm text-ink">
            <Flame className="inline h-4 w-4 text-brass -mt-0.5" /> {streak} days in a row. Worth showing off.
          </p>
          <ShareStreak days={streak} best={best} last30={last30} />
        </div>
      )}

      {/* Today's picks */}
      <div className="rounded-3xl border border-line bg-surface-sunken/30 p-5 sm:p-6 backdrop-blur-md shadow-2xl">
        <p className="eyebrow mb-4">
          Today&apos;s picks
          {today && <span className="normal-case tracking-normal font-normal"> · {today.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" })}</span>}
        </p>
        {picks ? (
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-line bg-surface/40 p-4">
              <p className="text-2xs font-bold uppercase tracking-widest text-brass mb-2">Chord change</p>
              <div className="flex items-start justify-center gap-3">
                {[picks.chordA, picks.chordB].map((chord) => (
                  <button
                    key={chord.slug}
                    type="button"
                    onClick={() => strum(chordMidi(chord))}
                    aria-label={`Play ${chord.name}`}
                    className="flex-1 max-w-[96px] rounded-xl p-1 hover:bg-brass/5 transition-colors"
                  >
                    <ChordDiagram voicing={chord.voicings[0]} title={`${chord.name} chord diagram`} className="w-full text-ink" />
                    <span className="block text-center font-bold text-ink">{chord.name}</span>
                  </button>
                ))}
              </div>
            </div>
            <Link href={picks.scale.href} className="group rounded-2xl border border-line bg-surface/40 p-4 hover:border-brass/40 transition-colors">
              <p className="text-2xs font-bold uppercase tracking-widest text-brass mb-2">Scale</p>
              <p className="text-xl font-bold text-ink group-hover:text-brass transition-colors">
                {picks.scale.rootName} {picks.scale.scale.name}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-ink-muted">{picks.scale.scale.character}</p>
            </Link>
            <Link href={`/strumming-patterns?pattern=${picks.pattern.id}`} className="group rounded-2xl border border-line bg-surface/40 p-4 hover:border-brass/40 transition-colors">
              <p className="text-2xs font-bold uppercase tracking-widest text-brass mb-2">Strumming pattern</p>
              <p className="text-xl font-bold text-ink group-hover:text-brass transition-colors">{picks.pattern.name}</p>
              <p className="mt-2 font-mono text-sm tracking-[0.3em] text-ink-muted">
                {picks.pattern.slots.replace(/-/g, "·").replace(/D/g, "↓").replace(/U/g, "↑").replace(/x/g, "✕")}
              </p>
            </Link>
          </div>
        ) : (
          <div className="h-40" />
        )}
      </div>

      {/* Routine */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-bold text-ink">Today&apos;s routine</h2>
        <Segmented<Routine["id"]>
          label="Routine length"
          value={routineId}
          onChange={setRoutineId}
          items={ROUTINES.map((r) => ({ value: r.id, label: r.name }))}
        />
      </div>

      {finished && (
        <div className="rounded-3xl border border-in-tune/40 bg-in-tune/10 p-6 text-center">
          <PartyPopper className="mx-auto h-8 w-8 text-in-tune" />
          <p className="mt-2 text-xl font-bold text-ink">Routine done — {streak} day streak.</p>
          <p className="mt-1 text-sm text-ink-muted">
            Logged on this device. Tomorrow brings a new chord pair, scale, and pattern.
          </p>
          <div className="mt-4 flex justify-center">
            <ShareStreak days={streak} best={best} last30={last30} />
          </div>
        </div>
      )}

      <ol className="flex flex-col gap-2">
        {routine.steps.map((step, i) => {
          const isActive = i === active && !finished;
          const isDone = done.includes(i);
          const href = step.href?.(picks);
          return (
            <li
              key={step.id}
              className={cn(
                "rounded-2xl border transition-colors",
                isActive ? "border-brass bg-brass/5" : isDone ? "border-in-tune/30 bg-in-tune/5" : "border-line bg-surface/40",
              )}
            >
              <button
                type="button"
                onClick={() => selectStep(i)}
                aria-expanded={isActive}
                className="flex w-full items-center gap-3 px-4 py-3 text-left"
              >
                <span
                  className={cn(
                    "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold",
                    isDone ? "bg-in-tune text-white" : isActive ? "bg-brass text-brass-contrast" : "bg-surface-sunken text-ink-muted",
                  )}
                >
                  {isDone ? <Check className="h-4 w-4" /> : i + 1}
                </span>
                <span className={cn("flex-1 font-semibold", isDone ? "text-ink-muted" : "text-ink")}>{step.title}</span>
                <span className="text-xs tabular-nums text-ink-subtle">{step.minutes} min</span>
              </button>
              {isActive && (
                <div className="px-4 pb-4 sm:pl-14">
                  <p className="text-sm leading-relaxed text-ink-muted">{step.instructions(picks)}</p>
                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <span className="font-mono text-3xl font-bold tabular-nums text-ink w-20" aria-live="off">
                      {fmtClock(remaining)}
                    </span>
                    <button
                      type="button"
                      onClick={toggleTimer}
                      className="inline-flex items-center gap-1.5 rounded-full bg-brass px-5 py-2 text-sm font-bold text-brass-contrast hover:bg-brass-hover transition-colors"
                    >
                      {running ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                      {running ? "Pause" : "Start"}
                    </button>
                    <button
                      type="button"
                      onClick={() => completeStep(i)}
                      className="inline-flex items-center gap-1.5 rounded-full border border-line-strong bg-surface/60 px-4 py-2 text-sm font-semibold text-ink hover:border-in-tune/50 hover:text-in-tune transition-colors"
                    >
                      <Check className="h-4 w-4" />
                      Done
                    </button>
                    <button
                      type="button"
                      onClick={() => completeStep(i, true)}
                      className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold text-ink-subtle hover:text-ink transition-colors"
                    >
                      <SkipForward className="h-4 w-4" />
                      Skip
                    </button>
                    {href && (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener"
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-brass hover:text-brass-hover"
                      >
                        {step.linkLabel}
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                  {href && (
                    <p className="mt-2 text-2xs text-ink-subtle">Tools open in a new tab, so this timer keeps running.</p>
                  )}
                </div>
              )}
            </li>
          );
        })}
      </ol>
      <p className="text-2xs text-ink-subtle">
        Your streak and calendar are stored in this browser only — no account, nothing sent anywhere. Using the ear
        trainer, fretboard trainer, scale explorer, strumming trainer, or progression builder also counts as a practice day.{" "}
        <Link href="/my-progress" className="font-semibold text-brass hover:text-brass-hover">Move your streak to another device</Link>
      </p>
    </div>
  );
}
