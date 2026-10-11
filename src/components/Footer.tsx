import React from "react";
import Link from "next/link";
import { Instagram } from "lucide-react";
import { Logo } from "@/components/Logo";
import { BRAND_TAGLINE, BRAND_LEGAL_ADDRESS, BRAND_INSTAGRAM } from "@/config/brand";
import { HOME } from "@/content/home.en";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#26060d] text-[#F6EFE2] border-t border-[#C9A55C]/30 pt-16 pb-24 md:pb-12">
      <div className="max-w-[1280px] mx-auto px-5 md:px-12 space-y-12">
        {/* Top Footer Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#C9A55C]/20">
          {/* Brand Info Column */}
          <div className="md:col-span-4 space-y-4">
            <Logo variant="light" />
            <p className="font-serif italic text-base text-[#E7CF98]/90 tracking-wide">
              &ldquo;{BRAND_TAGLINE}&rdquo;
            </p>
          </div>

          {/* Navigation Columns */}
          <div className="md:col-span-8 grid grid-cols-3 gap-6 sm:gap-8">
            {/* SHOP Column */}
            <div className="space-y-3">
              <h4 className="eyebrow-label text-[#E7CF98] text-[11px]">
                SHOP
              </h4>
              <ul className="space-y-2 text-xs font-light text-[#F6EFE2]/80">
                <li>
                  <Link href="/attar" className="hover:text-[#E7CF98] transition-colors">
                    Attars
                  </Link>
                </li>
                <li>
                  <Link href="/perfumes" className="hover:text-[#E7CF98] transition-colors">
                    Perfumes
                  </Link>
                </li>
                <li>
                  <Link href="/gifting" className="hover:text-[#E7CF98] transition-colors">
                    Gift sets
                  </Link>
                </li>
                <li>
                  <Link href="/discovery-sets" className="hover:text-[#E7CF98] transition-colors">
                    Discovery Set
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
                    Our story
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-[#E7CF98] transition-colors">
                    Contact
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
                  <Link href="/faq" className="hover:text-[#E7CF98] transition-colors">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/shipping" className="hover:text-[#E7CF98] transition-colors">
                    Shipping
                  </Link>
                </li>
                <li>
                  <Link href="/returns" className="hover:text-[#E7CF98] transition-colors">
                    Returns
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-[#E7CF98] transition-colors">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-[#E7CF98] transition-colors">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#F6EFE2]/60">
          <div className="flex items-center gap-4">
            {BRAND_INSTAGRAM.map((url, i) => (
              <a
                key={i}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-[#C9A55C]/40 flex items-center justify-center text-[#E7CF98] hover:bg-[#C9A55C] hover:text-[#26060d] transition-colors rounded-none"
                aria-label={`Aarsika Instagram ${i + 1}`}
              >
                <Instagram className="w-4 h-4" />
              </a>
            ))}
          </div>
          <p>{BRAND_LEGAL_ADDRESS}</p>
          <p>{HOME.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
};
