"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PearlButton from "@/components/PearlButton";

export default function HeritagePage() {
  return (
    <div className="bg-ivory min-h-screen text-ink">
      {/* Hero */}
      <section className="pt-28 pb-16 bg-wine-900 text-cream text-center space-y-4 border-b border-gold/30">
        <div className="max-w-4xl mx-auto px-6 space-y-3">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="pb-2">
            <ol className="inline-flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase text-gold-light/80">
              <li>
                <Link href="/" className="hover:text-cream transition-colors">
                  Home
                </Link>
              </li>
              <li className="text-gold/60">/</li>
              <li>
                <Link href="/our-story" className="hover:text-cream transition-colors">
                  The House
                </Link>
              </li>
              <li className="text-gold/60">/</li>
              <li className="text-gold-light font-medium" aria-current="page">
                Heritage
              </li>
            </ol>
          </nav>

          <div className="inline-flex items-center justify-center gap-3">
            <span className="h-[1px] w-8 bg-gold" />
            <span className="text-[11px] tracking-[0.35em] text-gold-light uppercase font-semibold">
              Royal Rajasthan Archives
            </span>
            <span className="h-[1px] w-8 bg-gold" />
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-wide text-cream">
            Heritage of the Royal Courts
          </h1>
          <p className="text-sm text-cream/80 max-w-xl mx-auto font-light leading-relaxed">
            Centuries of scent rituals in Jaipur, Amber, and Kannauj—where fragrance was woven into court etiquette, poetry, and royal architecture.
          </p>
        </div>
      </section>

      {/* Main Narrative */}
      <section className="py-16 sm:py-20 max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 space-y-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-[10px] tracking-[0.3em] text-gold-deep uppercase font-semibold">
              The Architectural Threshold
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-wine-900">
              Architectural Harmony
            </h2>
            <p className="text-sm text-muted leading-relaxed">
              In Rajput and Mughal architecture, the ornamental archway represents a sacred threshold—a gateway separating the outer courtyard from the intimate royal inner sanctum.
            </p>
            <p className="text-sm text-muted leading-relaxed">
              In perfumery, our fragrances serve the exact same purpose: a sensory threshold transporting the wearer into moments of serenity, grace, and regal grandeur.
            </p>
          </div>

          <div className="lg:col-span-6">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-gold/30 shadow-soft">
              <Image
                src="/images/heritage with ingrediants.webp"
                alt="Aarsika Royal Heritage"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover filter contrast-[1.03]"
              />
            </div>
          </div>
        </div>

        {/* Historical Court Rituals */}
        <div className="bg-cream border border-gold/30 p-8 sm:p-12 rounded-2xl shadow-soft space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[10px] tracking-[0.3em] text-gold-deep uppercase font-semibold">
              Court Perfumery Rituals
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-wine-900">
              The Fragrant Royal Day
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center text-xs">
            <div className="p-6 bg-ivory rounded-xl border border-gold/20 space-y-2">
              <h4 className="font-serif text-base font-medium text-wine-900">Morning Itra-Dan</h4>
              <p className="text-xs text-muted">Silver and crystal vials of rose and kewra attar offered to court guests as tokens of honor.</p>
            </div>
            <div className="p-6 bg-ivory rounded-xl border border-gold/20 space-y-2">
              <h4 className="font-serif text-base font-medium text-wine-900">Palace Fountains</h4>
              <p className="text-xs text-muted">Court fountains infused with rose water to cool afternoon breezes passing into jharokha balconies.</p>
            </div>
            <div className="p-6 bg-ivory rounded-xl border border-gold/20 space-y-2">
              <h4 className="font-serif text-base font-medium text-wine-900">Evening Oud Incense</h4>
              <p className="text-xs text-muted">Smoked agarwood and frankincense burned in brass censers as dusk descended over fortress walls.</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link href="/shop">
            <PearlButton variant="primary">
              <span className="flex items-center gap-2">
                <span>Explore Royal Heritage Collection</span>
                <ArrowRight className="w-4 h-4" />
              </span>
            </PearlButton>
          </Link>
        </div>
      </section>
    </div>
  );
}
