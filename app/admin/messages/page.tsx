"use client";

import { useState, useEffect } from "react";
import { AdminHeader } from "@/components/admin/admin-header";
import { MessageDetailModal } from "@/components/admin/message-detail-modal";
import { Badge } from "@/components/ui/badge";
import { Mail, MailOpen, Loader2, RefreshCw } from "lucide-react";
import type { ContactMessage } from "@/types";

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/contact");
      if (res.status === 401) {
        window.location.href = "/admin/login";
        return;
      }
      const data = await res.json();
      setMessages(data.messages || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleOpenMessage = async (msg: ContactMessage) => {
    setSelectedMessage(msg);
    if (!msg.isRead) {
      // Mark as read in DB
      try {
        await fetch(`/api/contact/${msg.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ isRead: true }),
        });
        setMessages((prev) =>
          prev.map((m) => (m.id === msg.id ? { ...m, isRead: true } : m))
        );
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <div>
      <AdminHeader
        title="Customer Contact Inbox"
        description="Review and respond to incoming inquiries submitted via the public contact form."
      >
        <button
          onClick={fetchMessages}
          title="Refresh Inbox"
          className="p-2.5 rounded-full border border-white/10 text-muted-foreground hover:text-white hover:border-gold transition-colors"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin text-gold" : ""}`} />
        </button>
      </AdminHeader>

      <main className="p-8">
        <div className="glass-card rounded-3xl border border-white/5 overflow-hidden shadow-xl">
          {loading ? (
            <div className="p-16 text-center text-muted-foreground">
              <Loader2 className="h-7 w-7 animate-spin text-gold mx-auto mb-2" />
              <p className="text-xs">Loading contact messages...</p>
            </div>
          ) : messages.length === 0 ? (
            <div className="p-16 text-center text-muted-foreground">
              <Mail className="h-10 w-10 text-white/20 mx-auto mb-2" />
              <p className="text-sm font-medium text-white">Inbox is clear</p>
              <p className="text-xs text-muted-foreground mt-1">
                New enquiries submitted by website visitors will appear here.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-white/5">
              {messages.map((m) => (
                <div
                  key={m.id}
                  onClick={() => handleOpenMessage(m)}
                  className={`p-6 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer hover:bg-white/[0.02] ${
                    !m.isRead ? "bg-gold/5 border-l-4 border-l-gold" : ""
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`grid h-10 w-10 place-items-center rounded-xl shrink-0 ${
                        !m.isRead
                          ? "bg-gold text-ink font-bold"
                          : "bg-white/5 text-muted-foreground"
                      }`}
                    >
                      {!m.isRead ? <Mail className="h-5 w-5" /> : <MailOpen className="h-5 w-5" />}
                    </div>

                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold text-white text-sm">{m.name}</h3>
                        {!m.isRead && (
                          <Badge variant="gold" className="text-[10px] px-2 py-0">
                            NEW
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-gold font-medium mt-0.5">{m.subject || "General Enquiry"}</p>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-1 max-w-xl">
                        {m.message}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between md:flex-col md:items-end gap-1 text-xs text-muted-foreground">
                    <span>{new Date(m.createdAt).toLocaleString("en-GB")}</span>
                    <span className="text-gold text-[11px] font-semibold hover:underline">
                      View Enquiry &rarr;
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Message Modal */}
      {selectedMessage && (
        <MessageDetailModal
          message={selectedMessage}
          isOpen={Boolean(selectedMessage)}
          onClose={() => setSelectedMessage(null)}
          onDeleted={fetchMessages}
        />
      )}
    </div>
  );
}
