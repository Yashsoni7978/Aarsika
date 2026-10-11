"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FAQPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      id: "batches",
      category: "NUMBERED BATCHES",
      q: "How do numbered batches work?",
      a: "Every fragrance is released in a small, numbered batch. When a batch is gone, it is gone until the next one. Your bottle arrives with its own number.",
    },
    {
      id: "attar-application",
      category: "APPLICATION & CARE",
      q: "How should I apply concentrated attar oils?",
      a: "Dab a drop using the glass wand applicator directly onto pulse points—wrists, neck, and behind earlobes. Body warmth unfolds the fragrance notes through the day.",
    },
    {
      id: "shipping",
      category: "ORDERS & SHIPPING",
      q: "What are your delivery timelines across India?",
      a: "Orders are dispatched within 24 hours. Standard delivery takes 2–4 business days for major metropolitan areas and 3–5 business days for other destinations. Shipping is complimentary across India.",
    },
    {
      id: "payment",
      category: "PAYMENT METHODS",
      q: "What payment methods are supported?",
      a: "We support UPI (Google Pay, PhonePe, Paytm), all major debit and credit cards, net banking, and Cash on Delivery for eligible pincodes.",
    },
    {
      id: "returns",
      category: "RETURNS & REPLACEMENTS",
      q: "What is your replacement policy?",
      a: "If a bottle arrives broken or damaged during transit, we offer an immediate complimentary replacement upon receipt of delivery notification. A GST invoice accompanies every order.",
    },
    {
      id: "gifting",
      category: "GIFTING",
      q: "Do you offer gift boxes and personalized notes?",
      a: "Yes. Our boxed gift sets arrive ready to give with elegant presentation packaging. You may also include a bespoke message during checkout.",
    },
  ];

  return (
    <div className="bg-[#F6EFE2] min-h-screen text-[#1a1411] pt-28 pb-24">
      <div className="max-w-4xl mx-auto px-5 sm:px-8 space-y-12">
        <div className="text-center space-y-3">
          <span className="text-[11px] tracking-[0.25em] text-[#C9A55C] uppercase font-mono">
            HELP & INFORMATION
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-normal text-[#1a1411]">
            Frequently Asked Questions
          </h1>
          <p className="text-sm text-[#6b5f55] max-w-md mx-auto font-light leading-relaxed">
            Guidance on our small-batch fragrances, numbered releases, application, and complimentary shipping across India.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((f, i) => (
            <div
              key={f.id}
              id={f.id}
              className="bg-[#FBF6EA] border border-[#dccfb6] transition-colors hover:border-[#C9A55C] scroll-mt-24"
            >
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="w-full p-6 text-left flex justify-between items-center gap-4 focus:outline-none"
                aria-expanded={openIdx === i}
              >
                <div className="space-y-1">
                  <span className="text-[10px] font-mono tracking-[0.2em] text-[#C9A55C] uppercase block">
                    {f.category}
                  </span>
                  <h3 className="font-serif text-lg sm:text-xl text-[#1a1411]">
                    {f.q}
                  </h3>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-[#C9A55C] transition-transform duration-300 ${
                    openIdx === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIdx === i && (
                <div className="px-6 pb-6 pt-0 text-sm text-[#4a3f35] font-light leading-relaxed border-t border-[#dccfb6]/60">
                  <p className="pt-3">{f.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
