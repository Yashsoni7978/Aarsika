"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, X, ShoppingBag, ArrowRight } from "lucide-react";
import { useShop } from "@/context/ShopContext";
import { PRODUCTS } from "@/data/products";
import PearlButton from "./PearlButton";

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, addToCart } = useShop();
  const [query, setQuery] = useState("");

  if (!isSearchOpen) return null;

  const filteredProducts = query.trim() === ""
    ? []
    : PRODUCTS.filter((p) => {
        const q = query.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.type.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          (p.shortDescription && p.shortDescription.toLowerCase().includes(q)) ||
          p.notes.top.some((n) => n.toLowerCase().includes(q)) ||
          p.notes.heart.some((n) => n.toLowerCase().includes(q)) ||
          p.notes.base.some((n) => n.toLowerCase().includes(q))
        );
      });

  const popularTags = ["Rose Attar", "Oud-e-Jaipur", "Saffron", "Eau de Parfum", "Gift Box", "Sandalwood"];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        onClick={() => setIsSearchOpen(false)}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
      />

      <div className="relative min-h-screen flex items-start justify-center pt-16 sm:pt-24 px-4 pb-12 z-10">
        <div className="w-full max-w-3xl bg-[#FFF9F1] border border-[#C49A52]/40 rounded-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
          {/* Input Header */}
          <div className="p-6 bg-[#F8F1E7] border-b border-[#C49A52]/30 flex items-center gap-4">
            <Search className="w-6 h-6 text-[#C49A52]" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by perfume name, notes (Rose, Oud, Saffron), or category..."
              autoFocus
              className="flex-1 bg-transparent text-lg sm:text-xl font-serif text-[#17345F] placeholder-[#756B63]/60 focus:outline-none"
            />
            {query && (
              <button onClick={() => setQuery("")} className="text-xs text-[#756B63] hover:text-[#241C1B]">
                CLEAR
              </button>
            )}
            <button
              onClick={() => setIsSearchOpen(false)}
              className="p-2 text-[#756B63] hover:text-[#B94D70] transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Quick Suggestion Chips */}
          <div className="px-6 py-3 bg-[#FFF9F1] border-b border-[#C49A52]/10 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-[#756B63] uppercase tracking-wider text-[10px] font-semibold mr-2">
              POPULAR SEARCHES:
            </span>
            {popularTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setQuery(tag)}
                className="px-3 py-1 rounded-none bg-[#F6EFE2] border border-[#dccfb6] text-[#1a1411] hover:bg-[#26060d] hover:text-[#F6EFE2] transition-all"
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Results Container */}
          <div className="p-6 max-h-[60vh] overflow-y-auto">
            {query.trim() === "" ? (
              <div className="text-center py-10 text-[#756B63]">
                <p className="text-sm font-serif italic text-lg text-[#17345F]">
                  &ldquo;Fragrance is the invisible garment of royalty.&rdquo;
                </p>
                <p className="text-xs mt-2">Type a perfume name or scent note to discover.</p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-12 text-[#756B63] space-y-2">
                <p className="font-serif text-xl text-[#17345F]">No fragrances found for &ldquo;{query}&rdquo;</p>
                <p className="text-xs">Try searching for &ldquo;Rose&rdquo;, &ldquo;Attar&rdquo;, &ldquo;Oud&rdquo;, or &ldquo;Saffron&rdquo;.</p>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-xs uppercase tracking-wider text-[#756B63] font-semibold mb-3">
                  FOUND {filteredProducts.length} FRAGRANCE(S)
                </p>
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between p-4 bg-[#F8F1E7]/70 border border-[#C49A52]/20 rounded-md hover:border-[#C49A52] transition-all"
                  >
                    <Link
                      href={`/products/${product.slug}`}
                      onClick={() => setIsSearchOpen(false)}
                      className="flex items-center gap-4 flex-1"
                    >
                      <div className="relative w-16 h-20 bg-white rounded overflow-hidden shrink-0 border border-[#C49A52]/20">
                        <Image src={product.mainImage} alt={product.name} fill className="object-cover" />
                      </div>
                      <div>
                        <h4 className="font-serif text-lg font-bold text-[#30070D] hover:text-[#9D6A26]">
                          {product.name}
                        </h4>
                        <p className="text-xs text-[#756B63]">{product.type} • {product.defaultSize}</p>
                        <p className="text-[11px] text-[#C49A52] mt-1 italic">
                          Notes: {product.notes.top.join(", ")}
                        </p>
                      </div>
                    </Link>

                    <div className="flex items-center gap-4 pl-4 border-l border-[#C49A52]/20">
                      <span className="font-serif font-bold text-base text-[#241C1B]">
                        ₹ {product.price.toLocaleString("en-IN")}
                      </span>
                      <PearlButton
                        onClick={() => {
                          addToCart(product);
                          setIsSearchOpen(false);
                        }}
                        variant="burgundy"
                        size="sm"
                        leftIcon={<ShoppingBag className="w-3.5 h-3.5 text-[#C69A45]" />}
                      >
                        BAG
                      </PearlButton>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
