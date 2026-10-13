'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

interface CategoryPanel {
  title: string;
  subtitle: string;
  href: string;
  image: string;
  archShape: string;
  heightClass: string;
  theme: 'ivory' | 'burgundy';
  align?: 'left' | 'right';
}

const CATEGORIES: CategoryPanel[] = [
  {
    title: 'Attars',
    subtitle: 'Pure. Natural. Timeless.',
    href: '/collections/attar',
    image: '/photos/categories/scene-attars.webp',
    // Organic asymmetric pebble arch: tall sweeping left crest
    archShape: 'rounded-tl-[90px] sm:rounded-tl-[130px] lg:rounded-tl-[155px] rounded-tr-[32px] sm:rounded-tr-[40px] rounded-b-[20px]',
    heightClass: 'h-[440px] sm:h-[460px] lg:h-[490px]',
    theme: 'ivory',
    align: 'left',
  },
  {
    title: 'Eau de Parfums',
    subtitle: 'Modern. Refined. Expressive.',
    href: '/collections/perfumes',
    image: '/photos/categories/scene-perfumes.webp',
    // Wave arch: prominent left crest dipping gently to right shoulder
    archShape: 'rounded-tl-[75px] sm:rounded-tl-[100px] lg:rounded-tl-[120px] rounded-tr-[24px] sm:rounded-tr-[32px] rounded-b-[20px]',
    heightClass: 'h-[420px] sm:h-[440px] lg:h-[465px]',
    theme: 'burgundy',
    align: 'left',
  },
  {
    title: 'Discovery Set',
    subtitle: 'Seven journeys. One collection.',
    href: '/discovery-sets',
    image: '/photos/categories/scene-discovery.webp',
    // Proud cathedral arch with distinctly taller vertical presence
    archShape: 'rounded-t-[80px] sm:rounded-t-[110px] lg:rounded-t-[135px] rounded-b-[20px]',
    heightClass: 'h-[460px] sm:h-[490px] lg:h-[530px]',
    theme: 'ivory',
    align: 'left',
  },
  {
    title: 'Gifting',
    subtitle: 'Meaningful. Elegant. Always Special.',
    href: '/collections/gifting',
    image: '/photos/categories/scene-gifting.webp',
    // Right-swept arch: sweeping outer-right crest
    archShape: 'rounded-tl-[24px] sm:rounded-tl-[32px] rounded-tr-[90px] sm:rounded-tr-[125px] lg:rounded-tr-[155px] rounded-b-[20px]',
    heightClass: 'h-[440px] sm:h-[460px] lg:h-[490px]',
    theme: 'burgundy',
    align: 'right',
  },
];

