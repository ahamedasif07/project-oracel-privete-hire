import Stripe from "stripe";
import { loadStripe, Stripe as StripeClient } from "@stripe/stripe-js";

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || "";

export const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: "2024-06-20" as any,
  typescript: true,
});

let stripePromise: Promise<StripeClient | null>;

export const getStripe = () => {
  if (!stripePromise) {
    const publishableKey =
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ||
      "pk_test_51Trr9II6N406UTnXhL465wnJ5lA5d5hlezjdB7thVxVadZCmBXpIq6WtvwjPqbEcqXUUWlWCUvPDbpW1UrolWyEK00d5Iew0i6";
    stripePromise = loadStripe(publishableKey);
  }
  return stripePromise;
};
