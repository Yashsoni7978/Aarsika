"use client";

import React from "react";
import Image from "next/image";

interface ArchFrameProps {
  src: string;
  alt: string;
  variant?: "arch" | "editorial" | "product";
  aspectRatio?: "16:9" | "4:3" | "3:4" | "1:1" | "4:5" | "3:5";
  className?: string;
  priority?: boolean;
  annotation?: string;
  children?: React.ReactNode;
}

export const ArchFrame: React.FC<ArchFrameProps> = ({
  src,
  alt,
  variant = "arch",
  aspectRatio = "3:4",
  className = "",
  priority = false,
  annotation,
  children,
}) => {
  const ratioClasses = {
    "16:9": "aspect-[16/9]",
    "4:3": "aspect-[4/3]",
    "3:4": "aspect-[3/4]",
    "1:1": "aspect-square",
    "4:5": "aspect-[4/5]",
    "3:5": "aspect-[3/5]",
  }[aspectRatio];

  if (variant === "arch") {
    return (
      <div className={`relative ${ratioClasses} ${className} group`}>
        <div className="relative w-full h-full p-1.5 rounded-t-[120px] rounded-b-none border border-[#C9A55C]/40 bg-[#F6EFE2] shadow-soft transition-all duration-500 group-hover:border-[#C9A55C]">
          <div className="relative w-full h-full rounded-t-[112px] rounded-b-none overflow-hidden bg-[#FBF6EA]">
            <Image
              src={src}
              alt={alt}
              fill
              priority={priority}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 border border-[#C9A55C]/20 pointer-events-none rounded-t-[112px]" />
          </div>
        </div>

        {annotation && (
          <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[9px] font-semibold tracking-[0.25em] text-[#8a6a22] uppercase bg-[#F6EFE2]/90 px-3 py-1 border border-[#C9A55C]/30 backdrop-blur-sm z-10 pointer-events-none">
            {annotation}
          </span>
        )}
        {children}
      </div>
    );
  }

  return (
    <div
      className={`relative ${ratioClasses} bg-[#FBF6EA] ${className} overflow-hidden transition-all duration-300 group`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="(max-width: 768px) 50vw, 33vw"
        className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
      />
      {children}
    </div>
  );
};
