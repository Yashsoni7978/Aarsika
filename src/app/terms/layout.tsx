import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | Aarsika',
  description:
    'Terms and conditions governing orders, website usage, pricing, and services provided by Aarsika.',
  alternates: {
    canonical: 'https://aarsika.com/terms',
  },
  openGraph: {
    title: 'Terms of Service | Aarsika',
    description:
      'Terms and conditions governing orders, website usage, pricing, and services provided by Aarsika.',
    url: 'https://aarsika.com/terms',
    siteName: 'Aarsika',
    images: [{ url: 'https://aarsika.com/og-default.jpg', width: 1200, height: 630 }],
  },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
