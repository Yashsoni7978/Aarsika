'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PRODUCTS, Product } from '@/data/products';
import { HOME } from '@/content/home.en';
import { BRAND_TAGLINE, BRAND_TAGLINE_SECONDARY } from '@/config/brand';
import { Photo } from '@/components/Photo';
import HeroSlider from '@/components/HeroSlider';

// ===== Helpers =====
function getLowestPrice(products: Product[]): number {
  let lowest = Infinity;
  for (const p of products) {
    for (const v of p.variants) {
      if (v.price < lowest) lowest = v.price;
    }
    if (p.price < lowest) lowest = p.price;
  }
  return lowest === Infinity ? 0 : lowest;
}

function getCategoryLowestPrice(category: string): number {
  const filtered = PRODUCTS.filter((p) => {
    if (category === 'attar') return p.category === 'ATTAR';
    if (category === 'perfume') return p.category === 'EAU DE PARFUM';
    if (category === 'gifting') return p.category === 'GIFTING';
    if (category === 'discovery') return p.category === 'DISCOVERY SETS';
    return false;
  });
  return getLowestPrice(filtered);
}

// Fade-up on scroll animation hook
function useFadeUp() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, className: `transition-all duration-[600ms] ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}` };
}

// Product data
const attarSlugs = ['saanjh', 'shaam-ka-noor', 'raat-ki-rani', 'resham-oudh', 'maati', 'sehar-e-gulab', 'mehfil'];
const perfumeSlugs = ['amour', 'noor', 'atlas', 'roman', 'saira', 'andaaz-e-khaas', 'mehfil-edp'];
const attarProducts = attarSlugs.map((s) => PRODUCTS.find((p) => p.slug === s)).filter(Boolean) as Product[];
const perfumeProducts = perfumeSlugs.map((s) => PRODUCTS.find((p) => p.slug === s)).filter(Boolean) as Product[];
const discoveryProduct = PRODUCTS.find((p) => p.slug === 'discovery-set-attar');
const discoveryPrice = discoveryProduct?.price ?? HOME.announcement.discoveryFallbackPrice;
const firstBatchProduct = PRODUCTS.find((p) => p.variants?.[0]?.batchSize);
const batchSize = firstBatchProduct?.variants?.[0]?.batchSize ?? 69;
const hasBatchData = !!firstBatchProduct;

// Jali lattice SVG for Block 5
const jaliSvg = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cpath d='M30 0L60 30L30 60L0 30Z' fill='none' stroke='%23E7CF98' stroke-width='0.5' opacity='0.08'/%3E%3Ccircle cx='30' cy='30' r='8' fill='none' stroke='%23E7CF98' stroke-width='0.3' opacity='0.06'/%3E%3C/svg%3E")`;

