'use client';

import React from 'react';
import clsx from 'clsx';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'orange' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', fullWidth = false, children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-bold uppercase tracking-wider transition-all border-2 border-[#0B1F44] btn-press select-none cursor-pointer';

    const variants = {
      primary: 'bg-[#7CCBFF] text-[#0B1F44] shadow-brutal hover:bg-[#60BEFF]',
      secondary: 'bg-[#FFFFFF] text-[#0B1F44] shadow-brutal hover:bg-[#F0F8FF]',
      accent: 'bg-[#B794F4] text-[#0B1F44] shadow-brutal hover:bg-[#A57BF0]',
      orange: 'bg-[#FF9F43] text-[#0B1F44] shadow-brutal hover:bg-[#FF8F26]',
      danger: 'bg-[#FF6B6B] text-[#FFFFFF] shadow-brutal hover:bg-[#FA5252]',
      ghost: 'bg-transparent text-[#0B1F44] border-transparent hover:bg-black/5 hover:border-[#0B1F44]',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-xs',
      md: 'px-5 py-2.5 text-sm',
      lg: 'px-7 py-3.5 text-base',
    };

    return (
      <button
        ref={ref}
        className={clsx(
          baseStyles,
          variants[variant],
          sizes[size],
          fullWidth && 'w-full',
          props.disabled && 'opacity-60 cursor-not-allowed pointer-events-none',
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
