// Autocorrelation-based pitch detection
// Optimized for guitar frequencies (40Hz - 1000Hz)

const MIN_FREQUENCY = 40;
const MAX_FREQUENCY = 1000;
const CONFIDENCE_THRESHOLD = 0.9;

export interface PitchDetectionResult {
  frequency: number;
  confidence: number;
  detected: boolean;
}

// Autocorrelation function for pitch detection
// Based on the YIN algorithm adapted for browser use
export function detectPitch(
  audioData: Float32Array,
  sampleRate: number,
): PitchDetectionResult {
  const size = audioData.length;

  // Calculate RMS (energy) to detect silence
  let rms = 0;
  for (let i = 0; i < size; i++) {
    rms += audioData[i] * audioData[i];
  }
  rms = Math.sqrt(rms / size);

  // If signal is too quiet, no pitch detected
  if (rms < 0.01) {
    return { frequency: 0, confidence: 0, detected: false };
  }

  // Calculate autocorrelation
  const acf = new Float32Array(size);
  for (let lag = 0; lag < size; lag++) {
    let sum = 0;
    for (let i = 0; i < size - lag; i++) {
      sum += audioData[i] * audioData[i + lag];
    }
    acf[lag] = sum;
  }

  // Calculate minimum lag based on frequency range
  const minLag = Math.round(sampleRate / MAX_FREQUENCY);
  const maxLag = Math.round(sampleRate / MIN_FREQUENCY);

  // Find the first peak in the autocorrelation
  let bestLag = 0;
  let bestValue = 0;
  let confidence = 0;

  for (let lag = minLag; lag < Math.min(maxLag, size / 2); lag++) {
    // Look for peaks relative to their neighbors
    if (acf[lag] > acf[lag - 1] && acf[lag] > acf[lag + 1]) {
      if (acf[lag] > bestValue) {
        bestValue = acf[lag];
        bestLag = lag;
      }
    }
  }

  // Calculate confidence as ratio to zero-lag autocorrelation
  confidence = (2 * bestValue) / acf[0];
  confidence = Math.max(0, Math.min(1, confidence));

  if (confidence < CONFIDENCE_THRESHOLD || bestLag === 0) {
    return { frequency: 0, confidence, detected: false };
  }

  // Convert lag to frequency
  const frequency = sampleRate / bestLag;

  // Validate frequency is in expected range
  if (frequency < MIN_FREQUENCY || frequency > MAX_FREQUENCY) {
    return { frequency: 0, confidence: 0, detected: false };
  }

  return {
    frequency,
    confidence,
    detected: true,
  };
}

// Alternative: FFT-based pitch detection (faster but less accurate for low notes)
export function detectPitchFFT(
  audioData: Float32Array,
  sampleRate: number,
): PitchDetectionResult {
  const size = audioData.length;

  // Apply Hann window to reduce spectral leakage
  const windowed = new Float32Array(size);
  for (let i = 0; i < size; i++) {
    const window = 0.5 * (1 - Math.cos((2 * Math.PI * i) / (size - 1)));
    windowed[i] = audioData[i] * window;
  }

  // Simple FFT using Goertzel algorithm for specific frequencies
  // For production, would use a proper FFT library
  const minFreq = MIN_FREQUENCY;
  const maxFreq = MAX_FREQUENCY;
  const freqBins = 96; // Analyze 96 frequency bins

  let maxMagnitude = 0;
  let bestFreqIdx = 0;

  for (let bin = 0; bin < freqBins; bin++) {
    const freq = minFreq + (bin / freqBins) * (maxFreq - minFreq);
    const magnitude = goertzelMagnitude(windowed, freq, sampleRate);

    if (magnitude > maxMagnitude) {
      maxMagnitude = magnitude;
      bestFreqIdx = bin;
    }
  }

  const frequency = minFreq + (bestFreqIdx / freqBins) * (maxFreq - minFreq);

  // Estimate confidence from magnitude
  const confidence = Math.min(1, maxMagnitude / (size * 0.5));

  if (confidence < 0.1) {
    return { frequency: 0, confidence, detected: false };
  }

  return {
    frequency,
    confidence,
    detected: confidence > CONFIDENCE_THRESHOLD,
  };
}

