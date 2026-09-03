import { NextRequest } from "next/server";
import { authController } from "@/controllers/auth.controller";

export const dynamic = "force-dynamic";

export async function GET() {
  return authController.getAdmins();
}

export async function POST(req: NextRequest) {
  return authController.createAdmin(req);
}
