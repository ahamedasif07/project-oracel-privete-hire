"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Phone, Mail, MapPin, Clock, ArrowRight, ShieldCheck } from "lucide-react";

export function Footer() {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) return null;

  return (
    <footer className="relative mt-24 border-t border-white/5 bg-[#0D0D0D]">
      <div className="absolute inset-x-0 top-0 h-px hairline-gold" />

      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-2 lg:grid-cols-4 lg:px-10">
        {/* Col 1: Brand */}
        <div>
          <Link href="/" className="inline-block">
            <Image
              src="/images/oracel.png"
              alt="Oracle Logo"
              width={120}
              height={60}
              className="h-12 w-auto object-contain"
            />
          </Link>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Oracle Private Hire delivers premium chauffeur and airport transfer
            services across the UK, where every journey is defined by trust, discretion,
            and timeless comfort.
          </p>

          <div className="mt-6 flex items-center gap-2 text-xs text-gold/80">
            <ShieldCheck className="h-4 w-4 text-gold" />
            <span>Licensed Private Hire Operator</span>
          </div>
        </div>

        {/* Col 2: Quick Links */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.28em] text-gold">
            Quick Links
          </h4>
          <ul className="mt-5 space-y-3 text-sm">
            {[
              { label: "About Us", href: "/about" },
              { label: "Our Services", href: "/services" },
              { label: "The Fleet", href: "/fleet" },
              { label: "Airport Transfers", href: "/airport-transfers" },
              { label: "Book a Chauffeur", href: "/booking" },
              { label: "Frequently Asked Questions", href: "/faqs" },
              { label: "Contact Us", href: "/contact" },
            ].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-muted-foreground transition-colors hover:text-gold flex items-center gap-1.5 group"
                >
                  <span className="text-gold opacity-0 -ml-3 transition-all duration-200 group-hover:opacity-100 group-hover:ml-0">
                    &rsaquo;
                  </span>
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: Contact */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.28em] text-gold">
            Contact & Support
          </h4>
          <ul className="mt-5 space-y-4 text-sm text-muted-foreground">
            <li className="flex items-start gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <a href="tel:07456714214" className="hover:text-gold transition-colors">
                07456714214
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <a
                href="mailto:bookings@oracleprivatehire.co.uk"
                className="hover:text-gold transition-colors break-all"
              >
                bookings@oracleprivatehire.co.uk
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <span>United Kingdom &mdash; Nationwide 24/7 Service</span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <span>Available 24 hours a day, 365 days</span>
            </li>
          </ul>
        </div>

        {/* Col 4: Reservation Box */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.28em] text-gold">
            Reserve Online
          </h4>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
            Get an instant fixed-price quote and secure your executive transfer in under two minutes.
          </p>
          <div className="mt-6">
            <Link
              href="/booking"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full btn-gold px-6 py-3.5 text-sm font-semibold"
            >
              <span>Instant Booking</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-6 p-4 rounded-xl border border-white/5 bg-onyx/50 text-xs text-muted-foreground">
            <p className="text-white font-medium mb-1">Corporate Accounts</p>
            <p>Flexible invoicing & dedicated account management available.</p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5 py-6 text-xs text-muted-foreground">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 md:flex-row lg:px-10">
          <p>
            &copy; {new Date().getFullYear()} Oracle Private Hire. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/faqs" className="hover:text-gold transition-colors">
              Terms & Conditions
            </Link>
            <Link href="/contact" className="hover:text-gold transition-colors">
              Privacy Policy
            </Link>
            <Link href="/admin/login" className="hover:text-gold text-white/30 transition-colors">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
