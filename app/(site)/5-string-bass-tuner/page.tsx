import { Metadata } from "next";
import { languageAlternates } from "@/lib/i18n/pages";
import Link from "next/link";
import TunerPageLayout from "@/components/TunerPageLayout";
import { otherInstrumentsFor } from "@/lib/instrumentPages";

export const metadata: Metadata = {
  title:
    "5-String Bass Tuner — B E A D G",
  description:
    "Free online 5-string bass tuner. Tune B E A D G with your microphone, right on this page. Handles the low B at 30.87 Hz — no download required.",
  alternates: {
    canonical: "/5-string-bass-tuner",
    languages: languageAlternates("/5-string-bass-tuner"),
  },
  openGraph: {
    title: "5-String Bass Tuner — Free Online B E A D G Tuner",
    description:
      "Tune your 5-string bass quickly and accurately using your device's microphone.",
  },
};

export default function FiveStringBassTunerPage() {
  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "5-String Bass Tuner - GuitarTunePro",
    url: "https://www.guitartunepro.com/5-string-bass-tuner",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description:
      "Free online 5-string bass tuner. Tune your bass to B E A D G instantly.",
    browserRequirements: "Requires microphone access",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
      />
      <TunerPageLayout
        title="5-String Bass Tuner"
        description="Tune your 5-string bass (B E A D G) using your microphone. The tuner below is already set — press Start Recording and pluck a string."
        canonicalPath="/5-string-bass-tuner"
        initialGuitarType="fiveStringBass"
        otherTuners={otherInstrumentsFor("/5-string-bass-tuner")}
        faqs={[
          {
            question: "What is standard 5-string bass tuning?",
            answer:
              "B E A D G from lowest to highest — B0, E1, A1, D2, G2. It is standard 4-string bass tuning with an extra low B string added below, continuing the pattern of perfect fourths.",
          },
          {
            question: "How low is the low B?",
            answer:
              "B0 is 30.87 Hz — below the lowest note on a standard piano's bass range that most people can distinguish as pitch rather than rumble. It is roughly the frequency where hearing stops perceiving a clear note and starts perceiving vibration.",
          },
          {
            question: "Why can't my tuner hear the low B?",
            answer:
              "At 30.87 Hz the fundamental is below what almost every built-in microphone, and many speakers, can reproduce at all. The tuner resolves the pitch from the harmonic series instead. Pluck firmly over the neck pickup, mute the other strings, and give the note a full second.",
          },
          {
            question: "Is a 5-string tuned B E A D G or E A D G C?",
            answer:
              "Both exist. B E A D G, with the extra string added low, is by far the more common and is what this page tunes. E A D G C adds a high C on top instead and is used mainly in jazz and solo playing where the upper range matters more than the low end.",
          },
          {
            question: "Do I need a longer scale for a low B?",
            answer:
              "It helps considerably. A 34-inch scale can sound loose and indistinct on the B string; 35 inches or more gives noticeably better tension and definition. If you are stuck with a shorter scale, a heavier B string — .130 or above — recovers much of the clarity.",
          },
        ]}
        relatedArticles={[
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
              "Set intonation correctly — critical on a low B string.",
          },
          {
            title: "Why Your Guitar Goes Out of Tune",
            slug: "why-your-guitar-goes-out-of-tune",
            description:
              "The mechanical causes behind pitch drift, and how to reduce them.",
          },
        ]}
      >
        <h2>How to Use This 5-String Bass Tuner</h2>
        <ol>
          <li>
            Press <strong>Start Recording</strong> on the tuner above and allow
            microphone access.
          </li>
          <li>
            The <strong>5-String Bass</strong> instrument is already selected.
          </li>
          <li>
            Tune the four upper strings first — E, A, D, G. They are easier for
            the tuner to read, and getting them right first gives you a
            reference.
          </li>
          <li>
            Finish with the low B (string 5, 30.87&nbsp;Hz). Pluck firmly over
            the neck pickup, mute everything else, and let it ring for a full
            second before reading.
          </li>
        </ol>
        <p>
          If the B reading is unstable, an octave check works well: fret the B
          string at the 12th fret, which sounds B1 at 61.74&nbsp;Hz. That is
          twice the frequency and far easier for a microphone to capture. Tune
          it there, then verify the open string.
        </p>

        <h2>The Low B Problem</h2>
        <p>
          The low B is the reason 5-string basses divide opinion, and the
          physics explains why.
        </p>
        <p>
          At <strong>30.87&nbsp;Hz</strong>, B0 sits at the very bottom of human
          pitch perception. Below roughly 20&nbsp;Hz we stop hearing pitch
          entirely and feel vibration instead; B0 is not far above that
          boundary. Much of what you perceive as the "note" is actually its
          harmonics — B1 at 61.74&nbsp;Hz, F♯2 at 92.50&nbsp;Hz — rather than the
          fundamental itself.
        </p>
        <p>This has three practical consequences:</p>
        <ul>
          <li>
            <strong>Most playback systems cannot reproduce it.</strong> Laptop
            speakers, phone speakers, and small monitors have no output at
            31&nbsp;Hz. The note you hear through them is entirely harmonics.
          </li>
          <li>
            <strong>Tension and scale length matter more than anywhere else on
            the instrument.</strong> A slack B string produces an indistinct
            thud rather than a pitch. This is why 35-inch scales exist.
          </li>
          <li>
            <strong>Intonation errors are proportionally larger.</strong> The
            same physical saddle offset represents more cents of error at low
            frequencies. Set the B string's intonation carefully.
          </li>
        </ul>

        <h2>Why Add a Fifth String?</h2>
        <ul>
          <li>
            <strong>Extended low range.</strong> Five extra semitones below the
            standard low E, reaching notes a 4-string simply cannot play.
          </li>
          <li>
            <strong>Matching down-tuned guitars.</strong> A guitarist in{" "}
            <Link href="/drop-c-tuner">Drop C</Link> or lower goes below a
            standard bass's range. The B string covers it without retuning.
          </li>
          <li>
            <strong>Fewer position shifts.</strong> Notes you would reach by
            moving up the neck on the E string are available in position on the
            B string, which makes some lines far easier to play smoothly.
          </li>
          <li>
            <strong>A thumb rest.</strong> Many players who rarely play the B
            string keep it purely as a place to anchor the thumb.
          </li>
        </ul>

        <h2>Setup Notes for 5-String</h2>
        <p>
          The B string needs individual attention that the other four do not.
          Check that the nut slot is cut wide and deep enough — a .130 string
          binding in a slot cut for a thinner gauge is a very common cause of
          tuning instability, and it will make the string ping audibly as it
          slips. Set the saddle intonation for the B string last and check it at
          the 12th fret against the harmonic.
        </p>
        <p>
          For string gauge, .130 is the usual B on a 34-inch scale, and .125 is
          workable on 35 inches. Going lighter than .125 rarely produces a
          satisfying low B on any scale length.
        </p>

        <h2>Troubleshooting</h2>
        <p>
          <strong>The tuner will not register the open B at all.</strong> Use
          the 12th-fret octave method described above. This is the standard
          workaround and it is what most bassists do even with hardware tuners.
        </p>
        <p>
          <strong>The B reads an octave high.</strong> The tuner has locked onto
          the second harmonic. Pluck more gently and closer to the neck.
        </p>
        <p>
          <strong>The B sounds like a thud, not a note.</strong> That is tension
          or setup, not tuning. Check gauge, scale length, and pickup height —
          a pickup set too close to the B string will also choke it.
        </p>

        <p>
          Also available: the{" "}
          <Link href="/bass-tuner">standard 4-string bass tuner</Link>,{" "}
          <Link href="/7-string-guitar-tuner">7-string guitar tuner</Link>, and
          the <Link href="/">chromatic guitar tuner</Link>.
        </p>
      </TunerPageLayout>
    </>
  );
}
