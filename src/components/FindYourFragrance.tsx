'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface CategoryCard {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  imageWebp: string;
  imageAvif: string;
  alt: string;
}

const CATEGORIES: CategoryCard[] = [
  {
    id: 'attars',
    title: 'Attars',
    subtitle: 'Pure. Natural. Timeless.',
    href: '/collections/attar',
    imageWebp: '/photos/categories/category-attars.webp',
    imageAvif: '/photos/categories/category-attars.avif',
    alt: 'Aarsika Luxury Attar Bottle in Golden Palace Courtyard',
  },
  {
    id: 'eau-de-parfums',
    title: 'Eau de Parfums',
    subtitle: 'Modern. Refined. Expressive.',
    href: '/collections/perfumes',
    imageWebp: '/photos/categories/category-perfumes.webp',
    imageAvif: '/photos/categories/category-perfumes.avif',
    alt: 'Aarsika Amour Eau de Parfum with Red Roses and Velvet Drapery',
  },
  {
    id: 'discovery-set',
    title: 'Discovery Set',
    subtitle: 'Seven journeys. One collection.',
    href: '/discovery-sets',
    imageWebp: '/photos/categories/category-discovery.webp',
    imageAvif: '/photos/categories/category-discovery.avif',
    alt: 'Aarsika Fragrance Discovery Trial Set with Seven Vials',
  },
  {
    id: 'gifting',
    title: 'Gifting',
    subtitle: 'Meaningful. Elegant. Always Special.',
    href: '/collections/gifting',
    imageWebp: '/photos/categories/category-gifting.webp',
    imageAvif: '/photos/categories/category-gifting.avif',
    alt: 'Aarsika Royal Attar Collection Luxury Gift Set with Lantern',
  },
];

/**
 * Regal Indian palace botanical corner ornament (Mughal floral damask watermark)
 */
const CornerFloralOrnament: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 240 240"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`pointer-events-none select-none text-[#C69A45] ${className}`}
    aria-hidden="true"
  >
    {/* Main outward floral plume */}
    <path
      d="M0,0 C45,15 90,45 120,90 C135,115 145,145 150,180 C135,160 115,145 90,135 C50,120 20,80 0,0 Z"
      fill="currentColor"
      fillOpacity="0.12"
    />
    <path
      d="M10,0 C60,25 105,70 130,130 C110,115 85,105 60,100 C35,95 18,65 10,0 Z"
      fill="currentColor"
      fillOpacity="0.18"
    />
    {/* Delicate scrolling vine tendrils */}
    <path
      d="M0,20 C50,35 95,75 125,125 C145,160 160,200 165,240"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeOpacity="0.35"
      fill="none"
    />
    <path
      d="M20,0 C35,50 75,95 125,125 C160,145 200,160 240,165"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeOpacity="0.35"
      fill="none"
    />
    {/* Secondary concentric arch filigree */}
    <path
      d="M0,60 C40,75 80,110 105,155 C120,185 130,215 135,240"
      stroke="currentColor"
      strokeWidth="0.8"
      strokeOpacity="0.25"
      strokeDasharray="3 3"
      fill="none"
    />
    <path
      d="M60,0 C75,40 110,80 155,105 C185,120 215,130 240,135"
      stroke="currentColor"
      strokeWidth="0.8"
      strokeOpacity="0.25"
      strokeDasharray="3 3"
      fill="none"
    />
    {/* Floral florets along the vines */}
    <circle cx="125" cy="125" r="3.5" fill="currentColor" fillOpacity="0.45" />
    <circle cx="95" cy="75" r="2.5" fill="currentColor" fillOpacity="0.4" />
    <circle cx="75" cy="95" r="2.5" fill="currentColor" fillOpacity="0.4" />
    <circle cx="160" cy="200" r="2" fill="currentColor" fillOpacity="0.35" />
    <circle cx="200" cy="160" r="2" fill="currentColor" fillOpacity="0.35" />
    {/* Corner apex lotus blossom */}
    <path
      d="M4,4 Q24,8 32,28 Q18,24 14,14 Q8,18 4,4 Z"
      fill="currentColor"
      fillOpacity="0.35"
    />
  </svg>
);

