import { Metadata } from "next";
import Link from "next/link";
import ToolPageLayout from "@/components/ToolPageLayout";
import { StringTensionCalculator } from "@/components/StringTension/StringTensionCalculator";
import { otherToolLinks } from "@/lib/toolPages";

export const metadata: Metadata = {
  title: "Guitar String Tension Calculator",
  description:
    "Work out the tension on each guitar string for any gauge, tuning and scale length, and find the gauges that restore normal feel when you tune down.",
  alternates: { canonical: "/string-tension-calculator" },
  openGraph: {
    title: "String Tension Calculator for Guitar",
    description:
      "Per-string tension in lb or kg for any set, tuning and scale length — with gauge suggestions for drop and down tunings.",
  },
};

export default function StringTensionPage() {
  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "String Tension Calculator - GuitarTunePro",
    url: "https://www.guitartunepro.com/string-tension-calculator",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description:
      "Per-string and total tension for six-string guitar from gauge, tuning and scale length, compared against standard tuning, with single-string gauge suggestions that restore the original feel in drop and down tunings.",
    featureList: [
      "13 tunings from standard to Drop B",
      "13 common electric and acoustic sets, or custom gauges",
      "Seven scale lengths plus custom",
      "Per-string tension in lb or kg",
      "Percentage change against standard tuning",
      "Gauge suggestions that restore standard-tuning feel",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
      />
      <ToolPageLayout
        title="String Tension Calculator"
        description="How hard is each string pulling? Pick your tuning, set and scale length to see per-string tension, how it compares to standard, and which gauges would bring the feel back."
        canonicalPath="/string-tension-calculator"
        tool={<StringTensionCalculator />}
        otherTools={otherToolLinks("/string-tension-calculator")}
        faqs={[
          {
            question: "What is a normal amount of string tension?",
            answer:
              "A regular light electric set (10–46) on a 25.5-inch scale in standard tuning carries around 104 lb (47 kg) in total, or 15–20 lb per string. Light acoustic sets (12–53) sit near 160 lb. There is no right number — it is what you are used to that matters, which is why the calculator reports every result as a percentage of your own set in standard tuning.",
          },
          {
            question: "How much does tuning down reduce tension?",
            answer:
              "Each semitone lowers tension by about 11%, because tension scales with the square of frequency and a semitone is a 5.95% change in pitch. A half step down is roughly 89% of standard; a whole step is about 79%; Drop C's low string, two whole steps down, carries only about 63% of its standard tension.",
          },
          {
            question: "Which gauge should I use for Drop C or Drop B?",
            answer:
              "The set that gives each string close to the tension you are used to. Set the tuning and your normal set in the calculator and read the suggested gauges — for Drop C on a 25.5-inch scale, a player used to 10–46 will typically land on something like 11–56 or 12–60. Then buy the closest packaged set, or singles.",
          },
          {
            question: "Why does the scale length matter?",
            answer:
              "Tension goes with the square of the vibrating length. The same string tuned to the same note is about 6% tighter on a 25.5-inch Fender scale than on a 24.75-inch Gibson scale. It is why Les Pauls feel slinkier than Stratocasters with identical strings, and why baritones can run heavy gauges at low pitches without going floppy.",
          },
          {
            question: "How accurate are these numbers?",
            answer:
              "Within about 1% for plain steel strings, which are pure geometry, and within roughly 3% for wound strings, where the ratio of core to wrap varies between makers. That is smaller than the difference between two brands of the same gauge. The percentages and the gauge suggestions, which are what you act on, are more robust than the absolute figures.",
          },
          {
            question: "Should the 3rd string be plain or wound?",
            answer:
              "Electric sets use a plain 3rd up to about .020; acoustic sets and heavier electric sets use a wound 3rd from around .020 to .026. The calculator guesses wound at .020 and above, and the type button on each row lets you override it — a plain and a wound string of the same gauge differ in tension by about 10%.",
          },
        ]}
        relatedArticles={[
          {
            title: "Best Guitar Strings for Tuning Stability",
            slug: "best-guitar-strings-for-tuning-stability",
            description: "Materials, coatings and gauges that stay put.",
          },
          {
            title: "Drop D Tuning Guide",
            slug: "drop-d-tuning-guide",
            description: "The first drop tuning — and whether it needs a different set.",
          },
          {
            title: "How to Intonate Your Guitar",
            slug: "how-to-intonate-your-guitar",
            description: "A gauge change usually means a setup. Here is the part you can do yourself.",
          },
        ]}
      >
        <h2>How to Use the Calculator</h2>
        <ol>
          <li>
            Choose your tuning. Standard is the reference; everything is
            reported relative to it.
          </li>
          <li>
            Pick the set you normally play, or type gauges directly into the
            table. Gauges are in thousandths of an inch, so a .046 low E is
            entered as 46.
          </li>
          <li>
            Set your scale length. It is printed in your guitar&apos;s
            specifications; if you are unsure, 25.5&Prime; for Fender-style and
            most acoustics, 24.75&Prime; for Gibson-style.
          </li>
          <li>
            Read the table. Each string shows its tension, how far it is from
            that string in standard tuning, and a plain-language feel. The
            panel underneath suggests single-string gauges that would bring the
            feel back.
          </li>
        </ol>

        <h2>The Formula</h2>
        <p>
          String tension has a closed-form answer, and every string maker uses
          the same one:
        </p>
        <p className="font-mono text-center text-lg">
          T = UW × (2 × L × F)² ÷ 386.4
        </p>
        <p>
          <strong>T</strong> is tension in pounds. <strong>UW</strong> is the
          string&apos;s unit weight in pounds per inch — how much a one-inch
          length of it weighs. <strong>L</strong> is the vibrating length in
          inches, the scale length. <strong>F</strong> is the frequency in Hz,
          which we take from the same note table our{" "}
          <Link href="/">tuner</Link> listens for. 386.4 is the acceleration of
          gravity in inches per second squared, there to turn mass into weight.
        </p>
        <p>
          The two squared terms are what matter in practice. Double the scale
          length or the pitch and the tension quadruples. Go up one semitone
          and the pitch rises 5.95%, so the tension rises about 12%; go down one
          and it falls about 11%. Six semitones — Drop B on the low string
          against standard E — leaves 50%.
        </p>

        <h3>Where the unit weight comes from</h3>
        <p>
          A plain steel string is a cylinder of steel, so its unit weight is
          exactly its cross-sectional area times the density of steel
          (0.2833 lb/in³). No guesswork.
        </p>
        <p>
          A wound string is a steel core wrapped in nickel-plated steel, and the
          proportion of core to wrap changes with gauge, so there is no exact
          formula. Instead we fit a curve to the unit weights string makers
          publish for their nickel-wound sets. It lands within about 3% across
          the .020 to .060 range, which is a smaller gap than exists between
          two brands of nominally identical strings. Bronze-wound acoustic
          strings fall within a similar margin.
        </p>

        <h2>Why Tension Is Worth Knowing</h2>
        <h3>Tuning down</h3>
        <p>
          This is the most common reason to look. A 10–46 set in Drop C loses
          a third of its tension on the low string, and the result is a string
          that buzzes, goes sharp when you fret it hard, and will not hold
          pitch through a bend. The fix is not a higher action; it is a heavier
          string. The calculator tells you which one — and, just as usefully,
          which strings <em>don&apos;t</em> need changing. In Drop D only the
          sixth string moves, so only the sixth string needs a heavier gauge.
        </p>

        <h3>Balanced tension</h3>
        <p>
          Standard sets are not balanced. Look at 10–46 in standard tuning: the
          plain B string carries about 15 lb while the wound D carries over 18.
          Some players prefer sets where every string pulls about the same,
          because bends feel consistent across the neck. Type gauges into the
          table and watch the column until the numbers line up.
        </p>

        <h3>Changing scale length</h3>
        <p>
          Moving from a 25.5&Prime; to a 24.75&Prime; guitar with the same set
          drops tension by about 6% everywhere — the reason a Les Paul with 10s
          feels close to a Strat with 9.5s. Baritones go the other way: at
          27&Prime; a heavy set tuned to B feels roughly like a regular set at
          standard, which is the whole point of a baritone.
        </p>

        <h3>Neck relief and setup</h3>
        <p>
          The neck is a spring under the strings&apos; combined pull. Change
          the total by more than 10% or so and the relief changes with it —
          less tension lets the neck straighten and you get buzz; more bows it
          forward and the action rises. If the total in the calculator moves
          significantly, expect to adjust the truss rod, and probably the{" "}
          <Link href="/articles/how-to-intonate-your-guitar">intonation</Link>{" "}
          too, since a heavier string needs a slightly longer effective length.
        </p>

        <h2>Reading the Suggestions</h2>
        <p>
          The panel below the table finds, for each string, the stocked gauge
          whose tension in your chosen tuning is closest to what that string
          carries in your chosen set at standard pitch. It only searches gauges
          you can actually buy as singles, so the answer is something you can
          act on rather than a theoretical .0473.
        </p>
        <p>
          Strings that change are highlighted. Load the suggestions and the
          table updates, still measured against your original set, so you can
          see exactly how close the new gauges land. Then find the packaged set
          nearest to them, or buy singles — most shops stock every gauge on the
          list.
        </p>
        <p>
          After restringing, tune with the{" "}
          <Link href="/">chromatic tuner</Link> and give a new heavy set a day
          to settle; wound strings stretch noticeably in their first hours.
        </p>
      </ToolPageLayout>
    </>
  );
}
