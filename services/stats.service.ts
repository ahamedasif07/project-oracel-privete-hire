import { connectDB } from "@/lib/mongodb";
import { Booking } from "@/models/Booking";
import { ContactMessage } from "@/models/ContactMessage";
import type { DashboardStats, Booking as IBookingType } from "@/types";

class StatsService {
  /**
   * Computes key dashboard metrics and recent reservations
   */
  public async getDashboardStats(): Promise<{
    stats: DashboardStats;
    recentBookings: IBookingType[];
  }> {
    try {
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

      return {
        stats,
        recentBookings: recentBookings.map((b) => b.toJSON()) as unknown as IBookingType[],
      };
    } catch (err: any) {
      console.warn("⚠️ [StatsService] Returning baseline metrics due to DB status:", err.message);
      return {
        stats: {
          totalBookings: 0,
          pendingBookings: 0,
          confirmedBookings: 0,
          completedBookings: 0,
          unreadMessages: 0,
          totalRevenue: 0,
        },
        recentBookings: [],
      };
    }
  }
}

export const statsService = new StatsService();
