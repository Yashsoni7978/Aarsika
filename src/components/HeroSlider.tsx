'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { heroSlides } from '@/data/heroSlides';

const AUTOPLAY_DURATION = 6000; // 6 seconds

export default function HeroSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [textFaded, setTextFaded] = useState(true);
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

  const changeSlide = useCallback((newIndex: number) => {
    setTextFaded(false);
    setActiveIndex(newIndex);
    setTimeout(() => {
      setTextFaded(true);
    }, 250);
  }, []);

  const nextSlide = useCallback(() => {
    changeSlide((activeIndex + 1) % heroSlides.length);
  }, [activeIndex, changeSlide]);

  const prevSlide = useCallback(() => {
    changeSlide((activeIndex - 1 + heroSlides.length) % heroSlides.length);
  }, [activeIndex, changeSlide]);

  const goToSlide = useCallback(
    (index: number) => {
      if (index !== activeIndex) {
        changeSlide(index);
      }
    },
    [activeIndex, changeSlide]
  );

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

  const currentSlide = heroSlides[activeIndex];

  return (
    <section
      ref={sliderRef}
      role="region"
      aria-roledescription="carousel"
      aria-label="Aarsika Fine Fragrance Collection"
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
      className="w-full overflow-hidden bg-[#26060d] text-[#FFF9F1] focus:outline-none flex flex-col"
    >
      {/* ==========================================
          1. IMAGE SECTION (Pure Photo, Zero Overlay)
          Height: calc(100svh - 72px - 150px), min 420px, max 82vh
      ========================================== */}
      <div className="relative w-full h-[calc(100svh-72px-150px)] min-h-[420px] max-h-[82vh] hidden md:block overflow-hidden bg-[#26060d]">
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
              <div
                className={`w-full h-full overflow-hidden transition-transform duration-[6000ms] ease-out ${
                  isActive && !prefersReducedMotion ? 'scale-100' : 'scale-[1.03]'
                }`}
              >
                {!hasError ? (
                  <picture className="w-full h-full block">
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
                      className="w-full h-full object-cover object-[36%_55%]"
                    />
                  </picture>
                ) : (
                  <div className="w-full h-full bg-[#3b0a12] flex items-center justify-center text-[#EADFCB]">
                    <span className="font-mono text-xs uppercase tracking-widest">
                      {slide.name} Photo Slot
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile Image Container (4:5 aspect ratio crop) */}
      <div className="relative w-full aspect-[4/5] md:hidden overflow-hidden bg-[#26060d]">
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
              {!hasError ? (
                <picture className="w-full h-full block">
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
                  <img
                    src={`/photos/${slide.img}.jpg`}
                    alt={slide.name}
                    onError={() => handleImgError(slide.img)}
                    loading={index === 0 ? 'eager' : 'lazy'}
                    fetchPriority={index === 0 ? 'high' : 'low'}
                    className="w-full h-full object-cover object-[36%_55%]"
                  />
                </picture>
              ) : (
                <div className="w-full h-full bg-[#3b0a12] flex items-center justify-center text-[#EADFCB]">
                  <span className="font-mono text-xs uppercase tracking-widest">
                    {slide.name} Photo Slot
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ==========================================
          2. DESKTOP TEXT BAND (Directly under image)
          Flat Burgundy (#3b0a12), 150px tall, 3 Columns
      ========================================== */}
      <div className="hidden md:block w-full min-h-[150px] bg-[#3b0a12] border-t border-[#C9A55C]/20 text-[#FFF9F1] py-4">
        <div className="max-w-[1280px] mx-auto px-[6vw] h-full flex items-center justify-between min-h-[118px]">
          {/* LEFT COLUMN (~35%): Moment, Name, Type */}
          <div
            className={`w-[35%] pr-6 transition-opacity duration-250 ${
              textFaded ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <span className="font-mono text-xs tracking-[0.28em] text-[#E7CF98] uppercase block mb-0.5">
              {currentSlide.moment}
            </span>
            <h1 className="font-serif text-[clamp(40px,4vw,64px)] leading-[1.02] text-[#E7CF98] font-normal my-0.5">
              {currentSlide.name}
            </h1>
            <p className="text-sm font-sans tracking-wide text-[#F8F1E7]/80">
              {currentSlide.type}, 50 ml
            </p>
          </div>

          {/* MIDDLE COLUMN (~40%): Descriptor & Text Link */}
          <div
            className={`w-[40%] px-6 space-y-2.5 transition-opacity duration-250 ${
              textFaded ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <p className="text-[17px] font-sans font-light text-[#F8F1E7] leading-relaxed max-w-[38ch]">
              {currentSlide.line}
            </p>
            <div>
              <Link
                href={currentSlide.href}
                className="text-link-underline text-xs font-mono tracking-[0.2em] uppercase text-[#E7CF98] hover:text-[#FFF9F1] inline-flex items-center gap-1.5"
              >
                View {currentSlide.name} →
              </Link>
            </div>
          </div>

          {/* RIGHT COLUMN (~25%): Counter, Indicators, Arrows */}
          <div className="w-[25%] pl-6 flex flex-col items-end justify-center space-y-3 text-right">
            <span className="font-mono text-xs tracking-widest text-[#F8F1E7]/80">
              {String(activeIndex + 1).padStart(2, '0')} / {String(heroSlides.length).padStart(2, '0')}
            </span>

            {/* 4 Thin 28px Gold Progress Lines */}
            <div className="flex items-center gap-2">
              {heroSlides.map((slide, idx) => {
                const isCurrent = idx === activeIndex;
                return (
                  <button
                    key={slide.id}
                    onClick={() => goToSlide(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    className="relative h-[2px] w-[28px] bg-[#C9A55C]/30 overflow-hidden focus:outline-none focus:ring-1 focus:ring-[#C9A55C] rounded-none"
                  >
                    <div
                      className={`h-full bg-[#E7CF98] ${
                        isCurrent
                          ? prefersReducedMotion
                            ? 'w-full'
                            : 'w-full transition-[width] duration-[6000ms] linear'
                          : 'w-0 opacity-30'
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Plain Text Arrows Controls */}
            <div className="flex items-center gap-4 text-[#E7CF98] pt-1">
              <button
                onClick={prevSlide}
                aria-label="Previous slide"
                className="text-base font-mono hover:text-[#FFF9F1] transition-colors focus:outline-none px-2 py-1.5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-none"
              >
                ←
              </button>
              <button
                onClick={nextSlide}
                aria-label="Next slide"
                className="text-base font-mono hover:text-[#FFF9F1] transition-colors focus:outline-none px-2 py-1.5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-none"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ==========================================
          3. MOBILE TEXT BLOCK (Under image on burgundy #3b0a12)
      ========================================== */}
      <div className="block md:hidden bg-[#3b0a12] px-6 py-6 border-t border-[#C9A55C]/20 space-y-4 text-left">
        <div
          className={`space-y-2.5 transition-opacity duration-250 ${
            textFaded ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <span className="font-mono text-xs tracking-[0.28em] text-[#E7CF98] uppercase block">
            {currentSlide.moment}
          </span>

          <h2 className="font-serif text-4xl text-[#E7CF98] font-normal">
            {currentSlide.name}
          </h2>

          <p className="text-xs font-sans text-[#F8F1E7]/80">
            {currentSlide.type}, 50 ml
          </p>

          <p className="text-base font-sans font-light text-[#F8F1E7] leading-relaxed">
            {currentSlide.line}
          </p>

          <div className="pt-1">
            <Link
              href={currentSlide.href}
              className="text-link-underline text-xs font-mono tracking-[0.2em] uppercase text-[#E7CF98] inline-flex items-center gap-1.5 min-h-[44px] items-center"
            >
              View {currentSlide.name} →
            </Link>
          </div>
        </div>

        {/* Mobile Progress Lines & Controls Row */}
        <div className="flex items-center justify-between pt-3 border-t border-[#C9A55C]/15">
          <div className="flex items-center gap-2">
            {heroSlides.map((slide, idx) => {
              const isCurrent = idx === activeIndex;
              return (
                <button
                  key={slide.id}
                  onClick={() => goToSlide(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className="relative h-[2px] w-6 bg-[#C9A55C]/30 overflow-hidden focus:outline-none rounded-none min-h-[44px] flex items-center"
                >
                  <div
                    className={`h-[2px] bg-[#E7CF98] transition-all duration-300 ${
                      isCurrent ? 'w-full' : 'w-0'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-4 text-[#E7CF98]">
            <span className="font-mono text-xs tracking-widest text-[#F8F1E7]/80">
              {String(activeIndex + 1).padStart(2, '0')} / {String(heroSlides.length).padStart(2, '0')}
            </span>

            <button
              onClick={prevSlide}
              aria-label="Previous slide"
              className="text-base font-mono hover:text-[#FFF9F1] transition-colors focus:outline-none min-w-[44px] min-h-[44px] flex items-center justify-center rounded-none"
            >
              ←
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next slide"
              className="text-base font-mono hover:text-[#FFF9F1] transition-colors focus:outline-none min-w-[44px] min-h-[44px] flex items-center justify-center rounded-none"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
