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
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  User,
  Mail,
  Phone,
  Car,
  Loader2,
  Trash2,
} from "lucide-react";
import type { Booking } from "@/types";

interface BookingDetailModalProps {
  booking: Booking | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdated: () => void;
}

export function BookingDetailModal({
  booking,
  isOpen,
  onClose,
  onUpdated,
}: BookingDetailModalProps) {
  const [status, setStatus] = useState(booking?.status || "PENDING");
  const [paymentStatus, setPaymentStatus] = useState(booking?.paymentStatus || "UNPAID");
  const [assignedDriver, setAssignedDriver] = useState(booking?.assignedDriver || "");
  const [estimatedFare, setEstimatedFare] = useState<number>(booking?.estimatedFare || 0);
  const [adminNotes, setAdminNotes] = useState(booking?.adminNotes || "");
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  if (!booking) return null;

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/bookings/${booking.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status,
          paymentStatus,
          assignedDriver,
          estimatedFare: Number(estimatedFare),
          adminNotes,
        }),
      });

      if (res.ok) {
        onUpdated();
        onClose();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to permanently delete this reservation?")) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/bookings/${booking.id}`, { method: "DELETE" });
      if (res.ok) {
        onUpdated();
        onClose();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-onyx border-gold/30">
        <DialogHeader>
          <div className="flex items-center justify-between pr-6">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-gold font-bold">
                Booking Reference
              </span>
              <DialogTitle className="text-2xl text-gradient-gold">
                {booking.bookingRef}
              </DialogTitle>
            </div>
            <Badge
              variant={
                status === "CONFIRMED"
                  ? "success"
                  : status === "COMPLETED"
                  ? "completed"
                  : status === "CANCELLED"
                  ? "cancelled"
                  : "pending"
              }
              className="text-xs px-3 py-1 uppercase tracking-wider"
            >
              {status}
            </Badge>
          </div>
        </DialogHeader>

        <div className="space-y-6 text-xs md:text-sm pt-2">
          {/* Journey Section */}
          <div className="p-4 rounded-2xl bg-[#0D0D0D] border border-white/5 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gold flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" />
              <span>Route & Schedule</span>
            </h4>

            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <span className="text-[10px] uppercase text-muted-foreground block">Pickup</span>
                <p className="text-white font-medium">{booking.pickupAddress}</p>
              </div>
              <div>
                <span className="text-[10px] uppercase text-muted-foreground block">Destination</span>
                <p className="text-white font-medium">{booking.dropoffAddress}</p>
              </div>
              <div>
                <span className="text-[10px] uppercase text-muted-foreground block">Pickup Date & Time</span>
                <p className="text-white font-medium">{booking.pickupDate} at {booking.pickupTime}</p>
              </div>
              {booking.flightNumber && (
                <div>
                  <span className="text-[10px] uppercase text-muted-foreground block">Flight Number</span>
                  <p className="text-gold font-semibold">{booking.flightNumber}</p>
                </div>
              )}
              {booking.isReturn && (
                <div className="sm:col-span-2 pt-2 border-t border-white/5">
                  <span className="text-[10px] uppercase text-muted-foreground block">Return Date & Time</span>
                  <p className="text-white font-medium">{booking.returnDate} at {booking.returnTime}</p>
                </div>
              )}
            </div>
          </div>

          {/* Passenger & Vehicle */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="p-4 rounded-2xl bg-[#0D0D0D] border border-white/5 space-y-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-gold flex items-center gap-1.5">
                <User className="h-3.5 w-3.5" />
                <span>Lead Passenger</span>
              </h4>
              <p className="text-white font-semibold">{booking.passengerName}</p>
              <p className="text-muted-foreground flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5 text-gold" /> {booking.passengerEmail}
              </p>
              <p className="text-muted-foreground flex items-center gap-1.5">
                <Phone className="h-3.5 w-3.5 text-gold" /> {booking.passengerPhone}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#0D0D0D] border border-white/5 space-y-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-gold flex items-center gap-1.5">
                <Car className="h-3.5 w-3.5" />
                <span>Vehicle &amp; Capacity</span>
              </h4>
              <p className="text-white font-semibold">{booking.vehicleType}</p>
              <div className="flex gap-4 text-xs text-muted-foreground pt-1">
                <span>{booking.passengers} Passengers</span>
                <span>{booking.luggage} Bags</span>
                {booking.childSeats > 0 && <span>{booking.childSeats} Child Seats</span>}
              </div>
            </div>
          </div>

          {booking.specialRequests && (
            <div className="p-4 rounded-2xl bg-[#0D0D0D] border border-white/5">
              <span className="text-[10px] uppercase text-gold font-semibold block mb-1">
                Special Requests / Customer Instructions
              </span>
              <p className="text-muted-foreground text-xs leading-relaxed">{booking.specialRequests}</p>
            </div>
          )}

          {/* Admin Management Controls */}
          <div className="p-5 rounded-2xl bg-gold/5 border border-gold/30 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gold">
              Dispatcher Actions &amp; Status Controls
            </h4>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-1.5 font-medium">
                  Booking Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full h-11 rounded-xl border border-white/10 bg-[#0D0D0D] px-3 text-xs text-white focus:outline-none focus:border-gold"
                >
                  <option value="PENDING">PENDING (Awaiting confirmation)</option>
                  <option value="CONFIRMED">CONFIRMED (Chauffeur allocated)</option>
                  <option value="COMPLETED">COMPLETED (Journey fulfilled)</option>
                  <option value="CANCELLED">CANCELLED</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-1.5 font-medium">
                  Payment Status
                </label>
                <select
                  value={paymentStatus}
                  onChange={(e) => setPaymentStatus(e.target.value)}
                  className="w-full h-11 rounded-xl border border-white/10 bg-[#0D0D0D] px-3 text-xs text-white focus:outline-none focus:border-gold"
                >
                  <option value="UNPAID">UNPAID</option>
                  <option value="PAID">PAID</option>
                </select>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-1.5 font-medium">
                  Assigned Chauffeur Name
                </label>
                <Input
                  placeholder="e.g. David Sterling (Reg: Mercedes VK23)"
                  value={assignedDriver}
                  onChange={(e) => setAssignedDriver(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-1.5 font-medium">
                  Fare Amount (£)
                </label>
                <Input
                  type="number"
                  step="0.01"
                  value={estimatedFare}
                  onChange={(e) => setEstimatedFare(Number(e.target.value))}
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-1.5 font-medium">
                Internal Dispatch Notes
              </label>
              <Textarea
                rows={2}
                placeholder="Internal notes for driver, terminal parking bay, flight gate updates..."
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
              />
            </div>
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-white/5">
          <button
            type="button"
            disabled={deleting}
            onClick={handleDelete}
            className="text-rose-400 hover:text-rose-300 text-xs flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-rose-950/30"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>Delete Booking</span>
          </button>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full btn-ghost-gold px-5 py-2.5 text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={loading}
              onClick={handleSave}
              className="rounded-full btn-gold px-7 py-2.5 text-xs font-semibold shadow-gold inline-flex items-center gap-1.5"
            >
              {loading && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
              <span>Save Changes</span>
            </button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
