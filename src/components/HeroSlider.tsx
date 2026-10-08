'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { heroSlides, HeroSlide } from '@/data/heroSlides';

const AUTOPLAY_DURATION = 6000; // 6 seconds

export default function HeroSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Check prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Check visibility state
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsPaused(true);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % heroSlides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  }, []);

  const goToSlide = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  // Autoplay timer
  useEffect(() => {
    if (isPaused || prefersReducedMotion) return;

    const interval = setInterval(() => {
      nextSlide();
    }, AUTOPLAY_DURATION);

    return () => clearInterval(interval);
  }, [isPaused, prefersReducedMotion, nextSlide]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prevSlide();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      nextSlide();
    }
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diffX = touchStartX.current - touchEndX.current;

    if (Math.abs(diffX) > 40) {
      if (diffX > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
    setIsPaused(false);
  };

  const handleImgError = (imgKey: string) => {
    setImgErrors((prev) => ({ ...prev, [imgKey]: true }));
  };

  return (
    <section
      ref={sliderRef}
      role="region"
      aria-roledescription="carousel"
      aria-label="Aarsika Fragrance Collection"
      aria-live={isPaused ? 'polite' : 'off'}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative w-full overflow-hidden bg-[#26060d] text-[#FFF9F1] focus:outline-none"
      style={{ minHeight: '620px' }}
    >
      {/* Top Header Scrim Gradient for Readability */}
      <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-[#26060d]/80 via-[#26060d]/30 to-transparent z-20 pointer-events-none" />

      {/* Brand Line - Top Left under header */}
      <div className="absolute top-20 left-6 md:left-[6vw] z-20 pointer-events-none">
        <span className="text-xs md:text-sm font-sans tracking-widest text-[#FFF9F1]/70 uppercase">
          Rare scents. Timeless lands.
        </span>
      </div>

      {/* Slide Stack */}
      <div className="relative w-full h-[70svh] md:h-[100svh] min-h-[620px]">
        {heroSlides.map((slide, index) => {
          const isActive = index === activeIndex;
          const hasError = imgErrors[slide.img];

          return (
            <div
              key={slide.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${heroSlides.length}: ${slide.name}`}
              aria-hidden={!isActive}
              className={`absolute inset-0 w-full h-full transition-opacity duration-900 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {/* Image Container with slow scale */}
              <div
                className={`w-full h-full overflow-hidden transition-transform duration-[6000ms] ease-out ${
                  isActive && !prefersReducedMotion ? 'scale-100' : 'scale-[1.04]'
                }`}
              >
                {!hasError ? (
                  <picture className="w-full h-full block">
                    {/* Mobile Crop (4:5 aspect) */}
                    <source
                      media="(max-width: 767px)"
                      type="image/avif"
                      srcSet={`/photos/hero/${slide.img}-mobile-1080w.avif 1080w, /photos/hero/${slide.img}-mobile-900w.avif 900w`}
                      sizes="100vw"
                    />
                    <source
                      media="(max-width: 767px)"
                      type="image/webp"
                      srcSet={`/photos/hero/${slide.img}-mobile-1080w.webp 1080w, /photos/hero/${slide.img}-mobile-900w.webp 900w`}
                      sizes="100vw"
                    />
                    {/* Desktop Banner (2.46:1 aspect) */}
                    <source
                      media="(min-width: 768px)"
                      type="image/avif"
                      srcSet={`/photos/hero/${slide.img}-desktop-2400w.avif 2400w, /photos/hero/${slide.img}-desktop-1600w.avif 1600w`}
                      sizes="100vw"
                    />
                    <source
                      media="(min-width: 768px)"
                      type="image/webp"
                      srcSet={`/photos/hero/${slide.img}-desktop-2400w.webp 2400w, /photos/hero/${slide.img}-desktop-1600w.webp 1600w`}
                      sizes="100vw"
                    />
                    <img
                      src={`/photos/${slide.img}.jpg`}
                      alt={slide.name}
                      onError={() => handleImgError(slide.img)}
                      loading={index === 0 ? 'eager' : 'lazy'}
                      fetchPriority={index === 0 ? 'high' : 'low'}
                      className="w-full h-full object-cover object-[36%_50%]"
                    />
                  </picture>
                ) : (
                  /* Fallback if image file is missing */
                  <div className="w-full h-full bg-[#3b0a12] flex items-center justify-center text-[#EADFCB]">
                    <span className="font-mono text-xs uppercase tracking-widest">
                      {slide.name} Photo Slot
                    </span>
                  </div>
                )}
              </div>

              {/* Desktop Bottom-Left Gradient Scrim behind text */}
              <div className="hidden md:block absolute bottom-0 left-0 w-[45vw] h-[65vh] bg-gradient-to-tr from-[#26060d]/90 via-[#26060d]/50 to-transparent z-10 pointer-events-none" />

              {/* Desktop Text Overlay - Anchored Bottom-Left */}
              <div className="hidden md:flex absolute bottom-[10vh] left-[6vw] z-20 max-w-[26vw] flex-col items-start text-left">
                <div
                  className={`transition-all duration-700 delay-300 transform ${
                    isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                >
                  <span className="text-xs font-mono tracking-[0.25em] text-[#E7CF98] uppercase block mb-1">
                    {slide.moment}
                  </span>

                  <h1 className="font-serif text-[clamp(48px,5vw,84px)] leading-[1.02] text-[#E7CF98] font-normal mb-1">
                    {slide.name}
                  </h1>

                  <p className="text-sm font-sans tracking-wide text-[#F8F1E7]/90 mb-3">
                    {slide.type}, 50 ml
                  </p>

                  <p className="text-[17px] font-sans font-light text-[#F8F1E7] leading-relaxed max-w-[25vw] mb-6">
                    {slide.line}
                  </p>

                  <Link
                    href={slide.href}
                    className="text-link-underline text-xs font-mono tracking-[0.2em] uppercase text-[#E7CF98] hover:text-[#FFF9F1] inline-flex items-center gap-1.5"
                  >
                    View {slide.name} →
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile Text Block - Sits below the image on deep burgundy (#26060d) background */}
      <div className="block md:hidden bg-[#26060d] px-6 py-8 border-t border-[#C9A55C]/20 z-20 relative text-left">
        {heroSlides.map((slide, index) => {
          if (index !== activeIndex) return null;
          return (
            <div key={slide.id} className="space-y-3">
              <span className="text-xs font-mono tracking-[0.25em] text-[#E7CF98] uppercase block">
                {slide.moment}
              </span>

              <h2 className="font-serif text-4xl text-[#E7CF98] font-normal">
                {slide.name}
              </h2>

              <p className="text-xs font-sans text-[#F8F1E7]/80">
                {slide.type}, 50 ml
              </p>

              <p className="text-base font-sans font-light text-[#F8F1E7] leading-relaxed">
                {slide.line}
              </p>

              <div className="pt-2">
                <Link
                  href={slide.href}
                  className="text-link-underline text-xs font-mono tracking-[0.2em] uppercase text-[#E7CF98] inline-flex items-center gap-1.5"
                >
                  View {slide.name} →
                </Link>
              </div>
            </div>
          );
        })}

        {/* Mobile Slide Indicator Lines */}
        <div className="flex items-center gap-2 pt-6">
          {heroSlides.map((slide, idx) => {
            const isCurrent = idx === activeIndex;
            return (
              <button
                key={slide.id}
                onClick={() => goToSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className="relative h-[2px] w-6 bg-[#C9A55C]/30 overflow-hidden focus:outline-none"
              >
                <div
                  className={`h-full bg-[#E7CF98] transition-all duration-300 ${
                    isCurrent ? 'w-full' : 'w-0'
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Desktop Controls - Bottom-Right */}
      <div className="hidden md:flex absolute bottom-[10vh] right-[6vw] z-20 items-center gap-6 text-[#E7CF98]">
        {/* Slide Counter */}
        <span className="font-mono text-xs tracking-widest text-[#F8F1E7]/80">
          {String(activeIndex + 1).padStart(2, '0')} / {String(heroSlides.length).padStart(2, '0')}
        </span>

        {/* 4 Thin 24px Gold Progress Lines */}
        <div className="flex items-center gap-2">
          {heroSlides.map((slide, idx) => {
            const isCurrent = idx === activeIndex;
            return (
              <button
                key={slide.id}
                onClick={() => goToSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className="relative h-[2px] w-6 bg-[#C9A55C]/30 overflow-hidden focus:outline-none focus:ring-1 focus:ring-[#C9A55C]"
              >
                <div
                  className={`h-full bg-[#E7CF98] ${
                    isCurrent
                      ? prefersReducedMotion
                        ? 'w-full'
                        : 'w-full transition-[width] duration-[6000ms] linear'
                      : 'w-0'
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Prev / Next Plain Text Arrows */}
        <div className="flex items-center gap-3 ml-2">
          <button
            onClick={prevSlide}
            aria-label="Previous slide"
            className="text-base font-mono hover:text-[#FFF9F1] transition-colors focus:outline-none px-1 py-0.5"
          >
            ←
          </button>
          <button
            onClick={nextSlide}
            aria-label="Next slide"
            className="text-base font-mono hover:text-[#FFF9F1] transition-colors focus:outline-none px-1 py-0.5"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
