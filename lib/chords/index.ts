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
} from './theory';
import {
  MOVABLE_SHAPES,
  OPEN_CHORDS,
  OPEN_STRING_MIDI,
  buildMovable,
  rootFretOnString,
  type Fingering,
  type Voicing,
} from './shapes';

export * from './theory';
export type { Fingering, Voicing } from './shapes';
export { OPEN_STRING_MIDI } from './shapes';

export interface Chord {
  slug: string;
  /** Display name with accidental glyphs, e.g. "E♭m7". */
  name: string;
  /** ASCII name for metadata and search, e.g. "Ebm7". */
  ascii: string;
  root: Root;
  quality: ChordQuality;
  notes: SpelledNote[];
  voicings: Voicing[];
}

/** Pitch classes a fingering actually sounds. */
export function fingeringPitchClasses(frets: Fingering): number[] {
  return [
    ...new Set(
      frets
        .map((fret, i) => (fret === null ? null : (OPEN_STRING_MIDI[i] + fret) % 12))
        .filter((pc): pc is number => pc !== null),
    ),
  ].sort((a, b) => a - b);
}

/** MIDI notes a fingering sounds, low to high — used for audio playback. */
export function fingeringMidiNotes(frets: Fingering): number[] {
  return frets
    .map((fret, i) => (fret === null ? null : OPEN_STRING_MIDI[i] + fret))
    .filter((note): note is number => note !== null);
}

const sameSet = (a: number[], b: number[]) =>
  a.length === b.length && a.every((value, i) => value === b[i]);

/** Two fingerings are the same shape if every string matches, muting included. */
const sameFingering = (a: Fingering, b: Fingering) =>
  a.length === b.length && a.every((fret, i) => fret === b[i]);

function buildChord(root: Root, quality: ChordQuality): Chord {
  const expected = expectedPitchClasses(root, quality);
  const voicings: Voicing[] = [];

  // Open position first when one exists — it is what a player reaches for.
  const openFrets = OPEN_CHORDS[`${root.slug}-${quality.slug}`];
  if (openFrets) {
    voicings.push({
      label: 'Open position',
      frets: openFrets,
      baseFret: 1,
    });
  }

  for (const shape of MOVABLE_SHAPES[quality.slug] ?? []) {
    const stringIndex = shape.rootString === 6 ? 0 : 1;
    const rootFret = rootFretOnString(root.pitchClass, stringIndex);
    const voicing = buildMovable(shape, rootFret);
    if (!voicing) continue;

    // Skip a shape that duplicates one we already have.
    if (voicings.some((existing) => sameFingering(existing.frets, voicing.frets))) {
      continue;
    }
    voicings.push(voicing);
  }

  return {
    slug: chordSlug(root, quality),
    name: chordName(root, quality),
    ascii: chordAscii(root, quality),
    root,
    quality,
    notes: spellChord(root, quality),
    voicings: voicings.filter((voicing) =>
      sameSet(fingeringPitchClasses(voicing.frets), expected),
    ),
  };
}

/** Every chord in the library, with only theory-correct voicings retained. */
export const CHORDS: Chord[] = ROOTS.flatMap((root) =>
  QUALITIES.map((quality) => buildChord(root, quality)),
).filter((chord) => chord.voicings.length > 0);

export const CHORD_BY_SLUG = new Map(CHORDS.map((chord) => [chord.slug, chord]));

export const getChord = (slug: string) => CHORD_BY_SLUG.get(slug);

/** Other chords worth showing on a chord's page. */
/** Rotate a list so it begins just after `from`, wrapping around. */
function rotateAfter<T>(items: T[], from: number): T[] {
  if (items.length === 0) return items;
  const start = ((from % items.length) + items.length) % items.length;
  return [...items.slice(start), ...items.slice(0, start)];
}

