import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { AdminUser } from "@/models/AdminUser";
import { readJsonFile } from "@/lib/storage";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { otp, identifier } = body;

    const cleanOtp = (otp || "").toString().trim();
    if (!cleanOtp) {
      return NextResponse.json({ error: "Please enter the 6-digit verification code." }, { status: 400 });
    }

    let isValid = false;

    // 1. Check DB
    try {
      await connectDB();
      const admin = await AdminUser.findOne({
        resetPasswordOtp: cleanOtp,
        resetPasswordExpires: { $gt: new Date() },
      }).select("+resetPasswordOtp +resetPasswordExpires");

      if (admin) {
        isValid = true;
      }
    } catch {
      // Fallback
    }

    // 2. Check local storage if not found in DB
    if (!isValid) {
      const localAdmins = readJsonFile<any[]>("admins.json", []);
      const nowIso = new Date().toISOString();
      const matched = localAdmins.find(
        (a) => a.resetPasswordOtp === cleanOtp && (!a.resetPasswordExpires || a.resetPasswordExpires > nowIso)
      );
      if (matched) {
        isValid = true;
      }
    }

    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid or expired verification code. Please check your email or request a new code." },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      valid: true,
      message: "Verification code confirmed.",
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to verify code." }, { status: 400 });
  }
}
