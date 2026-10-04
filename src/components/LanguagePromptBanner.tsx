import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Globe, X } from 'lucide-react';

export const LanguagePromptBanner: React.FC = () => {
  const { showLangPrompt, acceptLangPrompt, dismissLangPrompt, t } = useLanguage();

  if (!showLangPrompt) return null;

  return (
    <div className="fixed bottom-20 sm:bottom-6 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="rounded-2xl bg-[#141414]/90 backdrop-blur-2xl border border-white/[0.12] p-4 sm:p-5 shadow-[0_20px_50px_rgba(0,0,0,0.8),_inset_0_1px_1px_rgba(255,255,255,0.15)] flex flex-col gap-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-mono text-[#D4AF37] uppercase tracking-wider">
            <Globe className="w-4 h-4 shrink-0" />
            <span>Traduction Automatique</span>
          </div>
          <button
            onClick={dismissLangPrompt}
            className="text-[#F4F4F6]/50 hover:text-white transition-colors cursor-pointer p-1"
            aria-label="Fermer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs sm:text-sm text-white/90 leading-snug font-body">
          {t.langPrompt.detected}
        </p>

        <div className="flex items-center gap-2.5 pt-1">
          <button
            onClick={acceptLangPrompt}
            className="flex-1 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#0B0B0B] bg-[#D4AF37] hover:bg-[#E2C255] rounded-full transition-all cursor-pointer shadow-[0_2px_12px_rgba(212,175,55,0.3)] text-center"
          >
            {t.langPrompt.switchText}
          </button>
          <button
            onClick={dismissLangPrompt}
            className="px-4 py-2 text-xs font-medium text-[#F4F4F6]/70 hover:text-white rounded-full bg-white/[0.04] hover:bg-white/[0.08] transition-colors cursor-pointer border border-white/[0.08]"
          >
            {t.langPrompt.keepText}
          </button>
        </div>
      </div>
    </div>
  );
};
