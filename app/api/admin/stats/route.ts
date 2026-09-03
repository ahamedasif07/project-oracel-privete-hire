import { statsController } from "@/controllers/stats.controller";

export const dynamic = "force-dynamic";

export async function GET() {
  return statsController.getDashboardStats();
}
