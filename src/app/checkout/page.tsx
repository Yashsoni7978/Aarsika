"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckCircle2, ShieldCheck, Truck, Sparkles, ArrowRight, Lock, CreditCard } from "lucide-react";
import { useShop } from "@/context/ShopContext";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, cartTotal, clearCart, showToast } = useShop();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
    gstin: "",
    paymentMethod: "COD" as "COD" | "RAZORPAY",
  });

  const [isProcessing, setIsProcessing] = useState(false);

  // Script loader helper for Razorpay SDK
  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (typeof window !== "undefined" && window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      showToast("Your shopping bag is empty");
      return;
    }

    setIsProcessing(true);

    try {
      // 1. Create order record in our database API first
      const orderRes = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: formData,
          items: cart.map((item) => ({
            productId: item.product.id,
            productName: item.product.name,
            productImage: item.product.mainImage,
            size: item.size,
            unitPrice: item.product.price,
            quantity: item.quantity,
            totalPrice: item.product.price * item.quantity,
          })),
          subtotal: cartTotal,
          discount: 0,
          tax: Math.round(cartTotal * 0.18),
          shippingFee: cartTotal >= 3000 ? 0 : 150,
          totalAmount: cartTotal + (cartTotal >= 3000 ? 0 : 150),
          paymentMethod: formData.paymentMethod,
        }),
      });

      const orderData = await orderRes.json();
      if (!orderData.success) {
        showToast("Error creating order reference");
        setIsProcessing(false);
        return;
      }

      const createdOrder = orderData.order;

      // 2. Handle Razorpay Payment flow
      if (formData.paymentMethod === "RAZORPAY") {
        const loaded = await loadRazorpayScript();
        if (!loaded) {
          showToast("Failed to load Razorpay payment SDK");
          setIsProcessing(false);
          return;
        }

        // Call backend API to generate Razorpay order
        const rzpRes = await fetch("/api/checkout/create-razorpay-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: createdOrder.totalAmount,
            receipt: createdOrder.orderNumber,
            notes: { customerName: formData.fullName, orderId: createdOrder.id },
          }),
        });

        const rzpData = await rzpRes.json();
        if (!rzpData.success) {
          showToast("Razorpay order creation failed");
          setIsProcessing(false);
          return;
        }

        const options = {
          key: rzpData.key,
          amount: rzpData.amount,
          currency: rzpData.currency || "INR",
          name: "MEHRAAB",
          description: "Royal Attar & Perfumes",
          image: "/images/hero-approved.jpg",
          order_id: rzpData.orderId,
          handler: async function (response: any) {
            // Verify signature server-side
            const verifyRes = await fetch("/api/checkout/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                orderId: createdOrder.id,
              }),
            });

            const verifyData = await verifyRes.json();
            if (verifyData.success) {
              clearCart();
              router.push(`/orders/${createdOrder.id}`);
            } else {
              showToast("Payment verification failed");
              setIsProcessing(false);
            }
          },
          prefill: {
            name: formData.fullName,
            email: formData.email,
            contact: formData.phone,
          },
          theme: {
            color: "#17345F",
          },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.on("payment.failed", function (resp: any) {
          showToast("Payment failed. Please try again or choose COD.");
          setIsProcessing(false);
        });
        paymentObject.open();
        return;
      }

      // 3. For Cash on Delivery (COD), order placed directly
      clearCart();
      router.push(`/orders/${createdOrder.id}`);
    } catch (e) {
      console.error(e);
      showToast("Unexpected error placing order");
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-[#F8F1E7] min-h-screen py-16 text-[#241C1B]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-2">
          <span className="text-[11px] tracking-[0.35em] text-[#C49A52] uppercase font-bold">
            CHECKOUT
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#17345F]">
            ROYAL CHECKOUT
          </h1>
        </div>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Contact & Shipping Form */}
          <div className="lg:col-span-7 bg-[#FFF9F1] border border-[#C49A52]/30 rounded-xl p-6 sm:p-8 shadow-soft space-y-6">
            <h3 className="font-serif text-2xl font-bold text-[#17345F] border-b border-[#C49A52]/20 pb-3">
              1. CONTACT &amp; DELIVERY ADDRESS
            </h3>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-[#17345F] font-semibold uppercase tracking-wider mb-1">
                  FULL NAME
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full bg-[#F8F1E7] border border-[#C49A52]/40 px-4 py-3 rounded text-[#17345F] focus:outline-none focus:border-[#B94D70]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#17345F] font-semibold uppercase tracking-wider mb-1">
                    EMAIL ADDRESS
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#F8F1E7] border border-[#C49A52]/40 px-4 py-3 rounded text-[#17345F] focus:outline-none focus:border-[#B94D70]"
                  />
                </div>
                <div>
                  <label className="block text-[#17345F] font-semibold uppercase tracking-wider mb-1">
                    PHONE NUMBER
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#F8F1E7] border border-[#C49A52]/40 px-4 py-3 rounded text-[#17345F] focus:outline-none focus:border-[#B94D70]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#17345F] font-semibold uppercase tracking-wider mb-1">
                  STREET ADDRESS
                </label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full bg-[#F8F1E7] border border-[#C49A52]/40 px-4 py-3 rounded text-[#17345F] focus:outline-none focus:border-[#B94D70]"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[#17345F] font-semibold uppercase tracking-wider mb-1">
                    CITY
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-[#F8F1E7] border border-[#C49A52]/40 px-3 py-3 rounded text-[#17345F] focus:outline-none focus:border-[#B94D70]"
                  />
                </div>
                <div>
                  <label className="block text-[#17345F] font-semibold uppercase tracking-wider mb-1">
                    STATE
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full bg-[#F8F1E7] border border-[#C49A52]/40 px-3 py-3 rounded text-[#17345F] focus:outline-none focus:border-[#B94D70]"
                  />
                </div>
                <div>
                  <label className="block text-[#17345F] font-semibold uppercase tracking-wider mb-1">
                    PINCODE
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    className="w-full bg-[#F8F1E7] border border-[#C49A52]/40 px-3 py-3 rounded text-[#17345F] focus:outline-none focus:border-[#B94D70]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#17345F] font-semibold uppercase tracking-wider mb-1">
                  GSTIN (OPTIONAL FOR BUSINESS INVOICE)
                </label>
                <input
                  type="text"
                  placeholder="e.g. 07AAAAA0000A1Z5"
                  value={formData.gstin}
                  onChange={(e) => setFormData({ ...formData, gstin: e.target.value })}
                  className="w-full bg-[#F8F1E7] border border-[#C49A52]/40 px-4 py-3 rounded text-[#17345F] focus:outline-none focus:border-[#B94D70]"
                />
              </div>
            </div>

            <h3 className="font-serif text-2xl font-bold text-[#17345F] border-b border-[#C49A52]/20 pb-3 pt-4">
              2. PAYMENT METHOD
            </h3>

            <div className="space-y-3 text-xs">
              <label
                onClick={() => setFormData({ ...formData, paymentMethod: "RAZORPAY" })}
                className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-all ${
                  formData.paymentMethod === "RAZORPAY"
                    ? "bg-[#17345F]/5 border-[#17345F]"
                    : "bg-[#F8F1E7] border-[#C49A52]/30"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="RAZORPAY"
                  checked={formData.paymentMethod === "RAZORPAY"}
                  onChange={() => setFormData({ ...formData, paymentMethod: "RAZORPAY" })}
                  className="accent-[#B94D70]"
                />
                <CreditCard className="w-5 h-5 text-[#C49A52]" />
                <div>
                  <span className="font-bold text-[#17345F] block text-sm">Razorpay (UPI / Cards / NetBanking / Wallets)</span>
                  <p className="text-[#756B63] text-[11px]">Instant 256-Bit encrypted online payment processing.</p>
                </div>
              </label>

              <label
                onClick={() => setFormData({ ...formData, paymentMethod: "COD" })}
                className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-all ${
                  formData.paymentMethod === "COD"
                    ? "bg-[#17345F]/5 border-[#17345F]"
                    : "bg-[#F8F1E7] border-[#C49A52]/30"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="COD"
                  checked={formData.paymentMethod === "COD"}
                  onChange={() => setFormData({ ...formData, paymentMethod: "COD" })}
                  className="accent-[#B94D70]"
                />
                <Truck className="w-5 h-5 text-[#C49A52]" />
                <div>
                  <span className="font-bold text-[#17345F] block text-sm">Cash on Delivery (COD)</span>
                  <p className="text-[#756B63] text-[11px]">Pay upon physical doorstep receipt of your royal parcel.</p>
                </div>
              </label>
            </div>
          </div>

          {/* Right Summary */}
          <div className="lg:col-span-5 bg-[#FFF9F1] border border-[#C49A52]/40 rounded-xl p-6 sm:p-8 shadow-xl space-y-6">
            <h3 className="font-serif text-2xl font-bold text-[#17345F] border-b border-[#C49A52]/20 pb-3">
              YOUR ORDER
            </h3>

            <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
              {cart.length === 0 ? (
                <p className="text-xs text-[#756B63]">No items in bag.</p>
              ) : (
                cart.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-14 bg-[#F8F1E7] rounded overflow-hidden shrink-0 border border-[#C49A52]/20">
                        <Image src={item.product.mainImage} alt={item.product.name} fill className="object-cover" />
                      </div>
                      <div>
                        <p className="font-serif font-bold text-[#17345F]">{item.product.name}</p>
                        <p className="text-[10px] text-[#756B63]">{item.size} x {item.quantity}</p>
                      </div>
                    </div>
                    <span className="font-serif font-bold text-[#241C1B]">
                      ₹ {(item.product.price * item.quantity).toLocaleString("en-IN")}
                    </span>
                  </div>
                ))
              )}
            </div>

            <div className="pt-4 border-t border-[#C49A52]/20 space-y-2 text-xs text-[#756B63]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-[#241C1B]">₹ {cartTotal.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between">
                <span>GST (18%)</span>
                <span className="font-semibold text-[#241C1B]">₹ {Math.round(cartTotal * 0.18).toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping &amp; Royal Gift Packaging</span>
                <span className="font-semibold text-[#C49A52]">{cartTotal >= 3000 ? "FREE" : "₹ 150"}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[#C49A52]/20 text-sm font-bold text-[#17345F]">
                <span>TOTAL DUE</span>
                <span className="font-serif text-2xl">
                  ₹ {(cartTotal + (cartTotal >= 3000 ? 0 : 150)).toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={cart.length === 0 || isProcessing}
              className="w-full py-4 bg-[#B94D70] hover:bg-[#8F304F] disabled:opacity-50 text-[#FFF9F1] text-xs font-semibold tracking-[0.2em] uppercase rounded-lg transition-colors flex items-center justify-center gap-2 shadow-md"
            >
              <Lock className="w-4 h-4" />
              <span>{isProcessing ? "PROCESSING ORDER..." : "PLACE ROYAL ORDER"}</span>
            </button>

            <div className="text-[10px] text-center text-[#756B63] uppercase tracking-wider flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C49A52]" />
              <span>256-Bit Encrypted Secure Checkout</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
