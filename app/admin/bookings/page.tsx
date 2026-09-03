"use client";

import { useState, useEffect } from "react";
import { AdminHeader } from "@/components/admin/admin-header";
import { BookingDetailModal } from "@/components/admin/booking-detail-modal";
import { ManualBookingModal } from "@/components/admin/manual-booking-modal";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  CalendarCheck,
  Search,
  Plus,
  Loader2,
} from "lucide-react";
import type { Booking } from "@/types";

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isManualModalOpen, setIsManualModalOpen] = useState(false);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      let url = `/api/bookings?status=${selectedStatus}`;
      if (searchQuery.trim()) {
        url += `&search=${encodeURIComponent(searchQuery.trim())}`;
      }
      const res = await fetch(url);
      if (res.status === 401) {
        window.location.href = "/admin/login";
        return;
      }
      const data = await res.json();
      setBookings(data.bookings || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [selectedStatus]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchBookings();
  };

  return (
    <div>
      <AdminHeader
        title="Bookings Management"
        description="Search, dispatch, modify, and monitor all customer reservations."
      >
        <button
          onClick={() => setIsManualModalOpen(true)}
          className="rounded-full btn-gold px-5 py-2.5 text-xs font-semibold shadow-gold inline-flex items-center gap-1.5"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>New Booking</span>
        </button>
      </AdminHeader>

      <main className="p-8 space-y-6">
        {/* Filter bar & Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Status Tabs */}
          <div className="flex flex-wrap gap-1.5 p-1 rounded-2xl bg-onyx border border-white/5">
            {[
              { id: "ALL", label: "All Bookings" },
              { id: "PENDING", label: "Pending" },
              { id: "CONFIRMED", label: "Confirmed" },
              { id: "COMPLETED", label: "Completed" },
              { id: "CANCELLED", label: "Cancelled" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedStatus(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  selectedStatus === tab.id
                    ? "bg-gold text-ink shadow-sm"
                    : "text-muted-foreground hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search box */}
          <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 max-w-sm w-full">
            <div className="relative w-full">
              <Input
                placeholder="Search ref, passenger, address..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-10 text-xs pl-9"
              />
              <Search className="h-3.5 w-3.5 text-muted-foreground absolute left-3 top-3.5" />
            </div>
            <button
              type="submit"
              className="rounded-xl btn-gold px-4 py-2 text-xs font-semibold shrink-0"
            >
              Search
            </button>
          </form>
        </div>

        {/* Bookings Table */}
        <div className="glass-card rounded-3xl border border-white/5 overflow-hidden shadow-xl">
          {loading ? (
            <div className="p-16 text-center text-muted-foreground">
              <Loader2 className="h-7 w-7 animate-spin text-gold mx-auto mb-2" />
              <p className="text-xs">Fetching bookings...</p>
            </div>
          ) : bookings.length === 0 ? (
            <div className="p-16 text-center text-muted-foreground">
              <CalendarCheck className="h-10 w-10 text-white/20 mx-auto mb-2" />
              <p className="text-sm font-medium text-white">No matching bookings found</p>
              <p className="text-xs text-muted-foreground mt-1">
                Try clearing your search filters or status selection.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#0D0D0D] border-b border-white/5 text-muted-foreground uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="px-6 py-4">Reference</th>
                    <th className="px-6 py-4">Passenger Details</th>
                    <th className="px-6 py-4">Pickup &amp; Destination</th>
                    <th className="px-6 py-4">Vehicle Tier</th>
                    <th className="px-6 py-4">Pickup Schedule</th>
                    <th className="px-6 py-4">Fare</th>
                    <th className="px-6 py-4">Payment</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {bookings.map((b) => (
                    <tr
                      key={b.id}
                      onClick={() => setSelectedBooking(b)}
                      className="hover:bg-white/[0.02] transition-colors cursor-pointer"
                    >
                      <td className="px-6 py-4 font-mono font-bold text-gold">
                        {b.bookingRef}
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-semibold text-white">{b.passengerName}</p>
                        <p className="text-[11px] text-muted-foreground">{b.passengerPhone}</p>
                        <p className="text-[11px] text-muted-foreground truncate max-w-[140px]">
                          {b.passengerEmail}
                        </p>
                      </td>
                      <td className="px-6 py-4 max-w-xs">
                        <p className="text-white truncate flex items-center gap-1">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0" />
                          <span className="truncate">{b.pickupAddress}</span>
                        </p>
                        <p className="text-[11px] text-muted-foreground truncate flex items-center gap-1 mt-0.5">
                          <span className="h-1.5 w-1.5 rounded-full bg-gold shrink-0" />
                          <span className="truncate">{b.dropoffAddress}</span>
                        </p>
                        {b.flightNumber && (
                          <span className="inline-block mt-1 text-[10px] bg-gold/10 text-gold px-1.5 py-0.5 rounded font-mono">
                            Flight: {b.flightNumber}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-medium text-white">{b.vehicleType}</span>
                        <p className="text-[10px] text-muted-foreground mt-0.5">
                          {b.passengers} Pax &middot; {b.luggage} Bags
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-medium text-white">{b.pickupDate}</p>
                        <p className="text-[11px] text-muted-foreground">{b.pickupTime}</p>
                      </td>
                      <td className="px-6 py-4 font-bold text-white">
                        £{Number(b.estimatedFare).toFixed(2)}
                      </td>
                      <td className="px-6 py-4">
                        <Badge
                          variant={b.paymentStatus === "PAID" ? "success" : "pending"}
                          className="text-[10px] px-2 py-0.5 uppercase tracking-wider"
                        >
                          {b.paymentStatus === "PAID" ? "PAID ✓" : "UNPAID"}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <Badge
                          variant={
                            b.status === "CONFIRMED"
                              ? "success"
                              : b.status === "COMPLETED"
                              ? "completed"
                              : b.status === "CANCELLED"
                              ? "cancelled"
                              : "pending"
                          }
                          className="text-[10px] px-2.5 py-0.5"
                        >
                          {b.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedBooking(b);
                          }}
                          className="rounded-lg bg-gold/10 border border-gold/30 text-gold px-3 py-1.5 text-xs font-semibold hover:bg-gold hover:text-ink transition-all"
                        >
                          Details &amp; Dispatch
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Details Modal */}
      {selectedBooking && (
        <BookingDetailModal
          booking={selectedBooking}
          isOpen={Boolean(selectedBooking)}
          onClose={() => setSelectedBooking(null)}
          onUpdated={fetchBookings}
        />
      )}

      {/* Manual Booking Modal */}
      <ManualBookingModal
        isOpen={isManualModalOpen}
        onClose={() => setIsManualModalOpen(false)}
        onCreated={fetchBookings}
      />
    </div>
  );
}
