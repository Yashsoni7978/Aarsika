"use client";

import React from "react";
import Link from "next/link";
import { PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import ResponsivePhoto from "@/components/ResponsivePhoto";
import { Sparkles, Wind } from "lucide-react";

export default function PerfumesCategoryPage() {
  const perfumes = PRODUCTS.filter(
    (p) => p.category === "EAU DE PARFUM" || p.type.toLowerCase().includes("parfum")
  );

  return (
    <div className="bg-[#F6EFE2] min-h-screen text-[#1a1411] font-sans">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-[#26060d] text-[#F6EFE2] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="eyebrow-label text-[#E7CF98]">
              FINE SPRAY EXTRAITS
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight text-[#F6EFE2] leading-tight">
              EAU DE PARFUM.
            </h1>
            <p className="text-sm sm:text-base text-[#F6EFE2]/80 max-w-xl font-light leading-relaxed">
              High-concentration Eau de Parfum formulations blending rich natural botanical absolutes with precision micro-atomizer diffusion for expansive sillage.
            </p>
            <div className="pt-2 flex items-center gap-6 text-xs font-mono tracking-[0.2em] text-[#E7CF98]">
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#C9A55C]" />
                <span>25% EXTRAIT STRENGTH</span>
              </span>
              <span className="flex items-center gap-2">
                <Wind className="w-4 h-4 text-[#C9A55C]" />
                <span>EXPANSIVE SILLAGE</span>
              </span>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center w-full">
            <ResponsivePhoto
              slot="collection-eau-de-parfum"
              alt="Aarsika Eau de Parfum Collection"
              aspect="3/4"
              shape="arch"
              priority
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="shadow-2xl border border-[#C9A55C]/30 max-w-md"
            />
          </div>
        </div>
      </section>

      {/* Perfumes Products Grid */}
      <section className="py-16 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-8">
        <div className="flex items-center justify-between border-b border-[#dccfb6] pb-4">
          <span className="eyebrow-label text-[#8a6a22]">
            PARFUM CREATIONS ({perfumes.length})
          </span>
          <Link
            href="/shop"
            className="eyebrow-label text-xs text-[#1a1411] hover:text-[#8b1a2b]"
          >
            VIEW ALL CREATIONS →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {perfumes.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
