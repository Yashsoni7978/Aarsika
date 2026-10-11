"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck, Tag, Sparkles } from "lucide-react";
import { useShop } from "@/context/ShopContext";
import PearlButton from "@/components/PearlButton";

export default function CartPage() {
  const { cart, cartTotal, updateQuantity, removeFromCart, showToast } = useShop();

  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discountAmount: number } | null>(null);
  const [isCheckingCoupon, setIsCheckingCoupon] = useState(false);

  const freeShippingThreshold = 3000;
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - cartTotal);
  const shippingProgress = Math.min(100, (cartTotal / freeShippingThreshold) * 100);

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode) return;
    setIsCheckingCoupon(true);
    try {
      const res = await fetch("/api/coupons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: couponCode, cartTotal })
      });
      const data = await res.json();
      if (data.success) {
        setAppliedCoupon({ code: data.code, discountAmount: data.discountAmount });
        showToast(data.message);
      } else {
        showToast(data.message);
      }
    } catch (e) {
      showToast("Error validating coupon code");
    } finally {
      setIsCheckingCoupon(false);
    }
  };

  const discount = appliedCoupon ? appliedCoupon.discountAmount : 0;
  const taxableSubtotal = Math.max(0, cartTotal - discount);
  const estimatedTax = Math.round(taxableSubtotal * 0.18); // 18% GST
  const finalTotal = taxableSubtotal;

  if (cart.length === 0) {
    return (
      <div className="bg-[#F8F1E7] min-h-screen py-24 text-[#241C1B]">
        <div className="max-w-xl mx-auto px-4 text-center space-y-6">
          <div className="w-20 h-20 mx-auto rounded-full bg-[#FFF9F1] border border-[#C49A52]/40 flex items-center justify-center shadow-soft text-[#17345F]">
            <ShoppingBag className="w-10 h-10 stroke-[1.5]" />
          </div>
          <span className="text-[10px] tracking-[0.35em] text-[#9D6A26] uppercase font-bold">YOUR SHOPPING BAG IS EMPTY</span>
          <h1 className="font-serif text-4xl font-normal text-[#30070D]">EXPLORE OUR SIGNATURE FRAGRANCES</h1>
          <p className="text-xs text-[#6b5f55] max-w-sm mx-auto leading-relaxed font-light">
            Discover concentrated attars, royal eau de parfum, rare oud decanters, and luxury gifting boxes.
          </p>
          <div className="pt-4">
            <PearlButton
              href="/shop"
              variant="burgundy"
              size="lg"
              rightIcon={<ArrowRight className="w-4 h-4 text-[#C69A45]" />}
            >
              DISCOVER COLLECTIONS
            </PearlButton>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F8F1E7] min-h-screen py-16 text-[#241C1B]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-2">
          <span className="text-[11px] tracking-[0.35em] text-[#C49A52] uppercase font-bold">
            ROYAL SELECTION
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#17345F]">
            YOUR SHOPPING BAG ({cart.length})
          </h1>
        </div>

        {/* Free Shipping Progress Bar */}
        <div className="bg-[#FFF9F1] border border-[#C49A52]/30 p-4 rounded-xl text-center space-y-2 shadow-soft">
          {amountNeededForFreeShipping > 0 ? (
            <p className="text-xs font-semibold text-[#17345F]">
              Add <span className="text-[#B94D70] font-bold">₹ {amountNeededForFreeShipping.toLocaleString("en-IN")}</span> more to unlock <span className="text-[#C49A52] font-bold">Free Express Delivery &amp; Royal Sample Chest</span>!
            </p>
          ) : (
            <p className="text-xs font-bold text-[#176B58] flex items-center justify-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#C49A52]" />
              Congratulations! Your order qualifies for Free Express Delivery &amp; Complimentary Sample Box.
            </p>
          )}
          <div className="w-full bg-[#EFE6D8] h-2 rounded-full overflow-hidden max-w-md mx-auto">
            <div className="bg-[#C49A52] h-full transition-all duration-500" style={{ width: `${shippingProgress}%` }}></div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Cart Items List */}
          <div className="lg:col-span-7 space-y-4">
            {cart.map((item, idx) => (
              <div
                key={`${item.product.id}-${item.size}`}
                className="bg-[#FFF9F1] border border-[#C49A52]/30 rounded-xl p-4 sm:p-6 shadow-soft flex gap-4 sm:gap-6 items-center justify-between"
              >
                <div className="relative w-20 h-24 sm:w-24 sm:h-28 bg-[#F8F1E7] rounded-lg overflow-hidden border border-[#C49A52]/20 shrink-0">
                  <Image src={item.product.mainImage} alt={item.product.name} fill className="object-cover" />
                </div>

                <div className="flex-1 space-y-1">
                  <span className="text-[10px] tracking-widest text-[#C49A52] uppercase font-bold">{item.product.type}</span>
                  <Link href={`/products/${item.product.slug}`} className="block">
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-[#17345F] hover:text-[#B94D70] transition-colors">
                      {item.product.name}
                    </h3>
                  </Link>
                  <p className="text-xs text-[#756B63] font-medium">{item.size}</p>
                  <p className="font-serif font-bold text-base text-[#17345F]">
                    ₹ {item.product.price.toLocaleString("en-IN")}
                  </p>
                </div>

                <div className="flex flex-col items-end gap-3">
                  <div className="flex items-center border border-[#C49A52]/40 rounded bg-[#F8F1E7] px-2 py-1 text-xs">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)}
                      className="px-1.5 text-[#756B63] hover:text-[#17345F]"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-2 font-bold text-[#17345F]">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                      className="px-1.5 text-[#756B63] hover:text-[#17345F]"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.product.id, item.size)}
                    className="text-[#756B63] hover:text-[#B94D70] transition-colors p-1"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary & Checkout CTAs */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#FFF9F1] border border-[#C49A52]/40 rounded-xl p-6 sm:p-8 shadow-xl space-y-6">
              <h3 className="font-serif text-2xl font-bold text-[#17345F] border-b border-[#C49A52]/20 pb-3">
                SUMMARY
              </h3>

              {/* Promo Coupon Input */}
              <form onSubmit={handleApplyCoupon} className="space-y-2">
                <label className="text-[10px] tracking-wider uppercase font-bold text-[#17345F] flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5 text-[#C49A52]" />
                  <span>PROMO / GIFT CODE</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. ROYAL15"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="w-full bg-[#F5EFE3] border border-[#C69A45]/40 px-3.5 py-2.5 rounded-full text-xs uppercase text-[#30070D] focus:outline-none"
                  />
                  <PearlButton
                    type="submit"
                    variant="champagne"
                    size="sm"
                    loading={isCheckingCoupon}
                  >
                    APPLY
                  </PearlButton>
                </div>
                {appliedCoupon && (
                  <p className="text-xs text-[#176B58] font-semibold pt-1">
                    Coupon {appliedCoupon.code} active (-₹{appliedCoupon.discountAmount.toLocaleString("en-IN")})
                  </p>
                )}
              </form>

              {/* Price Breakdown */}
              <div className="space-y-3 pt-4 border-t border-[#C49A52]/20 text-xs text-[#756B63]">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span className="font-semibold text-[#241C1B]">₹ {cartTotal.toLocaleString("en-IN")}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-[#176B58] font-semibold">
                    <span>Royal Discount ({appliedCoupon.code})</span>
                    <span>- ₹ {appliedCoupon.discountAmount.toLocaleString("en-IN")}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>GST (Included 18%)</span>
                  <span className="font-semibold text-[#241C1B]">₹ {estimatedTax.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between">
                  <span>Royal Express Delivery</span>
                  <span className="font-semibold text-[#C49A52]">{amountNeededForFreeShipping === 0 ? "FREE" : "₹ 150"}</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-[#C49A52]/20 text-sm font-bold text-[#17345F]">
                  <span>TOTAL DUE</span>
                  <span className="font-serif text-2xl">
                    ₹ {(finalTotal + (amountNeededForFreeShipping === 0 ? 0 : 150)).toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              {/* Proceed to Checkout CTA */}
              <PearlButton
                href="/checkout"
                variant="burgundy"
                size="lg"
                fullWidth
                rightIcon={<ArrowRight className="w-4 h-4 text-[#C69A45]" />}
              >
                PROCEED TO CHECKOUT
              </PearlButton>

              <div className="text-[10px] text-center text-[#756B63] uppercase tracking-wider flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C49A52]" />
                <span>256-Bit Encrypted Secure Checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
