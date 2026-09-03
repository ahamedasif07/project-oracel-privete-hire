import { NextRequest, NextResponse } from "next/server";
import { fleetService } from "@/services/fleet.service";
import { getCurrentAdmin } from "@/lib/auth";

class FleetController {
  /**
   * Handles retrieving fleet vehicles (Public)
   */
  public async getFleet(): Promise<NextResponse> {
    try {
      const vehicles = await fleetService.getFleetVehicles();
      return NextResponse.json({ vehicles });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Failed to fetch fleet.";
      console.error("Fleet fetch error:", errorMessage);
      return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
  }

  /**
   * Handles updating vehicle pricing/specs (Admin Only)
   */
  public async updateVehicle(req: NextRequest): Promise<NextResponse> {
    try {
      const admin = await getCurrentAdmin();
      if (!admin) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      const body = await req.json().catch(() => ({}));
      const { id, ...updateFields } = body;

      if (!id) {
        return NextResponse.json({ error: "Vehicle ID is required." }, { status: 400 });
      }

      const updated = await fleetService.updateVehicle(id, updateFields);
      if (!updated) {
        return NextResponse.json({ error: "Vehicle not found." }, { status: 404 });
      }

      return NextResponse.json({ success: true, vehicle: updated });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Failed to update vehicle.";
      return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
  }
}

export const fleetController = new FleetController();
