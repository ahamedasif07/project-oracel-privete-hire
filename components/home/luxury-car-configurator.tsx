"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Gauge,
  Volume2,
  Wifi,
  Wind,
  ShieldCheck,
  ArrowRight,
  Check,
  Zap,
  Users,
  Briefcase,
  Compass,
  Sliders,
} from "lucide-react";

interface FleetSpec {
  id: string;
  name: string;
  badge: string;
  headline: string;
  category: string;
  price: string;
  image: string;
  passengers: number;
  luggage: number;
  zeroToSixty: string;
  soundLevel: string;
  chassis: string;
  highlights: string[];
  specs: { label: string; value: string }[];
  bookingParam: string;
}

const FLEET_DATA: FleetSpec[] = [
  {
    id: "s-class",
    name: "Mercedes-Benz S-Class LWB",
    badge: "First Class Chauffeur Saloon",
    headline: "The Pinnacle of Global Executive Motoring",
    category: "Prestige Executive Saloon",
    price: "From £55",
    image: "/images/fleet-executive.jpg",
    passengers: 3,
    luggage: 2,
    zeroToSixty: "4.4s (Vibration-Free)",
    soundLevel: "26 dB (Whisper Quiet)",
    chassis: "AIRMATIC Adaptive Air Suspension",
    highlights: [
      "Executive Rear Reclining Seats with Calf Rest",
      "Active Road Noise Cancellation & Double Glazing",
      "Energizing Comfort: Hot-Stone Massage Programs",
      "Burmester® 3D High-End Surround Sound",
    ],
    specs: [
      { label: "Wheelbase", value: "Long Wheelbase (3,216 mm)" },
      { label: "Legroom", value: "1,115 mm (Rear Executive)" },
      { label: "Air Filtration", value: "HEPA + Ionization Aroma" },
      { label: "Connectivity", value: "High-Speed 5G Onboard Wi-Fi" },
    ],
    bookingParam: "Mercedes-Benz S-Class",
  },
  {
    id: "v-class",
    name: "Mercedes-Benz V-Class VIP",
    badge: "VIP Group & Family Transporter",
    headline: "Mobile Boardroom & Luxury Group Travel",
    category: "Luxury VIP MPV",
    price: "From £70",
    image: "/images/fleet-mpv.jpg",
    passengers: 7,
    luggage: 7,
    zeroToSixty: "7.9s (Effortless Torque)",
    soundLevel: "32 dB (Acoustic Glass)",
    chassis: "Agility Control Comfort Suspension",
    highlights: [
      "Conference Face-to-Face Captain Seat Layout",
      "Massive Luggage Capacity (7 Full XL Suitcases)",
      "Folding Centre Executive Work Table",
      "Twin Electric Sliding Doors & Privacy Blinds",
    ],
    specs: [
      { label: "Seating Layout", value: "7 Individual Leather Captains" },
      { label: "Luggage Vol.", value: "1,030 Litres Dedicated Boot" },
      { label: "Charging", value: "6x USB-C + 230V Power Socket" },
      { label: "Climate", value: "Thermotronic 3-Zone Independent" },
    ],
    bookingParam: "Mercedes-Benz V-Class",
  },
  {
    id: "range-rover",
    name: "Range Rover Autobiography",
    badge: "Supreme Luxury All-Terrain SUV",
    headline: "Commanding Elegance & British Heritage",
    category: "Prestige Chauffeur 4x4",
    price: "From £95",
    image: "/images/fleet-suv.jpg",
    passengers: 4,
    luggage: 4,
    zeroToSixty: "4.6s (Twin-Turbo V8)",
    soundLevel: "28 dB (Next-Gen ANC)",
    chassis: "Electronic Air Suspension with Dynamic Response",
    highlights: [
      "Semi-Aniline Perforated Diamond Quilted Leather",
      "Panoramic Sliding Sunroof with Solar Attenuating Glass",
      "Tailgate Event Suite with Leather Cushion Seating",
      "Meridian™ Signature 1,600W Sound Suite",
    ],
    specs: [
      { label: "Drive System", value: "Intelligent All-Wheel Drive" },
      { label: "Suspension", value: "Predictive Dynamic Air" },
      { label: "Rear Screens", value: "Dual 11.4-inch HD Touchscreens" },
      { label: "Beverage Suite", value: "Integrated Front & Rear Coolers" },
    ],
    bookingParam: "Range Rover Autobiography",
  },
];

