import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Returns & Replacement Policy | Aarsika',
  description:
    'Learn how we handle transit damage replacements and return eligibility for delivered fragrance orders in India.',
  alternates: {
    canonical: 'https://aarsika.com/returns',
  },
  openGraph: {
    title: 'Returns & Replacement Policy | Aarsika',
    description:
      'Learn how we handle transit damage replacements and return eligibility for delivered fragrance orders in India.',
    url: 'https://aarsika.com/returns',
    siteName: 'Aarsika',
    images: [{ url: 'https://aarsika.com/og-default.jpg', width: 1200, height: 630 }],
  },
};

export default function ReturnsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
