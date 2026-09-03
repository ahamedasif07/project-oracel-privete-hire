import Link from "next/link";
import Image from "next/image";
import {
  ShieldCheck,
  Clock,
  Plane,
  Receipt,
  ArrowRight,
  Sparkles,
  Star,
  ChevronRight,
  Briefcase,
  MapPin,
  PartyPopper,
  Heart,
  Crown,
  Car,
  CheckCircle2,
  PhoneCall,
  Flame,
  Wine,
  Wifi,
  Radio,
} from "lucide-react";

export default function HomePage() {
  const stats = [
    { value: "5+", label: "Years of Chauffeur Prestige" },
    { value: "50,00+", label: "VIP Journeys Completed" },
    { value: "4.88 ★", label: "Trustpilot Client Rating" },
    { value: "97%", label: "Guaranteed Punctuality" },
  ];

  const services = [
    {
      icon: Plane,
      title: "Airport VIP Transfers",
      desc: "Live radar flight tracking, inside terminal meet & greet with nameboard, and 60 mins complimentary wait time.",
      href: "/airport-transfers",
      image: "/images/airport.jpg",
      badge: "Most Popular",
    },
    {
      icon: Briefcase,
      title: "Corporate Roadshows",
      desc: "Discreet, confidential executive travel for boardroom executives, foreign delegations, and financial roadshows.",
      href: "/services",
      image: "/images/fleet-executive.jpg",
      badge: "Executive",
    },
    {
      icon: Heart,
      title: "Luxury Wedding Chauffeur",
      desc: "Rolls-Royce and Mercedes S-Class bridal cars dressed with pristine silk ribbons, champagne, and valeted chauffeurs.",
      href: "/services",
      image: "/images/wedding.jpg",
      badge: "Bridal",
    },
    {
      icon: Crown,
      title: "Private Jet & FBO Chauffeur",
      desc: "Direct tarmac and FBO terminal ground transport at Farnborough, Biggin Hill, Luton Signature, and RAF Northolt.",
      href: "/airport-transfers",
      image: "/images/hero.jpg",
      badge: "VIP FBO",
    },
    {
      icon: MapPin,
      title: "Nationwide Long Distance",
      desc: "First-class UK intercity travel in whisper-quiet saloon and SUV comfort without the delays of commercial trains.",
      href: "/services",
      image: "/images/fleet-suv.jpg",
      badge: "UK-Wide",
    },
    {
      icon: Car,
      title: "Hourly Dedicated Chauffeur",
      desc: "Retain a personal career chauffeur and premium vehicle on standby for flexible multi-destination London itineraries.",
      href: "/booking",
      image: "/images/interior.jpg",
      badge: "By The Hour",
    },
  ];

  const fleetPreview = [
    {
      name: "Executive Saloon",
      tag: "Mercedes-Benz E-Class",
      image: "/images/fleet-executive.jpg",
      seats: 3,
      bags: 2,
      price: "From £45",
      desc: "Understated elegance, whisper-quiet hybrid ride, and effortless business travel comfort.",
      features: ["Leather Seats", "Dual Climate", "High-Speed Wi-Fi", "Bottled Water"],
    },
    {
      name: "Luxury VIP MPV",
      tag: "Mercedes-Benz V-Class",
      image: "/images/fleet-mpv.jpg",
      seats: 7,
      bags: 7,
      price: "From £65",
      desc: "Spacious conference face-to-face seating and huge luggage capacity for corporate groups and families.",
      features: ["Conference Seating", "Extra Luggage Space", "Privacy Glass", "USB-C Chargers"],
    },
    {
      name: "Prestige Chauffeur SUV",
      tag: "Range Rover Autobiography",
      image: "/images/fleet-suv.jpg",
      seats: 4,
      bags: 4,
      price: "From £85",
      desc: "Commanding road presence, elevated ride height, and bespoke diamond-quilted leather interior.",
      features: ["Panoramic Glass Roof", "Heated Seats", "Meridian Sound", "All-Terrain Smoothness"],
    },
  ];

  const airportTerminals = [
    { name: "London Heathrow (LHR)", code: "T2, T3, T4, T5 & Windsor Suite", distance: "25 mins" },
    { name: "London Gatwick (LGW)", code: "North & South Terminals", distance: "45 mins" },
    { name: "London Stansted (STN)", code: "Main Terminal & Harrods Aviation", distance: "40 mins" },
    { name: "London Luton (LTN)", code: "Signature Flight Support FBO", distance: "35 mins" },
    { name: "London City Airport (LCY)", code: "Private Jet Centre & Commercial", distance: "20 mins" },
    { name: "Farnborough & Biggin Hill", code: "VIP Private Aviation Terminals", distance: "Direct" },
  ];

  const cabinAmenities = [
    {
      icon: Wine,
      title: "Chilled Champagne & Refreshments",
      desc: "Complimentary Harrogate Spring mineral water, chilled champagne on request, and mints in every vehicle.",
    },
    {
      icon: Wifi,
      title: "High-Speed 5G Wi-Fi & Multi-Chargers",
      desc: "Stay productive on the move with fast in-car Wi-Fi, Apple Lightning, USB-C, and wireless charging pads.",
    },
    {
      icon: Sparkles,
      title: "Ambient Starlight & Climate Control",
      desc: "Individually adjustable rear multi-zone climate control and acoustic noise-cancelling glass.",
    },
    {
      icon: ShieldCheck,
      title: "Licensed Career Chauffeurs",
      desc: "Enhanced DBS background checked, suited, courteous, and bound by strict client confidentiality.",
    },
  ];

  const testimonials = [
    {
      name: "Lord Harrison Sterling",
      role: "Private Client — Mayfair, London",
      text: "Oracle represents the pinnacle of British chauffeur hospitality. Pristine vehicles, immaculately suited drivers, and an obsession with punctuality.",
    },
    {
      name: "Victoria Kensington",
      role: "Chief Operating Officer — Global Finance Corp",
      text: "Our executive board relies exclusively on Oracle for all airport and roadshow logistics. Their flight radar tracking and meet & greet service is faultless.",
    },
    {
      name: "Marcus & Eleanor Vance",
      role: "Wedding Ceremony — Blenheim Palace",
      text: "Our wedding Rolls-Royce and guest MPVs arrived 20 minutes early, looking immaculate with silk ribbons. Truly a royal chauffeur experience.",
    },
  ];

  return (
    <div className="bg-[#0B0B0C] text-foreground">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[95vh] overflow-hidden flex items-center pt-24 pb-16">
        {/* Background Image with Cinematic Gradient Layers */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero.jpg"
            alt="Luxury Maybach Chauffeur in Mayfair London"
            fill
            className="object-cover object-center scale-105 transition-transform duration-1000 ease-out brightness-[0.42]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0C] via-[#0B0B0C]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0C] via-[#0B0B0C]/70 to-transparent" />
          {/* Subtle Ambient Gold Glow */}
          <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-gold/10 blur-3xl pointer-events-none animate-pulse-glow" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10 w-full py-12">
          <div className="max-w-3xl animate-fade-up">
            {/* Live Status Pill */}
            <div className="inline-flex items-center gap-2.5 rounded-full border border-gold/40 bg-black/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold backdrop-blur-xl mb-6 shadow-gold">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
              <span>🟢 24/7 Chauffeurs Active Across London &amp; UK</span>
            </div>

            <h1 className="font-display text-5xl leading-[1.05] md:text-7xl lg:text-[5.5rem] text-white font-bold tracking-tight">
              A finer way to <span className="text-gradient-gold">arrive.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-xl font-light">
              Oracle Private Hire delivers meticulously chauffeured airport transfers,
              corporate travel, and private hire across the United Kingdom &mdash; 24 hours a day,
              guaranteed fixed fares, always on time.
            </p>

            <div className="mt-10 flex flex-wrap gap-4 items-center">
              <Link
                href="/booking"
                className="rounded-full btn-gold px-9 py-4 text-base font-bold shadow-gold inline-flex items-center gap-2.5 group"
              >
                <span>Get Instant Quote</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/fleet"
                className="rounded-full btn-ghost-gold px-8 py-4 text-base font-semibold inline-flex items-center gap-2"
              >
                <span>Explore Fleet</span>
              </Link>
              <a
                href="tel:07456714214"
                className="hidden sm:inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-gold transition-colors font-mono pl-3"
              >
                <PhoneCall className="h-3.5 w-3.5 text-gold" />
                <span>24/7 Concierge: 07456714214</span>
              </a>
            </div>

            {/* Trust Highlights */}
            <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4 pt-8 border-t border-white/10">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="h-4 w-4 text-gold shrink-0" />
                <span className="text-xs text-foreground/90 font-medium">Licensed TfL Chauffeurs</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="h-4 w-4 text-gold shrink-0" />
                <span className="text-xs text-foreground/90 font-medium">Flight Radar Tracking</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Receipt className="h-4 w-4 text-gold shrink-0" />
                <span className="text-xs text-foreground/90 font-medium">Fixed Prices (No Surge)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Sparkles className="h-4 w-4 text-gold shrink-0" />
                <span className="text-xs text-foreground/90 font-medium">Complimentary Meet &amp; Greet</span>
              </div>
            </div>
          </div>
        </div>

        {/* Floating VIP Card */}
        <div className="pointer-events-none absolute bottom-12 right-12 hidden animate-float-gentle lg:block z-20">
          <div className="glass-panel-gold pointer-events-auto rounded-3xl p-7 text-right border border-gold/40 shadow-2xl">
            <div className="flex items-center justify-end gap-1 text-gold mb-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-gold text-gold" />
              ))}
            </div>
            <p className="text-[10px] uppercase tracking-[0.28em] text-gold font-bold">Heathrow VIP Transfers</p>
            <p className="mt-1 font-display text-4xl text-gradient-gold font-bold">From £45</p>
            <p className="text-xs text-muted-foreground mt-1">Fixed Quote &middot; 60m Free Waiting</p>
          </div>
        </div>
      </section>

      {/* 2. STATS BANNER */}
      <section className="border-y border-white/5 bg-[#0F0F12]">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center md:text-left">
                <p className="font-display text-4xl md:text-5xl font-bold text-gradient-gold">
                  {s.value}
                </p>
                <p className="mt-2 text-xs md:text-sm uppercase tracking-wider text-muted-foreground font-medium">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. AIRPORT TRANSFERS SPOTLIGHT */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="relative overflow-hidden rounded-3xl border border-gold/30 aspect-[4/3] group shadow-2xl">
            <Image
              src="/images/airport.jpg"
              alt="VIP Airport Transfer Chauffeur at London Terminal"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0C] via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl glass-card border border-gold/40">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-gold font-bold">
                    Direct Terminal Meet &amp; Greet
                  </span>
                  <p className="text-lg font-display text-white font-semibold mt-0.5">
                    Live Flight Radar Dispatch
                  </p>
                </div>
                <Link
                  href="/booking?service=airport"
                  className="rounded-full btn-gold px-5 py-2 text-xs font-bold shrink-0"
                >
                  Book Airport
                </Link>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <span className="text-xs uppercase tracking-[0.32em] text-gold font-bold">
                Airport Logistics
              </span>
              <h2 className="mt-2 font-display text-3xl md:text-5xl text-white font-bold leading-tight">
                Seamless arrivals. Zero airport stress.
              </h2>
              <p className="mt-4 text-base text-muted-foreground leading-relaxed">
                Whether you land at Heathrow, Gatwick, London City, or arrive via a private FBO jet,
                our operations team monitors your flight radar in real time. If your flight is early or
                delayed, your chauffeur adjusts automatically.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 pt-2">
              {airportTerminals.map((t) => (
                <div key={t.name} className="glass-card p-4 rounded-2xl border border-white/5">
                  <p className="text-xs font-bold text-white flex items-center justify-between">
                    <span>{t.name}</span>
                    <span className="text-[10px] text-gold font-mono">{t.distance}</span>
                  </p>
                  <p className="text-[11px] text-muted-foreground mt-1">{t.code}</p>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <Link
                href="/airport-transfers"
                className="inline-flex items-center gap-2 text-sm font-semibold text-gold hover:gap-3 transition-all"
              >
                <span>Explore all UK airport transfer guides</span>
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE LUXURY FLEET */}
      <section className="border-t border-white/5 bg-[#0E0E11] py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-14 max-w-3xl">
            <span className="text-xs uppercase tracking-[0.32em] text-gold font-bold">
              The Prestige Fleet
            </span>
            <h2 className="mt-2 font-display text-3xl md:text-5xl text-white font-bold leading-tight">
              Obsidian black luxury, valeted to perfection.
            </h2>
            <p className="mt-4 text-base text-muted-foreground">
              All vehicles are latest models, finished in deep metallic black with privacy glass,
              complimentary high-speed Wi-Fi, and executive seating.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {fleetPreview.map((v) => (
              <article
                key={v.name}
                className="group overflow-hidden rounded-3xl border border-white/5 bg-[#141418] transition-all duration-500 hover:border-gold/50 hover:shadow-2xl flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-black">
                    <Image
                      src={v.image}
                      alt={v.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="rounded-full bg-black/80 border border-gold/40 px-3 py-1 text-[10px] uppercase tracking-widest text-gold backdrop-blur font-bold">
                        {v.tag}
                      </span>
                    </div>
                    <div className="absolute bottom-4 right-4">
                      <span className="rounded-full bg-gold text-ink px-3 py-1 text-xs font-bold shadow-gold">
                        {v.price}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="font-display text-2xl text-white font-bold">{v.name}</h3>
                      <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{v.desc}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs text-foreground/80 pt-2 border-t border-white/5">
                      {v.features.map((f) => (
                        <span key={f} className="inline-flex items-center gap-1.5 text-[11px] text-muted-foreground">
                          <CheckCircle2 className="h-3 w-3 text-gold shrink-0" />
                          <span>{f}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Link
                    href={`/booking?vehicle=${encodeURIComponent(v.name)}`}
                    className="w-full rounded-full btn-gold py-3.5 text-xs font-bold text-center inline-flex items-center justify-center gap-2 shadow-gold"
                  >
                    <span>Reserve This Vehicle</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/fleet"
              className="inline-flex items-center gap-2 rounded-full btn-ghost-gold px-8 py-3.5 text-xs font-semibold"
            >
              <span>View Full Fleet Pricing &amp; Specs</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. FIRST-CLASS CABIN EXPERIENCE */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6 order-2 lg:order-1">
            <div>
              <span className="text-xs uppercase tracking-[0.32em] text-gold font-bold">
                Interior Luxury
              </span>
              <h2 className="mt-2 font-display text-3xl md:text-5xl text-white font-bold leading-tight">
                Your private mobile sanctuary.
              </h2>
              <p className="mt-4 text-base text-muted-foreground leading-relaxed">
                Step into whisper-quiet serenity. Whether preparing for a keynote presentation or
                unwinding after a long transatlantic flight, our cabins are appointed with every executive
                amenity.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 pt-2">
              {cabinAmenities.map((a) => {
                const Icon = a.icon;
                return (
                  <div key={a.title} className="glass-card p-5 rounded-2xl border border-white/5 space-y-2">
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-gold/15 text-gold border border-gold/30">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h4 className="text-xs font-bold text-white">{a.title}</h4>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">{a.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-gold/30 aspect-[4/3] group shadow-2xl order-1 lg:order-2">
            <Image
              src="/images/interior.jpg"
              alt="First class Maybach luxury limousine interior"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0C]/80 via-transparent to-transparent" />
            <div className="absolute top-4 right-4">
              <span className="rounded-full bg-gold text-ink px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider">
                First Class Cabin
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. SERVICES SHOWCASE */}
      <section className="border-t border-white/5 bg-[#0E0E11] py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-16 mx-auto max-w-2xl text-center">
            <span className="text-xs uppercase tracking-[0.32em] text-gold font-bold">
              Chauffeur Services
            </span>
            <h2 className="mt-2 font-display text-3xl md:text-5xl text-white font-bold leading-tight">
              Tailored to your itinerary.
            </h2>
            <p className="mt-4 text-base text-muted-foreground">
              From diplomatic VIP delegations to high-society galas and corporate roadshows.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.title}
                  className="glass-card group rounded-3xl p-7 flex flex-col justify-between transition-all duration-300 hover:border-gold/50 hover:-translate-y-1.5"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="grid h-12 w-12 place-items-center rounded-2xl border border-gold/30 bg-gold/10 text-gold transition-all duration-300 group-hover:bg-gold group-hover:text-ink group-hover:shadow-gold">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="text-[10px] uppercase tracking-widest text-gold font-mono bg-gold/10 px-2.5 py-1 rounded-full border border-gold/30">
                        {s.badge}
                      </span>
                    </div>
                    <h3 className="mt-6 font-display text-xl text-white font-bold">{s.title}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{s.desc}</p>
                  </div>
                  <Link
                    href={s.href}
                    className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gold font-bold transition-all hover:gap-3"
                  >
                    <span>Learn More &amp; Book</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. CLIENT TESTIMONIALS */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <div className="mb-16 mx-auto max-w-2xl text-center">
          <span className="text-xs uppercase tracking-[0.32em] text-gold font-bold">
            Client Accolades
          </span>
          <h2 className="mt-2 font-display text-3xl md:text-5xl text-white font-bold leading-tight">
            Trusted by leaders, families &amp; VIPs.
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <blockquote
              key={t.name}
              className="glass-card flex flex-col justify-between rounded-3xl p-8 border border-white/5 hover:border-gold/30"
            >
              <div>
                <div className="flex gap-1 text-gold">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                  ))}
                </div>
                <p className="mt-5 leading-relaxed text-foreground/90 text-sm italic">
                  &ldquo;{t.text}&rdquo;
                </p>
              </div>
              <footer className="mt-6 border-t border-white/10 pt-5">
                <p className="font-display text-lg text-white font-bold">{t.name}</p>
                <p className="text-[11px] uppercase tracking-widest text-gold mt-0.5">{t.role}</p>
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      {/* 8. BOTTOM CTA BANNER */}
      <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-10">
        <div className="relative overflow-hidden rounded-3xl border border-gold/40 bg-gradient-to-br from-[#1C180E] via-[#141416] to-[#0B0B0C] p-10 md:p-16 shadow-2xl">
          <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-gold/20 blur-3xl pointer-events-none animate-pulse-glow" />
          <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-gold font-bold">
                Instant Online Reservation
              </span>
              <h2 className="font-display text-3xl md:text-5xl text-white font-bold mt-2">
                Reserve your <span className="text-gradient-gold">chauffeur</span> today.
              </h2>
              <p className="mt-4 max-w-md text-muted-foreground text-sm leading-relaxed">
                Instant fixed-price quotes with card or hand cash options. 24/7 UK-wide dispatch with
                immaculate valeted Mercedes vehicles.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end items-center">
              <a
                href="tel:07456714214"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full btn-ghost-gold px-7 py-4 text-sm font-semibold"
              >
                <span>Call 07456714214</span>
              </a>
              <Link
                href="/booking"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full btn-gold px-9 py-4 text-sm font-bold shadow-gold"
              >
                <span>Book Journey Now</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
