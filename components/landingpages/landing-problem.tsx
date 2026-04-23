import { NicheData } from "@/lib/niches";
import { AlertCircle, X } from "lucide-react";

export function LandingProblem({ niche }: { niche: NicheData }) {
  return (
    <section id="problem" className="relative py-24 lg:py-32 bg-background overflow-hidden">
      {/* Background decoration matching main site */}
      <div className="absolute left-0 top-0 w-full h-full opacity-[0.03] pointer-events-none select-none overflow-hidden">
         <div className="text-[20rem] font-display absolute -left-20 -top-20 leading-none">?</div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-[1400px] mx-auto lg:px-12">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
            <div className="lg:w-1/2">
               <span className="inline-block text-[10px] font-mono uppercase tracking-[0.4em] text-primary mb-6">The Challenge</span>
               <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-10 leading-[1.1]">{niche.problem.headline}</h2>
               <div className="text-muted-foreground text-base lg:text-xl whitespace-pre-wrap leading-relaxed space-y-6">
                 {niche.problem.body}
               </div>
            </div>

            <div className="lg:w-1/2 w-full space-y-4">
              {niche.problem.painPoints.map((point, i) => (
                <div key={i} className="flex items-center gap-6 p-6 rounded-2xl bg-foreground/5 border border-foreground/5 group hover:border-primary/20 transition-all duration-500 hover:translate-x-2">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
                    <X className="h-5 w-5" />
                  </div>
                  <span className="text-foreground text-lg font-medium">{point}</span>
                </div>
              ))}
              
              <div className="mt-12 p-10 rounded-[2.5rem] border-sketch bg-muted/20 relative">
                <p className="text-xl lg:text-2xl text-foreground font-display leading-relaxed italic opacity-90">
                  {niche.problem.result}
                </p>
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-background border border-foreground/10 rounded-full flex items-center justify-center italic font-display text-2xl opacity-50">"</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
