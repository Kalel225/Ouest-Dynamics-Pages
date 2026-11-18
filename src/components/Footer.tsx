import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { LegalTab } from './LegalPortal';

interface FooterProps {
  onNavigateSection: (sectionId: string) => void;
  onOpenLegalTab: (tab: LegalTab) => void;
  onOpenCookiePreferences: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateSection,
  onOpenLegalTab,
  onOpenCookiePreferences,
}) => {
  const { t } = useLanguage();

  return (
    <footer className="bg-white text-[#50645D] pt-16 pb-12 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#DCE4E0]">
          <div className="md:col-span-5 space-y-4">
            <h3 className="title text-2xl sm:text-3xl text-[#0B241D]">{t.footer.pitch}</h3>
            <button
              type="button"
              onClick={() => onNavigateSection('estimate')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#F77F00] hover:bg-[#E07100] text-[#0B241D] text-xs font-semibold press cursor-pointer"
            >
              <span>{t.footer.pitchCta}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <p className="text-xs text-[#50645D] pt-1">
              {t.footer.write}{' '}
              <a
                href={`mailto:${t.footer.email}`}
                className="text-[#0B241D] font-medium hover:underline"
              >
                {t.footer.email}
              </a>
            </p>
          </div>

          <div className="md:col-span-2 space-y-3 text-xs sm:text-sm">
            <div className="font-semibold text-[#0B241D]">{t.footer.explore}</div>
            <ul className="space-y-2">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateSection('services')}
                  className="hover:text-[#0B241D] cursor-pointer"
                >
                  {t.nav.services}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateSection('work')}
                  className="hover:text-[#0B241D] cursor-pointer"
                >
                  {t.nav.work}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateSection('process')}
                  className="hover:text-[#0B241D] cursor-pointer"
                >
                  {t.nav.process}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateSection('estimate')}
                  className="hover:text-[#0B241D] cursor-pointer"
                >
                  {t.nav.estimate}
                </button>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-3 text-xs sm:text-sm">
            <div className="font-semibold text-[#0B241D]">{t.footer.legal}</div>
            <ul className="space-y-2">
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegalTab('privacy')}
                  className="hover:text-[#0B241D] cursor-pointer text-left"
                >
                  {t.legal.tabs.privacy}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegalTab('terms')}
                  className="hover:text-[#0B241D] cursor-pointer text-left"
                >
                  {t.legal.tabs.terms}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegalTab('notices')}
                  className="hover:text-[#0B241D] cursor-pointer text-left"
                >
                  {t.legal.tabs.notices}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenCookiePreferences}
                  className="hover:text-[#0B241D] cursor-pointer text-left"
                >
                  {t.footer.cookies}
                </button>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-2 text-xs sm:text-sm">
            <div className="font-semibold text-[#0B241D]">{t.footer.studio}</div>
            <p>{t.footer.place}</p>
            <p>{t.footer.country}</p>
          </div>
        </div>

        <div className="pt-6 flex flex-wrap items-center justify-between gap-4 text-xs text-[#50645D]">
          <span>{t.footer.rights}</span>
          <div className="flex items-center gap-4">
            <a href="/sitemap.xml" className="hover:text-[#0B241D]">
              sitemap.xml
            </a>
            <a href="/robots.txt" className="hover:text-[#0B241D]">
              robots.txt
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