export const FindYourFragrance: React.FC = () => {
  return (
    <section
      id="find-your-fragrance"
      className="relative py-16 sm:py-20 lg:py-24 bg-[#F5EFE3] overflow-hidden border-b border-[#C69A45]/20 scroll-mt-24"
    >
      {/* Subtle ambient lighting vignette in background */}
      <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(ellipse_80%_60%_at_50%_15%,#FFFFFF_0%,transparent_70%)]" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        {/* Editorial Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12 lg:mb-14">
          <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.3em] text-[#9D6A26] block mb-2">
            CATEGORIES
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[50px] font-normal text-[#30070D] tracking-tight leading-[1.15]">
            Find Your Fragrance
          </h2>

          {/* Refined Center Ornament */}
          <div className="flex items-center justify-center gap-3.5 my-3.5">
            <span className="w-10 sm:w-14 h-[1px] bg-[#C69A45]/45" />
            <span className="text-[#C69A45] text-xs">◇</span>
            <span className="w-10 sm:w-14 h-[1px] bg-[#C69A45]/45" />
          </div>

          <p className="text-sm sm:text-base text-[#5a4840] font-light leading-relaxed px-2">
            From timeless attars to modern Eau de Parfums, discover fragrances crafted for every mood, moment and memory.
          </p>
        </div>

        {/* Sculptural Architectural Windows Gallery */}
        <div className="relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 items-end relative z-10">
            {CATEGORIES.map((cat) => {
              const isBurgundy = cat.theme === 'burgundy';
              const isRight = cat.align === 'right';

              return (
                <Link
                  key={cat.title}
                  href={cat.href}
                  className={`group relative flex flex-col justify-between overflow-hidden transition-all duration-500 ease-out hover:-translate-y-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C69A45] focus-visible:ring-offset-2 ${
                    cat.archShape
                  } ${cat.heightClass} ${
                    isBurgundy
                      ? 'border border-[#C69A45]/35 hover:border-[#C69A45] shadow-lg hover:shadow-2xl hover:shadow-[#30070D]/30'
                      : 'border border-[#C69A45]/45 hover:border-[#C69A45] shadow-md hover:shadow-xl'
                  }`}
                >
                  {/* FULL-CANVAS CONTINUOUS PHOTOGRAPHIC SCENE (Entire Interior) */}
                  <div className="absolute inset-0 w-full h-full">
                    <Image
                      src={cat.image}
                      alt={cat.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover object-bottom transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      priority={false}
                    />

                    {/* Subtle top-down atmospheric scrim for pristine text contrast */}
                    {isBurgundy ? (
                      <div className="absolute inset-0 bg-gradient-to-b from-[#240309]/80 via-[#240309]/25 to-transparent pointer-events-none" />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-b from-[#F7F2E7]/85 via-[#F7F2E7]/25 to-transparent pointer-events-none" />
                    )}

                    {/* Grounding bottom shadow */}
                    <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
                  </div>

                  {/* Subtle Inner Border Glow on Hover */}
                  <div className="absolute inset-0 rounded-[inherit] pointer-events-none transition-opacity duration-500 opacity-0 group-hover:opacity-100 shadow-[inset_0_0_24px_rgba(198,154,69,0.22)] z-20" />

                  {/* FLOATING EDITORIAL TYPOGRAPHY (Natural Upper Negative Space) */}
                  <div
                    className={`p-6 sm:p-7 relative z-20 flex flex-col pointer-events-none ${
                      isRight ? 'items-end text-right' : 'items-start text-left'
                    }`}
                  >
                    {/* Delicate Gold Dash */}
                    <span className="block w-6 h-[1.5px] bg-[#C69A45] mb-2.5 group-hover:w-9 transition-all duration-300" />

                    <h3
                      className={`font-serif text-2xl sm:text-[26px] lg:text-[27px] font-normal leading-tight tracking-tight transition-colors duration-300 ${
                        isBurgundy
                          ? 'text-[#F5EFE3] group-hover:text-[#E7CF98]'
                          : 'text-[#30070D] group-hover:text-[#9D6A26]'
                      }`}
                    >
                      {cat.title}
                    </h3>

                    <p
                      className={`text-xs sm:text-[13px] font-light mt-1 leading-snug tracking-wide ${
                        isBurgundy ? 'text-[#E7CF98]/90' : 'text-[#5a4840]'
                      }`}
                    >
                      {cat.subtitle}
                    </p>

                    {/* Circular Dark Button Control with Gold Accent */}
                    <div
                      className="mt-3.5 w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-[#C69A45]/80 bg-[#1D0307]/85 backdrop-blur-sm text-[#E7CF98] flex items-center justify-center transition-all duration-300 shadow-sm pointer-events-auto group-hover:scale-105 group-hover:bg-[#C69A45] group-hover:text-[#2A050C] group-hover:border-[#C69A45]"
                      aria-label={`Explore ${cat.title}`}
                    >
                      <ArrowRight className="w-3.5 h-3.5 stroke-[2] transition-transform duration-300 group-hover:translate-x-0.5" />
                    </div>
                  </div>

                  {/* Accessible Hover Label Indicator at Card Bottom */}
                  <div
                    className={`p-4 sm:p-5 relative z-20 flex items-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                      isRight ? 'justify-end' : 'justify-between'
                    }`}
                  >
                    <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#E7CF98] drop-shadow-sm">
                      EXPLORE COLLECTION →
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Flowing Champagne Gold Contour Ribbon Wave across the base */}
          <svg
            className="absolute -bottom-3 sm:-bottom-4 left-0 w-full h-10 sm:h-14 pointer-events-none z-20 opacity-55 overflow-visible"
            viewBox="0 0 1440 60"
            fill="none"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M0,35 C180,18 360,42 540,24 C720,8 900,42 1080,22 C1260,-2 1380,28 1440,22"
              stroke="url(#goldRibbonGradient)"
              strokeWidth="1.5"
            />
            <defs>
              <linearGradient id="goldRibbonGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#C69A45" stopOpacity="0.15" />
                <stop offset="25%" stopColor="#E7CF98" stopOpacity="0.85" />
                <stop offset="50%" stopColor="#C69A45" stopOpacity="0.4" />
                <stop offset="75%" stopColor="#E7CF98" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#C69A45" stopOpacity="0.2" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </section>
  );
};

export default FindYourFragrance;
