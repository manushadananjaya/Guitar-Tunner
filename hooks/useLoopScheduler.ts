'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { getAudioContext } from '@/lib/synth';

const LOOKAHEAD_MS = 25;
const SCHEDULE_AHEAD_S = 0.1;

export interface LoopSchedulerOptions {
  bpm: number;
  /** Grid slots per beat: 2 for eighth notes, 4 for sixteenths. */
  slotsPerBeat: number;
  /** Slots before the loop repeats. */
  loopLength: number;
  /** Called once per slot, ahead of time, with the exact audio time it
   *  should sound at. Schedule Web Audio events here — do not set state. */
  onSlot: (slot: number, time: number, ctx: AudioContext) => void;
}

/**
 * A looping step sequencer on the Web Audio clock — the same lookahead
 * pattern as useMetronome, generalised to an arbitrary grid so the strumming
 * trainer and the progression player share one timing engine.
 *
 * Settings live in refs so tempo and pattern changes land on the next slot
 * without restarting the loop.
 */
export function useLoopScheduler({ bpm, slotsPerBeat, loopLength, onSlot }: LoopSchedulerOptions) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSlot, setCurrentSlot] = useState(-1);

  const bpmRef = useRef(bpm);
  const slotsPerBeatRef = useRef(slotsPerBeat);
  const loopLengthRef = useRef(loopLength);
  const onSlotRef = useRef(onSlot);
  bpmRef.current = bpm;
  slotsPerBeatRef.current = slotsPerBeat;
  loopLengthRef.current = loopLength;
  onSlotRef.current = onSlot;

  const timerRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const nextTimeRef = useRef(0);
  const slotRef = useRef(0);
  const queueRef = useRef<{ slot: number; time: number }[]>([]);

  const stop = useCallback(() => {
    if (timerRef.current !== null) window.clearInterval(timerRef.current);
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    timerRef.current = null;
    rafRef.current = null;
    queueRef.current = [];
    setCurrentSlot(-1);
    setIsPlaying(false);
  }, []);

  const start = useCallback(() => {
    if (timerRef.current !== null) return;
    const ctx = getAudioContext();
    slotRef.current = 0;
    queueRef.current = [];
    nextTimeRef.current = ctx.currentTime + 0.08;

    const schedule = () => {
      while (nextTimeRef.current < ctx.currentTime + SCHEDULE_AHEAD_S) {
        const slot = slotRef.current % Math.max(1, loopLengthRef.current);
        onSlotRef.current(slot, nextTimeRef.current, ctx);
        queueRef.current.push({ slot, time: nextTimeRef.current });
        nextTimeRef.current += 60 / bpmRef.current / slotsPerBeatRef.current;
        slotRef.current = slot + 1;
      }
    };
    const draw = () => {
      const queue = queueRef.current;
      let latest: number | null = null;
      while (queue.length > 0 && queue[0].time <= ctx.currentTime) {
        latest = queue.shift()!.slot;
      }
      if (latest !== null) setCurrentSlot(latest);
      rafRef.current = requestAnimationFrame(draw);
    };

    schedule();
    timerRef.current = window.setInterval(schedule, LOOKAHEAD_MS);
    rafRef.current = requestAnimationFrame(draw);
    setIsPlaying(true);
  }, []);

  const toggle = useCallback(() => {
    if (timerRef.current !== null) stop();
    else start();
  }, [start, stop]);

  useEffect(() => stop, [stop]);

  return { isPlaying, currentSlot, start, stop, toggle };
}
