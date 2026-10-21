"use client";

import React, { useState } from "react";
import Link from "next/link";
import { RotateCcw, CheckCircle2 } from "lucide-react";
import { useShop } from "@/context/ShopContext";
import PearlButton from "@/components/PearlButton";

export default function ReturnsPage() {
  const { showToast } = useShop();

  const [orderNumber, setOrderNumber] = useState("");
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("Scent profile mismatch");
  const [comments, setComments] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [returnId, setReturnId] = useState("");

  const handleSubmitReturn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderNumber || !email) return;

    try {
      const res = await fetch("/api/returns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: orderNumber,
          customerEmail: email,
          reason: `${reason}: ${comments}`,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setReturnId(data.returnRequest.id);
        setSubmitted(true);
        showToast("Return request submitted successfully");
      } else {
        showToast(data.message || "Failed to submit return request");
      }
    } catch (e) {
      showToast("Error processing return request");
    }
  };

  if (submitted) {
    return (
      <div className="bg-ivory min-h-screen py-20 text-ink">
        <div className="max-w-xl mx-auto px-4 text-center space-y-6">
          <div className="w-16 h-16 mx-auto rounded-full bg-wine-900 text-gold-light border border-gold flex items-center justify-center shadow-royal">
            <CheckCircle2 className="w-8 h-8 text-gold" />
          </div>
          <span className="text-[10px] tracking-[0.35em] text-gold-deep uppercase font-semibold">Return Initiated</span>
          <h1 className="font-serif text-3xl font-normal text-wine-900">Return Request Received</h1>
          <p className="text-sm text-muted">
            Reference ID: <span className="font-semibold text-wine-900">{returnId}</span> for Order{" "}
            <span className="font-semibold text-wine-900">{orderNumber}</span>.
          </p>
          <p className="text-xs text-muted max-w-md mx-auto leading-relaxed">
            Our concierge will review your request within 24 hours and schedule a complimentary doorstep pickup. Once returned, your refund will be processed to the original payment method.
          </p>
          <div className="pt-4 flex justify-center">
            <Link href="/">
              <PearlButton variant="primary">
                Return to Homepage
              </PearlButton>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-ivory min-h-screen py-10 sm:py-16 text-ink">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
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
              Returns &amp; Refunds
            </li>
          </ol>
        </nav>

        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center gap-3">
            <span className="h-[1px] w-8 bg-gold" />
            <span className="text-[11px] tracking-[0.3em] uppercase text-gold-deep font-semibold">
              Client Care
            </span>
            <span className="h-[1px] w-8 bg-gold" />
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-normal text-wine-900 tracking-wide">
            Returns &amp; Refunds
          </h1>
          <p className="text-sm text-muted max-w-md mx-auto">
            We offer hassle-free 7-day returns for unopened items and scent profiling exchanges.
          </p>
        </div>

        <form onSubmit={handleSubmitReturn} className="bg-cream border border-gold/30 p-6 sm:p-8 rounded-2xl shadow-soft space-y-4 text-xs">
          <div>
            <label className="block font-medium text-wine-900 uppercase tracking-wider text-[11px] mb-1">Order Number</label>
            <input
              type="text"
              required
              placeholder="e.g. AAR-984210"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              className="w-full bg-ivory border border-gold/30 p-3 rounded-lg text-ink focus:outline-none focus:border-gold"
            />
          </div>

          <div>
            <label className="block font-medium text-wine-900 uppercase tracking-wider text-[11px] mb-1">Account Email</label>
            <input
              type="email"
              required
              placeholder="Your email address used for order"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-ivory border border-gold/30 p-3 rounded-lg text-ink focus:outline-none focus:border-gold"
            />
          </div>

          <div>
            <label className="block font-medium text-wine-900 uppercase tracking-wider text-[11px] mb-1">Reason for Return</label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full bg-ivory border border-gold/30 p-3 rounded-lg text-ink focus:outline-none font-medium"
            >
              <option value="Scent profile mismatch">Scent profile mismatch</option>
              <option value="Damaged during shipping">Damaged during shipping</option>
              <option value="Received wrong item">Received wrong item</option>
              <option value="Changed mind">Changed mind</option>
            </select>
          </div>

          <div>
            <label className="block font-medium text-wine-900 uppercase tracking-wider text-[11px] mb-1">Additional Notes</label>
            <textarea
              placeholder="Provide any extra details for courier pickup..."
              value={comments}
              onChange={(e) => setComments(e.target.value)}
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
                <RotateCcw className="w-4 h-4" />
                <span>Submit Return Request</span>
              </span>
            </PearlButton>
          </div>
        </form>
      </div>
    </div>
  );
}
