import { Metadata } from "next";
import Link from "next/link";
import ArticleLayout from "@/components/ArticleLayout";

export const metadata: Metadata = {
  title: "How to Intonate Your Guitar: Step-by-Step Saddle Adjustment Guide",
  description:
    "Learn how to set proper guitar intonation using a chromatic tuner. This step-by-step guide explains what intonation is, how to check it, and how to adjust your saddles for perfect pitch across the full fretboard.",
  alternates: { canonical: "/articles/how-to-intonate-your-guitar" },
  openGraph: {
    title: "How to Intonate Your Guitar",
    description:
      "Fix guitars that sound out of tune higher up the neck with this saddle adjustment guide.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1516924962500-2b4b3b99ea02?w=1200&q=80",
        alt: "Electric guitar bridge and saddles",
      },
    ],
  },
};

export default function ArticlePage() {
  return (
    <ArticleLayout
      slug="how-to-intonate-your-guitar"
      title="How to Intonate Your Guitar"
      description="A complete, practical guide to checking and setting guitar intonation — what it is, why it matters, and exactly how to adjust each string's saddle for perfect pitch across the entire fretboard."
      datePublished="2024-12-05"
      dateModified="2025-03-01"
      readingTimeMinutes={10}
      heroImage={{
        src: "https://images.unsplash.com/photo-1516924962500-2b4b3b99ea02?w=900&q=80",
        alt: "Electric guitar bridge showing individual saddles",
        credit: "Photo: Unsplash",
      }}
      faqs={[
        {
          question: "What is guitar intonation?",
          answer:
            "Guitar intonation refers to whether your guitar plays in tune across the entire fretboard, not just at the open strings. A properly intonated guitar will produce the correct pitch whether you play at the 1st fret, the 7th fret, or the 12th fret. Poor intonation means your guitar sounds in tune on open strings but increasingly sharp or flat as you play higher up the neck.",
        },
        {
          question: "How do I know if my guitar's intonation is off?",
          answer:
            "The simple test: tune your guitar perfectly with an open string reading 0 cents. Then fret the same string at the 12th fret and check the tuner. The 12th fret note should also read 0 cents (it should be exactly one octave higher — same note name but higher octave). If the 12th fret note reads sharp (positive cents), the saddle needs to move back. If it reads flat, the saddle moves forward.",
        },
        {
          question: "Can I intonate an acoustic guitar at home?",
          answer:
            "Acoustic guitar intonation adjustment is more limited than on electric guitars because acoustic bridges usually have a single compensated saddle rather than individual adjustable saddles per string. Minor intonation adjustments can be made by carefully filing the saddle (removing material from the front or back edge), but this is generally a job for an experienced luthier as it's difficult to reverse. Many acoustic guitars have 'pre-compensated' saddles that approximate good intonation for typical string gauges.",
        },
        {
          question: "Does changing string gauge require re-intonation?",
          answer:
            "Yes, changing string gauge almost always requires re-intonating your guitar. The thicker or thinner strings have different stiffness and stretch characteristics that shift where each string plays in tune on the fretboard. Any time you change to a significantly different string gauge, plan to check and potentially reset your intonation.",
        },
        {
          question: "Why does the G string always seem hard to intonate?",
          answer:
            "The G string (3rd string) is notorious for intonation problems. On most standard electric sets, it's the thickest plain (unwound) steel string, and plain strings behave differently under tension than wound strings. The G string has proportionally higher stiffness relative to its diameter, which causes it to go sharp more easily when fretted. Some players use a wound G string to improve intonation consistency.",
        },
      ]}
      relatedArticles={[
        {
          title: "Why Your Guitar Goes Out of Tune",
          slug: "why-your-guitar-goes-out-of-tune",
          description:
            "Intonation problems are one of the top causes of perceived tuning issues.",
        },
        {
          title: "Best Guitar Strings for Tuning Stability",
          slug: "best-guitar-strings-for-tuning-stability",
          description:
            "String choice affects intonation as well as tuning stability.",
        },
        {
          title: "Acoustic vs Electric Guitar Tuning",
          slug: "acoustic-vs-electric-guitar-tuning",
          description:
            "How intonation adjustment differs between guitar types.",
        },
        {
          title: "How to Use a Chromatic Tuner",
          slug: "how-to-use-a-chromatic-tuner",
          description:
            "A precise tuner is essential for setting intonation correctly.",
        },
      ]}
    >
      <p>
        You've tuned your guitar perfectly — all six open strings read exactly 0
        cents on your tuner. But when you play an actual chord or melody,
        something sounds wrong.
      </p>

      <p>
        The higher up the neck you play, the more out of tune things sound. This
        is an intonation problem, and it's one of the most common guitar setup
        issues that players at all levels encounter.
      </p>
      <p>
        Unlike basic tuning, intonation is a physical adjustment to the bridge
        saddles — and once it's set correctly, your guitar will play in tune
        everywhere on the neck.
      </p>

      <h2>What Is Intonation, Exactly?</h2>
      <p>
        When you tune a guitar string, you're setting the pitch of the open
        string — the full vibrating length from nut to saddle. When you fret a
        note, you shorten the vibrating length of the string.
      </p>
      <p>
        The relationship between the fretted length and the open length
        determines the interval between them — ideally, each fret represents
        exactly one semitone, and the 12th fret represents exactly one octave
        above the open string.
      </p>
      <p>
        In theory, this relationship is pure physics: string length halved =
        pitch doubled (one octave up). But in practice, several factors disturb
        this ideal relationship:
      </p>
      <ul>
        <li>
          <strong>String stiffness:</strong> Stiffer strings (especially wound
          strings and thick gauges) don't follow the ideal harmonic series
          precisely. They vibrate slightly sharp compared to a perfectly
          flexible string.
        </li>
        <li>
          <strong>Fretting pressure:</strong> Pressing a string down to a fret
          also stretches it slightly, raising its pitch. This sharp-bending
          effect increases with action height.
        </li>
        <li>
          <strong>String height (action):</strong> Higher action means longer
          distance to press the string down, which means more bending and more
          sharpening when fretted.
        </li>
      </ul>
      <p>
        Intonation adjustment compensates for these factors by moving the saddle
        — the contact point at the bridge end of the string — slightly forward
        or backward.
      </p>

      <p>
        Moving the saddle back (away from the nut) lengthens the vibrating
        string length, making fretted notes flatter. Moving it forward (toward
        the nut) shortens it, making fretted notes sharper.
      </p>

      <figure className="my-8 rounded-xl overflow-hidden border border-white/5">
        <img
          src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=900&q=80"
          alt="Guitar bridge saddles close-up"
          className="w-full h-48 object-cover"
          loading="lazy"
        />
        <figcaption className="text-xs text-zinc-500 text-center py-2 bg-zinc-900/50">
          Individual bridge saddles are adjusted to set intonation for each
          string. Photo: Unsplash
        </figcaption>
      </figure>

      <h2>What You Need to Check and Set Intonation</h2>
      <ul>
        <li>
          A precise chromatic tuner (GuitarTunePro or a high-quality hardware
          tuner)
        </li>
        <li>
          A small screwdriver (flathead or Phillips, depending on your guitar's
          bridge design)
        </li>
        <li>
          Fresh strings (never set intonation on old strings — they won't
          intonate accurately)
        </li>
        <li>
          The correct screwdriver size for your bridge — test before starting to
          avoid stripping saddle screws
        </li>
      </ul>

      <h2>Step 1: Tune the Guitar</h2>
      <p>
        Start by tuning all six strings to pitch using your tuner. Every string
        should read 0 cents. This is your baseline.
      </p>

      <h2>Step 2: Check Intonation</h2>
      <p>For each string, do the following:</p>
      <ol>
        <li>
          Pluck the open string and confirm it reads the correct note at 0
          cents.
        </li>
        <li>
          Gently fret the same string at the 12th fret — the metal fret,
          pressing firmly but not excessively.
        </li>
        <li>
          Pluck the string and read the tuner.{" "}
          <strong>Do not touch the string between plucking and reading.</strong>
        </li>
        <li>
          Compare the 12th fret reading to 0 cents:
          <ul>
            <li>
              <strong>Sharp (positive cents):</strong> The vibrating string
              length is too short — the saddle needs to move back (away from the
              nut, toward the strap pin end).
            </li>
            <li>
              <strong>Flat (negative cents):</strong> The vibrating string
              length is too long — the saddle needs to move forward (toward the
              nut).
            </li>
            <li>
              <strong>0 cents:</strong> Intonation is correct for this string.
            </li>
          </ul>
        </li>
      </ol>

      <h2>Step 3: Adjust the Saddle</h2>
      <p>
        On most electric guitars (Stratocaster, Telecaster, Gibson-style
        tune-o-matic, hardtail bridges), each saddle has an individual
        adjustment screw at the back of the bridge. Turning this screw:
      </p>
      <ul>
        <li>
          <strong>Clockwise:</strong> Moves the saddle back (lengthens string,
          flattens intonation)
        </li>
        <li>
          <strong>Counter-clockwise:</strong> Moves the saddle forward (shortens
          string, sharpens intonation)
        </li>
      </ul>
      <p>
        Important:{" "}
        <strong>
          always de-tune the string slightly before adjusting the saddle.
        </strong>{" "}
        Moving a saddle under full string tension can strip the screw or damage
        the bridge mechanism. Loosen the string a half turn, make your saddle
        adjustment, then retune and check again.
      </p>

      <h2>Step 4: Retune and Recheck</h2>
      <p>After each saddle adjustment:</p>
      <ol>
        <li>Retune the open string to 0 cents.</li>
        <li>Check the 12th fret again.</li>
        <li>
          Repeat adjustments until the 12th fret reads 0 cents (or within ±1
          cent).
        </li>
      </ol>
      <p>
        The process typically takes 3–5 iterations per string before you
        converge on the correct saddle position. Be patient — small adjustments
        make a big difference.
      </p>

      <figure className="my-8 rounded-xl overflow-hidden border border-white/5">
        <img
          src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=900&q=80"
          alt="Guitarist checking intonation with tuner"
          className="w-full h-48 object-cover"
          loading="lazy"
        />
        <figcaption className="text-xs text-zinc-500 text-center py-2 bg-zinc-900/50">
          Patience and a precise tuner are the keys to perfect intonation.
          Photo: Unsplash
        </figcaption>
      </figure>

      <h2>Step 5: Do a Full-Fretboard Check</h2>
      <p>After setting the 12th fret for each string, do a broader check:</p>
      <ul>
        <li>Play a barre chord at the 5th fret — does it sound in tune?</li>
        <li>
          Play the same chord shape at the 7th and 9th frets — still in tune?
        </li>
        <li>
          Check individual notes at the 3rd, 5th, 7th, and 9th frets on each
          string
        </li>
      </ul>
      <p>
        If everything checks out at the 12th fret but the guitar still sounds
        off at lower positions, there may be nut height issues (not a saddle
        problem) that require nut slot filing.
      </p>

      <h2>Intonation on Different Guitar Types</h2>
      <h3>Stratocaster / Telecaster (American Standard bridge)</h3>
      <p>
        Individual saddle adjustment screws at the back of the bridge. Easy to
        adjust. On Telecasters, the 3-saddle bridge means two strings share each
        saddle — perfect individual intonation is not achievable, only a
        compromise position.
      </p>
      <h3>Gibson Tune-O-Matic</h3>
      <p>
        Each saddle can be slid forward or backward by turning the intonation
        screw. Some TOM saddle slots are reversed (the thumb screw faces the
        neck) — check before turning to ensure you're moving the saddle in the
        correct direction.
      </p>
      <h3>Floyd Rose</h3>
      <p>
        Loosen the locking screw at the bottom of the saddle with an Allen key,
        then adjust the saddle position with the intonation screw. Re-lock,
        retune (including locking the nut and using fine tuners), and check.
        Complex but same principle.
      </p>
      <h3>Acoustic Guitar</h3>
      <p>
        Most acoustic guitars have a fixed compensated saddle. Minor adjustments
        can be made by a luthier who carefully files the front or back edge of
        the saddle to move the effective contact point. This is not reversible,
        so it's best done professionally.
      </p>

      <h2>When to Re-Intonate</h2>
      <ul>
        <li>After changing string gauges</li>
        <li>
          After a significant action adjustment (truss rod or saddle height)
        </li>
        <li>After a neck reset or major repair</li>
        <li>
          If you notice chords sounding increasingly off-pitch further up the
          neck
        </li>
        <li>
          Seasonally, if neck movement from humidity changes has shifted your
          setup significantly
        </li>
      </ul>

      <p>
        With a good setup and proper intonation, your guitar should play in tune
        anywhere on the neck. Use <Link href="/">GuitarTunePro</Link> to verify
        your open string tuning and to make the precise measurements needed for
        accurate intonation setting.
      </p>
      <p>
        The process takes about 30–60 minutes the first time — and the
        improvement in playing experience is immediate and significant.
      </p>
    </ArticleLayout>
  );
}
