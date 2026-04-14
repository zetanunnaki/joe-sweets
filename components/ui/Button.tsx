'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  fullWidth?: boolean;
}

const variantStyles: Record<Variant, string> = {
  primary:   'text-white border-transparent',
  secondary: 'text-white border-transparent',
  outline:   'border-2 bg-transparent',
  ghost:     'border-transparent bg-transparent',
};

const sizeStyles: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-base',
  lg: 'px-7 py-3.5 text-lg',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', loading, fullWidth, className = '', children, disabled, style, ...props }, ref) => {
    const baseStyle: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      fontWeight: 600,
      borderRadius: '8px',
      border: '2px solid transparent',
      cursor: disabled || loading ? 'not-allowed' : 'pointer',
      opacity: disabled || loading ? 0.6 : 1,
      transition: 'all 200ms ease',
      width: fullWidth ? '100%' : undefined,
      fontFamily: 'var(--font-body)',
      ...(variant === 'primary' && {
        backgroundColor: 'var(--color-primary)',
        color: 'var(--color-white)',
      }),
      ...(variant === 'secondary' && {
        backgroundColor: 'var(--color-secondary)',
        color: 'var(--color-white)',
      }),
      ...(variant === 'outline' && {
        backgroundColor: 'transparent',
        color: 'var(--color-primary)',
        borderColor: 'var(--color-primary)',
      }),
      ...(variant === 'ghost' && {
        backgroundColor: 'transparent',
        color: 'var(--color-primary)',
      }),
      ...style,
    };

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        style={baseStyle}
        className={`${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        {...props}
      >
        {loading && (
          <svg
            style={{ width: '1em', height: '1em', animation: 'spin 1s linear infinite' }}
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="32" strokeDashoffset="8" />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
