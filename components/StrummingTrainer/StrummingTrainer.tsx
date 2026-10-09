"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Play, Square, ArrowDown, ArrowUp, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { strumAt, mutedStrumAt, clickAt } from "@/lib/synth";
import { PATTERNS, getPattern, countLabels, PROGRESSIONS_FOR_STRUMMING } from "@/lib/strumming";
import { getChord } from "@/lib/chords";
import { chordMidi } from "@/lib/music/libraryChord";
import { logPractice } from "@/lib/practiceLog";
import { useLoopScheduler } from "@/hooks/useLoopScheduler";
import { Segmented, SelectField } from "@/components/Segmented";

export function StrummingTrainer() {
  const [patternId, setPatternId] = useState(PATTERNS[3].id);
  const [progressionId, setProgressionId] = useState(PROGRESSIONS_FOR_STRUMMING[0].id);
  const [bpm, setBpm] = useState(PATTERNS[3].bpm);
  const [click, setClick] = useState(true);
  const [barsPerChord, setBarsPerChord] = useState(1);

  const pattern = getPattern(patternId);
  const progression = PROGRESSIONS_FOR_STRUMMING.find((p) => p.id === progressionId)!;
  const chords = useMemo(() => progression.chords.map((slug) => getChord(slug)!), [progression]);
  const barLength = pattern.slots.length;
  const loopLength = barLength * barsPerChord * chords.length;
  const labels = countLabels(pattern);

  // Deep links from the practice routine: ?pattern=folk
  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("pattern");
    if (id && PATTERNS.some((p) => p.id === id)) {
      setPatternId(id);
      setBpm(getPattern(id).bpm);
    }
  }, []);

  const onSlot = useCallback(
    (slot: number, time: number, ctx: AudioContext) => {
      const inBar = slot % barLength;
      const bar = Math.floor(slot / barLength);
      const chord = chords[Math.floor(bar / barsPerChord) % chords.length];
      const stroke = pattern.slots[inBar];
      if (click && inBar % pattern.slotsPerBeat === 0) {
        clickAt(ctx, time, inBar === 0, 0.6);
      }
      const accent = inBar === 0 ? 1.15 : inBar % pattern.slotsPerBeat === 0 ? 1 : 0.85;
      if (stroke === "D") strumAt(ctx, chordMidi(chord), time, { direction: "down", gain: accent });
      else if (stroke === "U") strumAt(ctx, chordMidi(chord), time, { direction: "up", gain: accent });
      else if (stroke === "x") mutedStrumAt(ctx, time);
    },
    [barLength, chords, barsPerChord, pattern, click],
  );

  const { isPlaying, currentSlot, toggle, stop } = useLoopScheduler({
    bpm,
    slotsPerBeat: pattern.slotsPerBeat,
    loopLength,
    onSlot,
  });

  // Changing the grid mid-loop would misalign the bar; stop instead.
  useEffect(() => {
    stop();
  }, [patternId, barsPerChord, progressionId, stop]);

  const start = () => {
    if (!isPlaying) logPractice("strumming");
    toggle();
  };

  // Space toggles play.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && ["INPUT", "SELECT", "TEXTAREA", "BUTTON"].includes(target.tagName)) return;
      if (event.code === "Space") {
        event.preventDefault();
        start();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });

  const activeInBar = currentSlot >= 0 ? currentSlot % barLength : -1;
  const activeChordIndex =
    currentSlot >= 0 ? Math.floor(Math.floor(currentSlot / barLength) / barsPerChord) % chords.length : -1;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 flex flex-col gap-5">
      {/* Pattern picker */}
      <div className="flex flex-wrap gap-2">
        {PATTERNS.map((p) => (
          <button
            key={p.id}
            type="button"
            aria-pressed={p.id === patternId}
            onClick={() => {
              setPatternId(p.id);
              setBpm(p.bpm);
            }}
            className={cn(
              "rounded-xl border px-3 py-2 text-left transition-colors",
              p.id === patternId
                ? "border-brass bg-brass/10"
                : "border-line bg-surface/40 hover:border-brass/40",
            )}
          >
            <span className={cn("block text-sm font-semibold", p.id === patternId ? "text-brass" : "text-ink")}>{p.name}</span>
            <span className="block text-2xs text-ink-subtle">
              {p.level} · {p.beatsPerBar}/4 · {p.slotsPerBeat === 2 ? "8ths" : "16ths"}
            </span>
          </button>
        ))}
      </div>

      {/* Stage */}
      <div className="rounded-3xl border border-line bg-surface-sunken/30 p-5 sm:p-8 backdrop-blur-md shadow-2xl">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
          <div className="max-w-xl">
            <h2 className="text-xl sm:text-2xl font-bold text-ink">{pattern.name}</h2>
            <p className="mt-1 text-sm leading-relaxed text-ink-muted">{pattern.description}</p>
          </div>
          <button
            type="button"
            onClick={start}
            className={cn(
              "inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition-colors",
              isPlaying ? "bg-off/20 border border-off/40 text-off" : "bg-brass text-brass-contrast hover:bg-brass-hover",
            )}
          >
            {isPlaying ? <Square className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            {isPlaying ? "Stop" : "Play along"}
          </button>
        </div>

        {/* The pattern grid */}
        <div className="overflow-x-auto pb-1">
          <div
            className="grid gap-1.5 min-w-[520px]"
            style={{ gridTemplateColumns: `repeat(${barLength}, minmax(0, 1fr))` }}
            aria-label={`Pattern: ${pattern.slots.split("").join(" ")}`}
          >
            {[...pattern.slots].map((stroke, i) => {
              const active = i === activeInBar;
              const onBeat = i % pattern.slotsPerBeat === 0;
              return (
                <div key={i} className="flex flex-col items-center gap-1.5">
                  <div
                    className={cn(
                      "flex h-14 w-full items-center justify-center rounded-xl border transition-all duration-75",
                      stroke === "-"
                        ? "border-dashed border-line text-ink-subtle/50"
                        : active
                          ? "border-brass bg-brass text-brass-contrast scale-105"
                          : "border-line-strong bg-surface/60 text-ink",
                      stroke === "-" && active && "border-brass/60 bg-brass/10",
                    )}
                  >
                    {stroke === "D" && <ArrowDown className="h-6 w-6" strokeWidth={2.5} />}
                    {stroke === "U" && <ArrowUp className="h-5 w-5" strokeWidth={2.5} />}
                    {stroke === "x" && <X className="h-5 w-5" strokeWidth={3} />}
                    {stroke === "-" && <span className="text-lg">·</span>}
                  </div>
                  <span
                    className={cn(
                      "text-xs tabular-nums",
                      onBeat ? "font-bold text-ink" : "text-ink-subtle",
                      active && "text-brass",
                    )}
                  >
                    {labels[i]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        <p className="mt-3 text-2xs text-ink-subtle">
          ↓ down-strum · ↑ up-strum · ✕ muted chuck · dot = hand keeps moving, misses the strings. Space bar starts and stops.
        </p>

        {/* Chords */}
        <div className="mt-6 flex flex-wrap items-center gap-2">
          {chords.map((chord, i) => (
            <span
              key={i}
              className={cn(
                "rounded-xl border px-4 py-2 text-lg font-bold transition-colors",
                i === activeChordIndex ? "border-brass bg-brass/15 text-brass" : "border-line text-ink",
              )}
            >
              {chord.name}
            </span>
          ))}
        </div>
      </div>

      {/* Settings */}
      <div className="flex flex-wrap items-end gap-4">
        <label className="flex flex-col gap-1 min-w-[220px] flex-1 max-w-sm">
          <span className="eyebrow">Tempo · <span className="tabular-nums text-ink">{bpm} BPM</span></span>
          <input
            type="range"
            min={40}
            max={160}
            value={bpm}
            onChange={(e) => setBpm(Number(e.target.value))}
            className="accent-[var(--accent)]"
          />
        </label>
        <SelectField label="Chords" value={progressionId} onChange={setProgressionId}>
          {PROGRESSIONS_FOR_STRUMMING.map((p) => (
            <option key={p.id} value={p.id}>
              {p.label}
            </option>
          ))}
        </SelectField>
        <div className="flex flex-col gap-1">
          <span className="eyebrow">Change every</span>
          <Segmented<number>
            label="Bars per chord"
            value={barsPerChord}
            onChange={setBarsPerChord}
            items={[
              { value: 1, label: "1 bar" },
              { value: 2, label: "2 bars" },
            ]}
          />
        </div>
        <label className="inline-flex items-center gap-2 text-xs font-semibold text-ink-muted pb-2">
          <input type="checkbox" checked={click} onChange={(e) => setClick(e.target.checked)} className="accent-[var(--accent)]" />
          Click on the beat
        </label>
      </div>
    </div>
  );
}
