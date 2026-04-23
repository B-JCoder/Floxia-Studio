import { NicheData } from "@/lib/niches";
import { Compass, PenTool, MapPin, ShieldCheck, ArrowUpRight } from "lucide-react";

const icons = {
  Compass,
  PenTool,
  MapPin,
  ShieldCheck,
};

export function LandingDifferent({ niche }: { niche: NicheData }) {
  return (
    <section id="solution" className="py-24 lg:py-32 relative overflow-hidden bg-background">
      {/* Background grid dots or lines */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff10_1px,transparent_1px)] [background-size:40px_40px] opacity-20" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-[1400px] mx-auto lg:px-12">
          <div className="flex flex-col lg:flex-row justify-between items-end gap-8 mb-20">
            <div className="max-w-2xl">
               <span className="inline-block text-[10px] font-mono uppercase tracking-[0.4em] text-primary mb-6">Our Approach</span>
               <h2 className="text-4xl md:text-6xl font-display font-bold leading-[1.1] mb-6">{niche.different.headline}</h2>
            </div>
            <p className="text-muted-foreground text-lg lg:text-xl max-w-sm lg:text-right pb-2 opacity-80">
              {niche.different.subheadline}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-foreground/10 border border-foreground/10 rounded-[3rem] overflow-hidden shadow-2xl">
            {niche.different.cards.map((card, i) => {
              const Icon = icons[card.icon as keyof typeof icons] || Compass;
              return (
                <div key={i} className="p-10 lg:p-16 bg-background group hover:bg-muted/30 transition-all duration-700 relative">
                  <div className="w-16 h-16 rounded-2xl bg-foreground/5 flex items-center justify-center mb-10 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-700 rotate-3 group-hover:rotate-0">
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-display font-bold mb-6 group-hover:translate-x-2 transition-transform duration-500">{card.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-base lg:text-lg opacity-80">
                    {card.description}
                  </p>
                  <div className="absolute top-10 right-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <ArrowUpRight className="h-6 w-6 text-primary" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
