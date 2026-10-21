import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Eau de Parfums & Fine Fragrances | Aarsika',
  description:
    'Shop long-lasting eau de parfums from ₹1,499. Complimentary delivery on orders ₹1,500 and above across India.',
  alternates: {
    canonical: 'https://aarsika.com/perfumes',
  },
  openGraph: {
    title: 'Eau de Parfums & Fine Fragrances | Aarsika',
    description:
      'Shop long-lasting eau de parfums from ₹1,499. Complimentary delivery on orders ₹1,500 and above across India.',
    url: 'https://aarsika.com/perfumes',
    siteName: 'Aarsika',
    images: [{ url: 'https://aarsika.com/og-default.jpg', width: 1200, height: 630 }],
  },
};

export default function PerfumesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
