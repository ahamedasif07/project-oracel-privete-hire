import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Clock, Award, Star, Check, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us — Luxury Chauffeur & Private Hire UK",
  description:
    "Learn about Oracle Private Hire, our decade-long story of premium chauffeur service, vetted licensed drivers, and uncompromising commitment to luxury.",
};

export default function AboutPage() {
  const values = [
    {
      title: "Integrity",
      desc: "Transparent, upfront fixed pricing with zero surge fees and total honesty on every journey.",
    },
    {
      title: "Safety First",
      desc: "Enhanced DBS-checked chauffeurs and meticulously maintained, late-model Mercedes vehicles.",
    },
    {
      title: "Reliability",
      desc: "Punctuality is our core promise. We arrive early, track flights live, and never keep you waiting.",
    },
    {
      title: "Professionalism",
      desc: "Immaculately suited chauffeurs trained in executive protocol, defensive driving, and utmost discretion.",
    },
    {
      title: "Client Care",
      desc: "Tailored journeys with complimentary mineral water, device charging, and bespoke route preferences.",
    },
    {
      title: "Unmatched Luxury",
      desc: "A first-class experience comes standard on every single private hire and airport transfer.",
    },
  ];

  const driverQualifications = [
    "Fully licensed and PCO registered by UK licensing authorities",
    "Enhanced DBS background check and medical clearances",
    "Minimum 5+ years executive chauffeur driving experience",
    "Uniformed, impeccably presented, and courteous at all times",
    "Strict non-disclosure confidentiality standards for VIP clients",
    "Comprehensive geographical knowledge of London & all UK motorway networks",
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative flex min-h-[55vh] items-end overflow-hidden pt-36 pb-16">
        <Image
          src="/images/about.jpg"
          alt="About Oracle Private Hire"
          fill
          className="object-cover brightness-40"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D]/70 to-transparent" />
        <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-10 z-10">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-gold" />
            <span className="text-xs uppercase tracking-[0.32em] text-gold font-semibold">
              About Oracle
            </span>
          </div>
          <h1 className="mt-4 max-w-3xl font-display text-4xl leading-[1.05] text-white md:text-6xl">
            A decade of the finer way to travel.
          </h1>
          <p className="mt-5 max-w-2xl text-base text-muted-foreground md:text-lg">
            Founded on a single conviction — that private hire should feel like a bespoke private service.
            Today, Oracle chauffeurs thousands of business leaders, families, and global travellers across the UK.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <div className="mb-14 max-w-3xl">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-gold" />
            <span className="text-xs uppercase tracking-[0.32em] text-gold font-semibold">
              Our Story
            </span>
          </div>
          <h2 className="mt-5 font-display text-3xl leading-tight text-white md:text-5xl">
            Built on trust, driven by standards.
          </h2>
        </div>

        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6 text-muted-foreground leading-relaxed text-sm md:text-base">
            <p>
              Oracle Private Hire was established with a clear mission: to raise the standard of what a
              private hire service could feel like. What began with a single executive saloon has grown
              into a modern, all-black chauffeur fleet operated exclusively by licensed, career drivers.
            </p>
            <p>
              Today, we are the trusted transport partner for corporate executives, frequent flyers,
              wedding parties, and travellers who simply expect more from their journeys.
            </p>
            <p>
              We never apply surge pricing, never subcontract to unvetted drivers, and never compromise on
              the standard of vehicle you step into. Every fare is fixed. Every driver is ours. Every ride
              is our reputation.
            </p>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-white/10 aspect-[4/3]">
            <Image
              src="/images/interior.jpg"
              alt="Luxury car interior"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <div className="border-y border-white/5 bg-[#121212]/70">
        <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <div className="mb-14 mx-auto max-w-2xl text-center">
            <div className="flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-gold" />
              <span className="text-xs uppercase tracking-[0.32em] text-gold font-semibold">
                Mission &amp; Values
              </span>
            </div>
            <h2 className="mt-5 font-display text-3xl leading-tight text-white md:text-5xl">
              What we stand for.
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v) => (
              <div
                key={v.title}
                className="glass-card rounded-2xl p-8 border border-white/5 transition-all hover:border-gold/40"
              >
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-gold/10 text-gold border border-gold/20">
                  <Award className="h-5 w-5" />
                </div>
                <h3 className="mt-6 font-display text-xl text-white font-semibold">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Driver Standards */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <div className="mb-14 max-w-3xl">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-gold" />
            <span className="text-xs uppercase tracking-[0.32em] text-gold font-semibold">
              Our Chauffeurs
            </span>
          </div>
          <h2 className="mt-5 font-display text-3xl leading-tight text-white md:text-5xl">
            The professionals behind the wheel.
          </h2>
        </div>

        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
            Every Oracle chauffeur is vetted, DBS-checked, and rigorously trained in executive customer
            service, smooth defensive driving, and confidential discretion. Arriving in dark tailored suits,
            our chauffeurs ensure your journey is calm, comfortable, and uninterrupted.
          </p>

          <ul className="space-y-4">
            {driverQualifications.map((point) => (
              <li key={point} className="flex items-start gap-3 text-sm md:text-base text-foreground/90">
                <div className="grid h-5 w-5 place-items-center rounded-full bg-gold/15 text-gold shrink-0 mt-0.5">
                  <Check className="h-3.5 w-3.5" />
                </div>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-10">
        <div className="glass-card rounded-3xl p-10 md:p-14 text-center max-w-3xl mx-auto border border-gold/30">
          <h2 className="font-display text-3xl md:text-4xl text-white font-semibold">
            Experience the Oracle difference.
          </h2>
          <p className="mt-4 text-muted-foreground text-sm md:text-base">
            Book your next airport transfer or business journey with guaranteed fixed fares.
          </p>
          <div className="mt-8 flex justify-center gap-4 flex-wrap">
            <Link
              href="/booking"
              className="rounded-full btn-gold px-8 py-3.5 text-sm font-semibold inline-flex items-center gap-2"
            >
              <span>Book Online</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="rounded-full btn-ghost-gold px-8 py-3.5 text-sm font-semibold"
            >
              <span>Contact Us</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
