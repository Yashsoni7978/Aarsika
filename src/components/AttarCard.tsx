'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Product } from '@/data/products';
import { useShop } from '@/context/ShopContext';
import PearlButton from './PearlButton';

interface AttarCardProps {
  product: Product;
}

export const AttarCard: React.FC<AttarCardProps> = ({ product }) => {
  const { wishlist, toggleWishlist } = useShop();
  const isWishlisted = wishlist.includes(product.id);

  // Gallery images (fallback to mainImage if empty)
  const images = (product.gallery && product.gallery.length > 0)
    ? product.gallery
    : [product.mainImage];

  const [currentIdx, setCurrentIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIdx((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIdx((prev) => (prev + 1) % images.length);
  };

  const handleDotClick = (e: React.MouseEvent, idx: number) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIdx(idx);
  };

  const lowestPrice = product.variants?.reduce(
    (min, v) => (v.price < min.price ? v : min),
    product.variants[0]
  )?.price ?? product.price;

  return (
    <div
      className="group relative flex flex-col bg-[#FBF6EA] border border-[#C69A45]/20 p-4 sm:p-5 hover:border-[#C69A45] hover:shadow-md text-[#32151A] transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* IMAGE CONTAINER WITH 3-IMAGE CAROUSEL */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#EADFCB] mb-3.5">
        <Link href={`/products/${product.slug}`} className="block w-full h-full">
          <Image
            src={images[currentIdx]}
            alt={`${product.name} - image ${currentIdx + 1}`}
            fill
            sizes="(max-width: 640px) 70vw, (max-width: 1024px) 33vw, 25vw"
            className={`object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02] ${
              currentIdx === 0 ? 'object-[35%_center]' : 'object-center'
            }`}
          />
        </Link>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product.id);
          }}
          className={`absolute top-2.5 right-2.5 z-20 p-2 rounded-full transition-colors ${
            isWishlisted
              ? 'bg-[#30070D] text-[#C69A45]'
              : 'bg-[#F5EFE3]/80 hover:bg-[#F5EFE3] text-[#32151A]'
          }`}
          aria-label={`Save ${product.name} to wishlist`}
        >
          <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-[#C69A45]' : ''}`} />
        </button>

        {/* Carousel Prev/Next Buttons (shown on hover or when multiple images) */}
        {images.length > 1 && (
          <div className="absolute inset-y-0 inset-x-2 flex items-center justify-between pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={handlePrev}
              className="pointer-events-auto p-1.5 bg-[#30070D]/75 hover:bg-[#30070D] text-[#F5EFE3] transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleNext}
              className="pointer-events-auto p-1.5 bg-[#30070D]/75 hover:bg-[#30070D] text-[#F5EFE3] transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Carousel Pagination Dots */}
        {images.length > 1 && (
          <div className="absolute bottom-2.5 left-0 right-0 z-10 flex justify-center items-center gap-1.5">
            {images.map((_, dotIdx) => (
              <button
                key={dotIdx}
                onClick={(e) => handleDotClick(e, dotIdx)}
                className={`transition-all duration-300 rounded-full ${
                  dotIdx === currentIdx
                    ? 'w-4 h-1 bg-[#C69A45]'
                    : 'w-1.5 h-1 bg-[#30070D]/40 hover:bg-[#30070D]/70'
                }`}
                aria-label={`View image ${dotIdx + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* PRODUCT INFO */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <span className="text-[10px] font-mono tracking-widest text-[#9D6A26] uppercase block">
            {product.type || 'Attar Oil'} · {product.defaultSize || '12 ml'}
          </span>

          <Link href={`/products/${product.slug}`} className="mt-1 block">
            <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#32151A] group-hover:text-[#9D6A26] transition-colors">
              {product.name}
            </h3>
          </Link>

          {product.tagline && (
            <p className="text-xs text-[#6b5f55] font-light mt-0.5 line-clamp-1">
              {product.tagline}
            </p>
          )}
        </div>

        <div className="mt-3.5 pt-2.5 border-t border-[#C69A45]/20 flex items-center justify-between">
          <span className="text-sm font-sans font-medium text-[#32151A]">
            From ₹{lowestPrice.toLocaleString('en-IN')}
          </span>
          <PearlButton
            href={`/products/${product.slug}`}
            variant="champagne"
            size="sm"
            rightIcon={<ArrowRight className="w-3 h-3 text-[#9D6A26]" />}
          >
            EXPLORE
          </PearlButton>
        </div>
      </div>
    </div>
  );
};
