"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, Send, Check } from "lucide-react";
import { useShop } from "@/context/ShopContext";
import PearlButton from "@/components/PearlButton";

export default function CorporateGiftingPage() {
  const { showToast } = useShop();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    quantity: "50-100 Units",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast("Corporate gifting inquiry received!");
  };

  return (
    <div className="bg-ivory min-h-screen py-10 sm:py-16 text-ink">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="pt-2 text-center">
          <ol className="inline-flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase text-muted">
            <li>
              <Link href="/" className="hover:text-wine-900 transition-colors">
                Home
              </Link>
            </li>
            <li className="text-gold/60">/</li>
            <li>
              <Link href="/collections/gifting" className="hover:text-wine-900 transition-colors">
                Gifting
              </Link>
            </li>
            <li className="text-gold/60">/</li>
            <li className="text-wine-900 font-medium" aria-current="page">
              Corporate Gifting
            </li>
          </ol>
        </nav>

        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center justify-center gap-3">
            <span className="h-[1px] w-8 bg-gold" />
            <span className="text-[11px] tracking-[0.3em] uppercase text-gold-deep font-semibold">
              Executive Gifts &amp; Partner Honors
            </span>
            <span className="h-[1px] w-8 bg-gold" />
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-normal text-wine-900 tracking-wide">
            Corporate Gifting
          </h1>
          <p className="text-sm text-muted leading-relaxed">
            Distinguished fragrance gift boxes featuring custom logo embossing, bespoke attar curations, and executive presentation flacons.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="relative aspect-square w-full rounded-2xl overflow-hidden border border-gold/30 shadow-royal">
            <Image src="/images/royal-gift-box.jpg" alt="Corporate Executive Gift Box" fill className="object-cover" />
          </div>

          {submitted ? (
            <div className="bg-cream border border-gold/30 p-8 rounded-2xl text-center space-y-4 shadow-soft">
              <Check className="w-12 h-12 text-wine-900 mx-auto" />
              <h3 className="font-serif text-2xl text-wine-900">Corporate Inquiry Sent</h3>
              <p className="text-sm text-muted">
                Our corporate relations desk will issue a formal quotation and sample set within 12 business hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-cream border border-gold/30 p-6 sm:p-8 rounded-2xl shadow-soft space-y-4 text-xs">
              <h3 className="font-serif text-2xl text-wine-900">Corporate Concierge</h3>
              <div>
                <label className="block font-medium text-wine-900 uppercase tracking-wider text-[11px] mb-1">Company Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Acme Enterprises"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="w-full bg-ivory border border-gold/30 p-3 rounded-lg text-ink focus:outline-none focus:border-gold"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-wine-900 uppercase tracking-wider text-[11px] mb-1">Contact Person</label>
                  <input
                    type="text"
                    required
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    className="w-full bg-ivory border border-gold/30 p-3 rounded-lg text-ink focus:outline-none focus:border-gold"
                  />
                </div>
                <div>
                  <label className="block font-medium text-wine-900 uppercase tracking-wider text-[11px] mb-1">Corporate Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-ivory border border-gold/30 p-3 rounded-lg text-ink focus:outline-none focus:border-gold"
                  />
                </div>
              </div>
              <div>
                <label className="block font-medium text-wine-900 uppercase tracking-wider text-[11px] mb-1">Estimated Order Volume</label>
                <select
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  className="w-full bg-ivory border border-gold/30 p-3 rounded-lg text-ink focus:outline-none font-medium"
                >
                  <option value="25-50 Gift Chests">25-50 Gift Chests</option>
                  <option value="50-100 Gift Chests">50-100 Gift Chests</option>
                  <option value="100-250 Gift Chests">100-250 Gift Chests</option>
                  <option value="250+ Bespoke Corporate Order">250+ Bespoke Corporate Order</option>
                </select>
              </div>
              <div>
                <label className="block font-medium text-wine-900 uppercase tracking-wider text-[11px] mb-1">Custom Branding / Logo Embossing</label>
                <textarea
                  placeholder="Specify branding requirements or delivery dates..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full bg-ivory border border-gold/30 p-3 rounded-lg text-ink focus:outline-none focus:border-gold h-20"
                />
              </div>
              <div className="pt-2">
                <PearlButton
                  variant="primary"
                  fullWidth
                  className="!py-3.5"
                >
                  <span className="flex items-center justify-center gap-2">
                    <Send className="w-4 h-4" />
                    <span>Request Corporate Quotation</span>
                  </span>
                </PearlButton>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
