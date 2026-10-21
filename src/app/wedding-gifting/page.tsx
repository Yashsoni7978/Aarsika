"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, Send, Check } from "lucide-react";
import { useShop } from "@/context/ShopContext";
import PearlButton from "@/components/PearlButton";

export default function WeddingGiftingPage() {
  const { showToast } = useShop();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventDate: "",
    guestCount: "100-250 Guests",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast("Wedding concierge inquiry received!");
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
              Wedding Gifting
            </li>
          </ol>
        </nav>

        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center justify-center gap-3">
            <span className="h-[1px] w-8 bg-gold" />
            <span className="text-[11px] tracking-[0.3em] uppercase text-gold-deep font-semibold">
              Bespoke Favors &amp; Wardrobes
            </span>
            <span className="h-[1px] w-8 bg-gold" />
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-normal text-wine-900 tracking-wide">
            Royal Wedding Gifting
          </h1>
          <p className="text-sm text-muted leading-relaxed">
            Curate personalized attar favor boxes embossed with your gold monogram or wedding crest for distinguished guests.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="relative aspect-square w-full rounded-2xl overflow-hidden border border-gold/30 shadow-royal">
            <Image src="/images/royal-gift-box.jpg" alt="Wedding Gift Chest" fill className="object-cover" />
          </div>

          {submitted ? (
            <div className="bg-cream border border-gold/30 p-8 rounded-2xl text-center space-y-4 shadow-soft">
              <Check className="w-12 h-12 text-wine-900 mx-auto" />
              <h3 className="font-serif text-2xl text-wine-900">Inquiry Received</h3>
              <p className="text-sm text-muted">
                Our wedding concierge will contact you within 12 hours with custom catalog pricing and sample box arrangements.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-cream border border-gold/30 p-6 sm:p-8 rounded-2xl shadow-soft space-y-4 text-xs">
              <h3 className="font-serif text-2xl text-wine-900">Wedding Concierge Inquiry</h3>
              <div>
                <label className="block font-medium text-wine-900 uppercase tracking-wider text-[11px] mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="Bride/Groom or Planner Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-ivory border border-gold/30 p-3 rounded-lg text-ink focus:outline-none focus:border-gold"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-wine-900 uppercase tracking-wider text-[11px] mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-ivory border border-gold/30 p-3 rounded-lg text-ink focus:outline-none focus:border-gold"
                  />
                </div>
                <div>
                  <label className="block font-medium text-wine-900 uppercase tracking-wider text-[11px] mb-1">Phone</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-ivory border border-gold/30 p-3 rounded-lg text-ink focus:outline-none focus:border-gold"
                  />
                </div>
              </div>
              <div>
                <label className="block font-medium text-wine-900 uppercase tracking-wider text-[11px] mb-1">Estimated Quantity</label>
                <select
                  value={formData.guestCount}
                  onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
                  className="w-full bg-ivory border border-gold/30 p-3 rounded-lg text-ink focus:outline-none font-medium"
                >
                  <option value="50-100 Favor Boxes">50-100 Favor Boxes</option>
                  <option value="100-250 Favor Boxes">100-250 Favor Boxes</option>
                  <option value="250-500 Favor Boxes">250-500 Favor Boxes</option>
                  <option value="500+ Grand Wedding">500+ Grand Wedding</option>
                </select>
              </div>
              <div>
                <label className="block font-medium text-wine-900 uppercase tracking-wider text-[11px] mb-1">Special Customization Requests</label>
                <textarea
                  placeholder="Custom monogram, fragrance preferences, ribbon colors..."
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
                    <span>Request Wedding Catalog &amp; Samples</span>
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
