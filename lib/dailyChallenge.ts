/** The daily challenge: five questions, the same for everyone on a given
 *  day, one attempt each. Built from a seeded random generator, so there is
 *  no server and no puzzle list to run out of — challenge #N is always the
 *  same five questions.
 *
 *  Results live in local storage only, like the rest of the practice tools. */

import { INTERVALS } from '@/lib/intervals';
import { QUALITIES } from '@/lib/chords/theory';
import { dayIndex } from '@/lib/practiceLog';

/** Challenge #1 is 2026-10-25. */
const EPOCH = dayIndex(new Date(2026, 9, 25));

export const ROUNDS = 5;

export function challengeNumber(date = new Date()): number {
  return dayIndex(date) - EPOCH + 1;
}

export type RoundKind = 'interval' | 'chord' | 'fretboard';

export interface ChallengeOption {
  id: string;
  label: string;
}

export interface ChallengeRound {
  kind: RoundKind;
  /** The question as shown. */
  prompt: string;
  /** MIDI notes to play. For fretboard rounds, the note itself — played
   *  only once answered, since hearing it first would give it away. */
  notes: number[];
  /** Notes sound together (a chord or harmonic interval) or in turn. */
  together: boolean;
  options: ChallengeOption[];
  answer: string;
  /** Fretboard rounds: which string (0 = low E) and fret to mark. */
  position?: { string: number; fret: number };
}

/** mulberry32 — small, fast, and good enough to pick quiz questions. */
function seeded(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Rng = () => number;

const pick = <T>(rng: Rng, items: T[]) => items[Math.floor(rng() * items.length)];

function shuffle<T>(rng: Rng, items: T[]): T[] {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/** The answer plus three wrong options from the same pool, shuffled. */
function choices(rng: Rng, answer: ChallengeOption, pool: ChallengeOption[]) {
  const wrong = shuffle(rng, pool.filter((o) => o.id !== answer.id)).slice(0, 3);
  return shuffle(rng, [answer, ...wrong]);
}

const capitalise = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** Roots stay inside guitar range, as in the ear trainer. */
const randomRoot = (rng: Rng) => 45 + Math.floor(rng() * 20); // A2–E4

function intervalRound(rng: Rng, pool: number[], direction: 'up' | 'down' | 'together'): ChallengeRound {
  const options = pool.map((s) => ({
    id: String(s),
    label: INTERVALS.find((i) => i.semitones === s)!.name,
  }));
  const answer = pick(rng, options);
  const semitones = Number(answer.id);
  const root = randomRoot(rng);
  return {
    kind: 'interval',
    prompt:
      direction === 'together'
        ? 'Two notes played together. What is the interval?'
        : `Two notes, going ${direction}. What is the interval?`,
    notes: direction === 'down' ? [root, root - semitones] : [root, root + semitones],
    together: direction === 'together',
    options: choices(rng, answer, options),
    answer: answer.id,
  };
}

function chordRound(rng: Rng, pool: string[]): ChallengeRound {
  const options = pool.map((slug) => ({
    id: slug,
    label: capitalise(QUALITIES.find((q) => q.slug === slug)!.name),
  }));
  const answer = pick(rng, options);
  const quality = QUALITIES.find((q) => q.slug === answer.id)!;
  const root = randomRoot(rng) - 7;
  return {
    kind: 'chord',
    prompt: 'A chord, strummed. What type is it?',
    notes: quality.tones.map((tone) => root + tone.semitones),
    together: true,
    options: choices(rng, answer, options),
    answer: answer.id,
  };
}

/** Standard tuning, string 6 first. */
const OPEN_STRINGS = [40, 45, 50, 55, 59, 64];
const STRING_NAMES = ['low E', 'A', 'D', 'G', 'B', 'high E'];
const PITCH_CLASSES = ['C', 'C♯ / D♭', 'D', 'E♭ / D♯', 'E', 'F', 'F♯ / G♭', 'G', 'A♭ / G♯', 'A', 'B♭ / A♯', 'B'];

function fretboardRound(rng: Rng): ChallengeRound {
  const string = Math.floor(rng() * 6);
  // Fret 0 is too easy; past 12 the notes repeat.
  const fret = 1 + Math.floor(rng() * 12);
  const midi = OPEN_STRINGS[string] + fret;
  const options = PITCH_CLASSES.map((label, pc) => ({ id: String(pc), label }));
  const answer = options[midi % 12];
  return {
    kind: 'fretboard',
    prompt: `Which note is at fret ${fret} on the ${STRING_NAMES[string]} string?`,
    notes: [midi],
    together: false,
    options: choices(rng, answer, options),
    answer: answer.id,
    position: { string, fret },
  };
}

/** Today's five questions, easiest first. The last round alternates between
 *  a harmonic interval and a seventh chord so the hardest question changes
 *  character from day to day. */
export function buildChallenge(n: number): ChallengeRound[] {
  const rng = seeded(Math.imul(n, 2654435761));
  return [
    intervalRound(rng, [3, 4, 5, 7, 12], 'up'),
    chordRound(rng, ['major', 'minor', 'dim', 'aug', 'sus4']),
    fretboardRound(rng),
    intervalRound(rng, [1, 2, 3, 4, 5, 7, 8, 9, 12], 'down'),
    n % 2 === 0
      ? intervalRound(rng, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], 'together')
      : chordRound(rng, ['7', 'maj7', 'm7', 'sus2', 'sus4', 'major', 'minor']),
  ];
}

// ── Results ────────────────────────────────────────────────────────────────

const STORAGE_KEY = 'gtp-daily-challenge';

/** Challenge number → one entry per answered round, true if correct.
 *  Saved after every answer, so leaving halfway does not grant a retry. */
export type ChallengeResults = Record<string, boolean[]>;

export function loadResults(): ChallengeResults {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? (parsed as ChallengeResults) : {};
  } catch {
    return {};
  }
}

