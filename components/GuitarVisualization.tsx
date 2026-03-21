'use client';

import React from 'react';
import { TuningMode } from '@/lib/tuningPresets';
import { getNoteFrequency } from '@/lib/noteMap';

interface GuitarVisualizationProps {
  selectedStringIndex: number;
  guitarType: string;
  tuningMode: TuningMode;
  centOffset: number;
  isInTune: boolean;
  detectedNote: string | null;
}

export function GuitarVisualization({
  selectedStringIndex,
  guitarType,
  tuningMode,
  centOffset,
  isInTune,
  detectedNote,
}: GuitarVisualizationProps) {
  const guitarConfigs: Record<string, { strings: number; topPadding: number }> = {
    'standard-6': { strings: 6, topPadding: 20 },
    '7-string': { strings: 7, topPadding: 15 },
    '12-string': { strings: 12, topPadding: 10 },
    'bass': { strings: 4, topPadding: 30 },
    'ukulele': { strings: 4, topPadding: 35 },
  };

  const config = guitarConfigs[guitarType] || guitarConfigs['standard-6'];
  const stringSpacing = Math.max(40, (300 - 2 * config.topPadding) / (config.strings - 1));

  // Calculate tuning knob rotation based on cent offset
  const maxCents = 50;
  const rotation = (centOffset / maxCents) * 45; // Max 45 degrees each direction

  return (
    <div className="flex flex-col gap-6">
      {/* Guitar Head Visualization */}
      <div className="relative mx-auto w-full max-w-sm">
        {/* SVG Guitar Head */}
        <svg
          viewBox="0 0 200 350"
          className="w-full h-auto"
          style={{ maxWidth: '300px', margin: '0 auto' }}
        >
          {/* Guitar Head Shape */}
          <rect
            x="40"
            y="10"
            width="120"
            height="120"
            rx="8"
            fill="#1a1a2e"
            stroke="#00d9ff"
            strokeWidth="2"
          />

          {/* Tuning Pegs */}
          {Array.from({ length: config.strings }).map((_, i) => {
            const isLeft = i < config.strings / 2;
            const pegIndex = isLeft ? i : i - Math.ceil(config.strings / 2);
            const x = isLeft ? 50 : 150;
            const y = 30 + pegIndex * 25;
            const isSelected = i === selectedStringIndex;

            return (
              <g key={i}>
                {/* Peg base */}
                <circle
                  cx={x}
                  cy={y}
                  r="6"
                  fill={isSelected ? '#00ff00' : '#2d3448'}
                  stroke={isSelected ? '#00d9ff' : '#5a6b8a'}
                  strokeWidth="1"
                />
                {/* Peg handle */}
                <rect
                  x={isLeft ? x - 8 : x + 2}
                  y={y - 3}
                  width="12"
                  height="6"
                  fill={isSelected ? '#00ff00' : '#5a6b8a'}
                  rx="2"
                  style={{
                    transform: `rotate(${isSelected ? rotation : 0}deg)`,
                    transformOrigin: `${isLeft ? x - 2 : x + 8}px ${y}px`,
                    transition: isSelected ? 'transform 0.1s ease-out' : 'none',
                  }}
                />
              </g>
            );
          })}

          {/* Nut */}
          <rect
            x="70"
            y="130"
            width="60"
            height="4"
            fill="#b537f2"
            stroke="#00d9ff"
            strokeWidth="1"
          />

          {/* Fretboard */}
          <rect
            x="50"
            y="135"
            width="100"
            height="150"
            fill="#0a0e27"
            stroke="#5a6b8a"
            strokeWidth="1"
          />

          {/* Strings */}
          {Array.from({ length: config.strings }).map((_, i) => {
            const stringX = 60 + (i / (config.strings - 1)) * 80;
            const isSelected = i === selectedStringIndex;
            const baseColor = isSelected ? '#00ff00' : '#9095a8';
            const baseOpacity = isSelected ? 1 : 0.6;

            return (
              <line
                key={`string-${i}`}
                x1={stringX}
                y1="135"
                x2={stringX}
                y2="285"
                stroke={baseColor}
                strokeWidth={isSelected ? 2.5 : 1.5}
                opacity={baseOpacity}
                style={{
                  filter: isSelected ? 'drop-shadow(0 0 4px #00ff00)' : 'none',
                  transition: 'all 0.2s ease-out',
                }}
              />
            );
          })}

          {/* Frets */}
          {Array.from({ length: 4 }).map((_, i) => {
            const y = 165 + i * 30;
            return (
              <line
                key={`fret-${i}`}
                x1="50"
                y1={y}
                x2="150"
                y2={y}
                stroke="#5a6b8a"
                strokeWidth="1"
                opacity="0.5"
              />
            );
          })}
        </svg>
      </div>

      {/* String Information */}
      {selectedStringIndex < config.strings && (
        <div className="text-center">
          <div className="text-sm text-muted-foreground mb-2">Selected String</div>
          <div className="text-lg font-bold text-neon-cyan">
            String {selectedStringIndex + 1}
          </div>
          {detectedNote && (
            <div className="text-sm text-neon-green mt-1">{detectedNote} (Detected)</div>
          )}
          <div className={`text-sm mt-2 font-semibold ${
            isInTune ? 'text-neon-green' : 'text-neon-purple'
          }`}>
            {isInTune ? '✓ In Tune' : `${Math.abs(centOffset).toFixed(1)}¢ ${centOffset > 0 ? 'Sharp' : 'Flat'}`}
          </div>
        </div>
      )}

      {/* Tuning Knob Visualization */}
      <div className="flex justify-center items-center gap-8">
        {/* Flat indicator */}
        <div className="text-center">
          <div className="text-xs text-muted-foreground mb-1">Flat</div>
          <div className="text-neon-pink text-lg font-bold">♭</div>
        </div>

        {/* Visual Tuning Knob */}
        <div className="relative w-24 h-24">
          {/* Outer ring */}
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full"
            style={{
              filter: isInTune ? 'drop-shadow(0 0 8px #00ff00)' : 'drop-shadow(0 0 4px #b537f2)',
            }}
          >
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="48"
              fill="none"
              stroke="#2d3448"
              strokeWidth="2"
            />

            {/* Tuning range arc (±50 cents) */}
            {Array.from({ length: 9 }).map((_, i) => {
              const angle = (i - 4) * 10; // -40 to +40 degrees
              const radian = (angle * Math.PI) / 180;
              const x1 = 50 + 45 * Math.cos(radian);
              const y1 = 50 + 45 * Math.sin(radian);
              const x2 = 50 + 48 * Math.cos(radian);
              const y2 = 50 + 48 * Math.sin(radian);
              return (
                <line
                  key={`tick-${i}`}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={Math.abs(i - 4) <= 1 ? '#00ff00' : '#5a6b8a'}
                  strokeWidth={Math.abs(i - 4) <= 1 ? 2 : 1}
                />
              );
            })}

            {/* Center circle */}
            <circle cx="50" cy="50" r="6" fill="#00d9ff" stroke="#b537f2" strokeWidth="1" />

            {/* Needle indicator */}
            <g
              style={{
                transform: `rotate(${rotation}deg)`,
                transformOrigin: '50px 50px',
                transition: 'transform 0.1s ease-out',
              }}
            >
              <line
                x1="50"
                y1="50"
                x2="50"
                y2="15"
                stroke={isInTune ? '#00ff00' : '#b537f2'}
                strokeWidth="2"
                strokeLinecap="round"
              />
            </g>
          </svg>
        </div>

        {/* Sharp indicator */}
        <div className="text-center">
          <div className="text-xs text-muted-foreground mb-1">Sharp</div>
          <div className="text-neon-pink text-lg font-bold">♯</div>
        </div>
      </div>
    </div>
  );
}