const AMBIENT_THEMES = [
  {
    name: "Royal Champagne",
    color: "#D4AF37",
    glowClass: "from-amber-500/20 via-yellow-600/10 to-transparent",
    borderGlow: "border-gold/60 shadow-[0_0_40px_rgba(212,175,55,0.25)]",
    tagColor: "bg-gold/20 text-gold border-gold/40",
  },
  {
    name: "Maybach Sapphire",
    color: "#38BDF8",
    glowClass: "from-sky-500/20 via-blue-600/10 to-transparent",
    borderGlow: "border-sky-400/60 shadow-[0_0_40px_rgba(56,189,248,0.25)]",
    tagColor: "bg-sky-500/20 text-sky-300 border-sky-400/40",
  },
  {
    name: "British Emerald",
    color: "#10B981",
    glowClass: "from-emerald-500/20 via-teal-600/10 to-transparent",
    borderGlow: "border-emerald-400/60 shadow-[0_0_40px_rgba(16,185,129,0.25)]",
    tagColor: "bg-emerald-500/20 text-emerald-300 border-emerald-400/40",
  },
  {
    name: "Amethyst VIP",
    color: "#C084FC",
    glowClass: "from-purple-500/20 via-fuchsia-600/10 to-transparent",
    borderGlow: "border-purple-400/60 shadow-[0_0_40px_rgba(192,132,252,0.25)]",
    tagColor: "bg-purple-500/20 text-purple-300 border-purple-400/40",
  },
];

