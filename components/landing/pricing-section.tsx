"use client";

import { ArrowRight, Check, Zap, TrendingUp, Rocket, RefreshCw, Plus } from "lucide-react";

const plans = [
  {
    id: "starter",
    icon: Zap,
    label: "01",
    name: "Starter",
    tagline: "Launch Site",
    price: "$2,000",
    priceNote: "Starting at",
    bestFor: "Small businesses, personal brands & early startups",
    features: [
      "Logo Design",
      "Color Palette & Typography",
      "Up to 5 pages",
      "Custom modern design (non-template)",
      "Strategy-focused kickoff meeting",
      "Fully responsive (mobile/tablet/desktop)",
      "Basic animations & interactions",
      "Contact form + integrations",
      "Basic SEO setup",
      "Speed optimization",
      "10 revisions",
    ],
    timeline: "2–3 weeks",
    support: "14 days post-launch",
    cta: "Get Started",
    popular: false,
    accentColor: "from-emerald-400/10 to-transparent",
    dotColor: "bg-emerald-400",
  },
  {
    id: "growth",
    icon: TrendingUp,
    label: "02",
    name: "Growth",
    tagline: "Business Website",
    price: "$4,500",
    priceNote: "Starting at",
    bestFor: "Serious businesses that want leads & conversions",
    features: [
      "Everything in Starter +",
      "Up to 10 pages",
      "Advanced UI/UX design",
      "CMS (blog, case studies, etc.)",
      "Conversion-focused structure (CTAs, layout)",
      "Advanced animations & interactions",
      "CRM, email tools & booking integrations",
      "Google Analytics & tracking setup",
      "Performance optimization (90+ score target)",
    ],
    timeline: "4–6 weeks",
    support: "30 days post-launch",
    cta: "Get Started",
    popular: true,
    accentColor: "from-foreground/8 to-transparent",
    dotColor: "bg-foreground",
  },
  {
    id: "premium",
    icon: Rocket,
    label: "03",
    name: "Premium",
    tagline: "Startup / SaaS Experience",
    price: "$8,500",
    priceNote: "Starting at",
    bestFor: "Funded startups, SaaS & high-ticket businesses",
    features: [
      "Everything in Growth +",
      "10–15+ pages or complex structure",
      "UX strategy (user flow & funnel thinking)",
      "Custom components & advanced interactions",
      "Scalable CMS setup",
      "API / advanced integrations",
      "Conversion optimization setup",
      "Priority support",
    ],
    timeline: "6–8 weeks",
    support: "45 days post-launch",
    cta: "Get Started",
    popular: false,
    accentColor: "from-rose-400/10 to-transparent",
    dotColor: "bg-rose-400",
  },
];

const addons = [
  { name: "Copywriting", price: "$300–$500", unit: "/page" },
  { name: "Branding (logo + identity)", price: "$1,000–$3,000", unit: "" },
  { name: "Advanced SEO", price: "$1,000–$3,000", unit: "" },
  { name: "Extra pages", price: "$150–$300", unit: "/page" },
  { name: "Speed optimization", price: "$500–$1,500", unit: "" },
];

