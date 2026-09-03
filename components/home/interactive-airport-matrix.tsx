"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plane,
  Clock,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  MapPin,
  CheckCircle2,
  Crown,
  Car,
  PhoneCall,
  Check,
  Radio,
  Wifi,
  Coffee,
  Navigation,
} from "lucide-react";

interface VehicleRate {
  id: string;
  name: string;
  category: string;
  fare: string;
  seats: number;
  bags: number;
  bookingName: string;
}

interface AirportHub {
  id: string;
  name: string;
  code: string;
  type: string;
  distance: string;
  driveTime: string;
  freeWait: string;
  image: string;
  radarCode: string;
  terminals: string[];
  protocol: string;
  rates: {
    saloon: string;
    mpv: string;
    suv: string;
  };
}

const AIRPORT_HUBS: AirportHub[] = [
  {
    id: "lhr",
    name: "London Heathrow",
    code: "LHR",
    type: "Commercial & Royal Windsor VIP Suite",
    distance: "15 miles from Central London",
    driveTime: "25-35 mins",
    freeWait: "60 mins complimentary",
    image: "/images/airport.jpg",
    radarCode: "EGLL / LHR · RADAR ACTIVE",
    terminals: ["Terminal 2 (The Queen's)", "Terminal 3", "Terminal 4", "Terminal 5 (BA Club)", "Windsor VIP Suite"],
    protocol: "Inside arrivals hall with custom digital nameboard, flight radar tracking, 60 minutes complimentary wait time from actual touchdown.",
    rates: {
      saloon: "£55",
      mpv: "£75",
      suv: "£95",
    },
  },
  {
    id: "lgw",
    name: "London Gatwick",
    code: "LGW",
    type: "Commercial & Private Jet Terminals",
    distance: "28 miles from Central London",
    driveTime: "45-55 mins",
    freeWait: "60 mins complimentary",
    image: "/images/hero.jpg",
    radarCode: "EGKK / LGW · RADAR ACTIVE",
    terminals: ["North Terminal", "South Terminal", "Signature Aviation FBO"],
    protocol: "Dedicated VIP chauffeur greeting at arrivals concourse directly adjacent to customs exit with full luggage porterage.",
    rates: {
      saloon: "£75",
      mpv: "£95",
      suv: "£120",
    },
  },
  {
    id: "stn",
    name: "London Stansted",
    code: "STN",
    type: "Commercial & Harrods Aviation FBO",
    distance: "38 miles from Central London",
    driveTime: "40-50 mins",
    freeWait: "60 mins complimentary",
    image: "/images/fleet-executive.jpg",
    radarCode: "EGSS / STN · RADAR ACTIVE",
    terminals: ["Main Passenger Terminal", "Harrods Aviation FBO", "XJet Diamond Hangar"],
    protocol: "Direct tarmac clearance and dedicated FBO executive lounge chauffeur reception.",
    rates: {
      saloon: "£80",
      mpv: "£105",
      suv: "£135",
    },
  },
  {
    id: "ltn",
    name: "London Luton",
    code: "LTN",
    type: "Commercial & Signature Flight Support",
    distance: "34 miles from Central London",
    driveTime: "35-45 mins",
    freeWait: "60 mins complimentary",
    image: "/images/fleet-mpv.jpg",
    radarCode: "EGGW / LTN · RADAR ACTIVE",
    terminals: ["Main Passenger Concourse", "Signature Flight Support (T1 & T2)", "Harrods Aviation FBO"],
    protocol: "VIP vehicle positioned at private aviation jet gate or terminal arrivals lounge.",
    rates: {
      saloon: "£75",
      mpv: "£95",
      suv: "£125",
    },
  },
  {
    id: "lcy",
    name: "London City Airport",
    code: "LCY",
    type: "Canary Wharf & Private Jet Centre",
    distance: "9 miles from Central London",
    driveTime: "20-25 mins",
    freeWait: "45 mins complimentary",
    image: "/images/fleet-suv.jpg",
    radarCode: "EGLC / LCY · RADAR ACTIVE",
    terminals: ["Main Commercial Terminal", "London City Private Jet Centre"],
    protocol: "Chauffeur stationed in priority lane 20 meters from terminal exit with instant baggage assist.",
    rates: {
      saloon: "£45",
      mpv: "£65",
      suv: "£85",
    },
  },
  {
    id: "fab",
    name: "Farnborough & Biggin Hill",
    code: "FAB / BQH",
    type: "VIP Private Aviation & FBO Terminals",
    distance: "Direct Airside Tarmac Access",
    driveTime: "Direct VIP Highway Transit",
    freeWait: "Unlimited FBO Standby",
    image: "/images/interior.jpg",
    radarCode: "EGLF / FAB · RADAR ACTIVE",
    terminals: ["TAG Farnborough Airport", "Biggin Hill Executive Handling", "Signature RAF Northolt"],
    protocol: "Tarmac airside chauffeur escort directly to aircraft steps with discreet VIP diplomatic protocol.",
    rates: {
      saloon: "£90",
      mpv: "£120",
      suv: "£150",
    },
  },
];

