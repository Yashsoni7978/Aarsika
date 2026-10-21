'use client';

import React, { useState, TouchEvent } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ProductPlaceholderImage } from '@/components/ProductPlaceholderImage';
import ResponsivePhoto from '@/components/ResponsivePhoto';

interface ProductCardCarouselProps {
  images: string[];
  alt: string;
  slug: string;
  isLimitedBatch?: boolean;
  isPlaceholderImage?: boolean;
  isGiftSet?: boolean;
}

export const ProductCardCarousel: React.FC<ProductCardCarouselProps> = ({
  images,
  alt,
  slug,
  isLimitedBatch = false,
  isPlaceholderImage = false,
  isGiftSet = false,
}) => {
  const isPlaceholder = isPlaceholderImage || !images || images.length === 0 || images[0] === 'placeholder' || images[0].includes('placeholder');
  const isGift = isGiftSet || slug.includes('gift') || slug.includes('discovery') || slug.includes('trial');

  // Ensure we always have exactly 3 slides for the carousel
  const carouselImages = React.useMemo(() => {
    if (!images || images.length === 0) return ['/photos/attars/sehar-e-gulab.jpg', '/photos/attars/sehar-e-gulab.jpg', '/photos/attars/sehar-e-gulab.jpg'];
    if (images.length === 1) return [images[0], images[0], images[0]];
    if (images.length === 2) return [images[0], images[1], images[0]];
    return images.slice(0, 3);
  }, [images]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % carouselImages.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  const handleTouchStart = (e: TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    const distance = touchStartX - touchEndX;
    const isLeftSwipe = distance > 40;
    const isRightSwipe = distance < -40;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }

    setTouchStartX(null);
    setTouchEndX(null);
  };

  if (isPlaceholder) {
    return (
      <div className="relative aspect-[4/5] w-full bg-cream overflow-hidden rounded-lg">
        <ProductPlaceholderImage productName={alt} />
      </div>
    );
  }

  const containerBg = isGift ? 'bg-cream' : 'bg-sand';

  return (
    <div
      className={`relative aspect-[4/5] w-full ${containerBg} overflow-hidden rounded-lg group/carousel select-none`}
      onMouseEnter={() => setHasInteracted(true)}
      onTouchStart={(e) => {
        setHasInteracted(true);
        handleTouchStart(e);
      }}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <Link href={`/products/${slug}`} className="block relative w-full h-full">
        {carouselImages.map((imgSrc, idx) => {
          const cleanImgSrc = imgSrc.endsWith('.png') ? imgSrc.replace(/\.png$/, '.webp') : imgSrc;

          return (
            <div
              key={idx}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                idx === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {idx === 0 ? (
                <ResponsivePhoto
                  slot={`${slug}-card`}
                  alt={alt}
                  aspect="4/5"
                  objectFit={isGift ? 'contain' : 'cover'}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  priority={false}
                  className={`w-full h-full ${isGift ? 'p-3 object-contain' : 'object-cover'}`}
                />
              ) : (hasInteracted || currentIndex === idx) ? (
                <Image
                  src={cleanImgSrc}
                  alt={`${alt} - View ${idx + 1}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className={`${isGift ? 'p-3 object-contain' : 'object-cover'} transition-transform duration-700 hover:scale-[1.02]`}
                  loading="lazy"
                  priority={false}
                />
              ) : null}
            </div>
          );
        })}
      </Link>

      {/* Prev / Next Arrows (Desktop Hover) */}
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          prevSlide();
        }}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-wine-950/60 backdrop-blur-sm text-ivory hover:bg-wine-950 flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 shadow-md"
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
        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-wine-950/60 backdrop-blur-sm text-ivory hover:bg-wine-950 flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 shadow-md"
        aria-label="Next Image"
      >
        <ChevronRight className="w-4 h-4 stroke-[2]" />
      </button>

      {/* Pagination Dots (Bottom Center) */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-2 py-1 rounded-full bg-wine-950/30 backdrop-blur-sm">
        {carouselImages.map((_, idx) => (
          <button
            key={idx}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setCurrentIndex(idx);
            }}
            aria-label={`Go to image ${idx + 1}`}
            className={`transition-all duration-300 rounded-full ${
              idx === currentIndex
                ? 'w-4 h-1 bg-gold'
                : 'w-1 h-1 bg-ivory/60 hover:bg-ivory'
            }`}
          />
        ))}
      </div>

      {/* Limited Batch Badge (Top Left) */}
      {isLimitedBatch && (
        <div className="absolute top-3 left-3 z-20 bg-wine-950/80 backdrop-blur-sm text-gold-light border border-gold/40 px-2.5 py-1 text-[9px] font-mono tracking-widest uppercase rounded">
          Limited Edition
        </div>
      )}
    </div>
  );
};
