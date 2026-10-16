'use client';

import React, { useState } from 'react';
import { Photo } from '@/components/Photo';
import manifestDataRaw from '@/data/photoManifest.json';

export interface ResponsivePhotoProps {
  slot: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
  aspect?: string; // e.g. '4/5', '16/9', '3/4', '3/2', '1/1'
  shape?: 'arch' | 'rect' | 'full';
  objectFit?: 'cover' | 'contain';
  objectPosition?: string;
  width?: number;
  height?: number;
}

interface ManifestVariant {
  width: number;
  height: number;
  path: string;
  sizeKB: number;
}

interface ManifestSlot {
  slot: string;
  available: boolean;
  family?: string;
  aspectRatio?: string;
  variants?: {
    avif: ManifestVariant[];
    webp: ManifestVariant[];
  };
  fallback?: string | null;
}

interface PhotoManifest {
  totalExpectedSlots: number;
  slots: Record<string, ManifestSlot>;
}

const manifest = manifestDataRaw as unknown as PhotoManifest;

/**
 * Resolves requested slot to candidate mobile, tablet, and desktop manifest entries
 */
function resolveSlots(slot: string): {
  mobileSlot: ManifestSlot | null;
  tabletSlot: ManifestSlot | null;
  desktopSlot: ManifestSlot | null;
  singleSlot: ManifestSlot | null;
} {
  const slots = manifest.slots || {};

  // Alias mappings
  let cleanSlot = slot;
  if (slot === 'collection-attar') cleanSlot = 'attar-collection';
  if (slot === 'collection-eau-de-parfum') cleanSlot = 'perfume-collection';

  // Direct exact match if no mobile/desktop counterparts
  const mobileKey = cleanSlot.endsWith('-mobile') ? cleanSlot : `${cleanSlot}-mobile`;
  const tabletKey = cleanSlot.endsWith('-tablet') ? cleanSlot : `${cleanSlot}-tablet`;
  const desktopKey = cleanSlot.endsWith('-desktop') ? cleanSlot : `${cleanSlot}-desktop`;

  const mobileSlot = slots[mobileKey]?.available ? slots[mobileKey] : null;
  const tabletSlot = slots[tabletKey]?.available ? slots[tabletKey] : null;
  const desktopSlot = slots[desktopKey]?.available ? slots[desktopKey] : null;

  if (mobileSlot || tabletSlot || desktopSlot) {
    return { mobileSlot, tabletSlot, desktopSlot, singleSlot: null };
  }

  if (slots[cleanSlot]?.available) {
    return { mobileSlot: null, tabletSlot: null, desktopSlot: null, singleSlot: slots[cleanSlot] };
  }

  // Check product card alias (e.g. 'sehar-e-gulab' -> 'sehar-e-gulab-card')
  const cardKey = cleanSlot.endsWith('-card') ? cleanSlot : `${cleanSlot}-card`;
  const cardSlot = slots[cardKey]?.available ? slots[cardKey] : null;

  return { mobileSlot: null, tabletSlot: null, desktopSlot: null, singleSlot: cardSlot };
}

