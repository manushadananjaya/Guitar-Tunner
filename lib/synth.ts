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
  pluckFrequency(ctx, midiToFrequency(midi), at, peak, length);
}

/** `pluck` by frequency rather than MIDI note — for pitches that are not on
 *  the A = 440 grid, such as a tuner set to A = 432. */
export function pluckFrequency(
  ctx: AudioContext,
  fundamental: number,
  at: number,
  peak: number,
  length = NOTE_LENGTH,
) {

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

/** One long note to tune against by ear. Returns its duration in seconds. */
export function playReferenceNote(frequency: number, length = 3): number {
  const ctx = getAudioContext();
  pluckFrequency(ctx, frequency, ctx.currentTime + 0.05, 0.3, length);
  return length;
}

/** Play notes one after another — a melodic interval or arpeggio. */
export function playMelody(notes: number[], gap = 0.7): number {
  const ctx = getAudioContext();
  const start = ctx.currentTime + 0.05;
  notes.forEach((midi, i) => pluck(ctx, midi, start + i * gap, 0.22, 1.6));
  return notes.length * gap + 0.5;
}

/** Strum at an exact AudioContext time — for anything driven by a
 *  lookahead scheduler, where "now" is too late. Up-strums run high to low
 *  and are a little lighter, the way a pick catches fewer strings going up. */
export function strumAt(
  ctx: AudioContext,
  notes: number[],
  at: number,
  {
    direction = 'down',
    gain = 1,
    length = 1.4,
  }: { direction?: 'down' | 'up'; gain?: number; length?: number } = {},
) {
  const ordered = direction === 'down' ? notes : [...notes].reverse().slice(0, 4);
  const peak = (0.24 / Math.max(ordered.length, 1) + 0.025) * gain * (direction === 'up' ? 0.75 : 1);
  ordered.forEach((midi, i) => pluck(ctx, midi, at + i * 0.012, peak, length));
}

/** A muted "chuck": a short filtered noise burst, the percussive strum you
 *  get by resting the fretting hand on the strings. */
export function mutedStrumAt(ctx: AudioContext, at: number, gain = 1) {
  const length = 0.06;
  const buffer = ctx.createBuffer(1, Math.ceil(ctx.sampleRate * length), ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);

  const source = ctx.createBufferSource();
  source.buffer = buffer;
  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.value = 1800;
  filter.Q.value = 0.8;
  const amp = ctx.createGain();
  amp.gain.setValueAtTime(0.35 * gain, at);
  amp.gain.exponentialRampToValueAtTime(0.0001, at + length);
  source.connect(filter);
  filter.connect(amp);
  amp.connect(ctx.destination);
  source.start(at);
  source.stop(at + length);
}

/** A short click on the beat, for count-ins and play-along. */
export function clickAt(ctx: AudioContext, at: number, accent = false, gain = 1) {
  const osc = ctx.createOscillator();
  const amp = ctx.createGain();
  osc.type = 'square';
  osc.frequency.setValueAtTime(accent ? 1600 : 1000, at);
  amp.gain.setValueAtTime(0.0001, at);
  amp.gain.exponentialRampToValueAtTime((accent ? 0.35 : 0.22) * gain, at + 0.002);
  amp.gain.exponentialRampToValueAtTime(0.0001, at + 0.04);
  osc.connect(amp);
  amp.connect(ctx.destination);
  osc.start(at);
  osc.stop(at + 0.05);
}

/** A sustained drone on the given notes — soft saws through a low-pass, so
 *  it sits under your playing rather than on top of it. Returns a stop
 *  function that fades it out. */
export function startDrone(notes: number[], volume = 0.5): () => void {
  const ctx = getAudioContext();
  const now = ctx.currentTime;

  const master = ctx.createGain();
  master.gain.setValueAtTime(0.0001, now);
  master.gain.exponentialRampToValueAtTime(0.12 * volume, now + 0.8);
  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = 900;
  filter.Q.value = 0.4;
  filter.connect(master);
  master.connect(ctx.destination);

  // Two slightly detuned oscillators per note give a slow, organ-like beat
  // instead of a static test tone.
  const oscillators = notes.flatMap((midi) =>
    [-4, 4].map((detune) => {
      const osc = ctx.createOscillator();
      osc.type = 'sawtooth';
      osc.frequency.value = midiToFrequency(midi);
      osc.detune.value = detune;
      osc.connect(filter);
      osc.start(now);
      return osc;
    }),
  );

  return () => {
    const t = ctx.currentTime;
    master.gain.cancelScheduledValues(t);
    master.gain.setValueAtTime(Math.max(master.gain.value, 0.0001), t);
    master.gain.exponentialRampToValueAtTime(0.0001, t + 0.4);
    oscillators.forEach((osc) => osc.stop(t + 0.45));
  };
}
