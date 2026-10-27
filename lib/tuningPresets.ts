// Standard note frequencies for equal temperament tuning
const A4 = 440; // Reference note

/** Concert pitch every table in this file is written at. */
export const STANDARD_A4 = A4;

/** Reference pitches the tuner accepts. 415 is baroque pitch; 466 is a
 *  semitone up. Anything outside that is a mistake, not a preference. */
export const REFERENCE_PITCH_MIN = 415;
export const REFERENCE_PITCH_MAX = 466;
export const REFERENCE_PITCH_PRESETS = [432, 440, 442, 443];

export function clampReferencePitch(value: number): number {
  if (!Number.isFinite(value)) return A4;
  return Math.min(REFERENCE_PITCH_MAX, Math.max(REFERENCE_PITCH_MIN, Math.round(value)));
}

/** The same tuning at a different concert pitch. Every string moves by the
 *  same ratio, so the intervals between them are untouched. */
export function scaleTuning(tuning: Tuning, a4: number): Tuning {
  if (a4 === A4) return tuning;
  const ratio = a4 / A4;
  return { ...tuning, frequencies: tuning.frequencies.map((f) => f * ratio) };
}

export type Tuning = {
  name: string;
  notes: string[];
  frequencies: number[];
};

export type GuitarType = {
  name: string;
  displayName: string;
  strings: number;
};

export type AccuracyMode = {
  name: string;
  cents: number;
  description: string;
};

// Calculate frequency from semitones away from A4
function freqFromSemitones(semitones: number): number {
  return A4 * Math.pow(2, semitones / 12);
}

