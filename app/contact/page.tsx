import { Navigation } from "@/components/landing/navigation";
import { HeroSection } from "@/components/landing/hero-section";
import { ContactFormSection } from "@/components/landing/contact-form-section";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { PricingSection } from "@/components/landing/pricing-section";
import { FooterSection } from "@/components/landing/footer-section";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Floxia Studio | Get a Free Web Design Quote USA",
  description:
    "Ready to build your website? Contact Floxia Studio for a free consultation. Custom web design, Shopify, WordPress, AI integrations & more. Quick response guaranteed.",
  keywords: [
    "hire web design agency USA",
    "get a website quote",
    "web development consultation",
    "contact web agency",
  ],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://floxiastudio.com/contact",
  },
};

export default function ContactPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden noise-overlay">
      <Navigation />
      <HeroSection
        eyebrow="Contact Us"
        headingLine1="Let's Build Something Great"
        headingLine2="Start the Conversation"
        description={
          <>
            <p>
              You have a vision for your digital presence. We have the expertise
              to build it. Whether you need a custom-coded web application, a
              high-converting Shopify store, a powerful WordPress website, an AI
              chatbot integration, or a comprehensive digital platform, Floxia
              Studio is ready to deliver it.
            </p>
            <p>
              Reach out today for a free, no-obligation consultation with our
              team. We respond to every inquiry within 24 hours.
            </p>
          </>
        }
        primaryCta={{
          label: "Book a Free Consultation",
          href: "https://calendly.com/floxiastudio/30min",
          external: true,
        }}
        secondaryCta={{ label: "View Our Work", href: "/#work" }}
      />

      <ContactFormSection />

      <TestimonialsSection />
      <PricingSection />
      <FooterSection />
    </main>
  );
}