export default function ResponsivePhoto({
  slot,
  alt,
  priority = false,
  sizes,
  className = '',
  aspect,
  shape = 'rect',
  objectFit = 'cover',
  objectPosition,
  width,
  height,
}: ResponsivePhotoProps) {
  const [hasError, setHasError] = useState(false);

  // If already errored, immediately render Photo fallback
  if (hasError) {
    return (
      <Photo
        slot={slot}
        alt={alt}
        aspect={aspect || '3/4'}
        shape={shape}
        className={className}
      />
    );
  }

  const { mobileSlot, tabletSlot, desktopSlot, singleSlot } = resolveSlots(slot);

  // If no available assets in manifest, fallback to Photo flat placeholder
  if (!mobileSlot && !tabletSlot && !desktopSlot && !singleSlot) {
    return (
      <Photo
        slot={slot}
        alt={alt}
        aspect={aspect || '3/4'}
        shape={shape}
        className={className}
      />
    );
  }

  // Determine fallback image source and dimension metadata
  const primarySlot = desktopSlot || tabletSlot || singleSlot || mobileSlot;
  const fallbackSrc =
    primarySlot?.fallback ||
    primarySlot?.variants?.webp?.[primarySlot.variants.webp.length - 1]?.path ||
    primarySlot?.variants?.avif?.[primarySlot.variants.avif.length - 1]?.path ||
    '';

  if (!fallbackSrc) {
    return (
      <Photo
        slot={slot}
        alt={alt}
        aspect={aspect || '3/4'}
        shape={shape}
        className={className}
      />
    );
  }

  const fallbackVariant =
    primarySlot?.variants?.webp?.[primarySlot.variants.webp.length - 1] ||
    primarySlot?.variants?.avif?.[primarySlot.variants.avif.length - 1];

  const reservedWidth = width || fallbackVariant?.width || 1200;
  const reservedHeight = height || fallbackVariant?.height || 900;

  // Build srcSet strings
  const buildSrcSet = (variants?: ManifestVariant[]) => {
    if (!variants || variants.length === 0) return '';
    return variants.map((v) => `${v.path} ${v.width}w`).join(', ');
  };

  const mobileAvif = buildSrcSet(mobileSlot?.variants?.avif);
  const mobileWebp = buildSrcSet(mobileSlot?.variants?.webp);

  const tabletAvif = buildSrcSet(tabletSlot?.variants?.avif);
  const tabletWebp = buildSrcSet(tabletSlot?.variants?.webp);

  const desktopAvif = buildSrcSet(desktopSlot?.variants?.avif);
  const desktopWebp = buildSrcSet(desktopSlot?.variants?.webp);

  const singleAvif = buildSrcSet(singleSlot?.variants?.avif);
  const singleWebp = buildSrcSet(singleSlot?.variants?.webp);

  // Shape class
  const shapeClass =
    shape === 'arch'
      ? 'rounded-t-[90px] md:rounded-t-[120px] rounded-b-none overflow-hidden'
      : shape === 'full'
      ? 'rounded-full overflow-hidden'
      : 'overflow-hidden';

  // Aspect Ratio Styling for Zero Layout Shift
  const containerStyle: React.CSSProperties = {};
  if (aspect) {
    containerStyle.aspectRatio = aspect;
  }

  const imageStyle: React.CSSProperties = {
    objectFit,
    objectPosition: objectPosition || undefined,
  };

  return (
    <div
      className={`relative w-full ${shapeClass} ${className}`}
      style={containerStyle}
    >
      <picture className="w-full h-full block">
        {/* CASE 1: Art-directed Mobile + Tablet + Desktop artwork */}
        {(mobileSlot || tabletSlot || desktopSlot) && (
          <>
            {/* Mobile Viewport (< 768px): AVIF first, then WebP */}
            {mobileAvif && (
              <source
                media="(max-width: 767px)"
                type="image/avif"
                srcSet={mobileAvif}
                sizes={sizes || '(max-width: 767px) 100vw, 50vw'}
              />
            )}
            {mobileWebp && (
              <source
                media="(max-width: 767px)"
                type="image/webp"
                srcSet={mobileWebp}
                sizes={sizes || '(max-width: 767px) 100vw, 50vw'}
              />
            )}

            {/* Tablet Viewport (768px - 1023px): if tabletSlot exists */}
            {tabletAvif && (
              <source
                media="(min-width: 768px) and (max-width: 1023px)"
                type="image/avif"
                srcSet={tabletAvif}
                sizes={sizes || '(max-width: 1023px) 60vw, 50vw'}
              />
            )}
            {tabletWebp && (
              <source
                media="(min-width: 768px) and (max-width: 1023px)"
                type="image/webp"
                srcSet={tabletWebp}
                sizes={sizes || '(max-width: 1023px) 60vw, 50vw'}
              />
            )}

            {/* Desktop Viewport (>= 1024px if tabletSlot exists, else >= 768px) */}
            {desktopAvif && (
              <source
                media={tabletSlot ? '(min-width: 1024px)' : '(min-width: 768px)'}
                type="image/avif"
                srcSet={desktopAvif}
                sizes={sizes || '100vw'}
              />
            )}
            {desktopWebp && (
              <source
                media={tabletSlot ? '(min-width: 1024px)' : '(min-width: 768px)'}
                type="image/webp"
                srcSet={desktopWebp}
                sizes={sizes || '100vw'}
              />
            )}
          </>
        )}

        {/* CASE 2: Desktop artwork only (mobile falls back to desktop) */}
        {!mobileSlot && desktopSlot && (
          <>
            {desktopAvif && (
              <source
                type="image/avif"
                srcSet={desktopAvif}
                sizes={sizes || '100vw'}
              />
            )}
            {desktopWebp && (
              <source
                type="image/webp"
                srcSet={desktopWebp}
                sizes={sizes || '100vw'}
              />
            )}
          </>
        )}

        {/* CASE 3: Mobile artwork only */}
        {mobileSlot && !desktopSlot && (
          <>
            {mobileAvif && (
              <source
                type="image/avif"
                srcSet={mobileAvif}
                sizes={sizes || '100vw'}
              />
            )}
            {mobileWebp && (
              <source
                type="image/webp"
                srcSet={mobileWebp}
                sizes={sizes || '100vw'}
              />
            )}
          </>
        )}

        {/* CASE 4: Single responsive slot (e.g. Product cards, house, og) */}
        {singleSlot && (
          <>
            {singleAvif && (
              <source
                type="image/avif"
                srcSet={singleAvif}
                sizes={sizes || '(max-width: 640px) 70vw, (max-width: 1024px) 33vw, 25vw'}
              />
            )}
            {singleWebp && (
              <source
                type="image/webp"
                srcSet={singleWebp}
                sizes={sizes || '(max-width: 640px) 70vw, (max-width: 1024px) 33vw, 25vw'}
              />
            )}
          </>
        )}

        {/* Standard Fallback img element */}
        <img
          src={fallbackSrc}
          alt={alt || `Aarsika ${slot}`}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : 'auto'}
          width={reservedWidth}
          height={reservedHeight}
          className={`w-full h-full block ${
            objectFit === 'contain' ? 'object-contain' : 'object-cover'
          }`}
          style={imageStyle}
          onError={() => setHasError(true)}
        />
      </picture>
    </div>
  );
}

export { ResponsivePhoto };
