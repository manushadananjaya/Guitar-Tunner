"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Play, ArrowRight, Flame, Trophy, Share2, Check, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { strum, playMelody } from "@/lib/synth";
import { logPractice } from "@/lib/practiceLog";
import {
  ROUNDS,
  buildChallenge,
  challengeNumber,
  challengeStats,
  loadResults,
  saveResults,
  shareText,
  type ChallengeResults,
  type ChallengeRound,
} from "@/lib/dailyChallenge";

const KIND_LABEL = { interval: "Interval", chord: "Chord type", fretboard: "Fretboard" } as const;

/** Time until local midnight, as h:mm:ss. */
function untilMidnight(now: Date) {
  const next = new Date(now);
  next.setHours(24, 0, 0, 0);
  const total = Math.max(0, Math.floor((next.getTime() - now.getTime()) / 1000));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  return { total, label: `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}` };
}

/** A strip of fretboard, frets 0–12, with the asked-about position marked.
 *  Drawn the way a player looks down at the neck: low E at the bottom. */
function FretboardStrip({ string, fret }: { string: number; fret: number }) {
  const W = 520;
  const H = 120;
  const left = 28;
  const fretW = (W - left - 8) / 12;
  const y = (s: number) => H - 14 - s * ((H - 28) / 5);
  const x = (f: number) => (f === 0 ? left - 12 : left + (f - 0.5) * fretW);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-lg mx-auto text-ink" role="img" aria-label={`Fret ${fret}, string ${6 - string}`}>
      <rect x={left - 3} y={y(5) - 4} width={4} height={y(0) - y(5) + 8} className="text-ink-muted" fill="currentColor" />
      {Array.from({ length: 12 }, (_, i) => (
        <line key={`f${i}`} x1={left + (i + 1) * fretW} y1={y(5)} x2={left + (i + 1) * fretW} y2={y(0)} className="text-line-strong" stroke="currentColor" />
      ))}
      {[3, 5, 7, 9].map((f) => (
        <circle key={`m${f}`} cx={x(f)} cy={(y(2) + y(3)) / 2} r={4} className="text-line-strong" fill="currentColor" />
      ))}
      <circle cx={x(12)} cy={(y(1) + y(2)) / 2} r={4} className="text-line-strong" fill="currentColor" />
      <circle cx={x(12)} cy={(y(3) + y(4)) / 2} r={4} className="text-line-strong" fill="currentColor" />
      {Array.from({ length: 6 }, (_, s) => (
        <line key={`s${s}`} x1={left} y1={y(s)} x2={W - 8} y2={y(s)} className="text-ink-subtle" stroke="currentColor" strokeWidth={0.8 + (5 - s) * 0.25} />
      ))}
      {Array.from({ length: 12 }, (_, i) => (
        <text key={`n${i}`} x={x(i + 1)} y={H - 1} textAnchor="middle" fontSize={9} className="text-ink-subtle" fill="currentColor">
          {i + 1}
        </text>
      ))}
      <circle cx={x(fret)} cy={y(string)} r={9} className="text-brass" fill="currentColor" />
    </svg>
  );
}

