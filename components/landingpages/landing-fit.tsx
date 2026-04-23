import { NicheData } from "@/lib/niches";
import { CheckCircle2, XCircle } from "lucide-react";

export function LandingFit({ niche }: { niche: NicheData }) {
  return (
    <section className="py-24 lg:py-32 relative bg-background overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-[1400px] mx-auto lg:px-12">
          <div className="max-w-3xl mb-20">
            <span className="inline-block text-[10px] font-mono uppercase tracking-[0.4em] text-primary mb-6">Alignment Check</span>
            <h2 className="text-4xl md:text-6xl font-display font-bold leading-[1.1] mb-8">{niche.fit.headline}</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
            {/* Great Fit */}
            <div className="p-12 lg:p-16 rounded-[4rem] bg-foreground text-background group relative overflow-hidden shadow-2xl transition-transform duration-700 hover:-translate-y-2">
               <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                  <CheckCircle2 className="h-24 w-24" />
               </div>
               <h3 className="text-3xl font-display font-bold mb-10 flex items-center gap-4 text-primary">
                Great Fit
               </h3>
               <ul className="space-y-6">
                 {niche.fit.greatFit.map((item, i) => (
                   <li key={i} className="flex items-start gap-4 group/item">
                     <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0 transition-all duration-300 group-hover/item:w-4" />
                     <span className="text-lg font-medium opacity-80 group-hover/item:opacity-100 transition-opacity">{item}</span>
                   </li>
                 ))}
               </ul>
            </div>
            
            {/* Not a Fit */}
            <div className="p-12 lg:p-16 rounded-[4rem] bg-muted/20 border border-foreground/5 group relative overflow-hidden transition-transform duration-700 hover:-translate-y-2">
               <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                  <XCircle className="h-24 w-24" />
               </div>
               <h3 className="text-3xl font-display font-bold mb-10 flex items-center gap-4 opacity-40">
                Not a Fit
               </h3>
               <ul className="space-y-6">
                 {niche.fit.notFit.map((item, i) => (
                   <li key={i} className="flex items-start gap-4 group/item">
                     <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-foreground/20 flex-shrink-0 transition-all duration-300 group-hover/item:w-4" />
                     <span className="text-lg font-medium opacity-50 group-hover/item:opacity-80 transition-opacity">{item}</span>
                   </li>
                 ))}
               </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
