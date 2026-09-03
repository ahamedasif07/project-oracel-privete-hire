import { NextRequest, NextResponse } from "next/server";
import { connectDB, Booking } from "@/lib/db";
import { getCurrentAdmin } from "@/lib/auth";
import type { Booking as IBookingType } from "@/types";

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const booking = await Booking.findById(params.id);

    if (!booking) {
      return NextResponse.json({ error: "Booking not found." }, { status: 404 });
    }

    return NextResponse.json({ booking: booking.toJSON() as unknown as IBookingType });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Error fetching booking.";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    await connectDB();

    const updated = await Booking.findByIdAndUpdate(
      params.id,
      {
        ...(body.status && { status: body.status }),
        ...(body.paymentStatus && { paymentStatus: body.paymentStatus }),
        ...(body.adminNotes !== undefined && { adminNotes: body.adminNotes }),
        ...(body.assignedDriver !== undefined && { assignedDriver: body.assignedDriver }),
        ...(body.estimatedFare !== undefined && { estimatedFare: Number(body.estimatedFare) }),
      },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ error: "Booking not found." }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      booking: updated.toJSON() as unknown as IBookingType,
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Failed to update booking.";
    console.error("Update booking error:", errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    await Booking.findByIdAndDelete(params.id);

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Failed to delete booking.";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
