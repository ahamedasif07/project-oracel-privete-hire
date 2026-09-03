import { connectDB } from "@/lib/mongodb";
import { Booking } from "@/models/Booking";
import { generateBookingReference } from "@/lib/utils";
import { sendBookingEmails } from "@/lib/mail";
import type { Booking as IBookingType } from "@/types";

export interface CreateBookingDTO {
  serviceType?: string;
  pickupAddress: string;
  dropoffAddress: string;
  viaAddress?: string | null;
  pickupDate: string;
  pickupTime: string;
  isReturn?: boolean;
  returnDate?: string | null;
  returnTime?: string | null;
  flightNumber?: string | null;
  airportName?: string | null;
  terminal?: string | null;
  vehicleType?: string;
  passengers?: number;
  luggage?: number;
  childSeats?: number;
  passengerName: string;
  passengerEmail: string;
  passengerPhone: string;
  specialRequests?: string | null;
  estimatedFare?: number;
  paymentMethod?: string;
}

export interface UpdateBookingDTO {
  status?: string;
  paymentStatus?: string;
  adminNotes?: string;
  assignedDriver?: string;
  estimatedFare?: number;
}

export interface BookingFilterOptions {
  status?: string | null;
  search?: string | null;
}

class BookingService {
  /**
   * Creates a new booking reservation and triggers confirmation emails
   */
  public async createBooking(dto: CreateBookingDTO): Promise<IBookingType> {
    if (
      !dto.pickupAddress ||
      !dto.dropoffAddress ||
      !dto.pickupDate ||
      !dto.pickupTime ||
      !dto.passengerName ||
      !dto.passengerEmail ||
      !dto.passengerPhone
    ) {
      throw new Error("Missing required booking fields.");
    }

    await connectDB();
    const bookingRef = generateBookingReference();

    const booking = await Booking.create({
      bookingRef,
      serviceType: dto.serviceType || "airport",
      pickupAddress: dto.pickupAddress,
      dropoffAddress: dto.dropoffAddress,
      viaAddress: dto.viaAddress || null,
      pickupDate: dto.pickupDate,
      pickupTime: dto.pickupTime,
      isReturn: Boolean(dto.isReturn),
      returnDate: dto.returnDate || null,
      returnTime: dto.returnTime || null,
      flightNumber: dto.flightNumber || null,
      airportName: dto.airportName || null,
      terminal: dto.terminal || null,
      vehicleType: dto.vehicleType || "Executive Saloon",
      passengers: Number(dto.passengers) || 1,
      luggage: Number(dto.luggage) || 1,
      childSeats: Number(dto.childSeats) || 0,
      passengerName: dto.passengerName,
      passengerEmail: dto.passengerEmail,
      passengerPhone: dto.passengerPhone,
      specialRequests: dto.specialRequests || null,
      estimatedFare: Number(dto.estimatedFare) || 0,
      paymentMethod: dto.paymentMethod || "cash_to_driver",
      status: "PENDING",
      paymentStatus: "UNPAID",
    });

    // Send confirmation emails in background
    sendBookingEmails({
      bookingRef: booking.bookingRef,
      passengerName: booking.passengerName,
      passengerEmail: booking.passengerEmail,
      passengerPhone: booking.passengerPhone,
      serviceType: booking.serviceType,
      vehicleType: booking.vehicleType,
      pickupAddress: booking.pickupAddress,
      dropoffAddress: booking.dropoffAddress,
      pickupDate: booking.pickupDate,
      pickupTime: booking.pickupTime,
      returnDate: booking.returnDate,
      returnTime: booking.returnTime,
      isReturn: booking.isReturn,
      flightNumber: booking.flightNumber,
      passengers: booking.passengers,
      luggage: booking.luggage,
      childSeats: booking.childSeats,
      estimatedFare: booking.estimatedFare,
      paymentMethod: booking.paymentMethod,
      specialRequests: booking.specialRequests,
    }).catch((err) => console.error("📧 Email dispatch error:", err));

    return booking.toJSON() as unknown as IBookingType;
  }

  /**
   * Retrieves bookings filtered by status or search keyword
   */
  public async getBookings(options: BookingFilterOptions = {}): Promise<IBookingType[]> {
    try {
      await connectDB();
      const filter: Record<string, unknown> = {};

      if (options.status && options.status !== "ALL") {
        filter.status = options.status;
      }

      if (options.search && options.search.trim()) {
        const regex = new RegExp(options.search.trim(), "i");
        filter.$or = [
          { bookingRef: regex },
          { passengerName: regex },
          { passengerEmail: regex },
          { passengerPhone: regex },
          { pickupAddress: regex },
          { dropoffAddress: regex },
        ];
      }

      const bookings = await Booking.find(filter).sort({ createdAt: -1 });
      return bookings.map((b) => b.toJSON()) as unknown as IBookingType[];
    } catch (err: any) {
      console.warn("⚠️ [BookingService] Returning empty list due to DB status:", err.message);
      return [];
    }
  }

  /**
   * Retrieves a single booking by ID
   */
  public async getBookingById(id: string): Promise<IBookingType | null> {
    await connectDB();
    const booking = await Booking.findById(id);
    if (!booking) return null;
    return booking.toJSON() as unknown as IBookingType;
  }

  /**
   * Updates booking fields by ID
   */
  public async updateBooking(id: string, dto: UpdateBookingDTO): Promise<IBookingType | null> {
    await connectDB();
    const updateData: Record<string, unknown> = {};

    if (dto.status !== undefined) updateData.status = dto.status;
    if (dto.paymentStatus !== undefined) updateData.paymentStatus = dto.paymentStatus;
    if (dto.adminNotes !== undefined) updateData.adminNotes = dto.adminNotes;
    if (dto.assignedDriver !== undefined) updateData.assignedDriver = dto.assignedDriver;
    if (dto.estimatedFare !== undefined) updateData.estimatedFare = Number(dto.estimatedFare);

    const updated = await Booking.findByIdAndUpdate(id, updateData, { new: true });
    if (!updated) return null;
    return updated.toJSON() as unknown as IBookingType;
  }

  /**
   * Deletes a booking by ID
   */
  public async deleteBooking(id: string): Promise<boolean> {
    await connectDB();
    const result = await Booking.findByIdAndDelete(id);
    return Boolean(result);
  }
}

export const bookingService = new BookingService();
