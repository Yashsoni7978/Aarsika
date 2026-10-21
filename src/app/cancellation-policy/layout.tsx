import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Order Cancellation Policy | Aarsika',
  description:
    'Our policy on cancelling orders before dispatch, including refund timelines and processing terms.',
  alternates: {
    canonical: 'https://aarsika.com/cancellation-policy',
  },
  openGraph: {
    title: 'Order Cancellation Policy | Aarsika',
    description:
      'Our policy on cancelling orders before dispatch, including refund timelines and processing terms.',
    url: 'https://aarsika.com/cancellation-policy',
    siteName: 'Aarsika',
    images: [{ url: 'https://aarsika.com/og-default.jpg', width: 1200, height: 630 }],
  },
};

export default function CancellationPolicyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
