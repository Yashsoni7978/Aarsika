import React from "react";
import Link from "next/link";
import { Instagram } from "lucide-react";
import { Logo } from "@/components/Logo";
import { BRAND_TAGLINE, BRAND_LEGAL_ADDRESS, BRAND_INSTAGRAM } from "@/config/brand";
import { HOME } from "@/content/home.en";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-wine-950 text-ivory border-t border-gold/30 pt-16 pb-24 md:pb-12">
      <div className="max-w-[1280px] mx-auto px-5 md:px-12 space-y-12">
        {/* Top Footer Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-gold/20">
          {/* Brand Info Column */}
          <div className="md:col-span-4 space-y-4">
            <Logo variant="light" />
            <p className="font-serif italic text-base text-gold-light/90 tracking-wide">
              &ldquo;{BRAND_TAGLINE}&rdquo;
            </p>
          </div>

          {/* Navigation Columns */}
          <div className="md:col-span-8 grid grid-cols-3 gap-6 sm:gap-8">
            {/* SHOP Column */}
            <div className="space-y-3">
              <h4 className="eyebrow-label text-gold-light text-[11px]">
                SHOP
              </h4>
              <ul className="space-y-2 text-xs font-light text-ivory/80">
                <li>
                  <Link href="/collections/bestsellers" className="hover:text-gold-light transition-colors">
                    Best sellers
                  </Link>
                </li>
                <li>
                  <Link href="/attar" className="hover:text-gold-light transition-colors">
                    Attars
                  </Link>
                </li>
                <li>
                  <Link href="/perfumes" className="hover:text-gold-light transition-colors">
                    Perfumes
                  </Link>
                </li>
                <li>
                  <Link href="/gifting" className="hover:text-gold-light transition-colors">
                    Gift sets
                  </Link>
                </li>
                <li>
                  <Link href="/discovery-sets" className="hover:text-gold-light transition-colors">
                    Discovery Set
                  </Link>
                </li>
              </ul>
            </div>

            {/* THE HOUSE Column */}
            <div className="space-y-3">
              <h4 className="eyebrow-label text-gold-light text-[11px]">
                THE HOUSE
              </h4>
              <ul className="space-y-2 text-xs font-light text-ivory/80">
                <li>
                  <Link href="/our-story" className="hover:text-gold-light transition-colors">
                    Our story
                  </Link>
                </li>
                <li>
                  <Link href="/journal" className="hover:text-gold-light transition-colors">
                    Journal
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-gold-light transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* HELP Column */}
            <div className="space-y-3">
              <h4 className="eyebrow-label text-gold-light text-[11px]">
                HELP
              </h4>
              <ul className="space-y-2 text-xs font-light text-ivory/80">
                <li>
                  <Link href="/faq" className="hover:text-gold-light transition-colors">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/shipping" className="hover:text-gold-light transition-colors">
                    Shipping
                  </Link>
                </li>
                <li>
                  <Link href="/returns" className="hover:text-gold-light transition-colors">
                    Returns
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-gold-light transition-colors">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-gold-light transition-colors">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-ivory/60">
          <div className="flex items-center gap-3">
            <a
              href="https://instagram.com/aarsikaofficial"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 border border-gold/40 text-gold-light hover:bg-gold hover:text-wine-950 transition-colors text-[11px]"
              aria-label="Aarsika Official Instagram (@aarsikaofficial)"
              title="@aarsikaofficial"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span>@aarsikaofficial</span>
            </a>
            <a
              href="https://instagram.com/aarsikaparfums"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 border border-gold/40 text-gold-light hover:bg-gold hover:text-wine-950 transition-colors text-[11px]"
              aria-label="Aarsika Parfums Instagram (@aarsikaparfums)"
              title="@aarsikaparfums"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span>@aarsikaparfums</span>
            </a>
          </div>
          <p>{BRAND_LEGAL_ADDRESS}</p>
          <p>{HOME.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
};
