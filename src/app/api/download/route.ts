import { NextResponse } from 'next/server';
/* import { headers } from 'next/headers'; */

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get('token');

  if (!token) {
    return NextResponse.json(
      { error: 'Invalid download token' },
      { status: 400 }
    );
  }

  try {
    // Verify token (in production, verify JWT or similar)
    const tokenData = JSON.parse(Buffer.from(token, 'base64').toString());
    
    // Check if token is expired (e.g., 1 hour)
    if (Date.now() - tokenData.timestamp > 3600000) {
      return NextResponse.json(
        { error: 'Download link expired' },
        { status: 400 }
      );
    }

    // In production, you'd probably use S3 or similar
    // For now, we'll create a simple JSON file
    const fileContent = JSON.stringify({
      name: 'MarqueeKit',
      version: '1.0.0',
      // Add your actual component code here
    }, null, 2);

    // Set headers for file download
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');
    headers.set('Content-Disposition', 'attachment; filename="marqueekit.json"');

    return new NextResponse(fileContent, {
      headers,
    });

  } catch (error) {
    console.error('Download error:', error);
    return NextResponse.json(
      { error: 'Invalid download token' },
      { status: 400 }
    );
  }
}