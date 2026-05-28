import React from "react";
import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full relative z-10 border-t border-white/5 bg-[#050510]/80 backdrop-blur-md py-12 px-6">
      {/* Decorative top ambient light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[250px] h-[1px] bg-linear-to-r from-transparent via-cyan-500/20 to-transparent" />

      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Brand signature */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <Link href="/" className="flex items-center gap-1.5 font-bold text-lg text-zinc-100 tracking-tight">
            GuitarTunePro<span className="text-cyan-500 font-extrabold">.</span>
          </Link>
          <p className="text-xs text-zinc-500 text-center md:text-left">
            Free online chromatic tuner with high accuracy pitch detection.
          </p>
        </div>

        {/* Footer Navigation */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-zinc-400 font-medium">
          <Link
            href="/about"
            className="hover:text-cyan-400 transition-colors duration-200"
          >
            About
          </Link>
          <Link
            href="/articles"
            className="hover:text-cyan-400 transition-colors duration-200"
          >
            Articles
          </Link>
          <Link
            href="/contact"
            className="hover:text-cyan-400 transition-colors duration-200"
          >
            Contact
          </Link>
          <Link
            href="/privacy-policy"
            className="hover:text-cyan-400 transition-colors duration-200"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms-of-service"
            className="hover:text-cyan-400 transition-colors duration-200"
          >
            Terms of Service
          </Link>
        </div>

        {/* Made with love */}
        <div className="flex flex-col items-center md:items-end gap-1.5 shrink-0">
          <p className="text-xs font-semibold text-zinc-500 tracking-wider flex items-center gap-1.5 uppercase">
            Made with <span className="text-rose-500 text-xs animate-pulse">❤️</span> by{" "}
            <Link href="/about" className="text-cyan-400 hover:text-cyan-300 transition-colors">
              GuitarTunePro
            </Link>
          </p>
          <p className="text-[10px] text-zinc-600">
            © {currentYear} GuitarTunePro. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
