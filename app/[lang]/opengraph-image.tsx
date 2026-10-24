import { OG_CONTENT_TYPE, OG_SIZE, tunerOgImage } from "@/lib/og/images";
import type { Locale } from "@/lib/i18n/tuner";

export function generateStaticParams() {
  return ["pt", "fr", "de"].map((lang) => ({ lang }));
}

/** Language home page card (/pt, /fr, /de). */
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "GuitarTunePro";

export default async function Image({ params }: { params: Promise<{ lang: string }> }) {
  return tunerOgImage("/", (await params).lang as Locale);
}
