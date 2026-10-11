'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';

interface ProductPlaceholderImageProps {
  productName: string;
  category?: string;
  aspect?: string;
  className?: string;
}

export const ProductPlaceholderImage: React.FC<ProductPlaceholderImageProps> = ({
  productName,
  category = 'FINE FRAGRANCE',
  aspect = '4/3',
  className = '',
}) => {
  return (
    <div
      className={`relative w-full aspect-[4/3] sm:aspect-[4/3] bg-[#F5EFE3] border border-[#C9A55C]/40 flex flex-col items-center justify-between p-6 sm:p-8 text-center select-none overflow-hidden group shadow-inner ${className}`}
    >
      {/* Decorative Corner Filigrees */}
      <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-[#C9A55C]/40" />
      <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-[#C9A55C]/40" />
      <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-[#C9A55C]/40" />
      <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-[#C9A55C]/40" />

      {/* Brand Emblem */}
      <div className="pt-2 flex flex-col items-center space-y-1">
        <Sparkles className="w-4 h-4 text-[#C69A45]" />
        <span className="font-serif text-[11px] tracking-[0.35em] text-[#9D6A26] uppercase">
          AARSIKA
        </span>
      </div>

      {/* Center Product Title & Arch Frame */}
      <div className="my-auto space-y-2 py-4 px-3 bg-[#FBF6EA]/80 backdrop-blur-sm border border-[#C9A55C]/20 w-full max-w-[85%] rounded-lg shadow-sm">
        <span className="text-[9px] font-mono tracking-widest text-[#8a6a22] uppercase block">
          {category}
        </span>
        <h3 className="font-serif text-xl sm:text-2xl text-[#32151A] font-normal leading-snug">
          {productName}
        </h3>
      </div>

      {/* Bottom Status Badge */}
      <div className="pb-1">
        <span className="inline-block bg-[#30070D] text-[#E7CF98] font-mono text-[9px] uppercase tracking-widest px-3 py-1 rounded-none border border-[#C9A55C]/40 shadow-sm">
          PHOTOGRAPH COMING SOON
        </span>
      </div>
    </div>
  );
};
