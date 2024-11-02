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

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: priceId === 'pro' ? 'MarqueeKit Pro' : 'MarqueeKit Standard',
              description: priceId === 'pro' 
                ? 'Unlimited projects, source code access, priority support'
                : 'Single project license, core functionality',
            },
            unit_amount: priceId === 'pro' ? 14900 : 4900,
          },
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