import React from 'react';
import type { Metadata } from 'next';
import { PRODUCTS } from '@/data/products';

interface ProductLayoutProps {
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
  const product = PRODUCTS.find(
    (p) => p.slug === params.slug || p.id === params.slug
  );

  if (!product) {
    return {
      title: 'Product Not Found | Aarsika',
      description: 'The requested fragrance could not be found.',
      robots: { index: false, follow: false },
    };
  }

  // Title Template: Do not append type if name already contains it (Set, Sampler, EDP, Eau de Parfum)
  const nameLower = product.name.toLowerCase();
  const typeLower = product.type.toLowerCase();
  const hasTypeOrKeyword =
    nameLower.includes(typeLower) ||
    nameLower.includes('set') ||
    nameLower.includes('sampler') ||
    nameLower.includes('edp') ||
    nameLower.includes('eau de parfum');

  const title = hasTypeOrKeyword
    ? `${product.name} | Aarsika`
    : `${product.name} ${product.type} | Aarsika`;

  // Description Template:
  // 1. Attars: "{Name} attar oil by Aarsika, from ₹249. Complimentary delivery on orders ₹1,500 and above."
  // 2. Sets: "{Name} by Aarsika, {contents from data}, ₹{price}. Complimentary delivery on orders ₹1,500 and above."
  // 3. EDPs: "{Name} eau de parfum by Aarsika, 50 ml, ₹{price}. Complimentary delivery on orders ₹1,500 and above."
  const formattedPrice = new Intl.NumberFormat('en-IN').format(product.price);
  let description = '';

  if (product.category === 'ATTAR') {
    description = `${product.name} attar oil by Aarsika, from ₹249. Complimentary delivery on orders ₹1,500 and above.`;
  } else if (product.category === 'GIFTING' || product.category === 'DISCOVERY SETS') {
    let contents = product.bundleInfo?.displayConfig || product.bundleInfo?.totalVolume || product.defaultSize || 'curated selection';
    if (product.slug === 'discovery-set-attar') {
      contents = '3 to 4 sample attars, 3 ml each';
    } else if (product.slug === 'the-discovery-gift-set') {
      contents = '5 × 6 ml flacons';
    } else if (product.slug === 'the-signature-gift-set') {
      contents = '3 × 12 ml flacons';
    } else if (product.slug === 'the-grand-gift-set') {
      contents = '3 × 30 ml flacons';
    } else if (product.slug === 'the-royal-perfume-sampler') {
      contents = '10 × 2 ml spray vials';
    }
    description = `${product.name} by Aarsika, ${contents}, ₹${formattedPrice}. Complimentary delivery on orders ₹1,500 and above.`;
  } else {
    // Eau de Parfum and others
    const size = product.defaultSize || '50 ml';
    description = `${product.name} eau de parfum by Aarsika, ${size}, ₹${formattedPrice}. Complimentary delivery on orders ₹1,500 and above.`;
  }

  const canonicalUrl = `https://aarsika.com/products/${product.slug}`;
  const rawImage = product.mainImage || '/og-default.jpg';
  const encodedImage = encodeURI(rawImage);
  const imageUrl = encodedImage.startsWith('http')
    ? encodedImage
    : `https://aarsika.com${encodedImage.startsWith('/') ? '' : '/'}${encodedImage}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'Aarsika',
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 1000,
          alt: `${product.name} | Aarsika`,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  };
}

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    slug: product.slug,
  }));
}

export default function ProductLayout({ children }: ProductLayoutProps) {
  return <>{children}</>;
}