export function DailyChallenge() {
  // The date comes from the visitor's clock, so nothing date-dependent is
  // rendered on the server.
  const [now, setNow] = useState<Date | null>(null);
  // Fixed at load. `now` keeps ticking for the countdown, but a page left
  // open past midnight should offer the new challenge, not swap it in.
  const [number, setNumber] = useState<number | null>(null);
  const [results, setResults] = useState<ChallengeResults>({});
  const [started, setStarted] = useState(false);
  const [chosen, setChosen] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [shared, setShared] = useState<"copied" | "failed" | null>(null);
  const playTimeout = useRef<number | null>(null);

  useEffect(() => {
    const today = new Date();
    setNow(today);
    setNumber(challengeNumber(today));
    setResults(loadResults());
  }, []);

  const rounds = useMemo(() => (number !== null ? buildChallenge(number) : []), [number]);
  const answers = number !== null ? results[number] ?? [] : [];
  // Mid-answer the current round is the one just answered, so the reveal
  // stays on screen until "Next".
  const roundIndex = chosen !== null ? answers.length - 1 : answers.length;
  const finished = answers.length >= ROUNDS && chosen === null;
  const round: ChallengeRound | undefined = rounds[roundIndex];
  const stats = number !== null ? challengeStats(results, number) : null;

  // The countdown only ticks once there is nothing left to do today.
  useEffect(() => {
    if (!finished) return;
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, [finished]);

  const play = useCallback((r: ChallengeRound) => {
    const seconds = r.together ? strum(r.notes, 0.02) : playMelody(r.notes);
    setIsPlaying(true);
    if (playTimeout.current !== null) window.clearTimeout(playTimeout.current);
    playTimeout.current = window.setTimeout(() => setIsPlaying(false), seconds * 1000);
  }, []);

  const begin = () => {
    setStarted(true);
    if (round && round.kind !== "fretboard") play(round);
  };

  const answer = (id: string) => {
    if (!round || chosen !== null || number === null) return;
    setChosen(id);
    const next = { ...results, [number]: [...answers, id === round.answer] };
    setResults(next);
    saveResults(next);
    // Counts toward the practice streak on /practice-routine.
    logPractice("daily-challenge");
    if (round.kind === "fretboard") play(round);
  };

  const advance = () => {
    setChosen(null);
    const upcoming = rounds[answers.length];
    if (upcoming && upcoming.kind !== "fretboard") play(upcoming);
  };

  const share = async () => {
    if (number === null || !stats) return;
    const text = shareText(number, rounds, answers, stats.streak);
    try {
      if (navigator.share && window.matchMedia("(pointer: coarse)").matches) {
        await navigator.share({ text });
        return;
      }
      await navigator.clipboard.writeText(text);
      setShared("copied");
    } catch (error) {
      // Dismissing the share sheet is not a failure.
      if ((error as DOMException)?.name !== "AbortError") setShared("failed");
    }
    window.setTimeout(() => setShared(null), 2500);
  };

  // Keyboard: 1–4 answer, R replays, Enter or N moves on.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!started || finished || !round) return;
      if ((event.key === "r" || event.key === "R") && round.kind !== "fretboard") play(round);
      else if ((event.key === "Enter" || event.key === "n" || event.key === "N") && chosen !== null) advance();
      else if (/^[1-4]$/.test(event.key) && chosen === null) {
        const option = round.options[Number(event.key) - 1];
        if (option) answer(option.id);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });

  if (!now || number === null || !stats) {
    return <div className="w-full max-w-3xl mx-auto px-4 sm:px-6"><div className="h-[26rem] rounded-3xl border border-line bg-surface-sunken/30" /></div>;
  }

  const score = answers.filter(Boolean).length;
  const countdown = untilMidnight(now);
  // Opened the page before midnight and stayed: offer the new one.
  const stale = countdown.total === 0 || challengeNumber(now) !== number;
  const maxDistribution = Math.max(1, ...stats.distribution);
  const correctLabel = round?.options.find((o) => o.id === round.answer)?.label;

  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 flex flex-col gap-5">
      <div className="rounded-3xl border border-line bg-surface-sunken/30 p-6 sm:p-10 backdrop-blur-md shadow-2xl">
        {/* Header: number, progress squares, streak */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-ink-subtle">
            Challenge #{number}
            <span className="normal-case tracking-normal font-normal">
              {" "}· {now.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" })}
            </span>
          </p>
          <ol className="flex gap-1.5" aria-label="Progress">
            {Array.from({ length: ROUNDS }, (_, i) => (
              <li
                key={i}
                aria-label={i < answers.length ? (answers[i] ? `Round ${i + 1} correct` : `Round ${i + 1} wrong`) : `Round ${i + 1}`}
                className={cn(
                  "h-5 w-5 rounded-md border",
                  i < answers.length
                    ? answers[i]
                      ? "border-in-tune bg-in-tune"
                      : "border-off bg-off"
                    : i === roundIndex && started
                      ? "border-brass bg-brass/20"
                      : "border-line-strong bg-surface/60",
                )}
              />
            ))}
          </ol>
        </div>

        {finished ? (
          <div className="text-center">
            <p className="text-5xl font-bold text-ink tabular-nums">
              {score}/{ROUNDS}
            </p>
            <p className="mt-2 text-lg text-ink-muted">
              {score === ROUNDS
                ? "A perfect round."
                : score >= 3
                  ? "Good ears. Come back tomorrow for a new set."
                  : "Tricky one. Tomorrow is a fresh five."}
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              <button
                type="button"
                onClick={share}
                className="inline-flex items-center gap-2 rounded-full bg-brass px-6 py-3 text-sm font-bold text-brass-contrast hover:bg-brass-hover transition-colors"
              >
                {shared === "copied" ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
                {shared === "copied" ? "Copied — paste it anywhere" : shared === "failed" ? "Couldn't copy" : "Share your result"}
              </button>
            </div>
            <p className="mt-6 text-sm text-ink-muted" role="timer">
              {stale ? (
                <button
                  type="button"
                  onClick={() => window.location.reload()}
                  className="font-semibold text-brass hover:text-brass-hover"
                >
                  A new challenge is ready — load it
                </button>
              ) : (
                <>
                  Next challenge in <span className="font-mono font-semibold text-ink tabular-nums">{countdown.label}</span>
                </>
              )}
            </p>
          </div>
        ) : !started && answers.length === 0 ? (
          <div className="text-center py-4">
            <p className="text-lg text-ink-muted mb-2">Five questions. One try each. The same for everyone today.</p>
            <p className="text-sm text-ink-subtle mb-6">Two intervals, two chords and a fretboard note — turn your sound on.</p>
            <button
              type="button"
              onClick={begin}
              className="inline-flex items-center gap-2 rounded-full bg-brass px-7 py-3 text-sm font-bold text-brass-contrast hover:bg-brass-hover transition-colors"
            >
              <Play className="h-4 w-4" />
              Start today&apos;s challenge
            </button>
          </div>
        ) : !started ? (
          <div className="text-center py-4">
            <p className="text-lg text-ink-muted mb-6">
              You&apos;re on question {answers.length + 1} of {ROUNDS}.
            </p>
            <button
              type="button"
              onClick={begin}
              className="inline-flex items-center gap-2 rounded-full bg-brass px-7 py-3 text-sm font-bold text-brass-contrast hover:bg-brass-hover transition-colors"
            >
              <Play className="h-4 w-4" />
              Carry on
            </button>
          </div>
        ) : round ? (
          <>
            <p className="eyebrow text-center mb-2">
              {roundIndex + 1} of {ROUNDS} · {KIND_LABEL[round.kind]}
            </p>
            <p className="text-center text-xl font-semibold text-ink mb-6">{round.prompt}</p>

            {round.position && <div className="mb-6"><FretboardStrip {...round.position} /></div>}

            {round.kind !== "fretboard" && (
              <div className="mb-6 flex justify-center">
                <button
                  type="button"
                  onClick={() => play(round)}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors",
                    isPlaying
                      ? "border-brass/60 bg-brass/20 text-brass-hover"
                      : "border-line-strong bg-surface/60 text-ink hover:border-brass/50 hover:text-brass",
                  )}
                >
                  <Volume2 className="h-4 w-4" />
                  Play again<span className="hidden sm:inline"> (R)</span>
                </button>
              </div>
            )}

            <div className="grid grid-cols-2 gap-2">
              {round.options.map((option, i) => {
                const isAnswer = option.id === round.answer;
                const isChosen = option.id === chosen;
                return (
                  <button
                    key={option.id}
                    type="button"
                    disabled={chosen !== null}
                    onClick={() => answer(option.id)}
                    className={cn(
                      "rounded-xl border px-3 py-4 text-sm sm:text-base font-semibold transition-colors disabled:cursor-default",
                      chosen === null
                        ? "border-line-strong bg-surface/60 text-ink hover:border-brass/50 hover:text-brass"
                        : isAnswer
                          ? "border-in-tune bg-in-tune/15 text-in-tune"
                          : isChosen
                            ? "border-off bg-off/15 text-off"
                            : "border-line text-ink-subtle opacity-60",
                    )}
                  >
                    {option.label}
                    <span className="hidden sm:block text-2xs font-mono text-ink-subtle mt-0.5">{i + 1}</span>
                  </button>
                );
              })}
            </div>

            <div className="mt-6 min-h-[3rem] text-center" role="status" aria-live="polite">
              {chosen !== null && (
                <div className="flex flex-col items-center gap-3">
                  <p className={cn("text-lg font-bold", chosen === round.answer ? "text-in-tune" : "text-off")}>
                    {chosen === round.answer ? `Correct — ${correctLabel}` : `It was ${correctLabel}`}
                  </p>
                  <button
                    type="button"
                    onClick={advance}
                    className="inline-flex items-center gap-1.5 rounded-full bg-brass px-5 py-2 text-sm font-bold text-brass-contrast hover:bg-brass-hover transition-colors"
                  >
                    {answers.length >= ROUNDS ? "See your score" : "Next question"}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}
            </div>
          </>
        ) : null}
      </div>

      {/* Stats */}
      {stats.played > 0 && (
        <div className="grid gap-4 sm:grid-cols-[auto_1fr]">
          <div className="grid grid-cols-2 gap-3 sm:w-72">
            {[
              { icon: Flame, label: "Streak", value: stats.streak, hot: stats.streak >= 3 },
              { icon: Trophy, label: "Best streak", value: stats.bestStreak },
              { label: "Played", value: stats.played },
              { label: "Perfect", value: stats.perfect },
            ].map(({ icon: Icon, label, value, hot }) => (
              <div key={label} className="rounded-2xl border border-line bg-surface/40 p-4">
                <p className="eyebrow flex items-center gap-1.5">
                  {Icon && <Icon className={cn("h-3.5 w-3.5", hot ? "text-brass" : "")} />}
                  {label}
                </p>
                <p className="mt-1 text-2xl font-bold text-ink tabular-nums">{value}</p>
              </div>
            ))}
          </div>
          <div className="rounded-2xl border border-line bg-surface/40 p-4">
            <p className="eyebrow mb-3">Score distribution</p>
            <ol className="flex flex-col gap-1.5">
              {stats.distribution.map((count, s) => (
                <li key={s} className="flex items-center gap-2 text-xs">
                  <span className="w-3 font-mono text-ink-subtle">{s}</span>
                  <span
                    className={cn(
                      "h-4 rounded-sm text-right pr-1.5 text-2xs font-bold leading-4",
                      finished && s === score ? "bg-brass text-brass-contrast" : "bg-surface-raised text-ink-muted",
                    )}
                    style={{ width: `${Math.max(8, (100 * count) / maxDistribution)}%` }}
                  >
                    {count}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}

      {finished && (
        <div className="rounded-2xl border border-line bg-surface/40 px-5 py-4">
          <p className="eyebrow mb-2">Keep going</p>
          <div className="flex flex-wrap gap-2">
            {[
              { href: "/ear-training", label: "Unlimited ear training" },
              { href: "/fretboard-trainer", label: "Learn the fretboard" },
              { href: "/practice-routine", label: "Today's practice routine" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full border border-line-strong bg-surface/60 px-4 py-2 text-sm font-semibold text-ink hover:border-brass/50 hover:text-brass transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <p className="mt-3 text-2xs text-ink-subtle">
            Results are stored in this browser only. Nothing is sent anywhere.
          </p>
        </div>
      )}
    </div>
  );
}
