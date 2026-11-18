import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { LegalTab } from './LegalPortal';

interface FooterProps {
  onNavigateSection: (sectionId: string) => void;
  onOpenLegalTab: (tab: LegalTab) => void;
  onOpenCookiePreferences: () => void;
  onOpenConcierge: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateSection,
  onOpenLegalTab,
  onOpenCookiePreferences,
  onOpenConcierge,
}) => {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#0B0D12] text-[#A1A7B5] border-t border-[#D4AF37]/18 pt-14 pb-12 px-4 sm:px-8">
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#D4AF37]/15">
          {/* Col 1: Sovereign Brand Identity */}
          <div className="lg:col-span-4 space-y-4">
            <div className="inline-flex items-center gap-3">
              <svg
                width="30"
                height="30"
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <rect
                  x="1"
                  y="1"
                  width="34"
                  height="34"
                  rx="6"
                  fill="#141821"
                  stroke="#D4AF37"
                  strokeWidth="1.25"
                />
                <path
                  d="M9 18L18 9L27 18L18 27L9 18Z"
                  stroke="#D4AF37"
                  strokeWidth="1.5"
                />
                <circle cx="18" cy="18" r="3.5" fill="#D4AF37" />
              </svg>
              <span className="font-display font-bold text-lg text-[#F4F4F6]">
                Ouest Dynamics
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#A1A7B5] leading-relaxed">
              {t.footer.tagline}
            </p>

            <div className="text-xs font-mono-code text-[#D4AF37]">
              Abidjan, Côte d’Ivoire · UEMOA · International
            </div>
          </div>

          {/* Col 2: Platform Navigation */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-mono-code text-xs font-semibold text-[#F4F4F6]">
              {t.footer.navigationTitle}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateSection('poles')}
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer"
                >
                  {t.nav.poles}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateSection('governance')}
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer"
                >
                  {t.nav.methodology}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateSection('portfolio')}
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer"
                >
                  {t.nav.portfolio}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateSection('configurator')}
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer"
                >
                  {t.nav.configurator}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenConcierge}
                  className="text-[#D4AF37] hover:text-[#E3C358] transition-colors cursor-pointer"
                >
                  {t.nav.concierge}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Unified Legal Portal Links (Zero Modal Duplication) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-mono-code text-xs font-semibold text-[#F4F4F6]">
              {t.footer.legalTitle}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegalTab('privacy')}
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer text-left"
                >
                  {t.legal.tabs.privacy}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegalTab('terms')}
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer text-left"
                >
                  {t.legal.tabs.terms}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegalTab('notices')}
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer text-left"
                >
                  {t.legal.tabs.notices}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenCookiePreferences}
                  className="hover:text-[#D4AF37] underline underline-offset-4 transition-colors cursor-pointer text-left"
                >
                  {t.footer.manageCookies}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contractual Governance Commitments */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-mono-code text-xs font-semibold text-[#F4F4F6]">
              {t.footer.governanceTitle}
            </h4>
            <ul className="space-y-2 text-xs text-[#A1A7B5]">
              {t.footer.governanceBullets.map((b, idx) => (
                <li key={idx}>· {b}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & Technical Links */}
        <div className="pt-6 flex flex-wrap items-center justify-between gap-4 text-xs text-[#A1A7B5]">
          <span>{t.footer.copyright}</span>
          <div className="flex items-center gap-4 font-mono-code">
            <a
              href="/sitemap.xml"
              className="hover:text-[#D4AF37] transition-colors"
            >
              sitemap.xml
            </a>
            <span aria-hidden="true">·</span>
            <a
              href="/robots.txt"
              className="hover:text-[#D4AF37] transition-colors"
            >
              robots.txt
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
