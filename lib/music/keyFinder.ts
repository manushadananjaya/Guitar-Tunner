/** Key detection from audio: fold a spectrum into a 12-bin pitch-class
 *  profile (a "chroma"), then compare it with the Krumhansl–Kessler key
 *  profiles — how strongly each scale degree is heard as belonging to a key,
 *  measured in listening experiments. The best-correlated of the 24 keys is
 *  the guess. Works on chords and melodies alike, because it never tries to
 *  name individual notes. */

import type { KeyMode } from '@/lib/music/scales';

const MAJOR_PROFILE = [6.35, 2.23, 3.48, 2.33, 4.38, 4.09, 2.52, 5.19, 2.39, 3.66, 2.29, 2.88];
const MINOR_PROFILE = [6.33, 2.68, 3.52, 5.38, 2.6, 3.53, 2.54, 4.75, 3.98, 2.69, 3.34, 3.17];

/** Below the guitar's low E there is mostly rumble; above about 2 kHz the
 *  energy is overtones that blur the profile. */
export const CHROMA_MIN_HZ = 75;
export const CHROMA_MAX_HZ = 2000;

const mod12 = (n: number) => ((n % 12) + 12) % 12;

/** Add one frame of `AnalyserNode.getFloatFrequencyData` output (dB) into
 *  `chroma`. Only local spectral peaks within `rangeDb` of the loudest one
 *  count, so the noise floor between notes does not flatten the profile.
 *  Returns false when the frame was too quiet to use. */
export function accumulateChroma(
  chroma: number[],
  spectrumDb: Float32Array,
  sampleRate: number,
  { floorDb = -75, rangeDb = 40 }: { floorDb?: number; rangeDb?: number } = {},
): boolean {
  const binHz = sampleRate / (spectrumDb.length * 2);
  const lo = Math.max(1, Math.floor(CHROMA_MIN_HZ / binHz));
  const hi = Math.min(spectrumDb.length - 2, Math.ceil(CHROMA_MAX_HZ / binHz));

  let loudest = -Infinity;
  for (let i = lo; i <= hi; i++) loudest = Math.max(loudest, spectrumDb[i]);
  if (loudest < floorDb) return false;
  const threshold = loudest - rangeDb;

  const frame = new Array(12).fill(0);
  for (let i = lo; i <= hi; i++) {
    const db = spectrumDb[i];
    if (db < threshold || db < spectrumDb[i - 1] || db < spectrumDb[i + 1]) continue;
    // Parabolic interpolation puts the peak between bins, which matters at
    // the bottom of the range where a semitone is only a bin or two wide.
    const a = spectrumDb[i - 1];
    const c = spectrumDb[i + 1];
    const denom = a - 2 * db + c;
    const offset = denom === 0 ? 0 : (0.5 * (a - c)) / denom;
    const hz = (i + offset) * binHz;
    const midi = 69 + 12 * Math.log2(hz / 440);
    frame[mod12(Math.round(midi))] += Math.pow(10, db / 20);
  }
  // Each frame gets an equal vote, so one loud strum cannot outweigh a
  // phrase, and the square root keeps a ringing overtone from dominating.
  const total = frame.reduce((sum, x) => sum + Math.sqrt(x), 0);
  if (total === 0) return false;
  frame.forEach((x, pc) => (chroma[pc] += Math.sqrt(x) / total));
  return true;
}

/** Pearson correlation of two 12-element profiles. */
function correlate(a: number[], b: number[]) {
  const mean = (v: number[]) => v.reduce((s, x) => s + x, 0) / v.length;
  const ma = mean(a);
  const mb = mean(b);
  let num = 0;
  let da = 0;
  let db = 0;
  for (let i = 0; i < 12; i++) {
    num += (a[i] - ma) * (b[i] - mb);
    da += (a[i] - ma) ** 2;
    db += (b[i] - mb) ** 2;
  }
  return da === 0 || db === 0 ? 0 : num / Math.sqrt(da * db);
}

export interface KeyScore {
  pitchClass: number;
  mode: KeyMode;
  /** Correlation with the key profile, −1 to 1. Above about 0.7 is a
   *  confident match; relative keys typically score close together. */
  score: number;
}

/** All 24 keys, best first. */
export function rankKeys(chroma: number[]): KeyScore[] {
  const scores: KeyScore[] = [];
  for (let pc = 0; pc < 12; pc++) {
    // Rotate the profile so its tonic lands on `pc`.
    const rotate = (profile: number[]) => profile.map((_, i) => profile[mod12(i - pc)]);
    scores.push({ pitchClass: pc, mode: 'major', score: correlate(chroma, rotate(MAJOR_PROFILE)) });
    scores.push({ pitchClass: pc, mode: 'minor', score: correlate(chroma, rotate(MINOR_PROFILE)) });
  }
  return scores.sort((x, y) => y.score - x.score);
}
