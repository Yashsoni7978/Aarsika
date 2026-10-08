'use client';

import React from 'react';
import Link from 'next/link';
import { Product } from '@/data/products';
import { useShop } from '@/context/ShopContext';
import { Photo } from '@/components/Photo';

export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { addToCart } = useShop();

  const isLimitedBatch = product.variants?.some(
    (v) => (v.stock || 0) < (v.batchSize || 69)
  );

  return (
    <div className="group space-y-3">
      {/* Product Image */}
      <div className="relative aspect-[4/5] w-full bg-[#EADFCB] overflow-hidden">
        <Link href={`/products/${product.slug}`} className="block relative w-full h-full">
          <Photo
            slot={product.slug}
            alt={product.name}
            aspect="4/5"
            shape="rect"
            sizes="(max-width: 640px) 50vw, 25vw"
          />
        </Link>

        {/* Optional Limited Batch note (no counter) */}
        {isLimitedBatch && (
          <span className="absolute bottom-3 left-3 z-10 bg-[#3b0a12] text-[#E7CF98] font-mono text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-none">
            Limited batch
          </span>
        )}
      </div>

      {/* Product Details */}
      <div className="space-y-1">
        <Link href={`/products/${product.slug}`} className="block group-hover:text-[#8b1a2b] transition-colors">
          <h3 className="font-serif text-xl font-normal text-[#1a1411] leading-tight">
            {product.name}
          </h3>
        </Link>

        {/* Thin accent line under title if available */}
        {product.accent && (
          <div className="h-[2px] w-8 my-1" style={{ backgroundColor: product.accent }} />
        )}

        <p className="text-xs text-[#6b5f55] font-light">
          {product.type || product.category}
        </p>

        <div className="flex items-center justify-between pt-1">
          <p className="font-mono text-sm font-medium text-[#1a1411]">
            ₹{product.price.toLocaleString('en-IN')}
          </p>

          <button
            onClick={() => addToCart(product)}
            className="text-link-underline text-[#1a1411] text-[11px] opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
          >
            Add to bag →
          </button>
        </div>
      </div>
    </div>
  );
};
