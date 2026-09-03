"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Plane,
  Clock,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  MapPin,
  CheckCircle2,
  Crown,
} from "lucide-react";

interface AirportInfo {
  id: string;
  name: string;
  code: string;
  type: string;
  distance: string;
  driveTime: string;
  fixedFare: string;
  freeWaitTime: string;
  terminals: string[];
  pickupProtocol: string;
}

const AIRPORT_LIST: AirportInfo[] = [
  {
    id: "lhr",
    name: "London Heathrow",
    code: "LHR",
    type: "Commercial & Windsor VIP Suite",
    distance: "15 miles from Central London",
    driveTime: "25-35 mins",
    fixedFare: "£55",
    freeWaitTime: "60 mins included",
    terminals: ["Terminal 2 (The Queen's)", "Terminal 3", "Terminal 4", "Terminal 5 (British Airways)", "Windsor Suite (Royal VIP)"],
    pickupProtocol: "Chauffeur inside terminal arrivals hall with custom digital nameboard, 60 minutes complimentary wait time from actual landing.",
  },
  {
    id: "lgw",
    name: "London Gatwick",
    code: "LGW",
    type: "Commercial & Private Jet",
    distance: "28 miles from Central London",
    driveTime: "45-55 mins",
    fixedFare: "£75",
    freeWaitTime: "60 mins included",
    terminals: ["North Terminal", "South Terminal", "Signature Aviation FBO"],
    pickupProtocol: "Chauffeur stationed at dedicated VIP pickup concourse immediately adjacent to customs exit.",
  },
  {
    id: "stn",
    name: "London Stansted",
    code: "STN",
    type: "Commercial & Harrods Aviation FBO",
    distance: "38 miles from Central London",
    driveTime: "40-50 mins",
    fixedFare: "£80",
    freeWaitTime: "60 mins included",
    terminals: ["Main Commercial Terminal", "Harrods Aviation FBO", "XJet Diamond Hangar"],
    pickupProtocol: "Direct tarmac clearance and dedicated FBO lounge chauffeur meet & greet.",
  },
  {
    id: "ltn",
    name: "London Luton",
    code: "LTN",
    type: "Commercial & Signature FBO",
    distance: "34 miles from Central London",
    driveTime: "35-45 mins",
    fixedFare: "£75",
    freeWaitTime: "60 mins included",
    terminals: ["Main Passenger Terminal", "Signature Flight Support (T1 & T2)", "Harrods Aviation FBO"],
    pickupProtocol: "VIP vehicle positioned at private jet gate or terminal arrivals lounge.",
  },
  {
    id: "lcy",
    name: "London City Airport",
    code: "LCY",
    type: "Business & Private Jet Centre",
    distance: "9 miles from Central London / Canary Wharf",
    driveTime: "20-25 mins",
    fixedFare: "£45",
    freeWaitTime: "45 mins included",
    terminals: ["Main Terminal", "Private Jet Centre"],
    pickupProtocol: "Chauffeur parked in priority lane 20 meters from terminal exit with instant baggage assist.",
  },
  {
    id: "fab",
    name: "Farnborough & Biggin Hill",
    code: "FAB / BQH",
    type: "Exclusive VIP Private Jet FBO",
    distance: "Direct Tarmac Access",
    driveTime: "Direct Highway Transit",
    fixedFare: "£90",
    freeWaitTime: "Unlimited FBO standby",
    terminals: ["TAG Farnborough Airport", "Biggin Hill Executive Handling", "Signature RAF Northolt"],
    pickupProtocol: "Tarmac airside chauffeur escort directly to aircraft steps with discreet VIP protocol.",
  },
];

