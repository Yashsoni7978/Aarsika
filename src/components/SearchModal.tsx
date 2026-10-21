"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, X, ShoppingBag } from "lucide-react";
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

  const popularTags = ["Rose Attar", "Amour", "Saffron", "Eau de Parfum", "Gift Box", "Sandalwood", "Resham Oudh"];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        onClick={() => setIsSearchOpen(false)}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
      />

      <div className="relative min-h-screen flex items-start justify-center pt-16 sm:pt-24 px-4 pb-12 z-10">
        <div className="w-full max-w-3xl bg-cream border border-gold/40 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
          {/* Input Header */}
          <div className="p-6 bg-ivory border-b border-gold/30 flex items-center gap-4">
            <Search className="w-6 h-6 text-gold" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search perfumes, notes, or categories..."
              autoFocus
              className="flex-1 bg-transparent text-base sm:text-xl font-serif text-ink placeholder-muted/60 focus:outline-none"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="text-xs font-mono uppercase text-muted hover:text-wine-900"
              >
                CLEAR
              </button>
            )}
            <button
              onClick={() => setIsSearchOpen(false)}
              className="p-2 text-muted hover:text-wine-900 transition-colors"
              aria-label="Close search"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Quick Suggestion Chips (Same Pill Style as Filter Chips) */}
          <div className="px-6 py-4 bg-cream border-b border-gold/15 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-muted uppercase tracking-wider text-[10px] font-mono font-semibold mr-1">
              POPULAR SEARCHES:
            </span>
            {popularTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setQuery(tag)}
                className="px-3.5 py-1 rounded-full text-xs font-mono tracking-wider transition-all duration-300 bg-transparent text-muted border border-line hover:border-wine-900 hover:text-wine-900"
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Results Container */}
          <div className="p-6 max-h-[60vh] overflow-y-auto">
            {query.trim() === "" ? (
              <div className="text-center py-10 text-muted space-y-2">
                <p className="font-serif italic text-lg sm:text-xl text-ink">
                  &ldquo;Fragrance is the invisible garment of royalty.&rdquo;
                </p>
                <p className="text-xs font-mono text-muted">Type a fragrance name, olfactive note, or family to search.</p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-12 text-muted space-y-2">
                <p className="font-serif text-xl text-wine-900">No fragrances found for &ldquo;{query}&rdquo;</p>
                <p className="text-xs font-mono text-muted">Try searching for &ldquo;Rose&rdquo;, &ldquo;Attar&rdquo;, &ldquo;Oud&rdquo;, or &ldquo;Saffron&rdquo;.</p>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-xs uppercase tracking-wider text-muted font-mono font-semibold mb-3">
                  FOUND {filteredProducts.length} CREATION(S)
                </p>
                {filteredProducts.map((product) => {
                  const itemImg = product.mainImage && product.mainImage !== 'placeholder'
                    ? product.mainImage
                    : '/photos/attars/sehar-e-gulab.jpg';

                  return (
                    <div
                      key={product.id}
                      className="flex items-center justify-between p-4 bg-ivory border border-gold/20 rounded-xl hover:border-gold transition-all shadow-xs"
                    >
                      <Link
                        href={`/products/${product.slug}`}
                        onClick={() => setIsSearchOpen(false)}
                        className="flex items-center gap-4 flex-1 min-w-0"
                      >
                        <div className="relative w-16 h-20 bg-sand rounded-lg overflow-hidden shrink-0 border border-gold/20">
                          <Image src={itemImg} alt={product.name} fill className="object-cover" />
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-serif text-lg font-normal text-ink hover:text-wine-900 transition-colors truncate">
                            {product.name}
                          </h4>
                          <p className="text-xs text-muted font-light">{product.type} • {product.defaultSize}</p>
                          <p className="text-[11px] text-gold-deep mt-0.5 italic font-mono truncate">
                            Notes: {product.notes.top.join(", ")}
                          </p>
                        </div>
                      </Link>

                      <div className="flex items-center gap-4 pl-4 border-l border-gold/20 shrink-0">
                        <span className="font-serif font-bold text-base text-ink">
                          ₹ {product.price.toLocaleString("en-IN")}
                        </span>
                        <PearlButton
                          onClick={() => {
                            addToCart(product);
                            setIsSearchOpen(false);
                          }}
                          variant="burgundy"
                          size="sm"
                          leftIcon={<ShoppingBag className="w-3.5 h-3.5 text-gold" />}
                        >
                          BAG
                        </PearlButton>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
