import { NextRequest, NextResponse } from "next/server";
import { contactService } from "@/services/contact.service";
import { getCurrentAdmin } from "@/lib/auth";

class ContactController {
  /**
   * Handles submitting a customer contact inquiry (Public)
   */
  public async submitMessage(req: NextRequest): Promise<NextResponse> {
    try {
      const body = await req.json().catch(() => ({}));
      const message = await contactService.submitContactMessage(body);

      return NextResponse.json(
        { success: true, contact: message },
        { status: 201 }
      );
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Failed to submit message.";
      console.error("Contact submit error:", errorMessage);
      return NextResponse.json({ error: errorMessage }, { status: 400 });
    }
  }

  /**
   * Handles retrieving all contact messages (Admin Only)
   */
  public async getMessages(): Promise<NextResponse> {
    try {
      const admin = await getCurrentAdmin();
      if (!admin) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      const messages = await contactService.getContactMessages();
      return NextResponse.json({ messages });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Failed to fetch messages.";
      return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
  }

  /**
   * Handles updating message read status (Admin Only)
   */
  public async updateStatus(req: NextRequest, id: string): Promise<NextResponse> {
    try {
      const admin = await getCurrentAdmin();
      if (!admin) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      const body = await req.json().catch(() => ({}));
      const { isRead } = body;

      const updated = await contactService.updateMessageStatus(id, Boolean(isRead));
      if (!updated) {
        return NextResponse.json({ error: "Message not found." }, { status: 404 });
      }

      return NextResponse.json({ success: true, message: updated });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Failed to update message.";
      return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
  }

  /**
   * Handles deleting a contact message (Admin Only)
   */
  public async deleteMessage(req: NextRequest, id: string): Promise<NextResponse> {
    try {
      const admin = await getCurrentAdmin();
      if (!admin) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      const deleted = await contactService.deleteContactMessage(id);
      if (!deleted) {
        return NextResponse.json({ error: "Message not found." }, { status: 404 });
      }

      return NextResponse.json({ success: true });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Failed to delete message.";
      return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
  }
}

export const contactController = new ContactController();
