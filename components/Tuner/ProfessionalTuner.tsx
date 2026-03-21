'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { TunerDisplay } from './TunerDisplay';
import { GuitarStrings } from './GuitarStrings';
import { TunerControls } from './Controls';
import { GuitarGuide } from './GuitarGuide';
import { useAudioCapture } from '@/hooks/useAudioCapture';
import { usePitchDetector } from '@/hooks/usePitchDetector';
import { getTuningForGuitar } from '@/lib/tuningPresets';
import { detectPlayingString, frequencyToNote, centsFromFrequency, Note } from '@/lib/noteMap';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Settings2 } from 'lucide-react';

export function ProfessionalTuner() {
  const [isMount, setIsMount] = useState(false);
  const [tuningMode, setTuningMode] = useState('standard');
  const [guitarType, setGuitarType] = useState('sixString'); // Default to 6 string
  const [selectedStringIndex, setSelectedStringIndex] = useState(0);
  const [detectedStringIndex, setDetectedStringIndex] = useState<number | null>(null);
  
  // Tuner State
    const [smoothedFreq, setSmoothedFreq] = useState(0);
    const [noteData, setNoteData] = useState<Note>({
        name: '—',
        frequency: 0,
        octave: 0,
        semitone: 0,
        midiNumber: 0,
    });
    const [cents, setCents] = useState(0);
  const [isInTune, setIsInTune] = useState(false);
    const frequencySmootherRef = useRef(0);
    const centsSmootherRef = useRef(0);
    const pendingStringRef = useRef<number | null>(null);
    const pendingStringHitsRef = useRef(0);

  useEffect(() => {
    setIsMount(true);
  }, []);

    // Tuning data
    const currentTuning = useMemo(() => getTuningForGuitar(guitarType, tuningMode), [guitarType, tuningMode]);
    const targetFrequency = useMemo(() => {
        const safeIndex = Math.min(selectedStringIndex, currentTuning.frequencies.length - 1);
        return currentTuning.frequencies[safeIndex] ?? 0;
    }, [currentTuning, selectedStringIndex]);

  // Audio Hook
    const { state: audioState, requestMicrophone, stopAudioCapture } = useAudioCapture({
    onDataAvailable: (data) => {
        setAudioBuffer(data);
    }
  });
    const isRecording = audioState.isActive;

  const [audioBuffer, setAudioBuffer] = useState<Float32Array | null>(null);

  // Pitch Detection
    const { frequency: detectedFrequency, detected, confidence } = usePitchDetector(audioBuffer, 48000, {
    targetFrequency, // This helps the algorithm prioritize around the expected note if needed, though robust algorithms might ignore it
    accuracyCents: 5,
    smoothingFactor: 0.6,
    updateRate: 20
  });

  // Processing logic loop
    useEffect(() => {
        if (!detected || detectedFrequency <= 0) {
            pendingStringRef.current = null;
            pendingStringHitsRef.current = 0;
            if (confidence < 0.3) {
                frequencySmootherRef.current = 0;
                centsSmootherRef.current = 0;
                setSmoothedFreq(0);
                setCents(0);
                setIsInTune(false);
            }
            return;
        }

        if (confidence < 0.45) {
            return;
        }

        const rawFreq = detectedFrequency;
        const previousFreq = frequencySmootherRef.current;
        const filteredFreq = previousFreq === 0 ? rawFreq : previousFreq * 0.65 + rawFreq * 0.35;
        frequencySmootherRef.current = filteredFreq;
        setSmoothedFreq(filteredFreq);

        const detectedString = detectPlayingString(filteredFreq, currentTuning.frequencies, 85);

        if (detectedString) {
            const candidate = detectedString.stringIndex;
            if (pendingStringRef.current === candidate) {
                pendingStringHitsRef.current += 1;
            } else {
                pendingStringRef.current = candidate;
                pendingStringHitsRef.current = 1;
            }

            if (pendingStringHitsRef.current >= 3) {
                setDetectedStringIndex(candidate);
                if (selectedStringIndex !== candidate) {
                    setSelectedStringIndex(candidate);
                }
            }
        } else {
            pendingStringRef.current = null;
            pendingStringHitsRef.current = 0;
            setDetectedStringIndex(null);
        }

        const targetFreqForCalc = currentTuning.frequencies[selectedStringIndex] ?? targetFrequency;
        const rawCents = centsFromFrequency(filteredFreq, targetFreqForCalc);
        const filteredCents = centsSmootherRef.current * 0.72 + rawCents * 0.28;
        centsSmootherRef.current = filteredCents;

        setCents(filteredCents);
        setNoteData(frequencyToNote(filteredFreq));
        setIsInTune(Math.abs(filteredCents) <= 5);
    }, [
        detected,
        detectedFrequency,
        confidence,
        currentTuning,
        selectedStringIndex,
        targetFrequency,
    ]);

    const toggleMic = () => {
        if (isRecording) {
            stopAudioCapture();
        } else {
            requestMicrophone();
        }
    };

  if (!isMount) return null;

  return (
    <div className="min-h-screen bg-[#050510] text-white overflow-x-hidden flex flex-col items-center">
        {/* Background Gradients */}
        <div className="fixed inset-0 pointer-events-none">
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-900/10 blur-[120px]"></div>
            <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-900/10 blur-[120px]"></div>
        </div>

        {/* Header / Nav */}
        <header className="z-10 w-full max-w-5xl mx-auto p-4 sm:p-6 flex flex-col sm:flex-row sm:justify-between sm:items-center items-start gap-3 bg-transparent">
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                    <Settings2 className="w-5 h-5 text-white" />
                </div>
                <h1 className="font-bold text-xl tracking-tight text-zinc-100">GuitarTunePro<span className="text-cyan-500">.</span></h1>
            </div>
            <div className="w-full sm:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
                <div className="flex items-center gap-3 bg-zinc-900/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/5">
                    <div className={cn("w-2 h-2 rounded-full animate-pulse", isRecording ? "bg-emerald-500" : "bg-zinc-600")}></div>
                    <span className="text-xs font-mono font-medium text-zinc-400 uppercase">
                        {isRecording ? "Monitoring" : "Standby"}
                    </span>
                </div>
                <Button
                    onClick={toggleMic}
                    className={cn(
                        "h-10 w-full sm:w-auto rounded-full px-4 text-xs font-semibold tracking-wide",
                        isRecording
                            ? "bg-rose-500 text-white hover:bg-rose-600"
                            : "bg-cyan-500 text-zinc-950 hover:bg-cyan-400"
                    )}
                >
                    {isRecording ? (
                        <span className="inline-flex items-center gap-2">
                            <MicOff className="h-4 w-4" /> Stop Recording
                        </span>
                    ) : (
                        <span className="inline-flex items-center gap-2">
                            <Mic className="h-4 w-4" /> Start Recording
                        </span>
                    )}
                </Button>
            </div>
        </header>

        {!isRecording && (
            <div className="z-10 mb-3 w-full max-w-4xl px-4">
                <div className="rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-4 py-3 text-sm text-cyan-100">
                    Tap Start Recording above, then pluck one string at a time.
                </div>
            </div>
        )}

        {/* Main Content Area */}
        <main className="z-10 flex-1 w-full max-w-4xl flex flex-col items-center justify-start gap-8 px-4 pb-12">
            
            {/* 1. Tuner Display (Gauge & Note) */}
            <div className="w-full mt-8">
                <TunerDisplay 
                    note={noteData} 
                    cents={cents} 
                    frequency={smoothedFreq} 
                    isInTune={isInTune}
                    isListening={isRecording}
                />
                <div className="mt-2 block rounded-xl border border-zinc-800 bg-zinc-900/60 p-3 sm:hidden">
                    <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">Adjustment</p>
                    <p className="mt-1 text-sm font-semibold text-zinc-100">
                        {!isRecording
                            ? 'Start recording and pluck one string.'
                            : isInTune
                                ? 'In tune. No adjustment needed.'
                                : cents < 0
                                    ? 'Too low: tighten the tuning peg slowly.'
                                    : 'Too high: loosen the tuning peg slowly.'}
                    </p>
                    <p className="mt-1 text-xs text-zinc-400">Current offset: {cents.toFixed(0)} cents</p>
                </div>
            </div>

            {/* 2. String Selector (Visual) */}
            <div className="w-full">
                <GuitarGuide
                    strings={currentTuning.notes}
                    selectedStringIndex={selectedStringIndex}
                    cents={cents}
                    isListening={isRecording}
                    onSelectString={setSelectedStringIndex}
                />
            </div>

            <div className="w-full">
                <GuitarStrings 
                    currentTuning={currentTuning}
                    selectedStringIndex={selectedStringIndex}
                    detectedStringIndex={detectedStringIndex}
                    onSelectString={setSelectedStringIndex}
                    isListening={isRecording}
                />
            </div>

            {/* 3. Controls (Tuning Mode + Mic Toggle) */}
            <div className="w-full flex flex-col items-center gap-6 mt-4">
                <TunerControls 
                    currentGuitarType={guitarType}
                    onGuitarTypeChange={(type) => {
                        setGuitarType(type);
                        setDetectedStringIndex(null);
                        setSelectedStringIndex(0);
                        if (type !== 'sixString') {
                            setTuningMode('standard');
                        }
                    }}
                    currentTuningMode={tuningMode}
                    onTuningChange={(mode) => {
                        setTuningMode(mode);
                        setDetectedStringIndex(null);
                        setSelectedStringIndex(0);
                    }}
                />

            </div>
        </main>
    </div>
  );
}