// Common guitar tuning presets
export const TUNING_PRESETS: Record<string, Tuning> = {
  standard: {
    name: 'Standard',
    notes: ['E', 'A', 'D', 'G', 'B', 'E'],
    frequencies: [
      freqFromSemitones(-29), // E2
      freqFromSemitones(-24), // A2
      freqFromSemitones(-19), // D3
      freqFromSemitones(-14), // G3
      freqFromSemitones(-10), // B3
      freqFromSemitones(-5), // E4
    ],
  },
  dropD: {
    name: 'Drop D',
    notes: ['D', 'A', 'D', 'G', 'B', 'E'],
    frequencies: [
      freqFromSemitones(-31), // D2
      freqFromSemitones(-24), // A2
      freqFromSemitones(-19), // D3
      freqFromSemitones(-14), // G3
      freqFromSemitones(-10), // B3
      freqFromSemitones(-5), // E4
    ],
  },
  halfStepDown: {
    name: 'Half Step Down',
    notes: ['D♯', 'G♯', 'C♯', 'F♯', 'A♯', 'D♯'],
    frequencies: [
      freqFromSemitones(-30), // D♯2
      freqFromSemitones(-25), // G♯2
      freqFromSemitones(-20), // C♯3
      freqFromSemitones(-15), // F♯3
      freqFromSemitones(-11), // A♯3
      freqFromSemitones(-6), // D♯4
    ],
  },
  fullStepDown: {
    name: 'Full Step Down',
    notes: ['D', 'G', 'C', 'F', 'A', 'D'],
    frequencies: [
      freqFromSemitones(-31), // D2
      freqFromSemitones(-26), // G2
      freqFromSemitones(-21), // C3
      freqFromSemitones(-16), // F3
      freqFromSemitones(-12), // A3
      freqFromSemitones(-7), // D4
    ],
  },
  openG: {
    name: 'Open G',
    notes: ['D', 'G', 'D', 'G', 'B', 'D'],
    frequencies: [
      freqFromSemitones(-31), // D2
      freqFromSemitones(-26), // G2
      freqFromSemitones(-19), // D3
      freqFromSemitones(-14), // G3
      freqFromSemitones(-10), // B3
      freqFromSemitones(-7), // D4
    ],
  },
  openD: {
    name: 'Open D',
    notes: ['D', 'A', 'D', 'F♯', 'A', 'D'],
    frequencies: [
      freqFromSemitones(-31), // D2
      freqFromSemitones(-24), // A2
      freqFromSemitones(-19), // D3
      freqFromSemitones(-15), // F♯3
      freqFromSemitones(-12), // A3
      freqFromSemitones(-7), // D4
    ],
  },
  openA: {
    name: 'Open A',
    notes: ['E', 'A', 'E', 'A', 'C♯', 'E'],
    frequencies: [
      freqFromSemitones(-29), // E2
      freqFromSemitones(-24), // A2
      freqFromSemitones(-17), // E3
      freqFromSemitones(-12), // A3
      freqFromSemitones(-8), // C♯4
      freqFromSemitones(-5), // E4
    ],
  },
  openE: {
    name: 'Open E',
    notes: ['E', 'B', 'E', 'G♯', 'B', 'E'],
    frequencies: [
      freqFromSemitones(-29), // E2
      freqFromSemitones(-22), // B2
      freqFromSemitones(-17), // E3
      freqFromSemitones(-13), // G♯3
      freqFromSemitones(-10), // B3
      freqFromSemitones(-5), // E4
    ],
  },
  openC: {
    name: 'Open C',
    notes: ['C', 'G', 'C', 'G', 'C', 'E'],
    frequencies: [
      freqFromSemitones(-33), // C2
      freqFromSemitones(-26), // G2
      freqFromSemitones(-21), // C3
      freqFromSemitones(-14), // G3
      freqFromSemitones(-9), // C4
      freqFromSemitones(-5), // E4
    ],
  },
  dadgad: {
    name: 'DADGAD',
    notes: ['D', 'A', 'D', 'G', 'A', 'D'],
    frequencies: [
      freqFromSemitones(-31), // D2
      freqFromSemitones(-24), // A2
      freqFromSemitones(-19), // D3
      freqFromSemitones(-14), // G3
      freqFromSemitones(-12), // A3
      freqFromSemitones(-7), // D4
    ],
  },
  dropC: {
    name: 'Drop C',
    notes: ['C', 'G', 'C', 'F', 'A', 'D'],
    frequencies: [
      freqFromSemitones(-33), // C2
      freqFromSemitones(-26), // G2
      freqFromSemitones(-21), // C3
      freqFromSemitones(-16), // F3
      freqFromSemitones(-12), // A3
      freqFromSemitones(-7), // D4
    ],
  },
  dropCSharp: {
    name: 'Drop C♯',
    notes: ['C♯', 'G♯', 'C♯', 'F♯', 'A♯', 'D♯'],
    frequencies: [
      freqFromSemitones(-32), // C♯2
      freqFromSemitones(-25), // G♯2
      freqFromSemitones(-20), // C♯3
      freqFromSemitones(-15), // F♯3
      freqFromSemitones(-11), // A♯3
      freqFromSemitones(-6), // D♯4
    ],
  },
  dropB: {
    name: 'Drop B',
    notes: ['B', 'F♯', 'B', 'E', 'G♯', 'C♯'],
    frequencies: [
      freqFromSemitones(-34), // B1
      freqFromSemitones(-27), // F♯2
      freqFromSemitones(-22), // B2
      freqFromSemitones(-17), // E3
      freqFromSemitones(-13), // G♯3
      freqFromSemitones(-8), // C♯4
    ],
  },
  cStandard: {
    name: 'C Standard',
    notes: ['C', 'F', 'A♯', 'D♯', 'G', 'C'],
    frequencies: [
      freqFromSemitones(-33), // C2
      freqFromSemitones(-28), // F2
      freqFromSemitones(-23), // A♯2
      freqFromSemitones(-18), // D♯3
      freqFromSemitones(-14), // G3
      freqFromSemitones(-9), // C4
    ],
  },
  bStandard: {
    name: 'B Standard',
    notes: ['B', 'E', 'A', 'D', 'F♯', 'B'],
    frequencies: [
      freqFromSemitones(-34), // B1
      freqFromSemitones(-29), // E2
      freqFromSemitones(-24), // A2
      freqFromSemitones(-19), // D3
      freqFromSemitones(-15), // F♯3
      freqFromSemitones(-10), // B3
    ],
  },
  // Nashville ("high-strung"): the octave strings of a 12-string's bottom
  // four courses on a six-string. Same note names as standard, but strings
  // 6–3 sound an octave up, so the targets differ.
  nashville: {
    name: 'Nashville',
    notes: ['E', 'A', 'D', 'G', 'B', 'E'],
    frequencies: [
      freqFromSemitones(-17), // E3
      freqFromSemitones(-12), // A3
      freqFromSemitones(-7), // D4
      freqFromSemitones(-2), // G4
      freqFromSemitones(-10), // B3
      freqFromSemitones(-5), // E4
    ],
  },
};

