import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fragrance Heritage of India | Aarsika',
  description:
    'Explore the historical traditions, regional origins and cultural customs of Indian attar distillation and perfume making.',
  alternates: {
    canonical: 'https://aarsika.com/heritage',
  },
  openGraph: {
    title: 'Fragrance Heritage of India | Aarsika',
    description:
      'Explore the historical traditions, regional origins and cultural customs of Indian attar distillation and perfume making.',
    url: 'https://aarsika.com/heritage',
    siteName: 'Aarsika',
    images: [{ url: 'https://aarsika.com/og-default.jpg', width: 1200, height: 630 }],
  },
};

export default function HeritageLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
