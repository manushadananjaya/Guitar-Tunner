"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { TUNER_PAGES } from "@/lib/tunerPages";
import { INSTRUMENT_PAGES } from "@/lib/instrumentPages";

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
    <nav className="w-full bg-[#050510]/80 backdrop-blur-md border-b border-white/5 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="relative w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <img
                src="/Logo.png"
                alt="GuitarTunePro Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-bold text-xl tracking-tight text-zinc-100">
              GuitarTunePro<span className="text-cyan-500">.</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6" ref={menusRef}>
            <Link
              href="/"
              className={cn(
                "text-sm font-medium transition-colors hover:text-cyan-400",
                pathname === "/" ? "text-cyan-400" : "text-zinc-300",
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
                      "flex items-center gap-1 text-sm font-medium transition-colors hover:text-cyan-400",
                      active ? "text-cyan-400" : "text-zinc-300",
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
                    <div className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-72 rounded-2xl border border-white/10 bg-[#0a0a18] p-2 shadow-2xl shadow-black/60">
                      <div className="grid gap-0.5">
                        {menu.entries.map((entry) => (
                          <Link
                            key={entry.href}
                            href={entry.href}
                            className={cn(
                              "flex items-baseline justify-between gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-zinc-800/60",
                              pathname === entry.href && "bg-cyan-500/10",
                            )}
                          >
                            <span
                              className={cn(
                                "text-sm font-medium whitespace-nowrap",
                                pathname === entry.href
                                  ? "text-cyan-400"
                                  : "text-zinc-200",
                              )}
                            >
                              {entry.label}
                            </span>
                            <span className="font-mono text-[11px] text-zinc-500">
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
                  "text-sm font-medium transition-colors hover:text-cyan-400",
                  pathname.startsWith(link.href)
                    ? "text-cyan-400"
                    : "text-zinc-300",
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen((open) => !open)}
              className="text-zinc-400 hover:text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-[#050510] border-b border-white/5 absolute w-full left-0 top-16 shadow-xl shadow-black/50 max-h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="px-4 pt-2 pb-4 space-y-1">
            <Link
              href="/"
              className={cn(
                "block px-3 py-2 rounded-md text-base font-medium hover:text-white hover:bg-zinc-800/50",
                pathname === "/"
                  ? "text-cyan-400 bg-zinc-800/30"
                  : "text-zinc-300",
              )}
            >
              Tuner
            </Link>
            {tailLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "block px-3 py-2 rounded-md text-base font-medium hover:text-white hover:bg-zinc-800/50",
                  pathname.startsWith(link.href)
                    ? "text-cyan-400 bg-zinc-800/30"
                    : "text-zinc-300",
                )}
              >
                {link.name}
              </Link>
            ))}

            {MENUS.map((menu) => (
              <React.Fragment key={menu.name}>
                <p className="px-3 pt-4 pb-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
                  {menu.name}
                </p>
                {menu.entries.map((entry) => (
                  <Link
                    key={entry.href}
                    href={entry.href}
                    className={cn(
                      "flex items-baseline justify-between gap-3 px-3 py-2 rounded-md hover:bg-zinc-800/50",
                      pathname === entry.href
                        ? "text-cyan-400 bg-zinc-800/30"
                        : "text-zinc-300",
                    )}
                  >
                    <span className="text-sm font-medium">{entry.label}</span>
                    <span className="font-mono text-[11px] text-zinc-500">
                      {entry.notes}
                    </span>
                  </Link>
                ))}
              </React.Fragment>
            ))}

            <Link
              href="/privacy-policy"
              className="block px-3 py-2 mt-3 rounded-md text-sm text-zinc-400 hover:text-white hover:bg-zinc-800/50"
            >
              Privacy
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
