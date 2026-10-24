"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Check, ChevronRight, Clock, ArrowRight, Share2, PartyPopper } from "lucide-react";
import { cn } from "@/lib/utils";
import { COURSE, COURSE_DAYS, type CourseDay } from "@/lib/course";
import { dateKey, logPractice } from "@/lib/practiceLog";

const STORAGE_KEY = "gtp-beginner-course";

/** Day number → the date it was marked done. */
type Progress = Record<string, string>;

function load(): Progress {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "null");
    return parsed && typeof parsed === "object" ? (parsed as Progress) : {};
  } catch {
    return {};
  }
}

function save(progress: Progress) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // Storage blocked: the course still reads fine, it just won't remember.
  }
}

function DayCard({
  day,
  done,
  open,
  onToggleOpen,
  onToggleDone,
}: {
  day: CourseDay;
  done: boolean;
  open: boolean;
  onToggleOpen: () => void;
  onToggleDone: () => void;
}) {
  return (
    <li id={`day-${day.day}`} className="scroll-mt-24">
      <details
        open={open}
        onToggle={(e) => {
          if ((e.currentTarget as HTMLDetailsElement).open !== open) onToggleOpen();
        }}
        className={cn(
          "group rounded-2xl border bg-surface/40 transition-colors",
          done ? "border-in-tune/40" : open ? "border-brass/40" : "border-line",
        )}
      >
        <summary className="flex cursor-pointer list-none items-center gap-3 p-4">
          <span
            className={cn(
              "flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-mono text-sm font-bold",
              done ? "bg-in-tune text-white" : "bg-surface-sunken text-ink",
            )}
            aria-hidden="true"
          >
            {done ? <Check className="h-4 w-4" /> : day.day}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-2xs font-bold uppercase tracking-widest text-ink-subtle">
              Day {day.day} · {day.minutes} min{done ? " · done" : ""}
            </span>
            <span className="block font-semibold text-ink leading-snug">{day.title}</span>
          </span>
          <ChevronRight className="h-4 w-4 shrink-0 text-brass transition-transform group-open:rotate-90" />
        </summary>

        <div className="px-4 pb-5 sm:pl-16">
          <p className="text-sm text-ink-muted">{day.goal}</p>
          <ol className="mt-4 space-y-3">
            {day.tasks.map((task, i) => (
              <li key={i} className="flex gap-3 text-sm text-ink">
                <span className="mt-0.5 font-mono text-xs text-ink-subtle">{i + 1}.</span>
                <span className="flex-1 leading-relaxed">
                  {task.text}
                  {task.href && (
                    <>
                      {" "}
                      <Link
                        href={task.href}
                        className="inline-flex items-center gap-0.5 whitespace-nowrap font-semibold text-brass hover:text-brass-hover"
                      >
                        {task.label ?? "Open"}
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    </>
                  )}
                </span>
              </li>
            ))}
          </ol>
          <p className="mt-4 rounded-xl border border-line bg-surface/60 px-4 py-3 text-sm text-ink-muted">
            <span className="font-semibold text-ink">Tip: </span>
            {day.tip}
          </p>
          <p className="mt-3 text-sm text-ink-muted">
            <span className="font-semibold text-ink">Done when: </span>
            {day.check}
          </p>
          <button
            type="button"
            onClick={onToggleDone}
            className={cn(
              "mt-4 inline-flex items-center gap-1.5 rounded-full px-5 py-2 text-sm font-bold transition-colors",
              done
                ? "border border-line-strong bg-surface/60 text-ink-muted hover:text-ink"
                : "bg-brass text-brass-contrast hover:bg-brass-hover",
            )}
          >
            <Check className="h-3.5 w-3.5" />
            {done ? "Done — undo" : `Mark day ${day.day} done`}
          </button>
        </div>
      </details>
    </li>
  );
}

