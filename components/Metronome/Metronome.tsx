"use client";

import React, { useEffect, useState } from "react";
import { Play, Pause, Minus, Plus, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMetronome, MIN_BPM, MAX_BPM } from "@/hooks/useMetronome";

/** Traditional Italian tempo markings, by BPM range. */
const TEMPO_MARKINGS: { name: string; upTo: number }[] = [
  { name: "Larghissimo", upTo: 24 },
  { name: "Grave", upTo: 40 },
  { name: "Largo", upTo: 60 },
  { name: "Adagio", upTo: 76 },
  { name: "Andante", upTo: 108 },
  { name: "Moderato", upTo: 120 },
  { name: "Allegro", upTo: 156 },
  { name: "Vivace", upTo: 176 },
  { name: "Presto", upTo: 200 },
  { name: "Prestissimo", upTo: Infinity },
];

const tempoMarking = (bpm: number) =>
  TEMPO_MARKINGS.find((marking) => bpm <= marking.upTo)?.name ?? "";

const SUBDIVISIONS = [
  { value: 1, label: "Quarter", symbol: "♩" },
  { value: 2, label: "Eighths", symbol: "♫" },
  { value: 3, label: "Triplets", symbol: "♪³" },
  { value: 4, label: "Sixteenths", symbol: "♬" },
];

const TIME_SIGNATURES = [2, 3, 4, 5, 6, 7];

