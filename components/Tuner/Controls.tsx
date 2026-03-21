'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { GUITAR_TYPES, TUNING_PRESETS } from '@/lib/tuningPresets';

interface TunerControlsProps {
  currentGuitarType: string;
  onGuitarTypeChange: (type: string) => void;
  currentTuningMode: string;
  onTuningChange: (mode: string) => void;
  className?: string;
}

export const TunerControls: React.FC<TunerControlsProps> = ({
  currentGuitarType,
  onGuitarTypeChange,
  currentTuningMode,
  onTuningChange,
  className,
}) => {
  const supportsPresets = currentGuitarType === 'sixString';

  return (
    <div className={cn('w-full rounded-2xl border border-white/10 bg-zinc-950/40 p-4 backdrop-blur', className)}>
      <div className="grid gap-5 lg:grid-cols-2">
        <div className="space-y-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500">Instrument</p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {Object.values(GUITAR_TYPES).map((type) => (
              <Button
                key={type.name}
                type="button"
                variant="outline"
                onClick={() => onGuitarTypeChange(type.name)}
                className={cn(
                  'h-auto min-h-11 flex-col items-start gap-0 rounded-xl border-zinc-800 bg-zinc-900/60 px-3 py-2 text-left',
                  currentGuitarType === type.name &&
                    'border-cyan-500/60 bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/15'
                )}
              >
                <span className="text-xs font-semibold leading-tight">{type.displayName}</span>
                <span className="text-[11px] text-zinc-400">{type.strings} strings</span>
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500">Tuning Preset</p>
          {supportsPresets ? (
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {Object.entries(TUNING_PRESETS).map(([key, preset]) => (
                <Button
                  key={key}
                  type="button"
                  variant="outline"
                  onClick={() => onTuningChange(key)}
                  className={cn(
                    'h-11 justify-start rounded-xl border-zinc-800 bg-zinc-900/60 px-3 text-xs font-medium',
                    currentTuningMode === key &&
                      'border-cyan-500/60 bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/15'
                  )}
                >
                  {preset.name}
                </Button>
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 px-3 py-3 text-sm text-zinc-300">
              This instrument currently uses standard tuning.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
