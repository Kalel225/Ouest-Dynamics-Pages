import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showGoldAccent?: boolean;
  className?: string;
  isAnimated?: boolean;
  idPrefix?: string;
  hiddenElements?: Set<string>;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showGoldAccent = true,
  className = '',
  idPrefix,
  hiddenElements
}) => {
  // Size presets
  const sizeConfig = {
    sm: {
      ouest: 'text-base font-extrabold tracking-[0.02em]',
      dynamics: 'text-[9px] font-normal tracking-[0.24em]',
      square: 'w-1.5 h-1.5 ml-1 mb-[1px]',
      gap: '-space-y-0.5'
    },
    md: {
      ouest: 'text-xl sm:text-2xl font-extrabold tracking-[0.03em]',
      dynamics: 'text-[11px] sm:text-xs font-normal tracking-[0.26em]',
      square: 'w-2 h-2 ml-1.5 mb-[1.5px]',
      gap: '-space-y-1'
    },
    lg: {
      ouest: 'text-3xl sm:text-4xl font-extrabold tracking-[0.04em]',
      dynamics: 'text-sm sm:text-base font-normal tracking-[0.28em]',
      square: 'w-2.5 h-2.5 ml-2 mb-[2px]',
      gap: '-space-y-1'
    },
    xl: {
      ouest: 'text-5xl sm:text-7xl md:text-8xl font-black tracking-[0.03em]',
      dynamics: 'text-xl sm:text-2xl md:text-3xl font-normal tracking-[0.26em] sm:tracking-[0.28em]',
      square: 'w-3.5 sm:w-4 md:w-5 h-3.5 sm:h-4 md:h-5 ml-2.5 sm:ml-3 md:ml-4 mb-[2px] sm:mb-[3px]',
      gap: '-space-y-1 sm:-space-y-2'
    }
  };

  const current = sizeConfig[size];
  const ouestLetters = ['O', 'U', 'E', 'S', 'T'];
  const dynamicsLetters = ['D', 'Y', 'N', 'A', 'M', 'I', 'C', 'S'];

  return (
    <div
      id={idPrefix ? `${idPrefix}-logo-container` : undefined}
      className={`flex flex-col select-none ${current.gap} ${className}`}
    >
      {/* OUEST (Pure White, Bold Geometric Sans) */}
      <div className={`font-display text-white leading-none ${current.ouest} flex items-baseline`}>
        {ouestLetters.map((char, index) => {
          const key = `ouest-${index}`;
          const isHidden = hiddenElements?.has(key);
          return (
            <span
              key={index}
              id={idPrefix ? `${idPrefix}-${key}` : undefined}
              className={`inline-block transition-opacity duration-150 ${isHidden ? 'opacity-0' : 'opacity-100'}`}
            >
              {char}
            </span>
          );
        })}
      </div>

      {/* DYNAMICS . ■ (Silver/Grey with wider letter spacing & Champagne Gold Square) */}
      <div className="flex items-baseline leading-none">
        <div className={`font-display text-[#A0A0A0] uppercase ${current.dynamics} flex items-baseline`}>
          {dynamicsLetters.map((char, index) => {
            const key = `dynamics-${index}`;
            const isHidden = hiddenElements?.has(key);
            return (
              <span
                key={index}
                id={idPrefix ? `${idPrefix}-${key}` : undefined}
                className={`inline-block transition-opacity duration-150 ${isHidden ? 'opacity-0' : 'opacity-100'}`}
              >
                {char}
              </span>
            );
          })}
        </div>

        {/* Period */}
        <span
          id={idPrefix ? `${idPrefix}-dot` : undefined}
          className={`text-[#A0A0A0] font-display text-[0.9em] font-light inline-block transition-opacity duration-150 ${
            hiddenElements?.has('dot') ? 'opacity-0' : 'opacity-100'
          }`}
        >
          .
        </span>

        {/* Champagne Gold Square */}
        {showGoldAccent && (
          <span
            id={idPrefix ? `${idPrefix}-square` : undefined}
            className={`inline-block bg-[#D4AF37] shadow-[0_0_12px_rgba(212,175,55,0.7)] ${current.square} self-baseline transition-opacity duration-150 ${
              hiddenElements?.has('square') ? 'opacity-0' : 'opacity-100'
            }`}
            style={{ aspectRatio: '1/1' }}
          />
        )}
      </div>
    </div>
  );
};

