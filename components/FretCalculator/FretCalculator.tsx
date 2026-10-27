"use client";

import React, { useMemo, useState } from "react";
import { Check, Copy } from "lucide-react";
import { Segmented, SelectField } from "@/components/Segmented";
import { fretPosition } from "@/lib/fretPositions";

type Unit = "in" | "mm";

const MM_PER_INCH = 25.4;

/** Common scale lengths, stored in inches; metric-native ones are exact in mm. */
const SCALE_PRESETS: { label: string; inches: number }[] = [
  { label: 'Fender / Strat / Tele — 25.5"', inches: 25.5 },
  { label: 'Gibson / Les Paul — 24.75"', inches: 24.75 },
  { label: 'PRS — 25"', inches: 25 },
  { label: 'Short scale (Mustang, Jaguar) — 24"', inches: 24 },
  { label: "Classical guitar — 650 mm", inches: 650 / MM_PER_INCH },
  { label: 'Baritone guitar — 27"', inches: 27 },
  { label: 'Bass guitar — 34"', inches: 34 },
  { label: 'Short-scale bass — 30"', inches: 30 },
  { label: 'Tenor ukulele — 17"', inches: 17 },
  { label: 'Concert ukulele — 15"', inches: 15 },
  { label: 'Soprano ukulele — 13"', inches: 13 },
  { label: 'Mandolin — 13.875"', inches: 13.875 },
];

export function FretCalculator() {
  const [unit, setUnit] = useState<Unit>("in");
  const [scaleText, setScaleText] = useState("25.5");
  const [frets, setFrets] = useState(22);
  const [copied, setCopied] = useState(false);

  const scale = Number(scaleText.replace(",", "."));
  const valid = Number.isFinite(scale) && scale > 0 && scale < (unit === "in" ? 60 : 1500);
  const digits = unit === "in" ? 3 : 2;

  const rows = useMemo(() => {
    if (!valid) return [];
    return Array.from({ length: frets }, (_, i) => {
      const n = i + 1;
      const fromNut = fretPosition(scale, n);
      const previous = fretPosition(scale, n - 1);
      return { n, fromNut, spacing: fromNut - previous, toBridge: scale - fromNut };
    });
  }, [scale, frets, valid]);

  const changeUnit = (next: Unit) => {
    if (next === unit) return;
    if (valid) {
      const converted = next === "mm" ? scale * MM_PER_INCH : scale / MM_PER_INCH;
      setScaleText(String(Number(converted.toFixed(next === "mm" ? 1 : 3))));
    }
    setUnit(next);
  };

  const applyPreset = (index: string) => {
    const preset = SCALE_PRESETS[Number(index)];
    if (!preset) return;
    const value = unit === "mm" ? preset.inches * MM_PER_INCH : preset.inches;
    setScaleText(String(Number(value.toFixed(unit === "mm" ? 1 : 3))));
  };

  const copyCsv = async () => {
    const csv = [
      `fret,from nut (${unit}),from previous fret (${unit}),to bridge (${unit})`,
      ...rows.map((r) =>
        [r.n, r.fromNut.toFixed(digits), r.spacing.toFixed(digits), r.toBridge.toFixed(digits)].join(","),
      ),
    ].join("\n");
    try {
      await navigator.clipboard.writeText(csv);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked; the table itself can still be selected and copied.
    }
  };

  const twelfth = valid ? fretPosition(scale, 12) : 0;

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 flex flex-col gap-5">
      <div className="rounded-3xl border border-line bg-surface-sunken/30 p-5 sm:p-8 backdrop-blur-md shadow-2xl flex flex-col gap-5">
        <div className="flex flex-wrap items-end gap-3">
          <label className="flex flex-col gap-1">
            <span className="eyebrow">Scale length</span>
            <input
              type="text"
              inputMode="decimal"
              value={scaleText}
              onChange={(e) => setScaleText(e.target.value)}
              aria-invalid={!valid}
              className="w-32 rounded-xl border border-line-strong bg-surface/60 px-3 py-2 font-mono text-base text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass/60"
            />
          </label>
          <div className="flex flex-col gap-1">
            <span className="eyebrow">Units</span>
            <Segmented<Unit>
              label="Units"
              value={unit}
              onChange={changeUnit}
              items={[
                { value: "in", label: "Inches" },
                { value: "mm", label: "Millimetres" },
              ]}
            />
          </div>
          <SelectField label="Frets" value={String(frets)} onChange={(v) => setFrets(Number(v))}>
            {[12, 15, 18, 19, 20, 21, 22, 24, 27, 30, 36].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </SelectField>
          <SelectField label="Preset" value="" onChange={applyPreset}>
            <option value="">Choose an instrument…</option>
            {SCALE_PRESETS.map((preset, i) => (
              <option key={preset.label} value={i}>
                {preset.label}
              </option>
            ))}
          </SelectField>
        </div>

        {valid ? (
          <p className="text-sm text-ink-muted">
            The 12th fret sits at{" "}
            <strong className="font-mono text-ink">
              {twelfth.toFixed(digits)} {unit}
            </strong>{" "}
            — exactly half the scale length, which is the quickest way to check a
            measurement.
          </p>
        ) : (
          <p role="alert" className="text-sm text-off">
            Enter a scale length in {unit === "in" ? "inches, such as 25.5" : "millimetres, such as 648"}.
          </p>
        )}
      </div>

      {valid && (
        <div className="rounded-2xl border border-line bg-surface/40">
          <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3">
            <p className="eyebrow">
              {frets} frets on a {scaleText} {unit} scale
            </p>
            <button
              type="button"
              onClick={copyCsv}
              className="inline-flex items-center gap-1.5 rounded-full border border-line-strong px-3 py-1.5 text-xs font-semibold text-ink hover:border-brass/50 hover:text-brass transition-colors"
            >
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? "Copied" : "Copy as CSV"}
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-line text-left text-2xs uppercase tracking-widest text-ink-subtle">
                  <th scope="col" className="px-4 py-2.5 font-bold">Fret</th>
                  <th scope="col" className="px-4 py-2.5 text-right font-bold">From nut</th>
                  <th scope="col" className="px-4 py-2.5 text-right font-bold">From previous fret</th>
                  <th scope="col" className="px-4 py-2.5 text-right font-bold">To bridge</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr
                    key={row.n}
                    className={
                      row.n % 12 === 0
                        ? "border-b border-line bg-brass/10 last:border-0"
                        : "border-b border-line last:border-0"
                    }
                  >
                    <td className="px-4 py-2 font-semibold text-ink">{row.n}</td>
                    <td className="px-4 py-2 text-right font-mono tabular-nums text-ink">
                      {row.fromNut.toFixed(digits)}
                    </td>
                    <td className="px-4 py-2 text-right font-mono tabular-nums text-ink-muted">
                      {row.spacing.toFixed(digits)}
                    </td>
                    <td className="px-4 py-2 text-right font-mono tabular-nums text-ink-muted">
                      {row.toBridge.toFixed(digits)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
