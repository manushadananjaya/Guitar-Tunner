"use client";

import { useEffect, useRef } from "react";
import { frequencyToNote, midiToFrequency } from "@/lib/noteMap";

interface PitchTrailProps {
  /** Fractional MIDI number of the current pitch, 0 when nothing is detected. */
  midi: number;
  detected: boolean;
  inTune: boolean;
}

interface Sample {
  t: number;
  midi: number;
  inTune: boolean;
}

const WINDOW_MS = 12_000;
const MIN_SPAN = 14; // semitones shown on the Y axis, at minimum

function cssVar(name: string, fallback: string): string {
  if (typeof window === "undefined") return fallback;
  const v = getComputedStyle(document.documentElement).getPropertyValue(name);
  return v.trim() || fallback;
}

function noteLabel(m: number): string {
  const n = frequencyToNote(midiToFrequency(m));
  return `${n.name}${n.octave}`;
}

export function PitchTrail({ midi, detected, inTune }: PitchTrailProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const samplesRef = useRef<Sample[]>([]);
  const latestRef = useRef({ midi, detected, inTune });
  latestRef.current = { midi, detected, inTune };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.round(rect.width * dpr));
      canvas.height = Math.max(1, Math.round(rect.height * dpr));
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const draw = () => {
      const now = Date.now();
      const { midi: m, detected: d, inTune: it } = latestRef.current;

      // Record a sample (a gap marker when unvoiced keeps the line broken)
      samplesRef.current.push({ t: now, midi: d && m > 0 ? m : 0, inTune: it });
      while (
        samplesRef.current.length > 0 &&
        samplesRef.current[0].t < now - WINDOW_MS - 200
      ) {
        samplesRef.current.shift();
      }

      const w = canvas.width;
      const h = canvas.height;
      const padL = 34 * dpr;
      const padR = 8 * dpr;
      const padY = 10 * dpr;

      const col = {
        bg: cssVar("--surface-sunken", "#120e0b"),
        line: cssVar("--border", "#382e25"),
        text: cssVar("--foreground-subtle", "#968878"),
        trail: cssVar("--accent", "#e0a340"),
        good: cssVar("--in-tune", "#5cc47c"),
      };

      ctx.clearRect(0, 0, w, h);

      // Y range: follow recent pitch, clamped to a sensible minimum span
      const voiced = samplesRef.current.filter((s) => s.midi > 0);
      let lo = 55;
      let hi = 69;
      if (voiced.length > 0) {
        lo = Math.min(...voiced.map((s) => s.midi));
        hi = Math.max(...voiced.map((s) => s.midi));
      }
      const mid = (lo + hi) / 2;
      const span = Math.max(MIN_SPAN, hi - lo + 6);
      lo = mid - span / 2;
      hi = mid + span / 2;

      const yFor = (mm: number) =>
        padY + (1 - (mm - lo) / (hi - lo)) * (h - 2 * padY);
      const xFor = (t: number) =>
        padL + (1 - (now - t) / WINDOW_MS) * (w - padL - padR);

      // Horizontal note gridlines
      ctx.lineWidth = dpr;
      ctx.font = `${11 * dpr}px ui-monospace, monospace`;
      ctx.textBaseline = "middle";
      for (let mm = Math.ceil(lo); mm <= Math.floor(hi); mm++) {
        const y = yFor(mm);
        const isC = ((mm % 12) + 12) % 12 === 0;
        ctx.strokeStyle = col.line;
        ctx.globalAlpha = isC ? 0.9 : 0.4;
        ctx.beginPath();
        ctx.moveTo(padL, y);
        ctx.lineTo(w - padR, y);
        ctx.stroke();
        ctx.globalAlpha = 1;
        if (isC || span <= 20) {
          ctx.fillStyle = col.text;
          ctx.fillText(noteLabel(mm), 4 * dpr, y);
        }
      }

      // Pitch trail
      ctx.lineWidth = 2.5 * dpr;
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      let drawing = false;
      ctx.beginPath();
      for (const s of samplesRef.current) {
        if (s.midi <= 0) {
          drawing = false;
          continue;
        }
        const x = xFor(s.t);
        const y = yFor(s.midi);
        if (!drawing) {
          ctx.moveTo(x, y);
          drawing = true;
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.strokeStyle = col.trail;
      ctx.stroke();

      // Current-pitch dot
      if (d && m > 0 && m >= lo && m <= hi) {
        const x = xFor(now);
        const y = yFor(m);
        ctx.fillStyle = it ? col.good : col.trail;
        ctx.beginPath();
        ctx.arc(x, y, 4.5 * dpr, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <div className="w-full">
      <canvas
        ref={canvasRef}
        className="h-56 w-full rounded-2xl border border-line bg-surface-sunken/40 sm:h-64"
      />
      <p className="mt-2 text-2xs text-ink-subtle">
        Your sung pitch over the last 12 seconds. Flat sections mean a steady
        note; wobble is vibrato or unsteady support. The dot turns green when
        you are within 15 cents of a note.
      </p>
    </div>
  );
}
