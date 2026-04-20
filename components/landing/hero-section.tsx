"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { AnimatedSphere } from "./animated-sphere";
import Link from "next/link";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface HeroCta {
  label: string;
  href: string;
  /** If true, opens in a new browser tab */
  external?: boolean;
}

export interface HeroSectionProps {
  /** Small label above the headline e.g. "Floxia Studio" */
  eyebrow?: string;
  /** First line of the big headline */
  headingLine1?: string;
  /** Second line — the highlighted/underlined part */
  headingLine2?: string;
  /** Paragraph(s) below the headline — accepts a string or JSX */
  description?: React.ReactNode;
  /** Primary (filled) button */
  primaryCta?: HeroCta;
  /** Secondary (outline) button — omit to hide */
  secondaryCta?: HeroCta;
}

// ─── Defaults (homepage content) ─────────────────────────────────────────────

const defaults: Required<HeroSectionProps> = {
  eyebrow: "Floxia Studio",
  headingLine1: "Floxia Studio Builds",
  headingLine2: "What Businesses Need",
  description:
    "We are Floxia Studio a full-service web design and development agency based in the USA, crafting high-performance websites, e-commerce stores, and AI-integrated digital systems for ambitious brands worldwide.",
  primaryCta: { label: "Start Your Project", href: "/onboarding" },
  secondaryCta: { label: "See Our Work", href: "/work" },
};

// ─── Component ────────────────────────────────────────────────────────────────

export function HeroSection({
  eyebrow = defaults.eyebrow,
  headingLine1 = defaults.headingLine1,
  headingLine2 = defaults.headingLine2,
  description = defaults.description,
  primaryCta = defaults.primaryCta,
  secondaryCta = defaults.secondaryCta,
}: HeroSectionProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Helper: renders a CTA as a link (internal or external)
  const CtaLink = ({
    cta,
    children,
  }: {
    cta: HeroCta;
    children: React.ReactNode;
  }) =>
    cta.external ? (
      <a
        href={cta.href}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full sm:w-auto"
      >
        {children}
      </a>
    ) : (
      <Link href={cta.href} className="w-full sm:w-auto">
        {children}
      </Link>
    );

  return (
    <section className="relative flex flex-col justify-center overflow-hidden min-h-[100svh]">
      {/* Animated sphere — pushed behind content, reduced size on mobile */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[320px] h-[320px] sm:w-[480px] sm:h-[480px] lg:w-[750px] lg:h-[750px] opacity-20 sm:opacity-30 lg:opacity-40 pointer-events-none">
        <AnimatedSphere />
      </div>

      {/* Subtle grid lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20 sm:opacity-30">
        {[...Array(8)].map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute h-px bg-foreground/10"
            style={{ top: `${12.5 * (i + 1)}%`, left: 0, right: 0 }}
          />
        ))}
        {[...Array(12)].map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute w-px bg-foreground/10"
            style={{ left: `${8.33 * (i + 1)}%`, top: 0, bottom: 0 }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1400px] mx-auto w-full px-4 sm:px-6 lg:px-12 pt-16 pb-8 lg:py-24">
        {/* Eyebrow */}
        <div
          className={`mb-4 sm:mb-6 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="inline-flex items-center gap-2 sm:gap-3 text-xs sm:text-sm font-mono text-muted-foreground">
            <span className="w-5 sm:w-8 h-px bg-foreground/30" />
            {eyebrow}
          </span>
        </div>

        {/* Main headline */}
        <div className="mb-4 sm:mb-8 lg:mb-10">
          <h1
            className={`font-display leading-[1.1] tracking-tight transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{ fontSize: "clamp(1.75rem, 5.5vw, 6.5rem)" }}
          >
            {/* Line 1 */}
            <span className="block">{headingLine1}</span>

            {/* Line 2 — highlight underline, allow wrapping on mobile */}
            <span className="block mt-1 sm:mt-2">
              <span className="relative inline">
                {headingLine2}
                <span className="absolute -bottom-0.5 sm:-bottom-1 left-0 right-0 h-1.5 sm:h-2 lg:h-3 bg-foreground/10" />
              </span>
            </span>
          </h1>
        </div>

        {/* Description + CTAs — stacked on mobile, side-by-side on lg */}
        <div className="flex flex-col gap-6 sm:gap-8 lg:grid lg:grid-cols-2 lg:gap-20 lg:items-end">
          {/* Description */}
          <div
            className={`text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed max-w-xl transition-all duration-700 delay-200 space-y-3 sm:space-y-4 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            {description}
          </div>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col xs:flex-row sm:flex-row items-stretch xs:items-center sm:items-center gap-3 transition-all duration-700 delay-300 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            {/* Primary */}
            <CtaLink cta={primaryCta}>
              <Button
                size="lg"
                className="bg-foreground hover:bg-foreground/90 text-background px-5 sm:px-8 h-11 sm:h-14 text-sm sm:text-base rounded-full group w-full"
              >
                {primaryCta.label}
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </CtaLink>

            {/* Secondary */}
            {secondaryCta && (
              <CtaLink cta={secondaryCta}>
                <Button
                  size="lg"
                  variant="outline"
                  className="px-5 sm:px-8 h-11 sm:h-14 text-sm sm:text-base rounded-full border-foreground/20 hover:bg-foreground/5 group w-full sm:w-auto"
                >
                  {secondaryCta.label}
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </CtaLink>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
