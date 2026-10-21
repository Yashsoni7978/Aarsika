import React from "react";
import Link from "next/link";
import { FREE_SHIPPING_THRESHOLD, STANDARD_SHIPPING_FEE } from "@/config/shop";

export default function ShippingPolicyPage() {
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
              Shipping &amp; Packaging Policy
            </li>
          </ol>
        </nav>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-3">
            <span className="h-[1px] w-8 bg-gold" />
            <span className="text-[11px] tracking-[0.3em] uppercase text-gold-deep font-semibold">
              Delivery &amp; Fulfillment
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-normal text-wine-900 tracking-wide">
            Shipping &amp; Packaging Policy
          </h1>
        </div>

        <div className="bg-cream border border-gold/30 p-8 rounded-2xl shadow-soft text-sm text-muted space-y-5 leading-relaxed">
          <p>
            Every Aarsika parcel is packaged in cushioned gold-embossed presentation boxes to ensure your luxury flacons arrive safely and pristinely.
          </p>
          <div>
            <h3 className="font-serif text-lg font-medium text-wine-900 mb-1">1. Shipping Timelines</h3>
            <p>
              Orders placed before 2:00 PM IST are dispatched on the same business day via premium courier partners (Blue Dart, Shiprocket, Delhivery). Delivery typically takes 2 to 4 business days across India.
            </p>
          </div>
          <div>
            <h3 className="font-serif text-lg font-medium text-wine-900 mb-1">2. Free Shipping Threshold</h3>
            <p>
              Complimentary express delivery applies automatically on all orders of ₹{FREE_SHIPPING_THRESHOLD.toLocaleString('en-IN')} and above. For orders below this threshold, a flat delivery fee of ₹{STANDARD_SHIPPING_FEE} is applied at checkout.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
