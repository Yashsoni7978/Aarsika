"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck } from "lucide-react";
import { useShop } from "@/context/ShopContext";
import PearlButton from "./PearlButton";

export const CartDrawer: React.FC = () => {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, cartTotal } = useShop();

  if (!isCartOpen) return null;

  const freeShippingThreshold = 3000;
  const progressPercent = Math.min(100, (cartTotal / freeShippingThreshold) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity animate-in fade-in duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FFF9F1] border-l border-[#C49A52]/30 shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-6 border-b border-[#C49A52]/20 bg-[#F8F1E7] flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5 text-[#17345F]" />
              <h2 className="font-serif text-2xl font-bold tracking-wide text-[#17345F]">
                YOUR BAG
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-[#756B63] hover:text-[#B94D70] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress */}
          <div className="px-6 py-3 bg-[#17345F] text-[#FFF9F1] text-xs">
            {cartTotal >= freeShippingThreshold ? (
              <p className="text-center font-medium text-[#DDBD78]">
                ✓ You qualify for Complimentary Royal Shipping & Box!
              </p>
            ) : (
              <div>
                <p className="text-center mb-1.5 text-[11px] tracking-wide">
                  Add <span className="font-bold text-[#DDBD78]">₹ {(freeShippingThreshold - cartTotal).toLocaleString("en-IN")}</span> more for Free Royal Shipping
                </p>
                <div className="w-full h-1.5 bg-[#102746] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#C49A52] transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#F8F1E7] border border-[#C49A52]/30 flex items-center justify-center text-[#C49A52]">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl font-semibold text-[#30070D]">
                  Your Bag is Empty
                </h3>
                <p className="text-xs text-[#756B63] max-w-xs mx-auto">
                  Explore our royal collection of hand-distilled attars, eau de parfum, and luxury gift sets.
                </p>
                <div className="pt-2">
                  <PearlButton
                    href="/shop"
                    onClick={() => setIsCartOpen(false)}
                    variant="burgundy"
                    size="md"
                  >
                    DISCOVER FRAGRANCES
                  </PearlButton>
                </div>
              </div>
            ) : (
              cart.map((item, index) => (
                <div
                  key={`${item.product.id}-${item.size}-${index}`}
                  className="flex gap-4 p-4 bg-[#F8F1E7]/60 border border-[#C49A52]/20 rounded-md relative"
                >
                  {/* Image */}
                  <div className="relative w-20 h-24 bg-[#F8F1E7] rounded overflow-hidden shrink-0 border border-[#C49A52]/20">
                    <Image
                      src={item.product.mainImage}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <h4 className="font-serif text-lg font-semibold text-[#17345F]">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id, item.size)}
                          className="text-[#756B63] hover:text-[#B94D70] transition-colors p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-[11px] text-[#756B63] uppercase tracking-wider">
                        {item.size}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-[#C49A52]/40 rounded bg-[#FFF9F1]">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)}
                          className="px-2 py-1 text-[#756B63] hover:text-[#241C1B]"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-semibold text-[#241C1B]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                          className="px-2 py-1 text-[#756B63] hover:text-[#241C1B]"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Line Item Total */}
                      <span className="font-serif font-bold text-base text-[#241C1B]">
                        ₹ {(item.product.price * item.quantity).toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Subtotal & Checkout */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-[#C49A52]/20 bg-[#F8F1E7] space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#756B63] uppercase tracking-wider text-xs font-medium">
                  SUBTOTAL
                </span>
                <span className="font-serif text-2xl font-bold text-[#30070D]">
                  ₹ {cartTotal.toLocaleString("en-IN")}
                </span>
              </div>
              <p className="text-[11px] text-[#756B63] italic">
                Taxes & complimentary royal gift box included at checkout.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <PearlButton
                  href="/cart"
                  onClick={() => setIsCartOpen(false)}
                  variant="champagne"
                  size="md"
                  fullWidth
                >
                  VIEW BAG
                </PearlButton>
                <PearlButton
                  href="/checkout"
                  onClick={() => setIsCartOpen(false)}
                  variant="burgundy"
                  size="md"
                  fullWidth
                  rightIcon={<ArrowRight className="w-3.5 h-3.5 text-[#C69A45]" />}
                >
                  CHECKOUT
                </PearlButton>
              </div>

              <div className="flex items-center justify-center gap-2 text-[10px] text-[#756B63] uppercase tracking-wider pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C49A52]" />
                <span>100% Authentic Artisanal Fragrances Direct From Jaipur</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
