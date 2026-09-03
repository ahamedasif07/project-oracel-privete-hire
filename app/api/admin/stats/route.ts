import { NextResponse } from "next/server";
import { connectDB, Booking, ContactMessage } from "@/lib/db";
import { getCurrentAdmin } from "@/lib/auth";
import type { DashboardStats, Booking as IBookingType } from "@/types";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const [
      totalBookings,
      pendingBookings,
      confirmedBookings,
      completedBookings,
      allBookings,
      unreadMessages,
      recentBookings,
    ] = await Promise.all([
      Booking.countDocuments(),
      Booking.countDocuments({ status: "PENDING" }),
      Booking.countDocuments({ status: "CONFIRMED" }),
      Booking.countDocuments({ status: "COMPLETED" }),
      Booking.find({}, "estimatedFare status"),
      ContactMessage.countDocuments({ isRead: false }),
      Booking.find({}).sort({ createdAt: -1 }).limit(6),
    ]);

    // Calculate total revenue from non-cancelled bookings
    const totalRevenue = allBookings
      .filter((b) => b.status !== "CANCELLED")
      .reduce((acc, curr) => acc + (curr.estimatedFare || 0), 0);

    const stats: DashboardStats = {
      totalBookings,
      pendingBookings,
      confirmedBookings,
      completedBookings,
      unreadMessages,
      totalRevenue,
    };

    return NextResponse.json({
      stats,
      recentBookings: recentBookings.map((b) => b.toJSON()) as unknown as IBookingType[],
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Failed to fetch stats.";
    console.error("Stats error:", errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
