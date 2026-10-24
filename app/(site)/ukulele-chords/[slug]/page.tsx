import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import ChordDiagram from "@/components/Chords/ChordDiagram";
import { ChordPlayer } from "@/components/Chords/ChordPlayer";
import { keysContaining } from "@/lib/chords/theory";
import { getChord as getGuitarChord } from "@/lib/chords";
import { PROGRESSIONS } from "@/lib/chords/numeralProgressions";
import {
  UKE_CHORDS,
  UKE_STRING_NAMES,
  baritoneShape,
  getUkeChord,
  isUkeChordIndexed,
  relatedUkeChords,
  ukeMidiNotes,
  ukeSameNotesAs,
} from "@/lib/ukulele/chords";

const SITE_URL = "https://www.guitartunepro.com";

export const dynamicParams = false;

export function generateStaticParams() {
  return UKE_CHORDS.map((chord) => ({ slug: chord.slug }));
}

type Props = { params: Promise<{ slug: string }> };

const ordinal = (n: number) => `${n}${n === 1 ? "st" : n === 2 ? "nd" : n === 3 ? "rd" : "th"}`;

/** "G string open · C string 2nd fret …" — the diagram in words. */
const describe = (frets: (number | null)[]) =>
  frets
    .map((f, i) => `${UKE_STRING_NAMES[i]} string ${f === 0 || f === null ? "open" : `${ordinal(f)} fret`}`)
    .join(" · ");

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const chord = getUkeChord((await params).slug);
  if (!chord) return {};
  const first = chord.voicings[0].frets.join("");
  const noteList = chord.notes.map((n) => n.name).join(" – ");
  const title = `${chord.ascii} Ukulele Chord — How to Play ${chord.name}`;
  return {
    title,
    description: `How to play ${chord.name} on ukulele (${first} in GCEA tuning), with ${chord.voicings.length} chord diagram${
      chord.voicings.length === 1 ? "" : "s"
    }, audio and the notes: ${noteList}.`,
    alternates: { canonical: `/ukulele-chords/${chord.slug}` },
    openGraph: { title: `${chord.ascii} Ukulele Chord`, description: `${chord.name} on ukulele: ${first}. Notes ${noteList}.` },
    // Same policy as the guitar library: everyday chords indexed, the long
    // tail rendered and linked but kept out of the index.
    ...(isUkeChordIndexed(chord) ? {} : { robots: { index: false, follow: true } }),
  };
}

