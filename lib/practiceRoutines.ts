/** The daily practice routines and the "of the day" picks that fill them.
 *
 *  Picks rotate by calendar day, so everyone gets the same chord pair,
 *  scale, and strumming pattern on a given day, and tomorrow brings new
 *  ones. Every pick links to the tool that teaches it. */

import { getChord, type Chord } from './chords';
import { PATTERNS, type StrumPattern } from './strumming';
import { getScale, type ScaleType } from './music/scales';
import { ROOTS } from './chords';

/** Open-position chords: every one has a first-position shape in the library. */
const CHORD_POOL = [
  'c', 'g', 'd', 'a', 'e', 'a-minor', 'e-minor', 'd-minor', 'a-7', 'd-7', 'e-7',
  'g-7', 'b-7', 'c-maj7', 'f-maj7', 'a-sus2', 'd-sus4', 'c-add9', 'a-m7', 'e-m7', 'f',
];

const SCALE_POOL: { root: string; scale: string }[] = [
  { root: 'a', scale: 'minor-pentatonic' },
  { root: 'g', scale: 'major' },
  { root: 'e', scale: 'minor-pentatonic' },
  { root: 'c', scale: 'major' },
  { root: 'd', scale: 'dorian' },
  { root: 'g', scale: 'major-pentatonic' },
  { root: 'a', scale: 'blues' },
  { root: 'e', scale: 'natural-minor' },
  { root: 'g', scale: 'mixolydian' },
  { root: 'd', scale: 'major-pentatonic' },
  { root: 'a', scale: 'natural-minor' },
  { root: 'e', scale: 'blues' },
];

/** Beginner and intermediate patterns only — a daily drill should be
 *  doable cold. */
const PATTERN_POOL = PATTERNS.filter((p) => p.level !== 'Advanced');

export interface DailyPicks {
  chordA: Chord;
  chordB: Chord;
  scale: { rootName: string; rootSlug: string; scale: ScaleType; href: string };
  pattern: StrumPattern;
}

export function dailyPicks(day: number): DailyPicks {
  const a = CHORD_POOL[day % CHORD_POOL.length];
  // A different stride for the partner, so pairs do not repeat in lockstep.
  let b = CHORD_POOL[(day * 7 + 3) % CHORD_POOL.length];
  if (b === a) b = CHORD_POOL[(day + 1) % CHORD_POOL.length];
  const s = SCALE_POOL[day % SCALE_POOL.length];
  const root = ROOTS.find((r) => r.slug === s.root)!;
  return {
    chordA: getChord(a)!,
    chordB: getChord(b)!,
    scale: {
      rootName: root.name,
      rootSlug: root.slug,
      scale: getScale(s.scale),
      href: `/scales?root=${s.root}&scale=${s.scale}`,
    },
    pattern: PATTERN_POOL[day % PATTERN_POOL.length],
  };
}

export interface RoutineStep {
  id: string;
  title: string;
  minutes: number;
  /** Plain instructions; `picks` fills in today's chord, scale, or pattern. */
  instructions: (picks: DailyPicks | null) => string;
  href?: (picks: DailyPicks | null) => string;
  linkLabel?: string;
}

const tune: RoutineStep = {
  id: 'tune',
  title: 'Tune up',
  minutes: 1,
  instructions: () =>
    'Tune every string, low to high, then check the low E once more — tuning the others pulls the neck slightly. An out-of-tune guitar trains your ear on the wrong pitches.',
  href: () => '/',
  linkLabel: 'Open the tuner',
};

const warmUp = (minutes: number): RoutineStep => ({
  id: 'warm-up',
  title: 'Chromatic warm-up',
  minutes,
  instructions: () =>
    'Frets 1-2-3-4 on every string, one finger per fret, one note per click. Go up to the high E, shift up a fret, and come back down. Start at 60–80 BPM and alternate-pick. Clean beats fast.',
  href: () => '/metronome',
  linkLabel: 'Open the metronome',
});

const chordChanges = (minutes: number): RoutineStep => ({
  id: 'chords',
  title: 'One-minute chord changes',
  minutes,
  instructions: (p) =>
    p
      ? `Today's pair is ${p.chordA.name} and ${p.chordB.name}. Strum each a few times to check every string rings. Then set a one-minute timer and switch between them, one strum per chord, as many times as you can. Count clean changes and write the number down — it is the number to beat tomorrow.`
      : "Strum today's two chords until every string rings, then switch between them for one minute, counting clean changes.",
  href: (p) => (p ? `/chords/${p.chordA.slug}` : '/chords'),
  linkLabel: 'See the chord diagrams',
});

const scale = (minutes: number): RoutineStep => ({
  id: 'scale',
  title: 'Scale of the day',
  minutes,
  instructions: (p) =>
    p
      ? `${p.scale.rootName} ${p.scale.scale.name.toLowerCase()}. Play position 1 up and down with the metronome, then turn on the drone and make up short phrases that end on the root.`
      : "Play today's scale in one position up and down, then improvise short phrases over a drone.",
  href: (p) => p?.scale.href ?? '/scales',
  linkLabel: 'Open the scale explorer',
});

const strumming = (minutes: number): RoutineStep => ({
  id: 'strum',
  title: 'Strumming pattern',
  minutes,
  instructions: (p) =>
    p
      ? `${p.pattern.name}. Play along at ${Math.max(60, p.pattern.bpm - 10)} BPM until it feels automatic, then raise the tempo by 5. Keep the strumming hand moving even on the missed strokes.`
      : "Play along with today's pattern slowly, keeping the hand moving on every stroke.",
  href: (p) => (p ? `/strumming-patterns?pattern=${p.pattern.id}` : '/strumming-patterns'),
  linkLabel: 'Open the strumming trainer',
});

const ear: RoutineStep = {
  id: 'ear',
  title: 'Ear training',
  minutes: 2,
  instructions: () =>
    'One round of intervals at your level. When you miss one, replay it and sing the two notes before moving on.',
  href: () => '/ear-training',
  linkLabel: 'Open the ear trainer',
};

const fretboard: RoutineStep = {
  id: 'fretboard',
  title: 'Fretboard notes',
  minutes: 2,
  instructions: () =>
    'Name the note quiz on one or two strings you are weakest on. Answer from memory — no counting up from the open string.',
  href: () => '/fretboard-trainer',
  linkLabel: 'Open the fretboard trainer',
};

const improvise: RoutineStep = {
  id: 'improvise',
  title: 'Play over a backing loop',
  minutes: 6,
  instructions: (p) =>
    p
      ? `Loop a progression and improvise using today's ${p.scale.rootName} scale shapes. Aim for phrases with gaps in them — rests are part of a solo.`
      : 'Loop a progression and improvise over it with the scale you practised.',
  href: () => '/chord-progressions',
  linkLabel: 'Open the progression builder',
};

export interface Routine {
  id: 'quick' | 'standard' | 'deep';
  name: string;
  minutes: number;
  steps: RoutineStep[];
}

export const ROUTINES: Routine[] = [
  {
    id: 'quick',
    name: '10 minutes',
    minutes: 10,
    steps: [tune, warmUp(2), chordChanges(3), fretboard, ear],
  },
  {
    id: 'standard',
    name: '20 minutes',
    minutes: 20,
    steps: [tune, warmUp(3), chordChanges(4), scale(4), strumming(4), ear, fretboard],
  },
  {
    id: 'deep',
    name: '30 minutes',
    minutes: 30,
    steps: [tune, warmUp(4), chordChanges(5), scale(5), strumming(5), improvise, ear, fretboard],
  },
];
