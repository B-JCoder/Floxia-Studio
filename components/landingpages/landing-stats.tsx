import { NicheData } from "@/lib/niches";

export function LandingStats({ niche }: { niche: NicheData }) {
  return (
    <div className="relative border-y border-foreground/10 bg-background/50 overflow-hidden">
       {/* Scrolling Marquee effect could go here, but for now matching main site metrics */}
      <div className="container mx-auto px-4 py-12 lg:py-16 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 lg:gap-8">
          {niche.stats.map((stat, i) => (
            <div key={i} className="text-center group">
              <div className="text-4xl lg:text-6xl font-display font-bold text-foreground mb-3 transition-transform duration-500 group-hover:scale-110">
                {stat.value}
              </div>
              <div className="text-[10px] lg:text-xs font-mono text-muted-foreground uppercase tracking-[0.3em] font-medium opacity-60">
                {stat.label}
              </div>
              <div className="w-8 h-[1px] bg-primary/30 mx-auto mt-4 transition-all duration-500 group-hover:w-16" />
            </div>
          ))}
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--foreground-rgb),0.03)_0%,transparent_70%)] pointer-events-none" />
    </div>
  );
}
