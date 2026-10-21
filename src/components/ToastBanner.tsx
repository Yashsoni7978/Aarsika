"use client";

import React from "react";
import { Sparkles } from "lucide-react";
import { useShop } from "@/context/ShopContext";

export const ToastBanner: React.FC = () => {
  const { toastMessage } = useShop();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
      <div className="bg-wine-900 text-cream border border-gold/40 px-5 py-3.5 rounded-full shadow-2xl flex items-center gap-3">
        <Sparkles className="w-4 h-4 text-gold shrink-0" />
        <span className="text-xs tracking-wider uppercase font-medium">{toastMessage}</span>
      </div>
    </div>
  );
};
