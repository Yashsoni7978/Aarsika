"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function IngredientsPage() {
  const ingredientsList = [
    {
      id: "rose",
      name: "Damask Rose (Gulab)",
      character: "Velvet • Floral • Royal • Luminous",
      origin: "Kannauj & Pushkar Valley, Rajasthan",
      role: "Forms the heart note of Gul-e-Rooh and signature royal bouquets. Hydro-distilled into Mysore sandalwood for intense longevity.",
      image: "/images/rose ingrediant.webp",
      colorTheme: "#8F304F",
    },
    {
      id: "saffron",
      name: "Kashmiri Saffron (Kesar)",
      character: "Warm • Golden • Honeyed • Leather",
      origin: "Pampore, Kashmir",
      role: "Brings radiant golden warmth, subtle leather nuance, and gourmand spiciness to our Saffron Sandal and royal evening blends.",
      image: "/images/saffron sandal.jpg",
      colorTheme: "#C9A55C",
    },
    {
      id: "oud",
      name: "Assam Agarwood (Oud)",
      character: "Dark • Smoked • Resinous • Precious",
      origin: "Upper Assam Wild Groves",
      role: "Harvested from infected Aquilaria heartwood, aged over 15 years to produce deep smoked woody sillage in Oud-e-Jaipur.",
      image: "/images/oud-e-jaipur.jpg",
      colorTheme: "#30070D",
    },
    {
      id: "sandalwood",
      name: "Mysore Sandalwood (Chandan)",
      character: "Creamy • Sacred • Milky • Woody",
      origin: "Karnataka Forests & Jaipur Vaults",
      role: "The sacred fixative receiver for all traditional attars. Binds volatile floral vapors into long-lasting skin-deep warmth.",
      image: "/images/craftsmanship.jpg",
      colorTheme: "#C9A55C",
    },
    {
      id: "jasmine",
      name: "Night-Blooming Jasmine (Raatraani)",
      character: "Indolic • White Floral • Hypnotic",
      origin: "Rajasthan Palace Gardens",
      role: "Picked strictly under moonlight, imparting intoxicating nocturnal white-floral elegance to Raatraani attar.",
      image: "/images/raatraani.jpg",
      colorTheme: "#30070D",
    },
  ];

  return (
    <div className="bg-ivory min-h-screen text-ink">
      {/* Hero Section */}
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
                Ingredients
              </li>
            </ol>
          </nav>

          <div className="inline-flex items-center justify-center gap-3">
            <span className="h-[1px] w-8 bg-gold" />
            <span className="text-[11px] tracking-[0.35em] text-gold-light uppercase font-semibold">
              Royal Botanical Catalogue
            </span>
            <span className="h-[1px] w-8 bg-gold" />
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-wide text-cream">
            The Five Sacred Botanicals
          </h1>
          <p className="text-sm text-cream/80 max-w-xl mx-auto font-light leading-relaxed">
            The foundation of Indian royal perfumery: hand-gathered flowers, rare spices, and ancient aged resins.
          </p>
        </div>
      </section>

      {/* Ingredient Showcase Grid */}
      <section className="py-16 sm:py-20 max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 space-y-20">
        {ingredientsList.map((item, idx) => (
          <div
            key={item.id}
            className={`grid grid-cols-1 lg:grid-cols-12 gap-10 items-center ${
              idx % 2 === 1 ? "lg:flex-row-reverse" : ""
            }`}
          >
            <div className={`lg:col-span-6 space-y-5 ${idx % 2 === 1 ? "lg:order-2" : "lg:order-1"}`}>
              <span className="text-[10px] tracking-[0.3em] text-gold-deep uppercase font-semibold">
                Botanical Profile 0{idx + 1}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal text-wine-900">
                {item.name}
              </h2>

              <div className="space-y-4 pt-1">
                <div>
                  <span className="text-[10px] tracking-wider uppercase text-gold-deep font-semibold block mb-0.5">
                    Scent Characteristics
                  </span>
                  <p className="font-serif text-lg text-wine-900 italic">{item.character}</p>
                </div>

                <div>
                  <span className="text-[10px] tracking-wider uppercase text-gold-deep font-semibold block mb-0.5">
                    Origin &amp; Harvest
                  </span>
                  <p className="text-sm text-muted">{item.origin}</p>
                </div>

                <div>
                  <span className="text-[10px] tracking-wider uppercase text-gold-deep font-semibold block mb-0.5">
                    Role in Aarsika Creations
                  </span>
                  <p className="text-sm text-muted leading-relaxed">{item.role}</p>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-wine-900 font-medium hover:text-gold transition-colors"
                >
                  <span>Discover Fragrances With This Essence</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className={`lg:col-span-6 ${idx % 2 === 1 ? "lg:order-1" : "lg:order-2"}`}>
              <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-gold/30 shadow-soft">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover filter contrast-[1.03]"
                />
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