// Goertzel algorithm for calculating magnitude at specific frequency
function goertzelMagnitude(
  signal: Float32Array,
  frequency: number,
  sampleRate: number,
): number {
  const N = signal.length;
  const k = (N * frequency) / sampleRate;
  const w = (2 * Math.PI * k) / N;
  const coeff = 2 * Math.cos(w);

  let s0 = 0,
    s1 = 0,
    s2 = 0;

  for (let i = 0; i < N; i++) {
    s0 = signal[i] + coeff * s1 - s2;
    s2 = s1;
    s1 = s0;
  }

  const magnitude = Math.sqrt(s1 * s1 + s2 * s2 - coeff * s1 * s2);
  return magnitude;
}

// Noise gate - silence detection
export function hasSignal(
  audioData: Float32Array,
  threshold: number = 0.02,
): boolean {
  let rms = 0;
  for (let i = 0; i < audioData.length; i++) {
    rms += audioData[i] * audioData[i];
  }
  rms = Math.sqrt(rms / audioData.length);
  return rms > threshold;
}

// Get noise floor (minimum detectable signal)
export function getNoiseFloor(audioData: Float32Array): number {
  let min = Infinity;
  for (let i = 0; i < audioData.length; i++) {
    const abs = Math.abs(audioData[i]);
    if (abs < min) min = abs;
  }
  return min;
}

// Filter out noise by zeroing out values below threshold
export function noiseGate(
  audioData: Float32Array,
  threshold: number = 0.01,
): Float32Array {
  // Center clipping alters waveform shape and damages autocorrelation.
  // We already employ RMS thresholding to ignore low volume audio.
  return audioData;
}

// Smooth pitch detection results over time
export class PitchSmoother {
  private buffer: number[] = [];
  private readonly windowSize: number;

  constructor(windowSize: number = 5) {
    this.windowSize = windowSize;
  }

  smooth(frequency: number): number {
    if (frequency > 0) {
      this.buffer.push(frequency);
      if (this.buffer.length > this.windowSize) {
        this.buffer.shift();
      }
    }

    if (this.buffer.length === 0) return 0;

    // Return median for robustness
    const sorted = [...this.buffer].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 !== 0
      ? sorted[mid]
      : (sorted[mid - 1] + sorted[mid]) / 2;
  }

  reset(): void {
    this.buffer = [];
  }
}

// Real-time pitch detection with configurable algorithm
export class PitchDetector {
  private smoother: PitchSmoother;
  private lastFrequency: number = 0;
  private readonly algorithm: "autocorrelation" | "fft" = "autocorrelation";

  constructor(smoothingWindow: number = 5) {
    this.smoother = new PitchSmoother(smoothingWindow);
  }

  // Keep track of confidence
  private currentConfidence: number = 0;

  detect(audioData: Float32Array, sampleRate: number): PitchDetectionResult {
    // Check if there's signal
    if (!hasSignal(audioData, 0.005)) {
      this.currentConfidence = Math.max(0, this.currentConfidence - 0.1);
      if (this.currentConfidence <= 0) {
        this.lastFrequency = 0;
      }
      return {
        frequency: this.lastFrequency,
        confidence: this.currentConfidence,
        detected: false,
      };
    }

    // Apply noise gate
    const gated = noiseGate(audioData);

    // Detect pitch using selected algorithm
    let result: PitchDetectionResult;
    if (this.algorithm === "autocorrelation") {
      result = detectPitch(gated, sampleRate);
    } else {
      result = detectPitchFFT(gated, sampleRate);
    }

    // Smooth the result
    if (result.detected) {
      result.frequency = this.smoother.smooth(result.frequency);
      this.lastFrequency = result.frequency;
      this.currentConfidence = result.confidence;
    } else {
      // If detection failed, use last known frequency with lower confidence
      result.frequency = this.lastFrequency;
      this.currentConfidence = Math.max(0, this.currentConfidence - 0.05);
      result.confidence = this.currentConfidence;
    }

    return result;
  }

  reset(): void {
    this.smoother.reset();
    this.lastFrequency = 0;
    this.currentConfidence = 0;
  }
}
