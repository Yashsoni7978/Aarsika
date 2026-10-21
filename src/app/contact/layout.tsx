import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact & Customer Support | Aarsika',
  description:
    'Get in touch with Aarsika for order assistance, shipping queries, and custom gifting inquiries in India.',
  alternates: {
    canonical: 'https://aarsika.com/contact',
  },
  openGraph: {
    title: 'Contact & Customer Support | Aarsika',
    description:
      'Get in touch with Aarsika for order assistance, shipping queries, and custom gifting inquiries in India.',
    url: 'https://aarsika.com/contact',
    siteName: 'Aarsika',
    images: [{ url: 'https://aarsika.com/og-default.jpg', width: 1200, height: 630 }],
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