export function LuxuryCarConfigurator() {
  const [selectedVehicle, setSelectedVehicle] = useState<FleetSpec>(FLEET_DATA[0]);
  const [selectedTheme, setSelectedTheme] = useState(AMBIENT_THEMES[0]);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="relative overflow-hidden bg-[#070709] py-24 lg:py-32 border-t border-white/5">
      {/* Dynamic Ambient Background Aura controlled by user theme */}
      <motion.div
        animate={{
          background: `radial-gradient(circle at 50% 30%, ${selectedTheme.color}15 0%, transparent 70%)`,
        }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 pointer-events-none"
      />

      {/* Decorative Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10 z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.25em] text-gold">
              <Sliders className="h-3.5 w-3.5 text-gold" />
              <span>Interactive Fleet Showcase</span>
            </div>
            <h2 className="mt-3 font-display text-3xl md:text-5xl lg:text-6xl text-white font-bold tracking-tight">
              Experience <span className="text-gradient-gold">Bespoke Comfort.</span>
            </h2>
            <p className="mt-3 max-w-xl text-sm md:text-base text-muted-foreground leading-relaxed">
              Select your preferred luxury vehicle and personalize the cabin atmosphere in real time.
              Engineered for seamless discretion and uncompromising elegance.
            </p>
          </div>

          {/* Vehicle Selector Tabs */}
          <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-[#111116] border border-white/10 self-start md:self-auto">
            {FLEET_DATA.map((car) => {
              const isSelected = selectedVehicle.id === car.id;
              return (
                <button
                  key={car.id}
                  onClick={() => setSelectedVehicle(car)}
                  className={`relative px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 ${
                    isSelected ? "text-ink" : "text-muted-foreground hover:text-white"
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="activeFleetTab"
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#F4E0A5] via-[#D4AF37] to-[#B08D24] shadow-gold"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{car.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Interactive Showcase Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Interactive Vehicle Visualizer & Ambient Studio (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <motion.div
              key={selectedVehicle.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className={`relative aspect-[16/10] w-full rounded-3xl overflow-hidden border bg-gradient-to-b from-[#17171E] to-[#0D0D11] transition-all duration-700 ${selectedTheme.borderGlow}`}
            >
              <Image
                src={selectedVehicle.image}
                alt={selectedVehicle.name}
                fill
                className="object-cover object-center transition-transform duration-1000 ease-out hover:scale-105"
                priority
              />

              {/* Dynamic Theme Gradient Overlay */}
              <div
                className="absolute inset-0 transition-opacity duration-700 pointer-events-none"
                style={{
                  background: `linear-gradient(to top, rgba(11,11,14,0.95) 0%, rgba(11,11,14,0.3) 50%, transparent 100%)`,
                }}
              />

              {/* Top Floating Badges */}
              <div className="absolute top-5 left-5 right-5 flex items-center justify-between">
                <span className="rounded-full bg-black/80 backdrop-blur-md border border-white/10 px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
                  {selectedVehicle.category}
                </span>

                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-black/80 backdrop-blur-md border border-gold/40 px-3 py-1 text-xs font-bold text-gold flex items-center gap-1.5">
                    <Users className="h-3.5 w-3.5" />
                    <span>{selectedVehicle.passengers} Seats</span>
                  </span>
                  <span className="rounded-full bg-black/80 backdrop-blur-md border border-gold/40 px-3 py-1 text-xs font-bold text-gold flex items-center gap-1.5">
                    <Briefcase className="h-3.5 w-3.5" />
                    <span>{selectedVehicle.luggage} Bags</span>
                  </span>
                </div>
              </div>

              {/* Bottom Visualizer Overlay info */}
              <div className="absolute bottom-5 left-5 right-5">
                <p className="text-[11px] uppercase tracking-[0.25em] text-gold font-bold">
                  {selectedVehicle.badge}
                </p>
                <div className="flex flex-wrap items-baseline justify-between gap-2 mt-1">
                  <h3 className="font-display text-2xl md:text-3xl text-white font-bold">
                    {selectedVehicle.name}
                  </h3>
                  <span className="text-xl md:text-2xl font-display font-extrabold text-gradient-gold">
                    {selectedVehicle.price}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Ambient Lighting Studio Bar */}
            <div className="glass-card rounded-2xl p-5 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-gold/15 text-gold border border-gold/30">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                    Cabin Ambient Illumination
                  </h4>
                  <p className="text-[11px] text-muted-foreground">
                    Customize interior LED mood &amp; acoustic aura
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                {AMBIENT_THEMES.map((theme) => {
                  const isActive = selectedTheme.name === theme.name;
                  return (
                    <button
                      key={theme.name}
                      onClick={() => setSelectedTheme(theme)}
                      className="group relative flex items-center justify-center"
                      title={theme.name}
                    >
                      <span
                        className={`h-7 w-7 rounded-full transition-transform duration-300 flex items-center justify-center ${
                          isActive ? "scale-110 ring-2 ring-white shadow-lg" : "hover:scale-105 opacity-70"
                        }`}
                        style={{ backgroundColor: theme.color }}
                      >
                        {isActive && <Check className="h-3.5 w-3.5 text-black stroke-[3]" />}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Vehicle Telemetry & VIP Amenities (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            {/* Telemetry & Performance Gauges Card */}
            <div className="glass-card rounded-3xl p-6 md:p-8 border border-white/10 flex-1 space-y-6">
              <div>
                <span className="text-[10px] uppercase tracking-[0.3em] text-gold font-bold">
                  Telemetry &amp; Comfort Metrics
                </span>
                <h4 className="mt-1 font-display text-xl text-white font-bold">
                  {selectedVehicle.headline}
                </h4>
              </div>

              {/* Dynamic Metric Meters */}
              <div className="grid grid-cols-2 gap-3.5">
                <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-1">
                  <div className="flex items-center gap-1.5 text-muted-foreground text-[10px] uppercase font-bold tracking-wider">
                    <Volume2 className="h-3.5 w-3.5 text-gold" />
                    <span>Cabin Acoustics</span>
                  </div>
                  <p className="text-sm md:text-base font-bold text-white font-mono">
                    {selectedVehicle.soundLevel}
                  </p>
                  <p className="text-[10px] text-emerald-400">Library Soundproofed</p>
                </div>

                <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-1">
                  <div className="flex items-center gap-1.5 text-muted-foreground text-[10px] uppercase font-bold tracking-wider">
                    <Gauge className="h-3.5 w-3.5 text-gold" />
                    <span>Acceleration</span>
                  </div>
                  <p className="text-sm md:text-base font-bold text-white font-mono">
                    {selectedVehicle.zeroToSixty}
                  </p>
                  <p className="text-[10px] text-gold">Seamless Glide</p>
                </div>
              </div>

              {/* Key Amenities Checklist */}
              <div className="space-y-2.5 pt-2 border-t border-white/5">
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">
                  First-Class Inclusions
                </span>
                <div className="space-y-2">
                  {selectedVehicle.highlights.map((item, idx) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.08 }}
                      className="flex items-center gap-2.5 text-xs text-foreground/90 font-medium"
                    >
                      <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-gold/20 text-gold">
                        <Check className="h-2.5 w-2.5 stroke-[3]" />
                      </span>
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Detailed Specs Table */}
              <div className="space-y-2 pt-2 border-t border-white/5">
                {selectedVehicle.specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="flex items-center justify-between text-xs py-1 border-b border-white/5 last:border-none"
                  >
                    <span className="text-muted-foreground">{spec.label}</span>
                    <span className="text-white font-semibold font-mono">{spec.value}</span>
                  </div>
                ))}
              </div>

              {/* Instant Booking Action with Selected Vehicle */}
              <div className="pt-2">
                <Link
                  href={`/booking?vehicle=${encodeURIComponent(selectedVehicle.bookingParam)}`}
                  className="w-full rounded-full btn-gold py-4 text-sm font-bold shadow-gold inline-flex items-center justify-center gap-2 group transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>Book This {selectedVehicle.name.split(" ")[0]}</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
