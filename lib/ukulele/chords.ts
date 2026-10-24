/** Ukulele chords for standard reentrant tuning, G4 C4 E4 A4.
 *
 *  Unlike the guitar library, shapes are not typed in. Every fingering on
 *  four strings across the first 12 frets is enumerated once, kept only if a
 *  hand can hold it (a four-fret span), and indexed by the notes it sounds. A
 *  chord's voicings are the fingerings whose notes are exactly the chord's —
 *  correct by construction — ranked by how easy they are to play. A short
 *  table pins the shape teachers actually use where the ranking would pick a
 *  rarer one; those are checked against the same rule. */

import {
  ROOTS,
  QUALITIES,
  spellChord,
  expectedPitchClasses,
  chordSlug,
  chordName,
  chordAscii,
  type Root,
  type ChordQuality,
  type SpelledNote,
} from '@/lib/chords/theory';
import type { Fingering, Voicing } from '@/lib/chords/shapes';

/** Open strings as diagrams draw them, left to right: G C E A. The G is
 *  tuned above the C (reentrant), so string 4 is not the lowest note. */
export const UKE_OPEN_MIDI = [67, 60, 64, 69];
export const UKE_STRING_NAMES = ['G', 'C', 'E', 'A'];

/** Baritone ukulele, D3 G3 B3 E4 — the guitar's top four strings. */
const BARITONE_OPEN_MIDI = [50, 55, 59, 64];

const MAX_FRET = 12;
const MAX_SPAN = 3;
const VOICINGS_PER_CHORD = 3;

export interface UkeChord {
  slug: string;
  name: string;
  ascii: string;
  root: Root;
  quality: ChordQuality;
  notes: SpelledNote[];
  voicings: Voicing[];
}

const key = (pcs: number[]) => [...new Set(pcs)].sort((a, b) => a - b).join(',');

const pitchClasses = (frets: number[], open = UKE_OPEN_MIDI) =>
  frets.map((fret, i) => (open[i] + fret) % 12);

const fretted = (frets: number[]) => frets.filter((f) => f > 0);

/** Every holdable fingering, grouped by the pitch-class set it sounds. */
const BY_NOTES: Map<string, number[][]> = (() => {
  const map = new Map<string, number[][]>();
  for (let a = 0; a <= MAX_FRET; a++)
    for (let b = 0; b <= MAX_FRET; b++)
      for (let c = 0; c <= MAX_FRET; c++)
        for (let d = 0; d <= MAX_FRET; d++) {
          const frets = [a, b, c, d];
          const down = fretted(frets);
          if (down.length && Math.max(...down) - Math.min(...down) > MAX_SPAN) continue;
          const k = key(pitchClasses(frets));
          const list = map.get(k);
          if (list) list.push(frets);
          else map.set(k, [frets]);
        }
  return map;
})();

/**
 * Lower is easier. Position matters most (open shapes first), then how many
 * strings are fretted and how far the hand stretches. A barre — several
 * strings on the lowest fret — counts as one finger. Having the root as one
 * of the two lowest-sounding strings breaks ties toward fuller-sounding shapes.
 */
function cost(frets: number[], rootPc: number): number {
  const down = fretted(frets);
  if (!down.length) return 0;
  const min = Math.min(...down);
  const max = Math.max(...down);
  const onMin = frets.filter((f) => f === min).length;
  const fingers = down.length - (onMin >= 2 ? onMin - 1 : 0);
  // C and E are the two lowest strings in reentrant tuning.
  const rootLow = [1, 2].some((i) => (UKE_OPEN_MIDI[i] + frets[i]) % 12 === rootPc) ? 0 : 0.5;
  // Open strings ringing under a hand at the 5th fret or above make odd,
  // hard-to-hear shapes; teachers use closed barre shapes up there.
  const highOpen = max >= 5 ? frets.filter((f) => f === 0).length * 3 : 0;
  return max * 2 + (max - min) * 1.5 + fingers + down.length * 0.5 + rootLow + highOpen;
}

