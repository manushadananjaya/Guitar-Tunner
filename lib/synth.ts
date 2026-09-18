/** Plucked-string synthesis on the Web Audio clock.
 *
 *  Shared by the chord player, the chord finder, and the ear trainer so all
 *  three sound like the same instrument. A bare sine sounds nothing like a
 *  guitar; stacking a few harmonics with a fast attack and a long exponential
 *  decay gets close enough to be recognisable and useful. */

export const midiToFrequency = (midi: number) =>
  440 * Math.pow(2, (midi - 69) / 12);

/** Seconds between consecutive strings — what makes a strum sound strummed. */
export const STRUM_OFFSET = 0.035;
const NOTE_LENGTH = 2.2;

// Amplitudes fall away quickly — a real string's upper partials are much
// quieter than its fundamental.
const PARTIALS = [
  { ratio: 1, gain: 0.5 },
  { ratio: 2, gain: 0.2 },
  { ratio: 3, gain: 0.1 },
  { ratio: 4, gain: 0.05 },
];

let shared: AudioContext | null = null;

/** One AudioContext per page. Browsers cap the number of contexts, and
 *  every component that makes sound creating its own would hit that cap. */
export function getAudioContext(): AudioContext {
  if (!shared) {
    const Ctor =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    shared = new Ctor();
  }
  void shared.resume();
  return shared;
}

/** Schedule one plucked note at an absolute AudioContext time. */
export function pluck(
  ctx: AudioContext,
  midi: number,
  at: number,
  peak: number,
  length = NOTE_LENGTH,
) {
  const fundamental = midiToFrequency(midi);

  const voice = ctx.createGain();
  voice.gain.setValueAtTime(0.0001, at);
  voice.gain.exponentialRampToValueAtTime(peak, at + 0.008);
  voice.gain.exponentialRampToValueAtTime(0.0001, at + length);
  voice.connect(ctx.destination);

  for (const partial of PARTIALS) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(fundamental * partial.ratio, at);
    gain.gain.setValueAtTime(partial.gain, at);
    // Higher partials die away faster, as they do on a real string.
    gain.gain.exponentialRampToValueAtTime(0.0001, at + length / partial.ratio);
    osc.connect(gain);
    gain.connect(voice);
    osc.start(at);
    osc.stop(at + length);
  }
}

/** Strum a set of MIDI notes low to high. Returns the total duration in
 *  seconds so callers can time UI state to it. */
export function strum(notes: number[], gap = STRUM_OFFSET): number {
  const ctx = getAudioContext();
  const start = ctx.currentTime + 0.05;
  const peak = 0.28 / Math.max(notes.length, 1) + 0.03;
  notes.forEach((midi, i) => pluck(ctx, midi, start + i * gap, peak));
  return notes.length * gap + 0.5;
}

/** Play notes one after another — a melodic interval or arpeggio. */
export function playMelody(notes: number[], gap = 0.7): number {
  const ctx = getAudioContext();
  const start = ctx.currentTime + 0.05;
  notes.forEach((midi, i) => pluck(ctx, midi, start + i * gap, 0.22, 1.6));
  return notes.length * gap + 0.5;
}
