import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shipping & Delivery Policy | Aarsika',
  description:
    'Details on order processing, standard delivery times and complimentary shipping on orders ₹1,500 and above in India.',
  alternates: {
    canonical: 'https://aarsika.com/shipping-policy',
  },
  openGraph: {
    title: 'Shipping & Delivery Policy | Aarsika',
    description:
      'Details on order processing, standard delivery times and complimentary shipping on orders ₹1,500 and above in India.',
    url: 'https://aarsika.com/shipping-policy',
    siteName: 'Aarsika',
    images: [{ url: 'https://aarsika.com/og-default.jpg', width: 1200, height: 630 }],
  },
};

export default function ShippingPolicyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
