import React from "react";
import Link from "next/link";
import { FREE_SHIPPING_THRESHOLD } from "@/config/shop";

export default function TermsPage() {
  return (
    <div className="bg-ivory min-h-screen py-10 sm:py-16 text-ink">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="pt-2">
          <ol className="inline-flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase text-muted">
            <li>
              <Link href="/" className="hover:text-wine-900 transition-colors">
                Home
              </Link>
            </li>
            <li className="text-gold/60">/</li>
            <li className="text-wine-900 font-medium" aria-current="page">
              Terms of Service
            </li>
          </ol>
        </nav>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-3">
            <span className="h-[1px] w-8 bg-gold" />
            <span className="text-[11px] tracking-[0.3em] uppercase text-gold-deep font-semibold">
              Client Agreement
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-normal text-wine-900 tracking-wide">
            Terms of Service
          </h1>
        </div>

        <div className="bg-cream border border-gold/30 p-8 rounded-2xl shadow-soft text-sm text-muted space-y-5 leading-relaxed">
          <p>
            By placing an order on Aarsika, you agree to the terms governing order placement, shipping timelines, and artisanal product characteristics.
          </p>
          <div>
            <h3 className="font-serif text-lg font-medium text-wine-900 mb-1">1. Artisanal Batch Variations</h3>
            <p>
              Because our attars and perfumes contain natural botanical extractions (such as Kashmir Saffron, Damask Rose, and Sandalwood), minor harvest color variations may occur naturally across artisanal batches.
            </p>
          </div>
          <div>
            <h3 className="font-serif text-lg font-medium text-wine-900 mb-1">2. Pricing &amp; Taxes</h3>
            <p>
              All prices displayed on the store include applicable GST taxes. Shipping fees are calculated at checkout and are complimentary on orders of ₹{FREE_SHIPPING_THRESHOLD.toLocaleString('en-IN')} and above.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
