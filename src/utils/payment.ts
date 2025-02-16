import Stripe from 'stripe';

const stripe = new Stripe('your-stripe-secret-key', { apiVersion: '2025-01-27.acacia' });

export const createPaymentIntent = async (amount: number) => {
  return await stripe.paymentIntents.create({
    amount: amount * 100, // Convert to cents
    currency: 'usd',
    payment_method_types: ['card'],
    capture_method: 'manual', // Hold funds
  });
};

export const capturePayment = async (paymentIntentId: string) => {
  return await stripe.paymentIntents.capture(paymentIntentId);
};