export function PricingSection() {
  return (
    <section id="pricing" className="relative py-16 lg:py-24 border-t border-foreground/10 overflow-hidden">
      {/* Subtle background grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* ── Header ── */}
        <div className="max-w-3xl mb-10 lg:mb-16">
          <span className="inline-flex items-center gap-2 font-mono text-xs tracking-widest text-muted-foreground uppercase mb-4">
            <span className="w-6 h-px bg-foreground/30 inline-block" />
            Pricing
          </span>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-foreground mb-4 leading-tight">
            Invest in your
            <br />
            <span className="text-stroke">digital presence</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed">
            Transparent, project-based pricing. No hidden fees, no surprises — just results that move your business forward.
          </p>
        </div>

        {/* ── Pricing Cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 mb-4">
          {plans.map((plan) => {
            const Icon = plan.icon;
            return (
              <div
                key={plan.id}
                className={`
                  relative flex flex-col rounded-2xl border transition-all duration-300 hover-lift
                  ${plan.popular
                    ? "border-foreground shadow-2xl shadow-foreground/10 md:-mt-4 md:-mb-4"
                    : "border-foreground/15 hover:border-foreground/40"
                  }
                `}
              >
                {/* Card gradient top accent */}
                <div className={`absolute inset-x-0 top-0 h-40 bg-gradient-to-b ${plan.accentColor} pointer-events-none rounded-t-2xl`} />

                {/* Popular badge */}
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-4 py-1.5 bg-foreground text-primary-foreground text-[10px] font-bold uppercase tracking-[0.2em] rounded-full shadow-xl z-20 whitespace-nowrap border border-foreground/10">
                    <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse" />
                    MOST POPULAR
                  </div>
                )}

                <div className="relative p-6 sm:p-8 flex flex-col flex-1">
                  {/* Plan label + icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-xs text-muted-foreground">{plan.label}</span>
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${plan.popular ? "bg-foreground text-primary-foreground" : "bg-foreground/8 text-foreground"}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Name & tagline */}
                  <div className="mb-6">
                    <h3 className="font-display text-2xl sm:text-3xl text-foreground leading-tight">{plan.name}</h3>
                    <p className="text-muted-foreground text-sm font-mono mt-1">"{plan.tagline}"</p>
                  </div>

                  {/* Price */}
                  <div className="mb-6 pb-6 border-b border-foreground/10">
                    <p className="text-xs text-muted-foreground font-mono mb-1">{plan.priceNote}</p>
                    <span className="font-display text-3xl sm:text-4xl text-foreground">{plan.price}</span>
                    <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                      <span className="font-semibold text-foreground/70">Best for:</span> {plan.bestFor}
                    </p>
                  </div>

                  {/* Features */}
                  <ul className="space-y-2.5 mb-8 flex-1">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5">
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${plan.popular ? "bg-foreground" : "bg-foreground/10"}`}>
                          <Check className={`w-2.5 h-2.5 ${plan.popular ? "text-primary-foreground" : "text-foreground"}`} />
                        </div>
                        <span className="text-sm text-muted-foreground leading-snug">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Timeline & support pills */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-foreground/10 text-xs text-muted-foreground font-mono">
                      <span className="w-1 h-1 rounded-full bg-foreground/40" />
                      {plan.timeline}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-foreground/10 text-xs text-muted-foreground font-mono">
                      <span className="w-1 h-1 rounded-full bg-foreground/40" />
                      {plan.support} support
                    </span>
                  </div>

                  {/* CTA */}
                  <a
                    href="/onboarding"
                    className={`
                      w-full py-3.5 rounded-xl flex items-center justify-center gap-2 text-sm font-medium transition-all duration-200 group
                      ${plan.popular
                        ? "bg-foreground text-primary-foreground hover:bg-foreground/90"
                        : "border border-foreground/20 text-foreground hover:border-foreground hover:bg-foreground/5"
                      }
                    `}
                  >
                    {plan.cta}
                    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Ongoing Retainer ── */}
        <div className="rounded-2xl border border-foreground/15 bg-foreground/[0.02] p-6 sm:p-8 mb-6 hover:border-foreground/30 transition-all duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-8">
            {/* Left: icon + label */}
            <div className="flex items-center gap-4 shrink-0">
              <div className="w-12 h-12 rounded-2xl border border-foreground/15 flex items-center justify-center">
                <RefreshCw className="w-5 h-5 text-foreground" />
              </div>
              <div>
                <span className="font-mono text-xs text-muted-foreground block mb-0.5">04 — 🔁 Ongoing</span>
                <h3 className="font-display text-xl sm:text-2xl text-foreground leading-tight">"Growth Retainer"</h3>
                <p className="font-mono text-sm text-foreground mt-1">
                  $800 – $2,000<span className="text-muted-foreground text-xs">/month</span>
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden sm:block w-px self-stretch bg-foreground/10" />

            {/* Features */}
            <ul className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-2 flex-1">
              {[
                "Continuous updates & improvements",
                "New pages/features",
                "Performance optimization",
                "A/B testing & iteration",
                "Priority support",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-foreground shrink-0" />
                  <span className="text-xs sm:text-sm text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <a
              href="/onboarding"
              className="shrink-0 border border-foreground/20 text-foreground hover:border-foreground hover:bg-foreground/5 py-3 px-6 rounded-xl flex items-center gap-2 text-sm font-medium transition-all duration-200 group"
            >
              Let's Talk
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </a>
          </div>
        </div>

        {/* ── Add-Ons ── */}
        <div className="rounded-2xl border border-foreground/15 p-6 sm:p-8 hover:border-foreground/30 transition-all duration-300">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-7 h-7 rounded-lg bg-foreground/8 flex items-center justify-center">
              <Plus className="w-3.5 h-3.5 text-foreground" />
            </div>
            <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
              ⚙️ Add-Ons
            </span>
          </div>
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {addons.map((addon) => (
              <div
                key={addon.name}
                className="group p-4 rounded-xl border border-foreground/10 hover:border-foreground/30 hover:bg-foreground/[0.03] transition-all duration-200 cursor-default"
              >
                <p className="text-sm text-foreground font-medium leading-snug mb-2">{addon.name}</p>
                <p className="font-mono text-xs">
                  <span className="text-foreground">{addon.price}</span>
                  <span className="text-muted-foreground">{addon.unit}</span>
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Bottom CTA ── */}
        <p className="mt-12 text-center text-sm text-muted-foreground">
          Not sure which plan fits?{" "}
          <a
            href="https://calendly.com/aithinkagents/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground underline underline-offset-4 hover:no-underline transition-all"
          >
            Book a free strategy call →
          </a>
        </p>
      </div>
    </section>
  );
}
