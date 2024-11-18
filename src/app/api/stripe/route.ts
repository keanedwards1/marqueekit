// src/app/api/stripe/route.ts

import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Add error checking for environment variables
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not defined');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2024-10-28.acacia',
    typescript: true,
});

/* const PRICE_IDS = {
  standard: 'price_1QKsGYRwspcYzNPHn09VgmqR', 
  pro: 'price_1QKsJ5RwspcYzNPHmM3I4EzD'     
} as const; */

const PRICE_IDS = {
  basic: process.env.NEXT_PUBLIC_STRIPE_BASIC_PRICE_ID!,
  standard: process.env.NEXT_PUBLIC_STRIPE_STANDARD_PRICE_ID!,
  pro: process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID!
} as const; 


export async function POST(req: Request) {
  // Add error boundary
  if (!stripe) {
    return NextResponse.json(
      { error: 'Stripe configuration error' },
      { status: 500 }
    );
  }

  try {
    const { priceId } = await req.json();
    
    // Validate priceId
    if (!PRICE_IDS[priceId as keyof typeof PRICE_IDS]) {
      return NextResponse.json(
        { error: 'Invalid price ID' },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price: PRICE_IDS[priceId as keyof typeof PRICE_IDS],
          quantity: 1,
        },
      ],
      success_url: `${req.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get('origin')}/pricing`,
      metadata: {
        licenseType: priceId,
      },
      allow_promotion_codes: true,
      billing_address_collection: 'required',
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (err) {
    console.error('Stripe Error:', err);
    return NextResponse.json(
      { error: 'Error creating checkout session' },
      { status: 500 }
    );
  }
}