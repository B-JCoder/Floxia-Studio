import { NicheData } from "@/lib/niches";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function LandingFaqs({ niche }: { niche: NicheData }) {
  return (
    <section id="faqs" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">Everything you need to know about our services for {niche.slug}.</p>
          </div>
          
          <Accordion type="single" collapsible className="w-full">
            {niche.faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-b border-border/50">
                <AccordionTrigger className="text-left py-6 text-lg hover:no-underline hover:text-primary transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
