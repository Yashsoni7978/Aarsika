import { MetadataRoute } from 'next';
import { getSeoMode } from '@/config/env';

export const dynamic = 'force-dynamic';

export default function robots(): MetadataRoute.Robots {
  const seoMode = getSeoMode();

  if (!seoMode.isIndexable) {
    // Non-production (staging, preview, dev) MUST NOT be indexed
    return {
      rules: {
        userAgent: '*',
        disallow: '/',
      },
    };
  }

  // Production environment: index public pages, disallow private transaction & admin routes
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin',
        '/admin/',
        '/api',
        '/api/',
        '/cart',
        '/checkout',
        '/checkout/',
        '/account',
        '/account/',
        '/order-success',
        '/order-success/',
      ],
    },
    sitemap: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://aarsika.com'}/sitemap.xml`,
  };
}
