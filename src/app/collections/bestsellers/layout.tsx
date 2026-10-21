import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bestselling Fragrances | Aarsika',
  description:
    'Discover our most popular attars, eau de parfums and gift sets. Complimentary delivery on orders ₹1,500 and above in India.',
  alternates: {
    canonical: 'https://aarsika.com/collections/bestsellers',
  },
  openGraph: {
    title: 'Bestselling Fragrances | Aarsika',
    description:
      'Discover our most popular attars, eau de parfums and gift sets. Complimentary delivery on orders ₹1,500 and above in India.',
    url: 'https://aarsika.com/collections/bestsellers',
    siteName: 'Aarsika',
    images: [{ url: 'https://aarsika.com/og-default.jpg', width: 1200, height: 630 }],
  },
};

export default function BestsellersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
