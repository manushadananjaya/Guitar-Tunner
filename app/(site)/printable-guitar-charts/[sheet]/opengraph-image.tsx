import { OG_CONTENT_TYPE, OG_SIZE, printableOgImage } from "@/lib/og/images";
import { PRINTABLE_SHEETS } from "@/lib/printables";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Free printable guitar chart — GuitarTunePro";

export function generateStaticParams() {
  return PRINTABLE_SHEETS.map((sheet) => ({ sheet: sheet.slug }));
}

export default async function Image({ params }: { params: Promise<{ sheet: string }> }) {
  return printableOgImage((await params).sheet);
}
