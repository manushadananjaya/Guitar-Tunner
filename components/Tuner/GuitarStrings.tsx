"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Tuning, GuitarType } from "@/lib/tuningPresets";

interface GuitarStringsProps {
  currentTuning: Tuning;
  selectedStringIndex: number | null;
  detectedStringIndex: number | null;
  onSelectString: (index: number) => void;
  isListening: boolean;
}

export const GuitarStrings: React.FC<GuitarStringsProps> = ({
  currentTuning,
  selectedStringIndex,
  detectedStringIndex,
  onSelectString,
  isListening,
}) => {
  return (
    <div className="relative flex justify-center gap-2 sm:gap-4 md:gap-6 py-8 px-4 w-full select-none">
      {/* Strings container */}
      <div className="flex flex-row items-stretch justify-center gap-4 sm:gap-6 md:gap-8 h-64 sm:h-80 w-full max-w-2xl bg-transparent p-6 relative overflow-visible">
        {/* Fret lines background decoration */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-full h-px bg-white top-[15%] left-0"
              style={{ top: `${15 + i * 15}%` }}
            />
          ))}
        </div>

        {currentTuning.notes.map((note, index) => {
          const isSelected = selectedStringIndex === index;
          const isDetected = detectedStringIndex === index;
          const isActive = isSelected || isDetected;

          // String thickness logic (thicker for lower notes)
          const thickness = 1 + (currentTuning.notes.length - index) * 0.5;

          return (
            <button
              key={index}
              onClick={() => onSelectString(index)}
              className="group relative flex flex-col items-center justify-between h-full w-8 sm:w-10 focus:outline-none"
              aria-label={`Select string ${note}`}
            >
              {/* String line */}
              <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 flex items-center justify-center h-full w-2">
                <motion.div
                  className={cn(
                    "w-px h-full transition-colors duration-300 relative",
                    isActive
                      ? "bg-brass-hover shadow-[0_0_8px_rgba(34,211,238,0.8)]"
                      : "bg-line-strong group-hover:bg-ink-subtle",
                  )}
                  style={{
                    width: `${thickness}px`,
                  }}
                  animate={
                    isActive && isListening
                      ? {
                          x: [0, -1, 1, -0.5, 0.5, 0],
                        }
                      : {}
                  }
                  transition={{
                    duration: 0.2,
                    repeat: isActive && isListening ? Infinity : 0,
                    repeatType: "loop",
                  }}
                />
              </div>

              {/* Top Peg (Visual) */}
              <div
                className={cn(
                  "w-3 h-3 rounded-full border border-line-strong bg-surface z-10 transition-colors",
                  isActive
                    ? "border-brass bg-brass/20"
                    : "group-hover:border-line-strong",
                )}
              />

              {/* Note Label (Bottom) */}
              <div className="mt-2 z-10">
                <div
                  className={cn(
                    "flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full border text-sm sm:text-base font-bold transition-all duration-300",
                    isActive
                      ? "bg-brass/20 border-brass text-brass shadow-[0_0_15px_rgba(34,211,238,0.3)]"
                      : "bg-surface-raised border-line-strong text-ink-muted group-hover:border-line-strong group-hover:text-ink",
                  )}
                >
                  {note}
                  {/* String Index helper (optional, small) */}
                  <span className="absolute -bottom-5 text-2xs text-ink-subtle font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                    {index + 1}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
