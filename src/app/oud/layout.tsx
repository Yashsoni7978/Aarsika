import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Oud Fragrances & Blends | Aarsika',
  description:
    'Shop oud-inspired attar oils and eau de parfums by Aarsika. Complimentary delivery on orders ₹1,500 and above across India.',
  alternates: {
    canonical: 'https://aarsika.com/oud',
  },
  openGraph: {
    title: 'Oud Fragrances & Blends | Aarsika',
    description:
      'Shop oud-inspired attar oils and eau de parfums by Aarsika. Complimentary delivery on orders ₹1,500 and above across India.',
    url: 'https://aarsika.com/oud',
    siteName: 'Aarsika',
    images: [{ url: 'https://aarsika.com/og-default.jpg', width: 1200, height: 630 }],
  },
};

export default function OudLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
