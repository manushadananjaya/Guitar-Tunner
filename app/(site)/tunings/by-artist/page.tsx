import { Metadata } from "next";
import Link from "next/link";
import ToolPageLayout from "@/components/ToolPageLayout";
import { otherToolLinks } from "@/lib/toolPages";

export const metadata: Metadata = {
  title: "Guitar Tunings by Band and Artist",
  description:
    "Which tuning did Hendrix, Metallica, the Stones or Foo Fighters use? Famous guitar tunings by artist, each linked to a free online tuner already set to it.",
  alternates: { canonical: "/tunings/by-artist" },
  openGraph: {
    title: "What Tuning Did They Use? Guitar Tunings by Band",
    description:
      "Documented tunings of well-known guitarists and bands, from E♭ standard to DADGAD, with a tuner for each.",
  },
};

interface ArtistTuning {
  artist: string;
  /** Hedged, documented example — an album, a song or "most of". */
  example: string;
}

interface TuningGroup {
  tuning: string;
  notes: string;
  href: string;
  linkLabel: string;
  artists: ArtistTuning[];
}

/** Only tunings that are widely documented — in interviews, official
 *  songbooks and long-standing transcriptions. Artists change tuning
 *  between albums and songs, so every entry names its scope. */
const GROUPS: TuningGroup[] = [
  {
    tuning: "Half step down (E♭ standard)",
    notes: "E♭ A♭ D♭ G♭ B♭ E♭",
    href: "/half-step-down-tuner",
    linkLabel: "Half step down tuner",
    artists: [
      { artist: "Jimi Hendrix", example: "Most of his recorded work" },
      { artist: "Stevie Ray Vaughan", example: "Most of his catalogue" },
      { artist: "Guns N' Roses", example: "Appetite for Destruction" },
      { artist: "Alice in Chains", example: "Much of their catalogue" },
      { artist: "Green Day", example: "\"Basket Case\" and much of Dookie" },
    ],
  },
  {
    tuning: "Drop D",
    notes: "D A D G B E",
    href: "/drop-d-tuner",
    linkLabel: "Drop D tuner",
    artists: [
      { artist: "Rage Against the Machine", example: "\"Killing in the Name\"" },
      { artist: "Foo Fighters", example: "\"Everlong\"" },
      { artist: "Tool", example: "Most of their catalogue" },
    ],
  },
  {
    tuning: "Full step down (D standard)",
    notes: "D G C F A D",
    href: "/full-step-down-tuner",
    linkLabel: "Full step down tuner",
    artists: [{ artist: "Metallica", example: "\"Sad but True\"" }],
  },
  {
    tuning: "C♯ standard",
    notes: "C♯ F♯ B E G♯ C♯",
    href: "/c-standard-tuner",
    linkLabel: "C standard tuner, then raise every string a semitone",
    artists: [{ artist: "Black Sabbath", example: "Master of Reality, including \"Children of the Grave\"" }],
  },
  {
    tuning: "C standard",
    notes: "C F B♭ E♭ G C",
    href: "/c-standard-tuner",
    linkLabel: "C standard tuner",
    artists: [{ artist: "Queens of the Stone Age", example: "Much of their catalogue" }],
  },
  {
    tuning: "Drop C",
    notes: "C G C F A D",
    href: "/drop-c-tuner",
    linkLabel: "Drop C tuner",
    artists: [{ artist: "System of a Down", example: "\"Chop Suey!\", \"Toxicity\" and most of their catalogue" }],
  },
  {
    tuning: "Open G",
    notes: "D G D G B D",
    href: "/open-g-tuner",
    linkLabel: "Open G tuner",
    artists: [
      {
        artist: "The Rolling Stones (Keith Richards)",
        example: "\"Honky Tonk Women\", \"Brown Sugar\", \"Start Me Up\" — usually with the low string removed",
      },
    ],
  },
  {
    tuning: "Open E",
    notes: "E B E G♯ B E",
    href: "/open-e-tuner",
    linkLabel: "Open E tuner",
    artists: [
      { artist: "Duane Allman", example: "His slide playing with the Allman Brothers Band" },
      { artist: "Derek Trucks", example: "Nearly all his slide playing" },
    ],
  },
  {
    tuning: "DADGAD",
    notes: "D A D G A D",
    href: "/dadgad-tuner",
    linkLabel: "DADGAD tuner",
    artists: [
      { artist: "Led Zeppelin (Jimmy Page)", example: "\"Kashmir\" and \"Black Mountain Side\"" },
      { artist: "Davy Graham", example: "Popularised the tuning in British folk in the 1960s" },
    ],
  },
  {
    tuning: "A standard (7-string)",
    notes: "A D G C F A D",
    href: "/7-string-guitar-tuner",
    linkLabel: "7-string tuner",
    artists: [{ artist: "Korn", example: "Most of their catalogue, on 7-string guitars" }],
  },
];

