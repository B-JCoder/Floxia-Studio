import { NicheData } from "@/lib/niches";
import { Check, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function LandingPricing({ niche }: { niche: NicheData }) {
  return (
    <section id="pricing" className="py-24 lg:py-32 relative bg-background overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-[1400px] mx-auto lg:px-12">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            {/* Left side: Context */}
            <div className="lg:w-1/2">
              <span className="inline-block text-[10px] font-mono uppercase tracking-[0.4em] text-primary mb-6">Investment</span>
              <h2 className="text-4xl md:text-6xl font-display font-bold leading-[1.1] mb-8">{niche.pricing.headline}</h2>
              <p className="text-muted-foreground text-lg lg:text-xl mb-10 leading-relaxed max-w-lg">
                {niche.pricing.subheadline}
              </p>
              
              <div className="flex items-start gap-4 p-6 rounded-2xl bg-primary/5 border border-primary/10 max-w-md">
                <Info className="h-5 w-5 text-primary mt-0.5" />
                <p className="text-sm font-medium leading-relaxed italic">
                   {niche.pricing.scarcity}
                </p>
              </div>
            </div>

            {/* Right side: Pricing Card */}
            <div className="lg:w-1/2 w-full">
              <div className="p-8 md:p-16 rounded-[4rem] bg-foreground text-background shadow-[0_48px_80px_-16px_rgba(0,0,0,0.4)] relative group transition-transform duration-700 hover:scale-[1.02]">
                <div className="absolute top-0 right-16 -translate-y-1/2 bg-primary text-primary-foreground px-8 py-2 rounded-full text-[10px] font-mono uppercase tracking-[0.3em] shadow-2xl">
                  Signature Solution
                </div>
                
                <div className="mb-12">
                  <h3 className="text-3xl lg:text-4xl font-display font-bold mb-6">{niche.pricing.packageName}</h3>
                  <div className="flex items-baseline gap-3">
                    <span className="text-5xl lg:text-7xl font-display font-bold tracking-tighter">{niche.pricing.price}</span>
                    <span className="text-background/50 text-base font-mono uppercase tracking-widest">Fixed Fee</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-5 mb-14">
                  {niche.pricing.inclusions.map((item, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-background/10 flex items-center justify-center">
                        <Check className="h-3 w-3 text-primary" />
                      </div>
                      <span className="text-sm font-medium opacity-80">{item}</span>
                    </div>
                  ))}
                </div>
                
                <Link href="#cta">
                  <Button size="lg" className="w-full py-8 text-xl rounded-full font-bold bg-background text-foreground hover:bg-background/90 transition-all duration-500 shadow-2xl group">
                    Apply for Selection
                    <span className="ml-2 w-0 h-0.5 bg-foreground group-hover:w-6 transition-all duration-500" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
