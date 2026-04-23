import { NicheData } from "@/lib/niches";

export function LandingTestimonials({ niche }: { niche: NicheData }) {
  return (
    <section id="testimonials" className="py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">What Our Private Practice Clients Say</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">Real results from clinicians who trusted Floxia Studio with their professional presence.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {niche.testimonials.map((t, i) => (
            <div key={i} className="p-10 rounded-[2.5rem] bg-muted/30 border border-border/50 relative flex flex-col">
              <div className="flex gap-1 mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-5 h-5 text-yellow-500 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="italic text-foreground text-lg mb-8 flex-grow leading-relaxed">
                "{t.text}"
              </p>
              <div className="flex items-center gap-4 border-t border-border/40 pt-6">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
                  {t.author.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="font-bold">{t.author}</div>
                  <div className="text-sm text-muted-foreground">{t.role}</div>
                  <div className="text-xs text-muted-foreground/70 uppercase tracking-tighter mt-0.5">{t.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
