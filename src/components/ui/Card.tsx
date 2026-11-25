import React from 'react';
import clsx from 'clsx';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'white' | 'light-blue' | 'navy' | 'lavender';
  hasShadow?: boolean;
  shadowSize?: 'sm' | 'md' | 'lg';
}

export function Card({
  className,
  variant = 'white',
  hasShadow = true,
  shadowSize = 'md',
  children,
  ...props
}: CardProps) {
  const variants = {
    white: 'bg-[#FFFFFF] text-[#0B1F44] border-2 md:border-3 border-[#0B1F44]',
    'light-blue': 'bg-[#E2F0FF] text-[#0B1F44] border-2 md:border-3 border-[#0B1F44]',
    navy: 'bg-[#0B1F44] text-[#FFFFFF] border-2 md:border-3 border-[#7CCBFF]',
    lavender: 'bg-[#B794F4] text-[#0B1F44] border-2 md:border-3 border-[#0B1F44]',
  };

  const shadows = {
    sm: 'shadow-brutal-sm',
    md: 'shadow-brutal',
    lg: 'shadow-brutal-lg',
  };

  return (
    <div
      className={clsx(
        variants[variant],
        hasShadow && shadows[shadowSize],
        'p-5 md:p-6 transition-all relative',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
