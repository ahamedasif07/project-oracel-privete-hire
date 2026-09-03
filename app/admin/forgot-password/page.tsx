"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Mail,
  KeyRound,
  Lock,
  Loader2,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";
import { Input } from "@/components/ui/input";

export default function ForgotPasswordWizardPage() {
  const router = useRouter();

  // Wizard Steps: 1 = Email, 2 = Verify OTP, 3 = New Password, 4 = Success
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  const [identifier, setIdentifier] = useState("");
  const [sentEmail, setSentEmail] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resendCooldown, setResendCooldown] = useState(0);

  // ---------------------------------------------------------------------------
  // Step 1: Send OTP to Email
  // ---------------------------------------------------------------------------
  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim()) {
      setError("Please enter your registered email address or username.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: identifier.trim() }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to send reset code.");
      }

      setSentEmail(data.email || identifier.trim());
      setStep(2);
      startCooldown();
    } catch (err: any) {
      setError(err.message || "Could not dispatch reset code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ---------------------------------------------------------------------------
  // Step 2: Verify 6-Digit OTP Code
  // ---------------------------------------------------------------------------
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanOtp = otpCode.trim();
    if (cleanOtp.length !== 6) {
      setError("Please enter the complete 6-digit code received in your email.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otp: cleanOtp, identifier: sentEmail }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Invalid or expired verification code.");
      }

      setStep(3);
    } catch (err: any) {
      setError(err.message || "Invalid code. Please re-check your email inbox.");
    } finally {
      setLoading(false);
    }
  };

  // ---------------------------------------------------------------------------
  // Step 3: Set New Password
  // ---------------------------------------------------------------------------
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
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
          tokenOrOtp: otpCode.trim(),
          newPassword: newPassword.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to set new password.");
      }

      setStep(4);
    } catch (err: any) {
      setError(err.message || "Failed to reset password.");
    } finally {
      setLoading(false);
    }
  };

  // Resend Timer
  const startCooldown = () => {
    setResendCooldown(60);
    const timer = setInterval(() => {
      setResendCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleResend = async () => {
    if (resendCooldown > 0) return;
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/admin/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: sentEmail || identifier }),
      });
      if (res.ok) {
        startCooldown();
      }
    } catch {
      setError("Failed to resend code.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background ambient gold glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-gold/10 blur-3xl pointer-events-none" />

      <div className="w-full max-w-md glass-card rounded-3xl p-8 md:p-10 border border-gold/30 shadow-2xl relative z-10 animate-fade-up">
        {/* Top Branding */}
        <div className="text-center mb-6">
          <Image
            src="/images/oracel-bg-remove2-removebg-preview.png"
            alt="Oracle Logo"
            width={120}
            height={60}
            className="h-12 w-auto object-contain mx-auto mb-3"
          />
          <span className="text-[10px] uppercase tracking-[0.28em] text-gold font-bold">
            Administrative Recovery
          </span>
          <h1 className="font-display text-2xl font-bold text-white mt-1">
            {step === 1 && "Forgot Password"}
            {step === 2 && "Enter 6-Digit Code"}
            {step === 3 && "Set New Password"}
            {step === 4 && "Password Updated!"}
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            {step === 1 && "Enter your admin email or username to receive a security code."}
            {step === 2 && `We sent a 6-digit code to ${sentEmail}`}
            {step === 3 && "Create a secure new password for your account."}
            {step === 4 && "Your password has been changed successfully."}
          </p>
        </div>

        {/* Step Progress Bar */}
        <div className="flex items-center justify-between gap-2 mb-6">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                step >= s ? "bg-gradient-to-r from-gold to-yellow-500 shadow-gold" : "bg-white/10"
              }`}
            />
          ))}
        </div>

        {/* Error Box */}
        {error && (
          <div className="mb-5 p-3.5 rounded-xl bg-red-950/60 border border-red-800 text-red-300 text-xs animate-fade-up">
            {error}
          </div>
        )}

        {/* ================================================================= */}
        {/* STEP 1: Enter Email / Username */}
        {/* ================================================================= */}
        {step === 1 && (
          <form onSubmit={handleSendCode} className="space-y-4">
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-1.5 font-medium">
                Admin Email or Username
              </label>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="rxasif31@gmail.com or admin"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  required
                  autoFocus
                />
                <Mail className="absolute right-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
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
                  <span>Sending Code...</span>
                </>
              ) : (
                <>
                  <span>Send 6-Digit Code</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>

            <div className="text-center pt-2">
              <Link
                href="/admin/login"
                className="text-xs text-muted-foreground hover:text-white inline-flex items-center gap-1.5 transition-colors"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Back to Admin Sign In</span>
              </Link>
            </div>
          </form>
        )}

        {/* ================================================================= */}
        {/* STEP 2: Verify 6-Digit OTP Code */}
        {/* ================================================================= */}
        {step === 2 && (
          <form onSubmit={handleVerifyOtp} className="space-y-4 animate-fade-up">
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-1.5 font-medium text-center">
                Enter 6-Digit Verification Code
              </label>
              <div className="relative">
                <Input
                  type="text"
                  maxLength={6}
                  placeholder="• • • • • •"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ""))}
                  required
                  className="font-mono text-center tracking-[0.5em] text-2xl font-bold h-14 bg-black/40 border-gold/40 text-gold"
                  autoFocus
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || otpCode.length !== 6}
              className="w-full rounded-full btn-gold py-3.5 text-sm font-semibold shadow-gold inline-flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 mt-2"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Verifying Code...</span>
                </>
              ) : (
                <>
                  <span>Verify Code &amp; Continue</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>

            <div className="flex items-center justify-between pt-3 text-xs text-muted-foreground">
              <button
                type="button"
                onClick={() => {
                  setError(null);
                  setStep(1);
                }}
                className="hover:text-white inline-flex items-center gap-1"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Change Email</span>
              </button>

              <button
                type="button"
                disabled={resendCooldown > 0 || loading}
                onClick={handleResend}
                className="text-gold hover:underline disabled:opacity-50 inline-flex items-center gap-1 font-medium"
              >
                <RotateCcw className="h-3 w-3" />
                <span>{resendCooldown > 0 ? `Resend (${resendCooldown}s)` : "Resend Code"}</span>
              </button>
            </div>
          </form>
        )}

        {/* ================================================================= */}
        {/* STEP 3: Set New Password */}
        {/* ================================================================= */}
        {step === 3 && (
          <form onSubmit={handleResetPassword} className="space-y-4 animate-fade-up">
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
                  autoFocus
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
                  <span>Save New Password</span>
                </>
              )}
            </button>
          </form>
        )}

        {/* ================================================================= */}
        {/* STEP 4: Success Screen */}
        {/* ================================================================= */}
        {step === 4 && (
          <div className="space-y-6 animate-fade-up">
            <div className="p-5 rounded-2xl bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs space-y-2 text-center">
              <CheckCircle2 className="h-8 w-8 text-emerald-400 mx-auto mb-1" />
              <div className="font-bold text-base text-white">Password Updated!</div>
              <p className="text-emerald-200/80 leading-relaxed">
                Your new admin password has been set and verified. You can now sign in to your administrative dashboard.
              </p>
            </div>

            <button
              onClick={() => router.push("/admin/login")}
              className="w-full rounded-full btn-gold py-3.5 text-sm font-semibold shadow-gold inline-flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02]"
            >
              <span>Sign In to Admin Panel</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}

        <div className="mt-8 pt-6 border-t border-white/5 text-center text-xs text-muted-foreground">
          <p className="flex items-center justify-center gap-1.5 text-white/40">
            <ShieldCheck className="h-3.5 w-3.5 text-gold" />
            <span>256-bit Encrypted Password Verification</span>
          </p>
        </div>
      </div>
    </div>
  );
}
