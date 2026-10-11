'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, ShoppingBag, Menu, X, Heart } from 'lucide-react';
import { useShop } from '@/context/ShopContext';
import { Logo } from '@/components/Logo';

export const Header: React.FC = () => {
  const pathname = usePathname();
  const { cartCount, setIsCartOpen, setIsSearchOpen, setIsWishlistOpen, wishlist } = useShop();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isMobileMenuOpen]);

  const navLinks = [
    { label: 'Perfumes', href: '/perfumes' },
    { label: 'Attars', href: '/attar' },
    { label: 'Gifting', href: '/gifting' },
    { label: 'Discovery', href: '/discovery-sets' },
    { label: 'The House', href: '/our-story' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full h-14 md:h-[72px] bg-[#26060d] text-[#F6EFE2] border-b border-[#C9A55C]/20 flex items-center">
        {/* DESKTOP HEADER (md and above) */}
        <div className="hidden md:flex max-w-[1280px] mx-auto px-12 w-full items-center justify-between">
          {/* LEFT: Logo */}
          <div className="shrink-0">
            <Logo variant="light" />
          </div>

          {/* CENTER: Navigation (Perfumes, Attars, Gifting, Discovery, The House) */}
          <nav className="flex items-center space-x-8" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`text-xs uppercase tracking-[0.2em] font-sans transition-colors relative py-1 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C9A55C] ${
                    isActive ? 'text-[#E7CF98]' : 'text-[#F6EFE2]/80 hover:text-[#E7CF98]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#C9A55C]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* RIGHT: Search, Heart, Bag */}
          <div className="flex items-center space-x-5 shrink-0">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-[#F6EFE2] hover:text-[#E7CF98] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C9A55C] min-w-[44px] min-h-[44px] flex items-center justify-center rounded-none"
              aria-label="Search Fragrances"
            >
              <Search className="w-5 h-5" />
            </button>

            <button
              onClick={() => setIsWishlistOpen(true)}
              className="p-2 text-[#F6EFE2] hover:text-[#E7CF98] transition-colors relative focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C9A55C] min-w-[44px] min-h-[44px] flex items-center justify-center rounded-none"
              aria-label="Saved Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-[#C9A55C] text-[#26060d] font-mono text-[9px] font-bold rounded-none flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsCartOpen(true)}
              className="p-2 text-[#F6EFE2] hover:text-[#E7CF98] transition-colors relative focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C9A55C] min-w-[44px] min-h-[44px] flex items-center justify-center rounded-none"
              aria-label="Shopping Bag"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#8b1a2b] text-[#F6EFE2] font-mono text-[10px] font-medium rounded-none flex items-center justify-center border border-[#C9A55C]">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* PHONE HEADER (under md: 56px, menu left, centered logo, heart & bag right) */}
        <div className="flex md:hidden w-full h-14 px-5 items-center justify-between relative">
          {/* LEFT: Menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 text-[#E7CF98] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C9A55C] min-w-[44px] min-h-[44px] flex items-center justify-center rounded-none"
            aria-label="Open Navigation Menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* CENTER: Logo */}
          <div className="absolute left-1/2 -translate-x-1/2">
            <Logo variant="light" />
          </div>

          {/* RIGHT: Heart and Bag with counts ONLY when > 0 */}
          <div className="flex items-center space-x-1">
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="p-2 text-[#F6EFE2] hover:text-[#E7CF98] transition-colors relative focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C9A55C] min-w-[44px] min-h-[44px] flex items-center justify-center rounded-none"
              aria-label="Saved Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-[#C9A55C] text-[#26060d] font-mono text-[9px] font-bold rounded-none flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsCartOpen(true)}
              className="p-2 text-[#F6EFE2] hover:text-[#E7CF98] transition-colors relative focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C9A55C] min-w-[44px] min-h-[44px] flex items-center justify-center rounded-none"
              aria-label="Shopping Bag"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#8b1a2b] text-[#F6EFE2] font-mono text-[10px] font-medium rounded-none flex items-center justify-center border border-[#C9A55C]">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* FULL-SCREEN BURGUNDY MOBILE OVERLAY MENU */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#26060d] text-[#F6EFE2] flex flex-col justify-between p-6 overflow-y-auto">
          {/* Mobile Header Top Bar */}
          <div className="flex items-center justify-between pb-6 border-b border-[#C9A55C]/20">
            <Logo variant="light" />
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 text-[#C9A55C] hover:text-[#E7CF98] focus:outline-none min-w-[44px] min-h-[44px] flex items-center justify-center rounded-none"
              aria-label="Close Mobile Menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="py-8 space-y-4" aria-label="Mobile Navigation">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between py-3 border-b border-[#C9A55C]/15 group"
              >
                <span className="font-serif text-2xl tracking-wider text-[#F6EFE2] group-hover:text-[#E7CF98]">
                  {link.label}
                </span>
                <span className="text-sm font-mono text-[#C9A55C]">→</span>
              </Link>
            ))}
            <Link
              href="/journal"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between py-3 border-b border-[#C9A55C]/15 group"
            >
              <span className="font-serif text-2xl tracking-wider text-[#F6EFE2] group-hover:text-[#E7CF98]">
                Journal
              </span>
              <span className="text-sm font-mono text-[#C9A55C]">→</span>
            </Link>
            <Link
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between py-3 border-b border-[#C9A55C]/15 group"
            >
              <span className="font-serif text-2xl tracking-wider text-[#F6EFE2] group-hover:text-[#E7CF98]">
                Contact
              </span>
              <span className="text-sm font-mono text-[#C9A55C]">→</span>
            </Link>
          </nav>

          {/* Quick Actions */}
          <div className="pt-4 border-t border-[#C9A55C]/20">
            <div className="grid grid-cols-2 gap-3 text-center mb-4">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsSearchOpen(true);
                }}
                className="py-3 px-2 border border-[#C9A55C]/30 text-xs tracking-widest text-[#E7CF98] uppercase hover:bg-[#C9A55C]/10 rounded-none min-h-[44px]"
              >
                SEARCH
              </button>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsCartOpen(true);
                }}
                className="py-3 px-2 border border-[#C9A55C] bg-[#8b1a2b] text-xs tracking-widest text-[#F6EFE2] uppercase flex items-center justify-center gap-1.5 rounded-none min-h-[44px]"
              >
                <span>BAG</span>
                {cartCount > 0 && <span className="font-mono text-[10px]">({cartCount})</span>}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
