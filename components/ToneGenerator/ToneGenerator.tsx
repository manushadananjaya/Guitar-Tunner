"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { Play, Square, Minus, Plus, Link2, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { getAudioContext } from "@/lib/synth";
import { Segmented } from "@/components/Segmented";
import { REFERENCE_PITCH_PRESETS, clampReferencePitch } from "@/lib/tuningPresets";

type Wave = "sine" | "triangle" | "square" | "sawtooth";

const MIN_HZ = 20;
const MAX_HZ = 20000;
const NOTE_NAMES = ["C", "C♯", "D", "D♯", "E", "F", "F♯", "G", "G♯", "A", "A♯", "B"];

/** Square and sawtooth carry far more energy in their harmonics than a sine
 *  at the same peak, so they are scaled down to sound roughly as loud. */
const WAVE_LEVEL: Record<Wave, number> = { sine: 1, triangle: 0.9, square: 0.35, sawtooth: 0.45 };

/** Standard tuning, string 6 to 1, as MIDI notes. */
const GUITAR_STRINGS = [
  { label: "E2", midi: 40 },
  { label: "A2", midi: 45 },
  { label: "D3", midi: 50 },
  { label: "G3", midi: 55 },
  { label: "B3", midi: 59 },
  { label: "E4", midi: 64 },
];

const clampHz = (hz: number) => Math.min(MAX_HZ, Math.max(MIN_HZ, hz));
const round2 = (hz: number) => Math.round(hz * 100) / 100;

// The slider is logarithmic: every octave gets the same width, as it does
// to the ear. Position 0–1000 maps onto 20 Hz–20 kHz.
const SLIDER_MAX = 1000;
const toSlider = (hz: number) => Math.round((SLIDER_MAX * Math.log(hz / MIN_HZ)) / Math.log(MAX_HZ / MIN_HZ));
const fromSlider = (pos: number) => MIN_HZ * Math.pow(MAX_HZ / MIN_HZ, pos / SLIDER_MAX);

const midiToHz = (midi: number, a4: number) => a4 * Math.pow(2, (midi - 69) / 12);

/** Nearest equal-tempered note at the given concert pitch, and how far off. */
function nearestNote(hz: number, a4: number) {
  const exact = 69 + 12 * Math.log2(hz / a4);
  const midi = Math.round(exact);
  return {
    midi,
    name: NOTE_NAMES[((midi % 12) + 12) % 12],
    octave: Math.floor(midi / 12) - 1,
    cents: Math.round((exact - midi) * 100),
  };
}

