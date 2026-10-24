import { Metadata } from "next";
import Link from "next/link";
import { Flame } from "lucide-react";
import { parseStreakParams, streakQuery, streakTitle } from "@/lib/streakShare";

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

/** Landing page for a shared streak. The numbers are in the URL, so the
 *  page is noindex — every streak would otherwise be its own thin page. */
export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const query = await searchParams;
  const params = parseStreakParams((key) => query[key]);
  const title = streakTitle(params.days);
  const description =
    "A daily guitar practice routine with a streak to keep — new chords, a scale and a strumming pattern every day. Free, in your browser, no sign-up.";
  const image = `/share/streak/image?${streakQuery(params)}`;
  return {
    title,
    description,
    // Self-canonical without the query; a canonical pointing elsewhere would
    // contradict the noindex.
    alternates: { canonical: "/share/streak" },
    robots: { index: false, follow: true },
    openGraph: {
      title: `${title} on GuitarTunePro`,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: `${title} — GuitarTunePro` }],
    },
  };
}

export default async function SharedStreakPage({ searchParams }: Props) {
  const query = await searchParams;
  const params = parseStreakParams((key) => query[key]);
  const image = `/share/streak/image?${streakQuery(params)}`;

  return (
    <main className="min-h-screen bg-canvas text-ink pb-20">
      <div className="max-w-3xl mx-auto px-5 pt-10 sm:pt-14 text-center">
        <p className="eyebrow inline-flex items-center gap-1.5 mb-4">
          <Flame className="h-3.5 w-3.5 text-brass" />
          Shared practice streak
        </p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4">
          {params.days > 0
            ? `Someone has practised guitar ${params.days} day${params.days === 1 ? "" : "s"} in a row`
            : "Start a guitar practice streak"}
        </h1>
        <p className="text-ink-muted text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
          They used the free daily routine on GuitarTunePro: a new chord change,
          scale and strumming pattern each day, plus ear training and fretboard
          drills that all count toward the streak.
        </p>

        {/* eslint-disable-next-line @next/next/no-img-element -- generated PNG, already the right size */}
        <img
          src={image}
          alt={`${streakTitle(params.days)} card`}
          width={1200}
          height={630}
          className="mt-8 w-full h-auto rounded-2xl border border-line shadow-2xl"
        />

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/practice-routine"
            className="rounded-full bg-brass px-6 py-3 text-sm font-bold text-brass-contrast hover:bg-brass-hover transition-colors"
          >
            Start your own streak
          </Link>
          <Link
            href="/daily-challenge"
            className="rounded-full border border-line-strong bg-surface/60 px-6 py-3 text-sm font-semibold text-ink hover:border-brass/50 hover:text-brass transition-colors"
          >
            Try today&apos;s ear challenge
          </Link>
          <Link
            href="/"
            className="rounded-full border border-line-strong bg-surface/60 px-6 py-3 text-sm font-semibold text-ink hover:border-brass/50 hover:text-brass transition-colors"
          >
            Tune your guitar first
          </Link>
        </div>
        <p className="mt-6 text-2xs text-ink-subtle">
          Streaks are kept in each player&apos;s own browser. GuitarTunePro has no
          accounts and stores nothing about you.
        </p>
      </div>
    </main>
  );
}
