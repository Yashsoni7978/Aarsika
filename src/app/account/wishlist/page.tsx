"use client";

import React from "react";
import Link from "next/link";
import { PRODUCTS } from "@/data/products";
import { useShop } from "@/context/ShopContext";
import { ProductCard } from "@/components/ProductCard";
import { Heart, ArrowRight } from "lucide-react";
import PearlButton from "@/components/PearlButton";

export default function AccountWishlistPage() {
  const { wishlist } = useShop();

  const wishlistProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="bg-ivory min-h-screen pt-28 pb-20 text-ink">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-center">
          <ol className="inline-flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase text-muted">
            <li>
              <Link href="/" className="hover:text-wine-900 transition-colors">
                Home
              </Link>
            </li>
            <li className="text-gold/60">/</li>
            <li>
              <Link href="/account" className="hover:text-wine-900 transition-colors">
                Account
              </Link>
            </li>
            <li className="text-gold/60">/</li>
            <li className="text-wine-900 font-medium" aria-current="page">
              Wishlist
            </li>
          </ol>
        </nav>

        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center gap-3">
            <span className="h-[1px] w-8 bg-gold" />
            <span className="text-[11px] tracking-[0.3em] uppercase text-gold-deep font-semibold">
              Saved Creations
            </span>
            <span className="h-[1px] w-8 bg-gold" />
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-normal text-wine-900 tracking-wide">
            Your Wishlist ({wishlistProducts.length})
          </h1>
          <p className="text-sm text-muted max-w-md mx-auto leading-relaxed">
            Your saved royal fragrance selections preserved for future acquisitions.
          </p>
        </div>

        {wishlistProducts.length === 0 ? (
          <div className="bg-cream border border-gold/30 rounded-2xl p-12 sm:p-16 text-center space-y-4 max-w-xl mx-auto shadow-soft">
            <Heart className="w-10 h-10 text-gold fill-gold/20 mx-auto" />
            <h2 className="font-serif text-2xl text-wine-900">Your Wishlist is Empty</h2>
            <p className="text-sm text-muted">
              Explore our master collection and click the heart icon on any flacon to save it here.
            </p>
            <div className="pt-2 flex justify-center">
              <Link href="/shop">
                <PearlButton variant="primary">
                  <span className="flex items-center gap-2">
                    <span>Explore Fragrances</span>
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </PearlButton>
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            {wishlistProducts.map((product) => (
              <div
                key={product.id}
                className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] xl:max-w-[390px] flex justify-center"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
