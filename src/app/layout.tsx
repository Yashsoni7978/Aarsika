import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import { ShopProvider } from "@/context/ShopContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { WishlistDrawer } from "@/components/WishlistDrawer";
import { SearchModal } from "@/components/SearchModal";
import { FragranceFinderModal } from "@/components/FragranceFinderModal";
import { ToastBanner } from "@/components/ToastBanner";
import AnnouncementBar from "@/components/AnnouncementBar";
import StickyPhoneBar from "@/components/StickyPhoneBar";
import { BRAND_NAME, BRAND_TAGLINE, BRAND_LEGAL_ADDRESS, BRAND_INSTAGRAM } from "@/config/brand";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-jost",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aarsika.com"),
  title: `${BRAND_NAME} | ${BRAND_TAGLINE}`,
  description:
    "Rare scents. Timeless lands. Discover fine attars, perfumes, and luxury gift sets shaped by memory, material and place.",
  keywords: [
    "Aarsika",
    "Aarsika Parfums",
    "Fine Fragrance India",
    "Attar",
    "Eau de Parfum",
    "Luxury Perfume",
    "Discovery Set",
    "Extrait de Parfum",
  ],
  icons: {
    icon: "/brand/favicon.ico",
  },
  openGraph: {
    title: `${BRAND_NAME} | ${BRAND_TAGLINE}`,
    description: "Rare scents. Timeless lands. Fragrances shaped by memory, material and place.",
    url: "https://aarsika.com",
    siteName: `${BRAND_NAME} Fine Fragrance`,
    images: [
      {
        url: "/brand/og.jpg",
        width: 1200,
        height: 630,
        alt: `${BRAND_NAME} Fine Fragrance`,
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  other: {
    "application/ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: BRAND_NAME,
      url: "https://aarsika.com",
      logo: "https://aarsika.com/brand/logo.svg",
      sameAs: BRAND_INSTAGRAM,
    }),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable}`}>
      <body className="antialiased bg-[#F6EFE2] text-[#1a1411] font-sans selection:bg-[#8b1a2b] selection:text-white">
        <ShopProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <CartDrawer />
          <WishlistDrawer />
          <SearchModal />
          <FragranceFinderModal />
          <ToastBanner />
          <StickyPhoneBar />
        </ShopProvider>
      </body>
    </html>
  );
}
