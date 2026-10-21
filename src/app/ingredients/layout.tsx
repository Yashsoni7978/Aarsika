import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fragrance Ingredients & Sourcing | Aarsika',
  description:
    'Read about the flowers, woods, spices and essential oils used across our collection of attars and eau de parfums.',
  alternates: {
    canonical: 'https://aarsika.com/ingredients',
  },
  openGraph: {
    title: 'Fragrance Ingredients & Sourcing | Aarsika',
    description:
      'Read about the flowers, woods, spices and essential oils used across our collection of attars and eau de parfums.',
    url: 'https://aarsika.com/ingredients',
    siteName: 'Aarsika',
    images: [{ url: 'https://aarsika.com/og-default.jpg', width: 1200, height: 630 }],
  },
};

export default function IngredientsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
