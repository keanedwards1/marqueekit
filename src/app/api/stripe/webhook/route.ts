// src/app/api/stripe/webhook/route.ts

import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2024-10-28.acacia',
  });

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
    const body = await req.text();
    const headersList = await headers();
    const sig = headersList.get('stripe-signature')!;
  
    let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
} catch (err: unknown) {
    const error = err as Error; // Type assertion
    console.error('Webhook Error:', error.message);
    return NextResponse.json(
      { error: `Webhook Error: ${error.message}` },
      { status: 400 }
    );
  }

  try {
    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        
        // Here you would typically:
        // 1. Generate download links
        // 2. Save to database
        // 3. Send confirmation email
        
        console.log('Payment successful:', session.id);
        
        // You can access customer email with session.customer_details.email
        const customerEmail = session.customer_details?.email;

        if (customerEmail) {
            console.log('Customer email:', customerEmail);
            // Use customerEmail for sending confirmation email or other logic
        }
        
        // You can determine which product was purchased
        const isProLicense = session.amount_total === 14900; // $149.00

        if (isProLicense) {
            console.log('Pro License purchased');
            // Implement additional logic for Pro License purchase
        }

        // TODO: Implement your post-purchase logic here
        
        break;
      }
      
      case 'checkout.session.expired': {
        const session = event.data.object as Stripe.Checkout.Session;
        console.log('Session expired:', session.id);
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error('Webhook handler error:', err);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}

// Stripe requires the raw body to construct the event
export const config = {
  api: {
    bodyParser: false,
  },
};