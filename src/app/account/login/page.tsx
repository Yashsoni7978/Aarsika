"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { useShop } from "@/context/ShopContext";
import PearlButton from "@/components/PearlButton";

export default function AccountLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="bg-ivory min-h-screen pt-28 pb-20 text-ink">
      <div className="max-w-md mx-auto px-6 space-y-6">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-center">
          <ol className="inline-flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase text-muted">
            <li>
              <Link href="/" className="hover:text-wine-900 transition-colors">
                Home
              </Link>
            </li>
            <li className="text-gold/60">/</li>
            <li>
              <Link href="/account" className="hover:text-wine-900 transition-colors">
                Account
              </Link>
            </li>
            <li className="text-gold/60">/</li>
            <li className="text-wine-900 font-medium" aria-current="page">
              Login
            </li>
          </ol>
        </nav>

        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center gap-3">
            <span className="h-[1px] w-8 bg-gold" />
            <span className="text-[11px] tracking-[0.3em] uppercase text-gold-deep font-semibold">
              Aarsika Patron Portal
            </span>
            <span className="h-[1px] w-8 bg-gold" />
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-normal text-wine-900">
            Client Login
          </h1>
          <p className="text-sm text-muted">
            Online patron accounts and digital bespoke fragrance profiles.
          </p>
        </div>

        {/* Coming Soon Notice Card */}
        <div className="bg-cream border border-gold/40 p-4 rounded-xl text-center space-y-1.5 shadow-soft">
          <span className="inline-block px-2.5 py-0.5 bg-wine-900 text-gold-light text-[10px] font-mono tracking-widest uppercase rounded-full">
            Coming Soon
          </span>
          <p className="text-xs font-serif text-wine-900 font-medium">
            Accounts are coming soon
          </p>
          <p className="text-[11px] text-muted leading-relaxed">
            Patron authentication and order tracking are currently in preparation. Checkout and order confirmation via WhatsApp and SMS remain fully active.
          </p>
        </div>

        <form onSubmit={handleLogin} className="bg-cream border border-gold/30 p-8 rounded-2xl shadow-soft space-y-5 text-xs opacity-75">
          <div className="space-y-1">
            <label className="text-[11px] font-medium tracking-wider uppercase text-muted block">
              Email Address
            </label>
            <input
              type="email"
              disabled
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-ivory/60 border border-gold/30 px-4 py-3 rounded-lg text-xs text-muted cursor-not-allowed focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-medium tracking-wider uppercase text-muted block">
              Password
            </label>
            <input
              type="password"
              disabled
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-ivory/60 border border-gold/30 px-4 py-3 rounded-lg text-xs text-muted cursor-not-allowed focus:outline-none"
            />
          </div>

          <div className="pt-2">
            <button
              type="button"
              disabled
              className="w-full py-3.5 bg-wine-900/40 text-ivory/70 cursor-not-allowed rounded-full text-xs font-mono uppercase tracking-wider text-center"
            >
              Sign In Disabled (Coming Soon)
            </button>
          </div>
        </form>

        <div className="text-center text-xs text-muted space-y-2">
          <p>
            Questions regarding an order?{" "}
            <Link href="/contact" className="text-wine-900 underline font-medium hover:text-gold">
              Contact Concierge
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
