import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const LanguagePromptBanner: React.FC = () => {
  const { showLangPrompt, acceptLangPrompt, dismissLangPrompt, t } =
    useLanguage();
  const [readyToShow, setReadyToShow] = useState(false);

  // Respect >10s dwell + user interaction before showing any non-blocking prompt
  useEffect(() => {
    if (!showLangPrompt) return;

    let scrolled = false;
    const handleScroll = () => {
      if (window.scrollY > 120) {
        scrolled = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    const timer = setTimeout(() => {
      if (scrolled) {
        setReadyToShow(true);
      } else {
        const waitScroll = () => {
          if (window.scrollY > 80) {
            setReadyToShow(true);
            window.removeEventListener('scroll', waitScroll);
          }
        };
        window.addEventListener('scroll', waitScroll, { passive: true });
      }
    }, 10500);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [showLangPrompt]);

  if (!showLangPrompt || !readyToShow) return null;

  return (
    <div className="fixed top-20 right-4 sm:right-8 z-40 max-w-sm sm:max-w-md bg-white border border-[#E2DDD5] rounded-xl shadow-lg p-4 text-[#161412]">
      <div className="flex items-start justify-between gap-3 mb-3">
        <p className="text-xs leading-relaxed text-[#161412]">{t.langPrompt.detected}</p>
        <button
          type="button"
          onClick={dismissLangPrompt}
          className="text-[#5C554E] hover:text-[#161412] p-1 cursor-pointer"
          aria-label="Dismiss"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      <div className="flex items-center gap-2.5">
        <button
          type="button"
          onClick={acceptLangPrompt}
          className="px-3.5 py-1.5 rounded-lg bg-[#A64B2A] text-[#F7F4EE] text-xs font-semibold cursor-pointer whitespace-nowrap shrink-0"
        >
          {t.langPrompt.switchText}
        </button>
        <button
          type="button"
          onClick={dismissLangPrompt}
          className="px-3 py-1.5 rounded-lg border border-[#E2DDD5] text-xs font-medium text-[#5C554E] hover:text-[#161412] cursor-pointer whitespace-nowrap shrink-0"
        >
          {t.langPrompt.keepText}
        </button>
      </div>
    </div>
  );
};
