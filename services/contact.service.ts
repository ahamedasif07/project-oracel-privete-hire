import { connectDB } from "@/lib/mongodb";
import { ContactMessage } from "@/models/ContactMessage";
import { sendContactEmails } from "@/lib/mail";
import type { ContactMessage as IContactMessageType } from "@/types";

export interface CreateContactDTO {
  name: string;
  email: string;
  phone?: string | null;
  subject?: string | null;
  message: string;
}

class ContactService {
  /**
   * Submits a customer enquiry and sends email notifications
   */
  public async submitContactMessage(dto: CreateContactDTO): Promise<IContactMessageType> {
    if (!dto.name || !dto.email || !dto.message) {
      throw new Error("Name, email, and message are required.");
    }

    await connectDB();
    const contact = await ContactMessage.create({
      name: dto.name,
      email: dto.email,
      phone: dto.phone || null,
      subject: dto.subject || "General Enquiry",
      message: dto.message,
    });

    // Send email alert to admin in background
    sendContactEmails({
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      subject: contact.subject,
      message: contact.message,
    }).catch((err) => console.error("📧 Contact email error:", err));

    return contact.toJSON() as unknown as IContactMessageType;
  }

  /**
   * Retrieves all contact messages sorted by most recent
   */
  public async getContactMessages(): Promise<IContactMessageType[]> {
    try {
      await connectDB();
      const messages = await ContactMessage.find({}).sort({ createdAt: -1 });
      return messages.map((m) => m.toJSON()) as unknown as IContactMessageType[];
    } catch (err: any) {
      console.warn("⚠️ [ContactService] Returning empty inbox due to DB status:", err.message);
      return [];
    }
  }

  /**
   * Updates read status of a message
   */
  public async updateMessageStatus(id: string, isRead: boolean): Promise<IContactMessageType | null> {
    await connectDB();
    const updated = await ContactMessage.findByIdAndUpdate(
      id,
      { isRead: Boolean(isRead) },
      { new: true }
    );
    if (!updated) return null;
    return updated.toJSON() as unknown as IContactMessageType;
  }

  /**
   * Deletes a message by ID
   */
  public async deleteContactMessage(id: string): Promise<boolean> {
    await connectDB();
    const result = await ContactMessage.findByIdAndDelete(id);
    return Boolean(result);
  }
}

export const contactService = new ContactService();
