"use client";

import { cn } from "@/lib/utils";
import { TunerGauge } from "@/components/TunerGauge";
import { formatCents, formatFrequency } from "@/lib/noteMap";

interface PitchReadoutProps {
  noteName: string;
  octave: number;
  frequency: number;
  cents: number;
  inTune: boolean;
  detected: boolean;
  /** Optional label for what the cents are measured against. */
  referenceLabel?: string;
}

export function PitchReadout({
  noteName,
  octave,
  frequency,
  cents,
  inTune,
  detected,
  referenceLabel,
}: PitchReadoutProps) {
  const live = detected && frequency > 0;
  const direction = !live
    ? ""
    : inTune
      ? "In tune"
      : cents < 0
        ? "Flat — sing higher"
        : "Sharp — sing lower";

  return (
    <div className="w-full rounded-3xl border border-line bg-surface-sunken/30 p-5 sm:p-6 backdrop-blur-md">
      <div className="grid gap-6 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] sm:items-center">
        {/* Note + numbers */}
        <div className="text-center sm:text-left">
          <div
            className={cn(
              "font-bold leading-none tracking-tight transition-colors",
              "text-[5.5rem] sm:text-[6.5rem]",
              !live
                ? "text-ink-subtle"
                : inTune
                  ? "text-in-tune"
                  : "text-brass",
            )}
          >
            {live ? noteName : "—"}
            {live && (
              <span className="align-top text-2xl font-semibold text-ink-muted">
                {octave}
              </span>
            )}
          </div>

          <div className="mt-3 flex items-center justify-center gap-5 sm:justify-start">
            <div>
              <p className="text-2xs font-semibold uppercase tracking-[0.16em] text-ink-subtle">
                Frequency
              </p>
              <p className="font-mono text-lg text-ink">
                {live ? formatFrequency(frequency, 1) : "— Hz"}
              </p>
            </div>
            <div>
              <p className="text-2xs font-semibold uppercase tracking-[0.16em] text-ink-subtle">
                Offset
              </p>
              <p
                className={cn(
                  "font-mono text-lg",
                  !live
                    ? "text-ink-subtle"
                    : inTune
                      ? "text-in-tune"
                      : "text-brass",
                )}
              >
                {live ? formatCents(cents, 0) : "—"}
              </p>
            </div>
          </div>

          <p
            className={cn(
              "mt-3 text-sm font-semibold",
              !live
                ? "text-ink-subtle"
                : inTune
                  ? "text-in-tune"
                  : "text-brass",
            )}
          >
            {live ? direction : "Sing or hum a steady note"}
          </p>
          {referenceLabel && (
            <p className="mt-0.5 text-2xs text-ink-subtle">{referenceLabel}</p>
          )}
        </div>

        {/* Needle */}
        <div className="flex justify-center">
          <TunerGauge
            cents={live ? cents : 0}
            isInTune={live && inTune}
            centOffset={live ? cents : 0}
          />
        </div>
      </div>
    </div>
  );
}
