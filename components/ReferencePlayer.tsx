'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { useAudioTone } from '@/hooks/useAudioTone';

interface ReferencePlayerProps {
  frequency: number;
  noteName: string;
  isDisabled?: boolean;
}

export function ReferencePlayer({
  frequency,
  noteName,
  isDisabled = false,
}: ReferencePlayerProps) {
  const { playTone, isPlaying } = useAudioTone();

  const handlePlayTone = () => {
    if (frequency > 0 && !isPlaying) {
      playTone(frequency, {
        volume: 0.25,
        duration: 1500,
        fadeInTime: 100,
        fadeOutTime: 300,
      });
    }
  };

  return (
    <Button
      onClick={handlePlayTone}
      disabled={isDisabled || isPlaying || frequency <= 0}
      className="touch-button h-12 px-6 transition-all gap-2 text-black"
      style={{
        background: isPlaying
          ? 'linear-gradient(to right, #00d9ff, #0099ff)'
          : 'linear-gradient(to right, #00ff00, #00d9ff)',
        boxShadow: !isPlaying ? '0 0 12px rgba(0, 255, 0, 0.3)' : undefined,
      }}
    >
      {isPlaying ? (
        <>
          <Spinner className="w-4 h-4" />
          Playing {noteName}
        </>
      ) : (
        <>
          <span>🔊</span>
          Play {noteName}
        </>
      )}
    </Button>
  );
}
