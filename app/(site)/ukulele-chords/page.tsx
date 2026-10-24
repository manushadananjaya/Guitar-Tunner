import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import ChordDiagram from "@/components/Chords/ChordDiagram";
import { ROOTS } from "@/lib/chords/theory";
import { UKE_CHORDS, UKE_QUALITIES, getUkeChord, isUkeChordIndexed } from "@/lib/ukulele/chords";

const SITE_URL = "https://www.guitartunepro.com";

export const metadata: Metadata = {
  title: "Ukulele Chords — Chart for Every Key",
  description:
    "Free ukulele chord chart for standard GCEA tuning: major, minor, 7th and more in every key, with diagrams, audio and up to three shapes per chord.",
  alternates: { canonical: "/ukulele-chords" },
  openGraph: {
    title: "Ukulele Chords — Diagrams and Audio for Every Key",
    description: "Major, minor, 7th, sus and more on ukulele, with the easiest shape first and every shape checked against the chord's notes.",
  },
};

/** The four-chord core of beginner ukulele, then the next four. */
const FIRST_CHORDS = ["c", "a-minor", "f", "g", "d", "e-minor", "a", "g-7"];

export default function UkuleleChordsPage() {
  const totalVoicings = UKE_CHORDS.reduce((n, c) => n + c.voicings.length, 0);
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Ukulele Chords", item: `${SITE_URL}/ukulele-chords` },
    ],
  };

  return (
    <div className="min-h-screen bg-canvas text-ink pb-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <main className="relative z-10 max-w-5xl mx-auto px-5 pt-8 sm:pt-10">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-ink-subtle mb-5">
          <Link href="/" className="hover:text-brass transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-ink-muted">Ukulele chords</span>
        </nav>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-ink leading-tight mb-3">Ukulele Chords</h1>
        <p className="text-ink-muted text-base sm:text-lg leading-relaxed max-w-2xl">
          {UKE_CHORDS.length} chords and {totalVoicings} shapes for soprano, concert and tenor ukulele in standard
          G C E A tuning. Each shape is worked out from the notes the chord must contain, so every diagram here
          sounds exactly the chord it names — with the easiest shape first.
        </p>

        <section className="mt-12" aria-labelledby="first-heading">
          <h2 id="first-heading" className="text-2xl font-bold text-ink mb-2">Start With These Eight</h2>
          <p className="text-ink-muted mb-6 max-w-2xl">
            C, Am, F and G alone play thousands of songs — they are the I, vi, IV and V of C major. D, Em, A and G7
            open up the keys of G and D.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {FIRST_CHORDS.map((slug) => {
              const chord = getUkeChord(slug);
              if (!chord) return null;
              return (
                <Link
                  key={slug}
                  href={`/ukulele-chords/${slug}`}
                  className="group rounded-2xl border border-line bg-surface/30 p-4 flex flex-col items-center hover:border-brass/40 hover:bg-surface-raised/40 transition-all"
                >
                  <ChordDiagram voicing={chord.voicings[0]} title={`${chord.ascii} ukulele chord diagram`} className="w-full max-w-[84px] h-auto" />
                  <span className="mt-2.5 text-sm font-bold text-ink group-hover:text-brass transition-colors">{chord.name}</span>
                  <span className="font-mono text-2xs text-ink-subtle">{chord.voicings[0].frets.join("")}</span>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="mt-16" aria-labelledby="browse-heading">
          <h2 id="browse-heading" className="text-2xl font-bold text-ink mb-2">Every Key</h2>
          <p className="text-ink-muted mb-6 max-w-2xl">
            The chords you will look up most, by root note. The number under each is its easiest shape, G string first.
          </p>
          <div className="space-y-6">
            {ROOTS.map((root) => {
              const chords = UKE_QUALITIES.map((q) =>
                getUkeChord(q.slug === "major" ? root.slug : `${root.slug}-${q.slug}`),
              ).filter((c): c is NonNullable<typeof c> => !!c);
              const common = chords.filter(isUkeChordIndexed);
              const more = chords.filter((c) => !isUkeChordIndexed(c));
              return (
                <div key={root.slug}>
                  <h3 className="text-lg font-bold text-ink mb-3">{root.name}</h3>
                  <div className="flex flex-wrap gap-2">
                    {common.map((c) => (
                      <Link
                        key={c.slug}
                        href={`/ukulele-chords/${c.slug}`}
                        className="rounded-xl border border-line bg-surface/40 px-3.5 py-2 hover:border-brass/40 transition-colors"
                      >
                        <span className="block text-sm font-bold text-ink">{c.name}</span>
                        <span className="block font-mono text-2xs text-ink-subtle">{c.voicings[0].frets.join("")}</span>
                      </Link>
                    ))}
                  </div>
                  {more.length > 0 && (
                    <details className="mt-2">
                      <summary className="cursor-pointer text-xs font-semibold text-brass hover:text-brass-hover">
                        {more.length} more {root.name} chords
                      </summary>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {more.map((c) => (
                          <Link
                            key={c.slug}
                            href={`/ukulele-chords/${c.slug}`}
                            className="rounded-full border border-line bg-surface/40 px-3 py-1.5 text-xs text-ink hover:border-brass/40 hover:text-brass transition-colors"
                          >
                            {c.name} <span className="font-mono text-ink-subtle">{c.voicings[0].frets.join("")}</span>
                          </Link>
                        ))}
                      </div>
                    </details>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        <section className="mt-16 max-w-3xl space-y-4 text-ink-muted leading-relaxed" aria-labelledby="read-heading">
          <h2 id="read-heading" className="text-2xl font-bold text-ink">Reading Ukulele Chord Diagrams</h2>
          <p>
            Diagrams show the fretboard as the ukulele faces you: the four strings run top to bottom, left to right
            as G, C, E and A, and the thick line at the top is the nut. A dot is where a finger goes; a curved bar
            across several strings is a barre with one finger. The shorthand under each chord — like{" "}
            <span className="font-mono text-ink">0003</span> for C — lists the fret for each string in the same
            order, with 0 for an open string.
          </p>
          <p>
            Standard tuning is <strong className="text-ink">reentrant</strong>: the G string is tuned above the C,
            not below it. That is why ukulele chords sound bright and close together, and why a shape that looks like
            a guitar chord usually is not one. Soprano, concert and tenor ukuleles all use these shapes. A{" "}
            <Link href="/baritone-ukulele-tuner" className="text-brass hover:text-brass-hover">baritone ukulele</Link>{" "}
            is tuned D G B E instead, and every chord page gives its baritone shape too.
          </p>
          <p>
            Tune before you judge a shape — use the <Link href="/ukulele-tuner" className="text-brass hover:text-brass-hover">ukulele tuner</Link>{" "}
            — and if you play guitar as well, the <Link href="/chords" className="text-brass hover:text-brass-hover">guitar chord library</Link>{" "}
            has the same chords on six strings.
          </p>
        </section>
      </main>
    </div>
  );
}
