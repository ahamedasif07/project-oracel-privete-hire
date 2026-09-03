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
import { Loader2 } from "lucide-react";

interface ManualBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated: () => void;
}

export function ManualBookingModal({
  isOpen,
  onClose,
  onCreated,
}: ManualBookingModalProps) {
  const [formData, setFormData] = useState({
    serviceType: "airport",
    pickupAddress: "",
    dropoffAddress: "",
    pickupDate: new Date().toISOString().split("T")[0],
    pickupTime: "12:00",
    flightNumber: "",
    vehicleType: "Executive Saloon",
    passengers: 1,
    luggage: 1,
    passengerName: "",
    passengerEmail: "",
    passengerPhone: "",
    estimatedFare: 55,
    paymentMethod: "cash_to_driver",
    specialRequests: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create booking");

      onCreated();
      onClose();
    } catch (err: any) {
      setError(err.message || "Failed to save manual reservation.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-onyx border-gold/30">
        <DialogHeader>
          <DialogTitle className="text-2xl text-gradient-gold">
            Create Manual Reservation
          </DialogTitle>
          <p className="text-xs text-muted-foreground">
            Directly insert a telephone, VIP, or corporate reservation into the dispatch system.
          </p>
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
                Lead Passenger Name *
              </label>
              <Input
                placeholder="Full Name"
                value={formData.passengerName}
                onChange={(e) => setFormData({ ...formData, passengerName: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-1 font-medium">
                Passenger Phone *
              </label>
              <Input
                placeholder="Phone number"
                value={formData.passengerPhone}
                onChange={(e) => setFormData({ ...formData, passengerPhone: e.target.value })}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-1 font-medium">
              Passenger Email *
            </label>
            <Input
              type="email"
              placeholder="Email address for dispatch receipt"
              value={formData.passengerEmail}
              onChange={(e) => setFormData({ ...formData, passengerEmail: e.target.value })}
              required
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-1 font-medium">
                Pickup Address *
              </label>
              <Input
                placeholder="Pickup Location"
                value={formData.pickupAddress}
                onChange={(e) => setFormData({ ...formData, pickupAddress: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-1 font-medium">
                Destination Address *
              </label>
              <Input
                placeholder="Drop-off Destination"
                value={formData.dropoffAddress}
                onChange={(e) => setFormData({ ...formData, dropoffAddress: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-1 font-medium">
                Pickup Date *
              </label>
              <Input
                type="date"
                value={formData.pickupDate}
                onChange={(e) => setFormData({ ...formData, pickupDate: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-1 font-medium">
                Pickup Time *
              </label>
              <Input
                type="time"
                value={formData.pickupTime}
                onChange={(e) => setFormData({ ...formData, pickupTime: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-1 font-medium">
                Flight Number
              </label>
              <Input
                placeholder="e.g. BA114"
                value={formData.flightNumber}
                onChange={(e) => setFormData({ ...formData, flightNumber: e.target.value })}
              />
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-1 font-medium">
                Vehicle Type
              </label>
              <select
                value={formData.vehicleType}
                onChange={(e) => setFormData({ ...formData, vehicleType: e.target.value })}
                className="w-full h-12 rounded-xl border border-white/10 bg-[#0D0D0D] px-3 text-xs text-white focus:outline-none focus:border-gold"
              >
                <option value="Executive Saloon">Executive Saloon (E-Class)</option>
                <option value="Luxury MPV">Luxury MPV (V-Class)</option>
                <option value="Prestige SUV">Prestige SUV (Range Rover)</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-1 font-medium">
                Agreed Fare (£)
              </label>
              <Input
                type="number"
                step="0.01"
                value={formData.estimatedFare}
                onChange={(e) => setFormData({ ...formData, estimatedFare: Number(e.target.value) })}
                required
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-1 font-medium">
                Payment Type
              </label>
              <select
                value={formData.paymentMethod}
                onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                className="w-full h-12 rounded-xl border border-white/10 bg-[#0D0D0D] px-3 text-xs text-white focus:outline-none focus:border-gold"
              >
                <option value="cash_to_driver">Hand Cash (Pay Driver)</option>
                <option value="card_pay">Card Pay (Stripe Online)</option>
                <option value="pay_online">Pre-Pay Online Link</option>
                <option value="invoice">Corporate Invoice</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-1 font-medium">
              Special Notes / Instructions
            </label>
            <Textarea
              rows={2}
              placeholder="Driver notes, passenger requirements..."
              value={formData.specialRequests}
              onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
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
              {loading && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
              <span>Create Booking</span>
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
