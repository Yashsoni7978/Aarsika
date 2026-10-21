'use client';

import React from 'react';
import Link from 'next/link';

export type PearlButtonVariant = 'burgundy' | 'champagne' | 'outline' | 'primary' | 'secondary';
export type PearlButtonSize = 'sm' | 'md' | 'lg';

export interface PearlButtonProps {
  variant?: PearlButtonVariant;
  size?: PearlButtonSize;
  href?: string;
  target?: string;
  rel?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  fullWidth?: boolean;
  ariaLabel?: string;
}

export const PearlButton: React.FC<PearlButtonProps> = ({
  variant = 'burgundy',
  size = 'md',
  href,
  target,
  rel,
  type = 'button',
  disabled = false,
  loading = false,
  leftIcon,
  rightIcon,
  children,
  className = '',
  onClick,
  fullWidth = false,
  ariaLabel,
}) => {
  const resolvedVariant = variant === 'primary' ? 'burgundy' : variant === 'secondary' ? 'champagne' : variant;
  const variantClass = `pearl-button--${resolvedVariant}`;
  const sizeClass = `pearl-button--${size}`;
  const widthClass = fullWidth ? 'w-full' : '';
  const combinedClassName = `pearl-button ${variantClass} ${sizeClass} ${widthClass} ${className}`.trim();

  const content = (
    <>
      {loading ? (
        <span
          className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin shrink-0"
          aria-hidden="true"
        />
      ) : (
        leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>
      )}
      <span className="truncate">{children}</span>
      {!loading && rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
    </>
  );

  if (href && !disabled && !loading) {
    return (
      <Link
        href={href}
        target={target}
        rel={rel}
        className={combinedClassName}
        onClick={onClick}
        aria-label={ariaLabel}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-disabled={disabled || loading}
      className={combinedClassName}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {content}
    </button>
  );
};

export default PearlButton;
