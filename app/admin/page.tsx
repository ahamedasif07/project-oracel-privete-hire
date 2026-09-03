"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { AdminHeader } from "@/components/admin/admin-header";
import { BookingDetailModal } from "@/components/admin/booking-detail-modal";
import { ManualBookingModal } from "@/components/admin/manual-booking-modal";
import { Badge } from "@/components/ui/badge";
import {
  CalendarCheck,
  Clock,
  CheckCircle,
  Plus,
  ArrowRight,
  Loader2,
  RefreshCw,
  TrendingUp,
  Banknote,
  CreditCard,
} from "lucide-react";
import type { DashboardStats, Booking } from "@/types";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentBookings, setRecentBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isManualModalOpen, setIsManualModalOpen] = useState(false);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/stats");
      if (res.status === 401) {
        window.location.href = "/admin/login";
        return;
      }
      const data = await res.json();
      if (data.stats) {
        setStats(data.stats);
        setRecentBookings(data.recentBookings || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div>
      <AdminHeader
        title="Operations Dashboard"
        description="Real-time chauffeur dispatch analytics, revenue collections, and live booking pipeline."
      >
        <div className="flex items-center gap-3">
          <button
            onClick={fetchStats}
            title="Refresh statistics"
            className="p-2.5 rounded-full border border-white/10 text-muted-foreground hover:text-white hover:border-gold transition-colors"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin text-gold" : ""}`} />
          </button>
          <button
            onClick={() => setIsManualModalOpen(true)}
            className="rounded-full btn-gold px-5 py-2.5 text-xs font-semibold shadow-gold inline-flex items-center gap-1.5"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>New Booking</span>
          </button>
        </div>
      </AdminHeader>

      <main className="p-8 space-y-8">
        {/* KPI Metric Cards */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {/* Card 1: Paid Revenue */}
          <div className="glass-card rounded-2xl p-6 border border-emerald-500/30 bg-emerald-500/5 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-emerald-400 font-semibold">
                Collected Revenue (Paid)
              </span>
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-500/20 text-emerald-400 font-bold text-sm">
                £
              </div>
            </div>
            <p className="font-display text-3xl font-bold text-emerald-300 mt-3">
              {loading ? "-" : `£${(stats?.totalRevenue || 0).toFixed(2)}`}
            </p>
            <p className="text-[11px] text-emerald-400/80 mt-1 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              <span>{stats?.paidCount || 0} journeys settled</span>
            </p>
          </div>

          {/* Card 2: Pending Revenue */}
          <div className="glass-card rounded-2xl p-6 border border-amber-500/30 bg-amber-500/5 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-amber-400 font-semibold">
                Pending Payments
              </span>
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-amber-500/20 text-amber-400">
                <Banknote className="h-4 w-4" />
              </div>
            </div>
            <p className="font-display text-3xl font-bold text-amber-300 mt-3">
              {loading ? "-" : `£${(stats?.pendingRevenue || 0).toFixed(2)}`}
            </p>
            <p className="text-[11px] text-amber-400/80 mt-1">
              {stats?.unpaidCount || 0} hand cash / uncollected
            </p>
          </div>

          {/* Card 3: Total Bookings */}
          <div className="glass-card rounded-2xl p-6 border border-gold/30 bg-gold/5 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-gold font-semibold">
                Total Bookings
              </span>
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-gold/10 text-gold">
                <CalendarCheck className="h-4 w-4" />
              </div>
            </div>
            <p className="font-display text-3xl font-bold text-gradient-gold mt-3">
              {loading ? "-" : stats?.totalBookings || 0}
            </p>
            <p className="text-[11px] text-gold/80 mt-1">All recorded reservations</p>
          </div>

          {/* Card 4: Completed Journeys */}
          <div className="glass-card rounded-2xl p-6 border border-white/5 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                Completed Journeys
              </span>
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-white/10 text-white">
                <CheckCircle className="h-4 w-4" />
              </div>
            </div>
            <p className="font-display text-3xl font-bold text-white mt-3">
              {loading ? "-" : stats?.completedBookings || 0}
            </p>
            <p className="text-[11px] text-muted-foreground mt-1">
              {stats?.pendingBookings || 0} awaiting dispatch
            </p>
          </div>
        </div>

        {/* Recent Bookings Table */}
        <div className="glass-card rounded-3xl border border-white/5 overflow-hidden shadow-xl">
          <div className="p-6 border-b border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-display text-lg font-bold text-white">Recent Reservations</h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Latest customer bookings submitted online or created manually.
              </p>
            </div>
            <Link
              href="/admin/bookings"
              className="text-xs font-semibold text-gold hover:underline inline-flex items-center gap-1 self-start sm:self-auto"
            >
              <span>View All Bookings</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          {loading ? (
            <div className="p-12 text-center text-muted-foreground">
              <Loader2 className="h-6 w-6 animate-spin text-gold mx-auto mb-2" />
              <p className="text-xs">Loading reservations...</p>
            </div>
          ) : recentBookings.length === 0 ? (
            <div className="p-12 text-center text-muted-foreground">
              <CalendarCheck className="h-10 w-10 text-white/20 mx-auto mb-2" />
              <p className="text-sm font-medium text-white">No bookings yet</p>
              <p className="text-xs text-muted-foreground mt-1">
                New online bookings will appear here instantly.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#0D0D0D] border-b border-white/5 text-muted-foreground uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="px-6 py-4">Reference</th>
                    <th className="px-6 py-4">Passenger</th>
                    <th className="px-6 py-4">Route</th>
                    <th className="px-6 py-4">Vehicle</th>
                    <th className="px-6 py-4">Pickup Time</th>
                    <th className="px-6 py-4">Fare</th>
                    <th className="px-6 py-4">Payment</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {recentBookings.map((b) => (
                    <tr
                      key={b.id}
                      className="hover:bg-white/[0.02] transition-colors cursor-pointer"
                      onClick={() => setSelectedBooking(b)}
                    >
                      <td className="px-6 py-4 font-mono font-bold text-gold">
                        {b.bookingRef}
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-semibold text-white">{b.passengerName}</p>
                        <p className="text-[11px] text-muted-foreground">{b.passengerPhone}</p>
                      </td>
                      <td className="px-6 py-4 max-w-xs truncate">
                        <p className="text-white truncate">{b.pickupAddress}</p>
                        <p className="text-[11px] text-muted-foreground truncate">
                          &rarr; {b.dropoffAddress}
                        </p>
                      </td>
                      <td className="px-6 py-4 text-white/90">
                        {b.vehicleType}
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-white">{b.pickupDate}</p>
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
                          className="text-xs text-gold hover:underline font-semibold"
                        >
                          View / Edit
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

      {/* Booking Details Modal */}
      {selectedBooking && (
        <BookingDetailModal
          booking={selectedBooking}
          isOpen={Boolean(selectedBooking)}
          onClose={() => setSelectedBooking(null)}
          onUpdated={fetchStats}
        />
      )}

      {/* Manual Booking Modal */}
      <ManualBookingModal
        isOpen={isManualModalOpen}
        onClose={() => setIsManualModalOpen(false)}
        onCreated={fetchStats}
      />
    </div>
  );
}
