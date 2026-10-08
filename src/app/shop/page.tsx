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
    { id: "ATTAR", label: "ATTAR" },
    { id: "OUD", label: "OUD" },
    { id: "GIFTING", label: "GIFTING" },
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
      <section className="px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto space-y-4 pb-10 border-b border-[#dccfb6]">
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#1a1411] font-light">
          The collection
        </h1>
        <p className="text-[#6b5f55] text-base font-light max-w-xl">
          Explore our complete olfactive repertoire—crafted with rare natural botanicals, pure attar oils, aged oud, and luxury gift sets.
        </p>
      </section>

      {/* Filter Row as Plain Text Links with Underline */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-8 space-y-6">
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3 border-b border-[#dccfb6] pb-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`text-xs font-mono uppercase tracking-[0.2em] transition-all pb-1 border-b ${
                activeCategory === cat.id
                  ? "border-[#C9A55C] text-[#1a1411] font-medium"
                  : "border-transparent text-[#6b5f55] hover:text-[#1a1411]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Secondary Filter & Sort Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center gap-3">
            <span className="text-[10px] text-[#6b5f55] uppercase tracking-widest">FAMILY:</span>
            <select
              value={activeFamily}
              onChange={(e) => setActiveFamily(e.target.value)}
              className="bg-transparent border-b border-[#dccfb6] py-1 text-xs text-[#1a1411] focus:outline-none focus:border-[#C9A55C]"
            >
              {families.map((fam) => (
                <option key={fam.id} value={fam.id}>
                  {fam.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[10px] text-[#6b5f55] uppercase tracking-widest">SORT BY:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent border-b border-[#dccfb6] py-1 text-xs text-[#1a1411] focus:outline-none focus:border-[#C9A55C]"
            >
              <option value="featured">Featured Order</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-4">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center space-y-3">
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
              className="mt-2 text-link-underline text-[#1a1411]"
            >
              Reset Filters →
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
