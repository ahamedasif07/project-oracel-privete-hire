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
        Booking.find({}, "estimatedFare status paymentStatus"),
        ContactMessage.countDocuments({ isRead: false }),
        Booking.find({}).sort({ createdAt: -1 }).limit(8),
      ]);

      // Total collected revenue from PAID bookings
      const totalRevenue = allBookings
        .filter((b) => b.paymentStatus === "PAID")
        .reduce((acc, curr) => acc + (Number(curr.estimatedFare) || 0), 0);

      // Pending revenue from UNPAID bookings (excluding cancelled)
      const pendingRevenue = allBookings
        .filter((b) => b.paymentStatus === "UNPAID" && b.status !== "CANCELLED")
        .reduce((acc, curr) => acc + (Number(curr.estimatedFare) || 0), 0);

      const paidCount = allBookings.filter((b) => b.paymentStatus === "PAID").length;
      const unpaidCount = allBookings.filter((b) => b.paymentStatus === "UNPAID" && b.status !== "CANCELLED").length;

      const stats: DashboardStats = {
        totalBookings,
        pendingBookings,
        confirmedBookings,
        completedBookings,
        unreadMessages,
        totalRevenue,
        pendingRevenue,
        paidCount,
        unpaidCount,
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
        .filter((b) => b.paymentStatus === "PAID")
        .reduce((acc, b) => acc + (Number(b.estimatedFare) || 0), 0);

      const pendingRevenue = bookings
        .filter((b) => b.paymentStatus === "UNPAID" && b.status !== "CANCELLED")
        .reduce((acc, b) => acc + (Number(b.estimatedFare) || 0), 0);

      const paidCount = bookings.filter((b) => b.paymentStatus === "PAID").length;
      const unpaidCount = bookings.filter((b) => b.paymentStatus === "UNPAID" && b.status !== "CANCELLED").length;
      const unreadMessages = messages.filter((m) => !m.isRead).length;

      return {
        stats: {
          totalBookings,
          pendingBookings,
          confirmedBookings,
          completedBookings,
          unreadMessages,
          totalRevenue,
          pendingRevenue,
          paidCount,
          unpaidCount,
        },
        recentBookings: bookings.slice(0, 8),
      };
    }
  }
}

export const statsService = new StatsService();
