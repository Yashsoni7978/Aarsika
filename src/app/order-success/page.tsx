'use client';

import React, { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, ShoppingBag, ArrowRight } from 'lucide-react';
import { Order } from '@/lib/store';

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('id') || searchParams.get('orderId');
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (orderId) {
      fetch(`/api/orders/${orderId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.order) {
            setOrder(data.order);
          }
        })
        .catch((err) => console.error('Error fetching order details:', err));
    }
  }, [orderId]);

  const orderNumber = order ? order.orderNumber : `AAR-${Math.floor(100000 + Math.random() * 900000)}`;

  return (
    <div className="bg-[#F6EFE2] min-h-screen pt-32 pb-24 text-[#1a1411]">
      <div className="max-w-2xl mx-auto px-6 text-center space-y-8">
        <div className="w-20 h-20 mx-auto rounded-none bg-[#EADFCB] border border-[#C9A55C]/40 flex items-center justify-center text-[#26060d]">
          <CheckCircle2 className="w-10 h-10 text-[#C9A55C] stroke-[1.5]" />
        </div>

        <div className="space-y-3">
          <span className="text-[10px] tracking-[0.35em] text-[#8a6a22] uppercase font-mono block">
            ORDER CONFIRMED
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-light text-[#1a1411]">
            Thank you for your order
          </h1>
          <p className="text-xs sm:text-sm text-[#6b5f55] max-w-md mx-auto font-light leading-relaxed">
            Your fragrance selection has been confirmed and is being carefully prepared for dispatch.
          </p>
        </div>

        <div className="bg-[#FBF6EA] border border-[#C9A55C]/30 p-6 space-y-4 text-left text-xs text-[#4a3f35]">
          <div className="flex justify-between border-b border-[#C9A55C]/20 pb-3">
            <span className="font-mono text-[10px] uppercase text-[#8a6a22]">ORDER REFERENCE</span>
            <span className="font-mono font-semibold text-[#1a1411]">{orderNumber}</span>
          </div>

          <div className="flex justify-between border-b border-[#C9A55C]/20 pb-3">
            <span className="font-mono text-[10px] uppercase text-[#8a6a22]">EXPECTED DISPATCH</span>
            <span className="font-light text-[#1a1411]">Within 24 Hours via Express Shipping</span>
          </div>

          {/* Assigned Bottle Serial Numbers */}
          {order && order.items && (
            <div className="space-y-2 pt-1">
              <span className="font-mono text-[10px] uppercase text-[#8a6a22] block">
                ASSIGNED BOTTLE NUMBERS
              </span>
              <div className="space-y-1.5 pl-2 border-l-2 border-[#C9A55C]">
                {order.items.map((item, idx) => (
                  <div key={idx} className="font-mono text-xs text-[#26060d]">
                    {item.serialString ||
                      (item.serials && item.serials.join(', ')) ||
                      `${item.productName}, ${item.size}`}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/shop"
            className="w-full sm:w-auto px-8 py-3.5 bg-[#C9A55C] text-[#26060d] hover:bg-[#E7CF98] text-xs font-mono tracking-[0.2em] uppercase transition-colors flex items-center justify-center gap-2 rounded-none"
          >
            <ShoppingBag className="w-4 h-4 stroke-[1.4]" />
            <span>CONTINUE SHOPPING</span>
          </Link>

          <Link
            href="/account"
            className="w-full sm:w-auto px-8 py-3.5 bg-[#FBF6EA] border border-[#C9A55C]/30 text-[#1a1411] hover:border-[#C9A55C] text-xs font-mono tracking-[0.2em] uppercase transition-colors flex items-center justify-center gap-2 rounded-none"
          >
            <span>VIEW MY ACCOUNT</span>
            <ArrowRight className="w-4 h-4 stroke-[1.4]" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="bg-[#F6EFE2] min-h-screen pt-32 text-center text-[#8a6a22] font-mono text-xs">LOADING ORDER CONFIRMATION...</div>}>
      <OrderSuccessContent />
    </Suspense>
  );
}
