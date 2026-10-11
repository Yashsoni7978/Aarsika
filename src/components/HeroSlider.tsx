'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { heroSlides } from '@/data/heroSlides';
import { HOME } from '@/content/home.en';

const AUTOPLAY_DURATION = 6000;
const RESUME_DELAY = 8000;

export default function HeroSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [textFaded, setTextFaded] = useState(true);
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const resumeTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Reduced motion check
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = () => setPrefersReducedMotion(mq.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Pause on tab hidden
  useEffect(() => {
    const handler = () => {
      if (document.hidden) setIsPaused(true);
    };
    document.addEventListener('visibilitychange', handler);
    return () => document.removeEventListener('visibilitychange', handler);
  }, []);

  const changeSlide = useCallback((newIndex: number) => {
    setTextFaded(false);
    setActiveIndex(newIndex);
    setTimeout(() => setTextFaded(true), 250);
  }, []);

  const nextSlide = useCallback(() => {
    changeSlide((activeIndex + 1) % heroSlides.length);
  }, [activeIndex, changeSlide]);

  const prevSlide = useCallback(() => {
    changeSlide((activeIndex - 1 + heroSlides.length) % heroSlides.length);
  }, [activeIndex, changeSlide]);

  const goToSlide = useCallback(
    (index: number) => {
      if (index !== activeIndex) changeSlide(index);
    },
    [activeIndex, changeSlide]
  );

  // Pause and resume after interaction
  const pauseAndResume = useCallback(() => {
    setIsPaused(true);
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => setIsPaused(false), RESUME_DELAY);
  }, []);

  // Autoplay (disabled if reduced motion)
  useEffect(() => {
    if (isPaused || prefersReducedMotion) return;
    const interval = setInterval(nextSlide, AUTOPLAY_DURATION);
    return () => clearInterval(interval);
  }, [isPaused, prefersReducedMotion, nextSlide]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); prevSlide(); pauseAndResume(); }
    else if (e.key === 'ArrowRight') { e.preventDefault(); nextSlide(); pauseAndResume(); }
  };

  // Touch handlers for swipe
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
    pauseAndResume();
  };

  const handleImgError = (key: string) => {
    setImgErrors((prev) => ({ ...prev, [key]: true }));
  };

  if (heroSlides.length === 0) return null;
  const currentSlide = heroSlides[activeIndex];
  const product = currentSlide.product;

  // Read price and batch info directly from data
  const lowestVariant = product?.variants?.reduce(
    (min, v) => (v.price < min.price ? v : min),
    product.variants[0]
  );
  const lowestPrice = lowestVariant?.price ?? product?.price ?? 0;
  const batchNo = lowestVariant?.batchNo;
  const batchSize = lowestVariant?.batchSize;
  const stock = lowestVariant?.stock ?? 0;
  const hasBatchData = batchNo !== undefined && batchSize !== undefined;
  const isSoldOut = hasBatchData && stock === 0;

  let batchLine = '';
  if (hasBatchData) {
    const batchLabel = `${HOME.hero.batchPrefix} ${String(batchNo).padStart(2, '0')}`;
    if (isSoldOut) {
      batchLine = `${batchLabel} ${HOME.hero.batchSoldOut}`;
    } else if (stock <= 10) {
      batchLine = `${HOME.hero.batchOnly} ${stock} ${HOME.hero.batchLeft} ${batchLabel}`;
    } else {
      batchLine = `${batchLabel}: ${stock} ${HOME.hero.batchOf} ${batchSize} ${HOME.hero.batchBottlesLeft}`;
    }
  }

  return (
    <section
      ref={sliderRef}
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured fragrances"
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
      className="w-full overflow-hidden bg-[#26060d] text-[#FFF9F1] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A55C] flex flex-col md:block"
    >
      {/* ========================================================
          MOBILE HERO VIEW (h-[calc(100svh-36px-56px-56px)] fit)
      ======================================================== */}
      <div className="flex md:hidden flex-col h-[calc(100svh-148px)] min-h-[520px] max-h-[700px] justify-between">
        {/* IMAGE AREA: Edge to edge, center 38% */}
        <div className="relative w-full flex-1 min-h-[220px] overflow-hidden bg-[#26060d]">
          {heroSlides.map((slide, index) => {
            const isActive = index === activeIndex;
            const hasError = imgErrors[`mobile-${slide.img}`];
            return (
              <div
                key={slide.id}
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${heroSlides.length}: ${slide.name}`}
                aria-hidden={!isActive}
                className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
                  isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                }`}
              >
                <div
                  className={`w-full h-full overflow-hidden ${
                    isActive && !prefersReducedMotion ? 'animate-hero-zoom' : ''
                  }`}
                >
                  {!hasError ? (
                    <Image
                      src={`/photos/${slide.img}.jpg`}
                      alt={slide.name}
                      fill
                      onError={() => handleImgError(`mobile-${slide.img}`)}
                      priority={index === 0}
                      loading={index === 0 ? 'eager' : 'lazy'}
                      sizes="100vw"
                      className="object-cover"
                      style={{ objectPosition: 'center 38%' }}
                    />
                  ) : (
                    <div className="w-full h-full bg-[#4a0b17] flex items-end p-4">
                      <span className="font-mono text-[10px] text-[#EADFCB]/60">
                        {slide.slug}-portrait
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* INFO PANEL (solid burgundy-900) */}
        <div className="bg-[#3b0a12] px-5 py-4 border-t border-[#C9A55C]/20 space-y-2.5 text-left shrink-0">
          <div className={`space-y-1.5 transition-opacity duration-250 ${textFaded ? 'opacity-100' : 'opacity-0'}`}>
            {/* 1. Label */}
            <span className="font-mono text-xs tracking-[0.2em] text-[#C9A55C] uppercase block">
              {currentSlide.type} · {product?.defaultSize || '50 ml'}
            </span>

            {/* 2. Name */}
            <h2 className="font-serif text-[clamp(34px,8vw,48px)] text-[#E7CF98] font-normal leading-[1.05]">
              {currentSlide.name}
            </h2>

            {/* 3. Descriptor */}
            <p className="text-sm font-sans font-light text-[#F8F1E7] leading-tight line-clamp-1">
              {currentSlide.line}
            </p>

            {/* 4. Price */}
            <p className="text-sm font-sans text-[#F8F1E7]/90">
              From ₹{lowestPrice.toLocaleString('en-IN')}{' '}
              <span className="text-[10px] text-[#F8F1E7]/50 ml-1.5">({HOME.hero.moreAbout})</span>
            </p>

            {/* 5. Real batch line */}
            {hasBatchData && (
              <p className="font-mono text-[11px] text-[#E7CF98]/80 tracking-wide">
                {batchLine}
              </p>
            )}

            {/* 6. ONE gold button (52px high, square) */}
            <div className="pt-1">
              <Link
                href={isSoldOut ? '#' : currentSlide.href}
                className="inline-flex items-center justify-center h-[52px] w-full bg-[#C9A55C] text-[#1a1411] text-xs uppercase tracking-[0.16em] font-medium font-sans hover:bg-[#E7CF98] transition-colors rounded-none"
              >
                {isSoldOut ? HOME.hero.joinWaitlist : `${HOME.hero.buttonPrefix} ${currentSlide.name}`}
              </Link>
            </div>
          </div>

          {/* 7. "01 / 05" and five thin 24px gold progress lines */}
          <div className="flex items-center justify-between pt-2 border-t border-[#C9A55C]/15">
            <span className="font-mono text-xs tracking-widest text-[#F8F1E7]/80">
              {String(activeIndex + 1).padStart(2, '0')} / {String(heroSlides.length).padStart(2, '0')}
            </span>

            <div className="flex items-center gap-2">
              {heroSlides.map((s, idx) => {
                const isCurrent = idx === activeIndex;
                return (
                  <button
                    key={s.id}
                    onClick={() => { goToSlide(idx); pauseAndResume(); }}
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
          </div>
        </div>
      </div>

      {/* ========================================================
          DESKTOP HERO VIEW (md and above)
      ======================================================== */}
      <div className="hidden md:block">
        {/* Desktop Image Area */}
        <div className="relative w-full h-[calc(100svh-36px-72px-160px)] min-h-[440px] max-h-[75vh] overflow-hidden bg-[#26060d]">
          {heroSlides.map((slide, index) => {
            const isActive = index === activeIndex;
            const hasError = imgErrors[`desktop-${slide.img}`];
            return (
              <div
                key={slide.id}
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${heroSlides.length}: ${slide.name}`}
                aria-hidden={!isActive}
                className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
                  isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                }`}
              >
                <div
                  className={`w-full h-full overflow-hidden ${
                    isActive && !prefersReducedMotion ? 'animate-hero-zoom' : ''
                  }`}
                >
                  {!hasError ? (
                    <Image
                      src={`/photos/${slide.img}.jpg`}
                      alt={slide.name}
                      fill
                      onError={() => handleImgError(`desktop-${slide.img}`)}
                      priority={index === 0}
                      loading={index === 0 ? 'eager' : 'lazy'}
                      sizes="100vw"
                      className="object-cover"
                      style={{ objectPosition: 'center 38%' }}
                    />
                  ) : (
                    <div className="w-full h-full bg-[#4a0b17] flex items-end p-4">
                      <span className="font-mono text-[10px] text-[#EADFCB]/60">
                        {slide.slug}-wide
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Desktop Info Panel (solid burgundy-900) */}
        <div className="w-full min-h-[160px] bg-[#3b0a12] border-t border-[#C9A55C]/20 text-[#FFF9F1] py-5">
          <div className="max-w-[1280px] mx-auto px-12 h-full flex items-center justify-between">
            {/* LEFT: Label, Name, Price */}
            <div className={`w-[35%] pr-6 transition-opacity duration-250 ${textFaded ? 'opacity-100' : 'opacity-0'}`}>
              <span className="font-mono text-xs tracking-[0.28em] text-[#C9A55C] uppercase block mb-1">
                {currentSlide.type} · {product?.defaultSize || '50 ml'}
              </span>
              <h1 className="font-serif text-[clamp(36px,4vw,56px)] leading-[1.02] text-[#E7CF98] font-normal my-0.5">
                {currentSlide.name}
              </h1>
              <p className="text-sm font-sans text-[#F8F1E7]/80">
                From ₹{lowestPrice.toLocaleString('en-IN')}{' '}
                <span className="text-[10px] text-[#F8F1E7]/50 ml-1">({HOME.hero.moreAbout})</span>
              </p>
            </div>

            {/* MIDDLE: Descriptor, Batch, Button */}
            <div className={`w-[40%] px-6 space-y-2.5 transition-opacity duration-250 ${textFaded ? 'opacity-100' : 'opacity-0'}`}>
              <p className="text-[17px] font-sans font-light text-[#F8F1E7] leading-relaxed max-w-[38ch]">
                {currentSlide.line}
              </p>
              {hasBatchData && (
                <p className="font-mono text-xs text-[#E7CF98]/80 tracking-wide">
                  {batchLine}
                </p>
              )}
              <div className="pt-1">
                <Link
                  href={isSoldOut ? '#' : currentSlide.href}
                  className="inline-flex items-center justify-center h-[52px] px-8 bg-[#C9A55C] text-[#1a1411] text-xs uppercase tracking-[0.16em] font-medium font-sans hover:bg-[#E7CF98] transition-colors rounded-none"
                >
                  {isSoldOut ? HOME.hero.joinWaitlist : `${HOME.hero.buttonPrefix} ${currentSlide.name}`}
                </Link>
              </div>
            </div>

            {/* RIGHT: Counter, 24px Progress Lines, Arrows */}
            <div className="w-[25%] pl-6 flex flex-col items-end justify-center space-y-3 text-right">
              <span className="font-mono text-xs tracking-widest text-[#F8F1E7]/80">
                {String(activeIndex + 1).padStart(2, '0')} / {String(heroSlides.length).padStart(2, '0')}
              </span>

              <div className="flex items-center gap-2">
                {heroSlides.map((s, idx) => {
                  const isCurrent = idx === activeIndex;
                  return (
                    <button
                      key={s.id}
                      onClick={() => { goToSlide(idx); pauseAndResume(); }}
                      aria-label={`Go to slide ${idx + 1}`}
                      className="relative h-[2px] w-6 bg-[#C9A55C]/30 overflow-hidden focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C9A55C] rounded-none min-h-[44px] flex items-center"
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

              <div className="flex items-center gap-4 text-[#E7CF98]">
                <button
                  onClick={() => { prevSlide(); pauseAndResume(); }}
                  aria-label="Previous slide"
                  className="text-base font-mono hover:text-[#FFF9F1] transition-colors focus:outline-none min-w-[44px] min-h-[44px] flex items-center justify-center rounded-none"
                >
                  ←
                </button>
                <button
                  onClick={() => { nextSlide(); pauseAndResume(); }}
                  aria-label="Next slide"
                  className="text-base font-mono hover:text-[#FFF9F1] transition-colors focus:outline-none min-w-[44px] min-h-[44px] flex items-center justify-center rounded-none"
                >
                  →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
