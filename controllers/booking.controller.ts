import { NextRequest, NextResponse } from "next/server";
import { bookingService } from "@/services/booking.service";
import { getCurrentAdmin } from "@/lib/auth";

class BookingController {
  /**
   * Handles customer booking creation (Public)
   */
  public async createBooking(req: NextRequest): Promise<NextResponse> {
    try {
      const body = await req.json().catch(() => ({}));
      const booking = await bookingService.createBooking(body);

      return NextResponse.json(
        { success: true, booking },
        { status: 201 }
      );
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Failed to create reservation.";
      console.error("Booking creation error:", errorMessage);
      return NextResponse.json({ error: errorMessage }, { status: 400 });
    }
  }

  /**
   * Handles retrieving all bookings with status/search filters (Admin Only)
   */
  public async getBookings(req: NextRequest): Promise<NextResponse> {
    try {
      const admin = await getCurrentAdmin();
      if (!admin) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      const { searchParams } = new URL(req.url);
      const status = searchParams.get("status");
      const search = searchParams.get("search");

      const bookings = await bookingService.getBookings({ status, search });
      return NextResponse.json({ bookings });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Failed to fetch bookings.";
      console.error("Fetch bookings error:", errorMessage);
      return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
  }

  /**
   * Handles retrieving a specific booking by ID (Admin or Lookup)
   */
  public async getBookingById(req: NextRequest, id: string): Promise<NextResponse> {
    try {
      const booking = await bookingService.getBookingById(id);
      if (!booking) {
        return NextResponse.json({ error: "Booking not found." }, { status: 404 });
      }
      return NextResponse.json({ booking });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Error fetching booking.";
      return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
  }

  /**
   * Handles updating a booking by ID (Admin Only)
   */
  public async updateBooking(req: NextRequest, id: string): Promise<NextResponse> {
    try {
      const admin = await getCurrentAdmin();
      if (!admin) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      const body = await req.json().catch(() => ({}));
      const updated = await bookingService.updateBooking(id, body);

      if (!updated) {
        return NextResponse.json({ error: "Booking not found." }, { status: 404 });
      }

      return NextResponse.json({ success: true, booking: updated });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Failed to update booking.";
      console.error("Update booking error:", errorMessage);
      return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
  }

  /**
   * Handles deleting a booking by ID (Admin Only)
   */
  public async deleteBooking(req: NextRequest, id: string): Promise<NextResponse> {
    try {
      const admin = await getCurrentAdmin();
      if (!admin) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      const deleted = await bookingService.deleteBooking(id);
      if (!deleted) {
        return NextResponse.json({ error: "Booking not found." }, { status: 404 });
      }

      return NextResponse.json({ success: true });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Failed to delete booking.";
      return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
  }
}

export const bookingController = new BookingController();
