"use client";

import { useState } from "react";
import { Mic, MicOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAudioCapture } from "@/hooks/useAudioCapture";
import { useVocalPitch } from "@/hooks/useVocalPitch";
import { PitchReadout } from "./PitchReadout";
import { PitchTrail } from "./PitchTrail";
import { RangeFinder } from "./RangeFinder";
import { PitchMatch } from "./PitchMatch";

type Mode = "trail" | "range" | "match";

const MODES: { id: Mode; label: string }[] = [
  { id: "trail", label: "Pitch trail" },
  { id: "range", label: "Range finder" },
  { id: "match", label: "Match a note" },
];

export function VocalTuner() {
  const [mode, setMode] = useState<Mode>("trail");
  const [audioBuffer, setAudioBuffer] = useState<Float32Array | null>(null);
  const [target, setTarget] = useState<number | null>(null);
  const [targetLabel, setTargetLabel] = useState<string>("");

  const {
    state: audio,
    requestMicrophone,
    stopAudioCapture,
    isSupported,
  } = useAudioCapture({
    onDataAvailable: setAudioBuffer,
  });
  const listening = audio.isActive;

  const pitch = useVocalPitch(audioBuffer, 48000, {
    targetFrequency: mode === "match" && target ? target : undefined,
    accuracyCents: 15,
  });

  const toggleMic = () => {
    if (listening) stopAudioCapture();
    else requestMicrophone();
  };

  // Rendered on the server too. Every value on the first pass is a
  // deterministic constant and the browser APIs live in effects and
  // handlers, so the markup matches. Gating on a mount effect kept this
  // whole tool out of the initial HTML until hydration finished.
  return (
    <div className="mx-auto w-full max-w-3xl px-4 sm:px-6">
      {/* Status + mic control */}
      <div className="mb-5 flex flex-col items-center justify-between gap-3 sm:flex-row">
        <div className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/40 px-4 py-2 backdrop-blur-md">
          <span
            className={cn(
              "h-2 w-2 rounded-full",
              listening
                ? "animate-pulse bg-in-tune shadow-[0_0_8px_var(--in-tune)]"
                : "bg-line-strong",
            )}
          />
          <span className="font-mono text-2xs font-medium uppercase tracking-wider text-ink-muted">
            {listening ? "Listening" : "Microphone off"}
          </span>
        </div>

        <Button
          onClick={toggleMic}
          disabled={!isSupported}
          className={cn(
            "h-11 w-full rounded-full px-6 text-xs font-bold uppercase tracking-wider sm:w-auto",
            listening
              ? "border border-off/40 bg-off/20 text-off hover:bg-off/30"
              : "bg-brass text-brass-contrast shadow-lg shadow-brass/15 hover:bg-brass-hover",
          )}
        >
          {listening ? (
            <span className="inline-flex items-center gap-2">
              <MicOff className="h-4 w-4" /> Stop
            </span>
          ) : (
            <span className="inline-flex items-center gap-2">
              <Mic className="h-4 w-4" /> Start microphone
            </span>
          )}
        </Button>
      </div>

      {!isSupported && (
        <p className="mb-5 rounded-xl border border-off/30 bg-off/10 p-4 text-center text-sm text-ink">
          This browser does not support the Web Audio API needed for live pitch
          detection. Try a recent version of Chrome, Firefox, Safari, or Edge.
        </p>
      )}
      {audio.permission === "denied" && (
        <p className="mb-5 rounded-xl border border-off/30 bg-off/10 p-4 text-center text-sm text-ink">
          Microphone access was blocked. Allow it for this site in your browser
          settings, then press Start again. Audio is processed on your device and
          never uploaded.
        </p>
      )}

      <PitchReadout
        noteName={pitch.noteName}
        octave={pitch.octave}
        frequency={pitch.frequency}
        cents={pitch.cents}
        inTune={pitch.inTune}
        detected={pitch.detected}
        referenceLabel={
          mode === "match" && target ? `Offset shown against ${targetLabel}` : undefined
        }
      />

      {/* Mode selector */}
      <div className="mt-5 flex rounded-full border border-line bg-surface-sunken/60 p-1">
        {MODES.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => setMode(m.id)}
            className={cn(
              "flex-1 rounded-full py-2 text-xs font-bold uppercase tracking-wider transition-colors",
              mode === m.id
                ? "bg-brass text-brass-contrast shadow-md shadow-brass/20"
                : "text-ink-muted hover:text-ink",
            )}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className="mt-5">
        {mode === "trail" && (
          <PitchTrail
            midi={pitch.midi}
            detected={pitch.detected}
            inTune={pitch.inTune}
          />
        )}
        {mode === "range" && (
          <RangeFinder
            midi={pitch.midi}
            detected={pitch.detected}
            clarity={pitch.clarity}
          />
        )}
        {mode === "match" && (
          <PitchMatch
            target={target}
            onSelectTarget={(f, label) => {
              setTarget(f);
              setTargetLabel(label);
            }}
            cents={pitch.cents}
            detected={pitch.detected}
          />
        )}
      </div>

      {!listening && (
        <p className="mt-6 text-center text-xs text-ink-subtle">
          Press <span className="font-semibold text-ink">Start microphone</span>{" "}
          and sing or hum a steady note about an arm&apos;s length from your
          device.
        </p>
      )}
    </div>
  );
}
