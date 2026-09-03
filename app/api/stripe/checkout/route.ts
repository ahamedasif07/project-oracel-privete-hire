import { NextRequest } from "next/server";
import { stripeController } from "@/controllers/stripe.controller";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  return stripeController.createCheckout(req);
}
