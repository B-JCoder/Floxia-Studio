import { NicheData } from "@/lib/niches";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import Link from "next/link";

export function LandingCta({ niche }: { niche: NicheData }) {
  return (
    <section id="cta" className="py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto rounded-[3rem] bg-primary p-12 md:p-20 text-primary-foreground text-center relative overflow-hidden shadow-2xl">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
              Ready to Scale Your <br className="hidden md:block" /> {niche.slug} Business?
            </h2>
            <p className="text-xl opacity-90 mb-12 max-w-2xl mx-auto">
              Join dozens of successful {niche.slug} who have transformed their digital presence with Floxia Studio.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link href="/onboarding">
                <Button size="lg" variant="secondary" className="px-10 py-7 text-lg rounded-full font-bold shadow-xl hover:scale-105 transition-transform">
                  Book Your Strategy Call
                </Button>
              </Link>
              <Link href="https://wa.me/yourwhatsapp">
                <Button size="lg" variant="outline" className="px-10 py-7 text-lg rounded-full border-primary-foreground/30 hover:bg-primary-foreground/10 transition-colors font-medium flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Chat on WhatsApp
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Abstract Decorations */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-[80px] -ml-32 -mb-32" />
        </div>
      </div>
    </section>
  );
}
