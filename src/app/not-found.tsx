import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Compass, ArrowRight, Sparkles, Home } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Page Not Found | Aarsika Fine Fragrance',
  description: 'The fragrance chamber or creation you are searching for could not be found.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-[80vh] bg-[#F6EFE2] text-[#1a1411] flex items-center justify-center px-4 py-20 relative overflow-hidden font-sans">
      {/* Subtle Arch Ornament Background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-5 flex items-center justify-center"
        aria-hidden="true"
      >
        <div className="w-[500px] h-[700px] rounded-t-full border-[12px] border-[#8b1a2b]" />
      </div>

      <div className="max-w-2xl w-full mx-auto text-center relative z-10 space-y-8">
        {/* Crest Motif */}
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#26060d] text-[#E7CF98] border border-[#C9A55C]/40 shadow-soft mb-2">
          <span className="font-serif text-2xl font-light">✦</span>
        </div>

        {/* Eyebrow Label */}
        <div className="flex items-center justify-center gap-3">
          <span className="h-[1px] w-8 bg-[#C9A55C]" />
          <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-[#8a6a22] font-semibold">
            ERROR 404 · SACRED DRIFT
          </span>
          <span className="h-[1px] w-8 bg-[#C9A55C]" />
        </div>

        {/* Headings */}
        <div className="space-y-3">
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#1a1411] font-light leading-tight">
            The Scent Has Drifted.
          </h1>
          <p className="font-serif italic text-lg sm:text-xl text-[#6b5f55]">
            The page or creation you seek cannot be found.
          </p>
        </div>

        {/* Narrative Description */}
        <p className="text-xs sm:text-sm text-[#6b5f55] max-w-md mx-auto leading-relaxed font-light">
          Like a lingering note carried by the desert wind, this path does not lead to an active chamber. Explore our collections or return to the central courtyard.
        </p>

        {/* Primary Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#8b1a2b] text-[#F6EFE2] text-xs font-mono tracking-[0.2em] uppercase rounded-full hover:bg-[#6b1422] transition-all shadow-md hover:shadow-lg"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Return to Sanctuary</span>
          </Link>

          <Link
            href="/shop"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-transparent border border-[#8b1a2b] text-[#8b1a2b] text-xs font-mono tracking-[0.2em] uppercase rounded-full hover:bg-[#8b1a2b]/10 transition-all"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Explore All Creations</span>
          </Link>
        </div>

        {/* Popular Chambers Quick Navigation */}
        <div className="pt-8 border-t border-[#C9A55C]/20 max-w-lg mx-auto">
          <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#8a6a22] mb-4">
            Curated Olfactive Chambers
          </p>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            <Link
              href="/collections/bestsellers"
              className="px-3.5 py-1.5 rounded-full bg-[#EFE5D3] border border-[#C9A55C]/30 text-xs text-[#1a1411] hover:border-[#8b1a2b] hover:text-[#8b1a2b] transition-colors"
            >
              Royal Bestsellers
            </Link>
            <Link
              href="/attar"
              className="px-3.5 py-1.5 rounded-full bg-[#EFE5D3] border border-[#C9A55C]/30 text-xs text-[#1a1411] hover:border-[#8b1a2b] hover:text-[#8b1a2b] transition-colors"
            >
              The Attars
            </Link>
            <Link
              href="/perfumes"
              className="px-3.5 py-1.5 rounded-full bg-[#EFE5D3] border border-[#C9A55C]/30 text-xs text-[#1a1411] hover:border-[#8b1a2b] hover:text-[#8b1a2b] transition-colors"
            >
              Eau de Parfums
            </Link>
            <Link
              href="/discovery-sets"
              className="px-3.5 py-1.5 rounded-full bg-[#EFE5D3] border border-[#C9A55C]/30 text-xs text-[#1a1411] hover:border-[#8b1a2b] hover:text-[#8b1a2b] transition-colors"
            >
              Discovery Sets
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
