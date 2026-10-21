import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'New Fragrance Arrivals | Aarsika',
  description:
    'Explore the latest attars and eau de parfums added to the Aarsika catalog. Complimentary delivery on orders ₹1,500 and above across India.',
  alternates: {
    canonical: 'https://aarsika.com/collections/new-arrivals',
  },
  openGraph: {
    title: 'New Fragrance Arrivals | Aarsika',
    description:
      'Explore the latest attars and eau de parfums added to the Aarsika catalog. Complimentary delivery on orders ₹1,500 and above across India.',
    url: 'https://aarsika.com/collections/new-arrivals',
    siteName: 'Aarsika',
    images: [{ url: 'https://aarsika.com/og-default.jpg', width: 1200, height: 630 }],
  },
};

export default function NewArrivalsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
