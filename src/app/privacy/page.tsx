import React from "react";
import Link from "next/link";

export default function PrivacyPage() {
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
              Privacy Policy
            </li>
          </ol>
        </nav>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-3">
            <span className="h-[1px] w-8 bg-gold" />
            <span className="text-[11px] tracking-[0.3em] uppercase text-gold-deep font-semibold">
              Client Protection
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-normal text-wine-900 tracking-wide">
            Privacy Policy
          </h1>
        </div>

        <div className="bg-cream border border-gold/30 p-8 rounded-2xl shadow-soft text-sm text-muted space-y-5 leading-relaxed">
          <p>
            At Aarsika, protecting your personal information and privacy is paramount. This policy outlines how we collect, process, and safeguard your data when using our website and purchasing our luxury fragrance creations.
          </p>
          <div>
            <h3 className="font-serif text-lg font-medium text-wine-900 mb-1">1. Information We Collect</h3>
            <p>
              We collect essential order information including your name, shipping address, email address, phone number, and transaction details required to fulfill delivery and provide customer concierge assistance.
            </p>
          </div>
          <div>
            <h3 className="font-serif text-lg font-medium text-wine-900 mb-1">2. Payment Security</h3>
            <p>
              Online payment transactions are processed through 256-bit SSL encrypted channels via Razorpay. We never store credit card details or bank passwords on our servers.
            </p>
          </div>
          <div>
            <h3 className="font-serif text-lg font-medium text-wine-900 mb-1">3. Data Usage</h3>
            <p>
              Your details are strictly used to fulfill orders, issue tracking updates, and communicate patron offers if you have opted in. We never sell your personal information to third parties.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
