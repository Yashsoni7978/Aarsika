import React from 'react';
import type { Metadata } from 'next';
import { SITE_URL } from '@/config/env';

export const metadata: Metadata = {
  title: 'Personal Care & Home Fragrance | Aarsika Fine Fragrance',
  description:
    'Artisanal incense, bakhoor, and fragranced body rituals handcrafted with botanical extracts and rare resins.',
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: '/personal-care',
  },
  openGraph: {
    title: 'Personal Care & Home Fragrance | Aarsika',
    description: 'Personal care and home fragrance by Aarsika.',
    url: `${SITE_URL}/personal-care`,
    siteName: 'Aarsika',
  },
};

export default function PersonalCareLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
