import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ArrowUpRight, MessageSquare, Globe } from 'lucide-react';

interface MobileBottomBarProps {
  onOpenProjectModal: () => void;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({ onOpenProjectModal }) => {
  const { language, setLanguage, t } = useLanguage();

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 sm:hidden pb-safe px-3 py-2 bg-[#0B0B0B]/92 backdrop-blur-2xl border-t border-white/[0.08] shadow-[0_-10px_30px_rgba(0,0,0,0.85)]">
      <div className="flex items-center justify-between gap-2 max-w-md mx-auto">
        {/* Quick Language Toggle */}
        <button
          type="button"
          onClick={() => setLanguage(language === 'en' ? 'fr' : 'en')}
          className="min-h-[44px] min-w-[44px] rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono text-[#D4AF37] flex items-center justify-center gap-1 shrink-0 active:scale-95 transition-transform font-bold"
          title="Changer de langue / Switch language"
        >
          <Globe className="w-3.5 h-3.5" />
          <span>{language.toUpperCase()}</span>
        </button>

        {/* Quick jump to contact */}
        <button
          onClick={scrollToContact}
          className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full bg-white/[0.04] border border-white/[0.08] text-white hover:text-[#D4AF37] active:scale-95 transition-all shrink-0"
          aria-label="Contacter"
        >
          <MessageSquare className="w-4 h-4" />
        </button>

        {/* Main thumb CTA */}
        <button
          onClick={onOpenProjectModal}
          className="flex-1 min-h-[46px] inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#0B0B0B] bg-[#D4AF37] hover:bg-[#E2C255] active:scale-[0.98] rounded-full transition-all shadow-[0_2px_15px_rgba(212,175,55,0.35)] cursor-pointer"
        >
          <span>{t.mobileBar.callToAction}</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
