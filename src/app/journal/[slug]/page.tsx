"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { JOURNAL_ARTICLES } from "@/data/journal";
import { PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { ArrowLeft, Clock, Calendar, User } from "lucide-react";

interface JournalPageProps {
  params: {
    slug: string;
  };
}

export default function JournalArticlePage({ params }: JournalPageProps) {
  const article = JOURNAL_ARTICLES.find((a) => a.slug === params.slug || a.id === params.slug);

  if (!article) {
    return (
      <div className="py-32 text-center space-y-4 bg-ivory min-h-screen">
        <h1 className="font-serif text-3xl text-wine-900 font-normal">Article Not Found</h1>
        <Link href="/journal" className="text-xs tracking-wider uppercase text-gold-deep border-b border-gold hover:text-wine-900">
          Return to Journal
        </Link>
      </div>
    );
  }

  const relatedProducts = PRODUCTS.filter((p) =>
    article.relatedProductSlugs?.includes(p.slug) || article.relatedProductSlugs?.includes(p.id)
  );

  return (
    <div className="bg-ivory min-h-screen pt-28 pb-20 text-ink">
      <div className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-12 space-y-10">
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
              <Link href="/journal" className="hover:text-wine-900 transition-colors">
                Journal
              </Link>
            </li>
            <li className="text-gold/60">/</li>
            <li className="text-wine-900 font-medium truncate max-w-[200px]" aria-current="page">
              {article.title}
            </li>
          </ol>
        </nav>

        {/* Back Link */}
        <Link
          href="/journal"
          className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-gold-deep hover:text-wine-900 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Journal</span>
        </Link>

        {/* Header */}
        <div className="space-y-4 text-center">
          <div className="inline-flex items-center justify-center gap-3">
            <span className="h-[1px] w-8 bg-gold" />
            <span className="text-[11px] tracking-[0.3em] uppercase text-gold-deep font-semibold">
              {article.category}
            </span>
            <span className="h-[1px] w-8 bg-gold" />
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-wine-900 leading-tight">
            {article.title}
          </h1>
          <p className="font-serif italic text-lg sm:text-xl text-muted max-w-2xl mx-auto">
            {article.subtitle}
          </p>

          <div className="pt-3 flex items-center justify-center gap-6 text-[11px] tracking-[0.2em] text-gold-deep uppercase">
            <span className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-gold" />
              <span>{article.author}</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-gold" />
              <span>{article.date}</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-gold" />
              <span>{article.readTime}</span>
            </span>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-gold/30 shadow-soft">
          <Image
            src={article.mainImage}
            alt={article.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 80vw"
            className="object-cover filter contrast-[1.03]"
          />
        </div>

        {/* Body Paragraphs */}
        <div className="max-w-none text-sm sm:text-base text-muted leading-relaxed space-y-6 pt-2">
          {article.content.map((paragraph, index) => (
            <p key={index} className="first-letter:text-4xl first-letter:font-serif first-letter:font-normal first-letter:text-wine-900 first-letter:mr-2 first-letter:float-left">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="pt-12 border-t border-gold/25 space-y-6">
            <div className="text-center space-y-1">
              <span className="text-[10px] tracking-[0.25em] text-gold-deep uppercase font-semibold">
                Featured in This Essay
              </span>
              <h3 className="font-serif text-2xl text-wine-900 font-normal">Related Fragrances</h3>
            </div>

            <div className="flex flex-wrap justify-center gap-6 max-w-2xl mx-auto">
              {relatedProducts.map((product) => (
                <div key={product.id} className="w-full sm:w-[calc(50%-12px)] flex justify-center">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
