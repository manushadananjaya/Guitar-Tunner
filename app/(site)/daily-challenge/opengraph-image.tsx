import { OG_CONTENT_TYPE, OG_SIZE, dailyChallengeOgImage } from "@/lib/og/images";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "GuitarTunePro daily ear training challenge — 5 questions a day";

export default function Image() {
  return dailyChallengeOgImage();
}
