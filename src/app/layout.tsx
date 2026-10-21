import type { Metadata } from "next";
import dynamic from "next/dynamic";
import localFont from "next/font/local";
import "./globals.css";
import { ShopProvider } from "@/context/ShopContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ToastBanner } from "@/components/ToastBanner";
import StickyPhoneBar from "@/components/StickyPhoneBar";
import { BRAND_NAME, BRAND_TAGLINE, BRAND_LEGAL_ADDRESS, BRAND_INSTAGRAM } from "@/config/brand";
import { getSeoMode, SITE_URL } from "@/config/env";

const CartDrawer = dynamic(() => import("@/components/CartDrawer").then((m) => m.CartDrawer), {
  ssr: false,
});
const WishlistDrawer = dynamic(() => import("@/components/WishlistDrawer").then((m) => m.WishlistDrawer), {
  ssr: false,
});
const SearchModal = dynamic(() => import("@/components/SearchModal").then((m) => m.SearchModal), {
  ssr: false,
});
const FragranceFinderModal = dynamic(() => import("@/components/FragranceFinderModal").then((m) => m.FragranceFinderModal), {
  ssr: false,
});

const cormorant = localFont({
  src: [
    {
      path: "../fonts/CormorantGaramond-Variable.woff2",
      weight: "300 700",
      style: "normal",
    },
    {
      path: "../fonts/CormorantGaramond-Italic-Variable.woff2",
      weight: "300 700",
      style: "italic",
    },
  ],
  variable: "--font-cormorant",
  display: "swap",
  adjustFontFallback: "Times New Roman",
});

const jost = localFont({
  src: [
    {
      path: "../fonts/Jost-Variable.woff2",
      weight: "300 700",
      style: "normal",
    },
  ],
  variable: "--font-jost",
  display: "swap",
  adjustFontFallback: "Arial",
});

const defaultSiteUrl = 'https://aarsika.com';
const rawSiteUrl = (typeof process !== 'undefined' && process.env && process.env.NEXT_PUBLIC_SITE_URL) || defaultSiteUrl;
const siteUrl = rawSiteUrl && rawSiteUrl.startsWith('http') ? rawSiteUrl : defaultSiteUrl;

const seoMode = getSeoMode();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Aarsika | Attars, Eau de Parfums & Gift Sets Online in India",
    template: "%s",
  },
  description:
    "Shop Aarsika attars from ₹249, eau de parfums, gift sets and discovery sets. Complimentary delivery on orders ₹1,500 and above across India.",
  keywords: [
    "Aarsika",
    "Attar",
    "Eau de Parfum",
    "Gift Sets",
    "Discovery Sets",
    "Fragrance India",
  ],
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: "/brand/favicon.ico",
  },
  openGraph: {
    title: "Aarsika | Attars, Eau de Parfums & Gift Sets Online in India",
    description: "Shop Aarsika attars from ₹249, eau de parfums, gift sets and discovery sets. Complimentary delivery on orders ₹1,500 and above across India.",
    url: SITE_URL,
    siteName: "Aarsika",
    images: [
      {
        url: "/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Aarsika",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aarsika | Attars, Eau de Parfums & Gift Sets Online in India",
    description: "Shop Aarsika attars from ₹249, eau de parfums, gift sets and discovery sets. Complimentary delivery on orders ₹1,500 and above across India.",
    images: ["/og-default.jpg"],
  },
  robots: seoMode.isIndexable
    ? {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      }
    : {
        index: false,
        follow: false,
      },
  other: {
    "application/ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Aarsika",
      url: SITE_URL,
      logo: `${SITE_URL}/brand/logo.svg`,
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
    <html lang="en-IN" className={`${cormorant.variable} ${jost.variable}`}>
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
