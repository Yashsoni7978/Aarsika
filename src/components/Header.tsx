'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Search, ShoppingBag, Menu, X, Heart, User, ChevronDown } from 'lucide-react';
import { useShop } from '@/context/ShopContext';
import { FREE_SHIPPING_THRESHOLD } from '@/config/shop';

export const Header: React.FC = () => {
  const pathname = usePathname();
  const { cartCount, setIsCartOpen, setIsSearchOpen, setIsWishlistOpen, wishlist } = useShop();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCollectionOpen, setIsCollectionOpen] = useState(false);
  const [isMobileCollectionOpen, setIsMobileCollectionOpen] = useState(true);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Close menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsCollectionOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isMobileMenuOpen]);

  // Handle outside click for desktop dropdown
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsCollectionOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    setIsCollectionOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setIsCollectionOpen(false);
    }, 180);
  };

  const collectionItems = [
    { label: 'The Attars', href: '/attar', desc: 'Pure concentrated botanical oils' },
    { label: 'Eau de Parfums', href: '/perfumes', desc: 'High-concentration spray perfumes' },
    { label: 'Gift Sets', href: '/gifting', desc: 'Curated gift presentations' },
    { label: 'Discovery Sets', href: '/discovery-sets', desc: 'Discovery & sampler vials' },
  ];

  const baseMarqueeMessages = [
    `COMPLIMENTARY DELIVERY ON ORDERS ₹${FREE_SHIPPING_THRESHOLD.toLocaleString('en-IN')} AND ABOVE`,
    'DISCOVERY TRIAL SET JUST ₹499',
    'EXPLORE OUR FRAGRANCE GIFTING COLLECTION',
    'DISCOVER YOUR SIGNATURE SCENT — ATTARS & EAU DE PARFUMS',
  ];

  // Duplicate sequence twice in each track for seamless full-width coverage without gaps
  const marqueeTrack = [...baseMarqueeMessages, ...baseMarqueeMessages];

  return (
    <header className="sticky top-0 z-50 w-full shadow-sm">
      {/* 1. ANNOUNCEMENT BAR — CONTINUOUS SEAMLESS MARQUEE */}
      <aside
        aria-label="Store Announcements"
        className="w-full h-8 sm:h-[32px] bg-wine-900 text-gold-light overflow-hidden border-y border-gold flex items-center relative z-40 select-none group"
      >
        <div className="flex animate-marquee group-hover:[animation-play-state:paused] items-center whitespace-nowrap will-change-transform">
          {/* Track 1: Rendered for view and accessible once to screen readers */}
          <div className="flex items-center shrink-0">
            {marqueeTrack.map((text, idx) => (
              <div key={`track1-${idx}`} className="inline-flex items-center shrink-0">
                <span className="font-serif text-[11px] sm:text-[12px] uppercase tracking-[0.22em] font-medium text-gold-light">
                  {text}
                </span>
                <div className="inline-flex items-center mx-5 sm:mx-7 select-none" aria-hidden="true">
                  <span className="text-gold-light text-[8px] sm:text-[9px]">✦</span>
                  <span className="h-3 w-[1px] bg-gold/40 inline-block ml-5 sm:ml-7" />
                </div>
              </div>
            ))}
          </div>

          {/* Track 2: Identical duplicate for mathematically seamless continuous looping (hidden from assistive tech) */}
          <div className="flex items-center shrink-0" aria-hidden="true">
            {marqueeTrack.map((text, idx) => (
              <div key={`track2-${idx}`} className="inline-flex items-center shrink-0">
                <span className="font-serif text-[11px] sm:text-[12px] uppercase tracking-[0.22em] font-medium text-gold-light">
                  {text}
                </span>
                <div className="inline-flex items-center mx-5 sm:mx-7 select-none">
                  <span className="text-gold-light text-[8px] sm:text-[9px]">✦</span>
                  <span className="h-3 w-[1px] bg-gold/40 inline-block ml-5 sm:ml-7" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* 2. MAIN NAVIGATION — SPLIT LAYOUT WITH SCULPTED CENTRE PLAQUE */}
      <nav
        aria-label="Main Navigation"
        className="w-full h-[44px] sm:h-[46px] lg:h-[48px] bg-ivory text-wine-900 border-b border-gold/30 relative z-30 transition-all duration-300"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 w-full h-full flex items-center justify-between relative">
          
          {/* =========================================
              DESKTOP LEFT NAVIGATION
          ========================================= */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8 min-w-0 pr-4">
            {/* HOME */}
            <Link
              href="/"
              className={`font-serif text-[13px] xl:text-[14px] uppercase tracking-[0.20em] transition-colors relative py-1 focus:outline-none ${
                pathname === '/' ? 'text-wine-900 font-bold' : 'text-wine-900 font-semibold hover:text-gold-deep'
              }`}
            >
              HOME
              {pathname === '/' && (
                <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gold" />
              )}
            </Link>

            {/* COLLECTIONS with Dropdown */}
            <div
              ref={dropdownRef}
              className="relative py-1"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                onClick={() => setIsCollectionOpen(!isCollectionOpen)}
                className={`font-serif text-[13px] xl:text-[14px] uppercase tracking-[0.20em] transition-colors flex items-center gap-1.5 focus:outline-none ${
                  pathname.startsWith('/collection') || pathname.startsWith('/shop')
                    ? 'text-wine-900 font-bold'
                    : 'text-wine-900 font-semibold hover:text-gold-deep'
                }`}
                aria-expanded={isCollectionOpen}
                aria-haspopup="true"
              >
                <span>COLLECTIONS</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-gold transition-transform duration-200 ${
                    isCollectionOpen ? 'rotate-180' : ''
                  }`}
                  strokeWidth={2.5}
                />
              </button>

              {/* Desktop Dropdown Menu */}
              {isCollectionOpen && (
                <div className="absolute top-full left-0 pt-2 w-72 z-50 animate-fadeIn">
                  <div className="bg-wine-900 text-ivory border border-gold/40 shadow-2xl p-2.5 divide-y divide-gold/20 rounded-b-sm">
                    <div className="py-1">
                      {collectionItems.map((cat) => (
                        <Link
                          key={cat.label}
                          href={cat.href}
                          onClick={() => setIsCollectionOpen(false)}
                          className="block px-3 py-2.5 hover:bg-wine-900 transition-colors group rounded-sm"
                        >
                          <div className="font-serif text-sm text-ivory group-hover:text-gold-light flex items-center justify-between">
                            <span>{cat.label}</span>
                            <span className="text-gold opacity-0 group-hover:opacity-100 transition-opacity text-xs">
                              →
                            </span>
                          </div>
                          <p className="text-[11px] text-ivory/70 font-light mt-0.5">{cat.desc}</p>
                        </Link>
                      ))}
                    </div>
                    <div className="pt-2 pb-1">
                      <Link
                        href="/shop"
                        onClick={() => setIsCollectionOpen(false)}
                        className="block text-center py-1.5 text-[10px] font-mono uppercase tracking-[0.2em] text-gold hover:text-gold-light transition-colors"
                      >
                        VIEW ALL CREATIONS →
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* BEST SELLER */}
            <Link
              href="/collections/bestsellers"
              className={`font-serif text-[13px] xl:text-[14px] uppercase tracking-[0.20em] transition-colors relative py-1 focus:outline-none ${
                pathname === '/collections/bestsellers'
                  ? 'text-wine-900 font-bold'
                  : 'text-wine-900 font-semibold hover:text-gold-deep'
              }`}
            >
              BEST SELLER
              {pathname === '/collections/bestsellers' && (
                <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-wine-900" />
              )}
            </Link>
          </div>

          {/* =========================================
              MOBILE LEFT CONTROLS (Hamburger + Search)
          ========================================= */}
          <div className="flex lg:hidden items-center space-x-1 sm:space-x-2 shrink-0">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 text-wine-900 hover:text-gold-deep focus:outline-none min-w-[44px] min-h-[44px] flex items-center justify-center transition-colors"
              aria-label="Open Navigation Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-wine-900 hover:text-gold-deep focus:outline-none min-w-[44px] min-h-[44px] flex items-center justify-center transition-colors"
              aria-label="Search Fragrances"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* =========================================
              CENTRE SCULPTED LOGO PANEL (ABSOLUTE VIEWPORT-CENTERED)
              - Upper gold border begins immediately below the announcement strip
              - Zero conspicuous empty ivory gap above the plaque
              - Sculpted downward point extending below the navbar baseline
              - True viewport centering relative to page width
          ========================================= */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 z-40 pointer-events-auto">
            <Link
              href="/"
              className="group block focus:outline-none transition-transform duration-300 hover:scale-[1.015]"
              aria-label="Aarsika Fine Fragrance Homepage"
            >
              {/* Desktop Plaque: 180px width, unclipped, seamlessly meeting the marquee lower edge */}
              <div className="hidden lg:block relative">
                <Image
                  src="/brand/aarsika-sculpted-plaque.webp"
                  alt="AARSIKA Haute Parfumerie"
                  width={998}
                  height={485}
                  priority
                  className="w-[180px] xl:w-[188px] h-auto drop-shadow-[0_8px_16px_rgba(48,7,13,0.22)] select-none"
                />
              </div>

              {/* Mobile Plaque: 114px width, complete gold silhouette visible */}
              <div className="block lg:hidden relative">
                <Image
                  src="/brand/aarsika-sculpted-plaque.webp"
                  alt="AARSIKA Haute Parfumerie"
                  width={998}
                  height={485}
                  priority
                  className="w-[114px] sm:w-[120px] h-auto drop-shadow-[0_6px_12px_rgba(48,7,13,0.20)] select-none"
                />
              </div>
            </Link>
          </div>

          {/* Reserved Spacer to guarantee clearance in desktop flow */}
          <div
            className="hidden lg:block w-[196px] xl:w-[206px] shrink-0 pointer-events-none"
            aria-hidden="true"
          />

          {/* =========================================
              DESKTOP RIGHT NAVIGATION & UTILITIES
          ========================================= */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8 min-w-0 pl-4 text-wine-900">
            {/* OUR STORY */}
            <Link
              href="/our-story"
              className={`font-serif text-[13px] xl:text-[14px] uppercase tracking-[0.20em] transition-colors relative py-1 focus:outline-none ${
                pathname === '/our-story' ? 'text-wine-900 font-bold' : 'text-wine-900 font-semibold hover:text-gold-deep'
              }`}
            >
              OUR STORY
              {pathname === '/our-story' && (
                <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gold" />
              )}
            </Link>

            {/* JOURNAL */}
            <Link
              href="/journal"
              className={`font-serif text-[13px] xl:text-[14px] uppercase tracking-[0.20em] transition-colors relative py-1 focus:outline-none ${
                pathname.startsWith('/journal') ? 'text-wine-900 font-bold' : 'text-wine-900 font-semibold hover:text-gold-deep'
              }`}
            >
              JOURNAL
              {pathname.startsWith('/journal') && (
                <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gold" />
              )}
            </Link>

            {/* Thin vertical champagne-gold separator */}
            <span className="w-px h-3.5 bg-gold/50 mx-1 xl:mx-2 shrink-0 select-none" aria-hidden="true" />

            {/* Icons Group */}
            <div className="flex items-center space-x-1.5 xl:space-x-2 text-wine-900">
              {/* Search */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-1.5 text-wine-900 hover:text-gold-deep transition-colors focus:outline-none min-w-[34px] min-h-[34px] flex items-center justify-center"
                aria-label="Search Fragrances"
              >
                <Search className="w-[17px] h-[17px]" strokeWidth={1.75} />
              </button>

              {/* Account */}
              <Link
                href="/account"
                className="p-1.5 text-wine-900 hover:text-gold-deep transition-colors focus:outline-none min-w-[34px] min-h-[34px] flex items-center justify-center"
                aria-label="Customer Account"
              >
                <User className="w-[17px] h-[17px]" strokeWidth={1.75} />
              </Link>

              {/* Wishlist */}
              <button
                onClick={() => setIsWishlistOpen(true)}
                className="p-1.5 text-wine-900 hover:text-gold-deep transition-colors relative focus:outline-none min-w-[34px] min-h-[34px] flex items-center justify-center"
                aria-label="Saved Wishlist"
              >
                <Heart className="w-[17px] h-[17px]" strokeWidth={1.75} />
                {wishlist.length > 0 && (
                  <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 bg-wine-900 text-ivory font-mono text-[9px] font-bold flex items-center justify-center border border-gold rounded-full">
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* Shopping Bag */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="p-1.5 text-wine-900 hover:text-gold-deep transition-colors relative focus:outline-none min-w-[34px] min-h-[34px] flex items-center justify-center"
                aria-label="Shopping Bag"
              >
                <ShoppingBag className="w-[17px] h-[17px]" strokeWidth={1.75} />
                {cartCount > 0 && (
                  <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-wine-900 text-ivory font-mono text-[10px] font-semibold flex items-center justify-center border border-gold rounded-full">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* =========================================
              MOBILE RIGHT CONTROLS (Wishlist + Shopping Bag)
          ========================================= */}
          <div className="flex lg:hidden items-center space-x-1 sm:space-x-2 text-wine-950 shrink-0">
            {/* Wishlist */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="p-2 text-wine-900 hover:text-gold-deep transition-colors relative focus:outline-none min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Saved Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-2 right-2 w-3.5 h-3.5 bg-wine-900 text-ivory font-mono text-[9px] font-bold flex items-center justify-center border border-gold rounded-full">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Bag */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="p-2 text-wine-900 hover:text-gold-deep transition-colors relative focus:outline-none min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Shopping Bag"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-2 right-2 w-4 h-4 bg-wine-900 text-ivory font-mono text-[10px] font-semibold flex items-center justify-center border border-gold rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

        </div>
      </nav>

      {/* =========================================
          MOBILE SLIDE-IN OVERLAY MENU
      ========================================= */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-wine-900 text-ivory flex flex-col justify-between p-6 overflow-y-auto animate-fadeIn">
          {/* Mobile Top Bar */}
          <div className="flex items-center justify-between pb-5 border-b border-gold/30">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="inline-block"
              aria-label="Aarsika Home"
            >
              <Image
                src="/brand/aarsika-sculpted-plaque.webp"
                alt="AARSIKA"
                width={998}
                height={485}
                className="w-[124px] h-auto drop-shadow-sm"
              />
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 text-gold hover:text-gold-light focus:outline-none min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Close Mobile Menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="py-6 space-y-3">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between py-2.5 border-b border-gold/15 text-ivory hover:text-gold-light"
            >
              <span className="font-serif font-semibold text-xl tracking-wider uppercase">HOME</span>
              <span className="text-xs text-gold">→</span>
            </Link>

            {/* Mobile Collection Accordion */}
            <div className="border-b border-gold/15 py-2.5">
              <button
                onClick={() => setIsMobileCollectionOpen(!isMobileCollectionOpen)}
                className="w-full flex items-center justify-between text-left focus:outline-none"
              >
                <span className="font-serif font-semibold text-xl tracking-wider text-gold-light uppercase">COLLECTIONS</span>
                <ChevronDown
                  className={`w-4 h-4 text-gold transition-transform ${
                    isMobileCollectionOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isMobileCollectionOpen && (
                <div className="pt-3 pl-3 space-y-2.5">
                  {collectionItems.map((cat) => (
                    <Link
                      key={cat.label}
                      href={cat.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-between py-1.5 text-sm font-sans text-ivory/80 hover:text-gold-light"
                    >
                      <span>{cat.label}</span>
                      <span className="text-xs text-gold/70">→</span>
                    </Link>
                  ))}
                  <Link
                    href="/shop"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block pt-1.5 text-xs font-mono tracking-widest text-gold uppercase"
                  >
                    VIEW ALL CREATIONS →
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/collections/bestsellers"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between py-2.5 border-b border-gold/15 text-ivory hover:text-gold-light"
            >
              <span className="font-serif font-semibold text-xl tracking-wider uppercase">BEST SELLER</span>
              <span className="text-xs text-gold">→</span>
            </Link>

            <Link
              href="/attar"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between py-2.5 border-b border-gold/15 text-ivory hover:text-gold-light"
            >
              <span className="font-serif font-semibold text-xl tracking-wider uppercase">ATTARS</span>
              <span className="text-xs text-gold">→</span>
            </Link>

            <Link
              href="/our-story"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between py-2.5 border-b border-gold/15 text-ivory hover:text-gold-light"
            >
              <span className="font-serif font-semibold text-xl tracking-wider uppercase">OUR STORY</span>
              <span className="text-xs text-gold">→</span>
            </Link>

            <Link
              href="/journal"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between py-2.5 border-b border-gold/15 text-ivory hover:text-gold-light"
            >
              <span className="font-serif font-semibold text-xl tracking-wider uppercase">JOURNAL</span>
              <span className="text-xs text-gold">→</span>
            </Link>

            <Link
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between py-2.5 border-b border-gold/15 text-ivory hover:text-gold-light"
            >
              <span className="font-serif font-semibold text-xl tracking-wider uppercase">CONTACT</span>
              <span className="text-xs text-gold">→</span>
            </Link>
          </div>

          {/* Quick Actions */}
          <div className="pt-4 border-t border-gold/20">
            <div className="grid grid-cols-2 gap-3 text-center">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsSearchOpen(true);
                }}
                className="py-3 px-2 border border-gold/40 text-xs tracking-widest text-gold-light uppercase hover:bg-gold/10 min-h-[44px] transition-colors"
              >
                SEARCH
              </button>
              <Link
                href="/account"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-3 px-2 border border-gold/40 text-xs tracking-widest text-gold-light uppercase hover:bg-gold/10 block min-h-[44px] flex items-center justify-center transition-colors"
              >
                ACCOUNT
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
