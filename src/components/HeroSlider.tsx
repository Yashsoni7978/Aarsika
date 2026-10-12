'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import PearlButton from './PearlButton';
import ResponsivePhoto from './ResponsivePhoto';

export interface HeroSlideData {
  id: string;
  slot: string;
  eyebrow: string;
  headline: string;
  copy: string;
  ctaText: string;
  ctaLink: string;
  alt: string;
}

// Exactly 5 supported fragrance slides in approved sequence
const HERO_SLIDES: HeroSlideData[] = [
  {
    id: 'amour',
    slot: 'hero-amour',
    eyebrow: 'EAU DE PARFUM · 50 ML · BATCH NO. 01',
    headline: 'AMOUR',
    copy: 'Damask rose and white musk captured in warm golden light.',
    ctaText: 'DISCOVER AMOUR',
    ctaLink: '/products/amour',
    alt: 'Aarsika Amour Eau de Parfum Fine Fragrance Presentation',
  },
  {
    id: 'raat-ki-rani',
    slot: 'hero-raat-ki-rani',
    eyebrow: 'CONCENTRATED ATTAR OIL · 12 ML · ₹499',
    headline: 'RAAT KI RANI',
    copy: 'Night-blooming jasmine steeped in deep, ethereal serenity.',
    ctaText: 'DISCOVER RAAT KI RANI',
    ctaLink: '/products/raat-ki-rani',
    alt: 'Aarsika Raat Ki Rani Pure Attar Oil Presentation',
  },
  {
    id: 'noor',
    slot: 'hero-noor',
    eyebrow: 'EAU DE PARFUM · 50 ML · ₹1,499',
    headline: 'NOOR',
    copy: 'A luminous veil of solar florals, golden amber, and radiant citrus.',
    ctaText: 'DISCOVER NOOR',
    ctaLink: '/products/noor',
    alt: 'Aarsika Noor Eau de Parfum Campaign Presentation',
  },
  {
    id: 'resham-oudh',
    slot: 'hero-resham-oudh',
    eyebrow: 'CONCENTRATED ATTAR OIL · 12 ML · ₹499',
    headline: 'RESHAM OUDH',
    copy: 'Smoky Assam agarwood wrapped in rich, silky warmth.',
    ctaText: 'DISCOVER RESHAM OUDH',
    ctaLink: '/products/resham-oudh',
    alt: 'Aarsika Resham Oudh Concentrated Attar Oil Presentation',
  },
  {
    id: 'atlas',
    slot: 'hero-atlas',
    eyebrow: 'EAU DE PARFUM · 50 ML · BATCH NO. 01',
    headline: 'ATLAS',
    copy: 'A boundless marine horizon of fresh citrus and coastal woods.',
    ctaText: 'DISCOVER ATLAS',
    ctaLink: '/products/atlas',
    alt: 'Aarsika Atlas Eau de Parfum by the Sea',
  },
];

const AUTOPLAY_MS = 6000;

