'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2, Truck, MapPin, ExternalLink, ArrowRight } from 'lucide-react';
import { Order } from '@/lib/store';

interface OrderTrackingPageProps {
  params: {
    id: string;
  };
}

export default function OrderTrackingPage({ params }: OrderTrackingPageProps) {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/orders/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setOrder(data.order);
        }
      })
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, [params.id]);

  if (loading) {
    return (
      <div className="bg-[#F6EFE2] min-h-screen py-24 text-center text-[#1a1411] font-serif text-xl">
        Locating Order Details...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="bg-[#F6EFE2] min-h-screen py-24 text-center space-y-4">
        <h1 className="font-serif text-3xl font-light text-[#1a1411]">Order Reference Not Found</h1>
        <Link href="/account" className="text-xs font-mono uppercase tracking-wider text-[#8a6a22]">
          Return to My Account
        </Link>
      </div>
    );
  }

  const steps = [
    { key: 'ORDER_PLACED', label: 'Order Placed' },
    { key: 'PAYMENT_CONFIRMED', label: 'Payment Confirmed' },
    { key: 'PROCESSING', label: 'Batch Processing' },
    { key: 'PACKED', label: 'Packaging' },
    { key: 'SHIPPED', label: 'Shipped' },
    { key: 'OUT_FOR_DELIVERY', label: 'Out for Delivery' },
    { key: 'DELIVERED', label: 'Delivered' },
  ];

  const currentStepIndex = steps.findIndex((s) => s.key === order.orderStatus);

  return (
    <div className="bg-[#F6EFE2] min-h-screen py-24 text-[#1a1411] font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 mx-auto bg-[#EADFCB] border border-[#C9A55C]/40 flex items-center justify-center text-[#26060d]">
            <CheckCircle2 className="w-8 h-8 text-[#C9A55C]" />
          </div>
          <span className="text-[11px] tracking-[0.35em] text-[#8a6a22] uppercase font-mono block">
            ORDER REFERENCE: {order.orderNumber}
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#1a1411] font-light">
            ORDER STATUS &amp; TRACKING
          </h1>
          <p className="text-xs text-[#6b5f55]">
            Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', { dateStyle: 'full' })}
          </p>
        </div>

        {/* Live Status Stepper */}
        <div className="bg-[#FBF6EA] border border-[#C9A55C]/30 p-6 sm:p-8 space-y-6">
          <h3 className="font-serif text-xl font-normal text-[#1a1411] border-b border-[#C9A55C]/20 pb-3">
            DELIVERY TIMELINE
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 text-center">
            {steps.map((st, i) => {
              const isPassed = currentStepIndex >= i || order.orderStatus === 'DELIVERED';
              const isCurrent = currentStepIndex === i;
              return (
                <div key={st.key} className="flex flex-col items-center gap-2">
                  <div
                    className={`w-8 h-8 flex items-center justify-center text-xs font-mono transition-all rounded-none ${
                      isPassed
                        ? 'bg-[#C9A55C] text-[#26060d] font-bold'
                        : 'bg-[#F6EFE2] text-[#6b5f55] border border-[#C9A55C]/30'
                    } ${isCurrent ? 'ring-2 ring-[#C9A55C]' : ''}`}
                  >
                    {i + 1}
                  </div>
                  <span
                    className={`text-[10px] font-mono uppercase tracking-wider ${
                      isPassed ? 'text-[#1a1411]' : 'text-[#6b5f55]'
                    }`}
                  >
                    {st.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Courier Tracking Info */}
          {order.trackingNumber && (
            <div className="p-4 bg-[#F6EFE2] border border-[#C9A55C]/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-[#C9A55C]" />
                <div>
                  <span className="font-medium text-[#1a1411]">{order.courierName || 'Express Courier'}</span>
                  <p className="text-[#6b5f55]">
                    AWB Tracking No: <span className="font-mono font-bold text-[#1a1411]">{order.trackingNumber}</span>
                  </p>
                </div>
              </div>
              {order.trackingUrl && (
                <a
                  href={order.trackingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-[#C9A55C] text-[#26060d] text-[11px] font-mono uppercase tracking-wider hover:bg-[#E7CF98] flex items-center gap-1.5 shrink-0 rounded-none"
                >
                  <span>TRACK ON COURIER WEBSITE</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          )}
        </div>

        {/* Order Details & Items Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Items */}
          <div className="lg:col-span-7 bg-[#FBF6EA] border border-[#C9A55C]/30 p-6 space-y-4">
            <h3 className="font-serif text-xl font-normal text-[#1a1411] border-b border-[#C9A55C]/20 pb-3">
              ITEMS ORDERED ({order.items.length})
            </h3>
            <div className="space-y-4 divide-y divide-[#C9A55C]/15">
              {order.items.map((item, idx) => (
                <div key={idx} className="pt-3 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-14 bg-[#F6EFE2] overflow-hidden border border-[#C9A55C]/20 shrink-0">
                        <Image src={item.productImage} alt={item.productName} fill className="object-cover" />
                      </div>
                      <div>
                        <p className="font-serif font-medium text-[#1a1411] text-base">{item.productName}</p>
                        <p className="text-xs text-[#6b5f55] font-mono">{item.size} × {item.quantity}</p>
                      </div>
                    </div>
                    <span className="font-mono font-medium text-[#1a1411] text-sm">
                      ₹{item.totalPrice.toLocaleString('en-IN')}
                    </span>
                  </div>

                  {/* Serial Number Display */}
                  {(item.serialString || (item.serials && item.serials.length > 0)) && (
                    <div className="pl-3 border-l-2 border-[#C9A55C] py-1 bg-[#F6EFE2]/60">
                      <span className="font-mono text-[10px] uppercase text-[#8a6a22] block">BOTTLE NUMBER</span>
                      <p className="font-mono text-xs text-[#26060d]">
                        {item.serialString || item.serials?.join(', ')}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="pt-4 text-xs text-[#6b5f55] space-y-1.5 border-t border-[#C9A55C]/20">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono">₹{order.subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (MRP Included)</span>
                <span className="font-mono">₹{order.tax.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-[#8a6a22] font-mono">{order.shippingFee === 0 ? 'FREE' : `₹${order.shippingFee}`}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[#C9A55C]/20 font-bold text-[#1a1411] text-base">
                <span>TOTAL PAID</span>
                <span className="font-mono">₹{order.totalAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          {/* Delivery Address */}
          <div className="lg:col-span-5 bg-[#FBF6EA] border border-[#C9A55C]/30 p-6 space-y-4">
            <h3 className="font-serif text-xl font-normal text-[#1a1411] border-b border-[#C9A55C]/20 pb-3">
              DELIVERY DESTINATION
            </h3>
            <div className="text-xs text-[#6b5f55] space-y-2">
              <p className="font-medium text-[#1a1411] text-sm">{order.customer.fullName}</p>
              <p className="flex items-start gap-1.5">
                <MapPin className="w-4 h-4 text-[#C9A55C] shrink-0 mt-0.5" />
                <span>
                  {order.customer.address}, {order.customer.city}, {order.customer.state} - {order.customer.pincode}
                </span>
              </p>
              <p>Email: {order.customer.email}</p>
              <p>Phone: {order.customer.phone}</p>
              {order.customer.gstin && <p className="font-mono text-[11px] text-[#1a1411]">GSTIN: {order.customer.gstin}</p>}
            </div>

            <div className="pt-4 border-t border-[#C9A55C]/20 text-center">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#C9A55C] text-[#26060d] text-xs font-mono uppercase tracking-wider hover:bg-[#E7CF98] transition-colors rounded-none"
              >
                <span>CONTINUE SHOPPING</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
