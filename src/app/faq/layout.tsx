import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | Aarsika',
  description:
    'Answers to common questions regarding orders, shipping, delivery timelines, product sizing and fragrance care.',
  alternates: {
    canonical: 'https://aarsika.com/faq',
  },
  openGraph: {
    title: 'Frequently Asked Questions | Aarsika',
    description:
      'Answers to common questions regarding orders, shipping, delivery timelines, product sizing and fragrance care.',
    url: 'https://aarsika.com/faq',
    siteName: 'Aarsika',
    images: [{ url: 'https://aarsika.com/og-default.jpg', width: 1200, height: 630 }],
  },
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
