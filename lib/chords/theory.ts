/** Chord theory primitives: roots, formulas, and correct enharmonic spelling. */

export const LETTERS = ['C', 'D', 'E', 'F', 'G', 'A', 'B'] as const;
/** Pitch class of each natural letter. */
const LETTER_PITCH: Record<string, number> = {
  C: 0,
  D: 2,
  E: 4,
  F: 5,
  G: 7,
  A: 9,
  B: 11,
};

const ACCIDENTAL_LABEL: Record<number, string> = {
  [-2]: '𝄫',
  [-1]: '♭',
  [0]: '',
  [1]: '♯',
  [2]: '𝄪',
};

export interface Root {
  /** URL-safe identifier, e.g. "c-sharp". */
  slug: string;
  /** Display name with a real accidental glyph, e.g. "C♯". */
  name: string;
  /** ASCII form used in prose and metadata, e.g. "C#". */
  ascii: string;
  /** Letter component, e.g. "C". */
  letter: string;
  /** Semitone offset from the natural letter: -1, 0, or 1. */
  accidental: number;
  /** 0-11. */
  pitchClass: number;
}

const makeRoot = (
  slug: string,
  letter: string,
  accidental: number,
): Root => ({
  slug,
  letter,
  accidental,
  name: `${letter}${ACCIDENTAL_LABEL[accidental]}`,
  ascii: `${letter}${accidental === 1 ? '#' : accidental === -1 ? 'b' : ''}`,
  pitchClass: (((LETTER_PITCH[letter] + accidental) % 12) + 12) % 12,
});

/** The twelve roots, each spelled the way guitarists conventionally write it. */
export const ROOTS: Root[] = [
  makeRoot('c', 'C', 0),
  makeRoot('c-sharp', 'C', 1),
  makeRoot('d', 'D', 0),
  makeRoot('e-flat', 'E', -1),
  makeRoot('e', 'E', 0),
  makeRoot('f', 'F', 0),
  makeRoot('f-sharp', 'F', 1),
  makeRoot('g', 'G', 0),
  makeRoot('a-flat', 'A', -1),
  makeRoot('a', 'A', 0),
  makeRoot('b-flat', 'B', -1),
  makeRoot('b', 'B', 0),
];

/** One member of a chord: its distance in semitones and its scale degree.
 *  The degree drives spelling — a ♯9 and a ♭3 are the same pitch but are
 *  different notes on paper, and guitarists read chord charts, not pitch sets. */
export interface ChordTone {
  semitones: number;
  degree: number;
}

export interface ChordQuality {
  /** URL fragment, e.g. "m7". Empty string for a plain major. */
  slug: string;
  /** Suffix appended to the root, e.g. "m7" in "Am7". */
  suffix: string;
  /** Human name, e.g. "minor 7th". */
  name: string;
  /** Plain-language description of the sound, used on the chord page. */
  character: string;
  tones: ChordTone[];
}

