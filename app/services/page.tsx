import Image from "next/image";
import Link from "next/link";
import {
  Plane,
  Car,
  Briefcase,
  MapPin,
  Heart,
  Clock,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chauffeur Services — Airport Transfers, Corporate & Private Hire UK",
  description:
    "Explore our complete range of bespoke chauffeur services across the UK: executive airport transfers, wedding transport, corporate travel, and 24/7 private hire.",
};

export default function ServicesPage() {
  const services = [
    {
      icon: Plane,
      title: "Airport Transfers",
      desc: "Reliable airport pickups and drop-offs with live flight monitoring, meet & greet in arrivals, and luggage handling to Heathrow, Gatwick, Stansted, Luton, London City, and Manchester.",
      features: ["Live Flight Tracking", "Complimentary Meet & Greet", "60 mins Free Airport Wait", "Fixed Upfront Fares"],
    },
    {
      icon: Car,
      title: "Local & City Private Hire",
      desc: "Everyday luxury travel done properly. Smooth and comfortable executive transportation for theatre trips, dining, appointments, and shopping throughout the city.",
      features: ["Short Notice Availability", "Immaculate Black Cars", "Uniformed Professional Drivers", "Contactless & Card Payments"],
    },
    {
      icon: Briefcase,
      title: "Corporate & Executive Travel",
      desc: "Discreet and punctual chauffeur solutions tailored for business leaders, roadshows, board meetings, and corporate VIP guest hospitality.",
      features: ["Corporate Monthly Invoicing", "Wi-Fi & Laptop Charging", "Strict Confidentiality", "Dedicated Chauffeur"],
    },
    {
      icon: MapPin,
      title: "Long Distance & Intercity",
      desc: "Direct nationwide UK transfers without the stress, delays, or overcrowding of public rail transport. Travel door-to-door in serene executive comfort.",
      features: ["Nationwide Coverage", "Fixed Route Pricing", "Complimentary Refreshments", "Bespoke Rest Stops"],
    },
    {
      icon: Heart,
      title: "Wedding & Event Cars",
      desc: "Make your special entrance unforgettable. Our pristine luxury Mercedes fleet is styled with ribbons and chauffeur-driven for brides, grooms, and bridal parties.",
      features: ["Traditional Ribbons Included", "Multi-Vehicle Coordination", "Bridal Party MPVs", "Flexible Itinerary"],
    },
    {
      icon: Clock,
      title: "24/7 By-The-Hour Chauffeur",
      desc: "Enjoy the total flexibility of having a dedicated executive vehicle and chauffeur on standby for as many hours as your schedule requires.",
      features: ["Unlimited Stops", "On-Demand Standby", "Flexible Hourly Hire", "Direct Driver Contact"],
    },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative flex min-h-[55vh] items-end overflow-hidden pt-36 pb-16">
        <Image
          src="/images/hero.jpg"
          alt="Oracle Chauffeur Services"
          fill
          className="object-cover brightness-40"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D]/70 to-transparent" />
        <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-10 z-10">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-gold" />
            <span className="text-xs uppercase tracking-[0.32em] text-gold font-semibold">
              Our Services
            </span>
          </div>
          <h1 className="mt-4 max-w-3xl font-display text-4xl leading-[1.05] text-white md:text-6xl">
            Chauffeured travel, tailored to you.
          </h1>
          <p className="mt-5 max-w-2xl text-base text-muted-foreground md:text-lg">
            From executive airport transfers to bespoke weddings and nationwide long-distance travel,
            every Oracle journey is delivered to an uncompromising standard.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <div className="grid gap-8 md:grid-cols-2">
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <article
                key={s.title}
                className="glass-card rounded-3xl p-8 md:p-10 border border-white/5 flex flex-col justify-between transition-all hover:border-gold/40"
              >
                <div>
                  <div className="flex items-center gap-4">
                    <div className="grid h-14 w-14 place-items-center rounded-2xl border border-gold/30 bg-gold/10 text-gold shadow-sm">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h2 className="font-display text-2xl md:text-3xl text-white font-semibold">{s.title}</h2>
                  </div>
                  <p className="mt-5 text-sm md:text-base leading-relaxed text-muted-foreground">
                    {s.desc}
                  </p>

                  <div className="mt-6 grid grid-cols-2 gap-2.5">
                    {s.features.map((f) => (
                      <div key={f} className="flex items-center gap-2 text-xs md:text-sm text-foreground/90">
                        <CheckCircle className="h-4 w-4 text-gold shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                  <Link
                    href="/booking"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-gold transition-all hover:gap-3"
                  >
                    <span>Book this service</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <span className="text-xs uppercase tracking-widest text-muted-foreground">Fixed Fare</span>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-10">
        <div className="relative overflow-hidden rounded-3xl border border-gold/30 bg-gradient-to-br from-[#1C1A14] via-[#141414] to-[#0D0D0D] p-10 md:p-14 text-center">
          <h2 className="font-display text-3xl md:text-4xl text-white font-semibold">
            Require a custom itinerary or corporate account?
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto text-sm md:text-base">
            Our reservation team is ready 24/7 to structure bespoke chauffeur solutions for multi-city travel and events.
          </p>
          <div className="mt-8 flex justify-center gap-4 flex-wrap">
            <Link
              href="/contact"
              className="rounded-full btn-gold px-8 py-3.5 text-sm font-semibold inline-flex items-center gap-2"
            >
              <span>Speak with Reservations</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="tel:07456714214"
              className="rounded-full btn-ghost-gold px-8 py-3.5 text-sm font-semibold"
            >
              <span>07456714214</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
