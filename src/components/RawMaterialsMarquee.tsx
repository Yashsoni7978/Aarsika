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
      className="group flex flex-col items-center flex-shrink-0 w-[148px] sm:w-[160px] lg:w-[168px] xl:w-[182px] select-none cursor-pointer snap-center"
      role="group"
      aria-label={`${item.name} — ${item.character}`}
    >
      {/* Ornamental Mughal Cusped / Scalloped Medallion Frame */}
      <div className="relative w-[122px] h-[122px] sm:w-[138px] sm:h-[138px] lg:w-[148px] lg:h-[148px] xl:w-[164px] xl:h-[164px] transition-transform duration-500 ease-out group-hover:scale-[1.04]">
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
      <div className="mt-3.5 sm:mt-4 text-center px-1 w-full">
        {/* Ingredient Name in Warm Ivory Serif */}
        <h3 className="font-serif text-[#F8E7D7] text-[15px] sm:text-base lg:text-[18px] font-normal tracking-tight transition-colors duration-300 group-hover:text-[#C9A34E] leading-snug line-clamp-1">
          {item.name}
        </h3>

        {/* Location Label in Subtle Champagne Gold */}
        <p className="text-[#C9A34E] text-[10.5px] sm:text-[11.5px] font-mono tracking-[0.18em] uppercase mt-1 font-medium line-clamp-1">
          {item.origin}
        </p>

        {/* Scent Description / Character */}
        <p className="text-[#F8E7D7]/85 text-xs sm:text-[12.5px] lg:text-[13px] font-serif italic mt-1 leading-snug line-clamp-2">
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
        className="absolute left-0 inset-y-0 w-full lg:w-[500px] pointer-events-none bg-gradient-to-r from-[#38070F]/65 via-[#450913]/35 to-transparent hidden lg:block"
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
              Typography scale and presence styled after hero editorial reference
          ======================================================== */}
          <div className="flex-shrink-0 w-full lg:w-[350px] xl:w-[410px] text-center lg:text-left flex flex-col items-center lg:items-start">
            {/* Eyebrow Label with Arabian Gold Motif matching the reference */}
            <div className="flex items-center justify-center lg:justify-start gap-2.5 sm:gap-3 mb-2 sm:mb-3">
              <span className="h-[1px] w-6 lg:w-9 bg-gradient-to-r from-transparent to-[#C9A34E]/90" />
              <span className="text-[11px] sm:text-xs uppercase tracking-[0.28em] text-[#E5C378] font-serif font-medium">
                NATURE’S FINEST
              </span>
              <span className="h-[1px] w-6 lg:w-9 bg-gradient-to-l from-transparent to-[#C9A34E]/90" />
              <span className="text-[#C9A34E] text-xs leading-none select-none">❖</span>
            </div>

            {/* Main Headline matching the large editorial scale of the reference image */}
            <h2
              id="raw-materials-heading"
              className="font-serif text-3xl sm:text-5xl lg:text-[46px] xl:text-[54px] font-normal text-[#F8E7D7] leading-[1.08] tracking-tight drop-shadow-sm"
            >
              The Raw{' '}
              <span className="italic font-serif text-[#F8F4EC] font-light">
                Materials.
              </span>
            </h2>

            {/* Decorative Antique-Gold Divider matching the reference */}
            <div
              aria-hidden="true"
              className="flex items-center justify-center lg:justify-start gap-3 my-3 sm:my-3.5"
            >
              <span className="w-12 sm:w-16 h-[1.5px] bg-gradient-to-r from-transparent via-[#C9A34E]/80 to-[#C9A34E]" />
              <span className="text-[#C9A34E] text-xs">❖</span>
              <span className="w-12 sm:w-16 h-[1.5px] bg-gradient-to-l from-transparent via-[#C9A34E]/80 to-[#C9A34E]" />
            </div>

            {/* Supporting Subtitle in legible, elegant serif typography */}
            <p className="font-serif italic text-sm sm:text-base lg:text-[17px] text-[#F8E7D7]/90 font-light leading-relaxed max-w-md">
              Nature, gathered into fragrance.
            </p>

            {/* Interactive Controls & Archive Button */}
            <div className="flex items-center gap-3 mt-5 sm:mt-6">
              <button
                type="button"
                onClick={() => handleScroll('prev')}
                aria-label="Previous ingredients"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-[#C9A34E]/60 text-[#C9A34E] flex items-center justify-center transition-all duration-300 hover:border-[#E7CF98] hover:bg-[#C9A34E]/25 hover:text-[#F8E7D7] active:scale-95 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C9A34E] shadow-sm cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => handleScroll('next')}
                aria-label="Next ingredients"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-[#C9A34E]/60 text-[#C9A34E] flex items-center justify-center transition-all duration-300 hover:border-[#E7CF98] hover:bg-[#C9A34E]/25 hover:text-[#F8E7D7] active:scale-95 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C9A34E] shadow-sm cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              <Link
                href="/ingredients"
                className="ml-2 inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full border border-[#C9A34E]/60 bg-[#C9A34E]/15 hover:bg-[#C9A34E] text-[#E5C378] hover:text-[#200408] font-sans font-semibold text-[11px] sm:text-xs uppercase tracking-[0.18em] transition-all duration-300 shadow-sm"
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
