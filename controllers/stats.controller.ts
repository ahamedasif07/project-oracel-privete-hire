import { NextResponse } from "next/server";
import { statsService } from "@/services/stats.service";
import { getCurrentAdmin } from "@/lib/auth";

class StatsController {
  /**
   * Handles dashboard analytics calculation (Admin Only)
   */
  public async getDashboardStats(): Promise<NextResponse> {
    try {
      const admin = await getCurrentAdmin();
      if (!admin) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      const data = await statsService.getDashboardStats();
      return NextResponse.json(data);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Failed to fetch stats.";
      console.error("Dashboard stats error:", errorMessage);
      return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
  }
}

export const statsController = new StatsController();
