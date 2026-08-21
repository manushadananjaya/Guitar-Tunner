'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

/** How often the JS timer wakes to look for notes to schedule. */
const LOOKAHEAD_MS = 25;
/** How far ahead of the audio clock we schedule. Must exceed LOOKAHEAD_MS
 *  comfortably, or a late timer callback drops a beat. */
const SCHEDULE_AHEAD_S = 0.1;

/** Taps further apart than this start a new tap-tempo measurement. */
const TAP_RESET_MS = 2000;
const MAX_TAPS = 5;

export const MIN_BPM = 30;
export const MAX_BPM = 300;

export type ClickKind = 'accent' | 'beat' | 'subdivision';

const CLICK_SPECS: Record<ClickKind, { frequency: number; gain: number }> = {
  accent: { frequency: 1600, gain: 1 },
  beat: { frequency: 1000, gain: 0.62 },
  subdivision: { frequency: 800, gain: 0.3 },
};

export interface UseMetronomeResult {
  isPlaying: boolean;
  bpm: number;
  beatsPerMeasure: number;
  subdivision: number;
  accentFirstBeat: boolean;
  volume: number;
  /** Index of the currently sounding slot within the measure, or -1 when stopped. */
  currentSlot: number;
  setBpm: (bpm: number) => void;
  setBeatsPerMeasure: (beats: number) => void;
  setSubdivision: (subdivision: number) => void;
  setAccentFirstBeat: (accent: boolean) => void;
  setVolume: (volume: number) => void;
  start: () => void;
  stop: () => void;
  toggle: () => void;
  /** Register a tap; returns the inferred BPM once there are enough taps. */
  tap: () => void;
}

const clampBpm = (value: number) =>
  Math.min(MAX_BPM, Math.max(MIN_BPM, Math.round(value)));

/**
 * Metronome built on the lookahead-scheduler pattern.
 *
 * A setInterval alone is far too jittery to drive audible beats — browsers
 * clamp and throttle it, especially in background tabs. Instead the interval
 * only *looks ahead*: every LOOKAHEAD_MS it finds every beat falling inside
 * the next SCHEDULE_AHEAD_S and hands them to Web Audio with explicit start
 * times. Web Audio renders those on the sample-accurate audio clock, so the
 * timing is exact even when the JS callback is late.
 */
