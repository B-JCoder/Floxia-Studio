"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import {
  Monitor, Zap, FileCode2, Building2, ShoppingCart,
  Bot, Search, Palette, CalendarCheck, ShieldCheck,
  ArrowRight, Check,
} from "lucide-react";
import Link from "next/link";

// ─── Data ─────────────────────────────────────────────────────────────────────

const services = [
  {
    id: "custom-website",
    number: "01",
    icon: Monitor,
    title: "Custom Website Design & Development",
    subtitle: "Tailored Websites Built to Perform, Convert, and Impress",
    lead: "Your website is your most powerful sales tool. We design and develop fully custom websites built to reflect your brand's unique identity, serve your target audience, and achieve your business objectives.",
    paras: [
      "Every custom website starts with a deep understanding of your business and customers. Our designers craft visually stunning, brand-aligned interfaces that guide visitors from landing to conversion. Our developers bring those designs to life with clean, semantic, highly performant code.",
      "Our custom websites are fully responsive across all screen sizes, optimized for Core Web Vitals, built with accessibility standards in mind, and SEO-optimized from the first line of code. We do not use pre-built templates or page builders — every element is purpose-built for your business.",
    ],
    features: [
      "Responsive across all devices",
      "SEO-ready HTML structure",
      "SSL security included",
      "Google Analytics setup",
      "Contact forms & integrations",
      "30 days post-launch support",
      "Core Web Vitals optimized",
      "Accessibility standards",
    ],
    tag: "Foundation",
  },
  {
    id: "nextjs-react",
    number: "02",
    icon: Zap,
    title: "Next.js & React Development",
    subtitle: "The Gold Standard in Modern Web Performance",
    lead: "For businesses that demand the absolute best in speed, SEO performance, and scalability — Next.js and React is the gold standard, delivering page load speeds that consistently score 95–100 on Google PageSpeed Insights.",
    paras: [
      "Next.js enables us to build websites with server-side rendering (SSR), static site generation (SSG), and edge-optimized deployment. We build Next.js applications for SaaS platforms, high-traffic marketing websites, complex e-commerce frontends, content portals, and enterprise web applications.",
      "Our React component architecture ensures that your codebase is maintainable, scalable, and ready to grow with your business for years to come. TypeScript-first, tested, and production-hardened.",
    ],
    features: [
      "Server-side rendering (SSR)",
      "Static site generation (SSG)",
      "Edge-optimized deployment",
      "95+ PageSpeed scores",
      "TypeScript-first codebase",
      "Scalable component design",
      "SaaS & enterprise ready",
      "Continuous deployment pipeline",
    ],
    tag: "Performance",
  },
  {
    id: "wordpress",
    number: "03",
    icon: FileCode2,
    title: "WordPress Development",
    subtitle: "Powerful, Flexible Sites Built for Non-Technical Teams",
    lead: "WordPress powers over 43% of all websites on the internet — and when built by experts, it becomes an extraordinarily powerful, flexible, and easy-to-manage platform for businesses of all types.",
    paras: [
      "We develop custom WordPress themes from scratch, build and integrate custom plugins, and optimize WordPress installations for maximum speed and security. Our WordPress development is ideal for businesses that need a content-rich website with the ability to update, publish, and manage content without technical knowledge.",
      "We also specialize in WordPress performance optimization — transforming slow, bloated WordPress installations into lean, fast-loading websites that score highly in Core Web Vitals and rank strongly in search results.",
    ],
    features: [
      "Custom theme from scratch",
      "Custom plugin development",
      "Intuitive CMS interface",
      "Advanced custom fields",
      "Performance optimization",
      "Security hardening",
      "Multi-site support",
      "Easy content management",
    ],
    tag: "Content Management",
  },
  {
    id: "angular",
    number: "04",
    icon: Building2,
    title: "Angular Enterprise Development",
    subtitle: "Robust, Scalable Applications for Complex Business Needs",
    lead: "When your project demands enterprise-level architecture, complex state management, and a robust, type-safe codebase — Angular is the framework of choice for long-term success.",
    paras: [
      "Our Angular development team builds sophisticated web applications for enterprise clients, SaaS platforms, internal business tools, data-intensive dashboards, and any project where scalability, maintainability, and long-term code quality are non-negotiable requirements.",
      "We architect Angular applications with modular design patterns, lazy loading, and rigorous testing strategies — ensuring your application performs flawlessly at scale.",
    ],
    features: [
      "Enterprise-grade architecture",
      "Complex state management",
      "Type-safe TypeScript",
      "Modular design patterns",
      "Data-intensive dashboards",
      "Rigorous test coverage",
      "Lazy loading optimized",
      "Long-term code quality",
    ],
    tag: "Enterprise",
  },
  {
    id: "ecommerce",
    number: "05",
    icon: ShoppingCart,
    title: "Shopify & E-Commerce Development",
    subtitle: "E-Commerce Stores Engineered to Sell",
    lead: "E-commerce is where Floxia Studio truly excels. We build online stores that don't just look impressive but are strategically designed to maximize conversion rates, reduce cart abandonment, and increase average order value.",
    paras: [
      "Our Shopify development covers the full spectrum. We build custom Shopify themes from scratch, develop custom apps and integrations, migrate existing stores, and optimize for higher conversion. For high-volume merchants, our Shopify Plus expertise enables advanced checkout customization, B2B wholesale functionality, and complex multi-currency deployments.",
      "Our WooCommerce solutions provide WordPress-powered e-commerce for businesses that need more flexibility — with complex product configurations, subscription billing, custom checkout flows, and deep integration with third-party inventory, shipping, and accounting systems.",
    ],
    features: [
      "Custom branded Shopify themes",
      "Mobile-optimized product pages",
      "Payment gateway setup",
      "SEO-optimized structure",
      "Shopify Plus expertise",
      "WooCommerce development",
      "Store migration services",
      "Post-launch monitoring",
    ],
    tag: "E-Commerce",
  },
  {
    id: "ai-automation",
    number: "06",
    icon: Bot,
    title: "AI, Chatbot & Automation Integrations",
    subtitle: "Turn Your Website Into a 24/7 Business Machine",
    lead: "The websites that win in today's competitive landscape are the ones that work intelligently — capturing leads, answering questions, booking appointments, and nurturing prospects even while you sleep.",
    paras: [
      "We integrate AI-powered chatbots trained on your business knowledge base — capable of answering customer questions, qualifying leads, recommending products, and routing conversations to the right team member. Our WhatsApp Business API integrations connect your website directly to WhatsApp, enabling seamless customer communication.",
      "Beyond chatbots, we build and integrate automated email sequences, CRM pipeline connections, smart contact forms with automated routing, appointment booking systems with calendar sync, and custom business intelligence dashboards.",
    ],
    features: [
      "AI chatbot integration",
      "WhatsApp Business API",
      "Automated email sequences",
      "CRM pipeline connections",
      "Smart lead routing",
      "Appointment booking systems",
      "Calendar sync (Google, Calendly)",
      "Business intelligence dashboards",
    ],
    tag: "Automation",
  },
  {
    id: "seo",
    number: "07",
    icon: Search,
    title: "SEO-Optimized Website Design",
    subtitle: "Websites Designed to Rank From Day One",
    lead: "SEO is not something bolted onto a website after it's built — at Floxia Studio, it is baked into every decision we make during the design and development process.",
    paras: [
      "Every website we deliver is technically sound, semantically structured, and content-optimized to give it the strongest possible foundation for ranking in Google. Our SEO-integrated process includes clean URL structures, proper heading hierarchy, schema markup, optimized meta titles and descriptions, image alt text, canonical tags, XML sitemap generation, and Core Web Vitals optimization.",
      "We also provide full on-page content optimization, keyword mapping, and content strategy consulting to ensure your website attracts the right organic traffic from launch day.",
    ],
    features: [
      "Technical SEO audit",
      "Schema markup implementation",
      "Core Web Vitals optimization",
      "Keyword mapping strategy",
      "On-page content optimization",
      "XML sitemap & robots.txt",
      "Canonical tag management",
      "Mobile-first indexing ready",
    ],
    tag: "Visibility",
  },
  {
    id: "branding",
    number: "08",
    icon: Palette,
    title: "Branded Design & Visual Identity",
    subtitle: "Custom Design That Tells Your Brand Story",
    lead: "Generic design kills conversions. Visitors make judgment calls about your brand within milliseconds — and those judgments are based almost entirely on visual design.",
    paras: [
      "At Floxia Studio, our design team creates visually distinctive, brand-aligned website designs that communicate professionalism, trustworthiness, and quality at first glance.",
      "We offer complete brand identity development alongside web design, including logo design, typography systems, color palette development, icon design, and comprehensive brand guidelines. When your website design and brand identity are developed together by the same creative team, the result is a cohesive, powerful digital presence that stands apart from your competition.",
    ],
    features: [
      "Logo design",
      "Typography systems",
      "Color palette development",
      "Icon & illustration design",
      "Brand guidelines document",
      "Visual identity package",
      "Design system creation",
      "Motion & animation language",
    ],
    tag: "Identity",
  },
  {
    id: "booking-forms",
    number: "09",
    icon: CalendarCheck,
    title: "Forms, Booking & Sales Systems",
    subtitle: "Conversion-Optimized Systems That Capture Revenue",
    lead: "A great website drives visitors to take action — and that action needs to be captured efficiently with high-converting systems that never let a lead slip through.",
    paras: [
      "Floxia Studio designs and develops a full range of conversion systems: multi-step contact forms, lead capture forms, appointment booking systems with real-time availability, sales product pages with upsell flows, sales funnels, and landing pages engineered to convert at the highest possible rate.",
      "Our booking systems integrate with Google Calendar, Calendly, and custom scheduling backends. Our sales pages are built with proven CRO principles — strategic use of social proof, urgency elements, trust signals, and clear calls-to-action.",
    ],
    features: [
      "Multi-step contact forms",
      "Real-time booking systems",
      "Google Calendar integration",
      "Calendly sync",
      "Sales funnels",
      "CRO landing pages",
      "Upsell & cross-sell flows",
      "Lead capture automation",
    ],
    tag: "Conversion",
  },
  {
    id: "security",
    number: "10",
    icon: ShieldCheck,
    title: "Website Security & Performance",
    subtitle: "Fast, Secure, Always Available",
    lead: "Every website Floxia Studio delivers is hardened for security and optimized for maximum performance — because speed and security are not optional, they are the foundation.",
    paras: [
      "We implement SSL/TLS encryption, security headers, DDoS protection via Cloudflare CDN, regular security audits, and automated backup systems on every project.",
      "Performance optimization is equally rigorous — we compress and serve images in next-generation formats, minify and bundle CSS and JavaScript, leverage browser caching, implement lazy loading, and optimize server response times to achieve Google PageSpeed scores that consistently outperform industry benchmarks.",
    ],
    features: [
      "SSL/TLS encryption",
      "DDoS protection (Cloudflare)",
      "Security headers hardening",
      "Automated backups",
      "WebP/AVIF image optimization",
      "JavaScript & CSS minification",
      "Browser caching strategy",
      "Core Web Vitals compliance",
    ],
    tag: "Security",
  },
];

