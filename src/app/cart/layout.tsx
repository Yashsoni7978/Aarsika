import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shopping Bag | Aarsika Fine Fragrance',
  description: 'Review your selected artisanal attars, perfumes, and gift sets.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function CartLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
