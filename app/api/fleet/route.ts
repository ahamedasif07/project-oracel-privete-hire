import { NextRequest, NextResponse } from "next/server";
import { connectDB, Vehicle } from "@/lib/db";
import { getCurrentAdmin } from "@/lib/auth";
import type { Vehicle as IVehicleType } from "@/types";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectDB();
    const vehicles = await Vehicle.find({}).sort({ order: 1 });
    return NextResponse.json({
      vehicles: vehicles.map((v) => v.toJSON()) as unknown as IVehicleType[],
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Failed to fetch fleet.";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id, basePrice, perMileRate, isActive, description, tag, seats, luggage } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Vehicle ID is required." }, { status: 400 });
    }

    await connectDB();
    const updated = await Vehicle.findByIdAndUpdate(
      id,
      {
        ...(basePrice !== undefined && { basePrice: Number(basePrice) }),
        ...(perMileRate !== undefined && { perMileRate: Number(perMileRate) }),
        ...(isActive !== undefined && { isActive: Boolean(isActive) }),
        ...(description !== undefined && { description }),
        ...(tag !== undefined && { tag }),
        ...(seats !== undefined && { seats: Number(seats) }),
        ...(luggage !== undefined && { luggage: Number(luggage) }),
      },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ error: "Vehicle not found." }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      vehicle: updated.toJSON() as unknown as IVehicleType,
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Failed to update vehicle.";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
