"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface GuitarGuideProps {
  strings: string[];
  selectedStringIndex: number;
  detectedStringIndex?: number | null;
  cents: number;
  isListening: boolean;
  onSelectString: (index: number) => void;
}

export function GuitarGuide({
  strings,
  selectedStringIndex,
  detectedStringIndex,
  cents,
  isListening,
  onSelectString,
}: GuitarGuideProps) {
  const centOffset = Math.max(-50, Math.min(50, cents));
  const stringCount = strings.length;
  // Dynamic layout: Bass guitars (4 strings) are often inline on one side, but we'll do 3x3 for standard, half-half for others.
  const isInline = stringCount === 4;
  const leftCount = isInline ? stringCount : Math.ceil(stringCount / 2);

  const guidance = !isListening
    ? "Start tuner and pluck highlighted."
    : Math.abs(centOffset) <= 5
      ? "In tune. No turn needed."
      : centOffset < 0
        ? "Pitch is low. Tighten peg."
        : "Pitch is high. Loosen peg.";

  const knobDirection = centOffset < 0 ? "↻ Tighten peg" : "↺ Loosen peg";

  const renderPeg = (note: string, index: number, isLeft: boolean) => {
    const isSelected = index === selectedStringIndex;
    const isDetected = index === detectedStringIndex;
    const isActive = isSelected || isDetected;
    const rotation = isSelected ? (centOffset / 50) * 45 : 0; // Rotate button visually

    return (
      <div
        key={index}
        className={cn(
          "flex items-center gap-1 sm:gap-2",
          isLeft ? "flex-row" : "flex-row-reverse",
        )}
      >
        {/* Peg Head (Actionable Button) */}
        <button
          onClick={() => onSelectString(index)}
          className={cn(
            "w-12 h-9 sm:w-16 sm:h-10 rounded-md xl:rounded-lg border backdrop-blur-sm transition-all duration-300 shadow flex items-center justify-center font-bold text-sm sm:text-base cursor-pointer focus:outline-none",
            isSelected
              ? "bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.3)] z-10 scale-110"
              : isDetected
                ? "bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-[0_0_15px_rgba(52,211,153,0.3)] z-10"
                : "bg-zinc-800/80 border-zinc-700 text-zinc-500 hover:bg-zinc-700/80 hover:text-zinc-300",
          )}
          style={{
            transform: isSelected
              ? `rotate(${isLeft ? rotation : -rotation}deg) scale(1.1)`
              : "none",
          }}
          aria-label={`Select string ${index + 1} (${note})`}
        >
          {note}
        </button>

        {/* Peg Shaft */}
        <div
          className={cn(
            "h-1.5 sm:h-2 rounded-full transition-all duration-300",
            isSelected
              ? "bg-linear-to-r from-cyan-400 to-cyan-500/20 w-4 sm:w-6 shadow-[0_0_10px_rgba(34,211,238,0.5)]"
              : isDetected
                ? "bg-linear-to-r from-emerald-400 to-emerald-500/20 w-4 sm:w-6"
                : "bg-linear-to-r from-zinc-700 to-zinc-800/50 w-3 sm:w-5",
          )}
          style={{ transform: isLeft ? "none" : "rotate(180deg)" }}
        />

        {/* Post embedded in the center beam */}
        <div
          className={cn(
            "w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded-full border-2 transition-all duration-300 z-20",
            isSelected
              ? "bg-cyan-950 border-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]"
              : isDetected
                ? "bg-emerald-950 border-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"
                : "bg-zinc-900 border-zinc-600",
          )}
        />
      </div>
    );
  };

  return (
    <section className="w-full relative py-6 flex flex-col items-center">
      <div className="text-center mb-6 px-4">
        <h3 className="text-xl font-semibold tracking-tight text-zinc-100">
          Headstock Alignment
        </h3>
        <p className="text-sm text-zinc-400 mt-1">
          Tap a peg to tune that string specifically.
        </p>
      </div>

      {/* Abstract Headstock Container */}
      <div className="relative flex justify-between w-full min-h-[320px] max-w-[280px] mx-auto">
        {/* Center Beam (The Neck/Headstock Base) */}
        <div className="absolute left-1/2 top-4 bottom-[-40px] w-14 sm:w-16 -translate-x-1/2 bg-zinc-800/40 border border-zinc-700/50 rounded-t-2xl shadow-2xl backdrop-blur-xl">
          {/* Gradient glow inside the beam */}
          <div className="absolute inset-0 rounded-t-2xl bg-linear-to-b from-white/5 to-transparent pointer-events-none" />
          {/* Fretboard fadeout at bottom */}
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-zinc-950 via-zinc-950/80 to-transparent" />
        </div>

        {/* Left Pegs */}
        <div className="flex flex-col justify-around py-6 w-1/2 items-end pr-7 sm:pr-8 z-10">
          {strings
            .slice(0, leftCount)
            .map((note, i) => renderPeg(note, i, true))}
        </div>

        {/* Right Pegs */}
        {!isInline && (
          <div className="flex flex-col justify-around py-6 w-1/2 items-start pl-7 sm:pl-8 z-10 mt-6">
            {strings
              .slice(leftCount)
              .map((note, i) => renderPeg(note, leftCount + i, false))}
          </div>
        )}
      </div>
    </section>
  );
}
