import { MetadataRoute } from 'next';
import { PRODUCTS } from '@/data/products';
import { JOURNAL_ARTICLES } from '@/data/journal';
import { SITE_URL } from '@/config/env';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://aarsika.com';

  // 1. All 21 live product detail pages (canonical path: /products/:slug)
  const productUrls: MetadataRoute.Sitemap = PRODUCTS.map((p) => ({
    url: `${baseUrl}/products/${p.slug}`,
    lastModified: new Date(p.updatedAt || '2026-10-15T00:00:00Z'),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // 2. All live journal articles (canonical path: /journal/:slug)
  const journalUrls: MetadataRoute.Sitemap = JOURNAL_ARTICLES.map((article) => ({
    url: `${baseUrl}/journal/${article.slug}`,
    lastModified: new Date('2026-10-15T00:00:00Z'),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  // 3. All canonical static, category, and policy pages
  const staticRoutes: Array<{
    path: string;
    priority: number;
    changeFrequency: 'daily' | 'weekly' | 'monthly';
    lastModified?: string;
  }> = [
    // Homepage & Core Catalog
    { path: '', priority: 1.0, changeFrequency: 'daily' },
    { path: '/shop', priority: 0.9, changeFrequency: 'daily' },
    { path: '/collections/bestsellers', priority: 0.9, changeFrequency: 'daily' },
    { path: '/collections/new-arrivals', priority: 0.85, changeFrequency: 'weekly' },

    // Primary Canonical Fragrance Categories
    { path: '/attar', priority: 0.85, changeFrequency: 'daily' },
    { path: '/perfumes', priority: 0.85, changeFrequency: 'daily' },
    { path: '/oud', priority: 0.85, changeFrequency: 'weekly' },
    { path: '/gifting', priority: 0.85, changeFrequency: 'weekly' },
    { path: '/discovery-sets', priority: 0.85, changeFrequency: 'weekly' },

    // Brand House & Editorial
    { path: '/our-story', priority: 0.75, changeFrequency: 'monthly', lastModified: '2026-10-15' },
    { path: '/craftsmanship', priority: 0.75, changeFrequency: 'monthly', lastModified: '2026-10-15' },
    { path: '/heritage', priority: 0.75, changeFrequency: 'monthly', lastModified: '2026-10-15' },
    { path: '/ingredients', priority: 0.75, changeFrequency: 'monthly', lastModified: '2026-10-15' },
    { path: '/journal', priority: 0.75, changeFrequency: 'weekly' },
    { path: '/wedding-gifting', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-10-15' },
    { path: '/corporate-gifting', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-10-15' },

    // Support & Concierge
    { path: '/contact', priority: 0.6, changeFrequency: 'monthly', lastModified: '2026-10-15' },
    { path: '/faq', priority: 0.6, changeFrequency: 'monthly', lastModified: '2026-10-15' },

    // Legal & Customer Policies
    { path: '/shipping-policy', priority: 0.4, changeFrequency: 'monthly', lastModified: '2026-10-19' },
    { path: '/cancellation-policy', priority: 0.4, changeFrequency: 'monthly', lastModified: '2026-10-15' },
    { path: '/returns', priority: 0.4, changeFrequency: 'monthly', lastModified: '2026-10-15' },
    { path: '/privacy', priority: 0.4, changeFrequency: 'monthly', lastModified: '2026-10-15' },
    { path: '/terms', priority: 0.4, changeFrequency: 'monthly', lastModified: '2026-10-19' },
  ];

  const staticUrls: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: route.lastModified ? new Date(route.lastModified) : new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  return [...staticUrls, ...productUrls, ...journalUrls];
}
