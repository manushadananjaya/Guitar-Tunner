/** Map a written chord symbol onto the chord library, for diagrams, audio,
 *  and links. Only suffixes the library actually has are mapped — an E7♯9
 *  gets no diagram rather than the wrong one. */

import { ROOTS, getChord, fingeringMidiNotes, type Chord } from '@/lib/chords';
import { parseChord } from './transpose';

const SUFFIX_TO_QUALITY: Record<string, string> = {
  '': 'major',
  M: 'major',
  maj: 'major',
  m: 'minor',
  min: 'minor',
  '-': 'minor',
  '7': '7',
  maj7: 'maj7',
  M7: 'maj7',
  'Δ': 'maj7',
  m7: 'm7',
  min7: 'm7',
  '-7': 'm7',
  sus2: 'sus2',
  sus4: 'sus4',
  sus: 'sus4',
  '6': '6',
  m6: 'm6',
  add9: 'add9',
  dim: 'dim',
  '°': 'dim',
  aug: 'aug',
  '+': 'aug',
  '5': '5',
};

export function libraryChord(rootPitch: number, suffix: string): Chord | undefined {
  const quality = SUFFIX_TO_QUALITY[suffix];
  if (!quality) return undefined;
  const root = ROOTS.find((r) => r.pitchClass === ((rootPitch % 12) + 12) % 12)!;
  return getChord(quality === 'major' ? root.slug : `${root.slug}-${quality}`);
}

export function libraryChordFromName(name: string): Chord | undefined {
  const parsed = parseChord(name);
  return parsed ? libraryChord(parsed.rootPitch, parsed.suffix) : undefined;
}

/** MIDI notes of a chord's first (most playable) voicing, for playback. */
export const chordMidi = (chord: Chord) => fingeringMidiNotes(chord.voicings[0].frets);
