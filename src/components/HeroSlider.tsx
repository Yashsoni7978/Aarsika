'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface HeroSlideData {
  id: string;
  eyebrow: string;
  headline: string;
  copy: string;
  ctaText: string;
  ctaLink: string;
  imgSrc: string;
  alt: string;
}

const HERO_SLIDES: HeroSlideData[] = [
  {
    id: 'aarsika-flagship',
    eyebrow: 'SCENTS FOR A MORE MEANINGFUL YOU',
    headline: 'AARSIKA',
    copy: 'Modern Fragrances. Timeless Emotions.',
    ctaText: 'EXPLORE THE COLLECTION',
    ctaLink: '/collections',
    imgSrc: '/photos/hero/royal-rose-attar-at-sunset.webp',
    alt: 'Aarsika Luxury Flagship Fragrance Presentation',
  },
  {
    id: 'amour-edp',
    eyebrow: 'EAU DE PARFUM · 50 ML',
    headline: 'AMOUR',
    copy: 'Damask rose and white musk captured in warm golden light.',
    ctaText: 'DISCOVER AMOUR',
    ctaLink: '/products/amour',
    imgSrc: '/photos/hero/aarsika-amour-golden-rose-still-life.webp',
    alt: 'Aarsika Amour Eau de Parfum Still Life',
  },
  {
    id: 'atlas-edp',
    eyebrow: 'EAU DE PARFUM · 50 ML',
    headline: 'ATLAS',
    copy: 'A boundless marine horizon of fresh citrus and coastal woods.',
    ctaText: 'DISCOVER ATLAS',
    ctaLink: '/products/atlas',
    imgSrc: '/photos/hero/aarsika-atlas-perfume-by-the-sea.webp',
    alt: 'Aarsika Atlas Eau de Parfum by the Sea',
  },
  {
    id: 'maati-attar',
    eyebrow: 'CONCENTRATED ATTAR OIL',
    headline: 'JAIPUR MAATI',
    copy: 'The quiet poetry of baked earth kissed by the first rain.',
    ctaText: 'DISCOVER MAATI',
    ctaLink: '/products/maati',
    imgSrc: '/photos/hero/aarsika-maati-attar-at-golden-hour.webp',
    alt: 'Aarsika Jaipur Maati Attar at Golden Hour',
  },
  {
    id: 'roman-edp',
    eyebrow: 'EAU DE PARFUM · 50 ML',
    headline: 'ROMAN',
    copy: 'A story carved in warm amber, smoky spices, and aged woods.',
    ctaText: 'DISCOVER ROMAN',
    ctaLink: '/products/roman',
    imgSrc: '/photos/hero/aarsika-roman-fragrance-in-golden-light.webp',
    alt: 'Aarsika Roman Fragrance in Golden Light',
  },
  {
    id: 'ittra-collection',
    eyebrow: 'THE DISCOVERY SAMPLER',
    headline: 'ITTRA COLLECTION',
    copy: 'Seven miniature vials. One unforgettable beginning.',
    ctaText: 'EXPLORE TRIAL SET',
    ctaLink: '/discovery-sets',
    imgSrc: '/photos/hero/aarsika-ittra-collection-at-sunset.webp',
    alt: 'Aarsika Ittra Collection Trial Set at Sunset',
  },
];

