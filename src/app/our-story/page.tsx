"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, Droplets, Compass } from "lucide-react";
import PearlButton from "@/components/PearlButton";

export default function OurStoryPage() {
  return (
    <div className="bg-ivory min-h-screen text-ink pt-24 pb-20 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb Navigation */}
        <div className="text-xs font-mono tracking-widest text-muted uppercase space-x-2">
          <Link href="/" className="hover:text-ink">
            HOME
          </Link>
          <span>/</span>
          <span className="text-muted">THE HOUSE</span>
          <span>/</span>
          <span className="text-ink font-medium">OUR STORY</span>
        </div>

        {/* Luxury Architectural Header Banner */}
        <section className="bg-cream border border-gold/30 rounded-2xl p-6 sm:p-10 lg:p-12 shadow-soft relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-3">
                <span className="h-[1px] w-8 bg-gold" />
                <span className="text-[11px] font-mono tracking-[0.35em] text-gold-deep uppercase">
                  OUR STORY &amp; HERITAGE
                </span>
                <span className="text-gold text-xs">❖</span>
              </div>

              <div className="space-y-2">
                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-ink font-normal leading-tight">
                  The Art of Royal Perfumery
                </h1>
                <p className="font-serif italic text-lg sm:text-xl text-muted">
                  A contemporary tribute to India&apos;s century-old fragrance archives and Rajasthan&apos;s regal traditions.
                </p>
              </div>

              <p className="text-xs sm:text-sm text-muted max-w-lg font-light leading-relaxed">
                Founded in Jaipur, Aarsika curates small-batch pure attars and high-concentration eau de parfums crafted with rare botanicals, Kannauj hydro-distillation, and contemporary artistry.
              </p>
            </div>

            {/* Right Architectural Image Frame */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-md aspect-[16/10] sm:aspect-[4/3] rounded-tl-[80px] rounded-br-[40px] overflow-hidden border-2 border-gold/40 shadow-md group">
                <Image
                  src="/images/split story bg.webp"
                  alt="Aarsika Royal Heritage and Palace Architecture"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-wine-950/40 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        </section>

        {/* Origin Section */}
        <section className="py-8 max-w-6xl mx-auto space-y-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-[10px] tracking-[0.3em] text-gold-deep uppercase font-mono">
                THE INSPIRATION
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-ink leading-tight">
                Born in the Pink City
              </h2>
              <p className="text-xs sm:text-sm text-muted font-light leading-relaxed">
                Aarsika was founded with a singular vision: to elevate India&apos;s authentic attar traditions into the world of contemporary luxury fragrance. Inspired by the architectural archways and heritage courtyards of Rajasthan&apos;s royal palaces, our creations serve as gateways to olfactory memories.
              </p>
              <p className="text-xs sm:text-sm text-muted font-light leading-relaxed">
                Each flacon captures the soul of Jaipur—sun-warmed sandstone courtyards, velvet Damask rose petals, golden Kashmir saffron, and pure Mysore sandalwood.
              </p>
            </div>

            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border-2 border-gold/30 shadow-md">
              <Image
                src="/images/heritage with ingrediants.webp"
                alt="Aarsika Jaipur Heritage & Royal Ingredients"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover filter contrast-[1.03]"
                loading="lazy"
              />
            </div>
          </div>

          {/* Full-width Visual Section */}
          <div className="relative aspect-[16/7] w-full overflow-hidden rounded-2xl border border-gold/30 my-16 shadow-soft">
            <Image
              src="/images/artist bottle filling.webp"
              alt="Master Perfumer filling crystal flacons"
              fill
              sizes="100vw"
              className="object-cover filter contrast-[1.03]"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-wine-950/80 via-transparent to-transparent flex items-end p-8 sm:p-12">
              <span className="font-serif text-2xl sm:text-4xl text-ivory font-light italic">
                &ldquo;In every drop lies the memory of a thousand blossoms.&rdquo;
              </span>
            </div>
          </div>

          {/* Artisanal Deg-Bhapka Distillation */}
          <div id="craft" className="bg-cream border border-gold/30 rounded-2xl p-8 sm:p-12 space-y-8 shadow-soft">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-[10px] tracking-[0.3em] text-gold-deep uppercase font-mono">
                THE CRAFT
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal text-ink">
                Traditional Hydro-distillation
              </h2>
              <p className="text-xs sm:text-sm text-muted font-light leading-relaxed">
                We preserve ancient <em>deg-bhapka</em> copper still distillation methods where flower blossoms are harvested at dawn and gently boiled over wood fires into pure sandalwood oil receivers.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center text-xs">
              <div className="p-6 bg-ivory border border-gold/20 rounded-xl space-y-2">
                <Droplets className="w-5 h-5 text-gold mx-auto" />
                <h4 className="font-serif text-lg font-normal text-ink">Dawn Harvest</h4>
                <p className="text-muted font-light">Rose and jasmine blossoms gathered at first dawn light to retain peak essential oil potency.</p>
              </div>

              <div className="p-6 bg-ivory border border-gold/20 rounded-xl space-y-2">
                <Sparkles className="w-5 h-5 text-gold mx-auto" />
                <h4 className="font-serif text-lg font-normal text-ink">Copper Deg Stills</h4>
                <p className="text-muted font-light">Natural steam vapors travel through bamboo pipes into sandalwood oil receivers without synthetic solvents.</p>
              </div>

              <div className="p-6 bg-ivory border border-gold/20 rounded-xl space-y-2">
                <Compass className="w-5 h-5 text-gold mx-auto" />
                <h4 className="font-serif text-lg font-normal text-ink">Maturation</h4>
                <p className="text-muted font-light">Aged in camel leather kuppi containers under Rajasthan sunlight to harmonize natural scent notes.</p>
              </div>
            </div>
          </div>

          {/* CTA Pill */}
          <div className="text-center pt-8">
            <PearlButton
              href="/shop"
              variant="burgundy"
              size="lg"
              rightIcon={<ArrowRight className="w-4 h-4 text-gold" />}
            >
              EXPERIENCE THE COLLECTION
            </PearlButton>
          </div>
        </section>
      </div>
    </div>
  );
}
