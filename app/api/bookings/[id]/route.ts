import { NextRequest } from "next/server";
import { bookingController } from "@/controllers/booking.controller";

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  return bookingController.getBookingById(req, params.id);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  return bookingController.updateBooking(req, params.id);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  return bookingController.deleteBooking(req, params.id);
}
