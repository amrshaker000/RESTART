import React from 'react';
import clsx from 'clsx';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, id, ...props }, ref) => {
    const inputId = id || props.name;

    return (
      <div className="w-full flex flex-col gap-1.5 text-left">
        {label && (
          <label htmlFor={inputId} className="text-xs md:text-sm font-extrabold uppercase tracking-wider text-[#0B1F44] flex items-center justify-between">
            <span>{label}</span>
            {props.required && <span className="text-[#FF9F43]">*</span>}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={clsx(
            'w-full bg-[#FFFFFF] text-[#0B1F44] px-4 py-3 border-2 md:border-3 border-[#0B1F44] shadow-brutal-sm font-medium transition-all outline-none focus:border-[#7CCBFF] focus:shadow-brutal placeholder:text-[#0B1F44]/40 text-sm md:text-base',
            error && 'border-[#FF5F56] focus:border-[#FF5F56]',
            className
          )}
          {...props}
        />
        {error && <span className="text-xs font-bold text-[#FF5F56]">{error}</span>}
        {helperText && !error && <span className="text-xs text-[#0B1F44]/70">{helperText}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';
