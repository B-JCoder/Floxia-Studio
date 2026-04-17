"use client";

import { useRef, useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface CTASectionProps {
  eyebrow?: string;
  title: string;
  description: string | React.ReactNode;
  primaryCta?: {
    label: string;
    href: string;
    external?: boolean;
  };
  secondaryCta?: {
    label: string;
    href: string;
  };
  stats?: {
    value: string;
    label: string;
  }[];
  showStats?: boolean;
}

export function CTASection({
  eyebrow = "Ready to Get Started?",
  title,
  description,
  primaryCta = {
    label: "Schedule a Free Discovery Call",
    href: "https://calendly.com/aithinkagents/30min",
    external: true,
  },
  secondaryCta = {
    label: "Start Your Project",
    href: "/onboarding",
  },
  stats,
  showStats = false,
}: CTASectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="py-16 lg:py-24 bg-background border-t border-foreground/10 overflow-hidden relative"
    >
      {/* Grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Stats strip */}
        {showStats && stats && (
          <div
            className={`grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {stats.map((stat, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl border border-foreground/10 text-center hover:border-foreground/25 transition-all duration-300"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <span className="block font-display text-3xl sm:text-4xl text-foreground">
                  {stat.value}
                </span>
                <span className="block font-mono text-xs text-muted-foreground uppercase tracking-widest mt-1">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Main CTA card */}
        <div
          className={`p-8 sm:p-12 lg:p-16 rounded-3xl bg-foreground text-primary-foreground relative overflow-hidden transition-all duration-1000 ${
            isVisible
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-95 translate-y-12"
          }`}
          style={{ transitionDelay: showStats ? "200ms" : "0ms" }}
        >
          {/* Decorative blurs */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-foreground/10 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary-foreground/5 blur-[100px] rounded-full -translate-x-1/3 translate-y-1/3 pointer-events-none" />

          <div className="relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            {/* Left */}
            <div>
              {eyebrow && (
                <div className="flex items-center gap-3 text-sm font-mono text-primary-foreground/50 mb-4">
                  <span className="w-8 h-px bg-primary-foreground/30" />
                  {eyebrow}
                </div>
              )}
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-[1.1] mb-4 tracking-tight">
                {title}
              </h2>
              <div className="text-base sm:text-lg text-primary-foreground/70 leading-relaxed max-w-xl">
                {typeof description === "string" ? <p>{description}</p> : description}
              </div>
            </div>

            {/* Right — CTAs */}
            <div className="flex flex-col gap-4 lg:items-end">
              {primaryCta && (
                <Link
                  href={primaryCta.href}
                  target={primaryCta.external ? "_blank" : undefined}
                  rel={primaryCta.external ? "noopener noreferrer" : undefined}
                  className="inline-flex items-center justify-center gap-3 bg-primary-foreground text-foreground px-8 py-4 rounded-full text-sm font-medium hover:bg-primary-foreground/90 transition-all group w-full sm:w-auto"
                >
                  {primaryCta.label}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              )}
              {secondaryCta && (
                <Link
                  href={secondaryCta.href}
                  className="inline-flex items-center justify-center gap-3 border border-primary-foreground/20 text-primary-foreground px-8 py-4 rounded-full text-sm font-medium hover:border-primary-foreground/50 hover:bg-primary-foreground/5 transition-all group w-full sm:w-auto"
                >
                  {secondaryCta.label}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
