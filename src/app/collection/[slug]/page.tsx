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
        bgImage: '/images/split story bg.webp',
      };
    }
    if (slug === 'ittras' || slug === 'attar' || slug === 'attars') {
      return {
        categoryKey: 'ATTAR',
        title: 'The Attar Collection',
        subtitle: 'Scents inspired by the soul of Rajasthan.',
        description:
          'Handcrafted pure attars aged in Mysore sandalwood oil. Zero alcohol, 100% natural extracts, and timeless fragrance rituals.',
        bgImage: '/images/split story bg.webp',
      };
    }
    if (slug === 'gift-sets' || slug === 'gifting') {
      return {
        categoryKey: 'GIFTING',
        title: 'The Art of Gifting',
        subtitle: 'Fragrance, thoughtfully brought together.',
        description:
          'Curated fragrance collections presented in artisanal presentation boxes for moments of celebration.',
        bgImage: '/images/split story bg.webp',
      };
    }
    if (slug === 'trial-sets' || slug === 'discovery-sets' || slug === 'discovery') {
      return {
        categoryKey: 'DISCOVERY SETS',
        title: 'Discover AARSIKA',
        subtitle: 'Find the fragrance that feels like you.',
        description:
          'Sampler and discovery sets created to explore the diverse olfactive universe of AARSIKA before choosing your signature.',
        bgImage: '/images/split story bg.webp',
      };
    }

    return {
      categoryKey: 'ALL',
      title: 'The Olfactive Collection',
      subtitle: 'Pure oils, spray perfumes, and discovery sets.',
      description: 'Explore the complete spectrum of fine Indian perfumery handcrafted by AARSIKA.',
      bgImage: '/images/split story bg.webp',
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

  const categoryProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const pCat = (product.category || '').toUpperCase();
      const targetCat = collectionMeta.categoryKey.toUpperCase();
      if (targetCat === 'ALL') return true;
      return pCat.includes(targetCat);
    });
  }, [collectionMeta.categoryKey]);

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
    <div className="bg-ivory min-h-screen text-ink pt-24 pb-20 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb Navigation */}
        <div className="text-xs font-mono tracking-widest text-muted uppercase space-x-2">
          <Link href="/" className="hover:text-ink">
            HOME
          </Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-ink">
            COLLECTION
          </Link>
          <span>/</span>
          <span className="text-ink font-medium">{collectionMeta.title}</span>
        </div>

        {/* Luxury Architectural Header Banner */}
        <section className="bg-cream border border-gold/30 rounded-2xl p-6 sm:p-10 lg:p-12 shadow-soft relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <span className="h-[1px] w-8 bg-gold" />
                <span className="text-[11px] font-mono tracking-[0.35em] text-gold-deep uppercase">
                  AARSIKA CATEGORY
                </span>
                <span className="text-gold text-xs">❖</span>
              </div>

              <div className="space-y-2">
                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-ink font-normal leading-tight">
                  {collectionMeta.title}
                </h1>
                <p className="font-serif italic text-lg sm:text-xl text-muted">
                  {collectionMeta.subtitle}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-muted max-w-lg font-light leading-relaxed">
                {collectionMeta.description}
              </p>

              {/* Fragrance Family Pills - only display on categories with 5 or more items */}
              {categoryProducts.length >= 5 && (
                <div className="pt-2 flex flex-wrap items-center gap-1.5 sm:gap-2">
                  {notesFilters.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveNotesFilter(cat.id)}
                      className={`px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-mono tracking-wider transition-all duration-300 ${
                        activeNotesFilter === cat.id
                          ? 'bg-wine-900 text-ivory shadow-md border border-wine-900'
                          : 'bg-transparent text-muted border border-line hover:border-wine-900 hover:text-wine-900'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Architectural Image Frame */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-md aspect-[16/10] sm:aspect-[4/3] rounded-tl-[80px] rounded-br-[40px] overflow-hidden border-2 border-gold/40 shadow-md group">
                <Image
                  src={collectionMeta.bgImage}
                  alt={collectionMeta.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-wine-950/40 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        </section>

        {/* Sort & Results Bar */}
        <section className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-gold/20 pb-4 text-xs font-mono">
          <div className="text-muted">
            SHOWING <span className="font-semibold text-ink">{filteredProducts.length}</span> CREATIONS
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[10px] text-muted uppercase tracking-widest">SORT BY:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-cream border border-gold/30 rounded-md px-3 py-1.5 text-xs text-ink focus:outline-none focus:border-wine-900"
            >
              <option value="featured">Featured Order</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </section>

        {/* Product Grid - Consistent Centered-Remainder Layout Across Breakpoints */}
        <section>
          {filteredProducts.length > 0 ? (
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] xl:max-w-[390px] flex"
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          ) : (
            <div className="py-24 text-center space-y-4 bg-cream border border-gold/20 rounded-xl p-8">
              <h3 className="font-serif text-3xl text-ink font-light">
                No creations found in this category
              </h3>
              <p className="text-xs font-mono text-muted">
                Try selecting &apos;All Creations&apos; to view our olfactive offerings.
              </p>
              <button
                onClick={() => setActiveNotesFilter('ALL')}
                className="px-6 py-2.5 bg-wine-900 text-ivory text-xs font-mono uppercase tracking-widest hover:bg-wine-800 transition-colors"
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
