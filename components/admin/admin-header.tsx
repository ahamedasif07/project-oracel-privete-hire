"use client";

import { Bell, ShieldCheck } from "lucide-react";

interface AdminHeaderProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
}

export function AdminHeader({ title, description, children }: AdminHeaderProps) {
  return (
    <header className="border-b border-white/5 bg-[#0D0D0D]/80 backdrop-blur-md px-8 py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h1 className="font-display text-2xl font-bold text-white">{title}</h1>
        {description && (
          <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
        )}
      </div>

      <div className="flex items-center gap-4">
        {children}
        <div className="flex items-center gap-3 pl-4 border-l border-white/10">
          <div className="h-8 w-8 rounded-full bg-gold/15 text-gold border border-gold/30 flex items-center justify-center font-bold text-xs">
            OP
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-xs font-semibold text-white">Oracle Chauffeur Desk</p>
            <p className="text-[10px] text-gold flex items-center gap-1">
              <ShieldCheck className="h-3 w-3" />
              <span>Super Administrator</span>
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
