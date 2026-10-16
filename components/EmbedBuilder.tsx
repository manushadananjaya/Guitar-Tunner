"use client";

import { useMemo, useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  GUITAR_TYPES,
  TUNING_PRESETS,
  clampReferencePitch,
} from "@/lib/tuningPresets";
import { INSTRUMENT_PAGES } from "@/lib/instrumentPages";
import { TUNER_PAGES } from "@/lib/tunerPages";
import { LOCALES, type Locale } from "@/lib/i18n/tuner";

const SITE_URL = "https://www.guitartunepro.com";

const LANGUAGE_NAMES: Record<Locale, string> = {
  en: "English",
  es: "Español",
};

/** The page the credit link points at: the dedicated page for the chosen
 *  instrument or tuning when there is one, so the link is relevant. */
function creditHref(guitarType: string, tuning: string) {
  const instrument = INSTRUMENT_PAGES.find((p) => p.guitarType === guitarType);
  if (instrument) return instrument.href;
  const tuner = TUNER_PAGES.find((p) => p.tuning === tuning && !p.reference);
  if (guitarType === "sixString" && tuner) return tuner.href;
  return "/";
}

const fieldClass =
  "h-11 w-full rounded-xl border border-line bg-surface/60 px-3 text-sm text-ink focus:border-brass focus:outline-none";

export function EmbedBuilder() {
  const [guitarType, setGuitarType] = useState("sixString");
  const [tuning, setTuning] = useState("standard");
  const [lang, setLang] = useState<Locale>("en");
  const [theme, setTheme] = useState<"auto" | "light" | "dark">("auto");
  const [a4, setA4] = useState(440);
  const [height, setHeight] = useState(600);
  const [copied, setCopied] = useState(false);

  const query = useMemo(() => {
    const params = new URLSearchParams();
    if (guitarType !== "sixString") params.set("instrument", guitarType);
    if (guitarType === "sixString" && tuning !== "standard")
      params.set("tuning", tuning);
    if (lang !== "en") params.set("lang", lang);
    if (theme !== "auto") params.set("theme", theme);
    if (a4 !== 440) params.set("a4", String(a4));
    const qs = params.toString();
    return qs ? `?${qs}` : "";
  }, [guitarType, tuning, lang, theme, a4]);

  const snippet = useMemo(() => {
    const label =
      lang === "es" ? "Afinador gratis de" : "Free online tuner by";
    return [
      `<iframe src="${SITE_URL}/embed/tuner${query}" title="GuitarTunePro tuner" width="100%" height="${height}" style="max-width:480px;border:0;border-radius:16px" allow="microphone" loading="lazy"></iframe>`,
      `<p style="max-width:480px;margin:6px 0 0;font:13px/1.4 sans-serif;text-align:center">${label} <a href="${SITE_URL}${creditHref(guitarType, tuning)}">GuitarTunePro</a></p>`,
    ].join("\n");
  }, [query, height, lang, guitarType, tuning]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(snippet);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked; the code is selectable in the box below.
    }
  };

  return (
    <div className="mx-auto grid w-full max-w-5xl gap-8 px-5 lg:grid-cols-[1fr_480px]">
      <div className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="space-y-1.5">
            <span className="text-2xs font-semibold uppercase tracking-[0.18em] text-ink-subtle">
              Instrument
            </span>
            <select
              className={fieldClass}
              value={guitarType}
              onChange={(e) => {
                setGuitarType(e.target.value);
                setTuning("standard");
              }}
            >
              {Object.values(GUITAR_TYPES).map((type) => (
                <option key={type.name} value={type.name}>
                  {type.displayName}
                </option>
              ))}
            </select>
          </label>
          <label className="space-y-1.5">
            <span className="text-2xs font-semibold uppercase tracking-[0.18em] text-ink-subtle">
              Tuning
            </span>
            <select
              className={fieldClass}
              value={tuning}
              disabled={guitarType !== "sixString"}
              onChange={(e) => setTuning(e.target.value)}
            >
              {Object.entries(TUNING_PRESETS).map(([key, preset]) => (
                <option key={key} value={key}>
                  {preset.name}
                </option>
              ))}
            </select>
          </label>
          <label className="space-y-1.5">
            <span className="text-2xs font-semibold uppercase tracking-[0.18em] text-ink-subtle">
              Language
            </span>
            <select
              className={fieldClass}
              value={lang}
              onChange={(e) => setLang(e.target.value as Locale)}
            >
              {LOCALES.map((locale) => (
                <option key={locale} value={locale}>
                  {LANGUAGE_NAMES[locale]}
                </option>
              ))}
            </select>
          </label>
          <label className="space-y-1.5">
            <span className="text-2xs font-semibold uppercase tracking-[0.18em] text-ink-subtle">
              Theme
            </span>
            <select
              className={fieldClass}
              value={theme}
              onChange={(e) =>
                setTheme(e.target.value as "auto" | "light" | "dark")
              }
            >
              <option value="auto">Match visitor&apos;s device</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </label>
          <label className="space-y-1.5">
            <span className="text-2xs font-semibold uppercase tracking-[0.18em] text-ink-subtle">
              Reference pitch (A4, Hz)
            </span>
            <input
              type="number"
              className={fieldClass}
              value={a4}
              min={415}
              max={466}
              onChange={(e) => setA4(Number(e.target.value) || 440)}
              onBlur={() => setA4(clampReferencePitch(a4))}
            />
          </label>
          <label className="space-y-1.5">
            <span className="text-2xs font-semibold uppercase tracking-[0.18em] text-ink-subtle">
              Height (px)
            </span>
            <input
              type="number"
              className={fieldClass}
              value={height}
              min={480}
              max={900}
              step={10}
              onChange={(e) => setHeight(Number(e.target.value) || 600)}
            />
          </label>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-2xs font-semibold uppercase tracking-[0.18em] text-ink-subtle">
              Embed code
            </span>
            <button
              type="button"
              onClick={copy}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold transition-colors",
                copied
                  ? "bg-in-tune text-white"
                  : "bg-brass text-brass-contrast hover:bg-brass-hover",
              )}
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5" /> Copied
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" /> Copy code
                </>
              )}
            </button>
          </div>
          <textarea
            readOnly
            value={snippet}
            rows={6}
            onFocus={(e) => e.currentTarget.select()}
            aria-label="Embed code"
            className="w-full resize-none rounded-xl border border-line bg-surface-sunken/60 p-3 font-mono text-xs leading-relaxed text-ink"
          />
        </div>
      </div>

      <div>
        <p className="mb-2 text-2xs font-semibold uppercase tracking-[0.18em] text-ink-subtle">
          Live preview
        </p>
        <iframe
          key={query}
          src={`/embed/tuner${query}`}
          title="Tuner widget preview"
          allow="microphone"
          className="w-full rounded-2xl border border-line bg-canvas"
          style={{ height }}
        />
      </div>
    </div>
  );
}
