import { Metadata } from "next";
import Link from "next/link";
import ToolPageLayout from "@/components/ToolPageLayout";
import { DroneGenerator } from "@/components/DroneGenerator/DroneGenerator";
import { otherToolLinks } from "@/lib/toolPages";

export const metadata: Metadata = {
  title: "Drone Generator — Drone Notes in Any Key",
  description:
    "Free online drone generator. A steady drone or tanpura-style cycle in any key, at 440, 432 or 442 Hz — for intonation, scales and improvisation practice.",
  alternates: { canonical: "/drone-generator" },
  openGraph: {
    title: "Online Drone Generator — Any Key, Tanpura Mode",
    description:
      "Play a drone in any key to practise intonation and improvisation against. Root, fifth, octave or a plucked tanpura cycle.",
  },
};

export default function DroneGeneratorPage() {
  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Drone Generator - GuitarTunePro",
    url: "https://www.guitartunepro.com/drone-generator",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description:
      "Online drone generator with sustained root, fifth and octave drones and a tanpura-style plucked cycle in all twelve keys.",
    featureList: [
      "All twelve keys in three registers",
      "Root only, root and fifth, or root, fifth and octave",
      "Tanpura mode: a plucked Pa–Sa–Sa–Sa cycle",
      "Concert pitch 432, 440, 442 or 443 Hz",
      "Keeps playing in a background tab",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
      />
      <ToolPageLayout
        title="Drone Generator"
        description="A drone in any key to play against. Choose a key and a sound, press play, and practise scales, intonation or improvisation over it."
        canonicalPath="/drone-generator"
        tool={<DroneGenerator />}
        otherTools={otherToolLinks("/drone-generator")}
        faqs={[
          {
            question: "What is a drone?",
            answer:
              "A drone is a note, or a few notes, held continuously underneath the music. Bagpipes, the Indian tanpura and the low strings of a hurdy-gurdy all play drones. Practising over one gives every note you play a fixed reference, so you hear exactly how it relates to the key.",
          },
          {
            question: "Why practise with a drone?",
            answer:
              "Because it makes intonation and intervals audible. Over a drone, a note that is slightly out of tune produces a slow beating or roughness you cannot miss, and each scale degree has a distinct colour — the major third bright, the minor third dark, the fourth wanting to move. String players, singers and wind players use drones daily for exactly this.",
          },
          {
            question: "Which sound should I choose?",
            answer:
              "Root, fifth and octave is the fullest and suits most practice. Root and fifth leaves out nothing important and sounds more open. Root only is the strictest test of intonation, because nothing in the drone tells you whether the key is major or minor. Tanpura mode plucks a repeating cycle like the Indian instrument, which gives a sense of pulse.",
          },
          {
            question: "Is the drone major or minor?",
            answer:
              "Neither. The drone plays the root and fifth, which are the same in major and minor keys, so you can play the major scale, the minor scale or any mode over the same drone. The third you choose decides it.",
          },
          {
            question: "Does it keep playing if I switch tabs?",
            answer:
              "Yes, so you can open a scale, a chord chart or a metronome while it plays. Leaving or closing the page stops it.",
          },
          {
            question: "Can I use it to tune?",
            answer:
              "Yes, by ear. Play an open string that matches the drone's root and adjust until the beating stops. For a precise reading, the guitar tuner on our home page is quicker.",
          },
        ]}
        relatedArticles={[
          {
            title: "How to Tune a Guitar by Ear",
            slug: "how-to-tune-a-guitar-by-ear",
            description: "Listening for beats — the skill a drone trains.",
          },
          {
            title: "How to Find Your Vocal Range",
            slug: "how-to-find-your-vocal-range",
            description: "Singers: pick a drone key in your range.",
          },
          {
            title: "432 Hz vs 440 Hz Tuning",
            slug: "432-hz-vs-440-hz-tuning",
            description: "What the concert pitch setting changes.",
          },
        ]}
      >
        <h2>Four Ways to Practise With a Drone</h2>
        <h3>1. Slow scales for intonation</h3>
        <p>
          Play a scale in the drone&apos;s key one note at a time, holding each
          for four slow beats. Listen to how it sits against the drone. A note
          in tune blends; a note slightly out produces a wobble or roughness.
          On fretted instruments this trains your ear and your bending; on
          violin, cello, voice or trombone it trains where your notes land.
        </p>
        <h3>2. Hearing intervals</h3>
        <p>
          Play only one note over the drone and stay on it until you can
          describe its sound. The major third is sweet, the minor third
          sombre, the perfect fourth unresolved, the tritone tense, the major
          seventh pulling up to the root. Once each has a character, the{" "}
          <Link href="/ear-training">ear trainer</Link> gets much easier.
        </p>
        <h3>3. Modes</h3>
        <p>
          Keep the drone on one root and change the scale above it: major,
          then Mixolydian, then Dorian, then natural minor. Over a fixed root,
          the difference a single altered note makes is obvious. The{" "}
          <Link href="/scales">scale explorer</Link> shows the fingering for
          each mode in any key.
        </p>
        <h3>4. Improvisation</h3>
        <p>
          A drone is the simplest backing track there is: no chord changes to
          follow, so all your attention goes to melody and phrasing. Start
          with the <Link href="/scales/a-minor-pentatonic-scale">minor
          pentatonic</Link>, then add notes one at a time. When you want
          changes, loop a progression in the{" "}
          <Link href="/chord-progressions">chord progression builder</Link>.
        </p>

        <h2>The Tanpura</h2>
        <p>
          In Indian classical music, the tanpura provides the drone for the
          whole performance. It has no frets: the player plucks its four open
          strings in a slow, unbroken cycle, usually the fifth (Pa), the tonic
          twice (Sa) and the tonic an octave lower. Its special bridge makes
          each string buzz and bloom with overtones. Tanpura mode here plays
          that Pa–Sa–Sa–Sa cycle with long-ringing plucked notes — not a
          recording of the instrument, but the same reference for singing and
          playing ragas.
        </p>

        <h2>Choosing a Key and Register</h2>
        <p>
          Match the drone to what you are practising: the key of the piece, or
          the root of the scale. Low register sits under a guitar or a male
          voice; middle register suits most instruments and higher voices.
          Singers should pick a key where the tonic is comfortable to hold. If
          you are not sure what key a song is in, the{" "}
          <Link href="/key-finder">key finder</Link> will tell you.
        </p>
      </ToolPageLayout>
    </>
  );
}
