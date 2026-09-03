import { NextRequest, NextResponse } from "next/server";
import { stripeService } from "@/services/stripe.service";

class StripeController {
  /**
   * Handles creating a Stripe checkout session for a booking reservation
   */
  public async createCheckout(req: NextRequest): Promise<NextResponse> {
    try {
      const body = await req.json().catch(() => ({}));
      const origin = req.headers.get("origin") || undefined;

      const { sessionUrl, booking } = await stripeService.createCheckoutSession(body, origin);

      return NextResponse.json({
        success: true,
        sessionUrl,
        booking,
      });
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to initialize Stripe checkout.";
      console.error("Stripe checkout error:", errorMessage);
      return NextResponse.json({ error: errorMessage }, { status: 400 });
    }
  }

  /**
   * Handles verifying an existing Stripe checkout session after customer returns
   */
  public async verifySession(req: NextRequest): Promise<NextResponse> {
    try {
      const { searchParams } = new URL(req.url);
      const sessionId = searchParams.get("session_id");

      if (!sessionId) {
        return NextResponse.json({ error: "Session ID is required." }, { status: 400 });
      }

      const booking = await stripeService.verifyCheckoutSession(sessionId);

      if (!booking) {
        return NextResponse.json(
          { error: "Payment was not completed or session not found." },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        paid: true,
        booking,
      });
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to verify Stripe payment.";
      return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
  }
}

export const stripeController = new StripeController();
