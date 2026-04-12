"use client";

import { useRef, useEffect, useState } from "react";
import { Search, PenTool, Code2, Puzzle, BarChart2, Rocket } from "lucide-react";

const stages = [
  {
    icon: Search,
    number: "01",
    title: "Discovery",
    desc: "Deep-dive into your business, goals, competitors, and target audience to establish a rock-solid foundation.",
  },
  {
    icon: BarChart2,
    number: "02",
    title: "Strategy",
    desc: "Platform selection, information architecture, SEO keyword mapping, and technology stack planning.",
  },
  {
    icon: PenTool,
    number: "03",
    title: "Design",
    desc: "Wireframes, UI mockups, and brand-aligned visual design with your feedback built in at every step.",
  },
  {
    icon: Code2,
    number: "04",
    title: "Development",
    desc: "Clean, semantic, secure code with continuous staging environment access for your review throughout.",
  },
  {
    icon: Puzzle,
    number: "05",
    title: "Integration",
    desc: "All third-party tools, APIs, chatbots, and automation systems connected and thoroughly tested.",
  },
  {
    icon: BarChart2,
    number: "06",
    title: "SEO & Performance",
    desc: "Technical SEO audit, speed optimization, Core Web Vitals compliance, and schema markup implementation.",
  },
  {
    icon: Rocket,
    number: "07",
    title: "Launch & Support",
    desc: "Monitored deployment, post-launch testing, and ongoing support packages available to keep you growing.",
  },
];

export function AboutProcessSection() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setIsVisible(true); },
      { threshold: 0.05 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative py-20 sm:py-24 lg:py-36 bg-background overflow-hidden border-t border-foreground/10">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-foreground/[0.03] rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">

        {/* Header */}
        <div className={`text-center max-w-2xl mx-auto mb-12 sm:mb-16 lg:mb-20 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="flex items-center justify-center gap-3 text-xs sm:text-sm font-mono text-muted-foreground mb-5">
            <span className="w-6 sm:w-8 h-px bg-foreground/30" />
            Our Process
            <span className="w-6 sm:w-8 h-px bg-foreground/30" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display leading-[1.1] tracking-tight mb-4 sm:mb-5">
            A Proven Process That{" "}
            <span className="text-stroke">Delivers Results</span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed">
            Great websites are not built by accident. They are the product of a disciplined,
            well-structured process that puts client goals at the center of every decision.
          </p>
        </div>

        {/* Stages grid — 1 col mobile, 2 col tablet, left/right split on desktop */}
        <div className="relative">

          {/* Vertical connector line (lg only) */}
          <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-px bg-foreground/10 z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 sm:gap-5 lg:gap-6">
            {stages.map((stage, i) => {
              const Icon = stage.icon;
              const isLeft = i % 2 === 0;

              return (
                <div
                  key={i}
                  className={`
                    relative
                    lg:flex lg:items-center
                    ${isLeft ? "lg:justify-start lg:pr-[calc(50%+2rem)]" : "lg:justify-end lg:pl-[calc(50%+2rem)]"}
                    transition-all duration-700
                    ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
                  `}
                  style={{ transitionDelay: `${180 + i * 100}ms` }}
                >
                  {/* Center dot (lg only) */}
                  <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-9 h-9 rounded-full border-2 border-foreground/20 bg-background items-center justify-center z-10 shrink-0">
                    <span className="font-mono text-[10px] text-muted-foreground">{stage.number}</span>
                  </div>

                  {/* Card */}
                  <div className="group flex items-start gap-3 sm:gap-4 p-5 sm:p-6 rounded-2xl border border-foreground/10 hover:border-foreground/25 hover:bg-foreground/[0.02] transition-all duration-300 cursor-default lg:max-w-[calc(50%-3rem)] w-full">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-foreground/5 flex items-center justify-center shrink-0 group-hover:bg-foreground/10 transition-colors">
                      <Icon className="w-4 h-4 text-foreground" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-[10px] sm:text-xs text-muted-foreground">
                          Stage {stage.number}
                        </span>
                      </div>
                      <h3 className="font-display text-base sm:text-lg text-foreground mb-1">{stage.title}</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{stage.desc}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
