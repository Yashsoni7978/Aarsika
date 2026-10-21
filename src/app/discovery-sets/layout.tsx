import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fragrance Discovery Sets | Aarsika',
  description:
    'Sample multiple fragrances before choosing a full bottle. Attar and perfume discovery sets available with delivery across India.',
  alternates: {
    canonical: 'https://aarsika.com/discovery-sets',
  },
  openGraph: {
    title: 'Fragrance Discovery Sets | Aarsika',
    description:
      'Sample multiple fragrances before choosing a full bottle. Attar and perfume discovery sets available with delivery across India.',
    url: 'https://aarsika.com/discovery-sets',
    siteName: 'Aarsika',
    images: [{ url: 'https://aarsika.com/og-default.jpg', width: 1200, height: 630 }],
  },
};

export default function DiscoverySetsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
