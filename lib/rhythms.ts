/** Rhythms for the rhythm trainer, as onset times in beats from the start of
 *  the cycle. Fractions cover every subdivision a guitarist needs: halves
 *  (eighths), quarters (sixteenths) and thirds (triplets). Each cycle is a
 *  whole number of 4/4 bars. */

export interface Rhythm {
  id: string;
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  /** Cycle length in beats: 4 for one bar, 8 for two. */
  beats: number;
  /** When to tap, in beats from the start of the cycle, ascending. */
  onsets: number[];
  description: string;
  /** Suggested starting tempo. */
  bpm: number;
}

const every = (step: number, beats = 4) =>
  Array.from({ length: Math.round(beats / step) }, (_, i) => Math.round(i * step * 1000) / 1000);

/** Repeat a one-beat figure on every beat of a bar. */
const perBeat = (figure: number[], beats = 4) =>
  Array.from({ length: beats }, (_, b) => figure.map((t) => b + t)).flat();

export const RHYTHMS: Rhythm[] = [
  {
    id: 'quarters',
    name: 'Quarter notes',
    level: 'Beginner',
    beats: 4,
    onsets: every(1),
    description: 'One tap per beat, with the click. Simple to describe and harder than it sounds to do dead on time.',
    bpm: 80,
  },
  {
    id: 'eighths',
    name: 'Eighth notes',
    level: 'Beginner',
    beats: 4,
    onsets: every(0.5),
    description: 'Two even taps per beat — "1 & 2 &". The "&"s should land exactly halfway between clicks.',
    bpm: 80,
  },
  {
    id: 'offbeats',
    name: 'Off-beat eighths',
    level: 'Beginner',
    beats: 4,
    onsets: every(1).map((b) => b + 0.5),
    description: 'Only the "&"s. The skank of reggae and ska guitar, and the best single exercise for an inner pulse.',
    bpm: 80,
  },
  {
    id: 'dotted-quarter',
    name: 'Dotted quarter + eighth',
    level: 'Intermediate',
    beats: 4,
    onsets: [0, 1.5, 2, 3.5],
    description: 'Long-short, long-short. The second tap of each pair falls on an "&", which is what people most often rush.',
    bpm: 80,
  },
  {
    id: 'tresillo',
    name: '3-3-2 (tresillo)',
    level: 'Intermediate',
    beats: 4,
    onsets: [0, 1.5, 3],
    description: 'Eight eighth notes grouped 3 + 3 + 2. The backbone of countless pop, Latin and rock riffs.',
    bpm: 90,
  },
  {
    id: 'triplets',
    name: 'Eighth-note triplets',
    level: 'Intermediate',
    beats: 4,
    onsets: perBeat([0, 1 / 3, 2 / 3]),
    description: 'Three even taps per beat — "1-trip-let". Blues shuffles and 12/8 ballads live here.',
    bpm: 70,
  },
  {
    id: 'sixteenths',
    name: 'Sixteenth notes',
    level: 'Intermediate',
    beats: 4,
    onsets: every(0.25),
    description: 'Four even taps per beat — "1 e & a". Funk strumming and fast picking, at a tempo you can keep even.',
    bpm: 60,
  },
  {
    id: 'gallop',
    name: 'Gallop',
    level: 'Advanced',
    beats: 4,
    onsets: perBeat([0, 0.5, 0.75]),
    description: 'An eighth then two sixteenths on every beat. The metal gallop — keep the two short notes tight together.',
    bpm: 80,
  },
  {
    id: 'reverse-gallop',
    name: 'Reverse gallop',
    level: 'Advanced',
    beats: 4,
    onsets: perBeat([0, 0.25, 0.5]),
    description: 'Two sixteenths then an eighth. The same three notes as the gallop, flipped — and a different feel entirely.',
    bpm: 80,
  },
  {
    id: 'son-clave',
    name: '3-2 son clave',
    level: 'Advanced',
    beats: 8,
    onsets: [0, 1.5, 3, 5, 6],
    description: 'Two bars: three hits, then two. The key pattern of salsa and much Afro-Cuban music.',
    bpm: 90,
  },
];

export const getRhythm = (id: string) => RHYTHMS.find((r) => r.id === id) ?? RHYTHMS[0];

/** The count for an onset: "1", "&", "e", "a", "trip", "let". */
export function countLabel(onset: number): string {
  const beat = Math.floor(onset + 1e-6);
  const frac = Math.round((onset - beat) * 12) / 12;
  const names: Record<string, string> = {
    '0': String((beat % 4) + 1),
    '0.25': 'e',
    '0.5': '&',
    '0.75': 'a',
    [String(Math.round((1 / 3) * 12) / 12)]: 'trip',
    [String(Math.round((2 / 3) * 12) / 12)]: 'let',
  };
  return names[String(frac)] ?? '·';
}

// ── Scoring ────────────────────────────────────────────────────────────────

export interface TapResult {
  /** Target time in seconds from the start of the round. */
  target: number;
  /** Signed error in ms, positive = late. null when missed. */
  errorMs: number | null;
}

export interface RoundResult {
  hits: TapResult[];
  /** Taps that matched no target. */
  extra: number;
  /** 0–100. */
  score: number;
  /** Mean signed error over hits, ms. Negative = rushing. */
  meanMs: number;
  /** Standard deviation of the error over hits, ms. */
  spreadMs: number;
  hitCount: number;
}

/** Errors under this count as perfect; at FULL_MISS_MS a hit scores nothing. */
export const PERFECT_MS = 25;
const FULL_MISS_MS = 120;

/**
 * Match taps to targets. Each target takes the closest unused tap within a
 * window of half the gap to its neighbours (capped at 150 ms), so a tap can
 * never count for two notes and a rushed note is not credited to the next.
 */
export function scoreRound(targets: number[], taps: number[]): RoundResult {
  const used = new Set<number>();
  const hits: TapResult[] = targets.map((target, i) => {
    const prevGap = i > 0 ? target - targets[i - 1] : Infinity;
    const nextGap = i < targets.length - 1 ? targets[i + 1] - target : Infinity;
    const window = Math.min(0.15, prevGap / 2, nextGap / 2);
    let best = -1;
    let bestDist = Infinity;
    taps.forEach((tap, j) => {
      if (used.has(j)) return;
      const dist = Math.abs(tap - target);
      if (dist <= window && dist < bestDist) {
        best = j;
        bestDist = dist;
      }
    });
    if (best < 0) return { target, errorMs: null };
    used.add(best);
    return { target, errorMs: (taps[best] - target) * 1000 };
  });

  const errors = hits.map((h) => h.errorMs).filter((e): e is number => e !== null);
  const meanMs = errors.length ? errors.reduce((a, b) => a + b, 0) / errors.length : 0;
  const spreadMs = errors.length
    ? Math.sqrt(errors.reduce((a, e) => a + (e - meanMs) ** 2, 0) / errors.length)
    : 0;
  const points = hits.map((h) => {
    if (h.errorMs === null) return 0;
    const e = Math.abs(h.errorMs);
    return e <= PERFECT_MS ? 1 : Math.max(0, 1 - (e - PERFECT_MS) / (FULL_MISS_MS - PERFECT_MS));
  });
  // Extra taps cost a little each, so hammering the button never pays.
  const extra = taps.length - used.size;
  const raw = targets.length ? points.reduce((a, b) => a + b, 0) / targets.length : 0;
  const score = Math.max(0, Math.round(100 * raw - extra * 2));

  return { hits, extra, score, meanMs, spreadMs, hitCount: errors.length };
}
