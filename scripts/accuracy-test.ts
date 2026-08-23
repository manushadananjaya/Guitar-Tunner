/** Generates the measured-accuracy table shown on /accuracy by feeding
 *  synthesized guitar-like tones through the app's actual shipped
 *  detectPitch() (lib/pitchDetection.ts) — the same function
 *  hooks/usePitchDetector.ts calls in the browser via PitchDetector.
 *
 *  This is a SIMULATED-signal test (synthesized waveforms run through the
 *  real algorithm), not a live microphone recording — there's no mic in this
 *  environment. The /accuracy page discloses that plainly. It's still a
 *  genuine, reproducible measurement of the shipped code, not an invented
 *  number, and the PRNG is seeded so re-running reproduces the same table.
 *
 *  Run with: npx tsx scripts/accuracy-test.ts */
import { detectPitch } from "../lib/pitchDetection";

const SAMPLE_RATE = 48000;
const BUFFER_SIZE = 4096;
const TRIALS = 40;

interface StringDef {
  name: string;
  freq: number;
}

const STRINGS: StringDef[] = [
  { name: "E2 (Low E)", freq: 82.41 },
  { name: "A2", freq: 110.0 },
  { name: "D3", freq: 146.83 },
  { name: "G3", freq: 196.0 },
  { name: "B3", freq: 246.94 },
  { name: "E4 (High E)", freq: 329.63 },
];

// Mulberry32 PRNG — deterministic so this table is reproducible.
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function gaussian(rand: () => number): number {
  const u1 = Math.max(rand(), 1e-9);
  const u2 = rand();
  return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
}

// A plucked string isn't a pure sine — it's a fundamental plus a decaying
// harmonic series, with a little natural pitch settling right after the
// pluck. Not a physical string model, just enough realism to stress the
// autocorrelation detector the way a real pluck would.
function synthesizeString(
  freq: number,
  rand: () => number,
  noiseAmplitude: number,
  driftCentsPerSec: number,
): Float32Array {
  const buf = new Float32Array(BUFFER_SIZE);
  const harmonics = [1, 0.55, 0.3, 0.18, 0.1, 0.06];
  for (let i = 0; i < BUFFER_SIZE; i++) {
    const t = i / SAMPLE_RATE;
    const instFreq = freq * Math.pow(2, (driftCentsPerSec * t) / 1200);
    let sample = 0;
    for (let h = 0; h < harmonics.length; h++) {
      sample += harmonics[h] * Math.sin(2 * Math.PI * instFreq * (h + 1) * t);
    }
    sample *= 0.25;
    sample += noiseAmplitude * gaussian(rand);
    buf[i] = sample;
  }
  return buf;
}

function centsError(detected: number, reference: number): number {
  return 1200 * Math.log2(detected / reference);
}

interface ConditionResult {
  detectedRate: number;
  meanAbsCents: number;
  maxAbsCents: number;
}

function runCondition(
  freq: number,
  noiseAmplitude: number,
  seed: number,
): ConditionResult {
  const rand = mulberry32(seed);
  let detections = 0;
  let sumAbsCents = 0;
  let maxAbsCents = 0;

  for (let trial = 0; trial < TRIALS; trial++) {
    const drift = (rand() - 0.5) * 4; // +/-2 cents/sec natural drift
    const buf = synthesizeString(freq, rand, noiseAmplitude, drift);
    const result = detectPitch(buf, SAMPLE_RATE);
    if (result.detected && result.frequency > 0) {
      detections++;
      const err = Math.abs(centsError(result.frequency, freq));
      sumAbsCents += err;
      maxAbsCents = Math.max(maxAbsCents, err);
    }
  }

  return {
    detectedRate: detections / TRIALS,
    meanAbsCents: detections > 0 ? sumAbsCents / detections : NaN,
    maxAbsCents,
  };
}

const rows = STRINGS.map((s) => {
  // "Quiet": very low background noise — a clean pluck close to the mic.
  const quiet = runCondition(s.freq, 0.004, Math.round(s.freq * 1000) + 1);
  // "Noisy": substantial broadband noise — laptop mic with room/fan noise.
  const noisy = runCondition(s.freq, 0.045, Math.round(s.freq * 1000) + 2);
  return { string: s.name, freq: s.freq, quiet, noisy };
});

console.log(JSON.stringify(rows, null, 2));