/**
 * 8-pointed gold star / diamond emblem
 */
const GoldStarOrnament: React.FC<{ size?: number; className?: string }> = ({ size = 14, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className={`text-[#C69A45] flex-shrink-0 ${className}`}
    aria-hidden="true"
  >
    <path d="M8 0L9.4 5.6L15 7L9.4 8.4L8 14L6.6 8.4L1 7L6.6 5.6L8 0Z" />
    <circle cx="8" cy="7" r="1.2" fill="#FAF6EF" />
    {/* Secondary 4 subtle diagonal points */}
    <circle cx="4.5" cy="3.5" r="0.75" opacity="0.8" />
    <circle cx="11.5" cy="3.5" r="0.75" opacity="0.8" />
    <circle cx="4.5" cy="10.5" r="0.75" opacity="0.8" />
    <circle cx="11.5" cy="10.5" r="0.75" opacity="0.8" />
  </svg>
);

export const FindYourFragrance: React.FC = () => {
  return (
    <section
      id="find-your-fragrance"
      className="relative pt-14 pb-16 sm:pt-18 sm:pb-20 lg:pt-22 lg:pb-24 bg-[#F5EFE3] overflow-hidden scroll-mt-28 select-none"
      aria-labelledby="find-your-fragrance-heading"
    >
      {/* ========================================================
          BACKGROUND & ATMOSPHERIC ORNAMENTATION
      ======================================================== */}
      {/* Subtle warm center radial vignette for dimensional depth */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(ellipse_75%_55%_at_50%_25%,#FFFFFF_0%,transparent_75%)]"
      />

      {/* Exquisite Mughal floral corner watermark detailing */}
      <CornerFloralOrnament className="absolute top-0 left-0 w-36 sm:w-56 lg:w-72 h-36 sm:h-56 lg:h-72 opacity-35" />
      <CornerFloralOrnament className="absolute top-0 right-0 w-36 sm:w-56 lg:w-72 h-36 sm:h-56 lg:h-72 opacity-35 scale-x-[-1]" />

      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ========================================================
            CENTERED SECTION HEADER
        ======================================================== */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12 lg:mb-14">
          {/* Gold Ornamental Motif with fine horizontal hairline rules */}
          <div
            aria-hidden="true"
            className="flex items-center justify-center gap-3 sm:gap-4 mb-3 sm:mb-3.5"
          >
            <span className="w-10 sm:w-16 lg:w-20 h-[1px] bg-gradient-to-r from-transparent via-[#C69A45]/60 to-[#C69A45]" />
            <GoldStarOrnament size={16} />
            <span className="w-10 sm:w-16 lg:w-20 h-[1px] bg-gradient-to-l from-transparent via-[#C69A45]/60 to-[#C69A45]" />
          </div>

          {/* Heading */}
          <h2
            id="find-your-fragrance-heading"
            className="font-serif text-3xl sm:text-4xl md:text-[44px] lg:text-[48px] font-normal text-[#30070D] tracking-tight leading-[1.15]"
          >
            Find Your Fragrance
          </h2>

          {/* Supporting Copy */}
          <p className="text-xs sm:text-sm md:text-[15px] text-[#5A4840] font-light mt-2.5 sm:mt-3 leading-relaxed max-w-xl mx-auto px-2">
            From timeless attars to modern Eau de Parfum, explore fragrances crafted for every mood,
            moment and memory.
          </p>
        </div>

        {/* ========================================================
            FOUR ARCHED CATEGORY CARDS GRID
        ======================================================== */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5 lg:gap-6">
          {CATEGORIES.map((cat) => {
            return (
              <Link
                key={cat.id}
                href={cat.href}
                aria-label={`Explore ${cat.title} — ${cat.subtitle}`}
                className="group relative flex flex-col justify-between overflow-visible rounded-t-[999px] rounded-b-[18px] sm:rounded-b-[22px] bg-[#FAF6EF] border border-[#C69A45]/45 shadow-[0_4px_20px_rgba(48,7,13,0.06)] transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-[0_16px_36px_rgba(48,7,13,0.12)] hover:border-[#C69A45] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C69A45] focus-visible:ring-offset-2"
              >
                {/* ----------------------------------------------------
                    1. CARD APEX KEYSTONE ORNAMENT (Top of the Arch)
                ---------------------------------------------------- */}
                <div
                  aria-hidden="true"
                  className="absolute -top-[7px] sm:-top-[8px] left-1/2 -translate-x-1/2 z-30 pointer-events-none flex items-center justify-center"
                >
                  <div className="px-1 py-0.5 rounded-full bg-[#F5EFE3]">
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-[#C69A45] transition-transform duration-500 group-hover:scale-125"
                    >
                      <path d="M8 0L9.4 5.6L15 7L9.4 8.4L8 14L6.6 8.4L1 7L6.6 5.6L8 0Z" />
                      <circle cx="8" cy="7" r="1.3" fill="#FAF6EF" />
                    </svg>
                  </div>
                </div>

                {/* ----------------------------------------------------
                    2. UPPER PHOTOGRAPHIC SCENE (Arched Frame)
                ---------------------------------------------------- */}
                <div className="relative w-full aspect-[4/5] overflow-hidden rounded-t-[999px] z-10 bg-[#240309]/10">
                  <picture className="w-full h-full block">
                    <source srcSet={cat.imageAvif} type="image/avif" />
                    <source srcSet={cat.imageWebp} type="image/webp" />
                    <img
                      src={cat.imageWebp}
                      alt={cat.alt}
                      width={800}
                      height={1000}
                      decoding="async"
                      loading="lazy"
                      className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none"
                    />
                  </picture>

                  {/* Gentle bottom shadow transition onto the ivory panel */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/25 via-black/5 to-transparent pointer-events-none"
                  />
                </div>

                {/* ----------------------------------------------------
                    3. WARM-IVORY INFORMATION PANEL (Outside Image)
                ---------------------------------------------------- */}
                <div className="relative z-20 flex-1 flex flex-col items-center justify-between px-3 pt-3 pb-4 sm:px-4 sm:pt-3.5 sm:pb-5 lg:px-5 lg:pt-4 lg:pb-6 text-center bg-[#FAF6EF] rounded-b-[18px] sm:rounded-b-[22px]">
                  {/* Small Gold Diamond Ornamental Divider between image and text */}
                  <div
                    aria-hidden="true"
                    className="flex items-center justify-center text-[#C69A45] mb-2 sm:mb-2.5"
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      className="transition-transform duration-300 group-hover:rotate-45"
                    >
                      <path d="M8 1L9.6 6.4L15 8L9.6 9.6L8 15L6.4 9.6L1 8L6.4 6.4L8 1Z" />
                      <circle cx="8" cy="8" r="1.3" fill="#FAF6EF" />
                    </svg>
                  </div>

                  {/* Category Name & Subtitle */}
                  <div className="w-full flex flex-col items-center">
                    <h3 className="font-serif text-[17px] sm:text-xl lg:text-[25px] font-normal text-[#30070D] tracking-tight leading-snug group-hover:text-[#9D6A26] transition-colors duration-300">
                      {cat.title}
                    </h3>
                    <p className="text-[10.5px] sm:text-xs lg:text-[12.5px] text-[#5A4840] font-light mt-0.5 sm:mt-1 leading-snug tracking-normal">
                      {cat.subtitle}
                    </p>
                  </div>

                  {/* Centered EXPLORE Label & Circular Gold-Outlined Arrow */}
                  <div className="mt-3 sm:mt-4 lg:mt-4.5 flex items-center justify-center gap-1.5 sm:gap-2">
                    <span className="text-[9.5px] sm:text-[10px] lg:text-[10.5px] font-mono uppercase tracking-[0.22em] text-[#30070D] font-medium transition-colors duration-300 group-hover:text-[#9D6A26]">
                      EXPLORE
                    </span>
                    <div
                      aria-hidden="true"
                      className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-[#C69A45] flex items-center justify-center text-[#30070D] bg-transparent transition-all duration-300 group-hover:bg-[#C69A45] group-hover:text-[#FAF6EF] group-hover:border-[#C69A45] shadow-xs"
                    >
                      <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 stroke-[1.75] transition-transform duration-300 group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FindYourFragrance;
