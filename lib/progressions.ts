/** Chord progressions as scale degrees, so any of them can be played in any
 *  key. Shared by the progression builder page and its reference table. */

import { diatonicChords, QUALITY_SUFFIX, type KeyMode } from './music/scales';

export interface ProgressionStep {
  /** Scale degree, 1–7. */
  degree: number;
  /** Override the diatonic quality, e.g. "7" for a blues I7, or "major" for
   *  the harmonic-minor V. */
  quality?: string;
}

export interface ProgressionPreset {
  id: string;
  name: string;
  mode: KeyMode;
  steps: ProgressionStep[];
  description: string;
}

const s = (degree: number, quality?: string): ProgressionStep => ({ degree, quality });

export const PRESETS: ProgressionPreset[] = [
  {
    id: 'pop',
    name: 'I – V – vi – IV',
    mode: 'major',
    steps: [s(1), s(5), s(6), s(4)],
    description: 'The four chords behind a huge share of modern pop. Start it on the vi and it becomes the "sad" version.',
  },
  {
    id: 'fifties',
    name: 'I – vi – IV – V',
    mode: 'major',
    steps: [s(1), s(6), s(4), s(5)],
    description: 'The doo-wop progression. Same four chords as the pop progression, in a different order.',
  },
  {
    id: 'three-chord',
    name: 'I – IV – V – I',
    mode: 'major',
    steps: [s(1), s(4), s(5), s(1)],
    description: 'The three primary chords. Folk, country, early rock and roll, and most campfire songs.',
  },
  {
    id: 'sad-pop',
    name: 'vi – IV – I – V',
    mode: 'major',
    steps: [s(6), s(4), s(1), s(5)],
    description: 'The pop progression rotated to start on the minor chord, which makes the whole loop feel darker.',
  },
  {
    id: 'two-five-one',
    name: 'ii7 – V7 – Imaj7',
    mode: 'major',
    steps: [s(2, 'm7'), s(5, '7'), s(1, 'maj7'), s(1, 'maj7')],
    description: 'The cadence jazz is built on. The V7 pulls hard to the I; learn to hear that pull.',
  },
  {
    id: 'blues',
    name: '12-bar blues',
    mode: 'major',
    steps: [
      s(1, '7'), s(1, '7'), s(1, '7'), s(1, '7'),
      s(4, '7'), s(4, '7'), s(1, '7'), s(1, '7'),
      s(5, '7'), s(4, '7'), s(1, '7'), s(5, '7'),
    ],
    description: 'Twelve bars, three dominant 7th chords. The last bar is the turnaround back to the top. Solo over it with the minor pentatonic or blues scale.',
  },
  {
    id: 'minor-epic',
    name: 'i – VI – III – VII',
    mode: 'minor',
    steps: [s(1), s(6), s(3), s(7)],
    description: 'A minor-key loop heard across rock and film music — the relative of the major pop progression.',
  },
  {
    id: 'minor-cadence',
    name: 'i – iv – V – i',
    mode: 'minor',
    steps: [s(1), s(4), s(5, 'major'), s(1)],
    description: 'Minor-key three-chord song, with the V made major (from harmonic minor) so it resolves strongly.',
  },
  {
    id: 'andalusian',
    name: 'i – VII – VI – V',
    mode: 'minor',
    steps: [s(1), s(7), s(6), s(5, 'major')],
    description: 'The Andalusian cadence: a stepwise walk down to a major V. Flamenco, surf rock, and countless minor-key ballads.',
  },
  {
    id: 'minor-rock',
    name: 'i – VII – VI – VII',
    mode: 'minor',
    steps: [s(1), s(7), s(6), s(7)],
    description: 'A rocking back-and-forth that never fully resolves — good for long jams and soloing practice.',
  },
];

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];
const MINORISH = new Set(['minor', 'm7', 'm6', 'dim']);

export interface ResolvedStep {
  numeral: string;
  name: string;
  rootPitch: number;
  quality: string;
  suffix: string;
}

/** Resolve a step to a named chord in a key, with its roman numeral. */
export function resolveStep(step: ProgressionStep, keyPitch: number, mode: KeyMode): ResolvedStep {
  const diatonic = diatonicChords(keyPitch, mode)[step.degree - 1];
  const quality = step.quality ?? diatonic.quality;
  const base = ROMAN[step.degree - 1];
  const numeralCore = MINORISH.has(quality) ? base.toLowerCase() : base;
  const numeralSuffix =
    quality === 'dim' ? '°' : quality === 'm7' || quality === '7' ? '7' : quality === 'maj7' ? 'maj7' : '';
  const suffix = QUALITY_SUFFIX[quality] ?? '';
  return {
    numeral: `${numeralCore}${numeralSuffix}`,
    name: `${diatonic.rootName}${suffix}`,
    rootPitch: diatonic.rootPitch,
    quality,
    suffix,
  };
}

/** Chords offered in the builder palette for a mode. */
export function paletteSteps(mode: KeyMode): ProgressionStep[] {
  const triads = [1, 2, 3, 4, 5, 6, 7].map((d) => s(d));
  return mode === 'major'
    ? [...triads, s(5, '7'), s(2, 'm7'), s(1, 'maj7')]
    : [...triads, s(5, 'major'), s(5, '7')];
}

export const encodeSteps = (steps: ProgressionStep[]) =>
  steps.map((st) => (st.quality ? `${st.degree}.${st.quality}` : String(st.degree))).join(',');

export function decodeSteps(raw: string | null): ProgressionStep[] | null {
  if (!raw) return null;
  const steps = raw.split(',').map((part) => {
    const [d, q] = part.split('.');
    const degree = Number(d);
    if (!Number.isInteger(degree) || degree < 1 || degree > 7) return null;
    if (q && !(q in QUALITY_SUFFIX)) return null;
    return s(degree, q || undefined);
  });
  return steps.every(Boolean) && steps.length > 0 && steps.length <= 16 ? (steps as ProgressionStep[]) : null;
}
