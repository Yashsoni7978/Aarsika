import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Corporate Luxury Gifting | Aarsika',
  description:
    'Curated fragrance gift sets for corporate events, executive milestones and festive corporate occasions in India.',
  alternates: {
    canonical: 'https://aarsika.com/corporate-gifting',
  },
  openGraph: {
    title: 'Corporate Luxury Gifting | Aarsika',
    description:
      'Curated fragrance gift sets for corporate events, executive milestones and festive corporate occasions in India.',
    url: 'https://aarsika.com/corporate-gifting',
    siteName: 'Aarsika',
    images: [{ url: 'https://aarsika.com/og-default.jpg', width: 1200, height: 630 }],
  },
};

export default function CorporateGiftingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
