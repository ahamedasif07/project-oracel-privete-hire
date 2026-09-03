import { NextRequest, NextResponse } from "next/server";
import { connectDB, SystemSetting } from "@/lib/db";
import { getCurrentAdmin } from "@/lib/auth";
import { sendTestEmail } from "@/lib/mail";
import type { SystemSettingsMap } from "@/types";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const settings = await SystemSetting.find({});
    const map: SystemSettingsMap = {};
    settings.forEach((s) => {
      map[s.key] = s.value;
    });

    return NextResponse.json({ settings: map });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Failed to fetch settings.";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

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
        await sendTestEmail(testEmail, smtpConfig);
        return NextResponse.json({ success: true, message: `Test email sent to ${testEmail}` });
      } catch (mailErr: unknown) {
        const mailErrMsg = mailErr instanceof Error ? mailErr.message : "Connection failed";
        return NextResponse.json(
          { error: `SMTP Connection Failed: ${mailErrMsg}` },
          { status: 500 }
        );
      }
    }

    // Otherwise save settings to database
    const { settings } = body;
    if (!settings || typeof settings !== "object") {
      return NextResponse.json({ error: "Invalid settings payload." }, { status: 400 });
    }

    await connectDB();
    for (const [key, value] of Object.entries(settings)) {
      await SystemSetting.findOneAndUpdate(
        { key },
        { key, value: String(value) },
        { upsert: true, new: true }
      );
    }

    return NextResponse.json({ success: true, message: "Settings saved successfully." });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Failed to save settings.";
    console.error("Settings save error:", errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
