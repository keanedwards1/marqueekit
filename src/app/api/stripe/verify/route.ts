// src/app/api/stripe/verify/route.ts

import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-10-28.acacia',
});

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get('session_id');

  if (!sessionId) {
    console.log('Missing session ID');
    return NextResponse.json(
      { error: 'Missing session ID' },
      { status: 400 }
    );
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    
    console.log('Session details:', {
      id: session.id,
      payment_status: session.payment_status,
      mode: session.mode,
      status: session.status
    });

    // More detailed validation logging
    const isValidPaymentStatus = session.payment_status === 'paid';
    const isValidStatus = session.status === 'complete';
    const isDevelopment = process.env.NODE_ENV === 'development';

    console.log('Validation checks:', {
      isValidPaymentStatus,
      isValidStatus,
      isDevelopment,
      NODE_ENV: process.env.NODE_ENV
    });

    const isValidSession = isValidPaymentStatus || (isDevelopment && isValidStatus);

    console.log('Final validation result:', { isValidSession });

    if (!isValidSession) {
      console.log('Session invalid - returning error response');
      return NextResponse.json(
        { valid: false },
        { status: 400 }
      );
    }

    // Generate a temporary download URL
    const downloadUrl = `/api/download?token=${generateDownloadToken(session)}`;

    const response = {
      valid: true,
      details: {
        licenseType: session.metadata?.licenseType || 'standard',
        customerEmail: session.customer_details?.email,
        downloadUrl
      }
    };

    console.log('Returning success response:', response);

    return NextResponse.json(response);

  } catch (error) {
    console.error('Error verifying session:', error);
    return NextResponse.json(
      { error: 'Invalid session ID' },
      { status: 400 }
    );
  }
}

function generateDownloadToken(session: Stripe.Checkout.Session) {
  return Buffer.from(JSON.stringify({
    sessionId: session.id,
    timestamp: Date.now()
  })).toString('base64');
}