const AUTOPLAY_MS = 5500;

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
    setTimeout(() => setIsPaused(false), 6000);
  };

  return (
    <section
      ref={sliderRef}
      role="region"
      aria-roledescription="carousel"
      aria-label="Aarsika Fragrance Campaigns"
      className="relative w-full h-[580px] sm:h-[620px] lg:h-[calc(100vh-72px)] lg:max-h-[760px] overflow-hidden bg-[#30070D] select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* SLIDES */}
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
            {/* Background Photographic Image */}
            <div className="absolute inset-0 w-full h-full">
              <Image
                src={slide.imgSrc}
                alt={slide.alt}
                fill
                priority={idx === 0}
                loading={idx === 0 ? 'eager' : 'lazy'}
                sizes="100vw"
                className="object-cover object-[65%_25%] sm:object-center transition-transform duration-[6000ms] ease-out scale-100"
              />
            </div>

            {/* Cinematic Gradient Scrim for Text Readability & Bottle Focus */}
            <div
              className="hidden sm:block absolute inset-0 bg-gradient-to-r from-[#200408]/92 via-[#200408]/65 to-transparent w-full sm:max-w-xl md:max-w-2xl lg:max-w-3xl pointer-events-none"
              aria-hidden="true"
            />
            {/* Mobile bottom-to-top scrim: ensures crystal clear text readability */}
            <div
              className="sm:hidden absolute inset-0 bg-gradient-to-t from-[#200408] via-[#200408]/80 via-55% to-transparent pointer-events-none"
              aria-hidden="true"
            />

            {/* Slide Content Overlay in Negative Space */}
            <div className="relative z-20 h-full max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-16 flex items-end pb-16 sm:pb-0 sm:items-center">
              <div className="max-w-xl space-y-3 sm:space-y-6">
                {/* Eyebrow */}
                <p className="text-[10px] sm:text-xs uppercase tracking-[0.28em] text-[#C69A45] font-sans font-medium">
                  {slide.eyebrow}
                </p>

                {/* Headline */}
                <h1 className="font-serif text-3xl sm:text-5xl lg:text-7xl font-normal text-[#F5EFE3] leading-[1.05] tracking-wide">
                  {slide.headline}
                </h1>

                {/* Supporting Copy */}
                <p className="font-sans text-xs sm:text-base lg:text-lg text-[#F5EFE3]/90 font-light leading-relaxed max-w-md">
                  {slide.copy}
                </p>

                {/* CTA Button */}
                <div className="pt-1 sm:pt-4">
                  <Link
                    href={slide.ctaLink}
                    className="inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 border border-[#C69A45] bg-[#30070D]/90 backdrop-blur-md text-[#F5EFE3] hover:bg-[#C69A45] hover:text-[#30070D] transition-all duration-300 text-xs uppercase tracking-[0.22em] font-sans font-medium shadow-md group"
                  >
                    <span>{slide.ctaText}</span>
                    <span className="text-[#C69A45] group-hover:text-[#30070D] transition-transform duration-200 group-hover:translate-x-1">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* MANUAL NAVIGATION CONTROLS */}
      <button
        onClick={prevSlide}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 text-[#F5EFE3]/70 hover:text-[#E7CF98] bg-[#30070D]/30 backdrop-blur-xs border border-[#C69A45]/20 hover:border-[#C69A45] transition-colors focus:outline-none hidden sm:flex items-center justify-center min-w-[40px] min-h-[40px]"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={nextSlide}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 text-[#F5EFE3]/70 hover:text-[#E7CF98] bg-[#30070D]/30 backdrop-blur-xs border border-[#C69A45]/20 hover:border-[#C69A45] transition-colors focus:outline-none hidden sm:flex items-center justify-center min-w-[40px] min-h-[40px]"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* DISCREET PAGINATION INDICATORS */}
      <div className="absolute bottom-4 sm:bottom-8 left-6 sm:left-10 lg:left-16 z-30 flex items-center gap-2.5">
        {HERO_SLIDES.map((s, i) => {
          const isCurrent = i === activeIndex;
          return (
            <button
              key={s.id}
              onClick={() => setActiveIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`transition-all duration-300 focus:outline-none min-h-[24px] flex items-center ${
                isCurrent ? 'w-10 sm:w-12 h-[2.5px] bg-[#C69A45]' : 'w-4 sm:w-5 h-[1.5px] bg-[#F5EFE3]/40 hover:bg-[#F5EFE3]/70'
              }`}
            />
          );
        })}
      </div>
    </section>
  );
}
