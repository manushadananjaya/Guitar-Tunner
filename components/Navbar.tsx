"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { TUNER_PAGES } from "@/lib/tunerPages";
import { INSTRUMENT_PAGES } from "@/lib/instrumentPages";
import { TOOL_PAGES } from "@/lib/toolPages";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LANGUAGE_NAMES, LOCALES, type Locale } from "@/lib/i18n/tuner";
import { localeOfPath, versionsOf } from "@/lib/i18n/pages";

/** The bar's "Tuner" link, in the language of the page being viewed. */
const TUNER_LABEL: Record<Locale, string> = {
  en: "Tuner",
  es: "Afinador",
  pt: "Afinador",
  fr: "Accordeur",
  de: "Stimmgerät",
};

const homeOf = (locale: Locale) => (locale === "en" ? "/" : `/${locale}`);

/** Shape shared by TUNER_PAGES and INSTRUMENT_PAGES entries. */
type MenuEntry = { href: string; label: string; notes?: string };

/** `align` keeps the right-most panel from spilling past the shell. */
const MENUS: {
  name: string;
  entries: MenuEntry[];
  align: "center" | "end";
  width: string;
  /** Notes are note names (mono) by default; taglines read better in sans. */
  plainNotes?: boolean;
  /** Long menus split into two columns so they fit on a laptop screen. */
  twoColumn?: boolean;
}[] = [
  {
    name: "Tools",
    entries: TOOL_PAGES.map((tool) => ({
      href: tool.href,
      label: tool.label,
      notes: tool.tagline,
    })),
    align: "center",
    width: "w-[40rem]",
    plainNotes: true,
    twoColumn: true,
  },
  {
    name: "Tunings",
    entries: [...TUNER_PAGES, { href: "/tunings", label: "All tunings", notes: "Chart" }],
    align: "center",
    width: "w-[34rem]",
    twoColumn: true,
  },
  {
    name: "Instruments",
    entries: INSTRUMENT_PAGES,
    align: "center",
    width: "w-[34rem]",
    twoColumn: true,
  },
  {
    name: "More",
    align: "end",
    width: "w-56",
    entries: [
      { href: "/articles", label: "Articles" },
      { href: "/printable-guitar-charts", label: "Printable Charts" },
      { href: "/my-progress", label: "Your Progress" },
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
      { href: "/accuracy", label: "Accuracy" },
      { href: "/embed-tuner", label: "Tuner for Your Site" },
    ],
  },
];


