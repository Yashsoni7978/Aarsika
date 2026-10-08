import React from "react";
import Link from "next/link";

interface LogoProps {
  variant?: "light" | "dark";
  className?: string;
  showWordmark?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  variant = "light",
  className = "",
  showWordmark = true,
}) => {
  const isLight = variant === "light";

  // Color mappings
  const emblemColor = isLight ? "#C9A55C" : "#3b0a12";
  const wordmarkColor = isLight ? "#C9A55C" : "#26060d";

  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2.5 group focus:outline-none focus:ring-1 focus:ring-[#C9A55C] ${className}`}
      aria-label="Aarsika Fine Fragrance Homepage"
    >
      {/* Slender Spire flanked by two curved leaves Emblem SVG */}
      <svg
        width="22"
        height="28"
        viewBox="0 0 22 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform duration-300 group-hover:scale-105 shrink-0"
      >
        {/* Central Slender Spire */}
        <path
          d="M11 1V24M11 1L9 6M11 1L13 6"
          stroke={emblemColor}
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Diamond Apex */}
        <polygon points="11,0 12.5,3 11,6 9.5,3" fill={emblemColor} />
        {/* Left Curved Leaf */}
        <path
          d="M11 14C6 14 3 10 3 5C7 5 11 9 11 14Z"
          fill={emblemColor}
          fillOpacity={isLight ? "0.85" : "0.75"}
        />
        {/* Right Curved Leaf */}
        <path
          d="M11 14C16 14 19 10 19 5C15 5 11 9 11 14Z"
          fill={emblemColor}
          fillOpacity={isLight ? "0.85" : "0.75"}
        />
        {/* Base Diamond Accent */}
        <polygon points="11,24 13,26.5 11,28 9,26.5" fill={emblemColor} />
      </svg>

      {showWordmark && (
        <span
          className="font-serif font-medium uppercase tracking-[0.3em] text-lg md:text-xl transition-opacity duration-300 group-hover:opacity-90 leading-none"
          style={{ color: wordmarkColor }}
        >
          AARSIKA
        </span>
      )}
    </Link>
  );
};
