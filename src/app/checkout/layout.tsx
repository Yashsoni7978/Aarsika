import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Secure Checkout | Aarsika Fine Fragrance',
  description: 'Complete your order with secure UPI, Cards, Netbanking, or Cash on Delivery.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