/** Standard teaching shapes the ranking would otherwise pass over. */
const PREFERRED: Record<string, number[]> = {
  e: [4, 4, 4, 2],
  'e-minor': [0, 4, 3, 2],
  'b-flat': [3, 2, 1, 1],
  b: [4, 3, 2, 2],
  'b-minor': [4, 2, 2, 2],
  'd-7': [2, 2, 2, 3],
  'd-m7': [2, 2, 1, 3],
};

function toVoicing(frets: number[]): Voicing {
  const down = fretted(frets);
  const min = down.length ? Math.min(...down) : 0;
  const max = down.length ? Math.max(...down) : 0;
  const onMin = frets.filter((f) => f === min).length;
  const barred = min > 0 && onMin >= 2 && (down.length === 4 || onMin >= 3);
  const baseFret = max <= 4 ? 1 : min;
  return {
    label:
      max <= 4
        ? frets.includes(0)
          ? 'Open position'
          : barred
            ? `Barre at fret ${min}`
            : 'First position'
        : barred
          ? `Barre at fret ${min}`
          : `Up the neck, fret ${min}`,
    frets: frets as Fingering,
    barreFret: barred ? min : undefined,
    baseFret,
  };
}

function buildChord(root: Root, quality: ChordQuality): UkeChord | null {
  const expected = expectedPitchClasses(root, quality);
  const candidates = BY_NOTES.get(expected.join(',')) ?? [];
  if (!candidates.length) return null;
  const slug = chordSlug(root, quality);

  const ranked = [...candidates].sort((x, y) => cost(x, root.pitchClass) - cost(y, root.pitchClass));
  const preferred = PREFERRED[slug];
  if (preferred && candidates.some((c) => c.join() === preferred.join())) {
    ranked.sort((x, y) => (x.join() === preferred.join() ? -1 : y.join() === preferred.join() ? 1 : 0));
  }

  // Then the easiest shape in each new hand position — at least three frets
  // from every shape already chosen — so alternatives are genuinely
  // different places to play it. Position is 0 for open shapes, otherwise
  // the lowest fretted fret.
  const position = (frets: number[]) => {
    const down = fretted(frets);
    if (!down.length || (frets.includes(0) && Math.max(...down) <= 4)) return 0;
    return Math.min(...down);
  };
  const chosen: number[][] = [];
  for (const frets of ranked) {
    if (chosen.length >= VOICINGS_PER_CHORD) break;
    if (chosen.every((c) => Math.abs(position(frets) - position(c)) >= 3)) chosen.push(frets);
  }

  return {
    slug,
    name: chordName(root, quality),
    ascii: chordAscii(root, quality),
    root,
    quality,
    notes: spellChord(root, quality),
    voicings: chosen.map(toVoicing),
  };
}

/** Qualities that fit on four strings. Power chords are left out: two notes
 *  on a high reentrant G string do not make a usable ukulele chord. */
export const UKE_QUALITIES = QUALITIES.filter((q) => q.slug !== '5' && q.tones.length <= 4);

export const UKE_CHORDS: UkeChord[] = ROOTS.flatMap((root) =>
  UKE_QUALITIES.map((quality) => buildChord(root, quality)),
).filter((c): c is UkeChord => c !== null);

const BY_SLUG = new Map(UKE_CHORDS.map((c) => [c.slug, c]));
export const getUkeChord = (slug: string) => BY_SLUG.get(slug);

export const ukeMidiNotes = (frets: Fingering) =>
  frets.map((f, i) => (f === null ? null : UKE_OPEN_MIDI[i] + f)).filter((n): n is number => n !== null);

/** Re-derive every voicing's notes — the same check the guitar library runs. */
export function validateUkeLibrary(): string[] {
  const issues: string[] = [];
  for (const chord of UKE_CHORDS) {
    const expected = expectedPitchClasses(chord.root, chord.quality).join(',');
    for (const v of chord.voicings) {
      const actual = key(pitchClasses(v.frets.map((f) => f ?? 0)));
      if (actual !== expected) issues.push(`${chord.slug} ${v.frets.join('')}: ${actual} ≠ ${expected}`);
    }
  }
  for (const [slug, frets] of Object.entries(PREFERRED)) {
    const chord = getUkeChord(slug);
    if (!chord || chord.voicings[0].frets.join() !== frets.join()) issues.push(`preferred shape for ${slug} not used`);
  }
  return issues;
}

