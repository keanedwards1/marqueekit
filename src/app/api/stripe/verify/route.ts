import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-10-28.acacia',
});

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get('session_id');

  if (!sessionId) {
    return NextResponse.json(
      { error: 'Missing session ID' },
      { status: 400 }
    );
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    
    if (session.payment_status !== 'paid') {
      return NextResponse.json(
        { valid: false },
        { status: 400 }
      );
    }

    // Generate a temporary download URL
    const downloadUrl = `/api/download?token=${generateDownloadToken(session)}`;

    return NextResponse.json({
      valid: true,
      details: {
        licenseType: session.metadata?.licenseType || 'standard',
        customerEmail: session.customer_details?.email,
        downloadUrl
      }
    });

  } catch (error) {
    console.error('Error verifying session:', error);
    return NextResponse.json(
      { error: 'Invalid session ID' },
      { status: 400 }
    );
  }
}

// Utility to generate a secure download token
function generateDownloadToken(session: Stripe.Checkout.Session) {
  // In production, use a proper JWT or similar
  return Buffer.from(JSON.stringify({
    sessionId: session.id,
    timestamp: Date.now()
  })).toString('base64');
}