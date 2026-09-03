import Image from "next/image";
import Link from "next/link";
import { Users, Briefcase, Wifi, Snowflake, BatteryCharging, Droplet, ArrowRight, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Luxury Fleet — Executive Saloon, MPV & Prestige SUV",
  description:
    "Explore the Oracle Private Hire fleet: Mercedes E-Class Saloon, Mercedes V-Class MPV, and Range Rover SUV. All black, all valeted, all executive.",
};

export default function FleetPage() {
  const vehicles = [
    {
      name: "Executive Saloon",
      tag: "Mercedes-Benz E-Class",
      image: "/images/fleet-executive.jpg",
      seats: 3,
      bags: 2,
      priceFrom: "£45",
      desc: "The gold standard of executive travel — quiet, refined, and aerodynamic. Ideal for individual corporate travellers, couples, and swift airport transfers.",
      amenities: [
        { icon: Snowflake, label: "Dual Climate" },
        { icon: Wifi, label: "Fast Wi-Fi" },
        { icon: BatteryCharging, label: "USB-C Charge" },
        { icon: Droplet, label: "Bottled Water" },
        { icon: ShieldCheck, label: "Privacy Glass" },
      ],
    },
    {
      name: "Luxury MPV",
      tag: "Mercedes-Benz V-Class",
      image: "/images/fleet-mpv.jpg",
      seats: 7,
      bags: 7,
      priceFrom: "£65",
      desc: "Unrivalled group luxury. Configurable face-to-face conference seating, expansive luggage capacity, and whisper-quiet cabin acoustics for executive delegations and family holidays.",
      amenities: [
        { icon: Snowflake, label: "Rear Climate" },
        { icon: Wifi, label: "Fast Wi-Fi" },
        { icon: BatteryCharging, label: "Device Outlets" },
        { icon: Droplet, label: "Refreshments" },
        { icon: Users, label: "Conference Seating" },
      ],
    },
    {
      name: "Prestige SUV",
      tag: "Range Rover",
      image: "/images/fleet-suv.jpg",
      seats: 4,
      bags: 4,
      priceFrom: "£85",
      desc: "Commanding road presence with sanctuary-like interior comfort. Features panoramic glass roof, heated leather massage seats, and supreme British craftsmanship.",
      amenities: [
        { icon: Snowflake, label: "4-Zone Climate" },
        { icon: Wifi, label: "Onboard Wi-Fi" },
        { icon: BatteryCharging, label: "Wireless Charge" },
        { icon: Droplet, label: "Mineral Water" },
        { icon: ShieldCheck, label: "Acoustic Glass" },
      ],
    },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative flex min-h-[55vh] items-end overflow-hidden pt-36 pb-16">
        <Image
          src="/images/interior.jpg"
          alt="Oracle Fleet Interior"
          fill
          className="object-cover brightness-40"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D]/70 to-transparent" />
        <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-10 z-10">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-gold" />
            <span className="text-xs uppercase tracking-[0.32em] text-gold font-semibold">
              The Fleet
            </span>
          </div>
          <h1 className="mt-4 max-w-3xl font-display text-4xl leading-[1.05] text-white md:text-6xl">
            A modern black fleet, immaculately maintained.
          </h1>
          <p className="mt-5 max-w-2xl text-base text-muted-foreground md:text-lg">
            Every vehicle in our fleet is finished in gloss black, valeted before every journey,
            and equipped with premium amenities discerning passengers expect.
          </p>
        </div>
      </section>

      {/* Fleet List */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <div className="space-y-12">
          {vehicles.map((v, idx) => (
            <article
              key={v.name}
              className="grid gap-8 overflow-hidden rounded-3xl border border-white/5 bg-onyx lg:grid-cols-2 lg:items-stretch shadow-xl"
            >
              <div
                className={`relative min-h-[300px] lg:min-h-full ${
                  idx % 2 === 1 ? "lg:order-2" : ""
                }`}
              >
                <Image
                  src={v.image}
                  alt={v.name}
                  fill
                  className="object-cover"
                />
                <span className="absolute top-4 left-4 rounded-full border border-gold/40 bg-[#0D0D0D]/80 px-3 py-1 text-xs uppercase tracking-widest text-gold backdrop-blur">
                  {v.tag}
                </span>
                <span className="absolute bottom-4 right-4 rounded-full border border-gold/40 bg-gold px-4 py-1.5 text-xs uppercase tracking-widest text-ink font-bold shadow-gold">
                  From {v.priceFrom}
                </span>
              </div>

              <div className="flex flex-col justify-center p-8 md:p-12">
                <span className="text-xs uppercase tracking-[0.32em] text-gold font-semibold">
                  {v.tag}
                </span>
                <h2 className="mt-2 font-display text-3xl md:text-4xl text-white font-semibold">
                  {v.name}
                </h2>
                <p className="mt-4 leading-relaxed text-muted-foreground text-sm md:text-base">
                  {v.desc}
                </p>

                {/* Capacity Badges */}
                <div className="mt-6 flex flex-wrap gap-6 text-sm text-foreground/90">
                  <span className="inline-flex items-center gap-2">
                    <Users className="h-4 w-4 text-gold" />
                    <strong>{v.seats}</strong> Passengers
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-gold" />
                    <strong>{v.bags}</strong> Suitcases
                  </span>
                </div>

                {/* Amenities grid */}
                <div className="mt-6 grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                  {v.amenities.map((a) => {
                    const Icon = a.icon;
                    return (
                      <div
                        key={a.label}
                        className="flex flex-col items-center justify-center gap-1.5 rounded-xl border border-white/5 bg-[#0D0D0D]/50 p-3 text-center"
                      >
                        <Icon className="h-4 w-4 text-gold" />
                        <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                          {a.label}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Actions */}
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href={`/booking?vehicle=${encodeURIComponent(v.name)}`}
                    className="rounded-full btn-gold px-7 py-3 text-sm font-semibold inline-flex items-center gap-2 shadow-gold"
                  >
                    <span>Reserve Vehicle</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/contact"
                    className="rounded-full btn-ghost-gold px-7 py-3 text-sm font-semibold"
                  >
                    <span>Custom Enquiry</span>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
