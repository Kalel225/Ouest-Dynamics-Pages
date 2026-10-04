import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ArrowUpRight, MessageSquare } from 'lucide-react';

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
    <div className="fixed bottom-0 left-0 right-0 z-40 sm:hidden pb-safe px-4 py-3 bg-[#0B0B0B]/85 backdrop-blur-2xl border-t border-white/[0.08] shadow-[0_-10px_30px_rgba(0,0,0,0.8)]">
      <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
        {/* Language switch quick pill */}
        <div className="flex items-center rounded-full bg-white/[0.06] border border-white/[0.1] p-1 text-[11px] font-mono shrink-0">
          <button
            onClick={() => setLanguage('en')}
            className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
              language === 'en'
                ? 'bg-[#D4AF37] text-[#0B0B0B] font-bold'
                : 'text-[#F4F4F6]/60 hover:text-white'
            }`}
          >
            EN
          </button>
          <button
            onClick={() => setLanguage('fr')}
            className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
              language === 'fr'
                ? 'bg-[#D4AF37] text-[#0B0B0B] font-bold'
                : 'text-[#F4F4F6]/60 hover:text-white'
            }`}
          >
            FR
          </button>
        </div>

        {/* Quick jump to contact */}
        <button
          onClick={scrollToContact}
          className="p-2.5 rounded-full bg-white/[0.06] border border-white/[0.1] text-white hover:text-[#D4AF37] transition-colors shrink-0"
          aria-label="Contact"
        >
          <MessageSquare className="w-4 h-4" />
        </button>

        {/* Main thumb CTA */}
        <button
          onClick={onOpenProjectModal}
          className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#0B0B0B] bg-[#D4AF37] hover:bg-[#E2C255] rounded-full transition-all shadow-[0_2px_15px_rgba(212,175,55,0.35)] cursor-pointer"
        >
          <span>{t.mobileBar.callToAction}</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
