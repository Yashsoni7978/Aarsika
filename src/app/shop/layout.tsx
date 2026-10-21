import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All Fragrances | Aarsika',
  description:
    'Explore all Aarsika fragrance collections, including attars, eau de parfums, gift sets and discovery sets. Delivery across India.',
  alternates: {
    canonical: 'https://aarsika.com/shop',
  },
  openGraph: {
    title: 'All Fragrances | Aarsika',
    description:
      'Explore all Aarsika fragrance collections, including attars, eau de parfums, gift sets and discovery sets. Delivery across India.',
    url: 'https://aarsika.com/shop',
    siteName: 'Aarsika',
    images: [{ url: 'https://aarsika.com/og-default.jpg', width: 1200, height: 630 }],
  },
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
