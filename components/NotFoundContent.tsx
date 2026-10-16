import Link from "next/link";
import type { Locale } from "@/lib/i18n/tuner";
import { TRANSLATED_PAGES } from "@/lib/i18n/pages";

const TEXT: Record<
  Locale,
  { heading: string; body: string; home: string; or: string }
> = {
  en: {
    heading: "Page not found",
    body: "That page doesn’t exist — maybe the link is old or mistyped.",
    home: "Open the guitar tuner",
    or: "Or go straight to:",
  },
  es: {
    heading: "Página no encontrada",
    body: "Esta página no existe; quizá el enlace es antiguo o tiene un error.",
    home: "Abrir el afinador de guitarra",
    or: "O ve directamente a:",
  },
  pt: {
    heading: "Página não encontrada",
    body: "Esta página não existe; talvez o link esteja antigo ou com erro.",
    home: "Abrir o afinador de violão",
    or: "Ou vá direto para:",
  },
  fr: {
    heading: "Page introuvable",
    body: "Cette page n’existe pas ; le lien est peut-être ancien ou erroné.",
    home: "Ouvrir l’accordeur de guitare",
    or: "Ou allez directement à :",
  },
  de: {
    heading: "Seite nicht gefunden",
    body: "Diese Seite gibt es nicht – vielleicht ist der Link veraltet oder falsch.",
    home: "Gitarren-Stimmgerät öffnen",
    or: "Oder direkt zu:",
  },
};

const SUGGESTIONS: { en: string; labels: Record<Locale, string> }[] = [
  {
    en: "/bass-tuner",
    labels: { en: "Bass tuner", es: "Afinador de bajo", pt: "Afinador de baixo", fr: "Accordeur de basse", de: "Bass stimmen" },
  },
  {
    en: "/ukulele-tuner",
    labels: { en: "Ukulele tuner", es: "Afinador de ukelele", pt: "Afinador de ukulele", fr: "Accordeur de ukulélé", de: "Ukulele stimmen" },
  },
  {
    en: "/drop-d-tuner",
    labels: { en: "Drop D tuner", es: "Afinador Drop D", pt: "Afinador Drop D", fr: "Accordeur Drop D", de: "Drop-D-Stimmung" },
  },
  {
    en: "/violin-tuner",
    labels: { en: "Violin tuner", es: "Afinador de violín", pt: "Afinador de violino", fr: "Accordeur de violon", de: "Geige stimmen" },
  },
];

/** A useful 404: say so plainly, then offer the tuners in the visitor's
 *  language rather than a dead end. */
export function NotFoundContent({ locale }: { locale: Locale }) {
  const text = TEXT[locale];
  const links = SUGGESTIONS.map((s) => ({
    label: s.labels[locale],
    href: TRANSLATED_PAGES.find((page) => page.en === s.en)![locale],
  }));
  const home = locale === "en" ? "/" : `/${locale}`;
  return (
    <main className="mx-auto max-w-xl px-5 py-24 text-center" lang={locale}>
      <p className="font-mono text-sm text-brass">404</p>
      <h1 className="mt-2 text-3xl font-bold text-ink">{text.heading}</h1>
      <p className="mt-3 text-ink-muted">{text.body}</p>
      <Link
        href={home}
        className="mt-8 inline-block rounded-full bg-brass px-6 py-3 text-sm font-bold text-brass-contrast hover:bg-brass-hover"
      >
        {text.home}
      </Link>
      <p className="mt-8 text-sm text-ink-subtle">{text.or}</p>
      <div className="mt-3 flex flex-wrap justify-center gap-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-full border border-line px-4 py-2 text-sm text-ink hover:border-brass/40 hover:text-brass"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </main>
  );
}
