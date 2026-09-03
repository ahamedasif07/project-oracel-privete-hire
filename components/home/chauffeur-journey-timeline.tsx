"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Radio,
  UserCheck,
  ShieldCheck,
  MapPin,
  Clock,
  Sparkles,
  ArrowRight,
  Plane,
  Luggage,
  Coffee,
  CheckCircle2,
  Navigation,
} from "lucide-react";

interface StepDetail {
  step: string;
  badge: string;
  title: string;
  subtitle: string;
  desc: string;
  icon: any;
  image: string;
  statusText: string;
  perks: string[];
}

const JOURNEY_STEPS: StepDetail[] = [
  {
    step: "01",
    badge: "Automated Radar Sync",
    title: "Flight Radar & Precision Dispatch",
    subtitle: "Real-time tracking of commercial flights & private aviation.",
    desc: "Our automated dispatch platform connects directly with international radar feeds. Whether your flight arrives 30 minutes early or faces air traffic holding delays, your dedicated chauffeur arrival time adjusts in real-time with zero extra waiting charges.",
    icon: Radio,
    image: "/images/airport.jpg",
    statusText: "LIVE RADAR CONNECTED: BA184 &middot; ETA UPDATED",
    perks: [
      "Zero extra fee for flight delay adjustments",
      "60 mins complimentary terminal wait time",
      "Assigned driver SMS 30 mins before landing",
    ],
  },
  {
    step: "02",
    badge: "Arrivals Hall Concierge",
    title: "Terminal Meet & Greet with Nameboard",
    subtitle: "A distinguished greeting in the international arrivals hall.",
    desc: "Your immaculately suited chauffeur greets you inside the terminal with an executive digital nameboard, escorts you through the concourse, and manages all heavy luggage directly to your waiting limousine in the VIP chauffeur parking lane.",
    icon: UserCheck,
    image: "/images/hero.jpg",
    statusText: "CHAUFFEUR IN TERMINAL: VIP NAMEBOARD ACTIVE",
    perks: [
      "Custom nameboard or confidential identifier",
      "Full luggage assistance & baggage escort",
      "Direct walk to reserved priority parking bays",
    ],
  },
  {
    step: "03",
    badge: "First-Class Sanctuary",
    title: "The Silent Oasis on Wheels",
    subtitle: "Acoustic tranquility, climate presets & executive amenities.",
    desc: "Settle into diamond-quilted leather seating preset to your preferred cabin temperature. Enjoy complimentary high-speed 5G Wi-Fi, chilled Harrogate Spring water, multi-device fast chargers, and noise-cancelling double-paned acoustic privacy glass.",
    icon: Sparkles,
    image: "/images/interior.jpg",
    statusText: "CABIN ATMOSPHERE: 21°C &middot; 5G WI-FI ACTIVE",
    perks: [
      "Chilled Harrogate Spring water & mints",
      "Apple Lightning & USB-C fast charging suite",
      "Acoustic noise-cancelling serenity",
    ],
  },
  {
    step: "04",
    badge: "Discreet Destination Arrival",
    title: "Executive Arrival & Automated Billing",
    subtitle: "Effortless, seamless arrival at your residence, hotel or gala.",
    desc: "Arrive relaxed and on schedule. Your chauffeur opens your door, assists with luggage to your doorway or hotel concierge, and your corporate VAT invoice is dispatched automatically to your email inbox with no on-the-spot payment friction.",
    icon: MapPin,
    image: "/images/about.jpg",
    statusText: "JOURNEY COMPLETED: VAT INVOICE DISPATCHED",
    perks: [
      "Door-to-door curb curtesy & luggage unload",
      "Instant VAT receipts dispatched to your email",
      "24/7 client dispatch support line",
    ],
  },
];

