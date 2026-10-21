import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Order Confirmed | Aarsika Fine Fragrance',
  description: 'Your fragrance order has been successfully placed with Aarsika.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function OrderSuccessLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
