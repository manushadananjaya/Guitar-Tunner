// Standard note frequencies for equal temperament tuning
const A4 = 440; // Reference note

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
};

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
