import { connectDB } from "@/lib/mongodb";
import { SystemSetting } from "@/models/SystemSetting";
import { sendTestEmail } from "@/lib/mail";
import type { SystemSettingsMap } from "@/types";

const DEFAULT_SETTINGS: Record<string, string> = {
  company_name: "Oracle Private Hire",
  company_phone: "07456714214",
  company_email: "bookings@oracleprivatehire.co.uk",
  company_whatsapp: "07456714214",
  company_address: "United Kingdom — nationwide 24/7 service",
  smtp_host: process.env.SMTP_HOST || "smtp.gmail.com",
  smtp_port: process.env.SMTP_PORT || "587",
  smtp_secure: process.env.SMTP_SECURE || "false",
  smtp_user: process.env.SMTP_USER || "bookings@oracleprivatehire.co.uk",
  smtp_pass: process.env.SMTP_PASS || "",
  smtp_from: process.env.SMTP_FROM || '"Oracle Private Hire" <bookings@oracleprivatehire.co.uk>',
  notification_email: process.env.NOTIFICATION_EMAIL || "rxasif31@gmail.com",
};

class SettingsService {
  /**
   * Ensures default system settings exist if collection is empty
   */
  public async ensureDefaultSettings(): Promise<void> {
    try {
      const count = await SystemSetting.countDocuments();
      if (count === 0) {
        for (const [key, value] of Object.entries(DEFAULT_SETTINGS)) {
          await SystemSetting.create({ key, value });
        }
        console.log(" Initialized default system settings.");
      }
    } catch (err: any) {
      console.warn("⚠️ [SettingsService] Could not sync settings to MongoDB:", err.message);
    }
  }

  /**
   * Retrieves all system settings as a key-value dictionary
   */
  public async getSystemSettings(): Promise<SystemSettingsMap> {
    const map: SystemSettingsMap = { ...DEFAULT_SETTINGS };

    try {
      await connectDB();
      await this.ensureDefaultSettings();

      const records = await SystemSetting.find({});
      records.forEach((s) => {
        map[s.key] = s.value;
      });
    } catch (err: any) {
      console.warn("⚠️ [SettingsService] Using default settings due to DB status:", err.message);
    }

    return map;
  }

  /**
   * Persists updated settings
   */
  public async updateSystemSettings(settings: Record<string, string | number | boolean>): Promise<void> {
    await connectDB();

    for (const [key, value] of Object.entries(settings)) {
      await SystemSetting.findOneAndUpdate(
        { key },
        { key, value: String(value) },
        { upsert: true, new: true }
      );
    }
  }

  /**
   * Tests SMTP settings with a live test email dispatch
   */
  public async testSmtp(testEmail: string, smtpConfig?: any): Promise<void> {
    if (!testEmail) {
      throw new Error("Test recipient email is required.");
    }
    await sendTestEmail(testEmail, smtpConfig);
  }
}

export const settingsService = new SettingsService();
