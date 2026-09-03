import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: {
    default: "Oracle Private Hire — Luxury Chauffeur & Airport Transfers UK",
    template: "%s | Oracle Private Hire",
  },
  description:
    "Executive chauffeur and fixed-fare airport transfers across the UK. 24/7 licensed drivers, Mercedes fleet, transparent pricing, and instant confirmation.",
  keywords: [
    "chauffeur service UK",
    "airport transfers London",
    "executive car hire",
    "Heathrow airport taxi",
    "Gatwick transfer",
    "Mercedes chauffeur",
    "corporate travel",
    "Oracle Private Hire",
  ],
  authors: [{ name: "Oracle Private Hire" }],
  openGraph: {
    title: "Oracle Private Hire — Luxury Chauffeur & Airport Transfers UK",
    description:
      "Executive chauffeur and fixed-fare airport transfers across the UK. 24/7 licensed drivers, luxury Mercedes fleet, and fixed pricing.",
    type: "website",
    locale: "en_GB",
    siteName: "Oracle Private Hire",
  },
  icons: {
    icon: "/images/oracel.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="min-h-screen bg-[#0D0D0D] text-foreground antialiased selection:bg-gold selection:text-ink">
        <Navbar />
        <main className="relative min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
