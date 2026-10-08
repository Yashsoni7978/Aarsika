"use client";

import React from "react";
import Link from "next/link";
import { PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { Photo } from "@/components/Photo";
import { Flame, Shield } from "lucide-react";

export default function OudCategoryPage() {
  const ouds = PRODUCTS.filter(
    (p) => p.category === "OUD" || p.type.toLowerCase().includes("oud")
  );

  return (
    <div className="bg-[#F6EFE2] min-h-screen text-[#1a1411] font-sans">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-[#26060d] text-[#F6EFE2] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="eyebrow-label text-[#E7CF98]">
              AGED AGARWOOD VAULT
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight text-[#F6EFE2] leading-tight">
              THE OUD COLLECTION.
            </h1>
            <p className="text-sm sm:text-base text-[#F6EFE2]/80 max-w-xl font-light leading-relaxed">
              Rare wild-harvested Assam and Cambodian agarwood resins aged to reveal dark smoked notes, frankincense, and deep amber warmth.
            </p>
            <div className="pt-2 flex items-center gap-6 text-xs font-mono tracking-[0.2em] text-[#E7CF98]">
              <span className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-[#C9A55C]" />
                <span>AGED AGARWOOD RESIN</span>
              </span>
              <span className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#C9A55C]" />
                <span>24+ HR LONGEVITY</span>
              </span>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <Photo
              slot="collection-oud"
              alt="Aarsika Oud Collection"
              aspect="3/4"
              shape="arch"
              priority
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="shadow-2xl border border-[#C9A55C]/30"
            />
          </div>
        </div>
      </section>

      {/* Oud Products Grid */}
      <section className="py-16 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-8">
        <div className="flex items-center justify-between border-b border-[#dccfb6] pb-4">
          <span className="eyebrow-label text-[#8a6a22]">
            OUD CREATIONS ({ouds.length})
          </span>
          <Link
            href="/shop"
            className="eyebrow-label text-xs text-[#1a1411] hover:text-[#8b1a2b]"
          >
            VIEW ALL CREATIONS →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ouds.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
