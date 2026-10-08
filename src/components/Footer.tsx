import React from "react";
import Link from "next/link";
import { Instagram } from "lucide-react";
import { Logo } from "@/components/Logo";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#26060d] text-[#F6EFE2] border-t border-[#C9A55C]/30 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-12">
        {/* Top Footer Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#C9A55C]/20">
          {/* Brand Info Column */}
          <div className="md:col-span-5 space-y-4">
            <Logo variant="light" />
            <p className="font-serif italic text-base text-[#E7CF98]/90 tracking-wide">
              &ldquo;Rare scents. Timeless lands.&rdquo;
            </p>
            <p className="text-xs text-[#F6EFE2]/70 font-light max-w-sm leading-relaxed">
              Fine attars, perfumes, bakhoor, and luxury gift sets shaped by memory, material and place.
            </p>
            {/* Social Links */}
            <div className="flex items-center space-x-4 pt-2">
              <a
                href="https://instagram.com/aarsikaofficial"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-[#C9A55C]/40 flex items-center justify-center text-[#E7CF98] hover:bg-[#C9A55C] hover:text-[#26060d] transition-colors"
                aria-label="Aarsika Official Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com/aarsikaparfums"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-[#C9A55C]/40 flex items-center justify-center text-[#E7CF98] hover:bg-[#C9A55C] hover:text-[#26060d] transition-colors"
                aria-label="Aarsika Parfums Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="md:col-span-7 grid grid-cols-3 gap-6 sm:gap-8">
            {/* SHOP Column */}
            <div className="space-y-3">
              <h4 className="eyebrow-label text-[#E7CF98] text-[11px]">
                SHOP
              </h4>
              <ul className="space-y-2 text-xs font-light text-[#F6EFE2]/80">
                <li>
                  <Link href="/shop" className="hover:text-[#E7CF98] transition-colors">
                    All Fragrances
                  </Link>
                </li>
                <li>
                  <Link href="/perfumes" className="hover:text-[#E7CF98] transition-colors">
                    Eau de Parfum
                  </Link>
                </li>
                <li>
                  <Link href="/attar" className="hover:text-[#E7CF98] transition-colors">
                    Attar Oils
                  </Link>
                </li>
                <li>
                  <Link href="/oud" className="hover:text-[#E7CF98] transition-colors">
                    Oud Collection
                  </Link>
                </li>
                <li>
                  <Link href="/discovery-sets" className="hover:text-[#E7CF98] transition-colors">
                    Discovery Sets
                  </Link>
                </li>
                <li>
                  <Link href="/gifting" className="hover:text-[#E7CF98] transition-colors">
                    Gift Chests
                  </Link>
                </li>
              </ul>
            </div>

            {/* THE HOUSE Column */}
            <div className="space-y-3">
              <h4 className="eyebrow-label text-[#E7CF98] text-[11px]">
                THE HOUSE
              </h4>
              <ul className="space-y-2 text-xs font-light text-[#F6EFE2]/80">
                <li>
                  <Link href="/our-story" className="hover:text-[#E7CF98] transition-colors">
                    Our Story
                  </Link>
                </li>
                <li>
                  <Link href="/craftsmanship" className="hover:text-[#E7CF98] transition-colors">
                    Craftsmanship
                  </Link>
                </li>
                <li>
                  <Link href="/ingredients" className="hover:text-[#E7CF98] transition-colors">
                    Ingredients
                  </Link>
                </li>
                <li>
                  <Link href="/journal" className="hover:text-[#E7CF98] transition-colors">
                    The Journal
                  </Link>
                </li>
              </ul>
            </div>

            {/* HELP Column */}
            <div className="space-y-3">
              <h4 className="eyebrow-label text-[#E7CF98] text-[11px]">
                HELP
              </h4>
              <ul className="space-y-2 text-xs font-light text-[#F6EFE2]/80">
                <li>
                  <Link href="/contact" className="hover:text-[#E7CF98] transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-[#E7CF98] transition-colors">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/shipping-policy" className="hover:text-[#E7CF98] transition-colors">
                    Shipping Policy
                  </Link>
                </li>
                <li>
                  <Link href="/returns" className="hover:text-[#E7CF98] transition-colors">
                    Returns & Replacements
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-[#E7CF98] transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-[#E7CF98] transition-colors">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-light text-[#F6EFE2]/60 pt-2">
          <p>© 2026 Aarsika. All rights reserved.</p>
          <p className="font-mono text-[10.5px]">Aarsika, Jaipur, Rajasthan 302012</p>
        </div>
      </div>
    </footer>
  );
};
