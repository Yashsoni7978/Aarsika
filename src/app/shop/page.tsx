'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { PRODUCTS } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';

function ShopContent() {
  const searchParams = useSearchParams();
  const rawCategory = searchParams.get('category') || 'ALL';

  const normalizeCategory = (cat: string) => {
    const c = cat.toLowerCase();
    if (c === 'eau-de-parfums' || c === 'perfumes' || c === 'eau de parfum') return 'EAU DE PARFUM';
    if (c === 'ittras' || c === 'attar' || c === 'attars') return 'ATTAR';
    if (c === 'gift-sets' || c === 'gifting') return 'GIFTING';
    if (c === 'trial-sets' || c === 'discovery-sets' || c === 'discovery sets') return 'DISCOVERY SETS';
    return cat.toUpperCase();
  };

  const [activeCategory, setActiveCategory] = useState(() => normalizeCategory(rawCategory));
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');

  React.useEffect(() => {
    if (rawCategory) {
      setActiveCategory(normalizeCategory(rawCategory));
    }
  }, [rawCategory]);

  const categoryHeaderMeta = useMemo(() => {
    const c = activeCategory.toUpperCase();
    if (c === 'EAU DE PARFUM' || c === 'EAU-DE-PARFUMS' || c === 'PERFUMES') {
      return {
        title: 'The Perfume Collection',
        subtitle: 'Modern expressions of timeless fragrance.',
        description:
          'Sophisticated Eau de Parfums crafted for presence, longevity, and contemporary luxury.',
      };
    }
    if (c === 'ATTAR' || c === 'ITTRAS' || c === 'ATTARS') {
      return {
        title: 'The Attar Collection',
        subtitle: 'Scents inspired by the soul of Rajasthan.',
        description:
          'Handcrafted pure attars aged in Mysore sandalwood oil. Zero alcohol, 100% natural extracts, and timeless fragrance rituals.',
      };
    }
    if (c === 'GIFTING' || c === 'GIFT-SETS') {
      return {
        title: 'The Art of Gifting',
        subtitle: 'Fragrance, thoughtfully brought together.',
        description:
          'Curated fragrance collections presented in artisanal gift packaging for moments of celebration.',
      };
    }
    if (c === 'DISCOVERY SETS' || c === 'TRIAL-SETS') {
      return {
        title: 'Discover AARSIKA',
        subtitle: 'Find the fragrance that feels like you.',
        description:
          'Sampler and discovery sets created to explore the diverse olfactive universe of AARSIKA before choosing your signature.',
      };
    }

    const rawMoment = searchParams.get('moment') || searchParams.get('occasion');
    if (rawMoment) {
      const mCapital = rawMoment.charAt(0).toUpperCase() + rawMoment.slice(1);
      return {
        title: `${mCapital} Fragrance Collection`,
        subtitle: `Scents curated for your ${rawMoment} rituals.`,
        description: `Explore compositions specifically suited for ${rawMoment} wear, balancing projection, longevity, and mood.`,
      };
    }

    return {
      title: 'The Olfactive Collection',
      subtitle: 'Pure oils, spray perfumes, and discovery sets.',
      description: 'Explore the complete spectrum of fine Indian perfumery handcrafted by AARSIKA.',
    };
  }, [activeCategory, searchParams]);

  const categories = [
    { id: 'ALL', label: 'All' },
    { id: 'EAU DE PARFUM', label: 'Eau de Parfums' },
    { id: 'ATTAR', label: 'Itrras' },
    { id: 'GIFTING', label: 'Gift Sets' },
    { id: 'DISCOVERY SETS', label: 'Trial Sets' },
  ];

  const filteredProducts = useMemo(() => {
    const rawMoment = searchParams.get('moment') || searchParams.get('occasion');

    return PRODUCTS.filter((product) => {
      // Check moment / occasion filter
      if (rawMoment) {
        const m = rawMoment.toLowerCase();
        const occ = (product.occasion || '').toLowerCase();
        const tags = (product.tags || []).map((t) => t.toLowerCase());
        const matchesMoment =
          occ.includes(m) ||
          tags.includes(m) ||
          (m === 'night' && (occ.includes('evening') || occ.includes('occasions'))) ||
          (m === 'office' && occ.includes('everyday'));
        if (!matchesMoment) return false;
      }

      if (activeCategory === 'ALL') return true;

      // Match by category or fragrance family or subcategory
      const catUpper = activeCategory.toUpperCase();
      const productCat = (product.category || '').toUpperCase();
      const productFamily = (product.fragranceFamily || '').toUpperCase();
      const productSubcat = (product.subcategory || '').toUpperCase();
      const productTags = (product.tags || []).map((t) => t.toUpperCase());

      return (
        productCat.includes(catUpper) ||
        productFamily.includes(catUpper) ||
        productSubcat.includes(catUpper) ||
        productTags.includes(catUpper)
      );
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return 0;
    });
  }, [activeCategory, sortBy, searchParams]);

  return (
    <div className="bg-[#F6EFE2] min-h-screen text-[#1a1411] pt-24 pb-24 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Luxury Architectural Header Banner */}
        <section className="bg-[#FBF6EA] border border-[#C9A55C]/30 rounded-2xl p-6 sm:p-10 lg:p-12 shadow-soft relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <span className="h-[1px] w-8 bg-[#C9A55C]" />
                <span className="text-[11px] font-mono tracking-[0.35em] text-[#8a6a22] uppercase">
                  OUR COLLECTION
                </span>
                <span className="text-[#C9A55C] text-xs">❖</span>
              </div>

              <div className="space-y-2">
                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#1a1411] font-normal leading-tight">
                  {categoryHeaderMeta.title}
                </h1>
                <p className="font-serif italic text-lg sm:text-xl text-[#6b5f55]">
                  {categoryHeaderMeta.subtitle}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-[#5c5045] max-w-lg font-light leading-relaxed">
                {categoryHeaderMeta.description}
              </p>

              {/* Category Filter Pills */}
              <div className="pt-2 flex flex-wrap items-center gap-2 sm:gap-3">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-5 py-2 rounded-full text-xs font-mono tracking-wider transition-all duration-300 ${
                      activeCategory === cat.id
                        ? 'bg-[#30070D] text-[#F5EFE3] shadow-md border border-[#30070D]'
                        : 'bg-transparent text-[#4a3f35] border border-[#dccfb6] hover:border-[#30070D] hover:text-[#30070D]'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Right Architectural Image Frame */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-md aspect-[16/10] sm:aspect-[4/3] rounded-tl-[80px] rounded-br-[40px] overflow-hidden border-2 border-[#C9A55C]/40 shadow-md group">
                <Image
                  src="/images/split story bg.png"
                  alt="Rajasthan Royal Heritage Palace"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#26060d]/40 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        </section>

        {/* Sort & Results Bar */}
        <section className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-[#C9A55C]/20 pb-4 text-xs font-mono">
          <div className="text-[#6b5f55]">
            SHOWING <span className="font-semibold text-[#1a1411]">{filteredProducts.length}</span> CREATIONS
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[10px] text-[#6b5f55] uppercase tracking-widest">SORT BY:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#FBF6EA] border border-[#C9A55C]/30 rounded-md px-3 py-1.5 text-xs text-[#1a1411] focus:outline-none focus:border-[#30070D]"
            >
              <option value="featured">Featured Order</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </section>

        {/* Product Grid (4-columns desktop) */}
        <section>
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="py-24 text-center space-y-4 bg-[#FBF6EA] border border-[#C9A55C]/20 rounded-xl p-8">
              <h3 className="font-serif text-3xl text-[#1a1411] font-light">
                No creations found in this category
              </h3>
              <p className="text-xs font-mono text-[#6b5f55]">
                Try selecting &apos;All&apos; to view our full olfactive collection.
              </p>
              <button
                onClick={() => setActiveCategory('ALL')}
                className="px-6 py-2.5 bg-[#30070D] text-[#F5EFE3] text-xs font-mono uppercase tracking-widest hover:bg-[#450B14] transition-colors rounded-none"
              >
                Reset Filters →
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="py-32 text-center text-xs font-mono">Loading Collection...</div>}>
      <ShopContent />
    </Suspense>
  );
}
