import { Navigation } from "@/components/landing/navigation";
import { HeroSection } from "@/components/landing/hero-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { InfrastructureSection } from "@/components/landing/infrastructure-section";
import { MetricsSection } from "@/components/landing/metrics-section";
import { IntegrationsSection } from "@/components/landing/integrations-section";
import { SecuritySection } from "@/components/landing/security-section";
import { DevelopersSection } from "@/components/landing/developers-section";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { PricingSection } from "@/components/landing/pricing-section";
import { CTASection } from "@/components/landing/cta-section";
import { BlogSection } from "@/components/landing/blog-section";
import { FooterSection } from "@/components/landing/footer-section";
import { StatsMarquee } from "@/components/landing/stats-marquee";
import { WhoWeAreSection } from "@/components/landing/who-we-are-section";
import { WhatWeDoSection } from "@/components/landing/what-we-do-section";
import { TechStackSection } from "@/components/landing/tech-stack-section";
import { WhyChooseUsSection } from "@/components/landing/why-choose-us-section";
import { SocialProofSection } from "@/components/landing/social-proof-section";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Floxia Studio | Custom Web Design & Development Agency USA",
  description:
    "Floxia Studio builds high-performance websites using Next.js, React, Angular, WordPress & Shopify. AI integrations, chatbots, dashboards & SEO-ready design. Fast. Secure. Built for results.",
  keywords: [
    "web design agency USA",
    "custom website development",
    "Next.js agency",
    "Shopify agency",
    "AI web development",
  ],
  alternates: {
    canonical: "https://floxiastudio.com/",
  },
  openGraph: {
    title: "Floxia Studio We Build Websites That Work Harder",
    description:
      "From custom-coded Next.js apps to Shopify stores and WordPress sites Floxia Studio delivers fast, secure, AI-powered websites tailored to your business goals.",
    url: "https://floxiastudio.com/",
    type: "website",
  },
};

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden noise-overlay">
      <Navigation />
      <HeroSection
        eyebrow="Floxia Studio"
        headingLine1="Floxia Studio Builds"
        headingLine2="What Businesses Need"
        description="We are Floxia Studio a full-service web design and development agency based in the USA, crafting high-performance websites, e-commerce stores, and AI-integrated digital systems for ambitious brands worldwide."
        primaryCta={{ label: "Start Your Project", href: "/onboarding" }}
        secondaryCta={{ label: "See Our Work", href: "#work" }}
      />
      <StatsMarquee />
      <WhoWeAreSection />
      <WhatWeDoSection />

      <FeaturesSection />
      <HowItWorksSection />
      <InfrastructureSection />
      <MetricsSection />

      <TechStackSection />
      <WhyChooseUsSection />

      <IntegrationsSection />
      <SecuritySection />
      <DevelopersSection />
      <TestimonialsSection />
      <PricingSection />

      <CTASection />

      <BlogSection />
      <FooterSection />
    </main>
  );
}
