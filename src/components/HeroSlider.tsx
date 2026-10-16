/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { HERO_SLIDES, HeroSlide } from '@/data/heroSlides';

const AUTOPLAY_MS = 6500;

export default function HeroSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Check reduced motion preference
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = () => setPrefersReducedMotion(mq.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Pause when document is not visible
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

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!sliderRef.current?.contains(document.activeElement)) return;
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Autoplay
  useEffect(() => {
    if (isPaused || prefersReducedMotion) return;
    const interval = setInterval(nextSlide, AUTOPLAY_MS);
    return () => clearInterval(interval);
  }, [isPaused, prefersReducedMotion, nextSlide]);

  // Touch handlers for mobile swipe
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

  const activeSlide: HeroSlide = HERO_SLIDES[activeIndex];

  return (
    <section
      ref={sliderRef}
      role="region"
      aria-roledescription="carousel"
      aria-label="Aarsika Fragrance Campaigns"
      tabIndex={0}
      className="relative w-full overflow-hidden select-none bg-[#200408] focus:outline-none focus:ring-1 focus:ring-[#C69A45]/50 border-b border-[#C69A45]/25"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* ========================================================
          1. DESKTOP VIEWPORT (lg:block hidden — >= 1024px):
          Full 16:9 widescreen campaign image with left negative-space text overlay
          (Preserves the existing desktop artwork and layout 100%)
      ======================================================== */}
      <div className="hidden lg:block relative w-full aspect-[16/9] min-h-[620px] xl:min-h-[720px] max-h-[820px] bg-[#200408]">
        {/* Desktop Image Crossfade Stack */}
        {HERO_SLIDES.map((slide, idx) => {
          const isActive = idx === activeIndex;
          const isPriority = idx === 0;

          return (
            <div
              key={slide.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${slide.slideNumber} of ${HERO_SLIDES.length}: ${slide.headline}`}
              aria-hidden={!isActive}
              className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <picture className="w-full h-full block">
                <source srcSet={slide.desktopImage} type="image/webp" />
                <img
                  src={slide.desktopImage}
                  alt={slide.alt}
                  width={1672}
                  height={941}
                  decoding="async"
                  loading={isPriority ? 'eager' : 'lazy'}
                  // @ts-expect-error fetchpriority attribute is standard in HTML5
                  fetchpriority={isPriority ? 'high' : 'auto'}
                  className="w-full h-full object-cover object-center"
                />
              </picture>
            </div>
          );
        })}

        {/* Directional Luxury Scrim in Left Negative Space (keeps bottle vibrant) */}
        <div
          aria-hidden="true"
          className="absolute inset-y-0 left-0 w-full max-w-2xl xl:max-w-3xl bg-gradient-to-r from-[#200408]/85 via-[#200408]/45 to-transparent z-15 pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#200408]/75 to-transparent z-15 pointer-events-none"
        />

        {/* Editorial Text Overlay in Negative Space */}
        <div className="absolute inset-0 z-20 flex items-center">
          <div className="max-w-[1360px] mx-auto px-10 xl:px-16 w-full">
            <div
              key={activeSlide.id}
              className="max-w-md lg:max-w-lg xl:max-w-xl py-12 space-y-4 lg:space-y-5 animate-hero-fade-in"
            >
              {/* Eyebrow Label with Arabian Gold Motif */}
              <div className="flex items-center gap-3">
                <span className="h-[1px] w-6 lg:w-10 bg-gradient-to-r from-transparent to-[#C69A45]/80" />
                <span className="text-[11px] lg:text-xs uppercase tracking-[0.26em] text-[#E5C378] font-serif font-medium">
                  {activeSlide.eyebrow}
                </span>
                <span className="h-[1px] w-6 lg:w-10 bg-gradient-to-l from-transparent to-[#C69A45]/80" />
                <span className="text-[#C69A45] text-xs leading-none select-none">❖</span>
              </div>

              {/* Editorial Headline in Cormorant Garamond */}
              <h1 className="font-serif text-4xl lg:text-6xl xl:text-[68px] font-normal text-[#F5EFE3] leading-[1.08] tracking-tight drop-shadow-sm">
                {activeSlide.headline}{' '}
                {activeSlide.headlineAccent && (
                  <span className="italic font-serif text-[#F8F4EC] font-light">
                    {activeSlide.headlineAccent}
                  </span>
                )}
                {activeSlide.headlineAfterAccent ? ` ${activeSlide.headlineAfterAccent}` : ''}
              </h1>

              {/* Supporting Copy */}
              <p className="font-sans text-sm lg:text-base text-[#F5EFE3]/90 font-light leading-relaxed max-w-lg">
                {activeSlide.description}
              </p>

              {/* Pearl Button CTA */}
              <div className="pt-2 lg:pt-3">
                <Link
                  href={activeSlide.ctaLink}
                  aria-label={`${activeSlide.ctaText} - ${activeSlide.productName}`}
                  className="group inline-flex items-center gap-3.5 px-6 py-3 rounded-full bg-gradient-to-r from-[#D8B467] via-[#E2C785] to-[#C9A24D] text-[#200408] font-sans font-semibold text-xs lg:text-sm uppercase tracking-[0.16em] shadow-[0_4px_22px_rgba(198,154,69,0.38)] hover:shadow-[0_6px_28px_rgba(198,154,69,0.58)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#C69A45]"
                >
                  <span className="w-6 h-6 lg:w-7 lg:h-7 rounded-full bg-[#200408] border border-[#C69A45]/40 flex items-center justify-center text-[#E5C378] shrink-0 transition-transform duration-300 group-hover:rotate-45">
                    <svg
                      className="w-3.5 h-3.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path
                        d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z"
                        fill="currentColor"
                        fillOpacity="0.4"
                      />
                      <circle cx="12" cy="12" r="2.5" fill="currentColor" />
                    </svg>
                  </span>
                  <span>{activeSlide.ctaText}</span>
                  <ChevronRight className="w-4 h-4 text-[#200408] transition-transform duration-300 group-hover:translate-x-1 shrink-0" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Circular Navigation Chevrons */}
        <button
          onClick={prevSlide}
          aria-label="Previous slide"
          className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 lg:w-12 lg:h-12 rounded-full bg-[#200408]/50 hover:bg-[#200408]/85 text-[#F5EFE3]/80 hover:text-[#E7CF98] border border-[#C69A45]/35 hover:border-[#C69A45] backdrop-blur-md flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#C69A45]"
        >
          <ChevronLeft className="w-5 h-5 lg:w-6 lg:h-6" />
        </button>

        <button
          onClick={nextSlide}
          aria-label="Next slide"
          className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 lg:w-12 lg:h-12 rounded-full bg-[#200408]/50 hover:bg-[#200408]/85 text-[#F5EFE3]/80 hover:text-[#E7CF98] border border-[#C69A45]/35 hover:border-[#C69A45] backdrop-blur-md flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#C69A45]"
        >
          <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6" />
        </button>

        {/* Discrete Pagination Bars & Slide Counter */}
        <div className="absolute bottom-6 left-8 lg:left-16 z-30 flex items-center gap-2">
          {HERO_SLIDES.map((slide, idx) => {
            const isCurrent = idx === activeIndex;
            return (
              <button
                key={slide.id}
                onClick={() => setActiveIndex(idx)}
                aria-label={`Go to slide ${slide.slideNumber}: ${slide.headline}`}
                aria-current={isCurrent ? 'true' : undefined}
                className={`h-[3px] rounded-full transition-all duration-300 focus:outline-none ${
                  isCurrent
                    ? 'w-8 lg:w-10 bg-[#C69A45]'
                    : 'w-3 bg-[#F5EFE3]/35 hover:bg-[#F5EFE3]/70'
                }`}
              />
            );
          })}
          <span className="text-xs font-mono text-[#F5EFE3]/60 ml-2 tracking-widest select-none">
            {String(activeIndex + 1).padStart(2, '0')} / {String(HERO_SLIDES.length).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* ========================================================
          2. TABLET VIEWPORT (hidden md:block lg:hidden — 768px to 1023px):
          Refined two-column composition with portrait artwork & editorial text
          (Tested on 768 × 1024, 820 × 1180 tablet dimensions)
      ======================================================== */}
      <div className="hidden md:block lg:hidden relative w-full bg-[#200408] py-8 sm:py-10 px-6 sm:px-10">
        <div className="max-w-[960px] mx-auto grid grid-cols-12 gap-6 sm:gap-8 items-center min-h-[500px]">
          {/* Left Column (6 cols): Editorial Copy & Pearl CTA */}
          <div
            key={activeSlide.id}
            className="col-span-6 space-y-4 animate-hero-fade-in pr-2"
          >
            {/* Eyebrow with gold motif */}
            <div className="flex items-center gap-2.5">
              <span className="h-[1px] w-6 bg-gradient-to-r from-transparent to-[#C69A45]/80" />
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-[#E5C378] font-serif font-medium">
                {activeSlide.eyebrow}
              </span>
              <span className="h-[1px] w-6 bg-gradient-to-l from-transparent to-[#C69A45]/80" />
              <span className="text-[#C69A45] text-xs">❖</span>
            </div>

            {/* Headline */}
            <h1 className="font-serif text-3xl sm:text-4xl md:text-[38px] font-normal text-[#F5EFE3] leading-[1.12] tracking-tight">
              {activeSlide.headline}{' '}
              {activeSlide.headlineAccent && (
                <span className="italic font-serif text-[#F8F4EC] font-light">
                  {activeSlide.headlineAccent}
                </span>
              )}
              {activeSlide.headlineAfterAccent ? ` ${activeSlide.headlineAfterAccent}` : ''}
            </h1>

            {/* Description */}
            <p className="font-sans text-xs sm:text-sm text-[#F5EFE3]/85 font-light leading-relaxed max-w-sm">
              {activeSlide.description}
            </p>

            {/* Pearl Button CTA */}
            <div className="pt-2">
              <Link
                href={activeSlide.ctaLink}
                aria-label={`${activeSlide.ctaText} - ${activeSlide.productName}`}
                className="group inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#D8B467] via-[#E2C785] to-[#C9A24D] text-[#200408] font-sans font-semibold text-xs uppercase tracking-[0.16em] shadow-[0_4px_20px_rgba(198,154,69,0.38)] hover:shadow-[0_6px_25px_rgba(198,154,69,0.55)] hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <span className="w-6 h-6 rounded-full bg-[#200408] border border-[#C69A45]/40 flex items-center justify-center text-[#E5C378] shrink-0">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z" fill="currentColor" fillOpacity="0.4" />
                    <circle cx="12" cy="12" r="2.5" fill="currentColor" />
                  </svg>
                </span>
                <span>{activeSlide.ctaText}</span>
                <ChevronRight className="w-4 h-4 text-[#200408] transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Discrete Pagination Bars & Counter */}
            <div className="flex items-center gap-2 pt-3">
              {HERO_SLIDES.map((slide, idx) => {
                const isCurrent = idx === activeIndex;
                return (
                  <button
                    key={slide.id}
                    onClick={() => setActiveIndex(idx)}
                    aria-label={`Go to slide ${slide.slideNumber}`}
                    className={`h-[3px] rounded-full transition-all duration-300 focus:outline-none ${
                      isCurrent ? 'w-8 bg-[#C69A45]' : 'w-2.5 bg-[#F5EFE3]/35 hover:bg-[#F5EFE3]/70'
                    }`}
                  />
                );
              })}
              <span className="text-[11px] font-mono text-[#F5EFE3]/60 ml-2 tracking-widest">
                {String(activeIndex + 1).padStart(2, '0')} / {String(HERO_SLIDES.length).padStart(2, '0')}
              </span>
            </div>
          </div>

          {/* Right Column (6 cols): Supplied Portrait Artwork Stack */}
          <div className="col-span-6 relative aspect-[4/5] max-h-[460px] rounded-xl overflow-hidden border border-[#C69A45]/25 shadow-2xl bg-[#1a0407]">
            {HERO_SLIDES.map((slide, idx) => {
              const isActive = idx === activeIndex;
              const isPriority = idx === 0;

              return (
                <div
                  key={slide.id}
                  className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
                    isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                  }`}
                >
                  <picture className="w-full h-full block">
                    <source srcSet={slide.tabletImage} type="image/webp" />
                    <img
                      src={slide.tabletImage}
                      alt={slide.alt}
                      width={1080}
                      height={1350}
                      decoding="async"
                      loading={isPriority ? 'eager' : 'lazy'}
                      // @ts-expect-error fetchpriority attribute is standard in HTML5
                      fetchpriority={isPriority ? 'high' : 'auto'}
                      className="w-full h-full object-cover object-center"
                    />
                  </picture>
                </div>
              );
            })}

            {/* Chevrons on Tablet Portrait Artwork */}
            <button
              onClick={prevSlide}
              aria-label="Previous slide"
              className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-[#200408]/60 text-[#F5EFE3] hover:text-[#E7CF98] border border-[#C69A45]/30 flex items-center justify-center transition-all focus:outline-none"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next slide"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-[#200408]/60 text-[#F5EFE3] hover:text-[#E7CF98] border border-[#C69A45]/30 flex items-center justify-center transition-all focus:outline-none"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================
          3. MOBILE VIEWPORT (md:hidden block — < 768px):
          Pristine portrait campaign artwork on top (bottle 100% visible, un-obscured)
          + Luxury editorial content panel and Pearl CTA directly below
          (Optimized for 375 × 812 and 390 × 844 viewports without vertical overflow)
      ======================================================== */}
      <div className="md:hidden flex flex-col w-full bg-[#200408]">
        {/* 1. Mobile Campaign Image Viewport */}
        <div className="relative w-full aspect-[16/11] min-h-[270px] max-h-[340px] overflow-hidden bg-[#200408]">
          {HERO_SLIDES.map((slide, idx) => {
            const isActive = idx === activeIndex;
            const isPriority = idx === 0;

            return (
              <div
                key={slide.id}
                role="group"
                aria-roledescription="slide"
                aria-label={`${slide.slideNumber} of ${HERO_SLIDES.length}: ${slide.headline}`}
                aria-hidden={!isActive}
                className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
                  isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                }`}
              >
                <picture className="w-full h-full block">
                  <source srcSet={slide.mobileImage} type="image/webp" />
                  <img
                    src={slide.mobileImage}
                    alt={slide.alt}
                    width={800}
                    height={1000}
                    decoding="async"
                    loading={isPriority ? 'eager' : 'lazy'}
                    // @ts-expect-error fetchpriority attribute is standard in HTML5
                    fetchpriority={isPriority ? 'high' : 'auto'}
                    className="w-full h-full object-cover object-center"
                  />
                </picture>
              </div>
            );
          })}

          {/* Subtle bottom shadow on mobile image */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-[#200408] to-transparent z-15 pointer-events-none"
          />

          {/* Compact Mobile Navigation Chevrons */}
          <button
            onClick={prevSlide}
            aria-label="Previous slide"
            className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-[#200408]/60 text-[#F5EFE3] border border-[#C69A45]/30 flex items-center justify-center transition-all focus:outline-none"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={nextSlide}
            aria-label="Next slide"
            className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-[#200408]/60 text-[#F5EFE3] border border-[#C69A45]/30 flex items-center justify-center transition-all focus:outline-none"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Slide Indicator Overlay on Mobile Image */}
          <div className="absolute bottom-2 inset-x-0 z-20 flex items-center justify-center gap-1.5">
            {HERO_SLIDES.map((slide, idx) => {
              const isCurrent = idx === activeIndex;
              return (
                <button
                  key={slide.id}
                  onClick={() => setActiveIndex(idx)}
                  aria-label={`Go to slide ${slide.slideNumber}`}
                  className={`h-[2.5px] rounded-full transition-all duration-300 focus:outline-none ${
                    isCurrent ? 'w-6 bg-[#C69A45]' : 'w-2 bg-[#F5EFE3]/40'
                  }`}
                />
              );
            })}
          </div>
        </div>

        {/* 2. Mobile Editorial Content & Pearl Button Panel (100% clear of product) */}
        <div
          key={activeSlide.id}
          className="px-5 pt-4 pb-6 bg-[#200408] text-center flex flex-col items-center space-y-2.5 animate-hero-fade-in"
        >
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-2">
            <span className="h-[1px] w-4 bg-[#C69A45]/70" />
            <span className="text-[10px] uppercase tracking-[0.24em] text-[#E5C378] font-serif font-medium">
              {activeSlide.eyebrow}
            </span>
            <span className="h-[1px] w-4 bg-[#C69A45]/70" />
            <span className="text-[#C69A45] text-[10px]">❖</span>
          </div>

          {/* Headline */}
          <h1 className="font-serif text-2xl sm:text-3xl font-normal text-[#F5EFE3] leading-snug px-2">
            {activeSlide.headline}{' '}
            {activeSlide.headlineAccent && (
              <span className="italic font-serif text-[#F8F4EC] font-light">
                {activeSlide.headlineAccent}
              </span>
            )}
            {activeSlide.headlineAfterAccent ? ` ${activeSlide.headlineAfterAccent}` : ''}
          </h1>

          {/* Description */}
          <p className="font-sans text-xs text-[#F5EFE3]/85 font-light leading-relaxed max-w-sm px-2">
            {activeSlide.description}
          </p>

          {/* Pearl Button CTA */}
          <div className="pt-1.5 w-full flex justify-center">
            <Link
              href={activeSlide.ctaLink}
              aria-label={`${activeSlide.ctaText} - ${activeSlide.productName}`}
              className="group inline-flex items-center justify-center gap-3 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#D8B467] via-[#E2C785] to-[#C9A24D] text-[#200408] font-sans font-semibold text-xs uppercase tracking-[0.16em] shadow-[0_4px_16px_rgba(198,154,69,0.35)] active:scale-[0.98] transition-all"
            >
              <span className="w-5 h-5 rounded-full bg-[#200408] border border-[#C69A45]/40 flex items-center justify-center text-[#E5C378] shrink-0">
                <svg
                  className="w-3 h-3"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z"
                    fill="currentColor"
                    fillOpacity="0.4"
                  />
                  <circle cx="12" cy="12" r="2" fill="currentColor" />
                </svg>
              </span>
              <span>{activeSlide.ctaText}</span>
              <ChevronRight className="w-3.5 h-3.5 text-[#200408]" />
            </Link>
          </div>

          {/* Slide counter */}
          <span className="text-[10px] font-mono text-[#F5EFE3]/50 tracking-widest pt-0.5">
            {String(activeIndex + 1).padStart(2, '0')} / {String(HERO_SLIDES.length).padStart(2, '0')}
          </span>
        </div>
      </div>
    </section>
  );
}