// ── Curation ───────────────────────────────────────────────────────────────

const NATURAL_ROOTS = new Set(['c', 'd', 'e', 'f', 'g', 'a', 'b']);

/** Indexed: major, minor and 7th in every key — what ukulele players look
 *  up — plus m7 and maj7 on natural roots and sus chords in the common
 *  ukulele keys. The rest render and are linked but stay noindex, the same
 *  policy as the guitar library (see lib/chords/curation.ts). */
export function isUkeChordIndexed(chord: UkeChord): boolean {
  const q = chord.quality.slug;
  if (q === 'major' || q === 'minor' || q === '7') return true;
  if ((q === 'm7' || q === 'maj7') && NATURAL_ROOTS.has(chord.root.slug)) return true;
  if ((q === 'sus2' || q === 'sus4') && ['c', 'd', 'g', 'a'].includes(chord.root.slug)) return true;
  return false;
}

// ── Relationships ──────────────────────────────────────────────────────────

/** Same-root chords and same-quality neighbours, as a ring so every chord
 *  links forward and receives links back (as in lib/chords). */
export function relatedUkeChords(chord: UkeChord, limit = 8): UkeChord[] {
  const qi = UKE_QUALITIES.findIndex((q) => q.slug === chord.quality.slug);
  const ri = ROOTS.findIndex((r) => r.slug === chord.root.slug);
  const rotate = <T>(items: T[], from: number) => {
    const start = ((from % items.length) + items.length) % items.length;
    return [...items.slice(start), ...items.slice(0, start)];
  };
  const sameRoot = rotate(UKE_CHORDS.filter((c) => c.root.slug === chord.root.slug && c.slug !== chord.slug), qi);
  const sameQuality = rotate(UKE_CHORDS.filter((c) => c.quality.slug === chord.quality.slug && c.slug !== chord.slug), ri);
  const out: UkeChord[] = [];
  for (let i = 0; i < Math.max(sameRoot.length, sameQuality.length) && out.length < limit; i++) {
    for (const c of [sameRoot[i], sameQuality[i]]) {
      if (c && !out.includes(c) && out.length < limit) out.push(c);
    }
  }
  return out;
}

export function ukeSameNotesAs(chord: UkeChord): UkeChord[] {
  const mine = expectedPitchClasses(chord.root, chord.quality).join(',');
  return UKE_CHORDS.filter(
    (other) => other.slug !== chord.slug && expectedPitchClasses(other.root, other.quality).join(',') === mine,
  );
}

/** The chord on a baritone ukulele: the guitar's top four strings, so a
 *  guitar player's shape carries straight over. Returns the easiest
 *  holdable fingering, or null. */
export function baritoneShape(chord: UkeChord): number[] | null {
  const expected = expectedPitchClasses(chord.root, chord.quality).join(',');
  let best: number[] | null = null;
  let bestCost = Infinity;
  for (let a = 0; a <= 7; a++)
    for (let b = 0; b <= 7; b++)
      for (let c = 0; c <= 7; c++)
        for (let d = 0; d <= 7; d++) {
          const frets = [a, b, c, d];
          const down = fretted(frets);
          if (down.length && Math.max(...down) - Math.min(...down) > MAX_SPAN) continue;
          if (key(pitchClasses(frets, BARITONE_OPEN_MIDI)) !== expected) continue;
          const lowest = (BARITONE_OPEN_MIDI[0] + a) % 12;
          const c0 = cost(frets, chord.root.pitchClass) + (lowest === chord.root.pitchClass ? 0 : 1);
          if (c0 < bestCost) {
            best = frets;
            bestCost = c0;
          }
        }
  return best;
}
