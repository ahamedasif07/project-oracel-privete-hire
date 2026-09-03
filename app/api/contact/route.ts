import { NextRequest, NextResponse } from "next/server";
import { connectDB, ContactMessage } from "@/lib/db";
import { sendContactEmails } from "@/lib/mail";
import { getCurrentAdmin } from "@/lib/auth";
import type { ContactMessage as IContactMessageType } from "@/types";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    await connectDB();
    const contact = await ContactMessage.create({
      name,
      email,
      phone: phone || null,
      subject: subject || "General Enquiry",
      message,
    });

    // Send email alert to admin
    sendContactEmails({
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      subject: contact.subject,
      message: contact.message,
    }).catch((err) => console.error("Contact email error:", err));

    return NextResponse.json(
      { success: true, contact: contact.toJSON() as unknown as IContactMessageType },
      { status: 201 }
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Failed to submit message.";
    console.error("Contact submit error:", errorMessage);
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const messages = await ContactMessage.find({}).sort({ createdAt: -1 });

    return NextResponse.json({
      messages: messages.map((m) => m.toJSON()) as unknown as IContactMessageType[],
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Failed to fetch messages.";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
