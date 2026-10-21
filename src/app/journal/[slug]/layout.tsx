import React from 'react';
import type { Metadata } from 'next';
import { JOURNAL_ARTICLES } from '@/data/journal';

interface JournalLayoutProps {
  children: React.ReactNode;
  params: {
    slug: string;
  };
}

const ARTICLE_METADATA: Record<string, { title: string; description: string }> = {
  'secrets-of-kannauj-hydro-distillation': {
    title: 'The Copper Degs of Kannauj | Aarsika',
    description: 'An exploration of traditional deg-bhapka distillation techniques and seasonal fragrance capture in India.',
  },
  'language-of-rose-in-rajput-courts': {
    title: 'The Language of the Rose | Aarsika',
    description: 'A historical perspective on Damask rose water and rose attar traditions in royal Indian hospitality.',
  },
  'agarwood-notes-and-ancient-resins': {
    title: 'Dark Resins & Wild Assam Agarwood | Aarsika',
    description: 'An olfactive guide to aged agarwood resin profiles, dark notes, and multi-layered woody fragrance compositions.',
  },
  'art-of-gifting-in-royal-tradition': {
    title: 'Etiquette of Fragrance Gifting | Aarsika',
    description: 'Traditions and etiquette behind gifting fine attars and curated fragrance flacons for celebratory occasions.',
  },
};

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const article = JOURNAL_ARTICLES.find(
    (a) => a.slug === params.slug || a.id === params.slug
  );

  if (!article) {
    return {
      title: 'Article Not Found | Aarsika',
      description: 'The requested journal entry could not be found.',
      robots: { index: false, follow: false },
    };
  }

  const meta = ARTICLE_METADATA[article.slug] || {
    title: `${article.title.slice(0, 48)} | Aarsika`,
    description: article.excerpt.slice(0, 150),
  };

  const canonicalUrl = `https://aarsika.com/journal/${article.slug}`;
  const rawImage = article.mainImage || '/og-default.jpg';
  const encodedImage = encodeURI(rawImage);
  const imageUrl = encodedImage.startsWith('http')
    ? encodedImage
    : `https://aarsika.com${encodedImage.startsWith('/') ? '' : '/'}${encodedImage}`;

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: canonicalUrl,
      siteName: 'Aarsika',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${meta.title}`,
        },
      ],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: [imageUrl],
    },
  };
}

export function generateStaticParams() {
  return JOURNAL_ARTICLES.map((article) => ({
    slug: article.slug,
  }));
}

export default function JournalSlugLayout({ children }: JournalLayoutProps) {
  return <>{children}</>;
}
