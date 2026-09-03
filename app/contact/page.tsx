"use client";

import { useState } from "react";
import Image from "next/image";
import { Phone, Mail, MessageSquare, AlertCircle, Clock, MapPin, CheckCircle, Send, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { useGlobalLoader } from "@/context/loading-context";

export default function ContactPage() {
  const { showLoader, hideLoader } = useGlobalLoader();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const contacts = [
    {
      icon: Phone,
      label: "Reservations Line",
      value: "07456714214",
      href: "tel:07456714214",
      sub: "Available 24/7 for instant bookings",
    },
    {
      icon: Mail,
      label: "Email Enquiries",
      value: "bookings@oracleprivatehire.co.uk",
      href: "mailto:bookings@oracleprivatehire.co.uk",
      sub: "Average reply time under 15 minutes",
    },
    {
      icon: MessageSquare,
      label: "WhatsApp Chauffeur Desk",
      value: "Chat on WhatsApp",
      href: "https://wa.me/447456714214",
      sub: "Instant messaging & live support",
    },
    {
      icon: AlertCircle,
      label: "Emergency & Airport Duty Line",
      value: "07456714214",
      href: "tel:07456714214",
      sub: "Immediate driver dispatch",
    },
    {
      icon: Clock,
      label: "Operating Hours",
      value: "24 Hours / 365 Days",
      href: null,
      sub: "All holidays & overnight service",
    },
    {
      icon: MapPin,
      label: "Coverage Area",
      value: "United Kingdom &mdash; Nationwide",
      href: null,
      sub: "Airport & long distance specialists",
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    showLoader("Submitting VIP Inquiry...", "Connecting directly with 24/7 chauffeur concierge desk");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to send message.");
      }

      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
      hideLoader();
    }
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative flex min-h-[55vh] items-end overflow-hidden pt-36 pb-16">
        <Image
          src="/images/about.jpg"
          alt="Contact Oracle"
          fill
          className="object-cover brightness-40"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D]/70 to-transparent" />
        <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-10 z-10">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-gold" />
            <span className="text-xs uppercase tracking-[0.32em] text-gold font-semibold">
              Contact Us
            </span>
          </div>
          <h1 className="mt-4 max-w-3xl font-display text-4xl leading-[1.05] text-white md:text-6xl">
            We are here, 24 hours a day.
          </h1>
          <p className="mt-5 max-w-2xl text-base text-muted-foreground md:text-lg">
            Speak directly with our reservations team by phone, email, or WhatsApp — or send us an
            enquiry below and we will respond promptly.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          {/* Left: Contact Info Cards */}
          <div className="space-y-4">
            {contacts.map((c) => {
              const Icon = c.icon;
              const content = (
                <div className="flex items-center gap-4">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-gold/30 bg-gold/10 text-gold shadow-sm">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs uppercase tracking-[0.2em] text-gold font-semibold">
                      {c.label}
                    </p>
                    <p className="mt-0.5 text-base text-white font-medium truncate" dangerouslySetInnerHTML={{ __html: c.value }} />
                    <p className="text-xs text-muted-foreground">{c.sub}</p>
                  </div>
                </div>
              );

              return c.href ? (
                <a
                  key={c.label}
                  href={c.href}
                  className="glass-card block rounded-2xl p-5 border border-white/5 transition-all hover:border-gold/40 hover:-translate-y-0.5"
                >
                  {content}
                </a>
              ) : (
                <div
                  key={c.label}
                  className="glass-card block rounded-2xl p-5 border border-white/5"
                >
                  {content}
                </div>
              );
            })}
          </div>

          {/* Right: Contact Form */}
          <div className="glass-card rounded-3xl p-8 md:p-10 border border-gold/20 shadow-2xl">
            <h2 className="font-display text-2xl md:text-3xl text-white font-semibold mb-2">
              Send us a Message
            </h2>
            <p className="text-sm text-muted-foreground mb-8">
              Fill in your details and journey requirements for a prompt response and bespoke quote.
            </p>

            {success ? (
              <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-8 text-center animate-fade-up">
                <CheckCircle className="h-12 w-12 text-emerald-400 mx-auto mb-4" />
                <h3 className="font-display text-2xl text-white font-semibold">
                  Message Sent Successfully!
                </h3>
                <p className="mt-2 text-sm text-emerald-200/80 max-w-md mx-auto">
                  Thank you. Your message has been saved into our system and an alert has been dispatched to our dispatch team.
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="mt-6 rounded-full btn-gold px-7 py-2.5 text-xs font-semibold"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <div className="p-4 rounded-xl bg-red-950/50 border border-red-800 text-red-300 text-sm">
                    {error}
                  </div>
                )}

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2 font-medium">
                      Full Name *
                    </label>
                    <Input
                      placeholder="e.g. Lord Alexander"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2 font-medium">
                      Phone Number *
                    </label>
                    <Input
                      type="tel"
                      placeholder="e.g. 07456714214"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2 font-medium">
                      Email Address *
                    </label>
                    <Input
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2 font-medium">
                      Subject
                    </label>
                    <Input
                      placeholder="e.g. Heathrow Airport Transfer"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2 font-medium">
                    Your Message &amp; Journey Details *
                  </label>
                  <Textarea
                    rows={5}
                    placeholder="Provide your pickup and dropoff addresses, dates, flight numbers, passenger count, or any custom requirements..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-full btn-gold py-4 text-sm font-semibold shadow-gold inline-flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Map Embed */}
        <div className="mt-16 overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
          <iframe
            title="UK Service Area Map"
            src="https://www.openstreetmap.org/export/embed.html?bbox=-0.489%2C51.28%2C0.236%2C51.686&layer=mapnik&marker=51.5074%2C-0.1278"
            className="h-[400px] w-full border-0 grayscale invert contrast-125 opacity-90"
            loading="lazy"
          />
        </div>
      </section>
    </div>
  );
}
