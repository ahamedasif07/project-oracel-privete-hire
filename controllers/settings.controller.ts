import { NextRequest, NextResponse } from "next/server";
import { settingsService } from "@/services/settings.service";
import { getCurrentAdmin } from "@/lib/auth";

class SettingsController {
  /**
   * Handles fetching system settings (Admin Only)
   */
  public async getSettings(): Promise<NextResponse> {
    try {
      const admin = await getCurrentAdmin();
      if (!admin) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      const settings = await settingsService.getSystemSettings();
      return NextResponse.json({ settings });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Failed to fetch settings.";
      return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
  }

  /**
   * Handles saving system settings or testing SMTP (Admin Only)
   */
  public async saveSettings(req: NextRequest): Promise<NextResponse> {
    try {
      const admin = await getCurrentAdmin();
      if (!admin) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      const body = await req.json().catch(() => ({}));

      // Check if this is an SMTP test action
      if (body.action === "test_smtp") {
        const { testEmail, smtpConfig } = body;
        if (!testEmail) {
          return NextResponse.json(
            { error: "Test recipient email is required." },
            { status: 400 }
          );
        }

        try {
          await settingsService.testSmtp(testEmail, smtpConfig);
          return NextResponse.json({
            success: true,
            message: `Test email dispatched to ${testEmail}`,
          });
        } catch (mailErr: unknown) {
          const mailErrMsg = mailErr instanceof Error ? mailErr.message : "SMTP Connection Failed";
          return NextResponse.json(
            { error: `SMTP Connection Failed: ${mailErrMsg}` },
            { status: 500 }
          );
        }
      }

      // Save settings to database
      const { settings } = body;
      if (!settings || typeof settings !== "object") {
        return NextResponse.json({ error: "Invalid settings payload." }, { status: 400 });
      }

      await settingsService.updateSystemSettings(settings);
      return NextResponse.json({ success: true, message: "Settings saved successfully." });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Failed to save settings.";
      console.error("Settings save error:", errorMessage);
      return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
  }
}

export const settingsController = new SettingsController();
