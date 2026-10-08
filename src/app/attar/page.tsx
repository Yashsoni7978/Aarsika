"use client";

import React from "react";
import Link from "next/link";
import { PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { Photo } from "@/components/Photo";
import { Droplet, Clock } from "lucide-react";

export default function AttarCategoryPage() {
  const attars = PRODUCTS.filter(
    (p) => p.category === "ATTAR" || p.type.toLowerCase().includes("attar")
  );

  return (
    <div className="bg-[#F6EFE2] min-h-screen text-[#1a1411] font-sans">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-[#26060d] text-[#F6EFE2] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="eyebrow-label text-[#E7CF98]">
              PURE BOTANICAL CONCENTRATES
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight text-[#F6EFE2] leading-tight">
              THE ART OF ATTAR.
            </h1>
            <p className="text-sm sm:text-base text-[#F6EFE2]/80 max-w-xl font-light leading-relaxed">
              100% alcohol-free botanical perfume oils distilled using traditional copper stills and aged in pure Mysore sandalwood oil. An intimate scent ritual shaped by memory and material.
            </p>
            <div className="pt-2 flex items-center gap-6 text-xs font-mono tracking-[0.2em] text-[#E7CF98]">
              <span className="flex items-center gap-2">
                <Droplet className="w-4 h-4 text-[#C9A55C]" />
                <span>100% ALCOHOL FREE</span>
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#C9A55C]" />
                <span>16+ HR LONGEVITY</span>
              </span>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <Photo
              slot="collection-attar"
              alt="Aarsika Attar Collection"
              aspect="3/4"
              shape="arch"
              priority
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="shadow-2xl border border-[#C9A55C]/30"
            />
          </div>
        </div>
      </section>

      {/* Attar Products Grid */}
      <section className="py-16 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-8">
        <div className="flex items-center justify-between border-b border-[#dccfb6] pb-4">
          <span className="eyebrow-label text-[#8a6a22]">
            ATTAR CREATIONS ({attars.length})
          </span>
          <Link
            href="/shop"
            className="eyebrow-label text-xs text-[#1a1411] hover:text-[#8b1a2b]"
          >
            VIEW ALL CATEGORIES →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {attars.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
