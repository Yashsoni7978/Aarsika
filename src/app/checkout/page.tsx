"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckCircle2, ShieldCheck, Truck, Sparkles, ArrowRight, Lock, CreditCard } from "lucide-react";
import { useShop } from "@/context/ShopContext";
import PearlButton from "@/components/PearlButton";
import { FREE_SHIPPING_THRESHOLD, STANDARD_SHIPPING_FEE } from "@/config/shop";

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

  const shippingFee = cartTotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_FEE;
  const totalDue = cartTotal + shippingFee;

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
          shippingFee,
          totalAmount: totalDue,
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
          showToast("Failed to load secure payment gateway. Please try COD or refresh.");
          setIsProcessing(false);
          return;
        }

        // Create razorpay server order
        const rzpRes = await fetch("/api/checkout/create-razorpay-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: totalDue,
            orderId: createdOrder.id,
            customerName: formData.fullName,
            customerEmail: formData.email,
          }),
        });

        const rzpData = await rzpRes.json();
        if (!rzpData.success) {
          showToast("Payment initiation error: " + (rzpData.error || "Gateway issue"));
          setIsProcessing(false);
          return;
        }

        const options = {
          key: rzpData.keyId,
          amount: rzpData.amount,
          currency: rzpData.currency,
          name: "Aarsika",
          description: `Royal Fragrances Order ${createdOrder.orderNumber}`,
          image: "/logo.png",
          order_id: rzpData.orderId,
          handler: async function (response: any) {
            try {
              // Verify payment on server
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
                router.push(`/order-confirmation/${createdOrder.id}`);
              } else {
                showToast("Payment verification failed. Please contact concierge.");
                setIsProcessing(false);
              }
            } catch {
              showToast("Error verifying transaction. Contact support.");
              setIsProcessing(false);
            }
          },
          prefill: {
            name: formData.fullName,
            email: formData.email,
            contact: formData.phone,
          },
          theme: {
            color: "#30070D",
          },
          modal: {
            ondismiss: function () {
              setIsProcessing(false);
              showToast("Payment window closed. Order saved as pending.");
            },
          },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        return;
      }

      // 3. Handle Cash on Delivery (COD) flow
      clearCart();
      router.push(`/order-confirmation/${createdOrder.id}`);
    } catch {
      showToast("There was an error processing your checkout");
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-ivory min-h-screen py-10 sm:py-16 text-ink">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
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
              <Link href="/cart" className="hover:text-wine-900 transition-colors">
                Bag
              </Link>
            </li>
            <li className="text-gold/60">/</li>
            <li className="text-wine-900 font-medium" aria-current="page">
              Checkout
            </li>
          </ol>
        </nav>

        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center gap-3">
            <span className="h-[1px] w-8 bg-gold" />
            <span className="text-[11px] tracking-[0.3em] uppercase text-gold-deep font-semibold">
              Checkout
            </span>
            <span className="h-[1px] w-8 bg-gold" />
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-normal text-wine-900 tracking-wide">
            Royal Checkout
          </h1>
        </div>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Contact & Shipping Form */}
          <div className="lg:col-span-7 bg-cream border border-gold/30 rounded-2xl p-6 sm:p-8 shadow-soft space-y-6">
            <h3 className="font-serif text-2xl text-wine-900 border-b border-gold/20 pb-3">
              1. Contact &amp; Delivery Address
            </h3>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-wine-900 font-medium uppercase tracking-wider text-[11px] mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full bg-ivory border border-gold/30 px-4 py-3 rounded-lg text-xs text-ink focus:outline-none focus:border-gold"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-wine-900 font-medium uppercase tracking-wider text-[11px] mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-ivory border border-gold/30 px-4 py-3 rounded-lg text-xs text-ink focus:outline-none focus:border-gold"
                  />
                </div>
                <div>
                  <label className="block text-wine-900 font-medium uppercase tracking-wider text-[11px] mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-ivory border border-gold/30 px-4 py-3 rounded-lg text-xs text-ink focus:outline-none focus:border-gold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-wine-900 font-medium uppercase tracking-wider text-[11px] mb-1">
                  Street Address
                </label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full bg-ivory border border-gold/30 px-4 py-3 rounded-lg text-xs text-ink focus:outline-none focus:border-gold"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-wine-900 font-medium uppercase tracking-wider text-[11px] mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-ivory border border-gold/30 px-3 py-3 rounded-lg text-xs text-ink focus:outline-none focus:border-gold"
                  />
                </div>
                <div>
                  <label className="block text-wine-900 font-medium uppercase tracking-wider text-[11px] mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full bg-ivory border border-gold/30 px-3 py-3 rounded-lg text-xs text-ink focus:outline-none focus:border-gold"
                  />
                </div>
                <div>
                  <label className="block text-wine-900 font-medium uppercase tracking-wider text-[11px] mb-1">
                    PIN Code
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    className="w-full bg-ivory border border-gold/30 px-3 py-3 rounded-lg text-xs text-ink focus:outline-none focus:border-gold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-wine-900 font-medium uppercase tracking-wider text-[11px] mb-1">
                  GSTIN (Optional)
                </label>
                <input
                  type="text"
                  placeholder="For business invoices"
                  value={formData.gstin}
                  onChange={(e) => setFormData({ ...formData, gstin: e.target.value })}
                  className="w-full bg-ivory border border-gold/30 px-4 py-3 rounded-lg text-xs text-ink focus:outline-none focus:border-gold"
                />
              </div>
            </div>

            <h3 className="font-serif text-2xl text-wine-900 border-b border-gold/20 pb-3 pt-4">
              2. Payment Method
            </h3>

            <div className="space-y-3 text-xs">
              <label
                onClick={() => setFormData({ ...formData, paymentMethod: "RAZORPAY" })}
                className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-all ${
                  formData.paymentMethod === "RAZORPAY"
                    ? "bg-wine-900/5 border-wine-900"
                    : "bg-ivory border-gold/30"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="RAZORPAY"
                  checked={formData.paymentMethod === "RAZORPAY"}
                  onChange={() => setFormData({ ...formData, paymentMethod: "RAZORPAY" })}
                  className="accent-wine-900"
                />
                <CreditCard className="w-5 h-5 text-gold" />
                <div>
                  <span className="font-medium text-wine-900 block text-sm">Razorpay (UPI / Cards / NetBanking / Wallets)</span>
                  <p className="text-muted text-[11px]">Instant 256-Bit encrypted online payment processing.</p>
                </div>
              </label>

              <label
                onClick={() => setFormData({ ...formData, paymentMethod: "COD" })}
                className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-all ${
                  formData.paymentMethod === "COD"
                    ? "bg-wine-900/5 border-wine-900"
                    : "bg-ivory border-gold/30"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="COD"
                  checked={formData.paymentMethod === "COD"}
                  onChange={() => setFormData({ ...formData, paymentMethod: "COD" })}
                  className="accent-wine-900"
                />
                <Truck className="w-5 h-5 text-gold" />
                <div>
                  <span className="font-medium text-wine-900 block text-sm">Cash on Delivery (COD)</span>
                  <p className="text-muted text-[11px]">Pay upon physical doorstep receipt of your parcel.</p>
                </div>
              </label>
            </div>
          </div>

          {/* Right Summary */}
          <div className="lg:col-span-5 bg-cream border border-gold/30 rounded-2xl p-6 sm:p-8 shadow-soft space-y-6">
            <h3 className="font-serif text-2xl text-wine-900 border-b border-gold/20 pb-3">
              Your Order
            </h3>

            <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
              {cart.length === 0 ? (
                <p className="text-xs text-muted">No items in bag.</p>
              ) : (
                cart.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-14 bg-ivory rounded-lg overflow-hidden shrink-0 border border-gold/20">
                        <Image
                          src={item.product.mainImage || '/photos/attars/sehar-e-gulab.jpg'}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-wine-900">{item.product.name}</p>
                        <p className="text-[10px] text-muted">{item.size} x {item.quantity}</p>
                      </div>
                    </div>
                    <span className="font-medium text-ink">
                      ₹ {(item.product.price * item.quantity).toLocaleString("en-IN")}
                    </span>
                  </div>
                ))
              )}
            </div>

            <div className="pt-4 border-t border-gold/20 space-y-2 text-xs text-muted">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium text-ink">₹ {cartTotal.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between">
                <span>GST (18% Included)</span>
                <span className="font-medium text-ink">₹ {Math.round(cartTotal * 0.18).toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping &amp; Gift Packaging</span>
                <span className="font-medium text-gold-deep">
                  {shippingFee === 0 ? "FREE" : `₹ ${shippingFee}`}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-gold/20 text-sm font-medium text-wine-900">
                <span>Total Due</span>
                <span className="font-serif text-2xl font-normal text-wine-900">
                  ₹ {totalDue.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            <PearlButton
              type="submit"
              disabled={cart.length === 0 || isProcessing}
              loading={isProcessing}
              variant="burgundy"
              size="lg"
              fullWidth
              leftIcon={<Lock className="w-4 h-4 text-gold" />}
            >
              {isProcessing ? "Processing Order..." : "Place Order"}
            </PearlButton>

            <div className="text-[10px] text-center text-muted uppercase tracking-wider flex items-center justify-center gap-1.5 font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-gold" />
              <span>256-Bit Encrypted Secure Checkout</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
