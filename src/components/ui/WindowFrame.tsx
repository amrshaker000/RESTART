import React from 'react';
import clsx from 'clsx';

export interface WindowFrameProps {
  title?: string;
  className?: string;
  children: React.ReactNode;
  headerRight?: React.ReactNode;
}

/**
 * WindowFrame replicates the exact browser/window aesthetic from the RESTART Post Template:
 * Dark navy border, 3 colored circle buttons (red, yellow, green), window title bar, and grid interior.
 */
export function WindowFrame({ title = 'RESTART // NO GAME OVER', className, children, headerRight }: WindowFrameProps) {
  return (
    <div className={clsx('border-3 border-[#0B1F44] bg-[#FFFFFF] shadow-brutal-lg overflow-hidden', className)}>
      {/* Window Header Bar */}
      <div className="bg-[#0B1F44] px-4 py-2.5 flex items-center justify-between border-b-2 border-[#0B1F44] select-none">
        <div className="flex items-center gap-2">
          {/* Traffic light dots inspired by Mac/Template */}
          <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]" />
          <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
          <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]" />
          <span className="ml-3 text-xs md:text-sm font-bold text-[#E2F0FF] uppercase tracking-wider font-mono">
            {title}
          </span>
        </div>
        {headerRight && <div>{headerRight}</div>}
      </div>

      {/* Window Body */}
      <div className="p-4 md:p-6 bg-grid-pattern relative">
        {children}
      </div>
    </div>
  );
}
