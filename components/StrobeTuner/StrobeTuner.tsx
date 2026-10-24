"use client";

import React, { useEffect, useRef, useState } from "react";
import { Mic, MicOff, ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Segmented } from "@/components/Segmented";
import { useAudioCapture } from "@/hooks/useAudioCapture";
import { useVocalPitch } from "@/hooks/useVocalPitch";
import { REFERENCE_PITCH_PRESETS } from "@/lib/tuningPresets";

/** Pixels per second of band movement per cent of error. At 6, a string 1
 *  cent off creeps visibly; 10 cents is a brisk drift; 50 cents is a blur,
 *  which is the cue to use the numbers instead. */
const PX_PER_CENT = 6;

/** Stripe width per band, widest first. The finer bands show the same error
 *  as faster-looking motion, the way a mechanical strobe's upper rings do. */
const BANDS = [48, 24, 12];
const BAND_HEIGHT = 34;
const BAND_GAP = 8;

/** Under this many cents the bands are treated as stopped and turn green. */
const STILL_CENTS = 1;

function cssVar(name: string, fallback: string) {
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return value || fallback;
}

export function StrobeTuner() {
  const [audioBuffer, setAudioBuffer] = useState<Float32Array | null>(null);
  const [a4, setA4] = useState(440);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const { state: audio, requestMicrophone, stopAudioCapture, isSupported } = useAudioCapture({
    // The longer window the main tuner uses: steadier on low strings, which
    // is where strobe bands rocked most.
    fftSize: 8192,
    onDataAvailable: setAudioBuffer,
  });
  const listening = audio.isActive;

  // Guitar and bass range, chromatic, no octave guard: players move between
  // strings an octave apart, and the guard would hold the old one.
  const pitch = useVocalPitch(audioBuffer, 48000, {
    minFrequency: 24,
    maxFrequency: 1400,
    octaveGuard: false,
    referencePitch: a4,
    // Heavier than the vocal tool: a strobe is read on a sustained note, and
    // jitter shows up as the bands rocking. snapCents keeps string changes
    // instant regardless.
    smoothingFactor: 0.85,
    snapCents: 60,
    accuracyCents: STILL_CENTS,
  });

  // The animation loop reads the latest reading from a ref rather than
  // re-rendering the canvas through React 60 times a second.
  const reading = useRef({ cents: 0, detected: false });
  useEffect(() => {
    reading.current = { cents: pitch.cents, detected: pitch.detected && listening };
  }, [pitch.cents, pitch.detected, listening]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frame = 0;
    let last = performance.now();
    let offset = 0;
    let colors = { stripe: "#8a5610", ground: "#e3d9c7", still: "#2a6f3d" };
    let colorCheck = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = canvas.clientWidth;
      const height = BANDS.length * BAND_HEIGHT + (BANDS.length - 1) * BAND_GAP;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    // roundRect is missing from older Safari; square corners are fine there.
    const band = (y: number, width: number) => {
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(0, y, width, BAND_HEIGHT, 8);
      else ctx.rect(0, y, width, BAND_HEIGHT);
    };

    const draw = (now: number) => {
      const dt = Math.min(0.1, (now - last) / 1000);
      last = now;
      // Re-read theme colours a few times a second, so toggling dark mode
      // takes effect without a remount.
      if (now - colorCheck > 500) {
        colorCheck = now;
        colors = {
          stripe: cssVar("--accent", colors.stripe),
          ground: cssVar("--surface-sunken", colors.ground),
          still: cssVar("--in-tune", colors.still),
        };
      }

      const { cents, detected } = reading.current;
      if (detected) offset += cents * PX_PER_CENT * dt;
      const still = detected && Math.abs(cents) < STILL_CENTS;
      const width = canvas.clientWidth;

      ctx.clearRect(0, 0, width, canvas.height);
      BANDS.forEach((stripe, i) => {
        const y = i * (BAND_HEIGHT + BAND_GAP);
        ctx.globalAlpha = 1;
        ctx.fillStyle = colors.ground;
        band(y, width);
        ctx.fill();

        ctx.save();
        band(y, width);
        ctx.clip();
        ctx.globalAlpha = detected ? 1 : 0.25;
        ctx.fillStyle = still ? colors.still : colors.stripe;
        const period = stripe * 2;
        const shift = ((offset % period) + period) % period;
        for (let x = shift - period; x < width; x += period) {
          ctx.fillRect(x, y, stripe, BAND_HEIGHT);
        }
        ctx.restore();
      });

      frame = requestAnimationFrame(draw);
    };
    frame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  const detected = pitch.detected && listening;
  const cents = pitch.cents;
  const still = detected && Math.abs(cents) < STILL_CENTS;
  const direction = !detected || still ? null : cents > 0 ? "sharp" : "flat";

  return (
    <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 flex flex-col gap-5">
      {/* Status + mic control */}
      <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
        <div className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/40 px-4 py-2 backdrop-blur-md">
          <span
            className={cn(
              "h-2 w-2 rounded-full",
              listening ? "animate-pulse bg-in-tune shadow-[0_0_8px_var(--in-tune)]" : "bg-line-strong",
            )}
          />
          <span className="font-mono text-2xs font-medium uppercase tracking-wider text-ink-muted">
            {listening ? "Listening" : "Microphone off"}
          </span>
        </div>
        <Button
          onClick={() => (listening ? stopAudioCapture() : requestMicrophone())}
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
        <p className="rounded-xl border border-off/30 bg-off/10 p-4 text-center text-sm text-ink">
          This browser does not support the Web Audio API needed for live pitch detection. Try a recent
          version of Chrome, Firefox, Safari, or Edge.
        </p>
      )}
      {audio.permission === "denied" && (
        <p className="rounded-xl border border-off/30 bg-off/10 p-4 text-center text-sm text-ink">
          Microphone access was blocked. Allow it for this site in your browser settings, then press Start
          again. Audio is processed on your device and never uploaded.
        </p>
      )}

      <div className="rounded-3xl border border-line bg-surface-sunken/30 p-6 sm:p-8 backdrop-blur-md shadow-2xl">
        {/* Readout */}
        <div className="flex items-end justify-between gap-4 mb-6">
          <div>
            <p className="eyebrow">Note</p>
            <p className="text-6xl font-bold text-ink leading-none mt-1 font-mono" aria-live="polite">
              {detected ? pitch.noteName : "—"}
              {detected && <sub className="text-2xl text-ink-subtle font-normal">{pitch.octave}</sub>}
            </p>
          </div>
          <div className="text-right">
            <p className="eyebrow">Offset</p>
            <p
              className={cn(
                "text-3xl font-bold font-mono tabular-nums mt-1",
                !detected ? "text-ink-subtle" : still ? "text-in-tune" : Math.abs(cents) < 5 ? "text-near" : "text-off",
              )}
            >
              {detected ? `${cents >= 0 ? "+" : "−"}${Math.abs(cents).toFixed(1)}¢` : "—"}
            </p>
            <p className="text-xs font-mono text-ink-muted tabular-nums mt-1">
              {detected ? `${pitch.frequency.toFixed(2)} Hz` : " "}
            </p>
          </div>
        </div>

        <canvas
          ref={canvasRef}
          className="block w-full"
          style={{ height: BANDS.length * BAND_HEIGHT + (BANDS.length - 1) * BAND_GAP }}
          role="img"
          aria-label={
            !detected
              ? "Strobe display, idle"
              : still
                ? "Strobe bands stopped: in tune"
                : `Strobe bands drifting ${cents > 0 ? "right: sharp" : "left: flat"}`
          }
        />

        <div className="mt-4 flex items-center justify-between text-xs font-semibold" aria-hidden="true">
          <span className={cn("inline-flex items-center gap-1", direction === "flat" ? "text-off" : "text-ink-subtle")}>
            <ArrowLeft className="h-3.5 w-3.5" /> Flat — tune up
          </span>
          <span className={cn(still ? "text-in-tune" : "text-ink-subtle")}>Still = in tune</span>
          <span className={cn("inline-flex items-center gap-1", direction === "sharp" ? "text-off" : "text-ink-subtle")}>
            Sharp — tune down <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>

      <div className="rounded-2xl border border-line bg-surface/40 p-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="eyebrow">Concert pitch (A4)</p>
          <p className="text-xs text-ink-muted mt-1">Every note is judged against this.</p>
        </div>
        <Segmented<number>
          label="Concert pitch"
          value={a4}
          onChange={setA4}
          items={REFERENCE_PITCH_PRESETS.map((hz) => ({ value: hz, label: `${hz} Hz` }))}
        />
      </div>
    </div>
  );
}
