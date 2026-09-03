import { NextRequest, NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/auth";
import { authService } from "@/services/auth.service";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json({ profile: admin });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to load profile." }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { name, email, username } = body;

    const updated = await authService.updateProfile(admin.id, {
      name,
      email,
      username,
    });

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully.",
      profile: updated,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to update profile." }, { status: 400 });
  }
}
