import type { Metadata } from "next";
import { EmbedTuner } from "@/components/EmbedTuner";
import {
  GUITAR_TYPES,
  TUNING_PRESETS,
  clampReferencePitch,
} from "@/lib/tuningPresets";
import { LOCALES, type Locale } from "@/lib/i18n/tuner";

// The widget is a frame on other people's sites. Keep it out of the index —
// the full pages are the ones that should rank — but let its link count.
export const metadata: Metadata = {
  title: "Tuner Widget",
  robots: { index: false, follow: true },
  alternates: { canonical: "/embed-tuner" },
};

type Params = Record<string, string | string[] | undefined>;

const first = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;

/** Options come from the iframe's query string, as written by the builder on
 *  /embed-tuner. Anything unrecognised falls back to a default rather than
 *  erroring, since a typo in someone's pasted snippet should still work. */
export default async function EmbedTunerPage({
  searchParams,
}: {
  searchParams: Promise<Params>;
}) {
  const params = await searchParams;
  const instrument = first(params.instrument) ?? "sixString";
  const guitarType = instrument in GUITAR_TYPES ? instrument : "sixString";
  const tuningParam = first(params.tuning) ?? "standard";
  const tuning =
    guitarType === "sixString" && tuningParam in TUNING_PRESETS
      ? tuningParam
      : "standard";
  const langParam = first(params.lang) as Locale | undefined;
  const locale: Locale =
    langParam && LOCALES.includes(langParam) ? langParam : "en";
  const a4 = Number(first(params.a4));
  const referencePitch = a4 ? clampReferencePitch(a4) : undefined;
  // ?theme= is read by ThemeProvider, which can force it without saving.

  return (
    <EmbedTuner
      guitarType={guitarType}
      tuning={tuning}
      locale={locale}
      referencePitch={referencePitch}
    />
  );
}
