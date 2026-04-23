"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { NicheData } from "@/lib/niches";
import { AnimatedSphere } from "../landing/animated-sphere";

export function LandingHero({ niche }: { niche: NicheData }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative flex flex-col justify-center overflow-hidden min-h-[100svh] bg-background">
      {/* Animated sphere behind content */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[320px] h-[320px] sm:w-[480px] sm:h-[480px] lg:w-[750px] lg:h-[750px] opacity-20 sm:opacity-30 lg:opacity-40 pointer-events-none">
        <AnimatedSphere />
      </div>

      {/* Subtle grid lines matching theme */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20 sm:opacity-30">
        {[...Array(8)].map((_, i) => (
          <div key={`h-${i}`} className="absolute h-px bg-foreground/10" style={{ top: `${12.5 * (i + 1)}%`, left: 0, right: 0 }} />
        ))}
        {[...Array(12)].map((_, i) => (
          <div key={`v-${i}`} className="absolute w-px bg-foreground/10" style={{ left: `${8.33 * (i + 1)}%`, top: 0, bottom: 0 }} />
        ))}
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto w-full px-4 sm:px-6 lg:px-12 pt-16 pb-8 lg:py-24">
        {/* Eyebrow */}
        <div className={`mb-4 sm:mb-6 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <span className="inline-flex items-center gap-2 sm:gap-3 text-xs sm:text-sm font-mono text-muted-foreground uppercase tracking-[0.2em]">
            <span className="w-5 sm:w-8 h-px bg-foreground/30" />
            {niche.hero.eyebrow}
          </span>
        </div>

        {/* Headline */}
        <div className="mb-4 sm:mb-8 lg:mb-10 max-w-[90%] lg:max-w-[80%]">
          <h1 className={`font-display leading-[1.1] tracking-tight transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ fontSize: "clamp(2rem, 5vw, 5.5rem)" }}>
            {niche.hero.headline}
          </h1>
        </div>

        {/* Subheadline + CTAs */}
        <div className="flex flex-col gap-6 sm:gap-8 lg:grid lg:grid-cols-2 lg:gap-20 lg:items-end">
          <div className={`text-sm sm:text-base lg:text-xl text-muted-foreground leading-relaxed max-w-xl transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            {niche.hero.subheadline}
            <p className="mt-4 text-xs italic font-medium opacity-70">
              {niche.hero.socialProof}
            </p>
          </div>

          <div className={`flex flex-col xs:flex-row sm:flex-row items-stretch xs:items-center sm:items-center gap-3 transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <Link href="#cta" className="w-full sm:w-auto">
              <Button size="lg" className="bg-foreground hover:bg-foreground/90 text-background px-5 sm:px-10 h-12 sm:h-16 text-sm sm:text-lg rounded-full group w-full font-bold">
                {niche.hero.ctaPrimary}
                <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="#process" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="px-5 sm:px-10 h-12 sm:h-16 text-sm sm:text-lg rounded-full border-foreground/20 hover:bg-foreground/5 group w-full sm:w-auto">
                {niche.hero.ctaSecondary}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
