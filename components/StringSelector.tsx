'use client';

import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface StringSelectorProps {
  strings: Array<{ note: string; frequency: number }>;
  selectedStringIndex: number;
  onStringSelect: (index: number) => void;
  detectedStringIndex?: number | null;
  isPlaying?: boolean;
}

export function StringSelector({
  strings,
  selectedStringIndex,
  onStringSelect,
  detectedStringIndex,
  isPlaying = false,
}: StringSelectorProps) {
  // Keyboard shortcuts: 1-6 keys
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const key = parseInt(e.key, 10);
      if (key >= 1 && key <= strings.length) {
        e.preventDefault();
        onStringSelect(key - 1);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [strings.length, onStringSelect]);

  return (
    <div className="glass-card-dark w-full p-6">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
          Select String
        </h3>
      </div>

      <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
        {strings.map((string, index) => {
          const isSelected = selectedStringIndex === index;
          const isDetected = detectedStringIndex === index;

          return (
            <div key={index} className="relative">
              <Button
                onClick={() => onStringSelect(index)}
                variant={isSelected ? 'default' : 'outline'}
                className={`touch-button w-full h-12 sm:h-14 text-sm sm:text-base font-bold transition-all relative text-black border-0 ${
                  isDetected && !isSelected ? 'bg-black/40' : ''
                }`}
                style={
                  isSelected
                    ? {
                        background: 'linear-gradient(to right, #00d9ff, #0099ff)',
                      }
                    : isDetected
                      ? {
                          borderColor: '#00ff00',
                          borderWidth: '1px',
                        }
                      : undefined
                }
                aria-label={`String ${index + 1}: ${string.note}`}
              >
                <span className="flex flex-col items-center gap-0.5">
                  <span className="text-xs opacity-70">STR</span>
                  <span className="font-mono text-base">{index + 1}</span>
                </span>
              </Button>

              {/* String note label below */}
              <div className="text-center mt-2">
                <div className="text-sm font-bold" style={{ color: '#00d9ff' }}>
                  {string.note}
                </div>
                <div className="text-xs text-muted-foreground">{string.frequency.toFixed(1)} Hz</div>
              </div>

              {/* Detected indicator */}
              {isDetected && (
                <div className="absolute -top-2 -right-2">
                  <div className="animate-pulse">
                    <div className="w-3 h-3 rounded-full" style={{ background: '#00ff00' }}></div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-4 text-xs text-muted-foreground text-center">
        Press <span className="font-mono font-bold">1-{strings.length}</span> on keyboard to switch strings
      </div>
    </div>
  );
}
