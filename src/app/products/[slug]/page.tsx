"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Heart, ShoppingBag, Truck, ShieldCheck, ChevronDown } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { useShop } from "@/context/ShopContext";
import { ProductCard } from "@/components/ProductCard";
import { Photo } from "@/components/Photo";

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export default function ProductDetailPage({ params }: ProductPageProps) {
  const product = PRODUCTS.find(
    (p) => p.slug === params.slug || p.id === params.slug
  );

  const { addToCart, toggleWishlist, isInWishlist } = useShop();
  const isLiked = product ? isInWishlist(product.id) : false;

  const [selectedSize, setSelectedSize] = useState(
    product?.defaultSize || product?.sizeOptions?.[0] || "12ml"
  );
  const [quantity, setQuantity] = useState(1);
  const [activeAccordion, setActiveAccordion] = useState<
    "notes" | "ingredients" | "wear" | "returns" | null
  >("notes");

  if (!product) {
    return (
      <div className="py-32 text-center space-y-4 bg-[#F6EFE2] min-h-screen">
        <h1 className="font-serif text-4xl text-[#1a1411] font-light">
          Creation Not Found
        </h1>
        <Link
          href="/shop"
          className="eyebrow-label text-xs text-[#8a6a22] border-b border-[#8a6a22]"
        >
          Return to Collection
        </Link>
      </div>
    );
  }

  const activeVariant = product.variants?.find((v) => v.size === selectedSize);
  const currentPrice = activeVariant ? activeVariant.price : product.price;

  const relatedProducts = PRODUCTS.filter(
    (p) => p.id !== product.id && p.category === product.category
  ).slice(0, 4);

  const toggleAccordion = (
    key: "notes" | "ingredients" | "wear" | "returns"
  ) => {
    setActiveAccordion(activeAccordion === key ? null : key);
  };

  return (
    <div className="bg-[#F6EFE2] text-[#1a1411] pt-28 pb-20 font-sans">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-16">
        {/* Breadcrumb */}
        <div className="text-xs font-mono tracking-widest text-[#6b5f55] uppercase space-x-2">
          <Link href="/" className="hover:text-[#1a1411]">
            HOME
          </Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-[#1a1411]">
            COLLECTION
          </Link>
          <span>/</span>
          <span className="text-[#1a1411] font-medium">{product.name}</span>
        </div>

        {/* 2-Column Product Detail Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* LEFT: Photo Gallery */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative bg-[#FBF6EA] border border-[#dccfb6]">
              <Photo
                slot={product.slug}
                alt={product.name}
                aspect="4/5"
                shape="rect"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <button
                onClick={() => toggleWishlist(product.id)}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-[#F6EFE2] flex items-center justify-center text-[#1a1411] hover:text-[#8b1a2b] transition-colors shadow-sm"
                aria-label="Save to Wishlist"
              >
                <Heart
                  className={`w-4 h-4 ${
                    isLiked ? "fill-[#8b1a2b] text-[#8b1a2b]" : ""
                  }`}
                />
              </button>
            </div>
          </div>

          {/* RIGHT: Product Details & Purchase Actions */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-2 border-b border-[#dccfb6] pb-6">
              <span className="eyebrow-label text-[#8a6a22]">
                {product.type || product.category}
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl text-[#1a1411] font-light">
                {product.name}
              </h1>
              <p className="font-mono text-2xl text-[#1a1411] font-medium pt-2">
                ₹{currentPrice.toLocaleString("en-IN")}
              </p>
            </div>

            <p className="text-[#6b5f55] text-sm font-light leading-relaxed">
              {product.description || product.shortDescription}
            </p>

            {/* Size Selector (Pill Buttons) */}
            {product.sizeOptions && product.sizeOptions.length > 0 && (
              <div className="space-y-3">
                <span className="eyebrow-label text-[11px] text-[#1a1411]">
                  SELECT VOLUME
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {product.sizeOptions.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2.5 text-xs font-mono uppercase tracking-wider border transition-all ${
                        selectedSize === size
                          ? "border-[#26060d] bg-[#26060d] text-[#F6EFE2]"
                          : "border-[#dccfb6] bg-white text-[#1a1411] hover:border-[#C9A55C]"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector & Add to Bag */}
            <div className="flex items-center gap-4 pt-2">
              <div className="flex items-center border border-[#dccfb6] bg-white h-12">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-sm text-[#1a1411] hover:bg-[#F6EFE2]"
                >
                  -
                </button>
                <span className="px-3 font-mono text-xs font-medium">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-sm text-[#1a1411] hover:bg-[#F6EFE2]"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => addToCart(product, selectedSize, quantity)}
                className="flex-1 h-12 bg-[#26060d] text-[#F6EFE2] hover:bg-[#3b0a12] text-xs font-mono uppercase tracking-[0.25em] font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <span>ADD TO BAG</span>
                <ShoppingBag className="w-4 h-4" />
              </button>
            </div>

            {/* Accordions (Notes, Ingredients, Wear, Shipping/Returns) */}
            <div className="border-t border-[#dccfb6] divide-y divide-[#dccfb6] pt-4">
              {/* Notes Accordion */}
              {product.notes && (
                <div className="py-4">
                  <button
                    onClick={() => toggleAccordion("notes")}
                    className="w-full flex items-center justify-between text-left focus:outline-none"
                  >
                    <span className="eyebrow-label text-xs text-[#1a1411]">
                      OLFACTIVE NOTES
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#8a6a22] transition-transform ${
                        activeAccordion === "notes" ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {activeAccordion === "notes" && (
                    <div className="pt-4 grid grid-cols-3 gap-4 text-xs font-light">
                      <div>
                        <span className="font-mono text-[10px] text-[#8a6a22] uppercase block mb-1">
                          TOP
                        </span>
                        <p className="text-[#6b5f55]">
                          {product.notes.top.join(", ")}
                        </p>
                      </div>
                      <div>
                        <span className="font-mono text-[10px] text-[#8a6a22] uppercase block mb-1">
                          HEART
                        </span>
                        <p className="text-[#6b5f55]">
                          {product.notes.heart.join(", ")}
                        </p>
                      </div>
                      <div>
                        <span className="font-mono text-[10px] text-[#8a6a22] uppercase block mb-1">
                          BASE
                        </span>
                        <p className="text-[#6b5f55]">
                          {product.notes.base.join(", ")}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Ingredients Accordion */}
              {product.ingredients && product.ingredients.length > 0 && (
                <div className="py-4">
                  <button
                    onClick={() => toggleAccordion("ingredients")}
                    className="w-full flex items-center justify-between text-left focus:outline-none"
                  >
                    <span className="eyebrow-label text-xs text-[#1a1411]">
                      INGREDIENTS & CONCENTRATION
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#8a6a22] transition-transform ${
                        activeAccordion === "ingredients" ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {activeAccordion === "ingredients" && (
                    <div className="pt-3 text-xs text-[#6b5f55] font-light space-y-2">
                      <p>
                        <strong className="font-medium text-[#1a1411]">
                          Concentration:
                        </strong>{" "}
                        {product.concentration || "Fine Perfume Extrait"}
                      </p>
                      <p>
                        <strong className="font-medium text-[#1a1411]">
                          Ingredients:
                        </strong>{" "}
                        {product.ingredients.join(", ")}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* How to Wear Accordion */}
              {product.howToWear && (
                <div className="py-4">
                  <button
                    onClick={() => toggleAccordion("wear")}
                    className="w-full flex items-center justify-between text-left focus:outline-none"
                  >
                    <span className="eyebrow-label text-xs text-[#1a1411]">
                      APPLICATION & SILPAGE
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#8a6a22] transition-transform ${
                        activeAccordion === "wear" ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {activeAccordion === "wear" && (
                    <div className="pt-3 text-xs text-[#6b5f55] font-light space-y-2">
                      <p>{product.howToWear}</p>
                      {product.longevity && (
                        <p>
                          <strong className="font-medium text-[#1a1411]">
                            Longevity:
                          </strong>{" "}
                          {product.longevity}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Shipping & Returns Accordion */}
              <div className="py-4">
                <button
                  onClick={() => toggleAccordion("returns")}
                  className="w-full flex items-center justify-between text-left focus:outline-none"
                >
                  <span className="eyebrow-label text-xs text-[#1a1411]">
                    SHIPPING & GUARANTEE
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#8a6a22] transition-transform ${
                      activeAccordion === "returns" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {activeAccordion === "returns" && (
                  <div className="pt-3 text-xs text-[#6b5f55] font-light space-y-2">
                    <p>
                      Free express shipping across India on orders above ₹3,000.
                    </p>
                    <p className="text-[#8b1a2b] font-normal">
                      No returns on opened or used products. If a bottle arrives broken or damaged, we will replace it. Report within 48 hours with an unboxing video.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Grid */}
        {relatedProducts.length > 0 && (
          <div className="pt-16 border-t border-[#dccfb6] space-y-8">
            <div className="text-center space-y-2">
              <span className="eyebrow-label text-[#8a6a22]">
                COMPLEMENTARY SCENTS
              </span>
              <h2 className="font-serif text-3xl text-[#1a1411] font-light">
                You May Also Discover
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
