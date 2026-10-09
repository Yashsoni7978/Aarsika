'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, ShoppingBag, Menu, X, User, ChevronRight, ChevronDown, Heart, Sparkles } from 'lucide-react';
import { useShop } from '@/context/ShopContext';
import { Logo } from '@/components/Logo';

export const Header: React.FC = () => {
  const pathname = usePathname();
  const { cartCount, setIsCartOpen, setIsSearchOpen, setIsWishlistOpen, wishlist } = useShop();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileCollectionOpen, setIsMobileCollectionOpen] = useState(true);
  const [isCollectionDropdownOpen, setIsCollectionDropdownOpen] = useState(false);

  const dropdownTimerRef = useRef<NodeJS.Timeout | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Close menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsCollectionDropdownOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isMobileMenuOpen]);

  // Outside click & Escape key listener for desktop dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsCollectionDropdownOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsCollectionDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const collectionCategories = [
    {
      label: 'Eau de Parfums',
      href: '/collection/eau-de-parfums',
      desc: 'High-concentration spray perfumes',
    },
    {
      label: 'Itrras',
      href: '/collection/ittras',
      desc: 'Pure traditional attar oils',
    },
    {
      label: 'Gift Sets',
      href: '/collection/gift-sets',
      desc: 'Opulent velvet presentation boxes',
    },
    {
      label: 'Trial Sets',
      href: '/collection/trial-sets',
      desc: 'Curated sampler discovery vials',
    },
  ];

  const handleMouseEnter = () => {
    if (dropdownTimerRef.current) clearTimeout(dropdownTimerRef.current);
    setIsCollectionDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    dropdownTimerRef.current = setTimeout(() => {
      setIsCollectionDropdownOpen(false);
    }, 150);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full h-[72px] bg-[#26060d] text-[#F6EFE2] border-b border-[#C9A55C]/20 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center justify-between">
          {/* LEFT: Logo & Mobile Hamburger */}
          <div className="flex items-center gap-3 min-w-0 flex-shrink-1">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-1.5 focus:outline-none focus:ring-1 focus:ring-[#C9A55C] rounded-none"
              aria-label="Open Navigation Menu"
            >
              <Menu className="w-5 h-5 text-[#E7CF98]" />
            </button>

            <Logo variant="light" />
          </div>

          {/* CENTER: Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link
              href="/"
              className={`eyebrow-label text-xs tracking-[0.25em] transition-colors relative py-1 focus:outline-none ${
                pathname === '/' ? 'text-[#E7CF98] font-medium' : 'text-[#F6EFE2]/80 hover:text-[#E7CF98]'
              }`}
            >
              HOME
              {pathname === '/' && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[1.5px] bg-[#C9A55C]" />
              )}
            </Link>

            {/* COLLECTION Nav Item with Dropdown */}
            <div
              ref={dropdownRef}
              className="relative py-1"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="flex items-center gap-1 cursor-pointer">
                <Link
                  href="/shop"
                  className={`eyebrow-label text-xs tracking-[0.25em] transition-colors relative focus:outline-none flex items-center gap-1 ${
                    pathname.startsWith('/shop') || pathname.startsWith('/collection')
                      ? 'text-[#E7CF98] font-medium'
                      : 'text-[#F6EFE2]/80 hover:text-[#E7CF98]'
                  }`}
                  onClick={(e) => {
                    // Toggle dropdown if clicked
                    setIsCollectionDropdownOpen((prev) => !prev);
                  }}
                  aria-expanded={isCollectionDropdownOpen}
                  aria-haspopup="true"
                >
                  <span>COLLECTION</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-[#C9A55C] transition-transform duration-300 ${
                      isCollectionDropdownOpen ? 'rotate-180 text-[#E7CF98]' : ''
                    }`}
                  />
                  {(pathname.startsWith('/shop') || pathname.startsWith('/collection')) && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[1.5px] bg-[#C9A55C]" />
                  )}
                </Link>
              </div>

              {/* Desktop Dropdown Panel */}
              {isCollectionDropdownOpen && (
                <div
                  className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50 w-72 transition-all duration-300 animate-fadeIn"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="bg-[#F5EFE3] text-[#32151A] rounded-xl border border-[#C9A55C]/40 shadow-2xl p-2.5 space-y-1">
                    <div className="px-3 py-1.5 border-b border-[#C9A55C]/20 flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#9D6A26]">
                        CATEGORIES
                      </span>
                      <Sparkles className="w-3 h-3 text-[#C69A45]" />
                    </div>

                    {collectionCategories.map((cat, idx) => (
                      <Link
                        key={cat.label}
                        href={cat.href}
                        onClick={() => setIsCollectionDropdownOpen(false)}
                        className={`block p-3 rounded-lg transition-all duration-200 group hover:bg-[#30070D]/5 border border-transparent hover:border-[#C9A55C]/30 ${
                          idx !== collectionCategories.length - 1 ? 'border-b border-[#C9A55C]/15' : ''
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-serif text-base font-normal text-[#32151A] group-hover:text-[#9D6A26] transition-colors">
                            {cat.label}
                          </span>
                          <ChevronRight className="w-4 h-4 text-[#9D6A26] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                        </div>
                        <span className="text-[11px] font-sans font-light text-[#6b5f55] mt-0.5 block">
                          {cat.desc}
                        </span>
                      </Link>
                    ))}

                    {/* View All Collection Link */}
                    <div className="pt-1 border-t border-[#C9A55C]/20">
                      <Link
                        href="/shop"
                        onClick={() => setIsCollectionDropdownOpen(false)}
                        className="block text-center py-2 text-[11px] font-mono tracking-widest uppercase text-[#30070D] hover:text-[#9D6A26] transition-colors"
                      >
                        VIEW ALL CREATIONS →
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/our-story"
              className={`eyebrow-label text-xs tracking-[0.25em] transition-colors relative py-1 focus:outline-none ${
                pathname === '/our-story' ? 'text-[#E7CF98] font-medium' : 'text-[#F6EFE2]/80 hover:text-[#E7CF98]'
              }`}
            >
              THE HOUSE
              {pathname === '/our-story' && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[1.5px] bg-[#C9A55C]" />
              )}
            </Link>

            <Link
              href="/journal"
              className={`eyebrow-label text-xs tracking-[0.25em] transition-colors relative py-1 focus:outline-none ${
                pathname.startsWith('/journal') ? 'text-[#E7CF98] font-medium' : 'text-[#F6EFE2]/80 hover:text-[#E7CF98]'
              }`}
            >
              JOURNAL
              {pathname.startsWith('/journal') && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[1.5px] bg-[#C9A55C]" />
              )}
            </Link>

            <Link
              href="/contact"
              className={`eyebrow-label text-xs tracking-[0.25em] transition-colors relative py-1 focus:outline-none ${
                pathname === '/contact' ? 'text-[#E7CF98] font-medium' : 'text-[#F6EFE2]/80 hover:text-[#E7CF98]'
              }`}
            >
              CONTACT
              {pathname === '/contact' && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[1.5px] bg-[#C9A55C]" />
              )}
            </Link>
          </nav>

          {/* RIGHT: Action Icons */}
          <div className="flex items-center space-x-3.5 sm:space-x-5 flex-shrink-0">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-1.5 text-[#F6EFE2] hover:text-[#E7CF98] transition-colors focus:outline-none"
              aria-label="Search Fragrances"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <Link
              href="/account"
              className="p-1.5 text-[#F6EFE2] hover:text-[#E7CF98] transition-colors focus:outline-none"
              aria-label="Customer Account"
            >
              <User className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>

            <button
              onClick={() => setIsWishlistOpen(true)}
              className="p-1.5 text-[#F6EFE2] hover:text-[#E7CF98] transition-colors relative focus:outline-none"
              aria-label="Saved Wishlist"
            >
              <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#C9A55C] text-[#26060d] font-mono text-[9px] font-bold rounded-none flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsCartOpen(true)}
              className="p-1.5 text-[#F6EFE2] hover:text-[#E7CF98] transition-colors relative flex items-center focus:outline-none"
              aria-label="Shopping Bag"
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#8b1a2b] text-[#F6EFE2] font-mono text-[10px] font-medium rounded-none flex items-center justify-center border border-[#C9A55C]">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* FULL-SCREEN MOBILE OVERLAY MENU */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#26060d] text-[#F6EFE2] flex flex-col justify-between p-6 overflow-y-auto animate-fadeIn">
          {/* Mobile Header Top Bar */}
          <div className="flex items-center justify-between pb-6 border-b border-[#C9A55C]/20">
            <Logo variant="light" />
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 text-[#C9A55C] hover:text-[#E7CF98] focus:outline-none"
              aria-label="Close Mobile Menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Main Mobile Navigation Links */}
          <div className="py-8 space-y-4">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between py-2 border-b border-[#C9A55C]/15 group"
            >
              <span className="font-serif text-2xl tracking-widest text-[#F6EFE2] group-hover:text-[#E7CF98] uppercase">
                HOME
              </span>
              <ChevronRight className="w-5 h-5 text-[#C9A55C]" />
            </Link>

            {/* Expandable COLLECTION Accordion on Mobile */}
            <div className="border-b border-[#C9A55C]/15 py-2">
              <button
                onClick={() => setIsMobileCollectionOpen((prev) => !prev)}
                className="w-full flex items-center justify-between group py-1 text-left focus:outline-none"
              >
                <span className="font-serif text-2xl tracking-widest text-[#E7CF98] uppercase">
                  COLLECTION
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-[#C9A55C] transition-transform duration-300 ${
                    isMobileCollectionOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Nested Mobile Categories */}
              {isMobileCollectionOpen && (
                <div className="pt-3 pb-2 pl-4 space-y-3">
                  {collectionCategories.map((cat) => (
                    <Link
                      key={cat.label}
                      href={cat.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-between py-1.5 text-sm font-serif text-[#F6EFE2]/90 hover:text-[#E7CF98]"
                    >
                      <span>{cat.label}</span>
                      <ChevronRight className="w-4 h-4 text-[#C9A55C]/60" />
                    </Link>
                  ))}
                  <Link
                    href="/shop"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block pt-2 text-xs font-mono tracking-widest text-[#C9A55C] uppercase"
                  >
                    VIEW ALL CREATIONS →
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/our-story"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between py-2 border-b border-[#C9A55C]/15 group"
            >
              <span className="font-serif text-2xl tracking-widest text-[#F6EFE2] group-hover:text-[#E7CF98] uppercase">
                THE HOUSE
              </span>
              <ChevronRight className="w-5 h-5 text-[#C9A55C]" />
            </Link>

            <Link
              href="/journal"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between py-2 border-b border-[#C9A55C]/15 group"
            >
              <span className="font-serif text-2xl tracking-widest text-[#F6EFE2] group-hover:text-[#E7CF98] uppercase">
                JOURNAL
              </span>
              <ChevronRight className="w-5 h-5 text-[#C9A55C]" />
            </Link>

            <Link
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between py-2 border-b border-[#C9A55C]/15 group"
            >
              <span className="font-serif text-2xl tracking-widest text-[#F6EFE2] group-hover:text-[#E7CF98] uppercase">
                CONTACT
              </span>
              <ChevronRight className="w-5 h-5 text-[#C9A55C]" />
            </Link>
          </div>

          {/* Quick Actions */}
          <div className="pt-4 border-t border-[#C9A55C]/20 relative">
            <div className="grid grid-cols-3 gap-3 text-center mb-4">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsSearchOpen(true);
                }}
                className="py-3 px-2 border border-[#C9A55C]/30 text-xs tracking-widest text-[#E7CF98] uppercase hover:bg-[#C9A55C]/10 rounded-none"
              >
                SEARCH
              </button>
              <Link
                href="/account"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-3 px-2 border border-[#C9A55C]/30 text-xs tracking-widest text-[#E7CF98] uppercase hover:bg-[#C9A55C]/10 block rounded-none"
              >
                ACCOUNT
              </Link>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsCartOpen(true);
                }}
                className="py-3 px-2 border border-[#C9A55C] bg-[#8b1a2b] text-xs tracking-widest text-[#F6EFE2] uppercase flex items-center justify-center gap-1.5 rounded-none"
              >
                <span>BAG</span>
                <span className="font-mono text-[10px]">({cartCount})</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
