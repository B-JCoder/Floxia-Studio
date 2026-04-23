import { NicheData } from "@/lib/niches";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function LandingEmotionalBridge({ niche }: { niche: NicheData }) {
  return (
    <section className="py-24 lg:py-40 bg-foreground text-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-full h-full opacity-[0.05] pointer-events-none select-none overflow-hidden">
         <div className="text-[30rem] font-display font-bold absolute -right-20 -bottom-20 leading-none">Bridge</div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-[1400px] mx-auto lg:px-12 text-center">
          <div className="max-w-4xl mx-auto">
             <span className="inline-block text-[10px] font-mono uppercase tracking-[0.4em] text-primary mb-10">Strategic Empathy</span>
             <h2 className="text-4xl md:text-6xl lg:text-8xl font-display font-bold mb-10 leading-[1.1]">{niche.emotionalBridge.headline}</h2>
             <p className="text-lg lg:text-2xl opacity-70 mb-16 leading-relaxed font-light">
               {niche.emotionalBridge.body}
             </p>
             <Link href="#cta">
               <Button size="lg" className="rounded-full px-12 py-10 text-xl font-bold bg-background text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-700 shadow-2xl group">
                 {niche.emotionalBridge.cta}
                 <ArrowRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-2" />
               </Button>
             </Link>
          </div>
        </div>
      </div>
      
      {/* Floating Glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -mr-48 -mt-48 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -ml-48 -mb-48 animate-pulse" />
    </section>
  );
}
