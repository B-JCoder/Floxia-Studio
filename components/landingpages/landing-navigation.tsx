"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { NicheData } from "@/lib/niches";

export function LandingNavigation({ niche }: { niche: NicheData }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  const close = () => setIsMobileMenuOpen(false);

  const navLinks = [
    { name: "The Problem", href: "#problem" },
    { name: "Our Solution", href: "#solution" },
    { name: "Our Work", href: "#portfolio" },
    { name: "Process", href: "#process" },
    { name: "Pricing", href: "#pricing" },
  ];

  return (
    <>
      <header className={`fixed z-50 transition-all duration-500 ${isScrolled ? "top-4 left-4 right-4" : "top-0 left-0 right-0"}`}>
        <nav className={`mx-auto transition-all duration-500 ${isScrolled || isMobileMenuOpen ? "bg-background/80 backdrop-blur-xl border border-foreground/10 rounded-2xl shadow-lg max-w-[1200px]" : "bg-transparent max-w-[1400px]"}`}>
          <div className={`flex items-center justify-between transition-all duration-500 px-5 sm:px-6 lg:px-8 ${isScrolled ? "h-12" : "h-14 sm:h-16"}`}>
            <Link href="/" className="flex items-center gap-2 group">
              <img src="/logo.png" alt="Floxia Studio" className="h-9 sm:h-10 w-auto transition-all duration-500" />
            </Link>

            <div className="hidden md:flex items-center gap-8 lg:gap-10">
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} className="text-sm text-foreground/70 hover:text-foreground transition-colors duration-300 relative group">
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-foreground transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-4">
              <Link href="#cta">
                <Button size="sm" className={`bg-foreground hover:bg-foreground/90 text-background rounded-full transition-all duration-500 ${isScrolled ? "px-4 h-8 text-xs" : "px-6 h-10"}`}>
                  {niche.hero.ctaPrimary}
                </Button>
              </Link>
            </div>

            <button onClick={() => setIsMobileMenuOpen((v) => !v)} className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl hover:bg-foreground/5 transition-colors">
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </header>

      <div className={`md:hidden fixed inset-0 bg-background z-40 transition-all duration-500 ${isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        <div className="flex flex-col h-full px-7 pt-24 pb-8">
          <div className="flex-1 flex flex-col justify-center gap-4">
            {navLinks.map((link, i) => (
              <a key={link.name} href={link.href} onClick={close} className={`text-4xl font-display text-foreground hover:text-muted-foreground transition-all duration-500 ${isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`} style={{ transitionDelay: isMobileMenuOpen ? `${i * 70}ms` : "0ms" }}>
                {link.name}
              </a>
            ))}
          </div>
          <div className={`flex flex-col gap-3 pt-8 border-t border-foreground/10 transition-all duration-500 ${isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`} style={{ transitionDelay: isMobileMenuOpen ? "280ms" : "0ms" }}>
            <Link href="#cta" onClick={close} className="w-full">
              <Button className="w-full bg-foreground text-background rounded-full h-12 text-sm hover:bg-foreground/90 font-bold">
                {niche.hero.ctaPrimary}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
