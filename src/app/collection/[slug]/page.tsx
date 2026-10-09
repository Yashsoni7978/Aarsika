import { redirect } from 'next/navigation';

interface CollectionSlugProps {
  params: {
    slug: string;
  };
}

export default function CollectionSlugPage({ params }: CollectionSlugProps) {
  const slug = params.slug.toLowerCase();

  let categoryParam = 'ALL';
  if (slug === 'eau-de-parfums' || slug === 'perfumes') categoryParam = 'EAU DE PARFUM';
  else if (slug === 'ittras' || slug === 'attar' || slug === 'attars') categoryParam = 'ATTAR';
  else if (slug === 'gift-sets' || slug === 'gifting') categoryParam = 'GIFTING';
  else if (slug === 'trial-sets' || slug === 'discovery-sets') categoryParam = 'DISCOVERY SETS';

  redirect(`/shop?category=${encodeURIComponent(categoryParam)}`);
}
