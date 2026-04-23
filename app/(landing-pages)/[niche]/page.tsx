import { Metadata } from "next";
import { notFound } from "next/navigation";
import { niches } from "@/lib/niches";
import { LandingNavigation } from "@/components/landingpages/landing-navigation";
import { LandingHero } from "@/components/landingpages/landing-hero";
import { LandingStats } from "@/components/landingpages/landing-stats";
import { LandingProblem } from "@/components/landingpages/landing-problem";
import { LandingDifferent } from "@/components/landingpages/landing-different";
import { LandingPricing } from "@/components/landingpages/landing-pricing";
import { LandingProcess } from "@/components/landingpages/landing-process";
import { LandingFit } from "@/components/landingpages/landing-fit";
import { LandingEmotionalBridge } from "@/components/landingpages/landing-emotional-bridge";
import { LandingTestimonials } from "@/components/landingpages/landing-testimonials";
import { LandingFaqs } from "@/components/landingpages/landing-faqs";
import { LandingLeadForm } from "@/components/landingpages/landing-lead-form";
import { LandingFooter } from "@/components/landingpages/landing-footer";

interface PageProps {
  params: Promise<{ niche: string }>;
}

// SSG: Pre-generate all niche pages at build time
export async function generateStaticParams() {
  return Object.keys(niches).map((niche) => ({
    niche: niche,
  }));
}

// SEO: Generate dynamic metadata for each niche
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { niche } = await params;
  const nicheData = niches[niche];
  
  if (!nicheData) return {};

  return {
    title: nicheData.seo.title,
    description: nicheData.seo.description,
    keywords: nicheData.seo.keywords,
    openGraph: {
      title: nicheData.seo.title,
      description: nicheData.seo.description,
      type: "website",
    },
  };
}

export default async function NicheLandingPage({ params }: PageProps) {
  const { niche } = await params;
  const nicheData = niches[niche];

  if (!nicheData) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": "https://floxiastudio.com/#business",
        "name": "Floxia Studio",
        "description": nicheData.seo.description,
        "url": "https://floxiastudio.com",
        "email": "sales@floxiastudio.com",
        "priceRange": "$$",
        "areaServed": {
          "@type": "Country",
          "name": "United States"
        },
        "knowsAbout": nicheData.seo.keywords,
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": nicheData.pricing.packageName,
          "itemListElement": [{
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": nicheData.pricing.packageName,
              "description": nicheData.pricing.subheadline,
              "price": "2000",
              "priceCurrency": "USD",
              "eligibleRegion": "US"
            }
          }]
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": nicheData.faqs.map(faq => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <main className="relative bg-background">
        <LandingNavigation niche={nicheData} />
        
        <LandingHero niche={nicheData} />
        
        <LandingStats niche={nicheData} />
        
        <div id="problem">
          <LandingProblem niche={nicheData} />
        </div>
        
        <div id="solution">
          <LandingDifferent niche={nicheData} />
        </div>
        
        <div id="pricing">
          <LandingPricing niche={nicheData} />
        </div>
        
        <div id="process">
          <LandingProcess niche={nicheData} />
        </div>

        <LandingFit niche={nicheData} />

        <LandingEmotionalBridge niche={nicheData} />
        
        <div id="testimonials">
          <LandingTestimonials niche={nicheData} />
        </div>
        
        <div id="faqs">
          <LandingFaqs niche={nicheData} />
        </div>
        
        <LandingLeadForm />
        
        <LandingFooter niche={nicheData} />
      </main>
    </>
  );
}
