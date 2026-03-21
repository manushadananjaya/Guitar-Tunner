'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { getAvailableTunings } from '@/lib/tuningPresets';

interface TuningModeSelectorProps {
  currentTuning: string;
  onTuningChange: (tuning: string) => void;
}

const TUNING_DISPLAY_NAMES: Record<string, string> = {
  standard: 'Standard',
  dropD: 'Drop D',
  halfStepDown: 'Half Step Down',
  fullStepDown: 'Full Step Down',
  openG: 'Open G',
  openD: 'Open D',
  openA: 'Open A',
};

export function TuningModeSelector({
  currentTuning,
  onTuningChange,
}: TuningModeSelectorProps) {
  const tunings = getAvailableTunings();

  return (
    <div className="glass-card-dark w-full p-6">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
          Tuning Mode
        </h3>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:flex lg:flex-wrap">
        {tunings.map((tuning) => (
          <Button
            key={tuning}
            onClick={() => onTuningChange(tuning)}
            variant={currentTuning === tuning ? 'default' : 'outline'}
            className="touch-button text-xs sm:text-sm h-10 transition-all border-0"
            style={
              currentTuning === tuning
                ? {
                    background: 'linear-gradient(to right, #b537f2, #0099ff)',
                    color: 'white',
                  }
                : {
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    borderWidth: '1px',
                  }
            }
          >
            {TUNING_DISPLAY_NAMES[tuning] || tuning}
          </Button>
        ))}
      </div>
    </div>
  );
}
