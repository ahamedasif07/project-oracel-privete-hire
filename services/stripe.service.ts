import { stripe } from "@/lib/stripe";
import { bookingService, CreateBookingDTO } from "./booking.service";
import type { Booking as IBookingType } from "@/types";

class StripeService {
  /**
   * Creates a pending booking reservation and generates a Stripe Checkout session
   */
  public async createCheckoutSession(
    dto: CreateBookingDTO,
    originUrl?: string
  ): Promise<{ sessionUrl: string; booking: IBookingType }> {
    const appUrl =
      originUrl ||
      process.env.NEXT_PUBLIC_APP_URL ||
      "http://localhost:3000";

    // 1. Create booking reservation with UNPAID status
    const booking = await bookingService.createBooking({
      ...dto,
      paymentMethod: "card_pay",
    });

    const amountInPence = Math.max(50, Math.round((Number(booking.estimatedFare) || 50) * 100));

    // 2. Generate Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "gbp",
            product_data: {
              name: `Oracle Chauffeur — ${booking.vehicleType}`,
              description: `Journey: ${booking.pickupAddress} to ${booking.dropoffAddress} on ${booking.pickupDate} at ${booking.pickupTime}. Ref: ${booking.bookingRef}`,
              images: [
                `${appUrl}/images/fleet-executive.jpg`,
              ],
            },
            unit_amount: amountInPence,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      customer_email: booking.passengerEmail,
      client_reference_id: booking.bookingRef,
      metadata: {
        bookingId: booking.id,
        bookingRef: booking.bookingRef,
        passengerName: booking.passengerName,
        passengerEmail: booking.passengerEmail,
        passengerPhone: booking.passengerPhone,
      },
      success_url: `${appUrl}/booking?payment=success&session_id={CHECKOUT_SESSION_ID}&ref=${booking.bookingRef}`,
      cancel_url: `${appUrl}/booking?payment=cancelled`,
    });

    if (!session.url) {
      throw new Error("Failed to initialize Stripe checkout session.");
    }

    return { sessionUrl: session.url, booking };
  }

  /**
   * Verifies payment status from a Stripe Checkout session and updates booking to PAID
   */
  public async verifyCheckoutSession(sessionId: string): Promise<IBookingType | null> {
    if (!sessionId) return null;

    try {
      const session = await stripe.checkout.sessions.retrieve(sessionId);

      if (session.payment_status === "paid") {
        const bookingRef = session.client_reference_id || session.metadata?.bookingRef;
        const bookingId = session.metadata?.bookingId;

        if (bookingId || bookingRef) {
          const targetId = bookingId || bookingRef!;
          const updated = await bookingService.updateBooking(targetId, {
            paymentStatus: "PAID",
            status: "CONFIRMED",
            adminNotes: `Stripe Payment Verified. Session: ${session.id}. Amount: £${((session.amount_total || 0) / 100).toFixed(2)}`,
          });
          return updated;
        }
      }
    } catch (err: any) {
      console.error("❌ [StripeService] Session verification error:", err.message);
    }

    return null;
  }
}

export const stripeService = new StripeService();
