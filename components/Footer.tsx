import React from "react";
import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full relative z-10 border-t border-line bg-canvas/80 backdrop-blur-md py-12 px-6">
      {/* Decorative top ambient light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[250px] h-[1px] bg-linear-to-r from-transparent via-brass/20 to-transparent" />

      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Brand signature */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <Link href="/" className="flex items-center gap-1.5 font-bold text-lg text-ink tracking-tight">
            GuitarTunePro<span className="text-brass font-extrabold">.</span>
          </Link>
          <p className="text-xs text-ink-subtle text-center md:text-left">
            Free online chromatic tuner with high accuracy pitch detection.
          </p>
        </div>

        {/* Footer Navigation */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-ink-muted font-medium">
          <Link
            href="/about"
            className="hover:text-brass transition-colors duration-200"
          >
            About
          </Link>
          <Link
            href="/articles"
            className="hover:text-brass transition-colors duration-200"
          >
            Articles
          </Link>
          <Link
            href="/contact"
            className="hover:text-brass transition-colors duration-200"
          >
            Contact
          </Link>
          <Link
            href="/privacy-policy"
            className="hover:text-brass transition-colors duration-200"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms-of-service"
            className="hover:text-brass transition-colors duration-200"
          >
            Terms of Service
          </Link>
        </div>

        {/* Made with love */}
        <div className="flex flex-col items-center md:items-end gap-1.5 shrink-0">
          <p className="text-xs font-semibold text-ink-subtle tracking-wider flex items-center gap-1.5 uppercase">
            Made with <span className="text-off text-xs animate-pulse">❤️</span> by{" "}
            <Link href="/about" className="text-brass hover:text-brass-hover transition-colors">
              GuitarTunePro
            </Link>
          </p>
          <p className="text-2xs text-ink-subtle">
            © {currentYear} GuitarTunePro. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
