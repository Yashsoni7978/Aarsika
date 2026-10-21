"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

export default function BestsellersPage() {
  const bestsellers = PRODUCTS.filter((p) => p.isBestseller || p.rating >= 4.8);

  return (
    <div className="bg-ivory min-h-screen text-ink pt-24 pb-20 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Breadcrumb Navigation */}
        <div className="text-xs font-mono tracking-widest text-muted uppercase space-x-2">
          <Link href="/" className="hover:text-ink">
            HOME
          </Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-ink">
            COLLECTION
          </Link>
          <span>/</span>
          <span className="text-ink font-medium">BEST SELLERS</span>
        </div>

        {/* Luxury Architectural Header Banner */}
        <section className="bg-cream border border-gold/30 rounded-2xl p-6 sm:p-10 lg:p-12 shadow-soft relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <span className="h-[1px] w-8 bg-gold" />
                <span className="text-[11px] font-mono tracking-[0.35em] text-gold-deep uppercase">
                  AARSIKA CATEGORY
                </span>
                <span className="text-gold text-xs">❖</span>
              </div>

              <div className="space-y-2">
                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-ink font-normal leading-tight">
                  Royal Bestsellers
                </h1>
                <p className="font-serif italic text-lg sm:text-xl text-muted">
                  Most acclaimed creations chosen by our fragrance patrons.
                </p>
              </div>

              <p className="text-xs sm:text-sm text-muted max-w-lg font-light leading-relaxed">
                The most acclaimed attars, eau de parfums, and rare agarwood decanters renowned for their exceptional presence and longevity.
              </p>
            </div>

            {/* Right Architectural Image Frame */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-md aspect-[16/10] sm:aspect-[4/3] rounded-tl-[80px] rounded-br-[40px] overflow-hidden border-2 border-gold/40 shadow-md group bg-sand">
                <Image
                  src="/images/split story bg.webp"
                  alt="Aarsika Royal Bestsellers"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-wine-950/40 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        </section>

        {/* Results Bar */}
        <section className="flex items-center justify-between border-b border-gold/20 pb-4 text-xs font-mono">
          <div className="text-muted">
            SHOWING <span className="font-semibold text-ink">{bestsellers.length}</span> CREATIONS
          </div>

          <Link
            href="/shop"
            className="text-xs font-mono tracking-widest text-gold-deep hover:text-wine-900 uppercase transition-colors"
          >
            VIEW ALL CREATIONS →
          </Link>
        </section>

        {/* Product Grid - Centered Remainder Layout */}
        <section>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            {bestsellers.map((product) => (
              <div
                key={product.id}
                className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] xl:max-w-[390px] flex"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