// Guitar types
export const GUITAR_TYPES: Record<string, GuitarType> = {
  sixString: {
    name: 'sixString',
    displayName: '6-String Guitar',
    strings: 6,
  },
  sevenString: {
    name: 'sevenString',
    displayName: '7-String Guitar',
    strings: 7,
  },
  twelveString: {
    name: 'twelveString',
    displayName: '12-String Guitar',
    strings: 12,
  },
  bass: {
    name: 'bass',
    displayName: 'Bass Guitar',
    strings: 4,
  },
  fiveStringBass: {
    name: 'fiveStringBass',
    displayName: '5-String Bass',
    strings: 5,
  },
  ukulele: {
    name: 'ukulele',
    displayName: 'Ukulele',
    strings: 4,
  },
  baritoneUkulele: {
    name: 'baritoneUkulele',
    displayName: 'Baritone Ukulele',
    strings: 4,
  },
  mandolin: {
    name: 'mandolin',
    displayName: 'Mandolin',
    strings: 8,
  },
  banjo: {
    name: 'banjo',
    displayName: '5-String Banjo',
    strings: 5,
  },
  violin: {
    name: 'violin',
    displayName: 'Violin',
    strings: 4,
  },
  viola: {
    name: 'viola',
    displayName: 'Viola',
    strings: 4,
  },
  cello: {
    name: 'cello',
    displayName: 'Cello',
    strings: 4,
  },
  doubleBass: {
    name: 'doubleBass',
    displayName: 'Double Bass',
    strings: 4,
  },
  cavaquinho: {
    name: 'cavaquinho',
    displayName: 'Cavaquinho',
    strings: 4,
  },
};

/** Bowed instruments. Peg-and-fine-tuner, not machine heads, and guitar
 *  practice links make no sense for them. The double bass has machine
 *  heads, but the guitar practice links are just as wrong for it. */
export const BOWED_INSTRUMENTS = new Set(['violin', 'viola', 'cello', 'doubleBass']);

// Bass tuning (E1-A1-D2-G2)
export const BASS_TUNING: Tuning = {
  name: 'Bass Standard',
  notes: ['E', 'A', 'D', 'G'],
  frequencies: [
    freqFromSemitones(-41), // E1
    freqFromSemitones(-36), // A1
    freqFromSemitones(-31), // D2
    freqFromSemitones(-26), // G2
  ],
};

// 5-string bass adds a low B (B0) below the standard four
export const FIVE_STRING_BASS_TUNING: Tuning = {
  name: '5-String Bass Standard',
  notes: ['B', 'E', 'A', 'D', 'G'],
  frequencies: [
    freqFromSemitones(-46), // B0
    freqFromSemitones(-41), // E1
    freqFromSemitones(-36), // A1
    freqFromSemitones(-31), // D2
    freqFromSemitones(-26), // G2
  ],
};

// Ukulele tuning (G-C-E-A)
export const UKULELE_TUNING: Tuning = {
  name: 'Ukulele Standard',
  notes: ['G', 'C', 'E', 'A'],
  frequencies: [
    freqFromSemitones(-2), // G4
    freqFromSemitones(-9), // C4
    freqFromSemitones(-5), // E4
    freqFromSemitones(0), // A4 — reference pitch; must not be a literal 0,
    // or detectPlayingString skips the string and cents always read zero.
  ],
};

// 7-string guitar adds low B (B1)
export const SEVEN_STRING_TUNING: Tuning = {
  name: 'Standard',
  notes: ['B', 'E', 'A', 'D', 'G', 'B', 'E'],
  frequencies: [
    freqFromSemitones(-34), // B1
    freqFromSemitones(-29), // E2
    freqFromSemitones(-24), // A2
    freqFromSemitones(-19), // D3
    freqFromSemitones(-14), // G3
    freqFromSemitones(-10), // B3
    freqFromSemitones(-5), // E4
  ],
};

