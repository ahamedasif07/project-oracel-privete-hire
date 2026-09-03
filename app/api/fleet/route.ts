import { NextRequest } from "next/server";
import { fleetController } from "@/controllers/fleet.controller";

export const dynamic = "force-dynamic";

export async function GET() {
  return fleetController.getFleet();
}

export async function PATCH(req: NextRequest) {
  return fleetController.updateVehicle(req);
}
