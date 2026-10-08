"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Truck, ShieldCheck, RefreshCw, FileText, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { PRODUCTS } from "@/data/products";
import { JOURNAL_ARTICLES } from "@/data/journal";
import { useShop } from "@/context/ShopContext";
import { Photo } from "@/components/Photo";
import { WaveDivider } from "@/components/WaveDivider";

export default function HomePage() {
  const { showToast } = useShop();
  const [whatsappPhone, setWhatsappPhone] = useState("");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Featured product (first product in catalogue or Gul-e-Rooh)
  const featuredProd = PRODUCTS[0] || {
    id: "p1",
    slug: "gul-e-rooh",
    name: "Gul-e-Rooh",
    type: "Damask Rose Attar",
    price: 2499,
    description:
      "Pure distilled Damask Rose attar aged in creamy Mysore sandalwood oil. A timeless floral heart yielding an enveloping, serene fragrance aura.",
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!whatsappPhone && !newsletterEmail) return;
    setSubmitted(true);
    showToast("Thank you for connecting with Aarsika.");
    setWhatsappPhone("");
    setNewsletterEmail("");
  };

  const collectionsList = [
    {
      num: "01",
      title: "EAU DE PARFUM",
      slot: "collection-eau-de-parfum",
      href: "/perfumes",
    },
    {
      num: "02",
      title: "ATTAR",
      slot: "collection-attar",
      href: "/attar",
    },
    {
      num: "03",
      title: "OUD",
      slot: "collection-oud",
      href: "/oud",
    },
    {
      num: "04",
      title: "GIFTING",
      slot: "collection-gifting",
      href: "/gifting",
    },
  ];

  const storyStrips = [
    {
      slot: "strip-1",
      caption: "REAL CRAFTSMANSHIP. REAL STORIES.",
    },
    {
      slot: "strip-2",
      caption: "A FRAGRANCE FOR EVERY STORY.",
    },
    {
      slot: "strip-3",
      caption: "INSPIRED BY PEOPLE, PLACES AND MOMENTS.",
    },
    {
      slot: "strip-4",
      caption: "SCENTS BORN FROM TIMELESS LANDS.",
    },
  ];

  const journalTeasers = JOURNAL_ARTICLES.slice(0, 3);

  return (
    <div className="bg-[#F6EFE2] text-[#1a1411] overflow-x-hidden font-sans">
      {/* ==========================================
          5a. HERO SECTION (Full Viewport, Deep Burgundy #26060d)
      ========================================== */}
      <section className="relative h-screen min-h-[680px] bg-[#26060d] text-[#F6EFE2] flex flex-col justify-end overflow-hidden">
        {/* Background Photo Slot with Dark Legibility Gradient */}
        <div className="absolute inset-0 z-0">
          <Photo
            slot="hero"
            alt="Aarsika Fine Fragrance Hero"
            aspect="16/9"
            shape="full"
            priority
            sizes="100vw"
            className="h-full w-full opacity-40 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#26060d] via-[#26060d]/70 to-[#26060d]/40 z-10" />
        </div>

        {/* Hero Main Content Box */}
        <div className="relative z-20 max-w-7xl mx-auto w-full px-6 sm:px-8 lg:px-12 pb-20 md:pb-24 grid grid-cols-1 lg:grid-cols-12 items-end gap-8">
          {/* Left Column: Tagline & CTA */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-9 space-y-6"
          >
            {/* Small Gold Diamond & Line Ornament */}
            <div className="flex items-center space-x-3 text-[#C9A55C]">
              <span className="h-[1px] w-8 bg-[#C9A55C]" />
              <span className="text-xs">◆</span>
              <span className="eyebrow-label text-[#E7CF98]">FINE FRAGRANCE</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif font-light uppercase tracking-wider text-4xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[1.05] gold-gradient-text">
              RARE SCENTS. <br />
              TIMELESS LANDS.
            </h1>

            {/* Subcopy */}
            <p className="text-sm sm:text-base md:text-lg text-[#F6EFE2]/85 font-light tracking-wide max-w-xl">
              Fragrances shaped by memory, material and place.
            </p>

            {/* CTA Button */}
            <div className="pt-2">
              <Link
                href="/shop"
                className="inline-flex items-center gap-4 group focus:outline-none"
              >
                <span className="eyebrow-label text-xs tracking-[0.3em] text-[#F6EFE2] group-hover:text-[#E7CF98] transition-colors">
                  EXPLORE COLLECTION
                </span>
                <span className="w-10 h-10 rounded-full border border-[#C9A55C] flex items-center justify-center text-[#C9A55C] group-hover:bg-[#C9A55C] group-hover:text-[#26060d] transition-all duration-300">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </div>
          </motion.div>

          {/* Right Edge: Vertical Stacked Pillar Labels (Hidden on Mobile) */}
          <div className="hidden lg:flex lg:col-span-3 flex-col items-end justify-end space-y-8 pr-4">
            <div className="h-32 w-[1px] bg-gradient-to-b from-transparent via-[#C9A55C] to-transparent my-2" />
            {["NATURE", "HERITAGE", "CRAFTSMANSHIP", "FRAGRANCE"].map(
              (label) => (
                <span
                  key={label}
                  className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#E7CF98]/60 hover:text-[#C9A55C] transition-colors"
                >
                  {label}
                </span>
              )
            )}
          </div>
        </div>

        {/* 5b. WAVE DIVIDER */}
        <WaveDivider fillColor="#F6EFE2" />
      </section>

      {/* ==========================================
          5c. THE HOUSE OF AARSIKA (Ivory Section)
      ========================================== */}
      <section className="py-16 md:py-24 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Text Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-6"
          >
            <span className="eyebrow-label text-[#8a6a22] block">
              THE HOUSE OF AARSIKA
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1a1411] font-light leading-tight">
              A Fragrance House Rooted in a Richer Story
            </h2>
            <p className="text-[#6b5f55] text-sm sm:text-base font-light leading-relaxed">
              Aarsika is a celebration of rare ingredients, craftsmanship and the beauty of timeless lands. We work with traditional perfumery knowledge and contemporary craft to create scents that carry a sense of place, memory and purpose.
            </p>
            <div className="pt-4">
              <Link
                href="/our-story"
                className="inline-flex items-center gap-3 px-6 py-3 border border-[#C9A55C] text-xs font-mono uppercase tracking-[0.25em] text-[#1a1411] hover:bg-[#3b0a12] hover:text-[#F6EFE2] hover:border-[#3b0a12] transition-all duration-300 rounded-full group"
              >
                <span>OUR STORY</span>
                <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center">
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </Link>
            </div>
          </motion.div>

          {/* Right Column: Tall Arch Photo Slot */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 flex justify-center"
          >
            <Photo
              slot="house"
              alt="The House of Aarsika Craftsmanship"
              aspect="3/4"
              shape="arch"
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="max-w-md w-full shadow-lg"
            />
          </motion.div>
        </div>
      </section>

      {/* ==========================================
          5d. THE COLLECTION (4 Arch Tiles + Discovery Banner)
      ========================================== */}
      <section className="py-16 md:py-24 bg-[#FBF6EA] border-t border-[#dccfb6]/60">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-12">
          {/* Section Heading */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="eyebrow-label text-[#8a6a22]">
              EXPLORE BY CATEGORY
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1a1411] font-light">
              The Collection
            </h2>
          </div>

          {/* 4 Arch Tiles Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-6">
            {collectionsList.map((col) => (
              <Link
                key={col.title}
                href={col.href}
                className="group flex flex-col space-y-4"
              >
                <div className="relative overflow-hidden rounded-t-[90px] shadow-sm bg-[#F6EFE2]">
                  <Photo
                    slot={col.slot}
                    alt={col.title}
                    aspect="3/4"
                    shape="arch"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <span className="absolute top-4 left-6 font-mono text-xs text-[#E7CF98] bg-[#26060d]/70 px-2.5 py-1 backdrop-blur-sm rounded-full">
                    {col.num}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="font-serif text-lg tracking-wider text-[#1a1411] group-hover:text-[#8b1a2b] transition-colors">
                    {col.title}
                  </span>
                  <span className="w-7 h-7 rounded-full border border-[#C9A55C] flex items-center justify-center text-[#C9A55C] group-hover:bg-[#C9A55C] group-hover:text-[#26060d] transition-all duration-300">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Separate Discovery Set Banner */}
          <div className="mt-16 bg-[#26060d] text-[#F6EFE2] rounded-none p-8 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border border-[#C9A55C]/30 relative overflow-hidden">
            <div className="lg:col-span-7 space-y-4 z-10">
              <span className="eyebrow-label text-[#E7CF98]">
                SAMPLER SET
              </span>
              <h3 className="font-serif text-3xl md:text-4xl text-[#F6EFE2] font-light">
                The Discovery Set
              </h3>
              <p className="text-[#F6EFE2]/80 text-sm font-light leading-relaxed max-w-lg">
                Explore 5 signature 3ml sample vials at home. Includes a ₹500 full-bottle voucher redeemable on your next order.
              </p>
              <div className="flex items-center gap-6 pt-2">
                <span className="font-mono text-lg text-[#E7CF98] font-medium">
                  ₹1,899
                </span>
                <Link
                  href="/discovery-sets"
                  className="px-6 py-2.5 bg-[#C9A55C] text-[#26060d] text-xs font-mono uppercase tracking-widest font-semibold hover:bg-[#E7CF98] transition-colors"
                >
                  DISCOVER NOW
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 z-10">
              <Photo
                slot="discovery-set"
                alt="Aarsika Discovery Sampler Set"
                aspect="16/9"
                shape="rect"
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          5e. FEATURED PRODUCT BLOCK
      ========================================== */}
      <section className="py-16 md:py-24 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto">
        <div className="bg-white border border-[#dccfb6] p-8 md:p-14 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center shadow-soft">
          {/* Product Image Slot */}
          <div className="lg:col-span-6 flex justify-center">
            <Photo
              slot="featured-product"
              alt={featuredProd.name}
              aspect="4/5"
              shape="rect"
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="max-w-md w-full"
            />
          </div>

          {/* Product Details */}
          <div className="lg:col-span-6 space-y-6">
            <span className="eyebrow-label text-[#8a6a22]">
              FEATURED CREATION
            </span>
            <div className="space-y-1">
              <h3 className="font-serif text-3xl sm:text-4xl text-[#1a1411] font-light">
                {featuredProd.name}
              </h3>
              <p className="eyebrow-label text-[#8b1a2b] text-[11px]">
                {featuredProd.type}
              </p>
            </div>

            <p className="font-mono text-xl text-[#1a1411] font-medium">
              ₹{featuredProd.price.toLocaleString("en-IN")}
            </p>

            <p className="text-[#6b5f55] text-sm font-light leading-relaxed line-clamp-3">
              {featuredProd.description}
            </p>

            {/* Note Thumbnails */}
            <div className="space-y-2 pt-2">
              <span className="eyebrow-label text-[10px] text-[#6b5f55]">
                KEY OLFACTIVE NOTES
              </span>
              <div className="flex items-center gap-3">
                {["Amber", "Rose", "Sandalwood", "Vanilla"].map((note) => (
                  <div
                    key={note}
                    className="flex flex-col items-center gap-1 text-center"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#F6EFE2] border border-[#C9A55C]/40 flex items-center justify-center text-[10px] font-serif text-[#1a1411]">
                      {note[0]}
                    </div>
                    <span className="text-[10px] font-sans text-[#6b5f55]">
                      {note}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <Link
                href={`/products/${featuredProd.slug}`}
                className="inline-block px-8 py-3.5 border border-[#1a1411] text-xs font-mono uppercase tracking-[0.25em] text-[#1a1411] hover:bg-[#26060d] hover:text-[#F6EFE2] hover:border-[#26060d] transition-all duration-300"
              >
                EXPLORE {featuredProd.name.toUpperCase()}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          5f. INGREDIENTS (Dark Burgundy Section)
      ========================================== */}
      <section className="py-16 md:py-24 bg-[#26060d] text-[#F6EFE2] relative">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="eyebrow-label text-[#E7CF98]">
              RAW BOTANICAL MASTERY
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#F6EFE2] font-light">
              Nature&apos;s Rarest Treasures
            </h2>
            <p className="text-[#F6EFE2]/80 text-sm font-light leading-relaxed">
              We source the finest natural ingredients and blend tradition with modern artistry to create exceptional fragrances.
            </p>
            <div className="pt-2">
              <Link
                href="/ingredients"
                className="inline-block px-6 py-2.5 border border-[#C9A55C] text-xs font-mono uppercase tracking-widest text-[#E7CF98] hover:bg-[#C9A55C] hover:text-[#26060d] transition-colors"
              >
                EXPLORE INGREDIENTS
              </Link>
            </div>
          </div>

          {/* 3 Ingredient Photo Slots */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { slot: "ingredient-rose", name: "DAMASK ROSE", desc: "Hydro-distilled rose petals yielding velvet floral depth." },
              { slot: "ingredient-oud", name: "ASSAM OUD", desc: "Wild-harvested agarwood resin aged for dark smoked majesty." },
              { slot: "ingredient-saffron", name: "KASHMIR SAFFRON", desc: "Hand-picked crimson stigmas steeping warm golden spice." },
            ].map((item) => (
              <div key={item.name} className="space-y-4 text-center group">
                <Photo
                  slot={item.slot}
                  alt={item.name}
                  aspect="3/4"
                  shape="rect"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="shadow-lg"
                />
                <div className="space-y-1">
                  <h4 className="font-serif text-lg tracking-widest text-[#E7CF98] uppercase">
                    {item.name}
                  </h4>
                  <p className="text-xs text-[#F6EFE2]/70 font-light max-w-xs mx-auto">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          5g. JOURNAL TEASER (Ivory Section)
      ========================================== */}
      <section className="py-16 md:py-24 bg-[#FBF6EA] border-t border-[#dccfb6]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="eyebrow-label text-[#8a6a22]">
              PERSPECTIVES & ESSAYS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1a1411] font-light">
              The Aarsika Journal
            </h2>
            <p className="text-[#6b5f55] text-sm font-light">
              Stories, ingredients, places and perspectives from the world of fragrance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {journalTeasers.map((article, index) => (
              <article key={article.id} className="bg-white border border-[#dccfb6] flex flex-col group overflow-hidden">
                <Photo
                  slot={`journal-${index + 1}`}
                  alt={article.title}
                  aspect="4/3"
                  shape="rect"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="eyebrow-label text-[10px] text-[#8b1a2b]">
                      {article.category}
                    </span>
                    <h3 className="font-serif text-xl text-[#1a1411] group-hover:text-[#8b1a2b] transition-colors leading-snug">
                      {article.title}
                    </h3>
                    <p className="text-[#6b5f55] text-xs font-light line-clamp-2">
                      {article.excerpt}
                    </p>
                  </div>
                  <Link
                    href={`/journal/${article.slug}`}
                    className="inline-flex items-center gap-2 eyebrow-label text-[11px] text-[#1a1411] group-hover:text-[#8b1a2b] transition-colors pt-2"
                  >
                    <span>READ MORE</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          5h. STORY STRIP (4 Full-Bleed Cards)
      ========================================== */}
      <section className="py-12 bg-[#26060d]">
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-6 sm:px-8 max-w-7xl mx-auto pb-4 scrollbar-none">
          {storyStrips.map((strip) => (
            <div
              key={strip.slot}
              className="snap-center shrink-0 w-[280px] sm:w-[320px] md:w-[360px] relative rounded-none overflow-hidden group shadow-lg"
            >
              <Photo
                slot={strip.slot}
                alt={strip.caption}
                aspect="3/5"
                shape="rect"
                sizes="360px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#26060d] via-[#26060d]/40 to-transparent flex flex-col justify-end p-6 text-center space-y-3">
                <p className="font-serif text-lg tracking-wider text-[#F6EFE2] uppercase font-light leading-snug">
                  {strip.caption}
                </p>
                <div className="w-8 h-[1px] bg-[#C9A55C] mx-auto" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==========================================
          5i. TRUST STRIP
      ========================================== */}
      <section className="py-10 bg-[#F6EFE2] border-y border-[#dccfb6]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <div className="flex flex-col items-center space-y-2 p-2">
            <Truck className="w-6 h-6 text-[#C9A55C]" />
            <span className="eyebrow-label text-[11px] text-[#1a1411]">
              Free Shipping Across India
            </span>
            <span className="text-xs text-[#6b5f55] font-light">
              Complimentary shipping on orders ₹3,000+
            </span>
          </div>

          <div className="flex flex-col items-center space-y-2 p-2">
            <ShieldCheck className="w-6 h-6 text-[#C9A55C]" />
            <span className="eyebrow-label text-[11px] text-[#1a1411]">
              Secure Payments
            </span>
            <span className="text-xs text-[#6b5f55] font-light">
              UPI, Cards & Cash on Delivery supported
            </span>
          </div>

          <div className="flex flex-col items-center space-y-2 p-2">
            <RefreshCw className="w-6 h-6 text-[#C9A55C]" />
            <span className="eyebrow-label text-[11px] text-[#1a1411]">
              Damage Guarantee
            </span>
            <span className="text-xs text-[#6b5f55] font-light">
              Replacement if a bottle arrives broken
            </span>
          </div>

          <div className="flex flex-col items-center space-y-2 p-2">
            <FileText className="w-6 h-6 text-[#C9A55C]" />
            <span className="eyebrow-label text-[11px] text-[#1a1411]">
              GST Invoice Included
            </span>
            <span className="text-xs text-[#6b5f55] font-light">
              Official tax invoice on every order
            </span>
          </div>
        </div>
      </section>

      {/* ==========================================
          5j. WHATSAPP + NEWSLETTER BLOCK
      ========================================== */}
      <section className="py-16 md:py-20 bg-[#3b0a12] text-[#F6EFE2]">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
          <span className="eyebrow-label text-[#E7CF98]">STAY CONNECTED</span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#F6EFE2] font-light">
            Find your signature.
          </h2>
          <p className="text-[#F6EFE2]/80 text-sm font-light max-w-lg mx-auto">
            Receive private release updates, olfactory notes, and fragrance recommendations directly via WhatsApp or Email.
          </p>

          <form onSubmit={handleSubscribe} className="max-w-md mx-auto space-y-3 pt-2">
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="tel"
                placeholder="WhatsApp Phone (+91)"
                value={whatsappPhone}
                onChange={(e) => setWhatsappPhone(e.target.value)}
                className="flex-1 px-4 py-3 bg-[#26060d] border border-[#C9A55C]/40 text-[#F6EFE2] placeholder-[#F6EFE2]/40 text-xs font-mono focus:outline-none focus:border-[#C9A55C]"
              />
              <input
                type="email"
                placeholder="Email Address"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="flex-1 px-4 py-3 bg-[#26060d] border border-[#C9A55C]/40 text-[#F6EFE2] placeholder-[#F6EFE2]/40 text-xs font-mono focus:outline-none focus:border-[#C9A55C]"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-[#C9A55C] text-[#26060d] text-xs font-mono uppercase tracking-[0.25em] font-semibold hover:bg-[#E7CF98] transition-colors"
            >
              SUBSCRIBE
            </button>
          </form>

          {submitted && (
            <p className="text-xs text-[#E7CF98] flex items-center justify-center gap-1.5 pt-2 font-mono">
              <CheckCircle2 className="w-4 h-4" />
              <span>You are subscribed to Aarsika updates.</span>
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
