"use client";

import React from "react";
import Link from "next/link";
import { Heart, ShoppingBag } from "lucide-react";
import { Product } from "@/data/products";
import { useShop } from "@/context/ShopContext";
import { Photo } from "@/components/Photo";

export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { addToCart, toggleWishlist, isInWishlist } = useShop();
  const inWish = isInWishlist(product.id);

  const isLowStock =
    product.stock > 0 &&
    (product.stock <= (product.lowStockThreshold || 5) || product.stock <= 5);

  return (
    <div className="group flex flex-col justify-between bg-[#F6EFE2] border border-[#dccfb6] p-4 rounded-none transition-all duration-300 hover:border-[#C9A55C] hover:shadow-soft">
      <div className="space-y-3">
        {/* Photo Container */}
        <div className="relative aspect-[4/5] w-full bg-[#FBF6EA] overflow-hidden">
          <Link href={`/products/${product.slug}`} className="block relative w-full h-full">
            <Photo
              slot={product.slug}
              alt={product.name}
              aspect="4/5"
              shape="rect"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          </Link>

          {/* Wishlist Heart Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleWishlist(product.id);
            }}
            className="absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full bg-[#F6EFE2]/90 backdrop-blur-sm flex items-center justify-center text-[#1a1411] hover:text-[#8b1a2b] transition-colors shadow-sm"
            aria-label="Save to Wishlist"
          >
            <Heart
              className={`w-4 h-4 stroke-[1.5] ${
                inWish ? "fill-[#8b1a2b] text-[#8b1a2b]" : ""
              }`}
            />
          </button>

          {/* Low Stock Badge */}
          {isLowStock && (
            <span className="absolute bottom-2.5 left-2.5 z-10 bg-[#8b1a2b] text-[#F6EFE2] font-mono text-[9.5px] uppercase tracking-wider px-2 py-0.5 font-medium">
              Only {product.stock} left
            </span>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-1 text-left pt-1">
          <div className="flex items-center justify-between text-[10px] tracking-[0.2em] text-[#8a6a22] font-mono uppercase">
            <span>{product.type || product.category}</span>
            <span>{product.defaultSize || "12ml"}</span>
          </div>

          <Link
            href={`/products/${product.slug}`}
            className="block group-hover:text-[#8b1a2b] transition-colors"
          >
            <h3 className="font-serif text-lg font-normal text-[#1a1411] leading-tight">
              {product.name}
            </h3>
          </Link>

          <p className="font-mono text-sm font-medium text-[#1a1411] pt-1">
            ₹{product.price.toLocaleString("en-IN")}
          </p>
        </div>
      </div>

      {/* Card Action */}
      <div className="pt-4 border-t border-[#dccfb6]/60 mt-3">
        <button
          onClick={() => addToCart(product)}
          className="w-full py-2.5 px-3 border border-[#1a1411] text-[#1a1411] hover:bg-[#26060d] hover:text-[#F6EFE2] hover:border-[#26060d] text-[10.5px] font-mono tracking-[0.2em] uppercase transition-all duration-200 flex items-center justify-center gap-2"
        >
          <span>ADD TO BAG</span>
          <ShoppingBag className="w-3.5 h-3.5 stroke-[1.5]" />
        </button>
      </div>
    </div>
  );
};