export function BeginnerCourse() {
  const [progress, setProgress] = useState<Progress>({});
  // Day 1 is open in the server HTML; after loading progress, the next
  // unfinished day opens instead.
  const [openDays, setOpenDays] = useState<Set<number>>(() => new Set([1]));
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const saved = load();
    setProgress(saved);
    const next = COURSE_DAYS.find((d) => !saved[d.day]);
    if (next) setOpenDays(new Set([next.day]));
    else setOpenDays(new Set());
  }, []);

  const doneCount = COURSE_DAYS.filter((d) => progress[d.day]).length;
  const nextDay = COURSE_DAYS.find((d) => !progress[d.day]);
  const finished = doneCount === COURSE_DAYS.length;
  const doneToday = Object.values(progress).filter((d) => d === dateKey(new Date())).length;

  const toggleOpen = (day: number) =>
    setOpenDays((prev) => {
      const next = new Set(prev);
      if (next.has(day)) next.delete(day);
      else next.add(day);
      return next;
    });

  const toggleDone = (day: number) => {
    const next = { ...progress };
    if (next[day]) {
      delete next[day];
    } else {
      next[day] = dateKey(new Date());
      // A course day is a practice day on /practice-routine.
      logPractice("beginner-course");
      // Fold this day away and open the next one.
      const following = COURSE_DAYS.find((d) => d.day > day && !next[d.day]);
      setOpenDays((prev) => {
        const open = new Set(prev);
        open.delete(day);
        if (following) open.add(following.day);
        return open;
      });
      if (following) {
        window.setTimeout(() => {
          document.getElementById(`day-${following.day}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 50);
      }
    }
    setProgress(next);
    save(next);
  };

  const share = async () => {
    const text = "I finished the free 30-day beginner guitar course on GuitarTunePro 🎸";
    const url = "https://www.guitartunepro.com/beginner-guitar-course";
    try {
      if (navigator.share) {
        await navigator.share({ text, url });
        return;
      }
      await navigator.clipboard.writeText(`${text} ${url}`);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      // Share sheet dismissed or clipboard blocked.
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 flex flex-col gap-6">
      {/* Progress */}
      <div className="rounded-3xl border border-line bg-surface-sunken/30 p-5 sm:p-7 backdrop-blur-md shadow-2xl">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="eyebrow">Your progress</p>
            <p className="mt-1 text-3xl font-bold text-ink tabular-nums">
              {doneCount} <span className="text-lg font-semibold text-ink-muted">/ {COURSE_DAYS.length} days</span>
            </p>
          </div>
          {nextDay ? (
            <a
              href={`#day-${nextDay.day}`}
              onClick={() => setOpenDays((prev) => new Set(prev).add(nextDay.day))}
              className="inline-flex items-center gap-2 rounded-full bg-brass px-5 py-2.5 text-sm font-bold text-brass-contrast hover:bg-brass-hover transition-colors"
            >
              {doneCount === 0 ? "Start day 1" : `Continue: day ${nextDay.day}`}
              <ArrowRight className="h-4 w-4" />
            </a>
          ) : null}
        </div>
        <div
          className="mt-4 grid gap-1"
          style={{ gridTemplateColumns: `repeat(${COURSE_DAYS.length}, minmax(0, 1fr))` }}
          role="img"
          aria-label={`${doneCount} of ${COURSE_DAYS.length} days done`}
        >
          {COURSE_DAYS.map((d) => (
            <span
              key={d.day}
              className={cn(
                "h-2.5 rounded-full",
                progress[d.day] ? "bg-in-tune" : d.day === nextDay?.day ? "bg-brass/60" : "bg-surface-raised",
              )}
            />
          ))}
        </div>
        {nextDay && (
          <p className="mt-4 text-sm text-ink-muted">
            <Clock className="inline h-3.5 w-3.5 -mt-0.5 text-brass" /> Up next: <span className="font-semibold text-ink">{nextDay.title}</span>, about {nextDay.minutes} minutes.
            {doneToday >= 2 && " You have done more than one day today — it is fine to stop here and let it sink in."}
          </p>
        )}
        {finished && (
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <p className="text-sm font-semibold text-ink">
              <PartyPopper className="inline h-4 w-4 -mt-0.5 text-in-tune" /> All 30 days done.
            </p>
            <button
              type="button"
              onClick={share}
              className="inline-flex items-center gap-1.5 rounded-full border border-line-strong bg-surface/60 px-4 py-2 text-sm font-semibold text-ink hover:border-brass/50 hover:text-brass transition-colors"
            >
              {copied ? <Check className="h-3.5 w-3.5" /> : <Share2 className="h-3.5 w-3.5" />}
              {copied ? "Copied" : "Share it"}
            </button>
            <Link href="/practice-routine" className="text-sm font-semibold text-brass hover:text-brass-hover">
              Keep going with the daily routine →
            </Link>
          </div>
        )}
      </div>

      {/* Curriculum */}
      {COURSE.map((week) => {
        const weekDone = week.days.filter((d) => progress[d.day]).length;
        return (
          <section key={week.week} aria-labelledby={`week-${week.week}`}>
            <div className="mb-3 flex items-baseline justify-between gap-3">
              <h2 id={`week-${week.week}`} className="text-xl font-bold text-ink">
                Week {week.week}: {week.title}
              </h2>
              <span className="font-mono text-xs text-ink-subtle tabular-nums">
                {weekDone}/{week.days.length}
              </span>
            </div>
            <p className="mb-4 text-sm text-ink-muted">{week.summary}</p>
            <ol className="flex flex-col gap-2">
              {week.days.map((day) => (
                <DayCard
                  key={day.day}
                  day={day}
                  done={!!progress[day.day]}
                  open={openDays.has(day.day)}
                  onToggleOpen={() => toggleOpen(day.day)}
                  onToggleDone={() => toggleDone(day.day)}
                />
              ))}
            </ol>
          </section>
        );
      })}

      <p className="text-center text-2xs text-ink-subtle">
        Progress is saved in this browser only. Nothing is sent anywhere.{" "}
        <Link href="/my-progress" className="font-semibold text-brass hover:text-brass-hover">Move it to another device</Link>
      </p>
    </div>
  );
}
