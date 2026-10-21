"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { User, Package, Heart, Sparkles, MessageSquare, ArrowRight } from "lucide-react";
import { useShop } from "@/context/ShopContext";
import { PRODUCTS } from "@/data/products";
import PearlButton from "@/components/PearlButton";

export default function AccountPage() {
  const { wishlist, toggleWishlist } = useShop();
  const [activeTab, setActiveTab] = useState<"wishlist" | "orders" | "services">("wishlist");

  const wishlistProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="bg-ivory min-h-screen pt-24 pb-20 text-ink font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb */}
        <div className="text-xs font-mono tracking-widest text-muted uppercase space-x-2">
          <Link href="/" className="hover:text-ink">
            HOME
          </Link>
          <span>/</span>
          <span className="text-ink font-medium">PATRON PORTAL</span>
        </div>

        {/* Portal Header */}
        <div className="bg-cream border border-gold/30 rounded-2xl p-6 sm:p-8 shadow-soft flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-16 h-16 rounded-full bg-wine-900 text-gold-light border-2 border-gold flex items-center justify-center font-serif text-2xl font-bold shadow-md">
              <User className="w-7 h-7 text-gold-light" />
            </div>
            <div>
              <span className="text-[10px] tracking-[0.35em] text-gold-deep uppercase font-mono">
                AARSIKA PATRON SERVICES
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl font-normal text-wine-900">
                Patron Portal
              </h1>
              <p className="text-xs text-muted">
                Private collections, saved wishlist, and concierge services.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs bg-wine-900/10 border border-gold/40 text-wine-900 px-4 py-2 rounded-full font-mono flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-gold-deep" />
              <span>ACCOUNTS: COMING SOON</span>
            </span>
          </div>
        </div>

        {/* Portal Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 border-b border-gold/20 pb-4 text-xs font-mono">
          <button
            onClick={() => setActiveTab("wishlist")}
            className={`px-5 py-2 rounded-full transition-all flex items-center gap-2 ${
              activeTab === "wishlist"
                ? "bg-wine-900 text-ivory shadow-md border border-wine-900"
                : "bg-transparent text-muted border border-line hover:border-wine-900 hover:text-wine-900"
            }`}
          >
            <Heart className="w-3.5 h-3.5 text-gold" />
            <span>SAVED WISHLIST ({wishlistProducts.length})</span>
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`px-5 py-2 rounded-full transition-all flex items-center gap-2 ${
              activeTab === "orders"
                ? "bg-wine-900 text-ivory shadow-md border border-wine-900"
                : "bg-transparent text-muted border border-line hover:border-wine-900 hover:text-wine-900"
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>ORDER ASSISTANCE</span>
          </button>
          <button
            onClick={() => setActiveTab("services")}
            className={`px-5 py-2 rounded-full transition-all flex items-center gap-2 ${
              activeTab === "services"
                ? "bg-wine-900 text-ivory shadow-md border border-wine-900"
                : "bg-transparent text-muted border border-line hover:border-wine-900 hover:text-wine-900"
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>PATRON ACCOUNTS</span>
          </button>
        </div>

        {/* TAB 1: WISHLIST (Real data from local storage) */}
        {activeTab === "wishlist" && (
          <div className="space-y-4">
            {wishlistProducts.length === 0 ? (
              <div className="bg-cream border border-gold/30 rounded-2xl p-12 text-center space-y-4 shadow-soft">
                <div className="w-16 h-16 mx-auto rounded-full bg-ivory border border-gold/30 flex items-center justify-center text-gold">
                  <Heart className="w-8 h-8 fill-gold/20" />
                </div>
                <h3 className="font-serif text-2xl text-wine-900 font-normal">Your wishlist is currently empty.</h3>
                <p className="text-xs text-muted max-w-sm mx-auto font-light leading-relaxed">
                  Save your favorite pure attars and royal eau de parfum creations to revisit anytime.
                </p>
                <div className="pt-2">
                  <PearlButton href="/shop" variant="burgundy" size="md">
                    EXPLORE FRAGRANCES
                  </PearlButton>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlistProducts.map((p) => (
                  <div key={p.id} className="bg-cream border border-gold/30 rounded-2xl p-4 space-y-3 shadow-soft flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-sand">
                        <Image src={p.mainImage} alt={p.name} fill className="object-cover" />
                      </div>
                      <div>
                        <h4 className="font-serif text-lg font-normal text-wine-900">{p.name}</h4>
                        <p className="text-xs text-muted font-light">{p.type}</p>
                        <span className="font-serif font-bold text-base text-ink block mt-1">
                          ₹ {p.price.toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2 pt-2">
                      <Link
                        href={`/products/${p.slug}`}
                        className="flex-1 text-center py-2 bg-wine-900 text-ivory text-xs font-mono uppercase tracking-wider rounded-full hover:bg-crimson transition-colors"
                      >
                        VIEW ITEM
                      </Link>
                      <button
                        onClick={() => toggleWishlist(p.id)}
                        className="px-4 py-2 bg-ivory border border-gold/40 rounded-full text-xs font-mono text-muted hover:text-wine-900 transition-colors"
                      >
                        REMOVE
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: ORDER ASSISTANCE */}
        {activeTab === "orders" && (
          <div className="bg-cream border border-gold/30 rounded-2xl p-8 sm:p-12 shadow-soft space-y-6 text-center max-w-2xl mx-auto">
            <div className="w-16 h-16 mx-auto rounded-full bg-ivory border border-gold/30 flex items-center justify-center text-gold">
              <Package className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h3 className="font-serif text-2xl text-wine-900 font-normal">
                Order Tracking &amp; Delivery Support
              </h3>
              <p className="text-xs text-muted max-w-md mx-auto leading-relaxed">
                All online orders receive real-time courier tracking updates via SMS and WhatsApp. If you need immediate status updates on an existing order, please share your order number with our royal concierge desk.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <PearlButton
                href="https://wa.me/919876543210?text=Hello%20Aarsika%20Concierge,%20I%20would%20like%20to%20track%20my%20order."
                variant="burgundy"
                size="md"
                rightIcon={<MessageSquare className="w-3.5 h-3.5" />}
              >
                WHATSAPP CONCIERGE
              </PearlButton>
              <PearlButton href="/contact" variant="outline" size="md">
                EMAIL SUPPORT
              </PearlButton>
            </div>
          </div>
        )}

        {/* TAB 3: PATRON SERVICES / ACCOUNTS COMING SOON */}
        {activeTab === "services" && (
          <div className="bg-cream border border-gold/30 rounded-2xl p-8 sm:p-12 shadow-soft space-y-6 max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-ivory border border-gold/30 flex items-center justify-center text-gold">
              <User className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <span className="inline-block px-3 py-1 bg-wine-900 text-gold-light text-[10px] font-mono tracking-widest uppercase rounded-full">
                Portal In Development
              </span>
              <h3 className="font-serif text-3xl text-wine-900 font-normal">
                Online Accounts Coming Soon
              </h3>
              <p className="text-xs text-muted max-w-md mx-auto leading-relaxed">
                The Aarsika digital patron portal is launching soon. Registered patrons will enjoy bespoke scent consultation history, private vault allocations, and single-click checkout.
              </p>
            </div>
            <div className="pt-2">
              <PearlButton href="/shop" variant="burgundy" size="md" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                BROWSE THE COLLECTIONS
              </PearlButton>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
