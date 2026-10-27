import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ToolPageLayout from "@/components/ToolPageLayout";
import { ScaleExplorer } from "@/components/ScaleExplorer/ScaleExplorer";
import { InlineText } from "@/components/InlineText";
import {
  SCALE_PAGES,
  getScalePage,
  intervalName,
  scalePageData,
} from "@/lib/music/scalePages";

export const dynamicParams = false;

export function generateStaticParams() {
  return SCALE_PAGES.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const page = getScalePage((await params).slug);
  if (!page) return {};
  return {
    title: `${page.name} — Guitar Positions`,
    description: page.metaDescription,
    alternates: { canonical: `/scales/${page.slug}` },
    openGraph: {
      title: `${page.name} on Guitar`,
      description: page.lede,
    },
  };
}

export default async function ScalePage({ params }: { params: Promise<{ slug: string }> }) {
  const page = getScalePage((await params).slug);
  if (!page) notFound();
  const { root, scale, notes, positions, chords } = scalePageData(page);
  const rootPosition = positions.find((p) => p.isRoot);
  const others = SCALE_PAGES.filter((p) => p.slug !== page.slug);

  const learningJsonLd = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    name: `${page.name} on Guitar`,
    url: `https://www.guitartunepro.com/scales/${page.slug}`,
    description: page.metaDescription,
    learningResourceType: "Interactive fretboard chart",
    educationalLevel: "Beginner to intermediate",
    about: { "@type": "Thing", name: page.name },
    isPartOf: {
      "@type": "WebApplication",
      name: "Guitar Scale Explorer - GuitarTunePro",
      url: "https://www.guitartunepro.com/scales",
    },
  };

  const reference = (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 mb-12 grid gap-6 md:grid-cols-2">
      <div>
        <h2 className="text-2xl font-bold text-ink mb-4">Notes and Intervals</h2>
        <div className="overflow-x-auto rounded-xl border border-line">
          <table className="w-full text-sm">
            <thead className="bg-surface/60 text-ink-muted">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">Note</th>
                <th className="px-4 py-3 text-left font-semibold">Interval</th>
                <th className="px-4 py-3 text-left font-semibold">From the root</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {notes.map((note) => (
                <tr key={note.step} className="bg-surface/20">
                  <td className="px-4 py-2.5 font-semibold text-ink">{note.name}</td>
                  <td className="px-4 py-2.5 font-mono text-brass">{note.interval}</td>
                  <td className="px-4 py-2.5 text-ink-muted">
                    {intervalName(note.interval)}
                    <span className="font-mono text-2xs text-ink-subtle"> · {note.step} semitones</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-bold text-ink mb-4">Positions in Standard Tuning</h2>
        <div className="overflow-x-auto rounded-xl border border-line">
          <table className="w-full text-sm">
            <thead className="bg-surface/60 text-ink-muted">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">Position</th>
                <th className="px-4 py-3 text-left font-semibold">Frets</th>
                <th className="px-4 py-3 text-left font-semibold">Low E string starts on</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {positions.map((position) => (
                <tr key={position.number} className={position.isRoot ? "bg-brass/10" : "bg-surface/20"}>
                  <td className="px-4 py-2.5 text-ink">{position.number}</td>
                  <td className="px-4 py-2.5 font-mono text-ink">
                    {position.from}–{position.to}
                  </td>
                  <td className="px-4 py-2.5 text-ink-muted">
                    {position.startsOn}
                    {position.isRoot && <span className="text-brass font-semibold"> · root</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-sm text-ink-muted">
          Positions are numbered from the lowest box on the neck, as in the
          explorer above. Add 12 to any of them for the same shape an octave
          higher.
        </p>
      </div>
    </section>
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(learningJsonLd) }}
      />
      <ToolPageLayout
        title={`${page.name} on Guitar`}
        description={page.lede}
        canonicalPath={`/scales/${page.slug}`}
        tool={<ScaleExplorer initialRoot={root.pitchClass} initialScale={scale.slug} syncUrl={false} />}
        afterTool={reference}
        otherTools={others.map((p) => ({ label: p.name, href: `/scales/${p.slug}` }))}
        otherToolsHeading="More Guitar Scales"
        faqs={page.faqs}
      >
        <h2>About the {page.name}</h2>
        {page.intro.map((paragraph, i) => (
          <p key={i}>
            <InlineText text={paragraph} />
          </p>
        ))}

        <h2>Finding It on the Fretboard</h2>
        <p>
          The scale has {notes.length} notes, so it has {positions.length}{" "}
          positions: five-fret windows that each start on a different scale
          note on the low E string.
          {rootPosition && (
            <>
              {" "}
              The one that starts on the root, {notes[0].name}, covers frets{" "}
              {rootPosition.from} to {rootPosition.to}
              {rootPosition.from === 0 ? " and uses open strings" : ""}. It is the
              shape most lessons teach first, and the easiest to keep your
              bearings in, because the root is under your hand on both E
              strings.
            </>
          )}{" "}
          Use the position buttons in the explorer to isolate each one, and
          switch the labels to intervals to see what every fret does in the
          scale.
        </p>

        {chords.length > 0 && (
          <>
            <h2>Chords in the Scale</h2>
            <p>
              Stacking every other note of the scale gives these seven chords.
              Any of them, and progressions made from them, can be played under
              the scale:
            </p>
            <ul>
              {chords.map((chord) => (
                <li key={chord.degree}>
                  <strong>{chord.degree}.</strong>{" "}
                  {chord.href ? <Link href={chord.href}>{chord.name}</Link> : chord.name}
                </li>
              ))}
            </ul>
          </>
        )}

        <h2>How to Practise It</h2>
        <ol>
          {page.practice.map((item, i) => (
            <li key={i}>
              <InlineText text={item} />
            </li>
          ))}
        </ol>
        <p>
          A steady reference makes every one of these more useful: open the{" "}
          <Link href={`/drone-generator?key=${root.slug}`}>
            drone generator on {root.name}
          </Link>{" "}
          in another tab and play against it.
        </p>

        <h2>{page.usageHeading}</h2>
        {page.usage.map((paragraph, i) => (
          <p key={i}>
            <InlineText text={paragraph} />
          </p>
        ))}

        <p>
          Explore every scale in every key in the{" "}
          <Link href="/scales">scale explorer</Link>, or print the{" "}
          <Link href="/printable-guitar-charts">free guitar charts</Link> to
          practise away from a screen.
        </p>
      </ToolPageLayout>
    </>
  );
}
