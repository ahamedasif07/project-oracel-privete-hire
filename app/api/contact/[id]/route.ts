import { NextRequest, NextResponse } from "next/server";
import { connectDB, ContactMessage } from "@/lib/db";
import { getCurrentAdmin } from "@/lib/auth";
import type { ContactMessage as IContactMessageType } from "@/types";

export const dynamic = "force-dynamic";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    await connectDB();

    const updated = await ContactMessage.findByIdAndUpdate(
      params.id,
      {
        ...(body.isRead !== undefined && { isRead: Boolean(body.isRead) }),
      },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ error: "Message not found." }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: updated.toJSON() as unknown as IContactMessageType,
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Failed to update message.";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    await ContactMessage.findByIdAndDelete(params.id);

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Failed to delete message.";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
