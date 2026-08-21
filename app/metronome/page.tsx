import { Metadata } from "next";
import Link from "next/link";
import ToolPageLayout from "@/components/ToolPageLayout";
import { Metronome } from "@/components/Metronome/Metronome";

export const metadata: Metadata = {
  title: "Online Metronome with Tap Tempo",
  description:
    "Free online metronome. Accurate BPM from 30 to 300, tap tempo, time signatures, and subdivisions. Runs in your browser — no download required.",
  alternates: { canonical: "/metronome" },
  openGraph: {
    title: "Online Metronome — Free Metronome with Tap Tempo",
    description:
      "A free, accurate browser metronome with tap tempo, time signatures, and subdivisions.",
  },
};

export default function MetronomePage() {
  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Online Metronome - GuitarTunePro",
    url: "https://www.guitartunepro.com/metronome",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description:
      "Free online metronome with tap tempo, adjustable time signatures, and subdivisions. 30-300 BPM.",
    featureList: [
      "30-300 BPM range",
      "Tap tempo",
      "Time signatures from 2 to 7 beats per measure",
      "Eighth, triplet, and sixteenth subdivisions",
      "Accented downbeat",
      "Keyboard shortcuts",
      "Sample-accurate Web Audio timing",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
      />
      <ToolPageLayout
        title="Online Metronome"
        description="A free, accurate metronome that runs in your browser. Set the tempo, pick a time signature, and press Start — or tap the beat you want."
        canonicalPath="/metronome"
        tool={<Metronome />}
        otherToolsHeading="Other Tools"
        otherTools={[
          { label: "Guitar Tuner", href: "/" },
          { label: "Bass Tuner", href: "/bass-tuner" },
          { label: "Ukulele Tuner", href: "/ukulele-tuner" },
          { label: "Drop D Tuner", href: "/drop-d-tuner" },
        ]}
        faqs={[
          {
            question: "What is a metronome used for?",
            answer:
              "A metronome sounds a steady click at a tempo you choose, giving you an external reference for time. Practising against one exposes the places where you unconsciously rush or drag — almost always the difficult bars — and trains you to hold a steady pulse instead.",
          },
          {
            question: "What tempo should I practise at?",
            answer:
              "Slow enough to play the passage perfectly, which is usually slower than feels satisfying. If you cannot play it cleanly three times in a row, the tempo is too fast. Once you can, raise it by about 5 BPM and repeat.",
          },
          {
            question: "How does tap tempo work?",
            answer:
              "Press the Tap button, or the T key, in time with the music at least twice. The metronome averages the gaps between your last few taps and sets that as the BPM. Pausing for more than two seconds starts a fresh measurement.",
          },
          {
            question: "Is this metronome accurate?",
            answer:
              "Yes. It schedules each click directly on the Web Audio clock, which is sample-accurate, rather than relying on JavaScript timers. Browser timers drift and get throttled — especially in background tabs — which is why many simple web metronomes wander noticeably over a minute or two. This one does not.",
          },
          {
            question: "What do the subdivision buttons do?",
            answer:
              "They add quieter clicks between the main beats: two for eighths, three for triplets, four for sixteenths. The main beats stay at your set BPM. Subdivisions are useful when a rhythm is hard to place, because they give you the smaller grid the notes actually sit on.",
          },
          {
            question: "Why does the metronome need a click to start?",
            answer:
              "Browsers block audio until you interact with the page, to stop sites from making noise on their own. Pressing Start is that interaction — after it, the metronome can sound freely.",
          },
        ]}
        relatedArticles={[
          {
            title: "How to Tune a Guitar for Beginners",
            slug: "how-to-tune-a-guitar-for-beginners",
            description: "Complete step-by-step guide to tuning your guitar.",
          },
          {
            title: "How to Use a Chromatic Tuner",
            slug: "how-to-use-a-chromatic-tuner",
            description:
              "Reading cents, needles, and note names on any chromatic tuner.",
          },
          {
            title: "Standard Tuning Explained",
            slug: "standard-tuning-explained",
            description:
              "Understand the notes and intervals behind E A D G B E.",
          },
        ]}
      >
        <h2>How to Use This Metronome</h2>
        <ol>
          <li>
            Set your tempo with the slider, the − and + buttons, or the arrow
            keys.
          </li>
          <li>
            Choose how many beats are in a measure. Four is the default; three
            gives you a waltz feel, six suits compound time.
          </li>
          <li>
            Pick a subdivision if you want clicks between the beats — eighths,
            triplets, or sixteenths.
          </li>
          <li>
            Press <strong>Start</strong>, or hit the space bar. The dots light
            in time, with the accented downbeat larger and brighter.
          </li>
        </ol>
        <p>
          If you know the tempo by feel but not by number, press{" "}
          <strong>Tap</strong> — or the T key — along with the music a few
          times, and the metronome will work out the BPM for you.
        </p>

        <h3>Keyboard Shortcuts</h3>
        <ul>
          <li>
            <strong>Space</strong> — start or stop
          </li>
          <li>
            <strong>↑ / →</strong> — tempo up 1 BPM
          </li>
          <li>
            <strong>↓ / ←</strong> — tempo down 1 BPM
          </li>
          <li>
            <strong>T</strong> — tap tempo
          </li>
        </ul>

        <h2>How to Actually Practise With a Metronome</h2>
        <p>
          Most people use a metronome as a pass/fail test: put it on, play the
          piece, feel bad. That is not what it is for. Used properly it is a
          diagnostic tool, and the diagnosis is usually more useful than the
          discipline.
        </p>

        <h3>Start slower than feels reasonable</h3>
        <p>
          The tempo to practise at is the fastest one where you can play the
          passage <em>perfectly</em>, not the fastest one where you can get
          through it. If you cannot play it cleanly three times in a row, you
          are practising your mistakes rather than the music. Drop the tempo
          until you can.
        </p>

        <h3>Raise the tempo in small steps</h3>
        <p>
          Once three clean repetitions are comfortable, add about 5&nbsp;BPM. If
          it falls apart, go back down. Progress is not linear and there will be
          a speed where you stall for days — that is normal, and it is where the
          actual learning happens.
        </p>

        <h3>Isolate the bar that breaks</h3>
        <p>
          When a piece falls apart, it is almost never the whole piece. It is
          one or two bars, usually a position shift or an awkward change. Loop
          just those bars at a tempo where they work, then rejoin them to the
          surrounding music.
        </p>

        <h3>Try clicking on beats 2 and 4</h3>
        <p>
          Once a steady four-on-the-floor click feels easy, set the metronome to
          half your tempo and hear it as beats 2 and 4 rather than 1 and 3. This
          is much harder and far more musical — it is how drummers and jazz
          players internalise time, and it exposes rushing that a click on every
          beat hides.
        </p>

        <h3>Then turn it off</h3>
        <p>
          The goal is not to depend on a click. Play a passage with the
          metronome, then immediately play it without and notice where you
          drift. That comparison is the whole point.
        </p>

        <h2>Tempo Markings</h2>
        <p>
          Written music often gives tempo as an Italian word rather than a
          number. The rough BPM equivalents this metronome uses:
        </p>
        <ul>
          <li>
            <strong>Grave</strong> — 25 to 40 BPM, very slow and solemn
          </li>
          <li>
            <strong>Largo</strong> — 40 to 60 BPM, broad
          </li>
          <li>
            <strong>Adagio</strong> — 60 to 76 BPM, slow and stately
          </li>
          <li>
            <strong>Andante</strong> — 76 to 108 BPM, walking pace
          </li>
          <li>
            <strong>Moderato</strong> — 108 to 120 BPM, moderate
          </li>
          <li>
            <strong>Allegro</strong> — 120 to 156 BPM, fast and bright
          </li>
          <li>
            <strong>Vivace</strong> — 156 to 176 BPM, lively
          </li>
          <li>
            <strong>Presto</strong> — 176 to 200 BPM, very fast
          </li>
          <li>
            <strong>Prestissimo</strong> — above 200 BPM, as fast as possible
          </li>
        </ul>
        <p>
          Treat these as approximate. They were descriptions of character before
          they were measurements of speed, and different periods and composers
          used them differently.
        </p>

        <h2>Why Browser Metronomes Often Drift</h2>
        <p>
          It is worth knowing why some free web metronomes wander, because it
          affects whether you can trust one.
        </p>
        <p>
          The naive way to build a metronome is to call{" "}
          <code>setInterval</code> at the beat interval and play a sound each
          time it fires. This does not work well. JavaScript timers are not
          precise — they are subject to a minimum clamp, they queue behind other
          work on the main thread, and browsers deliberately throttle them in
          background tabs, sometimes to once per second. Errors accumulate, so a
          metronome built this way can drift audibly within a minute.
        </p>
        <p>
          This metronome uses the approach that solves it. A timer still runs,
          but it never plays anything directly — it only looks ahead, finds the
          beats due in the next fraction of a second, and schedules them on the
          Web Audio clock with explicit start times. That clock runs on the
          audio hardware and is sample-accurate. The JavaScript timer can be
          late and the beats still land exactly where they should.
        </p>

        <h2>Metronome and Tuner Together</h2>
        <p>
          Tuning and timing are the two things worth getting right before
          anything else, and they are both quick. Tune first with our{" "}
          <Link href="/">free chromatic guitar tuner</Link>, then set a tempo
          here and start.
        </p>
        <p>
          One practical note: if you want to use the tuner and metronome at the
          same time, stop the metronome before tuning. The tuner listens through
          your microphone, and it will hear the clicks along with your strings.
        </p>

        <p>
          Other tools: the{" "}
          <Link href="/">chromatic guitar tuner</Link>,{" "}
          <Link href="/bass-tuner">bass tuner</Link>,{" "}
          <Link href="/ukulele-tuner">ukulele tuner</Link>, and our{" "}
          <Link href="/articles">guitar tuning articles</Link>.
        </p>
      </ToolPageLayout>
    </>
  );
}
