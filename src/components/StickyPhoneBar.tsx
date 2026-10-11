'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingBag, MessageCircle, Store } from 'lucide-react';
import { useShop } from '@/context/ShopContext';
import { BRAND_WHATSAPP } from '@/config/brand';

export default function StickyPhoneBar() {
  const { cartCount, setIsCartOpen, isCartOpen, isSearchOpen } = useShop();

  // Hide when drawers or keyboard are open
  const isHidden = isCartOpen || isSearchOpen;

  const whatsappHref = BRAND_WHATSAPP
    ? `https://wa.me/${BRAND_WHATSAPP.replace(/[^0-9]/g, '')}`
    : '';

  return (
    <nav
      className={`md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#26060d] border-t border-[#C9A55C]/20 transition-transform duration-300 ${
        isHidden ? 'translate-y-full' : 'translate-y-0'
      }`}
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      aria-label="Quick actions"
    >
      <div className="flex items-center justify-around h-14">
        <Link
          href="/shop"
          className="flex flex-col items-center justify-center gap-0.5 text-[#E7CF98] min-w-[44px] min-h-[44px]"
          aria-label="Shop"
        >
          <Store className="w-5 h-5" strokeWidth={1.5} />
          <span className="text-[10px] uppercase tracking-widest font-sans">Shop</span>
        </Link>

        {whatsappHref && (
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center gap-0.5 text-[#E7CF98] min-w-[44px] min-h-[44px]"
            aria-label="WhatsApp"
          >
            <MessageCircle className="w-5 h-5" strokeWidth={1.5} />
            <span className="text-[10px] uppercase tracking-widest font-sans">WhatsApp</span>
          </a>
        )}

        <button
          onClick={() => setIsCartOpen(true)}
          className="flex flex-col items-center justify-center gap-0.5 text-[#E7CF98] min-w-[44px] min-h-[44px] relative"
          aria-label={`Shopping bag${cartCount > 0 ? `, ${cartCount} items` : ''}`}
        >
          <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
          <span className="text-[10px] uppercase tracking-widest font-sans">
            Bag{cartCount > 0 ? ` (${cartCount})` : ''}
          </span>
        </button>
      </div>
    </nav>
  );
}