export function useMetronome(): UseMetronomeResult {
  const [isPlaying, setIsPlaying] = useState(false);
  const [bpm, setBpmState] = useState(120);
  const [beatsPerMeasure, setBeatsPerMeasureState] = useState(4);
  const [subdivision, setSubdivisionState] = useState(1);
  const [accentFirstBeat, setAccentFirstBeatState] = useState(true);
  const [volume, setVolumeState] = useState(0.6);
  const [currentSlot, setCurrentSlot] = useState(-1);

  const ctxRef = useRef<AudioContext | null>(null);
  const timerRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  /** Audio-clock time of the next slot to schedule. */
  const nextSlotTimeRef = useRef(0);
  /** Slot index within the measure (counts subdivisions, not just beats). */
  const slotRef = useRef(0);
  /** Slots already handed to Web Audio, awaiting their moment on screen. */
  const visualQueueRef = useRef<{ slot: number; time: number }[]>([]);
  const tapTimesRef = useRef<number[]>([]);

  // The scheduler reads settings on every tick. Mirroring them into refs lets
  // a control change take effect on the next beat without restarting the
  // scheduler (which would reset the measure and audibly stutter).
  const bpmRef = useRef(bpm);
  const beatsRef = useRef(beatsPerMeasure);
  const subdivisionRef = useRef(subdivision);
  const accentRef = useRef(accentFirstBeat);
  const volumeRef = useRef(volume);

  const setBpm = useCallback((value: number) => {
    const next = clampBpm(value);
    bpmRef.current = next;
    setBpmState(next);
  }, []);

  const setBeatsPerMeasure = useCallback((value: number) => {
    beatsRef.current = value;
    setBeatsPerMeasureState(value);
  }, []);

  const setSubdivision = useCallback((value: number) => {
    subdivisionRef.current = value;
    setSubdivisionState(value);
  }, []);

  const setAccentFirstBeat = useCallback((value: boolean) => {
    accentRef.current = value;
    setAccentFirstBeatState(value);
  }, []);

  const setVolume = useCallback((value: number) => {
    volumeRef.current = value;
    setVolumeState(value);
  }, []);

  const getContext = useCallback(() => {
    if (!ctxRef.current) {
      const Ctor =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      ctxRef.current = new Ctor();
    }
    return ctxRef.current;
  }, []);

  /** Schedule one click at an exact time on the audio clock. */
  const scheduleClick = useCallback((time: number, kind: ClickKind) => {
    const ctx = ctxRef.current;
    if (!ctx) return;

    const spec = CLICK_SPECS[kind];
    const peak = Math.max(0.0001, spec.gain * volumeRef.current);

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(spec.frequency, time);

    // Very fast attack, exponential decay — a click, not a tone. Exponential
    // ramps cannot reach zero, hence the small floor.
    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.exponentialRampToValueAtTime(peak, time + 0.002);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.045);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(time);
    osc.stop(time + 0.06);
  }, []);

  const scheduler = useCallback(() => {
    const ctx = ctxRef.current;
    if (!ctx) return;

    while (nextSlotTimeRef.current < ctx.currentTime + SCHEDULE_AHEAD_S) {
      const sub = Math.max(1, subdivisionRef.current);
      const slotsPerMeasure = Math.max(1, beatsRef.current * sub);
      // Settings can change mid-measure, so clamp before use.
      const slot = slotRef.current % slotsPerMeasure;

      const isDownbeat = slot % sub === 0;
      const kind: ClickKind =
        slot === 0 && accentRef.current
          ? 'accent'
          : isDownbeat
            ? 'beat'
            : 'subdivision';

      scheduleClick(nextSlotTimeRef.current, kind);
      visualQueueRef.current.push({ slot, time: nextSlotTimeRef.current });

      nextSlotTimeRef.current += 60 / bpmRef.current / sub;
      slotRef.current = (slot + 1) % slotsPerMeasure;
    }
  }, [scheduleClick]);

  /** Advance the on-screen beat only once the audio clock reaches it, so the
   *  highlight lands with the click rather than when it was scheduled. */
  const drawLoop = useCallback(() => {
    const ctx = ctxRef.current;
    if (ctx) {
      const queue = visualQueueRef.current;
      while (queue.length > 0 && queue[0].time <= ctx.currentTime) {
        setCurrentSlot(queue[0].slot);
        queue.shift();
      }
    }
    rafRef.current = requestAnimationFrame(drawLoop);
  }, []);

  const stop = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    visualQueueRef.current = [];
    setCurrentSlot(-1);
    setIsPlaying(false);
  }, []);

  const start = useCallback(() => {
    if (timerRef.current !== null) return;

    const ctx = getContext();
    // Browsers start contexts suspended until a user gesture.
    void ctx.resume();

    slotRef.current = 0;
    visualQueueRef.current = [];
    // Small offset so the first beat is scheduled, not already past.
    nextSlotTimeRef.current = ctx.currentTime + 0.06;

    timerRef.current = window.setInterval(scheduler, LOOKAHEAD_MS);
    rafRef.current = requestAnimationFrame(drawLoop);
    setIsPlaying(true);
  }, [getContext, scheduler, drawLoop]);

  const toggle = useCallback(() => {
    if (timerRef.current !== null) stop();
    else start();
  }, [start, stop]);

  const tap = useCallback(() => {
    const now = performance.now();
    const taps = tapTimesRef.current;

    if (taps.length > 0 && now - taps[taps.length - 1] > TAP_RESET_MS) {
      taps.length = 0;
    }
    taps.push(now);
    if (taps.length > MAX_TAPS) taps.shift();

    if (taps.length < 2) return;

    // Mean of the gaps between consecutive taps.
    let total = 0;
    for (let i = 1; i < taps.length; i++) total += taps[i] - taps[i - 1];
    const averageGap = total / (taps.length - 1);
    if (averageGap > 0) setBpm(60000 / averageGap);
  }, [setBpm]);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) window.clearInterval(timerRef.current);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      void ctxRef.current?.close();
    };
  }, []);

  return {
    isPlaying,
    bpm,
    beatsPerMeasure,
    subdivision,
    accentFirstBeat,
    volume,
    currentSlot,
    setBpm,
    setBeatsPerMeasure,
    setSubdivision,
    setAccentFirstBeat,
    setVolume,
    start,
    stop,
    toggle,
    tap,
  };
}
