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
  dark?: boolean;
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
  dark = false,
}) => {
  const [imageError, setImageError] = useState(false);

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
      case "full":
      default:
        return "rounded-none overflow-hidden";
    }
  };

  const imageSrc = `/photos/${slot}.jpg`;
  const isDarkSlot = dark || slot === "hero" || slot.includes("ingredient") || slot.includes("strip");

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
          className="object-cover transition-transform duration-700 hover:scale-[1.02]"
          onError={() => setImageError(true)}
        />
      ) : (
        /* Quiet Flat Blank Space Placeholder */
        <div
          className={`absolute inset-0 select-none flex items-end p-4 ${
            isDarkSlot
              ? "bg-[#3b0a12] text-[#E7CF98]"
              : "bg-[#EADFCB] text-[#1a1411]"
          }`}
        >
          <span className="font-mono text-[10px] tracking-widest opacity-40 uppercase">
            {slot}
          </span>
        </div>
      )}
    </div>
  );
};
