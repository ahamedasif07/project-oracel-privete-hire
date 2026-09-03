import { NextRequest } from "next/server";
import { authController } from "@/controllers/auth.controller";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  return authController.login(req);
}
