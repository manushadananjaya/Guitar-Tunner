import { Metadata } from "next";
import Link from "next/link";
import ArticleLayout from "@/components/ArticleLayout";

export const metadata: Metadata = {
  title:
    "Standard Guitar Tuning Explained: E A D G B E Notes, History & Why It Works",
  description:
    "Understand the notes of standard guitar tuning (E2-A2-D3-G3-B3-E4), the musical intervals between strings, why the G-B interval is a major third, and why standard tuning is the universal default for guitarists worldwide.",
  alternates: { canonical: "/articles/standard-tuning-explained" },
  openGraph: {
    title: "Standard Guitar Tuning Explained",
    description:
      "Why E-A-D-G-B-E is the universal guitar tuning and how the intervals work.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=1200&q=80",
        alt: "Guitar fretboard close-up",
      },
    ],
  },
};

export default function ArticlePage() {
  return (
        <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Standard Tuning Explained",
  "description": "A deep dive into E-A-D-G-B-E standard tuning: what the notes are, why the intervals are what they are, the history behind it, and how it shapes everything from chords to scales.",
  "image": "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=900&q=80",
  "author": {
    "@type": "Organization",
    "name": "GuitarTunePro",
    "url": "https://www.guitartunepro.com"
  },
  "publisher": {
    "@type": "Organization",
    "name": "GuitarTunePro",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.guitartunepro.com/Logo.png"
    }
  },
  "datePublished": "2024-11-08",
  "dateModified": "2026-03-29"
}) }} />
      <ArticleLayout
      slug="standard-tuning-explained"
      title="Standard Tuning Explained"
      description="A deep dive into E-A-D-G-B-E standard tuning: what the notes are, why the intervals are what they are, the history behind it, and how it shapes everything from chords to scales."
      datePublished="2024-11-08"
      dateModified="2026-03-29"
      readingTimeMinutes={8}
      heroImage={{
        src: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=900&q=80",
        alt: "Close-up of guitar fretboard and strings",
        credit: "Photo: Unsplash",
      }}
      faqs={[
        {
          question:
            "What are the standard tuning notes for guitar from low to high?",
          answer:
            "From the thickest (lowest pitch) to the thinnest (highest pitch) string, the notes are: E2, A2, D3, G3, B3, E4. The number after each letter refers to the octave. The two E strings are two octaves apart.",
        },
        {
          question:
            "Why is there a major third between G and B instead of a perfect fourth?",
          answer:
            "If the guitar were tuned entirely in perfect fourths, the highest string would be F# instead of E. The major third between G and B keeps the outer two strings as the same note (E), creates ergonomic barre chord shapes, and makes scale fingering more comfortable across the fretboard.",
        },
        {
          question: "Who invented standard guitar tuning?",
          answer:
            "Standard tuning evolved gradually over centuries through the lute and early guitar traditions. By the early 19th century, the six-string guitar with E-A-D-G-B-E tuning had become the dominant configuration, largely popularized by the classical guitar tradition in Spain and France. No single person invented it — it was a collective evolution toward the most ergonomic string spacing.",
        },
        {
          question: "What is the frequency of each standard tuning note?",
          answer:
            "Using A440 as reference: Low E2 ≈ 82.41 Hz, A2 ≈ 110 Hz, D3 ≈ 146.83 Hz, G3 ≈ 196 Hz, B3 ≈ 246.94 Hz, High E4 ≈ 329.63 Hz. These are the equal-temperament frequencies.",
        },
        {
          question: "Is standard tuning the best tuning for beginners?",
          answer:
            "Yes, for most beginners standard tuning is the best starting point. The vast majority of teaching resources, chord charts, tabs, and tutorial videos assume standard tuning. It also offers the most balanced combination of chord voicings, scale positions, and playing comfort.",
        },
      ]}
      relatedArticles={[
        {
          title: "Alternate Guitar Tunings You Should Try",
          slug: "alternate-guitar-tunings",
          description:
            "Drop D, Open G, DADGAD and more alternate tunings explored.",
        },
        {
          title: "Drop D Tuning Guide",
          slug: "drop-d-tuning-guide",
          description:
            "Everything you need to know about Drop D tuning for rock and metal.",
        },
        {
          title: "How to Tune a Guitar for Beginners",
          slug: "how-to-tune-a-guitar-for-beginners",
          description:
            "Step-by-step guide to tuning your guitar for the first time.",
        },
        {
          title: "How to Tune a Guitar by Ear",
          slug: "how-to-tune-a-guitar-by-ear",
          description: "Learn relative tuning and develop your musical ear.",
        },
      ]}
    >
      <p>
        Ask any guitar teacher what to do before the first lesson, and they will
        all say the same thing: tune your guitar to standard tuning. It is the
        universal starting point for every beginner, the tuning assumed by
        nearly all tablature websites, chord charts, and instructional videos,
        and the foundation upon which virtually all guitar technique is built.
      </p>
      <p>
        But why this particular combination of notes? And why has it remained
        essentially unchanged for nearly two centuries? The answer lies in a
        beautiful intersection of physics, ergonomics, and musical history.
      </p>

      <h2>The Notes of Standard Tuning</h2>
      <p>
        Standard tuning defines the pitches of the six open strings (strings
        played without pressing any fret). From the thickest, lowest-pitched
        string to the thinnest, highest-pitched string, the notes are:
      </p>

      <div className="bg-zinc-900/60 p-6 rounded-xl border border-white/5 my-6 text-center">
        <div className="text-2xl tracking-[0.25em] font-bold font-mono text-cyan-400 mb-3">
          E2 — A2 — D3 — G3 — B3 — E4
        </div>
        <div className="text-sm text-zinc-500 tracking-wide">
          String 6 · String 5 · String 4 · String 3 · String 2 · String 1
        </div>
      </div>

      <p>
        The numbers refer to scientific pitch notation octave designations.
        Middle C on a piano is C4, so E4 (the highest guitar string) sits just
        above middle C. The low E2 sits two octaves below E4 — a span that gives
        the guitar its remarkable range of more than three octaves just on the
        open strings.
      </p>

      <p>
        In terms of actual frequencies (using A440 equal temperament as the
        reference standard):
      </p>
      <ul>
        <li>
          <strong>E2:</strong> 82.41 Hz
        </li>
        <li>
          <strong>A2:</strong> 110.00 Hz
        </li>
        <li>
          <strong>D3:</strong> 146.83 Hz
        </li>
        <li>
          <strong>G3:</strong> 196.00 Hz
        </li>
        <li>
          <strong>B3:</strong> 246.94 Hz
        </li>
        <li>
          <strong>E4:</strong> 329.63 Hz
        </li>
      </ul>

      <figure className="my-8 rounded-xl overflow-hidden border border-white/5">
        <img
          src="https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=900&q=80"
          alt="Guitar headstock showing six tuning pegs"
          className="w-full h-52 object-cover"
          loading="lazy"
        />
        <figcaption className="text-xs text-zinc-500 text-center py-2 bg-zinc-900/50">
          Six strings, each tuned to a precise pitch. Photo: Unsplash
        </figcaption>
      </figure>

      <h2>The Intervals Between Strings</h2>
      <p>
        Understanding the musical distance between each pair of adjacent strings
        reveals why standard tuning is so cleverly designed:
      </p>
      <ul>
        <li>
          <strong>E to A:</strong> Perfect Fourth (5 semitones)
        </li>
        <li>
          <strong>A to D:</strong> Perfect Fourth (5 semitones)
        </li>
        <li>
          <strong>D to G:</strong> Perfect Fourth (5 semitones)
        </li>
        <li>
          <strong>G to B:</strong> Major Third (4 semitones) — the exception
        </li>
        <li>
          <strong>B to E:</strong> Perfect Fourth (5 semitones)
        </li>
      </ul>
      <p>
        Four of the five string-to-string intervals are perfect fourths. Only
        the interval between G and B breaks the pattern — it's a major third,
        one semitone narrower than the fourths. This seemingly small anomaly has
        profound consequences for how the guitar works.
      </p>

      <h2>Why the Major Third Between G and B?</h2>
      <p>
        This is the most interesting question in guitar theory, and the answer
        is entirely practical. If the guitar were tuned in all perfect fourths —
        E, A, D, G, C, F — the highest string would be F4, not E4.
      </p>

      <p>
        The outer two strings would be different notes, destroying the elegant
        symmetry of starting and ending on E.
      </p>
      <p>
        But there's a deeper structural reason. The major third interval between
        G and B creates the exact chord voicings that make barre chords and open
        chords ergonomically practical:
      </p>
      <h3>Barre Chord Shapes</h3>
      <p>
        In an all-fourths tuning, playing a major chord requires a very awkward
        stretch across four or five strings. With the G-B major third built into
        the tuning, the standard E-shape barre chord and A-shape barre chord
        fall neatly under the fingers with minimal stretching.
      </p>
      <p>
        You can move these same two shapes to any fret and have a perfectly
        voiced major chord in any key.
      </p>
      <h3>Open Chord Voicings</h3>
      <p>
        The classic beginner open chords — Em, Am, C, G, D — all benefit from
        the major third. The G major open chord, for instance, uses all six
        strings and produces a rich, full sound precisely because of how the
        intervals align across the fretboard with the G-B third in the middle.
      </p>
      <h3>Scale Positions</h3>
      <p>
        The break in the symmetry also creates more compact scale patterns. In
        all-fourths tuning, scale patterns shift by two frets at every string
        crossing. With the G-B major third, scale patterns shift by one fret
        less at that string crossing, allowing most pentatonic and major scale
        patterns to be played with fewer fret-position shifts.
      </p>

      <figure className="my-8 rounded-xl overflow-hidden border border-white/5">
        <img
          src="https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?w=900&q=80"
          alt="Guitarist playing chords on acoustic guitar"
          className="w-full h-52 object-cover"
          loading="lazy"
        />
        <figcaption className="text-xs text-zinc-500 text-center py-2 bg-zinc-900/50">
          Standard tuning makes open chords and barre chords ergonomically
          accessible. Photo: Unsplash
        </figcaption>
      </figure>

      <h2>A Brief History of Standard Tuning</h2>
      <p>
        The six-string guitar as we know it today descended from the baroque
        guitar and the lute, which used different numbers of strings and various
        tunings. By the late 18th century, instrument makers in Spain, France,
        and Italy were experimenting with five and six-string guitars.
      </p>

      <p>
        The six-string guitar with E-A-D-G-B-E tuning rose to prominence largely
        through the influence of classical guitarists like Fernando Sor and
        Mauro Giuliani in the early 19th century.
      </p>
      <p>
        Their published methods, études, and concert pieces set the standard
        that subsequent generations followed.
      </p>
      <p>
        This tuning became so dominant in classical and folk guitar traditions
        that by the time the electric guitar emerged in the 1930s and 1940s,
        E-A-D-G-B-E was simply the accepted default. Manufacturers, publishers,
        and educators all standardized around it.
      </p>
      <p>
        Today, any guitar you pick up in a music store — from a $100 starter
        guitar to a $5,000 boutique instrument — will be set up and labeled for
        standard E-A-D-G-B-E tuning.
      </p>

      <h2>Standard Tuning and Its Practical Advantages</h2>
      <h3>Universal Resources</h3>
      <p>
        Every chord chart, tablature website, instructional book, and YouTube
        tutorial on the internet assumes standard tuning unless explicitly
        stated otherwise. Learning in standard tuning means you have access to
        the entire universe of guitar learning resources.
      </p>
      <h3>Instrument Design</h3>
      <p>
        The scale length, nut width, and string gauges of most commercial
        guitars are optimized specifically for standard tuning. The string
        tension at standard pitch provides the right balance of tone,
        playability, and durability for most string gauges.
      </p>
      <h3>Communication With Other Musicians</h3>
      <p>
        When you're in a band, jamming with friends, or watching someone play
        online, standard tuning provides a shared reference point. If someone
        says "play a G chord," the shape and sound is universally understood.
      </p>

      <h2>When to Move Beyond Standard Tuning</h2>
      <p>
        Standard tuning is the foundation, not the ceiling. Once you're
        comfortable with chords and scales in standard tuning, exploring{" "}
        <Link href="/articles/alternate-guitar-tunings">alternate tunings</Link>{" "}
        like Drop D, Open G, Open D, DADGAD, or Half-Step Down opens up entirely
        new sonic textures, chord voicings, and playing possibilities.
      </p>
      <p>
        Many legendary guitarists — Keith Richards, Joni Mitchell, Robert
        Johnson, John Fahey — built distinctive sounds largely by departing from
        standard tuning.
      </p>
      <p>
        But even those artists return to standard tuning for large portions of
        their repertoire. It remains the home base of the guitar, the starting
        point from which every other tuning is defined and referenced. Learn it
        thoroughly, and all other tunings will make much more sense. Get your
        guitar in standard tuning right now with our{" "}
        <Link href="/">free online chromatic guitar tuner</Link> — no download
        required, works on any device. When you&apos;re ready to go further, our
        dedicated{" "}
        <Link href="/drop-d-tuner">Drop D tuner</Link>,{" "}
        <Link href="/open-g-tuner">Open G tuner</Link>, and{" "}
        <Link href="/half-step-down-tuner">half step down tuner</Link> each
        pre-load the correct target notes automatically.
      </p>
    </ArticleLayout>
    </>
  );
}
