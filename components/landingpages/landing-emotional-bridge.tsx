"use client";

import { NicheData } from "@/lib/niches";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export function LandingEmotionalBridge({ niche }: { niche: NicheData }) {
  const ref = useRef(null);
  const isInView = useInView(ref);
  const isVisible = isInView;

  return (
    <section ref={ref} className="py-16 lg:py-24 bg-foreground text-background relative overflow-hidden">
      {/* Premium Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden flex items-end opacity-[0.03]">
          <h3 className="absolute left-1/2 -translate-x-1/2 bottom-10 text-[clamp(10rem,25vw,100rem)] font-display font-bold select-none pointer-events-none translate-y-1/4 uppercase leading-none whitespace-nowrap">
            {"BRIDGE".split("").map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0 }}
                animate={isVisible ? { opacity: [0, 1, 1, 0] } : { opacity: 0 }}
                transition={{ 
                  duration: 4, 
                  times: [0, 0.1, 0.8, 1],
                  repeat: Infinity, 
                  delay: i * 0.15,
                  ease: "easeInOut"
                }}
              >
                {char}
              </motion.span>
            ))}
          </h3>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-[1400px] mx-auto lg:px-12 text-center">
          <div className="max-w-5xl mx-auto">
            <div className="inline-flex items-center gap-4 mb-12 opacity-40">
              <div className="w-12 h-px bg-background" />
              <span className="text-[10px] font-mono uppercase tracking-[0.5em]">
                The Strategic Bridge
              </span>
              <div className="w-12 h-px bg-background" />
            </div>

            <h2
              className={`font-display leading-[1.1] tracking-tight transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ fontSize: "clamp(2rem, 4vw, 3.1rem)" }}
            >
              {niche.emotionalBridge.headline}
            </h2>

            <p className="text-lg md:text-2xl lg:text-3xl opacity-60 mb-10 md:mb-20 leading-relaxed font-light max-w-4xl mx-auto italic">
              "{niche.emotionalBridge.body}"
            </p>

            <Link href="#cta">
              <Button
                size="lg"
                className="h-16 sm:h-20 md:h-24 px-8 sm:px-12 md:px-16 rounded-full text-base sm:text-xl md:text-2xl font-bold bg-background text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-700 shadow-[0_20px_50px_rgba(0,0,0,0.3)] group relative overflow-hidden whitespace-nowrap"
              >
                <span className="relative z-10 flex items-center gap-3 sm:gap-4">
                  {niche.emotionalBridge.cta}
                  <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 transition-transform group-hover:translate-x-2" />
                </span>
                <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Corner Accents */}
      <div className="absolute top-10 left-10 w-20 h-20 border-t border-l border-background/10 pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-20 h-20 border-b border-r border-background/10 pointer-events-none" />

      {/* Floating Glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -mr-48 -mt-48 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -ml-48 -mb-48 animate-pulse" />
    </section>
  );
}