export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const pathname = usePathname() ?? "/";
  const locale = localeOfPath(pathname);
  const home = homeOf(locale);
  // Links that stay visible in the bar — everything else lives in a menu.
  const TOOL_LINKS = [{ name: TUNER_LABEL[locale], href: home, exact: true }];
  // The same page in each language when it is translated; otherwise that
  // language's home page.
  const versions = versionsOf(pathname);
  const languageLinks = LOCALES.map((l) => ({
    locale: l,
    name: LANGUAGE_NAMES[l],
    href: versions ? versions[l] : homeOf(l),
  }));
  const languageExpanded = openMenu === "Language";  const menusRef = useRef<HTMLDivElement>(null);

  const isActive = (href: string, exact = false) =>
    exact ? pathname === href : pathname.startsWith(href);

  // Close the desktop dropdowns on outside click or Escape.
  useEffect(() => {
    if (!openMenu) return;

    const onPointerDown = (event: MouseEvent) => {
      if (!menusRef.current?.contains(event.target as Node)) {
        setOpenMenu(null);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenMenu(null);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [openMenu]);

  // Route change should dismiss whichever menu is open.
  useEffect(() => {
    setOpenMenu(null);
    setIsOpen(false);
  }, [pathname]);

  /** Desktop bar item: a low-contrast pill that fills in on hover/active. */
  const barItem = (active: boolean) =>
    cn(
      "rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass/60",
      active
        ? "bg-brass/12 text-brass"
        : "text-ink-muted hover:bg-surface-sunken hover:text-ink",
    );

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-line bg-canvas/85 backdrop-blur-md supports-[backdrop-filter]:bg-canvas/70">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link
            href={home}
            className="flex shrink-0 items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass/60"
          >
            <span className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg ring-1 ring-line">
              {/* 192px asset, not /Logo.png: that file is a 4000x4000, 239 KB
                  PNG, and images.unoptimized is on, so it shipped in full on
                  every page to fill a 32px box. */}
              <img
                src="/android-chrome-192x192.png"
                alt=""
                aria-hidden="true"
                width={192}
                height={192}
                decoding="async"
                className="h-full w-full object-cover"
              />
            </span>
            <span className="text-lg font-bold tracking-tight text-ink">
              GuitarTunePro<span className="text-brass">.</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div
            className="hidden items-center gap-1 lg:flex"
            ref={menusRef}
          >
            {TOOL_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={barItem(isActive(link.href, link.exact))}
              >
                {link.name}
              </Link>
            ))}

            <span aria-hidden="true" className="mx-2 h-5 w-px bg-line" />

            {MENUS.map((menu) => {
              const active = menu.entries.some((entry) =>
                isActive(entry.href),
              );
              const expanded = openMenu === menu.name;

              return (
                <div key={menu.name} className="relative">
                  <button
                    type="button"
                    onClick={() => setOpenMenu(expanded ? null : menu.name)}
                    aria-expanded={expanded}
                    aria-haspopup="true"
                    className={cn(
                      barItem(active || expanded),
                      "flex items-center gap-1",
                    )}
                  >
                    {menu.name}
                    <ChevronDown
                      className={cn(
                        "h-3.5 w-3.5 transition-transform duration-200",
                        expanded && "rotate-180",
                      )}
                    />
                  </button>

                  {expanded && (
                    <div
                      className={cn(
                        "absolute top-full mt-2 rounded-2xl border border-line bg-surface-raised p-1.5",
                        "shadow-xl shadow-ink/10 dark:shadow-black/50",
                        menu.width,
                        menu.align === "end"
                          ? "right-0"
                          : "left-1/2 -translate-x-1/2",
                      )}
                    >
                      <div className={cn("grid gap-0.5", menu.twoColumn && "grid-cols-2 gap-x-1")}>
                        {menu.entries.map((entry) => {
                          const current = pathname === entry.href;
                          return (
                            <Link
                              key={entry.href}
                              href={entry.href}
                              aria-current={current ? "page" : undefined}
                              className={cn(
                                "flex items-baseline justify-between gap-3 rounded-xl px-3 py-2 transition-colors",
                                current
                                  ? "bg-brass/12 text-brass"
                                  : "text-ink hover:bg-surface-sunken",
                              )}
                            >
                              <span className="whitespace-nowrap text-sm font-medium">
                                {entry.label}
                              </span>
                              {entry.notes && (
                                <span
                                  className={cn(
                                    "text-2xs text-ink-subtle",
                                    !menu.plainNotes && "font-mono",
                                  )}
                                >
                                  {entry.notes}
                                </span>
                              )}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            <span aria-hidden="true" className="mx-2 h-5 w-px bg-line" />

            {/* Language. The panel is hidden rather than unmounted, so the
                links to every language version stay crawlable. */}
            <div className="relative">
              <button
                type="button"
                onClick={() =>
                  setOpenMenu(languageExpanded ? null : "Language")
                }
                aria-expanded={languageExpanded}
                aria-haspopup="true"
                aria-label={`Language: ${LANGUAGE_NAMES[locale]}`}
                className={cn(barItem(languageExpanded), "flex items-center gap-1.5")}
              >
                <Globe className="h-4 w-4" aria-hidden="true" />
                <span className="text-xs font-semibold uppercase">{locale}</span>
                <ChevronDown
                  className={cn(
                    "h-3.5 w-3.5 transition-transform duration-200",
                    languageExpanded && "rotate-180",
                  )}
                />
              </button>
              <div
                className={cn(
                  "absolute right-0 top-full mt-2 w-44 rounded-2xl border border-line bg-surface-raised p-1.5",
                  "shadow-xl shadow-ink/10 dark:shadow-black/50",
                  !languageExpanded && "hidden",
                )}
              >
                {languageLinks.map((link) => (
                  <Link
                    key={link.locale}
                    href={link.href}
                    hrefLang={link.locale}
                    lang={link.locale}
                    aria-current={link.locale === locale ? "page" : undefined}
                    className={cn(
                      "flex items-center justify-between rounded-xl px-3 py-2 text-sm font-medium transition-colors",
                      link.locale === locale
                        ? "bg-brass/12 text-brass"
                        : "text-ink hover:bg-surface-sunken",
                    )}
                  >
                    {link.name}
                    <span className="text-2xs uppercase text-ink-subtle">
                      {link.locale}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
            <ThemeToggle />
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-1 lg:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen((open) => !open)}
              aria-expanded={isOpen}
              aria-label="Toggle menu"
              className="rounded-lg p-2 text-ink-muted transition-colors hover:bg-surface-sunken hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass/60"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="absolute left-0 top-16 max-h-[calc(100vh-4rem)] w-full overflow-y-auto border-b border-line bg-canvas shadow-xl shadow-ink/10 dark:shadow-black/50 lg:hidden">
          <div className="space-y-0.5 px-4 pb-6 pt-3">
            <div className="flex flex-wrap gap-1.5 px-1 pb-3" aria-label="Language">
              <Globe className="mr-1 mt-1.5 h-4 w-4 text-ink-subtle" aria-hidden="true" />
              {languageLinks.map((link) => (
                <Link
                  key={link.locale}
                  href={link.href}
                  hrefLang={link.locale}
                  lang={link.locale}
                  aria-current={link.locale === locale ? "page" : undefined}
                  className={cn(
                    "rounded-full border px-3 py-1 text-xs font-semibold transition-colors",
                    link.locale === locale
                      ? "border-brass/50 bg-brass/12 text-brass"
                      : "border-line text-ink-muted hover:text-ink",
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            {TOOL_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "block rounded-lg px-3 py-2.5 text-base font-medium transition-colors",
                  isActive(link.href, link.exact)
                    ? "bg-brass/12 text-brass"
                    : "text-ink hover:bg-surface-sunken",
                )}
              >
                {link.name}
              </Link>
            ))}

            {MENUS.map((menu) => (
              <React.Fragment key={menu.name}>
                <p className="px-3 pb-1 pt-5 text-2xs font-semibold uppercase tracking-[0.18em] text-ink-subtle">
                  {menu.name}
                </p>
                {menu.entries.map((entry) => {
                  const current = pathname === entry.href;
                  return (
                    <Link
                      key={entry.href}
                      href={entry.href}
                      aria-current={current ? "page" : undefined}
                      className={cn(
                        "flex items-baseline justify-between gap-3 rounded-lg px-3 py-2.5 transition-colors",
                        current
                          ? "bg-brass/12 text-brass"
                          : "text-ink hover:bg-surface-sunken",
                      )}
                    >
                      <span className="text-sm font-medium">{entry.label}</span>
                      {entry.notes && (
                        <span
                          className={cn(
                            "text-2xs text-ink-subtle",
                            !menu.plainNotes && "font-mono",
                          )}
                        >
                          {entry.notes}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </React.Fragment>
            ))}

            <Link
              href="/privacy-policy"
              className="mt-4 block rounded-lg px-3 py-2 text-sm text-ink-muted transition-colors hover:bg-surface-sunken hover:text-ink"
            >
              Privacy
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
