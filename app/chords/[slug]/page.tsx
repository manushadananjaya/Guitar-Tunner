import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import ChordDiagram from "@/components/Chords/ChordDiagram";
import { ChordPlayer } from "@/components/Chords/ChordPlayer";
import {
  CHORDS,
  getChord,
  relatedChords,
  fingeringMidiNotes,
  keysContaining,
  sameNotesAs,
  parentChord,
} from "@/lib/chords";

/** Well-known progressions, keyed by the numeral this chord occupies. */
const PROGRESSIONS: Record<string, { pattern: string; note: string }[]> = {
  I: [
    { pattern: "I – V – vi – IV", note: "the most common progression in pop" },
    { pattern: "I – IV – V", note: "the backbone of blues and early rock" },
  ],
  ii: [
    { pattern: "ii – V – I", note: "the central cadence in jazz" },
    { pattern: "I – vi – ii – V", note: "the 1950s doo-wop turnaround" },
  ],
  iii: [{ pattern: "I – iii – IV – V", note: "a bright, lifting movement" }],
  IV: [
    { pattern: "I – IV – V", note: "the backbone of blues and early rock" },
    { pattern: "vi – IV – I – V", note: "the pop-punk staple" },
  ],
  V: [
    { pattern: "ii – V – I", note: "the central cadence in jazz" },
    { pattern: "V – I", note: "the strongest resolution in tonal music" },
  ],
  vi: [
    { pattern: "vi – IV – I – V", note: "the pop-punk staple" },
    { pattern: "I – V – vi – IV", note: "the most common progression in pop" },
  ],
  "vii°": [
    { pattern: "vii° – I", note: "a tense chord resolving straight home" },
  ],
};

const SITE_URL = "https://www.guitartunepro.com";

