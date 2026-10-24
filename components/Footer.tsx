import React from "react";
import Link from "next/link";
import { TUNER_PAGES } from "@/lib/tunerPages";
import { INSTRUMENT_PAGES } from "@/lib/instrumentPages";
import { ARTICLES } from "@/lib/articles";
import { LANGUAGE_NAMES, LOCALES } from "@/lib/i18n/tuner";
import { TOOL_PAGES } from "@/lib/toolPages";
import { SITE_AUTHOR } from "@/lib/author";

/** A few high-intent tuning pages to surface directly; the rest sit behind
 *  "All tunings". Kept short on purpose — a footer link dump helps nobody. */
const FOOTER_TUNERS = ["/drop-d-tuner", "/half-step-down-tuner", "/open-g-tuner"];
const FOOTER_INSTRUMENTS = ["/bass-tuner", "/ukulele-tuner"];

const tunerLink = (href: string) =>
  [...TUNER_PAGES, ...INSTRUMENT_PAGES].find((page) => page.href === href);

export function Footer() {
  const currentYear = new Date().getFullYear();

  const featuredArticles = [
    "how-to-tune-a-guitar-for-beginners",
    "how-to-tune-a-guitar-by-ear",
    "alternate-guitar-tunings",
    "why-your-guitar-goes-out-of-tune",
  ]
    .map((slug) => ARTICLES.find((article) => article.slug === slug))
    .filter((article): article is NonNullable<typeof article> => !!article);

  const columns: { heading: string; links: { label: string; href: string }[] }[] =
    [
      {
        heading: "Tools",
        links: [
          { label: "Guitar Tuner", href: "/" },
          ...TOOL_PAGES.map((tool) => ({ label: tool.label, href: tool.href })),
          { label: "Tuner Accuracy", href: "/accuracy" },
          { label: "Tuner for Your Website", href: "/embed-tuner" },
        ],
      },
      {
        heading: "Tunings",
        links: [
          ...[...FOOTER_TUNERS, ...FOOTER_INSTRUMENTS].map((href) => {
            const page = tunerLink(href);
            return { label: page ? `${page.label} Tuner` : href, href };
          }),
          { label: "All tunings", href: "/tunings" },
        ],
      },
      {
        heading: "Learn",
        links: [
          { label: "All guides", href: "/articles" },
          { label: "Printable guitar charts", href: "/printable-guitar-charts" },
          ...featuredArticles.map((article) => ({
            label: article.title,
            href: `/articles/${article.slug}`,
          })),
        ],
      },
      {
        heading: "Site",
        links: [
          { label: "About", href: "/about" },
          ...(SITE_AUTHOR
            ? [{ label: SITE_AUTHOR.name, href: SITE_AUTHOR.url }]
            : []),
          { label: "Contact", href: "/contact" },
          { label: "Privacy Policy", href: "/privacy-policy" },
          { label: "Terms of Service", href: "/terms-of-service" },
        ],
      },
    ];

  return (
    <footer className="w-full relative z-10 border-t border-line bg-canvas/80 backdrop-blur-md pt-12 pb-8 px-6">
      {/* Decorative top ambient light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[250px] h-[1px] bg-linear-to-r from-transparent via-brass/20 to-transparent" />

      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1 flex flex-col gap-2">
            <Link
              href="/"
              className="flex items-center gap-1.5 font-bold text-lg text-ink tracking-tight"
            >
              GuitarTunePro
              <span className="text-brass font-extrabold">.</span>
            </Link>
            <p className="text-xs text-ink-subtle leading-relaxed max-w-60">
              A free browser guitar tuner with microphone pitch detection, plus a
              chord library and tuning guides.
            </p>
          </div>

          {columns.map((column) => (
            <nav key={column.heading} aria-label={column.heading}>
              <p className="text-2xs font-semibold uppercase tracking-[0.18em] text-ink-subtle mb-3">
                {column.heading}
              </p>
              <ul className="space-y-2">
                {column.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-ink-muted hover:text-brass transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* A crawlable path to every language's tuner from every page. */}
        <nav
          aria-label="Languages"
          className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm"
        >
          {LOCALES.map((locale) => (
            <Link
              key={locale}
              href={locale === "en" ? "/" : `/${locale}`}
              hrefLang={locale}
              lang={locale}
              className="text-ink-muted hover:text-brass transition-colors duration-200"
            >
              {LANGUAGE_NAMES[locale]}
            </Link>
          ))}
        </nav>

        <div className="mt-6 pt-6 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-3 text-2xs text-ink-subtle">
          <p>
            © {currentYear} GuitarTunePro. Built by{" "}
            <Link
              href={SITE_AUTHOR ? SITE_AUTHOR.url : "/about"}
              className="text-brass hover:text-brass-hover transition-colors"
            >
              {SITE_AUTHOR ? SITE_AUTHOR.name : "the GuitarTunePro team"}
            </Link>
            .
          </p>
          <p>All audio is processed on your device and never uploaded.</p>
        </div>
      </div>
    </footer>
  );
}
