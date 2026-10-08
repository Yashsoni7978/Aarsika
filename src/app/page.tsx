'use client';

import React from 'react';
import Link from 'next/link';
import { JOURNAL_ARTICLES } from '@/data/journal';
import { Photo } from '@/components/Photo';
import { ArchFrame } from '@/components/ArchFrame';
import HeroSlider from '@/components/HeroSlider';

export default function HomePage() {
  // Find discovery product or fallback
  const discoveryPrice = 499;

  // Featured product (Gul-e-Rooh) with clean notes (no origin words)
  const featuredProd = {
    id: 'p1',
    slug: 'gul-e-rooh',
    name: 'Gul-e-Rooh',
    type: 'Damask Rose Attar',
    price: 2499,
    notes: {
      top: ['Rose Petals', 'Crimson Saffron'],
      heart: ['Damask Rose Absolute', 'Jasmine'],
      base: ['Sandalwood', 'Amber'],
    },
    image: 'gul-e-rooh',
  };

  // Filter Journal Articles for titles with NO regional / palace terms
  const regionalWordsRegex = /jaipur|kannauj|rajput|rajasthan|palace|royal/i;
  const filteredJournalArticles = JOURNAL_ARTICLES.filter(
    (art) => !regionalWordsRegex.test(art.title)
  ).slice(0, 3);

  const collections = [
    {
      slug: 'perfumes',
      title: 'Eau de Parfum',
      desc: 'High-concentration fine fragrances created for daily wear and evening presence.',
      href: '/perfumes',
      image: 'perfumes-cat',
    },
    {
      slug: 'attar',
      title: 'Attar & Oils',
      desc: 'Pure concentrated perfume oils extracted through traditional steam distillation.',
      href: '/attar',
      image: 'attar-cat',
    },
    {
      slug: 'oud',
      title: 'Oud & Pure Extracts',
      desc: 'Deep aged agarwood resins, smoked ambers, and rare botanical distillates.',
      href: '/oud',
      image: 'oud-cat',
    },
    {
      slug: 'gifting',
      title: 'Gifting & Sets',
      desc: 'Bespoke fragrance gift chests, discovery samplers, and wedding keepsakes.',
      href: '/gifting',
      image: 'gifting-cat',
    },
  ];

  return (
    <div className="bg-[#F6EFE2] text-[#1a1411] font-sans overflow-x-hidden">
      {/* ==========================================
          1. HERO SLIDER (Day to Night, 4 Slides)
      ========================================== */}
      <HeroSlider />

      {/* ==========================================
          2. THE HOUSE OF AARSIKA (2-Column Minimalist Intro)
      ========================================== */}
      <section className="py-20 md:py-32 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto border-b border-[#dccfb6]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Arch Frame Image Left */}
          <div className="lg:col-span-5 flex justify-center">
            <ArchFrame
              src="/photos/the-house.jpg"
              alt="House of Aarsika Fragrance House"
              aspectRatio="4:5"
              className="max-w-md w-full"
            />
          </div>

          {/* Text Right */}
          <div className="lg:col-span-7 space-y-6">
            <span className="eyebrow-label text-[#8a6a22]">THE HOUSE</span>

            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#1a1411] leading-tight">
              A luxury Indian fragrance house shaped by memory, material and place.
            </h2>

            <div className="space-y-4 font-light text-[#4a3f35] text-base leading-relaxed max-w-2xl">
              <p>
                Aarsika distills the soul of Indian botanicals—rare Damask rose, aged Assam oud resin,
                wild jasmine, and golden saffron—into timeless scents crafted for everyday elegance and grand occasions alike.
              </p>
              <p>
                Each flacon is designed as a vessel of memory, honoring centuries of Indian perfume tradition
                while refined for modern global sensibilities.
              </p>
            </div>

            <div className="pt-2">
              <Link href="/our-story" className="text-link-underline text-[#1a1411]">
                Our story →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          3. THE COLLECTION (4 Arch-Top Tiles Grid)
      ========================================== */}
      <section className="py-20 md:py-28 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto border-b border-[#dccfb6]">
        <div className="space-y-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="eyebrow-label text-[#8a6a22]">DISCOVER BY CATEGORY</span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1a1411]">
                The Collection
              </h2>
            </div>
            <Link href="/shop" className="text-link-underline text-[#1a1411]">
              Explore all →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {collections.map((cat) => (
              <div key={cat.slug} className="space-y-4 group">
                <Link href={cat.href} className="block">
                  <ArchFrame
                    src={`/photos/${cat.image}.jpg`}
                    alt={cat.title}
                    aspectRatio="4:5"
                  />
                </Link>

                <div className="space-y-1.5">
                  <h3 className="font-serif text-2xl text-[#1a1411] group-hover:text-[#8b1a2b] transition-colors">
                    <Link href={cat.href}>{cat.title}</Link>
                  </h3>
                  <p className="font-light text-xs text-[#6b5f55] leading-relaxed line-clamp-2">
                    {cat.desc}
                  </p>
                  <div className="pt-1">
                    <Link href={cat.href} className="text-link-underline text-[#1a1411]">
                      Explore →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          4. DISCOVERY SET FEATURE (Unboxed Block)
      ========================================== */}
      <section className="py-20 md:py-28 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto border-b border-[#dccfb6]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-5">
            <span className="eyebrow-label text-[#8a6a22]">BEGIN YOUR JOURNEY</span>

            <h2 className="font-serif text-4xl sm:text-5xl text-[#1a1411] leading-tight">
              The Attar Discovery Set
            </h2>

            <p className="font-light text-base text-[#4a3f35] leading-relaxed max-w-lg">
              Three to four attars, 3 ml each. Find your signature before you choose a full bottle. Free shipping across India.
            </p>

            <div className="pt-2">
              <span className="font-mono text-2xl text-[#1a1411] font-medium block mb-4">
                ₹{discoveryPrice.toLocaleString('en-IN')}
              </span>

              <Link href="/discovery-sets" className="text-link-underline text-[#1a1411]">
                Explore the set →
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6">
            <Photo
              slot="discovery-set"
              alt="Aarsika Attar Discovery Set"
              aspect="4/3"
              shape="rect"
              sizes="(max-width: 1024px) 100vw, 550px"
              className="w-full"
            />
          </div>
        </div>
      </section>

      {/* ==========================================
          5. ONE FEATURED PRODUCT (Unboxed Block)
      ========================================== */}
      <section className="py-20 md:py-28 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto border-b border-[#dccfb6]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Photo Left */}
          <div className="lg:col-span-6">
            <Photo
              slot="featured-product"
              alt={featuredProd.name}
              aspect="1/1"
              shape="rect"
              sizes="(max-width: 1024px) 100vw, 550px"
              className="w-full"
            />
          </div>

          {/* Details Right */}
          <div className="lg:col-span-6 space-y-4">
            <span className="eyebrow-label text-[#8a6a22]">FEATURED CREATION</span>

            <h2 className="font-serif text-4xl sm:text-5xl text-[#1a1411]">
              {featuredProd.name}
            </h2>

            <p className="font-mono text-xs uppercase tracking-widest text-[#8a6a22]">
              {featuredProd.type}
            </p>

            <p className="text-[#6b5f55] text-sm font-light leading-relaxed">
              Top: {featuredProd.notes.top.join(', ')} • Heart:{' '}
              {featuredProd.notes.heart.join(', ')} • Base: {featuredProd.notes.base.join(', ')}
            </p>

            <p className="font-mono text-xl text-[#1a1411] font-medium pt-1">
              ₹{featuredProd.price.toLocaleString('en-IN')}
            </p>

            <div className="pt-2">
              <Link href={`/products/${featuredProd.slug}`} className="text-link-underline text-[#1a1411]">
                View product →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          6. JOURNAL (Only shown if titles have no regional/palace wording)
      ========================================== */}
      {filteredJournalArticles.length > 0 && (
        <section className="py-16 md:py-24 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto">
          <div className="space-y-10">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-3xl sm:text-4xl text-[#1a1411]">The Journal</h2>
              <Link href="/journal" className="text-link-underline text-[#1a1411]">
                All articles →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-[#dccfb6] pt-8 divide-y md:divide-y-0 md:divide-x divide-[#dccfb6]">
              {filteredJournalArticles.map((article, idx) => (
                <div key={article.id} className={`space-y-2 ${idx > 0 ? 'pt-6 md:pt-0 md:pl-8' : ''}`}>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#8a6a22]">
                    {article.category}
                  </span>
                  <Link href={`/journal/${article.slug}`} className="block group">
                    <h3 className="font-serif text-2xl text-[#1a1411] group-hover:text-[#8b1a2b] transition-colors leading-snug">
                      {article.title}
                    </h3>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