export default function HeroSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Check reduced motion
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = () => setPrefersReducedMotion(mq.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Pause on visibility change
  useEffect(() => {
    const handler = () => {
      if (document.hidden) setIsPaused(true);
    };
    document.addEventListener('visibilitychange', handler);
    return () => document.removeEventListener('visibilitychange', handler);
  }, []);

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  // Autoplay
  useEffect(() => {
    if (isPaused || prefersReducedMotion) return;
    const interval = setInterval(nextSlide, AUTOPLAY_MS);
    return () => clearInterval(interval);
  }, [isPaused, prefersReducedMotion, nextSlide]);

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = () => {
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const diff = touchStartX.current - touchEndX.current;
      if (Math.abs(diff) > 40) {
        if (diff > 0) nextSlide();
        else prevSlide();
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
    setTimeout(() => setIsPaused(false), 5000);
  };

  const activeSlide = HERO_SLIDES[activeIndex];

  return (
    <section
      ref={sliderRef}
      role="region"
      aria-roledescription="carousel"
      aria-label="Aarsika Fragrance Campaigns"
      className="relative w-full bg-[#200408] select-none border-b border-[#C69A45]/30"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* 1. TOP: PURE CAMPAIGN ARTWORK (NO HTML TEXT OVERLAY) */}
      <div className="relative w-full aspect-[4/5] md:aspect-[16/9] max-h-[760px] overflow-hidden bg-[#200408]">
        {HERO_SLIDES.map((slide, idx) => {
          const isActive = idx === activeIndex;
          return (
            <div
              key={slide.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${idx + 1} of ${HERO_SLIDES.length}: ${slide.headline}`}
              aria-hidden={!isActive}
              className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <ResponsivePhoto
                slot={slide.slot}
                alt={slide.alt}
                priority={idx === 0}
                sizes="100vw"
                className="w-full h-full object-[center_38%] md:object-[36%_50%]"
              />
            </div>
          );
        })}

        {/* NAVIGATION ARROWS (ON DESKTOP OVER ARTWORK) */}
        <button
          onClick={prevSlide}
          aria-label="Previous slide"
          className="absolute left-6 top-1/2 -translate-y-1/2 z-20 p-2.5 text-[#F5EFE3]/80 hover:text-[#E7CF98] bg-[#200408]/40 hover:bg-[#200408]/80 backdrop-blur-xs border border-[#C69A45]/30 hover:border-[#C69A45] rounded-full transition-all focus:outline-none hidden sm:flex items-center justify-center min-w-[44px] min-h-[44px]"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={nextSlide}
          aria-label="Next slide"
          className="absolute right-6 top-1/2 -translate-y-1/2 z-20 p-2.5 text-[#F5EFE3]/80 hover:text-[#E7CF98] bg-[#200408]/40 hover:bg-[#200408]/80 backdrop-blur-xs border border-[#C69A45]/30 hover:border-[#C69A45] rounded-full transition-all focus:outline-none hidden sm:flex items-center justify-center min-w-[44px] min-h-[44px]"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* 2. BOTTOM: SEPARATE CONTENT PANEL BELOW THE IMAGE */}
      <div className="relative z-10 bg-[#30070D] border-t border-[#C69A45]/25 py-8 sm:py-10 lg:py-12 px-6 sm:px-10 lg:px-16 text-[#F5EFE3]">
        <div className="max-w-[1360px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6 lg:gap-10">
          {/* Left / Center: Information & Copy */}
          <div className="space-y-2 sm:space-y-3 max-w-2xl">
            {/* Eyebrow & Batch / Price Information */}
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.28em] text-[#C69A45] font-mono font-medium">
              {activeSlide.eyebrow}
            </p>

            {/* Fragrance Name */}
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-[#F5EFE3] leading-none tracking-wide">
              {activeSlide.headline}
            </h1>

            {/* Supporting Copy */}
            <p className="font-sans text-xs sm:text-base text-[#F5EFE3]/85 font-light leading-relaxed">
              {activeSlide.copy}
            </p>
          </div>

          {/* Right: Pearl CTA & Slide Indicators */}
          <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row items-start sm:items-center gap-5 sm:gap-6 flex-shrink-0">
            {/* Pearl Button CTA */}
            <PearlButton
              href={activeSlide.ctaLink}
              variant="champagne"
              size="lg"
              rightIcon={<ArrowRight className="w-4 h-4 text-[#30070D]" />}
            >
              {activeSlide.ctaText}
            </PearlButton>

            {/* Discrete Pagination Indicators */}
            <div className="flex items-center gap-2 pt-1">
              {HERO_SLIDES.map((s, i) => {
                const isCurrent = i === activeIndex;
                return (
                  <button
                    key={s.id}
                    onClick={() => setActiveIndex(i)}
                    aria-label={`Go to slide ${i + 1}: ${s.headline}`}
                    className={`transition-all duration-300 focus:outline-none min-h-[24px] flex items-center ${
                      isCurrent
                        ? 'w-8 sm:w-10 h-[3px] bg-[#C69A45]'
                        : 'w-3.5 sm:w-4 h-[2px] bg-[#F5EFE3]/35 hover:bg-[#F5EFE3]/60'
                    }`}
                  />
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