// 12-string guitar: 6 courses of 2, stored as [main, pair, main, pair, ...].
// The bottom four courses are octave pairs; the top two (B and E) are UNISON
// pairs. Doubling those at the octave would demand B5/E5 strings that sit at
// the edge of their breaking point and snap in normal use.
export const TWELVE_STRING_TUNING: Tuning = {
  name: 'Standard',
  notes: ['E', 'E', 'A', 'A', 'D', 'D', 'G', 'G', 'B', 'B', 'E', 'E'],
  frequencies: [
    freqFromSemitones(-29), // E2
    freqFromSemitones(-17), // E3 (octave higher)
    freqFromSemitones(-24), // A2
    freqFromSemitones(-12), // A3 (octave higher)
    freqFromSemitones(-19), // D3
    freqFromSemitones(-7), // D4 (octave higher)
    freqFromSemitones(-14), // G3
    freqFromSemitones(-2), // G4 (octave higher)
    freqFromSemitones(-10), // B3
    freqFromSemitones(-10), // B3 (unison)
    freqFromSemitones(-5), // E4
    freqFromSemitones(-5), // E4 (unison)
  ],
};

// Baritone ukulele: linear D G B E, the top four strings of a guitar
export const BARITONE_UKULELE_TUNING: Tuning = {
  name: 'Baritone Ukulele Standard',
  notes: ['D', 'G', 'B', 'E'],
  frequencies: [
    freqFromSemitones(-19), // D3
    freqFromSemitones(-14), // G3
    freqFromSemitones(-10), // B3
    freqFromSemitones(-5), // E4
  ],
};

// Mandolin: four unison pairs, tuned in fifths like a violin. Both strings of
// a course share one target, so the tuner treats each course as one string.
export const MANDOLIN_TUNING: Tuning = {
  name: 'Mandolin Standard',
  notes: ['G', 'D', 'A', 'E'],
  frequencies: [
    freqFromSemitones(-14), // G3
    freqFromSemitones(-7), // D4
    freqFromSemitones(0), // A4
    freqFromSemitones(7), // E5
  ],
};

// 5-string banjo, open G. Stored string 5 → string 1, like the ukulele: the
// short 5th string is a reentrant high G4, not the lowest note.
export const BANJO_TUNING: Tuning = {
  name: 'Open G',
  notes: ['G', 'D', 'G', 'B', 'D'],
  frequencies: [
    freqFromSemitones(-2), // G4 (short 5th string)
    freqFromSemitones(-19), // D3
    freqFromSemitones(-14), // G3
    freqFromSemitones(-10), // B3
    freqFromSemitones(-7), // D4
  ],
};

// Violin: fifths from G3
export const VIOLIN_TUNING: Tuning = {
  name: 'Violin Standard',
  notes: ['G', 'D', 'A', 'E'],
  frequencies: [
    freqFromSemitones(-14), // G3
    freqFromSemitones(-7), // D4
    freqFromSemitones(0), // A4
    freqFromSemitones(7), // E5
  ],
};

// Viola: a fifth below the violin
export const VIOLA_TUNING: Tuning = {
  name: 'Viola Standard',
  notes: ['C', 'G', 'D', 'A'],
  frequencies: [
    freqFromSemitones(-21), // C3
    freqFromSemitones(-14), // G3
    freqFromSemitones(-7), // D4
    freqFromSemitones(0), // A4
  ],
};

// Cello: an octave below the viola
export const CELLO_TUNING: Tuning = {
  name: 'Cello Standard',
  notes: ['C', 'G', 'D', 'A'],
  frequencies: [
    freqFromSemitones(-33), // C2
    freqFromSemitones(-26), // G2
    freqFromSemitones(-19), // D3
    freqFromSemitones(-12), // A3
  ],
};

// Double bass: orchestral tuning in fourths, the same pitches as a bass
// guitar — which copied it.
export const DOUBLE_BASS_TUNING: Tuning = {
  name: 'Orchestral',
  notes: ['E', 'A', 'D', 'G'],
  frequencies: [
    freqFromSemitones(-41), // E1
    freqFromSemitones(-36), // A1
    freqFromSemitones(-31), // D2
    freqFromSemitones(-26), // G2
  ],
};