export function saveResults(results: ChallengeResults) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(results));
  } catch {
    // Storage blocked: today still plays, it just won't be remembered.
  }
}

export interface ChallengeStats {
  played: number;
  perfect: number;
  /** Consecutive challenges finished, ending today or yesterday. */
  streak: number;
  bestStreak: number;
  /** How many challenges ended on each score, 0 to ROUNDS. */
  distribution: number[];
}

export function challengeStats(results: ChallengeResults, today: number): ChallengeStats {
  const finished = Object.entries(results)
    .filter(([, answers]) => answers.length >= ROUNDS)
    .map(([n, answers]) => ({ n: Number(n), score: answers.filter(Boolean).length }));
  const done = new Set(finished.map((f) => f.n));

  let streak = 0;
  for (let n = done.has(today) ? today : today - 1; done.has(n); n--) streak++;

  let bestStreak = 0;
  let run = 0;
  for (const n of [...done].sort((a, b) => a - b)) {
    run = done.has(n - 1) ? run + 1 : 1;
    bestStreak = Math.max(bestStreak, run);
  }

  const distribution = Array.from({ length: ROUNDS + 1 }, () => 0);
  finished.forEach((f) => distribution[f.score]++);

  return {
    played: finished.length,
    perfect: distribution[ROUNDS],
    streak,
    bestStreak,
    distribution,
  };
}

const ROUND_ICONS: Record<RoundKind, string> = { interval: '🎵', chord: '🎸', fretboard: '🎯' };

/** The text people paste into a chat: score, a square per round, the link. */
export function shareText(n: number, rounds: ChallengeRound[], answers: boolean[], streak: number) {
  const score = answers.filter(Boolean).length;
  const grid = answers.map((ok, i) => `${ROUND_ICONS[rounds[i].kind]}${ok ? '🟩' : '🟥'}`).join(' ');
  const lines = [`GuitarTunePro Daily #${n} — ${score}/${ROUNDS}`, grid];
  if (streak > 1) lines.push(`🔥 ${streak}-day streak`);
  lines.push('https://www.guitartunepro.com/daily-challenge');
  return lines.join('\n');
}
