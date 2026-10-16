import type { Metadata } from "next";
import { Fragment } from "react";
import TunerPageLayout from "@/components/TunerPageLayout";
import {
  GUITAR_TYPES,
  TUNING_PRESETS,
  getTuningForGuitar,
  scaleTuning,
} from "@/lib/tuningPresets";
import { frequencyToNote } from "@/lib/noteMap";
import {
  TUNER_TEXT,
  instrumentName,
  localNote,
  presetName,
} from "@/lib/i18n/tuner";
import {
  TRANSLATED_LOCALES,
  TRANSLATED_PAGES,
  languageAlternates,
  tunerConfigFor,
  type TranslatedLocale,
} from "@/lib/i18n/pages";
import { STEP_TEXT, formatHz } from "@/lib/i18n/pageText";
import { CONTENT, otherPagesFor } from "@/lib/i18n/content";
import type { Block } from "@/lib/i18n/content/types";

const SITE_URL = "https://www.guitartunepro.com";

function pathFor(locale: TranslatedLocale, enPath: string) {
  return TRANSLATED_PAGES.find((page) => page.en === enPath)![locale];
}

/** "**bold**" → <strong>. The only markup page copy uses. */
function rich(text: string) {
  return text
    .split("**")
    .map((part, i) =>
      i % 2 === 1 ? <strong key={i}>{part}</strong> : <Fragment key={i}>{part}</Fragment>,
    );
}

function renderBlock(block: Block, key: number) {
  if (typeof block === "string") return <p key={key}>{rich(block)}</p>;
  return (
    <ul key={key}>
      {block.list.map((item, i) => (
        <li key={i}>{rich(item)}</li>
      ))}
    </ul>
  );
}

export function localizedMetadata(
  locale: TranslatedLocale,
  enPath: string,
): Metadata {
  const copy = CONTENT[locale].pages[enPath];
  const path = pathFor(locale, enPath);
  return {
    title: copy.metaTitle,
    description: copy.metaDescription,
    alternates: { canonical: path, languages: languageAlternates(path) },
    openGraph: {
      title: copy.metaTitle,
      description: copy.metaDescription,
      url: `${SITE_URL}${path}`,
      locale: STEP_TEXT[locale].ogLocale,
      alternateLocale: [
        "en_US",
        ...TRANSLATED_LOCALES.filter((l) => l !== locale).map(
          (l) => STEP_TEXT[l].ogLocale,
        ),
      ],
    },
  };
}

/** One translated tuner page: the live tuner preset for the page, a
 *  generated how-to whose notes and frequencies come from the same tuning
 *  data the tuner listens for, then the page's own prose and FAQ. */
export default function LocalizedTunerPage({
  locale,
  enPath,
}: {
  locale: TranslatedLocale;
  enPath: string;
}) {
  const copy = CONTENT[locale].pages[enPath];
  const path = pathFor(locale, enPath);
  const config = tunerConfigFor(enPath);
  const reference = config.reference ?? 440;
  const steps = STEP_TEXT[locale];
  const t = TUNER_TEXT[locale];

  const tuning = scaleTuning(
    getTuningForGuitar(config.guitarType, config.tuning),
    reference,
  );
  // A 12-string is six courses of two; walk the courses, not the strings.
  const courses = config.guitarType === "twelveString";
  const targets = courses
    ? tuning.frequencies.filter((_, i) => i % 2 === 0)
    : tuning.frequencies;
  const name = (frequency: number) => {
    const note = frequencyToNote((frequency * 440) / reference);
    return localNote(`${note.name}${note.octave}`, locale);
  };
  const [first, ...rest] = targets;
  const configured = config.reference
    ? t.reference(config.reference)
    : config.guitarType === "sixString"
      ? presetName(config.tuning, TUNING_PRESETS[config.tuning].name, locale)
      : instrumentName(
          config.guitarType,
          GUITAR_TYPES[config.guitarType].displayName,
          locale,
        );

  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: `${copy.title} - GuitarTunePro`,
    url: `${SITE_URL}${path}`,
    inLanguage: locale,
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description: copy.metaDescription,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
      />
      <TunerPageLayout
        locale={locale}
        title={copy.title}
        description={copy.intro}
        canonicalPath={path}
        initialGuitarType={config.guitarType}
        initialTuning={config.tuning}
        initialReference={config.reference}
        chartMode={courses ? "courses" : "strings"}
        chartCaption={copy.chartCaption}
        otherTuners={otherPagesFor(path, locale)}
        faqs={copy.faqs}
      >
        <h2>{steps.heading}</h2>
        <ol>
          <li>{rich(steps.start(t.start))}</li>
          <li>{rich(steps.configured(configured))}</li>
          <li>
            {steps.first(targets.length, name(first), formatHz(first, locale))}
          </li>
          <li>
            {steps.rest(
              rest
                .map((f) => `${name(f)} (${formatHz(f, locale)} Hz)`)
                .join(", "),
            )}
          </li>
          <li>{steps.again}</li>
        </ol>

        {copy.sections.map((section, i) => (
          <Fragment key={i}>
            <h2>{section.heading}</h2>
            {section.body.map(renderBlock)}
          </Fragment>
        ))}
      </TunerPageLayout>
    </>
  );
}