export function InteractiveAirportMatrix() {
  const [selectedAirport, setSelectedAirport] = useState<AirportHub>(AIRPORT_HUBS[0]);
  const [selectedFleetType, setSelectedFleetType] = useState<"saloon" | "mpv" | "suv">("saloon");

  const vehicleOptions = [
    {
      id: "saloon" as const,
      name: "Executive Saloon",
      model: "Mercedes E-Class / S-Class",
      seats: 3,
      bags: 2,
      bookingParam: "Mercedes-Benz S-Class",
    },
    {
      id: "mpv" as const,
      name: "Luxury VIP MPV",
      model: "Mercedes V-Class Maybach",
      seats: 7,
      bags: 7,
      bookingParam: "Mercedes-Benz V-Class",
    },
    {
      id: "suv" as const,
      name: "Prestige Chauffeur SUV",
      model: "Range Rover Autobiography",
      seats: 4,
      bags: 4,
      bookingParam: "Range Rover Autobiography",
    },
  ];

  const currentFare = selectedAirport.rates[selectedFleetType];
  const activeVehicle = vehicleOptions.find((v) => v.id === selectedFleetType)!;

  return (
    <section className="relative overflow-hidden bg-[#070709] py-24 lg:py-32 border-t border-white/5">
      {/* Ambient background gold glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 h-[35rem] w-[45rem] rounded-full bg-gold/10 blur-[140px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10 z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.25em] text-gold shadow-gold mb-4">
            <Radio className="h-3.5 w-3.5 text-gold animate-pulse" />
            <span>Real-Time UK Flight Radar &amp; Terminal Dispatch</span>
          </div>

          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-white font-bold tracking-tight">
            London &amp; UK Airport <span className="text-gradient-gold">Transfer Hub.</span>
          </h2>

          <p className="mt-4 text-sm md:text-base text-muted-foreground leading-relaxed">
            Select any London commercial terminal or private jet FBO center. Guaranteed fixed pricing,
            live radar synchronization, and inside-terminal meet &amp; greet.
          </p>
        </div>

        {/* Airport Selector Bar (Horizontal Interactive Cards) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
          {AIRPORT_HUBS.map((airport) => {
            const isSelected = selectedAirport.id === airport.id;
            return (
              <button
                key={airport.id}
                onClick={() => setSelectedAirport(airport)}
                className={`relative p-4 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between group overflow-hidden ${
                  isSelected
                    ? "bg-gradient-to-b from-[#1C180E] to-[#121217] border-gold shadow-gold scale-[1.02]"
                    : "bg-[#0F0F13] border-white/5 hover:border-white/20 hover:bg-[#141419]"
                }`}
              >
                {isSelected && (
                  <motion.div
                    layoutId="activeAirportBar"
                    className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold via-yellow-400 to-amber-600"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`font-mono text-xs font-extrabold px-2 py-0.5 rounded ${
                        isSelected ? "bg-gold text-ink" : "bg-white/5 text-muted-foreground"
                      }`}
                    >
                      {airport.code.split(" ")[0]}
                    </span>
                    <Plane
                      className={`h-3.5 w-3.5 transition-transform ${
                        isSelected ? "text-gold rotate-45" : "text-muted-foreground group-hover:rotate-45"
                      }`}
                    />
                  </div>
                  <h4
                    className={`text-xs md:text-sm font-bold line-clamp-1 ${
                      isSelected ? "text-white" : "text-foreground/80 group-hover:text-white"
                    }`}
                  >
                    {airport.name.replace("London ", "")}
                  </h4>
                </div>
                <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[11px]">
                  <span className="text-muted-foreground">{airport.driveTime.split(" ")[0]} mins</span>
                  <span className="text-gold font-bold font-mono">From {airport.rates.saloon}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Main Stage: Cinematic Split Terminal Showcase & VIP Booking Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedAirport.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid lg:grid-cols-12 gap-8 items-stretch"
          >
            {/* Left Showcase: Cinematic Terminal Backdrop & Flight Radar HUD (7 Cols) */}
            <div className="lg:col-span-7 relative rounded-3xl overflow-hidden border border-gold/40 bg-gradient-to-b from-[#14141A] to-[#0A0A0E] shadow-2xl flex flex-col justify-between p-8 md:p-10 min-h-[460px]">
              {/* Background Terminal Image */}
              <Image
                src={selectedAirport.image}
                alt={selectedAirport.name}
                fill
                className="object-cover object-center brightness-[0.28] transition-transform duration-1000 ease-out hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0E] via-[#0A0A0E]/60 to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0E] via-transparent to-transparent pointer-events-none" />

              {/* Top Bar: Radar HUD & Airport Metadata */}
              <div className="relative z-10 flex flex-wrap items-center justify-between gap-3">
                <div className="inline-flex items-center gap-2 rounded-full bg-black/80 backdrop-blur-md border border-gold/40 px-3.5 py-1.5 text-[10px] font-bold font-mono text-gold uppercase tracking-wider">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <span>{selectedAirport.radarCode}</span>
                </div>

                <span className="rounded-full bg-black/80 backdrop-blur-md border border-white/10 px-3.5 py-1.5 text-[11px] font-semibold text-white/80">
                  {selectedAirport.distance}
                </span>
              </div>

              {/* Center / Bottom Info */}
              <div className="relative z-10 space-y-6 my-auto pt-8">
                <div>
                  <div className="flex items-center gap-2 text-gold text-xs font-mono font-bold uppercase tracking-widest">
                    <Crown className="h-4 w-4" />
                    <span>{selectedAirport.type}</span>
                  </div>
                  <h3 className="font-display text-3xl md:text-5xl text-white font-bold mt-1 tracking-tight">
                    {selectedAirport.name}
                  </h3>
                </div>

                {/* Protocol Callout */}
                <div className="p-4 rounded-2xl bg-black/75 backdrop-blur-md border border-gold/30 text-xs text-foreground/90 leading-relaxed flex items-start gap-3.5">
                  <div className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-gold/20 text-gold border border-gold/30">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="text-gold font-bold uppercase tracking-wider text-[10px] block mb-0.5">
                      VIP Terminal Chauffeur Protocol
                    </span>
                    <p className="text-muted-foreground text-xs">{selectedAirport.protocol}</p>
                  </div>
                </div>

                {/* Serviced Terminals Tags */}
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold block mb-2">
                    Serviced Terminals &amp; FBO Lounges
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {selectedAirport.terminals.map((term) => (
                      <span
                        key={term}
                        className="rounded-full bg-black/70 backdrop-blur-md border border-white/15 px-3 py-1 text-xs text-white/90 font-medium hover:border-gold/50 transition-colors"
                      >
                        {term}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Showcase: Interactive Fleet Class Selector & Guaranteed Fare Card (5 Cols) */}
            <div className="lg:col-span-5 glass-card rounded-3xl p-8 md:p-10 border border-gold/40 shadow-2xl flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-bold">
                      Vehicle Category Pricing
                    </span>
                    <h4 className="text-lg font-display text-white font-bold mt-0.5">
                      Select Fleet Class
                    </h4>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2.5 py-1 rounded-full">
                    Fixed &middot; No Surge
                  </span>
                </div>

                {/* Fleet Switcher Options */}
                <div className="space-y-2.5 mt-5">
                  {vehicleOptions.map((v) => {
                    const isSelected = selectedFleetType === v.id;
                    const fare = selectedAirport.rates[v.id];
                    return (
                      <button
                        key={v.id}
                        onClick={() => setSelectedFleetType(v.id)}
                        className={`w-full p-3.5 rounded-2xl border text-left transition-all duration-300 flex items-center justify-between ${
                          isSelected
                            ? "bg-gradient-to-r from-gold/20 via-gold/10 to-transparent border-gold shadow-gold text-white"
                            : "bg-[#101015] border-white/5 hover:border-white/20 text-muted-foreground hover:text-white"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`h-4 w-4 rounded-full border flex items-center justify-center ${
                              isSelected ? "border-gold bg-gold" : "border-white/30"
                            }`}
                          >
                            {isSelected && <Check className="h-2.5 w-2.5 text-black stroke-[3]" />}
                          </div>
                          <div>
                            <p className="text-xs font-bold text-white">{v.name}</p>
                            <p className="text-[10px] text-muted-foreground">{v.model}</p>
                          </div>
                        </div>

                        <div className="text-right">
                          <span
                            className={`font-display text-base font-extrabold ${
                              isSelected ? "text-gradient-gold" : "text-white/80"
                            }`}
                          >
                            {fare}
                          </span>
                          <span className="text-[10px] text-muted-foreground block">
                            {v.seats} Seats &middot; {v.bags} Bags
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Price Display Card */}
                <div className="mt-6 p-5 rounded-2xl bg-gradient-to-br from-[#1C180E] via-[#121217] to-[#0A0A0D] border border-gold/40 text-center">
                  <span className="text-[10px] uppercase tracking-widest text-gold font-bold block">
                    Total Guaranteed Transfer Fare
                  </span>
                  <div className="font-display text-4xl md:text-5xl font-extrabold text-gradient-gold mt-1">
                    {currentFare}
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-1">
                    {selectedAirport.name} &rarr; Central London ({activeVehicle.name})
                  </p>
                </div>

                {/* Inclusions Checklist */}
                <div className="grid grid-cols-2 gap-2 mt-5 text-[11px] text-foreground/90">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-gold shrink-0" />
                    <span>Flight Radar Sync</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-gold shrink-0" />
                    <span>60m Free Waiting</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-gold shrink-0" />
                    <span>Inside Meet &amp; Greet</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-gold shrink-0" />
                    <span>Mineral Water &amp; Wi-Fi</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-4 border-t border-white/10">
                <Link
                  href={`/booking?service=airport&dropoff=${encodeURIComponent(
                    selectedAirport.name
                  )}&vehicle=${encodeURIComponent(activeVehicle.bookingParam)}`}
                  className="w-full rounded-full btn-gold py-4 text-sm font-bold shadow-gold text-center inline-flex items-center justify-center gap-2 group transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>Book {selectedAirport.name} Transfer</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>

                <div className="flex items-center justify-between text-xs pt-1 px-2">
                  <a
                    href="tel:07456714214"
                    className="text-muted-foreground hover:text-gold inline-flex items-center gap-1.5 transition-colors"
                  >
                    <PhoneCall className="h-3 w-3 text-gold" />
                    <span>Call: 07456714214</span>
                  </a>
                  <Link
                    href="/airport-transfers"
                    className="text-gold hover:underline font-semibold"
                  >
                    View All UK Airports &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
