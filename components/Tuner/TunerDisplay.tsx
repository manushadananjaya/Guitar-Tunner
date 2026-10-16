'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Note } from '@/lib/noteMap';
import { TUNER_TEXT, noteParts, type Locale } from '@/lib/i18n/tuner';

interface TunerDisplayProps {
  note: Note;
  cents: number; // -50 to +50 (clamped visually)
  frequency: number;
  isInTune: boolean;
  isListening: boolean;
  /** Note name of the selected string, e.g. "E2". Shown while idle so the
   *  panel states the goal instead of sitting empty. */
  targetNote?: string;
  /** Target frequency in Hz for the selected string. */
  targetFrequency?: number;
  locale?: Locale;
  /** Shown beside the target when it is not the standard 440. */
  referencePitch?: number;
}

export const TunerDisplay: React.FC<TunerDisplayProps> = ({
  note,
  cents,
  frequency,
  isInTune,
  isListening,
  targetNote,
  targetFrequency,
  locale = 'en',
  referencePitch = 440,
}) => {
  const t = TUNER_TEXT[locale];
  const live = noteParts(note.name ?? '', locale);
  // Clamp cents for display purposes to avoid needle going wild
  const clampedCents = Math.max(-50, Math.min(50, cents));
  const angle = (clampedCents / 50) * 45; // +/- 45 degrees swing

  // Dynamic status color
  let statusColor = "text-ink-muted"; // default/idle
  let glowColor = "rgba(161, 161, 170, 0)";
  
  // Correctness states keep their own distinct hues — these communicate
  // whether the note is right, so they are not subordinated to the palette.
  if (isListening) {
    if (isInTune) {
      statusColor = "text-in-tune";
      glowColor = "color-mix(in srgb, var(--in-tune) 55%, transparent)";
    } else if (Math.abs(clampedCents) < 15) {
      statusColor = "text-near"; // close
      glowColor = "color-mix(in srgb, var(--near) 45%, transparent)";
    } else {
      statusColor = "text-off"; // far
      glowColor = "color-mix(in srgb, var(--off) 45%, transparent)";
    }
  }

  return (
    <div className="flex flex-col items-center justify-center py-4 sm:py-6 w-full max-w-lg mx-auto relative">
      {/* Reading. Not a heading — this is a live value, and using <h1> here
          made the homepage's only H1 an em-dash. */}
      <div className="relative z-10 flex flex-col items-center mb-5">
        <div
          role="status"
          aria-live="polite"
          aria-atomic="true"
          aria-label={
            isListening && frequency > 0
              ? `${live.base}${live.accidental}, ${cents > 0 ? "+" : ""}${cents.toFixed(0)} cents`
              : targetNote
                ? t.readyToTune(targetNote)
                : t.idle
          }
          className={cn(
            "font-black tracking-tighter transition-colors duration-200 select-none leading-none",
            isListening && frequency > 0
              ? "text-7xl sm:text-8xl"
              : "text-5xl sm:text-6xl",
            statusColor,
          )}
          style={
            isListening && frequency > 0
              ? { textShadow: `0 0 30px ${glowColor}` }
              : undefined
          }
        >
          {isListening && frequency > 0 ? (
            <>
              {live.base}
              <span className="text-4xl sm:text-5xl align-top ml-1">
                {live.accidental}
              </span>
            </>
          ) : (
            // Idle: state the goal rather than showing an empty placeholder.
            <span className="text-ink-subtle">{targetNote ?? "—"}</span>
          )}
        </div>

        <div className="mt-2 flex flex-col items-center gap-1 min-h-[2.5rem] justify-center">
          {isListening && frequency > 0 ? (
            <>
              <div className="flex items-center gap-3">
                <span className="text-ink-subtle font-mono text-xs uppercase tracking-widest">
                  {t.frequency}
                </span>
                <span className="text-ink font-mono text-xl">
                  {frequency.toFixed(1)}{" "}
                  <span className="text-ink-subtle text-sm">Hz</span>
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-ink-subtle font-mono text-xs uppercase tracking-widest">
                  {t.offset}
                </span>
                <span
                  className={cn(
                    "font-mono text-sm",
                    cents > 0
                      ? "text-off"
                      : cents < 0
                        ? "text-flat"
                        : "text-in-tune",
                  )}
                >
                  {cents > 0 ? "+" : ""}
                  {cents.toFixed(0)}{" "}
                  <span className="text-ink-subtle text-2xs">cents</span>
                </span>
              </div>
            </>
          ) : (
            targetFrequency !== undefined &&
            targetFrequency > 0 && (
              <p className="text-ink-subtle font-mono text-xs uppercase tracking-widest">
                {t.target} {targetFrequency.toFixed(2)} Hz
                {referencePitch !== 440 && (
                  <span className="text-brass"> · {t.reference(referencePitch)}</span>
                )}
              </p>
            )
          )}
        </div>
      </div>

      {/* SVG ARC Gauge */}
      <div className="relative w-full max-w-[300px] sm:max-w-[380px] aspect-[2/1] overflow-hidden">
        {/* Arc Background */}
        <svg viewBox="0 0 200 100" className="w-full h-full">
           <defs>
             {/* Driven by the same state tokens as the readout, so the arc
                 and the note colour always agree and both follow the theme. */}
             <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
               <stop offset="0%" stopColor="var(--off)" /> {/* -50 */}
               <stop offset="35%" stopColor="var(--near)" /> {/* -15 */}
               <stop offset="45%" stopColor="var(--in-tune)" /> {/* -5 */}
               <stop offset="55%" stopColor="var(--in-tune)" /> {/* +5 */}
               <stop offset="65%" stopColor="var(--near)" /> {/* +15 */}
               <stop offset="100%" stopColor="var(--off)" /> {/* +50 */}
             </linearGradient>
           </defs>
           
           {/* Track and ticks use currentColor so they follow the theme —
               hardcoded white strokes disappeared entirely on a light ground. */}
           <g className="text-line">
             <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="currentColor" strokeWidth="15" strokeLinecap="round" opacity="0.5" />
           </g>
           <path
             d="M 100 20 L 100 35"
             className={isInTune ? "text-in-tune" : "text-ink-subtle"}
             stroke="currentColor"
             strokeWidth="2"
           /> {/* Center */}
           <g className="text-ink-subtle" opacity="0.6">
             <path d="M 60 30 L 63 42" stroke="currentColor" strokeWidth="1" />
             <path d="M 140 30 L 137 42" stroke="currentColor" strokeWidth="1" />
           </g>

           {/* Gradient arc. Kept clearly visible when idle so the gauge reads
               as a control rather than a smudge. */}
           <path d="M 25 100 A 75 75 0 0 1 175 100" fill="none" stroke="url(#gaugeGradient)" strokeWidth="4" strokeLinecap="round" opacity={isListening ? 0.95 : 0.45} />

        </svg>

        {/* Needle */}
        <motion.div
            className="absolute bottom-0 left-1/2 w-1 h-full origin-bottom"
            initial={{ rotate: 0 }}
            // Idle rests at centre. It used to swing to -90°, leaving the
            // needle jutting out horizontally as if the gauge were broken.
            animate={{ rotate: isListening ? angle : 0 }}
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
             <div className="w-full h-full bg-gradient-to-t from-transparent via-ink to-ink opacity-90 rounded-t-full"></div>
             {/* Pivot point */}
             <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-ink rounded-full shadow-lg z-20"></div>
        </motion.div>

        {/* Text indicators for Flat/Sharp */}
        <div className="absolute bottom-2 left-4 text-2xs font-bold tracking-widest text-ink-subtle">{t.flat}</div>
        <div className="absolute bottom-2 right-4 text-2xs font-bold tracking-widest text-ink-subtle">{t.sharp}</div>
      </div>
    </div>
  );
};
