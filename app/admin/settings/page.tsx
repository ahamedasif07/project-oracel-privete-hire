"use client";

import { useState, useEffect } from "react";
import { AdminHeader } from "@/components/admin/admin-header";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Mail,
  Send,
  Loader2,
  CheckCircle,
  AlertCircle,
  Building,
  ShieldCheck,
  Save,
  User,
  Lock,
  KeyRound,
} from "lucide-react";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Record<string, string>>({
    company_name: "Oracle Private Hire",
    company_phone: "07456714214",
    company_email: "bookings@oracleprivatehire.co.uk",
    company_whatsapp: "07456714214",
    company_address: "United Kingdom — nationwide 24/7 service",
    smtp_host: "smtp.gmail.com",
    smtp_port: "587",
    smtp_secure: "false",
    smtp_user: "",
    smtp_pass: "",
    smtp_from: '"Oracle Private Hire" <bookings@oracleprivatehire.co.uk>',
    notification_email: "bookings@oracleprivatehire.co.uk",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Admin Profile state
  const [profile, setProfile] = useState<{
    name: string;
    email: string;
    username: string;
  }>({
    name: "",
    email: "",
    username: "",
  });
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState<string | null>(null);
  const [profileError, setProfileError] = useState<string | null>(null);

  // Password change state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [changingPass, setChangingPass] = useState(false);
  const [passSuccess, setPassSuccess] = useState<string | null>(null);
  const [passError, setPassError] = useState<string | null>(null);

  // Test email state
  const [testEmail, setTestEmail] = useState("");
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // 1. Fetch settings
        const res = await fetch("/api/admin/settings");
        if (res.status === 401) {
          window.location.href = "/admin/login";
          return;
        }
        const data = await res.json();
        if (data.settings) {
          setSettings((prev) => ({ ...prev, ...data.settings }));
          if (data.settings.notification_email) {
            setTestEmail(data.settings.notification_email);
          }
        }

        // 2. Fetch admin profile
        const profileRes = await fetch("/api/admin/profile");
        if (profileRes.ok) {
          const profileData = await profileRes.json();
          if (profileData.profile) {
            setProfile({
              name: profileData.profile.name || "",
              email: profileData.profile.email || "",
              username: profileData.profile.username || "",
            });
          }
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Save System Settings
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaveSuccess(false);

    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ settings }),
      });
      const data = await res.json();
      if (res.ok) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 4000);
      } else {
        alert(data.error || "Failed to save settings.");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  // Save Profile (Name, Email, Username)
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingProfile(true);
    setProfileSuccess(null);
    setProfileError(null);

    try {
      const res = await fetch("/api/admin/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });

      const data = await res.json();
      if (res.ok) {
        setProfileSuccess("Admin profile & email credentials updated successfully.");
        setTimeout(() => setProfileSuccess(null), 5000);
      } else {
        setProfileError(data.error || "Failed to update profile.");
      }
    } catch (err: any) {
      setProfileError(err.message || "Connection error.");
    } finally {
      setSavingProfile(false);
    }
  };

  // Change Password
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setPassError("New passwords do not match.");
      return;
    }
    if (newPassword.length < 6) {
      setPassError("Password must be at least 6 characters long.");
      return;
    }

    setChangingPass(true);
    setPassSuccess(null);
    setPassError(null);

    try {
      const res = await fetch("/api/admin/profile/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await res.json();
      if (res.ok) {
        setPassSuccess("Password updated successfully. Please use your new password for your next login.");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setTimeout(() => setPassSuccess(null), 6000);
      } else {
        setPassError(data.error || "Failed to change password.");
      }
    } catch (err: any) {
      setPassError(err.message || "Connection error.");
    } finally {
      setChangingPass(false);
    }
  };

  // Send Test Email
  const handleSendTestEmail = async () => {
    if (!testEmail) {
      alert("Please enter a test recipient email address.");
      return;
    }
    setTesting(true);
    setTestResult(null);

    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "test_smtp",
          testEmail,
          smtpConfig: {
            host: settings.smtp_host,
            port: Number(settings.smtp_port),
            secure: settings.smtp_secure === "true",
            user: settings.smtp_user,
            pass: settings.smtp_pass,
            from: settings.smtp_from,
            notificationEmail: settings.notification_email,
          },
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setTestResult({ success: true, message: `Test email dispatched to ${testEmail}` });
      } else {
        setTestResult({ success: false, message: data.error || "SMTP test failed." });
      }
    } catch (err: any) {
      setTestResult({ success: false, message: err.message || "Connection error." });
    } finally {
      setTesting(false);
    }
  };

  return (
    <div>
      <AdminHeader
        title="Settings & Profile Security"
        description="Manage your admin email, password credentials, SMTP email server, and company information."
      />

      <main className="p-8 max-w-5xl space-y-8">
        {saveSuccess && (
          <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2 animate-fade-up">
            <CheckCircle className="h-4 w-4 shrink-0" />
            <span>Settings saved and updated successfully.</span>
          </div>
        )}

        {/* 1. ADMIN PROFILE & EMAIL CREDENTIALS CARD */}
        <div className="glass-card rounded-3xl p-8 border border-gold/40 space-y-6 shadow-2xl relative overflow-hidden">
          <div className="flex items-center gap-3 pb-4 border-b border-white/5">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-gold/15 text-gold">
              <User className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-display text-lg font-bold text-white">
                Admin Profile &amp; Login Email
              </h2>
              <p className="text-xs text-muted-foreground">
                Update your login username, email address, and administrative display name.
              </p>
            </div>
          </div>

          {profileSuccess && (
            <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2 animate-fade-up">
              <CheckCircle className="h-4 w-4 shrink-0" />
              <span>{profileSuccess}</span>
            </div>
          )}

          {profileError && (
            <div className="p-4 rounded-2xl bg-red-950/60 border border-red-800 text-red-300 text-xs flex items-center gap-2 animate-fade-up">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{profileError}</span>
            </div>
          )}

          <form onSubmit={handleSaveProfile} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-3">
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-1.5 font-medium">
                  Display Name
                </label>
                <Input
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  placeholder="Oracle Admin"
                  required
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-1.5 font-medium">
                  Login Username
                </label>
                <Input
                  value={profile.username}
                  onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                  placeholder="admin"
                  required
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-1.5 font-medium">
                  Login &amp; Recovery Email
                </label>
                <Input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  placeholder="rxasif31@gmail.com"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end pt-1">
              <button
                type="submit"
                disabled={savingProfile}
                className="rounded-full btn-gold px-6 py-2.5 text-xs font-semibold shadow-gold inline-flex items-center gap-1.5"
              >
                {savingProfile ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    <span>Updating Profile...</span>
                  </>
                ) : (
                  <>
                    <Save className="h-3.5 w-3.5" />
                    <span>Save Profile &amp; Email</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* 2. CHANGE ADMIN PASSWORD CARD */}
        <div className="glass-card rounded-3xl p-8 border border-white/10 space-y-6 shadow-xl">
          <div className="flex items-center gap-3 pb-4 border-b border-white/5">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-gold/10 text-gold">
              <Lock className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-display text-lg font-bold text-white">
                Change Admin Password
              </h2>
              <p className="text-xs text-muted-foreground">
                Ensure your administrative account is protected with a secure password.
              </p>
            </div>
          </div>

          {passSuccess && (
            <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2 animate-fade-up">
              <CheckCircle className="h-4 w-4 shrink-0" />
              <span>{passSuccess}</span>
            </div>
          )}

          {passError && (
            <div className="p-4 rounded-2xl bg-red-950/60 border border-red-800 text-red-300 text-xs flex items-center gap-2 animate-fade-up">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{passError}</span>
            </div>
          )}

          <form onSubmit={handleChangePassword} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-3">
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-1.5 font-medium">
                  Current Password
                </label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-1.5 font-medium">
                  New Password (Min 6 chars)
                </label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  minLength={6}
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-1.5 font-medium">
                  Confirm New Password
                </label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={6}
                />
              </div>
            </div>

            <div className="flex justify-end pt-1">
              <button
                type="submit"
                disabled={changingPass}
                className="rounded-full btn-ghost-gold px-6 py-2.5 text-xs font-semibold inline-flex items-center gap-1.5"
              >
                {changingPass ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    <span>Updating Password...</span>
                  </>
                ) : (
                  <>
                    <KeyRound className="h-3.5 w-3.5" />
                    <span>Update Password</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* 3. SMTP EMAIL SERVER CONFIGURATION */}
        <form onSubmit={handleSaveSettings} className="space-y-8">
          <div className="glass-card rounded-3xl p-8 border border-white/10 space-y-6 shadow-xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-gold/10 text-gold">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="font-display text-lg font-bold text-white">
                    SMTP Email Dispatch Configuration
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    Google Cloud Console OAuth2 &amp; SMTP credentials for delivering live booking vouchers and password reset OTPs.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-1 font-medium">
                  SMTP Host *
                </label>
                <Input
                  placeholder="e.g. smtp.gmail.com"
                  value={settings.smtp_host || ""}
                  onChange={(e) => setSettings({ ...settings, smtp_host: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-1 font-medium">
                    Port *
                  </label>
                  <Input
                    type="number"
                    placeholder="587 / 465"
                    value={settings.smtp_port || "587"}
                    onChange={(e) => setSettings({ ...settings, smtp_port: e.target.value })}
                    required
                  />
                </div>
                <div className="flex flex-col justify-end">
                  <div className="flex items-center justify-between h-12 px-3 rounded-xl bg-onyx border border-white/10">
                    <span className="text-xs text-white">SSL / TLS</span>
                    <Switch
                      checked={settings.smtp_secure === "true"}
                      onCheckedChange={(checked) =>
                        setSettings({ ...settings, smtp_secure: checked ? "true" : "false" })
                      }
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-1 font-medium">
                  SMTP Username / Email *
                </label>
                <Input
                  type="email"
                  placeholder="rxasif31@gmail.com"
                  value={settings.smtp_user || ""}
                  onChange={(e) => setSettings({ ...settings, smtp_user: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-1 font-medium">
                  SMTP Password / App Password
                </label>
                <Input
                  type="password"
                  placeholder="Google 16-char App Password (if not using OAuth)"
                  value={settings.smtp_pass || ""}
                  onChange={(e) => setSettings({ ...settings, smtp_pass: e.target.value })}
                />
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-1 font-medium">
                  From Display Header
                </label>
                <Input
                  placeholder='"Oracle Private Hire" <rxasif31@gmail.com>'
                  value={settings.smtp_from || ""}
                  onChange={(e) => setSettings({ ...settings, smtp_from: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-1 font-medium">
                  Admin Alert Notification Email (New Bookings / Alerts)
                </label>
                <Input
                  type="email"
                  placeholder="ahamedasif01729@gmail.com"
                  value={settings.notification_email || ""}
                  onChange={(e) =>
                    setSettings({ ...settings, notification_email: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Test Email Box */}
            <div className="p-5 rounded-2xl bg-[#0D0D0D] border border-white/5 space-y-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-gold flex items-center gap-1.5">
                <Send className="h-3.5 w-3.5" />
                <span>Live Email Dispatch Test</span>
              </span>
              <p className="text-xs text-muted-foreground">
                Send an immediate test message to verify your live email connection.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 pt-1">
                <Input
                  type="email"
                  placeholder="Recipient test email"
                  value={testEmail}
                  onChange={(e) => setTestEmail(e.target.value)}
                  className="max-w-md"
                />
                <button
                  type="button"
                  disabled={testing}
                  onClick={handleSendTestEmail}
                  className="rounded-full btn-ghost-gold px-6 py-2.5 text-xs font-semibold inline-flex items-center gap-1.5 shrink-0"
                >
                  {testing ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      <span>Sending Test...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-3.5 w-3.5" />
                      <span>Send Test Email</span>
                    </>
                  )}
                </button>
              </div>

              {testResult && (
                <div
                  className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                    testResult.success
                      ? "bg-emerald-950/60 border border-emerald-800 text-emerald-300"
                      : "bg-red-950/60 border border-red-800 text-red-300"
                  }`}
                >
                  {testResult.success ? (
                    <CheckCircle className="h-4 w-4 shrink-0" />
                  ) : (
                    <AlertCircle className="h-4 w-4 shrink-0" />
                  )}
                  <span>{testResult.message}</span>
                </div>
              )}
            </div>
          </div>

          {/* 4. COMPANY CONTACT DETAILS */}
          <div className="glass-card rounded-3xl p-8 border border-white/5 space-y-6 shadow-xl">
            <div className="flex items-center gap-3 pb-4 border-b border-white/5">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-gold/10 text-gold">
                <Building className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-display text-lg font-bold text-white">
                  Company Contact Information
                </h2>
                <p className="text-xs text-muted-foreground">
                  Displayed on public pages, header telephone buttons, and footer.
                </p>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-1 font-medium">
                  Company Name
                </label>
                <Input
                  value={settings.company_name || ""}
                  onChange={(e) => setSettings({ ...settings, company_name: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-1 font-medium">
                  Telephone Line
                </label>
                <Input
                  value={settings.company_phone || ""}
                  onChange={(e) => setSettings({ ...settings, company_phone: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-1 font-medium">
                  Public Email Address
                </label>
                <Input
                  value={settings.company_email || ""}
                  onChange={(e) => setSettings({ ...settings, company_email: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-1 font-medium">
                  WhatsApp Contact Number
                </label>
                <Input
                  value={settings.company_whatsapp || ""}
                  onChange={(e) => setSettings({ ...settings, company_whatsapp: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={saving}
              className="rounded-full btn-gold px-8 py-3.5 text-xs font-semibold shadow-gold inline-flex items-center gap-2"
            >
              {saving ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  <span>Saving Settings...</span>
                </>
              ) : (
                <>
                  <Save className="h-3.5 w-3.5" />
                  <span>Save All Settings</span>
                </>
              )}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
