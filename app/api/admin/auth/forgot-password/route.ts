import { NextResponse } from "next/server";
import { authService } from "@/services/auth.service";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { identifier } = body;

    if (!identifier) {
      return NextResponse.json(
        { error: "Please enter your registered email address or username." },
        { status: 400 }
      );
    }

    const result = await authService.requestPasswordReset(identifier);

    return NextResponse.json({
      success: true,
      message: `Password reset verification code dispatched to ${result.email}`,
      email: result.email,
    });
  } catch (error: any) {
    console.error("[ForgotPassword Error]:", error);
    return NextResponse.json(
      { error: error.message || "Failed to process password reset." },
      { status: 400 }
    );
  }
}