export default async function UkuleleChordPage({ params }: Props) {
  const chord = getUkeChord((await params).slug);
  if (!chord) notFound();

  const keys = keysContaining(chord.root, chord.quality);
  const progressions = [
    ...new Map(keys.flatMap((k) => PROGRESSIONS[k.numeral] ?? []).map((p) => [p.pattern, p])).values(),
  ].slice(0, 3);
  const twins = ukeSameNotesAs(chord);
  const related = relatedUkeChords(chord);
  const guitar = getGuitarChord(chord.slug);
  const baritone = baritoneShape(chord);
  const first = chord.voicings[0];

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Ukulele Chords", item: `${SITE_URL}/ukulele-chords` },
      { "@type": "ListItem", position: 3, name: `${chord.ascii} ukulele chord`, item: `${SITE_URL}/ukulele-chords/${chord.slug}` },
    ],
  };

  return (
    <div className="min-h-screen bg-canvas text-ink pb-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <main className="relative z-10 max-w-4xl mx-auto px-5 pt-8 sm:pt-10">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-ink-subtle mb-5">
          <Link href="/" className="hover:text-brass transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/ukulele-chords" className="hover:text-brass transition-colors">Ukulele chords</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-ink-muted">{chord.name}</span>
        </nav>

        <h1 className="text-4xl sm:text-5xl font-bold text-ink leading-tight mb-3">
          {chord.name} <span className="text-ink-subtle">ukulele chord</span>
        </h1>
        <p className="text-ink-muted text-base sm:text-lg leading-relaxed max-w-2xl mb-2">{chord.quality.character}</p>
        <p className="text-sm text-ink-subtle">
          {chord.root.name} {chord.quality.name} · standard GCEA tuning · {chord.voicings.length} shape
          {chord.voicings.length === 1 ? "" : "s"}
        </p>

        <section className="mt-10" aria-labelledby="voicings-heading">
          <h2 id="voicings-heading" className="text-xl font-bold text-ink mb-2">
            How to Play {chord.name} on Ukulele
          </h2>
          <p className="text-ink-muted mb-5">
            The easiest shape is <span className="font-mono font-semibold text-ink">{first.frets.join("")}</span>:{" "}
            {describe(first.frets)}.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {chord.voicings.map((voicing, i) => (
              <div key={i} className="rounded-2xl border border-line bg-surface/30 p-5 flex flex-col items-center">
                <ChordDiagram
                  voicing={voicing}
                  title={`${chord.ascii} ukulele chord, ${voicing.label}`}
                  className="w-full max-w-[120px] h-auto"
                />
                <p className="mt-3 text-sm font-semibold text-ink text-center">{voicing.label}</p>
                <p className="mt-1 font-mono text-xs text-ink-subtle">{voicing.frets.join(" ")}</p>
                <ChordPlayer notes={ukeMidiNotes(voicing.frets)} label={`${chord.ascii} on ukulele, ${voicing.label}`} className="mt-3" />
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-ink-subtle">
            Strings left to right are G, C, E and A, as the ukulele faces you. Numbers are frets;{" "}
            <span className="font-mono">0</span> means play the string open. Every shape is worked out from the
            notes the chord must contain and checked against them before it is published.
          </p>
        </section>

        <section className="mt-12" aria-labelledby="notes-heading">
          <h2 id="notes-heading" className="text-xl font-bold text-ink mb-4">Notes in {chord.name}</h2>
          <div className="flex flex-wrap gap-2.5">
            {chord.notes.map((note) => (
              <div key={note.interval} className="rounded-xl border border-line bg-surface/40 px-4 py-2.5">
                <div className="text-lg font-bold text-brass">{note.name}</div>
                <div className="text-2xs uppercase tracking-wider text-ink-subtle">{note.interval}</div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-ink-muted leading-relaxed">
            A ukulele has four strings, so a {chord.notes.length}-note chord{" "}
            {chord.notes.length < 4
              ? "doubles one of its notes on the spare string."
              : "uses every string for a different note — there is nothing left to double."}{" "}
            Because the G string is tuned high (reentrant tuning), the lowest note you hear is usually on the C or E
            string, not the G.
          </p>
        </section>

        {keys.length > 0 && (
          <section className="mt-12" aria-labelledby="keys-heading">
            <h2 id="keys-heading" className="text-xl font-bold text-ink mb-4">Songs and Keys That Use {chord.name}</h2>
            <p className="text-ink-muted leading-relaxed mb-4">
              {chord.name} belongs to {keys.length === 1 ? "one major key" : `${keys.length} major keys`}:{" "}
              {keys.map((k, i) => (
                <span key={k.key}>
                  {i > 0 && (i === keys.length - 1 ? " and " : ", ")}
                  {k.key} major (as the <span className="font-mono text-ink">{k.numeral}</span> chord)
                </span>
              ))}
              .
            </p>
            {progressions.length > 0 && (
              <ul className="space-y-2">
                {progressions.map((p) => (
                  <li key={p.pattern} className="text-ink-muted">
                    <span className="font-mono font-semibold text-ink">{p.pattern}</span> — {p.note}
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}

        <section className="mt-12" aria-labelledby="other-heading">
          <h2 id="other-heading" className="text-xl font-bold text-ink mb-4">{chord.name} on Other Instruments</h2>
          <ul className="space-y-3 text-ink-muted leading-relaxed">
            {guitar && (
              <li>
                <span className="font-semibold text-ink">Guitar:</span> see the{" "}
                <Link href={`/chords/${guitar.slug}`} className="text-brass hover:text-brass-hover font-semibold">
                  {guitar.name} guitar chord
                </Link>{" "}
                — six strings, so the shapes are different, but the notes are the same.
              </li>
            )}
            {baritone && (
              <li>
                <span className="font-semibold text-ink">Baritone ukulele (DGBE):</span>{" "}
                <span className="font-mono text-ink">{baritone.join("")}</span>. A baritone is tuned like the top four
                strings of a guitar, so guitar shapes carry over and standard-ukulele shapes do not. Tune one with the{" "}
                <Link href="/baritone-ukulele-tuner" className="text-brass hover:text-brass-hover">baritone ukulele tuner</Link>.
              </li>
            )}
            {twins.length > 0 && (
              <li>
                <span className="font-semibold text-ink">Same notes:</span> {chord.name} contains exactly the notes of{" "}
                {twins.map((t, i) => (
                  <span key={t.slug}>
                    {i > 0 && (i === twins.length - 1 ? " and " : ", ")}
                    <Link href={`/ukulele-chords/${t.slug}`} className="text-brass hover:text-brass-hover font-semibold">
                      {t.name}
                    </Link>
                  </span>
                ))}
                , so one shape plays both.
              </li>
            )}
          </ul>
        </section>

        {related.length > 0 && (
          <section className="mt-12" aria-labelledby="related-heading">
            <h2 id="related-heading" className="text-xl font-bold text-ink mb-5">Related Ukulele Chords</h2>
            <div className="flex flex-wrap gap-2.5">
              {related.map((other) => (
                <Link
                  key={other.slug}
                  href={`/ukulele-chords/${other.slug}`}
                  className="rounded-full border border-line bg-surface/40 px-4 py-2 text-sm text-ink hover:border-brass/40 hover:text-brass transition-colors"
                >
                  {other.name}
                </Link>
              ))}
            </div>
          </section>
        )}

        <div className="mt-14 rounded-2xl border border-brass/30 bg-brass/5 p-6 sm:p-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-brass mb-2">Tune first</p>
          <p className="text-ink mb-5">A right shape on an out-of-tune ukulele still sounds wrong. Check G, C, E and A in a few seconds.</p>
          <Link
            href="/ukulele-tuner"
            className="inline-block bg-brass hover:bg-brass-hover text-brass-contrast font-bold px-6 py-3 rounded-full text-sm transition-colors"
          >
            Open the Ukulele Tuner →
          </Link>
        </div>

        <div className="mt-10 text-center">
          <Link href="/ukulele-chords" className="text-sm text-brass hover:text-brass-hover transition-colors">
            ← All ukulele chords
          </Link>
        </div>
      </main>
    </div>
  );
}
