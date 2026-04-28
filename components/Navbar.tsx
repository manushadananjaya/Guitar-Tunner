"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: "Tuner", href: "/" },
    { name: "Articles", href: "/articles" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Privacy", href: "/privacy-policy" },
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
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className={cn(
                  "text-sm font-medium transition-colors hover:text-cyan-400",
                  pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href)) 
                    ? "text-cyan-400" 
                    : "text-zinc-300"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
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
        <div className="md:hidden bg-[#050510] border-b border-white/5 absolute w-full left-0 top-16 shadow-xl shadow-black/50">
          <div className="px-4 pt-2 pb-4 space-y-1">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                href={link.href} 
                onClick={toggleMenu}
                className={cn(
                  "block px-3 py-2 rounded-md text-base font-medium hover:text-white hover:bg-zinc-800/50",
                  pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href)) 
                    ? "text-cyan-400 bg-zinc-800/30" 
                    : "text-zinc-300"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
