import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ArrowUpRight, MessageSquare } from 'lucide-react';

interface MobileBottomBarProps {
  onOpenProjectModal: () => void;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({
  onOpenProjectModal,
}) => {
  const { language, setLanguage, t } = useLanguage();

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 sm:hidden px-3 py-2 bg-[#F7F4EE]/95 backdrop-blur-md border-t border-[#E2DDD5]">
      <div className="flex items-center justify-between gap-2 max-w-md mx-auto">
        {/* Language Toggle */}
        <button
          type="button"
          onClick={() => setLanguage(language === 'en' ? 'fr' : 'en')}
          className="min-h-[42px] px-3 rounded-lg bg-white border border-[#E2DDD5] text-xs font-mono-tabular font-semibold text-[#161412] flex items-center justify-center shrink-0 cursor-pointer"
          title="Switch language"
        >
          {language.toUpperCase()}
        </button>

        {/* Quick Jump to Contact */}
        <button
          type="button"
          onClick={scrollToContact}
          className="min-h-[42px] min-w-[42px] flex items-center justify-center rounded-lg bg-white border border-[#E2DDD5] text-[#161412] shrink-0 cursor-pointer"
          aria-label={t.mobileBar.messageAction}
        >
          <MessageSquare className="w-4 h-4 text-[#A64B2A]" />
        </button>

        {/* Primary Mobile CTA */}
        <button
          type="button"
          onClick={onOpenProjectModal}
          className="flex-1 min-h-[42px] inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-[#F7F4EE] bg-[#A64B2A] rounded-lg cursor-pointer whitespace-nowrap"
        >
          <span>{t.mobileBar.callToAction}</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
