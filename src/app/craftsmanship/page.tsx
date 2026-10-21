"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PearlButton from "@/components/PearlButton";

export default function CraftsmanshipPage() {
  return (
    <div className="bg-ivory min-h-screen text-ink">
      {/* Hero */}
      <section className="pt-28 pb-16 bg-wine-900 text-cream overflow-hidden text-center border-b border-gold/30">
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
                Craftsmanship
              </li>
            </ol>
          </nav>

          <div className="inline-flex items-center justify-center gap-3">
            <span className="h-[1px] w-8 bg-gold" />
            <span className="text-[11px] tracking-[0.35em] text-gold-light uppercase font-semibold">
              Royal Heritage Distillation
            </span>
            <span className="h-[1px] w-8 bg-gold" />
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-wide text-cream leading-tight">
            Crafted by Hand. <br />
            <span className="italic text-gold-light">Made to Be Remembered.</span>
          </h1>
          <p className="text-sm text-cream/80 max-w-xl mx-auto font-light leading-relaxed">
            From dawn blossom gathering in Rajasthan to copper hydro-distillation in Kannauj and hand-bottling in crystal flacons.
          </p>
        </div>
      </section>

      {/* Main Process Narrative */}
      <section className="py-16 sm:py-20 max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 space-y-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-gold/30 shadow-soft">
            <Image
              src="/images/artist bottle filling.webp"
              alt="Master Perfumer hand-filling flacons"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover filter contrast-[1.03]"
            />
          </div>

          <div className="space-y-6">
            <span className="text-[10px] tracking-[0.3em] text-gold-deep uppercase font-semibold">
              The Four Pillars
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-wine-900">
              Traditional Deg-Bhapka Method
            </h2>
            <div className="space-y-4 text-xs text-muted leading-relaxed">
              <div className="p-5 bg-cream rounded-xl border border-gold/25 space-y-1">
                <h4 className="font-serif font-medium text-base text-wine-900">1. Harvesting at Dawn</h4>
                <p>Damask roses and night jasmines are hand-picked at dawn before the sun dissipates fragile essential aroma oils.</p>
              </div>
              <div className="p-5 bg-cream rounded-xl border border-gold/25 space-y-1">
                <h4 className="font-serif font-medium text-base text-wine-900">2. Copper Still Distillation</h4>
                <p>Fresh petals are submerged in copper degs sealed with clay mud and heated gently over wood fires.</p>
              </div>
              <div className="p-5 bg-cream rounded-xl border border-gold/25 space-y-1">
                <h4 className="font-serif font-medium text-base text-wine-900">3. Sandalwood Binding</h4>
                <p>Aromatic vapors pass through bamboo pipes into receivers containing pure Mysore sandalwood oil.</p>
              </div>
              <div className="p-5 bg-cream rounded-xl border border-gold/25 space-y-1">
                <h4 className="font-serif font-medium text-base text-wine-900">4. Vault Aging</h4>
                <p>Attars are aged in camel-leather kuppi containers under Rajasthan sunlight to mature into deep complexity.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Visual Spotlight */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center bg-cream border border-gold/30 p-8 sm:p-12 rounded-2xl shadow-soft">
          <div className="space-y-4">
            <span className="text-[10px] tracking-[0.3em] text-gold-deep uppercase font-semibold">
              Rigorous Quality
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-wine-900">
              Hand-Bottling &amp; Sealing
            </h3>
            <p className="text-sm text-muted leading-relaxed">
              Every single bottle of Aarsika attar is hand-poured using glass pipettes into gold-trimmed crystal flacons, inspected for clarity, and sealed with custom engraved brass caps.
            </p>
            <div className="pt-2">
              <Link href="/shop">
                <PearlButton variant="primary">
                  <span className="flex items-center gap-2">
                    <span>Explore Handcrafted Creations</span>
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </PearlButton>
              </Link>
            </div>
          </div>

          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-gold/20 shadow-soft">
            <Image
              src="/images/craftsmanship.jpg"
              alt="Copper deg distillation stills"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
