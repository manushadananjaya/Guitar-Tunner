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

export function ProfessionalTuner() {
  const [isMount, setIsMount] = useState(false);
  const [tuningMode, setTuningMode] = useState("standard");
  const [guitarType, setGuitarType] = useState("sixString"); // Default to 6 string
  const [selectedStringIndex, setSelectedStringIndex] = useState(0);
  const [detectedStringIndex, setDetectedStringIndex] = useState<number | null>(
    null,
  );
  const [autoSelectString, setAutoSelectString] = useState(true);

  // Tuner State
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
  const frequencySmootherRef = useRef(0);
  const centsSmootherRef = useRef(0);
  const frequencyBufferRef = useRef<number[]>([]);
  const stringVoteBufferRef = useRef<number[]>([]);
  const lastDetectedTimeRef = useRef<number>(0);
  const HOLD_DURATION_MS = 700;

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
    targetFrequency, // This helps the algorithm prioritize around the expected note if needed, though robust algorithms might ignore it
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

  if (!isMount) return null;

  return (
    <div className="min-h-screen bg-[#050510] text-white overflow-x-hidden flex flex-col items-center">
      {/* Background Gradients */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-900/10 blur-[120px]"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-900/10 blur-[120px]"></div>
      </div>

      {/* Tuner Controls Bar */}
      <div className="z-10 w-full max-w-5xl mx-auto p-4 sm:p-6 flex flex-col sm:flex-row justify-center sm:justify-end items-center gap-3 bg-transparent">
        <div className="w-full sm:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-3 bg-zinc-900/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/5">
            <div
              className={cn(
                "w-2 h-2 rounded-full animate-pulse",
                isRecording ? "bg-emerald-500" : "bg-zinc-600",
              )}
            ></div>
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
                : "bg-cyan-500 text-zinc-950 hover:bg-cyan-400",
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
      </div>

      {!isRecording && (
        <div className="z-10 mb-3 w-full max-w-4xl px-4">
          <div className="rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-4 py-3 text-sm text-cyan-100">
            Tap Start Recording above, then pluck one string at a time.
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="z-10 flex-1 w-full max-w-4xl flex flex-col items-center justify-start gap-8 px-4 pb-12">
        <div className="w-full sm:hidden">
          <div className="px-4 py-3 border-b border-zinc-800/50">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-zinc-100">
                  Auto-select played string
                </p>
                <p className="text-xs text-zinc-400">
                  Automatically switches to the string you pluck
                </p>
              </div>
              <Switch
                checked={autoSelectString}
                onCheckedChange={setAutoSelectString}
                aria-label="Toggle automatic played string selection"
              />
            </div>
          </div>
        </div>

        {/* 1. Tuner Display (Gauge & Note) */}
        <div className="w-full mt-8">
          <TunerDisplay
            note={noteData}
            cents={cents}
            frequency={smoothedFreq}
            isInTune={isInTune}
            isListening={isRecording}
          />
          <div className="mt-4 block text-center sm:hidden px-4">
            <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">
              Adjustment
            </p>
            <p className="mt-1 text-base font-medium text-zinc-100">
              {!isRecording
                ? "Start recording and pluck one string."
                : isInTune
                  ? "In tune. No action needed."
                  : cents < 0
                    ? "Too low: tightenpeg."
                    : "Too high: loosen peg."}
            </p>
            <p className="mt-1 text-xs font-mono text-zinc-400">
              Offset: {cents.toFixed(0)} cents
            </p>
          </div>
        </div>

        {/* 2. String Selector (Visual) */}
        <div className="w-full">
          <GuitarGuide
            strings={currentTuning.notes}
            selectedStringIndex={selectedStringIndex}
            detectedStringIndex={detectedStringIndex}
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

        <section className="w-full rounded-2xl border border-zinc-800 bg-zinc-900/50 p-4 sm:p-5">
          <h2 className="text-base font-semibold text-zinc-100">
            Quick Tuning Guidelines
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-zinc-300">
            <li>
              1. Tap{" "}
              <span className="font-semibold text-cyan-300">
                Start Recording
              </span>{" "}
              and allow microphone access.
            </li>
            <li>
              2. Pluck one string at a time and let it ring naturally for better
              detection.
            </li>
            <li>
              3. Tune toward{" "}
              <span className="font-semibold text-emerald-300">0 cents</span> on
              the meter (green zone).
            </li>
            <li>
              4. Use the guitar layout highlight: cyan is selected string, green
              is currently detected playing string.
            </li>
            <li>
              5. If auto-select causes jumps, turn it off on mobile and tune
              strings manually.
            </li>
          </ul>
        </section>
      </main>

      {/* AdSense SEO Content */}
      <section className="w-full max-w-4xl px-4 py-16 text-zinc-300 z-10 mt-8 border-t border-white/5">
        <h2 className="text-3xl font-bold text-white mb-6">
          Online Guitar Tuner Guide
        </h2>

        <article className="prose prose-invert max-w-none">
          <h3 className="text-2xl font-semibold text-white mt-8 mb-4">
            How to Tune Your Guitar by Ear or with a Mic
          </h3>
          <p className="mb-4 leading-relaxed">
            Tuning your guitar is the most important skill you can learn as a
            beginner. An out-of-tune guitar will make even the greatest players
            sound bad. Our <strong>online guitar tuner</strong> simplifies this
            process. Simply allow microphone access, pluck a string, and our
            advanced pitch detection algorithm will tell you exactly which note
            you are playing and whether it is too sharp (high) or flat (low).
          </p>
          <p className="mb-4 leading-relaxed">
            The standard tuning for a 6-string guitar, starting from the
            thickest string (lowest pitch) to the thinnest string (highest
            pitch), is <strong>E - A - D - G - B - E</strong>. A helpful
            mnemonic device to remember these notes is: "<strong>E</strong>ddie{" "}
            <strong>A</strong>te <strong>D</strong>ynamite, <strong>G</strong>
            ood <strong>B</strong>ye <strong>E</strong>ddie".
          </p>

          <h3 className="text-2xl font-semibold text-white mt-10 mb-4">
            Exploring Alternative Tunings
          </h3>
          <p className="mb-4 leading-relaxed">
            While standard tuning is extremely versatile, exploring alternative
            tunings can unlock entirely new sonic possibilities and make certain
            chords easier to play. Our tuner supports dozens of alternative
            tunings instantly.
          </p>
          <ul className="list-disc list-inside space-y-2 mb-6 ml-4">
            <li>
              <strong>Drop D (D A D G B E):</strong> Popular in rock and metal
              for easy, heavy power chords. Lower the thick E string down a
              whole step to D.
            </li>
            <li>
              <strong>Open G (D G D G B D):</strong> A favorite of blues players
              and the Rolling Stones. Strumming all strings open produces a G
              major chord.
            </li>
            <li>
              <strong>Half-Step Down (Eb Ab Db Gb Bb Eb):</strong> Lowers the
              tension on the strings, making bending easier, and creates a
              darker, heavier tone favored by grunge bands.
            </li>
          </ul>

          <h3 className="text-2xl font-semibold text-white mt-10 mb-4">
            Frequently Asked Questions
          </h3>
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-medium text-white mb-2">
                Is the online guitar tuner accurate?
              </h4>
              <p className="leading-relaxed text-sm">
                Yes, GuitarTunePro uses the Web Audio API and highly precise
                algorithmic pitch detection. It is accurate to within a few
                cents, making it suitable for professional stage setup,
                recording sessions, and daily practice.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-medium text-white mb-2">
                Why isn't the tuner hearing my guitar?
              </h4>
              <p className="leading-relaxed text-sm">
                Ensure that you have granted microphone permissions in your
                browser. If you are using an electric guitar without an
                amplifier, the acoustic sound may be too quiet. Try moving your
                instrument closer to the device's microphone or plugging into a
                USB interface.
              </p>
            </div>
          </div>
        </article>
      </section>

      {/* Footer */}
      <footer className="w-full py-8 z-10 mt-auto border-t border-white/5 bg-zinc-950/40">
        <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6 text-sm">
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-zinc-400 font-medium">
            <Link
              href="/about"
              className="hover:text-cyan-400 transition-colors"
            >
              About Us
            </Link>
            <Link
              href="/articles"
              className="hover:text-cyan-400 transition-colors"
            >
              Articles
            </Link>
            <Link
              href="/privacy-policy"
              className="hover:text-cyan-400 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-of-service"
              className="hover:text-cyan-400 transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/contact"
              className="hover:text-cyan-400 transition-colors"
            >
              Contact
            </Link>
          </div>
          <p className="text-xs font-semibold text-zinc-500 tracking-wider flex items-center gap-1.5 uppercase shrink-0">
            Made with <span className="text-rose-500 text-sm">❤️</span> by{" "}
            <a href="https://.com" target="_blank" rel="noopener noreferrer">
              <span className="text-cyan-400 opacity-90 hover:opacity-100 transition-opacity drop-shadow-[0_0_8px_rgba(34,211,238,0.4)]"></span>
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
