import { connectDB } from "@/lib/mongodb";
import { ContactMessage } from "@/models/ContactMessage";
import { sendContactEmails } from "@/lib/mail";
import { readJsonFile, writeJsonFile } from "@/lib/storage";
import type { ContactMessage as IContactMessageType } from "@/types";

export interface CreateContactDTO {
  name: string;
  email: string;
  phone?: string | null;
  subject?: string | null;
  message: string;
}

const STORAGE_FILE = "contacts.json";

class ContactService {
  private getLocalMessages(): IContactMessageType[] {
    return readJsonFile<IContactMessageType[]>(STORAGE_FILE, []);
  }

  private saveLocalMessages(messages: IContactMessageType[]): void {
    writeJsonFile<IContactMessageType[]>(STORAGE_FILE, messages);
  }

  /**
   * Submits a customer enquiry and sends email notifications
   */
  public async submitContactMessage(dto: CreateContactDTO): Promise<IContactMessageType> {
    if (!dto.name || !dto.email || !dto.message) {
      throw new Error("Name, email, and message are required.");
    }

    const newMessage: IContactMessageType = {
      id: `msg_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      name: dto.name,
      email: dto.email,
      phone: dto.phone || null,
      subject: dto.subject || "General Enquiry",
      message: dto.message,
      isRead: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    let savedMessage = newMessage;

    try {
      await connectDB();
      const contact = await ContactMessage.create({
        name: dto.name,
        email: dto.email,
        phone: dto.phone || null,
        subject: dto.subject || "General Enquiry",
        message: dto.message,
      });
      savedMessage = contact.toJSON() as unknown as IContactMessageType;
    } catch (dbErr: any) {
      console.warn("⚠️ [ContactService DB Warning]:", dbErr.message);
      const local = this.getLocalMessages();
      local.unshift(newMessage);
      this.saveLocalMessages(local);
      savedMessage = newMessage;
    }

    // Send email alert to admin in background
    sendContactEmails({
      name: savedMessage.name,
      email: savedMessage.email,
      phone: savedMessage.phone,
      subject: savedMessage.subject,
      message: savedMessage.message,
    }).catch((err) => console.error("📧 Contact email error:", err));

    return savedMessage;
  }

  /**
   * Retrieves all contact messages sorted by most recent
   */
  public async getContactMessages(): Promise<IContactMessageType[]> {
    let dbMessages: IContactMessageType[] = [];

    try {
      await connectDB();
      const docs = await ContactMessage.find({}).sort({ createdAt: -1 });
      dbMessages = docs.map((m) => m.toJSON()) as unknown as IContactMessageType[];
    } catch {
      // Ignore DB error
    }

    const local = this.getLocalMessages();
    const map = new Map<string, IContactMessageType>();

    dbMessages.forEach((m) => map.set(m.id, m));
    local.forEach((m) => {
      if (!map.has(m.id)) {
        map.set(m.id, m);
      }
    });

    const result = Array.from(map.values());
    result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return result;
  }

  /**
   * Updates read status of a message
   */
  public async updateMessageStatus(id: string, isRead: boolean): Promise<IContactMessageType | null> {
    let updated: IContactMessageType | null = null;

    try {
      await connectDB();
      const doc = await ContactMessage.findByIdAndUpdate(
        id,
        { isRead: Boolean(isRead) },
        { new: true }
      );
      if (doc) updated = doc.toJSON() as unknown as IContactMessageType;
    } catch {
      // Fallback
    }

    const local = this.getLocalMessages();
    const idx = local.findIndex((m) => m.id === id);
    if (idx !== -1) {
      local[idx] = { ...local[idx], isRead: Boolean(isRead), updatedAt: new Date().toISOString() };
      this.saveLocalMessages(local);
      if (!updated) updated = local[idx];
    }

    return updated;
  }

  /**
   * Deletes a message by ID
   */
  public async deleteContactMessage(id: string): Promise<boolean> {
    let deleted = false;

    try {
      await connectDB();
      const result = await ContactMessage.findByIdAndDelete(id);
      if (result) deleted = true;
    } catch {
      // Fallback
    }

    const local = this.getLocalMessages();
    const filtered = local.filter((m) => m.id !== id);
    if (filtered.length !== local.length) {
      this.saveLocalMessages(filtered);
      deleted = true;
    }

    return deleted;
  }
}

export const contactService = new ContactService();
