'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '@/data/products';
import { useShop } from '@/context/ShopContext';

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
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Autoplay ~4s when not hovered
  useEffect(() => {
    if (images.length <= 1 || isHovered) return;

    timerRef.current = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % images.length);
    }, 4200);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [images.length, isHovered]);

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
      className="group relative flex flex-col bg-[#F5EFE3] text-[#32151A] transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* IMAGE CONTAINER WITH 3-IMAGE CAROUSEL */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#EADFCB]">
        <Link href={`/products/${product.slug}`} className="block w-full h-full">
          <Image
            src={images[currentIdx]}
            alt={`${product.name} - image ${currentIdx + 1}`}
            fill
            sizes="(max-width: 640px) 70vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        </Link>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 z-20 p-2 rounded-full transition-colors ${
            isWishlisted
              ? 'bg-[#30070D] text-[#C69A45]'
              : 'bg-[#F5EFE3]/80 hover:bg-[#F5EFE3] text-[#32151A]'
          }`}
          aria-label={`Save ${product.name} to wishlist`}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[#C69A45]' : ''}`} />
        </button>

        {/* Carousel Prev/Next Buttons (shown on hover or when multiple images) */}
        {images.length > 1 && (
          <div className="absolute inset-y-0 inset-x-2 flex items-center justify-between pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={handlePrev}
              className="pointer-events-auto p-1.5 bg-[#30070D]/60 hover:bg-[#30070D] text-[#F5EFE3] transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleNext}
              className="pointer-events-auto p-1.5 bg-[#30070D]/60 hover:bg-[#30070D] text-[#F5EFE3] transition-colors"
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
      <div className="pt-3.5 pb-2 flex flex-col flex-1">
        <div className="flex items-center justify-between text-[11px] font-mono tracking-widest text-[#9D6A26] uppercase">
          <span>{product.type || 'Attar Oil'}</span>
          <span>{product.defaultSize || '12 ml'}</span>
        </div>

        <Link href={`/products/${product.slug}`} className="mt-1 group-hover:text-[#9D6A26] transition-colors">
          <h3 className="font-serif text-lg sm:text-xl font-normal text-[#32151A]">
            {product.name}
          </h3>
        </Link>

        {product.tagline && (
          <p className="text-xs text-[#6b5f55] font-light mt-0.5 line-clamp-1">
            {product.tagline}
          </p>
        )}

        <div className="mt-2.5 pt-2 border-t border-[#C69A45]/20 flex items-center justify-between">
          <span className="text-sm font-sans font-medium text-[#32151A]">
            From ₹{lowestPrice.toLocaleString('en-IN')}
          </span>
          <Link
            href={`/products/${product.slug}`}
            className="text-[11px] font-mono uppercase tracking-wider text-[#9D6A26] hover:text-[#32151A] transition-colors"
          >
            EXPLORE →
          </Link>
        </div>
      </div>
    </div>
  );
};
