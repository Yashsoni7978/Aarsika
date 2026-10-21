'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { Product } from '@/data/products';
import { useShop } from '@/context/ShopContext';
import { ProductCardCarousel } from '@/components/ProductCardCarousel';
import { Heart, ArrowUpRight } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { wishlist, toggleWishlist } = useShop();
  const isLiked = wishlist.includes(product.id);

  // Fallback check for limited batch
  const isLimitedBatch = product.tags?.includes('limited') || product.tags?.includes('rare') || false;
  const isGift = product.category === 'GIFTING' || product.category === 'DISCOVERY SETS' || product.slug.includes('gift') || product.slug.includes('discovery');

  // Multi-image gallery preparation
  const galleryImages = useMemo(() => {
    if (product.gallery && product.gallery.length > 0) {
      return product.gallery;
    }
    const imgs: string[] = [];
    if (product.mainImage) imgs.push(product.mainImage);
    if (product.secondaryImage) imgs.push(product.secondaryImage);
    return imgs;
  }, [product]);

  return (
    <div className="group flex flex-col h-full bg-ivory p-2.5 rounded-xl border border-gold/15 hover:border-gold/40 transition-all duration-300 hover:shadow-soft">
      {/* Product Image Carousel Container */}
      <div className="relative">
        <ProductCardCarousel
          images={galleryImages}
          alt={product.name}
          slug={product.slug}
          isLimitedBatch={isLimitedBatch}
          isPlaceholderImage={product.isPlaceholderImage || product.mainImage === 'placeholder' || product.mainImage?.includes('placeholder')}
          isGiftSet={isGift}
        />

        {/* Wishlist Button (Top Right) */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 z-20 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
            isLiked
              ? 'bg-wine-900 text-gold-light shadow-md'
              : 'bg-ivory/80 backdrop-blur-sm text-ink hover:bg-wine-900 hover:text-gold-light'
          }`}
          aria-label={`Save ${product.name} to Wishlist`}
        >
          <Heart className={`w-4 h-4 ${isLiked ? 'fill-gold-light' : 'stroke-[1.5]'}`} />
        </button>
      </div>

      {/* Product Details Row - Flex column pinned to bottom */}
      <div className="flex-1 flex flex-col justify-between px-1 pb-1 pt-1.5 space-y-2">
        <div className="space-y-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <Link
              href={`/products/${product.slug}`}
              className="block flex-1 group-hover:text-wine-900 transition-colors"
            >
              <h3 className="font-serif text-xl sm:text-2xl font-normal text-ink leading-tight line-clamp-2 min-h-[2.85rem] flex items-center">
                {product.name}
              </h3>
            </Link>

            {/* Arrow Button to PDP */}
            <Link
              href={`/products/${product.slug}`}
              aria-label={`View ${product.name}`}
              className="w-8 h-8 rounded-full border border-gold/40 flex items-center justify-center text-wine-900 hover:bg-wine-900 hover:text-ivory hover:border-wine-900 transition-all flex-shrink-0 mt-0.5"
            >
              <ArrowUpRight className="w-4 h-4 stroke-[1.5]" />
            </Link>
          </div>

          <p className="text-xs text-muted font-light">
            {product.type || product.category}
          </p>
        </div>

        {/* Price display pinned to bottom with mt-auto */}
        <div className="pt-2 mt-auto border-t border-gold/15 flex items-center justify-between">
          <p className="font-mono text-sm font-semibold text-ink">
            ₹{product.price.toLocaleString('en-IN')}
          </p>
          <span className="text-[10px] font-mono uppercase text-ink/75 font-semibold tracking-wider">
            MRP INCL. TAX
          </span>
        </div>
      </div>
    </div>
  );
};
