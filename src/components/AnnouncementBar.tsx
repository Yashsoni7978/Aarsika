'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { PRODUCTS } from '@/data/products';
import { HOME } from '@/content/home.en';

export default function AnnouncementBar() {
  const [activeIdx, setActiveIdx] = useState(0);

  // Get discovery set price from data
  const discoveryProduct = PRODUCTS.find(
    (p) => p.slug === 'discovery-set-attar' || p.category === 'DISCOVERY SETS'
  );
  const discoveryPrice = discoveryProduct?.price ?? HOME.announcement.discoveryFallbackPrice;

  const messages = [
    { text: HOME.announcement.shipping, href: '' },
    {
      text: `${HOME.announcement.discovery} ₹${discoveryPrice.toLocaleString('en-IN')}`,
      href: '/discovery-sets',
      hasArrow: true,
    },
  ];

  // Phone: crossfade between messages every 5s
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % messages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <div className="w-full h-9 bg-[#C9A55C] text-[#1a1411] overflow-hidden relative z-50">
      {/* Desktop: both messages visible with divider */}
      <div className="hidden md:flex items-center justify-center h-full gap-6">
        {messages.map((msg, i) => (
          <React.Fragment key={i}>
            {i > 0 && (
              <span className="w-px h-3 bg-[#1a1411]/30" aria-hidden="true" />
            )}
            {msg.href ? (
              <Link
                href={msg.href}
                className="text-xs uppercase tracking-[0.16em] font-medium font-sans hover:underline"
              >
                {msg.text} {msg.hasArrow && '→'}
              </Link>
            ) : (
              <span className="text-xs uppercase tracking-[0.16em] font-medium font-sans">
                {msg.text}
              </span>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Phone: one message at a time with crossfade */}
      <div className="flex md:hidden items-center justify-center h-full relative">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
              i === activeIdx ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            {msg.href ? (
              <Link
                href={msg.href}
                className="text-xs uppercase tracking-[0.16em] font-medium font-sans hover:underline"
              >
                {msg.text} {msg.hasArrow && '→'}
              </Link>
            ) : (
              <span className="text-xs uppercase tracking-[0.16em] font-medium font-sans">
                {msg.text}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
