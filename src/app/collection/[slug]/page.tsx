'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PRODUCTS } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';

interface CollectionSlugProps {
  params: {
    slug: string;
  };
}

export default function CollectionSlugPage({ params }: CollectionSlugProps) {
  const slug = params.slug.toLowerCase();

  // Map slug to category metadata
  const collectionMeta = useMemo(() => {
    if (slug === 'eau-de-parfums' || slug === 'perfumes') {
      return {
        categoryKey: 'EAU DE PARFUM',
        title: 'The Perfume Collection',
        subtitle: 'Modern expressions of timeless fragrance.',
        description:
          'Sophisticated Eau de Parfums crafted for presence, longevity, and contemporary luxury.',
        bgImage: '/images/split story bg.png',
      };
    }
    if (slug === 'ittras' || slug === 'attar' || slug === 'attars') {
      return {
        categoryKey: 'ATTAR',
        title: 'The Attar Collection',
        subtitle: 'Scents inspired by the soul of Rajasthan.',
        description:
          'Handcrafted pure attars aged in Mysore sandalwood oil. Zero alcohol, 100% natural extracts, and timeless fragrance rituals.',
        bgImage: '/images/split story bg.png',
      };
    }
    if (slug === 'gift-sets' || slug === 'gifting') {
      return {
        categoryKey: 'GIFTING',
        title: 'The Art of Gifting',
        subtitle: 'Fragrance, thoughtfully brought together.',
        description:
          'Curated fragrance collections presented in artisanal presentation boxes for moments of celebration.',
        bgImage: '/images/split story bg.png',
      };
    }
    if (slug === 'trial-sets' || slug === 'discovery-sets') {
      return {
        categoryKey: 'DISCOVERY SETS',
        title: 'Discover AARSIKA',
        subtitle: 'Find the fragrance that feels like you.',
        description:
          'Sampler and discovery sets created to explore the diverse olfactive universe of AARSIKA before choosing your signature.',
        bgImage: '/images/split story bg.png',
      };
    }

    return {
      categoryKey: 'ALL',
      title: 'The Olfactive Collection',
      subtitle: 'Pure oils, spray perfumes, and discovery sets.',
      description: 'Explore the complete spectrum of fine Indian perfumery handcrafted by AARSIKA.',
      bgImage: '/images/split story bg.png',
    };
  }, [slug]);

  const [activeNotesFilter, setActiveNotesFilter] = useState('ALL');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');

  const notesFilters = [
    { id: 'ALL', label: 'All Creations' },
    { id: 'FLORAL', label: 'Floral' },
    { id: 'WOODY', label: 'Woody' },
    { id: 'OUD', label: 'Oud' },
    { id: 'FRESH', label: 'Fresh' },
    { id: 'EARTHY', label: 'Earthy' },
    { id: 'GOURMAND', label: 'Gourmand' },
  ];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Primary category check
      const pCat = (product.category || '').toUpperCase();
      const targetCat = collectionMeta.categoryKey.toUpperCase();

      let isCategoryMatch = false;
      if (targetCat === 'ALL') {
        isCategoryMatch = true;
      } else {
        isCategoryMatch = pCat.includes(targetCat);
      }

      if (!isCategoryMatch) return false;

      // Secondary notes filter check
      if (activeNotesFilter === 'ALL') return true;
      const nFilter = activeNotesFilter.toUpperCase();
      const productFamily = (product.fragranceFamily || '').toUpperCase();
      const productSubcat = (product.subcategory || '').toUpperCase();
      const productTags = (product.tags || []).map((t) => t.toUpperCase());

      return (
        productFamily.includes(nFilter) ||
        productSubcat.includes(nFilter) ||
        productTags.includes(nFilter)
      );
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return 0;
    });
  }, [collectionMeta.categoryKey, activeNotesFilter, sortBy]);

  return (
    <div className="bg-[#F6EFE2] min-h-screen text-[#1a1411] pt-24 pb-24 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb Navigation */}
        <div className="text-xs font-mono tracking-widest text-[#6b5f55] uppercase space-x-2">
          <Link href="/" className="hover:text-[#1a1411]">
            HOME
          </Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-[#1a1411]">
            COLLECTION
          </Link>
          <span>/</span>
          <span className="text-[#1a1411] font-medium">{collectionMeta.title}</span>
        </div>

        {/* Luxury Architectural Header Banner */}
        <section className="bg-[#FBF6EA] border border-[#C9A55C]/30 rounded-2xl p-6 sm:p-10 lg:p-12 shadow-soft relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <span className="h-[1px] w-8 bg-[#C9A55C]" />
                <span className="text-[11px] font-mono tracking-[0.35em] text-[#8a6a22] uppercase">
                  AARSIKA CATEGORY
                </span>
                <span className="text-[#C9A55C] text-xs">❖</span>
              </div>

              <div className="space-y-2">
                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#1a1411] font-normal leading-tight">
                  {collectionMeta.title}
                </h1>
                <p className="font-serif italic text-lg sm:text-xl text-[#6b5f55]">
                  {collectionMeta.subtitle}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-[#5c5045] max-w-lg font-light leading-relaxed">
                {collectionMeta.description}
              </p>

              {/* Fragrance Family Pills */}
              <div className="pt-2 flex flex-wrap items-center gap-2 sm:gap-3">
                {notesFilters.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveNotesFilter(cat.id)}
                    className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all duration-300 ${
                      activeNotesFilter === cat.id
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
                  src={collectionMeta.bgImage}
                  alt={collectionMeta.title}
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

        {/* Product Grid (4-columns desktop, 2-columns mobile) */}
        <section>
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
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
                Try selecting &apos;All Creations&apos; to view our olfactive offerings.
              </p>
              <button
                onClick={() => setActiveNotesFilter('ALL')}
                className="px-6 py-2.5 bg-[#30070D] text-[#F5EFE3] text-xs font-mono uppercase tracking-widest hover:bg-[#450B14] transition-colors"
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

