import { Metadata } from "next";
import Link from "next/link";
import ToolPageLayout from "@/components/ToolPageLayout";
import { IntonationChecker } from "@/components/IntonationChecker/IntonationChecker";
import { otherToolLinks } from "@/lib/toolPages";

export const metadata: Metadata = {
  title: "Guitar Intonation Checker (Uses Your Mic)",
  description:
    "Check guitar intonation with your microphone: compare the 12th-fret harmonic and fretted note on each string and see which way to move each saddle.",
  alternates: { canonical: "/intonation-checker" },
  openGraph: {
    title: "Guitar Intonation Checker",
    description:
      "Harmonic versus fretted 12th, string by string, measured in cents, with saddle adjustment directions.",
  },
};

export default function IntonationCheckerPage() {
  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Guitar Intonation Checker - GuitarTunePro",
    url: "https://www.guitartunepro.com/intonation-checker",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description:
      "Browser-based guitar intonation checker that measures the 12th-fret harmonic and fretted note on each string through the microphone and gives saddle adjustment directions.",
    featureList: [
      "Measures harmonic and fretted 12th in cents",
      "Works string by string, in any six-string tuning",
      "Tells you which way to move each saddle",
      "Results saved per tuning, so you can re-check after adjusting",
      "Audio processed in your browser only",
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }} />
      <ToolPageLayout
        title="Guitar Intonation Checker"
        description="Play the 12th-fret harmonic, then the fretted 12th, on each string. The checker measures both through your microphone and tells you which way to move the saddle."
        canonicalPath="/intonation-checker"
        tool={<IntonationChecker />}
        otherTools={otherToolLinks("/intonation-checker")}
        faqs={[
          {
            question: "What is guitar intonation?",
            answer:
              "Intonation is whether the guitar plays in tune as you go up the neck. A guitar can be perfectly tuned on its open strings and still play sharp or flat higher up if the string length, set by the saddle position, is slightly wrong. Checking at the 12th fret is the standard test, because that note should be exactly one octave above the open string.",
          },
          {
            question: "How accurate does intonation need to be?",
            answer:
              "Within about ±3 cents at the 12th fret is good, and that is the tolerance this checker uses. Most people cannot hear a difference of a few cents in a single note, and string age, playing pressure, and room temperature all move the reading by a cent or two from one check to the next.",
          },
          {
            question: "Fretted note sharp — which way does the saddle go?",
            answer:
              "Back, away from the neck. That lengthens the string, which lowers the pitch of the fretted note. If the fretted note is flat, move the saddle forward, toward the neck. Retune the open string after every adjustment and measure again.",
          },
          {
            question: "Why use the harmonic instead of the open string?",
            answer:
              "The 12th-fret harmonic sounds exactly one octave above the open string, so it is the ideal reference for the fretted 12th: same octave, same string, measured seconds apart. It also takes out any small tuning error in the open string, since both notes are compared with each other.",
          },
          {
            question: "Can I adjust intonation on an acoustic guitar?",
            answer:
              "Not with a screwdriver. Most acoustics have a fixed saddle, and correcting intonation means a luthier reshaping or replacing it. This checker will still tell you whether your acoustic is off, which is useful to know before you take it in.",
          },
          {
            question: "Do I need new strings first?",
            answer:
              "Ideally, yes. Old strings wear unevenly and lose their consistency along the length, which makes intonation readings drift. Set intonation with the strings and gauge you will actually play, at the tuning you will use.",
          },
        ]}
        relatedArticles={[
          {
            title: "How to Intonate Your Guitar",
            slug: "how-to-intonate-your-guitar",
            description: "The full step-by-step guide to adjusting saddles on electric and bass.",
          },
          {
            title: "Why Your Guitar Goes Out of Tune",
            slug: "why-your-guitar-goes-out-of-tune",
            description: "Intonation is one cause. Here are the others.",
          },
          {
            title: "Best Guitar Strings for Tuning Stability",
            slug: "best-guitar-strings-for-tuning-stability",
            description: "Fresh, stable strings make intonation readings repeatable.",
          },
        ]}
      >
        <h2>How to Check Your Intonation</h2>
        <ol>
          <li>
            Put on the strings you play and tune to pitch with the <Link href="/">tuner</Link>. Sit the way you
            normally play, because the neck relief changes slightly when the guitar is held.
          </li>
          <li>
            Choose your <strong>tuning</strong>, start the <strong>microphone</strong>, and press{" "}
            <strong>Check this string</strong> on string 6.
          </li>
          <li>
            Play the <strong>12th-fret harmonic</strong>: touch the string lightly directly above the 12th fret wire,
            pluck firmly, and lift your finger. Let it ring until the bar fills.
          </li>
          <li>
            When it says got it, mute the string. Two seconds later it listens for the{" "}
            <strong>fretted 12th</strong>. Press just behind the 12th fret with normal pressure and let it ring.
          </li>
          <li>
            Read the result. The number is the fretted note minus the harmonic, in cents, with the direction to
            move the saddle if you need to. Repeat for each string.
          </li>
        </ol>
        <p>
          A clip-on or nearby phone microphone works fine for an acoustic. For an electric, play through a small
          amp near the device, or close to the mic unplugged in a quiet room.
        </p>

        <h2>What the Numbers Mean</h2>
        <p>
          Each card shows three readings. <strong>Harmonic</strong> is how far the harmonic is from the ideal
          octave. If it is more than a few cents off, the open string is out of tune; retune it before going on.{" "}
          <strong>Fretted 12th</strong> is the same measurement for the fretted note. The headline figure is the{" "}
          <strong>difference</strong> between the two, and that is the intonation:
        </p>
        <ul>
          <li><strong>Within ±3¢:</strong> good. Leave it alone.</li>
          <li><strong>Positive (sharp):</strong> the string is too short. Move the saddle back, away from the neck.</li>
          <li><strong>Negative (flat):</strong> the string is too long. Move the saddle forward, toward the neck.</li>
        </ul>
        <p>
          A useful rule of thumb on many electric bridges is that a full turn of the intonation screw moves the
          reading a few cents. It varies with the bridge and the string, so make small adjustments and measure
          again rather than turning a lot at once.
        </p>

        <h2>Why Fretted Notes Go Sharp</h2>
        <p>
          In theory, the 12th fret sits exactly halfway along the string, so the fretted note is an exact octave.
          In practice, pressing a string down to the fret stretches it slightly, and stretching raises the pitch.
          Thicker strings stretch more and bend less easily, so they need extra length to compensate. That is why
          the saddles on a well-set-up electric form a slanted, stepped line, with the wound strings set further
          back.
        </p>
        <p>
          Anything that changes how far the string has to travel to the fret changes intonation: a higher action,
          a heavier gauge, a lower tuning, or more neck relief. So after a change of string gauge, a{" "}
          <Link href="/drop-c-tuner">drop tuning</Link>, or an action adjustment, check intonation again. The{" "}
          <Link href="/string-tension-calculator">string tension calculator</Link> shows how much a tuning or gauge
          change alters the load on each string.
        </p>

        <h2>Adjusting the Saddles</h2>
        <p>
          On most electric guitars and basses, each saddle has a screw at the back of the bridge. Turning it moves
          that saddle forward or back. Detune the string slightly before moving the saddle, since that is kinder to
          the saddle and the string, then tune back up and measure again. Make small moves. Go through all six
          strings, then do a second pass. Adjusting one string can shift the others slightly through the bridge
          and neck.
        </p>
        <p>
          The <Link href="/articles/how-to-intonate-your-guitar">intonation guide</Link> covers the whole job in
          more detail, including Tune-o-matic bridges, Telecaster barrel saddles, and when to leave it to a
          technician.
        </p>

        <h2>Getting a Clean Reading</h2>
        <ul>
          <li>Work in a quiet room. Any background note, such as a fridge hum or music, can confuse the reading.</li>
          <li>Pluck at your normal strength. Very hard plucks start sharp; the checker ignores the attack, but a gentle, even pluck helps.</li>
          <li>Do not squeeze the fretted note. Press only as hard as you would to play it. Extra pressure pushes the note sharp and gives a false result.</li>
          <li>Measure a string twice if a result surprises you. Two readings within a cent of each other can be trusted.</li>
        </ul>
        <p>
          Audio is processed entirely in your browser and never recorded or uploaded. Results are saved on this
          device for each tuning, so you can adjust a saddle, come back later, and re-check just that string.
        </p>
      </ToolPageLayout>
    </>
  );
}
