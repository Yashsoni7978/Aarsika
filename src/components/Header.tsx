"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ShoppingBag, Menu, X, User, ChevronRight, Heart } from "lucide-react";
import { useShop } from "@/context/ShopContext";
import { Logo } from "@/components/Logo";

export const Header: React.FC = () => {
  const pathname = usePathname();
  const { cartCount, setIsCartOpen, setIsSearchOpen, setIsWishlistOpen, wishlist } = useShop();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Monitor scroll threshold (40px)
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isMobileMenuOpen]);

  const navLinks = [
    { label: "HOME", href: "/" },
    { label: "COLLECTION", href: "/shop" },
    { label: "THE HOUSE", href: "/our-story" },
    { label: "JOURNAL", href: "/journal" },
    { label: "CONTACT", href: "/contact" },
  ];

  const mobileNavLinks = [
    { label: "COLLECTION", href: "/shop" },
    { label: "THE HOUSE", href: "/our-story" },
    { label: "JOURNAL", href: "/journal" },
    { label: "DISCOVER", href: "/discovery-sets" },
    { label: "CONTACT", href: "/contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-[#F6EFE2] text-[#1a1411] border-b border-[#dccfb6] shadow-sm py-3.5"
            : "bg-transparent text-[#F6EFE2] py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* LEFT: Logo & Mobile Hamburger */}
          <div className="flex items-center gap-3 min-w-0 flex-shrink-1">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-1.5 focus:outline-none focus:ring-1 focus:ring-[#C9A55C] rounded-sm"
              aria-label="Open Navigation Menu"
            >
              <Menu
                className={`w-5 h-5 ${
                  isScrolled ? "text-[#1a1411]" : "text-[#F6EFE2]"
                }`}
              />
            </button>

            <Logo variant={isScrolled ? "dark" : "light"} />
          </div>

          {/* CENTER: Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`eyebrow-label text-xs tracking-[0.25em] transition-colors relative py-1 focus:outline-none ${
                    isScrolled
                      ? isActive
                        ? "text-[#26060d] font-medium"
                        : "text-[#1a1411]/80 hover:text-[#26060d]"
                      : isActive
                      ? "text-[#E7CF98] font-medium"
                      : "text-[#F6EFE2]/80 hover:text-[#E7CF98]"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[1.5px] bg-[#C9A55C] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* RIGHT: Action Icons (Search, Account, Wishlist, Bag) */}
          <div className="flex items-center space-x-3.5 sm:space-x-5 flex-shrink-0">
            {/* Search Icon */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className={`p-1.5 transition-colors focus:outline-none ${
                isScrolled
                  ? "text-[#1a1411] hover:text-[#8b1a2b]"
                  : "text-[#F6EFE2] hover:text-[#E7CF98]"
              }`}
              aria-label="Search Fragrances"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Account Link */}
            <Link
              href="/account"
              className={`p-1.5 transition-colors focus:outline-none ${
                isScrolled
                  ? "text-[#1a1411] hover:text-[#8b1a2b]"
                  : "text-[#F6EFE2] hover:text-[#E7CF98]"
              }`}
              aria-label="Customer Account"
            >
              <User className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>

            {/* Wishlist Link */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className={`p-1.5 transition-colors relative focus:outline-none ${
                isScrolled
                  ? "text-[#1a1411] hover:text-[#8b1a2b]"
                  : "text-[#F6EFE2] hover:text-[#E7CF98]"
              }`}
              aria-label="Saved Wishlist"
            >
              <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#C9A55C] text-[#26060d] font-mono text-[9px] font-bold rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart / Shopping Bag Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className={`p-1.5 transition-colors relative flex items-center focus:outline-none ${
                isScrolled
                  ? "text-[#1a1411] hover:text-[#8b1a2b]"
                  : "text-[#F6EFE2] hover:text-[#E7CF98]"
              }`}
              aria-label="Shopping Bag"
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#8b1a2b] text-[#F6EFE2] font-mono text-[10px] font-medium rounded-full flex items-center justify-center border border-[#C9A55C]">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* FULL-SCREEN MOBILE OVERLAY MENU (Burgundy #26060d) */}
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
          <div className="py-10 space-y-6">
            {mobileNavLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="flex items-center justify-between py-2 border-b border-[#C9A55C]/15 group"
              >
                <span className="font-serif text-2xl tracking-widest text-[#F6EFE2] group-hover:text-[#E7CF98] uppercase">
                  {link.label}
                </span>
                <ChevronRight className="w-5 h-5 text-[#C9A55C] group-hover:translate-x-1 transition-transform" />
              </Link>
            ))}
          </div>

          {/* Quick Actions & Leaf Pattern Overlay */}
          <div className="pt-6 border-t border-[#C9A55C]/20 relative">
            <div className="grid grid-cols-3 gap-3 text-center mb-6">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsSearchOpen(true);
                }}
                className="py-3 px-2 border border-[#C9A55C]/30 text-xs tracking-widest text-[#E7CF98] uppercase hover:bg-[#C9A55C]/10"
              >
                SEARCH
              </button>
              <Link
                href="/account"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-3 px-2 border border-[#C9A55C]/30 text-xs tracking-widest text-[#E7CF98] uppercase hover:bg-[#C9A55C]/10 block"
              >
                ACCOUNT
              </Link>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsCartOpen(true);
                }}
                className="py-3 px-2 border border-[#C9A55C] bg-[#8b1a2b] text-xs tracking-widest text-[#F6EFE2] uppercase flex items-center justify-center gap-1.5"
              >
                <span>BAG</span>
                <span className="font-mono text-[10px]">({cartCount})</span>
              </button>
            </div>

            {/* Faint Gold Line-Art Leaf Pattern */}
            <div className="flex justify-center opacity-30">
              <svg width="40" height="30" viewBox="0 0 40 30" fill="none">
                <path
                  d="M20 0C10 10 5 20 5 30C15 30 20 20 20 0Z"
                  fill="#C9A55C"
                />
                <path
                  d="M20 0C30 10 35 20 35 30C25 30 20 20 20 0Z"
                  fill="#C9A55C"
                />
              </svg>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
