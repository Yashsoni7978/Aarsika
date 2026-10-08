import React from "react";

interface WaveDividerProps {
  flip?: boolean;
  className?: string;
  fillColor?: string;
}

export const WaveDivider: React.FC<WaveDividerProps> = ({
  flip = false,
  className = "",
  fillColor = "#F6EFE2",
}) => {
  return (
    <div
      className={`relative w-full overflow-hidden leading-none z-10 ${
        flip ? "rotate-180" : ""
      } ${className}`}
    >
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="relative block w-full h-8 sm:h-12 md:h-16"
      >
        {/* Soft Wave Path with Gold Accent Border */}
        <path
          d="M0,0 C150,90 350,-40 500,45 C650,130 900,10 1200,50 L1200,120 L0,120 Z"
          fill={fillColor}
        />
        <path
          d="M0,0 C150,90 350,-40 500,45 C650,130 900,10 1200,50"
          stroke="#C9A55C"
          strokeWidth="1.5"
          fill="none"
          strokeOpacity="0.4"
        />
      </svg>
    </div>
  );
};
