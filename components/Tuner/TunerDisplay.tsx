'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Note } from '@/lib/noteMap';

interface TunerDisplayProps {
  note: Note;
  cents: number; // -50 to +50 (clamped visually)
  frequency: number;
  isInTune: boolean;
  isListening: boolean;
}

export const TunerDisplay: React.FC<TunerDisplayProps> = ({
  note,
  cents,
  frequency,
  isInTune,
  isListening,
}) => {
  // Clamp cents for display purposes to avoid needle going wild
  const clampedCents = Math.max(-50, Math.min(50, cents));
  const angle = (clampedCents / 50) * 45; // +/- 45 degrees swing

  // Dynamic status color
  let statusColor = "text-zinc-400"; // default/idle
  let glowColor = "rgba(161, 161, 170, 0)";
  
  if (isListening) {
    if (isInTune) {
      statusColor = "text-emerald-400";
      glowColor = "rgba(52, 211, 153, 0.6)";
    } else if (Math.abs(clampedCents) < 15) {
      statusColor = "text-yellow-400"; // close
      glowColor = "rgba(250, 204, 21, 0.4)";
    } else {
      statusColor = "text-rose-400"; // far
      glowColor = "rgba(251, 113, 133, 0.4)";
    }
  }

  return (
    <div className="flex flex-col items-center justify-center py-10 w-full max-w-lg mx-auto relative">
      {/* Main Note Display */}
      <div className="relative z-10 flex flex-col items-center mb-8">
        <h1 
          className={cn(
            "text-8xl sm:text-9xl font-black tracking-tighter transition-colors duration-200 select-none",
            statusColor
          )}
          style={{ textShadow: `0 0 30px ${glowColor}` }}
        >
           {isListening && frequency > 0 ? (
             <>
               {note.name?.charAt(0)}
               <span className="text-5xl sm:text-6xl align-top ml-1">
                 {note.name?.slice(1)}
               </span>
             </>
           ) : (
             <span className="opacity-20 text-white">-</span>
           )}
        </h1>
        
        {/* Frequency Display */}
        <div className="mt-2 flex flex-col items-center gap-1 min-h-[3rem]">
          {isListening && frequency > 0 && (
            <div className="flex items-center gap-3">
              <span className="text-zinc-500 font-mono text-xs uppercase tracking-widest">Frequency</span>
              <span className="text-zinc-200 font-mono text-xl">{frequency.toFixed(1)} <span className="text-zinc-600 text-sm">Hz</span></span>
            </div>
          )}
          {isListening && frequency > 0 && (
             <div className="flex items-center gap-3">
                <span className="text-zinc-500 font-mono text-xs uppercase tracking-widest">Offset</span>
                <span className={cn("font-mono text-sm", cents > 0 ? "text-rose-400" : cents < 0 ? "text-blue-400" : "text-emerald-400")}>
                  {cents > 0 ? "+" : ""}{cents.toFixed(0)} <span className="text-zinc-600 text-[10px]">cents</span>
                </span>
             </div>
          )}
        </div>
      </div>

      {/* SVG ARC Gauge */}
      <div className="relative w-full max-w-[320px] aspect-[2/1] overflow-hidden">
        {/* Arc Background */}
        <svg viewBox="0 0 200 100" className="w-full h-full">
           <defs>
             <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
               <stop offset="0%" stopColor="#ef4444" /> {/* red -50 */}
               <stop offset="35%" stopColor="#eab308" /> {/* yellow -15 */}
               <stop offset="45%" stopColor="#10b981" /> {/* green -5 */}
               <stop offset="55%" stopColor="#10b981" /> {/* green +5 */}
               <stop offset="65%" stopColor="#eab308" /> {/* yellow +15 */}
               <stop offset="100%" stopColor="#ef4444" /> {/* red +50 */}
             </linearGradient>
           </defs>
           
           {/* Tick marks */}
           <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="15" strokeLinecap="round" />
           <path d="M 100 20 L 100 35" stroke={isInTune ? "#10b981" : "rgba(255,255,255,0.3)"} strokeWidth="2" /> {/* Center */}
           <path d="M 60 30 L 63 42" stroke="rgba(255,255,255,0.1)" strokeWidth="1" /> {/* Left mark */}
           <path d="M 140 30 L 137 42" stroke="rgba(255,255,255,0.1)" strokeWidth="1" /> {/* Right mark */}

           {/* Gradient Arc (masked/active part could be cooler, but static for now) */}
           <path d="M 25 100 A 75 75 0 0 1 175 100" fill="none" stroke="url(#gaugeGradient)" strokeWidth="4" strokeLinecap="round" opacity={isListening ? 0.8 : 0.2} />

        </svg>

        {/* Needle */}
        <motion.div
            className="absolute bottom-0 left-1/2 w-1 h-full origin-bottom"
            initial={{ rotate: 0 }}
            animate={{ rotate: isListening ? angle : -90  }}
            transition={{ 
                type: "spring", 
                stiffness: 150, 
                damping: 15, // smooth movement
                mass: 0.5
            }}
            style={{ 
                height: "85%",
                x: "-50%", // center the div horizontally
            }}
        >
             {/* Needle styling */}
             <div className="w-full h-full bg-gradient-to-t from-transparent via-white to-white opacity-80 rounded-t-full shadow-[0_0_10px_rgba(255,255,255,0.5)]"></div>
             {/* Pivot point */}
             <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-white rounded-full shadow-lg z-20"></div>
        </motion.div>

        {/* Text indicators for Flat/Sharp */}
        <div className="absolute bottom-2 left-4 text-[10px] font-bold tracking-widest text-zinc-600">FLAT</div>
        <div className="absolute bottom-2 right-4 text-[10px] font-bold tracking-widest text-zinc-600">SHARP</div>
      </div>
    </div>
  );
};
