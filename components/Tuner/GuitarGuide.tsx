'use client';

import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface GuitarGuideProps {
  strings: string[];
  selectedStringIndex: number;
  cents: number;
  isListening: boolean;
  onSelectString: (index: number) => void;
}

export function GuitarGuide({
  strings,
  selectedStringIndex,
  cents,
  isListening,
  onSelectString,
}: GuitarGuideProps) {
  const centOffset = Math.max(-50, Math.min(50, cents));
  const selectedNote = strings[selectedStringIndex] ?? '—';
  const stringCount = strings.length;
  const leftCount = Math.ceil(stringCount / 2);
  const rightCount = Math.floor(stringCount / 2);

  const guidance =
    !isListening
      ? 'Start tuner and pluck the highlighted string.'
      : Math.abs(centOffset) <= 5
        ? 'In tune. Keep this string as is.'
        : centOffset < 0
          ? 'Pitch is low. Tighten the peg slowly.'
          : 'Pitch is high. Loosen the peg slowly.';

  const knobDirection = centOffset < 0 ? '↻ Tighten' : '↺ Loosen';

  return (
    <section className="w-full rounded-2xl border border-white/10 bg-zinc-950/40 p-4 backdrop-blur">
      <div className="mb-3 flex items-end justify-between">
        <div>
          <h3 className="text-sm font-semibold text-zinc-100">String Guide</h3>
          <p className="text-xs text-zinc-400">Select a string, then use the peg direction hint.</p>
        </div>
        <div className="rounded-lg border border-zinc-800 bg-zinc-900/70 px-3 py-1 text-xs text-zinc-300">
          String {selectedStringIndex + 1} · {selectedNote}
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.35fr_1fr]">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-3">
          <div className="relative mx-auto h-[560px] w-[280px] overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950">
            <Image
              src="/guitar-vertical.svg"
              alt="Vertical guitar layout"
              fill
              className="object-cover"
              priority
            />

            {strings.map((note, index) => {
              const ratio = stringCount === 1 ? 0.5 : index / (stringCount - 1);
              const xPercent = 40 + ratio * 20;
              const isSelected = index === selectedStringIndex;
              const rotation = isSelected ? (centOffset / 50) * 35 : 0;
              const isLeft = index < leftCount;
              const sideIndex = isLeft ? index : index - leftCount;
              const sideTotal = isLeft ? leftCount : rightCount;
              const sideRatio = sideTotal <= 1 ? 0.5 : sideIndex / (sideTotal - 1);
              const pegY = 34 + sideRatio * 46;
              const pegX = isLeft ? 23 : 77;
              const handleDirection = isLeft ? -1 : 1;

              return (
                <React.Fragment key={`${note}-${index}`}>
                  <button
                    type="button"
                    onClick={() => onSelectString(index)}
                    className={cn(
                      'absolute -translate-x-1/2 h-3.5 w-3.5 rounded-full border transition-colors',
                      isSelected ? 'border-cyan-300 bg-cyan-400/50' : 'border-zinc-500 bg-zinc-700/80'
                    )}
                    style={{
                      left: `${pegX}%`,
                      top: `${pegY}px`,
                      transform: `translateX(-50%) rotate(${rotation}deg)`,
                    }}
                    aria-label={`Select string ${index + 1} (${note})`}
                  />

                  <div
                    className={cn(
                      'absolute h-[3px] rounded transition-colors',
                      isSelected ? 'bg-cyan-300' : 'bg-zinc-500'
                    )}
                    style={{
                      top: `${pegY + 5}px`,
                      left: `${pegX}%`,
                      width: '14px',
                      transform: `translateX(-50%) rotate(${rotation * 0.6}deg)`,
                      transformOrigin: isLeft ? 'right center' : 'left center',
                      marginLeft: `${handleDirection * 7}px`,
                    }}
                  />

                  <div
                    className={cn('absolute h-[1px]', isSelected ? 'bg-cyan-300/70' : 'bg-zinc-500/60')}
                    style={{
                      top: `${pegY + 5}px`,
                      left: `${isLeft ? pegX + 1.5 : xPercent}%`,
                      right: `${isLeft ? 100 - xPercent : 100 - pegX + 1.5}%`,
                    }}
                  />

                  <button
                    type="button"
                    onClick={() => onSelectString(index)}
                    className={cn(
                      'absolute -translate-x-1/2 rounded px-1 text-[10px] font-semibold transition-colors',
                      isSelected ? 'bg-cyan-500/25 text-cyan-200' : 'bg-zinc-900/70 text-zinc-400'
                    )}
                    style={{ left: `${xPercent}%`, top: '110px' }}
                    aria-label={`String ${index + 1} note ${note}`}
                  >
                    {note}
                  </button>

                  <div
                    className={cn(
                      'absolute top-[128px] bottom-[72px] -translate-x-1/2 transition-colors',
                      isSelected ? 'bg-cyan-300/90' : 'bg-zinc-500/70'
                    )}
                    style={{ left: `${xPercent}%`, width: isSelected ? 2.5 : 1.3 }}
                  />
                </React.Fragment>
              );
            })}
          </div>
        </div>

        <div className="space-y-3 rounded-xl border border-zinc-800 bg-zinc-900/60 p-3">
          <div>
            <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">Adjustment</p>
            <p className="mt-1 text-sm font-semibold text-zinc-100">{guidance}</p>
          </div>

          <div className="rounded-lg border border-zinc-800 bg-zinc-950/70 p-3">
            <p className="text-xs text-zinc-400">Peg action</p>
            <p className={cn('mt-1 text-sm font-semibold', Math.abs(centOffset) <= 5 ? 'text-emerald-300' : 'text-cyan-300')}>
              {Math.abs(centOffset) <= 5 ? 'No turn needed' : knobDirection}
            </p>
            <p className="mt-1 text-xs text-zinc-500">Current offset: {centOffset.toFixed(0)} cents</p>
          </div>
        </div>
      </div>
    </section>
  );
}
