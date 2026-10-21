import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Wedding Fragrance Gifting | Aarsika',
  description:
    'Custom fragrance sets and presentation boxes for wedding guests and celebration gifting across India.',
  alternates: {
    canonical: 'https://aarsika.com/wedding-gifting',
  },
  openGraph: {
    title: 'Wedding Fragrance Gifting | Aarsika',
    description:
      'Custom fragrance sets and presentation boxes for wedding guests and celebration gifting across India.',
    url: 'https://aarsika.com/wedding-gifting',
    siteName: 'Aarsika',
    images: [{ url: 'https://aarsika.com/og-default.jpg', width: 1200, height: 630 }],
  },
};

export default function WeddingGiftingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
