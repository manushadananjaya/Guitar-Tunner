import { RootShell } from "@/components/RootShell";
import { siteMetadata, siteViewport } from "@/lib/siteMetadata";
import type { Locale } from "@/lib/i18n/tuner";

export const metadata = siteMetadata;
export const viewport = siteViewport;

const LANGS: Locale[] = ["pt", "fr", "de"];

export const dynamicParams = false;

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

/** Root layout for Portuguese, French and German, with the right
 *  <html lang> for each. */
export default async function LocalizedLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  const locale = LANGS.includes(lang as Locale) ? (lang as Locale) : "en";
  return <RootShell lang={locale}>{children}</RootShell>;
}