export default function HomePage() {
  // Block 12: WhatsApp signup state
  const [phone, setPhone] = useState('');
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleWhatsAppSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('loading');
    try {
      const res = await fetch('/api/whatsapp-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone }),
      });
      if (res.ok) {
        setSubmitStatus('success');
        setPhone('');
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    }
  };

  // Scroll refs
  const attarScrollRef = useRef<HTMLDivElement>(null);
  const perfumeScrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollBy({ left: -300, behavior: 'smooth' });
  };
  const scrollRight = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollBy({ left: 300, behavior: 'smooth' });
  };

  // Fade-up refs for each block
  const b4 = useFadeUp();
  const b5 = useFadeUp();
  const b6 = useFadeUp();
  const b7 = useFadeUp();
  const b8 = useFadeUp();
  const b9 = useFadeUp();
  const b10 = useFadeUp();
  const b11 = useFadeUp();
  const b12 = useFadeUp();

  return (
    <div className="bg-[#F6EFE2] text-[#1a1411] font-sans overflow-x-hidden">
      {/* ============================================
          BLOCK 3: HERO SLIDER
      ============================================ */}
      <HeroSlider />

      {/* ============================================
          BLOCK 4: SHOP BY TYPE (ivory)
      ============================================ */}
      <section ref={b4.ref} className={`py-16 md:py-28 px-5 md:px-12 max-w-[1280px] mx-auto ${b4.className}`}>
        <h2 className="font-serif text-[clamp(34px,5vw,64px)] text-[#1a1411] mb-8">
          {HOME.shopByType.heading}
        </h2>
        <div className="border-t border-[#dccfb6]">
          {HOME.shopByType.rows.map((row) => {
            const price = getCategoryLowestPrice(row.from);
            return (
              <Link
                key={row.name}
                href={row.href}
                className="group flex items-center justify-between h-[88px] border-b border-[#dccfb6] px-0"
              >
                <span className="font-serif text-[clamp(30px,4vw,56px)] text-[#1a1411] group-hover:text-[#C9A55C] group-hover:translate-x-2 transition-all duration-300">
                  {row.name}
                </span>
                <span className="flex items-center gap-3">
                  {price > 0 && (
                    <span className="text-sm font-sans text-[#6b5f55]">
                      from ₹{price.toLocaleString('en-IN')}
                    </span>
                  )}
                  <span className="text-[#6b5f55] group-hover:text-[#C9A55C] transition-colors">→</span>
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ============================================
          BLOCK 5: THE ATTARS (burgundy-900)
      ============================================ */}
      <section
        ref={b5.ref}
        className={`py-16 md:py-28 bg-[#3b0a12] text-[#F6EFE2] relative overflow-hidden ${b5.className}`}
        style={{ backgroundImage: jaliSvg, backgroundRepeat: 'repeat' }}
      >
        <div className="px-5 md:px-12 max-w-[1280px] mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div className="space-y-2">
              <h2 className="font-serif text-[clamp(34px,5vw,64px)] text-[#F6EFE2]">
                {HOME.attars.heading}
              </h2>
              <p className="text-base font-sans font-light text-[#F6EFE2]/70 max-w-[60ch]">
                {HOME.attars.line}
              </p>
            </div>
            <Link href={HOME.attars.linkHref} className="text-link-underline text-[#E7CF98] shrink-0">
              {HOME.attars.linkText} →
            </Link>
          </div>

          {/* Horizontal scroll row */}
          <div
            ref={attarScrollRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 -mx-5 px-5 md:mx-0 md:px-0"
            style={{ scrollbarWidth: 'none' }}
          >
            {attarProducts.map((prod) => {
              const lowest = prod.variants.reduce((min, v) => (v.price < min.price ? v : min), prod.variants[0]);
              return (
                <Link
                  key={prod.id}
                  href={`/products/${prod.slug}`}
                  className="snap-start shrink-0 w-[72vw] md:w-[calc(25%-18px)] group"
                >
                  <div className="relative aspect-[4/5] bg-[#4a0b17] overflow-hidden mb-3">
                    {prod.mainImage && prod.mainImage !== 'placeholder' ? (
                      <Image
                        src={prod.mainImage}
                        alt={prod.name}
                        fill
                        sizes="(max-width: 768px) 72vw, 25vw"
                        loading="lazy"
                        className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#4a0b17] flex items-end p-3">
                        <span className="font-mono text-[10px] text-[#EADFCB]/60">{prod.slug}</span>
                      </div>
                    )}
                  </div>
                  <h3 className="font-serif text-xl text-[#E7CF98] group-hover:text-[#FFF9F1] transition-colors">
                    {prod.name}
                  </h3>
                  {prod.accent && (
                    <div className="h-[2px] w-12 mt-1 mb-1.5" style={{ backgroundColor: prod.accent }} />
                  )}
                  {prod.tagline && (
                    <p className="text-xs font-sans text-[#F6EFE2]/70 mb-1 line-clamp-1">{prod.tagline}</p>
                  )}
                  <p className="text-sm font-sans text-[#E7CF98]">
                    From ₹{lowest.price.toLocaleString('en-IN')}
                  </p>
                </Link>
              );
            })}
          </div>

          {/* Desktop scroll controls */}
          <div className="hidden md:flex items-center gap-4 mt-6 text-[#E7CF98]">
            <button onClick={() => scrollLeft(attarScrollRef)} aria-label="Scroll attars left" className="font-mono text-base hover:text-[#FFF9F1] min-w-[44px] min-h-[44px] flex items-center justify-center">←</button>
            <button onClick={() => scrollRight(attarScrollRef)} aria-label="Scroll attars right" className="font-mono text-base hover:text-[#FFF9F1] min-w-[44px] min-h-[44px] flex items-center justify-center">→</button>
          </div>
        </div>
      </section>

      {/* ============================================
          BLOCK 6: THE PERFUMES (ivory)
      ============================================ */}
      <section ref={b6.ref} className={`py-16 md:py-28 px-5 md:px-12 max-w-[1280px] mx-auto ${b6.className}`}>
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div className="space-y-2">
            <h2 className="font-serif text-[clamp(34px,5vw,64px)] text-[#1a1411]">
              {HOME.perfumes.heading}
            </h2>
            <p className="text-base font-sans font-light text-[#6b5f55] max-w-[60ch]">
              {HOME.perfumes.line}
            </p>
          </div>
          <Link href={HOME.perfumes.linkHref} className="text-link-underline text-[#1a1411] shrink-0">
            {HOME.perfumes.linkText} →
          </Link>
        </div>

        {/* Phone: horizontal scroll */}
        <div
          ref={perfumeScrollRef}
          className="md:hidden flex gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 -mx-5 px-5"
          style={{ scrollbarWidth: 'none' }}
        >
          {perfumeProducts.map((prod) => (
            <PerfumeCard key={prod.id} product={prod} />
          ))}
        </div>

        {/* Desktop: 4-column grid */}
        <div className="hidden md:grid grid-cols-4 gap-x-8 gap-y-14">
          {perfumeProducts.map((prod) => (
            <PerfumeCard key={prod.id} product={prod} />
          ))}
          {/* 8th cell: link */}
          <Link
            href="/perfumes"
            className="flex items-center justify-center aspect-[4/5] bg-[#EADFCB] group"
          >
            <span className="font-serif text-2xl text-[#1a1411] group-hover:text-[#C9A55C] transition-colors">
              All perfumes →
            </span>
          </Link>
        </div>
      </section>

      {/* ============================================
          BLOCK 7: DISCOVERY SET (sand)
      ============================================ */}
      <section ref={b7.ref} className={`py-16 md:py-28 bg-[#EADFCB] ${b7.className}`}>
        <div className="px-5 md:px-12 max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-5">
            <h2 className="font-serif text-[clamp(34px,5vw,64px)] text-[#1a1411]">
              {HOME.discovery.heading}
            </h2>
            <p className="font-serif text-[clamp(28px,3.5vw,48px)] text-[#1a1411]">
              ₹{discoveryPrice.toLocaleString('en-IN')}
            </p>
            <p className="text-base font-sans font-light text-[#4a3f35] leading-relaxed max-w-[60ch]">
              {HOME.discovery.copy}
            </p>
            <Link
              href={HOME.discovery.buttonHref}
              className="inline-flex items-center justify-center h-[52px] px-8 bg-[#C9A55C] text-[#1a1411] text-xs uppercase tracking-[0.16em] font-medium font-sans hover:bg-[#E7CF98] transition-colors rounded-none"
            >
              {HOME.discovery.buttonText}
            </Link>
          </div>
          <div>
            <Photo
              slot="discovery-set"
              alt="Aarsika Discovery Set"
              aspect="4/3"
              shape="rect"
              sizes="(max-width: 1024px) 100vw, 550px"
              className="w-full"
            />
          </div>
        </div>
      </section>

      {/* ============================================
          BLOCK 8: SHOP BY MOMENT (ivory)
      ============================================ */}
      <section ref={b8.ref} className={`py-16 md:py-28 px-5 md:px-12 max-w-[1280px] mx-auto ${b8.className}`}>
        <h2 className="font-serif text-[clamp(34px,5vw,64px)] text-[#1a1411] mb-8">
          {HOME.shopByMoment.heading}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
          {HOME.shopByMoment.items.map((item) => (
            <Link
              key={item.slug}
              href={`/shop?moment=${item.slug}`}
              className="group border-t border-[#dccfb6] py-6 md:py-8 pr-4"
            >
              <span className="font-serif text-[clamp(24px,3vw,40px)] text-[#1a1411] group-hover:text-[#C9A55C] transition-colors block mb-1">
                {item.word}
              </span>
              <span className="text-sm font-sans text-[#6b5f55] font-light">
                {item.line}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ============================================
          BLOCK 9: NUMBERED BATCHES (burgundy-950)
      ============================================ */}
      {hasBatchData && (
        <section ref={b9.ref} className={`py-16 md:py-28 bg-[#26060d] text-[#F6EFE2] ${b9.className}`}>
          <div className="px-5 md:px-12 max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4 flex justify-center lg:justify-start">
              <span className="font-serif text-[clamp(120px,15vw,240px)] text-[#E7CF98] leading-none">
                {batchSize}
              </span>
            </div>
            <div className="lg:col-span-8 space-y-4">
              <h2 className="font-serif text-[clamp(34px,5vw,64px)] text-[#F6EFE2]">
                {HOME.batches.heading}
              </h2>
              <p className="text-base font-sans font-light text-[#F6EFE2]/70 max-w-[60ch] leading-relaxed">
                {HOME.batches.copy}
              </p>
              <Link href={HOME.batches.linkHref} className="text-link-underline text-[#E7CF98]">
                {HOME.batches.linkText} →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ============================================
          BLOCK 10: THE HOUSE (ivory, asymmetric)
      ============================================ */}
      <section ref={b10.ref} className={`py-16 md:py-28 px-5 md:px-12 max-w-[1280px] mx-auto ${b10.className}`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 flex justify-center">
            <Photo
              slot="house"
              alt="Aarsika fragrance house"
              aspect="3/4"
              shape="arch"
              className="w-full max-w-lg"
            />
          </div>
          <div className="lg:col-span-5 space-y-5 lg:pt-16">
            <h2 className="font-serif text-[clamp(34px,5vw,64px)] text-[#1a1411] leading-tight">
              {HOME.house.heading}
            </h2>
            <p className="text-base font-sans font-light text-[#4a3f35] leading-relaxed max-w-[60ch]">
              {HOME.house.copy}
            </p>
            <p className="text-sm font-sans font-light text-[#6b5f55] italic">
              {BRAND_TAGLINE}
            </p>
            <Link href={HOME.house.linkHref} className="text-link-underline text-[#1a1411]">
              {HOME.house.linkText} →
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================
          BLOCK 11: GIFTING (cream)
      ============================================ */}
      <section ref={b11.ref} className={`py-16 md:py-28 bg-[#FBF6EA] ${b11.className}`}>
        <div className="px-5 md:px-12 max-w-[1280px] mx-auto space-y-6">
          <h2 className="font-serif text-[clamp(34px,5vw,64px)] text-[#1a1411]">
            {HOME.gifting.heading}
          </h2>
          <p className="font-serif italic text-[clamp(20px,2.5vw,32px)] text-[#6b5f55]">
            {BRAND_TAGLINE_SECONDARY}
          </p>
          <p className="text-base font-sans font-light text-[#4a3f35] max-w-[60ch]">
            {HOME.gifting.copy}
          </p>
          <Link href={HOME.gifting.linkHref} className="text-link-underline text-[#1a1411]">
            {HOME.gifting.linkText} →
          </Link>
        </div>
        <div className="mt-8">
          <Photo
            slot="gifting"
            alt="Aarsika gift sets"
            aspect="16/9"
            shape="rect"
            sizes="100vw"
            className="w-full"
          />
        </div>
      </section>

      {/* ============================================
          BLOCK 12: TRUST & WHATSAPP (ivory)
      ============================================ */}
      <section ref={b12.ref} className={`py-16 md:py-28 px-5 md:px-12 max-w-[1280px] mx-auto ${b12.className}`}>
        {/* Trust line */}
        <p className="text-sm font-sans text-[#6b5f55] text-center mb-12 max-w-3xl mx-auto leading-relaxed">
          {HOME.trust.line}
        </p>

        {/* WhatsApp signup */}
        <div className="max-w-lg mx-auto text-center space-y-4">
          <h2 className="font-serif text-[clamp(34px,5vw,64px)] text-[#1a1411]">
            {HOME.trust.heading}
          </h2>
          <p className="text-base font-sans font-light text-[#6b5f55]">
            {HOME.trust.copy}
          </p>
          <form onSubmit={handleWhatsAppSubmit} className="flex gap-0 mt-4">
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 98765 43210"
              className="flex-1 h-[52px] px-4 bg-white border border-[#dccfb6] text-[#1a1411] font-sans text-sm focus:outline-none focus:border-[#C9A55C] rounded-none"
              aria-label="Phone number"
              required
            />
            <button
              type="submit"
              disabled={submitStatus === 'loading'}
              className="h-[52px] px-8 bg-[#C9A55C] text-[#1a1411] text-xs uppercase tracking-[0.16em] font-medium font-sans hover:bg-[#E7CF98] transition-colors rounded-none disabled:opacity-50"
            >
              {HOME.trust.buttonText}
            </button>
          </form>
          {submitStatus === 'success' && (
            <p className="text-sm text-[#C9A55C] font-sans">{HOME.trust.successText}</p>
          )}
          {submitStatus === 'error' && (
            <p className="text-sm text-[#8b1a2b] font-sans">{HOME.trust.errorText}</p>
          )}
        </div>
      </section>

      {/* Bottom padding for sticky phone bar */}
      <div className="h-20 md:hidden" />
    </div>
  );
}

// ===== Perfume Card Component =====
function PerfumeCard({ product }: { product: Product }) {
  const hasBatch = product.variants?.[0]?.batchSize !== undefined;
  return (
    <Link
      href={`/products/${product.slug}`}
      className="snap-start shrink-0 w-[64vw] md:w-auto group"
    >
      <div className="relative aspect-[4/5] bg-[#EADFCB] overflow-hidden mb-3">
        {product.mainImage && product.mainImage !== 'placeholder' ? (
          <Image
            src={product.mainImage}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 64vw, 25vw"
            loading="lazy"
            className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-[#EADFCB] flex items-end p-3">
            <span className="font-mono text-[10px] text-[#6b5f55]/60">{product.slug}</span>
          </div>
        )}
      </div>
      <h3 className="font-serif text-xl text-[#1a1411] group-hover:text-[#C9A55C] transition-colors">
        {product.name}
      </h3>
      <p className="text-xs font-sans text-[#6b5f55] mt-0.5">
        Eau de Parfum · {product.defaultSize || '50 ml'}
      </p>
      <p className="text-sm font-sans text-[#1a1411] mt-1">
        ₹{product.price.toLocaleString('en-IN')}
      </p>
      <p className="text-[10px] font-sans text-[#6b5f55] mt-0.5">{HOME.hero.moreAbout}</p>
      <div className="h-px bg-[#dccfb6] mt-3" />
      {hasBatch && (
        <p className="text-[10px] font-sans text-[#6b5f55] mt-2">Limited batch</p>
      )}
    </Link>
  );
}