// ─── Animated section hook ────────────────────────────────────────────────────

function useVisible(threshold = 0.12) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

// ─── Visual accent — abstract geometric decoration ────────────────────────────

function ServiceVisual({ number, icon: Icon }: { number: string; icon: React.ElementType }) {
  return (
    <div className="relative w-full aspect-square max-w-sm mx-auto select-none pointer-events-none">
      {/* Outer ring */}
      <div className="absolute inset-0 rounded-full border border-foreground/8" />
      {/* Mid ring */}
      <div className="absolute inset-8 rounded-full border border-foreground/12" />
      {/* Inner filled circle */}
      <div className="absolute inset-16 rounded-full bg-foreground/[0.04] border border-foreground/15 flex items-center justify-center">
        <Icon className="w-10 h-10 text-foreground/50" />
      </div>
      {/* Decorative large number */}
      <span className="absolute -top-4 -right-4 font-display text-[7rem] leading-none text-foreground/[0.05] tracking-tighter">
        {number}
      </span>
      {/* Orbiting dot — top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-foreground/20" />
      {/* Orbiting dot — right */}
      <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-foreground/15" />
      {/* Orbiting dot — bottom-left */}
      <div className="absolute bottom-6 left-6 w-1 h-1 rounded-full bg-foreground/20" />
      {/* Horizontal rule accent */}
      <div className="absolute bottom-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent" />
    </div>
  );
}

