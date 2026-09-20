'use client';

import { useEffect, useRef, useCallback, useState } from 'react';

export interface AudioCaptureOptions {
  onDataAvailable?: (audioData: Float32Array) => void;
  onError?: (error: Error) => void;
  sampleRate?: number;
  fftSize?: number;
}

export type PermissionStatus = 'idle' | 'requesting' | 'granted' | 'denied' | 'error';

export interface AudioCaptureState {
  isActive: boolean;
  permission: PermissionStatus;
  error: string | null;
  signalStrength: number; // 0-100
}

export function useAudioCapture(options: AudioCaptureOptions = {}) {
  const {
    onDataAvailable,
    onError,
    sampleRate = 48000,
    fftSize = 4096,
  } = options;

  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Optimistic: the real check needs `window`, so it only runs in the effect
  // below. Starting at false would put a "browser not supported" message in
  // the server HTML of every page that renders a mic UI, and flash it at
  // every visitor before the effect corrected it.
  const [isSupported, setIsSupported] = useState(true);
  const [state, setState] = useState<AudioCaptureState>({
    isActive: false,
    permission: 'idle',
    error: null,
    signalStrength: 0,
  });

  // Check browser support on client only
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const supported = !!window.AudioContext || !!(window as any).webkitAudioContext;
      setIsSupported(supported);
    }
  }, []);

  // Initialize audio context
  const initializeAudioContext = useCallback(() => {
    if (audioContextRef.current) return;

    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) {
        throw new Error('Web Audio API not supported');
      }

      audioContextRef.current = new AudioContext({ sampleRate });
      const analyser = audioContextRef.current.createAnalyser();
      analyser.fftSize = fftSize;
      analyser.smoothingTimeConstant = 0.8;
      analyserRef.current = analyser;
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      setState((prev) => ({
        ...prev,
        permission: 'error',
        error: err.message,
      }));
      onError?.(err);
    }
  }, [sampleRate, fftSize, onError]);

  // Request microphone permission
  const requestMicrophone = useCallback(async () => {
    setState((prev) => ({
      ...prev,
      permission: 'requesting',
      error: null,
    }));

    try {
      initializeAudioContext();

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false,
        },
      });

      streamRef.current = stream;

      const audioContext = audioContextRef.current!;
      const source = audioContext.createMediaStreamSource(stream);
      sourceRef.current = source;

      const analyser = analyserRef.current!;
      source.connect(analyser);

      // Start processing audio data
      const processAudio = () => {
        const dataArray = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(dataArray);

        // Convert byte data to float and calculate signal strength
        const floatData = new Float32Array(analyser.fftSize);
        let sum = 0;
        for (let i = 0; i < analyser.frequencyBinCount; i++) {
          const normalized = dataArray[i] / 255;
          floatData[i] = normalized;
          sum += normalized * normalized;
        }

        const signalStrength = Math.min(100, Math.sqrt(sum / analyser.frequencyBinCount) * 100);
        setState((prev) => ({
          ...prev,
          signalStrength: Math.round(signalStrength),
        }));

        // Get time domain data for pitch detection
        const timeDomainData = new Float32Array(analyser.fftSize);
        analyser.getFloatTimeDomainData(timeDomainData);

        onDataAvailable?.(timeDomainData);

        animationFrameRef.current = requestAnimationFrame(processAudio);
      };

      processAudio();

      setState((prev) => ({
        ...prev,
        permission: 'granted',
        isActive: true,
        error: null,
      }));
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));

      // Determine specific permission error
      let permission: PermissionStatus = 'error';
      if (err.name === 'NotAllowedError') {
        permission = 'denied';
      }

      setState((prev) => ({
        ...prev,
        permission,
        error: err.message,
        isActive: false,
      }));

      onError?.(err);
    }
  }, [initializeAudioContext, onDataAvailable, onError]);

  // Stop audio capture
  const stopAudioCapture = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        track.stop();
      });
      streamRef.current = null;
    }

    if (sourceRef.current) {
      sourceRef.current.disconnect();
      sourceRef.current = null;
    }

    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }

    analyserRef.current = null;

    setState((prev) => ({
      ...prev,
      isActive: false,
      signalStrength: 0,
    }));
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopAudioCapture();
    };
  }, [stopAudioCapture]);

  return {
    state,
    requestMicrophone,
    stopAudioCapture,
    isSupported,
  };
}
