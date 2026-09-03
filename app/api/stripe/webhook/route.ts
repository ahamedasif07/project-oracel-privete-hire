import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { bookingService } from "@/services/booking.service";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const payload = await req.text();
    const sig = req.headers.get("stripe-signature");

    let event;

    // If webhook secret is configured, verify signature; otherwise parse JSON
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (webhookSecret && sig) {
      event = stripe.webhooks.constructEvent(payload, sig, webhookSecret);
    } else {
      event = JSON.parse(payload);
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as any;
      const bookingRef = session.client_reference_id || session.metadata?.bookingRef;
      const bookingId = session.metadata?.bookingId;

      if (bookingId || bookingRef) {
        const targetId = bookingId || bookingRef;
        await bookingService.updateBooking(targetId, {
          paymentStatus: "PAID",
          status: "CONFIRMED",
          adminNotes: `Stripe Webhook Verified: ${session.id}`,
        });
      }
    }

    return NextResponse.json({ received: true });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Webhook error";
    console.error("❌ [Stripe Webhook Error]:", errorMsg);
    return NextResponse.json({ error: errorMsg }, { status: 400 });
  }
}
