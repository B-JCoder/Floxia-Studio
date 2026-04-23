"use client";

import { NicheData } from "@/lib/niches";
import { AnimatedWave } from "../landing/animated-wave";
import Link from "next/link";

export function LandingFooter({ niche }: { niche: NicheData }) {
  const footerLinks = {
    Navigation: [
      { name: "The Problem", href: "#problem" },
      { name: "Our Solution", href: "#solution" },
      { name: "Process", href: "#process" },
      { name: "Pricing", href: "#pricing" },
    ],
    Legal: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
    ],
  };

  return (
    <footer className="relative border-t border-foreground/10 bg-background overflow-hidden">
      <div className="absolute inset-0 h-64 opacity-10 pointer-events-none overflow-hidden">
        <AnimatedWave />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 lg:gap-24">
            <div className="col-span-1 md:col-span-2">
              <Link href="/" className="inline-flex items-center gap-2 mb-8 group">
                <img src="/logo.png" alt="Logo" className="h-12 w-auto transition-transform duration-500 group-hover:scale-105" />
              </Link>
              <p className="text-muted-foreground leading-relaxed text-lg max-w-sm font-light">
                Floxia Studio specializes in building high-performance, client-generating systems for {niche.slug} across the USA.
              </p>
            </div>

            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h3 className="text-sm font-mono uppercase tracking-[0.2em] text-foreground/40 mb-6">{title}</h3>
                <ul className="space-y-4">
                  {links.map((link) => (
                    <li key={link.name}>
                      <a href={link.href} className="text-base text-muted-foreground hover:text-foreground transition-colors duration-300">
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="py-10 border-t border-foreground/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm text-muted-foreground font-mono">
            &copy; {new Date().getFullYear()} Floxia Studio. Built for {niche.id}.
          </p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
