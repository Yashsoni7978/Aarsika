import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Distillation & Craft | Aarsika',
  description:
    'An introduction to the traditional distillation practices, aging processes and botanical materials used in Indian perfumery.',
  alternates: {
    canonical: 'https://aarsika.com/craftsmanship',
  },
  openGraph: {
    title: 'Distillation & Craft | Aarsika',
    description:
      'An introduction to the traditional distillation practices, aging processes and botanical materials used in Indian perfumery.',
    url: 'https://aarsika.com/craftsmanship',
    siteName: 'Aarsika',
    images: [{ url: 'https://aarsika.com/og-default.jpg', width: 1200, height: 630 }],
  },
};

export default function CraftsmanshipLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
