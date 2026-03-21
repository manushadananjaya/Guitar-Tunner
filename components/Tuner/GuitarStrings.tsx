'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Tuning, GuitarType } from '@/lib/tuningPresets';

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
      <div className="flex flex-row items-stretch justify-center gap-4 sm:gap-6 md:gap-8 h-64 sm:h-80 w-full max-w-2xl bg-zinc-900/50 rounded-xl border border-white/5 p-6 backdrop-blur-sm shadow-inner relative overflow-hidden">
        
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
                    "w-[1px] h-full transition-colors duration-300 relative",
                    isActive ? "bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" : "bg-zinc-600 group-hover:bg-zinc-400"
                  )}
                  style={{ 
                    width: `${thickness}px`,
                  }}
                  animate={isActive && isListening ? {
                    x: [0, -1, 1, -0.5, 0.5, 0],
                  } : {}}
                  transition={{
                    duration: 0.2,
                    repeat: isActive && isListening ? Infinity : 0,
                    repeatType: "loop",
                  }}
                />
              </div>

              {/* Top Peg (Visual) */}
              <div className={cn(
                "w-3 h-3 rounded-full border border-zinc-700 bg-zinc-900 z-10 transition-colors",
                isActive ? "border-cyan-500 bg-cyan-900" : "group-hover:border-zinc-500"
              )} />

              {/* Note Label (Bottom) */}
              <div className="mt-2 z-10">
                <div className={cn(
                  "flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full border text-sm sm:text-base font-bold transition-all duration-300",
                  isActive 
                    ? "bg-cyan-500/20 border-cyan-500 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.3)]" 
                    : "bg-zinc-800 border-zinc-700 text-zinc-400 group-hover:border-zinc-500 group-hover:text-zinc-200"
                )}>
                  {note}
                  {/* String Index helper (optional, small) */}
                  <span className="absolute -bottom-5 text-[10px] text-zinc-600 font-mono opacity-0 group-hover:opacity-100 transition-opacity">
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
