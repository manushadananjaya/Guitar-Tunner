"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { TunerDisplay } from "./TunerDisplay";
import { GuitarStrings } from "./GuitarStrings";
import { TunerControls } from "./Controls";
import { GuitarGuide } from "./GuitarGuide";
import { useAudioCapture } from "@/hooks/useAudioCapture";
import { usePitchDetector } from "@/hooks/usePitchDetector";
import { getTuningForGuitar } from "@/lib/tuningPresets";
import {
  detectPlayingString,
  frequencyToNote,
  centsFromFrequency,
  Note,
} from "@/lib/noteMap";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Mic, MicOff, Settings2 } from "lucide-react";

interface ProfessionalTunerProps {
  /** Tuning preset key to load on mount, e.g. "dropD". Defaults to standard. */
  initialTuning?: string;
  /** Instrument key to load on mount, e.g. "bass". Defaults to 6-string guitar. */
  initialGuitarType?: string;
}

export function ProfessionalTuner({
  initialTuning = "standard",
  initialGuitarType = "sixString",
}: ProfessionalTunerProps = {}) {
  const [isMount, setIsMount] = useState(false);
  const [tuningMode, setTuningMode] = useState(initialTuning);
  const [guitarType, setGuitarType] = useState(initialGuitarType);
  const [selectedStringIndex, setSelectedStringIndex] = useState(0);
  const [detectedStringIndex, setDetectedStringIndex] = useState<number | null>(
    null,
  );
  const [autoSelectString, setAutoSelectString] = useState(true);
  const [activeView, setActiveView] = useState<"headstock" | "fretboard">("headstock");

  useEffect(() => {
    setIsMount(true);
  }, []);

  // Tuning data
  const currentTuning = useMemo(
    () => getTuningForGuitar(guitarType, tuningMode),
    [guitarType, tuningMode],
  );
  const targetFrequency = useMemo(() => {
    const safeIndex = Math.min(
      selectedStringIndex,
      currentTuning.frequencies.length - 1,
    );
    return currentTuning.frequencies[safeIndex] ?? 0;
  }, [currentTuning, selectedStringIndex]);

  // Audio Hook
  const {
    state: audioState,
    requestMicrophone,
    stopAudioCapture,
  } = useAudioCapture({
    onDataAvailable: (data) => {
      setAudioBuffer(data);
    },
  });
  const isRecording = audioState.isActive;

  const [audioBuffer, setAudioBuffer] = useState<Float32Array | null>(null);

  // Pitch Detection
  const {
    frequency: detectedFrequency,
    detected,
    confidence,
  } = usePitchDetector(audioBuffer, 48000, {
    targetFrequency,
    accuracyCents: 5,
    smoothingFactor: 0.55,
    updateRate: 16,
  });

  // Processing logic loop
  useEffect(() => {
    if (!detected || detectedFrequency <= 0) {
      frequencyBufferRef.current = [];
      stringVoteBufferRef.current = [];
      const now = Date.now();
      const timeSinceDetection = now - lastDetectedTimeRef.current;
      if (confidence < 0.15 && timeSinceDetection > HOLD_DURATION_MS) {
        frequencySmootherRef.current = 0;
        centsSmootherRef.current = 0;
        setSmoothedFreq(0);
        setCents(0);
        setIsInTune(false);
      }
      return;
    }

    if (confidence < 0.2) {
      return;
    }

    lastDetectedTimeRef.current = Date.now();

    frequencyBufferRef.current.push(detectedFrequency);
    if (frequencyBufferRef.current.length > 7) {
      frequencyBufferRef.current.shift();
    }

    const sortedFreqs = [...frequencyBufferRef.current].sort((a, b) => a - b);
    const mid = Math.floor(sortedFreqs.length / 2);
    const bufferedFreq =
      sortedFreqs.length % 2 === 0
        ? (sortedFreqs[mid - 1] + sortedFreqs[mid]) / 2
        : sortedFreqs[mid];

    const rawFreq = bufferedFreq;
    const previousFreq = frequencySmootherRef.current;
    const filteredFreq =
      previousFreq === 0 ? rawFreq : previousFreq * 0.65 + rawFreq * 0.35;
    frequencySmootherRef.current = filteredFreq;
    setSmoothedFreq(filteredFreq);

    const detectedString = detectPlayingString(
      filteredFreq,
      currentTuning.frequencies,
      70,
    );

    if (detectedString) {
      const candidate = detectedString.stringIndex;
      stringVoteBufferRef.current.push(candidate);
      if (stringVoteBufferRef.current.length > 6) {
        stringVoteBufferRef.current.shift();
      }

      const voteCounts = new Map<number, number>();
      for (const vote of stringVoteBufferRef.current) {
        voteCounts.set(vote, (voteCounts.get(vote) ?? 0) + 1);
      }

      let dominantString = candidate;
      let dominantCount = 0;
      voteCounts.forEach((count, stringIndex) => {
        if (count > dominantCount) {
          dominantCount = count;
          dominantString = stringIndex;
        }
      });

      if (dominantCount >= 3) {
        setDetectedStringIndex(dominantString);

        const currentStringCents = Math.abs(
          centsFromFrequency(
            filteredFreq,
            currentTuning.frequencies[selectedStringIndex] ?? targetFrequency,
          ),
        );

        const shouldSwitch =
          autoSelectString &&
          selectedStringIndex !== dominantString &&
          dominantCount >= 4 &&
          currentStringCents > 20;

        if (shouldSwitch) {
          setSelectedStringIndex(dominantString);
        }
      }
    } else {
      stringVoteBufferRef.current = [];
      setDetectedStringIndex(null);
    }

    const targetFreqForCalc =
      currentTuning.frequencies[selectedStringIndex] ?? targetFrequency;
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
    autoSelectString,
    targetFrequency,
  ]);

  const toggleMic = () => {
    if (isRecording) {
      stopAudioCapture();
    } else {
      requestMicrophone();
    }
  };

  const frequencySmootherRef = useRef(0);
  const centsSmootherRef = useRef(0);
  const frequencyBufferRef = useRef<number[]>([]);
  const stringVoteBufferRef = useRef<number[]>([]);
  const lastDetectedTimeRef = useRef<number>(0);
  const HOLD_DURATION_MS = 700;

  // Smoothed state setters
  const [smoothedFreq, setSmoothedFreq] = useState(0);
  const [noteData, setNoteData] = useState<Note>({
    name: "—",
    frequency: 0,
    octave: 0,
    semitone: 0,
    midiNumber: 0,
  });
  const [cents, setCents] = useState(0);
  const [isInTune, setIsInTune] = useState(false);

  if (!isMount) return null;

  return (
    <div className="w-full text-ink flex flex-col items-center z-10 relative">
      {/* Tuner Controls Bar */}
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row justify-between items-center gap-3 bg-transparent">
        {/* Toggle options */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 bg-surface/40 backdrop-blur-md px-4 py-2 rounded-full border border-line">
            <div
              className={cn(
                "w-2 h-2 rounded-full animate-pulse",
                isRecording
                  ? "bg-in-tune shadow-[0_0_8px_var(--in-tune)]"
                  : "bg-line-strong",
              )}
            ></div>
            <span className="text-xs font-mono font-medium text-ink-muted uppercase tracking-wider">
              {isRecording ? "Monitoring" : "Standby"}
            </span>
          </div>
          
          <div className="hidden sm:flex items-center gap-3 bg-surface/40 backdrop-blur-md px-4 py-1.5 rounded-full border border-line">
            <span className="text-xs text-ink-muted font-medium">Auto-select string</span>
            <Switch
              checked={autoSelectString}
              onCheckedChange={setAutoSelectString}
              aria-label="Toggle automatic played string selection"
            />
          </div>
        </div>

        {/* Start/Stop Recording Button */}
        <Button
          onClick={toggleMic}
          className={cn(
            "h-11 w-full sm:w-auto rounded-full px-6 text-xs font-bold tracking-wider uppercase transition-smooth",
            isRecording
              ? "bg-off/20 border border-off/40 text-off hover:bg-off/30"
              : "bg-brass text-brass-contrast hover:bg-brass-hover shadow-lg shadow-brass/15 hover:shadow-brass/25",
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

      {/* The idle instruction lives in the "Action Required" panel inside the
          tuner card. A separate full-width banner said the same thing a third
          time and pushed the gauge below the fold on mobile. */}

      {/* Main Tuner Card / Display Panel */}
      <div className="w-full max-w-5xl px-4 sm:px-6 flex flex-col items-center gap-5 sm:gap-6 pb-12">
        {/* Mobile Switch toggles (only shown on mobile) */}
        <div className="w-full sm:hidden flex items-center justify-between px-2 pb-2 border-b border-line">
          <div>
            <p className="text-sm font-semibold text-ink">
              Auto-select string
            </p>
            <p className="text-2xs text-ink-subtle">
              Switches to string automatically
            </p>
          </div>
          <Switch
            checked={autoSelectString}
            onCheckedChange={setAutoSelectString}
            aria-label="Toggle automatic played string selection"
          />
        </div>

        {/* 1. Gauge & Dial */}
        <div className="w-full bg-surface-sunken/30 border border-line rounded-3xl p-5 sm:p-6 backdrop-blur-md shadow-2xl relative overflow-hidden">
          {/* Inner decorative light */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 h-[1px] bg-linear-to-r from-transparent via-brass/10 to-transparent" />
          
          <TunerDisplay
            note={noteData}
            cents={cents}
            frequency={smoothedFreq}
            isInTune={isInTune}
            isListening={isRecording}
            targetNote={(() => {
              const target =
                currentTuning.frequencies[selectedStringIndex] ?? 0;
              if (target <= 0) return undefined;
              const n = frequencyToNote(target);
              return `${n.name}${n.octave}`;
            })()}
            targetFrequency={
              currentTuning.frequencies[selectedStringIndex] ?? undefined
            }
          />
          
          {/* Unified high-fidelity Guidance Panel */}
          <div className="mt-6 pt-6 border-t border-line w-full max-w-xl mx-auto flex flex-col sm:grid sm:grid-cols-2 gap-4 items-stretch text-center sm:text-left">
            {/* Column 1: Action Required */}
            <div className="bg-surface/15 border border-white/[0.03] rounded-2xl p-4 sm:p-5 flex flex-col justify-center">
              <p className="text-2xs font-bold uppercase tracking-[0.18em] text-ink-subtle mb-1.5">
                Action Required
              </p>
              <p className="text-sm sm:text-base font-semibold text-ink">
                {!isRecording
                  ? "Start tuner and pluck highlighted note."
                  : isInTune
                    ? "In tune. No turn needed."
                    : cents < 0
                      ? "Pitch is low. Tighten peg."
                      : "Pitch is high. Loosen peg."}
              </p>
            </div>

            {/* Column 2: Peg Rotation / Cent Offset */}
            <div className="bg-surface/15 border border-white/[0.03] rounded-2xl p-4 sm:p-5 flex flex-col justify-center">
              <p className="text-2xs font-bold uppercase tracking-[0.18em] text-ink-subtle mb-1.5">
                Peg Rotation & Offset
              </p>
              <p
                className={cn(
                  "text-base sm:text-lg font-bold tracking-tight transition-colors duration-300",
                  !isRecording
                    ? "text-ink-subtle"
                    : isInTune
                      ? "text-in-tune"
                      : "text-brass",
                )}
              >
                {!isRecording
                  ? "Standby"
                  : isInTune
                    ? "Perfect"
                    : cents < 0
                      ? "↻ Tighten peg"
                      : "↺ Loosen peg"}
              </p>
              {isRecording && (
                <p className="mt-1 text-xs font-mono tracking-wider text-ink-subtle">
                  OFFSET:{" "}
                  <span className={cn(cents > 0 ? "text-off" : cents < 0 ? "text-flat" : "text-in-tune")}>
                    {cents > 0 ? "+" : ""}{cents.toFixed(1)}
                  </span>{" "}
                  CENTS
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Mobile view selector switcher (Hidden on Desktop) */}
        <div className="flex md:hidden w-full bg-surface-sunken/60 p-1 rounded-full border border-line">
          <button
            onClick={() => setActiveView("headstock")}
            className={cn(
              "flex-1 text-center py-2.5 rounded-full text-xs font-bold tracking-wider transition-all duration-300 uppercase",
              activeView === "headstock"
                ? "bg-brass text-brass-contrast shadow-md shadow-brass/20"
                : "text-ink-muted hover:text-ink",
            )}
          >
            Visual Pegs
          </button>
          <button
            onClick={() => setActiveView("fretboard")}
            className={cn(
              "flex-1 text-center py-2.5 rounded-full text-xs font-bold tracking-wider transition-all duration-300 uppercase",
              activeView === "fretboard"
                ? "bg-brass text-brass-contrast shadow-md shadow-brass/20"
                : "text-ink-muted hover:text-ink",
            )}
          >
            String Selector
          </button>
        </div>

        {/* 2. Interactive Controls (Headstock pegs & Fretboard strings) */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {/* Headstock Pegs View */}
          <div
            className={cn(
              "w-full bg-surface-sunken/20 border border-line rounded-3xl p-4 sm:p-6 backdrop-blur-sm shadow-xl flex flex-col justify-center transition-all duration-200",
              activeView === "headstock" ? "block" : "hidden md:block",
            )}
          >
            <GuitarGuide
              strings={currentTuning.notes}
              selectedStringIndex={selectedStringIndex}
              detectedStringIndex={detectedStringIndex}
              cents={cents}
              isListening={isRecording}
              onSelectString={setSelectedStringIndex}
            />
          </div>

          {/* Fretboard Strings View */}
          <div
            className={cn(
              "w-full bg-surface-sunken/20 border border-line rounded-3xl p-4 sm:p-6 backdrop-blur-sm shadow-xl flex flex-col items-center justify-between transition-all duration-200",
              activeView === "fretboard" ? "block" : "hidden md:block",
            )}
          >
            <div className="text-center mb-2 px-4 hidden md:block pt-6">
              <h3 className="text-xl font-semibold tracking-tight text-ink">
                Fretboard Strings
              </h3>
              <p className="text-sm text-ink-muted mt-1">
                Interactive layout for manual note selection.
              </p>
            </div>
            <div className="w-full flex-1 flex items-center justify-center">
              <GuitarStrings
                currentTuning={currentTuning}
                selectedStringIndex={selectedStringIndex}
                detectedStringIndex={detectedStringIndex}
                onSelectString={setSelectedStringIndex}
                isListening={isRecording}
              />
            </div>
          </div>
        </div>

        {/* 3. Settings panel: Guitar Type & Tuning Mode */}
        <div className="w-full bg-surface-sunken/20 border border-line rounded-3xl p-6 sm:p-8 backdrop-blur-sm shadow-xl">
          <TunerControls
            currentGuitarType={guitarType}
            onGuitarTypeChange={(type) => {
              setGuitarType(type);
              setDetectedStringIndex(null);
              setSelectedStringIndex(0);
              if (type !== "sixString") {
                setTuningMode("standard");
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

        {/* 4. Guidelines section */}
        <section className="w-full rounded-2xl border border-line bg-surface/10 p-5 sm:p-6 backdrop-blur-sm">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-brass">
            Quick Tuning Guidelines
          </h2>
          <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-ink">
            <li className="flex gap-2">
              <span className="text-brass font-bold">1.</span>
              <span>Tap the <span className="font-semibold text-ink">Start Recording</span> button at the top to initialize your microphone.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-brass font-bold">2.</span>
              <span>Pluck one string cleanly at a time. Let it vibrate naturally to get a continuous frequency reading.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-brass font-bold">3.</span>
              <span>Adjust your tuning pegs until the dial centers in the <span className="font-semibold text-in-tune">green zone</span> (around 0 cents).</span>
            </li>
            <li className="flex gap-2">
              <span className="text-brass font-bold">4.</span>
              <span>Watch indicators: <span className="text-brass font-semibold">amber</span> is the currently selected note, <span className="text-in-tune font-semibold">green</span> is the automatically detected audio feed.</span>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
