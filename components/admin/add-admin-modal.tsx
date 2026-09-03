"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Loader2, Plus, ShieldCheck } from "lucide-react";

interface AddAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated: () => void;
}

export function AddAdminModal({
  isOpen,
  onClose,
  onCreated,
}: AddAdminModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    role: "ADMIN",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.password.trim()) {
      setError("Please fill in all required administrator fields.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to create administrator.");
      }

      onCreated();
      onClose();
      // Reset form
      setFormData({
        name: "",
        username: "",
        email: "",
        password: "",
        role: "ADMIN",
      });
    } catch (err: any) {
      setError(err.message || "Failed to save administrator.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto bg-onyx border-gold/30">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-gold/10 text-gold">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <DialogTitle className="text-xl text-gradient-gold font-bold">
                Add Administrator
              </DialogTitle>
              <p className="text-xs text-muted-foreground">
                Grant dispatch dashboard and reservation access to staff.
              </p>
            </div>
          </div>
        </DialogHeader>

        {error && (
          <div className="p-3 rounded-xl bg-red-950/60 border border-red-800 text-red-300 text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs md:text-sm pt-2">
          <div>
            <label className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-1 font-medium">
              Full Name *
            </label>
            <Input
              placeholder="e.g. Asif Dispatcher"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-1 font-medium">
                Username *
              </label>
              <Input
                placeholder="e.g. asif_admin"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-1 font-medium">
                Role
              </label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full h-11 rounded-xl border border-white/10 bg-[#0D0D0D] px-3 text-xs text-white focus:outline-none focus:border-gold"
              >
                <option value="ADMIN">ADMIN (Standard Dispatcher)</option>
                <option value="SUPER_ADMIN">SUPER_ADMIN (Full Control)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-1 font-medium">
              Email Address *
            </label>
            <Input
              type="email"
              placeholder="e.g. staff@oracleprivatehire.co.uk"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-1 font-medium">
              Login Password *
            </label>
            <Input
              type="password"
              placeholder="At least 6 characters"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>

          <DialogFooter className="pt-4 border-t border-white/5">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full btn-ghost-gold px-6 py-2.5 text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="rounded-full btn-gold px-7 py-2.5 text-xs font-semibold shadow-gold inline-flex items-center gap-1.5"
            >
              {loading ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Plus className="h-3.5 w-3.5" />
              )}
              <span>Create Administrator</span>
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
