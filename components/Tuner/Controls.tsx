'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { GUITAR_TYPES, TUNING_PRESETS } from '@/lib/tuningPresets';
import { TUNER_TEXT, instrumentName, presetName, type Locale } from '@/lib/i18n/tuner';

interface TunerControlsProps {
  currentGuitarType: string;
  onGuitarTypeChange: (type: string) => void;
  currentTuningMode: string;
  onTuningChange: (mode: string) => void;
  className?: string;
  locale?: Locale;
}

export const TunerControls: React.FC<TunerControlsProps> = ({
  currentGuitarType,
  onGuitarTypeChange,
  currentTuningMode,
  onTuningChange,
  className,
  locale = 'en',
}) => {
  const t = TUNER_TEXT[locale];
  const supportsPresets = currentGuitarType === 'sixString';

  return (
    <div className={cn('w-full rounded-2xl border border-line bg-surface-sunken/40 p-4 backdrop-blur', className)}>
      <div className="grid gap-5 lg:grid-cols-2">
        <div className="space-y-2">
          <p className="text-2xs font-semibold uppercase tracking-[0.18em] text-ink-subtle">{t.instrument}</p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {Object.values(GUITAR_TYPES).map((type) => (
              <Button
                key={type.name}
                type="button"
                variant="outline"
                onClick={() => onGuitarTypeChange(type.name)}
                className={cn(
                  'h-auto min-h-11 flex-col items-start gap-0 rounded-xl border-line bg-surface/60 px-3 py-2 text-left',
                  currentGuitarType === type.name &&
                    'border-brass/60 bg-brass/10 text-brass-hover hover:bg-brass/15'
                )}
              >
                <span className="text-xs font-semibold leading-tight">
                  {instrumentName(type.name, type.displayName, locale)}
                </span>
                <span className="text-2xs text-ink-muted">{t.strings(type.strings)}</span>
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-2xs font-semibold uppercase tracking-[0.18em] text-ink-subtle">{t.tuningPreset}</p>
          {supportsPresets ? (
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {Object.entries(TUNING_PRESETS).map(([key, preset]) => (
                <Button
                  key={key}
                  type="button"
                  variant="outline"
                  onClick={() => onTuningChange(key)}
                  className={cn(
                    'h-11 justify-start rounded-xl border-line bg-surface/60 px-3 text-xs font-medium',
                    currentTuningMode === key &&
                      'border-brass/60 bg-brass/10 text-brass-hover hover:bg-brass/15'
                  )}
                >
                  {presetName(key, preset.name, locale)}
                </Button>
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-line bg-surface/60 px-3 py-3 text-sm text-ink">
              {t.standardOnly}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