export function InteractiveAirportMatrix() {
  const [selectedAirport, setSelectedAirport] = useState<AirportInfo>(AIRPORT_LIST[0]);

  return (
    <section className="relative overflow-hidden bg-[#0C0C0F] py-24 lg:py-32 border-t border-white/5">
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10 z-10">
        <div className="mb-14 max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.25em] text-gold">
            <Plane className="h-3.5 w-3.5 text-gold" />
            <span>Real-Time Airport Matrix</span>
          </div>
          <h2 className="mt-3 font-display text-3xl md:text-5xl lg:text-6xl text-white font-bold tracking-tight">
            London &amp; UK Airport <span className="text-gradient-gold">Transfer Hub.</span>
          </h2>
          <p className="mt-3 text-base text-muted-foreground leading-relaxed">
            Select any London international terminal or private jet FBO center for guaranteed fixed
            pricing, terminal specifications, and express booking.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          {/* Airport Selector Buttons List (5 cols) */}
          <div className="lg:col-span-5 space-y-2.5">
            {AIRPORT_LIST.map((airport) => {
              const isSelected = selectedAirport.id === airport.id;
              return (
                <button
                  key={airport.id}
                  onClick={() => setSelectedAirport(airport)}
                  className={`w-full text-left p-4.5 rounded-2xl border transition-all duration-300 flex items-center justify-between group ${
                    isSelected
                      ? "bg-gradient-to-r from-[#1E1B13] to-[#14141A] border-gold/60 shadow-gold"
                      : "bg-[#111116] border-white/5 hover:border-white/20 hover:bg-[#16161D]"
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl font-bold font-mono text-xs transition-colors ${
                        isSelected
                          ? "bg-gold text-ink"
                          : "bg-white/5 text-muted-foreground group-hover:text-white"
                      }`}
                    >
                      {airport.code.split(" ")[0]}
                    </div>
                    <div>
                      <h4
                        className={`text-sm font-bold transition-colors ${
                          isSelected ? "text-white" : "text-foreground/80 group-hover:text-white"
                        }`}
                      >
                        {airport.name}
                      </h4>
                      <p className="text-[11px] text-muted-foreground">{airport.type}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span
                      className={`text-xs font-bold font-mono ${
                        isSelected ? "text-gold" : "text-muted-foreground"
                      }`}
                    >
                      From {airport.fixedFare}
                    </span>
                    <p className="text-[10px] text-muted-foreground">{airport.driveTime}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Airport Telemetry Card (7 cols) */}
          <div className="lg:col-span-7">
            <motion.div
              key={selectedAirport.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="glass-card h-full rounded-3xl p-8 md:p-10 border border-gold/30 shadow-2xl flex flex-col justify-between space-y-6"
            >
              <div>
                {/* Header */}
                <div className="flex flex-wrap items-start justify-between gap-4 pb-6 border-b border-white/10">
                  <div>
                    <div className="flex items-center gap-2 text-gold text-xs font-mono font-bold uppercase tracking-widest">
                      <Crown className="h-4 w-4" />
                      <span>{selectedAirport.code} &middot; {selectedAirport.type}</span>
                    </div>
                    <h3 className="font-display text-2xl md:text-4xl text-white font-bold mt-1">
                      {selectedAirport.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-gold" />
                      <span>{selectedAirport.distance}</span>
                    </p>
                  </div>

                  <div className="text-right p-4 rounded-2xl bg-black/50 border border-gold/30">
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground block font-bold">
                      Guaranteed Fixed Fare
                    </span>
                    <span className="text-3xl font-display font-extrabold text-gradient-gold">
                      {selectedAirport.fixedFare}
                    </span>
                    <span className="text-[10px] text-emerald-400 block mt-0.5">No Surge Pricing</span>
                  </div>
                </div>

                {/* Key Inclusions Metrics */}
                <div className="grid grid-cols-2 gap-3.5 my-6">
                  <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-1">
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-gold" />
                      <span>Flight Radar Wait Time</span>
                    </span>
                    <p className="text-sm font-bold text-white">{selectedAirport.freeWaitTime}</p>
                    <p className="text-[10px] text-muted-foreground">Automated radar tracking</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-1">
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold flex items-center gap-1.5">
                      <ShieldCheck className="h-3.5 w-3.5 text-gold" />
                      <span>Drive Transit Time</span>
                    </span>
                    <p className="text-sm font-bold text-white">{selectedAirport.driveTime}</p>
                    <p className="text-[10px] text-gold">Priority Chauffeur Lanes</p>
                  </div>
                </div>

                {/* Terminal Coverage List */}
                <div className="space-y-3">
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold block">
                    Serviced Terminals &amp; VIP Suites
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {selectedAirport.terminals.map((term) => (
                      <span
                        key={term}
                        className="rounded-full bg-white/5 border border-white/10 px-3 py-1.5 text-xs text-foreground/90 font-medium"
                      >
                        {term}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Protocol Note */}
                <div className="mt-6 p-4 rounded-2xl bg-gold/5 border border-gold/20 text-xs text-foreground/90 leading-relaxed flex items-start gap-3">
                  <Sparkles className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                  <p>
                    <strong className="text-gold">Meet &amp; Greet Protocol: </strong>
                    {selectedAirport.pickupProtocol}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center gap-4">
                <Link
                  href={`/booking?service=airport&dropoff=${encodeURIComponent(selectedAirport.name)}`}
                  className="w-full sm:w-auto flex-1 rounded-full btn-gold py-4 text-sm font-bold shadow-gold text-center inline-flex items-center justify-center gap-2 group"
                >
                  <span>Book Chauffeur to {selectedAirport.name}</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/airport-transfers"
                  className="w-full sm:w-auto rounded-full btn-ghost-gold px-7 py-4 text-xs font-semibold text-center"
                >
                  <span>View Full Airport Guide</span>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