export const QUALITIES: ChordQuality[] = [
  {
    slug: 'major',
    suffix: '',
    name: 'major',
    character:
      'The bright, resolved, "happy" sound. The most common chord in Western music.',
    tones: [
      { semitones: 0, degree: 1 },
      { semitones: 4, degree: 3 },
      { semitones: 7, degree: 5 },
    ],
  },
  {
    slug: 'minor',
    suffix: 'm',
    name: 'minor',
    character:
      'Darker and more melancholy than major. A single semitone — the flattened third — makes the whole difference.',
    tones: [
      { semitones: 0, degree: 1 },
      { semitones: 3, degree: 3 },
      { semitones: 7, degree: 5 },
    ],
  },
  {
    slug: '7',
    suffix: '7',
    name: 'dominant 7th',
    character:
      'Restless and bluesy. The flattened 7th creates tension that wants to resolve, which is why it drives blues and turnarounds.',
    tones: [
      { semitones: 0, degree: 1 },
      { semitones: 4, degree: 3 },
      { semitones: 7, degree: 5 },
      { semitones: 10, degree: 7 },
    ],
  },
  {
    slug: 'maj7',
    suffix: 'maj7',
    name: 'major 7th',
    character:
      'Lush, warm, and jazzy. The natural 7th sits a semitone below the octave, giving a soft, unresolved shimmer.',
    tones: [
      { semitones: 0, degree: 1 },
      { semitones: 4, degree: 3 },
      { semitones: 7, degree: 5 },
      { semitones: 11, degree: 7 },
    ],
  },
  {
    slug: 'm7',
    suffix: 'm7',
    name: 'minor 7th',
    character:
      'Mellow and smooth. Softer than a plain minor chord, and the backbone of soul, funk, and jazz comping.',
    tones: [
      { semitones: 0, degree: 1 },
      { semitones: 3, degree: 3 },
      { semitones: 7, degree: 5 },
      { semitones: 10, degree: 7 },
    ],
  },
  {
    slug: 'sus2',
    suffix: 'sus2',
    name: 'suspended 2nd',
    character:
      'Open and unresolved. The third is replaced by a second, so the chord is neither major nor minor.',
    tones: [
      { semitones: 0, degree: 1 },
      { semitones: 2, degree: 2 },
      { semitones: 7, degree: 5 },
    ],
  },
  {
    slug: 'sus4',
    suffix: 'sus4',
    name: 'suspended 4th',
    character:
      'Tense and expectant. The fourth replaces the third and strains to fall back to it — the classic delayed resolution.',
    tones: [
      { semitones: 0, degree: 1 },
      { semitones: 5, degree: 4 },
      { semitones: 7, degree: 5 },
    ],
  },
  {
    slug: '6',
    suffix: '6',
    name: 'major 6th',
    character:
      'Sweet and vintage. A major chord with an added 6th, common in jazz, rockabilly, and 1950s pop.',
    tones: [
      { semitones: 0, degree: 1 },
      { semitones: 4, degree: 3 },
      { semitones: 7, degree: 5 },
      { semitones: 9, degree: 6 },
    ],
  },
  {
    slug: 'm6',
    suffix: 'm6',
    name: 'minor 6th',
    character:
      'Wistful and slightly unsettled — a minor chord with a bright 6th sitting on top of it.',
    tones: [
      { semitones: 0, degree: 1 },
      { semitones: 3, degree: 3 },
      { semitones: 7, degree: 5 },
      { semitones: 9, degree: 6 },
    ],
  },
  {
    slug: 'add9',
    suffix: 'add9',
    name: 'added 9th',
    character:
      'Shimmering and modern. A plain major chord with a 9th added on top, keeping the third intact.',
    tones: [
      { semitones: 0, degree: 1 },
      { semitones: 2, degree: 9 },
      { semitones: 4, degree: 3 },
      { semitones: 7, degree: 5 },
    ],
  },
  {
    slug: 'dim',
    suffix: 'dim',
    name: 'diminished',
    character:
      'Tense and unstable. Both the third and the fifth are flattened, producing a chord that badly wants to move somewhere else.',
    tones: [
      { semitones: 0, degree: 1 },
      { semitones: 3, degree: 3 },
      { semitones: 6, degree: 5 },
    ],
  },
  {
    slug: 'aug',
    suffix: 'aug',
    name: 'augmented',
    character:
      'Strange and suspended in mid-air. The raised fifth divides the octave evenly, so the chord has no natural home.',
    tones: [
      { semitones: 0, degree: 1 },
      { semitones: 4, degree: 3 },
      { semitones: 8, degree: 5 },
    ],
  },
  {
    slug: '5',
    suffix: '5',
    name: 'power chord',
    character:
      'Root and fifth only. With no third it is neither major nor minor, which is exactly why it survives heavy distortion.',
    tones: [
      { semitones: 0, degree: 1 },
      { semitones: 7, degree: 5 },
    ],
  },
];

export interface SpelledNote {
  /** e.g. "E♭". */
  name: string;
  /** e.g. "b3" — the interval label. */
  interval: string;
  pitchClass: number;
}

const INTERVAL_LABELS: Record<string, string> = {
  '1-0': 'root',
  '2-2': '2nd',
  '3-3': '♭3rd',
  '3-4': '3rd',
  '4-5': '4th',
  '5-6': '♭5th',
  '5-7': '5th',
  '5-8': '♯5th',
  '6-9': '6th',
  '7-10': '♭7th',
  '7-11': '7th',
  '9-2': '9th',
};

