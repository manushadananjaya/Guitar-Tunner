'use client';

import React from 'react';
import { formatFrequency, formatCents } from '@/lib/noteMap';

interface NoteDisplayProps {
  noteName: string;
  frequency: number;
  cents: number;
  isInTune: boolean;
  isSharp?: boolean;
  isFlat?: boolean;
  detected: boolean;
}

export function NoteDisplay({
  noteName,
  frequency,
  cents,
  isInTune,
  isSharp = false,
  isFlat = false,
  detected,
}: NoteDisplayProps) {
  const getStatusColor = () => {
    if (!detected) return 'text-muted-foreground';
    if (isInTune) return 'text-green-400';
    if (isSharp) return 'text-orange-400';
    if (isFlat) return 'text-orange-400';
    return 'text-red-500';
  };

  const getStatusText = () => {
    if (!detected) return '—';
    if (isInTune) return 'IN TUNE';
    if (isSharp) return 'SHARP';
    if (isFlat) return 'FLAT';
    return 'OUT OF TUNE';
  };

  return (
    <div className="glass-card-dark w-full p-8 flex flex-col items-center gap-6">
      {/* Main note display */}
      <div className="text-center">
        <div className={`text-7xl font-bold transition-all duration-200 ${getStatusColor()}`}>
          {noteName}
        </div>
      </div>

      {/* Frequency display */}
      <div className="text-center">
        <div className="text-sm text-muted-foreground mb-1">FREQUENCY</div>
        <div className="text-2xl font-mono text-foreground">{formatFrequency(frequency, 1)}</div>
      </div>

      {/* Cent offset display */}
      <div className="text-center">
        <div className="text-sm text-muted-foreground mb-1">OFFSET</div>
        <div
          className={`text-lg font-mono font-semibold transition-colors duration-200 ${
            isInTune ? 'text-green-400' : 'text-orange-400'
          }`}
        >
          {formatCents(cents, 1)}
        </div>
      </div>

      {/* Status indicator */}
      <div className="text-center">
        <div
          className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 ${
            isInTune
              ? 'bg-green-500/20 text-green-400 animate-pulse'
              : 'bg-orange-500/20 text-orange-400'
          }`}
        >
          {getStatusText()}
        </div>
      </div>

      {/* Signal indicator */}
      {!detected && (
        <div className="text-xs text-muted-foreground italic">
          Play a string to begin tuning
        </div>
      )}
    </div>
  );
}
