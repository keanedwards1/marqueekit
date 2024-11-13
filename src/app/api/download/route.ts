// src/app/api/download/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { list } from '@vercel/blob';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('session_id');

    if (!sessionId) {
      return NextResponse.json({ error: 'Missing session ID' }, { status: 400 });
    }

    // Verify environment variables are set
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      console.error('Missing required environment variable: BLOB_READ_WRITE_TOKEN');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Verify the session is valid using your existing Stripe verification
    const verifyResponse = await fetch(`${request.url.split('/api/')[0]}/api/stripe/verify?session_id=${sessionId}`);
    const verifyData = await verifyResponse.json();

    if (!verifyData.valid) {
      return NextResponse.json({ error: 'Invalid session' }, { status: 401 });
    }

    // List all blobs with the token
    const { blobs } = await list({
      token: process.env.BLOB_READ_WRITE_TOKEN
    });

    const zipFile = blobs.find(blob => blob.pathname === 'marqueeKit.zip');

    if (!zipFile) {
      return NextResponse.json(
        { error: 'Download not available' },
        { status: 404 }
      );
    }

    if (!zipFile.url) {
      console.error('Missing URL for blob:', zipFile.pathname);
      return NextResponse.json(
        { error: 'Download not available' },
        { status: 500 }
      );
    }

    return NextResponse.json({ downloadUrl: zipFile.url });
  } catch (error) {
    console.error('Download error:', error);
    return NextResponse.json(
      { error: 'Unable to process download request' }, 
      { status: 500 }
    );
  }
}