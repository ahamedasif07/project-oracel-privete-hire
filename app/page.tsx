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
} from "lucide-react";

export default function HomePage() {
  const stats = [
    { value: "13+", label: "Years in Service" },
    { value: "50k+", label: "Journeys Completed" },
    { value: "4.9★", label: "Average Rating" },
    { value: "24/7", label: "On The Road" },
  ];

  const services = [
    {
      icon: Plane,
      title: "Airport Transfers",
      desc: "Flight monitoring, personal meet & greet at arrivals, fixed fares.",
      href: "/airport-transfers",
    },
    {
      icon: Briefcase,
      title: "Corporate Travel",
      desc: "Discreet and punctual executive travel for VIPs and meetings.",
      href: "/services",
    },
    {
      icon: MapPin,
      title: "Long Distance",
      desc: "Nationwide UK travel in peaceful, limousine-grade comfort.",
      href: "/services",
    },
    {
      icon: PartyPopper,
      title: "Event Transport",
      desc: "Group arrivals in style for galas, races, concerts and functions.",
      href: "/services",
    },
    {
      icon: Heart,
      title: "Wedding Cars",
      desc: "Immaculate ribbons and luxury Mercedes cars for your special day.",
      href: "/services",
    },
    {
      icon: Crown,
      title: "Executive Transfers",
      desc: "For discerning clients who demand flawless standards.",
      href: "/services",
    },
    {
      icon: ShieldCheck,
      title: "Private Hire 24/7",
      desc: "Reliable around-the-clock service whenever you need it.",
      href: "/services",
    },
    {
      icon: Car,
      title: "Hourly Chauffeur",
      desc: "Have a dedicated driver on standby for multi-stop itineraries.",
      href: "/booking",
    },
  ];

  const fleetPreview = [
    {
      name: "Executive Saloon",
      tag: "Mercedes-Benz E-Class",
      image: "/images/fleet-executive.jpg",
      seats: 3,
      bags: 2,
      desc: "Refined, quiet, and timeless elegance for executive travel and airport runs.",
    },
    {
      name: "Luxury MPV",
      tag: "Mercedes-Benz V-Class",
      image: "/images/fleet-mpv.jpg",
      seats: 7,
      bags: 7,
      desc: "Spacious conference seating and extensive luggage room for families & delegations.",
    },
    {
      name: "Prestige SUV",
      tag: "Range Rover",
      image: "/images/fleet-suv.jpg",
      seats: 4,
      bags: 4,
      desc: "Commanding presence with whisper-quiet ride and first-class leather interior.",
    },
  ];

  const trustBadges = [
    { icon: ShieldCheck, label: "Fully Licensed & Insured" },
    { icon: CheckCircle2, label: "Enhanced DBS Checked Drivers" },
    { icon: Clock, label: "24/7 UK-Wide Availability" },
    { icon: Receipt, label: "Guaranteed Fixed Pricing" },
    { icon: Plane, label: "Live Flight Tracking" },
    { icon: Sparkles, label: "Complimentary Meet & Greet" },
  ];

  const testimonials = [
    {
      name: "James Whitfield",
      role: "Frequent Flyer — Heathrow Transfer",
      text: "Immaculate car, discreet driver, and on time to the exact minute. Oracle has become our non-negotiable choice for all airport transfers.",
    },
    {
      name: "Sophia Lang",
      role: "Corporate Executive",
      text: "The most dependable private hire company we have ever used across the UK. Uniformed chauffeurs and spotless vehicles every single time.",
    },
    {
      name: "Mr. & Mrs. Ahmed",
      role: "Wedding & Event Booking",
      text: "They made our wedding day travel completely effortless and stress-free. Truly a first-class chauffeur experience with royal attention to detail.",
    },
  ];

  return (
    <div>
      {/* 1. HERO SECTION */}
      <section className="relative min-h-screen overflow-hidden flex items-center pt-24 pb-16">
        {/* Background Image with Dark & Gold Overlays */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero.jpg"
            alt="Luxury chauffeur vehicle at night"
            fill
            className="object-cover object-center brightness-[0.45]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D0D]/90 via-[#0D0D0D]/50 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10 w-full py-12">
          <div className="max-w-3xl animate-fade-up">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-xs uppercase tracking-[0.24em] text-gold backdrop-blur-md mb-6">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Executive Private Hire &middot; Nationwide UK</span>
            </div>

            <h1 className="font-display text-5xl leading-[1.05] md:text-7xl lg:text-[5.25rem] text-white">
              A finer way to <span className="text-gradient-gold">arrive.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-xl">
              Oracle Private Hire delivers meticulously chauffeured airport transfers,
              corporate travel, and private hire across the United Kingdom &mdash; 24 hours a day,
              fixed fares, always on time.
            </p>

            <div className="mt-10 flex flex-wrap gap-4 items-center">
              <Link
                href="/booking"
                className="rounded-full btn-gold px-8 py-4 text-base font-semibold shadow-gold inline-flex items-center gap-2 group"
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
            </div>

            {/* Quick trust metrics */}
            <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4 pt-8 border-t border-white/10">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="h-4 w-4 text-gold shrink-0" />
                <span className="text-xs text-foreground/90 font-medium">Licensed Drivers</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="h-4 w-4 text-gold shrink-0" />
                <span className="text-xs text-foreground/90 font-medium">24/7 Availability</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Plane className="h-4 w-4 text-gold shrink-0" />
                <span className="text-xs text-foreground/90 font-medium">Flight Monitored</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Receipt className="h-4 w-4 text-gold shrink-0" />
                <span className="text-xs text-foreground/90 font-medium">Guaranteed Fixed Fare</span>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Quote Badge */}
        <div className="pointer-events-none absolute bottom-12 right-12 hidden animate-float lg:block z-20">
          <div className="glass-card pointer-events-auto rounded-2xl p-6 text-right border border-gold/30">
            <p className="text-xs uppercase tracking-[0.28em] text-gold font-medium">Airport Transfers</p>
            <p className="mt-1 font-display text-4xl text-gradient-gold font-bold">From £45</p>
            <p className="text-xs text-muted-foreground mt-1">Fixed Price &middot; No Surge Fares</p>
          </div>
        </div>
      </section>

      {/* 2. ABOUT INTRO */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <div className="mb-14 max-w-3xl">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-gold" />
            <span className="text-xs uppercase tracking-[0.32em] text-gold font-semibold">
              Who We Are
            </span>
          </div>
          <h2 className="mt-5 font-display text-3xl leading-tight text-white md:text-5xl">
            Chauffeur service, redefined for the discerning traveller.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
            For over a decade, Oracle Private Hire has been the benchmark in executive ground
            transportation — combining an immaculate modern black fleet, certified professional drivers,
            and an unwavering commitment to discretion and punctuality.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 aspect-[4/3] group">
            <Image
              src="/images/about.jpg"
              alt="Chauffeur opening door"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D]/80 via-transparent to-transparent" />
          </div>

          <div>
            <div className="grid grid-cols-2 gap-8">
              {stats.map((s) => (
                <div key={s.label} className="glass-card p-6 rounded-2xl border border-white/5">
                  <p className="font-display text-4xl text-gradient-gold font-bold">{s.value}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </div>

            <p className="mt-8 leading-relaxed text-muted-foreground text-sm md:text-base">
              Every Oracle journey begins the same way: a courteous, uniformed driver, an immaculately
              detailed vehicle, complimentary mineral water, and an obsession with your schedule. Whether
              it is an early morning international flight or a private evening dinner, our standards
              never waver.
            </p>

            <div className="mt-8">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-sm font-semibold text-gold transition-all hover:gap-3"
              >
                <span>Read our full story</span>
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SERVICES SECTION */}
      <div className="border-y border-white/5 bg-[#121212]/70">
        <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
          <div className="mb-16 mx-auto max-w-2xl text-center">
            <div className="flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-gold" />
              <span className="text-xs uppercase tracking-[0.32em] text-gold font-semibold">
                Our Services
              </span>
            </div>
            <h2 className="mt-5 font-display text-3xl leading-tight text-white md:text-5xl">
              Every journey, elevated.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              From executive airport transfers to bespoke wedding transport, we tailor every ride to
              the highest standard of British hospitality.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.title}
                  className="glass-card group rounded-2xl p-7 flex flex-col justify-between transition-all duration-300 hover:border-gold/40 hover:-translate-y-1"
                >
                  <div>
                    <div className="grid h-12 w-12 place-items-center rounded-xl border border-gold/30 bg-gold/5 text-gold transition-all duration-300 group-hover:bg-gold group-hover:text-ink group-hover:shadow-gold">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-6 font-display text-xl text-white font-semibold">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                  </div>
                  <Link
                    href={s.href}
                    className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gold font-semibold transition-all hover:gap-3"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* 4. FLEET PREVIEW */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <div className="mb-14 max-w-3xl">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-gold" />
            <span className="text-xs uppercase tracking-[0.32em] text-gold font-semibold">
              The Fleet
            </span>
          </div>
          <h2 className="mt-5 font-display text-3xl leading-tight text-white md:text-5xl">
            A modern black fleet, immaculately maintained.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
            Choose from executive saloons, luxury MPVs and prestige SUVs — all finished in black,
            with rich leather interiors, dual climate control, and high-speed Wi‑Fi.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {fleetPreview.map((v) => (
            <article
              key={v.name}
              className="group overflow-hidden rounded-3xl border border-white/5 bg-onyx transition-all duration-300 hover:border-gold/40 hover:shadow-elegant flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[4/3] overflow-hidden bg-black">
                  <Image
                    src={v.image}
                    alt={v.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 rounded-full border border-gold/40 bg-[#0D0D0D]/80 px-3 py-1 text-[10px] uppercase tracking-widest text-gold backdrop-blur">
                    {v.tag}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-2xl text-white font-semibold">{v.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
                  <div className="mt-5 flex flex-wrap gap-4 text-xs text-muted-foreground border-t border-white/5 pt-4">
                    <span className="inline-flex items-center gap-1.5 text-foreground/90">
                      <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                      {v.seats} Passengers
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-foreground/90">
                      <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                      {v.bags} Luggage Bags
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  href="/booking"
                  className="w-full rounded-full btn-ghost-gold py-3 text-sm font-semibold text-center inline-flex items-center justify-center gap-2"
                >
                  <span>Book This Vehicle</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/fleet"
            className="inline-flex items-center gap-2 rounded-full btn-gold px-8 py-3.5 text-sm font-semibold"
          >
            <span>View Full Fleet Specifications</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* 5. WHY CHOOSE ORACLE */}
      <div className="border-y border-white/5 bg-[#121212]/70">
        <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
          <div className="mb-16 mx-auto max-w-2xl text-center">
            <div className="flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-gold" />
              <span className="text-xs uppercase tracking-[0.32em] text-gold font-semibold">
                Why Oracle
              </span>
            </div>
            <h2 className="mt-5 font-display text-3xl leading-tight text-white md:text-5xl">
              Reasons discerning clients choose us.
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {trustBadges.map((t) => {
              const Icon = t.icon;
              return (
                <div
                  key={t.label}
                  className="glass-card flex flex-col items-center justify-center rounded-2xl p-6 text-center"
                >
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-gold/10 text-gold mb-4 border border-gold/20">
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="text-xs uppercase tracking-wider text-foreground/90 font-medium leading-relaxed">
                    {t.label}
                  </p>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* 6. TESTIMONIALS */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <div className="mb-16 mx-auto max-w-2xl text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-gold" />
            <span className="text-xs uppercase tracking-[0.32em] text-gold font-semibold">
              Client Testimonials
            </span>
          </div>
          <h2 className="mt-5 font-display text-3xl leading-tight text-white md:text-5xl">
            Trusted by executives, families and travellers.
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <blockquote
              key={t.name}
              className="glass-card flex flex-col justify-between rounded-3xl p-8 border border-white/5"
            >
              <div>
                <div className="flex gap-1 text-gold">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                  ))}
                </div>
                <p className="mt-5 leading-relaxed text-foreground/90 text-sm md:text-base italic">
                  &ldquo;{t.text}&rdquo;
                </p>
              </div>
              <footer className="mt-6 border-t border-white/10 pt-5">
                <p className="font-display text-lg text-white font-semibold">{t.name}</p>
                <p className="text-xs uppercase tracking-widest text-gold/80 mt-0.5">{t.role}</p>
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      {/* 7. CTA BANNER */}
      <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-10">
        <div className="relative overflow-hidden rounded-3xl border border-gold/30 bg-gradient-to-br from-[#1C1A14] via-[#141414] to-[#0D0D0D] p-10 md:p-16 shadow-2xl">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gold/15 blur-3xl pointer-events-none" />
          <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="font-display text-3xl md:text-5xl text-white">
                Reserve your <span className="text-gradient-gold">chauffeur</span>.
              </h2>
              <p className="mt-4 max-w-md text-muted-foreground text-sm md:text-base">
                Instant fixed-price quotes in under two minutes. Nationwide UK coverage, licensed drivers,
                24 hours a day.
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
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full btn-gold px-8 py-4 text-sm font-semibold shadow-gold"
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