export function ToneGenerator() {
  const [frequency, setFrequency] = useState(440);
  const [draft, setDraft] = useState("440");
  const [wave, setWave] = useState<Wave>("sine");
  const [volume, setVolume] = useState(0.35);
  const [a4, setA4] = useState(440);
  const [playing, setPlaying] = useState(false);
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  const osc = useRef<OscillatorNode | null>(null);
  const amp = useRef<GainNode | null>(null);

  const level = useCallback((v: number, w: Wave) => v * v * 0.5 * WAVE_LEVEL[w], []);

  // Restore from the URL once, so a shared link plays the same tone.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const f = Number(params.get("f"));
    if (Number.isFinite(f) && f > 0) {
      setFrequency(round2(clampHz(f)));
      setDraft(String(round2(clampHz(f))));
    }
    const w = params.get("w");
    if (w && w in WAVE_LEVEL) setWave(w as Wave);
    const a = Number(params.get("a4"));
    if (Number.isFinite(a) && a > 0) setA4(clampReferencePitch(a));
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const params = new URLSearchParams();
    params.set("f", String(frequency));
    if (wave !== "sine") params.set("w", wave);
    if (a4 !== 440) params.set("a4", String(a4));
    window.history.replaceState(null, "", `?${params.toString()}`);
  }, [frequency, wave, a4, mounted]);

  const stop = useCallback(() => {
    const node = osc.current;
    const gain = amp.current;
    if (!node || !gain) return;
    const ctx = getAudioContext();
    const t = ctx.currentTime;
    // A short fade rather than a hard stop, which clicks.
    gain.gain.cancelScheduledValues(t);
    gain.gain.setTargetAtTime(0, t, 0.015);
    node.stop(t + 0.12);
    osc.current = null;
    amp.current = null;
    setPlaying(false);
  }, []);

  const start = useCallback(
    (hz: number) => {
      if (osc.current) return;
      const ctx = getAudioContext();
      const t = ctx.currentTime;
      const node = ctx.createOscillator();
      const gain = ctx.createGain();
      node.type = wave;
      node.frequency.setValueAtTime(hz, t);
      gain.gain.setValueAtTime(0.0001, t);
      gain.gain.exponentialRampToValueAtTime(Math.max(0.0001, level(volume, wave)), t + 0.03);
      node.connect(gain);
      gain.connect(ctx.destination);
      node.start(t);
      osc.current = node;
      amp.current = gain;
      setPlaying(true);
    },
    [wave, volume, level],
  );

  // Live changes glide rather than jump, so sweeping the slider does not
  // crackle.
  useEffect(() => {
    if (!osc.current) return;
    osc.current.frequency.setTargetAtTime(frequency, getAudioContext().currentTime, 0.01);
  }, [frequency]);

  useEffect(() => {
    if (osc.current) osc.current.type = wave;
  }, [wave]);

  useEffect(() => {
    if (!amp.current) return;
    amp.current.gain.setTargetAtTime(Math.max(0.0001, level(volume, wave)), getAudioContext().currentTime, 0.02);
  }, [volume, wave, level]);

  // Never leave a tone running after the page is gone.
  useEffect(() => () => stop(), [stop]);

  const set = useCallback((hz: number) => {
    const next = round2(clampHz(hz));
    setFrequency(next);
    setDraft(String(next));
  }, []);

  const toggle = useCallback(() => (playing ? stop() : start(frequency)), [playing, stop, start, frequency]);

  const playAt = (hz: number) => {
    set(hz);
    if (!osc.current) start(round2(clampHz(hz)));
  };

  // Space toggles; arrows nudge 1 Hz, or a semitone with Shift.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && ["INPUT", "SELECT", "TEXTAREA", "BUTTON"].includes(target.tagName)) return;
      if (event.key === " ") {
        event.preventDefault();
        toggle();
      } else if (event.key === "ArrowUp" || event.key === "ArrowDown") {
        event.preventDefault();
        const dir = event.key === "ArrowUp" ? 1 : -1;
        set(event.shiftKey ? frequency * Math.pow(2, dir / 12) : frequency + dir);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [toggle, set, frequency]);

  const share = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked: the URL bar already holds the link.
    }
  };

  const note = nearestNote(frequency, a4);
  const steps: { label: string; name: string; step: (hz: number, dir: 1 | -1) => number }[] = [
    { label: "Octave", name: "an octave", step: (hz, dir) => hz * Math.pow(2, dir) },
    { label: "Semitone", name: "a semitone", step: (hz, dir) => hz * Math.pow(2, dir / 12) },
    { label: "1 Hz", name: "1 Hz", step: (hz, dir) => hz + dir },
  ];
  // On a phone, two rows with matching columns (−Octave above +Octave);
  // from sm up, one symmetric row: −Octave … −1 Hz +1 Hz … +Octave.
  const DESKTOP_ORDER = ["sm:order-1", "sm:order-2", "sm:order-3", "sm:order-6", "sm:order-5", "sm:order-4"];
  const nudges = [
    ...steps.map((s) => ({ ...s, dir: -1 as const })),
    ...steps.map((s) => ({ ...s, dir: 1 as const })),
  ].map((s, i) => ({ ...s, order: DESKTOP_ORDER[i] }));

  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 flex flex-col gap-5">
      <div className="rounded-3xl border border-line bg-surface-sunken/30 p-6 sm:p-10 backdrop-blur-md shadow-2xl">
        {/* Readout */}
        <div className="text-center">
          <label htmlFor="tone-frequency" className="eyebrow">Frequency</label>
          <div className="mt-2 flex items-baseline justify-center gap-2">
            <input
              id="tone-frequency"
              type="number"
              inputMode="decimal"
              min={MIN_HZ}
              max={MAX_HZ}
              step="0.01"
              value={draft}
              onChange={(e) => {
                setDraft(e.target.value);
                const hz = Number(e.target.value);
                if (Number.isFinite(hz) && hz >= MIN_HZ && hz <= MAX_HZ) setFrequency(round2(hz));
              }}
              onBlur={() => set(Number(draft) || frequency)}
              // Sized to its digits (tabular figures are 1ch wide) so "Hz" sits beside the number.
              style={{ width: `${Math.max(3, draft.length) + 0.6}ch` }}
              className="max-w-full bg-transparent text-center text-5xl sm:text-6xl font-bold text-ink tabular-nums focus:outline-none focus:ring-2 focus:ring-brass/50 rounded-xl [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />
            <span className="text-2xl font-semibold text-ink-muted">Hz</span>
          </div>
          <p className="mt-2 text-sm text-ink-muted" aria-live="polite">
            Nearest note <span className="font-mono font-bold text-ink">{note.name}{note.octave}</span>
            {note.cents !== 0 && (
              <span className="font-mono tabular-nums"> {note.cents > 0 ? "+" : "−"}{Math.abs(note.cents)}¢</span>
            )}
            <span className="text-ink-subtle"> at A4 = {a4} Hz</span>
          </p>
        </div>

        {/* Slider */}
        <div className="mt-6">
          <input
            type="range"
            min={0}
            max={SLIDER_MAX}
            value={toSlider(frequency)}
            onChange={(e) => set(fromSlider(Number(e.target.value)))}
            aria-label="Frequency, logarithmic from 20 Hz to 20 kHz"
            className="w-full accent-[var(--accent)]"
          />
          <div className="flex justify-between text-2xs font-mono text-ink-subtle">
            {["20", "100", "1k", "10k", "20k"].map((t) => <span key={t}>{t}</span>)}
          </div>
        </div>

        {/* Nudge buttons */}
        {/* Two rows of three on a phone, one row of six on wider screens. */}
        <div className="mt-5 grid grid-cols-3 sm:grid-cols-6 gap-1.5">
          {nudges.map((s) => (
            <button
              key={`${s.dir}${s.label}`}
              type="button"
              aria-label={`${s.dir < 0 ? "Down" : "Up"} ${s.name}`}
              onClick={() => set(s.step(frequency, s.dir))}
              className={cn(s.order, "inline-flex items-center justify-center gap-1 rounded-lg border border-line-strong bg-surface/60 py-2 text-2xs sm:text-xs font-semibold text-ink hover:border-brass/50 hover:text-brass transition-colors")}
            >
              {s.dir < 0 ? <Minus className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
              {s.label}
            </button>
          ))}
        </div>

        {/* Play */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={toggle}
            className={cn(
              "inline-flex items-center gap-2 rounded-full px-8 py-3 text-sm font-bold transition-colors",
              playing ? "bg-off text-white hover:opacity-90" : "bg-brass text-brass-contrast hover:bg-brass-hover",
            )}
          >
            {playing ? <Square className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            {playing ? "Stop" : "Play tone"}
          </button>
          <button
            type="button"
            onClick={share}
            className="inline-flex items-center gap-1.5 rounded-full border border-line-strong bg-surface/60 px-4 py-2.5 text-sm font-semibold text-ink hover:border-brass/50 hover:text-brass transition-colors"
          >
            {copied ? <Check className="h-3.5 w-3.5" /> : <Link2 className="h-3.5 w-3.5" />}
            {copied ? "Link copied" : "Copy link to this tone"}
          </button>
        </div>
        <p className="mt-3 text-center text-2xs text-ink-subtle hidden sm:block">
          Space plays and stops · ↑ ↓ change 1 Hz · Shift + ↑ ↓ a semitone
        </p>

        {frequency > 12000 && (
          <p className="mt-4 rounded-xl border border-near/40 bg-near/10 px-4 py-2 text-xs text-ink">
            Many adults cannot hear above 12–15 kHz. If you hear nothing, do not turn the volume up to compensate.
          </p>
        )}
        {frequency < 60 && (
          <p className="mt-4 rounded-xl border border-line bg-surface/40 px-4 py-2 text-xs text-ink-muted">
            Phone and laptop speakers cannot reproduce much below 100 Hz. Use headphones or proper speakers to hear this.
          </p>
        )}
      </div>

      {/* Settings */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-line bg-surface/40 p-4">
          <p className="eyebrow mb-2">Waveform</p>
          <Segmented<Wave>
            label="Waveform"
            value={wave}
            onChange={setWave}
            items={[
              { value: "sine", label: "Sine" },
              { value: "triangle", label: "Triangle" },
              { value: "square", label: "Square" },
              { value: "sawtooth", label: "Sawtooth" },
            ]}
          />
          <label htmlFor="tone-volume" className="eyebrow mt-4 mb-2 block">Volume</label>
          <input
            id="tone-volume"
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="w-full accent-[var(--accent)]"
          />
        </div>
        <div className="rounded-2xl border border-line bg-surface/40 p-4">
          <p className="eyebrow mb-2">Concert pitch (A4)</p>
          <Segmented<number>
            label="Concert pitch"
            value={a4}
            onChange={setA4}
            items={REFERENCE_PITCH_PRESETS.map((hz) => ({ value: hz, label: `${hz}` }))}
          />
          <p className="mt-3 text-xs text-ink-muted leading-relaxed">
            Changes the note buttons and the nearest-note readout. 440 Hz is the modern standard; 442–443 Hz is common in European orchestras.
          </p>
        </div>
      </div>

      {/* Notes */}
      <div className="rounded-2xl border border-line bg-surface/40 p-4">
        <p className="eyebrow mb-3">Play a note</p>
        <div className="grid grid-cols-6 sm:grid-cols-12 gap-1.5">
          {NOTE_NAMES.map((name, pc) => {
            const octave = note.octave >= 0 && note.octave <= 8 ? note.octave : 4;
            const midi = 12 * (octave + 1) + pc;
            return (
              <button
                key={name}
                type="button"
                onClick={() => playAt(midiToHz(midi, a4))}
                aria-pressed={note.midi === midi && note.cents === 0}
                className={cn(
                  "rounded-lg border py-2 font-mono text-sm font-bold transition-colors",
                  note.midi === midi && note.cents === 0
                    ? "border-brass bg-brass text-brass-contrast"
                    : "border-line-strong bg-surface/60 text-ink hover:border-brass/50 hover:text-brass",
                )}
              >
                {name}
                {octave}
              </button>
            );
          })}
        </div>
        <p className="eyebrow mt-5 mb-3">Guitar strings, standard tuning</p>
        <div className="flex flex-wrap gap-2">
          {GUITAR_STRINGS.map((s, i) => (
            <button
              key={s.label}
              type="button"
              onClick={() => playAt(midiToHz(s.midi, a4))}
              className="rounded-full border border-line-strong bg-surface/60 px-4 py-2 text-sm font-semibold text-ink hover:border-brass/50 hover:text-brass transition-colors"
            >
              <span className="text-ink-subtle font-normal">{6 - i} · </span>
              {s.label} <span className="font-mono text-2xs text-ink-muted">{midiToHz(s.midi, a4).toFixed(2)}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
