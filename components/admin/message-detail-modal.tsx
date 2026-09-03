"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Mail, Phone, Trash2, Reply } from "lucide-react";
import type { ContactMessage } from "@/types";

interface MessageDetailModalProps {
  message: ContactMessage | null;
  isOpen: boolean;
  onClose: () => void;
  onDeleted: () => void;
}

export function MessageDetailModal({
  message,
  isOpen,
  onClose,
  onDeleted,
}: MessageDetailModalProps) {
  if (!message) return null;

  const handleDelete = async () => {
    if (!confirm("Delete this message?")) return;
    try {
      const res = await fetch(`/api/contact/${message.id}`, { method: "DELETE" });
      if (res.ok) {
        onDeleted();
        onClose();
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg bg-onyx border-gold/30">
        <DialogHeader>
          <span className="text-[10px] uppercase tracking-widest text-gold font-bold">
            Customer Contact Message
          </span>
          <DialogTitle className="text-xl text-white">
            {message.subject || "General Enquiry"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 text-xs md:text-sm pt-2">
          <div className="p-4 rounded-2xl bg-[#0D0D0D] border border-white/5 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-white font-semibold text-base">{message.name}</span>
              <span className="text-[11px] text-muted-foreground">
                {new Date(message.createdAt).toLocaleString("en-GB")}
              </span>
            </div>
            <div className="flex flex-wrap gap-4 text-muted-foreground pt-1">
              <a
                href={`mailto:${message.email}`}
                className="flex items-center gap-1.5 hover:text-gold transition-colors"
              >
                <Mail className="h-3.5 w-3.5 text-gold" />
                <span>{message.email}</span>
              </a>
              {message.phone && (
                <a
                  href={`tel:${message.phone}`}
                  className="flex items-center gap-1.5 hover:text-gold transition-colors"
                >
                  <Phone className="h-3.5 w-3.5 text-gold" />
                  <span>{message.phone}</span>
                </a>
              )}
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#0D0D0D] border border-white/5">
            <span className="text-[10px] uppercase tracking-wider text-gold font-semibold block mb-2">
              Message Content
            </span>
            <p className="text-foreground/90 whitespace-pre-wrap leading-relaxed">
              {message.message}
            </p>
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-white/5">
          <button
            type="button"
            onClick={handleDelete}
            className="text-rose-400 hover:text-rose-300 text-xs flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-rose-950/30"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>Delete</span>
          </button>

          <div className="flex gap-2">
            <a
              href={`mailto:${message.email}?subject=Re: ${encodeURIComponent(
                message.subject || "Oracle Private Hire Enquiry"
              )}`}
              className="rounded-full btn-gold px-6 py-2.5 text-xs font-semibold shadow-gold inline-flex items-center gap-1.5"
            >
              <Reply className="h-3.5 w-3.5" />
              <span>Reply via Email</span>
            </a>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
