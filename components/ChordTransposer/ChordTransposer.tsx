"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Minus, Plus, Copy, Check, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { strum } from "@/lib/synth";
import {
  extractChords,
  guessKey,
  transposeSheet,
  capoOptions,
  parseChord,
  type AccidentalPreference,
} from "@/lib/music/transpose";
import { keyName } from "@/lib/music/scales";
import { libraryChord, chordMidi } from "@/lib/music/libraryChord";
import ChordDiagram from "@/components/Chords/ChordDiagram";
import { Segmented, SelectField } from "@/components/Segmented";

const STORAGE_KEY = "gtp-transposer-draft";
const mod12 = (n: number) => ((n % 12) + 12) % 12;

/** Placeholder lyrics written for this page — paste your own song over it. */
const SAMPLE = `[Verse]
G              D
Paste your own chord sheet here
Em                C
Chords above the words stay lined up
G              D
Inline chords work too: [Em]like [C]this

[Chorus]
C        G        D        Em
| C  G/B  Am  D |  G  |`;

export function ChordTransposer() {
  const [text, setText] = useState(SAMPLE);
  const [semitones, setSemitones] = useState(0);
  const [preference, setPreference] = useState<AccidentalPreference>("auto");
  const [copied, setCopied] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Restore the last sheet — a convenience, so a refresh doesn't lose it.
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) setText(saved);
    } catch {
      // Storage blocked; start from the sample.
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, text);
    } catch {
      // Ignore.
    }
  }, [text, loaded]);

  const chords = useMemo(() => extractChords(text), [text]);
  const originalKey = useMemo(() => guessKey(chords), [chords]);
  const targetKey = originalKey
    ? { pitchClass: mod12(originalKey.pitchClass + semitones), mode: originalKey.mode }
    : undefined;

  const lines = useMemo(
    () => transposeSheet(text, { semitones, preference, targetKey, ascii: true }),
    // targetKey is derived from originalKey and semitones.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [text, semitones, preference, originalKey],
  );

  const transposedNames = useMemo(() => {
    const seen = new Set<string>();
    const out: string[] = [];
    for (const line of lines) {
      for (const seg of line) {
        if (seg.chord && !seen.has(seg.chord)) {
          seen.add(seg.chord);
          out.push(seg.chord);
        }
      }
    }
    return out;
  }, [lines]);

  const capo = useMemo(() => {
    const parsed = transposedNames.map((n) => parseChord(n)).filter((c) => c !== null);
    const options = capoOptions(parsed, 7);
    const current = options.find((o) => o.capo === 0);
    const best = options[0];
    return best && current && best.capo > 0 && best.score > current.score ? best : null;
  }, [transposedNames]);

  const plainText = lines.map((line) => line.map((s) => s.text).join("")).join("\n");

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(plainText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard blocked — the text is selectable anyway.
    }
  };

  const shift = (by: number) => setSemitones((s) => Math.max(-11, Math.min(11, s + by)));

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 flex flex-col gap-5">
      {/* Controls */}
      <div className="flex flex-wrap items-end gap-3">
        <div className="flex flex-col gap-1">
          <span className="eyebrow">Transpose</span>
          <div className="flex items-center gap-1 rounded-xl border border-line bg-surface/40 p-1">
            <button
              type="button"
              aria-label="Down a semitone"
              onClick={() => shift(-1)}
              className="rounded-lg p-2 text-ink hover:bg-surface-raised/60"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-24 text-center text-sm font-bold tabular-nums text-ink" aria-live="polite">
              {semitones > 0 ? `+${semitones}` : semitones} semitone{Math.abs(semitones) === 1 ? "" : "s"}
            </span>
            <button
              type="button"
              aria-label="Up a semitone"
              onClick={() => shift(1)}
              className="rounded-lg p-2 text-ink hover:bg-surface-raised/60"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>

        {originalKey && (
          <SelectField
            label="To key"
            value={String(mod12(originalKey.pitchClass + semitones))}
            onChange={(v) => {
              let diff = mod12(Number(v) - originalKey.pitchClass);
              if (diff > 6) diff -= 12; // shortest way round
              setSemitones(diff);
            }}
          >
            {Array.from({ length: 12 }, (_, pc) => (
              <option key={pc} value={pc}>
                {keyName(pc, originalKey.mode)}
              </option>
            ))}
          </SelectField>
        )}

        <div className="flex flex-col gap-1">
          <span className="eyebrow">Spelling</span>
          <Segmented<AccidentalPreference>
            label="Sharps or flats"
            value={preference}
            onChange={setPreference}
            items={[
              { value: "auto", label: "Auto" },
              { value: "sharps", label: "♯ Sharps" },
              { value: "flats", label: "♭ Flats" },
            ]}
          />
        </div>

        <button
          type="button"
          onClick={() => setSemitones(0)}
          className="inline-flex items-center gap-1.5 rounded-full border border-line-strong bg-surface/60 px-4 py-2 text-sm font-semibold text-ink hover:border-brass/50 hover:text-brass transition-colors"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Reset
        </button>
      </div>

      {originalKey && (
        <p className="text-sm text-ink-muted">
          Original key looks like <strong className="text-ink">{keyName(originalKey.pitchClass, originalKey.mode)}</strong>
          {originalKey.fit < 0.7 && <span className="text-ink-subtle"> (a rough guess — several chords sit outside it)</span>}
          {semitones !== 0 && targetKey && (
            <>
              {" "}→ now in <strong className="text-brass">{keyName(targetKey.pitchClass, targetKey.mode)}</strong>
            </>
          )}
          .
        </p>
      )}

      <div className="grid gap-4 lg:grid-cols-2">
        <label className="flex min-w-0 flex-col gap-2">
          <span className="eyebrow">Your chord sheet</span>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            spellCheck={false}
            rows={16}
            className="min-h-[22rem] w-full rounded-2xl border border-line-strong bg-surface/60 p-4 font-mono text-sm leading-relaxed text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass/60"
          />
        </label>
        <div className="flex min-w-0 flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="eyebrow">Transposed</span>
            <button
              type="button"
              onClick={copy}
              className="inline-flex items-center gap-1.5 rounded-full border border-line-strong bg-surface/60 px-3 py-1 text-xs font-semibold text-ink hover:border-brass/50 hover:text-brass transition-colors"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-in-tune" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <pre
            aria-label="Transposed chord sheet"
            className="min-h-[22rem] overflow-x-auto rounded-2xl border border-line bg-surface-sunken/30 p-4 font-mono text-sm leading-relaxed text-ink whitespace-pre"
          >
            {lines.map((line, i) => (
              <React.Fragment key={i}>
                {line.map((seg, j) =>
                  seg.chord ? (
                    <span key={j} className="font-bold text-brass">
                      {seg.text}
                    </span>
                  ) : (
                    <span key={j}>{seg.text}</span>
                  ),
                )}
                {"\n"}
              </React.Fragment>
            ))}
          </pre>
        </div>
      </div>

      {capo && (
        <div className="rounded-2xl border border-brass/30 bg-brass/5 px-5 py-4 text-sm text-ink">
          <strong>Easier with a capo:</strong> put it on fret {capo.capo} and play{" "}
          <span className="font-mono font-semibold">{capo.shapes.map((s) => s.name).join(" ")}</span> —
          it sounds identical.{" "}
          <Link href="/capo-calculator" className="text-brass font-semibold hover:text-brass-hover">
            Compare every capo position
          </Link>
          .
        </div>
      )}

      {transposedNames.length > 0 && (
        <div className="rounded-2xl border border-line bg-surface/40 p-5">
          <p className="eyebrow mb-4">Chords in this version — tap to hear</p>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
            {transposedNames.map((name) => {
              const parsed = parseChord(name);
              const chord = parsed ? libraryChord(parsed.rootPitch, parsed.suffix) : undefined;
              return (
                <div key={name} className="flex flex-col items-center gap-1">
                  {chord ? (
                    <>
                      <button
                        type="button"
                        onClick={() => strum(chordMidi(chord))}
                        aria-label={`Play ${name}`}
                        className={cn("w-full max-w-[110px] rounded-xl p-1 hover:bg-brass/5 transition-colors")}
                      >
                        <ChordDiagram voicing={chord.voicings[0]} title={`${name} chord diagram`} className="w-full text-ink" />
                      </button>
                      <Link href={`/chords/${chord.slug}`} className="text-sm font-bold text-ink hover:text-brass">
                        {name}
                      </Link>
                    </>
                  ) : (
                    <>
                      <div className="flex h-24 w-full max-w-[110px] items-center justify-center rounded-xl border border-dashed border-line text-2xs text-ink-subtle text-center px-2">
                        No diagram for this one yet
                      </div>
                      <span className="text-sm font-bold text-ink">{name}</span>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
