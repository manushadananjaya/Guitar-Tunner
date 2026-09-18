/** Six-string tunings as MIDI note numbers, derived from TUNING_PRESETS.
 *
 *  The tuner presets store frequencies; the chord tools and the tension
 *  calculator need note numbers. Deriving them here — rather than keeping a
 *  second table — means a tuning can never mean one thing to the tuner and
 *  another to the chord finder. */

import { TUNING_PRESETS } from './tuningPresets';

export interface MidiTuning {
  key: string;
  name: string;
  /** Note names low to high, e.g. "D A D G B E". */
  notes: string;
  /** MIDI numbers, string 6 (lowest) first. */
  midi: number[];
}

const NOTE_NAMES = ['C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯', 'A', 'A♯', 'B'];

export const frequencyToMidi = (hz: number) =>
  Math.round(69 + 12 * Math.log2(hz / 440));

export const midiNoteName = (midi: number) =>
  `${NOTE_NAMES[midi % 12]}${Math.floor(midi / 12) - 1}`;

export const SIX_STRING_TUNINGS: MidiTuning[] = Object.entries(TUNING_PRESETS)
  .filter(([, tuning]) => tuning.frequencies.length === 6)
  .map(([key, tuning]) => ({
    key,
    name: tuning.name,
    notes: tuning.notes.join(' '),
    midi: tuning.frequencies.map(frequencyToMidi),
  }));

export const getMidiTuning = (key: string) =>
  SIX_STRING_TUNINGS.find((tuning) => tuning.key === key) ??
  SIX_STRING_TUNINGS[0];
