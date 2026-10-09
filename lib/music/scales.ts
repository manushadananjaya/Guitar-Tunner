/** Scales, keys, and diatonic harmony — shared by the scale explorer, the
 *  circle of fifths, the progression builder, and the transposer.
 *
 *  Spelling is done by letter, the same way `spellChord` does it: degree N of
 *  a scale must use the letter N-1 steps above the tonic's letter, and the
 *  accidental is whatever distance is left over. That is why F♯ major comes
 *  out with an E♯ rather than an F, and why D major has F♯ rather than G♭. */

import { LETTERS } from '@/lib/chords/theory';

const LETTER_PITCH: Record<string, number> = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
const ACCIDENTAL_GLYPH: Record<number, string> = { [-2]: '𝄫', [-1]: '♭', 0: '', 1: '♯', 2: '𝄪' };

const mod12 = (n: number) => ((n % 12) + 12) % 12;

/** A note name as letter + accidental. `accidental` is -2..2. */
export interface Spelling {
  letter: string;
  accidental: number;
}

export const spellingName = (s: Spelling) => `${s.letter}${ACCIDENTAL_GLYPH[s.accidental] ?? ''}`;
export const spellingAscii = (s: Spelling) =>
  `${s.letter}${s.accidental > 0 ? '#'.repeat(s.accidental) : 'b'.repeat(-s.accidental)}`;
export const spellingPitch = (s: Spelling) => mod12(LETTER_PITCH[s.letter] + s.accidental);

/** The two plausible spellings of a pitch class: sharp-side first, then flat.
 *  Natural notes have one. */
export function spellingsFor(pitchClass: number): Spelling[] {
  const pc = mod12(pitchClass);
  const natural = LETTERS.find((l) => LETTER_PITCH[l] === pc);
  if (natural) return [{ letter: natural, accidental: 0 }];
  const sharp = LETTERS.find((l) => LETTER_PITCH[l] === mod12(pc - 1))!;
  const flat = LETTERS.find((l) => LETTER_PITCH[l] === mod12(pc + 1))!;
  return [
    { letter: sharp, accidental: 1 },
    { letter: flat, accidental: -1 },
  ];
}

/** Semitones of the major scale, used to label every other scale's degrees. */
export const MAJOR_STEPS = [0, 2, 4, 5, 7, 9, 11];

export interface ScaleType {
  slug: string;
  name: string;
  /** Semitones above the tonic. */
  steps: number[];
  /** Scale degree (1–7) each step is spelled as. Pentatonic and blues
   *  scales skip degrees, so this cannot be inferred from the index. */
  degrees: number[];
  /** Short note on what it sounds like and where it is used. */
  character: string;
  /** Whether the scale's 3rd is minor — used to pick a key name. */
  minor: boolean;
}

export const SCALES: ScaleType[] = [
  {
    slug: 'minor-pentatonic',
    name: 'Minor pentatonic',
    steps: [0, 3, 5, 7, 10],
    degrees: [1, 3, 4, 5, 7],
    character:
      'Five notes, no semitones, nothing that clashes. The first scale most rock and blues players learn, and the one most solos are built on.',
    minor: true,
  },
  {
    slug: 'major-pentatonic',
    name: 'Major pentatonic',
    steps: [0, 2, 4, 7, 9],
    degrees: [1, 2, 3, 5, 6],
    character:
      'The bright twin of the minor pentatonic — same five shapes, different root. Country, folk, and sweet-sounding rock leads.',
    minor: false,
  },
  {
    slug: 'blues',
    name: 'Blues scale',
    steps: [0, 3, 5, 6, 7, 10],
    degrees: [1, 3, 4, 5, 5, 7],
    character:
      'Minor pentatonic plus the ♭5 "blue note". Use the ♭5 as a passing note on the way to the 4th or 5th rather than a note to land on.',
    minor: true,
  },
  {
    slug: 'major',
    name: 'Major (Ionian)',
    steps: [0, 2, 4, 5, 7, 9, 11],
    degrees: [1, 2, 3, 4, 5, 6, 7],
    character:
      'Do-re-mi. The reference every other scale is described against, and the source of the chords in most pop songs.',
    minor: false,
  },
  {
    slug: 'natural-minor',
    name: 'Natural minor (Aeolian)',
    steps: [0, 2, 3, 5, 7, 8, 10],
    degrees: [1, 2, 3, 4, 5, 6, 7],
    character:
      'The plain minor scale: the major scale started from its 6th note. Dark and familiar — most minor-key rock and pop lives here.',
    minor: true,
  },
  {
    slug: 'harmonic-minor',
    name: 'Harmonic minor',
    steps: [0, 2, 3, 5, 7, 8, 11],
    degrees: [1, 2, 3, 4, 5, 6, 7],
    character:
      'Natural minor with a raised 7th, which makes the V chord major. The wide step from ♭6 to 7 gives it its exotic, neoclassical sound.',
    minor: true,
  },
  {
    slug: 'melodic-minor',
    name: 'Melodic minor',
    steps: [0, 2, 3, 5, 7, 9, 11],
    degrees: [1, 2, 3, 4, 5, 6, 7],
    character:
      'A minor 3rd under an otherwise major scale. Smooth and jazzy; jazz players use the ascending form in both directions.',
    minor: true,
  },
  {
    slug: 'dorian',
    name: 'Dorian',
    steps: [0, 2, 3, 5, 7, 9, 10],
    degrees: [1, 2, 3, 4, 5, 6, 7],
    character:
      'Minor with a natural 6th — less sombre than natural minor. Funk, soul, and a lot of jam-band soloing over minor chords.',
    minor: true,
  },
  {
    slug: 'phrygian',
    name: 'Phrygian',
    steps: [0, 1, 3, 5, 7, 8, 10],
    degrees: [1, 2, 3, 4, 5, 6, 7],
    character:
      'Minor with a ♭2 right next to the root. Heavy, tense, and Spanish-flavoured; common in metal riffs.',
    minor: true,
  },
  {
    slug: 'lydian',
    name: 'Lydian',
    steps: [0, 2, 4, 6, 7, 9, 11],
    degrees: [1, 2, 3, 4, 5, 6, 7],
    character:
      'Major with a raised 4th. Floating and dreamy — a favourite of film composers.',
    minor: false,
  },
  {
    slug: 'mixolydian',
    name: 'Mixolydian',
    steps: [0, 2, 4, 5, 7, 9, 10],
    degrees: [1, 2, 3, 4, 5, 6, 7],
    character:
      'Major with a ♭7. The sound of a dominant 7th chord stretched into a scale; classic rock, blues-rock, and Celtic tunes.',
    minor: false,
  },
  {
    slug: 'locrian',
    name: 'Locrian',
    steps: [0, 1, 3, 5, 6, 8, 10],
    degrees: [1, 2, 3, 4, 5, 6, 7],
    character:
      'The only mode with a diminished 5th, so its tonic chord is unstable. Mostly a theory curiosity, used over half-diminished chords.',
    minor: true,
  },
];

