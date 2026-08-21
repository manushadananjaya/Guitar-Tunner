/** Guitar fingerings: movable barre shapes plus hand-entered open positions.
 *
 *  Every shape here is verified against chord theory by `validateChordLibrary`
 *  (see lib/chords/index.ts) — a fingering only ships if the notes it actually
 *  produces are exactly the notes the chord is supposed to contain. */

/** Open-string MIDI numbers in standard tuning, string 6 to string 1. */
export const OPEN_STRING_MIDI = [40, 45, 50, 55, 59, 64];

/** A fret per string, string 6 first. `null` means the string is not played. */
export type Fingering = (number | null)[];

export interface Voicing {
  /** e.g. "Open position" or "Barre, E shape". */
  label: string;
  frets: Fingering;
  /** Fret the barre sits at, if any. */
  barreFret?: number;
  /** Lowest fret drawn; 1 for open-position diagrams. */
  baseFret: number;
}

/** A movable shape expressed as offsets from the root fret. */
interface MovableShape {
  label: string;
  /** Offset per string from the root fret; null = muted. */
  offsets: (number | null)[];
  /** Which string carries the root: 6 or 5. */
  rootString: 6 | 5;
  /** True when the index finger barres the root fret. */
  barred: boolean;
}

/**
 * Movable shapes, keyed by chord quality slug.
 *
 * Offsets are relative to the root fret. For a shape rooted on string 6, the
 * root fret is where that string is fretted; the E-shape major below at root
 * fret 1 gives 1-3-3-2-1-1, which is F.
 */
export const MOVABLE_SHAPES: Record<string, MovableShape[]> = {
  major: [
    {
      label: 'Barre, E shape',
      offsets: [0, 2, 2, 1, 0, 0],
      rootString: 6,
      barred: true,
    },
    {
      label: 'Barre, A shape',
      offsets: [null, 0, 2, 2, 2, 0],
      rootString: 5,
      barred: true,
    },
  ],
  minor: [
    {
      label: 'Barre, Em shape',
      offsets: [0, 2, 2, 0, 0, 0],
      rootString: 6,
      barred: true,
    },
    {
      label: 'Barre, Am shape',
      offsets: [null, 0, 2, 2, 1, 0],
      rootString: 5,
      barred: true,
    },
  ],
  '7': [
    {
      label: 'Barre, E7 shape',
      offsets: [0, 2, 0, 1, 0, 0],
      rootString: 6,
      barred: true,
    },
    {
      label: 'Barre, A7 shape',
      offsets: [null, 0, 2, 0, 2, 0],
      rootString: 5,
      barred: true,
    },
  ],
  maj7: [
    {
      label: 'Barre, Emaj7 shape',
      offsets: [0, 2, 1, 1, 0, 0],
      rootString: 6,
      barred: true,
    },
    {
      label: 'Barre, Amaj7 shape',
      offsets: [null, 0, 2, 1, 2, 0],
      rootString: 5,
      barred: true,
    },
  ],
  m7: [
    {
      label: 'Barre, Em7 shape',
      offsets: [0, 2, 0, 0, 0, 0],
      rootString: 6,
      barred: true,
    },
    {
      label: 'Barre, Am7 shape',
      offsets: [null, 0, 2, 0, 1, 0],
      rootString: 5,
      barred: true,
    },
  ],
  sus2: [
    {
      label: 'Barre, Asus2 shape',
      offsets: [null, 0, 2, 2, 0, 0],
      rootString: 5,
      barred: false,
    },
  ],
  sus4: [
    {
      label: 'Barre, Esus4 shape',
      offsets: [0, 2, 2, 2, 0, 0],
      rootString: 6,
      barred: true,
    },
    {
      label: 'Barre, Asus4 shape',
      offsets: [null, 0, 2, 2, 3, 0],
      rootString: 5,
      barred: true,
    },
  ],
  '6': [
    {
      label: 'Barre, E6 shape',
      offsets: [0, 2, 2, 1, 2, 0],
      rootString: 6,
      barred: true,
    },
    {
      label: 'Barre, A6 shape',
      offsets: [null, 0, 2, 2, 2, 2],
      rootString: 5,
      barred: false,
    },
  ],
  m6: [
    {
      label: 'Barre, Em6 shape',
      offsets: [0, 2, 2, 0, 2, 0],
      rootString: 6,
      barred: true,
    },
    {
      label: 'Barre, Am6 shape',
      offsets: [null, 0, 2, 2, 1, 2],
      rootString: 5,
      barred: false,
    },
  ],
  add9: [
    {
      label: 'Barre, A shape',
      offsets: [null, 0, 2, 4, 2, 0],
      rootString: 5,
      barred: false,
    },
  ],
  dim: [
    {
      label: 'Movable, root on 5th string',
      offsets: [null, 0, 1, 2, 1, null],
      rootString: 5,
      barred: false,
    },
  ],
  aug: [
    {
      label: 'Movable, root on 5th string',
      offsets: [null, 0, 3, 2, 2, 1],
      rootString: 5,
      barred: false,
    },
  ],
  '5': [
    {
      label: 'Power chord, root on 6th string',
      offsets: [0, 2, 2, null, null, null],
      rootString: 6,
      barred: false,
    },
    {
      label: 'Power chord, root on 5th string',
      offsets: [null, 0, 2, 2, null, null],
      rootString: 5,
      barred: false,
    },
  ],
};

