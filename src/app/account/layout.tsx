import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Patron Account & Orders | Aarsika Fine Fragrance',
  description: 'Manage your patron details, saved addresses, and active orders.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
