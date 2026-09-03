import { connectDB } from "@/lib/mongodb";
import { Booking } from "@/models/Booking";
import { generateBookingReference } from "@/lib/utils";
import { sendBookingEmails } from "@/lib/mail";
import { readJsonFile, writeJsonFile } from "@/lib/storage";
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

const STORAGE_FILE = "bookings.json";

class BookingService {
  /**
   * Helper to get local bookings
   */
  private getLocalBookings(): IBookingType[] {
    return readJsonFile<IBookingType[]>(STORAGE_FILE, []);
  }

  /**
   * Helper to save local bookings
   */
  private saveLocalBookings(bookings: IBookingType[]): void {
    writeJsonFile<IBookingType[]>(STORAGE_FILE, bookings);
  }

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

    const bookingRef = generateBookingReference();
    const newBookingData: IBookingType = {
      id: `bk_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
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
      adminNotes: null,
      assignedDriver: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    let savedBooking: IBookingType = newBookingData;

    // 1. Try persisting to MongoDB
    try {
      await connectDB();
      const dbDoc = await Booking.create({
        bookingRef,
        serviceType: newBookingData.serviceType,
        pickupAddress: newBookingData.pickupAddress,
        dropoffAddress: newBookingData.dropoffAddress,
        viaAddress: newBookingData.viaAddress,
        pickupDate: newBookingData.pickupDate,
        pickupTime: newBookingData.pickupTime,
        isReturn: newBookingData.isReturn,
        returnDate: newBookingData.returnDate,
        returnTime: newBookingData.returnTime,
        flightNumber: newBookingData.flightNumber,
        airportName: newBookingData.airportName,
        terminal: newBookingData.terminal,
        vehicleType: newBookingData.vehicleType,
        passengers: newBookingData.passengers,
        luggage: newBookingData.luggage,
        childSeats: newBookingData.childSeats,
        passengerName: newBookingData.passengerName,
        passengerEmail: newBookingData.passengerEmail,
        passengerPhone: newBookingData.passengerPhone,
        specialRequests: newBookingData.specialRequests,
        estimatedFare: newBookingData.estimatedFare,
        paymentMethod: newBookingData.paymentMethod,
        status: "PENDING",
        paymentStatus: "UNPAID",
      });
      savedBooking = dbDoc.toJSON() as unknown as IBookingType;
    } catch (dbErr: any) {
      console.warn("⚠️ [BookingService DB Warning]:", dbErr.message);
      // Save to local fallback store so booking is NEVER lost
      const localList = this.getLocalBookings();
      localList.unshift(newBookingData);
      this.saveLocalBookings(localList);
      savedBooking = newBookingData;
    }

    // 2. Send confirmation emails in background
    sendBookingEmails({
      bookingRef: savedBooking.bookingRef,
      passengerName: savedBooking.passengerName,
      passengerEmail: savedBooking.passengerEmail,
      passengerPhone: savedBooking.passengerPhone,
      serviceType: savedBooking.serviceType,
      vehicleType: savedBooking.vehicleType,
      pickupAddress: savedBooking.pickupAddress,
      dropoffAddress: savedBooking.dropoffAddress,
      pickupDate: savedBooking.pickupDate,
      pickupTime: savedBooking.pickupTime,
      returnDate: savedBooking.returnDate,
      returnTime: savedBooking.returnTime,
      isReturn: savedBooking.isReturn,
      flightNumber: savedBooking.flightNumber,
      passengers: savedBooking.passengers,
      luggage: savedBooking.luggage,
      childSeats: savedBooking.childSeats,
      estimatedFare: savedBooking.estimatedFare,
      paymentMethod: savedBooking.paymentMethod,
      specialRequests: savedBooking.specialRequests,
    }).catch((err) => console.error("📧 Email dispatch error:", err));

    return savedBooking;
  }

  /**
   * Retrieves bookings filtered by status or search keyword
   */
  public async getBookings(options: BookingFilterOptions = {}): Promise<IBookingType[]> {
    let allBookings: IBookingType[] = [];

    // Try MongoDB
    try {
      await connectDB();
      const docs = await Booking.find({}).sort({ createdAt: -1 });
      allBookings = docs.map((b) => b.toJSON()) as unknown as IBookingType[];
    } catch {
      // Ignore DB error, use local store
    }

    // Merge local bookings
    const local = this.getLocalBookings();
    const map = new Map<string, IBookingType>();

    allBookings.forEach((b) => map.set(b.bookingRef || b.id, b));
    local.forEach((b) => {
      if (!map.has(b.bookingRef || b.id)) {
        map.set(b.bookingRef || b.id, b);
      }
    });

    let result = Array.from(map.values());

    // Sort by createdAt desc
    result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    // Apply status filter
    if (options.status && options.status !== "ALL") {
      result = result.filter((b) => b.status === options.status);
    }

    // Apply search filter
    if (options.search && options.search.trim()) {
      const q = options.search.toLowerCase().trim();
      result = result.filter(
        (b) =>
          b.bookingRef?.toLowerCase().includes(q) ||
          b.passengerName?.toLowerCase().includes(q) ||
          b.passengerEmail?.toLowerCase().includes(q) ||
          b.passengerPhone?.toLowerCase().includes(q) ||
          b.pickupAddress?.toLowerCase().includes(q) ||
          b.dropoffAddress?.toLowerCase().includes(q)
      );
    }

    return result;
  }

  /**
   * Retrieves a single booking by ID
   */
  public async getBookingById(id: string): Promise<IBookingType | null> {
    try {
      await connectDB();
      const booking = await Booking.findById(id);
      if (booking) {
        return booking.toJSON() as unknown as IBookingType;
      }
    } catch {
      // Fallback to local
    }

    const local = this.getLocalBookings();
    return local.find((b) => b.id === id || b.bookingRef === id) || null;
  }

  /**
   * Updates booking fields by ID
   */
  public async updateBooking(id: string, dto: UpdateBookingDTO): Promise<IBookingType | null> {
    let updated: IBookingType | null = null;

    try {
      await connectDB();
      const updateData: Record<string, unknown> = {};
      if (dto.status !== undefined) updateData.status = dto.status;
      if (dto.paymentStatus !== undefined) updateData.paymentStatus = dto.paymentStatus;
      if (dto.adminNotes !== undefined) updateData.adminNotes = dto.adminNotes;
      if (dto.assignedDriver !== undefined) updateData.assignedDriver = dto.assignedDriver;
      if (dto.estimatedFare !== undefined) updateData.estimatedFare = Number(dto.estimatedFare);

      const dbUpdated = await Booking.findByIdAndUpdate(id, updateData, { new: true });
      if (dbUpdated) {
        updated = dbUpdated.toJSON() as unknown as IBookingType;
      }
    } catch {
      // Update locally if DB fails
    }

    // Update in local store
    const local = this.getLocalBookings();
    const index = local.findIndex((b) => b.id === id || b.bookingRef === id);
    if (index !== -1) {
      local[index] = {
        ...local[index],
        ...(dto.status !== undefined && { status: dto.status }),
        ...(dto.paymentStatus !== undefined && { paymentStatus: dto.paymentStatus }),
        ...(dto.adminNotes !== undefined && { adminNotes: dto.adminNotes }),
        ...(dto.assignedDriver !== undefined && { assignedDriver: dto.assignedDriver }),
        ...(dto.estimatedFare !== undefined && { estimatedFare: Number(dto.estimatedFare) }),
        updatedAt: new Date().toISOString(),
      };
      this.saveLocalBookings(local);
      if (!updated) updated = local[index];
    }

    return updated;
  }

  /**
   * Deletes a booking by ID
   */
  public async deleteBooking(id: string): Promise<boolean> {
    let deleted = false;

    try {
      await connectDB();
      const result = await Booking.findByIdAndDelete(id);
      if (result) deleted = true;
    } catch {
      // Fallback
    }

    const local = this.getLocalBookings();
    const filtered = local.filter((b) => b.id !== id && b.bookingRef !== id);
    if (filtered.length !== local.length) {
      this.saveLocalBookings(filtered);
      deleted = true;
    }

    return deleted;
  }
}

export const bookingService = new BookingService();