export function relatedChords(chord: Chord, limit = 8): Chord[] {
  // Both lists preserve the canonical ROOTS / QUALITIES order, so rotating
  // each to start just after this chord's own position turns the link graph
  // into a ring: every chord links forward to its neighbours, and therefore
  // every chord receives links back from the ones behind it.
  //
  // Slicing from index 0 instead — as this did originally — meant all 156
  // pages linked to the same handful of siblings, leaving the qualities late
  // in the array (6, m6, add9, dim, aug, 5) with no inbound link at all
  // except the /chords index.
  const qualityIndex = QUALITIES.findIndex(
    (q) => q.slug === chord.quality.slug,
  );
  const rootIndex = ROOTS.findIndex((r) => r.slug === chord.root.slug);

  const sameRoot = rotateAfter(
    CHORDS.filter(
      (other) =>
        other.root.slug === chord.root.slug && other.slug !== chord.slug,
    ),
    qualityIndex,
  );
  const sameQuality = rotateAfter(
    CHORDS.filter(
      (other) =>
        other.quality.slug === chord.quality.slug && other.slug !== chord.slug,
    ),
    rootIndex,
  );

  const seen = new Set<string>();
  const out: Chord[] = [];
  // Interleave so the list is not all one kind.
  for (let i = 0; i < Math.max(sameRoot.length, sameQuality.length); i++) {
    for (const candidate of [sameRoot[i], sameQuality[i]]) {
      if (candidate && !seen.has(candidate.slug) && out.length < limit) {
        seen.add(candidate.slug);
        out.push(candidate);
      }
    }
  }
  return out;
}

/**
 * Other chords built from exactly the same set of pitch classes.
 *
 * Not a curiosity — it is why C6 and Am7 are interchangeable in practice, and
 * knowing it doubles the chords a player can reach from one shape. Computed by
 * comparing pitch-class sets, so it is true by construction.
 */
export function sameNotesAs(chord: Chord): Chord[] {
  const mine = expectedPitchClasses(chord.root, chord.quality).join(',');
  return CHORDS.filter(
    (other) =>
      other.slug !== chord.slug &&
      expectedPitchClasses(other.root, other.quality).join(',') === mine,
  );
}

/** The chord this one most naturally resolves to or decorates, if any. */
export function parentChord(chord: Chord): Chord | undefined {
  const toMajor = ['sus2', 'sus4', '6', 'add9'];
  const toMinor = ['m6'];
  if (toMajor.includes(chord.quality.slug)) {
    return getChord(chordSlug(chord.root, QUALITIES[0]));
  }
  if (toMinor.includes(chord.quality.slug)) {
    return getChord(`${chord.root.slug}-minor`);
  }
  return undefined;
}

export interface ValidationIssue {
  chord: string;
  voicing: string;
  expected: number[];
  actual: number[];
  reason: string;
}

/**
 * Re-derive every shipped voicing from first principles and report any that
 * do not sound the chord they claim to. Run by scripts/validate-chords.mjs.
 */
export function validateChordLibrary(): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  for (const root of ROOTS) {
    for (const quality of QUALITIES) {
      const expected = expectedPitchClasses(root, quality);
      const chord = getChord(chordSlug(root, quality));
      if (!chord) {
        issues.push({
          chord: chordName(root, quality),
          voicing: '(none)',
          expected,
          actual: [],
          reason: 'no valid voicing found',
        });
        continue;
      }

      for (const voicing of chord.voicings) {
        const actual = fingeringPitchClasses(voicing.frets);
        if (!sameSet(actual, expected)) {
          issues.push({
            chord: chord.name,
            voicing: voicing.label,
            expected,
            actual,
            reason: 'pitch classes do not match the chord formula',
          });
        }
        // The lowest sounding note should be the root for these shapes.
        const midi = fingeringMidiNotes(voicing.frets);
        if (midi.length > 0 && midi[0] % 12 !== root.pitchClass) {
          issues.push({
            chord: chord.name,
            voicing: voicing.label,
            expected: [root.pitchClass],
            actual: [midi[0] % 12],
            reason: 'lowest note is not the root (inversion)',
          });
        }
      }
    }
  }

  return issues;
}
