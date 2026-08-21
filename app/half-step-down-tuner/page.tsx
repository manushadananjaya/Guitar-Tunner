import { Metadata } from "next";
import Link from "next/link";
import TunerPageLayout from "@/components/TunerPageLayout";
import { otherTunersFor } from "@/lib/tunerPages";

export const metadata: Metadata = {
  title:
    "Half Step Down Tuner — E♭ Tuning",
  description:
    "Free online half step down guitar tuner. Tune to E♭ A♭ D♭ G♭ B♭ E♭ with your microphone, right on this page. Used by Hendrix, SRV, and Guns N' Roses.",
  alternates: { canonical: "/half-step-down-tuner" },
  openGraph: {
    title: "Half Step Down Tuner — Free Online E♭ Guitar Tuner",
    description:
      "Tune your guitar a half step down quickly and accurately using your device's microphone.",
  },
};

export default function HalfStepDownTunerPage() {
  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Half Step Down Tuner - GuitarTunePro",
    url: "https://www.guitartunepro.com/half-step-down-tuner",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description:
      "Free online half step down guitar tuner. Tune your guitar to E♭ A♭ D♭ G♭ B♭ E♭ instantly.",
    browserRequirements: "Requires microphone access",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
      />
      <TunerPageLayout
        title="Half Step Down Tuner"
        description="Tune your guitar a half step down to E♭ A♭ D♭ G♭ B♭ E♭ using your microphone. The tuner below is already set — press Start Recording and pluck."
        canonicalPath="/half-step-down-tuner"
        initialTuning="halfStepDown"
        otherTuners={otherTunersFor("/half-step-down-tuner")}
        faqs={[
          {
            question: "What notes is half step down tuning?",
            answer:
              "Half step down is E♭ A♭ D♭ G♭ B♭ E♭ from lowest to highest — every string of standard tuning lowered by one semitone. It is also written as D♯ G♯ C♯ F♯ A♯ D♯, which is the same set of pitches spelled with sharps.",
          },
          {
            question: "Is E♭ tuning the same as half step down?",
            answer:
              "Yes. E♭ tuning, Eb tuning, half step down, and one semitone down all describe the same tuning. It is named for the lowest string, which moves from E to E♭.",
          },
          {
            question: "Why do so many bands tune half step down?",
            answer:
              "Three reasons. Lower string tension makes bends and vibrato noticeably easier. The overall tone becomes warmer and thicker. And it drops every key by a semitone, which often puts a vocal line in a more comfortable range without changing a single chord shape.",
          },
          {
            question: "Do my chord shapes change in half step down?",
            answer:
              "No — and that is the appeal. Because all six strings move by the same interval, every shape, scale, and riff you know transfers unchanged. Only the sounding pitch shifts down a semitone, so an E shape now sounds E♭.",
          },
          {
            question: "Can I play along with standard-tuning recordings?",
            answer:
              "Not without adjusting. Your guitar will sound a semitone flat against anything recorded in standard tuning. Either retune to standard, or pitch-shift the recording up one semitone.",
          },
        ]}
        relatedArticles={[
          {
            title: "Alternate Guitar Tunings You Should Try",
            slug: "alternate-guitar-tunings",
            description:
              "Explore Open G, DADGAD, half-step down, and more alternate tunings.",
          },
          {
            title: "Best Guitar Strings for Tuning Stability",
            slug: "best-guitar-strings-for-tuning-stability",
            description:
              "Gauge, material, and winding choices that hold pitch longer.",
          },
          {
            title: "Standard Tuning Explained",
            slug: "standard-tuning-explained",
            description:
              "Understand the notes and intervals behind E A D G B E.",
          },
        ]}
      >
        <h2>How to Use This Half Step Down Tuner</h2>
        <ol>
          <li>
            Press <strong>Start Recording</strong> on the tuner above and allow
            microphone access.
          </li>
          <li>
            The <strong>Half Step Down</strong> preset is already selected.
          </li>
          <li>
            Work from the 6th string upward. Every string comes down by exactly
            one semitone, so each peg needs roughly half the turn a Drop D
            adjustment takes.
          </li>
          <li>
            Watch the needle centre at 0 cents on each string before moving to
            the next.
          </li>
          <li>
            Run a second pass over all six strings. Lowering every string at
            once releases meaningful neck tension, and the first strings you
            tuned will have drifted sharp as the neck relaxed forward.
          </li>
        </ol>

        <h2>What is Half Step Down Tuning?</h2>
        <p>
          <strong>Half step down tuning</strong> lowers every string of standard
          tuning by one semitone, giving you{" "}
          <strong>E♭ A♭ D♭ G♭ B♭ E♭</strong>. It is the most common alternate
          tuning in rock and blues after Drop D, and the least disruptive one to
          learn — because nothing about how you play changes.
        </p>
        <p>
          Since all six strings move by the same interval, the relationships
          between them are identical to standard tuning. Every chord shape,
          scale pattern, and riff you already know works exactly as before. Only
          the absolute pitch shifts: play an E-shape barre chord at the first
          fret and it sounds E♭ rather than E.
        </p>

        <h2>Why Guitarists Tune Half Step Down</h2>
        <ul>
          <li>
            <strong>Easier bending:</strong> Roughly six percent less tension
            across the set. Full-tone bends and wide vibrato take noticeably
            less finger strength — the main reason blues players favour it.
          </li>
          <li>
            <strong>Warmer, thicker tone:</strong> Slightly slacker strings
            produce a darker, looser attack that sits well under distortion.
          </li>
          <li>
            <strong>Vocal-friendly keys:</strong> Dropping everything a semitone
            can move a chorus out of a singer's problem range without rewriting
            a single chord.
          </li>
          <li>
            <strong>Heavier feel without new shapes:</strong> You get some of
            the weight of a down-tuned guitar while keeping the entire standard
            tuning vocabulary.
          </li>
        </ul>

        <h2>Famous Players and Songs in E♭</h2>
        <ul>
          <li>
            <strong>Jimi Hendrix:</strong> Tuned to E♭ on most of his catalogue,
            including Voodoo Child (Slight Return) and Little Wing.
          </li>
          <li>
            <strong>Stevie Ray Vaughan:</strong> Played E♭ with famously heavy
            strings — the lower tension is what made those gauges playable.
          </li>
          <li>
            <strong>Guns N' Roses:</strong> Sweet Child o' Mine and much of
            Appetite for Destruction are in E♭.
          </li>
          <li>
            <strong>Van Halen:</strong> Eddie used E♭ across a large part of the
            early records, including Runnin' with the Devil.
          </li>
        </ul>

        <h2>Should You Change String Gauge?</h2>
        <p>
          For occasional use, no. If you keep a guitar in E♭ permanently, moving
          up one gauge — say from .009–.042 to .010–.046 — restores the tension
          and feel of standard tuning while keeping the lower pitch. This is
          exactly the trade Stevie Ray Vaughan made, just at a far heavier
          extreme.
        </p>
        <p>
          Be aware that changing gauge alters neck relief and intonation. After
          a gauge change, expect to adjust the truss rod slightly and re-check{" "}
          <Link href="/articles/how-to-intonate-your-guitar">intonation</Link>.
        </p>

        <h2>Troubleshooting</h2>
        <p>
          <strong>Everything drifts sharp after tuning.</strong> Expected.
          Removing tension from all six strings lets the neck straighten
          slightly, which raises the pitch of strings you already set. Two full
          passes solves it.
        </p>
        <p>
          <strong>The tuner reads D♯ instead of E♭.</strong> These are the same
          pitch — enharmonic equivalents. Our tuner displays sharps, so E♭ shows
          as D♯, A♭ as G♯, and so on.
        </p>
        <p>
          <strong>Strings feel too floppy.</strong> Go up one gauge, as above.
        </p>

        <p>
          Going further down? Try our{" "}
          <Link href="/full-step-down-tuner">full step down tuner</Link> or{" "}
          <Link href="/drop-c-tuner">Drop C tuner</Link>, or read the complete
          guide to{" "}
          <Link href="/articles/alternate-guitar-tunings">
            alternate guitar tunings
          </Link>
          .
        </p>
      </TunerPageLayout>
    </>
  );
}
