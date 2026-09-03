"use client";

import { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, KeyRound, Loader2, CheckCircle2, ArrowRight, ShieldCheck } from "lucide-react";
import { Input } from "@/components/ui/input";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tokenParam = searchParams.get("token") || "";
  const emailParam = searchParams.get("email") || "";

  const [tokenOrOtp, setTokenOrOtp] = useState(tokenParam);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (tokenParam) {
      setTokenOrOtp(tokenParam);
    }
  }, [tokenParam]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tokenOrOtp.trim()) {
      setError("Please enter the 6-digit code or reset token.");
      return;
    }

    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tokenOrOtp: tokenOrOtp.trim(),
          newPassword: newPassword.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to reset password.");
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Failed to reset password. Please check your verification code.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background ambient gold glow */}
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
            Security Authorization
          </span>
          <h1 className="font-display text-2xl font-bold text-white mt-1">
            Create New Password
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            {emailParam ? `Resetting password for ${emailParam}` : "Enter your 6-digit verification code and new password."}
          </p>
        </div>

        {success ? (
          <div className="space-y-6 animate-fade-up">
            <div className="p-5 rounded-2xl bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs space-y-2">
              <div className="flex items-center gap-2 font-bold text-sm">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400" />
                <span>Password Successfully Reset!</span>
              </div>
              <p className="text-emerald-200/80 leading-relaxed">
                Your administrator password has been updated. You can now securely sign in to your dashboard.
              </p>
            </div>

            <button
              onClick={() => router.push("/admin/login")}
              className="w-full rounded-full btn-gold py-3.5 text-sm font-semibold shadow-gold inline-flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02]"
            >
              <span>Sign In with New Password</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-4 rounded-xl bg-red-950/60 border border-red-800 text-red-300 text-xs animate-fade-up">
                {error}
              </div>
            )}

            <div>
              <label className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-1.5 font-medium">
                6-Digit Verification Code or Token
              </label>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="e.g. 123456"
                  value={tokenOrOtp}
                  onChange={(e) => setTokenOrOtp(e.target.value)}
                  required
                  className="font-mono text-center tracking-widest text-lg font-bold"
                  autoFocus={!tokenParam}
                />
                <KeyRound className="absolute right-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
              </div>
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-1.5 font-medium">
                New Secure Password
              </label>
              <div className="relative">
                <Input
                  type="password"
                  placeholder="Min 6 characters"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  minLength={6}
                />
                <Lock className="absolute right-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
              </div>
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-1.5 font-medium">
                Confirm New Password
              </label>
              <div className="relative">
                <Input
                  type="password"
                  placeholder="Re-type new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={6}
                />
                <Lock className="absolute right-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full btn-gold py-3.5 text-sm font-semibold shadow-gold inline-flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 mt-2"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Updating Password...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Confirm &amp; Set New Password</span>
                </>
              )}
            </button>

            <div className="text-center pt-2">
              <Link
                href="/admin/forgot-password"
                className="text-xs text-muted-foreground hover:text-gold transition-colors"
              >
                Need a new code? Request code again
              </Link>
            </div>
          </form>
        )}

        <div className="mt-8 pt-6 border-t border-white/5 text-center text-xs text-muted-foreground">
          <p className="flex items-center justify-center gap-1.5 text-white/40">
            <ShieldCheck className="h-3.5 w-3.5 text-gold" />
            <span>256-bit Encrypted Password Hash</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center text-gold">Loading...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}

