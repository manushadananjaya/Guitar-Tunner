'use client';

import { useRef, useCallback, useState } from 'react';

export interface AudioToneOptions {
  volume?: number; // 0-1
  duration?: number; // milliseconds
  fadeInTime?: number; // milliseconds
  fadeOutTime?: number; // milliseconds
}

export function useAudioTone() {
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Initialize audio context
  const initAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      audioContextRef.current = new AudioContext();
    }
    return audioContextRef.current;
  }, []);

  // Play a tone at specified frequency
  const playTone = useCallback(
    (
      frequency: number,
      options: AudioToneOptions = {}
    ) => {
      const {
        volume = 0.3,
        duration = 1000,
        fadeInTime = 100,
        fadeOutTime = 200,
      } = options;

      try {
        if (isPlaying) {
          stopTone();
        }

        const ctx = initAudioContext();

        // Create oscillator and gain node
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.type = 'sine';
        oscillator.frequency.value = frequency;

        // Set initial gain to 0 for fade in
        gainNode.gain.setValueAtTime(0, ctx.currentTime);

        // Fade in
        gainNode.gain.linearRampToValueAtTime(volume, ctx.currentTime + fadeInTime / 1000);

        // Hold
        gainNode.gain.setValueAtTime(volume, ctx.currentTime + (duration - fadeOutTime) / 1000);

        // Fade out
        gainNode.gain.linearRampToValueAtTime(
          0,
          ctx.currentTime + duration / 1000
        );

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + duration / 1000);

        oscillatorRef.current = oscillator;
        gainNodeRef.current = gainNode;
        setIsPlaying(true);

        // Update playing state when tone finishes
        setTimeout(() => {
          setIsPlaying(false);
        }, duration);
      } catch (error) {
        console.error('[v0] Error playing tone:', error);
      }
    },
    [isPlaying, initAudioContext]
  );

  // Stop the current tone
  const stopTone = useCallback(() => {
    try {
      if (oscillatorRef.current) {
        oscillatorRef.current.stop();
        oscillatorRef.current = null;
      }
      if (gainNodeRef.current) {
        gainNodeRef.current = null;
      }
      setIsPlaying(false);
    } catch (error) {
      console.error('[v0] Error stopping tone:', error);
    }
  }, []);

  // Play multiple tones in sequence
  const playSequence = useCallback(
    (frequencies: number[], options: AudioToneOptions = {}) => {
      const { duration = 500, fadeInTime = 50, fadeOutTime = 100 } = options;

      let currentIndex = 0;

      const playNext = () => {
        if (currentIndex < frequencies.length) {
          playTone(frequencies[currentIndex], {
            ...options,
            duration,
            fadeInTime,
            fadeOutTime,
          });
          currentIndex++;
          setTimeout(playNext, duration + 100);
        }
      };

      playNext();
    },
    [playTone]
  );

  return {
    playTone,
    stopTone,
    playSequence,
    isPlaying,
  };
}
