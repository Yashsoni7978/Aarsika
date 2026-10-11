'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, ArrowUpRight } from 'lucide-react';
import { Product } from '@/data/products';
import { useShop } from '@/context/ShopContext';
import { ProductCardCarousel } from '@/components/ProductCardCarousel';

export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { toggleWishlist, isInWishlist } = useShop();
  const isLiked = isInWishlist(product.id);

  const isLimitedBatch = product.variants?.some(
    (v) => (v.stock || 0) < (v.batchSize || 69)
  );

  // Collect 3 images for the carousel
  const galleryImages = React.useMemo(() => {
    if (product.gallery && product.gallery.length >= 3) {
      return product.gallery.slice(0, 3);
    }
    const imgs: string[] = [];
    if (product.mainImage) imgs.push(product.mainImage);
    if (product.secondaryImage) imgs.push(product.secondaryImage);
    if (product.gallery && product.gallery.length > 0) {
      product.gallery.forEach((g) => {
        if (!imgs.includes(g)) imgs.push(g);
      });
    }
    while (imgs.length < 3) {
      imgs.push(product.mainImage || '/photos/attars/sehar-e-gulab.jpg');
    }
    return imgs.slice(0, 3);
  }, [product]);

  return (
    <div className="group space-y-3.5 bg-[#F6EFE2] p-2.5 rounded-lg border border-[#C9A55C]/15 hover:border-[#C9A55C]/40 transition-all duration-300 hover:shadow-soft">
      {/* Product Image Carousel Container */}
      <div className="relative">
        <ProductCardCarousel
          images={galleryImages}
          alt={product.name}
          slug={product.slug}
          isLimitedBatch={isLimitedBatch}
          isPlaceholderImage={product.isPlaceholderImage || product.mainImage === 'placeholder' || product.mainImage?.includes('placeholder')}
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
              ? 'bg-[#30070D] text-[#E7CF98] shadow-md'
              : 'bg-[#F6EFE2]/80 backdrop-blur-sm text-[#1a1411] hover:bg-[#30070D] hover:text-[#E7CF98]'
          }`}
          aria-label={`Save ${product.name} to Wishlist`}
        >
          <Heart className={`w-4 h-4 ${isLiked ? 'fill-[#E7CF98]' : 'stroke-[1.5]'}`} />
        </button>
      </div>

      {/* Product Details Row */}
      <div className="space-y-1.5 px-1 pb-1">
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-0.5 min-w-0 flex-1">
            <Link
              href={`/products/${product.slug}`}
              className="block group-hover:text-[#30070D] transition-colors"
            >
              <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#1a1411] leading-tight truncate">
                {product.name}
              </h3>
            </Link>

            {/* Thin accent line under title if available */}
            {product.accent && (
              <div className="h-[2px] w-7 my-1.5" style={{ backgroundColor: product.accent }} />
            )}

            <p className="text-xs text-[#6b5f55] font-light">
              {product.type || product.category}
            </p>
          </div>

          {/* Arrow Button to PDP */}
          <Link
            href={`/products/${product.slug}`}
            aria-label={`View ${product.name}`}
            className="w-8 h-8 rounded-full border border-[#C9A55C]/40 flex items-center justify-center text-[#30070D] hover:bg-[#30070D] hover:text-[#F6EFE2] hover:border-[#30070D] transition-all flex-shrink-0 mt-0.5"
          >
            <ArrowUpRight className="w-4 h-4 stroke-[1.5]" />
          </Link>
        </div>

        {/* Price display */}
        <div className="pt-1 flex items-center justify-between">
          <p className="font-mono text-sm font-semibold text-[#1a1411]">
            ₹{product.price.toLocaleString('en-IN')}
          </p>
          <span className="text-[10px] font-mono uppercase text-[#8a6a22] tracking-wider">
            MRP INCL. TAX
          </span>
        </div>
      </div>
    </div>
  );
};
