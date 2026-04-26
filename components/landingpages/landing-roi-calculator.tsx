"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Users, 
  User, 
  Rocket, 
  ArrowRight, 
  ArrowLeft, 
  Globe, 
  ShieldAlert, 
  Zap,
  TrendingUp,
  AlertCircle,
  Search,
  Shield,
  MousePointerClick,
  FileText,
  CheckCircle2
} from "lucide-react";
import { NicheData } from "@/lib/niches";
import Link from "next/link";
import { sendRoiReport } from "@/app/actions/send-roi-report";
import { toast } from "sonner";

type PracticeType = "solo" | "group" | "launching";
type SiteStatus = "invisible" | "outdated" | "decent" | "optimized";
type ClientStatus = "yes" | "no" | "soon" | "";
type RevenueRange = "under5k" | "5k_10k" | "10k_plus" | "";

export function LandingRoiCalculator({ niche }: { niche: NicheData }) {
  const [step, setStep] = useState(1);
  const [practiceType, setPracticeType] = useState<PracticeType>("solo");
  const [sessionRate, setSessionRate] = useState(150);
  const [siteStatus, setSiteStatus] = useState<SiteStatus>("outdated");
  const [acceptingClients, setAcceptingClients] = useState<ClientStatus>("");
  const [revenueRange, setRevenueRange] = useState<RevenueRange>("");
  
  const [email, setEmail] = useState("");
  const [reportSent, setReportSent] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Logic values
  const getBaseInquiries = () => {
    if (practiceType === "solo") return 4;
    if (practiceType === "group") return 12;
    return 1; // "launching" starts at 1
  };

  const currentInquiries = getBaseInquiries();
  const conversionRate = 0.2; // 20%
  const retentionRate = 0.7; // 70%
  const avgSessionsPerClient = 12; 
  
  // Adjusted LTV = Rate * Sessions * Retention
  const adjustedLifetimeValue = sessionRate * avgSessionsPerClient * retentionRate;

  // Multiplier based on current site status
  const siteMultiplier = {
    invisible: 2.5,
    outdated: 2.0,
    decent: 1.5,
    optimized: 1.2
  };

  const newInquiries = currentInquiries * siteMultiplier[siteStatus];
  
  const currentClients = currentInquiries * conversionRate;
  const newClients = newInquiries * conversionRate;
  
  const extraClientsPerMonth = newClients - currentClients;
  const annualLostClients = extraClientsPerMonth * 12;
  
  // Total lost revenue over a year
  const annualLostRevenue = annualLostClients * adjustedLifetimeValue;

  const handleNext = () => {
    if (step < 5) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleGetReport = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (email) {
      setIsAnimating(true);
      try {
        const result = await sendRoiReport({ 
          email, 
          practiceType, 
          sessionRate, 
          siteStatus,
          acceptingClients,
          revenueRange,
          annualLostRevenue 
        });
        
        if (result.success) {
          toast.success("Report requested successfully!");
        } else {
          toast.error("Failed to send report request.");
        }
      } catch (error) {
        console.error("Failed to save email lead", error);
        toast.error("An error occurred. Please try again.");
      }
      setTimeout(() => {
        setReportSent(true);
        setIsAnimating(false);
      }, 800);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.4 } }
  };

  return (
    <section className="py-24 lg:py-32 bg-background relative overflow-hidden noise-overlay">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* HOOK SECTION */}
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-xs font-mono uppercase tracking-[0.2em] text-primary mb-6 font-bold">
              Free Practice Diagnostic
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight text-foreground mb-6">
              How Many Clients Is Your Website Quietly Losing Every Month?
            </h2>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto leading-relaxed">
              Most practices lose 30–70% of potential clients due to poor website performance. This 60-second diagnostic shows your estimated loss based on industry averages.
            </p>
          </div>

          <div className="bg-card text-card-foreground rounded-[3rem] shadow-2xl border border-border overflow-hidden min-h-[600px] flex flex-col relative">
            {/* Disclaimer */}
            <div className="absolute top-0 left-0 w-full bg-foreground/5 py-2 text-center text-[10px] uppercase font-mono tracking-widest text-foreground/40 z-10">
              Diagnostic Estimates • Based on 2024 Industry Data
            </div>

            {/* Progress Bar */}
            {step < 5 && (
              <div className="h-1.5 w-full bg-muted mt-8">
                <motion.div 
                  className="h-full bg-primary"
                  initial={{ width: "20%" }}
                  animate={{ width: `${(step / 5) * 100}%` }}
                />
              </div>
            )}

            <div className="p-8 md:p-12 flex-1 flex flex-col justify-center mt-4">
              <AnimatePresence mode="wait">
                {step < 5 ? (
                  <motion.div
                    key={`step-${step}`}
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="space-y-8"
                  >
                    {step === 1 && (
                      <div className="space-y-8 text-center max-w-2xl mx-auto">
                        <div>
                          <h3 className="text-2xl md:text-3xl font-display font-bold mb-4">What is your practice type?</h3>
                          <p className="text-foreground/50">This helps us estimate your current inquiry baseline.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {[
                            { id: "solo", label: "Solo Practice", sub: "Established clinician", icon: User },
                            { id: "group", label: "Group Practice", sub: "Multi-therapist team", icon: Users },
                            { id: "launching", label: "Launching", sub: "New or soon to launch", icon: Rocket },
                          ].map((item) => (
                            <button
                              key={item.id}
                              onClick={() => setPracticeType(item.id as PracticeType)}
                              className={`p-6 rounded-3xl border-2 transition-all duration-300 text-left group ${
                                practiceType === item.id 
                                  ? "border-primary bg-primary/5" 
                                  : "border-transparent bg-muted hover:bg-muted/80"
                              }`}
                            >
                              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-colors ${
                                practiceType === item.id ? "bg-primary text-primary-foreground" : "bg-background text-primary"
                              }`}>
                                <item.icon className="w-6 h-6" />
                              </div>
                              <div className="font-bold text-lg mb-1">{item.label}</div>
                              <div className="text-sm opacity-60">{item.sub}</div>
                            </button>
                          ))}
                        </div>
                        {/* Micro Insight */}
                        <div className="mt-8 p-4 rounded-2xl bg-primary/5 border border-primary/10 flex items-start gap-4 text-left">
                          <AlertCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-foreground/70">
                            <strong>Diagnostic Insight:</strong> Most solo practices naturally get 3–6 organic inquiries/month. High-performing sites consistently get 8–15.
                          </p>
                        </div>
                      </div>
                    )}

                    {step === 2 && (
                      <div className="space-y-10 text-center max-w-xl mx-auto">
                        <div>
                          <h3 className="text-2xl md:text-3xl font-display font-bold mb-4">Your Average Session Rate</h3>
                          <p className="text-foreground/50">Enter your average private pay rate per session.</p>
                        </div>
                        
                        <div className="space-y-8">
                          <div className="relative pt-1 flex flex-col items-center gap-6">
                            <div className="flex items-center gap-4">
                              <span className="text-4xl font-display font-bold text-primary">$</span>
                              <Input 
                                type="number" 
                                value={sessionRate}
                                onChange={(e) => setSessionRate(Number(e.target.value) || 0)}
                                className="w-32 h-16 text-4xl font-display font-bold text-center border-0 border-b-2 border-primary/20 focus-visible:ring-0 focus-visible:border-primary rounded-none px-0 bg-transparent"
                              />
                            </div>
                            <input
                              type="range"
                              min="80"
                              max="350"
                              step="5"
                              value={sessionRate}
                              onChange={(e) => setSessionRate(parseInt(e.target.value))}
                              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                            />
                          </div>

                          <div className="flex flex-wrap justify-center gap-3">
                            {[120, 150, 185, 225, 300].map((rate) => (
                              <button
                                key={rate}
                                onClick={() => setSessionRate(rate)}
                                className={`px-4 py-2 rounded-full border text-sm font-medium transition-all ${
                                  sessionRate === rate 
                                    ? "bg-primary text-primary-foreground border-primary" 
                                    : "border-border hover:border-primary/40 text-foreground"
                                }`}
                              >
                                ${rate}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Micro Insight */}
                        <div className="mt-8 p-4 rounded-2xl bg-primary/5 border border-primary/10 flex items-start gap-4 text-left">
                          <AlertCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-foreground/70">
                            <strong>Diagnostic Insight:</strong> At ${sessionRate}/session, assuming a 12-session average and 70% retention, every single lost client costs you ≈ <strong>${adjustedLifetimeValue.toLocaleString()}</strong> in lifetime value.
                          </p>
                        </div>
                      </div>
                    )}

                    {step === 3 && (
                      <div className="space-y-8 text-center max-w-2xl mx-auto">
                        <div>
                          <h3 className="text-2xl md:text-3xl font-display font-bold mb-4">Website Status</h3>
                          <p className="text-foreground/50">How would you honestly describe your current online presence?</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {[
                            { id: "invisible", label: "Invisible", sub: "No site or doesn't show on Google", icon: Globe },
                            { id: "outdated", label: "Outdated", sub: "Old design, feels unprofessional", icon: ShieldAlert },
                            { id: "decent", label: "Decent", sub: "Looks okay, but few inquiries", icon: TrendingUp },
                            { id: "optimized", label: "Optimized", sub: "Good site, but competitors are better", icon: Zap },
                          ].map((item) => (
                            <button
                              key={item.id}
                              onClick={() => setSiteStatus(item.id as SiteStatus)}
                              className={`p-6 rounded-3xl border-2 transition-all duration-300 text-left flex items-center gap-5 ${
                                siteStatus === item.id 
                                  ? "border-primary bg-primary/5" 
                                  : "border-transparent bg-muted hover:bg-muted/80"
                              }`}
                            >
                              <div className={`w-12 h-12 rounded-2xl flex-shrink-0 flex items-center justify-center transition-colors ${
                                siteStatus === item.id ? "bg-primary text-primary-foreground" : "bg-background text-primary"
                              }`}>
                                <item.icon className="w-6 h-6" />
                              </div>
                              <div>
                                <div className="font-bold text-lg text-foreground">{item.label}</div>
                                <div className="text-xs text-foreground/60">{item.sub}</div>
                              </div>
                            </button>
                          ))}
                        </div>

                        {/* Micro Insight */}
                        <div className="mt-8 p-4 rounded-2xl bg-primary/5 border border-primary/10 flex items-start gap-4 text-left">
                          <AlertCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-foreground/70">
                            <strong>Diagnostic Insight:</strong> Outdated or "invisible" websites convert 2–3x fewer visitors than strategically designed, SEO-optimized competitors.
                          </p>
                        </div>
                      </div>
                    )}

                    {step === 4 && (
                      <div className="space-y-12 text-center max-w-xl mx-auto">
                        <div>
                          <h3 className="text-2xl md:text-3xl font-display font-bold mb-4">Final Details</h3>
                          <p className="text-foreground/50">To provide an accurate projection, tell us where you currently stand.</p>
                        </div>
                        
                        <div className="space-y-8">
                          <div className="space-y-4">
                            <label className="text-sm font-bold uppercase tracking-wider text-foreground/60">Are you accepting new clients?</label>
                            <div className="flex flex-wrap justify-center gap-3">
                              {[
                                { id: "yes", label: "Yes, immediately" },
                                { id: "soon", label: "Waitlisting / Soon" },
                                { id: "no", label: "No, completely full" },
                              ].map((opt) => (
                                <button
                                  key={opt.id}
                                  onClick={() => setAcceptingClients(opt.id as ClientStatus)}
                                  className={`px-6 py-3 rounded-full border text-sm font-bold transition-all ${
                                    acceptingClients === opt.id 
                                      ? "bg-primary text-primary-foreground border-primary" 
                                      : "border-border bg-background text-foreground hover:border-primary/40"
                                  }`}
                                >
                                  {opt.label}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="space-y-4">
                            <label className="text-sm font-bold uppercase tracking-wider text-foreground/60">Current Monthly Revenue Range</label>
                            <div className="flex flex-wrap justify-center gap-3">
                              {[
                                { id: "under5k", label: "Under $5k" },
                                { id: "5k_10k", label: "$5k - $10k" },
                                { id: "10k_plus", label: "$10k+" },
                              ].map((opt) => (
                                <button
                                  key={opt.id}
                                  onClick={() => setRevenueRange(opt.id as RevenueRange)}
                                  className={`px-6 py-3 rounded-full border text-sm font-bold transition-all ${
                                    revenueRange === opt.id 
                                      ? "bg-foreground text-background border-foreground" 
                                      : "border-border bg-background text-foreground hover:border-foreground/30"
                                  }`}
                                >
                                  {opt.label}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-8 border-t border-border mt-8">
                      {step > 1 ? (
                        <button onClick={handleBack} className="flex items-center gap-2 text-sm font-bold text-foreground opacity-40 hover:opacity-100 transition-opacity">
                          <ArrowLeft className="w-4 h-4" /> Back
                        </button>
                      ) : <div />}
                      <Button 
                        onClick={handleNext}
                        disabled={step === 4 && (!acceptingClients || !revenueRange)}
                        className="rounded-full bg-foreground text-background hover:bg-foreground/90 px-8 h-12 font-bold flex items-center gap-2 disabled:opacity-50"
                      >
                        {step === 4 ? "View Diagnostic Results" : "Continue"} <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="results"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-12"
                  >
                    {/* A. PAIN HEADLINE */}
                    <div className="text-center space-y-4">
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-destructive/10 text-destructive text-xs font-mono uppercase tracking-widest font-bold">
                        <AlertCircle className="w-4 h-4" /> Revenue Leak Detected
                      </div>
                      <h3 className="text-4xl md:text-5xl font-display font-bold text-foreground">
                        You're Likely Losing <span className="text-destructive underline decoration-destructive/30">~${annualLostRevenue.toLocaleString()}</span> Per Year
                      </h3>
                      <p className="text-foreground/50 max-w-xl mx-auto text-lg">
                        Based on your session rate and local market demand, your current web presence is severely limiting your growth.
                      </p>
                    </div>

                    {/* B. BREAKDOWN */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="p-6 rounded-3xl bg-muted border border-border text-center">
                        <div className="text-xs font-mono uppercase tracking-widest opacity-50 mb-2 text-foreground">Missed Inquiries</div>
                        <div className="text-3xl font-display font-bold text-foreground">~{Math.round(extraClientsPerMonth)}/mo</div>
                        <div className="text-sm opacity-60 mt-2 text-foreground">Potential organic leads lost to competitors</div>
                      </div>
                      <div className="p-6 rounded-3xl bg-muted border border-border text-center">
                        <div className="text-xs font-mono uppercase tracking-widest opacity-50 mb-2 text-foreground">Lost Clients</div>
                        <div className="text-3xl font-display font-bold text-foreground">~{Math.round(annualLostClients)}/yr</div>
                        <div className="text-sm opacity-60 mt-2 text-foreground">High-intent clients who couldn't find you</div>
                      </div>
                      <div className="p-6 rounded-3xl bg-destructive/5 border border-destructive/20 text-center shadow-lg shadow-destructive/5">
                        <div className="text-xs font-mono uppercase tracking-widest text-destructive mb-2">Lost Revenue</div>
                        <div className="text-3xl font-display font-bold text-destructive">${annualLostRevenue.toLocaleString()}</div>
                        <div className="text-sm text-destructive/70 mt-2">Annual projected lifetime value loss</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                      {/* C. WHY THIS IS HAPPENING */}
                      <div className="space-y-6 p-8 rounded-[2rem] bg-background border border-border shadow-xl">
                        <h4 className="text-xl font-display font-bold flex items-center gap-2 text-foreground">
                          <Search className="w-5 h-5 text-primary" /> Why this is happening:
                        </h4>
                        <ul className="space-y-4 text-foreground">
                          <li className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Globe className="w-3 h-3 text-primary" />
                            </div>
                            <div>
                              <strong className="block text-sm">Low Google Visibility</strong>
                              <span className="text-sm opacity-60">Clients are searching for therapy, but your site isn't ranking on page 1.</span>
                            </div>
                          </li>
                          <li className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Shield className="w-3 h-3 text-primary" />
                            </div>
                            <div>
                              <strong className="block text-sm">Weak Design Trust</strong>
                              <span className="text-sm opacity-60">Therapy is high-stakes. Outdated designs signal a lack of professionalism.</span>
                            </div>
                          </li>
                          <li className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <MousePointerClick className="w-3 h-3 text-primary" />
                            </div>
                            <div>
                              <strong className="block text-sm">Poor Conversion Flow</strong>
                              <span className="text-sm opacity-60">Visitors land, but confusing navigation or friction-heavy forms cause them to bounce.</span>
                            </div>
                          </li>
                        </ul>
                      </div>

                      {/* D & E. AUTHORITY & STRATEGIC INSIGHT */}
                      <div className="space-y-6">
                        <div className="p-8 rounded-[2rem] bg-foreground text-background">
                          <h4 className="text-lg font-bold mb-3 flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-background/80" /> The Good News
                          </h4>
                          <p className="text-background/80 text-sm leading-relaxed mb-4">
                            Practices we work with typically increase organic inquiries by <strong>2–4x within 90 days</strong> of a strategic redesign.
                          </p>
                          <div className="pt-4 border-t border-background/10">
                            <p className="text-xs text-background/60 italic">
                              <strong>Diagnostic Note:</strong> {
                                practiceType === "launching" 
                                  ? "Starting strong puts you 6-12 months ahead of therapists who DIY. You skip the 'lost revenue' phase entirely."
                                  : siteStatus === "optimized"
                                    ? "Even well-optimized sites leak revenue. A targeted content refresh and UX audit can plug these holes."
                                    : "A strategic redesign doesn't just look better—it mathematically pays for itself by capturing leads you're currently losing."
                              }
                            </p>
                          </div>
                        </div>

                        {/* F. POST-RESULTS LEAD CAPTURE */}
                        {!reportSent ? (
                          <div className="p-6 rounded-[2rem] bg-primary/10 border border-primary/20">
                            <h4 className="text-lg font-bold mb-2 flex items-center gap-2 text-foreground">
                              <FileText className="w-5 h-5 text-primary" /> Want a detailed breakdown?
                            </h4>
                            <p className="text-sm text-foreground/70 mb-4">Get a free report showing your local SEO gaps, competitor insights, and a 90-day recovery roadmap.</p>
                            <form onSubmit={handleGetReport} className="flex gap-2">
                              <Input 
                                type="email" 
                                placeholder="Enter your email" 
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="bg-background border-border text-foreground h-12"
                              />
                              <Button type="submit" disabled={isAnimating} className="h-12 bg-primary text-primary-foreground hover:bg-primary/90">
                                {isAnimating ? "..." : "Get Report"}
                              </Button>
                            </form>
                          </div>
                        ) : (
                          <div className="p-6 rounded-[2rem] bg-green-500/10 border border-green-500/20 flex items-center gap-4">
                            <CheckCircle2 className="w-8 h-8 text-green-600 flex-shrink-0" />
                            <div>
                              <strong className="block text-green-700">Report Requested!</strong>
                              <span className="text-sm text-green-600/70">Check your inbox shortly. We'll send your custom breakdown.</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* G. FINAL CTA */}
                    <div className="pt-8 border-t border-border text-center">
                      <Link href="#cta">
                        <Button size="lg" className="rounded-full bg-foreground text-background hover:bg-foreground/90 px-10 py-6 h-auto font-bold shadow-xl shadow-foreground/10 text-lg group">
                          Get Your Custom Growth Plan
                          <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </Link>
                      <p className="text-sm text-foreground/50 mt-4">We'll show you exactly how to recover these lost clients.</p>
                    </div>

                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 24px;
          width: 24px;
          border-radius: 50%;
          background: hsl(var(--primary));
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s;
        }
        input[type="range"]::-webkit-slider-thumb:hover {
          transform: scale(1.15);
        }
      `}</style>
    </section>
  );
}
