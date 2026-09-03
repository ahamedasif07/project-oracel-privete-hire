import { NextRequest, NextResponse } from "next/server";
import { connectDB, Booking } from "@/lib/db";
import { generateBookingReference } from "@/lib/utils";
import { sendBookingEmails } from "@/lib/mail";
import { getCurrentAdmin } from "@/lib/auth";
import type { Booking as IBookingType } from "@/types";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      serviceType,
      pickupAddress,
      dropoffAddress,
      viaAddress,
      pickupDate,
      pickupTime,
      isReturn = false,
      returnDate,
      returnTime,
      flightNumber,
      airportName,
      terminal,
      vehicleType = "Executive Saloon",
      passengers = 1,
      luggage = 1,
      childSeats = 0,
      passengerName,
      passengerEmail,
      passengerPhone,
      specialRequests,
      estimatedFare = 0,
      paymentMethod = "cash_to_driver",
    } = body;

    if (!pickupAddress || !dropoffAddress || !pickupDate || !pickupTime || !passengerName || !passengerEmail || !passengerPhone) {
      return NextResponse.json(
        { error: "Missing required booking fields." },
        { status: 400 }
      );
    }

    await connectDB();
    const bookingRef = generateBookingReference();

    const booking = await Booking.create({
      bookingRef,
      serviceType: serviceType || "airport",
      pickupAddress,
      dropoffAddress,
      viaAddress: viaAddress || null,
      pickupDate,
      pickupTime,
      isReturn: Boolean(isReturn),
      returnDate: returnDate || null,
      returnTime: returnTime || null,
      flightNumber: flightNumber || null,
      airportName: airportName || null,
      terminal: terminal || null,
      vehicleType,
      passengers: Number(passengers) || 1,
      luggage: Number(luggage) || 1,
      childSeats: Number(childSeats) || 0,
      passengerName,
      passengerEmail,
      passengerPhone,
      specialRequests: specialRequests || null,
      estimatedFare: Number(estimatedFare) || 0,
      paymentMethod: paymentMethod || "cash_to_driver",
      status: "PENDING",
      paymentStatus: "UNPAID",
    });

    // Send automated email notifications asynchronously
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
    }).catch((err) => console.error("Email dispatch error:", err));

    return NextResponse.json(
      { success: true, booking: booking.toJSON() as unknown as IBookingType },
      { status: 201 }
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Failed to create reservation.";
    console.error("Booking creation error:", errorMessage);
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const search = searchParams.get("search");

    await connectDB();
    const filter: Record<string, unknown> = {};

    if (status && status !== "ALL") {
      filter.status = status;
    }

    if (search) {
      const regex = new RegExp(search, "i");
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

    return NextResponse.json({
      bookings: bookings.map((b) => b.toJSON()) as unknown as IBookingType[],
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Failed to fetch bookings.";
    console.error("Fetch bookings error:", errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
