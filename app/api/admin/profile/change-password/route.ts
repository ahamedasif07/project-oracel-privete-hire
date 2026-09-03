import { NextRequest, NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/auth";
import { authService } from "@/services/auth.service";

export async function POST(req: NextRequest) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { currentPassword, newPassword } = body;

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { error: "Current password and new password are required." },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { error: "New password must be at least 6 characters long." },
        { status: 400 }
      );
    }

    await authService.changePassword(admin.id, currentPassword, newPassword);

    return NextResponse.json({
      success: true,
      message: "Password changed successfully.",
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to change password." },
      { status: 400 }
    );
  }
}
