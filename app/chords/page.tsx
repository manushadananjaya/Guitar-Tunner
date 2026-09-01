import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import ChordDiagram from "@/components/Chords/ChordDiagram";
import { CHORDS, ROOTS, QUALITIES, getChord, chordSlug } from "@/lib/chords";
import { isChordIndexed } from "@/lib/chords/curation";

const SITE_URL = "https://www.guitartunepro.com";

export const metadata: Metadata = {
  title: "Guitar Chords — Free Chord Library",
  description:
    "Free guitar chord library. Diagrams and audio for major, minor, 7th, sus, dim, aug and more, in every key. Every shape verified against chord theory.",
  alternates: { canonical: "/chords" },
  openGraph: {
    title: "Guitar Chords — Free Chord Library with Diagrams",
    description:
      "Chord diagrams and audio for every key — major, minor, 7ths, sus, diminished, augmented and more.",
  },
};

/** The shapes a beginner should learn first, in a sensible order. */
const FIRST_CHORDS = [
  "e-minor",
  "a-minor",
  "d-minor",
  "g",
  "c",
  "d",
  "e",
  "a",
];

export default function ChordsIndexPage() {
  const totalVoicings = CHORDS.reduce(
    (total, chord) => total + chord.voicings.length,
    0,
  );

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

      <main className="relative z-10 max-w-5xl mx-auto px-5 pt-8 sm:pt-10">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-1.5 text-xs text-ink-subtle mb-5"
        >
          <Link href="/" className="hover:text-brass transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-ink-muted">Chords</span>
        </nav>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-ink leading-tight mb-3">
          Guitar Chord Library
        </h1>
        <p className="text-ink-muted text-base sm:text-lg leading-relaxed max-w-2xl">
          {CHORDS.length} chords and {totalVoicings} voicings, with diagrams you
          can read and audio you can check yourself against. Every shape here is
          verified against chord theory — if a fingering does not sound the
          notes the chord is made of, it does not ship.
        </p>

        {/* Start here */}
        <section className="mt-12" aria-labelledby="first-heading">
          <h2 id="first-heading" className="text-2xl font-bold text-ink mb-2">
            Start With These Eight
          </h2>
          <p className="text-ink-muted mb-6 max-w-2xl">
            If you are new, learn these before anything else. Between them they
            cover an enormous amount of popular music, and none needs a barre.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {FIRST_CHORDS.map((slug) => {
              const chord = getChord(slug);
              if (!chord) return null;
              const voicing = chord.voicings[0];
              return (
                <Link
                  key={slug}
                  href={`/chords/${slug}`}
                  className="group rounded-2xl border border-line bg-surface/30 p-4 flex flex-col items-center hover:border-brass/40 hover:bg-surface-raised/40 transition-all"
                >
                  <ChordDiagram
                    voicing={voicing}
                    title={`${chord.ascii} chord diagram`}
                    className="w-full max-w-[110px] h-auto"
                  />
                  <span className="mt-2.5 text-sm font-bold text-ink group-hover:text-brass transition-colors">
                    {chord.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Common chords, grouped by root */}
        <section className="mt-16" aria-labelledby="browse-heading">
          <h2 id="browse-heading" className="text-2xl font-bold text-ink mb-2">
            Common Guitar Chords
          </h2>
          <p className="text-ink-muted mb-6 max-w-2xl">
            The open and barre chords you reach for most, grouped by root note.
          </p>

          <div className="space-y-8">
            {ROOTS.map((root) => {
              const chips = QUALITIES.map((quality) =>
                getChord(chordSlug(root, quality)),
              ).filter(
                (chord): chord is NonNullable<typeof chord> =>
                  !!chord && isChordIndexed(chord.slug),
              );
              if (chips.length === 0) return null;
              return (
                <div key={root.slug}>
                  <h3 className="text-lg font-bold text-brass mb-3">
                    {root.name}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {chips.map((chord) => (
                      <Link
                        key={chord.slug}
                        href={`/chords/${chord.slug}`}
                        className="rounded-lg border border-line bg-surface/40 px-3 py-1.5 text-sm text-ink hover:border-brass/40 hover:text-brass transition-colors"
                      >
                        {chord.name}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* The full root × quality matrix — augmented triads, minor 6ths, and
              extended chords in every key. Still here, still linked, just not
              the first thing a visitor (or a crawler) meets. */}
          <details className="mt-10 rounded-xl border border-line bg-surface/30 p-5">
            <summary className="cursor-pointer text-sm font-semibold text-ink">
              Show every chord type in every key
              <span className="text-ink-subtle font-normal">
                {" "}
                — augmented, minor 6th, and extended voicings
              </span>
            </summary>
            <div className="mt-6 space-y-6">
              {ROOTS.map((root) => {
                const rest = QUALITIES.map((quality) =>
                  getChord(chordSlug(root, quality)),
                ).filter(
                  (chord): chord is NonNullable<typeof chord> =>
                    !!chord && !isChordIndexed(chord.slug),
                );
                if (rest.length === 0) return null;
                return (
                  <div key={root.slug}>
                    <h3 className="text-sm font-bold text-brass mb-2">
                      {root.name}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {rest.map((chord) => (
                        <Link
                          key={chord.slug}
                          href={`/chords/${chord.slug}`}
                          className="rounded-lg border border-line bg-surface/40 px-3 py-1.5 text-sm text-ink hover:border-brass/40 hover:text-brass transition-colors"
                        >
                          {chord.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </details>
        </section>

        {/* Long-form guidance */}
        <section className="mt-16 prose prose-invert prose-cyan max-w-none prose-headings:text-ink prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-h3:text-lg prose-h3:mt-8 prose-h3:mb-3 prose-p:text-ink prose-p:leading-[1.85] prose-li:text-ink prose-a:text-brass prose-a:no-underline hover:prose-a:text-brass-hover prose-strong:text-ink">
          <h2>How to Read a Chord Diagram</h2>
          <p>
            A chord diagram is the fretboard seen head-on, as though the guitar
            were stood upright facing you. That means the layout is not what you
            see looking down at your own hands, which trips up almost everyone
            at first.
          </p>
          <ul>
            <li>
              <strong>Vertical lines are strings.</strong> Left to right they run
              from string 6 (the thickest, low E) to string 1 (the thinnest,
              high E).
            </li>
            <li>
              <strong>Horizontal lines are frets.</strong> The thick bar at the
              top is the nut. If there is a number beside the diagram instead,
              the shape sits that far up the neck.
            </li>
            <li>
              <strong>Dots are fingers.</strong> Place a fingertip there, just
              behind the fret wire rather than on top of it.
            </li>
            <li>
              <strong>A bar across several strings is a barre</strong> — one
              finger, usually the index, flattened across all of them.
            </li>
            <li>
              <strong>○ above a string means play it open.</strong> Do not fret
              it, but do strike it.
            </li>
            <li>
              <strong>✕ above a string means do not play it.</strong> Either
              avoid it when strumming or mute it with a spare finger.
            </li>
          </ul>

          <h2>What Makes a Chord Major or Minor</h2>
          <p>
            Nearly every chord is built by stacking a root, a third, and a
            fifth. The root gives the chord its name. The fifth is stable and
            mostly just adds weight. The <strong>third</strong> is the note that
            decides the chord&apos;s character.
          </p>
          <p>
            A third four semitones above the root gives a major chord — bright
            and settled. Lower that one single semitone, to three above the
            root, and you have a minor chord: darker, sadder. That is the entire
            difference. C major is C-E-G; C minor is C-E♭-G. One note, moved one
            fret.
          </p>
          <p>
            Everything else in this library is a variation on that idea. Add a
            flattened seventh and you get a <strong>dominant 7th</strong>, the
            restless sound of the blues. Use a natural seventh instead for a{" "}
            <strong>major 7th</strong>, which is lush and jazzy. Remove the
            third entirely and replace it with a second or a fourth and you get
            a <strong>suspended</strong> chord that is neither major nor minor.
            Take the third away altogether, leaving root and fifth, and you have
            a <strong>power chord</strong> — which is exactly why power chords
            survive heavy distortion where full chords turn to mud.
          </p>

          <h2>Why the Same Chord Has Several Shapes</h2>
          <p>
            A chord is a set of notes, not a set of finger positions. Any
            fingering that sounds those notes is that chord, and the guitar
            offers many. C major is C, E, and G — and you can find those three
            notes in a dozen places on the neck.
          </p>
          <p>
            The shapes differ in useful ways. Open positions let strings ring
            and generally sound fuller and brighter, which is why they dominate
            acoustic playing. Barre shapes are movable: learn one and you have
            all twelve roots, because sliding the shape up a fret raises the
            chord a semitone. And a voicing high on the neck sits in a different
            register, which matters when you are playing alongside someone else
            and do not want to occupy the same space.
          </p>

          <h3>Movable shapes are the shortcut worth taking</h3>
          <p>
            The barre shapes in this library are derived from open chords. The
            E-shape barre is the open E chord with the nut replaced by your
            index finger; the A-shape barre is the open A chord treated the same
            way. Once you can play those two comfortably, you can play every
            major chord in every key, because you already know where the notes
            are on strings 6 and 5.
          </p>
          <p>
            This is why learning the notes along the low E and A strings pays
            off faster than memorising more shapes. Two shapes plus a fretboard
            map beats twelve memorised chords.
          </p>

          <h2>Getting Barre Chords to Sound</h2>
          <p>
            Barre chords defeat most beginners, and it is almost never a
            strength problem — squeezing harder is the usual instinct and the
            usual mistake.
          </p>
          <ul>
            <li>
              <strong>Roll your index finger slightly onto its side</strong>,
              toward the headstock. The edge is harder and flatter than the
              soft centre of the pad, and it will not swallow strings in the
              creases between joints.
            </li>
            <li>
              <strong>Position the barre close behind the fret</strong>, not
              midway between frets. The closer you are, the less pressure the
              string needs.
            </li>
            <li>
              <strong>Let your thumb sit behind the neck</strong>, roughly
              opposite your middle finger, rather than hooking over the top.
            </li>
            <li>
              <strong>Pull back gently with your arm</strong> rather than
              pinching with the hand. Larger muscles tire far more slowly.
            </li>
            <li>
              <strong>Check your setup.</strong> If the action is high or the
              strings are heavy, barre chords are genuinely harder — this is not
              always your technique. A guitar set up well is much easier to
              learn on.
            </li>
          </ul>
          <p>
            Test one string at a time. The strings that fail are usually 2 and
            3, where the barre crosses a finger joint. Shift the finger a
            millimetre or two until they ring.
          </p>

          <h2>A Note on How These Diagrams Were Made</h2>
          <p>
            Chord charts on the web are frequently wrong, usually because they
            were copied by hand. The shapes here are generated instead: barre
            forms are transposed programmatically from a small set of movable
            shapes, open positions are entered individually, and then every
            single voicing is checked by computing the notes the fingering
            actually sounds and comparing them against the chord&apos;s formula.
            Anything that does not match is dropped rather than published.
          </p>
          <p>
            That check runs over all {CHORDS.length} chords and{" "}
            {totalVoicings} voicings. It caught real errors while this library
            was being built.
          </p>

          <h2>Tune Before You Practise</h2>
          <p>
            A correct chord shape on an out-of-tune guitar still sounds wrong,
            and beginners routinely conclude their fingers are at fault when the
            tuning is. Check your tuning before a practice session with our{" "}
            <Link href="/">free chromatic tuner</Link>, and if you are working
            on timing as well, the{" "}
            <Link href="/metronome">online metronome</Link> pairs well with
            chord-change drills.
          </p>
        </section>

        <div className="mt-14 rounded-2xl border border-brass/30 bg-brass/5 p-6 sm:p-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-brass mb-2">
            Before you play
          </p>
          <p className="text-ink mb-5">
            Get in tune in about thirty seconds, free and in your browser.
          </p>
          <Link
            href="/"
            className="inline-block bg-brass hover:bg-brass-hover text-brass-contrast font-bold px-6 py-3 rounded-full text-sm transition-colors"
          >
            Open the Free Guitar Tuner →
          </Link>
        </div>
      </main>
    </div>
  );
}
