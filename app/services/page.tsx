import { Navigation } from "@/components/landing/navigation";
import { HeroSection } from "@/components/landing/hero-section";
import { FooterSection } from "@/components/landing/footer-section";
import { ServicesListSection } from "@/components/services/services-list-section";
import { CTASection } from "@/components/landing/cta-section";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Web Design & Development Services | Floxia Studio USA",
  description:
    "Explore Floxia Studio's full range of web services: custom development, Shopify, WordPress, AI chatbots, dashboards, SEO, booking systems & e-commerce. Built for US businesses.",
  keywords: [
    "custom website development services",
    "Shopify development",
    "WordPress agency",
    "AI chatbot integration",
    "web design services USA",
  ],
  alternates: {
    canonical: "https://floxiastudio.com/services",
  },
};

export default function ServicesPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden noise-overlay">
      <Navigation />

      {/* Hero */}
      <HeroSection
        eyebrow="Our Services"
        headingLine1="Full-Stack Web Services"
        headingLine2="Engineered for Business Growth"
        description={
          <>
            <p>
              At Floxia Studio, our service offering covers the entire digital
              build spectrum from brand-new website design and development to
              complex system integrations, e-commerce ecosystems, and AI-powered
              automation. We are a single-source partner for everything your
              business needs to succeed online.
            </p>
            <p>
              No outsourcing. No fragmented handoffs between agencies. One
              expert team, one vision, one exceptional result. Whatever your
              business model, industry, or technology requirement, we have the
              skills, experience, and passion to build it right.
            </p>
          </>
        }
        primaryCta={{ label: "Start a Project", href: "/onboarding" }}
        secondaryCta={{ label: "View Pricing", href: "/#pricing" }}
      />

      {/* Services-specific sections */}
      <ServicesListSection />
      <CTASection
        eyebrow="Ready to Get Started?"
        title="Let's Build Your Digital Presence"
        description="Tell us about your project and we'll recommend the exact combination of services that will drive your business forward. Free consultation, no obligations."
        showStats={true}
        stats={[
          { value: "10+", label: "Core Services" },
          { value: "50+", label: "Projects Delivered" },
          { value: "95+", label: "PageSpeed Scores" },
          { value: "24h", label: "Response Time" },
        ]}
      />

      <FooterSection />
    </main>
  );
}
