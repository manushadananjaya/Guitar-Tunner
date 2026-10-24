"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { TunerDisplay } from "./TunerDisplay";
import { GuitarStrings } from "./GuitarStrings";
import { TunerControls } from "./Controls";
import { GuitarGuide } from "./GuitarGuide";
import { useAudioCapture } from "@/hooks/useAudioCapture";
import { usePitchDetector } from "@/hooks/usePitchDetector";
import {
  BOWED_INSTRUMENTS,
  STANDARD_A4,
  clampReferencePitch,
  getTuningForGuitar,
  scaleTuning,
} from "@/lib/tuningPresets";
import { playReferenceNote } from "@/lib/synth";
import {
  detectPlayingString,
  frequencyToNote,
  centsFromFrequency,
  Note,
} from "@/lib/noteMap";
import { cn } from "@/lib/utils";
import { TUNER_TEXT, localNote, type Locale } from "@/lib/i18n/tuner";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Mic, MicOff, Volume2 } from "lucide-react";

const REFERENCE_PITCH_KEY = "gtp:referencePitch";

/** Phone microphones barely register the fundamental of a bass string, so
 *  the detector often reports the 2nd or 4th harmonic instead. When the
 *  reading sits an octave or two from the target, fold it back — a string
 *  physically cannot be tuned an octave off, so the octave is never the
 *  information the player needs. */
function foldOctave(frequency: number, target: number): number {
  const direct = Math.abs(centsFromFrequency(frequency, target));
  for (const factor of [0.5, 2, 0.25]) {
    const folded = Math.abs(centsFromFrequency(frequency * factor, target));
    if (folded < 100 && folded < direct) return frequency * factor;
  }
  return frequency;
}

interface ProfessionalTunerProps {
  /** Tuning preset key to load on mount, e.g. "dropD". Defaults to standard. */
  initialTuning?: string;
  /** Instrument key to load on mount, e.g. "bass". Defaults to 6-string guitar. */
  initialGuitarType?: string;
  /** UI language. Defaults to English. */
  locale?: Locale;
  /** Concert pitch to start at, e.g. 432. When omitted the player's last
   *  choice is restored, falling back to 440. */
  initialReference?: number;
  /** Tuner, string buttons and settings only — for the embeddable widget. */
  compact?: boolean;
}

