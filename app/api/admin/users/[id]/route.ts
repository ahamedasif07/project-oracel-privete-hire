import { NextRequest } from "next/server";
import { authController } from "@/controllers/auth.controller";

export const dynamic = "force-dynamic";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  return authController.deleteAdmin(req, params.id);
}
