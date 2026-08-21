import { Metadata } from "next";
import Link from "next/link";
import TunerPageLayout from "@/components/TunerPageLayout";
import { otherTunersFor } from "@/lib/tunerPages";

export const metadata: Metadata = {
  title:
    "Full Step Down Tuner — Free Online D Standard Tuner",
  description:
    "Free online full step down guitar tuner. Tune to D standard (D G C F A D) with your microphone, right on this page. No download required.",
  alternates: { canonical: "/full-step-down-tuner" },
  openGraph: {
    title: "Full Step Down Tuner — Free Online D Standard Tuner",
    description:
      "Tune your guitar a full step down to D standard using your device's microphone.",
  },
};

export default function FullStepDownTunerPage() {
  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Full Step Down Tuner - GuitarTunePro",
    url: "https://www.guitartunepro.com/full-step-down-tuner",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description:
      "Free online full step down guitar tuner. Tune your guitar to D standard (D G C F A D) instantly.",
    browserRequirements: "Requires microphone access",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
      />
      <TunerPageLayout
        title="Full Step Down Tuner"
        description="Tune your guitar a full step down to D standard (D G C F A D) using your microphone. The tuner below is already set — press Start Recording and pluck."
        canonicalPath="/full-step-down-tuner"
        initialTuning="fullStepDown"
        otherTuners={otherTunersFor("/full-step-down-tuner")}
        faqs={[
          {
            question: "What is full step down tuning?",
            answer:
              "Full step down tuning lowers every string of standard tuning by two semitones, giving D G C F A D. It is also called D standard, whole step down, or one step down.",
          },
          {
            question: "Is D standard the same as full step down?",
            answer:
              "Yes. The two names describe the same tuning — D standard is named for its lowest string, full step down for how you get there from E standard.",
          },
          {
            question: "Do my chord shapes change?",
            answer:
              "No. Because all six strings move by the same interval, every chord shape, scale, and riff transfers unchanged. Only the sounding pitch drops a whole step, so an E-shape barre at the first fret now sounds D.",
          },
          {
            question: "What is the difference between D standard and Drop D?",
            answer:
              "They are completely different despite both involving D. Drop D lowers only the 6th string to D, keeping the other five in standard tuning. D standard lowers all six strings by a whole step. Drop D changes the interval relationships between strings; D standard does not.",
          },
          {
            question: "What strings should I use for D standard?",
            answer:
              "One gauge heavier than you use in standard tuning, typically .010–.052 or .011–.050. Two whole steps of tension removed from a light set leaves the strings slack enough to buzz and to intonate unreliably.",
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
            title: "How to Intonate Your Guitar",
            slug: "how-to-intonate-your-guitar",
            description:
              "Set intonation correctly after a gauge or tuning change.",
          },
        ]}
      >
        <h2>How to Use This Full Step Down Tuner</h2>
        <ol>
          <li>
            Press <strong>Start Recording</strong> on the tuner above and allow
            microphone access.
          </li>
          <li>
            The <strong>Full Step Down</strong> preset is already selected.
          </li>
          <li>
            Work from string 6 up. Each string drops by exactly one whole step:
            E→D, A→G, D→C, G→F, B→A, E→D.
          </li>
          <li>
            Centre the needle at 0 cents on each string before moving on.
          </li>
          <li>
            Run two more full passes. Taking a whole step off all six strings
            removes roughly a fifth of the total tension on the neck, and it
            will keep settling for several minutes.
          </li>
        </ol>

        <h2>What is Full Step Down Tuning?</h2>
        <p>
          <strong>Full step down tuning</strong>, or{" "}
          <strong>D standard</strong>, lowers every string of standard tuning by
          a whole step, giving <strong>D G C F A D</strong>. It is the next
          station past{" "}
          <Link href="/half-step-down-tuner">half step down</Link> on the same
          road: same idea, twice as far.
        </p>
        <p>
          Like half step down, it preserves every interval relationship between
          strings, so nothing you know about the fretboard stops working. Unlike
          half step down, the tension drop is large enough that a standard
          string set genuinely will not cope.
        </p>

        <h2>Why Tune to D Standard?</h2>
        <ul>
          <li>
            <strong>Weight while keeping standard shapes.</strong> You get a
            genuinely heavy, dark tone without learning a new fretboard — the
            main reason it appeals to players moving from rock into heavier
            styles.
          </li>
          <li>
            <strong>Easier bending, more than in E♭.</strong> Two whole steps of
            released tension makes wide bends and vibrato considerably lighter
            work, even accounting for the heavier strings you should fit.
          </li>
          <li>
            <strong>Vocal range.</strong> Dropping a whole step moves a song's
            key meaningfully — often the difference between a singer straining
            and not.
          </li>
          <li>
            <strong>A base for Drop C.</strong> D standard is one string away
            from <Link href="/drop-c-tuner">Drop C</Link>; drop the 6th string
            another whole step and you are there. Many bands move between the
            two mid-set.
          </li>
        </ul>

        <h2>Bands That Use D Standard</h2>
        <ul>
          <li>
            <strong>Nirvana:</strong> Much of In Utero, including Heart-Shaped
            Box's tuning family.
          </li>
          <li>
            <strong>Alice in Chains:</strong> A signature part of their thick,
            sludgy guitar sound.
          </li>
          <li>
            <strong>Soundgarden:</strong> Used D standard and its variants
            extensively.
          </li>
          <li>
            <strong>Children of Bodom:</strong> D standard across a large part
            of their catalogue.
          </li>
        </ul>

        <h2>D Standard vs. Drop D — A Common Confusion</h2>
        <p>
          These get mixed up constantly because both put a D on the lowest
          string, but they are not related:
        </p>
        <ul>
          <li>
            <strong>Drop D (D A D G B E):</strong> one string moves. The
            intervals between strings change, which is what enables one-finger
            power chords. Everything else stays at standard pitch.
          </li>
          <li>
            <strong>D standard (D G C F A D):</strong> all six strings move
            equally. Intervals are unchanged, so there is no one-finger power
            chord — but the whole instrument sounds a whole step lower.
          </li>
        </ul>
        <p>
          If you want the heavy riffing trick, you want Drop D or Drop C. If you
          want the whole guitar lower with your existing vocabulary intact, you
          want this page.
        </p>

        <h2>Setup Notes</h2>
        <p>
          A whole step down is the point where setup stops being optional. Fit a
          heavier set first — .010–.052 is the usual starting point — then check
          neck relief, since reduced string pull often lets the neck straighten
          and buzz. Finally,{" "}
          <Link href="/articles/how-to-intonate-your-guitar">
            reset the intonation
          </Link>
          ; both the pitch change and the gauge change shift where each string
          needs to break over the saddle.
        </p>

        <h2>Troubleshooting</h2>
        <p>
          <strong>Everything reads sharp on the second pass.</strong> Expected.
          Releasing tension across all six strings lets the neck relax, raising
          the pitch of strings you already tuned. This is why two or three
          passes are needed rather than one.
        </p>
        <p>
          <strong>The strings feel like rubber.</strong> Go up a gauge. A .009
          set at D standard has less tension than most players can control
          cleanly.
        </p>
        <p>
          <strong>Notes fret sharp above the 5th fret.</strong> Intonation, not
          tuning. Slacker strings need less compensation, so the saddles need
          moving.
        </p>

        <p>
          Nearby tunings:{" "}
          <Link href="/half-step-down-tuner">half step down</Link> (a semitone
          less), <Link href="/drop-c-tuner">Drop C</Link> (one string further),
          and <Link href="/drop-d-tuner">Drop D</Link>.
        </p>
      </TunerPageLayout>
    </>
  );
}
