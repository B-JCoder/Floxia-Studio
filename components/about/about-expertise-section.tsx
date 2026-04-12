"use client";

import { useRef, useEffect, useState } from "react";

const techGroups = [
  {
    category: "Frontend Frameworks",
    items: ["Next.js", "React", "Angular", "TypeScript"],
  },
  {
    category: "CMS & E-Commerce",
    items: ["WordPress", "Shopify", "Shopify Plus", "WooCommerce", "Headless CMS"],
  },
  {
    category: "Backend & APIs",
    items: ["Node.js", "REST APIs", "GraphQL", "Custom Integrations"],
  },
  {
    category: "AI & Automation",
    items: ["AI Chatbots", "WhatsApp Business", "Email Automation", "CRM Dashboards"],
  },
  {
    category: "Analytics & SEO",
    items: ["Google Analytics 4", "Core Web Vitals", "Schema Markup", "Technical SEO"],
  },
  {
    category: "Payments & Scheduling",
    items: ["Stripe", "PayPal", "Appointment Systems", "Booking Integrations"],
  },
];

export function AboutExpertiseSection() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setIsVisible(true); },
      { threshold: 0.08 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative py-16 sm:py-20 lg:py-28 bg-background overflow-hidden border-t border-foreground/10">
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">

        {/* Header */}
        <div className={`max-w-3xl mb-12 sm:mb-16 lg:mb-20 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="flex items-center gap-3 text-xs sm:text-sm font-mono text-muted-foreground mb-4 sm:mb-6">
            <span className="w-6 sm:w-8 h-px bg-foreground/30" />
            Our Expertise
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display leading-[1.1] tracking-tight mb-4 sm:mb-6">
            Masters of Every Web Technology{" "}
            <span className="text-stroke">That Matters</span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed">
            Most agencies specialize in one or two platforms. We have mastered the entire
            ecosystem — and we prove it on every project we deliver.
          </p>
        </div>

        {/* Two-column layout: description + tech grid */}
        <div className="grid lg:grid-cols-[1fr,1.4fr] gap-10 sm:gap-14 lg:gap-24 items-start">

          {/* Left: paragraphs */}
          <div className="space-y-4 sm:space-y-5">
            {[
              "Our team includes certified developers with deep specialization in Next.js and React for performance-critical applications, Angular for enterprise-grade systems, and WordPress for content-rich, easily manageable websites. Our e-commerce specialists hold hands-on expertise in Shopify, Shopify Plus, WooCommerce, and custom headless commerce architectures.",
              "Beyond the website itself, we are a team of integration engineers. We connect your website to the tools and systems your business runs on — email marketing platforms, CRM systems, payment gateways, WhatsApp Business automation, AI chatbot engines, Google Analytics, appointment scheduling software, and custom business dashboards.",
              "Our SEO and content strategists work hand-in-hand with developers and designers from day one, ensuring that every website we launch is structurally optimized to rank in Google, load fast on every device, and meet Google's Core Web Vitals standards.",
            ].map((para, i) => (
              <p
                key={i}
                className={`text-sm sm:text-base text-foreground/70 leading-relaxed transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                style={{ transitionDelay: `${200 + i * 120}ms` }}
              >
                {para}
              </p>
            ))}
          </div>

          {/* Right: tech category cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {techGroups.map((group, i) => (
              <div
                key={i}
                className={`p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-foreground/10 hover:border-foreground/25 hover:bg-foreground/[0.02] transition-all duration-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                style={{ transitionDelay: `${300 + i * 80}ms` }}
              >
                <span className="block font-mono text-[10px] sm:text-xs text-muted-foreground uppercase tracking-widest mb-2 sm:mb-3">
                  {group.category}
                </span>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="px-2 sm:px-2.5 py-0.5 sm:py-1 text-[10px] sm:text-xs rounded-full border border-foreground/15 text-foreground/70 font-mono"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
