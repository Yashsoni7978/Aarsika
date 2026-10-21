import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Story | Aarsika',
  description:
    'Learn about Aarsika, an Indian fine fragrance house dedicated to classic attars, eau de parfums and curated gift sets.',
  alternates: {
    canonical: 'https://aarsika.com/our-story',
  },
  openGraph: {
    title: 'Our Story | Aarsika',
    description:
      'Learn about Aarsika, an Indian fine fragrance house dedicated to classic attars, eau de parfums and curated gift sets.',
    url: 'https://aarsika.com/our-story',
    siteName: 'Aarsika',
    images: [{ url: 'https://aarsika.com/og-default.jpg', width: 1200, height: 630 }],
  },
};

export default function OurStoryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
