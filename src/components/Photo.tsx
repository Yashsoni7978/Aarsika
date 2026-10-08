"use client";

import React, { useState } from "react";
import Image from "next/image";

interface PhotoProps {
  slot: string;
  alt: string;
  aspect?: "16/9" | "3/4" | "4/3" | "4/5" | "3/5" | "1/1" | string;
  shape?: "arch" | "rect" | "full";
  priority?: boolean;
  sizes?: string;
  className?: string;
  fill?: boolean;
}

export const Photo: React.FC<PhotoProps> = ({
  slot,
  alt,
  aspect = "3/4",
  shape = "rect",
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
  className = "",
  fill = true,
}) => {
  const [imageError, setImageError] = useState(false);

  // Map aspect ratio string to CSS aspect-ratio class or inline style
  const getAspectClass = () => {
    switch (aspect) {
      case "16/9":
        return "aspect-[16/9]";
      case "3/4":
        return "aspect-[3/4]";
      case "4/3":
        return "aspect-[4/3]";
      case "4/5":
        return "aspect-[4/5]";
      case "3/5":
        return "aspect-[3/5]";
      case "1/1":
        return "aspect-square";
      default:
        return "";
    }
  };

  const getShapeClass = () => {
    switch (shape) {
      case "arch":
        return "rounded-t-[90px] md:rounded-t-[120px] rounded-b-none overflow-hidden";
      case "rect":
        return "rounded-none overflow-hidden";
      case "full":
        return "rounded-none w-full h-full overflow-hidden";
      default:
        return "overflow-hidden";
    }
  };

  const imageSrc = `/photos/${slot}.jpg`;

  return (
    <div
      className={`relative w-full ${getAspectClass()} ${getShapeClass()} ${className}`}
      style={!getAspectClass() && aspect ? { aspectRatio: aspect } : undefined}
    >
      {!imageError ? (
        <Image
          src={imageSrc}
          alt={alt || `Aarsika ${slot}`}
          fill={fill}
          priority={priority}
          sizes={sizes}
          className="object-cover transition-transform duration-700 hover:scale-[1.03]"
          onError={() => setImageError(true)}
        />
      ) : (
        /* Tasteful Luxury Placeholder Block */
        <div className="absolute inset-0 bg-gradient-to-br from-[#3b0a12] via-[#26060d] to-[#170307] border border-[#C9A55C]/25 flex flex-col items-center justify-center p-6 text-center select-none group">
          {/* Background Subtle Grid pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(#C9A55C_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />

          {/* Faint Aarsika Emblem */}
          <svg
            width="32"
            height="40"
            viewBox="0 0 22 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-[#C9A55C]/40 mb-3 transition-transform duration-500 group-hover:scale-110"
          >
            <path
              d="M11 1V24M11 1L9 6M11 1L13 6"
              stroke="currentColor"
              strokeWidth="1"
            />
            <polygon points="11,0 12.5,3 11,6 9.5,3" fill="currentColor" />
            <path
              d="M11 14C6 14 3 10 3 5C7 5 11 9 11 14Z"
              fill="currentColor"
              fillOpacity="0.5"
            />
            <path
              d="M11 14C16 14 19 10 19 5C15 5 11 9 11 14Z"
              fill="currentColor"
              fillOpacity="0.5"
            />
          </svg>

          <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#E7CF98]/70 block mb-1">
            PHOTO SLOT
          </span>
          <span className="font-serif text-sm tracking-widest text-[#F6EFE2] uppercase font-medium">
            {slot}
          </span>
          <span className="text-[10px] font-sans text-[#E7CF98]/40 mt-2 font-light tracking-wide">
            {aspect} • {shape}
          </span>
        </div>
      )}
    </div>
  );
};
