import React from 'react';
import type { Metadata } from 'next';

interface CollectionLayoutProps {
  children: React.ReactNode;
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const slug = params.slug.toLowerCase();

  let title = 'Fine Fragrance Collection | Aarsika';
  let description =
    'Explore handcrafted fine fragrances, botanical attars, and luxury discovery sets by Aarsika.';

  if (slug === 'eau-de-parfums' || slug === 'perfumes') {
    title = 'Eau de Parfums | Fine Fragrance Collection | Aarsika';
    description =
      'Sophisticated Eau de Parfums crafted for presence, longevity, and contemporary luxury. Hand-blended with precious florals, spices, and rare woods.';
  } else if (slug === 'ittras' || slug === 'attar' || slug === 'attars') {
    title = 'Pure Botanical Attars | Zero Alcohol Oils | Aarsika';
    description =
      'Handcrafted pure attars aged in authentic Mysore sandalwood oil. 100% alcohol-free botanical extracts distilled using traditional copper deg-bhapka.';
  } else if (slug === 'gift-sets' || slug === 'gifting') {
    title = 'Luxury Fragrance Gift Sets | Artisanal Presentations | Aarsika';
    description =
      'Curated fragrance collections presented in bespoke architectural boxes for celebration, weddings, and memorable occasions.';
  } else if (slug === 'trial-sets' || slug === 'discovery-sets' || slug === 'discovery') {
    title = 'Fragrance Discovery Sets & Trial Samplers | Aarsika';
    description =
      'Experience the olfactive universe of Aarsika before choosing your signature bottle. Discovery sets of pure attars and eau de parfum vials.';
  }

  const canonicalUrl = `https://aarsika.com/collection/${slug}`;

  return {
    title,
    description,
    robots: {
      index: false,
      follow: false,
    },
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'Aarsika Fine Fragrance',
      images: [
        {
          url: 'https://aarsika.com/brand/og.jpg',
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/brand/og.jpg'],
    },
  };
}

export function generateStaticParams() {
  return [
    { slug: 'eau-de-parfums' },
    { slug: 'perfumes' },
    { slug: 'attar' },
    { slug: 'attars' },
    { slug: 'gift-sets' },
    { slug: 'gifting' },
    { slug: 'trial-sets' },
    { slug: 'discovery-sets' },
    { slug: 'discovery' },
  ];
}

export default function CollectionLayout({ children }: CollectionLayoutProps) {
  return <>{children}</>;
}
