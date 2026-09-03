"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { AdminHeader } from "@/components/admin/admin-header";
import { AddVehicleModal } from "@/components/admin/add-vehicle-modal";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Loader2, Save, Plus, Trash2, CheckCircle2 } from "lucide-react";
import type { Vehicle } from "@/types";

export default function AdminFleetPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [savedSuccessId, setSavedSuccessId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const fetchVehicles = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/fleet");
      if (res.status === 401) {
        window.location.href = "/admin/login";
        return;
      }
      const data = await res.json();
      setVehicles(data.vehicles || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const handleUpdate = async (v: Vehicle) => {
    setSavingId(v.id);
    setSavedSuccessId(null);
    try {
      const res = await fetch("/api/fleet", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(v),
      });
      if (res.ok) {
        setSavedSuccessId(v.id);
        setTimeout(() => setSavedSuccessId(null), 3000);
      }
      fetchVehicles();
    } catch (e) {
      console.error(e);
    } finally {
      setSavingId(null);
    }
  };

  const handleDelete = async (v: Vehicle) => {
    if (!confirm(`Are you sure you want to remove ${v.name} from the active fleet?`)) return;
    setDeletingId(v.id);
    try {
      await fetch(`/api/fleet/${v.id}`, { method: "DELETE" });
      fetchVehicles();
    } catch (e) {
      console.error(e);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      <AdminHeader
        title="Fleet Vehicles & Pricing"
        description="Add new cars, configure base quotes, per-mile pricing multipliers, and fleet specifications."
      >
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="rounded-full btn-gold px-5 py-2.5 text-xs font-semibold shadow-gold inline-flex items-center gap-1.5"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>Add New Vehicle</span>
        </button>
      </AdminHeader>

      <main className="p-8 space-y-8">
        {loading ? (
          <div className="p-16 text-center text-muted-foreground">
            <Loader2 className="h-7 w-7 animate-spin text-gold mx-auto mb-2" />
            <p className="text-xs">Loading vehicle fleet...</p>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-3">
            {vehicles.map((v) => (
              <div
                key={v.id}
                className="glass-card rounded-3xl border border-white/5 overflow-hidden flex flex-col justify-between shadow-xl"
              >
                <div>
                  <div className="relative h-44 w-full bg-black">
                    <Image
                      src={v.image || "/images/fleet-executive.jpg"}
                      alt={v.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="rounded-full bg-[#0D0D0D]/85 border border-gold/40 px-3 py-1 text-[10px] uppercase tracking-widest text-gold backdrop-blur">
                        {v.tag}
                      </span>
                    </div>

                    <button
                      type="button"
                      disabled={deletingId === v.id}
                      onClick={() => handleDelete(v)}
                      title="Delete vehicle from fleet"
                      className="absolute top-3 right-3 h-8 w-8 rounded-full bg-black/70 border border-red-500/40 text-red-400 hover:bg-red-950/80 flex items-center justify-center transition-all"
                    >
                      {deletingId === v.id ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <Trash2 className="h-3.5 w-3.5" />
                      )}
                    </button>
                  </div>

                  <div className="p-6 space-y-4">
                    <div className="space-y-2">
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-1 font-medium">
                          Vehicle Display Name
                        </label>
                        <Input
                          value={v.name}
                          onChange={(e) =>
                            setVehicles((prev) =>
                              prev.map((item) =>
                                item.id === v.id ? { ...item, name: e.target.value } : item
                              )
                            )
                          }
                          className="font-bold text-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-1 font-medium">
                          Model Tag
                        </label>
                        <Input
                          value={v.tag}
                          onChange={(e) =>
                            setVehicles((prev) =>
                              prev.map((item) =>
                                item.id === v.id ? { ...item, tag: e.target.value } : item
                              )
                            )
                          }
                        />
                      </div>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2 pt-1">
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-1 font-medium">
                          Base Quote Rate (£)
                        </label>
                        <Input
                          type="number"
                          step="1"
                          value={v.basePrice}
                          onChange={(e) =>
                            setVehicles((prev) =>
                              prev.map((item) =>
                                item.id === v.id
                                  ? { ...item, basePrice: Number(e.target.value) }
                                  : item
                              )
                            )
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-1 font-medium">
                          Per-Mile Rate (£)
                        </label>
                        <Input
                          type="number"
                          step="0.1"
                          value={v.perMileRate}
                          onChange={(e) =>
                            setVehicles((prev) =>
                              prev.map((item) =>
                                item.id === v.id
                                  ? { ...item, perMileRate: Number(e.target.value) }
                                  : item
                              )
                            )
                          }
                        />
                      </div>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-1 font-medium">
                          Max Passengers
                        </label>
                        <Input
                          type="number"
                          value={v.seats}
                          onChange={(e) =>
                            setVehicles((prev) =>
                              prev.map((item) =>
                                item.id === v.id
                                  ? { ...item, seats: Number(e.target.value) }
                                  : item
                              )
                            )
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-1 font-medium">
                          Max Luggage
                        </label>
                        <Input
                          type="number"
                          value={v.luggage}
                          onChange={(e) =>
                            setVehicles((prev) =>
                              prev.map((item) =>
                                item.id === v.id
                                  ? { ...item, luggage: Number(e.target.value) }
                                  : item
                              )
                            )
                          }
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-1 font-medium">
                        Description
                      </label>
                      <Textarea
                        rows={2}
                        value={v.description || ""}
                        onChange={(e) =>
                          setVehicles((prev) =>
                            prev.map((item) =>
                              item.id === v.id ? { ...item, description: e.target.value } : item
                            )
                          )
                        }
                      />
                    </div>

                    <div className="pt-2 flex items-center justify-between border-t border-white/5">
                      <span className="text-xs text-white font-medium">Active for Online Booking</span>
                      <Switch
                        checked={v.isActive}
                        onCheckedChange={(checked) =>
                          setVehicles((prev) =>
                            prev.map((item) =>
                              item.id === v.id ? { ...item, isActive: checked } : item
                            )
                          )
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button
                    onClick={() => handleUpdate(v)}
                    disabled={savingId === v.id}
                    className="w-full rounded-full btn-gold py-3 text-xs font-semibold shadow-gold inline-flex items-center justify-center gap-2"
                  >
                    {savingId === v.id ? (
                      <>
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        <span>Saving Changes...</span>
                      </>
                    ) : savedSuccessId === v.id ? (
                      <>
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                        <span className="text-emerald-300 font-bold">Rates Updated ✓</span>
                      </>
                    ) : (
                      <>
                        <Save className="h-3.5 w-3.5" />
                        <span>Save Vehicle Details</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Add New Vehicle Modal */}
      <AddVehicleModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onCreated={fetchVehicles}
      />
    </div>
  );
}