// Brazilian cavaquinho: D G B D, the top four strings of an open G guitar
// an octave up. Stored string 4 → string 1, which here is also low to high.
export const CAVAQUINHO_TUNING: Tuning = {
  name: 'Cavaquinho Standard',
  notes: ['D', 'G', 'B', 'D'],
  frequencies: [
    freqFromSemitones(-7), // D4
    freqFromSemitones(-2), // G4
    freqFromSemitones(2), // B4
    freqFromSemitones(5), // D5
  ],
};

/** Alternate tunings for instruments other than the six-string, keyed by
 *  guitar type. "standard" is always the instrument's default tuning and is
 *  not repeated here. Keys must not collide with TUNING_PRESETS keys, since
 *  pages look tunings up by key alone. */
export const INSTRUMENT_TUNINGS: Record<string, Record<string, Tuning>> = {
  sevenString: {
    dropA: {
      name: 'Drop A',
      notes: ['A', 'E', 'A', 'D', 'G', 'B', 'E'],
      frequencies: [
        freqFromSemitones(-36), // A1
        freqFromSemitones(-29), // E2
        freqFromSemitones(-24), // A2
        freqFromSemitones(-19), // D3
        freqFromSemitones(-14), // G3
        freqFromSemitones(-10), // B3
        freqFromSemitones(-5), // E4
      ],
    },
  },
  bass: {
    bassDropD: {
      name: 'Drop D',
      notes: ['D', 'A', 'D', 'G'],
      frequencies: [
        freqFromSemitones(-43), // D1
        freqFromSemitones(-36), // A1
        freqFromSemitones(-31), // D2
        freqFromSemitones(-26), // G2
      ],
    },
  },
  ukulele: {
    lowG: {
      name: 'Low G',
      notes: ['G', 'C', 'E', 'A'],
      frequencies: [
        freqFromSemitones(-14), // G3 — an octave below standard's G4
        freqFromSemitones(-9), // C4
        freqFromSemitones(-5), // E4
        freqFromSemitones(0), // A4
      ],
    },
  },
};

/** The tunings offered for an instrument, standard first. Six-string guitar
 *  gets the full preset list; an instrument with no alternates gets one. */
export function tuningsForGuitar(guitarType: string): Record<string, Tuning> {
  if (guitarType === 'sixString') return TUNING_PRESETS;
  return {
    standard: getTuningForGuitar(guitarType),
    ...INSTRUMENT_TUNINGS[guitarType],
  };
}

// Accuracy modes
export const ACCURACY_MODES: Record<string, AccuracyMode> = {
  beginner: {
    name: 'Beginner',
    cents: 10,
    description: '±10 cents (easier)',
  },
  standard: {
    name: 'Standard',
    cents: 5,
    description: '±5 cents',
  },
  pro: {
    name: 'Pro',
    cents: 2,
    description: '±2 cents (precise)',
  },
};

// Get tuning for current guitar type
export function getTuningForGuitar(
  guitarType: string,
  tuningPreset: string = 'standard'
): Tuning {
  const alternate = INSTRUMENT_TUNINGS[guitarType]?.[tuningPreset];
  if (alternate) return alternate;
  switch (guitarType) {
    case 'sevenString':
      return SEVEN_STRING_TUNING;
    case 'twelveString':
      return TWELVE_STRING_TUNING;
    case 'bass':
      return BASS_TUNING;
    case 'fiveStringBass':
      return FIVE_STRING_BASS_TUNING;
    case 'ukulele':
      return UKULELE_TUNING;
    case 'baritoneUkulele':
      return BARITONE_UKULELE_TUNING;
    case 'mandolin':
      return MANDOLIN_TUNING;
    case 'banjo':
      return BANJO_TUNING;
    case 'violin':
      return VIOLIN_TUNING;
    case 'viola':
      return VIOLA_TUNING;
    case 'cello':
      return CELLO_TUNING;
    case 'doubleBass':
      return DOUBLE_BASS_TUNING;
    case 'cavaquinho':
      return CAVAQUINHO_TUNING;
    case 'sixString':
    default:
      return TUNING_PRESETS[tuningPreset] || TUNING_PRESETS.standard;
  }
}

// Get all available tunings for 6-string guitar
export function getAvailableTunings(): string[] {
  return Object.keys(TUNING_PRESETS);
}

export function getTuningByName(name: string): Tuning | undefined {
  return TUNING_PRESETS[name];
}
