import React from 'react';
import clsx from 'clsx';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'sky' | 'lavender' | 'orange' | 'navy' | 'white';
}

export function Badge({ className, variant = 'sky', children, ...props }: BadgeProps) {
  const variants = {
    sky: 'bg-[#7CCBFF] text-[#0B1F44] border-2 border-[#0B1F44]',
    lavender: 'bg-[#B794F4] text-[#0B1F44] border-2 border-[#0B1F44]',
    orange: 'bg-[#FF9F43] text-[#0B1F44] border-2 border-[#0B1F44]',
    navy: 'bg-[#0B1F44] text-[#FFFFFF] border-2 border-[#0B1F44]',
    white: 'bg-[#FFFFFF] text-[#0B1F44] border-2 border-[#0B1F44]',
  };

  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 px-3 py-1 text-xs font-black uppercase tracking-wider shadow-brutal-sm',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
