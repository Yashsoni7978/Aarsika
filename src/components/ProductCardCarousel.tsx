'use client';

import React, { useState, TouchEvent } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ProductPlaceholderImage } from '@/components/ProductPlaceholderImage';

interface ProductCardCarouselProps {
  images: string[];
  alt: string;
  slug: string;
  isLimitedBatch?: boolean;
  isPlaceholderImage?: boolean;
}

export const ProductCardCarousel: React.FC<ProductCardCarouselProps> = ({
  images,
  alt,
  slug,
  isLimitedBatch = false,
  isPlaceholderImage = false,
}) => {
  const isPlaceholder = isPlaceholderImage || !images || images.length === 0 || images[0] === 'placeholder' || images[0].includes('placeholder');

  // Ensure we always have exactly 3 slides for the carousel
  const carouselImages = React.useMemo(() => {
    if (!images || images.length === 0) return ['/photos/attars/sehar-e-gulab.jpg', '/photos/attars/sehar-e-gulab.jpg', '/photos/attars/sehar-e-gulab.jpg'];
    if (images.length === 1) return [images[0], images[0], images[0]];
    if (images.length === 2) return [images[0], images[1], images[0]];
    return images.slice(0, 3);
  }, [images]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % carouselImages.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  // Mobile Touch Swipe handlers
  const handleTouchStart = (e: TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    const distance = touchStartX - touchEndX;

    if (distance > 40) {
      nextSlide(); // Swiped left -> Next
    } else if (distance < -40) {
      prevSlide(); // Swiped right -> Prev
    }

    setTouchStartX(null);
    setTouchEndX(null);
  };

  if (isPlaceholder) {
    return (
      <Link href={`/products/${slug}`} className="block relative w-full h-full">
        <ProductPlaceholderImage productName={alt} />
      </Link>
    );
  }

  return (
    <div
      className="relative aspect-[4/3] sm:aspect-[4/3] w-full bg-[#EADFCB] overflow-hidden rounded-lg group/carousel select-none"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <Link href={`/products/${slug}`} className="block relative w-full h-full">
        {carouselImages.map((imgSrc, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              idx === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <Image
              src={imgSrc}
              alt={`${alt} - View ${idx + 1}`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-transform duration-700 hover:scale-[1.02]"
              priority={idx === 0}
            />
          </div>
        ))}
      </Link>

      {/* Prev / Next Arrows (Desktop Hover) */}
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          prevSlide();
        }}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-[#26060d]/60 backdrop-blur-sm text-[#F6EFE2] hover:bg-[#26060d] flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 shadow-md"
        aria-label="Previous Image"
      >
        <ChevronLeft className="w-4 h-4 stroke-[2]" />
      </button>

      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          nextSlide();
        }}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-[#26060d]/60 backdrop-blur-sm text-[#F6EFE2] hover:bg-[#26060d] flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 shadow-md"
        aria-label="Next Image"
      >
        <ChevronRight className="w-4 h-4 stroke-[2]" />
      </button>

      {/* Pagination Dots (Bottom Center) */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-2 py-1 rounded-full bg-[#26060d]/30 backdrop-blur-sm">
        {carouselImages.map((_, idx) => (
          <button
            key={idx}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setCurrentIndex(idx);
            }}
            className={`transition-all duration-300 rounded-full ${
              idx === currentIndex
                ? 'w-4 h-1.5 bg-[#C9A55C]'
                : 'w-1.5 h-1.5 bg-white/60 hover:bg-white'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Optional Limited Batch Note */}
      {isLimitedBatch && (
        <span className="absolute top-3 left-3 z-20 bg-[#30070D] text-[#E7CF98] font-mono text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-none border border-[#C9A55C]/30 shadow-sm">
          Limited batch
        </span>
      )}
    </div>
  );
};
