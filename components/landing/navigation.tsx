"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "About", href: "/about" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const close = () => setIsMobileMenuOpen(false);
  const Logo = () => (
    <Link href="/" className="flex items-center gap-2 group">
      <img
        src="/logo.png"
        alt="Floxia Studio"
        className="h-9 sm:h-10 w-auto transition-all duration-500"
      />
    </Link>
  );

  return (
    <>
      {/* ── Sticky Header ── */}
      <header
        className={`fixed z-50 transition-all duration-500 ${
          isScrolled ? "top-4 left-4 right-4" : "top-0 left-0 right-0"
        }`}
      >
        <nav
          className={`mx-auto transition-all duration-500 ${
            isScrolled || isMobileMenuOpen
              ? "bg-background/80 backdrop-blur-xl border border-foreground/10 rounded-2xl shadow-lg max-w-[1200px]"
              : "bg-transparent max-w-[1400px]"
          }`}
        >
          <div
            className={`flex items-center justify-between transition-all duration-500 px-5 sm:px-6 lg:px-8 ${
              isScrolled ? "h-12" : "h-14 sm:h-16"
            }`}
          >
            {/* Logo */}
            <Logo />

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-8 lg:gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm text-foreground/70 hover:text-foreground transition-colors duration-300 relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-foreground transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </div>

            {/* Desktop CTA Buttons */}
            <div className="hidden md:flex items-center gap-4">
              {/* <Link
                href="/#work"
                className={`text-foreground/70 hover:text-foreground transition-all duration-500 ${
                  isScrolled ? "text-xs" : "text-sm"
                }`}
              >
                See Our Work
              </Link> */}
              <Link href="/onboarding">
                <Button
                  size="sm"
                  className={`bg-foreground hover:bg-foreground/90 text-background rounded-full transition-all duration-500 ${
                    isScrolled ? "px-4 h-8 text-xs" : "px-6"
                  }`}
                >
                  Start Your Project
                </Button>
              </Link>
            </div>

            {/* Mobile Hamburger / Close Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen((v) => !v)}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl hover:bg-foreground/5 transition-colors"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* ── Mobile Full-Screen Overlay — OUTSIDE header (z-40 < header z-50) ── */}
      <div
        className={`md:hidden fixed inset-0 bg-background z-40 transition-all duration-500 ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col h-full px-7 pt-24 sm:pt-28 pb-8 safe-area-inset">
          {/* Nav Links */}
          <div className="flex-1 flex flex-col justify-center gap-4 sm:gap-6">
            {navLinks.map((link, i) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={close}
                className={`text-4xl sm:text-5xl font-display text-foreground hover:text-muted-foreground transition-all duration-500 ${
                  isMobileMenuOpen
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
                style={{
                  transitionDelay: isMobileMenuOpen ? `${i * 70}ms` : "0ms",
                }}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Bottom CTA Buttons — same as desktop */}
          <div
            className={`flex flex-col gap-3 pt-8 border-t border-foreground/10 transition-all duration-500 ${
              isMobileMenuOpen
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: isMobileMenuOpen ? "280ms" : "0ms" }}
          >
            {/* <Link href="/#work" onClick={close} className="w-full">
              <Button
                variant="outline"
                className="w-full rounded-full h-12 sm:h-13 text-sm sm:text-base border-foreground/20 hover:bg-foreground/5"
              >
                See Our Work
              </Button>
            </Link> */}
            <Link href="/onboarding" className="w-full" onClick={close}>
              <Button className="w-full bg-foreground text-background rounded-full h-12 sm:h-13 text-sm sm:text-base hover:bg-foreground/90">
                Start Your Project
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
