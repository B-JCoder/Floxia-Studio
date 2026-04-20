"use client";

import { useEffect, useState } from "react";

export function StatsMarquee() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="py-4 sm:py-6 lg:py-8 border-b border-foreground/10 overflow-hidden w-full relative">
      {/* Stats marquee */}
      <div
        className={`w-full transition-all duration-200 delay-100 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <div className="flex gap-6 sm:gap-8 lg:gap-12 marquee whitespace-nowrap">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-16">
              {[
                {
                  value: "3x",
                  label: "faster website delivery",
                  company: "FLOXIA STUDIO",
                },
                {
                  value: "100%",
                  label: "client satisfaction rate",
                  company: "OUR CLIENTS",
                },
                {
                  value: "99+",
                  label: "PageSpeed score, every build",
                  company: "GOOGLE LIGHTHOUSE",
                },
                {
                  value: "300%",
                  label: "avg. organic traffic growth",
                  company: "SEO RESULTS",
                },
                {
                  value: "10+",
                  label: "websites launched",
                  company: "FLOXIA STUDIO",
                },
                {
                  value: "24hr",
                  label: "guaranteed response time",
                  company: "OUR PROMISE",
                },
              ].map((stat) => (
                <div
                  key={`${stat.company}-${stat.value}-${i}`}
                  className="flex items-baseline gap-2 sm:gap-3 lg:gap-4"
                >
                  <span className="text-2xl sm:text-3xl lg:text-5xl font-display">
                    {stat.value}
                  </span>
                  <span className="text-xs sm:text-sm text-muted-foreground">
                    {stat.label}
                    <span className="block font-mono text-[10px] sm:text-xs mt-0.5 sm:mt-1">
                      {stat.company}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
