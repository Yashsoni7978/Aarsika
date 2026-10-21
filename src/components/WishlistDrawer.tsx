"use client";

import React from "react";
import Image from "next/image";
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
        <div className="w-screen max-w-md bg-ivory border-l border-gold/30 shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-6 border-b border-gold/20 bg-cream flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Heart className="w-5 h-5 text-gold fill-gold" />
              <h2 className="font-serif text-2xl font-bold tracking-wide text-wine-900">
                WISHLIST ({wishlistProducts.length})
              </h2>
            </div>
            <button
              onClick={() => setIsWishlistOpen(false)}
              className="p-2 text-muted hover:text-wine-900 transition-colors"
              aria-label="Close Wishlist"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {wishlistProducts.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-cream border border-gold/30 flex items-center justify-center text-gold">
                  <Heart className="w-8 h-8 fill-gold/20" />
                </div>
                <h3 className="font-serif text-2xl font-semibold text-wine-900">
                  Your Wishlist is Empty
                </h3>
                <p className="text-xs text-muted max-w-xs mx-auto leading-relaxed">
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
              wishlistProducts.map((product) => {
                const itemImg = product.mainImage && product.mainImage !== 'placeholder'
                  ? product.mainImage
                  : '/photos/attars/sehar-e-gulab.jpg';

                return (
                  <div
                    key={product.id}
                    className="flex gap-4 p-4 bg-cream border border-gold/20 rounded-md items-center justify-between shadow-xs"
                  >
                    <div className="relative w-16 h-20 bg-sand rounded overflow-hidden shrink-0 border border-gold/20">
                      <Image
                        src={itemImg}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif text-lg font-semibold text-ink truncate">
                        {product.name}
                      </h4>
                      <p className="text-[11px] text-muted uppercase font-mono">{product.type}</p>
                      <p className="font-serif text-sm font-bold text-ink mt-1">
                        ₹ {product.price.toLocaleString("en-IN")}
                      </p>
                    </div>

                    <div className="flex flex-col gap-2 shrink-0">
                      <button
                        onClick={() => addToCart(product)}
                        className="p-2 bg-wine-900 text-ivory rounded hover:bg-gold hover:text-wine-950 transition-colors"
                        title="Add to Bag"
                        aria-label={`Add ${product.name} to Bag`}
                      >
                        <ShoppingBag className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => toggleWishlist(product.id)}
                        className="p-2 text-muted hover:text-wine-900 transition-colors"
                        title="Remove"
                        aria-label={`Remove ${product.name}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