/**
 * Spell a chord's notes with correct letter names.
 *
 * Pitch class alone is not enough: C♯ major is C♯ E♯ G♯, not C♯ F G♯, even
 * though E♯ and F sound identical. Each chord tone carries a scale degree, and
 * the degree fixes which letter it must use; the accidental is then whatever
 * distance remains between that letter and the target pitch.
 */
export function spellChord(root: Root, quality: ChordQuality): SpelledNote[] {
  const rootLetterIndex = LETTERS.indexOf(root.letter as (typeof LETTERS)[number]);

  return quality.tones.map((tone) => {
    // Degree 9 occupies the same letter as degree 2, 11 as 4, and so on.
    const degreeWithinOctave = ((tone.degree - 1) % 7) + 1;
    const letterIndex = (rootLetterIndex + degreeWithinOctave - 1) % 7;
    const letter = LETTERS[letterIndex];

    const targetPitch = (root.pitchClass + tone.semitones) % 12;
    const naturalPitch = LETTER_PITCH[letter];

    // Shortest signed distance from the natural letter to the target pitch.
    let accidental = targetPitch - naturalPitch;
    if (accidental > 6) accidental -= 12;
    if (accidental < -6) accidental += 12;

    return {
      name: `${letter}${ACCIDENTAL_LABEL[accidental] ?? `(${accidental})`}`,
      interval:
        INTERVAL_LABELS[`${degreeWithinOctave}-${tone.semitones}`] ??
        `degree ${tone.degree}`,
      pitchClass: targetPitch,
    };
  });
}

/** Pitch classes a fingering must produce, as a sorted list. */
export function expectedPitchClasses(
  root: Root,
  quality: ChordQuality,
): number[] {
  return [
    ...new Set(
      quality.tones.map((tone) => (root.pitchClass + tone.semitones) % 12),
    ),
  ].sort((a, b) => a - b);
}

/** Scale degrees of a major scale, in semitones. */
const MAJOR_SCALE = [0, 2, 4, 5, 7, 9, 11];

/** The seven diatonic chords of a major key, by scale degree. */
const DIATONIC_TRIADS = ['major', 'minor', 'minor', 'major', 'major', 'minor', 'dim'];
const DIATONIC_SEVENTHS = ['maj7', 'm7', 'm7', 'maj7', '7', 'm7', 'dim'];
const ROMAN = ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii°'];

export interface KeyMembership {
  /** Tonic of the major key, e.g. "G". */
  key: string;
  /** Roman numeral of this chord within that key, e.g. "IV". */
  numeral: string;
}

/**
 * The major keys this chord belongs to, with its roman numeral in each.
 *
 * Real, per-chord music theory rather than boilerplate: C major is I of C,
 * IV of G, and V of F, and that set differs for every chord in the library.
 * Only defined for qualities that occur diatonically — sus, 6, add9, aug and
 * power chords are not diatonic triads, so they return an empty list rather
 * than a fabricated one.
 */
export function keysContaining(
  root: Root,
  quality: ChordQuality,
): KeyMembership[] {
  const table =
    DIATONIC_TRIADS.includes(quality.slug) &&
    ['major', 'minor', 'dim'].includes(quality.slug)
      ? DIATONIC_TRIADS
      : ['maj7', 'm7', '7'].includes(quality.slug)
        ? DIATONIC_SEVENTHS
        : null;
  if (!table) return [];

  const out: KeyMembership[] = [];
  for (const tonic of ROOTS) {
    for (let degree = 0; degree < 7; degree++) {
      if (table[degree] !== quality.slug) continue;
      const degreePitch = (tonic.pitchClass + MAJOR_SCALE[degree]) % 12;
      if (degreePitch !== root.pitchClass) continue;
      out.push({ key: tonic.name, numeral: ROMAN[degree] });
    }
  }
  return out;
}

export const chordSlug = (root: Root, quality: ChordQuality) =>
  quality.slug === 'major' ? root.slug : `${root.slug}-${quality.slug}`;

export const chordName = (root: Root, quality: ChordQuality) =>
  `${root.name}${quality.suffix}`;

export const chordAscii = (root: Root, quality: ChordQuality) =>
  `${root.ascii}${quality.suffix}`;
