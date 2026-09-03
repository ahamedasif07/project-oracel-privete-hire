import Image from "next/image";
import Link from "next/link";
import { Plane, Clock, ShieldCheck, Receipt, Sparkles, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Airport Transfers UK — Heathrow, Gatwick, Stansted, Luton, Manchester",
  description:
    "Fixed-price luxury UK airport transfers with live flight tracking, meet & greet service, 60 minutes free wait time, and executive Mercedes fleet.",
};

export default function AirportTransfersPage() {
  const airports = [
    { name: "London Heathrow (LHR)", terminals: "Terminals 2, 3, 4 & 5", price: "From £55" },
    { name: "London Gatwick (LGW)", terminals: "North & South Terminals", price: "From £65" },
    { name: "London Stansted (STN)", terminals: "Main Terminal & Private Jet Centre", price: "From £70" },
    { name: "London Luton (LTN)", terminals: "Main Terminal & Signature Aviation", price: "From £60" },
    { name: "London City (LCY)", terminals: "Executive Terminal", price: "From £50" },
    { name: "Manchester Airport (MAN)", terminals: "Terminals 1, 2 & 3", price: "From £85" },
    { name: "Birmingham Airport (BHX)", terminals: "Main & Executive", price: "From £75" },
    { name: "Farnborough / Biggin Hill", terminals: "Private Jet Aviation FBOs", price: "From £95" },
  ];

  const steps = [
    {
      icon: Plane,
      title: "Real-Time Flight Tracking",
      desc: "We monitor your flight radar continuously. If your incoming flight is delayed or lands early, your pickup time is updated automatically without extra wait fees.",
    },
    {
      icon: Sparkles,
      title: "Personal Meet & Greet",
      desc: "Your uniformed chauffeur will be positioned in the arrivals hall holding an executive digital nameboard, ready to escort you and handle all luggage.",
    },
    {
      icon: Clock,
      title: "60 Minutes Free Waiting Time",
      desc: "Take your time clearing border control and baggage claim with a complimentary 60 minutes of waiting time included after touchdown on all international flights.",
    },
    {
      icon: Receipt,
      title: "All-Inclusive Fixed Pricing",
      desc: "Our airport transfer quotes include dropoff/pickup terminal toll charges, airport parking, and flight tracking with zero surprise extras.",
    },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative flex min-h-[55vh] items-end overflow-hidden pt-36 pb-16">
        <Image
          src="/images/airport.jpg"
          alt="Airport Transfers"
          fill
          className="object-cover brightness-40"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D]/70 to-transparent" />
        <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-10 z-10">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-gold" />
            <span className="text-xs uppercase tracking-[0.32em] text-gold font-semibold">
              Airport Transfers
            </span>
          </div>
          <h1 className="mt-4 max-w-3xl font-display text-4xl leading-[1.05] text-white md:text-6xl">
            Fly stress-free. We handle every mile.
          </h1>
          <p className="mt-5 max-w-2xl text-base text-muted-foreground md:text-lg">
            Fixed-price airport transfers, real-time flight tracking, and personal meet & greet
            at all UK commercial terminals and private jet FBOs.
          </p>
        </div>
      </section>

      {/* Airports Covered Grid */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <div className="mb-14 max-w-3xl">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-gold" />
            <span className="text-xs uppercase tracking-[0.32em] text-gold font-semibold">
              Airports Covered
            </span>
          </div>
          <h2 className="mt-5 font-display text-3xl leading-tight text-white md:text-5xl">
            Major UK airports & private aviation centres.
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {airports.map((a) => (
            <div
              key={a.name}
              className="glass-card rounded-2xl p-6 border border-white/5 flex flex-col justify-between hover:border-gold/40 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="grid h-8 w-8 place-items-center rounded-lg bg-gold/10 text-gold">
                    <Plane className="h-4 w-4" />
                  </div>
                  <span className="text-xs text-gold font-bold">{a.price}</span>
                </div>
                <h3 className="font-display text-lg text-white font-semibold">{a.name}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{a.terminals}</p>
              </div>
              <Link
                href={`/booking?service=airport&dropoff=${encodeURIComponent(a.name)}`}
                className="mt-6 text-xs font-semibold uppercase tracking-wider text-gold hover:underline flex items-center gap-1"
              >
                <span>Book Transfer</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* How it Works */}
      <div className="border-y border-white/5 bg-[#121212]/70">
        <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <div className="mb-16 mx-auto max-w-2xl text-center">
            <div className="flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-gold" />
              <span className="text-xs uppercase tracking-[0.32em] text-gold font-semibold">
                The Airport Experience
              </span>
            </div>
            <h2 className="mt-5 font-display text-3xl leading-tight text-white md:text-5xl">
              Precision from touchdown to doorstep.
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.title} className="glass-card rounded-3xl p-8 border border-white/5">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl border border-gold/30 bg-gold/10 text-gold mb-6">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-xl text-white font-semibold">{s.title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="glass-card rounded-3xl border border-gold/30 p-10 md:p-14 text-center max-w-3xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl text-white font-semibold">
            Book your fixed-price airport transfer.
          </h2>
          <p className="mt-4 text-muted-foreground text-sm md:text-base">
            Get instant confirmation with flight tracking included. 24/7 customer assistance.
          </p>
          <div className="mt-8 flex justify-center gap-4 flex-wrap">
            <Link
              href="/booking?service=airport"
              className="rounded-full btn-gold px-8 py-3.5 text-sm font-semibold inline-flex items-center gap-2 shadow-gold"
            >
              <span>Instant Airport Booking</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="tel:07456714214"
              className="rounded-full btn-ghost-gold px-8 py-3.5 text-sm font-semibold"
            >
              <span>Call 07456714214</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
