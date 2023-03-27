import { Stripe, loadStripe } from '@stripe/stripe-js';
const stripe_public_key = process.env.STRIPE_PUBLIC_TEST_KEY ?? ''

let stripePromise: Stripe | null;

export const initializeStripe = async () => {
    if (!stripePromise) {
        stripePromise = await loadStripe(stripe_public_key);
    }
    return stripePromise;
}