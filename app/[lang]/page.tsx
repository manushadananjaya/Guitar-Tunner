import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LocalizedTunerPage, {
  localizedMetadata,
} from "@/components/LocalizedTunerPage";
import type { TranslatedLocale } from "@/lib/i18n/pages";

/** Guitar tuner home for Portuguese, French and German. Spanish has its own
 *  hand-written route at app/es; every other path falls through to a 404. */
const LANGS = ["pt", "fr", "de"] as const;

export const dynamicParams = false;

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return localizedMetadata(lang as TranslatedLocale, "/");
}

export default async function LocalizedHome({ params }: Props) {
  const { lang } = await params;
  if (!(LANGS as readonly string[]).includes(lang)) notFound();
  return <LocalizedTunerPage locale={lang as TranslatedLocale} enPath="/" />;
}
