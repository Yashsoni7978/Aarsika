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
  theme: 'ivory' | 'burgundy';
}

const CATEGORIES: CategoryPanel[] = [
  {
    title: 'Attars',
    subtitle: 'Pure. Natural. Timeless.',
    href: '/collections/attar',
    image: '/photos/categories/category-attars.webp',
    archShape: 'rounded-tl-[85px] sm:rounded-tl-[110px] lg:rounded-tl-[130px] rounded-tr-[36px] sm:rounded-tr-[44px] rounded-b-[20px]',
    theme: 'ivory',
  },
  {
    title: 'Eau de Parfums',
    subtitle: 'Modern. Refined. Expressive.',
    href: '/collections/perfumes',
    image: '/photos/categories/category-perfumes.webp',
    archShape: 'rounded-tl-[65px] sm:rounded-tl-[85px] lg:rounded-tl-[100px] rounded-tr-[28px] sm:rounded-tr-[36px] rounded-b-[20px]',
    theme: 'burgundy',
  },
  {
    title: 'Discovery Set',
    subtitle: 'Seven journeys. One collection.',
    href: '/discovery-sets',
    image: '/photos/categories/category-discovery.webp',
    archShape: 'rounded-t-[75px] sm:rounded-t-[95px] lg:rounded-t-[115px] rounded-b-[20px]',
    theme: 'ivory',
  },
  {
    title: 'Gifting',
    subtitle: 'Meaningful. Elegant. Always Special.',
    href: '/collections/gifting',
    image: '/photos/categories/category-gifting.webp',
    archShape: 'rounded-tl-[28px] sm:rounded-tl-[36px] rounded-tr-[65px] sm:rounded-tr-[85px] lg:rounded-tr-[100px] rounded-b-[20px]',
    theme: 'burgundy',
  },
];

export const FindYourFragrance: React.FC = () => {
  return (
    <section
      id="find-your-fragrance"
      className="relative py-14 sm:py-16 lg:py-20 bg-[#F5EFE3] overflow-hidden border-b border-[#C69A45]/20 scroll-mt-20"
    >
      {/* Subtle ambient lighting texture in the background */}
      <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(ellipse_80%_60%_at_50%_15%,#FFFFFF_0%,transparent_70%)]" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12 lg:mb-14">
          <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.3em] text-[#9D6A26] block mb-2">
            CATEGORIES
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-normal text-[#30070D] tracking-tight leading-[1.15]">
            Find Your Fragrance
          </h2>

          {/* Refined Center Ornament */}
          <div className="flex items-center justify-center gap-3.5 my-3">
            <span className="w-10 sm:w-14 h-[1px] bg-[#C69A45]/45" />
            <span className="text-[#C69A45] text-xs">◇</span>
            <span className="w-10 sm:w-14 h-[1px] bg-[#C69A45]/45" />
          </div>

          <p className="text-sm sm:text-base text-[#5a4840] font-light leading-relaxed px-2">
            From timeless attars to modern Eau de Parfums, discover fragrances crafted for every mood, moment and memory.
          </p>
        </div>

        {/* Four Sculptural Arch Panels */}
        <div className="relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 relative z-10">
            {CATEGORIES.map((cat) => {
              const isBurgundy = cat.theme === 'burgundy';

              return (
                <Link
                  key={cat.title}
                  href={cat.href}
                  className={`group relative flex flex-col justify-between overflow-hidden transition-all duration-500 ease-out hover:-translate-y-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C69A45] focus-visible:ring-offset-2 ${
                    cat.archShape
                  } ${
                    isBurgundy
                      ? 'bg-gradient-to-b from-[#380810] via-[#2A050C] to-[#1C0308] border border-[#C69A45]/35 hover:border-[#C69A45] shadow-lg hover:shadow-2xl hover:shadow-[#30070D]/25'
                      : 'bg-gradient-to-b from-[#F7F2E7] via-[#EDE4D2] to-[#E2D4BE] border border-[#C69A45]/45 hover:border-[#C69A45] shadow-md hover:shadow-xl'
                  }`}
                  style={{ minHeight: '460px' }}
                >
                  {/* Subtle Inner Border Glow on Hover */}
                  <div className="absolute inset-0 rounded-[inherit] pointer-events-none transition-opacity duration-500 opacity-0 group-hover:opacity-100 shadow-[inset_0_0_24px_rgba(198,154,69,0.18)]" />

                  {/* Top Text Content */}
                  <div className="p-6 sm:p-7 relative z-20 flex flex-col items-start">
                    {/* Small Gold Dash */}
                    <span className="block w-6 h-[2px] bg-[#C69A45] mb-3 group-hover:w-9 transition-all duration-300" />

                    <h3
                      className={`font-serif text-2xl sm:text-[26px] lg:text-[28px] font-normal leading-tight tracking-tight transition-colors duration-300 ${
                        isBurgundy
                          ? 'text-[#F5EFE3] group-hover:text-[#E7CF98]'
                          : 'text-[#30070D] group-hover:text-[#9D6A26]'
                      }`}
                    >
                      {cat.title}
                    </h3>

                    <p
                      className={`text-xs sm:text-[13px] font-light mt-1.5 leading-snug ${
                        isBurgundy ? 'text-[#E7CF98]/85' : 'text-[#6b5f55]'
                      }`}
                    >
                      {cat.subtitle}
                    </p>

                    {/* Circular Arrow Button */}
                    <div
                      className={`mt-4 w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-300 shadow-sm group-hover:scale-105 ${
                        isBurgundy
                          ? 'border-[#C69A45]/60 text-[#E7CF98] group-hover:bg-[#C69A45] group-hover:text-[#30070D] group-hover:border-[#C69A45]'
                          : 'border-[#C69A45]/60 text-[#30070D] group-hover:bg-[#30070D] group-hover:text-[#F5EFE3] group-hover:border-[#30070D]'
                      }`}
                      aria-hidden="true"
                    >
                      <ArrowRight className="w-3.5 h-3.5 stroke-[2] transition-transform duration-300 group-hover:translate-x-0.5" />
                    </div>
                  </div>

                  {/* Bottom Product Image */}
                  <div className="relative w-full aspect-[4/5] mt-auto overflow-hidden">
                    {/* Soft gradient blend for burgundy cards */}
                    {isBurgundy && (
                      <div className="absolute inset-0 bg-gradient-to-b from-[#2A050C] via-transparent to-transparent opacity-85 z-10 pointer-events-none" />
                    )}

                    <Image
                      src={cat.image}
                      alt={cat.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover object-bottom transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      priority={false}
                    />

                    {/* Subtle bottom shadow overlay to ground the composition */}
                    <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/20 to-transparent pointer-events-none z-10" />
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Flowing Golden Ribbon / Contour Wave across the bottom */}
          <svg
            className="absolute -bottom-4 sm:-bottom-5 left-0 w-full h-12 sm:h-16 pointer-events-none z-20 opacity-60 overflow-visible"
            viewBox="0 0 1440 60"
            fill="none"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M0,35 C180,15 360,45 540,25 C720,5 900,45 1080,20 C1260,-5 1380,30 1440,20"
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