export function generateStaticParams() {
  return CHORDS.map((chord) => ({ slug: chord.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const chord = getChord(slug);
  if (!chord) return {};

  const noteList = chord.notes.map((note) => note.name).join(" – ");
  // The root layout's metadata template appends "| GuitarTunePro".
  const title = `${chord.ascii} Chord — How to Play ${chord.name} on Guitar`;
  const description = `Learn the ${chord.name} guitar chord. ${chord.voicings.length} voicing${
    chord.voicings.length === 1 ? "" : "s"
  } with diagrams and audio. Notes: ${noteList}.`;

  return {
    title,
    description,
    alternates: { canonical: `/chords/${chord.slug}` },
    openGraph: { title: `${chord.ascii} Guitar Chord`, description },
  };
}

export default async function ChordPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const chord = getChord(slug);
  if (!chord) notFound();

  const related = relatedChords(chord);
  const openVoicing = chord.voicings.find((v) => v.label === "Open position");
  const keys = keysContaining(chord.root, chord.quality);
  // Deduplicate progressions across the numerals this chord occupies.
  const progressions = [
    ...new Map(
      keys
        .flatMap((k) => PROGRESSIONS[k.numeral] ?? [])
        .map((p) => [p.pattern, p]),
    ).values(),
  ].slice(0, 3);
  const twins = sameNotesAs(chord);
  const parent = parentChord(chord);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Guitar Chords",
        item: `${SITE_URL}/chords`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `${chord.ascii} chord`,
        item: `${SITE_URL}/chords/${chord.slug}`,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-canvas text-ink pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-brass/0 dark:bg-brass/10 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-brass/0 dark:bg-brass/10 blur-[120px]" />
      </div>

      <main className="relative z-10 max-w-4xl mx-auto px-5 pt-8 sm:pt-10">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-1.5 text-xs text-ink-subtle mb-5"
        >
          <Link href="/" className="hover:text-brass transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/chords" className="hover:text-brass transition-colors">
            Chords
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-ink-muted">{chord.name}</span>
        </nav>

        <h1 className="text-4xl sm:text-5xl font-bold text-ink leading-tight mb-3">
          {chord.name} <span className="text-ink-subtle">chord</span>
        </h1>
        <p className="text-ink-muted text-base sm:text-lg leading-relaxed max-w-2xl mb-2">
          {chord.quality.character}
        </p>
        <p className="text-sm text-ink-subtle">
          {chord.root.name} {chord.quality.name} ·{" "}
          {chord.voicings.length} voicing
          {chord.voicings.length === 1 ? "" : "s"}
        </p>

        {/* Notes table */}
        <section className="mt-10" aria-labelledby="notes-heading">
          <h2 id="notes-heading" className="text-xl font-bold text-ink mb-4">
            Notes in {chord.name}
          </h2>
          <div className="flex flex-wrap gap-2.5">
            {chord.notes.map((note) => (
              <div
                key={note.interval}
                className="rounded-xl border border-line bg-surface/40 px-4 py-2.5"
              >
                <div className="text-lg font-bold text-brass">
                  {note.name}
                </div>
                <div className="text-2xs uppercase tracking-wider text-ink-subtle">
                  {note.interval}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Voicings */}
        <section className="mt-12" aria-labelledby="voicings-heading">
          <h2
            id="voicings-heading"
            className="text-xl font-bold text-ink mb-5"
          >
            How to Play {chord.name}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {chord.voicings.map((voicing, i) => (
              <div
                key={i}
                className="rounded-2xl border border-line bg-surface/30 p-5 flex flex-col items-center"
              >
                <ChordDiagram
                  voicing={voicing}
                  title={`${chord.ascii} chord, ${voicing.label}`}
                  className="w-full max-w-[150px] h-auto"
                />
                <p className="mt-3 text-sm font-semibold text-ink text-center">
                  {voicing.label}
                </p>
                <p className="mt-1 font-mono text-xs text-ink-subtle">
                  {voicing.frets
                    .map((fret) => (fret === null ? "x" : fret))
                    .join(" ")}
                </p>
                <ChordPlayer
                  notes={fingeringMidiNotes(voicing.frets)}
                  label={`${chord.ascii}, ${voicing.label}`}
                  className="mt-3"
                />
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-ink-subtle">
            Numbers under each diagram are frets, string 6 (thickest) to string
            1. <span className="font-mono">x</span>{" "}
            means don&apos;t play that string;{" "}
            <span className="font-mono">0</span> means play it open.
          </p>
        </section>

        {/* Where the chord lives musically — computed per chord, so this
            section says something different on every page. */}
        {keys.length > 0 && (
          <section className="mt-12" aria-labelledby="keys-heading">
            <h2 id="keys-heading" className="text-xl font-bold text-ink mb-4">
              Where {chord.name} Is Used
            </h2>
            <p className="text-ink-muted leading-relaxed mb-5">
              {chord.name} occurs naturally in{" "}
              {keys.length === 1 ? "one major key" : `${keys.length} major keys`}
              . Its roman numeral tells you the job it does in each — the same
              chord feels like home in one key and like tension in another.
            </p>
            <div className="overflow-x-auto rounded-xl border border-line mb-6">
              <table className="w-full text-sm">
                <thead className="bg-surface/60 text-ink-muted">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold">
                      Key
                    </th>
                    <th className="px-4 py-3 text-left font-semibold">
                      Degree
                    </th>
                    <th className="px-4 py-3 text-left font-semibold">
                      Role
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {keys.map((k) => (
                    <tr key={k.key} className="bg-surface/20">
                      <td className="px-4 py-3 font-semibold text-ink">
                        {k.key} major
                      </td>
                      <td className="px-4 py-3 font-mono text-brass">
                        {k.numeral}
                      </td>
                      <td className="px-4 py-3 text-ink-muted">
                        {k.numeral === "I"
                          ? "Tonic — the home chord"
                          : k.numeral === "V"
                            ? "Dominant — pulls back to the tonic"
                            : k.numeral === "IV"
                              ? "Subdominant — moves away from home"
                              : k.numeral === "vi"
                                ? "Relative minor — the darker centre"
                                : k.numeral === "ii"
                                  ? "Pre-dominant — sets up the V"
                                  : k.numeral === "iii"
                                    ? "Mediant — a soft, in-between colour"
                                    : "Leading-tone — maximum tension"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {progressions.length > 0 && (
              <>
                <h3 className="text-lg font-bold text-ink mb-3">
                  Progressions featuring {chord.name}
                </h3>
                <ul className="space-y-2">
                  {progressions.map((p) => (
                    <li key={p.pattern} className="text-ink-muted">
                      <span className="font-mono font-semibold text-ink">
                        {p.pattern}
                      </span>{" "}
                      — {p.note}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </section>
        )}

        {/* Note-set relationships — computed, so this differs per chord and
            gives the non-diatonic qualities (sus, 6, add9, aug, power) real
            substance rather than boilerplate. */}
        {(twins.length > 0 || parent) && (
          <section className="mt-12" aria-labelledby="relations-heading">
            <h2
              id="relations-heading"
              className="text-xl font-bold text-ink mb-4"
            >
              How {chord.name} Relates to Other Chords
            </h2>

            {twins.length > 0 && (
              <p className="text-ink-muted leading-relaxed mb-4">
                {chord.name} contains exactly the same notes as{" "}
                {twins.map((t, i) => (
                  <span key={t.slug}>
                    {i > 0 && (i === twins.length - 1 ? " and " : ", ")}
                    <Link
                      href={`/chords/${t.slug}`}
                      className="text-brass hover:text-brass-hover transition-colors font-semibold"
                    >
                      {t.name}
                    </Link>
                  </span>
                ))}
                {twins.length === 1
                  ? " — the two are the same chord voiced from a different root, so one shape covers both."
                  : ". Augmented triads divide the octave evenly, so each one names three chords at once."}
              </p>
            )}

            {parent && (
              <p className="text-ink-muted leading-relaxed">
                It is built on{" "}
                <Link
                  href={`/chords/${parent.slug}`}
                  className="text-brass hover:text-brass-hover transition-colors font-semibold"
                >
                  {parent.name}
                </Link>
                {chord.quality.slug.startsWith("sus")
                  ? " with the third replaced, which is why it wants to resolve back to it."
                  : " with an extra note added on top, so it can stand in wherever that chord appears."}
              </p>
            )}
          </section>
        )}

        {/* Reading guidance */}
        <section className="mt-12 prose prose-invert prose-cyan max-w-none prose-headings:text-ink prose-p:text-ink prose-p:leading-[1.8] prose-a:text-brass prose-a:no-underline hover:prose-a:text-brass-hover prose-strong:text-ink">
          <h2 className="text-xl font-bold">
            Playing tips for {chord.name}
          </h2>
          {openVoicing ? (
            <p>
              {chord.name} has an open-position shape, which means some strings
              ring open and it is playable without barring. Press just behind
              the fret rather than on top of it, keep your fingertips arched so
              they do not deaden neighbouring strings, and strum only the
              strings the diagram marks as played.
            </p>
          ) : (
            <p>
              {chord.name} has no standard open-position shape, so every voicing
              here is movable — the same finger pattern works at any fret, and
              sliding it changes the chord&apos;s root. Barre with the flat edge
              of your index finger, slightly rolled toward the headstock, rather
              than the soft centre of the pad.
            </p>
          )}
          <p>
            If a string buzzes or sounds dead, the usual causes are a fingertip
            leaning against it, not quite enough pressure, or a finger too far
            behind the fret. Play each string one at a time to find which one is
            failing before adjusting the whole shape — and make sure your guitar
            is in tune first, since an out-of-tune string will make a correct
            shape sound wrong. Use our{" "}
            <Link href="/">free online tuner</Link> to check.
          </p>
        </section>

        {/* Related chords */}
        {related.length > 0 && (
          <section className="mt-14" aria-labelledby="related-heading">
            <h2
              id="related-heading"
              className="text-xl font-bold text-ink mb-5"
            >
              Related Chords
            </h2>
            <div className="flex flex-wrap gap-2.5">
              {related.map((other) => (
                <Link
                  key={other.slug}
                  href={`/chords/${other.slug}`}
                  className="rounded-full border border-line bg-surface/40 px-4 py-2 text-sm text-ink hover:border-brass/40 hover:text-brass transition-colors"
                >
                  {other.name}
                </Link>
              ))}
            </div>
          </section>
        )}

        <div className="mt-14 rounded-2xl border border-brass/30 bg-brass/5 p-6 sm:p-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-brass mb-2">
            Tune first
          </p>
          <p className="text-ink mb-5">
            Chord shapes only sound right on a guitar that is in tune. Check
            yours in a few seconds.
          </p>
          <Link
            href="/"
            className="inline-block bg-brass hover:bg-brass-hover text-brass-contrast font-bold px-6 py-3 rounded-full text-sm transition-colors"
          >
            Open the Free Guitar Tuner →
          </Link>
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/chords"
            className="text-sm text-brass hover:text-brass-hover transition-colors"
          >
            ← Browse all guitar chords
          </Link>
        </div>
      </main>
    </div>
  );
}
