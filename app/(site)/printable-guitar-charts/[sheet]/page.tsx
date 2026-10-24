import { Fragment } from "react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ToolPageLayout from "@/components/ToolPageLayout";
import { SheetFrame } from "@/components/Printables/SheetFrame";
import {
  BeginnerChordSheet,
  BlankChordSheet,
  BlankTabSheet,
  FretboardNotesSheet,
  MajorMinorSheet,
  PentatonicSheet,
} from "@/components/Printables/Sheets";
import { PRINTABLE_SHEETS, getPrintableSheet } from "@/lib/printables";

const SHEETS: Record<string, () => React.ReactElement> = {
  "guitar-chord-chart": BeginnerChordSheet,
  "major-minor-chords": MajorMinorSheet,
  "fretboard-notes-chart": FretboardNotesSheet,
  "pentatonic-scale-chart": PentatonicSheet,
  "blank-guitar-tab": BlankTabSheet,
  "blank-chord-diagrams": BlankChordSheet,
};

export const dynamicParams = false;

export function generateStaticParams() {
  return PRINTABLE_SHEETS.map((sheet) => ({ sheet: sheet.slug }));
}

type Props = { params: Promise<{ sheet: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const sheet = getPrintableSheet((await params).sheet);
  if (!sheet) return {};
  const path = `/printable-guitar-charts/${sheet.slug}`;
  return {
    title: sheet.metaTitle,
    description: sheet.metaDescription,
    alternates: { canonical: path },
    openGraph: { title: sheet.title, description: sheet.metaDescription },
  };
}

export default async function PrintableSheetPage({ params }: Props) {
  const sheet = getPrintableSheet((await params).sheet);
  const Sheet = sheet && SHEETS[sheet.slug];
  if (!sheet || !Sheet) notFound();

  return (
    <ToolPageLayout
      title={sheet.title}
      description={sheet.blurb}
      canonicalPath={`/printable-guitar-charts/${sheet.slug}`}
      tool={
        <SheetFrame orientation={sheet.orientation}>
          <Sheet />
        </SheetFrame>
      }
      otherTools={[
        { label: "All printable charts", href: "/printable-guitar-charts" },
        ...PRINTABLE_SHEETS.filter((s) => s.slug !== sheet.slug).map((s) => ({
          label: s.label,
          href: `/printable-guitar-charts/${s.slug}`,
        })),
      ]}
      otherToolsHeading="More Printable Charts"
    >
      {sheet.sections.map((section) => (
        <Fragment key={section.heading}>
          <h2>{section.heading}</h2>
          {section.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </Fragment>
      ))}
      <h2>Use It With</h2>
      <ul>
        {sheet.related.map((r) => (
          <li key={r.href}>
            <Link href={r.href}>{r.label}</Link>
          </li>
        ))}
      </ul>
    </ToolPageLayout>
  );
}
