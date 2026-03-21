"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { PitchDetector, PitchDetectionResult } from "@/lib/pitchDetection";
import { getTunerReading, TunerReading, smoothFrequency } from "@/lib/noteMap";

export interface PitchDetectorOptions {
  targetFrequency?: number;
  accuracyCents?: number;
  smoothingFactor?: number;
  updateRate?: number; // milliseconds between updates
}

export interface PitchDetectorState {
  frequency: number;
  reading: TunerReading | null;
  confidence: number;
  detected: boolean;
}

export function usePitchDetector(
  audioData: Float32Array | null,
  sampleRate: number = 48000,
  options: PitchDetectorOptions = {},
) {
  const {
    targetFrequency = 440,
    accuracyCents = 5,
    smoothingFactor = 0.7,
    updateRate = 50,
  } = options;

  const detectorRef = useRef<PitchDetector>(new PitchDetector(5));
  const lastUpdateRef = useRef<number>(0);
  const smoothedFreqRef = useRef<number>(0);

  const [state, setState] = useState<PitchDetectorState>({
    frequency: 0,
    reading: null,
    confidence: 0,
    detected: false,
  });

  // Detect pitch from audio data
  const detectPitch = useCallback(() => {
    if (!audioData || audioData.length === 0) {
      return;
    }

    const now = Date.now();
    if (now - lastUpdateRef.current < updateRate) {
      return;
    }

    lastUpdateRef.current = now;

    try {
      const result = detectorRef.current.detect(audioData, sampleRate);

      if (result.frequency > 0 && result.detected) {
        // Smooth the frequency
        smoothedFreqRef.current = smoothFrequency(
          smoothedFreqRef.current,
          result.frequency,
          smoothingFactor,
        );

        // Get tuner reading
        const reading = getTunerReading(
          smoothedFreqRef.current,
          targetFrequency,
          accuracyCents,
        );

        setState({
          frequency: smoothedFreqRef.current,
          reading,
          confidence: result.confidence,
          detected: true,
        });
      } else if (result.confidence > 0 && result.frequency > 0) {
        // Low confidence detection - preserve the reading so the needle doesn't snap
        const reading = getTunerReading(
          result.frequency,
          targetFrequency,
          accuracyCents,
        );
        setState((prev) => ({
          ...prev,
          frequency: result.frequency,
          reading,
          confidence: result.confidence,
          detected: false,
        }));
      } else {
        // No detection
        setState({
          frequency: 0,
          reading: null,
          confidence: 0,
          detected: false,
        });
        smoothedFreqRef.current = 0;
      }
    } catch (error) {
      console.error("[v0] Pitch detection error:", error);
    }
  }, [
    audioData,
    sampleRate,
    targetFrequency,
    accuracyCents,
    smoothingFactor,
    updateRate,
  ]);

  // Effect to detect pitch whenever audio data changes
  useEffect(() => {
    if (audioData && audioData.length > 0) {
      detectPitch();
    }
  }, [audioData, detectPitch]);

  // Reset detector
  const resetDetector = useCallback(() => {
    detectorRef.current.reset();
    smoothedFreqRef.current = 0;
    setState({
      frequency: 0,
      reading: null,
      confidence: 0,
      detected: false,
    });
  }, []);

  return {
    ...state,
    reset: resetDetector,
  };
}
