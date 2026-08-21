"use client";

import React, { useCallback, useRef, useState } from "react";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ChordPlayerProps {
  /** MIDI note numbers, low string to high. */
  notes: number[];
  label: string;
  className?: string;
}

/** Seconds between consecutive strings — what makes a strum sound strummed. */
const STRUM_OFFSET = 0.035;
const NOTE_LENGTH = 2.2;

const midiToFrequency = (midi: number) => 440 * Math.pow(2, (midi - 69) / 12);

/**
 * Plays a chord as a downward strum.
 *
 * A plucked string is not a sine wave, so a bare oscillator sounds nothing like
 * a guitar. Stacking a few harmonics with a fast attack and a long exponential
 * decay gets close enough to be recognisable and useful for checking a shape.
 */
export function ChordPlayer({ notes, label, className }: ChordPlayerProps) {
  const ctxRef = useRef<AudioContext | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const play = useCallback(() => {
    if (!ctxRef.current) {
      const Ctor =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      ctxRef.current = new Ctor();
    }
    const ctx = ctxRef.current;
    void ctx.resume();

    const start = ctx.currentTime + 0.05;

    notes.forEach((midi, i) => {
      const at = start + i * STRUM_OFFSET;
      const fundamental = midiToFrequency(midi);

      // Amplitudes chosen to fall away quickly — a real string's upper
      // partials are much quieter than its fundamental.
      const partials = [
        { ratio: 1, gain: 0.5 },
        { ratio: 2, gain: 0.2 },
        { ratio: 3, gain: 0.1 },
        { ratio: 4, gain: 0.05 },
      ];

      const voice = ctx.createGain();
      voice.gain.setValueAtTime(0.0001, at);
      voice.gain.exponentialRampToValueAtTime(0.28 / notes.length + 0.03, at + 0.008);
      voice.gain.exponentialRampToValueAtTime(0.0001, at + NOTE_LENGTH);
      voice.connect(ctx.destination);

      for (const partial of partials) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(fundamental * partial.ratio, at);
        gain.gain.setValueAtTime(partial.gain, at);
        // Higher partials die away faster, as they do on a real string.
        gain.gain.exponentialRampToValueAtTime(
          0.0001,
          at + NOTE_LENGTH / partial.ratio,
        );
        osc.connect(gain);
        gain.connect(voice);
        osc.start(at);
        osc.stop(at + NOTE_LENGTH);
      }
    });

    setIsPlaying(true);
    if (timeoutRef.current !== null) window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(
      () => setIsPlaying(false),
      (notes.length * STRUM_OFFSET + 0.5) * 1000,
    );
  }, [notes]);

  return (
    <button
      type="button"
      onClick={play}
      aria-label={`Play ${label}`}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors",
        isPlaying
          ? "border-cyan-400/60 bg-cyan-500/20 text-cyan-300"
          : "border-zinc-700 bg-zinc-900/60 text-zinc-300 hover:border-cyan-500/50 hover:text-cyan-400",
        className,
      )}
    >
      <Play className="h-3 w-3" />
      Play
    </button>
  );
}
