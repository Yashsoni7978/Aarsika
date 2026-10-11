'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, ShoppingBag, Menu, X, Heart, User, ChevronDown } from 'lucide-react';
import { useShop } from '@/context/ShopContext';
import { Logo } from '@/components/Logo';

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
    { label: 'Eau de Parfums', href: '/collection/eau-de-parfums', desc: 'High-concentration spray perfumes' },
    { label: 'Ittras', href: '/collection/ittras', desc: 'Pure concentrated attar oils' },
    { label: 'Gift Sets', href: '/collection/gift-sets', desc: 'Curated gift presentations' },
    { label: 'Trial Sets', href: '/collection/trial-sets', desc: 'Discovery & sampler vials' },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 w-full h-[64px] md:h-[72px] bg-[#30070D] text-[#F5EFE3] border-b border-[#C69A45]/20 flex items-center shadow-sm">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-10 w-full flex items-center justify-between">
          
          {/* LEFT: Logo & Mobile Hamburger */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 text-[#E7CF98] hover:text-[#C69A45] focus:outline-none min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Open Navigation Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <Logo variant="light" />
          </div>

          {/* CENTER: Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-7 xl:space-x-9" aria-label="Main Navigation">
            {/* HOME */}
            <Link
              href="/"
              className={`text-xs uppercase tracking-[0.22em] font-medium transition-colors relative py-1 focus:outline-none ${
                pathname === '/' ? 'text-[#E7CF98]' : 'text-[#F5EFE3]/80 hover:text-[#E7CF98]'
              }`}
            >
              HOME
              {pathname === '/' && (
                <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#C69A45]" />
              )}
            </Link>

            {/* COLLECTION with Dropdown */}
            <div
              ref={dropdownRef}
              className="relative py-1"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                onClick={() => setIsCollectionOpen(!isCollectionOpen)}
                className={`text-xs uppercase tracking-[0.22em] font-medium transition-colors flex items-center gap-1.5 focus:outline-none ${
                  pathname.startsWith('/collection') || pathname.startsWith('/shop')
                    ? 'text-[#E7CF98]'
                    : 'text-[#F5EFE3]/80 hover:text-[#E7CF98]'
                }`}
                aria-expanded={isCollectionOpen}
                aria-haspopup="true"
              >
                <span>COLLECTION</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-[#C69A45] transition-transform duration-200 ${
                    isCollectionOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Desktop Dropdown Menu */}
              {isCollectionOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-72 z-50 animate-fadeIn">
                  <div className="bg-[#30070D] text-[#F5EFE3] border border-[#C69A45]/30 shadow-2xl p-2 divide-y divide-[#C69A45]/15">
                    <div className="py-1">
                      {collectionItems.map((cat) => (
                        <Link
                          key={cat.label}
                          href={cat.href}
                          onClick={() => setIsCollectionOpen(false)}
                          className="block px-3 py-2.5 hover:bg-[#450B14] transition-colors group"
                        >
                          <div className="font-serif text-sm text-[#F5EFE3] group-hover:text-[#E7CF98] flex items-center justify-between">
                            <span>{cat.label}</span>
                            <span className="text-[#C69A45] opacity-0 group-hover:opacity-100 transition-opacity text-xs">→</span>
                          </div>
                          <p className="text-[11px] text-[#F5EFE3]/60 font-light mt-0.5">{cat.desc}</p>
                        </Link>
                      ))}
                    </div>
                    <div className="pt-2 pb-1">
                      <Link
                        href="/shop"
                        onClick={() => setIsCollectionOpen(false)}
                        className="block text-center py-1.5 text-[10px] font-mono uppercase tracking-[0.2em] text-[#C69A45] hover:text-[#E7CF98] transition-colors"
                      >
                        VIEW ALL CREATIONS →
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* THE HOUSE */}
            <Link
              href="/our-story"
              className={`text-xs uppercase tracking-[0.22em] font-medium transition-colors relative py-1 focus:outline-none ${
                pathname === '/our-story' ? 'text-[#E7CF98]' : 'text-[#F5EFE3]/80 hover:text-[#E7CF98]'
              }`}
            >
              THE HOUSE
              {pathname === '/our-story' && (
                <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#C69A45]" />
              )}
            </Link>

            {/* JOURNAL */}
            <Link
              href="/journal"
              className={`text-xs uppercase tracking-[0.22em] font-medium transition-colors relative py-1 focus:outline-none ${
                pathname.startsWith('/journal') ? 'text-[#E7CF98]' : 'text-[#F5EFE3]/80 hover:text-[#E7CF98]'
              }`}
            >
              JOURNAL
              {pathname.startsWith('/journal') && (
                <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#C69A45]" />
              )}
            </Link>

            {/* CONTACT */}
            <Link
              href="/contact"
              className={`text-xs uppercase tracking-[0.22em] font-medium transition-colors relative py-1 focus:outline-none ${
                pathname === '/contact' ? 'text-[#E7CF98]' : 'text-[#F5EFE3]/80 hover:text-[#E7CF98]'
              }`}
            >
              CONTACT
              {pathname === '/contact' && (
                <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#C69A45]" />
              )}
            </Link>
          </nav>

          {/* RIGHT: Action Icons (Search, Account, Wishlist, Bag) */}
          <div className="flex items-center space-x-2 sm:space-x-3 text-[#F5EFE3]">
            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 hover:text-[#E7CF98] transition-colors focus:outline-none min-w-[40px] min-h-[40px] flex items-center justify-center"
              aria-label="Search Fragrances"
            >
              <Search className="w-[18px] h-[18px] sm:w-5 sm:h-5" />
            </button>

            {/* Account */}
            <Link
              href="/account"
              className="p-2 hover:text-[#E7CF98] transition-colors focus:outline-none min-w-[40px] min-h-[40px] flex items-center justify-center"
              aria-label="Customer Account"
            >
              <User className="w-[18px] h-[18px] sm:w-5 sm:h-5" />
            </Link>

            {/* Wishlist */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="p-2 hover:text-[#E7CF98] transition-colors relative focus:outline-none min-w-[40px] min-h-[40px] flex items-center justify-center"
              aria-label="Saved Wishlist"
            >
              <Heart className="w-[18px] h-[18px] sm:w-5 sm:h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-[#C69A45] text-[#30070D] font-mono text-[9px] font-bold flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Bag */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="p-2 hover:text-[#E7CF98] transition-colors relative focus:outline-none min-w-[40px] min-h-[40px] flex items-center justify-center"
              aria-label="Shopping Bag"
            >
              <ShoppingBag className="w-[18px] h-[18px] sm:w-5 sm:h-5" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#450B14] text-[#F5EFE3] font-mono text-[10px] font-medium flex items-center justify-center border border-[#C69A45]">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* FULL-SCREEN BURGUNDY MOBILE OVERLAY MENU */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#30070D] text-[#F5EFE3] flex flex-col justify-between p-6 overflow-y-auto animate-fadeIn">
          {/* Mobile Top Bar */}
          <div className="flex items-center justify-between pb-5 border-b border-[#C69A45]/20">
            <Logo variant="light" />
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 text-[#C69A45] hover:text-[#E7CF98] focus:outline-none min-w-[44px] min-h-[44px] flex items-center justify-center"
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
              className="flex items-center justify-between py-2.5 border-b border-[#C69A45]/15 text-[#F5EFE3] hover:text-[#E7CF98]"
            >
              <span className="font-serif text-xl tracking-wider uppercase">HOME</span>
              <span className="text-xs text-[#C69A45]">→</span>
            </Link>

            {/* Mobile Collection Accordion */}
            <div className="border-b border-[#C69A45]/15 py-2.5">
              <button
                onClick={() => setIsMobileCollectionOpen(!isMobileCollectionOpen)}
                className="w-full flex items-center justify-between text-left focus:outline-none"
              >
                <span className="font-serif text-xl tracking-wider text-[#E7CF98] uppercase">COLLECTION</span>
                <ChevronDown
                  className={`w-4 h-4 text-[#C69A45] transition-transform ${
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
                      className="flex items-center justify-between py-1.5 text-sm font-sans text-[#F5EFE3]/80 hover:text-[#E7CF98]"
                    >
                      <span>{cat.label}</span>
                      <span className="text-xs text-[#C69A45]/70">→</span>
                    </Link>
                  ))}
                  <Link
                    href="/shop"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block pt-1.5 text-xs font-mono tracking-widest text-[#C69A45] uppercase"
                  >
                    VIEW ALL CREATIONS →
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/our-story"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between py-2.5 border-b border-[#C69A45]/15 text-[#F5EFE3] hover:text-[#E7CF98]"
            >
              <span className="font-serif text-xl tracking-wider uppercase">THE HOUSE</span>
              <span className="text-xs text-[#C69A45]">→</span>
            </Link>

            <Link
              href="/journal"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between py-2.5 border-b border-[#C69A45]/15 text-[#F5EFE3] hover:text-[#E7CF98]"
            >
              <span className="font-serif text-xl tracking-wider uppercase">JOURNAL</span>
              <span className="text-xs text-[#C69A45]">→</span>
            </Link>

            <Link
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between py-2.5 border-b border-[#C69A45]/15 text-[#F5EFE3] hover:text-[#E7CF98]"
            >
              <span className="font-serif text-xl tracking-wider uppercase">CONTACT</span>
              <span className="text-xs text-[#C69A45]">→</span>
            </Link>
          </div>

          {/* Quick Actions */}
          <div className="pt-4 border-t border-[#C69A45]/20">
            <div className="grid grid-cols-2 gap-3 text-center">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsSearchOpen(true);
                }}
                className="py-3 px-2 border border-[#C69A45]/30 text-xs tracking-widest text-[#E7CF98] uppercase hover:bg-[#C69A45]/10 min-h-[44px]"
              >
                SEARCH
              </button>
              <Link
                href="/account"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-3 px-2 border border-[#C69A45]/30 text-xs tracking-widest text-[#E7CF98] uppercase hover:bg-[#C69A45]/10 block min-h-[44px] flex items-center justify-center"
              >
                ACCOUNT
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
