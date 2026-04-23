"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Shield, Send, CheckCircle, ArrowRight } from "lucide-react";

export function LandingLeadForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center py-24 lg:py-32 px-6 rounded-[4rem] bg-foreground text-background border border-foreground/10 animate-in fade-in zoom-in duration-700">
        <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-10">
          <CheckCircle className="h-12 w-12 text-primary" />
        </div>
        <h3 className="text-4xl lg:text-6xl font-display font-bold mb-6">Application Sent</h3>
        <p className="text-background/60 text-lg lg:text-xl max-w-lg mx-auto leading-relaxed">
          We review every application manually. Expect a personal response from our lead strategist within 24 hours.
          <br /><br />
          <span className="font-bold text-background uppercase tracking-widest text-sm">— Floxia Studio team</span>
        </p>
      </div>
    );
  }

  return (
    <section id="cta" className="py-24 lg:py-32 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-[1400px] mx-auto lg:px-12 flex flex-col lg:flex-row gap-20">
          
          <div className="lg:w-1/3">
             <span className="inline-block text-[10px] font-mono uppercase tracking-[0.4em] text-primary mb-6">Next Step</span>
             <h2 className="text-4xl md:text-6xl font-display font-bold leading-[1.1] mb-10">Start Your Practice Transformation</h2>
             <p className="text-muted-foreground text-lg leading-relaxed mb-12 opacity-80">
                This is not a generic contact form. This is your first step toward a strategic digital presence. We take selection seriously to ensure we deliver maximum ROI for our clients.
             </p>
             <div className="space-y-6">
                <div className="flex items-center gap-4 text-sm font-mono uppercase tracking-widest opacity-60">
                   <div className="w-10 h-px bg-foreground/20" />
                   Review in 1 Day
                </div>
                <div className="flex items-center gap-4 text-sm font-mono uppercase tracking-widest opacity-60">
                   <div className="w-10 h-px bg-foreground/20" />
                   Direct Specialist Access
                </div>
                <div className="flex items-center gap-4 text-sm font-mono uppercase tracking-widest opacity-60">
                   <div className="w-10 h-px bg-foreground/20" />
                   HIPAA-Aware Workflow
                </div>
             </div>
          </div>

          <div className="lg:w-2/3">
            <div className="p-8 md:p-16 rounded-[4rem] bg-muted/30 border border-foreground/5 shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-4">
                    <Label htmlFor="name" className="text-xs font-mono uppercase tracking-widest opacity-60">Full Name *</Label>
                    <Input id="name" placeholder="Name" required className="rounded-none border-0 border-b border-foreground/20 bg-transparent px-0 h-12 focus-visible:ring-0 focus-visible:border-primary transition-colors text-lg" />
                  </div>
                  <div className="space-y-4">
                    <Label htmlFor="email" className="text-xs font-mono uppercase tracking-widest opacity-60">Email Address *</Label>
                    <Input id="email" type="email" placeholder="Email" required className="rounded-none border-0 border-b border-foreground/20 bg-transparent px-0 h-12 focus-visible:ring-0 focus-visible:border-primary transition-colors text-lg" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-4">
                    <Label htmlFor="practice" className="text-xs font-mono uppercase tracking-widest opacity-60">Practice Name</Label>
                    <Input id="practice" placeholder="Practice" className="rounded-none border-0 border-b border-foreground/20 bg-transparent px-0 h-12 focus-visible:ring-0 focus-visible:border-primary transition-colors text-lg" />
                  </div>
                  <div className="space-y-4">
                    <Label className="text-xs font-mono uppercase tracking-widest opacity-60">Specialty *</Label>
                    <Select required>
                      <SelectTrigger className="rounded-none border-0 border-b border-foreground/20 bg-transparent px-0 h-12 focus-visible:ring-0 text-lg">
                        <SelectValue placeholder="Select Specialty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="anxiety">Anxiety</SelectItem>
                        <SelectItem value="trauma">Trauma / EMDR</SelectItem>
                        <SelectItem value="couples">Couples</SelectItem>
                        <SelectItem value="depression">Depression</SelectItem>
                        <SelectItem value="grief">Grief</SelectItem>
                        <SelectItem value="lgbtq">LGBTQ+</SelectItem>
                        <SelectItem value="perinatal">Perinatal</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-6 pt-4">
                  <Label className="text-xs font-mono uppercase tracking-widest opacity-60">Do you currently have a website? *</Label>
                  <RadioGroup defaultValue="no" className="flex flex-col sm:flex-row gap-10">
                    <div className="flex items-center space-x-3 group cursor-pointer">
                      <RadioGroupItem value="yes" id="r1" className="border-foreground/20 text-primary" />
                      <Label htmlFor="r1" className="font-medium cursor-pointer group-hover:text-primary transition-colors">Yes (Redesign)</Label>
                    </div>
                    <div className="flex items-center space-x-3 group cursor-pointer">
                      <RadioGroupItem value="no" id="r2" className="border-foreground/20 text-primary" />
                      <Label htmlFor="r2" className="font-medium cursor-pointer group-hover:text-primary transition-colors">No (New Build)</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-4">
                  <Label className="text-xs font-mono uppercase tracking-widest opacity-60">Main Challenge *</Label>
                  <Select required>
                    <SelectTrigger className="rounded-none border-0 border-b border-foreground/20 bg-transparent px-0 h-12 focus-visible:ring-0 text-lg">
                      <SelectValue placeholder="Select Challenge" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="google">Not showing on Google</SelectItem>
                      <SelectItem value="inquiries">Too few inquiries</SelectItem>
                      <SelectItem value="wrong-clients">Wrong type of clients</SelectItem>
                      <SelectItem value="outdated">Website looks outdated</SelectItem>
                      <SelectItem value="launching">Just launching</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <Label htmlFor="notes" className="text-xs font-mono uppercase tracking-widest opacity-60">Context & Vision</Label>
                  <Textarea id="notes" placeholder="Tell us more about your practice goals..." className="rounded-none border-0 border-b border-foreground/20 bg-transparent px-0 min-h-[100px] focus-visible:ring-0 focus-visible:border-primary transition-colors text-lg resize-none" />
                </div>

                <div className="pt-10">
                  <Button type="submit" size="lg" className="w-full py-10 text-xl rounded-full font-bold bg-foreground text-background hover:bg-foreground/90 transition-all duration-500 shadow-2xl group">
                    Send Application
                    <ArrowRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-2" />
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
