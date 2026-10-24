"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Check, Copy, Download, Upload, Link2, Trash2, Flame, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { loadLog, currentStreak, bestStreak, dateKey } from "@/lib/practiceLog";
import { challengeNumber, challengeStats, loadResults } from "@/lib/dailyChallenge";
import { COURSE_DAYS } from "@/lib/course";
import { RHYTHMS } from "@/lib/rhythms";
import {
  clearProgress,
  collectBackup,
  decodeBackup,
  encodeBackup,
  importBackup,
  summarise,
  validateBackup,
  type Backup,
} from "@/lib/progressBackup";

const SITE = "https://www.guitartunepro.com";

function read<T>(key: string): T | null {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

type Tally = Record<string, [number, number]>;
const accuracy = (tally: Tally | undefined) => {
  const [c, n] = Object.values(tally ?? {}).reduce(([a, b], [x, y]) => [a + x, b + y], [0, 0]);
  return n ? { pct: Math.round((100 * c) / n), n } : null;
};

/** Everything the tools remember, worked out fresh from storage. */
function snapshot() {
  const log = loadLog();
  const today = new Date();
  const days = Object.keys(log);
  const course = read<Record<string, string>>("gtp-beginner-course") ?? {};
  const rhythm = read<{ best?: Record<string, { score: number; bpm: number }> }>("gtp-rhythm-trainer");
  const ear = read<{ bestStreak?: number; byAnswer?: Tally }>("gtp-ear-training");
  const fret = read<{ bestStreak?: number; byString?: Tally }>("gtp-fretboard-trainer");
  return {
    streak: currentStreak(log, today),
    best: bestStreak(log),
    days: days.length,
    minutes: Math.round(days.reduce((sum, d) => sum + (log[d].minutes || 0), 0)),
    practisedToday: !!log[dateKey(today)],
    daily: challengeStats(loadResults(), challengeNumber(today)),
    courseDone: COURSE_DAYS.filter((d) => course[d.day]).length,
    courseNext: COURSE_DAYS.find((d) => !course[d.day]),
    rhythm: Object.entries(rhythm?.best ?? {})
      .map(([id, b]) => ({ name: RHYTHMS.find((r) => r.id === id)?.name ?? id, ...b }))
      .sort((a, b) => b.score - a.score),
    ear: { best: ear?.bestStreak ?? 0, acc: accuracy(ear?.byAnswer) },
    fret: { best: fret?.bestStreak ?? 0, acc: accuracy(fret?.byString) },
  };
}

type Snapshot = ReturnType<typeof snapshot>;

function Tile({ label, value, sub, href }: { label: string; value: React.ReactNode; sub?: string; href?: string }) {
  const body = (
    <>
      <p className="eyebrow">{label}</p>
      <p className="mt-1 text-2xl font-bold text-ink tabular-nums">{value}</p>
      {sub && <p className="mt-0.5 text-xs text-ink-muted">{sub}</p>}
    </>
  );
  return href ? (
    <Link href={href} className="rounded-2xl border border-line bg-surface/40 p-4 hover:border-brass/40 transition-colors">
      {body}
    </Link>
  ) : (
    <div className="rounded-2xl border border-line bg-surface/40 p-4">{body}</div>
  );
}

export function ProgressCenter() {
  const [snap, setSnap] = useState<Snapshot | null>(null);
  const [link, setLink] = useState<string | null>(null);
  const [copied, setCopied] = useState<"link" | "code" | null>(null);
  const [pasted, setPasted] = useState("");
  const [pending, setPending] = useState<Backup | null>(null);
  const [message, setMessage] = useState<{ kind: "ok" | "error"; text: string } | null>(null);
  const fileInput = useRef<HTMLInputElement | null>(null);

  const refresh = useCallback(() => setSnap(snapshot()), []);

  useEffect(() => {
    refresh();
    // Arriving from a transfer link: decode and show what it holds, but
    // never import without the visitor saying so. Also on hashchange — a
    // link opened while already on this page changes only the fragment and
    // does not reload it.
    const checkHash = () => {
      if (!window.location.hash.startsWith("#import=")) return;
      setMessage(null);
      decodeBackup(window.location.hash)
        .then((b) => setPending(b))
        .catch((e: Error) => setMessage({ kind: "error", text: e.message }));
    };
    checkHash();
    window.addEventListener("hashchange", checkHash);
    return () => window.removeEventListener("hashchange", checkHash);
  }, [refresh]);

  const makeLink = async () => {
    const code = await encodeBackup(collectBackup());
    const url = `${SITE}/my-progress#import=${code}`;
    setLink(url);
    return url;
  };

  const copyLink = async () => {
    const url = await makeLink();
    try {
      if (navigator.share && window.matchMedia("(pointer: coarse)").matches) {
        await navigator.share({ title: "My GuitarTunePro progress", url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied("link");
      window.setTimeout(() => setCopied(null), 2500);
    } catch {
      // The link stays on screen to copy by hand.
    }
  };

  const download = () => {
    const blob = new Blob([JSON.stringify(collectBackup(), null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `guitartunepro-progress-${dateKey(new Date())}.json`;
    a.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const loadPasted = async () => {
    setMessage(null);
    try {
      setPending(await decodeBackup(pasted));
    } catch (e) {
      setMessage({ kind: "error", text: (e as Error).message });
    }
  };

  const loadFile = async (file: File) => {
    setMessage(null);
    try {
      if (file.size > 1_000_000) throw new Error("That file is too large to be a progress backup.");
      setPending(validateBackup(JSON.parse(await file.text())));
    } catch (e) {
      setMessage({ kind: "error", text: e instanceof SyntaxError ? "That file is not a progress backup." : (e as Error).message });
    }
  };

  const merge = () => {
    if (!pending) return;
    const changed = importBackup(pending);
    setPending(null);
    setPasted("");
    if (window.location.hash) window.history.replaceState(null, "", window.location.pathname);
    setMessage({
      kind: "ok",
      text: changed ? "Done — your progress from the other device is now on this one too." : "Nothing new: this device already had everything in that backup.",
    });
    refresh();
  };

  const clearAll = () => {
    if (!window.confirm("Delete all progress, streaks and scores stored on this device? This cannot be undone unless you have a backup.")) return;
    clearProgress();
    setLink(null);
    setMessage({ kind: "ok", text: "Cleared. This device no longer holds any GuitarTunePro progress." });
    refresh();
  };

  const preview = pending ? summarise(pending.data) : null;
  const empty = snap && snap.days === 0 && snap.daily.played === 0 && snap.courseDone === 0 && snap.rhythm.length === 0;

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 flex flex-col gap-6">
      {/* Import confirmation comes first when arriving from a link. */}
      {pending && preview && (
        <div className="rounded-3xl border-2 border-brass/50 bg-brass/10 p-5 sm:p-6" role="dialog" aria-label="Import progress">
          <p className="text-lg font-bold text-ink">Bring this progress onto this device?</p>
          <p className="mt-1 text-sm text-ink-muted">
            Backup from {pending.exportedAt ? new Date(pending.exportedAt).toLocaleString() : "another device"}:{" "}
            {preview.practiceDays} practice day{preview.practiceDays === 1 ? "" : "s"}, {preview.challenges} daily challenge
            {preview.challenges === 1 ? "" : "s"}, {preview.courseDays}/30 course days, {preview.rhythmBests} rhythm best
            {preview.rhythmBests === 1 ? "" : "s"}.
          </p>
          <p className="mt-2 text-xs text-ink-subtle">
            It is merged, not swapped: anything already on this device stays, and you keep this device&apos;s own settings
            and latency calibration.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button type="button" onClick={merge} className="rounded-full bg-brass px-5 py-2.5 text-sm font-bold text-brass-contrast hover:bg-brass-hover transition-colors">
              Merge into this device
            </button>
            <button
              type="button"
              onClick={() => {
                setPending(null);
                if (window.location.hash) window.history.replaceState(null, "", window.location.pathname);
              }}
              className="rounded-full border border-line-strong bg-surface/60 px-5 py-2.5 text-sm font-semibold text-ink hover:text-brass transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {message && (
        <p
          role="status"
          className={cn(
            "rounded-xl border px-4 py-3 text-sm",
            message.kind === "ok" ? "border-in-tune/40 bg-in-tune/10 text-ink" : "border-off/40 bg-off/10 text-ink",
          )}
        >
          {message.text}
        </p>
      )}

      {/* Dashboard */}
      <section aria-labelledby="dash-heading">
        <h2 id="dash-heading" className="text-xl font-bold text-ink mb-3">On this device</h2>
        {!snap ? (
          <div className="h-48 rounded-2xl border border-line bg-surface/30" />
        ) : empty ? (
          <div className="rounded-2xl border border-line bg-surface/40 p-5 text-sm text-ink-muted">
            Nothing yet. Progress appears here as you use the{" "}
            <Link href="/practice-routine" className="text-brass font-semibold">practice routine</Link>,{" "}
            <Link href="/daily-challenge" className="text-brass font-semibold">daily challenge</Link>,{" "}
            <Link href="/beginner-guitar-course" className="text-brass font-semibold">beginner course</Link> and the trainers — or bring it
            over from another device below.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Tile
              label="Practice streak"
              value={<span className="inline-flex items-center gap-1.5">{snap.streak >= 3 && <Flame className="h-5 w-5 text-brass" />}{snap.streak} days</span>}
              sub={`Best ${snap.best} · ${snap.practisedToday ? "practised today" : "not yet today"}`}
              href="/practice-routine"
            />
            <Tile label="Days practised" value={snap.days} sub={`${snap.minutes} timed minutes`} href="/practice-routine" />
            <Tile
              label="Beginner course"
              value={`${snap.courseDone}/30`}
              sub={snap.courseNext ? `Next: day ${snap.courseNext.day}` : "Finished"}
              href={snap.courseNext ? `/beginner-guitar-course#day-${snap.courseNext.day}` : "/beginner-guitar-course"}
            />
            <Tile label="Daily challenge" value={snap.daily.played} sub={`Streak ${snap.daily.streak} · ${snap.daily.perfect} perfect`} href="/daily-challenge" />
            <Tile label="Ear training" value={`best ${snap.ear.best}`} sub={snap.ear.acc ? `${snap.ear.acc.pct}% of ${snap.ear.acc.n} answers` : "Not started"} href="/ear-training" />
            <Tile label="Fretboard" value={`best ${snap.fret.best}`} sub={snap.fret.acc ? `${snap.fret.acc.pct}% of ${snap.fret.acc.n} answers` : "Not started"} href="/fretboard-trainer" />
            <div className="col-span-2 rounded-2xl border border-line bg-surface/40 p-4">
              <p className="eyebrow mb-2">Rhythm trainer bests</p>
              {snap.rhythm.length ? (
                <ul className="space-y-1 text-sm">
                  {snap.rhythm.slice(0, 4).map((r) => (
                    <li key={r.name} className="flex justify-between gap-3 text-ink">
                      <span>{r.name}</span>
                      <span className="font-mono tabular-nums text-ink-muted">{r.score} at {r.bpm} BPM</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <Link href="/rhythm-trainer" className="text-sm text-brass font-semibold">Test your timing →</Link>
              )}
            </div>
          </div>
        )}
      </section>

      {/* Send */}
      <section aria-labelledby="send-heading" className="rounded-3xl border border-line bg-surface-sunken/30 p-5 sm:p-6">
        <h2 id="send-heading" className="text-xl font-bold text-ink">Move it to another device</h2>
        <p className="mt-1 text-sm text-ink-muted">
          Send yourself a link — by message or email — and open it on the other phone or computer. Or save a backup file.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <button type="button" onClick={copyLink} disabled={!!empty} className="inline-flex items-center gap-1.5 rounded-full bg-brass px-5 py-2.5 text-sm font-bold text-brass-contrast hover:bg-brass-hover transition-colors disabled:opacity-50">
            {copied === "link" ? <Check className="h-4 w-4" /> : <Link2 className="h-4 w-4" />}
            {copied === "link" ? "Link copied" : "Copy transfer link"}
          </button>
          <button type="button" onClick={download} disabled={!!empty} className="inline-flex items-center gap-1.5 rounded-full border border-line-strong bg-surface/60 px-5 py-2.5 text-sm font-semibold text-ink hover:border-brass/50 hover:text-brass transition-colors disabled:opacity-50">
            <Download className="h-4 w-4" /> Download backup file
          </button>
        </div>
        {link && (
          <div className="mt-4">
            <label htmlFor="transfer-link" className="eyebrow mb-1 block">Your transfer link</label>
            <div className="flex gap-2">
              <input id="transfer-link" readOnly value={link} onFocus={(e) => e.currentTarget.select()} className="min-w-0 flex-1 rounded-xl border border-line-strong bg-surface px-3 py-2 font-mono text-xs text-ink" />
              <button
                type="button"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(link);
                    setCopied("code");
                    window.setTimeout(() => setCopied(null), 2000);
                  } catch {}
                }}
                className="inline-flex items-center gap-1 rounded-xl border border-line-strong bg-surface/60 px-3 text-xs font-semibold text-ink hover:text-brass"
                aria-label="Copy link"
              >
                {copied === "code" ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              </button>
            </div>
            <p className="mt-1 text-2xs text-ink-subtle">
              Your progress is inside the link, after the #. That part never reaches our server — anyone you send the link
              to can see your practice history, so send it only to yourself.
            </p>
          </div>
        )}
      </section>

      {/* Receive */}
      <section aria-labelledby="receive-heading" className="rounded-3xl border border-line bg-surface-sunken/30 p-5 sm:p-6">
        <h2 id="receive-heading" className="text-xl font-bold text-ink">Bring progress here</h2>
        <p className="mt-1 text-sm text-ink-muted">
          Open a transfer link on this device, or paste it below, or choose a backup file.
        </p>
        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          <label htmlFor="paste-code" className="sr-only">Transfer link or code</label>
          <input
            id="paste-code"
            value={pasted}
            onChange={(e) => setPasted(e.target.value)}
            placeholder="Paste a transfer link"
            className="min-w-0 flex-1 rounded-xl border border-line-strong bg-surface px-3 py-2.5 text-sm text-ink"
          />
          <button type="button" onClick={loadPasted} disabled={!pasted.trim()} className="rounded-xl bg-brass px-4 py-2.5 text-sm font-bold text-brass-contrast hover:bg-brass-hover disabled:opacity-50">
            Check link
          </button>
        </div>
        <input
          ref={fileInput}
          type="file"
          accept="application/json,.json"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) void loadFile(file);
            e.target.value = "";
          }}
        />
        <button type="button" onClick={() => fileInput.current?.click()} className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-line-strong bg-surface/60 px-4 py-2 text-sm font-semibold text-ink hover:border-brass/50 hover:text-brass transition-colors">
          <Upload className="h-4 w-4" /> Choose a backup file
        </button>
      </section>

      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-ink-subtle">
        <p>Stored in this browser only. No account, nothing sent to us.</p>
        <button type="button" onClick={clearAll} className="inline-flex items-center gap-1 font-semibold text-ink-muted hover:text-off transition-colors">
          <Trash2 className="h-3.5 w-3.5" /> Clear all progress on this device
        </button>
      </div>

      {snap?.courseNext && snap.courseDone > 0 && (
        <Link href={`/beginner-guitar-course#day-${snap.courseNext.day}`} className="inline-flex items-center gap-1.5 self-start text-sm font-semibold text-brass hover:text-brass-hover">
          Continue the course: day {snap.courseNext.day} <ArrowRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}
