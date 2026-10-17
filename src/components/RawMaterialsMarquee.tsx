'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { FIVE_HERITAGE_RAW_MATERIALS, RawMaterial } from '@/data/rawMaterials';

/**
 * 8-lobed ornamental Mughal cusped / scalloped medallion frame.
 * Exact coordinate geometry in 200x200 space with 8 outward scalloped petals.
 */
const SCALLOP_PATH =
  'M 170.21 70.92 A 22 22 0 0 1 170.21 129.08 A 22 22 0 0 1 129.08 170.21 A 22 22 0 0 1 70.92 170.21 A 22 22 0 0 1 29.79 129.08 A 22 22 0 0 1 29.79 70.92 A 22 22 0 0 1 70.92 29.79 A 22 22 0 0 1 129.08 29.79 A 22 22 0 0 1 170.21 70.92 Z';

interface IngredientCardProps {
  item: RawMaterial;
  uniqueKey: string;
}

const IngredientCard: React.FC<IngredientCardProps> = ({ item, uniqueKey }) => {
  const clipId = `heritage-scallop-clip-${item.id}-${uniqueKey}`;

  return (
    <div
      className="group flex flex-col items-center flex-shrink-0 w-[145px] sm:w-[155px] lg:w-[165px] xl:w-[178px] select-none cursor-pointer snap-center"
      role="group"
      aria-label={`${item.name} — ${item.character}`}
    >
      {/* Ornamental Mughal Cusped / Scalloped Medallion Frame */}
      <div className="relative w-[120px] h-[120px] sm:w-[135px] sm:h-[135px] lg:w-[145px] lg:h-[145px] xl:w-[160px] xl:h-[160px] transition-transform duration-500 ease-out group-hover:scale-[1.04]">
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full filter drop-shadow-[0_8px_20px_rgba(0,0,0,0.6)]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <clipPath id={clipId}>
              <path d={SCALLOP_PATH} />
            </clipPath>
          </defs>

          {/* Deep grounding backdrop behind the image */}
          <path d={SCALLOP_PATH} fill="#26060d" />

          {/* High-Resolution Raw Material Macro Photograph */}
          <g clipPath={`url(#${clipId})`}>
            <image
              href={item.imageWebp}
              width="200"
              height="200"
              preserveAspectRatio="xMidYMid slice"
              className="transition-transform duration-700 ease-out group-hover:scale-110 motion-reduce:transition-none"
            />
          </g>

          {/* Thin Antique-Gold Scalloped Outline Frame */}
          <path
            d={SCALLOP_PATH}
            fill="none"
            stroke="#C9A34E"
            strokeWidth="1.8"
            className="transition-all duration-300 group-hover:stroke-[#E7CF98] group-hover:stroke-[2.2]"
          />
        </svg>

        {/* Delicate inner accent aura on hover */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none rounded-full transition-opacity duration-300 opacity-0 group-hover:opacity-100 shadow-[inset_0_0_24px_rgba(201,163,78,0.3)]"
        />
      </div>

      {/* Centered Ingredient Information */}
      <div className="mt-3 sm:mt-3.5 text-center px-1 w-full">
        {/* Ingredient Name in Warm Ivory Serif */}
        <h3 className="font-serif text-[#F8E7D7] text-sm sm:text-base lg:text-[17px] font-normal tracking-tight transition-colors duration-300 group-hover:text-[#C9A34E] leading-snug line-clamp-1">
          {item.name}
        </h3>

        {/* Location Label in Subtle Champagne Gold */}
        <p className="text-[#C9A34E] text-[10px] sm:text-[10.5px] font-mono tracking-wider uppercase mt-1 font-medium line-clamp-1">
          {item.origin}
        </p>

        {/* Scent Description / Character */}
        <p className="text-[#F8E7D7]/80 text-[11px] sm:text-[11.5px] font-serif italic mt-1 leading-snug line-clamp-2">
          {item.character}
        </p>
      </div>
    </div>
  );
};

export const RawMaterialsMarquee: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const resumeTimerRef = useRef<NodeJS.Timeout | null>(null);

  // The 5 approved ingredients duplicated for smooth infinite scrolling and looping
  const ingredientsList = FIVE_HERITAGE_RAW_MATERIALS;
  const repeatedIngredients = [
    ...ingredientsList.map((item) => ({ item, batch: 'batch-1' })),
    ...ingredientsList.map((item) => ({ item, batch: 'batch-2' })),
    ...ingredientsList.map((item) => ({ item, batch: 'batch-3' })),
  ];

  // Gentle auto-scrolling loop via requestAnimationFrame
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    let animationFrameId: number;
    const speed = 0.45; // Tranquil luxury pace

    const scrollLoop = () => {
      const container = scrollContainerRef.current;
      if (container && !isPaused && !isInteracting) {
        container.scrollLeft += speed;

        const oneThird = container.scrollWidth / 3;
        if (container.scrollLeft >= oneThird * 2) {
          container.scrollLeft -= oneThird;
        } else if (container.scrollLeft <= 0) {
          container.scrollLeft += oneThird;
        }
      }
      animationFrameId = requestAnimationFrame(scrollLoop);
    };

    animationFrameId = requestAnimationFrame(scrollLoop);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPaused, isInteracting]);

  // Initial position at 1/3 point so scrolling backwards also loops seamlessly
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      const oneThird = container.scrollWidth / 3;
      if (container.scrollLeft === 0 && oneThird > 0) {
        container.scrollLeft = oneThird;
      }
    }
  }, []);

  // Handle manual previous / next scroll controls
  const handleScroll = useCallback((direction: 'prev' | 'next') => {
    const container = scrollContainerRef.current;
    if (!container) return;

    setIsInteracting(true);
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);

    const step = container.clientWidth > 768 ? 320 : 190;
    const delta = direction === 'next' ? step : -step;

    container.scrollBy({ left: delta, behavior: 'smooth' });

    setTimeout(() => {
      if (container) {
        const oneThird = container.scrollWidth / 3;
        if (container.scrollLeft >= oneThird * 2) {
          container.scrollLeft -= oneThird;
        } else if (container.scrollLeft <= 10) {
          container.scrollLeft += oneThird;
        }
      }
    }, 450);

    resumeTimerRef.current = setTimeout(() => {
      setIsInteracting(false);
    }, 2800);
  }, []);

  const handleTouchStart = () => {
    setIsInteracting(true);
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
  };

  const handleTouchEnd = () => {
    resumeTimerRef.current = setTimeout(() => {
      setIsInteracting(false);
    }, 2000);
  };

  return (
    <section
      id="raw-materials"
      className="relative py-16 sm:py-20 lg:py-24 bg-[#5A0F1A] text-[#F8E7D7] overflow-hidden border-y border-[#C9A34E]/30 shadow-[inset_0_12px_35px_rgba(0,0,0,0.5),inset_0_-12px_35px_rgba(0,0,0,0.5)] select-none scroll-mt-20"
      style={{
        backgroundImage: "url('/photos/heritage/raw-materials-heritage-bg.webp')",
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
      }}
      aria-labelledby="raw-materials-heading"
    >
      {/* ========================================================
          ATMOSPHERIC BURGUNDY OVERLAY
          Preserves Mughal arches, antique brass burner & silk drapes
          while enhancing contrast and legibility of typography
      ======================================================== */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[#420B13]/60 via-[#5A0F1A]/35 to-[#420B13]/60 mix-blend-multiply"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_85%_65%_at_50%_50%,rgba(90,15,26,0.18)_0%,rgba(35,5,10,0.55)_100%)]"
      />

      {/* Gentle left panel translucent vignette on desktop */}
      <div
        aria-hidden="true"
        className="absolute left-0 inset-y-0 w-full lg:w-[480px] pointer-events-none bg-gradient-to-r from-[#38070F]/60 via-[#450913]/35 to-transparent hidden lg:block"
      />

      {/* Subtle edge gradient fade on carousel edges */}
      <div
        aria-hidden="true"
        className="absolute right-0 inset-y-0 w-8 sm:w-16 bg-gradient-to-l from-[#38070F]/70 to-transparent pointer-events-none z-20"
      />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-10 xl:gap-12">
          {/* ========================================================
              LEFT INTRODUCTION PANEL (Desktop) / TOP (Mobile)
          ======================================================== */}
          <div className="flex-shrink-0 w-full lg:w-[280px] xl:w-[310px] text-center lg:text-left flex flex-col items-center lg:items-start">
            {/* Eyebrow Label */}
            <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.3em] text-[#C9A34E] block mb-2 sm:mb-2.5 font-medium">
              NATURE’S FINEST
            </span>

            {/* Main Heading */}
            <h2
              id="raw-materials-heading"
              className="font-serif text-2xl sm:text-3xl lg:text-[34px] xl:text-[38px] font-normal text-[#F8E7D7] tracking-tight leading-[1.12]"
            >
              THE RAW MATERIALS
            </h2>

            {/* Decorative Antique-Gold Divider with Central Diamond */}
            <div
              aria-hidden="true"
              className="flex items-center justify-center lg:justify-start gap-3 my-3 sm:my-3.5"
            >
              <span className="w-10 sm:w-12 h-[1px] bg-gradient-to-r from-transparent via-[#C9A34E]/60 to-[#C9A34E]" />
              <svg
                width="12"
                height="12"
                viewBox="0 0 16 16"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                className="text-[#C9A34E] flex-shrink-0"
              >
                <path d="M8 1L9.6 6.4L15 8L9.6 9.6L8 15L6.4 9.6L1 8L6.4 6.4L8 1Z" />
                <circle cx="8" cy="8" r="1.3" fill="#5A0F1A" />
              </svg>
              <span className="w-10 sm:w-12 h-[1px] bg-gradient-to-l from-transparent via-[#C9A34E]/60 to-[#C9A34E]" />
            </div>

            {/* Supporting Subtitle */}
            <p className="text-xs sm:text-sm lg:text-[14.5px] font-serif italic text-[#F8E7D7]/90 font-light leading-relaxed max-w-md">
              Nature, gathered into fragrance.
            </p>

            {/* Understated Antique-Gold Previous / Next Controls */}
            <div className="flex items-center gap-2.5 mt-5 sm:mt-6">
              <button
                type="button"
                onClick={() => handleScroll('prev')}
                aria-label="Previous ingredients"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#C9A34E]/50 text-[#C9A34E] flex items-center justify-center transition-all duration-300 hover:border-[#C9A34E] hover:bg-[#C9A34E]/20 hover:text-[#F8E7D7] active:scale-95 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C9A34E] shadow-sm cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => handleScroll('next')}
                aria-label="Next ingredients"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#C9A34E]/50 text-[#C9A34E] flex items-center justify-center transition-all duration-300 hover:border-[#C9A34E] hover:bg-[#C9A34E]/20 hover:text-[#F8E7D7] active:scale-95 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C9A34E] shadow-sm cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              <Link
                href="/ingredients"
                className="ml-3 text-[10px] sm:text-[11px] font-mono tracking-[0.2em] uppercase text-[#C9A34E] hover:text-[#F8E7D7] transition-colors border-b border-[#C9A34E]/40 hover:border-[#F8E7D7] pb-0.5"
              >
                VIEW ARCHIVE →
              </Link>
            </div>
          </div>

          {/* ========================================================
              RIGHT INGREDIENT CAROUSEL / GALLERY
              Arranged horizontally alongside the left panel
          ======================================================== */}
          <div
            className="relative flex-1 min-w-0"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onFocus={() => setIsPaused(true)}
            onBlur={() => setIsPaused(false)}
          >
            {/* Scrollable Container with Native Touch Swipe Support */}
            <div
              ref={scrollContainerRef}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              className="flex items-start gap-4 sm:gap-5 lg:gap-5 xl:gap-6 overflow-x-auto scrollbar-none py-2 px-2 sm:px-4 focus:outline-none scroll-smooth snap-x snap-mandatory"
              tabIndex={0}
              aria-label="Natural raw materials carousel"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch',
              }}
            >
              {repeatedIngredients.map(({ item, batch }, idx) => (
                <IngredientCard
                  key={`${item.id}-${batch}-${idx}`}
                  item={item}
                  uniqueKey={`${batch}-${idx}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RawMaterialsMarquee;
