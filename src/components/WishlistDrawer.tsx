"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Heart, ShoppingBag, Trash2 } from "lucide-react";
import { useShop } from "@/context/ShopContext";
import { PRODUCTS } from "@/data/products";
import PearlButton from "./PearlButton";

export const WishlistDrawer: React.FC = () => {
  const { wishlist, isWishlistOpen, setIsWishlistOpen, toggleWishlist, addToCart } = useShop();

  if (!isWishlistOpen) return null;

  const wishlistProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        onClick={() => setIsWishlistOpen(false)}
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity animate-in fade-in duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FFF9F1] border-l border-[#C49A52]/30 shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          <div className="p-6 border-b border-[#C49A52]/20 bg-[#F8F1E7] flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Heart className="w-5 h-5 text-[#B94D70] fill-[#B94D70]" />
              <h2 className="font-serif text-2xl font-bold tracking-wide text-[#17345F]">
                WISHLIST ({wishlistProducts.length})
              </h2>
            </div>
            <button
              onClick={() => setIsWishlistOpen(false)}
              className="p-2 text-[#756B63] hover:text-[#B94D70] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {wishlistProducts.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#F8F1E7] border border-[#C49A52]/30 flex items-center justify-center text-[#B94D70]">
                  <Heart className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl font-semibold text-[#17345F]">
                  Your Wishlist is Empty
                </h3>
                <p className="text-xs text-[#756B63] max-w-xs mx-auto">
                  Save your favorite attars and royal perfumes to revisit anytime.
                </p>
                <div className="pt-2">
                  <PearlButton
                    href="/shop"
                    onClick={() => setIsWishlistOpen(false)}
                    variant="burgundy"
                    size="md"
                  >
                    EXPLORE COLLECTIONS
                  </PearlButton>
                </div>
              </div>
            ) : (
              wishlistProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex gap-4 p-4 bg-[#F8F1E7]/60 border border-[#C49A52]/20 rounded-md items-center justify-between"
                >
                  <div className="relative w-16 h-20 bg-[#F8F1E7] rounded overflow-hidden shrink-0 border border-[#C49A52]/20">
                    <Image
                      src={product.mainImage}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <h4 className="font-serif text-lg font-semibold text-[#17345F]">
                      {product.name}
                    </h4>
                    <p className="text-[11px] text-[#756B63] uppercase">{product.type}</p>
                    <p className="font-serif text-sm font-bold text-[#241C1B] mt-1">
                      ₹ {product.price.toLocaleString("en-IN")}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => addToCart(product)}
                      className="p-2 bg-[#17345F] text-white rounded hover:bg-[#B94D70] transition-colors"
                      title="Add to Bag"
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="p-2 text-[#756B63] hover:text-[#B94D70] transition-colors"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
