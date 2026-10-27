import { Metadata } from "next";
import Link from "next/link";
import ToolPageLayout from "@/components/ToolPageLayout";
import { KeyFinder } from "@/components/KeyFinder/KeyFinder";
import { otherToolLinks } from "@/lib/toolPages";

export const metadata: Metadata = {
  title: "Key Finder — What Key Is This Song In?",
  description:
    "Free online key finder. Play or sing a song into your microphone, or type its chords, and find the key it is in — with its relative key and scale.",
  alternates: { canonical: "/key-finder" },
  openGraph: {
    title: "Song Key Finder — Listen or Type the Chords",
    description:
      "Find the key of any song from your microphone or from its chords, right in the browser.",
  },
};

export default function KeyFinderPage() {
  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Key Finder - GuitarTunePro",
    url: "https://www.guitartunepro.com/key-finder",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description:
      "Find the musical key of a song by listening through the microphone or from a list of chords.",
    browserRequirements: "Microphone optional",
    featureList: [
      "Listens to chords, melodies or a whole recording",
      "Ranks all 24 major and minor keys",
      "Chord mode: type the chords instead",
      "Shows the relative major or minor",
      "Links to the scale, chords and capo position for the key",
      "Audio is analysed on your device and never uploaded",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
      />
      <ToolPageLayout
        title="Key Finder"
        description="Find out what key a song is in. Play it into your microphone — on your instrument, by singing, or from a speaker — or type its chords."
        canonicalPath="/key-finder"
        tool={<KeyFinder />}
        otherTools={otherToolLinks("/key-finder")}
        faqs={[
          {
            question: "How does the key finder work?",
            answer:
              "It listens to the sound, measures how much of each of the twelve notes it hears over time, and compares that profile with how strongly each note belongs to each of the 24 major and minor keys. The key whose profile matches best is the answer. It never needs to name individual notes, which is why it works on chords and full recordings, not just single notes.",
          },
          {
            question: "Is my audio recorded or uploaded?",
            answer:
              "No. The analysis runs in your browser, on your device, and only a running total of twelve numbers is kept. Nothing is recorded, stored or sent anywhere. Stopping the key finder releases the microphone.",
          },
          {
            question: "Why does it say a major key when the song sounds minor?",
            answer:
              "Every major key has a relative minor that uses exactly the same notes — C major and A minor, G major and E minor. From notes alone the two are close, and the key finder shows both. The one the song is really in is the one it feels like it comes home to: listen to the last chord, and the chord the chorus lands on.",
          },
          {
            question: "How long should I play for?",
            answer:
              "At least a verse and a chorus — 20 to 30 seconds. The first guess appears after four seconds, but a few chords can belong to several keys, and the answer settles as more of the song is heard. Press Start over to clear what it has heard before trying a new song.",
          },
          {
            question: "What if a song changes key?",
            answer:
              "The key finder adds up everything it hears, so after a key change it will show a blend that may match neither key well. Start over at the key change to analyse the new section on its own.",
          },
          {
            question: "Which mode is more accurate?",
            answer:
              "If you know the chords, typing them is the most reliable, because it removes room noise and overtones from the question. Listening is better when you do not know the chords, or the song is a melody with no chords at all.",
          },
        ]}
        relatedArticles={[
          {
            title: "Beginner Guitar Chord Progressions",
            slug: "beginner-guitar-chord-progressions",
            description: "The progressions most songs in a key are built from.",
          },
          {
            title: "How to Find Your Vocal Range",
            slug: "how-to-find-your-vocal-range",
            description: "Then pick a key that suits your voice.",
          },
          {
            title: "Does a Capo Affect Guitar Tuning?",
            slug: "does-a-capo-affect-guitar-tuning",
            description: "Changing key with a capo, and keeping it in tune.",
          },
        ]}
      >
        <h2>How to Find the Key of a Song</h2>
        <ol>
          <li>
            Press <strong>Start listening</strong> and allow the microphone.
          </li>
          <li>
            Play the song: strum the chords, sing or hum the melody, or play
            the recording from a speaker near your phone or computer.
          </li>
          <li>
            Keep going for a verse and a chorus. The bars show which notes it
            has heard most; the key appears after a few seconds and firms up as
            it hears more.
          </li>
          <li>
            Check the relative key. If the song feels like it settles on the
            minor chord, it is in the relative minor.
          </li>
        </ol>
        <p>
          If you already have the chords from a chord sheet, switch to{" "}
          <strong>Type the chords</strong> and enter them in order. That mode
          checks which key the chords belong to and gives extra weight to the
          first and last chord, which are usually the home chord.
        </p>

        <h2>What &quot;Key&quot; Means</h2>
        <p>
          A song&apos;s key is the scale its notes are drawn from and the chord
          it treats as home. A song in G major uses the notes of the G major
          scale, its chords are mostly the seven chords built from that scale —
          G, Am, Bm, C, D, Em and F♯dim — and it feels finished when it lands
          on G. The{" "}
          <Link href="/circle-of-fifths">circle of fifths</Link> lists the
          chords for every key.
        </p>
        <p>
          Knowing the key tells you which scale to solo with, which chords are
          likely to come next, and how far to move a song to suit your voice.
          To play it in another key, the{" "}
          <Link href="/chord-transposer">chord transposer</Link> rewrites the
          chords, and the <Link href="/capo-calculator">capo calculator</Link>{" "}
          finds a capo fret that keeps the shapes easy.
        </p>

        <h2>Getting a Reliable Result</h2>
        <ul>
          <li>
            <strong>Reduce other sound.</strong> Fans, traffic and the TV all
            add notes. A quiet room gives a cleaner profile.
          </li>
          <li>
            <strong>Play the whole progression.</strong> Two chords can belong
            to half a dozen keys; four to eight usually belong to one.
          </li>
          <li>
            <strong>Let chords ring.</strong> Sustained chords give a clearer
            picture than heavily muted rhythm playing.
          </li>
          <li>
            <strong>Check a borderline result by ear.</strong> Turn on the{" "}
            <Link href="/drone-generator">drone generator</Link> in the key
            it suggests and play along. If the song sits comfortably over the
            drone, the key is right.
          </li>
        </ul>

        <h2>Modes and Borrowed Chords</h2>
        <p>
          Not every song fits a plain major or minor key. Blues and rock songs
          often use a major chord on the root with a flat seventh (Mixolydian),
          and minor songs often swap in a major V chord from the harmonic
          minor. The key finder will still give the closest major or minor key
          — usually the right root — and the{" "}
          <Link href="/scales">scale explorer</Link> shows the modes that fit
          songs that lean outside it.
        </p>
      </ToolPageLayout>
    </>
  );
}
