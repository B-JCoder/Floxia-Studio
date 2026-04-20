"use client";

import { motion, useScroll, useSpring, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import { Search, PenTool, Code2, Puzzle, BarChart2, Rocket, ArrowRight } from "lucide-react";

const stages = [
  {
    icon: Search,
    number: "01",
    title: "Discovery",
    desc: "Deep-dive into your business, goals, competitors, and target audience to establish a rock-solid foundation.",
    color: "bg-blue-500/20",
    glow: "shadow-blue-500/20",
  },
  {
    icon: BarChart2,
    number: "02",
    title: "Strategy",
    desc: "Platform selection, information architecture, SEO keyword mapping, and technology stack planning.",
    color: "bg-purple-500/20",
    glow: "shadow-purple-500/20",
  },
  {
    icon: PenTool,
    number: "03",
    title: "Design",
    desc: "Wireframes, UI mockups, and brand-aligned visual design with your feedback built in at every step.",
    color: "bg-pink-500/20",
    glow: "shadow-pink-500/20",
  },
  {
    icon: Code2,
    number: "04",
    title: "Development",
    desc: "Clean, semantic, secure code with continuous staging environment access for your review throughout.",
    color: "bg-cyan-500/20",
    glow: "shadow-cyan-500/20",
  },
  {
    icon: Puzzle,
    number: "05",
    title: "Integration",
    desc: "All third-party tools, APIs, chatbots, and automation systems connected and thoroughly tested.",
    color: "bg-amber-500/20",
    glow: "shadow-amber-500/20",
  },
  {
    icon: BarChart2,
    number: "06",
    title: "SEO & Performance",
    desc: "Technical SEO audit, speed optimization, Core Web Vitals compliance, and schema markup implementation.",
    color: "bg-green-500/20",
    glow: "shadow-green-500/20",
  },
  {
    icon: Rocket,
    number: "07",
    title: "Launch & Support",
    desc: "Monitored deployment, post-launch testing, and ongoing support packages available to keep you growing.",
    color: "bg-rose-500/20",
    glow: "shadow-rose-500/20",
  },
];

export function AboutProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section className="relative py-24 sm:py-32 bg-background overflow-hidden" ref={containerRef}>
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-foreground/[0.02] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-foreground/[0.02] rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 lg:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-foreground/[0.03] border border-foreground/10 text-xs font-mono text-muted-foreground mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            OUR WORKFLOW
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-display leading-[1.1] tracking-tight mb-8"
          >
            A Systematic Path to <br />
            <span className="text-stroke">Digital Excellence</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto"
          >
            We don&apos;t just build websites; we engineer experiences. Our proven 7-stage 
            process ensures precision, performance, and peace of mind.
          </motion.p>
        </div>

        {/* Timeline Section */}
        <div className="relative">
          {/* Vertical Progress Line (Desktop) */}
          <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-foreground/10">
            <motion.div 
              style={{ scaleY }}
              className="w-full h-full bg-foreground/40 origin-top"
            />
          </div>

          <div className="space-y-12 lg:space-y-0">
            {stages.map((stage, i) => (
              <ProcessStep key={i} stage={stage} index={i} total={stages.length} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProcessStep({ stage, index, total }: { stage: any; index: number; total: number }) {
  const isLeft = index % 2 === 0;
  const Icon = stage.icon;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <div 
      ref={ref}
      className={`relative lg:flex lg:items-center lg:min-h-[300px] ${
        isLeft ? "lg:flex-row" : "lg:flex-row-reverse"
      }`}
    >
      {/* Desktop Connector Dot */}
      <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-background border border-foreground/10 items-center justify-center z-20 shadow-xl">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          className="w-8 h-8 rounded-full bg-foreground flex items-center justify-center text-[10px] font-bold text-background"
        >
          {stage.number}
        </motion.div>
      </div>

      {/* Content Card */}
      <div className={`w-full lg:w-[42%] ${isLeft ? "lg:pr-12" : "lg:pl-12"}`}>
        <motion.div
          initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "circOut" }}
          className={`
            group relative p-8 sm:p-10 rounded-[2.5rem] border border-foreground/10 
            bg-foreground/[0.02] backdrop-blur-sm hover:border-foreground/20 
            transition-all duration-500 ${stage.glow} hover:shadow-2xl
          `}
        >
          {/* Card Icon */}
          <div className={`w-14 h-14 rounded-2xl ${stage.color} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500`}>
            <Icon className="w-6 h-6 text-foreground" />
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-muted-foreground tracking-widest uppercase">
                Stage {stage.number}
              </span>
              <div className="h-px flex-1 bg-foreground/10" />
            </div>
            
            <h3 className="text-2xl sm:text-3xl font-display text-foreground group-hover:text-amber-500 transition-colors duration-300">
              {stage.title}
            </h3>
            
            <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
              {stage.desc}
            </p>
          </div>

          {/* Decorative index for mobile/tablet */}
          <div className="lg:hidden absolute top-8 right-8 text-4xl font-display text-foreground/5 font-bold">
            {stage.number}
          </div>
        </motion.div>
      </div>

      {/* Spacer for the other side on desktop */}
      <div className="hidden lg:block w-[42%]" />
    </div>
  );
}
