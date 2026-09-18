"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { TUNER_PAGES } from "@/lib/tunerPages";
import { INSTRUMENT_PAGES } from "@/lib/instrumentPages";
import { TOOL_PAGES } from "@/lib/toolPages";
import { ThemeToggle } from "@/components/ThemeToggle";

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
}[] = [
  {
    name: "Tools",
    entries: TOOL_PAGES.map((tool) => ({
      href: tool.href,
      label: tool.label,
      notes: tool.tagline,
    })),
    align: "center",
    width: "w-80",
    plainNotes: true,
  },
  { name: "Tunings", entries: TUNER_PAGES, align: "center", width: "w-72" },
  {
    name: "Instruments",
    entries: INSTRUMENT_PAGES,
    align: "center",
    width: "w-72",
  },
  {
    name: "More",
    align: "end",
    width: "w-56",
    entries: [
      { href: "/articles", label: "Articles" },
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
      { href: "/accuracy", label: "Accuracy" },
    ],
  },
];

/** Links that stay visible in the bar — everything else lives in a menu. */
const TOOL_LINKS = [{ name: "Tuner", href: "/", exact: true }];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const pathname = usePathname();
  const menusRef = useRef<HTMLDivElement>(null);

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
            href="/"
            className="flex shrink-0 items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass/60"
          >
            <span className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg ring-1 ring-line">
              <img
                src="/Logo.png"
                alt=""
                aria-hidden="true"
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
                      <div className="grid gap-0.5">
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
