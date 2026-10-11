import { NextRequest, NextResponse } from 'next/server';

// Rate limit: simple in-memory store (replace with Redis in production)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW = 60_000; // 1 minute
const RATE_LIMIT_MAX = 3;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return false;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return true;
  }

  entry.count++;
  return false;
}

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      'unknown';

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { phone } = body;

    if (!phone || typeof phone !== 'string') {
      return NextResponse.json(
        { error: 'A valid phone number is required.' },
        { status: 400 }
      );
    }

    // Basic Indian phone number validation
    const cleaned = phone.replace(/[\s\-\(\)]/g, '');
    const phoneRegex = /^(\+91|91)?[6-9]\d{9}$/;

    if (!phoneRegex.test(cleaned)) {
      return NextResponse.json(
        { error: 'Please enter a valid Indian mobile number.' },
        { status: 400 }
      );
    }

    // TODO: integrate with WhatsApp Business API / email service
    console.log(`[WhatsApp Signup] Phone: ${cleaned}, IP: ${ip}, Time: ${new Date().toISOString()}`);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
