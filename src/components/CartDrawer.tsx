"use client";

import React from "react";
import Image from "next/image";
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck } from "lucide-react";
import { useShop } from "@/context/ShopContext";
import { FREE_SHIPPING_THRESHOLD } from "@/config/shop";
import PearlButton from "./PearlButton";

export const CartDrawer: React.FC = () => {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, cartTotal } = useShop();

  if (!isCartOpen) return null;

  const freeShippingThreshold = FREE_SHIPPING_THRESHOLD;
  const progressPercent = Math.min(100, (cartTotal / freeShippingThreshold) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity animate-in fade-in duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-ivory border-l border-gold/30 shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-6 border-b border-gold/20 bg-cream flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5 text-wine-900" />
              <h2 className="font-serif text-2xl font-bold tracking-wide text-wine-900">
                YOUR BAG
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-muted hover:text-wine-900 transition-colors"
              aria-label="Close Bag"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress (Burgundy with Gold Progress Bar) */}
          <div className="px-6 py-3.5 bg-wine-900 text-ivory text-xs">
            {cartTotal >= freeShippingThreshold ? (
              <p className="text-center font-medium text-gold-light">
                ✓ You qualify for Complimentary Royal Shipping & Box!
              </p>
            ) : (
              <div>
                <p className="text-center mb-1.5 text-[11px] tracking-wide text-ivory">
                  Add <span className="font-bold text-gold-light">₹ {(freeShippingThreshold - cartTotal).toLocaleString("en-IN")}</span> more for Free Royal Shipping
                </p>
                <div className="w-full h-1.5 bg-wine-950 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gold transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-cream border border-gold/30 flex items-center justify-center text-gold">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl font-semibold text-wine-900">
                  Your Bag is Empty
                </h3>
                <p className="text-xs text-muted max-w-xs mx-auto leading-relaxed">
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
              cart.map((item, index) => {
                const itemImg = item.product.mainImage && item.product.mainImage !== 'placeholder'
                  ? item.product.mainImage
                  : '/photos/attars/sehar-e-gulab.jpg';

                return (
                  <div
                    key={`${item.product.id}-${item.size}-${index}`}
                    className="flex gap-4 p-4 bg-cream border border-gold/20 rounded-md relative shadow-xs"
                  >
                    {/* Image with fallback */}
                    <div className="relative w-20 h-24 bg-sand rounded overflow-hidden shrink-0 border border-gold/20">
                      <Image
                        src={itemImg}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between">
                          <h4 className="font-serif text-lg font-semibold text-ink">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.product.id, item.size)}
                            className="text-muted hover:text-wine-900 transition-colors p-1"
                            aria-label={`Remove ${item.product.name}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-[11px] text-muted uppercase tracking-wider">
                          {item.size}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        {/* Quantity Controls */}
                        <div className="flex items-center border border-gold/40 rounded bg-cream">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)}
                            className="px-2 py-1 text-muted hover:text-ink"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2.5 text-xs font-semibold text-ink">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                            className="px-2 py-1 text-muted hover:text-ink"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Line Item Total */}
                        <span className="font-serif font-bold text-base text-ink">
                          ₹ {(item.product.price * item.quantity).toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Subtotal & Checkout */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-gold/20 bg-cream space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted uppercase tracking-wider text-xs font-medium font-mono">
                  SUBTOTAL
                </span>
                <span className="font-serif text-2xl font-bold text-wine-900">
                  ₹ {cartTotal.toLocaleString("en-IN")}
                </span>
              </div>
              <p className="text-[11px] text-muted italic">
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
                  rightIcon={<ArrowRight className="w-3.5 h-3.5 text-gold" />}
                >
                  CHECKOUT
                </PearlButton>
              </div>

              <div className="flex items-center justify-center gap-2 text-[10px] text-muted uppercase tracking-wider pt-1 font-mono">
                <ShieldCheck className="w-3.5 h-3.5 text-gold" />
                <span>100% Authentic Artisanal Fragrances Direct From Jaipur</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
