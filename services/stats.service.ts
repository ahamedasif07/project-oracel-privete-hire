import { connectDB } from "@/lib/mongodb";
import { Booking } from "@/models/Booking";
import { ContactMessage } from "@/models/ContactMessage";
import { bookingService } from "./booking.service";
import { contactService } from "./contact.service";
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
    } catch {
      // Compute dynamically from local bookings and contact messages
      const bookings = await bookingService.getBookings();
      const messages = await contactService.getContactMessages();

      const totalBookings = bookings.length;
      const pendingBookings = bookings.filter((b) => b.status === "PENDING").length;
      const confirmedBookings = bookings.filter((b) => b.status === "CONFIRMED").length;
      const completedBookings = bookings.filter((b) => b.status === "COMPLETED").length;
      const totalRevenue = bookings
        .filter((b) => b.status !== "CANCELLED")
        .reduce((acc, b) => acc + (Number(b.estimatedFare) || 0), 0);
      const unreadMessages = messages.filter((m) => !m.isRead).length;

      return {
        stats: {
          totalBookings,
          pendingBookings,
          confirmedBookings,
          completedBookings,
          unreadMessages,
          totalRevenue,
        },
        recentBookings: bookings.slice(0, 6),
      };
    }
  }
}

export const statsService = new StatsService();
