"use client";

import { useEffect, useRef, useState } from "react";

const features = [
  {
    number: "01",
    title: "Custom Web Development",
    description:
      "From Next.js and React to Angular and WordPress — we build fully custom websites tailored to your brand, your goals, and your users. No templates, no shortcuts.",
    visual: "deploy",
  },
  {
    number: "02",
    title: "AI & Smart Integrations",
    description:
      "We embed AI chatbots, WhatsApp automation, booking systems, and CRM dashboards directly into your website — turning it into a 24/7 business machine.",
    visual: "ai",
  },
  {
    number: "03",
    title: "E-Commerce That Sells",
    description:
      "Shopify, WooCommerce, or fully custom storefronts — we design and build online stores engineered to convert browsers into buyers at every step.",
    visual: "ecommerce",
  },
  {
    number: "04",
    title: "SEO-Optimized & Secure",
    description:
      "Every site we launch is hardened with SSL, CDN protection, and Core Web Vitals optimization. Built to rank, built to load fast, built to stay secure.",
    visual: "security",
  },
];

function DeployVisual() {
  return (
    <svg viewBox="0 0 200 160" className="w-full h-full">
      <defs>
        <clipPath id="deployClip">
          <rect x="30" y="20" width="140" height="120" rx="4" />
        </clipPath>
      </defs>

      {/* Browser frame */}
      <rect
        x="30"
        y="20"
        width="140"
        height="120"
        rx="4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      {/* Top bar */}
      <rect
        x="30"
        y="20"
        width="140"
        height="18"
        rx="4"
        fill="currentColor"
        opacity="0.08"
      />
      <circle cx="44" cy="29" r="3" fill="currentColor" opacity="0.4" />
      <circle cx="54" cy="29" r="3" fill="currentColor" opacity="0.4" />
      <circle cx="64" cy="29" r="3" fill="currentColor" opacity="0.4" />

      {/* Code lines animating */}
      <g clipPath="url(#deployClip)">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <rect
            key={i}
            x="40"
            y={48 + i * 14}
            width="120"
            height="8"
            rx="2"
            fill="currentColor"
            opacity="0.12"
          >
            <animate
              attributeName="opacity"
              values="0.12;0.7;0.12"
              dur="2s"
              begin={`${i * 0.18}s`}
              repeatCount="indefinite"
            />
            <animate
              attributeName="width"
              values="20;120;20"
              dur="2s"
              begin={`${i * 0.18}s`}
              repeatCount="indefinite"
            />
          </rect>
        ))}
      </g>

      {/* Launch pulse */}
      <circle cx="100" cy="152" r="3" fill="currentColor" opacity="0.3">
        <animate
          attributeName="opacity"
          values="0.3;1;0.3"
          dur="1s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
}

function AIVisual() {
  return (
    <svg viewBox="0 0 200 160" className="w-full h-full">
      {/* Central node */}
      <circle cx="100" cy="80" r="12" fill="currentColor">
        <animate
          attributeName="r"
          values="12;14;12"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>

      {/* Orbiting nodes */}
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const angle = i * 60 * (Math.PI / 180);
        const radius = 50;
        return (
          <g key={i}>
            <line
              x1="100"
              y1="80"
              x2={100 + Math.cos(angle) * radius}
              y2={80 + Math.sin(angle) * radius}
              stroke="currentColor"
              strokeWidth="1"
              opacity="0.3"
            >
              <animate
                attributeName="opacity"
                values="0.3;0.8;0.3"
                dur="2s"
                begin={`${i * 0.3}s`}
                repeatCount="indefinite"
              />
            </line>
            <circle
              cx={100 + Math.cos(angle) * radius}
              cy={80 + Math.sin(angle) * radius}
              r="6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <animate
                attributeName="r"
                values="6;8;6"
                dur="2s"
                begin={`${i * 0.3}s`}
                repeatCount="indefinite"
              />
            </circle>
          </g>
        );
      })}

      {/* Pulse ring */}
      <circle
        cx="100"
        cy="80"
        r="30"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0"
      >
        <animate
          attributeName="r"
          values="20;60"
          dur="2s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="0.5;0"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>

      {/* WhatsApp / chat bubble hint */}
      <rect
        x="68"
        y="110"
        width="64"
        height="20"
        rx="10"
        fill="currentColor"
        opacity="0.1"
      >
        <animate
          attributeName="opacity"
          values="0.1;0.25;0.1"
          dur="2.5s"
          repeatCount="indefinite"
        />
      </rect>
      <rect
        x="74"
        y="116"
        width="36"
        height="4"
        rx="2"
        fill="currentColor"
        opacity="0.4"
      />
      <rect
        x="74"
        y="122"
        width="24"
        height="4"
        rx="2"
        fill="currentColor"
        opacity="0.25"
      />
    </svg>
  );
}

