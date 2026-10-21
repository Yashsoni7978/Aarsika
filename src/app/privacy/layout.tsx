import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Aarsika',
  description:
    'Read how Aarsika collects, uses, and protects your personal information and transaction data.',
  alternates: {
    canonical: 'https://aarsika.com/privacy',
  },
  openGraph: {
    title: 'Privacy Policy | Aarsika',
    description:
      'Read how Aarsika collects, uses, and protects your personal information and transaction data.',
    url: 'https://aarsika.com/privacy',
    siteName: 'Aarsika',
    images: [{ url: 'https://aarsika.com/og-default.jpg', width: 1200, height: 630 }],
  },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
