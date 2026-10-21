import React from "react";
import Link from "next/link";

export default function CancellationPolicyPage() {
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
              Cancellation &amp; Refund Policy
            </li>
          </ol>
        </nav>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-3">
            <span className="h-[1px] w-8 bg-gold" />
            <span className="text-[11px] tracking-[0.3em] uppercase text-gold-deep font-semibold">
              Client Assistance
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-normal text-wine-900 tracking-wide">
            Cancellation &amp; Refund Policy
          </h1>
        </div>

        <div className="bg-cream border border-gold/30 p-8 rounded-2xl shadow-soft text-sm text-muted space-y-5 leading-relaxed">
          <p>
            Orders can be cancelled free of charge prior to dispatch. If dispatched, our 7-day return policy applies.
          </p>
          <div>
            <h3 className="font-serif text-lg font-medium text-wine-900 mb-1">1. Cancellation Process</h3>
            <p>
              Contact our concierge team at <a href="mailto:concierge@aarsika.com" className="text-wine-900 underline hover:text-gold">concierge@aarsika.com</a> or submit a request via our returns portal with your order number.
            </p>
          </div>
          <div>
            <h3 className="font-serif text-lg font-medium text-wine-900 mb-1">2. Refund Timelines</h3>
            <p>
              Approved refunds are credited to your original payment method within 3–5 business days upon receipt and inspection of returned goods.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
