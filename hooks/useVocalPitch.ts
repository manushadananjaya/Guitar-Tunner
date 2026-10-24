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
  /** Detection range, Hz. Defaults suit the voice (65–1100); the strobe
   *  tuner widens it for low instrument strings. */
  minFrequency?: number;
  maxFrequency?: number;
  /** Reject sudden octave jumps — right for voice, wrong for an instrument
   *  where you move from string to string. Default true. */
  octaveGuard?: boolean;
  /** Concert pitch the nearest note is judged against. Default 440. */
  referencePitch?: number;
  /** Skip smoothing when a reading jumps more than this many cents, so a
   *  new string reads at once instead of gliding there. Off by default. */
  snapCents?: number;
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

/** Live, chromatic pitch tracking, tuned by default for the human voice
 *  (C2–C#6). Deliberately separate from usePitchDetector so the guitar tuner
 *  is untouched. The detector options are read once, on first render. */
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
    minFrequency = 65,
    maxFrequency = 1100,
    octaveGuard = true,
    referencePitch = 440,
    snapCents,
  } = options;

  const detectorRef = useRef<PitchDetector | null>(null);
  if (detectorRef.current === null) {
    detectorRef.current = new PitchDetector({
      smoothingWindow: 5,
      minFrequency,
      maxFrequency,
      confidenceThreshold: 0.7,
      rmsGate: 0.006,
      octaveGuard,
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
      const jumped =
        snapCents !== undefined &&
        smoothedRef.current > 0 &&
        Math.abs(centsFromFrequency(result.frequency, smoothedRef.current)) > snapCents;
      const freq = jumped
        ? result.frequency
        : smoothFrequency(smoothedRef.current, result.frequency, smoothingFactor);
      smoothedRef.current = freq;

      // Judge the note at the chosen concert pitch: scale into A = 440,
      // name it there, and scale its frequency back.
      const ratio = referencePitch / 440;
      const note = frequencyToNote(freq / ratio);
      const reference =
        targetFrequency && targetFrequency > 0 ? targetFrequency : note.frequency * ratio;
      const cents = centsFromFrequency(freq, reference);

      setState({
        frequency: freq,
        midi: frequencyToMidi(freq / ratio),
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
    referencePitch,
    snapCents,
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
