import React from 'react';

interface BrandLogoProps {
  idPrefix?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'dark' | 'light';
}

export const BRAND_LETTERS = [
  { id: 'ouest-0', char: 'O', group: 'ouest' },
  { id: 'ouest-1', char: 'u', group: 'ouest' },
  { id: 'ouest-2', char: 'e', group: 'ouest' },
  { id: 'ouest-3', char: 's', group: 'ouest' },
  { id: 'ouest-4', char: 't', group: 'ouest' },
  { id: 'dynamics-0', char: 'D', group: 'dynamics' },
  { id: 'dynamics-1', char: 'y', group: 'dynamics' },
  { id: 'dynamics-2', char: 'n', group: 'dynamics' },
  { id: 'dynamics-3', char: 'a', group: 'dynamics' },
  { id: 'dynamics-4', char: 'm', group: 'dynamics' },
  { id: 'dynamics-5', char: 'i', group: 'dynamics' },
  { id: 'dynamics-6', char: 'c', group: 'dynamics' },
  { id: 'dynamics-7', char: 's', group: 'dynamics' },
  { id: 'dot', char: '.', group: 'dot' },
] as const;

export const BrandLogo: React.FC<BrandLogoProps> = ({
  idPrefix = 'nav',
  size = 'md',
  variant = 'dark',
}) => {
  const sizeClasses = {
    sm: 'text-base',
    md: 'text-lg sm:text-xl',
    lg: 'text-xl sm:text-2xl',
  }[size];

  const textColor = variant === 'light' ? 'text-[#F7F4EE]' : 'text-[#161412]';
  const accentColor = 'text-[#A64B2A]';

  return (
    <span
      className={`font-serif-display font-semibold tracking-tight whitespace-nowrap shrink-0 inline-flex items-baseline ${sizeClasses} ${textColor}`}
    >
      <span className="inline-flex">
        {BRAND_LETTERS.slice(0, 5).map((item) => (
          <span key={item.id} id={`${idPrefix}-${item.id}`} className="inline-block">
            {item.char}
          </span>
        ))}
      </span>
      <span className="inline-block w-[0.28em]" aria-hidden="true">
        &nbsp;
      </span>
      <span className="italic font-normal inline-flex">
        {BRAND_LETTERS.slice(5, 13).map((item) => (
          <span key={item.id} id={`${idPrefix}-${item.id}`} className="inline-block">
            {item.char}
          </span>
        ))}
      </span>
      <span
        id={`${idPrefix}-dot`}
        className={`inline-block font-bold ${accentColor}`}
      >
        .
      </span>
    </span>
  );
};
