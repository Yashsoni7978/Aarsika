"use client";

import React from "react";
import Link from "next/link";
import { MapPin, ArrowLeft, Sparkles } from "lucide-react";
import PearlButton from "@/components/PearlButton";

export default function AccountAddressesPage() {
  return (
    <div className="bg-ivory min-h-screen pt-28 pb-20 text-ink">
      <div className="max-w-4xl mx-auto px-6 sm:px-10 space-y-8">
        <Link
          href="/account"
          className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-gold-deep hover:text-wine-900 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Account</span>
        </Link>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-3">
            <span className="h-[1px] w-8 bg-gold" />
            <span className="text-[11px] tracking-[0.3em] uppercase text-gold-deep font-semibold">
              Delivery Archives
            </span>
            <span className="h-[1px] w-8 bg-gold" />
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-normal text-wine-900">
            Saved Addresses
          </h1>
        </div>

        {/* Coming Soon / Empty State */}
        <div className="bg-cream border border-gold/30 rounded-2xl p-8 sm:p-12 text-center space-y-4 max-w-xl shadow-soft">
          <div className="w-16 h-16 mx-auto rounded-full bg-ivory border border-gold/30 flex items-center justify-center text-gold">
            <MapPin className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <span className="inline-block px-3 py-1 bg-wine-900 text-gold-light text-[10px] font-mono tracking-widest uppercase rounded-full">
              Coming Soon
            </span>
            <h3 className="font-serif text-2xl text-wine-900 font-normal">
              Address Book Coming Soon
            </h3>
            <p className="text-xs text-muted max-w-md mx-auto leading-relaxed">
              Saved delivery addresses and multi-destination gift shipping profiles will be available once online patron accounts launch. You can enter your delivery address directly during checkout.
            </p>
          </div>
          <div className="pt-2">
            <PearlButton href="/shop" variant="burgundy" size="md">
              EXPLORE FRAGRANCES
            </PearlButton>
          </div>
        </div>
      </div>
    </div>
  );
}