export const getScale = (slug: string) => SCALES.find((s) => s.slug === slug) ?? SCALES[0];

/** Interval label for a scale step, e.g. "♭3", "♯4", "5". */
export function intervalLabel(step: number, degree: number): string {
  if (step === 0) return 'R';
  const diff = step - MAJOR_STEPS[degree - 1];
  const prefix = diff < 0 ? '♭'.repeat(-diff) : '♯'.repeat(diff);
  return `${prefix}${degree}`;
}

export interface SpelledScaleNote {
  spelling: Spelling;
  name: string;
  pitchClass: number;
  /** "R", "♭3", "5", ... */
  interval: string;
  step: number;
}

/** Spell a scale from an explicit tonic spelling. */
export function spellScaleFrom(tonic: Spelling, scale: ScaleType): SpelledScaleNote[] {
  const tonicIndex = LETTERS.indexOf(tonic.letter as (typeof LETTERS)[number]);
  const tonicPitch = spellingPitch(tonic);
  return scale.steps.map((step, i) => {
    const degree = scale.degrees[i];
    const letter = LETTERS[(tonicIndex + degree - 1) % 7];
    let accidental = mod12(tonicPitch + step) - LETTER_PITCH[letter];
    if (accidental > 6) accidental -= 12;
    if (accidental < -6) accidental += 12;
    const spelling = { letter, accidental };
    return {
      spelling,
      name: spellingName(spelling),
      pitchClass: mod12(tonicPitch + step),
      interval: intervalLabel(step, degree),
      step,
    };
  });
}

/** How awkward a spelling is to read: double accidentals count heavily,
 *  then the number of accidentals. */
const awkwardness = (notes: SpelledScaleNote[]) =>
  notes.reduce(
    (sum, n) => sum + (Math.abs(n.spelling.accidental) > 1 ? 10 : Math.abs(n.spelling.accidental)),
    0,
  );

/** Pick the readable spelling of a scale on a pitch class: G♯ minor rather
 *  than A♭ minor, but A♭ major rather than G♯ major. */
export function spellScale(pitchClass: number, scale: ScaleType) {
  const options = spellingsFor(pitchClass).map((tonic) => ({
    tonic,
    notes: spellScaleFrom(tonic, scale),
  }));
  options.sort((a, b) => awkwardness(a.notes) - awkwardness(b.notes));
  return options[0];
}

/* ───────────────────────── Keys and diatonic chords ───────────────────────── */

export type KeyMode = 'major' | 'minor';

export interface DiatonicChord {
  /** Roman numeral, e.g. "IV", "ii", "vii°". */
  numeral: string;
  /** Root as a spelled note in this key. */
  root: Spelling;
  rootName: string;
  rootPitch: number;
  /** Quality slug from lib/chords/theory, e.g. "major", "minor", "dim", "7". */
  quality: string;
  /** Display name, e.g. "F♯m". */
  name: string;
  /** Scale degree, 1–7. */
  degree: number;
}

