const A4 = 440; // Reference frequency in Hz
const CENTS_PER_SEMITONE = 100;
const SEMITONES_PER_OCTAVE = 12;

// Note names in order
const NOTE_NAMES = [
  "C",
  "C♯",
  "D",
  "D♯",
  "E",
  "F",
  "F♯",
  "G",
  "G♯",
  "A",
  "A♯",
  "B",
];
const NOTE_NAMES_FLAT = [
  "C",
  "D♭",
  "D",
  "E♭",
  "E",
  "F",
  "G♭",
  "G",
  "A♭",
  "A",
  "B♭",
  "B",
];

export interface Note {
  name: string;
  frequency: number;
  octave: number;
  semitone: number; // 0-11
  midiNumber: number;
}

export interface TunerReading {
  frequency: number;
  note: Note;
  centOffset: number; // -50 to +50 (or more)
  isInTune: boolean;
  isSharp: boolean;
  isFlat: boolean;
}

// Get frequency from semitones relative to A4
export function frequencyFromSemitones(semitones: number): number {
  return A4 * Math.pow(2, semitones / 12);
}

// Get semitones from a frequency relative to A4
export function semitonesFromFrequency(frequency: number): number {
  return 12 * Math.log2(frequency / A4);
}

// Get cents from frequency (±100 cents = ±1 semitone)
export function centsFromFrequency(
  frequency: number,
  targetFrequency: number,
): number {
  if (targetFrequency <= 0 || frequency <= 0) return 0;
  return 1200 * Math.log2(frequency / targetFrequency);
}

// Convert MIDI note number to frequency
export function midiToFrequency(midiNumber: number): number {
  return A4 * Math.pow(2, (midiNumber - 69) / 12);
}

// Convert frequency to MIDI note number
export function frequencyToMidi(frequency: number): number {
  return 69 + 12 * Math.log2(frequency / A4);
}

// Get note information from frequency
export function frequencyToNote(frequency: number): Note {
  if (frequency <= 0) {
    return {
      name: "—",
      frequency: 0,
      octave: 0,
      semitone: 0,
      midiNumber: 0,
    };
  }

  const midiNumber = Math.round(frequencyToMidi(frequency));
  const octave = Math.floor((midiNumber - 12) / 12);
  const semitone = midiNumber % 12;

  return {
    name: NOTE_NAMES[semitone],
    frequency: midiToFrequency(midiNumber),
    octave,
    semitone,
    midiNumber,
  };
}

// Get tuner reading with all information
export function getTunerReading(
  detectedFrequency: number,
  targetFrequency: number,
  accuracyCents: number = 5,
): TunerReading {
  const note = frequencyToNote(detectedFrequency);
  const centOffset = centsFromFrequency(detectedFrequency, targetFrequency);
  const isInTune = Math.abs(centOffset) <= accuracyCents;
  const isSharp = centOffset > 0;
  const isFlat = centOffset < 0;

  return {
    frequency: detectedFrequency,
    note,
    centOffset,
    isInTune,
    isSharp,
    isFlat,
  };
}

// Find closest note to a frequency (for auto-detection)
export function findClosestNote(
  frequency: number,
  maxCentDeviation: number = 50,
): Note | null {
  const note = frequencyToNote(frequency);
  const expectedFrequency = note.frequency;
  const deviation = centsFromFrequency(frequency, expectedFrequency);

  if (Math.abs(deviation) <= maxCentDeviation) {
    return note;
  }

  return null;
}

// Find which string is being played (closest frequency match)
export function detectPlayingString(
  frequency: number,
  targetFrequencies: number[],
  confidenceThreshold: number = 50,
): { stringIndex: number; confidence: number } | null {
  let bestMatch = -1;
  let bestConfidence = 0;

  for (let i = 0; i < targetFrequencies.length; i++) {
    const target = targetFrequencies[i];
    if (target <= 0) continue;

    const centDifference = Math.min(
      Math.abs(centsFromFrequency(frequency, target)),
      Math.abs(centsFromFrequency(frequency * 0.5, target)),
      Math.abs(centsFromFrequency(frequency * 2, target)),
    );

    // Convert cent difference to confidence (0-100), with wider tolerance for real guitar transients
    const confidence = Math.max(0, 100 - (centDifference / 80) * 100);

    if (confidence > bestConfidence && confidence >= confidenceThreshold) {
      bestConfidence = confidence;
      bestMatch = i;
    }
  }

  if (bestMatch !== -1) {
    return {
      stringIndex: bestMatch,
      confidence: bestConfidence,
    };
  }

  return null;
}

// Format frequency as string
export function formatFrequency(
  frequency: number,
  decimals: number = 1,
): string {
  if (frequency <= 0) return "— Hz";
  return `${frequency.toFixed(decimals)} Hz`;
}

// Format cents as string
export function formatCents(cents: number, decimals: number = 1): string {
  const sign = cents > 0 ? "+" : "";
  return `${sign}${cents.toFixed(decimals)}¢`;
}

// Get cent range indicator (visual feedback)
export function getCentRangeColor(
  cents: number,
  accuracyCents: number = 5,
): string {
  const absCents = Math.abs(cents);

  if (absCents <= accuracyCents) {
    return "in-tune"; // Green
  } else if (absCents <= accuracyCents * 2) {
    return "close"; // Yellow/Orange
  } else if (absCents <= accuracyCents * 4) {
    return "close-ish"; // Orange
  } else {
    return "out-of-tune"; // Red
  }
}

// Convert note and octave to frequency
export function noteToFrequency(noteName: string, octave: number): number {
  const noteIndex = NOTE_NAMES.indexOf(noteName);
  if (noteIndex === -1) {
    const flatIndex = NOTE_NAMES_FLAT.indexOf(noteName);
    if (flatIndex === -1) return 0;
    const midiNumber = (octave + 1) * 12 + flatIndex;
    return midiToFrequency(midiNumber);
  }

  const midiNumber = (octave + 1) * 12 + noteIndex;
  return midiToFrequency(midiNumber);
}

// Get needle angle for gauge (0-100 scale, where 50 is center/in-tune)
export function getNeedleAngle(cents: number, maxCents: number = 50): number {
  // Clamp to range
  const clamped = Math.max(-maxCents, Math.min(maxCents, cents));
  // Convert to 0-100 scale (50 = in tune)
  return (clamped / maxCents) * 50 + 50;
}

// Smooth frequency reading (low-pass filter)
export function smoothFrequency(
  currentFreq: number,
  newFreq: number,
  smoothingFactor: number = 0.7,
): number {
  if (currentFreq === 0) return newFreq;
  return currentFreq * smoothingFactor + newFreq * (1 - smoothingFactor);
}
