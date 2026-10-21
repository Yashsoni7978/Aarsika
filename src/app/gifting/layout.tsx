import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fragrance Gift Sets | Aarsika',
  description:
    'Curated fragrance gift boxes containing signature attars. Complimentary delivery on orders ₹1,500 and above across India.',
  alternates: {
    canonical: 'https://aarsika.com/gifting',
  },
  openGraph: {
    title: 'Fragrance Gift Sets | Aarsika',
    description:
      'Curated fragrance gift boxes containing signature attars. Complimentary delivery on orders ₹1,500 and above across India.',
    url: 'https://aarsika.com/gifting',
    siteName: 'Aarsika',
    images: [{ url: 'https://aarsika.com/og-default.jpg', width: 1200, height: 630 }],
  },
};

export default function GiftingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
