import React from 'react';
import clsx from 'clsx';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { label: string; value: string }[];
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, options, id, ...props }, ref) => {
    const selectId = id || props.name;

    return (
      <div className="w-full flex flex-col gap-1.5 text-left">
        {label && (
          <label htmlFor={selectId} className="text-xs md:text-sm font-extrabold uppercase tracking-wider text-[#0B1F44] flex items-center justify-between">
            <span>{label}</span>
            {props.required && <span className="text-[#FF9F43]">*</span>}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          className={clsx(
            'w-full bg-[#FFFFFF] text-[#0B1F44] px-4 py-3 border-2 md:border-3 border-[#0B1F44] shadow-brutal-sm font-bold transition-all outline-none focus:border-[#7CCBFF] focus:shadow-brutal text-sm md:text-base cursor-pointer',
            error && 'border-[#FF5F56]',
            className
          )}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && <span className="text-xs font-bold text-[#FF5F56]">{error}</span>}
      </div>
    );
  }
);

Select.displayName = 'Select';
