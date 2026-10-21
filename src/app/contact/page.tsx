"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Send, Check } from "lucide-react";
import { useShop } from "@/context/ShopContext";
import PearlButton from "@/components/PearlButton";

export default function ContactPage() {
  const { showToast } = useShop();
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast("Concierge message received.");
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
            <li className="text-wine-900 font-medium" aria-current="page">
              Contact
            </li>
          </ol>
        </nav>

        <div className="text-center space-y-3 max-w-xl mx-auto">
          <div className="inline-flex items-center justify-center gap-3">
            <span className="h-[1px] w-8 bg-gold" />
            <span className="text-[11px] tracking-[0.3em] uppercase text-gold-deep font-semibold">
              Royal Concierge
            </span>
            <span className="h-[1px] w-8 bg-gold" />
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-normal text-wine-900 tracking-wide">
            Contact Us
          </h1>
          <p className="text-sm text-muted">
            Our fragrance advisors are available to guide your scent profile selection or assist with custom orders.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="bg-cream border border-gold/30 p-8 rounded-2xl shadow-soft space-y-6 text-xs">
            <h3 className="font-serif text-2xl font-normal text-wine-900">Jaipur Atelier &amp; HQ</h3>
            <div className="space-y-4 text-muted">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-wine-900">Aarsika Royal Fragrances Atelier</p>
                  <p>108 Johari Bazaar, Near Hawa Mahal</p>
                  <p>Jaipur, Rajasthan — 302002, India</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gold shrink-0" />
                <p>+91 98765 43210 (Mon – Sat, 10 AM – 7 PM IST)</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gold shrink-0" />
                <p>concierge@aarsika.com</p>
              </div>
            </div>
          </div>

          {submitted ? (
            <div className="bg-cream border border-gold/30 p-8 rounded-2xl text-center space-y-4 flex flex-col justify-center shadow-soft">
              <Check className="w-12 h-12 text-wine-900 mx-auto" />
              <h3 className="font-serif text-2xl font-normal text-wine-900">Message Received</h3>
              <p className="text-sm text-muted">
                Our concierge desk will respond to {email} within 4 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-cream border border-gold/30 p-6 sm:p-8 rounded-2xl shadow-soft space-y-4 text-xs">
              <h3 className="font-serif text-2xl font-normal text-wine-900">Send a Message</h3>
              <div>
                <label className="block font-medium text-wine-900 uppercase tracking-wider text-[11px] mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-ivory border border-gold/30 p-3 rounded-lg text-ink focus:outline-none focus:border-gold"
                />
              </div>
              <div>
                <label className="block font-medium text-wine-900 uppercase tracking-wider text-[11px] mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-ivory border border-gold/30 p-3 rounded-lg text-ink focus:outline-none focus:border-gold"
                />
              </div>
              <div>
                <label className="block font-medium text-wine-900 uppercase tracking-wider text-[11px] mb-1">How can we assist you?</label>
                <textarea
                  required
                  placeholder="Inquire about fragrance matching, bulk orders or custom notes..."
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  className="w-full bg-ivory border border-gold/30 p-3 rounded-lg text-ink focus:outline-none focus:border-gold h-24"
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
                    <span>Send Concierge Message</span>
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
