"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  CalendarCheck,
  Mail,
  Car,
  Settings,
  LogOut,
  ExternalLink,
  Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/bookings", label: "Bookings", icon: CalendarCheck },
  { href: "/admin/messages", label: "Contact Inbox", icon: Mail },
  { href: "/admin/fleet", label: "Fleet Vehicles", icon: Car },
  { href: "/admin/settings", label: "SMTP & Settings", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <aside className="w-64 shrink-0 border-r border-white/5 bg-[#0D0D0D] flex flex-col justify-between p-5 min-h-screen">
      <div>
        {/* Brand */}
        <div className="pb-6 border-b border-white/5">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/oracel-bg-remove2-removebg-preview.png"
              alt="Oracle Logo"
              width={100}
              height={50}
              className="h-10 w-auto object-contain"
            />
          </Link>
          <div className="mt-3 flex items-center gap-1.5 text-[11px] uppercase tracking-widest text-gold font-semibold">
            <Shield className="h-3.5 w-3.5" />
            <span>Admin Control Panel</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-6 space-y-1.5">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium transition-all",
                  isActive
                    ? "bg-gold/15 text-gold border border-gold/30 shadow-sm"
                    : "text-muted-foreground hover:bg-white/5 hover:text-white"
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom links */}
      <div className="pt-6 border-t border-white/5 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs text-muted-foreground hover:bg-white/5 hover:text-white transition-colors"
        >
          <span className="flex items-center gap-2">
            <ExternalLink className="h-3.5 w-3.5 text-gold" />
            <span>View Public Site</span>
          </span>
          <span className="text-[10px] uppercase bg-white/10 px-1.5 py-0.5 rounded">Live</span>
        </Link>

        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs text-rose-400 hover:bg-rose-950/40 hover:text-rose-300 transition-colors"
        >
          <LogOut className="h-3.5 w-3.5" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
