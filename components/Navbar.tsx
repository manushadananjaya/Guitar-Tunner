"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { TUNER_PAGES } from "@/lib/tunerPages";
import { INSTRUMENT_PAGES } from "@/lib/instrumentPages";
import { ThemeToggle } from "@/components/ThemeToggle";

/** Shape shared by TUNER_PAGES and INSTRUMENT_PAGES entries. */
type MenuEntry = { href: string; label: string; notes: string };

const MENUS: { name: string; entries: MenuEntry[] }[] = [
  { name: "Tunings", entries: TUNER_PAGES },
  { name: "Instruments", entries: INSTRUMENT_PAGES },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const pathname = usePathname();
  const menusRef = useRef<HTMLDivElement>(null);

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

  const tailLinks = [
    { name: "Chords", href: "/chords" },
    { name: "Metronome", href: "/metronome" },
    { name: "Articles", href: "/articles" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="w-full bg-canvas/80 backdrop-blur-md border-b border-line sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="relative w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center shadow-sm">
              <img
                src="/Logo.png"
                alt="GuitarTunePro Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-bold text-xl tracking-tight text-ink">
              GuitarTunePro<span className="text-brass">.</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6" ref={menusRef}>
            <Link
              href="/"
              className={cn(
                "text-sm font-medium transition-colors hover:text-brass",
                pathname === "/" ? "text-brass" : "text-ink",
              )}
            >
              Tuner
            </Link>

            {MENUS.map((menu) => {
              const active = menu.entries.some(
                (entry) => entry.href === pathname,
              );
              const expanded = openMenu === menu.name;

              return (
                <div key={menu.name} className="relative">
                  <button
                    type="button"
                    onClick={() =>
                      setOpenMenu(expanded ? null : menu.name)
                    }
                    aria-expanded={expanded}
                    aria-haspopup="true"
                    className={cn(
                      "flex items-center gap-1 text-sm font-medium transition-colors hover:text-brass",
                      active ? "text-brass" : "text-ink",
                    )}
                  >
                    {menu.name}
                    <ChevronDown
                      className={cn(
                        "w-3.5 h-3.5 transition-transform",
                        expanded && "rotate-180",
                      )}
                    />
                  </button>

                  {expanded && (
                    <div className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-72 rounded-2xl border border-line bg-surface-raised p-2 shadow-2xl shadow-black/60">
                      <div className="grid gap-0.5">
                        {menu.entries.map((entry) => (
                          <Link
                            key={entry.href}
                            href={entry.href}
                            className={cn(
                              "flex items-baseline justify-between gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-surface-raised/60",
                              pathname === entry.href && "bg-brass/10",
                            )}
                          >
                            <span
                              className={cn(
                                "text-sm font-medium whitespace-nowrap",
                                pathname === entry.href
                                  ? "text-brass"
                                  : "text-ink",
                              )}
                            >
                              {entry.label}
                            </span>
                            <span className="font-mono text-2xs text-ink-subtle">
                              {entry.notes}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {tailLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-brass",
                  pathname.startsWith(link.href)
                    ? "text-brass"
                    : "text-ink",
                )}
              >
                {link.name}
              </Link>
            ))}
            <ThemeToggle />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen((open) => !open)}
              className="text-ink-muted hover:text-ink focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-canvas border-b border-line absolute w-full left-0 top-16 shadow-xl shadow-black/50 max-h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="px-4 pt-2 pb-4 space-y-1">
            <Link
              href="/"
              className={cn(
                "block px-3 py-2 rounded-md text-base font-medium hover:text-ink hover:bg-surface-raised/50",
                pathname === "/"
                  ? "text-brass bg-surface-raised/30"
                  : "text-ink",
              )}
            >
              Tuner
            </Link>
            {tailLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "block px-3 py-2 rounded-md text-base font-medium hover:text-ink hover:bg-surface-raised/50",
                  pathname.startsWith(link.href)
                    ? "text-brass bg-surface-raised/30"
                    : "text-ink",
                )}
              >
                {link.name}
              </Link>
            ))}

            {MENUS.map((menu) => (
              <React.Fragment key={menu.name}>
                <p className="px-3 pt-4 pb-1 text-2xs font-semibold uppercase tracking-[0.18em] text-ink-subtle">
                  {menu.name}
                </p>
                {menu.entries.map((entry) => (
                  <Link
                    key={entry.href}
                    href={entry.href}
                    className={cn(
                      "flex items-baseline justify-between gap-3 px-3 py-2 rounded-md hover:bg-surface-raised/50",
                      pathname === entry.href
                        ? "text-brass bg-surface-raised/30"
                        : "text-ink",
                    )}
                  >
                    <span className="text-sm font-medium">{entry.label}</span>
                    <span className="font-mono text-2xs text-ink-subtle">
                      {entry.notes}
                    </span>
                  </Link>
                ))}
              </React.Fragment>
            ))}

            <Link
              href="/privacy-policy"
              className="block px-3 py-2 mt-3 rounded-md text-sm text-ink-muted hover:text-ink hover:bg-surface-raised/50"
            >
              Privacy
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
