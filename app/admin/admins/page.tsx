"use client";

import { useState, useEffect } from "react";
import { AdminHeader } from "@/components/admin/admin-header";
import { AddAdminModal } from "@/components/admin/add-admin-modal";
import { Badge } from "@/components/ui/badge";
import {
  ShieldCheck,
  Plus,
  Trash2,
  Loader2,
  UserCheck,
  Mail,
  User,
} from "lucide-react";
import type { AdminUserItem } from "@/types";

export default function AdminUsersPage() {
  const [admins, setAdmins] = useState<AdminUserItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchAdmins = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/users");
      if (res.status === 401) {
        window.location.href = "/admin/login";
        return;
      }
      const data = await res.json();
      setAdmins(data.admins || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleDelete = async (admin: AdminUserItem) => {
    if (!confirm(`Are you sure you want to remove administrator "${admin.name}"?`)) return;
    setDeletingId(admin.id);
    try {
      await fetch(`/api/admin/users/${admin.id}`, { method: "DELETE" });
      fetchAdmins();
    } catch (e) {
      console.error(e);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      <AdminHeader
        title="Administrator Accounts"
        description="Manage system access, dispatch staff credentials, and administrative roles."
      >
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="rounded-full btn-gold px-5 py-2.5 text-xs font-semibold shadow-gold inline-flex items-center gap-1.5"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>Add Administrator</span>
        </button>
      </AdminHeader>

      <main className="p-8 space-y-6">
        <div className="glass-card rounded-3xl border border-white/5 overflow-hidden shadow-xl">
          <div className="p-6 border-b border-white/5 flex items-center justify-between">
            <div>
              <h2 className="font-display text-lg font-bold text-white">Active Administrators</h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Staff members authorized to view reservations, dispatch chauffeurs, and manage fleet.
              </p>
            </div>
            <span className="text-xs text-gold font-mono bg-gold/10 px-3 py-1 rounded-full border border-gold/30">
              {admins.length} Total Users
            </span>
          </div>

          {loading ? (
            <div className="p-16 text-center text-muted-foreground">
              <Loader2 className="h-7 w-7 animate-spin text-gold mx-auto mb-2" />
              <p className="text-xs">Loading administrators...</p>
            </div>
          ) : admins.length === 0 ? (
            <div className="p-16 text-center text-muted-foreground">
              <UserCheck className="h-10 w-10 text-white/20 mx-auto mb-2" />
              <p className="text-sm font-medium text-white">No administrators found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#0D0D0D] border-b border-white/5 text-muted-foreground uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="px-6 py-4">Administrator</th>
                    <th className="px-6 py-4">Username</th>
                    <th className="px-6 py-4">Email</th>
                    <th className="px-6 py-4">Role</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {admins.map((a) => (
                    <tr key={a.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="grid h-9 w-9 place-items-center rounded-xl bg-gold/15 text-gold font-bold">
                            <User className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="font-semibold text-white">{a.name}</p>
                            <p className="text-[10px] text-muted-foreground font-mono">
                              ID: {a.id.slice(-8)}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-mono font-bold text-gold">
                        @{a.username || "admin"}
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">
                        <span className="flex items-center gap-1.5 text-white">
                          <Mail className="h-3.5 w-3.5 text-gold/70" />
                          <span>{a.email}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <Badge
                          variant={a.role === "SUPER_ADMIN" ? "success" : "default"}
                          className="text-[10px] px-2.5 py-0.5"
                        >
                          <ShieldCheck className="h-3 w-3 mr-1" />
                          <span>{a.role}</span>
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-right">
                        {admins.length > 1 ? (
                          <button
                            type="button"
                            disabled={deletingId === a.id}
                            onClick={() => handleDelete(a)}
                            className="text-rose-400 hover:text-rose-300 p-2 rounded-lg hover:bg-rose-950/30 transition-all inline-flex items-center gap-1 text-xs"
                          >
                            {deletingId === a.id ? (
                              <Loader2 className="h-3.5 w-3.5 animate-spin" />
                            ) : (
                              <Trash2 className="h-3.5 w-3.5" />
                            )}
                            <span>Delete</span>
                          </button>
                        ) : (
                          <span className="text-[10px] text-muted-foreground">Primary Account</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Add Admin Modal */}
      <AddAdminModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onCreated={fetchAdmins}
      />
    </div>
  );
}
