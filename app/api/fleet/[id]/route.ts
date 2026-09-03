import { NextRequest } from "next/server";
import { fleetController } from "@/controllers/fleet.controller";

export const dynamic = "force-dynamic";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  return fleetController.deleteVehicle(req, params.id);
}
