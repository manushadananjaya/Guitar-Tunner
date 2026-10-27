'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  GUITAR_TYPES,
  REFERENCE_PITCH_MAX,
  REFERENCE_PITCH_MIN,
  REFERENCE_PITCH_PRESETS,
  tuningsForGuitar,
} from '@/lib/tuningPresets';
import { Minus, Plus } from 'lucide-react';
import { TUNER_TEXT, instrumentName, presetName, type Locale } from '@/lib/i18n/tuner';

interface TunerControlsProps {
  currentGuitarType: string;
  onGuitarTypeChange: (type: string) => void;
  currentTuningMode: string;
  onTuningChange: (mode: string) => void;
  className?: string;
  locale?: Locale;
  referencePitch?: number;
  onReferencePitchChange?: (a4: number) => void;
}

export const TunerControls: React.FC<TunerControlsProps> = ({
  currentGuitarType,
  onGuitarTypeChange,
  currentTuningMode,
  onTuningChange,
  className,
  locale = 'en',
  referencePitch = 440,
  onReferencePitchChange,
}) => {
  const t = TUNER_TEXT[locale];
  const presets = tuningsForGuitar(currentGuitarType);
  const supportsPresets = Object.keys(presets).length > 1;
  // A six-string preset left selected after switching instrument means
  // nothing here; the instrument is then in its standard tuning.
  const activeTuning = presets[currentTuningMode] ? currentTuningMode : 'standard';

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
              {Object.entries(presets).map(([key, preset]) => (
                <Button
                  key={key}
                  type="button"
                  variant="outline"
                  onClick={() => onTuningChange(key)}
                  className={cn(
                    'h-11 justify-start rounded-xl border-line bg-surface/60 px-3 text-xs font-medium',
                    activeTuning === key &&
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

      {onReferencePitchChange && (
        <div className="mt-5 border-t border-line pt-5 space-y-2">
          <p className="text-2xs font-semibold uppercase tracking-[0.18em] text-ink-subtle">
            {t.referencePitch}
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center rounded-xl border border-line bg-surface/60">
              <button
                type="button"
                onClick={() => onReferencePitchChange(referencePitch - 1)}
                disabled={referencePitch <= REFERENCE_PITCH_MIN}
                aria-label={t.lower}
                className="flex h-11 w-11 items-center justify-center text-ink-muted hover:text-brass disabled:opacity-40"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span
                className="min-w-28 text-center font-mono text-sm font-semibold text-ink"
                aria-live="polite"
              >
                {t.reference(referencePitch)}
              </span>
              <button
                type="button"
                onClick={() => onReferencePitchChange(referencePitch + 1)}
                disabled={referencePitch >= REFERENCE_PITCH_MAX}
                aria-label={t.higher}
                className="flex h-11 w-11 items-center justify-center text-ink-muted hover:text-brass disabled:opacity-40"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            {REFERENCE_PITCH_PRESETS.map((a4) => (
              <Button
                key={a4}
                type="button"
                variant="outline"
                onClick={() => onReferencePitchChange(a4)}
                aria-pressed={referencePitch === a4}
                className={cn(
                  'h-11 rounded-xl border-line bg-surface/60 px-3 font-mono text-xs',
                  referencePitch === a4 &&
                    'border-brass/60 bg-brass/10 text-brass-hover hover:bg-brass/15'
                )}
              >
                {a4}
              </Button>
            ))}
          </div>
          <p className="text-xs text-ink-subtle">{t.referenceHint}</p>
        </div>
      )}
    </div>
  );
};
