import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Attars & Traditional Fragrance Oils | Aarsika',
  description:
    'Shop traditional Indian attar oils from ₹249. Complimentary delivery on orders ₹1,500 and above across India.',
  alternates: {
    canonical: 'https://aarsika.com/attar',
  },
  openGraph: {
    title: 'Attars & Traditional Fragrance Oils | Aarsika',
    description:
      'Shop traditional Indian attar oils from ₹249. Complimentary delivery on orders ₹1,500 and above across India.',
    url: 'https://aarsika.com/attar',
    siteName: 'Aarsika',
    images: [{ url: 'https://aarsika.com/og-default.jpg', width: 1200, height: 630 }],
  },
};

export default function AttarLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