/**
 * Hand-entered open-position chords, keyed by `${rootSlug}-${qualitySlug}`.
 * These are the shapes players actually use, which are often not transposed
 * barre forms — open strings let a voicing ring in ways a barre cannot.
 */
export const OPEN_CHORDS: Record<string, Fingering> = {
  // Major
  'c-major': [null, 3, 2, 0, 1, 0],
  'a-major': [null, 0, 2, 2, 2, 0],
  'g-major': [3, 2, 0, 0, 0, 3],
  'e-major': [0, 2, 2, 1, 0, 0],
  'd-major': [null, null, 0, 2, 3, 2],
  'f-major': [1, 3, 3, 2, 1, 1],

  // Minor
  'a-minor': [null, 0, 2, 2, 1, 0],
  'e-minor': [0, 2, 2, 0, 0, 0],
  'd-minor': [null, null, 0, 2, 3, 1],

  // Dominant 7
  'a-7': [null, 0, 2, 0, 2, 0],
  'b-7': [null, 2, 1, 2, 0, 2],
  'c-7': [null, 3, 2, 3, 1, 0],
  'd-7': [null, null, 0, 2, 1, 2],
  'e-7': [0, 2, 0, 1, 0, 0],
  'g-7': [3, 2, 0, 0, 0, 1],

  // Major 7
  'c-maj7': [null, 3, 2, 0, 0, 0],
  'a-maj7': [null, 0, 2, 1, 2, 0],
  'd-maj7': [null, null, 0, 2, 2, 2],
  'e-maj7': [0, 2, 1, 1, 0, 0],
  'f-maj7': [null, null, 3, 2, 1, 0],
  'g-maj7': [3, 2, 0, 0, 0, 2],

  // Minor 7
  'a-m7': [null, 0, 2, 0, 1, 0],
  'e-m7': [0, 2, 0, 0, 0, 0],
  'd-m7': [null, null, 0, 2, 1, 1],

  // Suspended
  'a-sus2': [null, 0, 2, 2, 0, 0],
  'd-sus2': [null, null, 0, 2, 3, 0],
  'e-sus4': [0, 2, 2, 2, 0, 0],
  'a-sus4': [null, 0, 2, 2, 3, 0],
  'd-sus4': [null, null, 0, 2, 3, 3],

  // Sixths
  'c-6': [null, 3, 2, 2, 1, 0],
  'a-6': [null, 0, 2, 2, 2, 2],
  'e-6': [0, 2, 2, 1, 2, 0],
  'g-6': [3, 2, 0, 0, 0, 0],
  'a-m6': [null, 0, 2, 2, 1, 2],
  'e-m6': [0, 2, 2, 0, 2, 0],

  // Added 9th
  'c-add9': [null, 3, 2, 0, 3, 0],
  'a-add9': [null, 0, 2, 4, 2, 0],
  'g-add9': [3, 0, 0, 0, 0, 3],

  // Power chords
  'e-5': [0, 2, 2, null, null, null],
  'a-5': [null, 0, 2, 2, null, null],
};

/** Realise a movable shape at a given root fret. */
export function buildMovable(
  shape: MovableShape,
  rootFret: number,
): Voicing | null {
  if (rootFret < 0 || rootFret > 11) return null;
  // A barred shape at fret 0 would need the index finger where the nut already
  // is — that is just the open chord, which OPEN_CHORDS supplies.
  if (shape.barred && rootFret === 0) return null;

  const frets = shape.offsets.map((offset) =>
    offset === null ? null : rootFret + offset,
  );

  const played = frets.filter((f): f is number => f !== null);
  // Open strings do not constrain where the diagram starts.
  const fretted = played.filter((f) => f > 0);
  const lowest = fretted.length > 0 ? Math.min(...fretted) : 1;

  return {
    label: shape.label,
    frets,
    barreFret: shape.barred ? rootFret : undefined,
    // Diagrams start at fret 1 when the shape is low on the neck, otherwise
    // they scroll up so the shape fits in five frets. A voicing containing an
    // open string must start at 1, or the open marker would be meaningless.
    baseFret: lowest <= 4 || played.some((f) => f === 0) ? 1 : lowest,
  };
}

/** Fret at which a root note sits on a given string. */
export function rootFretOnString(
  rootPitchClass: number,
  stringIndex: number,
): number {
  const openPitch = OPEN_STRING_MIDI[stringIndex] % 12;
  return (((rootPitchClass - openPitch) % 12) + 12) % 12;
}
