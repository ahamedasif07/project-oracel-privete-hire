"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Phone, Menu, X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/fleet", label: "Fleet" },
  { href: "/airport-transfers", label: "Airport" },
  { href: "/faqs", label: "FAQs" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Hide public navbar on admin pages
  const isAdmin = pathname.startsWith("/admin");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  if (isAdmin) return null;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-[#0D0D0D]/90 backdrop-blur-xl border-b border-white/5 py-3 shadow-2xl"
          : "bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 lg:px-10">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative flex shrink-0 items-center justify-center transition-transform group-hover:scale-105">
            <Image
              src="/images/oracel-bg-remove2-removebg-preview.png"
              alt="Oracle Private Hire Logo"
              width={100}
              height={55}
              className="h-10 w-auto object-contain md:h-12"
              priority
            />
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => {
            const isActive =
              pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "group relative text-sm font-medium tracking-wide transition-colors hover:text-gold",
                  isActive ? "text-gold" : "text-foreground/80"
                )}
              >
                {link.label}
                <span
                  className={cn(
                    "absolute -bottom-1 left-0 h-0.5 bg-gradient-gold transition-all duration-300",
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  )}
                />
              </Link>
            );
          })}
        </nav>

        {/* Right CTA */}
        <div className="flex items-center gap-4">
          <a
            href="tel:07456714214"
            className="hidden items-center gap-2 text-sm text-foreground/80 transition-colors hover:text-gold md:inline-flex font-medium"
          >
            <div className="grid h-8 w-8 place-items-center rounded-full bg-gold/10 text-gold border border-gold/20">
              <Phone className="h-3.5 w-3.5" />
            </div>
            <span>07456714214</span>
          </a>

          <Link
            href="/booking"
            className="hidden rounded-full btn-gold px-6 py-2.5 text-sm md:inline-flex items-center gap-1.5"
          >
            <span>Book Now</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            className="grid h-11 w-11 place-items-center rounded-full border border-white/10 text-foreground transition-colors hover:border-gold hover:text-gold lg:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-x-0 top-[72px] bottom-0 z-40 overflow-y-auto bg-[#0D0D0D]/98 backdrop-blur-2xl px-6 py-8 flex flex-col justify-between border-t border-white/5 lg:hidden animate-fade-up">
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => {
              const isActive =
                pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "border-b border-white/5 py-4 font-display text-2xl transition-colors hover:text-gold flex items-center justify-between",
                    isActive ? "text-gold font-semibold" : "text-foreground/90"
                  )}
                >
                  <span>{link.label}</span>
                  {isActive && <span className="h-1.5 w-1.5 rounded-full bg-gold" />}
                </Link>
              );
            })}
          </div>

          <div className="pt-8 space-y-3">
            <Link
              href="/booking"
              className="block w-full rounded-full btn-gold py-4 text-center text-base font-semibold"
            >
              Book Your Journey
            </Link>
            <a
              href="tel:07456714214"
              className="flex w-full items-center justify-center gap-2 rounded-full btn-ghost-gold py-3.5 text-sm"
            >
              <Phone className="h-4 w-4" />
              <span>Call 07456714214</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
