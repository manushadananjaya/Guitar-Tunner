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
} from "@/lib/chords";

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
    <div className="min-h-screen bg-[#050510] text-zinc-300 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-900/10 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-900/10 blur-[120px]" />
      </div>

      <main className="relative z-10 max-w-4xl mx-auto px-5 pt-8 sm:pt-10">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-1.5 text-xs text-zinc-500 mb-5"
        >
          <Link href="/" className="hover:text-cyan-400 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/chords" className="hover:text-cyan-400 transition-colors">
            Chords
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-zinc-400">{chord.name}</span>
        </nav>

        <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-3">
          {chord.name} <span className="text-zinc-500">chord</span>
        </h1>
        <p className="text-zinc-400 text-base sm:text-lg leading-relaxed max-w-2xl mb-2">
          {chord.quality.character}
        </p>
        <p className="text-sm text-zinc-500">
          {chord.root.name} {chord.quality.name} ·{" "}
          {chord.voicings.length} voicing
          {chord.voicings.length === 1 ? "" : "s"}
        </p>

        {/* Notes table */}
        <section className="mt-10" aria-labelledby="notes-heading">
          <h2 id="notes-heading" className="text-xl font-bold text-white mb-4">
            Notes in {chord.name}
          </h2>
          <div className="flex flex-wrap gap-2.5">
            {chord.notes.map((note) => (
              <div
                key={note.interval}
                className="rounded-xl border border-zinc-800 bg-zinc-900/40 px-4 py-2.5"
              >
                <div className="text-lg font-bold text-cyan-400">
                  {note.name}
                </div>
                <div className="text-[11px] uppercase tracking-wider text-zinc-500">
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
            className="text-xl font-bold text-white mb-5"
          >
            How to Play {chord.name}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {chord.voicings.map((voicing, i) => (
              <div
                key={i}
                className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-5 flex flex-col items-center"
              >
                <ChordDiagram
                  voicing={voicing}
                  title={`${chord.ascii} chord, ${voicing.label}`}
                  className="w-full max-w-[150px] h-auto"
                />
                <p className="mt-3 text-sm font-semibold text-zinc-200 text-center">
                  {voicing.label}
                </p>
                <p className="mt-1 font-mono text-xs text-zinc-500">
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
          <p className="mt-4 text-xs text-zinc-500">
            Numbers under each diagram are frets, string 6 (thickest) to string
            1. <span className="font-mono">x</span> means don&apos;t play that
            string; <span className="font-mono">0</span> means play it open.
          </p>
        </section>

        {/* Reading guidance */}
        <section className="mt-12 prose prose-invert prose-cyan max-w-none prose-headings:text-white prose-p:text-zinc-300 prose-p:leading-[1.8] prose-a:text-cyan-400 prose-a:no-underline hover:prose-a:text-cyan-300 prose-strong:text-zinc-100">
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
              className="text-xl font-bold text-white mb-5"
            >
              Related Chords
            </h2>
            <div className="flex flex-wrap gap-2.5">
              {related.map((other) => (
                <Link
                  key={other.slug}
                  href={`/chords/${other.slug}`}
                  className="rounded-full border border-zinc-800 bg-zinc-900/40 px-4 py-2 text-sm text-zinc-300 hover:border-cyan-500/40 hover:text-cyan-400 transition-colors"
                >
                  {other.name}
                </Link>
              ))}
            </div>
          </section>
        )}

        <div className="mt-14 rounded-2xl border border-cyan-500/30 bg-cyan-500/5 p-6 sm:p-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400 mb-2">
            Tune first
          </p>
          <p className="text-zinc-300 mb-5">
            Chord shapes only sound right on a guitar that is in tune. Check
            yours in a few seconds.
          </p>
          <Link
            href="/"
            className="inline-block bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold px-6 py-3 rounded-full text-sm transition-colors"
          >
            Open the Free Guitar Tuner →
          </Link>
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/chords"
            className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            ← Browse all guitar chords
          </Link>
        </div>
      </main>
    </div>
  );
}
