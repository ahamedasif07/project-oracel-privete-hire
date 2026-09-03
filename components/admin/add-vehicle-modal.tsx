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
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Plus, Car } from "lucide-react";

interface AddVehicleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated: () => void;
}

export function AddVehicleModal({
  isOpen,
  onClose,
  onCreated,
}: AddVehicleModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    tag: "",
    basePrice: 50,
    perMileRate: 2.5,
    seats: 4,
    luggage: 3,
    image: "/images/fleet-executive.jpg",
    description: "",
    features: "Leather Interior,Dual Climate Control,High-Speed Wi-Fi,Bottled Water",
    isActive: true,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.tag.trim()) {
      setError("Please provide a vehicle name and model tag.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/fleet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to add vehicle to fleet.");
      }

      onCreated();
      onClose();
      // Reset
      setFormData({
        name: "",
        tag: "",
        basePrice: 50,
        perMileRate: 2.5,
        seats: 4,
        luggage: 3,
        image: "/images/fleet-executive.jpg",
        description: "",
        features: "Leather Interior,Dual Climate Control,High-Speed Wi-Fi,Bottled Water",
        isActive: true,
      });
    } catch (err: any) {
      setError(err.message || "Failed to add vehicle.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto bg-onyx border-gold/30">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-gold/10 text-gold">
              <Car className="h-5 w-5" />
            </div>
            <div>
              <DialogTitle className="text-xl text-gradient-gold font-bold">
                Add New Fleet Vehicle
              </DialogTitle>
              <p className="text-xs text-muted-foreground">
                Configure rates, passenger capacity, and vehicle tier specifications.
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
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-1 font-medium">
                Tier Display Name *
              </label>
              <Input
                placeholder="e.g. First Class Saloon, Luxury Minibus"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-1 font-medium">
                Car Model Tag *
              </label>
              <Input
                placeholder="e.g. Mercedes-Benz S-Class, BMW 7 Series"
                value={formData.tag}
                onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-1 font-medium">
                Base Quote Rate (£) *
              </label>
              <Input
                type="number"
                step="1"
                min="10"
                value={formData.basePrice}
                onChange={(e) =>
                  setFormData({ ...formData, basePrice: Number(e.target.value) })
                }
                required
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-1 font-medium">
                Per-Mile Rate (£) *
              </label>
              <Input
                type="number"
                step="0.1"
                min="0.5"
                value={formData.perMileRate}
                onChange={(e) =>
                  setFormData({ ...formData, perMileRate: Number(e.target.value) })
                }
                required
              />
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-1 font-medium">
                Max Passenger Seats
              </label>
              <Input
                type="number"
                min="1"
                max="16"
                value={formData.seats}
                onChange={(e) =>
                  setFormData({ ...formData, seats: Number(e.target.value) })
                }
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-1 font-medium">
                Max Luggage Capacity
              </label>
              <Input
                type="number"
                min="0"
                max="20"
                value={formData.luggage}
                onChange={(e) =>
                  setFormData({ ...formData, luggage: Number(e.target.value) })
                }
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-1 font-medium">
              Image Selection / URL
            </label>
            <select
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full h-11 rounded-xl border border-white/10 bg-[#0D0D0D] px-3 text-xs text-white focus:outline-none focus:border-gold"
            >
              <option value="/images/fleet-executive.jpg">Executive Saloon (Mercedes E-Class)</option>
              <option value="/images/fleet-mpv.jpg">Luxury MPV (Mercedes V-Class)</option>
              <option value="/images/fleet-suv.jpg">Prestige SUV (Range Rover)</option>
              <option value="/images/fleet-mpv2.jpg">VIP Passenger Van</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-1 font-medium">
              Short Description
            </label>
            <Textarea
              rows={2}
              placeholder="e.g. Flagship chauffeur saloon providing whisper-quiet comfort and luxury amenities."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-1 font-medium">
              Features (Comma separated)
            </label>
            <Input
              placeholder="Leather Seats, Dual Climate Control, High-Speed Wi-Fi, USB Chargers"
              value={formData.features}
              onChange={(e) => setFormData({ ...formData, features: e.target.value })}
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
              <span>Add to Fleet</span>
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
