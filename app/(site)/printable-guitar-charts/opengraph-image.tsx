import { OG_CONTENT_TYPE, OG_SIZE, printableOgImage } from "@/lib/og/images";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Free printable guitar charts — GuitarTunePro";

export default function Image() {
  return printableOgImage();
}
