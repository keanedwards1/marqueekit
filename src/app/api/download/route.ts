import { NextRequest, NextResponse } from 'next/server';
import { list } from '@vercel/blob';
import Stripe from 'stripe';

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-10-28.acacia',
});

// Define package mappings
const PACKAGE_FILES = {
  basic: 'marqueekit-basic.zip',
  standard: 'marqueekit-standard.zip',
  pro: 'marqueekit-pro.zip'
} as const;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('session_id');

    console.log('Received download request for session:', sessionId);

    if (!sessionId) {
      return NextResponse.json({ error: 'Missing session ID' }, { status: 400 });
    }

    // Verify environment variables
    if (!process.env.BLOB_READ_WRITE_TOKEN || !process.env.STRIPE_SECRET_KEY) {
      console.error('Missing required environment variables');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Get session details from Stripe
    console.log('Fetching Stripe session details...');
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    
    // Verify payment status
    if (session.payment_status !== 'paid' && process.env.NODE_ENV !== 'development') {
      console.log('Payment not completed:', {
        paymentStatus: session.payment_status,
        environment: process.env.NODE_ENV
      });
      return NextResponse.json(
        { error: 'Payment not completed' },
        { status: 401 }
      );
    }

    // Get license type from session metadata
    const licenseType = (session.metadata?.licenseType || 'basic') as keyof typeof PACKAGE_FILES;
    console.log('License type:', licenseType);
    
    // Verify license type is valid
    if (!PACKAGE_FILES[licenseType]) {
      console.error('Invalid license type:', licenseType);
      return NextResponse.json(
        { error: 'Invalid license type' },
        { status: 400 }
      );
    }

    // Get the correct filename based on license
    const filename = PACKAGE_FILES[licenseType];
    console.log('Looking for file:', filename);

    // List all blobs
    console.log('Fetching blob list...');
    const { blobs } = await list({
      token: process.env.BLOB_READ_WRITE_TOKEN
    });

    console.log('Available blobs:', blobs.map(b => b.pathname));

    // Find the correct package file
    const packageFile = blobs.find(blob => blob.pathname === filename);

    if (!packageFile) {
      console.error('Package file not found in blob storage:', {
        searchedFor: filename,
        availableFiles: blobs.map(b => b.pathname)
      });
      return NextResponse.json(
        { 
          error: 'Download package not available',
          details: 'File not found in storage'
        },
        { status: 404 }
      );
    }

    if (!packageFile.url) {
      console.error('Package file found but has no URL:', filename);
      return NextResponse.json(
        { 
          error: 'Download package not available',
          details: 'File URL not available'
        },
        { status: 404 }
      );
    }

    // Log successful download attempt
    console.log('Download URL generated:', {
      sessionId,
      licenseType,
      filename,
      customerEmail: session.customer_details?.email
    });

    // Return the download URL
    return NextResponse.json({ 
      downloadUrl: packageFile.url,
      licenseType,
      expiresAt: new Date(Date.now() + 15 * 60 * 1000).toISOString()
    });

  } catch (error) {
    console.error('Download error:', error);
    if (error instanceof Error) {
      return NextResponse.json(
        { 
          error: 'Unable to process download request',
          details: error.message,
          stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { error: 'Unable to process download request' },
      { status: 500 }
    );
  }
}