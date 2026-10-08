"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { PRODUCTS } from "@/data/products";
import { JOURNAL_ARTICLES } from "@/data/journal";
import { useShop } from "@/context/ShopContext";
import { Photo } from "@/components/Photo";
import { Logo } from "@/components/Logo";

export default function HomePage() {
  const { showToast } = useShop();
  const [whatsappPhone, setWhatsappPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Find discovery product or fallback
  const discoveryProd = PRODUCTS.find((p) => p.category === "DISCOVERY SETS");
  const discoveryPrice = discoveryProd ? discoveryProd.price : 499;

  // Featured product (first product from data)
  const featuredProd = PRODUCTS[0] || {
    id: "p1",
    slug: "gul-e-rooh",
    name: "Gul-e-Rooh",
    type: "Damask Rose Attar",
    price: 2499,
    notes: {
      top: ["Kashmir Rose Petals", "Crimson Saffron"],
      heart: ["Damask Rose Absolute", "Jasmine"],
      base: ["Mysore Sandalwood", "Amber"],
    },
  };

  const handleJoinWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!whatsappPhone) return;
    setSubmitted(true);
    showToast("Thank you for joining Aarsika updates.");
    setWhatsappPhone("");
  };

  const collections = [
    { title: "Eau de Parfum", slot: "collection-eau-de-parfum", href: "/perfumes" },
    { title: "Attar", slot: "collection-attar", href: "/attar" },
    { title: "Oud", slot: "collection-oud", href: "/oud" },
    { title: "Gifting", slot: "collection-gifting", href: "/gifting" },
  ];

  const journalArticles = JOURNAL_ARTICLES.slice(0, 3);

  return (
    <div className="bg-[#F6EFE2] text-[#1a1411] font-sans overflow-x-hidden">
      {/* ==========================================
          1. HERO (Full-bleed, Deep Burgundy #26060d)
      ========================================== */}
      <section className="relative h-screen min-h-[640px] bg-[#26060d] text-[#F6EFE2] flex flex-col justify-end overflow-hidden">
        {/* Full-bleed Photo Slot behind dark gradient */}
        <div className="absolute inset-0 z-0">
          <Photo
            slot="hero"
            alt="Aarsika Fine Fragrance"
            aspect="16/9"
            shape="full"
            priority
            sizes="100vw"
            dark
            className="h-full w-full opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#26060d] via-[#26060d]/60 to-transparent z-10" />
        </div>

        {/* Hero Content (Bottom-Left Aligned) */}
        <div className="relative z-20 max-w-7xl mx-auto w-full px-6 sm:px-8 lg:px-12 pb-16 md:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl space-y-5"
          >
            <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl text-[#E7CF98] leading-[1.02] tracking-tight">
              Rare scents. <br />
              Timeless lands.
            </h1>

            <p className="text-base sm:text-lg text-[#F6EFE2]/90 font-light max-w-lg">
              Fragrances shaped by memory, material and place.
            </p>

            <div className="pt-3">
              <Link
                href="/shop"
                className="inline-block bg-[#C9A55C] text-[#26060d] font-mono text-xs uppercase tracking-[0.25em] px-8 py-4 rounded-none hover:bg-[#E7CF98] transition-colors"
              >
                Shop the collection
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==========================================
          2. THE HOUSE (Asymmetric 60/40 Layout)
      ========================================== */}
      <section className="py-20 md:py-32 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Large Photo Slot Left (~60% width, Arch top allowed) */}
          <div className="lg:col-span-7">
            <Photo
              slot="house"
              alt="The House of Aarsika"
              aspect="3/4"
              shape="arch"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          </div>

          {/* Text Block Right (Vertically Offset, Left-Aligned) */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="font-serif text-4xl sm:text-5xl text-[#1a1411] leading-tight">
              A fragrance house for every story.
            </h2>
            <p className="text-[#6b5f55] text-base font-light leading-relaxed max-w-[60ch]">
              Aarsika is a celebration of rare ingredients, craftsmanship and the beauty of timeless lands. We work with traditional perfumery knowledge and contemporary craft to create scents that carry a sense of place, memory and purpose.
            </p>
            <div className="pt-2">
              <Link href="/our-story" className="text-link-underline text-[#1a1411]">
                Our story →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          3. THE COLLECTION (4 Tall Arch Photos in a Row)
      ========================================== */}
      <section className="py-16 md:py-24 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto border-t border-[#dccfb6]">
        <div className="space-y-10">
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1a1411]">
            The collection
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {collections.map((item) => (
              <Link key={item.title} href={item.href} className="group space-y-3 block">
                <Photo
                  slot={item.slot}
                  alt={item.title}
                  aspect="3/4"
                  shape="arch"
                  sizes="(max-width: 640px) 50vw, 25vw"
                />
                <span className="font-serif text-xl text-[#1a1411] block group-hover:underline group-hover:decoration-[#C9A55C] group-hover:underline-offset-4 transition-all">
                  {item.title}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          4. DISCOVERY SET (Full-Width Band)
      ========================================== */}
      <section className="py-16 md:py-24 border-y border-[#dccfb6] bg-[#FBF6EA]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-4 text-left">
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1a1411]">
              Start with the Discovery Set
            </h2>
            <p className="font-mono text-lg text-[#1a1411] font-medium">
              ₹{discoveryPrice}
            </p>
            <p className="text-[#6b5f55] text-base font-light max-w-[50ch] leading-relaxed">
              Three to four attars, 3 ml each. Find your signature before you choose a full bottle. Free shipping across India.
            </p>
            <div className="pt-2">
              <Link href="/discovery-sets" className="text-link-underline text-[#1a1411]">
                Order the set →
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6">
            <Photo
              slot="discovery-set"
              alt="Aarsika Discovery Set"
              aspect="16/9"
              shape="rect"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* ==========================================
          5. ONE FEATURED PRODUCT (Unboxed, Plain Layout)
      ========================================== */}
      <section className="py-20 md:py-28 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Large Image Left */}
          <div className="lg:col-span-6">
            <Photo
              slot="featured-product"
              alt={featuredProd.name}
              aspect="4/5"
              shape="rect"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {/* Details Right */}
          <div className="lg:col-span-6 space-y-4">
            <h2 className="font-serif text-4xl text-[#1a1411]">
              {featuredProd.name}
            </h2>
            <p className="font-mono text-xs uppercase tracking-widest text-[#8a6a22]">
              {featuredProd.type}
            </p>
            <p className="text-[#6b5f55] text-sm font-light leading-relaxed">
              Top: {featuredProd.notes?.top.join(", ")} • Heart: {featuredProd.notes?.heart.join(", ")} • Base: {featuredProd.notes?.base.join(", ")}
            </p>
            <p className="font-mono text-xl text-[#1a1411] font-medium pt-1">
              ₹{featuredProd.price.toLocaleString("en-IN")}
            </p>
            <div className="pt-2">
              <Link href={`/products/${featuredProd.slug}`} className="text-link-underline text-[#1a1411]">
                View →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          6. JOURNAL (Simple 3-Column List with Hairlines, No Images)
      ========================================== */}
      <section className="py-16 md:py-24 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto border-t border-[#dccfb6]">
        <div className="space-y-10">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1a1411]">
              The Journal
            </h2>
            <Link href="/journal" className="text-link-underline text-[#1a1411]">
              All articles →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-[#dccfb6] pt-8 divide-y md:divide-y-0 md:divide-x divide-[#dccfb6]">
            {journalArticles.map((article, idx) => (
              <div key={article.id} className={`space-y-2 ${idx > 0 ? "pt-6 md:pt-0 md:pl-8" : ""}`}>
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#8a6a22]">
                  {article.category}
                </span>
                <Link href={`/journal/${article.slug}`} className="block group">
                  <h3 className="font-serif text-2xl text-[#1a1411] group-hover:text-[#8b1a2b] transition-colors leading-snug">
                    {article.title}
                  </h3>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          7. FOOTER (Merges Signup & Trust in Dark Burgundy #26060d)
      ========================================== */}
      <footer className="bg-[#26060d] text-[#F6EFE2] pt-16 pb-12 border-t border-[#C9A55C]/30">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-12">
          {/* Top Row: Logo Left, WhatsApp Join Center */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pb-12 border-b border-[#C9A55C]/20">
            {/* Left: Logo & One Line */}
            <div className="lg:col-span-5 space-y-3">
              <Logo variant="light" />
              <p className="font-serif italic text-sm text-[#E7CF98]">
                Rare scents. Timeless lands.
              </p>
            </div>

            {/* Center: WhatsApp Signup */}
            <div className="lg:col-span-7">
              <form onSubmit={handleJoinWhatsApp} className="flex flex-col sm:flex-row gap-2 max-w-md">
                <input
                  type="tel"
                  placeholder="WhatsApp Number (+91)"
                  value={whatsappPhone}
                  onChange={(e) => setWhatsappPhone(e.target.value)}
                  className="flex-1 bg-[#3b0a12] border border-[#C9A55C]/30 text-[#F6EFE2] placeholder-[#F6EFE2]/40 text-xs font-mono px-4 py-3 focus:outline-none focus:border-[#C9A55C]"
                />
                <button
                  type="submit"
                  className="bg-[#C9A55C] text-[#26060d] font-mono text-xs uppercase tracking-widest font-semibold px-6 py-3 rounded-none hover:bg-[#E7CF98] transition-colors shrink-0"
                >
                  Join
                </button>
              </form>
              {submitted && (
                <p className="text-[11px] font-mono text-[#E7CF98] pt-2">
                  Subscribed to Aarsika WhatsApp updates.
                </p>
              )}
            </div>
          </div>

          {/* Plain Text Trust Line Above Links */}
          <div className="py-2 text-center text-xs font-light text-[#E7CF98] border-b border-[#C9A55C]/20">
            Free shipping across India · UPI, cards and cash on delivery · Replacement if a bottle arrives broken
          </div>

          {/* Links Columns & Copyright */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 text-xs font-light text-[#F6EFE2]/80">
            <div className="md:col-span-4 space-y-2">
              <h4 className="font-mono text-[10px] uppercase tracking-widest text-[#E7CF98]">
                SHOP
              </h4>
              <div className="flex flex-wrap gap-x-4 gap-y-1">
                <Link href="/shop" className="hover:text-[#E7CF98]">All Fragrances</Link>
                <Link href="/perfumes" className="hover:text-[#E7CF98]">Eau de Parfum</Link>
                <Link href="/attar" className="hover:text-[#E7CF98]">Attar</Link>
                <Link href="/oud" className="hover:text-[#E7CF98]">Oud</Link>
                <Link href="/discovery-sets" className="hover:text-[#E7CF98]">Discovery Sets</Link>
                <Link href="/gifting" className="hover:text-[#E7CF98]">Gifting</Link>
              </div>
            </div>

            <div className="md:col-span-4 space-y-2">
              <h4 className="font-mono text-[10px] uppercase tracking-widest text-[#E7CF98]">
                THE HOUSE
              </h4>
              <div className="flex flex-wrap gap-x-4 gap-y-1">
                <Link href="/our-story" className="hover:text-[#E7CF98]">Our Story</Link>
                <Link href="/craftsmanship" className="hover:text-[#E7CF98]">Craftsmanship</Link>
                <Link href="/ingredients" className="hover:text-[#E7CF98]">Ingredients</Link>
                <Link href="/journal" className="hover:text-[#E7CF98]">The Journal</Link>
              </div>
            </div>

            <div className="md:col-span-4 space-y-2">
              <h4 className="font-mono text-[10px] uppercase tracking-widest text-[#E7CF98]">
                HELP & LEGAL
              </h4>
              <div className="flex flex-wrap gap-x-4 gap-y-1">
                <Link href="/contact" className="hover:text-[#E7CF98]">Contact</Link>
                <Link href="/faq" className="hover:text-[#E7CF98]">FAQ</Link>
                <Link href="/shipping-policy" className="hover:text-[#E7CF98]">Shipping</Link>
                <Link href="/returns" className="hover:text-[#E7CF98]">Returns</Link>
                <Link href="/privacy" className="hover:text-[#E7CF98]">Privacy</Link>
                <Link href="/terms" className="hover:text-[#E7CF98]">Terms</Link>
              </div>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row justify-between items-center text-xs text-[#F6EFE2]/60 font-light gap-2">
            <p>© 2026 Aarsika. All rights reserved.</p>
            <p className="font-mono text-[10px]">Aarsika, Jaipur, Rajasthan 302012</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
