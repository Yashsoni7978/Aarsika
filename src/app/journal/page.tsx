"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { JOURNAL_ARTICLES } from "@/data/journal";
import { ArrowRight } from "lucide-react";

export default function JournalPage() {
  const [activeCategory, setActiveCategory] = useState("ALL");

  const categories = ["ALL", "OLFACTIVE NOTES", "THE ATELIER", "HERITAGE", "GIFTING"];

  const filteredArticles = activeCategory === "ALL"
    ? JOURNAL_ARTICLES
    : JOURNAL_ARTICLES.filter((a) => a.category.toUpperCase() === activeCategory);

  const featuredArticle = JOURNAL_ARTICLES.find((a) => a.featured) || JOURNAL_ARTICLES[0];
  const displayArticles = activeCategory === "ALL"
    ? filteredArticles.filter((a) => a.id !== featuredArticle.id)
    : filteredArticles;

  return (
    <div className="bg-ivory min-h-screen text-ink pt-24 pb-20 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb Navigation */}
        <div className="text-xs font-mono tracking-widest text-muted uppercase space-x-2">
          <Link href="/" className="hover:text-ink">
            HOME
          </Link>
          <span>/</span>
          <Link href="/our-story" className="hover:text-ink">
            THE HOUSE
          </Link>
          <span>/</span>
          <span className="text-ink font-medium">JOURNAL</span>
        </div>

        {/* Luxury Architectural Header Banner */}
        <section className="bg-cream border border-gold/30 rounded-2xl p-6 sm:p-10 lg:p-12 shadow-soft relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-3">
              <span className="h-[1px] w-8 bg-gold" />
              <span className="text-[11px] font-mono tracking-[0.35em] text-gold-deep uppercase">
                AARSIKA JOURNAL
              </span>
              <span className="text-gold text-xs">❖</span>
            </div>

            <div className="space-y-2">
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-ink font-normal leading-tight">
                The Journal
              </h1>
              <p className="font-serif italic text-lg sm:text-xl text-muted">
                Essays on Rajasthan court olfaction, rare botanicals, and artisanal perfumery.
              </p>
            </div>

            <p className="text-xs sm:text-sm text-muted max-w-lg font-light leading-relaxed">
              Explore the history of royal attars, hydro-distillation traditions of Kannauj, and contemporary fragrance ritual curation.
            </p>
          </div>
        </section>

        {/* Category Filter Chips */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 border-b border-gold/20 pb-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-wine-900 text-ivory shadow-md border border-wine-900"
                  : "bg-transparent text-muted border border-line hover:border-wine-900 hover:text-wine-900"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Essay Card (Only on ALL) */}
        {activeCategory === "ALL" && featuredArticle && (
          <Link
            href={`/journal/${featuredArticle.slug}`}
            className="group grid grid-cols-1 lg:grid-cols-12 gap-8 bg-cream border border-gold/30 rounded-2xl p-6 sm:p-8 hover:border-gold transition-all shadow-soft"
          >
            <div className="lg:col-span-7 relative aspect-[16/10] overflow-hidden rounded-xl border border-gold/20 bg-sand">
              <Image
                src={featuredArticle.mainImage}
                alt={featuredArticle.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>

            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between text-[10px] font-mono tracking-[0.25em] text-gold-deep uppercase">
                  <span>{featuredArticle.category} • FEATURED</span>
                  <span>{featuredArticle.readTime}</span>
                </div>

                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-wine-900 group-hover:text-crimson transition-colors leading-tight font-normal">
                  {featuredArticle.title}
                </h2>

                <p className="text-xs sm:text-sm text-muted font-light leading-relaxed">
                  {featuredArticle.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-gold/20 flex items-center justify-between text-xs font-mono tracking-[0.2em] text-ink">
                <span className="text-muted font-light">{featuredArticle.date}</span>
                <span className="text-gold-deep group-hover:text-wine-900 flex items-center gap-1.5 uppercase font-medium">
                  <span>READ ESSAY</span>
                  <ArrowRight className="w-3.5 h-3.5 stroke-[1.5]" />
                </span>
              </div>
            </div>
          </Link>
        )}

        {/* Editorial Articles Grid - Centered Remainder Layout */}
        <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
          {displayArticles.map((article) => (
            <div
              key={article.id}
              className="w-full sm:w-[calc(50%-16px)] lg:w-[calc(33.333%-22px)] xl:max-w-[390px] flex"
            >
              <Link
                href={`/journal/${article.slug}`}
                className="group w-full bg-cream border border-gold/30 rounded-2xl p-6 flex flex-col justify-between space-y-6 hover:border-gold transition-all shadow-soft"
              >
                <div className="space-y-4">
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-gold/20 bg-sand">
                    <Image
                      src={article.mainImage}
                      alt={article.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>

                  <div className="flex items-center justify-between text-[10px] font-mono tracking-[0.25em] text-gold-deep uppercase">
                    <span>{article.category}</span>
                    <span>{article.readTime}</span>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl text-wine-900 group-hover:text-crimson transition-colors leading-snug font-normal line-clamp-2">
                    {article.title}
                  </h3>

                  <p className="text-xs text-muted font-light line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-gold/20 flex items-center justify-between text-[10px] font-mono tracking-[0.2em] uppercase">
                  <span className="text-muted">{article.date}</span>
                  <span className="text-gold-deep group-hover:text-wine-900 flex items-center gap-1 font-medium">
                    <span>READ</span>
                    <ArrowRight className="w-3 h-3 stroke-[1.5]" />
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
