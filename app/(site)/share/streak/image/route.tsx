import { parseStreakParams, streakOgImage } from "@/lib/og/streak";

/** PNG for a shared practice streak: /share/streak/image?d=14&b=21&m=18 */
export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const image = await streakOgImage(parseStreakParams((key) => params.get(key)));
  image.headers.set("Cache-Control", "public, max-age=86400, immutable");
  return image;
}
