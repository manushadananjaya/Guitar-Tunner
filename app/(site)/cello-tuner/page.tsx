import { Metadata } from "next";
import { languageAlternates } from "@/lib/i18n/pages";
import Link from "next/link";
import TunerPageLayout from "@/components/TunerPageLayout";
import { otherInstrumentsFor } from "@/lib/instrumentPages";

export const metadata: Metadata = {
  title: "Cello Tuner — Free Online C G D A Tuner",
  description:
    "Free online cello tuner. Tune your cello to C G D A with your microphone, right on this page. Accurate down to the low C at 65.41 Hz — no download.",
  alternates: {
    canonical: "/cello-tuner",
    languages: languageAlternates("/cello-tuner"),
  },
  openGraph: {
    title: "Cello Tuner — Free Online C G D A Tuner",
    description:
      "Tune your cello quickly and accurately using your device's microphone.",
  },
};

export default function CelloTunerPage() {
  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Cello Tuner - GuitarTunePro",
    url: "https://www.guitartunepro.com/cello-tuner",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description:
      "Free online cello tuner. Tune your cello to standard C G D A instantly.",
    browserRequirements: "Requires microphone access",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
      />
      <TunerPageLayout
        title="Cello Tuner"
        description="Tune your cello to C G D A using your microphone. The tuner below is already set for cello — press Start Recording and bow or pluck an open string."
        canonicalPath="/cello-tuner"
        initialGuitarType="cello"
        chartCaption="These are the exact target frequencies this tuner listens for, at A4 = 440 Hz equal temperament. String 1 is the A, the highest string — one octave below the orchestra's A440."
        otherTuners={otherInstrumentsFor("/cello-tuner")}
        faqs={[
          {
            question: "What are the notes of the cello strings?",
            answer:
              "From lowest to highest: C2, G2, D3, and A3. The strings are tuned in perfect fifths, exactly one octave below the viola. The A string is 220 Hz — one octave below the A = 440 Hz the orchestra tunes to.",
          },
          {
            question: "Why does the tuner show A3 and not A4 for my A string?",
            answer:
              "Because the cello's A string really is A3, at 220 Hz. When an orchestra sounds the tuning A at 440 Hz, cellists match it an octave lower. The note name is the same; the octave number is one lower.",
          },
          {
            question: "My phone struggles to read the C string. What can I do?",
            answer:
              "The C string's fundamental is 65.41 Hz, near the bottom of what phone microphones pick up well. Place the phone on the floor or a stand close to the cello's body rather than across the room, bow with a full, slow stroke near the fingerboard, and keep background noise low. The tuner also uses the string's overtones, so a strong, clean tone helps more than volume.",
          },
          {
            question: "Should I use the pegs or the fine tuners?",
            answer:
              "Fine tuners for small adjustments, pegs for large ones. Many cellos have fine tuners on all four strings; some only on the A. If a fine tuner is screwed nearly all the way in, back it out to the middle and bring the string up with the peg.",
          },
          {
            question: "Do smaller cellos use the same tuning?",
            answer:
              "Yes. Fractional cellos — 7/8, 3/4, 1/2, 1/4, 1/8 — all tune to C G D A at the same pitches as a full-size cello.",
          },
        ]}
        relatedArticles={[
          {
            title: "432 Hz vs 440 Hz Tuning",
            slug: "432-hz-vs-440-hz-tuning",
            description:
              "Where A = 440 came from, and why some ensembles tune higher.",
          },
          {
            title: "How to Use a Chromatic Tuner",
            slug: "how-to-use-a-chromatic-tuner",
            description:
              "Reading cents, needles, and note names on any chromatic tuner.",
          },
          {
            title: "How Temperature and Humidity Affect Tuning",
            slug: "how-temperature-and-humidity-affect-guitar-tuning",
            description:
              "Why a wooden instrument drifts between rooms and seasons.",
          },
        ]}
      >
        <h2>How to Use This Cello Tuner</h2>
        <ol>
          <li>
            Press <strong>Start Recording</strong> on the tuner above and allow
            microphone access.
          </li>
          <li>
            The <strong>Cello</strong> instrument is already selected.
          </li>
          <li>
            Bow the open A string (220.00&nbsp;Hz) with a long, even stroke and
            adjust until the needle centres at 0 cents.
          </li>
          <li>
            Tune the D (146.83&nbsp;Hz), the G (98.00&nbsp;Hz), and finally the
            C (65.41&nbsp;Hz).
          </li>
          <li>
            Check the A again. Raising the low strings increases the down-force
            on the bridge, which can pull the A slightly flat.
          </li>
        </ol>
        <p>
          Where you put your phone matters more on cello than on any other
          instrument here. The C and G strings are low enough that a microphone
          across the room hears more of the room than the cello. Prop the phone
          on the music stand or on the floor a short distance from the body.
        </p>

        <h2>Pegs, Fine Tuners, and the Endpin</h2>
        <p>
          <strong>Fine tuners</strong> on the tailpiece handle the everyday
          adjustment. Clockwise raises the pitch. Steel strings — common on
          student cellos and on the A string of most cellos — are very sensitive
          and should be tuned with the fine tuner.
        </p>
        <p>
          <strong>Pegs</strong> are for big changes. Cello pegs are large and
          need firm, steady pressure into the pegbox as you turn. Reach up with
          your left hand while you bow with the right, and make small moves: a
          few degrees of peg rotation is a large change in pitch.
        </p>
        <p>
          The <strong>endpin</strong> does not affect tuning, but setting it
          before you tune does. If you tune while holding the cello at an
          awkward angle and then reposition, you are likely to bump a peg.
          Settle into your playing position first.
        </p>

        <h2>Tuning in Fifths by Ear</h2>
        <p>
          Cellists traditionally tune the A to the orchestra, then play pairs of
          adjacent strings together — A with D, D with G, G with C — and adjust
          the lower string until the fifth rings without any pulsing. In the low
          register the beating is slow, sometimes only one pulse every second
          or two, so listen for longer than you would on a violin.
        </p>
        <p>
          A useful habit is to tune with the tuner, then immediately play each
          fifth. Over a few weeks your ear learns what a pure fifth sounds like
          on your own instrument.
        </p>

        <h2>Watch the Bridge</h2>
        <p>
          The bridge is held in place only by string pressure. Turning the pegs
          gradually pulls the top of the bridge towards the fingerboard, and
          after new strings it is worth checking from the side that the back of
          the bridge still stands at roughly a right angle to the top. A bridge
          that leans forward can warp or fall over. If you have not straightened
          one before, have a teacher or luthier show you.
        </p>

        <h2>Troubleshooting</h2>
        <p>
          <strong>The tuner reads the C string as a G.</strong> It is locking on
          to the third harmonic (G3). Bow closer to the fingerboard with a
          slower, heavier stroke, and move the phone closer.
        </p>
        <p>
          <strong>The needle drifts as the note dies away.</strong> Bowed
          strings start slightly sharp under heavy pressure and settle. Read the
          needle in the middle of a long, steady stroke, not at the start.
        </p>
        <p>
          <strong>The cello is flat every time I open the case.</strong> Usually
          temperature or humidity. Let the cello sit out of the case for a few
          minutes to reach room temperature before tuning.
        </p>

        <p>
          Also available: our <Link href="/viola-tuner">viola tuner</Link>,{" "}
          <Link href="/violin-tuner">violin tuner</Link>, and the{" "}
          <Link href="/metronome">online metronome</Link>.
        </p>
      </TunerPageLayout>
    </>
  );
}
