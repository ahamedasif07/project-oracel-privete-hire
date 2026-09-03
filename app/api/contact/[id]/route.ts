import { NextRequest } from "next/server";
import { contactController } from "@/controllers/contact.controller";

export const dynamic = "force-dynamic";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  return contactController.updateStatus(req, params.id);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  return contactController.deleteMessage(req, params.id);
}