function ArtistTable() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col gap-8">
      {GROUPS.map((group) => (
        <section key={group.tuning} aria-labelledby={`t-${group.tuning}`}>
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-3">
            <h2 id={`t-${group.tuning}`} className="text-xl font-bold text-ink">
              {group.tuning}{" "}
              <span className="font-mono text-sm font-normal text-ink-muted">{group.notes}</span>
            </h2>
            <Link href={group.href} className="text-sm font-semibold text-brass hover:text-brass-hover">
              {group.linkLabel} →
            </Link>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-line bg-surface/40">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-line text-left text-2xs uppercase tracking-widest text-ink-subtle">
                  <th scope="col" className="px-4 py-2.5 font-bold w-2/5">Artist</th>
                  <th scope="col" className="px-4 py-2.5 font-bold">Where</th>
                </tr>
              </thead>
              <tbody>
                {group.artists.map((row) => (
                  <tr key={row.artist} className="border-b border-line last:border-0">
                    <th scope="row" className="px-4 py-2.5 text-left font-semibold text-ink">
                      {row.artist}
                    </th>
                    <td className="px-4 py-2.5 text-ink-muted">{row.example}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ))}
    </div>
  );
}

export default function TuningsByArtistPage() {
  return (
    <ToolPageLayout
      title="Guitar Tunings by Band and Artist"
      description="The tunings well-known guitarists are documented as using, grouped by tuning. Each one links to a tuner already set to it."
      canonicalPath="/tunings/by-artist"
      tool={<ArtistTable />}
      otherTools={otherToolLinks("/tunings/by-artist")}
      otherToolsHeading="Guitar Tools"
      faqs={[
        {
          question: "How do I find out what tuning a song is in?",
          answer:
            "Play along with the recording in standard tuning. If every chord is close but slightly flat, the song is probably half step down. If a riff's lowest note is a D below your low E, try Drop D. To check by ear, play the song's lowest note on a tuner, or let the key finder tell you the key and compare.",
        },
        {
          question: "Why do so many bands tune down a half step?",
          answer:
            "Mainly for singers and for feel. Half step down drops every song a semitone, which takes strain off a vocalist, and the lower string tension makes bends easier and the tone a little looser and fatter. Every chord shape stays the same.",
        },
        {
          question: "Why is my song still out of tune with the record after retuning?",
          answer:
            "Some recordings are not at standard pitch at all — tape machines ran slightly fast or slow, and some bands tuned to each other rather than to A = 440. If the gap is less than a semitone, tune to the record by ear, or set the tuner's reference pitch until the record matches.",
        },
        {
          question: "Do bands use the same tuning live?",
          answer:
            "Not always. Bands often settle on one tuning for a whole live set to avoid changing guitars, or drop an older song down to suit the singer's voice years later. The tunings here are for the recordings named.",
        },
      ]}
      relatedArticles={[
        {
          title: "Alternate Guitar Tunings You Should Try",
          slug: "alternate-guitar-tunings",
          description: "What each family of tunings is for.",
        },
        {
          title: "Drop D Tuning Guide for Rock and Metal",
          slug: "drop-d-tuning-guide",
          description: "The most popular tuning on this page, in depth.",
        },
        {
          title: "Standard Tuning Explained",
          slug: "standard-tuning-explained",
          description: "The starting point every other tuning moves from.",
        },
      ]}
    >
      <h2>How This List Was Put Together</h2>
      <p>
        Every entry here is widely documented: in interviews with the players,
        official songbooks, or transcriptions that have been checked against
        the records for years. Tunings that are disputed, or that change from
        song to song in ways that are hard to pin down, are left out rather than
        guessed. Players change tunings between albums, songs and tours, so
        each entry says where it applies.
      </p>
      <p>
        The <Link href="/tunings">tunings chart</Link> lists the frequency of
        every string in every tuning, and the{" "}
        <Link href="/key-finder">key finder</Link> can tell you the key of a
        recording you are trying to learn.
      </p>

      <h2>Four Patterns Worth Knowing</h2>
      <h3>Half step down was the default for decades</h3>
      <p>
        From blues-rock in the late 1960s to hair metal and grunge, an enormous
        amount of guitar music was recorded a semitone low. If an older rock
        song sounds slightly off when you play along, try{" "}
        <Link href="/half-step-down-tuner">half step down</Link> before anything
        else.
      </p>
      <h3>Heavier music went lower</h3>
      <p>
        Black Sabbath&apos;s down-tuning on <em>Master of Reality</em> set a
        direction that runs through doom, stoner rock, nu-metal and metalcore:
        lower tunings, heavier strings, and drop tunings for one-finger power
        chords. <Link href="/drop-d-tuner">Drop D</Link> led to{" "}
        <Link href="/drop-c-tuner">Drop C</Link>,{" "}
        <Link href="/drop-b-tuner">Drop B</Link> and the{" "}
        <Link href="/drop-a-tuner">7-string Drop A</Link>.
      </p>
      <h3>Slide players use open tunings</h3>
      <p>
        A slide plays straight across the strings, so it can only make full
        chords when the open strings form one. That is why slide guitarists —
        from Delta blues to the Allman Brothers — live in{" "}
        <Link href="/open-g-tuner">open G</Link>,{" "}
        <Link href="/open-d-tuner">open D</Link> and{" "}
        <Link href="/open-e-tuner">open E</Link>.
      </p>
      <h3>Folk and acoustic players use modal tunings</h3>
      <p>
        <Link href="/dadgad-tuner">DADGAD</Link> moved from 1960s British folk
        into rock through players like Jimmy Page. Its ringing open strings
        suit drones and melody far more than strumming, which is why it is so
        common in fingerstyle and Celtic music.
      </p>
    </ToolPageLayout>
  );
}
