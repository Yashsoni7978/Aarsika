'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PRODUCTS, Product } from '@/data/products';
import HeroSlider from '@/components/HeroSlider';
import { AttarCard } from '@/components/AttarCard';
import { Heart, Sparkles, ArrowRight, ShieldCheck, Truck, RefreshCw, Award } from 'lucide-react';
import { useShop } from '@/context/ShopContext';
import PearlButton from '@/components/PearlButton';
import ResponsivePhoto from '@/components/ResponsivePhoto';

export default function HomePage() {
  const { wishlist, toggleWishlist } = useShop();

  // Newsletter state
  const [email, setEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setNewsletterStatus('loading');
    setTimeout(() => {
      setNewsletterStatus('success');
      setEmail('');
    }, 600);
  };

  // 1. The 9 Attars in sequence
  const attarSlugs = [
    'maati',
    'saanjh',
    'sehar-e-gulab',
    'shaam-ka-noor',
    'raat-ki-rani',
    'resham-oudh',
    'mehfil',
    'chocolate-oudh',
    'tobacco',
  ];
  const attarProducts = attarSlugs
    .map((slug) => PRODUCTS.find((p) => p.slug === slug))
    .filter(Boolean) as Product[];

  // 2. The 6 Eau de Parfums shortlisted
  const perfumeSlugs = [
    'amour',
    'roman',
    'atlas',
    'noor',
    'saira',
    'andaaz-e-khaas',
  ];
  const perfumeProducts = perfumeSlugs
    .map((slug) => PRODUCTS.find((p) => p.slug === slug))
    .filter(Boolean) as Product[];

  // 3. Gift Sets (3 planned configurations: 5 × 6 ml, 3 × 12 ml, 3 × 30 ml)
  const giftSetSlugs = [
    'the-discovery-gift-set',
    'the-signature-gift-set',
    'the-grand-gift-set',
  ];
  const giftSetProducts = giftSetSlugs
    .map((slug) => PRODUCTS.find((p) => p.slug === slug))
    .filter(Boolean) as Product[];

  // 4. Ingredients data (associated with authentic fragrance compositions)
  const ingredients = [
    {
      name: 'Damask Rose',
      role: 'Floral Radiance',
      image: '/images/rose ingrediant.png',
      desc: 'Velvety petals harvested at dawn, offering a radiant, timeless floral signature.',
      featuredIn: 'Sehar E Gulab & Amour',
      productSlug: 'sehar-e-gulab',
    },
    {
      name: 'Assam Oud',
      role: 'Smoky Depth',
      image: '/images/oudh.png',
      desc: 'Deep, resinous agarwood providing profound smokiness and magnetic warmth.',
      featuredIn: 'Resham Oudh',
      productSlug: 'resham-oudh',
    },
    {
      name: 'Night Jasmine',
      role: 'Ethereal Sweetness',
      image: '/images/green jasmine.png',
      desc: 'Night-blooming white florals with intoxicating, ethereal sweetness.',
      featuredIn: 'Raat Ki Rani',
      productSlug: 'raat-ki-rani',
    },
    {
      name: 'Kashmiri Saffron',
      role: 'Exotic Warmth',
      image: '/images/kesar ingrediant.png',
      desc: 'Golden crimson threads infusing exotic spice and warm leather nuances.',
      featuredIn: 'Saanjh',
      productSlug: 'saanjh',
    },
    {
      name: 'Mysore Sandalwood',
      role: 'Creamy Calm',
      image: '/images/scandalwood.png',
      desc: 'Creamy heartwood that anchors compositions with serene elegance and comfort.',
      featuredIn: 'Jaipur Maati',
      productSlug: 'maati',
    },
  ];

  // 5. Moments data
  const moments = [
    {
      title: 'Everyday',
      subtitle: 'Light & Easy',
      desc: 'Fresh, graceful compositions crafted to accompany daily rituals.',
      slug: 'everyday',
    },
    {
      title: 'Office',
      subtitle: 'Clean & Composed',
      desc: 'Quietly distinguished notes that remain subtle, refined, and personal.',
      slug: 'office',
    },
    {
      title: 'Festive',
      subtitle: 'Warm & Celebratory',
      desc: 'Opulent blends of amber, saffron, and floral warmth for joyous gatherings.',
      slug: 'festive',
    },
    {
      title: 'Night',
      subtitle: 'Deep & Lasting',
      desc: 'Magnetic accords of smoky oud and night blooms with unforgettable sillage.',
      slug: 'night',
    },
  ];

  return (
    <div className="bg-[#F5EFE3] text-[#32151A] font-sans overflow-x-hidden">
      
      {/* ========================================================
          1. HERO SLIDER — Full-Width Campaign Banner
      ======================================================== */}
      <HeroSlider />

      {/* ========================================================
          2. FIND YOUR FRAGRANCE (Shop by Type)
      ======================================================== */}
      <section className="py-14 md:py-20 bg-[#F5EFE3] border-b border-[#C69A45]/20">
        <div className="max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="text-center max-w-xl mx-auto mb-10 md:mb-12">
            <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.28em] text-[#9D6A26] block mb-2">
              CATEGORIES
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#32151A]">
              Find Your Fragrance
            </h2>
            <div className="flex items-center justify-center gap-3 mt-3">
              <span className="w-8 h-[1px] bg-[#C69A45]/40" />
              <span className="text-[#C69A45] text-xs">❖</span>
              <span className="w-8 h-[1px] bg-[#C69A45]/40" />
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              {
                title: 'Eau de Parfums',
                subtitle: 'Refined & Long-Lasting',
                href: '/collections/perfumes',
                image: '/photos/perfumes/amour.png',
              },
              {
                title: 'Attars',
                subtitle: 'Pure & Timeless',
                href: '/collections/attar',
                image: '/photos/attars/sehar-e-gulab-clean 1st.jpg',
              },
              {
                title: 'Gift Sets',
                subtitle: 'Thoughtful & Elegant',
                href: '/collections/gifting',
                image: '/photos/gift-sets/discovery-gift-set.png',
              },
              {
                title: 'Trial Sets',
                subtitle: 'Discover Your Signature',
                href: '/discovery-sets',
                image: '/photos/trial-packs/aarsika-ittra-collection-trial-set.webp',
              },
            ].map((cat) => (
              <Link
                key={cat.title}
                href={cat.href}
                className="group relative flex flex-col bg-[#FBF6EA] border border-[#C69A45]/25 rounded-xl overflow-hidden hover:border-[#C69A45] hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                {/* Horizontal Image Container (Upper 55%) */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#EADFCB]">
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#200408]/20 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity" />
                </div>

                {/* Text Content */}
                <div className="p-4 sm:p-5 flex flex-col justify-between flex-1 bg-[#FBF6EA]">
                  <div>
                    <h3 className="font-serif text-lg sm:text-xl font-normal text-[#32151A] group-hover:text-[#9D6A26] transition-colors leading-snug">
                      {cat.title}
                    </h3>
                    <p className="text-xs font-sans text-[#6b5f55] font-light mt-1">
                      {cat.subtitle}
                    </p>
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-[#C69A45]/15 flex items-center justify-between text-[11px] font-mono tracking-wider text-[#9D6A26] group-hover:text-[#32151A] transition-colors">
                    <span>EXPLORE</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          3. THE ATTAR COLLECTION (7 Attars with 3-Image Carousels)
      ======================================================== */}
      <section className="py-16 md:py-24 bg-[#F5EFE3]">
        <div className="max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 md:mb-14 pb-4 border-b border-[#C69A45]/20">
            <div>
              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.28em] text-[#9D6A26] block mb-2">
                PURE BOTANICAL ESSENCES
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#32151A]">
                The Attar Collection
              </h2>
              <p className="text-sm sm:text-base text-[#6b5f55] font-light mt-2 max-w-xl">
                Nine pure concentrated attar oils, aged with botanical precision to create an intimate skin aura.
              </p>
            </div>
            <Link
              href="/collections/attar"
              className="text-xs font-mono uppercase tracking-[0.2em] text-[#9D6A26] hover:text-[#32151A] transition-colors flex items-center gap-1.5"
            >
              <span>VIEW ALL 9 ATTARS</span>
              <span>→</span>
            </Link>
          </div>

          {/* Attar Cards Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-7">
            {attarProducts.map((product) => (
              <AttarCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          4. THE EAU DE PARFUMS COLLECTION (6 Perfumes)
      ======================================================== */}
      <section className="py-16 md:py-24 bg-[#FBF6EA] border-t border-[#C69A45]/20">
        <div className="max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 md:mb-14 pb-4 border-b border-[#C69A45]/20">
            <div>
              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.28em] text-[#9D6A26] block mb-2">
                CONTEMPORARY SPRAY FORMULATIONS
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#32151A]">
                The Eau de Parfums
              </h2>
              <p className="text-sm sm:text-base text-[#6b5f55] font-light mt-2 max-w-xl">
                High-concentration spray perfumes composed for modern elegance, distinct projection, and everyday wear.
              </p>
            </div>
            <Link
              href="/collections/perfumes"
              className="text-xs font-mono uppercase tracking-[0.2em] text-[#9D6A26] hover:text-[#32151A] transition-colors flex items-center gap-1.5"
            >
              <span>VIEW ALL PERFUMES</span>
              <span>→</span>
            </Link>
          </div>

          {/* Perfumes Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 sm:gap-8">
            {perfumeProducts.map((prod) => {
              const isWishlisted = wishlist.includes(prod.id);
              return (
                <div
                  key={prod.id}
                  className="group relative flex flex-col bg-[#FBF6EA] border border-[#C69A45]/20 p-4 sm:p-5 transition-all duration-300 hover:border-[#C69A45] hover:shadow-md"
                >
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#EADFCB] mb-3.5">
                    <Link href={`/products/${prod.slug}`} className="block w-full h-full">
                      <ResponsivePhoto
                        slot={`${prod.slug}-card`}
                        alt={prod.name}
                        aspect="4/5"
                        objectFit="contain"
                        sizes="(max-width: 640px) 50vw, 33vw"
                        className="w-full h-full"
                      />
                    </Link>

                    {/* Wishlist Button */}
                    <button
                      onClick={() => toggleWishlist(prod.id)}
                      className={`absolute top-2.5 right-2.5 z-20 p-2 rounded-full transition-colors ${
                        isWishlisted
                          ? 'bg-[#30070D] text-[#C69A45]'
                          : 'bg-[#F5EFE3]/80 hover:bg-[#F5EFE3] text-[#32151A]'
                      }`}
                      aria-label={`Save ${prod.name} to wishlist`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-[#C69A45]' : ''}`} />
                    </button>
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-mono tracking-widest text-[#9D6A26] uppercase block">
                        Eau de Parfum · {prod.defaultSize || '50 ml'}
                      </span>
                      <Link href={`/products/${prod.slug}`} className="mt-1 block">
                        <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#32151A] group-hover:text-[#9D6A26] transition-colors">
                          {prod.name}
                        </h3>
                      </Link>
                      {prod.tagline && (
                        <p className="text-xs text-[#6b5f55] font-light mt-0.5 line-clamp-1">
                          {prod.tagline}
                        </p>
                      )}
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#C69A45]/20 flex items-center justify-between">
                      <span className="text-sm font-sans font-medium text-[#32151A]">
                        ₹{prod.price.toLocaleString('en-IN')}
                      </span>
                      <PearlButton
                        href={`/products/${prod.slug}`}
                        variant="champagne"
                        size="sm"
                        rightIcon={<ArrowRight className="w-3 h-3 text-[#9D6A26]" />}
                      >
                        EXPLORE
                      </PearlButton>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================
          5. DISCOVERY SET / TRIAL PACK PROMOTION — Burgundy Panorama
      ======================================================== */}
      <section className="relative py-20 md:py-28 lg:py-32 overflow-hidden bg-[#200408] border-y border-[#C69A45]/30">
        {/* Full-width Panoramic Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/photos/discovery-set-burgundy-bg.png"
            alt="Aarsika Discovery Set Burgundy Background"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_right] md:object-center"
          />
          {/* Subtle localized dark burgundy gradient overlay to ensure crystal clear text legibility while preserving architectural details */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1b0306]/95 via-[#1b0306]/55 to-[#1b0306]/75 md:bg-gradient-to-r md:from-[#1b0306]/92 md:via-[#1b0306]/60 md:to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-[#200408]/15 pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Content — Product Information */}
            <div className="lg:col-span-6 xl:col-span-7 space-y-6">
              <span className="text-xs font-mono uppercase tracking-[0.28em] text-[#E5C378] block">
                THE SAMPLER PRESENTATION
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-[#FFF8EB] leading-tight drop-shadow-xs">
                Discover Your Signature
              </h2>
              <p className="font-serif text-xl sm:text-2xl italic text-[#E5C378]">
                A curated set of 7 luxurious fragrances
              </p>
              <p className="text-sm sm:text-base text-[#F5EFE3]/90 font-light leading-relaxed max-w-xl">
                Experience our complete attar repertoire in 3 ml miniature flacons before choosing your full bottle. Seven distinctive pure attar oils hand-crafted with botanical precision and delivered with complimentary shipping across India.
              </p>

              {/* Benefit indicators */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1 pb-1">
                <div className="px-4 py-2 bg-[#30070D]/80 backdrop-blur-xs border border-[#C69A45]/40 rounded-full text-xs font-mono tracking-wider text-[#FFF8EB] font-medium shadow-sm">
                  7 × 3 ml
                </div>
                <div className="px-4 py-2 bg-[#E5C378] border border-[#FFF8EB]/50 rounded-full text-xs font-mono tracking-wider text-[#200408] font-bold shadow-md">
                  ₹499
                </div>
                <div className="px-4 py-2 bg-[#30070D]/80 backdrop-blur-xs border border-[#C69A45]/40 rounded-full text-xs font-mono tracking-wider text-[#FFF8EB] flex items-center gap-2 shadow-sm">
                  <Truck className="w-3.5 h-3.5 text-[#E5C378]" />
                  <span>Free Pan-India Delivery</span>
                </div>
              </div>
              
              <div className="pt-2">
                <PearlButton
                  href="/discovery-sets"
                  variant="burgundy"
                  size="lg"
                  rightIcon={<ArrowRight className="w-4 h-4 text-[#C69A45]" />}
                >
                  EXPLORE THE TRIAL SET
                </PearlButton>
              </div>
            </div>

            {/* Right Image — Authentic Product Photography (Natural 3:2 Proportions) */}
            <div className="lg:col-span-6 xl:col-span-5">
              <div className="relative aspect-[3/2] w-full overflow-hidden rounded-2xl border border-[#E5C378]/35 shadow-2xl bg-[#200408] transition-transform duration-500 hover:scale-[1.01]">
                <ResponsivePhoto
                  slot="discovery-set"
                  alt="Aarsika Ittra Collection Trial Set"
                  priority
                  aspect="3/2"
                  objectFit="contain"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          6. OUR STORY — Modern Fragrance House
      ======================================================== */}
      <section className="py-16 md:py-24 bg-[#F5EFE3]">
        <div className="max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Image (left) */}
            <div className="lg:col-span-6 order-2 lg:order-1">
              <div className="relative aspect-[3/4] max-w-lg mx-auto overflow-hidden border border-[#C69A45]/30 shadow-md">
                <ResponsivePhoto
                  slot="house"
                  alt="Aarsika Perfumery Craftsmanship"
                  aspect="3/4"
                  objectFit="cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="w-full h-full"
                />
              </div>
            </div>

            {/* Text (right) */}
            <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
              <span className="text-xs font-mono uppercase tracking-[0.28em] text-[#9D6A26] block">
                THE PHILOSOPHY
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#32151A] leading-tight">
                A Fragrance House for Every Story
              </h2>
              <p className="text-base sm:text-lg text-[#4a3f35] font-light leading-relaxed">
                Fragrance is personal. It carries memories, shapes moods, and becomes part of the way we express ourselves. AARSIKA brings together distinctive scent compositions and considered design to make every fragrance feel like your own.
              </p>
              <p className="text-sm sm:text-base text-[#6b5f55] font-light leading-relaxed">
                Drawing inspiration from India&apos;s rich olfactory heritage while embracing the precision and elegance of contemporary global perfumery, our creations celebrate individual expression with natural sophistication.
              </p>

              <div className="pt-2">
                <Link
                  href="/our-story"
                  className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.22em] text-[#9D6A26] hover:text-[#32151A] transition-colors border-b border-[#C69A45] pb-1"
                >
                  <span>READ OUR STORY</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          7. THE ART OF FRAGRANCE (Our Ingredients)
      ======================================================== */}
      <section className="py-16 md:py-24 bg-[#FBF6EA] border-t border-[#C69A45]/20">
        <div className="max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.28em] text-[#9D6A26] block mb-2">
              NATURAL RAW MATERIALS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#32151A]">
              The Art of Fragrance
            </h2>
            <p className="text-sm sm:text-base text-[#6b5f55] font-light mt-2">
              Discover the notes that give every scent its character.
            </p>
            <div className="w-12 h-px bg-[#C69A45] mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 sm:gap-6">
            {ingredients.map((ing) => (
              <div
                key={ing.name}
                className="bg-[#F5EFE3] border border-[#C69A45]/25 p-5 flex flex-col justify-between transition-all duration-300 hover:border-[#C69A45] hover:shadow-md group"
              >
                <div>
                  <div className="relative aspect-[4/3] w-full mb-4 overflow-hidden border border-[#C69A45]/20 bg-[#30070D]/5">
                    <Image
                      src={ing.image}
                      alt={ing.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>
                  <span className="text-[10px] font-mono tracking-widest text-[#9D6A26] uppercase block mb-1">
                    {ing.role}
                  </span>
                  <h3 className="font-serif text-xl font-normal text-[#32151A]">
                    {ing.name}
                  </h3>
                  <p className="text-xs text-[#6b5f55] font-light mt-2 leading-relaxed">
                    {ing.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#C69A45]/20">
                  <Link
                    href={`/products/${ing.productSlug}`}
                    className="text-[11px] font-mono uppercase tracking-wider text-[#9D6A26] hover:text-[#32151A] transition-colors block font-medium"
                  >
                    Featured in {ing.featuredIn} →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/ingredients"
              className="text-xs font-mono uppercase tracking-[0.2em] text-[#9D6A26] hover:text-[#32151A] transition-colors"
            >
              EXPLORE ALL BOTANICAL INGREDIENTS →
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================
          8. SHOP BY MOMENT
      ======================================================== */}
      <section className="py-16 md:py-24 bg-[#F5EFE3] border-t border-[#C69A45]/20">
        <div className="max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.28em] text-[#9D6A26] block mb-2">
              OCCASIONS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#32151A]">
              Shop by Moment
            </h2>
            <div className="w-12 h-px bg-[#C69A45] mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 sm:gap-6">
            {moments.map((m) => (
              <Link
                key={m.title}
                href={`/shop?moment=${m.slug}`}
                className="group p-6 sm:p-8 bg-[#FBF6EA] border border-[#C69A45]/25 hover:border-[#C69A45] hover:shadow-md transition-all duration-300 flex flex-col justify-between min-h-[190px]"
              >
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-[#9D6A26] uppercase block mb-1">
                    {m.subtitle}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#32151A] group-hover:text-[#9D6A26] transition-colors">
                    {m.title}
                  </h3>
                  <p className="text-xs text-[#6b5f55] font-light mt-2 leading-relaxed">
                    {m.desc}
                  </p>
                </div>
                <div className="mt-4 text-xs font-mono uppercase tracking-wider text-[#9D6A26] group-hover:translate-x-1 transition-transform">
                  EXPLORE →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          9. OUR PHILOSOPHY — Minimal Brand Statement Strip
      ======================================================== */}
      <section className="py-12 md:py-16 bg-[#30070D] text-[#F5EFE3] border-y border-[#C69A45]/30 relative">
        <div className="max-w-3xl mx-auto px-6 text-center space-y-3 md:space-y-4">
          <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.3em] text-[#C69A45] block">
            OUR PHILOSOPHY
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-normal text-[#F5EFE3] leading-tight tracking-wide">
            Fragrance Is More Than a Scent.
          </h2>
          <p className="font-serif text-base sm:text-lg lg:text-xl text-[#E7CF98] font-light italic max-w-xl mx-auto leading-relaxed">
            It is a feeling, a memory, and a moment of self-expression.
          </p>
        </div>
      </section>

      {/* ========================================================
          10. THE ART OF GIFTING (Gift Sets)
      ======================================================== */}
      <section className="py-16 md:py-24 bg-[#F5EFE3]">
        <div className="max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 md:mb-14 pb-4 border-b border-[#C69A45]/20">
            <div>
              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.28em] text-[#9D6A26] block mb-2">
                LUXURY PRESENTATION BOXES
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#32151A]">
                The Art of Gifting
              </h2>
              <p className="text-sm sm:text-base text-[#6b5f55] font-light mt-2 max-w-xl">
                Curated perfume and attar gift sets in velvet-lined keepsake chests, ready to give.
              </p>
            </div>
            <Link
              href="/collections/gifting"
              className="text-xs font-mono uppercase tracking-[0.2em] text-[#9D6A26] hover:text-[#32151A] transition-colors flex items-center gap-1.5"
            >
              <span>VIEW ALL GIFT SETS</span>
              <span>→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {giftSetProducts.map((prod) => (
              <div
                key={prod.id}
                className="group relative flex flex-col bg-[#FBF6EA] border border-[#C69A45]/20 p-5 hover:border-[#C69A45] hover:shadow-lg transition-all duration-300"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#EADFCB] mb-4">
                  <Link href={`/products/${prod.slug}`} className="block w-full h-full">
                    <ResponsivePhoto
                      slot="gifting"
                      alt={prod.name}
                      aspect="4/5"
                      objectFit="contain"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="w-full h-full"
                    />
                  </Link>
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    {/* Explicit Configuration Display */}
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-[10px] font-mono tracking-widest text-[#9D6A26] uppercase font-medium">
                        {prod.bundleInfo?.bottleCount === 5 ? 'Five Bottles · 5 × 6 ml' :
                         prod.bundleInfo?.bottleSize === '12 ml' ? 'Three Bottles · 3 × 12 ml' :
                         prod.bundleInfo?.bottleSize === '30 ml' ? 'Three Bottles · 3 × 30 ml' :
                         prod.bundleInfo?.displayConfig || 'Luxury Coffret'}
                      </span>
                      {prod.bundleInfo?.totalVolume && (
                        <span className="text-[10px] font-mono text-[#6b5f55]">
                          ({prod.bundleInfo.totalVolume})
                        </span>
                      )}
                    </div>
                    <Link href={`/products/${prod.slug}`} className="block">
                      <h3 className="font-serif text-xl font-normal text-[#32151A] group-hover:text-[#9D6A26] transition-colors">
                        {prod.name}
                      </h3>
                    </Link>
                    {prod.bundleInfo?.includedProducts && (
                      <p className="text-xs text-[#6b5f55] font-light mt-1 line-clamp-1">
                        Includes: {prod.bundleInfo.includedProducts.join(', ')}
                      </p>
                    )}
                  </div>

                  <div className="mt-4 pt-2.5 border-t border-[#C69A45]/20 flex items-center justify-between">
                    <span className="text-sm font-sans font-medium text-[#32151A]">
                      ₹{prod.price.toLocaleString('en-IN')}
                    </span>
                    <PearlButton
                      href={`/products/${prod.slug}`}
                      variant="champagne"
                      size="sm"
                      rightIcon={<ArrowRight className="w-3 h-3 text-[#9D6A26]" />}
                    >
                      DETAILS
                    </PearlButton>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          11. NEWSLETTER — Find Your Signature
      ======================================================== */}
      <section className="py-16 md:py-20 bg-[#FBF6EA] border-t border-[#C69A45]/25">
        <div className="max-w-2xl mx-auto px-6 text-center space-y-4">
          <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.28em] text-[#9D6A26] block">
            JOIN OUR CIRCLE
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#32151A]">
            Find Your Signature
          </h2>
          <p className="text-sm sm:text-base text-[#6b5f55] font-light max-w-md mx-auto">
            Occasional notes on fragrance, new collections, and the art of scent.
          </p>

          <form onSubmit={handleNewsletterSubmit} className="pt-4 flex flex-col sm:flex-row gap-2.5 max-w-md mx-auto items-center">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="w-full sm:flex-1 px-5 py-3.5 bg-[#F5EFE3] border border-[#C69A45]/40 text-[#32151A] text-sm rounded-full focus:outline-none focus:border-[#C69A45] shadow-inner"
            />
            <PearlButton
              type="submit"
              variant="burgundy"
              size="md"
              loading={newsletterStatus === 'loading'}
              className="w-full sm:w-auto"
            >
              SUBSCRIBE
            </PearlButton>
          </form>

          {newsletterStatus === 'success' && (
            <p className="text-xs font-mono text-[#9D6A26] tracking-wider animate-fadeIn pt-2">
              THANK YOU. YOU HAVE BEEN SUBSCRIBED TO THE AARSIKA JOURNAL.
            </p>
          )}

          {/* Trust Guarantees */}
          <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center border-t border-[#C69A45]/20 mt-8">
            <div className="flex flex-col items-center gap-1.5 text-xs text-[#6b5f55]">
              <Truck className="w-4 h-4 text-[#C69A45]" />
              <span>Free Delivery in India</span>
            </div>
            <div className="flex flex-col items-center gap-1.5 text-xs text-[#6b5f55]">
              <ShieldCheck className="w-4 h-4 text-[#C69A45]" />
              <span>Authentic Botanical Oils</span>
            </div>
            <div className="flex flex-col items-center gap-1.5 text-xs text-[#6b5f55]">
              <RefreshCw className="w-4 h-4 text-[#C69A45]" />
              <span>Damaged Transit Guarantee</span>
            </div>
            <div className="flex flex-col items-center gap-1.5 text-xs text-[#6b5f55]">
              <Award className="w-4 h-4 text-[#C69A45]" />
              <span>Small-Batch Craftsmanship</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
