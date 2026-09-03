"use client";

import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { usePathname } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAuthPage =
    pathname === "/admin/login" ||
    pathname === "/admin/forgot-password" ||
    pathname === "/admin/reset-password" ||
    pathname?.startsWith("/admin/forgot-password") ||
    pathname?.startsWith("/admin/reset-password");

  if (isAuthPage) {
    return <main className="min-h-screen bg-[#0A0A0A]">{children}</main>;
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-foreground flex flex-col md:flex-row">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0 min-h-screen overflow-x-hidden">
        {children}
      </div>
    </div>
  );
}

