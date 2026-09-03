import { Suspense } from "react";
import Image from "next/image";
import { BookingWizard } from "@/components/booking/booking-wizard";
import { Loader2 } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Chauffeur — Instant Fixed-Price Private Hire & Airport Transfer",
  description:
    "Book your executive Mercedes chauffeur or UK airport transfer online in 2 minutes. Fixed prices, instant confirmation, flight tracking, and 24/7 customer support.",
};

export default function BookingPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative flex min-h-[50vh] items-end overflow-hidden pt-36 pb-14">
        <Image
          src="/images/hero.jpg"
          alt="Book Your Chauffeur"
          fill
          className="object-cover brightness-40"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D]/70 to-transparent" />
        <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-10 z-10">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-gold" />
            <span className="text-xs uppercase tracking-[0.32em] text-gold font-semibold">
              Reserve Online
            </span>
          </div>
          <h1 className="mt-4 max-w-3xl font-display text-4xl leading-[1.05] text-white md:text-6xl">
            Book your journey.
          </h1>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
            Complete the form below for an instant fixed-price quote and immediate email confirmation.
          </p>
        </div>
      </section>

      {/* Booking Form Section */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
        <Suspense
          fallback={
            <div className="flex items-center justify-center p-20 text-gold">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          }
        >
          <BookingWizard />
        </Suspense>
      </section>
    </div>
  );
}
