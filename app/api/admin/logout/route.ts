import { authController } from "@/controllers/auth.controller";

export const dynamic = "force-dynamic";

export async function POST() {
  return authController.logout();
}
