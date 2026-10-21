import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fragrance Journal & Articles | Aarsika',
  description:
    'Notes, guides and background articles on attar oils, perfume layering, gifting etiquette and scent families by Aarsika.',
  alternates: {
    canonical: 'https://aarsika.com/journal',
  },
  openGraph: {
    title: 'Fragrance Journal & Articles | Aarsika',
    description:
      'Notes, guides and background articles on attar oils, perfume layering, gifting etiquette and scent families by Aarsika.',
    url: 'https://aarsika.com/journal',
    siteName: 'Aarsika',
    images: [{ url: 'https://aarsika.com/og-default.jpg', width: 1200, height: 630 }],
  },
};

export default function JournalLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
