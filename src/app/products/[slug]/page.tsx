'use client';

import React, { useState, useEffect, useRef, TouchEvent } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ChevronLeft, ChevronRight, ShieldCheck, Truck, Sparkles, Check, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '@/data/products';
import { useShop } from '@/context/ShopContext';
import { ProductCard } from '@/components/ProductCard';
import { ProductPlaceholderImage } from '@/components/ProductPlaceholderImage';
import PearlButton from '@/components/PearlButton';

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export default function ProductDetailPage({ params }: ProductPageProps) {
  const product = PRODUCTS.find(
    (p) => p.slug === params.slug || p.id === params.slug
  );

  const { addToCart, toggleWishlist, isInWishlist } = useShop();
  const isLiked = product ? isInWishlist(product.id) : false;

  const categoryBreadcrumb = React.useMemo(() => {
    if (!product) return { href: '/shop', label: 'COLLECTION' };
    const cat = (product.category || '').toUpperCase();
    if (cat.includes('PARFUM')) return { href: '/perfumes', label: 'EAU DE PARFUMS' };
    if (cat.includes('ATTAR')) return { href: '/attar', label: 'ATTARS' };
    if (cat.includes('GIFT')) return { href: '/gifting', label: 'GIFT SETS' };
    if (cat.includes('DISCOVERY') || cat.includes('TRIAL')) return { href: '/discovery-sets', label: 'DISCOVERY SETS' };
    return { href: '/shop', label: 'COLLECTION' };
  }, [product]);

  const [selectedSize, setSelectedSize] = useState(
    product?.defaultSize || product?.sizeOptions?.[0] || '12 ml'
  );
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  // Collect 3 images for the gallery
  const galleryImages = React.useMemo(() => {
    if (!product) return [];
    const clean = (url: string) => url.endsWith('.png') ? url.replace(/\.png$/, '.webp') : url;

    if (product.gallery && product.gallery.length >= 3) {
      return product.gallery.slice(0, 3).map(clean);
    }
    const imgs: string[] = [];
    if (product.mainImage) imgs.push(clean(product.mainImage));
    if (product.secondaryImage) imgs.push(clean(product.secondaryImage));
    if (product.gallery && product.gallery.length > 0) {
      product.gallery.forEach((g) => {
        const cleaned = clean(g);
        if (!imgs.includes(cleaned)) imgs.push(cleaned);
      });
    }
    while (imgs.length < 3) {
      imgs.push(clean(product.mainImage || '/photos/attars/sehar-e-gulab.jpg'));
    }
    return imgs.slice(0, 3);
  }, [product]);



  if (!product) {
    return (
      <div className="py-32 text-center space-y-4 bg-[#F6EFE2] min-h-screen">
        <h1 className="font-serif text-4xl text-[#1a1411] font-light">
          Creation Not Found
        </h1>
        <Link href="/shop" className="text-link-underline text-[#1a1411]">
          Return to collection →
        </Link>
      </div>
    );
  }

  const activeVariant =
    product.variants?.find((v) => v.size === selectedSize) ||
    product.variants?.[0] || {
      size: selectedSize,
      price: product.price,
      stock: product.stock,
      batchNo: 1,
      batchSize: 69,
      nextSerial: 1,
    };

  const currentPrice = activeVariant.price;
  const currentStock = activeVariant.stock;
  const batchNo = activeVariant.batchNo || 1;
  const batchSize = activeVariant.batchSize || 69;

  const relatedProducts = PRODUCTS.filter(
    (p) => p.id !== product.id && p.category === product.category
  ).slice(0, 4);

  // WhatsApp waitlist message for sold-out items
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || '';
  const waitlistMessage = `Hello Aarsika, I would like to join the waitlist for ${product.name} (${selectedSize}, Batch 02).`;
  const whatsappUrl = whatsappNumber
    ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(waitlistMessage)}`
    : `/contact?subject=${encodeURIComponent(`Waitlist for ${product.name} ${selectedSize}`)}`;

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const handleTouchStart = (e: TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    const distance = touchStartX - touchEndX;

    if (distance > 40) {
      nextImage();
    } else if (distance < -40) {
      prevImage();
    }

    setTouchStartX(null);
    setTouchEndX(null);
  };

  return (
    <div className="bg-[#F6EFE2] text-[#1a1411] pt-24 pb-24 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Breadcrumb */}
        <div className="text-xs font-mono tracking-widest text-[#6b5f55] uppercase space-x-2">
          <Link href="/" className="hover:text-[#1a1411]">
            HOME
          </Link>
          <span>/</span>
          <Link href={categoryBreadcrumb.href} className="hover:text-[#1a1411]">
            {categoryBreadcrumb.label}
          </Link>
          <span>/</span>
          <span className="text-[#1a1411] font-medium">{product.name}</span>
        </div>

        {/* 2-Column Product Detail Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* LEFT: 3-Image Interactive Gallery or Placeholder */}
          <div className="lg:col-span-6 space-y-4">
            {product.isPlaceholderImage ? (
              <ProductPlaceholderImage
                productName={product.name}
                category={product.category}
                className="rounded-xl shadow-soft"
              />
            ) : (
              <>
                <div
                  className="relative aspect-[4/5] w-full bg-[#EADFCB] rounded-xl overflow-hidden shadow-soft select-none group"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                >
                  {galleryImages.map((imgSrc, idx) => (
                    <div
                      key={idx}
                      className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                        idx === activeImageIndex ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                      }`}
                    >
                      {(idx === 0 || isHovered || idx === activeImageIndex) && (
                        <Image
                          src={imgSrc}
                          alt={`${product.name} - View ${idx + 1}`}
                          fill
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          className="object-contain p-3"
                          priority={idx === 0}
                          loading={idx === 0 ? 'eager' : 'lazy'}
                        />
                      )}
                    </div>
                  ))}

                  {/* Prev / Next Arrows */}
                  <button
                    onClick={prevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-[#26060d]/60 backdrop-blur-sm text-[#F6EFE2] hover:bg-[#26060d] flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 shadow-md"
                    aria-label="Previous Image"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <button
                    onClick={nextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-[#26060d]/60 backdrop-blur-sm text-[#F6EFE2] hover:bg-[#26060d] flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 shadow-md"
                    aria-label="Next Image"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>

                  {/* Wishlist Button */}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className={`absolute top-4 right-4 z-20 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isLiked
                        ? 'bg-[#30070D] text-[#E7CF98] shadow-md'
                        : 'bg-[#F6EFE2]/80 backdrop-blur-sm text-[#1a1411] hover:bg-[#30070D] hover:text-[#E7CF98]'
                    }`}
                    aria-label="Save to Wishlist"
                  >
                    <Heart className={`w-5 h-5 ${isLiked ? 'fill-[#E7CF98]' : 'stroke-[1.5]'}`} />
                  </button>
                </div>

                {/* Three Thumbnails Row */}
                <div className="grid grid-cols-3 gap-3">
                  {galleryImages.map((imgSrc, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative aspect-[4/5] w-full bg-[#EADFCB] rounded-lg overflow-hidden transition-all duration-300 ${
                        idx === activeImageIndex
                          ? 'border-2 border-[#C69A45] ring-2 ring-[#C69A45]/30 shadow-md scale-[1.02]'
                          : 'border border-[#C9A55C]/30 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <Image
                        src={imgSrc}
                        alt={`${product.name} Thumbnail ${idx + 1}`}
                        fill
                        sizes="(max-width: 768px) 30vw, 120px"
                        loading="lazy"
                        className="object-contain p-1.5"
                      />
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* RIGHT: Product Details & Purchase Actions */}
          <div className="lg:col-span-6 space-y-8 bg-[#FBF6EA] border border-[#C9A55C]/30 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-soft">
            <div className="space-y-2 border-b border-[#C9A55C]/20 pb-6">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-widest text-[#8a6a22]">
                  {product.type || product.category}
                </span>
                <span className="text-xs font-mono text-[#6b5f55]">SKU: {activeVariant.sku}</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl text-[#1a1411] font-normal leading-tight">
                {product.name}
              </h1>

              {/* Thin Accent Line */}
              {product.accent && (
                <div
                  className="h-[2px] w-12 my-2.5"
                  style={{ backgroundColor: product.accent }}
                />
              )}

              {/* Tagline */}
              {product.tagline && (
                <p className="font-serif italic text-lg sm:text-xl text-[#5c5045] pt-1">
                  &ldquo;{product.tagline}&rdquo;
                </p>
              )}

              {/* Price */}
              <div className="flex items-baseline gap-3 pt-3">
                <p className="font-mono text-3xl text-[#1a1411] font-semibold">
                  ₹{currentPrice.toLocaleString('en-IN')}
                </p>
                <span className="text-xs font-mono text-[#8a6a22] uppercase tracking-widest">
                  (MRP INCL. GST)
                </span>
              </div>

              {/* Numbered Batch Scarcity Display */}
              <div className="pt-2">
                {currentStock > 10 && (
                  <span className="font-mono text-xs tracking-wider text-[#8a6a22] block bg-[#EADFCB]/50 px-3 py-1.5 rounded border border-[#C9A55C]/30">
                    Batch {String(batchNo).padStart(2, '0')}: {currentStock} of {batchSize} bottles remaining
                  </span>
                )}
                {currentStock > 0 && currentStock <= 10 && (
                  <span className="font-mono text-xs tracking-wider text-[#30070D] font-semibold block bg-[#30070D]/10 px-3 py-1.5 rounded border border-[#30070D]/30">
                    Batch {String(batchNo).padStart(2, '0')}: only {currentStock} bottles remaining
                  </span>
                )}
                {currentStock === 0 && (
                  <span className="font-mono text-xs tracking-wider text-[#30070D] font-semibold block bg-[#30070D]/10 px-3 py-1.5 rounded border border-[#30070D]/30">
                    Batch {String(batchNo).padStart(2, '0')} is sold out
                  </span>
                )}
              </div>
            </div>

            <p className="text-[#5c5045] text-sm sm:text-base font-light leading-relaxed">
              {product.description || product.shortDescription}
            </p>

            {/* Bundle Set Specifications */}
            {product.bundleInfo && (
              <div className="bg-[#F6EFE2] border border-[#C9A55C]/30 rounded-xl p-4 space-y-3 shadow-sm">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#8a6a22] font-semibold uppercase tracking-wider">SET SPECIFICATIONS</span>
                  <span className="bg-[#30070D] text-[#F5EFE3] px-2.5 py-0.5 rounded text-[11px] font-bold">
                    {product.bundleInfo.displayConfig}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono pt-1 text-[#32151A]">
                  <div className="bg-[#FBF6EA] p-2 rounded border border-[#C9A55C]/20">
                    <span className="text-[9px] text-[#6b5f55] block uppercase">BOTTLES</span>
                    <span className="font-semibold">{product.bundleInfo.bottleCount} Bottles</span>
                  </div>
                  <div className="bg-[#FBF6EA] p-2 rounded border border-[#C9A55C]/20">
                    <span className="text-[9px] text-[#6b5f55] block uppercase">SIZE EACH</span>
                    <span className="font-semibold">{product.bundleInfo.bottleSize}</span>
                  </div>
                  <div className="bg-[#FBF6EA] p-2 rounded border border-[#C9A55C]/20">
                    <span className="text-[9px] text-[#6b5f55] block uppercase">TOTAL VOLUME</span>
                    <span className="font-semibold">{product.bundleInfo.totalVolume}</span>
                  </div>
                </div>
                {product.bundleInfo.includedProducts && product.bundleInfo.includedProducts.length > 0 && (
                  <div className="pt-1 text-xs text-[#5c5045]">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#8a6a22] block font-semibold">INCLUDED CREATIONS:</span>
                    <p className="font-serif italic text-sm text-[#1a1411]">{product.bundleInfo.includedProducts.join(' • ')}</p>
                  </div>
                )}
              </div>
            )}

            {/* Size Selector */}
            {product.sizeOptions && product.sizeOptions.length > 0 && (
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="uppercase tracking-widest text-[#1a1411] font-semibold">
                    SELECT VOLUME
                  </span>
                  <span className="text-[#6b5f55]">3 ml  6 ml  12 ml  30 ml</span>
                </div>

                <div className="grid grid-cols-4 gap-2 sm:gap-3">
                  {product.sizeOptions.map((size) => {
                    const variant = product.variants?.find((v) => v.size === size);
                    const sizePrice = variant ? variant.price : currentPrice;
                    return (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`py-3 px-2 rounded-lg font-mono text-xs tracking-wider transition-all duration-300 text-center flex flex-col items-center justify-center gap-0.5 ${
                          selectedSize === size
                            ? 'bg-[#30070D] text-[#F5EFE3] border border-[#30070D] shadow-md ring-2 ring-[#C9A55C]/40'
                            : 'bg-[#F6EFE2] text-[#1a1411] border border-[#dccfb6] hover:border-[#30070D]'
                        }`}
                      >
                        <span className="font-medium">{size}</span>
                        <span className="text-[10px] opacity-80">₹{sizePrice}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quantity Selector & Add to Bag / Waitlist / Coming Soon */}
            {product.status === 'coming_soon' || currentPrice === 0 ? (
              <div className="pt-2 space-y-3">
                <PearlButton
                  disabled
                  fullWidth
                  variant="outline"
                  size="lg"
                  leftIcon={<Sparkles className="w-4 h-4 text-[#C69A45]" />}
                >
                  COMING SOON
                </PearlButton>
                <PearlButton
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  fullWidth
                  variant="burgundy"
                  size="md"
                  rightIcon={<ArrowRight className="w-3.5 h-3.5 text-[#C69A45]" />}
                >
                  Notify Me On Launch
                </PearlButton>
              </div>
            ) : currentStock > 0 ? (
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                <div className="flex items-center border border-[#C69A45]/40 bg-[#F6EFE2] rounded-full h-[52px] px-3 shadow-inner">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-full text-base text-[#1a1411] hover:text-[#30070D] font-mono"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-mono text-xs font-semibold">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-full text-base text-[#1a1411] hover:text-[#30070D] font-mono"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                <PearlButton
                  onClick={() => addToCart(product, selectedSize, quantity)}
                  variant="burgundy"
                  size="lg"
                  fullWidth
                  className="sm:flex-1"
                  leftIcon={<Sparkles className="w-4 h-4 text-[#C69A45]" />}
                >
                  ADD TO BAG
                </PearlButton>
              </div>
            ) : (
              <div className="pt-2">
                <PearlButton
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="champagne"
                  size="lg"
                  fullWidth
                  rightIcon={<ArrowRight className="w-4 h-4 text-[#9D6A26]" />}
                >
                  Join the waitlist for Batch 02
                </PearlButton>
              </div>
            )}

            {/* Shipping & Authenticity Badges */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-[#C9A55C]/20 text-xs text-[#5c5045]">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#C9A55C] flex-shrink-0" />
                <span>Free Express Shipping in India</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#C9A55C] flex-shrink-0" />
                <span>100% Pure Alcohol-Free Attar</span>
              </div>
            </div>
          </div>
        </div>

        {/* Fragrance Story & Olfactive Notes Section */}
        <section className="bg-[#FBF6EA] border border-[#C9A55C]/30 rounded-2xl p-8 sm:p-12 space-y-10">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="text-[11px] font-mono tracking-[0.3em] text-[#8a6a22] uppercase block">
              OLFACTIVE PROFILE
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1a1411] font-normal">
              The Fragrance
            </h2>
            <div className="h-[1.5px] w-12 bg-[#C9A55C] mx-auto my-2" />
          </div>

          {/* Notes Pyramid Cards */}
          {product.notes && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#F6EFE2] border border-[#C9A55C]/20 rounded-xl p-6 text-center space-y-2 shadow-soft">
                <span className="text-[10px] font-mono tracking-widest text-[#8a6a22] uppercase block">
                  TOP NOTES
                </span>
                <p className="font-serif text-lg text-[#1a1411]">
                  {product.notes.top.join(' • ')}
                </p>
              </div>

              <div className="bg-[#F6EFE2] border border-[#C9A55C]/20 rounded-xl p-6 text-center space-y-2 shadow-soft">
                <span className="text-[10px] font-mono tracking-widest text-[#8a6a22] uppercase block">
                  HEART NOTES
                </span>
                <p className="font-serif text-lg text-[#1a1411]">
                  {product.notes.heart.join(' • ')}
                </p>
              </div>

              <div className="bg-[#F6EFE2] border border-[#C9A55C]/20 rounded-xl p-6 text-center space-y-2 shadow-soft">
                <span className="text-[10px] font-mono tracking-widest text-[#8a6a22] uppercase block">
                  BASE NOTES
                </span>
                <p className="font-serif text-lg text-[#1a1411]">
                  {product.notes.base.join(' • ')}
                </p>
              </div>
            </div>
          )}

          {/* Specifications Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-[#C9A55C]/20 text-center font-mono text-xs text-[#5c5045]">
            <div className="p-3 bg-[#F6EFE2] rounded-lg">
              <span className="text-[9px] uppercase tracking-widest text-[#8a6a22] block mb-1">
                CONCENTRATION
              </span>
              <span>{product.concentration || '100% Pure Attar Oil'}</span>
            </div>
            <div className="p-3 bg-[#F6EFE2] rounded-lg">
              <span className="text-[9px] uppercase tracking-widest text-[#8a6a22] block mb-1">
                LONGEVITY
              </span>
              <span>{product.longevity || '8-12 Hours'}</span>
            </div>
            <div className="p-3 bg-[#F6EFE2] rounded-lg">
              <span className="text-[9px] uppercase tracking-widest text-[#8a6a22] block mb-1">
                SILLAGE
              </span>
              <span>{product.sillage || 'Intimate to Moderate'}</span>
            </div>
            <div className="p-3 bg-[#F6EFE2] rounded-lg">
              <span className="text-[9px] uppercase tracking-widest text-[#8a6a22] block mb-1">
                APPLICATION
              </span>
              <span>{product.application || 'Glass Wand Applicator'}</span>
            </div>
          </div>
        </section>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <section className="space-y-8 pt-6 border-t border-[#C9A55C]/20">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-3xl text-[#1a1411] font-normal">
                You May Also Discover
              </h2>
              <Link href="/shop" className="text-xs font-mono uppercase tracking-widest text-[#30070D] hover:text-[#C9A55C]">
                View All Creations →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
