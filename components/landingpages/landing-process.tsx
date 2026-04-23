import { NicheData } from "@/lib/niches";

export function LandingProcess({ niche }: { niche: NicheData }) {
  return (
    <section id="process" className="py-24 lg:py-32 bg-muted/20 relative overflow-hidden">
      {/* Background text decoration */}
      <div className="absolute right-0 bottom-0 text-[15rem] lg:text-[25rem] font-display font-bold opacity-[0.02] pointer-events-none select-none translate-y-1/2 translate-x-1/4 uppercase">
        Process
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-[1400px] mx-auto lg:px-12">
          <div className="max-w-3xl mb-20">
            <span className="inline-block text-[10px] font-mono uppercase tracking-[0.4em] text-primary mb-6">How We Ship</span>
            <h2 className="text-4xl md:text-6xl font-display font-bold leading-[1.1] mb-8">{niche.process.headline}</h2>
            <p className="text-muted-foreground text-lg lg:text-xl leading-relaxed opacity-80">
               {niche.process.subheadline}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-foreground/10 border border-foreground/10 rounded-[3rem] overflow-hidden">
            {niche.process.steps.map((step, i) => (
              <div key={i} className="p-10 lg:p-12 bg-background group hover:bg-muted/50 transition-all duration-500">
                <div className="text-6xl font-display font-bold text-foreground/5 group-hover:text-primary/20 transition-colors duration-500 mb-8">
                  0{i + 1}
                </div>
                <h3 className="text-xl lg:text-2xl font-display font-bold mb-6 group-hover:translate-x-2 transition-transform duration-500">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-base opacity-80">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
