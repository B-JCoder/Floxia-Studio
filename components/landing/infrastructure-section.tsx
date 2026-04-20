"use client";

import { useEffect, useState, useRef } from "react";

const services = [
  { name: "Next.js & React", category: "Frontend", status: "Live" },
  { name: "Shopify & WooCommerce", category: "E-Commerce", status: "Live" },
  { name: "WordPress & Webflow", category: "CMS", status: "Live" },
  { name: "Angular & Vue", category: "Enterprise", status: "Live" },
  { name: "AI & Chatbot Integration", category: "Automation", status: "Live" },
  { name: "SEO & Performance", category: "Growth", status: "Live" },
];

export function InfrastructureSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeService, setActiveService] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveService((prev) => (prev + 1) % services.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={sectionRef} className="relative py-16 lg:py-24 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Content */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
              <span className="w-8 h-px bg-foreground/30" />
              Our Expertise
            </span>
            <h2 className="text-4xl lg:text-5xl font-display tracking-tight mb-6">
              Every platform.
              <br />
              Mastered.
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              From Next.js and React to Shopify, WordPress, and Angular - we build
              on every major web platform and integrate the tools that make your
              business run. One agency, total coverage.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8">
              <div>
                <div className="text-4xl lg:text-5xl font-display mb-2">10+</div>
                <div className="text-sm text-muted-foreground">Web technologies mastered</div>
              </div>
              <div>
                <div className="text-4xl lg:text-5xl font-display mb-2">100%</div>
                <div className="text-sm text-muted-foreground">Client satisfaction rate</div>
              </div>
              <div>
                <div className="text-4xl lg:text-5xl font-display mb-2">99+</div>
                <div className="text-sm text-muted-foreground">PageSpeed on every build</div>
              </div>
            </div>
          </div>

          {/* Right: Location list */}
          <div
            className={`transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <div className="border border-foreground/10">
              {/* Header */}
              <div className="px-6 py-4 border-b border-foreground/10 flex items-center justify-between">
                <span className="text-sm font-mono text-muted-foreground">Technology Stack</span>
                <span className="flex items-center gap-2 text-xs font-mono text-green-600">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  All services active
                </span>
              </div>

              {/* Services */}
              <div>
                {services.map((service, index) => (
                  <div
                    key={service.name}
                    className={`px-6 py-5 border-b border-foreground/5 last:border-b-0 flex items-center justify-between transition-all duration-300 ${
                      activeService === index ? "bg-foreground/[0.02]" : ""
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                          activeService === index ? "bg-green-500" : "bg-foreground/20"
                        }`}
                      />
                      <div>
                        <div className="font-medium">{service.name}</div>
                        <div className="text-sm text-muted-foreground">{service.category}</div>
                      </div>
                    </div>
                    <span className="font-mono text-sm text-muted-foreground">{service.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
