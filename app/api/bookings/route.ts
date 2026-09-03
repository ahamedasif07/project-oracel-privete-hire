import { NextRequest } from "next/server";
import { bookingController } from "@/controllers/booking.controller";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  return bookingController.createBooking(req);
}

export async function GET(req: NextRequest) {
  return bookingController.getBookings(req);
}