export function ProfessionalTuner({
  initialTuning = "standard",
  initialGuitarType = "sixString",
  locale = "en",
  initialReference,
  compact = false,
}: ProfessionalTunerProps = {}) {
  const t = TUNER_TEXT[locale];
  const [referencePitch, setReferencePitchState] = useState(
    clampReferencePitch(initialReference ?? STANDARD_A4),
  );
  // A page that names its pitch (the 432 Hz tuner) wins; elsewhere, restore
  // what the player last chose. Read after mount so SSR markup matches.
  useEffect(() => {
    if (initialReference !== undefined) return;
    try {
      const saved = Number(window.localStorage.getItem(REFERENCE_PITCH_KEY));
      if (saved) setReferencePitchState(clampReferencePitch(saved));
    } catch {
      // Storage blocked (private mode, sandboxed iframe) — stay at 440.
    }
  }, [initialReference]);
  const setReferencePitch = (value: number) => {
    const next = clampReferencePitch(value);
    setReferencePitchState(next);
    try {
      window.localStorage.setItem(REFERENCE_PITCH_KEY, String(next));
    } catch {
      // Not persisted; the choice still applies for this visit.
    }
  };
  const [tuningMode, setTuningMode] = useState(initialTuning);
  const [guitarType, setGuitarType] = useState(initialGuitarType);
  const [selectedStringIndex, setSelectedStringIndex] = useState(0);
  const [detectedStringIndex, setDetectedStringIndex] = useState<number | null>(
    null,
  );
  const [autoSelectString, setAutoSelectString] = useState(true);
  const [activeView, setActiveView] = useState<"headstock" | "fretboard">("headstock");

  // Tuning data. `baseTuning` is at A = 440 and names the notes;
  // `currentTuning` is what the tuner actually listens for.
  const baseTuning = useMemo(
    () => getTuningForGuitar(guitarType, tuningMode),
    [guitarType, tuningMode],
  );
  const currentTuning = useMemo(
    () => scaleTuning(baseTuning, referencePitch),
    [baseTuning, referencePitch],
  );
  // Only instruments below the detector's default 40 Hz floor (5-string
  // bass) or close to it (bass low E) widen the search.
  const lowestTarget = Math.min(...currentTuning.frequencies);
  const minFrequency = lowestTarget < 45 ? lowestTarget * 0.8 : undefined;
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
    minFrequency,
  });

  // While the reference note plays, the microphone hears the speaker. Ignore
  // it, or the tuner would "tune" the string to its own reference tone.
  const referenceToneUntilRef = useRef(0);
  const [playingReference, setPlayingReference] = useState(false);
  const playReference = () => {
    if (targetFrequency <= 0) return;
    const seconds = playReferenceNote(targetFrequency);
    referenceToneUntilRef.current = Date.now() + seconds * 1000 + 250;
    setPlayingReference(true);
    window.setTimeout(() => setPlayingReference(false), seconds * 1000);
  };

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

    if (Date.now() < referenceToneUntilRef.current) {
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
    // Fold only when no other string explains the reading better — playing
    // the high E with the low E selected must not read as an in-tune low E.
    const readingFreq =
      !detectedString || detectedString.stringIndex === selectedStringIndex
        ? foldOctave(filteredFreq, targetFreqForCalc)
        : filteredFreq;
    if (readingFreq !== filteredFreq) setSmoothedFreq(readingFreq);
    const rawCents = centsFromFrequency(readingFreq, targetFreqForCalc);
    const filteredCents = centsSmootherRef.current * 0.72 + rawCents * 0.28;
    centsSmootherRef.current = filteredCents;

    setCents(filteredCents);
    // Name notes on the 440 grid so A = 432 still reads "A", not "G♯ +31".
    setNoteData(frequencyToNote((readingFreq * STANDARD_A4) / referencePitch));
    setIsInTune(Math.abs(filteredCents) <= 5);
  }, [
    detected,
    detectedFrequency,
    confidence,
    currentTuning,
    selectedStringIndex,
    autoSelectString,
    targetFrequency,
    referencePitch,
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

  // Strings that have held in tune this session — drives the progress dots
  // and the "what next" prompt once every string is done. A short hold
  // stops a needle passing through zero from counting.
  const [tunedStrings, setTunedStrings] = useState<number[]>([]);
  useEffect(() => {
    setTunedStrings([]);
  }, [guitarType, tuningMode]);
  useEffect(() => {
    if (!isRecording || !isInTune || detectedStringIndex !== selectedStringIndex) return;
    const timer = window.setTimeout(() => {
      setTunedStrings((prev) =>
        prev.includes(selectedStringIndex) ? prev : [...prev, selectedStringIndex],
      );
    }, 600);
    return () => window.clearTimeout(timer);
  }, [isRecording, isInTune, selectedStringIndex, detectedStringIndex]);
  const allTuned =
    currentTuning.notes.length > 0 && tunedStrings.length === currentTuning.notes.length;
  // Guitar practice tools are no use to a violinist; point them elsewhere.
  const isBowed = BOWED_INSTRUMENTS.has(guitarType);

  const targetLabel = (() => {
    const base = baseTuning.frequencies[selectedStringIndex] ?? 0;
    if (base <= 0) return undefined;
    const n = frequencyToNote(base);
    return localNote(`${n.name}${n.octave}`, locale);
  })();

  // No mount gate here. This used to `return null` until a mount effect fired,
  // which kept the entire above-the-fold tuner out of the server HTML and out
  // of the first paint — it only appeared once the client bundle (framer-motion
  // included) had downloaded and hydrated, popping in and shoving the page down.
  // The gate is unnecessary: every value rendered on the first pass is a
  // deterministic constant (idle readout, 0 cents, mic off), and the only
  // browser APIs live inside effects and event handlers, so the server render
  // and the first client render match.
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
              {isRecording ? t.monitoring : t.standby}
            </span>
          </div>
          
          <div className="hidden sm:flex items-center gap-3 bg-surface/40 backdrop-blur-md px-4 py-1.5 rounded-full border border-line">
            <span className="text-xs text-ink-muted font-medium">{t.autoSelect}</span>
            <Switch
              checked={autoSelectString}
              onCheckedChange={setAutoSelectString}
              aria-label={t.autoSelectAria}
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
              <MicOff className="h-4 w-4" /> {t.stop}
            </span>
          ) : (
            <span className="inline-flex items-center gap-2">
              <Mic className="h-4 w-4" /> {t.start}
            </span>
          )}
        </Button>
      </div>

      {/* The idle instruction lives in the "Action Required" panel inside the
          tuner card. A separate full-width banner said the same thing a third
          time and pushed the gauge below the fold on mobile. */}

      {/* Main Tuner Card / Display Panel */}
      <div
        className={cn(
          "w-full max-w-5xl px-4 sm:px-6 flex flex-col items-center gap-5 sm:gap-6",
          compact ? "pb-4" : "pb-12",
        )}
      >
        {/* Mobile Switch toggles (only shown on mobile) */}
        {!compact && (
        <div className="w-full sm:hidden flex items-center justify-between px-2 pb-2 border-b border-line">
          <div>
            <p className="text-sm font-semibold text-ink">
              {t.autoSelect}
            </p>
            <p className="text-2xs text-ink-subtle">
              {t.autoSelectHint}
            </p>
          </div>
          <Switch
            checked={autoSelectString}
            onCheckedChange={setAutoSelectString}
            aria-label={t.autoSelectAria}
          />
        </div>
        )}

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
            locale={locale}
            targetNote={targetLabel}
            targetFrequency={
              currentTuning.frequencies[selectedStringIndex] ?? undefined
            }
            referencePitch={referencePitch}
          />

          {/* Hear the target — for tuning by ear, or when the mic is noisy. */}
          {targetLabel && (
            <div className="mt-4 flex justify-center">
              <button
                type="button"
                onClick={playReference}
                disabled={playingReference}
                className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-surface/60 px-4 py-2 text-xs font-semibold text-ink hover:border-brass/50 hover:text-brass disabled:opacity-60 transition-colors"
              >
                <Volume2 className="h-4 w-4" aria-hidden="true" />
                {t.playNote(targetLabel)}
              </button>
            </div>
          )}

          {compact && (
            <p className="mt-4 text-center text-sm font-semibold text-ink" role="status">
              {!isRecording
                ? t.actionIdle
                : isInTune
                  ? t.actionInTune
                  : cents < 0
                    ? t.actionLow
                    : t.actionHigh}
            </p>
          )}
          
          {!compact && (
          <>
          {/* Unified high-fidelity Guidance Panel */}
          <div className="mt-6 pt-6 border-t border-line w-full max-w-xl mx-auto flex flex-col sm:grid sm:grid-cols-2 gap-4 items-stretch text-center sm:text-left">
            {/* Column 1: Action Required */}
            <div className="bg-surface/15 border border-white/[0.03] rounded-2xl p-4 sm:p-5 flex flex-col justify-center">
              <p className="text-2xs font-bold uppercase tracking-[0.18em] text-ink-subtle mb-1.5">
                {t.actionRequired}
              </p>
              <p className="text-sm sm:text-base font-semibold text-ink">
                {!isRecording
                  ? t.actionIdle
                  : isInTune
                    ? t.actionInTune
                    : cents < 0
                      ? t.actionLow
                      : t.actionHigh}
              </p>
            </div>

            {/* Column 2: Peg Rotation / Cent Offset */}
            <div className="bg-surface/15 border border-white/[0.03] rounded-2xl p-4 sm:p-5 flex flex-col justify-center">
              <p className="text-2xs font-bold uppercase tracking-[0.18em] text-ink-subtle mb-1.5">
                {t.pegOffset}
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
                  ? t.standby
                  : isInTune
                    ? t.perfect
                    : cents < 0
                      ? t.tighten
                      : t.loosen}
              </p>
              {isRecording && (
                <p className="mt-1 text-xs font-mono tracking-wider text-ink-subtle">
                  {t.offsetLabel}:{" "}
                  <span className={cn(cents > 0 ? "text-off" : cents < 0 ? "text-flat" : "text-in-tune")}>
                    {cents > 0 ? "+" : ""}{cents.toFixed(1)}
                  </span>{" "}
                  CENTS
                </p>
              )}
            </div>
          </div>
          </>
          )}
        </div>

        {/* Tuning progress, then where to go once the instrument is in tune */}
        {!compact && (isRecording || tunedStrings.length > 0) && (
          <div className="w-full rounded-2xl border border-line bg-surface/30 px-5 py-4 backdrop-blur-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-2xs font-bold uppercase tracking-[0.18em] text-ink-subtle">
                {t.sessionProgress(tunedStrings.length, currentTuning.notes.length)}
              </p>
              <ol className="flex gap-1.5" aria-label={t.stringsTuned}>
                {currentTuning.notes.map((note, i) => (
                  <li
                    key={i}
                    className={cn(
                      "flex h-7 min-w-7 items-center justify-center rounded-full px-1.5 text-2xs font-mono font-bold transition-colors",
                      tunedStrings.includes(i)
                        ? "bg-in-tune text-white"
                        : "bg-surface-sunken text-ink-subtle",
                    )}
                  >
                    {localNote(note, locale)}
                  </li>
                ))}
              </ol>
            </div>
            {allTuned && (
              <div className="mt-4 border-t border-line pt-4" role="status">
                <p className="text-base font-semibold text-ink">
                  {t.allTuned(currentTuning.notes.length)}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Link
                    href={isBowed ? "/metronome" : "/practice-routine"}
                    className="rounded-full bg-brass px-4 py-2 text-sm font-bold text-brass-contrast hover:bg-brass-hover transition-colors"
                  >
                    {isBowed ? t.metronome : t.practiceRoutine}
                  </Link>
                  {(isBowed
                    ? [
                        { href: "/ear-training", label: t.earTraining },
                        { href: "/chord-progressions", label: t.playOverLoop },
                      ]
                    : [
                        { href: "/daily-challenge", label: t.dailyChallenge },
                        { href: "/strumming-patterns", label: t.strumming },
                        { href: "/scales", label: t.scales },
                        { href: "/chord-progressions", label: t.backingLoop },
                      ]
                  ).map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="rounded-full border border-line-strong bg-surface/60 px-4 py-2 text-sm font-semibold text-ink hover:border-brass/50 hover:text-brass transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {compact ? (
          <div
            className="flex flex-wrap justify-center gap-2"
            role="group"
            aria-label={t.stringSelector}
          >
            {currentTuning.notes.map((note, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setSelectedStringIndex(i)}
                aria-pressed={i === selectedStringIndex}
                aria-label={t.selectString(
                  currentTuning.notes.length - i,
                  localNote(note, locale),
                )}
                className={cn(
                  "h-10 min-w-10 rounded-full border px-3 text-sm font-bold transition-colors",
                  i === selectedStringIndex
                    ? "border-brass bg-brass/15 text-brass"
                    : i === detectedStringIndex
                      ? "border-in-tune bg-in-tune/15 text-in-tune"
                      : tunedStrings.includes(i)
                        ? "border-in-tune/40 text-in-tune"
                        : "border-line-strong bg-surface/60 text-ink-muted hover:text-ink",
                )}
              >
                {localNote(note, locale)}
              </button>
            ))}
          </div>
        ) : (
          <>
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
            {t.visualPegs}
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
            {t.stringSelector}
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
              locale={locale}
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
                {t.fretboardTitle}
              </h3>
              <p className="text-sm text-ink-muted mt-1">
                {t.fretboardHint}
              </p>
            </div>
            <div className="w-full flex-1 flex items-center justify-center">
              <GuitarStrings
                currentTuning={currentTuning}
                selectedStringIndex={selectedStringIndex}
                detectedStringIndex={detectedStringIndex}
                onSelectString={setSelectedStringIndex}
                isListening={isRecording}
                locale={locale}
              />
            </div>
          </div>
        </div>

        {/* 3. Settings panel: Guitar Type & Tuning Mode */}
        <div className="w-full bg-surface-sunken/20 border border-line rounded-3xl p-6 sm:p-8 backdrop-blur-sm shadow-xl">
          <TunerControls
            currentGuitarType={guitarType}
            locale={locale}
            referencePitch={referencePitch}
            onReferencePitchChange={setReferencePitch}
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
            {t.guidelinesTitle}
          </h2>
          <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-ink">
            {t.guidelines.map((item, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-brass font-bold">{i + 1}.</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
          </>
        )}
      </div>
    </div>
  );
}
