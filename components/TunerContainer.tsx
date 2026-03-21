'use client';

import React, { useState, useEffect } from 'react';
import { TunerGauge } from './TunerGauge';
import { NoteDisplay } from './NoteDisplay';
import { TuningModeSelector } from './TuningModeSelector';
import { StringSelector } from './StringSelector';
import { GuitarTypeSelector } from './GuitarTypeSelector';
import { ReferencePlayer } from './ReferencePlayer';
import { MicrophoneStatus } from './MicrophoneStatus';
import { GuitarVisualization } from './GuitarVisualization';
import { useAudioCapture } from '@/hooks/useAudioCapture';
import { usePitchDetector } from '@/hooks/usePitchDetector';
import { getTuningForGuitar, ACCURACY_MODES } from '@/lib/tuningPresets';
import { detectPlayingString } from '@/lib/noteMap';
import { Spinner } from '@/components/ui/spinner';

export function TunerContainer() {
  const [isClient, setIsClient] = useState(false);
  const [guitarType, setGuitarType] = useState('sixString');
  const [tuningMode, setTuningMode] = useState('standard');
  const [selectedStringIndex, setSelectedStringIndex] = useState(0);
  const [accuracyMode, setAccuracyMode] = useState<'beginner' | 'standard' | 'pro'>('standard');
  const [detectedStringIndex, setDetectedStringIndex] = useState<number | null>(null);

  // Mark as client after hydration
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Get current tuning
  const currentTuning = getTuningForGuitar(guitarType, tuningMode);
  const targetFrequency = currentTuning.frequencies[selectedStringIndex];

  // Audio capture
  const { state: audioState, requestMicrophone, stopAudioCapture, isSupported } = useAudioCapture(
    {
      onDataAvailable: (audioData) => {
        // Pass audio data to pitch detector
        updateAudioData(audioData);
      },
    }
  );

  // Pitch detection
  const [audioData, setAudioData] = useState<Float32Array | null>(null);

  const updateAudioData = (data: Float32Array) => {
    setAudioData(data);
  };

  const pitchDetection = usePitchDetector(audioData, 48000, {
    targetFrequency,
    accuracyCents: ACCURACY_MODES[accuracyMode].cents,
    smoothingFactor: 0.7,
    updateRate: 50,
  });

  // Auto-detect playing string
  useEffect(() => {
    if (pitchDetection.detected && pitchDetection.frequency > 0) {
      const stringDetection = detectPlayingString(
        pitchDetection.frequency,
        currentTuning.frequencies,
        50
      );

      if (stringDetection) {
        setDetectedStringIndex(stringDetection.stringIndex);
      } else {
        setDetectedStringIndex(null);
      }
    } else {
      setDetectedStringIndex(null);
    }
  }, [pitchDetection.frequency, pitchDetection.detected, currentTuning]);

  // Handle accuracy mode change
  const handleAccuracyModeChange = (mode: 'beginner' | 'standard' | 'pro') => {
    setAccuracyMode(mode);
  };

  // Handle tuning change
  const handleTuningChange = (tuning: string) => {
    setTuningMode(tuning);
    setDetectedStringIndex(null);
  };

  // Handle guitar type change
  const handleGuitarTypeChange = (type: string) => {
    setGuitarType(type);
    setSelectedStringIndex(0);
    setDetectedStringIndex(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 
          className="text-4xl font-bold mb-2"
          style={{
            background: 'linear-gradient(to right, #00d9ff, #b537f2, #0099ff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Guitar Tuner
        </h1>
        <p className="text-muted-foreground">Tune your guitar with precision</p>
      </div>

      {/* Microphone Status - only render after client hydration */}
      {isClient && (
        <MicrophoneStatus
          permission={audioState.permission}
          isActive={audioState.isActive}
          signalStrength={audioState.signalStrength}
          error={audioState.error}
          onRequestMicrophone={requestMicrophone}
          onStopMicrophone={stopAudioCapture}
          isSupported={isSupported}
        />
      )}

      {/* Main tuning display - only show when recording */}
      {audioState.isActive && (
        <div className="space-y-6 animate-smooth-fade">
          {/* Tuner gauge */}
          <div className="glass-card-dark w-full p-6 flex justify-center">
            <TunerGauge
              cents={pitchDetection.reading?.centOffset || 0}
              isInTune={pitchDetection.reading?.isInTune || false}
              centOffset={pitchDetection.reading?.centOffset || 0}
            />
          </div>

          {/* Guitar visualization with tuning knob */}
          <div className="glass-card-dark w-full p-6">
            <GuitarVisualization
              selectedStringIndex={selectedStringIndex}
              guitarType={guitarType}
              tuningMode={tuningMode}
              centOffset={pitchDetection.reading?.centOffset || 0}
              isInTune={pitchDetection.reading?.isInTune || false}
              detectedNote={detectedStringIndex !== null ? currentTuning.notes[selectedStringIndex] : null}
            />
          </div>

          {/* Note display */}
          {audioState.signalStrength > 5 ? (
            <NoteDisplay
              noteName={pitchDetection.reading?.note.name || '—'}
              frequency={pitchDetection.frequency}
              cents={pitchDetection.reading?.centOffset || 0}
              isInTune={pitchDetection.reading?.isInTune || false}
              isSharp={pitchDetection.reading?.isSharp || false}
              isFlat={pitchDetection.reading?.isFlat || false}
              detected={pitchDetection.detected}
            />
          ) : (
            <div className="glass-card-dark w-full p-8 flex items-center justify-center gap-2 text-muted-foreground">
              <Spinner className="w-4 h-4" />
              Waiting for signal...
            </div>
          )}

          {/* String selector */}
          <StringSelector
            strings={currentTuning.notes.map((note, i) => ({
              note,
              frequency: currentTuning.frequencies[i],
            }))}
            selectedStringIndex={selectedStringIndex}
            onStringSelect={setSelectedStringIndex}
            detectedStringIndex={detectedStringIndex}
          />

          {/* Reference player */}
          <div className="flex justify-center">
            <ReferencePlayer
              frequency={targetFrequency}
              noteName={currentTuning.notes[selectedStringIndex]}
              isDisabled={!audioState.isActive}
            />
          </div>

          {/* Accuracy mode */}
          <div className="glass-card-dark w-full p-6">
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Accuracy Mode
              </h3>
            </div>
            <div className="flex gap-2">
              {(Object.keys(ACCURACY_MODES) as Array<'beginner' | 'standard' | 'pro'>).map(
                (mode) => (
                  <button
                    key={mode}
                    onClick={() => handleAccuracyModeChange(mode)}
                    className="touch-button px-4 py-2 rounded-lg text-sm font-semibold transition-all border-0"
                    style={
                      accuracyMode === mode
                        ? {
                            background: 'linear-gradient(to right, #b537f2, #ff006e)',
                            color: 'white',
                          }
                        : {
                            backgroundColor: 'rgba(255, 255, 255, 0.05)',
                            borderColor: 'rgba(255, 255, 255, 0.1)',
                            borderWidth: '1px',
                            color: 'inherit',
                          }
                    }
                  >
                    {ACCURACY_MODES[mode].name}
                  </button>
                )
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {ACCURACY_MODES[accuracyMode].description}
            </p>
          </div>
        </div>
      )}

      {/* Settings section */}
      <div className="space-y-6">
        {/* Guitar type selector */}
        <GuitarTypeSelector currentType={guitarType} onTypeChange={handleGuitarTypeChange} />

        {/* Tuning mode selector */}
        <TuningModeSelector currentTuning={tuningMode} onTuningChange={handleTuningChange} />
      </div>

      {/* Footer info */}
      <div className="text-center text-xs text-muted-foreground">
        <p>Press microphone button to start. Use keyboard shortcuts 1-{currentTuning.notes.length} to select strings.</p>
      </div>
    </div>
  );
}
