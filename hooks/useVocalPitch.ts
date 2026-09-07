"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { PitchDetector } from "@/lib/pitchDetection";
import {
  centsFromFrequency,
  frequencyToMidi,
  frequencyToNote,
  smoothFrequency,
} from "@/lib/noteMap";

export interface VocalPitchOptions {
  /** When set, cents are measured against this pitch instead of the nearest
   *  chromatic note. Used by the pitch-matching mode. */
  targetFrequency?: number;
  /** Half-width of the "in tune" window, in cents. Default 15. */
  accuracyCents?: number;
  /** Exponential smoothing applied to the reported frequency. Default 0.6. */
  smoothingFactor?: number;
  /** Minimum milliseconds between recomputes. Default 30. */
  updateRate?: number;
}

export interface VocalPitchState {
  /** Smoothed fundamental in Hz, or 0 when nothing is detected. */
  frequency: number;
  /** Fractional MIDI number for the smoothed frequency (0 when idle). */
  midi: number;
  noteName: string;
  octave: number;
  /** Offset from the reference pitch, roughly -50..+50. */
  cents: number;
  inTune: boolean;
  detected: boolean;
  /** Detector confidence, 0..1. */
  clarity: number;
}

const IDLE: VocalPitchState = {
  frequency: 0,
  midi: 0,
  noteName: "—",
  octave: 0,
  cents: 0,
  inTune: false,
  detected: false,
  clarity: 0,
};

const HOLD_MS = 500;

/** Live, chromatic pitch tracking tuned for the human voice (C2–C#6).
 *  Deliberately separate from usePitchDetector so the guitar tuner is untouched. */
export function useVocalPitch(
  audioData: Float32Array | null,
  sampleRate: number = 48000,
  options: VocalPitchOptions = {},
) {
  const {
    targetFrequency,
    accuracyCents = 15,
    smoothingFactor = 0.6,
    updateRate = 30,
  } = options;

  const detectorRef = useRef<PitchDetector | null>(null);
  if (detectorRef.current === null) {
    detectorRef.current = new PitchDetector({
      smoothingWindow: 5,
      minFrequency: 65,
      maxFrequency: 1100,
      confidenceThreshold: 0.7,
      rmsGate: 0.006,
      octaveGuard: true,
    });
  }

  const lastUpdateRef = useRef(0);
  const smoothedRef = useRef(0);
  const lastHitRef = useRef(0);

  const [state, setState] = useState<VocalPitchState>(IDLE);

  const run = useCallback(() => {
    if (!audioData || audioData.length === 0) return;

    const now = Date.now();
    if (now - lastUpdateRef.current < updateRate) return;
    lastUpdateRef.current = now;

    const result = detectorRef.current!.detect(audioData, sampleRate);

    if (result.detected && result.frequency > 0) {
      lastHitRef.current = now;
      const freq = smoothFrequency(
        smoothedRef.current,
        result.frequency,
        smoothingFactor,
      );
      smoothedRef.current = freq;

      const note = frequencyToNote(freq);
      const reference =
        targetFrequency && targetFrequency > 0 ? targetFrequency : note.frequency;
      const cents = centsFromFrequency(freq, reference);

      setState({
        frequency: freq,
        midi: frequencyToMidi(freq),
        noteName: note.name,
        octave: note.octave,
        cents,
        inTune: Math.abs(cents) <= accuracyCents,
        detected: true,
        clarity: result.confidence,
      });
      return;
    }

    // Nothing detected — hold the last reading briefly, then fall back to idle
    // so the needle and note name do not flicker on every unvoiced frame.
    if (now - lastHitRef.current >= HOLD_MS) {
      smoothedRef.current = 0;
      setState((prev) => (prev.detected || prev.frequency > 0 ? IDLE : prev));
    } else {
      setState((prev) => ({ ...prev, detected: false, clarity: result.confidence }));
    }
  }, [
    audioData,
    sampleRate,
    targetFrequency,
    accuracyCents,
    smoothingFactor,
    updateRate,
  ]);

  useEffect(() => {
    if (audioData && audioData.length > 0) run();
  }, [audioData, run]);

  const reset = useCallback(() => {
    detectorRef.current?.reset();
    smoothedRef.current = 0;
    lastHitRef.current = 0;
    setState(IDLE);
  }, []);

  return { ...state, reset };
}
