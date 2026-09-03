import { NextRequest } from "next/server";
import { settingsController } from "@/controllers/settings.controller";

export const dynamic = "force-dynamic";

export async function GET() {
  return settingsController.getSettings();
}

export async function POST(req: NextRequest) {
  return settingsController.saveSettings(req);
}
