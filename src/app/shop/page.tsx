"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "ALL";

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [activeFamily, setActiveFamily] = useState("ALL");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc">("featured");

  const categories = [
    { id: "ALL", label: "ALL CREATIONS" },
    { id: "EAU DE PARFUM", label: "EAU DE PARFUM" },
    { id: "ATTAR", label: "ATTAR OILS" },
    { id: "OUD", label: "OUD COLLECTION" },
    { id: "GIFTING", label: "GIFT CHESTS" },
    { id: "DISCOVERY SETS", label: "DISCOVERY SETS" },
  ];

  const families = [
    { id: "ALL", label: "All Families" },
    { id: "FLORAL", label: "Floral" },
    { id: "WOODY", label: "Woody" },
    { id: "SPICY", label: "Spicy" },
    { id: "MUSKY", label: "Musky" },
    { id: "OUD", label: "Oud" },
  ];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      if (activeCategory !== "ALL" && product.category !== activeCategory) {
        return false;
      }
      if (activeFamily !== "ALL" && product.fragranceFamily !== activeFamily) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      return 0;
    });
  }, [activeCategory, activeFamily, sortBy]);

  return (
    <div className="bg-[#F6EFE2] min-h-screen text-[#1a1411] pt-28 pb-24 font-sans">
      {/* Header Banner */}
      <section className="px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto text-center space-y-4 pb-12 border-b border-[#dccfb6]">
        <span className="eyebrow-label text-[#8a6a22]">THE COLLECTION</span>
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#1a1411] font-light">
          Fine Fragrances & Attars
        </h1>
        <p className="text-[#6b5f55] text-sm sm:text-base font-light max-w-xl mx-auto">
          Explore our complete olfactive repertoire—crafted with rare natural botanicals, pure attar oils, aged oud, and luxury gift sets.
        </p>
      </section>

      {/* Filter & Sort Bar */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-8 space-y-6">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 text-xs font-mono uppercase tracking-wider transition-all ${
                activeCategory === cat.id
                  ? "bg-[#26060d] text-[#F6EFE2] border border-[#26060d]"
                  : "bg-white text-[#1a1411] border border-[#dccfb6] hover:border-[#C9A55C]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Secondary Filter & Sort Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#dccfb6]/60 text-xs">
          <div className="flex items-center gap-3">
            <span className="eyebrow-label text-[10px] text-[#6b5f55]">FAMILY:</span>
            <select
              value={activeFamily}
              onChange={(e) => setActiveFamily(e.target.value)}
              className="bg-white border border-[#dccfb6] px-3 py-1.5 font-mono text-xs text-[#1a1411] focus:outline-none focus:border-[#C9A55C]"
            >
              {families.map((fam) => (
                <option key={fam.id} value={fam.id}>
                  {fam.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-3">
            <span className="eyebrow-label text-[10px] text-[#6b5f55]">SORT BY:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white border border-[#dccfb6] px-3 py-1.5 font-mono text-xs text-[#1a1411] focus:outline-none focus:border-[#C9A55C]"
            >
              <option value="featured">Featured Order</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center space-y-3 bg-white border border-[#dccfb6]">
            <h3 className="font-serif text-2xl text-[#1a1411] font-light">
              No creations found
            </h3>
            <p className="text-xs font-mono text-[#6b5f55]">
              Try adjusting your category or fragrance family filter.
            </p>
            <button
              onClick={() => {
                setActiveCategory("ALL");
                setActiveFamily("ALL");
              }}
              className="mt-2 px-4 py-2 border border-[#1a1411] text-xs font-mono uppercase tracking-wider text-[#1a1411] hover:bg-[#26060d] hover:text-[#F6EFE2]"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="py-32 text-center text-xs font-mono">Loading Collection...</div>}>
      <ShopContent />
    </Suspense>
  );
}
