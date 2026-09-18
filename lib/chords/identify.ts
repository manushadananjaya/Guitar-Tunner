/** Reverse chord lookup: from a fingering to the chord names it sounds.
 *
 *  This is `validateChordLibrary` run the other way. The library checks that a
 *  published shape sounds the notes its name promises; here we take whatever
 *  the player is holding, compute the notes it sounds, and search every
 *  root × quality for formulas that match. Because both directions use the
 *  same formulas, a shape this tool names will always be found under that
 *  name in the chord library, and vice versa. */

import {
  ROOTS,
  QUALITIES,
  spellChord,
  expectedPitchClasses,
  chordSlug,
  chordName,
  type Root,
  type ChordQuality,
} from './theory';
import type { Fingering } from './shapes';
import { intervalBySemitones } from '../intervals';

export interface ChordMatch {
  /** Display name including any slash bass, e.g. "C/E" or "Am7". */
  name: string;
  /** Slug of the chord page in /chords, without the slash bass. */
  slug: string;
  root: Root;
  quality: ChordQuality;
  /** Pitch class of the lowest sounding note. */
  bassPitchClass: number;
  /** Set when the lowest note is not the root: the spelled bass note. */
  slashBass?: string;
  /** True when the fingering is the chord minus its 5th. */
  omitsFifth: boolean;
  /** Spelled notes, in chord-formula order, with interval labels. */
  notes: { name: string; interval: string; pitchClass: number }[];
}

export interface IdentifiedNote {
  /** String index, 0 = lowest string. */
  string: number;
  fret: number;
  midi: number;
  pitchClass: number;
  /** Spelled per the best match, so C♯ major reads C♯ E♯ G♯. */
  name: string;
  /** Scientific octave, e.g. 4 in "E4". */
  octave: number;
}

export interface IdentifyResult {
  notes: IdentifiedNote[];
  matches: ChordMatch[];
  /** For a two-note shape: the interval between the sounded pitch classes. */
  intervalName?: string;
}

const SHARP_NAMES = ['C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯', 'A', 'A♯', 'B'];

const sameSet = (a: number[], b: number[]) =>
  a.length === b.length && a.every((value, i) => value === b[i]);

/** The pitch class of the 5th, if this quality has a perfect 5th. */
const perfectFifth = (quality: ChordQuality) =>
  quality.tones.find((tone) => tone.degree === 5 && tone.semitones === 7);

export function identifyChord(
  frets: Fingering,
  openMidi: number[],
): IdentifyResult {
  const sounded = frets
    .map((fret, i) =>
      fret === null ? null : { string: i, fret, midi: openMidi[i] + fret },
    )
    .filter((n): n is { string: number; fret: number; midi: number } => n !== null);

  const played = [...new Set(sounded.map((n) => n.midi % 12))].sort(
    (a, b) => a - b,
  );
  const bassPitchClass =
    sounded.length > 0
      ? Math.min(...sounded.map((n) => n.midi)) % 12
      : -1;

  const matches: ChordMatch[] = [];

  if (played.length >= 2) {
    for (const root of ROOTS) {
      for (const quality of QUALITIES) {
        const expected = expectedPitchClasses(root, quality);
        let omitsFifth = false;

        if (!sameSet(played, expected)) {
          // Guitarists drop the 5th constantly — it adds nothing to the
          // chord's identity — so a shape one 5th short of a 4-note formula is
          // still that chord. Two-note shapes are excluded: C–E is a major
          // 3rd, not "C(no5)".
          const fifth = perfectFifth(quality);
          if (!fifth || played.length < 3 || quality.tones.length < 4) continue;
          const without = expected.filter(
            (pc) => pc !== (root.pitchClass + 7) % 12,
          );
          if (!sameSet(played, without)) continue;
          omitsFifth = true;
        }

        const notes = spellChord(root, quality);
        const slash =
          bassPitchClass !== root.pitchClass
            ? notes.find((n) => n.pitchClass === bassPitchClass)?.name
            : undefined;

        matches.push({
          name: `${chordName(root, quality)}${slash ? `/${slash}` : ''}`,
          slug: chordSlug(root, quality),
          root,
          quality,
          bassPitchClass,
          slashBass: slash,
          omitsFifth,
          notes,
        });
      }
    }
  }

  // Ranking: a complete chord beats one missing its 5th; root in the bass
  // beats a slash chord; a simpler quality beats a more decorated one.
  matches.sort((a, b) => {
    if (a.omitsFifth !== b.omitsFifth) return a.omitsFifth ? 1 : -1;
    const aSlash = a.slashBass ? 1 : 0;
    const bSlash = b.slashBass ? 1 : 0;
    if (aSlash !== bSlash) return aSlash - bSlash;
    return a.quality.tones.length - b.quality.tones.length;
  });

  // Spell the sounded notes the way the best match spells them, so the note
  // list under a C♯ chord says E♯ rather than F.
  const spelling = new Map<number, string>();
  if (matches.length > 0) {
    for (const note of matches[0].notes) spelling.set(note.pitchClass, note.name);
  }

  const notes: IdentifiedNote[] = sounded
    .map((n) => {
      const pitchClass = n.midi % 12;
      return {
        ...n,
        pitchClass,
        name: spelling.get(pitchClass) ?? SHARP_NAMES[pitchClass],
        octave: Math.floor(n.midi / 12) - 1,
      };
    })
    .sort((a, b) => a.string - b.string);

  let intervalName: string | undefined;
  if (played.length === 2) {
    // Measured from the bass pitch class upward, so E2 + B2 + E3 reads as a
    // 5th rather than as the octave between its outermost strings.
    const other = played.find((pc) => pc !== bassPitchClass)!;
    intervalName = intervalBySemitones((other - bassPitchClass + 12) % 12)?.name;
  }

  return { notes, matches, intervalName };
}

/** `x-3-2-0-1-0` ⇄ Fingering, for shareable URLs. */
export const encodeFingering = (frets: Fingering) =>
  frets.map((fret) => (fret === null ? 'x' : String(fret))).join('-');

export function decodeFingering(
  value: string | null | undefined,
  stringCount: number,
  maxFret: number,
): Fingering | null {
  if (!value) return null;
  const parts = value.split('-');
  if (parts.length !== stringCount) return null;
  const frets = parts.map((part) => {
    if (part === 'x') return null;
    const n = Number(part);
    return Number.isInteger(n) && n >= 0 && n <= maxFret ? n : NaN;
  });
  return frets.some((fret) => Number.isNaN(fret)) ? null : (frets as Fingering);
}
