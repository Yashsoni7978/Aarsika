"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

export default function NewArrivalsPage() {
  const newArrivals = PRODUCTS.filter((p) => p.isNew || p.id === "p1" || p.id === "p2" || p.id === "p6");

  return (
    <div className="bg-ivory min-h-screen text-ink">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 space-y-10">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb">
          <ol className="inline-flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase text-muted">
            <li>
              <Link href="/" className="hover:text-wine-900 transition-colors">
                Home
              </Link>
            </li>
            <li className="text-gold/60">/</li>
            <li>
              <span className="text-muted">Collection</span>
            </li>
            <li className="text-gold/60">/</li>
            <li className="text-wine-900 font-medium" aria-current="page">
              New Arrivals
            </li>
          </ol>
        </nav>

        {/* Unified Architectural Header Banner */}
        <section className="relative overflow-hidden rounded-2xl border border-gold/30 bg-cream p-8 sm:p-12 shadow-soft">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-3">
              <span className="h-[1px] w-8 bg-gold" />
              <span className="text-[11px] tracking-[0.3em] uppercase text-gold-deep font-semibold">
                Aarsika Category
              </span>
              <span className="text-xs text-gold">◆</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-wide text-wine-900">
              New Arrivals
            </h1>

            <p className="text-sm sm:text-base text-muted max-w-xl leading-relaxed">
              Newly aged attars, fresh monsoon harvest rose extracts, and limited batch agarwood formulations.
            </p>
          </div>
        </section>

        {/* Product Grid - Centered Remainder Layout */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xs tracking-[0.2em] text-gold-deep uppercase font-semibold">
              {newArrivals.length} Recent Creations
            </span>
            <Link
              href="/shop"
              className="text-xs tracking-[0.2em] text-wine-900 font-medium hover:text-gold transition-colors"
            >
              View All Shop →
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            {newArrivals.map((product) => (
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
