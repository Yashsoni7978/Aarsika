'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { PRODUCTS } from '@/data/products';
import { useShop } from '@/context/ShopContext';
import { ProductCard } from '@/components/ProductCard';
import { Photo } from '@/components/Photo';

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

  const [selectedSize, setSelectedSize] = useState(
    product?.defaultSize || product?.sizeOptions?.[0] || '12 ml'
  );
  const [quantity, setQuantity] = useState(1);

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

  return (
    <div className="bg-[#F6EFE2] text-[#1a1411] pt-28 pb-24 font-sans">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-16">
        {/* Breadcrumb */}
        <div className="text-xs font-mono tracking-widest text-[#6b5f55] uppercase space-x-2">
          <Link href="/" className="hover:text-[#1a1411]">
            HOME
          </Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-[#1a1411]">
            COLLECTION
          </Link>
          <span>/</span>
          <span className="text-[#1a1411] font-medium">{product.name}</span>
        </div>

        {/* 2-Column Product Detail Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* LEFT: Photo Gallery */}
          <div className="lg:col-span-6">
            <div className="relative bg-[#EADFCB]">
              <Photo
                slot={product.slug}
                alt={product.name}
                aspect="4/5"
                shape="rect"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <button
                onClick={() => toggleWishlist(product.id)}
                className="absolute top-4 right-4 z-10 p-2 text-[#1a1411] hover:text-[#8b1a2b] transition-colors focus:outline-none"
                aria-label="Save to Wishlist"
              >
                <Heart
                  className={`w-5 h-5 ${
                    isLiked ? 'fill-[#8b1a2b] text-[#8b1a2b]' : ''
                  }`}
                />
              </button>
            </div>
          </div>

          {/* RIGHT: Product Details & Purchase Actions */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-2 border-b border-[#dccfb6] pb-6">
              <span className="font-mono text-xs uppercase tracking-widest text-[#8a6a22]">
                {product.type || product.category}
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl text-[#1a1411] font-light">
                {product.name}
              </h1>

              {/* Accent Line under product name */}
              {product.accent && (
                <div
                  className="h-[2px] w-12 my-2"
                  style={{ backgroundColor: product.accent }}
                />
              )}

              {/* Tagline */}
              {product.tagline && (
                <p className="font-serif italic text-lg sm:text-xl text-[#4a3f35] pt-1">
                  &ldquo;{product.tagline}&rdquo;
                </p>
              )}

              <p className="font-mono text-2xl text-[#1a1411] font-medium pt-2">
                ₹{currentPrice.toLocaleString('en-IN')}
              </p>

              {/* Numbered Batch Scarcity Display */}
              <div className="pt-1">
                {currentStock > 10 && (
                  <span className="font-mono text-xs tracking-wider text-[#8a6a22] block">
                    Batch {String(batchNo).padStart(2, '0')}: {currentStock} of {batchSize} bottles remaining
                  </span>
                )}
                {currentStock > 0 && currentStock <= 10 && (
                  <span className="font-mono text-xs tracking-wider text-[#8b1a2b] font-medium block">
                    Batch {String(batchNo).padStart(2, '0')}: only {currentStock} bottles remaining
                  </span>
                )}
                {currentStock === 0 && (
                  <span className="font-mono text-xs tracking-wider text-[#8b1a2b] font-medium block">
                    Batch {String(batchNo).padStart(2, '0')} is sold out
                  </span>
                )}
              </div>
            </div>

            <p className="text-[#6b5f55] text-base font-light leading-relaxed">
              {product.description || product.shortDescription}
            </p>

            {/* Size Selector */}
            {product.sizeOptions && product.sizeOptions.length > 0 && (
              <div className="space-y-3">
                <span className="font-mono text-xs uppercase tracking-widest text-[#1a1411] block">
                  VOLUME
                </span>
                <div className="flex flex-wrap gap-6 border-b border-[#dccfb6] pb-3">
                  {product.sizeOptions.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`font-mono text-xs uppercase tracking-wider pb-1 border-b-2 transition-all ${
                        selectedSize === size
                          ? 'border-[#C9A55C] text-[#1a1411] font-medium'
                          : 'border-transparent text-[#6b5f55] hover:text-[#1a1411]'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector & Purchase Button or Waitlist Link */}
            {currentStock > 0 ? (
              <div className="flex items-center gap-6 pt-2">
                <div className="flex items-center border-b border-[#dccfb6] h-12">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-sm text-[#1a1411] hover:text-[#8b1a2b]"
                  >
                    -
                  </button>
                  <span className="px-3 font-mono text-xs font-medium">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-sm text-[#1a1411] hover:text-[#8b1a2b]"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => addToCart(product, selectedSize, quantity)}
                  className="flex-1 h-12 bg-[#C9A55C] text-[#26060d] hover:bg-[#E7CF98] text-xs font-mono uppercase tracking-[0.25em] font-semibold transition-colors rounded-none flex items-center justify-center"
                >
                  Add to bag
                </button>
              </div>
            ) : (
              <div className="pt-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-link-underline text-xs font-mono tracking-[0.2em] uppercase text-[#C9A55C] hover:text-[#1a1411] inline-flex items-center gap-1.5"
                >
                  Join the waitlist for Batch 02 →
                </a>
              </div>
            )}

            {/* Information Blocks */}
            <div className="border-t border-[#dccfb6] divide-y divide-[#dccfb6] pt-4 space-y-6">
              {/* "The fragrance" Section */}
              {product.notes && (
                <div className="pt-4 space-y-2">
                  <h3 className="font-serif text-xl text-[#1a1411]">
                    The fragrance
                  </h3>
                  <p className="text-xs text-[#6b5f55] font-light leading-relaxed">
                    Top: {product.notes.top.join(', ')} • Heart:{' '}
                    {product.notes.heart.join(', ')} • Base: {product.notes.base.join(', ')}
                  </p>
                </div>
              )}

              {/* Ingredients Block */}
              {product.ingredients && product.ingredients.length > 0 && (
                <div className="pt-4 space-y-2">
                  <h3 className="font-serif text-xl text-[#1a1411]">
                    Ingredients & Concentration
                  </h3>
                  <p className="text-xs text-[#6b5f55] font-light leading-relaxed">
                    {product.concentration || '100% Pure Attar Oil'}. {product.ingredients.join(', ')}.
                  </p>
                </div>
              )}

              {/* Application Block */}
              {product.howToWear && (
                <div className="pt-4 space-y-2">
                  <h3 className="font-serif text-xl text-[#1a1411]">
                    Application & Sillage
                  </h3>
                  <p className="text-xs text-[#6b5f55] font-light leading-relaxed">
                    {product.howToWear} {product.longevity ? `(${product.longevity})` : ''}
                  </p>
                </div>
              )}

              {/* Shipping & Guarantee Block */}
              <div className="pt-4 space-y-2">
                <h3 className="font-serif text-xl text-[#1a1411]">
                  Shipping & Guarantee
                </h3>
                <p className="text-xs text-[#6b5f55] font-light leading-relaxed">
                  Free shipping across India on all orders. No returns on opened or used products. If a bottle arrives broken or damaged, we will replace it. Report within 48 hours with an unboxing video.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Grid */}
        {relatedProducts.length > 0 && (
          <div className="pt-20 border-t border-[#dccfb6] space-y-10">
            <h2 className="font-serif text-3xl text-[#1a1411]">
              You may also discover
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
