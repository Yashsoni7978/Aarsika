"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, Mail, ArrowRight } from "lucide-react";
import { useShop } from "@/context/ShopContext";

export default function AccountLoginPage() {
  const router = useRouter();
  const { showToast } = useShop();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    showToast("Signed in successfully");
    router.push("/account");
  };

  return (
    <div className="bg-[#F8F1E7] min-h-screen pt-32 pb-24 text-[#17345F]">
      <div className="max-w-md mx-auto px-6 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#C49A52]">
            MEHRAAB PATRON PORTAL
          </span>
          <h1 className="font-serif text-4xl font-light text-[#17345F]">CLIENT LOGIN</h1>
          <p className="text-xs text-[#756B63] font-light">
            Sign in to access your order history, saved addresses, and wishlist.
          </p>
        </div>

        <form onSubmit={handleLogin} className="bg-[#FFF9F1] border border-[#C49A52]/30 p-8 space-y-5">
          <div className="space-y-1">
            <label className="text-[10px] font-mono tracking-wider uppercase text-[#17345F] block">
              EMAIL ADDRESS
            </label>
            <input
              type="email"
              required
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#F6EFE2] border border-[#dccfb6] px-4 py-3 text-xs text-[#1a1411] focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-mono tracking-wider uppercase text-[#17345F] block">
              PASSWORD
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#F8F1E7] border border-[#C49A52]/40 px-4 py-3 text-xs text-[#17345F] focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-[#17345F] hover:bg-[#C49A52] hover:text-[#17345F] text-[#F8F1E7] text-xs font-mono tracking-[0.2em] uppercase transition-colors flex items-center justify-center gap-2"
          >
            <span>SIGN IN TO PORTAL</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[1.4]" />
          </button>
        </form>

        <div className="text-center text-xs text-[#756B63] font-light space-y-2">
          <p>
            Don&apos;t have an account?{" "}
            <Link href="/account/register" className="text-[#C49A52] underline font-medium">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
