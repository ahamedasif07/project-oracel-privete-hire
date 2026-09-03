import { NextRequest } from "next/server";
import { contactController } from "@/controllers/contact.controller";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  return contactController.submitMessage(req);
}

export async function GET() {
  return contactController.getMessages();
}