export function Metronome() {
  const [mounted, setMounted] = useState(false);
  const metronome = useMetronome();
  const {
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
    toggle,
    tap,
  } = metronome;

  useEffect(() => setMounted(true), []);

  // Space toggles, arrows nudge tempo — but never while the user is typing.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }

      if (event.code === "Space") {
        event.preventDefault();
        toggle();
      } else if (event.code === "ArrowUp" || event.code === "ArrowRight") {
        event.preventDefault();
        setBpm(bpm + 1);
      } else if (event.code === "ArrowDown" || event.code === "ArrowLeft") {
        event.preventDefault();
        setBpm(bpm - 1);
      } else if (event.code === "KeyT") {
        event.preventDefault();
        tap();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [bpm, setBpm, toggle, tap]);

  // The hook owns an AudioContext, so render nothing until mounted to keep the
  // server and client markup identical.
  if (!mounted) {
    return (
      <div className="w-full max-w-3xl mx-auto px-4 sm:px-6">
        <div className="h-[520px] rounded-3xl border border-line bg-surface-sunken/30 animate-pulse" />
      </div>
    );
  }

  // The beat dots show main beats; subdivisions sound but aren't drawn.
  const activeBeat =
    currentSlot >= 0 ? Math.floor(currentSlot / subdivision) : -1;
  const onDownbeat = currentSlot >= 0 && currentSlot % subdivision === 0;

  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 flex flex-col gap-6">
      {/* Beat display */}
      <div className="rounded-3xl border border-line bg-surface-sunken/30 p-6 sm:p-10 backdrop-blur-md shadow-2xl">
        <div className="flex justify-center gap-3 sm:gap-4 mb-8">
          {Array.from({ length: beatsPerMeasure }, (_, i) => {
            const isActive = activeBeat === i && onDownbeat;
            const isAccent = i === 0 && accentFirstBeat;
            return (
              <div
                key={i}
                aria-hidden="true"
                className={cn(
                  "rounded-full transition-all duration-75",
                  isAccent ? "w-5 h-5 sm:w-6 sm:h-6" : "w-4 h-4 sm:w-5 sm:h-5",
                  isActive
                    ? isAccent
                      ? "bg-brass-hover scale-150 shadow-[0_0_20px_#67e8f9]"
                      : "bg-brass-hover scale-135 shadow-[0_0_14px_#22d3ee]"
                    : "bg-surface-raised",
                )}
              />
            );
          })}
        </div>

        {/* Tempo readout */}
        <div className="text-center">
          <div
            className="text-7xl sm:text-8xl font-bold tracking-tighter text-ink tabular-nums leading-none"
            aria-live="off"
          >
            {bpm}
          </div>
          <div className="mt-2 text-xs font-bold uppercase tracking-[0.18em] text-ink-subtle">
            BPM · {tempoMarking(bpm)}
          </div>
        </div>

        {/* Tempo slider */}
        <div className="mt-8 flex items-center gap-4">
          <button
            type="button"
            onClick={() => setBpm(bpm - 1)}
            aria-label="Decrease tempo"
            className="shrink-0 w-10 h-10 rounded-full border border-line-strong bg-surface/60 text-ink hover:border-brass/50 hover:text-brass transition-colors flex items-center justify-center"
          >
            <Minus className="w-4 h-4" />
          </button>

          <input
            type="range"
            min={MIN_BPM}
            max={MAX_BPM}
            value={bpm}
            onChange={(event) => setBpm(Number(event.target.value))}
            aria-label="Tempo in beats per minute"
            className="flex-1 h-2 rounded-full appearance-none bg-surface-raised accent-brass cursor-pointer"
          />

          <button
            type="button"
            onClick={() => setBpm(bpm + 1)}
            aria-label="Increase tempo"
            className="shrink-0 w-10 h-10 rounded-full border border-line-strong bg-surface/60 text-ink hover:border-brass/50 hover:text-brass transition-colors flex items-center justify-center"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Transport */}
        <div className="mt-8 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={toggle}
            aria-pressed={isPlaying}
            className={cn(
              "h-14 px-10 rounded-full text-sm font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-2.5",
              isPlaying
                ? "bg-off/20 border border-off/40 text-off hover:bg-off/30"
                : "bg-brass text-brass-contrast hover:bg-brass-hover shadow-lg shadow-brass/20",
            )}
          >
            {isPlaying ? (
              <>
                <Pause className="w-5 h-5" /> Stop
              </>
            ) : (
              <>
                <Play className="w-5 h-5" /> Start
              </>
            )}
          </button>

          <button
            type="button"
            onClick={tap}
            className="h-14 px-7 rounded-full border border-line-strong bg-surface/60 text-sm font-bold uppercase tracking-wider text-ink hover:border-brass/50 hover:text-brass transition-colors"
          >
            Tap
          </button>
        </div>

        <p className="mt-5 text-center text-2xs text-ink-subtle">
          Space to start/stop · Arrow keys to adjust tempo · T to tap
        </p>
      </div>

      {/* Settings */}
      <div className="rounded-3xl border border-line bg-surface-sunken/20 p-6 sm:p-8 backdrop-blur-sm grid gap-6 sm:grid-cols-2">
        {/* Time signature */}
        <div className="space-y-2.5">
          <p className="text-2xs font-semibold uppercase tracking-[0.18em] text-ink-subtle">
            Beats per Measure
          </p>
          <div className="grid grid-cols-6 gap-1.5">
            {TIME_SIGNATURES.map((beats) => (
              <button
                key={beats}
                type="button"
                onClick={() => setBeatsPerMeasure(beats)}
                aria-pressed={beatsPerMeasure === beats}
                className={cn(
                  "h-11 rounded-xl border text-sm font-semibold transition-colors",
                  beatsPerMeasure === beats
                    ? "border-brass/60 bg-brass/10 text-brass-hover"
                    : "border-line bg-surface/60 text-ink hover:border-line-strong",
                )}
              >
                {beats}
              </button>
            ))}
          </div>
        </div>

        {/* Subdivision */}
        <div className="space-y-2.5">
          <p className="text-2xs font-semibold uppercase tracking-[0.18em] text-ink-subtle">
            Subdivision
          </p>
          <div className="grid grid-cols-4 gap-1.5">
            {SUBDIVISIONS.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setSubdivision(option.value)}
                aria-pressed={subdivision === option.value}
                aria-label={option.label}
                title={option.label}
                className={cn(
                  "h-11 rounded-xl border text-base font-semibold transition-colors",
                  subdivision === option.value
                    ? "border-brass/60 bg-brass/10 text-brass-hover"
                    : "border-line bg-surface/60 text-ink hover:border-line-strong",
                )}
              >
                {option.symbol}
              </button>
            ))}
          </div>
        </div>

        {/* Accent */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-ink">
              Accent first beat
            </p>
            <p className="text-2xs text-ink-subtle">
              Emphasise beat 1 of each measure
            </p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={accentFirstBeat}
            aria-label="Accent first beat"
            onClick={() => setAccentFirstBeat(!accentFirstBeat)}
            className={cn(
              "relative w-12 h-7 rounded-full transition-colors shrink-0",
              accentFirstBeat ? "bg-brass" : "bg-surface-raised",
            )}
          >
            <span
              className={cn(
                "absolute top-1 w-5 h-5 rounded-full bg-white transition-all",
                accentFirstBeat ? "left-6" : "left-1",
              )}
            />
          </button>
        </div>

        {/* Volume */}
        <div className="space-y-2.5">
          <p className="text-2xs font-semibold uppercase tracking-[0.18em] text-ink-subtle">
            Volume
          </p>
          <div className="flex items-center gap-3">
            <Volume2 className="w-4 h-4 text-ink-subtle shrink-0" />
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={(event) => setVolume(Number(event.target.value))}
              aria-label="Click volume"
              className="flex-1 h-2 rounded-full appearance-none bg-surface-raised accent-brass cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