// ─── Individual Service Section ───────────────────────────────────────────────

function ServiceSection({
  service,
  index,
}: {
  service: (typeof services)[0];
  index: number;
}) {
  const { ref, visible } = useVisible();
  const Icon = service.icon;
  const isReversed = index % 2 !== 0;

  return (
    <div
      ref={ref}
      id={service.id}
      className="relative border-t border-foreground/10 py-16 sm:py-20 lg:py-28 scroll-mt-[112px]"
    >
      {/* Section container */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
        <div
          className={`grid lg:grid-cols-2 gap-10 lg:gap-20 items-center ${
            isReversed ? "lg:[&>*:first-child]:order-2" : ""
          }`}
        >
          {/* ── Text Column ── */}
          <div
            className={`transition-all duration-1000 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            {/* Label row */}
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-xs text-muted-foreground">{service.number}</span>
              <span className="w-6 h-px bg-foreground/20" />
              <span className="px-2.5 py-0.5 rounded-full border border-foreground/15 font-mono text-xs text-muted-foreground">
                {service.tag}
              </span>
            </div>

            {/* Icon + Title */}
            <div className="flex items-start gap-3 sm:gap-4 mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-foreground/8 flex items-center justify-center shrink-0 mt-0.5 sm:mt-1">
                <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-foreground" />
              </div>
              <h2 className="font-display text-2xl sm:text-3xl lg:text-[2.4rem] leading-[1.1] tracking-tight text-foreground">
                {service.title}
              </h2>
            </div>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm font-mono text-muted-foreground mb-5 pl-0 sm:pl-14 lg:pl-16">
              &quot;{service.subtitle}&quot;
            </p>

            {/* Lead */}
            <p className="text-base sm:text-lg text-foreground/80 leading-relaxed mb-4 pl-0 sm:pl-14 lg:pl-16">
              {service.lead}
            </p>

            {/* Body paragraphs */}
            <div className="space-y-3 pl-0 sm:pl-14 lg:pl-16 mb-8">
              {service.paras.map((para, i) => (
                <p
                  key={i}
                  className={`text-sm text-muted-foreground leading-relaxed transition-all duration-700 ${
                    visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: `${300 + i * 120}ms` }}
                >
                  {para}
                </p>
              ))}
            </div>

            {/* CTA */}
            <div className="pl-0 sm:pl-14 lg:pl-16">
              <Link
                href="/onboarding"
                className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-foreground text-primary-foreground text-sm font-medium hover:bg-foreground/90 transition-all group"
              >
                Start This Service
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* ── Visual + Features Column ── */}
          <div
            className={`transition-all duration-1000 delay-200 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            {/* Abstract visual — hidden on mobile/tablet to save space */}
            <div className="hidden lg:block mb-8">
              <ServiceVisual number={service.number} icon={Icon} />
            </div>

            {/* Features card */}
            <div className="p-6 sm:p-8 rounded-2xl border border-foreground/10 bg-foreground/[0.02]">
              <span className="block font-mono text-xs text-muted-foreground uppercase tracking-widest mb-5">
                What's Included
              </span>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
                {service.features.map((feat, i) => (
                  <li
                    key={i}
                    className={`flex items-start gap-2.5 transition-all duration-500 ${
                      visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
                    }`}
                    style={{ transitionDelay: `${400 + i * 60}ms` }}
                  >
                    <div className="w-5 h-5 rounded-full bg-foreground/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-foreground" />
                    </div>
                    <span className="text-sm text-muted-foreground leading-snug">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Services Nav Index ───────────────────────────────────────────────────────

function ServicesIndex() {
  const [active, setActive] = useState(0);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, id: string, i: number) => {
      e.preventDefault();
      setActive(i);
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    },
    []
  );

  return (
    <div className="border-t border-b border-foreground/10 bg-background/95 backdrop-blur-sm sticky top-0 z-30 overflow-x-auto">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex items-center gap-0 sm:gap-1">
          {services.map((s, i) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              onClick={(e) => handleClick(e, s.id, i)}
              className={`flex items-center gap-1.5 px-3 sm:px-4 py-3.5 text-[10px] sm:text-xs font-mono whitespace-nowrap border-b-2 transition-all duration-200 ${
                active === i
                  ? "border-foreground text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-foreground/30"
              }`}
            >
              <span className="opacity-40">{s.number}</span>
              <span className="hidden md:inline">{s.tag}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────

export function ServicesListSection() {
  const { ref: headerRef, visible: headerVisible } = useVisible(0.1);

  return (
    <div>
      {/* ── Intro header ── */}
      <section ref={headerRef} className="py-16 sm:py-20 lg:py-28 border-t border-foreground/10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
          <div
            className={`max-w-4xl transition-all duration-1000 ${
              headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="flex items-center gap-3 text-xs sm:text-sm font-mono text-muted-foreground mb-6">
              <span className="w-6 sm:w-8 h-px bg-foreground/30" />
              10 Services · One Expert Team
            </div>
            <h2 className="font-display text-3xl sm:text-5xl lg:text-7xl leading-[1.05] tracking-tight mb-5 sm:mb-8">
              Every service your business needs to{" "}
              <span className="text-stroke">dominate online</span>
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed max-w-3xl">
              Below is a comprehensive breakdown of every service we provide. Whatever your
              business model, technology requirement, or industry — we have the skills, experience,
              and passion to build it right. No outsourcing. No fragmented handoffs. One team.
            </p>
          </div>

          {/* Quick-stat row */}
          <div
            className={`grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-10 sm:mt-14 transition-all duration-700 delay-300 ${
              headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            {[
              { val: "10+", label: "Core Services" },
              { val: "50+", label: "Projects Delivered" },
              { val: "95+", label: "Avg PageSpeed Score" },
              { val: "24h", label: "Response Guarantee" },
            ].map((s, i) => (
              <div
                key={i}
                className="p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-foreground/10 hover:border-foreground/25 transition-all duration-300"
              >
                <span className="block font-display text-2xl sm:text-3xl text-foreground">{s.val}</span>
                <span className="block font-mono text-[10px] sm:text-xs text-muted-foreground uppercase tracking-widest mt-1">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sticky service navigator ── */}
      <ServicesIndex />

      {/* ── Individual service sections ── */}
      {services.map((service, i) => (
        <ServiceSection key={service.id} service={service} index={i} />
      ))}
    </div>
  );
}
