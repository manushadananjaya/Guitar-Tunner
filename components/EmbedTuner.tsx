"use client";

import { ProfessionalTuner } from "@/components/Tuner/ProfessionalTuner";
import type { Locale } from "@/lib/i18n/tuner";

const SITE_URL = "https://www.guitartunepro.com";

const POWERED_BY: Record<Locale, string> = {
  en: "Free online tuner by",
  es: "Afinador gratis de",
};

export interface EmbedTunerProps {
  guitarType: string;
  tuning: string;
  locale: Locale;
  referencePitch?: number;
}

/** The tuner as it appears inside someone else's page: compact layout, and
 *  a visible credit link that opens the full site in a new tab. */
export function EmbedTuner({
  guitarType,
  tuning,
  locale,
  referencePitch,
}: EmbedTunerProps) {

  return (
    <div className="flex min-h-screen flex-col pt-1">
      <ProfessionalTuner
        compact
        initialGuitarType={guitarType}
        initialTuning={tuning}
        initialReference={referencePitch}
        locale={locale}
      />
      <p className="mt-auto pb-3 text-center text-2xs text-ink-subtle">
        {POWERED_BY[locale]}{" "}
        <a
          href={SITE_URL}
          target="_blank"
          rel="noopener"
          className="font-semibold text-brass hover:underline"
        >
          GuitarTunePro
        </a>
      </p>
    </div>
  );
}
