"use client";

import React, { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { SIX_STRING_TUNINGS, getMidiTuning, midiNoteName } from "@/lib/tuningMidi";
import {
  STRING_SETS,
  SCALE_LENGTHS,
  tensionLb,
  lbToKg,
  midiToHz,
  defaultKind,
  closestGauge,
  formatGauge,
  type StringKind,
} from "@/lib/stringTension";

const STRING_COUNT = 6;
const CUSTOM_SCALE = "custom";

interface Row {
  string: number;
  note: string;
  hz: number;
  gauge: number;
  kind: StringKind;
  tension: number;
  /** Tension this string would carry in standard tuning at this scale. */
  reference: number;
  /** Stocked gauge that restores the reference tension in the chosen tuning. */
  suggested: number;
}

/** Tension as a share of standard, described the way players talk about it. */
function feel(ratio: number): { label: string; tone: string } {
  if (ratio < 0.8) return { label: "very slack", tone: "text-off" };
  if (ratio < 0.92) return { label: "slack", tone: "text-near" };
  if (ratio <= 1.08) return { label: "normal", tone: "text-in-tune" };
  if (ratio <= 1.2) return { label: "tight", tone: "text-near" };
  return { label: "very tight", tone: "text-off" };
}

export function StringTensionCalculator() {
  const [tuningKey, setTuningKey] = useState("standard");
  const [setKey, setSetKey] = useState("e10");
  const [scaleChoice, setScaleChoice] = useState("25.5");
  const [customScale, setCustomScale] = useState("25.5");
  const [gauges, setGauges] = useState<number[]>(
    STRING_SETS.find((s) => s.key === "e10")!.gauges,
  );
  const [kinds, setKinds] = useState<StringKind[]>(
    STRING_SETS.find((s) => s.key === "e10")!.gauges.map(defaultKind),
  );
  /** The set the player is used to. "vs. standard" and the gauge suggestions
   *  are measured against this set in standard tuning, so loading suggested
   *  gauges is judged against the original feel rather than against itself. */
  const [baseline, setBaseline] = useState<number[]>(
    STRING_SETS.find((s) => s.key === "e10")!.gauges,
  );
  const [unit, setUnit] = useState<"lb" | "kg">("lb");

  const scale =
    scaleChoice === CUSTOM_SCALE
      ? Math.min(Math.max(Number(customScale) || 25.5, 20), 32)
      : Number(scaleChoice);

  const tuning = getMidiTuning(tuningKey);
  const standard = getMidiTuning("standard");

  const applySet = (key: string) => {
    const set = STRING_SETS.find((s) => s.key === key);
    if (!set) return;
    setSetKey(key);
    setGauges(set.gauges);
    setBaseline(set.gauges);
    setKinds(set.gauges.map(defaultKind));
  };

  const setGauge = (i: number, value: string) => {
    const gauge = Number(value) / 1000;
    if (!Number.isFinite(gauge) || gauge <= 0 || gauge > 0.1) return;
    setGauges((g) => g.map((x, j) => (j === i ? gauge : x)));
    setKinds((k) => k.map((x, j) => (j === i ? defaultKind(gauge) : x)));
    setSetKey("");
  };

  const rows = useMemo<Row[]>(
    () =>
      gauges.map((gauge, i) => {
        const hz = midiToHz(tuning.midi[i]);
        const refHz = midiToHz(standard.midi[i]);
        const reference = tensionLb(baseline[i], defaultKind(baseline[i]), scale, refHz);
        return {
          string: STRING_COUNT - i,
          note: midiNoteName(tuning.midi[i]),
          hz,
          gauge,
          kind: kinds[i],
          tension: tensionLb(gauge, kinds[i], scale, hz),
          reference,
          suggested: closestGauge(kinds[i], scale, hz, reference),
        };
      }),
    [gauges, kinds, baseline, scale, tuning, standard],
  );

  const total = rows.reduce((sum, r) => sum + r.tension, 0);
  const totalReference = rows.reduce((sum, r) => sum + r.reference, 0);
  const overall = feel(total / totalReference);
  const suggestionDiffers = rows.some((r) => r.suggested !== r.gauge);
  const fmt = (lb: number) => (unit === "lb" ? lb : lbToKg(lb)).toFixed(1);

  const selectClass =
    "w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm font-medium text-ink focus:outline-none focus:ring-2 focus:ring-brass/40";

  // Rendered on the server too. Every value on the first pass is a
  // deterministic constant and the browser APIs live in effects and
  // handlers, so the markup matches. Gating on a mount effect kept this
  // whole tool out of the initial HTML until hydration finished.
  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 flex flex-col gap-5">
      {/* Inputs */}
      <div className="grid gap-4 sm:grid-cols-3 rounded-3xl border border-line bg-surface-sunken/30 p-5 sm:p-6">
        <label className="flex flex-col gap-1.5">
          <span className="eyebrow">Tuning</span>
          <select value={tuningKey} onChange={(e) => setTuningKey(e.target.value)} className={selectClass}>
            {SIX_STRING_TUNINGS.map((t) => (
              <option key={t.key} value={t.key}>
                {t.name} — {t.notes}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="eyebrow">String set</span>
          <select value={setKey} onChange={(e) => applySet(e.target.value)} className={selectClass}>
            {setKey === "" && <option value="">Custom gauges</option>}
            {(["Electric", "Acoustic"] as const).map((category) => (
              <optgroup key={category} label={category}>
                {STRING_SETS.filter((s) => s.category === category).map((s) => (
                  <option key={s.key} value={s.key}>
                    {s.name}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </label>

        <div className="flex flex-col gap-1.5">
          <label className="flex flex-col gap-1.5">
            <span className="eyebrow">Scale length</span>
            <select value={scaleChoice} onChange={(e) => setScaleChoice(e.target.value)} className={selectClass}>
              {SCALE_LENGTHS.map((s) => (
                <option key={s.inches} value={String(s.inches)}>
                  {s.label}
                </option>
              ))}
              <option value={CUSTOM_SCALE}>Custom…</option>
            </select>
          </label>
          {scaleChoice === CUSTOM_SCALE && (
            <label className="flex items-center gap-2 text-sm text-ink-muted">
              <input
                type="number"
                min={20}
                max={32}
                step={0.125}
                value={customScale}
                onChange={(e) => setCustomScale(e.target.value)}
                aria-label="Custom scale length in inches"
                className="w-24 rounded-lg border border-line bg-surface px-3 py-1.5 text-sm text-ink tabular-nums"
              />
              inches
            </label>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="rounded-3xl border border-line bg-surface-sunken/30 p-5 sm:p-6 backdrop-blur-md shadow-2xl">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-5">
          <div>
            <p className="eyebrow mb-1">Total tension</p>
            <p className="text-4xl sm:text-5xl font-bold tracking-tight text-ink tabular-nums leading-none">
              {fmt(total)}
              <span className="text-lg font-semibold text-ink-subtle ml-1.5">{unit}</span>
            </p>
            <p className={cn("mt-2 text-sm font-semibold", overall.tone)}>
              {Math.round((100 * total) / totalReference)}% of your set in standard tuning — {overall.label}
            </p>
          </div>
          <div role="group" aria-label="Units" className="flex gap-1 rounded-xl border border-line bg-surface/40 p-1">
            {(["lb", "kg"] as const).map((u) => (
              <button
                key={u}
                type="button"
                aria-pressed={unit === u}
                onClick={() => setUnit(u)}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors",
                  unit === u ? "bg-brass text-brass-contrast" : "text-ink-muted hover:text-ink",
                )}
              >
                {u}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto -mx-1 px-1">
          <table className="w-full text-sm min-w-[560px]">
            <thead>
              <tr className="text-left text-2xs uppercase tracking-wider text-ink-subtle">
                <th className="pb-2 pr-3 font-semibold">String</th>
                <th className="pb-2 pr-3 font-semibold">Note</th>
                <th className="pb-2 pr-3 font-semibold">Gauge</th>
                <th className="pb-2 pr-3 font-semibold">Type</th>
                <th className="pb-2 pr-3 font-semibold text-right">Tension</th>
                <th className="pb-2 pr-3 font-semibold text-right">vs. standard</th>
                <th className="pb-2 font-semibold">Feel</th>
              </tr>
            </thead>
            <tbody className="tabular-nums">
              {[...rows].reverse().map((row, idx) => {
                const i = STRING_COUNT - 1 - idx;
                const ratio = row.tension / row.reference;
                const f = feel(ratio);
                return (
                  <tr key={row.string} className="border-t border-line/60">
                    <td className="py-2 pr-3 text-ink-muted">{row.string}</td>
                    <td className="py-2 pr-3 font-semibold text-ink">
                      {row.note}
                      <span className="block text-2xs font-normal text-ink-subtle">{row.hz.toFixed(2)} Hz</span>
                    </td>
                    <td className="py-2 pr-3">
                      <span className="inline-flex items-center gap-0.5">
                        <span className="text-ink-subtle">.</span>
                        <input
                          type="number"
                          inputMode="decimal"
                          min={7}
                          max={80}
                          step={0.5}
                          value={Number((row.gauge * 1000).toFixed(1))}
                          onChange={(e) => setGauge(i, e.target.value)}
                          aria-label={`String ${row.string} gauge in thousandths of an inch`}
                          className="w-16 rounded-md border border-line bg-surface px-2 py-1 text-sm text-ink"
                        />
                      </span>
                    </td>
                    <td className="py-2 pr-3">
                      <button
                        type="button"
                        onClick={() =>
                          setKinds((k) => k.map((x, j) => (j === i ? (x === "plain" ? "wound" : "plain") : x)))
                        }
                        className="rounded-full border border-line px-2.5 py-0.5 text-2xs font-semibold text-ink-muted hover:border-brass/40 hover:text-brass transition-colors"
                        aria-label={`String ${row.string} is ${row.kind}; click to toggle`}
                      >
                        {row.kind}
                      </button>
                    </td>
                    <td className="py-2 pr-3 text-right font-semibold text-ink">{fmt(row.tension)}</td>
                    <td className={cn("py-2 pr-3 text-right", f.tone)}>
                      {ratio >= 1 ? "+" : ""}
                      {Math.round((ratio - 1) * 100)}%
                    </td>
                    <td className={cn("py-2 text-xs font-semibold", f.tone)}>{f.label}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recommendation */}
      <div className="rounded-3xl border border-line bg-surface/40 p-5 sm:p-6">
        <p className="eyebrow mb-2">
          {suggestionDiffers ? "Gauges that restore standard-tuning feel" : "Balanced for this tuning"}
        </p>
        {suggestionDiffers ? (
          <>
            <p className="text-sm text-ink-muted leading-relaxed mb-4">
              For {tuning.name} at {scale}&Prime;, these single-string gauges bring each
              string back to the tension it carries in standard tuning with your current set.
              Changed strings are highlighted.
            </p>
            <div className="flex flex-wrap gap-2">
              {[...rows].reverse().map((row) => (
                <div
                  key={row.string}
                  className={cn(
                    "rounded-xl border px-3 py-2 text-center min-w-[4.5rem]",
                    row.suggested !== row.gauge ? "border-brass/50 bg-brass/10" : "border-line",
                  )}
                >
                  <p className="text-2xs text-ink-subtle">{row.note}</p>
                  <p className="font-mono font-bold text-ink">.{formatGauge(row.suggested)}</p>
                  {row.suggested !== row.gauge && (
                    <p className="text-2xs text-ink-subtle line-through">.{formatGauge(row.gauge)}</p>
                  )}
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => {
                setGauges(rows.map((r) => r.suggested));
                setSetKey("");
              }}
              className="mt-4 inline-flex items-center rounded-full border border-line-strong bg-surface/60 px-4 py-2 text-sm font-semibold text-ink hover:border-brass/50 hover:text-brass transition-colors"
            >
              Load these gauges
            </button>
          </>
        ) : (
          <p className="text-sm text-ink-muted leading-relaxed">
            Every string is within one stocked gauge of its standard-tuning tension. This set already
            suits {tuning.name} at this scale length.
          </p>
        )}
      </div>
    </div>
  );
}