export function ChauffeurJourneyTimeline() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const activeStep = JOURNEY_STEPS[activeStepIndex];

  // Auto advance every 8 seconds if user doesn't click
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStepIndex((prev) => (prev + 1) % JOURNEY_STEPS.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [activeStepIndex]);

  return (
    <section className="relative overflow-hidden bg-[#0A0A0D] py-24 lg:py-32 border-t border-white/5">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 h-[30rem] w-[30rem] rounded-full bg-gold/10 blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10 z-10">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.25em] text-gold">
            <Navigation className="h-3.5 w-3.5 text-gold" />
            <span>The Oracle Chauffeur Protocol</span>
          </div>
          <h2 className="mt-3 font-display text-3xl md:text-5xl lg:text-6xl text-white font-bold tracking-tight">
            How every journey is <span className="text-gradient-gold">orchestrated.</span>
          </h2>
          <p className="mt-3 text-base text-muted-foreground leading-relaxed">
            From the moment your booking is confirmed to your arrival at your final destination,
            our four-stage operational protocol guarantees effortless luxury.
          </p>
        </div>

        {/* Step Navigation Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
          {JOURNEY_STEPS.map((item, idx) => {
            const isActive = idx === activeStepIndex;
            const Icon = item.icon;
            return (
              <button
                key={item.step}
                onClick={() => setActiveStepIndex(idx)}
                className={`relative text-left p-5 rounded-2xl border transition-all duration-500 flex flex-col justify-between ${
                  isActive
                    ? "bg-[#16161D] border-gold/50 shadow-gold"
                    : "bg-[#0F0F14] border-white/5 hover:border-white/20 hover:bg-[#141419]"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeStepIndicator"
                    className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold via-yellow-400 to-amber-600 rounded-t-2xl"
                  />
                )}
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`font-mono text-xs font-bold ${
                      isActive ? "text-gold" : "text-muted-foreground"
                    }`}
                  >
                    STEP {item.step}
                  </span>
                  <div
                    className={`grid h-7 w-7 place-items-center rounded-lg ${
                      isActive ? "bg-gold text-ink" : "bg-white/5 text-muted-foreground"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </div>
                </div>
                <h4
                  className={`text-xs md:text-sm font-bold line-clamp-1 ${
                    isActive ? "text-white" : "text-foreground/70"
                  }`}
                >
                  {item.title}
                </h4>
              </button>
            );
          })}
        </div>

        {/* Interactive Step Card Detail */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep.step}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="grid lg:grid-cols-12 gap-8 items-center glass-card rounded-3xl p-8 md:p-12 border border-gold/30 shadow-2xl relative overflow-hidden"
          >
            {/* Left Content (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 rounded-full bg-gold/15 border border-gold/40 px-3.5 py-1 text-[10px] font-bold uppercase tracking-widest text-gold font-mono">
                  <span>STAGE {activeStep.step}</span>
                  <span>&middot;</span>
                  <span>{activeStep.badge}</span>
                </div>
                <h3 className="font-display text-2xl md:text-4xl text-white font-bold leading-snug">
                  {activeStep.title}
                </h3>
                <p className="text-xs md:text-sm text-gold font-medium">{activeStep.subtitle}</p>
              </div>

              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                {activeStep.desc}
              </p>

              {/* Perks List */}
              <div className="space-y-2.5 pt-2">
                {activeStep.perks.map((perk) => (
                  <div key={perk} className="flex items-center gap-3 text-xs md:text-sm text-foreground/90">
                    <CheckCircle2 className="h-4 w-4 text-gold shrink-0" />
                    <span>{perk}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Link
                  href="/booking"
                  className="rounded-full btn-gold px-8 py-3.5 text-xs font-bold shadow-gold inline-flex items-center gap-2 group"
                >
                  <span>Experience This Service</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/airport-transfers"
                  className="rounded-full btn-ghost-gold px-7 py-3.5 text-xs font-semibold"
                >
                  <span>Learn Airport Protocols</span>
                </Link>
              </div>
            </div>

            {/* Right Image / Telemetry Display (5 cols) */}
            <div className="lg:col-span-5 relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <Image
                src={activeStep.image}
                alt={activeStep.title}
                fill
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

              {/* Live Status Pill Overlay */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-black/80 backdrop-blur-md border border-gold/40 flex items-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
                </span>
                <span className="text-[10px] md:text-xs font-mono font-bold text-white tracking-wider">
                  {activeStep.statusText}
                </span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
