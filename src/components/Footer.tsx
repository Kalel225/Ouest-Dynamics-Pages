import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { LegalTab } from './LegalPortal';

interface FooterProps {
  onOpenLegalTab: (tab: LegalTab) => void;
  onOpenCookiePreferences: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenLegalTab,
  onOpenCookiePreferences,
}) => {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#EFECE6] text-[#141311]/60 py-10 px-5 sm:px-8 border-t border-[#141311]/10">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
        <span className="font-medium text-[#141311]">{t.footer.place}</span>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => onOpenLegalTab('privacy')}
            className="px-2.5 py-1 hover:bg-[#E4DFD5] hover:text-[#141311] transition-colors cursor-pointer"
          >
            {t.legal.tabs.privacy}
          </button>
          <button
            type="button"
            onClick={() => onOpenLegalTab('terms')}
            className="px-2.5 py-1 hover:bg-[#E4DFD5] hover:text-[#141311] transition-colors cursor-pointer"
          >
            {t.legal.tabs.terms}
          </button>
          <button
            type="button"
            onClick={() => onOpenLegalTab('notices')}
            className="px-2.5 py-1 hover:bg-[#E4DFD5] hover:text-[#141311] transition-colors cursor-pointer"
          >
            {t.legal.tabs.notices}
          </button>
          <button
            type="button"
            onClick={onOpenCookiePreferences}
            className="px-2.5 py-1 hover:bg-[#E4DFD5] hover:text-[#141311] transition-colors cursor-pointer"
          >
            {t.footer.cookies}
          </button>
        </div>

        <a href={`mailto:${t.footer.email}`} className="hover:text-[#141311] transition-colors">
          {t.footer.email}
        </a>
      </div>
    </footer>
  );
};
