'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { GUITAR_TYPES } from '@/lib/tuningPresets';

interface GuitarTypeSelectorProps {
  currentType: string;
  onTypeChange: (type: string) => void;
}

const GUITAR_ICONS: Record<string, string> = {
  sixString: '🎸',
  sevenString: '🎸+',
  twelveString: '🎸×2',
  bass: '🎸B',
  ukulele: '🌺',
};

export function GuitarTypeSelector({
  currentType,
  onTypeChange,
}: GuitarTypeSelectorProps) {
  const guitarTypes = Object.values(GUITAR_TYPES);

  return (
    <div className="glass-card-dark w-full p-6">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
          Instrument
        </h3>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
        {guitarTypes.map((type) => (
          <Button
            key={type.name}
            onClick={() => onTypeChange(type.name)}
            variant={currentType === type.name ? 'default' : 'outline'}
            className="touch-button text-xs h-12 flex flex-col items-center gap-1 transition-all border-0"
            style={
              currentType === type.name
                ? {
                    background: 'linear-gradient(to right, #b537f2, #ff006e)',
                    color: 'white',
                  }
                : {
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    borderWidth: '1px',
                  }
            }
          >
            <span className="text-lg">
              {GUITAR_ICONS[type.name] || '🎸'}
            </span>
            <span className="text-xs font-semibold">{type.strings}str</span>
          </Button>
        ))}
      </div>
    </div>
  );
}
