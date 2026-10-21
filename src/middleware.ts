import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSeoMode } from '@/config/env';

export function middleware(request: NextRequest) {
  const rawHost = request.headers.get('x-forwarded-host') || request.headers.get('host') || '';
  const host = rawHost.toLowerCase().split(':')[0];

  // Host-level canonical redirect: ONLY www.aarsika.com -> aarsika.com (308 Permanent)
  if (host === 'www.aarsika.com') {
    const destination = new URL(`https://aarsika.com${request.nextUrl.pathname}${request.nextUrl.search}`);
    return NextResponse.redirect(destination, 308);
  }

  const response = NextResponse.next();
  const seoMode = getSeoMode();

  // If environment is non-production (staging, preview, dev), inject noindex header
  if (!seoMode.isIndexable) {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive, nosnippet');
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next (build files, static chunks, optimized images)
     * - api routes
     * - static asset files by extension
     */
    '/((?!_next|api|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|woff|woff2)$).*)',
  ],
};
