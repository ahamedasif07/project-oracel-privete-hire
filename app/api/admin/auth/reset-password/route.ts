import { NextResponse } from "next/server";
import { authService } from "@/services/auth.service";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { tokenOrOtp, newPassword } = body;

    if (!tokenOrOtp || !newPassword) {
      return NextResponse.json(
        { error: "Verification code/token and new password are required." },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters long." },
        { status: 400 }
      );
    }

    await authService.resetPassword(tokenOrOtp, newPassword);

    return NextResponse.json({
      success: true,
      message: "Password has been successfully reset. You can now sign in with your new password.",
    });
  } catch (error: any) {
    console.error("[ResetPassword Error]:", error);
    return NextResponse.json(
      { error: error.message || "Failed to reset password." },
      { status: 400 }
    );
  }
}
