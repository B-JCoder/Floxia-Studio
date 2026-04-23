export type NicheData = {
  id: string;
  slug: string;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  hero: {
    eyebrow: string;
    headline: string;
    subheadline: string;
    ctaPrimary: string;
    ctaSecondary: string;
    socialProof: string;
  };
  stats: {
    label: string;
    value: string;
  }[];
  problem: {
    headline: string;
    body: string;
    painPoints: string[];
    result: string;
  };
  different: {
    headline: string;
    subheadline: string;
    cards: { title: string; description: string; icon: string }[];
  };
  pricing: {
    headline: string;
    packageName: string;
    subheadline: string;
    inclusions: string[];
    price: string;
    scarcity: string;
  };
  process: {
    headline: string;
    subheadline: string;
    steps: { title: string; description: string }[];
  };
  fit: {
    headline: string;
    greatFit: string[];
    notFit: string[];
  };
  emotionalBridge: {
    headline: string;
    body: string;
    cta: string;
  };
  faqs: {
    question: string;
    answer: string;
  }[];
  testimonials: {
    text: string;
    author: string;
    role: string;
    location: string;
  }[];
};

export const niches: Record<string, NicheData> = {
  therapists: {
    id: "therapists",
    slug: "therapists",
    seo: {
      title: "Therapist Website Design | Fill Your Practice With Ideal Clients",
      description: "Strategic, conversion-focused website design for private practice therapists across the USA. SEO, copywriting, HIPAA-aware forms & scheduling included. Book a free call.",
      keywords: ["Therapist Website Design", "Private Practice SEO", "HIPAA Compliant Web Design", "Mental Health Website Design"],
    },
    hero: {
      eyebrow: "Floxia Studio for Therapists",
      headline: "Therapist Website Design That Fills Your Practice — Not Just Your Portfolio",
      subheadline: "We build strategic, conversion-focused websites exclusively for private practice therapists across the USA. Stop losing clients to a website that doesn't work. Start getting consistent inquiries from people who are ready to book.",
      ctaPrimary: "Book Your Free Strategy Call",
      ctaSecondary: "See How It Works",
      socialProof: "No pressure. No pitch. Just clarity on what your practice needs.",
    },
    stats: [
      { label: "Private Practices Served", value: "50+" },
      { label: "Across U.S. States", value: "18" },
      { label: "Avg Inquiry Growth", value: "3x" },
      { label: "Client Rating", value: "4.9/5" },
    ],
    problem: {
      headline: "Your Website Is Costing You Clients Every Single Day",
      body: "You spent years becoming an excellent therapist. But your website? It's sending the wrong message — or worse, no message at all.\n\nRight now, potential clients are Googling 'anxiety therapist near me.' They're landing on therapist websites, scanning for 8 seconds, and deciding. And if your website doesn't immediately communicate who you help, how you help them, and why they should trust you — they leave. And book with someone else.",
      painPoints: [
        "Website looks outdated or feels like a template everyone has",
        "Doesn't clearly say who you specialize in helping",
        "Can't be found on Google — invisible to new clients",
        "No obvious way to book a consultation",
        "You're still dependent on Psychology Today, directories, and referrals",
        "When referrals slow down — so do your inquiries"
      ],
      result: "The result? Your practice stays stuck at the same capacity. You're an excellent clinician doing average-at-best marketing — because that's not what they taught you in grad school.\n\nYour website should be your most reliable referral source. We're going to make it that.",
    },
    different: {
      headline: "We Don't Build Pretty Websites. We Build Client-Generating Systems for Therapists.",
      subheadline: "Most web designers ask 'What colors do you like?' We ask 'Who is your ideal client, and what's keeping them from booking right now?'",
      cards: [
        { 
          title: "Strategy Before Design", 
          description: "Every website we build starts with a deep-dive strategy session. We identify your ideal client, their fears, their language, and what makes you different from every other therapist in your city.",
          icon: "Compass"
        },
        { 
          title: "Copy Written for Therapy Clients", 
          description: "We write every word on your site specifically for the person who's finally, nervously, ready to reach out. Real, warm, human language that makes your ideal client think: 'This therapist understands me.'",
          icon: "PenTool"
        },
        { 
          title: "Built to Rank on Google", 
          description: "Local SEO isn't an add-on. It's built into every page, every heading, every meta tag from day one. We make sure that when someone in your city searches for your specialty — you show up.",
          icon: "MapPin"
        },
        { 
          title: "HIPAA-Aware From the Ground Up", 
          description: "We understand ethical marketing in mental health. Secure contact forms, no invasive tracking, privacy-first design. Your professional ethics are never compromised.",
          icon: "ShieldCheck"
        }
      ]
    },
    pricing: {
      headline: "One Comprehensive Package. Zero Guesswork.",
      packageName: "The Private Practice Growth Website",
      subheadline: "Everything your practice needs to attract, trust-build, and convert the right clients — without juggling five different vendors.",
      inclusions: [
        "Strategy & Positioning Workshop",
        "Custom 5–8 Page Website",
        "Conversion-Focused Copywriting",
        "Local SEO Foundation",
        "Google Business Profile Optimization",
        "Online Scheduling Integration",
        "HIPAA-Friendly Contact Forms",
        "Mobile-First, Fast-Loading Design",
        "30-Day Post-Launch Support"
      ],
      price: "$2,000",
      scarcity: "⚡ We limit new projects to 4 per month to protect quality. Spots fill quickly.",
    },
    process: {
      headline: "From 'I Need a Website' to Fully Launched in 4–6 Weeks",
      subheadline: "No tech overwhelm. No confusing dashboards. No disappearing acts after the invoice is paid.",
      steps: [
        { title: "Free Strategy Call", description: "We spend 45 minutes understanding your practice, your goals, your ideal client, and your frustrations. No pitch. Pure clarity." },
        { title: "Messaging & Architecture", description: "We build your sitemap and write every word of your copy. You review, refine, and approve before design starts." },
        { title: "Design & Development", description: "We build your custom website — mobile-first, fast, calming, and unmistakably yours. All technical aspects handled." },
        { title: "Launch & SEO Activation", description: "We go live, submit to Google, activate local SEO, and walk you through your new site before handing over keys." }
      ]
    },
    fit: {
      headline: "We're Selective About Who We Work With — And That's By Design",
      greatFit: [
        "Private-pay therapists building a sustainable practice",
        "Niche specialists: trauma, couples, anxiety, EMDR, grief, perinatal, LGBTQ+",
        "Therapists launching a new practice needing authority fast",
        "Group practices ready to scale professionally",
        "Clinicians who value quality and understand investment"
      ],
      notFit: [
        "Looking for a $300 template with minor edits",
        "Want to DIY your website and just need a little advice",
        "Not ready to invest in the growth of your practice",
        "Need a website built in 48 hours"
      ]
    },
    emotionalBridge: {
      headline: "Your Website Is Often a Client's First Step Toward Healing",
      body: "Before someone books a session, they visit your website. In that moment, they're scared. They've been putting off therapy for months. Your website needs to answer their unspoken questions: 'Does this therapist understand me? Do I feel safe here? Can they actually help?'",
      cta: "Book Your Free Practice Growth Call"
    },
    faqs: [
      { question: "How long does it take to build a therapist website?", answer: "Typically 4-6 weeks from strategy call to launch, depending on feedback turnaround time." },
      { question: "Do I need to write my own copy?", answer: "No. Conversion-focused copywriting is fully included. We interview you and write everything tailored to your ideal clients." },
      { question: "Will my therapist website rank on Google?", answer: "We build a full local SEO foundation from day one. Meaningful rankings typically appear within 3-6 months." },
      { question: "Is the website HIPAA compliant?", answer: "We build HIPAA-aware contact forms and avoid storing sensitive data on your site. We recommend pairing with a HIPAA-compliant email provider." },
      { question: "What does it cost?", answer: "Our Private Practice Growth Website package starts at $2,000 and includes full strategy, design, copy, and SEO." }
    ],
    testimonials: [
      { author: "Sarah M., LCSW", role: "Anxiety & Trauma Specialist", location: "Austin, TX", text: "Within 6 weeks of launching, I had 11 inquiries in a single month. Three became long-term clients. My website actually works now." },
      { author: "Dr. Rebecca J., LPC", role: "Couples & Relationship Therapist", location: "Denver, CO", text: "Floxia completely transformed it — and more importantly, the copy sounds exactly like me, but clearer. I'm fully booked with private-pay clients." },
      { author: "Natalie K., LMFT", role: "EMDR & Trauma Therapist", location: "Portland, OR", text: "They started with strategy, not colors. My site now shows up on Google for EMDR therapy. I get 2–3 organic inquiries a week." },
      { author: "Marcus P., LCPC", role: "Depression & Grief Counselor", location: "Chicago, IL", text: "I had my first inquiry within 48 hours of going live. For a brand-new practice, that felt like a miracle." },
      { author: "Amanda L., PhD, LPC", role: "Group Practice Owner", location: "Atlanta, GA", text: "Consultations are up 40% compared to last year. Our site finally communicates who we are professionally." }
    ]
  }
};
