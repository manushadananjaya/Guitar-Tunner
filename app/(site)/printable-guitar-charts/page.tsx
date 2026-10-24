import { Metadata } from "next";
import Link from "next/link";
import { Printer } from "lucide-react";
import ToolPageLayout from "@/components/ToolPageLayout";
import { otherToolLinks } from "@/lib/toolPages";
import { PRINTABLE_SHEETS } from "@/lib/printables";

export const metadata: Metadata = {
  title: "Free Printable Guitar Charts and Sheets",
  description:
    "Free printable guitar charts: a 24-chord chart, major and minor chords in every key, fretboard notes, the pentatonic scale, blank tab and blank chord diagrams.",
  alternates: { canonical: "/printable-guitar-charts" },
  openGraph: {
    title: "Free Printable Guitar Charts — Chords, Fretboard, Scales, Blank Tab",
    description:
      "Six one-page guitar charts and sheets that print cleanly on A4 or US Letter, free to share for teaching.",
  },
};

function SheetCards() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {PRINTABLE_SHEETS.map((sheet) => (
        <Link
          key={sheet.slug}
          href={`/printable-guitar-charts/${sheet.slug}`}
          className="group flex flex-col justify-between rounded-2xl border border-line bg-surface-sunken/20 p-6 hover:border-brass/30 hover:bg-brass/5 transition-smooth"
        >
          <div>
            <p className="text-2xs font-bold uppercase tracking-widest text-brass mb-2">
              {sheet.orientation === "landscape" ? "Landscape" : "Portrait"} · 1 page
            </p>
            <h2 className="font-bold text-lg text-ink mb-2 group-hover:text-brass-hover transition-colors">{sheet.label}</h2>
            <p className="text-sm text-ink-muted leading-relaxed">{sheet.blurb}</p>
          </div>
          <span className="pt-4 inline-flex items-center gap-1.5 text-xs font-bold text-brass group-hover:translate-x-1 transition-transform duration-300">
            <Printer className="h-3.5 w-3.5" /> Open and print →
          </span>
        </Link>
      ))}
    </div>
  );
}

export default function PrintableChartsPage() {
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Printable guitar charts",
    itemListElement: PRINTABLE_SHEETS.map((sheet, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: sheet.title,
      url: `https://www.guitartunepro.com/printable-guitar-charts/${sheet.slug}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <ToolPageLayout
        title="Printable Guitar Charts"
        description="Six one-page charts and sheets for the practice room or the classroom. Open one, press Print, done — they fit A4 and US Letter."
        canonicalPath="/printable-guitar-charts"
        tool={<SheetCards />}
        otherTools={otherToolLinks("/printable-guitar-charts")}
        otherToolsHeading="Interactive Tools"
        faqs={[
          {
            question: "Are these free to use in lessons?",
            answer:
              "Yes. Print as many copies as you like for yourself, your students or your class, and share the link. Each sheet carries the site address in small print at the bottom so students can find the interactive versions.",
          },
          {
            question: "A4 or US Letter?",
            answer:
              "Both. The sheets scale to the width of whatever paper your printer uses, so pick your usual paper size. If your print dialog offers a scale option, choose 100% or fit to page.",
          },
          {
            question: "Why does my print come out with a dark background?",
            answer:
              "It should not — the sheets always print black on white, even if you browse in dark mode, and the site's menus and footer are left off. If your browser prints background colours, the sheet's white paper is all it will add.",
          },
          {
            question: "Can I save them as PDF?",
            answer:
              "Yes. In the print dialog, choose Save as PDF (or Microsoft Print to PDF on Windows) as the printer. The PDF keeps the diagrams sharp at any zoom, because they are drawn as vector graphics.",
          },
          {
            question: "Which sheet should a beginner start with?",
            answer:
              "The 24-chord chart. Learn the major and minor rows first, alongside the 30-day beginner course, then add the fretboard chart when you start on power chords and barre chords.",
          },
        ]}
        relatedArticles={[
          {
            title: "How to Read Guitar Tabs",
            slug: "how-to-read-guitar-tabs",
            description: "Before you fill in the blank tab paper.",
          },
          {
            title: "The Guitar Fretboard Notes Map",
            slug: "guitar-fretboard-notes-map",
            description: "The patterns behind the fretboard chart.",
          },
          {
            title: "Beginner Guitar Chord Progressions",
            slug: "beginner-guitar-chord-progressions",
            description: "What to play with the chords on the chord chart.",
          },
        ]}
      >
        <h2>What Each Sheet Is For</h2>
        <p>
          The <Link href="/printable-guitar-charts/guitar-chord-chart">guitar chord chart</Link> is
          the one to pin above the music stand: 24 chords that cover most beginner
          and intermediate songs. The{" "}
          <Link href="/printable-guitar-charts/major-minor-chords">major and minor chart</Link> fills
          in every other key. The{" "}
          <Link href="/printable-guitar-charts/fretboard-notes-chart">fretboard notes chart</Link> and{" "}
          <Link href="/printable-guitar-charts/pentatonic-scale-chart">pentatonic scale chart</Link> are
          for learning the neck and soloing. The{" "}
          <Link href="/printable-guitar-charts/blank-guitar-tab">blank tab</Link> and{" "}
          <Link href="/printable-guitar-charts/blank-chord-diagrams">blank chord diagrams</Link> are
          for writing your own songs, or handing students the chords for one.
        </p>
        <p>
          Every diagram is generated from the same chord and scale data as the
          site&apos;s interactive tools, and every chord shape in the library is
          checked against music theory before it ships — so what you print
          matches what the <Link href="/chords">chord library</Link> plays and
          what the <Link href="/scales">scale explorer</Link> shows.
        </p>

        <h2>Printing Tips</h2>
        <p>
          Open a sheet and press its Print button. The site&apos;s menus,
          footer and ads are left out automatically, and the page orientation
          is set for you — portrait for chord sheets and blank paper, landscape
          for the fretboard and scale charts. Use ordinary paper at normal
          quality; the diagrams are thin black lines and use very little ink.
        </p>
      </ToolPageLayout>
    </>
  );
}