function EcommerceVisual() {
  return (
    <svg viewBox="0 0 200 160" className="w-full h-full">
      {/* Shopping bag */}
      <rect
        x="55"
        y="60"
        width="90"
        height="75"
        rx="4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      {/* Bag handle */}
      <path
        d="M 75 60 L 75 48 Q 75 30 100 30 Q 125 30 125 48 L 125 60"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Items in bag */}
      {[0, 1, 2].map((i) => (
        <rect
          key={i}
          x="68"
          y={75 + i * 16}
          width="64"
          height="10"
          rx="2"
          fill="currentColor"
          opacity="0.15"
        >
          <animate
            attributeName="opacity"
            values="0.15;0.5;0.15"
            dur="2s"
            begin={`${i * 0.4}s`}
            repeatCount="indefinite"
          />
        </rect>
      ))}

      {/* Checkmark / conversion signal */}
      <circle cx="158" cy="58" r="14" fill="currentColor" opacity="0.12">
        <animate
          attributeName="opacity"
          values="0.12;0.25;0.12"
          dur="1.5s"
          repeatCount="indefinite"
        />
      </circle>
      <polyline
        points="150,58 156,64 166,52"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <animate
          attributeName="opacity"
          values="0.4;1;0.4"
          dur="1.5s"
          repeatCount="indefinite"
        />
      </polyline>

      {/* Price tag */}
      <rect
        x="65"
        y="20"
        width="48"
        height="22"
        rx="4"
        fill="currentColor"
        opacity="0.08"
      />
      <text
        x="89"
        y="35"
        textAnchor="middle"
        fontSize="11"
        fontFamily="monospace"
        fill="currentColor"
        opacity="0.6"
      >
        $99.00
      </text>
    </svg>
  );
}

function SecurityVisual() {
  return (
    <svg viewBox="0 0 200 160" className="w-full h-full">
      {/* Shield outer */}
      <path
        d="M 100 20 L 150 40 L 150 90 Q 150 130 100 145 Q 50 130 50 90 L 50 40 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />

      {/* Shield fill pulse */}
      <path
        d="M 100 35 L 135 50 L 135 85 Q 135 115 100 128 Q 65 115 65 85 L 65 50 Z"
        fill="currentColor"
        opacity="0.1"
      >
        <animate
          attributeName="opacity"
          values="0.1;0.2;0.1"
          dur="2s"
          repeatCount="indefinite"
        />
      </path>

      {/* Lock body */}
      <rect x="85" y="70" width="30" height="25" rx="3" fill="currentColor" />
      {/* Lock shackle */}
      <path
        d="M 90 70 L 90 60 Q 90 50 100 50 Q 110 50 110 60 L 110 70"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Keyhole */}
      <circle cx="100" cy="80" r="4" fill="white" />
      <rect x="98" y="82" width="4" height="8" fill="white" />

      {/* Speed / PageSpeed indicator */}
      <text
        x="100"
        y="155"
        textAnchor="middle"
        fontSize="10"
        fontFamily="monospace"
        fill="currentColor"
        opacity="0.45"
      >
        99+ PageSpeed
      </text>

      {/* Scan line */}
      <line
        x1="60"
        y1="60"
        x2="140"
        y2="60"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0"
      >
        <animate
          attributeName="y1"
          values="40;120;40"
          dur="3s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="y2"
          values="40;120;40"
          dur="3s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="0;0.5;0"
          dur="3s"
          repeatCount="indefinite"
        />
      </line>
    </svg>
  );
}

function AnimatedVisual({ type }: { type: string }) {
  switch (type) {
    case "deploy":
      return <DeployVisual />;
    case "ai":
      return <AIVisual />;
    case "ecommerce":
      return <EcommerceVisual />;
    case "security":
      return <SecurityVisual />;
    default:
      return <DeployVisual />;
  }
}

function FeatureCard({
  feature,
  index,
}: {
  feature: (typeof features)[0];
  index: number;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 },
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`group relative transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 py-8 lg:py-14 border-b border-foreground/10">
        {/* Number */}
        <div className="shrink-0">
          <span className="font-mono text-sm text-muted-foreground">
            {feature.number}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-3xl lg:text-4xl font-display mb-4 group-hover:translate-x-2 transition-transform duration-500">
              {feature.title}
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {feature.description}
            </p>
          </div>

          {/* Visual */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-48 h-40 text-foreground">
              <AnimatedVisual type={feature.visual} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function FeaturesSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="features" ref={sectionRef} className="relative py-16 lg:py-24">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-10 lg:mb-16">
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
            <span className="w-8 h-px bg-foreground/30" />
            What we build
          </span>
          <h2
            className={`text-4xl lg:text-6xl font-display tracking-tight transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            Built for growth.
            <br />
            <span className="text-muted-foreground">
              Engineered to perform.
            </span>
          </h2>
        </div>

        {/* Features list */}
        <div>
          {features.map((feature, index) => (
            <FeatureCard key={feature.number} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
