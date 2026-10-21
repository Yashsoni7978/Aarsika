/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { HERO_SLIDES, HeroSlide, MOBILE_HERO_SLIDES } from '@/data/heroSlides';

const AUTOPLAY_MS = 6500;
const MOBILE_AUTOPLAY_MS = 5500;

export default function HeroSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mobileActiveIndex, setMobileActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const mobileTouchStartX = useRef<number | null>(null);
  const mobileTouchEndX = useRef<number | null>(null);
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

  const nextMobileSlide = useCallback(() => {
    setMobileActiveIndex((prev) => (prev + 1) % MOBILE_HERO_SLIDES.length);
  }, []);

  const prevMobileSlide = useCallback(() => {
    setMobileActiveIndex((prev) => (prev - 1 + MOBILE_HERO_SLIDES.length) % MOBILE_HERO_SLIDES.length);
  }, []);

  const [slide1Loaded, setSlide1Loaded] = useState(false);
  const [canLoadLazySlides, setCanLoadLazySlides] = useState(false);

  // Defer lazy slides to idle period after critical paint, with complete check & 3s fallback
  useEffect(() => {
    // 1. Immediate check if slide 1 image already completed (e.g. cached / fast paint)
    const checkComplete = () => {
      const desktopImg = document.querySelector('img[data-hero-slide-1="desktop"]') as HTMLImageElement | null;
      const mobileImg = document.querySelector('img[data-hero-slide-1="mobile"]') as HTMLImageElement | null;
      if (desktopImg?.complete || mobileImg?.complete) {
        setSlide1Loaded(true);
      }
    };
    checkComplete();

    // 2. Idle callback / timer for lazy slides
    if (typeof window !== 'undefined') {
      if ('requestIdleCallback' in window) {
        const handle = (window as unknown as { requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => number }).requestIdleCallback(() => {
          setCanLoadLazySlides(true);
          setSlide1Loaded(true);
        }, { timeout: 2000 });
        return () => (window as unknown as { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(handle);
      } else {
        const timer = setTimeout(() => {
          setCanLoadLazySlides(true);
          setSlide1Loaded(true);
        }, 1500);
        return () => clearTimeout(timer);
      }
    }

    // 3. Fallback safety timer: guarantees autoplay and slide loading never hang
    const fallbackTimer = setTimeout(() => {
      setSlide1Loaded(true);
      setCanLoadLazySlides(true);
    }, 3000);
    return () => clearTimeout(fallbackTimer);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!sliderRef.current?.contains(document.activeElement)) return;
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        setCanLoadLazySlides(true);
        nextSlide();
        nextMobileSlide();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setCanLoadLazySlides(true);
        prevSlide();
        prevMobileSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide, nextMobileSlide, prevMobileSlide]);

  // Desktop/Tablet Autoplay - starts only after slide 1 has loaded
  useEffect(() => {
    if (isPaused || prefersReducedMotion || !slide1Loaded) return;
    const interval = setInterval(nextSlide, AUTOPLAY_MS);
    return () => clearInterval(interval);
  }, [isPaused, prefersReducedMotion, slide1Loaded, nextSlide]);

  // Mobile Autoplay (5.5s refined pace) - starts only after slide 1 has loaded
  useEffect(() => {
    if (isPaused || prefersReducedMotion || !slide1Loaded) return;
    const interval = setInterval(nextMobileSlide, MOBILE_AUTOPLAY_MS);
    return () => clearInterval(interval);
  }, [isPaused, prefersReducedMotion, slide1Loaded, nextMobileSlide]);

  // Touch handlers for desktop/tablet swipe
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

  // Mobile Touch Handlers
  const handleMobileTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    mobileTouchStartX.current = e.touches[0].clientX;
  };

  const handleMobileTouchMove = (e: React.TouchEvent) => {
    mobileTouchEndX.current = e.touches[0].clientX;
  };

  const handleMobileTouchEnd = () => {
    if (mobileTouchStartX.current !== null && mobileTouchEndX.current !== null) {
      const diff = mobileTouchStartX.current - mobileTouchEndX.current;
      if (Math.abs(diff) > 40) {
        if (diff > 0) nextMobileSlide();
        else prevMobileSlide();
      }
    }
    mobileTouchStartX.current = null;
    mobileTouchEndX.current = null;
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
              {(isPriority || canLoadLazySlides) && (
                <picture className="w-full h-full block">
                  <source media="(min-width: 1024px)" srcSet={slide.desktopImage} type="image/webp" />
                  <img
                    src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1672 941'/%3E"
                    alt={slide.alt}
                    data-hero-slide-1={isPriority ? "desktop" : undefined}
                    width={1672}
                    height={941}
                    decoding="async"
                    loading={isPriority ? 'eager' : 'lazy'}
                    // @ts-expect-error fetchpriority attribute is standard in HTML5
                    fetchpriority={isPriority ? 'high' : 'auto'}
                    onLoad={isPriority ? () => setSlide1Loaded(true) : undefined}
                    className="w-full h-full object-cover object-center"
                  />
                </picture>
              )}
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
            <h2 className="font-serif text-3xl sm:text-4xl md:text-[38px] font-normal text-[#F5EFE3] leading-[1.12] tracking-tight">
              {activeSlide.headline}{' '}
              {activeSlide.headlineAccent && (
                <span className="italic font-serif text-[#F8F4EC] font-light">
                  {activeSlide.headlineAccent}
                </span>
              )}
              {activeSlide.headlineAfterAccent ? ` ${activeSlide.headlineAfterAccent}` : ''}
            </h2>

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
                  {(isPriority || canLoadLazySlides) && (
                    <picture className="w-full h-full block">
                      <source media="(min-width: 768px) and (max-width: 1023px)" srcSet={slide.tabletImage} type="image/webp" />
                      <img
                        src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1080 1350'/%3E"
                        alt={slide.alt}
                        width={1080}
                        height={1350}
                        decoding="async"
                        loading={isPriority ? 'eager' : 'lazy'}
                        // @ts-expect-error fetchpriority attribute is standard in HTML5
                        fetchpriority={isPriority ? 'high' : 'auto'}
                        onLoad={isPriority ? () => setSlide1Loaded(true) : undefined}
                        className="w-full h-full object-cover object-center"
                      />
                    </picture>
                  )}
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
          Full-width, edge-to-edge luxury mobile hero image slider.
          Uses approved mobile campaign artwork with embedded typography
          and gold-bordered CTAs. No duplicate HTML text or buttons.
          Tap-to-navigate links, subtle crossfade, swipe gestures,
          and discrete pagination indicators.
      ======================================================== */}
      <div
        className="md:hidden relative w-full overflow-hidden bg-[#1b0306] select-none h-[calc(100svh-4.75rem)] min-h-[580px] max-h-[860px]"
        style={{ height: 'calc(100svh - 4.75rem)', minHeight: '580px', maxHeight: '860px' }}
        onTouchStart={handleMobileTouchStart}
        onTouchMove={handleMobileTouchMove}
        onTouchEnd={handleMobileTouchEnd}
      >
        {/* Mobile Slide Crossfade Stack */}
        {MOBILE_HERO_SLIDES.map((slide, idx) => {
          const isActive = idx === mobileActiveIndex;
          const isPriority = idx === 0;

          return (
            <div
              key={slide.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${slide.slideNumber} of ${MOBILE_HERO_SLIDES.length}: ${slide.title}`}
              aria-hidden={!isActive}
              className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <Link
                href={slide.link}
                aria-label={`${slide.title} - ${slide.productName}`}
                className="relative block w-full h-full overflow-hidden focus:outline-none focus:ring-1 focus:ring-[#C69A45]/60 cursor-pointer"
              >
                {/* Ambient Soft Glow Backdrop with Luxury Vignette (shares exact source to avoid duplicate network request) */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 overflow-hidden pointer-events-none"
                >
                  {(isPriority || canLoadLazySlides) && (
                    <picture className="w-full h-full block">
                      <source
                        media="(max-width: 767px)"
                        srcSet={idx === 0 ? '/photos/hero/mobile-amour-love-750w.avif' : slide.mobileAvif}
                        type="image/avif"
                      />
                      <source
                        media="(max-width: 767px)"
                        srcSet={idx === 0 ? '/photos/hero/mobile-amour-love-750w.webp' : slide.mobileWebp}
                        type="image/webp"
                      />
                      <img
                        src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 750 938'/%3E"
                        alt=""
                        aria-hidden="true"
                        className="w-full h-full object-cover blur-3xl opacity-35 scale-110"
                        loading="lazy"
                      />
                    </picture>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-b from-[#1b0306]/75 via-[#1b0306]/20 to-[#1b0306]/85" />
                </div>

                {/* Main Crisp Campaign Artwork (Uniform Centered Frame with Safe Inset) */}
                <div className="relative z-20 w-full h-full flex items-center justify-center p-2 pt-3 pb-16">
                  {(isPriority || canLoadLazySlides) && (
                    <picture className="w-full h-full flex items-center justify-center">
                      <source
                        media="(max-width: 767px)"
                        srcSet={idx === 0 ? '/photos/hero/mobile-amour-love-750w.avif' : slide.mobileAvif}
                        type="image/avif"
                      />
                      <source
                        media="(max-width: 767px)"
                        srcSet={idx === 0 ? '/photos/hero/mobile-amour-love-750w.webp' : slide.mobileWebp}
                        type="image/webp"
                      />
                      <img
                        src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 750 938'/%3E"
                        alt={slide.alt}
                        data-hero-slide-1={isPriority ? "mobile" : undefined}
                        width={idx === 0 ? 750 : 1080}
                        height={idx === 0 ? 938 : 1350}
                        decoding="async"
                        loading={isPriority ? 'eager' : 'lazy'}
                        // @ts-expect-error fetchpriority attribute is standard in HTML5
                        fetchpriority={isPriority ? 'high' : 'auto'}
                        onLoad={isPriority ? () => setSlide1Loaded(true) : undefined}
                        className={`max-w-full max-h-full ${slide.objectFitClass} ${slide.objectPositionClass}`}
                      />
                    </picture>
                  )}
                </div>
              </Link>
            </div>
          );
        })}

        {/* Floating Mobile Navigation Chevrons */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            prevMobileSlide();
          }}
          aria-label="Previous mobile slide"
          className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-[#1b0306]/65 hover:bg-[#1b0306]/90 text-[#F5EFE3] border border-[#C69A45]/35 backdrop-blur-sm flex items-center justify-center transition-transform active:scale-90 focus:outline-none"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            nextMobileSlide();
          }}
          aria-label="Next mobile slide"
          className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-[#1b0306]/65 hover:bg-[#1b0306]/90 text-[#F5EFE3] border border-[#C69A45]/35 backdrop-blur-sm flex items-center justify-center transition-transform active:scale-90 focus:outline-none"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Sleek Frosted Luxury Indicator Capsule & Slide Counter (floating above sticky bar) */}
        <div className="absolute bottom-16 inset-x-0 z-20 flex items-center justify-center pointer-events-auto">
          <div className="px-2.5 py-1 rounded-full bg-[#1b0306]/75 backdrop-blur-md border border-[#C69A45]/35 flex items-center gap-1.5 shadow-[0_4px_16px_rgba(0,0,0,0.5)]">
            {MOBILE_HERO_SLIDES.map((slide, idx) => {
              const isCurrent = idx === mobileActiveIndex;
              return (
                <button
                  key={slide.id}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setMobileActiveIndex(idx);
                  }}
                  aria-label={`Go to mobile slide ${slide.slideNumber}: ${slide.title}`}
                  aria-current={isCurrent ? 'true' : undefined}
                  className={`h-[3px] rounded-full transition-all duration-300 focus:outline-none ${
                    isCurrent
                      ? 'w-6 bg-[#D8B467] shadow-[0_0_8px_rgba(216,180,103,0.8)]'
                      : 'w-2 bg-[#F5EFE3]/35 hover:bg-[#F5EFE3]/70'
                  }`}
                />
              );
            })}
            <span className="text-[10px] font-mono text-[#E5C378]/90 ml-1.5 tracking-wider select-none font-medium">
              {String(mobileActiveIndex + 1).padStart(2, '0')} / {String(MOBILE_HERO_SLIDES.length).padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>

    </section>
  );
}
