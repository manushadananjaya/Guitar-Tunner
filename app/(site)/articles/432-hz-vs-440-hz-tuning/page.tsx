import { Metadata } from "next";
import Link from "next/link";
import ArticleLayout from "@/components/ArticleLayout";

export const metadata: Metadata = {
  title: "432 Hz vs 440 Hz Tuning",
  description:
    "What concert pitch actually is, where A=440 Hz came from, what tuning to 432 Hz does to your guitar, and whether any of the claims about it hold up.",
  alternates: { canonical: "/articles/432-hz-vs-440-hz-tuning" },
  openGraph: {
    title: "432 Hz vs 440 Hz Tuning",
    description:
      "Concert pitch explained, the history of A=440, and what changing the reference frequency really does.",
    images: [
      {
        url: "https://www.guitartunepro.com/Logo.png",
        alt: "GuitarTunePro — free online guitar tuner",
      },
    ],
  },
};

export default function ArticlePage() {
  return (
    <>
      <ArticleLayout
        slug="432-hz-vs-440-hz-tuning"
        title="432 Hz vs 440 Hz Tuning"
        description="A=440 Hz is the reference almost every tuner uses. 432 Hz is the alternative you keep hearing about. Here is what the difference actually is, and what it changes."
        datePublished="2026-09-02"
        dateModified="2026-10-17"
        readingTimeMinutes={8}
        faqs={[
          {
            question: "What is the actual difference between 432 Hz and 440 Hz?",
            answer:
              "It is the frequency assigned to the note A above middle C, which every other note is then derived from. At A=440, that A vibrates 440 times per second. At A=432, it vibrates 432 times per second. The whole system of pitches shifts down by about 32 cents — roughly a third of a semitone — but the musical relationships between notes stay identical.",
          },
          {
            question: "Is 432 Hz better for your ears or health?",
            answer:
              "There is no reliable evidence for the health, emotional, or 'resonance' claims made about 432 Hz. Controlled listening studies have not found consistent effects. What people are usually reacting to is that a track pitched down slightly sounds a touch warmer or more relaxed, which is a real perceptual difference but a small one and not unique to 432.",
          },
          {
            question: "Can I tune my guitar to 432 Hz?",
            answer:
              "Yes. You need a tuner that lets you change the reference pitch (sometimes labelled 'calibration' or 'A4'). Set it to 432, then tune every string as normal — the tuner does the maths. GuitarTunePro's accuracy page documents the reference frequencies it uses.",
          },
          {
            question: "Will playing at 432 Hz cause tuning or intonation problems?",
            answer:
              "No. Lowering every string by 32 cents reduces total tension very slightly, far less than a half-step drop, so the neck and setup are unaffected. Your existing intonation stays valid because the string lengths and relative pitches do not change.",
          },
          {
            question: "Do I need to retune to play along with other music?",
            answer:
              "Yes. If a backing track, band, or piano is at 440 and you are at 432, you will sound flat against them. Match whatever everyone else is using. 432 only works when the whole arrangement is at 432.",
          },
        ]}
        relatedArticles={[
          {
            title: "How to Use a Chromatic Tuner",
            slug: "how-to-use-a-chromatic-tuner",
            description:
              "Where the reference-pitch setting lives and how cents work.",
          },
          {
            title: "Standard Tuning Explained",
            slug: "standard-tuning-explained",
            description:
              "The note-and-interval system that 432 and 440 both sit on top of.",
          },
          {
            title: "How to Tune a Guitar by Ear",
            slug: "how-to-tune-a-guitar-by-ear",
            description:
              "Relative tuning works at any reference pitch, because it only compares strings to each other.",
          },
        ]}
      >
        <p>
          Almost every tuner you have ever used — clip-on, pedal, phone app, the
          one on this site — assumes that the note A above middle C is 440 Hz.
          That number is called concert pitch, and it is the anchor the other
          eleven notes are calculated from. Change it, and you have shifted the
          entire guitar.
        </p>
        <p>
          432 Hz is the best known alternative. It comes up constantly in
          YouTube comments and forum threads, usually wrapped in claims that it
          is more natural, more relaxing, or somehow tuned to the universe. It
          is worth separating what is true from what is not.
        </p>

        <h2>What Concert Pitch Is</h2>
        <p>
          Western music divides the octave into twelve equal steps. To turn that
          structure into actual frequencies, you need one fixed reference. By
          international agreement, that reference is A4 = 440 Hz. Every other
          pitch follows from it: each semitone up multiplies the frequency by
          the twelfth root of two (about 1.0595), each semitone down divides by
          it.
        </p>
        <p>
          So the low E string on a guitar at standard pitch works out to roughly
          82.41 Hz, and the high E to 329.63 Hz — both derived from that single
          A=440 anchor. Move the anchor and every one of those numbers moves with
          it, in exact proportion.
        </p>

        <h2>Where 440 Came From</h2>
        <p>
          Pitch was not always standard. Through the 1700s and 1800s, an "A"
          could sit anywhere from about 400 to 460 Hz depending on the country,
          the city, the church organ, or the opera house. Instrument makers and
          touring musicians hated it.
        </p>
        <p>
          A=440 was proposed at an international conference in 1939 and adopted
          as an ISO standard in 1955 (reaffirmed in 1975). The choice was
          practical, not mystical — it was close to the pitch many orchestras
          had already drifted toward, and having any single agreed number
          mattered far more than which number it was. Some modern orchestras
          tune slightly higher, to 442 or 443, for a brighter sound.
        </p>

        <h2>What 432 Actually Changes</h2>
        <p>
          Tuning to A=432 lowers concert pitch by about 32 cents — just under a
          third of a semitone. Concretely:
        </p>
        <ul>
          <li>
            Every note sounds slightly lower. The overall effect is subtle;
            most listeners would not identify it in isolation, though many
            describe a track pitched down a little as feeling warmer or calmer.
          </li>
          <li>
            The relationships between notes are untouched. An octave is still an
            octave, a fifth is still a fifth. Chord shapes, scales, and tab all
            work exactly as before.
          </li>
          <li>
            String tension drops a hair. Across all six strings the reduction is
            small — nothing like tuning{" "}
            <Link href="/half-step-down-tuner">a half-step down</Link> — so the
            setup, action, and{" "}
            <Link href="/articles/how-to-intonate-your-guitar">intonation</Link>{" "}
            are effectively unchanged.
          </li>
          <li>
            You are now incompatible with anything at 440. Play along with a
            440 recording and you will sound flat.
          </li>
        </ul>

        <h2>The Claims, and What Holds Up</h2>
        <p>
          The popular arguments for 432 usually involve mathematical
          coincidences (432 factors nicely, it relates to certain numbers in
          physics and geometry) and assertions about resonance with the body or
          the planet. When these have been tested in blind listening
          experiments, no consistent effect on mood, stress, or preference has
          shown up. People cannot reliably tell 432 from 440 without a reference.
        </p>
        <p>
          There is also a common myth that 440 was imposed for nefarious
          reasons in the 20th century. The historical record does not support
          it; standardisation was a slow, boring, committee-driven process aimed
          at letting musicians from different countries play together.
        </p>
        <p>
          None of that means 432 is pointless. If you are recording solo
          material and you prefer how it sits a little lower, that is a
          legitimate artistic choice — the same way a producer might pitch a
          whole mix down by a few cents to taste. Just do it because you like
          the result, not because of a claim about frequencies healing cells.
        </p>

        <h2>How to Try It</h2>
        <p>
          You need a tuner with an adjustable reference pitch. Look for a
          setting called <strong>calibration</strong>, <strong>A4</strong>, or{" "}
          <strong>reference</strong>, usually shown as a number near 440. Set it
          to 432 and tune each string normally — the tuner recalculates all the
          targets for you. Our <Link href="/432-hz-tuner">432 Hz tuner</Link>{" "}
          opens with that already set, and the settings panel on every other
          tuner page has the same control.
        </p>
        <p>
          If you are using a hardware tuner fixed at 440, you can still get
          close by ear: tune
          the guitar to itself using the{" "}
          <Link href="/articles/how-to-tune-a-guitar-by-ear">
            5th-fret method
          </Link>{" "}
          starting from a low E that you have pulled down about 32 cents (a
          hair under a third of the way to E flat). Relative tuning does not
          care what the reference is, as long as all six strings share it.
        </p>
        <p>
          Then record something, listen back the next day, and decide whether
          you actually prefer it. That is the only test that matters.
        </p>
      </ArticleLayout>
    </>
  );
}