export const QUALITY_SUFFIX: Record<string, string> = {
  major: '',
  minor: 'm',
  dim: 'dim',
  aug: 'aug',
  '7': '7',
  maj7: 'maj7',
  m7: 'm7',
  sus2: 'sus2',
  sus4: 'sus4',
  '6': '6',
  m6: 'm6',
  add9: 'add9',
  '5': '5',
};

const MAJOR_QUALITIES = ['major', 'minor', 'minor', 'major', 'major', 'minor', 'dim'];
const MAJOR_NUMERALS = ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii°'];
const MINOR_QUALITIES = ['minor', 'dim', 'major', 'minor', 'minor', 'major', 'major'];
const MINOR_NUMERALS = ['i', 'ii°', 'III', 'iv', 'v', 'VI', 'VII'];

/** The tonic spelling conventionally used for each key. Six sharps and six
 *  flats are both legitimate at the bottom of the circle; we pick F♯ major
 *  and E♭ minor and mention the alternative where it matters. */
const MAJOR_TONICS: Record<number, Spelling> = {
  0: { letter: 'C', accidental: 0 },
  1: { letter: 'D', accidental: -1 },
  2: { letter: 'D', accidental: 0 },
  3: { letter: 'E', accidental: -1 },
  4: { letter: 'E', accidental: 0 },
  5: { letter: 'F', accidental: 0 },
  6: { letter: 'F', accidental: 1 },
  7: { letter: 'G', accidental: 0 },
  8: { letter: 'A', accidental: -1 },
  9: { letter: 'A', accidental: 0 },
  10: { letter: 'B', accidental: -1 },
  11: { letter: 'B', accidental: 0 },
};
const MINOR_TONICS: Record<number, Spelling> = {
  0: { letter: 'C', accidental: 0 },
  1: { letter: 'C', accidental: 1 },
  2: { letter: 'D', accidental: 0 },
  3: { letter: 'E', accidental: -1 },
  4: { letter: 'E', accidental: 0 },
  5: { letter: 'F', accidental: 0 },
  6: { letter: 'F', accidental: 1 },
  7: { letter: 'G', accidental: 0 },
  8: { letter: 'G', accidental: 1 },
  9: { letter: 'A', accidental: 0 },
  10: { letter: 'B', accidental: -1 },
  11: { letter: 'B', accidental: 0 },
};

export const keyTonic = (pitchClass: number, mode: KeyMode): Spelling =>
  (mode === 'major' ? MAJOR_TONICS : MINOR_TONICS)[mod12(pitchClass)];

export const keyName = (pitchClass: number, mode: KeyMode) =>
  `${spellingName(keyTonic(pitchClass, mode))} ${mode}`;

/** Scale notes of a key, conventionally spelled. */
export const keyScale = (pitchClass: number, mode: KeyMode) =>
  spellScaleFrom(keyTonic(pitchClass, mode), getScale(mode === 'major' ? 'major' : 'natural-minor'));

export function diatonicChords(pitchClass: number, mode: KeyMode): DiatonicChord[] {
  const notes = keyScale(pitchClass, mode);
  const qualities = mode === 'major' ? MAJOR_QUALITIES : MINOR_QUALITIES;
  const numerals = mode === 'major' ? MAJOR_NUMERALS : MINOR_NUMERALS;
  return notes.map((note, i) => ({
    numeral: numerals[i],
    root: note.spelling,
    rootName: note.name,
    rootPitch: note.pitchClass,
    quality: qualities[i],
    name: `${note.name}${QUALITY_SUFFIX[qualities[i]]}`,
    degree: i + 1,
  }));
}

/** Key signature: the accidentals a key carries, in the standard order. */
export function keySignature(pitchClass: number, mode: KeyMode) {
  const notes = keyScale(pitchClass, mode);
  const sharps = notes.filter((n) => n.spelling.accidental > 0).map((n) => n.name);
  const flats = notes.filter((n) => n.spelling.accidental < 0).map((n) => n.name);
  const SHARP_ORDER = ['F', 'C', 'G', 'D', 'A', 'E', 'B'];
  const FLAT_ORDER = ['B', 'E', 'A', 'D', 'G', 'C', 'F'];
  const order = (list: string[], seq: string[]) =>
    [...list].sort((a, b) => seq.indexOf(a[0]) - seq.indexOf(b[0]));
  return sharps.length > 0
    ? { count: sharps.length, type: 'sharps' as const, notes: order(sharps, SHARP_ORDER) }
    : { count: flats.length, type: 'flats' as const, notes: order(flats, FLAT_ORDER) };
}

/** Keys in circle-of-fifths order, starting from C and moving clockwise. */
export const CIRCLE_MAJOR_PCS = [0, 7, 2, 9, 4, 11, 6, 1, 8, 3, 10, 5];
