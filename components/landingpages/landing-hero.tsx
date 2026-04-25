"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { NicheData } from "@/lib/niches";
import { AnimatedSphere } from "../landing/animated-sphere";
import { motion } from "framer-motion";

export function LandingHero({ niche }: { niche: NicheData }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative flex flex-col justify-center overflow-hidden min-h-[90svh] bg-background">
      {/* Animated sphere behind content */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[320px] h-[320px] sm:w-[480px] sm:h-[480px] lg:w-[750px] lg:h-[750px] opacity-20 sm:opacity-30 lg:opacity-40 pointer-events-none">
        <AnimatedSphere />
      </div>

      {/* Subtle grid lines matching theme */}
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

      <div className="relative z-10 max-w-[1400px] mx-auto w-full px-4 sm:px-6 lg:px-12 pt-10 pb-6 lg:pt-16 lg:pb-12 text-center flex flex-col items-center">
        {/* Eyebrow */}
        <div
          className={`mb-4 sm:mb-6 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <span className="inline-flex items-center gap-2 sm:gap-3 text-xs sm:text-sm font-mono text-muted-foreground uppercase tracking-[0.2em]">
            <span className="w-5 sm:w-8 h-px bg-foreground/30" />
            {niche.hero.eyebrow}
            <span className="w-5 sm:w-8 h-px bg-foreground/30" />
          </span>
        </div>

        {/* Headline */}
        <div className="mb-4 sm:mb-8 lg:mb-10 max-w-4xl mx-auto">
          <h1
            className={`font-display leading-[1.1] tracking-tight transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ fontSize: "clamp(2rem, 4vw, 4.1rem)" }}
          >
            {niche.hero.headline.split("").map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0 }}
                animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.1, delay: i * 0.04 }}
              >
                {char}
              </motion.span>
            ))}
          </h1>
        </div>

        {/* Subheadline + CTAs */}
        <div className="flex flex-col items-center gap-8 max-w-3xl mx-auto">
          <div
            className={`text-sm sm:text-base lg:text-xl text-muted-foreground leading-relaxed transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            {niche.hero.subheadline}
            <p className="mt-4 text-xs italic font-medium opacity-70">
              {niche.hero.socialProof}
            </p>
          </div>

          <div
            className={`flex flex-col xs:flex-row sm:flex-row items-center justify-center gap-3 w-full transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            <Link href="#cta" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="bg-foreground hover:bg-foreground/90 text-background px-5 sm:px-10 h-12 sm:h-16 text-sm sm:text-lg rounded-full group w-full font-bold"
              >
                {niche.hero.ctaPrimary}
                <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="#process" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="px-5 sm:px-10 h-12 sm:h-16 text-sm sm:text-lg rounded-full border-foreground/20 hover:bg-foreground/5 group w-full sm:w-auto"
              >
                {niche.hero.ctaSecondary}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
