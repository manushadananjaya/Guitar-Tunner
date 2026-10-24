/** Share images for each kind of page, built from the same registries the
 *  pages themselves render from — so a card can never name a tuning or a
 *  chord differently from the page it links to. The `opengraph-image.tsx`
 *  file in each route folder is a one-line call into here. */

import { TUNER_PAGES } from "@/lib/tunerPages";
import { INSTRUMENT_PAGES } from "@/lib/instrumentPages";
import { TOOL_PAGES } from "@/lib/toolPages";
import { getChord } from "@/lib/chords";
import { getPrintableSheet } from "@/lib/printables";
import { getUkeChord } from "@/lib/ukulele/chords";
import { CONTENT } from "@/lib/i18n/content";
import { localNote, type Locale } from "@/lib/i18n/tuner";
import {
  ChordVisual,
  GaugeVisual,
  NoteChips,
  ResultsVisual,
  renderOgCard,
} from "@/lib/og/card";

export { OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og/card";

const CARD_TEXT: Record<Locale, { eyebrow: string; inTune: string; tuner: string; footnote?: string }> = {
  en: { eyebrow: "Online tuner", inTune: "In tune", tuner: "Tuner" },
  es: { eyebrow: "Afinador online", inTune: "Afinada", tuner: "Afinador", footnote: "Gratis · En tu navegador · Sin registro" },
  pt: { eyebrow: "Afinador online", inTune: "Afinado", tuner: "Afinador", footnote: "Grátis · No navegador · Sem cadastro" },
  fr: { eyebrow: "Accordeur en ligne", inTune: "Accordé", tuner: "Accordeur", footnote: "Gratuit · Dans le navigateur · Sans inscription" },
  de: { eyebrow: "Online-Stimmgerät", inTune: "Gestimmt", tuner: "Stimmgerät", footnote: "Kostenlos · Im Browser · Ohne Anmeldung" },
};

/** "D A D F♯ A D" → chips, with note names in the page's language. Doubled
 *  courses ("EE") and the banjo's lowercase drone string ("g") keep their
 *  shape. */
function localNotes(notes: string, locale: Locale) {
  return notes.split(" ").map((token) => {
    const doubled = /^([A-G][♯♭]?)\1$/.exec(token);
    if (doubled) return localNote(doubled[1], locale).repeat(2);
    if (/^[a-g]$/.test(token)) return localNote(token.toUpperCase(), locale).toLowerCase();
    return localNote(token, locale);
  });
}

const HOME_SUBTITLE =
  "Tune with your microphone, right in the browser. Standard, drop and open tunings, bass, ukulele, violin and more.";

/** The first sentence of a paragraph, for a card subtitle. */
const firstSentence = (text: string) => text.replace(/\*\*/g, "").split(/(?<=[.!?])\s/)[0];

/** Card for any tuner page, English or translated. `enPath` is the English
 *  page's path, the key shared by every registry. */
export function tunerOgImage(enPath: string, locale: Locale = "en") {
  const entry = [...TUNER_PAGES, ...INSTRUMENT_PAGES].find((page) => page.href === enPath);
  const text = CARD_TEXT[locale];
  const reference = entry && "reference" in entry ? entry.reference : undefined;
  const copy = locale === "en" ? undefined : CONTENT[locale].pages[enPath];

  const title =
    locale === "en"
      ? entry
        ? `${entry.label} Tuner`
        : "Free Online Guitar Tuner"
      : CONTENT[locale].labels[enPath] ?? text.tuner;
  // Hand-written Spanish routes have no registry copy; no subtitle beats an
  // English one on a Spanish card.
  const subtitle =
    locale === "en"
      ? entry?.blurb ?? HOME_SUBTITLE
      : copy && firstSentence(copy.intro);
  // The 432 Hz page is about pitch, not tuning: show the strings it tunes.
  const notes = reference ? "E A D G B E" : entry?.notes ?? "E A D G B E";

  return renderOgCard({
    eyebrow: text.eyebrow,
    title: title.replace(/(\d) Hz/g, "$1\u00a0Hz"),
    subtitle,
    detail: <NoteChips notes={localNotes(notes, locale)} />,
    visual: <GaugeVisual label={reference ? `${localNote("A", locale)} = ${reference} Hz` : text.inTune} />,
    footnote: text.footnote,
  });
}

export function tunerOgAlt(enPath: string) {
  const entry = [...TUNER_PAGES, ...INSTRUMENT_PAGES].find((page) => page.href === enPath);
  return entry ? `${entry.label} Tuner (${entry.notes}) — GuitarTunePro` : "GuitarTunePro online tuner";
}

/** Card for a standalone tool page, from its TOOL_PAGES entry. */
export function toolOgImage(href: string) {
  const tool = TOOL_PAGES.find((page) => page.href === href);
  return renderOgCard({
    eyebrow: tool?.tagline ?? "Guitar tool",
    title: tool?.label ?? "GuitarTunePro",
    subtitle: tool?.blurb,
  });
}

export function toolOgAlt(href: string) {
  const tool = TOOL_PAGES.find((page) => page.href === href);
  return tool ? `${tool.label} — ${tool.tagline} — GuitarTunePro` : "GuitarTunePro";
}

/** Card for a chord page: the first voicing's diagram beside its name. */
export function chordOgImage(slug: string) {
  const chord = getChord(slug);
  if (!chord) return toolOgImage("/chords");
  const voicing = chord.voicings[0];
  const count = chord.voicings.length;
  return renderOgCard({
    eyebrow: "Guitar chord",
    title: `${chord.name}${chord.quality.slug === "major" ? " major" : ""} chord`,
    subtitle: `${voicing.label}. ${count} voicing${count === 1 ? "" : "s"} with diagrams and audio.`,
    detail: <NoteChips notes={chord.notes.map((note) => note.name)} />,
    visual: <ChordVisual frets={voicing.frets} baseFret={voicing.baseFret} barreFret={voicing.barreFret} />,
  });
}

/** The tunings chart: a handful of tuning names as chips. */
export function tuningsOgImage() {
  return renderOgCard({
    eyebrow: "Tunings chart",
    title: "Every guitar tuning, string by string",
    subtitle: "Notes and exact frequencies for standard, drop, open and modal tunings — with a tuner for each.",
    detail: <NoteChips notes={["Drop D", "Drop B", "Open G", "DADGAD", "E♭ standard"]} />,
  });
}

/** The daily challenge: an example result grid, as people will share it. */
export function dailyChallengeOgImage() {
  return renderOgCard({
    eyebrow: "Daily challenge",
    title: "5 questions. One try each.",
    subtitle: "Two intervals, two chord types and a fretboard note — the same for every guitarist today.",
    visual: <ResultsVisual results={[true, true, false, true, true]} />,
    footnote: "New challenge every day at midnight",
  });
}

/** The beginner course: its four weeks as chips. */
export function courseOgImage() {
  return renderOgCard({
    eyebrow: "Free course",
    title: "Learn guitar in 30 days",
    subtitle: "Fifteen minutes a day, from tuning up to playing a whole song — with the right tool opened for every lesson.",
    detail: <NoteChips notes={["Week 1: first chords", "Week 2: strumming", "Week 3: riffs & blues", "Week 4: songs"]} />,
  });
}

/** Printable sheets and their hub. */
export function printableOgImage(slug?: string) {
  const sheet = slug ? getPrintableSheet(slug) : undefined;
  return renderOgCard({
    eyebrow: "Free printable",
    title: sheet?.title ?? "Printable guitar charts",
    subtitle: sheet?.blurb ?? "Chord charts, the fretboard, the pentatonic scale, blank tab and blank chord boxes — one page each, A4 or Letter.",
    footnote: "Free to print and share for teaching",
  });
}

/** Ukulele chord page: the easiest shape's diagram beside its name. */
export function ukeChordOgImage(slug: string) {
  const chord = getUkeChord(slug);
  if (!chord) return toolOgImage("/ukulele-chords");
  const voicing = chord.voicings[0];
  return renderOgCard({
    eyebrow: "Ukulele chord",
    title: `${chord.name}${chord.quality.slug === "major" ? " major" : ""} on ukulele`,
    subtitle: `${voicing.frets.join("")} in standard GCEA tuning. ${chord.voicings.length} shape${chord.voicings.length === 1 ? "" : "s"} with audio.`,
    detail: <NoteChips notes={chord.notes.map((note) => note.name)} />,
    visual: <ChordVisual frets={voicing.frets} baseFret={voicing.baseFret} barreFret={voicing.barreFret} />,
  });
}
