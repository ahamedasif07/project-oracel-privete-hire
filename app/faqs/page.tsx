"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, Minus, HelpCircle, Phone, ArrowRight } from "lucide-react";

export default function FaqsPage() {
  const [openIndex, setOpenIndex] = useState<string | null>("Booking-0");

  const groups = [
    {
      category: "Booking & Reservations",
      items: [
        {
          q: "How do I book an executive transfer?",
          a: "You can book directly online using our interactive booking wizard for instant price quotes and email confirmation. Alternatively, call us 24/7 on 07456714214, or message us via WhatsApp.",
        },
        {
          q: "How far in advance should I make a reservation?",
          a: "We recommend booking at least 12 to 24 hours in advance to guarantee your preferred vehicle model, especially during peak airport hours and holidays. However, we also cater to short-notice and urgent same-day bookings.",
        },
        {
          q: "Will I receive a booking confirmation?",
          a: "Yes. Immediately upon submitting your booking, an automated confirmation email with your unique reference code (e.g. ORC-89214) and journey itinerary will be dispatched to your inbox.",
        },
      ],
    },
    {
      category: "Airport Transfers & Flights",
      items: [
        {
          q: "What happens if my inbound flight is delayed?",
          a: "We monitor all flight numbers in real-time via live aviation radar. If your flight is delayed or lands early, your chauffeur will automatically adjust your pickup time with zero penalty or waiting surcharges.",
        },
        {
          q: "How does the airport Meet & Greet service work?",
          a: "Your chauffeur will wait inside the arrivals hall holding an executive digital signboard displaying your name. They will assist with your suitcases and escort you directly to your waiting vehicle.",
        },
        {
          q: "How much airport waiting time is included free?",
          a: "All airport arrivals include 60 minutes of complimentary waiting time starting from when your aircraft touches down, giving you ample time to clear passport control and luggage retrieval.",
        },
      ],
    },
    {
      category: "Vehicles & Luggage",
      items: [
        {
          q: "How many passengers and luggage items can your vehicles carry?",
          a: "Executive Saloons accommodate up to 3 passengers and 2 large suitcases. Luxury MPVs (Mercedes V-Class) seat up to 7 passengers with 7 large suitcases. Prestige SUVs seat up to 4 passengers with 4 suitcases.",
        },
        {
          q: "Do you supply child safety and booster seats?",
          a: "Yes. Baby seats, toddler seats, and booster seats can be requested directly in the booking form free of charge for child safety.",
        },
        {
          q: "Are all vehicles non-smoking and sanitized?",
          a: "Yes, 100%. We have a strict non-smoking policy and all vehicles are valeted and sanitized prior to each customer collection.",
        },
      ],
    },
    {
      category: "Pricing & Payment",
      items: [
        {
          q: "Are the prices fixed or metered?",
          a: "All Oracle quotes are 100% fixed fares upfront. The price you see is the price you pay — no surge charges, no traffic meter escalations, and no hidden airport dropoff fees.",
        },
        {
          q: "What payment methods do you accept?",
          a: "We accept all major credit and debit cards (Visa, Mastercard, American Express), Apple Pay, cash directly to the chauffeur, and corporate B2B invoicing for registered account clients.",
        },
        {
          q: "What is your cancellation policy?",
          a: "Free cancellation is provided up to 4 hours prior to scheduled pickup for local transfers, and up to 12 hours for specialized wedding and hourly bookings.",
        },
      ],
    },
  ];

  const toggle = (id: string) => {
    setOpenIndex(openIndex === id ? null : id);
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative flex min-h-[55vh] items-end overflow-hidden pt-36 pb-16">
        <Image
          src="/images/interior.jpg"
          alt="FAQs"
          fill
          className="object-cover brightness-40"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D]/70 to-transparent" />
        <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-10 z-10">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-gold" />
            <span className="text-xs uppercase tracking-[0.32em] text-gold font-semibold">
              Help Centre
            </span>
          </div>
          <h1 className="mt-4 max-w-3xl font-display text-4xl leading-[1.05] text-white md:text-6xl">
            Frequently asked questions.
          </h1>
          <p className="mt-5 max-w-2xl text-base text-muted-foreground md:text-lg">
            Everything you need to know about our chauffeur fleet, airport transfers, fixed pricing,
            and booking policies.
          </p>
        </div>
      </section>

      {/* FAQs list */}
      <section className="mx-auto max-w-5xl px-6 py-20 lg:px-10 lg:py-28">
        <div className="space-y-14">
          {groups.map((g) => (
            <div key={g.category}>
              <div className="flex items-center gap-3 mb-6">
                <span className="h-px w-8 bg-gold" />
                <h2 className="font-display text-2xl md:text-3xl text-white font-semibold">
                  {g.category}
                </h2>
              </div>

              <div className="divide-y divide-white/5 rounded-2xl border border-white/5 bg-onyx overflow-hidden shadow-lg">
                {g.items.map((item, idx) => {
                  const itemId = `${g.category}-${idx}`;
                  const isOpen = openIndex === itemId;

                  return (
                    <div key={item.q}>
                      <button
                        onClick={() => toggle(itemId)}
                        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-white/[0.02]"
                      >
                        <span className="font-medium text-foreground/95 text-base md:text-lg">
                          {item.q}
                        </span>
                        <div
                          className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-all ${
                            isOpen
                              ? "border-gold bg-gold text-ink"
                              : "border-gold/40 text-gold bg-gold/5"
                          }`}
                        >
                          {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                        </div>
                      </button>

                      {isOpen && (
                        <div className="px-6 pb-6 pt-1 text-sm md:text-base leading-relaxed text-muted-foreground animate-fade-up">
                          {item.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Still have questions */}
      <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-10">
        <div className="glass-card rounded-3xl border border-gold/30 p-10 md:p-14 text-center max-w-3xl mx-auto">
          <HelpCircle className="h-12 w-12 text-gold mx-auto mb-4" />
          <h2 className="font-display text-3xl md:text-4xl text-white font-semibold">
            Have a question not listed here?
          </h2>
          <p className="mt-3 text-muted-foreground text-sm md:text-base">
            Our 24/7 reservations team is ready to answer any custom inquiries immediately.
          </p>
          <div className="mt-8 flex justify-center gap-4 flex-wrap">
            <Link
              href="/contact"
              className="rounded-full btn-gold px-8 py-3.5 text-sm font-semibold inline-flex items-center gap-2 shadow-gold"
            >
              <span>Contact Us</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="tel:07456714214"
              className="rounded-full btn-ghost-gold px-8 py-3.5 text-sm font-semibold inline-flex items-center gap-2"
            >
              <Phone className="h-4 w-4" />
              <span>07456714214</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
