import { Navigation } from "@/components/landing/navigation";
import { HeroSection } from "@/components/landing/hero-section";
import { FooterSection } from "@/components/landing/footer-section";
import { AboutStorySection } from "@/components/about/about-story-section";
import { AboutMissionSection } from "@/components/about/about-mission-section";
import { AboutExpertiseSection } from "@/components/about/about-expertise-section";
import { AboutProcessSection } from "@/components/about/about-process-section";
import { CTASection } from "@/components/landing/cta-section";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Floxia Studio | Expert Web Design & Dev Team USA",
  description:
    "Meet the team behind Floxia Studio — web designers, developers & SEO specialists building custom websites, Shopify stores & AI-integrated platforms for US businesses.",
  keywords: [
    "web design agency team USA",
    "professional web developers",
    "branded web design",
    "full-stack web agency",
  ],
  alternates: {
    canonical: "https://floxiastudio.com/about",
  },
};

export default function AboutPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden noise-overlay">
      <Navigation />

      {/* Hero */}
      <HeroSection
        eyebrow="About Us"
        headingLine1="We Are Floxia Studio"
        headingLine2="Built by Builders, for Businesses"
        description={
          <>
            <p>
              Floxia Studio is a premier custom web design and development
              agency serving clients across the United States and beyond. We
              were founded with a singular obsession: to close the gap between
              what businesses need from their websites and what generic agencies
              typically deliver. Our name, Floxia, represents the fluid flow of
              ideas from concept to code, from design to deployment.
            </p>
            <p>
              We are not a template shop. We are not a one-size-fits-all
              solution. We are a team of dedicated engineers, creative
              designers, and digital strategists who believe that every business
              deserves a website that is as unique, powerful, and ambitious as
              the brand it represents.
            </p>
          </>
        }
        primaryCta={{ label: "Work With Us", href: "/onboarding" }}
        secondaryCta={{ label: "Explore Services", href: "/services" }}
      />

      {/* About-specific sections */}
      <AboutStorySection />
      <AboutMissionSection />
      <AboutExpertiseSection />
      <AboutProcessSection />
      <CTASection
        eyebrow="Ready to Start?"
        title="Let's Build Something Together"
        description="Whether you're launching your first business website, scaling an e-commerce operation, or rebuilding a digital platform that no longer serves your growth Floxia Studio is ready to be your partner."
      />

      <FooterSection />
    </main>
  );
}
