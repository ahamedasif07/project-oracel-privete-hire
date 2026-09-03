"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, User, Loader2, ShieldCheck, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/admin";

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim() || !password.trim()) {
      setError("Please enter your username/email and password.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: identifier.trim(), password: password.trim() }),
      });

      let data: any = {};
      try {
        data = await res.json();
      } catch {
        if (!res.ok) {
          throw new Error(`Server returned status ${res.status}`);
        }
      }

      if (!res.ok) {
        throw new Error(data.error || "Invalid username/email or password.");
      }

      router.push(redirectPath);
      router.refresh();
    } catch (err: any) {
      console.error("Login attempt failed:", err);
      if (err.message && err.message.includes("fetch")) {
        setError("Unable to connect to the server. Please ensure database connection is active.");
      } else {
        setError(err.message || "Failed to sign in. Please verify your credentials.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-gold/10 blur-3xl pointer-events-none" />

      <div className="w-full max-w-md glass-card rounded-3xl p-8 md:p-10 border border-gold/30 shadow-2xl relative z-10 animate-fade-up">
        <div className="text-center mb-8">
          <Image
            src="/images/oracel-bg-remove2-removebg-preview.png"
            alt="Oracle Logo"
            width={120}
            height={60}
            className="h-12 w-auto object-contain mx-auto mb-4"
          />
          <span className="text-[11px] uppercase tracking-[0.28em] text-gold font-bold">
            Administrative Portal
          </span>
          <h1 className="font-display text-2xl font-bold text-white mt-1">
            Chauffeur Desk Sign In
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Access bookings, dispatch schedule &amp; fleet management.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-950/60 border border-red-800 text-red-300 text-xs animate-fade-up">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-1.5 font-medium">
              Username or Email
            </label>
            <div className="relative">
              <Input
                type="text"
                placeholder="admin or rxasif31@gmail.com"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
                autoComplete="username"
                autoFocus
              />
              <User className="absolute right-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
                Password
              </label>
              <Link
                href="/admin/forgot-password"
                className="text-[11px] text-gold/80 hover:text-gold hover:underline transition-colors font-medium"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Input
                type="password"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
              <Lock className="absolute right-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full btn-gold py-3.5 text-sm font-semibold shadow-gold inline-flex items-center justify-center gap-2 mt-4 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Signing In...</span>
              </>
            ) : (
              <>
                <span>Sign Into Admin Panel</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/5 text-center text-xs text-muted-foreground">
          <p className="flex items-center justify-center gap-1.5 text-white/40">
            <ShieldCheck className="h-3.5 w-3.5 text-gold" />
            <span>256-bit Encrypted Session</span>
          </p>
        </div>
      </div>
    </div>
  );
}
