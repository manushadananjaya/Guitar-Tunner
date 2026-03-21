'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';

export type PermissionStatus = 'idle' | 'requesting' | 'granted' | 'denied' | 'error';

interface MicrophoneStatusProps {
  permission: PermissionStatus;
  isActive: boolean;
  signalStrength: number;
  error?: string | null;
  onRequestMicrophone: () => void;
  onStopMicrophone: () => void;
  isSupported: boolean;
}

export function MicrophoneStatus({
  permission,
  isActive,
  signalStrength,
  error,
  onRequestMicrophone,
  onStopMicrophone,
  isSupported,
}: MicrophoneStatusProps) {
  if (!isSupported) {
    return (
      <div className="glass-card-dark w-full p-6 text-center">
        <div className="text-red-500 font-semibold mb-2">❌ Browser Not Supported</div>
        <p className="text-sm text-muted-foreground mb-4">
          Web Audio API is required for pitch detection. Please use a modern browser like Chrome,
          Firefox, Safari, or Edge.
        </p>
      </div>
    );
  }

  if (permission === 'denied') {
    return (
      <div className="glass-card-dark w-full p-6 text-center">
        <div className="text-red-500 font-semibold mb-2">🔒 Microphone Permission Denied</div>
        <p className="text-sm text-muted-foreground mb-4">
          This app needs microphone access to tune your guitar. Please allow microphone permissions
          in your browser settings and refresh the page.
        </p>
      </div>
    );
  }

  if (permission === 'error') {
    return (
      <div className="glass-card-dark w-full p-6 text-center">
        <div className="text-red-500 font-semibold mb-2">⚠️ Microphone Error</div>
        <p className="text-sm text-muted-foreground mb-4">{error || 'An error occurred.'}</p>
        <Button
          onClick={onRequestMicrophone}
          className="text-black hover:shadow-lg"
          style={{
            background: 'linear-gradient(to right, #0099ff, #00d9ff)',
          }}
        >
          Try Again
        </Button>
      </div>
    );
  }

  if (!isActive) {
    return (
      <div className="glass-card-dark w-full p-6 text-center">
        <div className="text-muted-foreground font-semibold mb-2">🎤 Microphone Ready</div>
        <p className="text-sm text-muted-foreground mb-4">
          Click below to start tuning. Allow microphone access when prompted.
        </p>
        <Button
          onClick={onRequestMicrophone}
          disabled={permission === 'requesting'}
          className="touch-button h-12 px-8 gap-2 text-black"
          style={
            permission === 'requesting'
              ? undefined
              : {
                  background: 'linear-gradient(to right, #00ff00, #00d9ff)',
                  boxShadow: '0 0 12px rgba(0, 255, 0, 0.3)',
                }
          }
        >
          {permission === 'requesting' ? (
            <>
              <Spinner className="w-4 h-4" />
              Requesting Access...
            </>
          ) : (
            <>
              <span>🎤</span>
              Start Tuning
            </>
          )}
        </Button>
      </div>
    );
  }

  // Active and recording
  return (
    <div className="glass-card-dark w-full p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-lg">🎤</span>
          <div>
            <div className="text-sm font-semibold text-green-400">Recording</div>
            <div className="text-xs text-muted-foreground">Microphone is active</div>
          </div>
        </div>
        <Button
          onClick={onStopMicrophone}
          variant="outline"
          size="sm"
          className="touch-button text-xs border-white/10 hover:border-white/20"
        >
          Stop
        </Button>
      </div>

      {/* Signal strength indicator */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-semibold text-muted-foreground">Signal Strength</label>
          <span className="text-xs font-mono text-foreground">{signalStrength}%</span>
        </div>

        {/* Signal bar */}
        <div className="relative h-2 bg-black/40 rounded-full overflow-hidden border border-white/10">
          <div
            className={`h-full transition-all duration-100 rounded-full ${
              signalStrength < 20
                ? 'bg-red-500'
                : signalStrength < 50
                  ? 'bg-orange-500'
                  : 'bg-green-500'
            }`}
            style={{ width: `${signalStrength}%` }}
          />
        </div>

        {signalStrength === 0 && (
          <div className="mt-2 text-xs text-muted-foreground italic">
            No signal detected. Play a string closer to the microphone.
          </div>
        )}
      </div>

      {/* LED-like status dots */}
      <div className="flex gap-1 mt-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className={`h-2 w-2 rounded-full transition-all ${
              signalStrength > i * 20
                ? 'bg-green-500 shadow-lg shadow-green-500/50'
                : 'bg-muted'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
