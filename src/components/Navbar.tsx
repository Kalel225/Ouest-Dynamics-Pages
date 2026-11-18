import React, { useState } from 'react';
import { Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';
import { useLanguage, Language } from '../context/LanguageContext';
import { useCurrency } from '../context/CurrencyContext';
import { CurrencyCode } from '../utils/pricingEngine';

interface NavbarProps {
  onNavigateSection: (sectionId: string) => void;
  onOpenConcierge: () => void;
  isLegalView: boolean;
  onExitLegalView: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onNavigateSection,
  onOpenConcierge,
  isLegalView,
  onExitLegalView,
}) => {
  const { language, setLanguage, t } = useLanguage();
  const { currency, setCurrency } = useCurrency();
  const [mobileOpen, setMobileOpen] = useState(false);

  const currencies: CurrencyCode[] = ['XOF', 'EUR', 'USD'];
  const languages: { code: Language; label: string }[] = [
    { code: 'fr', label: 'FR' },
    { code: 'en', label: 'EN' },
  ];

  const handleNav = (id: string) => {
    setMobileOpen(false);
    if (isLegalView) {
      onExitLegalView();
      setTimeout(() => {
        onNavigateSection(id);
      }, 60);
    } else {
      onNavigateSection(id);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0B0D12]/92 backdrop-blur-md border-b border-[#D4AF37]/18">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 h-20 flex items-center justify-between gap-6">
        {/* Zone 1: Sovereign Geometric SVG Logo + Single-Line Wordmark */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            if (isLegalView) {
              onExitLegalView();
            } else {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          className="inline-flex items-center gap-3 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#D4AF37] group"
        >
          <svg
            width="34"
            height="34"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className="shrink-0"
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
          <span className="font-display font-bold text-lg sm:text-xl tracking-tight text-[#F4F4F6] group-hover:text-[#D4AF37] transition-colors duration-180">
            Ouest Dynamics
          </span>
        </a>

        {/* Zone 2: Clean Single-Line Text Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#A1A7B5]">
          <button
            type="button"
            onClick={() => handleNav('poles')}
            className="hover:text-[#F4F4F6] transition-colors duration-180 whitespace-nowrap shrink-0 cursor-pointer py-1 border-b border-transparent hover:border-[#D4AF37]"
          >
            {t.nav.poles}
          </button>
          <button
            type="button"
            onClick={() => handleNav('governance')}
            className="hover:text-[#F4F4F6] transition-colors duration-180 whitespace-nowrap shrink-0 cursor-pointer py-1 border-b border-transparent hover:border-[#D4AF37]"
          >
            {t.nav.methodology}
          </button>
          <button
            type="button"
            onClick={() => handleNav('portfolio')}
            className="hover:text-[#F4F4F6] transition-colors duration-180 whitespace-nowrap shrink-0 cursor-pointer py-1 border-b border-transparent hover:border-[#D4AF37]"
          >
            {t.nav.portfolio}
          </button>
          <button
            type="button"
            onClick={() => handleNav('configurator')}
            className="hover:text-[#F4F4F6] transition-colors duration-180 whitespace-nowrap shrink-0 cursor-pointer py-1 border-b border-transparent hover:border-[#D4AF37]"
          >
            {t.nav.configurator}
          </button>
          <button
            type="button"
            onClick={onOpenConcierge}
            className="inline-flex items-center gap-1.5 text-[#D4AF37] hover:text-[#E3C358] transition-colors duration-180 whitespace-nowrap shrink-0 cursor-pointer py-1"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.nav.concierge}</span>
          </button>
        </nav>

        {/* Zone 3: Compact Language (FR|EN) + Currency (XOF|EUR|USD) + Golden Primary CTA */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Compact Language Switcher */}
          <div
            className="hidden sm:inline-flex items-center bg-[#141821] border border-[#D4AF37]/20 rounded-[6px] p-0.5"
            role="group"
            aria-label="Language selector"
          >
            {languages.map((lang) => {
              const active = language === lang.code;
              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => setLanguage(lang.code)}
                  className={`px-2 py-1 text-xs font-mono-code font-medium rounded-[4px] transition-colors duration-180 cursor-pointer whitespace-nowrap shrink-0 ${
                    active
                      ? 'bg-[#D4AF37] text-[#0B0D12] font-semibold'
                      : 'text-[#A1A7B5] hover:text-[#F4F4F6]'
                  }`}
                >
                  {lang.label}
                </button>
              );
            })}
          </div>

          {/* Compact Real-Time Multi-Currency Switcher */}
          <div
            className="hidden md:inline-flex items-center bg-[#141821] border border-[#D4AF37]/20 rounded-[6px] p-0.5"
            role="group"
            aria-label="Currency selector"
          >
            {currencies.map((curr) => {
              const active = currency === curr;
              return (
                <button
                  key={curr}
                  type="button"
                  onClick={() => setCurrency(curr)}
                  className={`px-2 py-1 text-xs font-mono-code font-medium rounded-[4px] transition-colors duration-180 cursor-pointer whitespace-nowrap shrink-0 ${
                    active
                      ? 'bg-[#D4AF37] text-[#0B0D12] font-semibold'
                      : 'text-[#A1A7B5] hover:text-[#F4F4F6]'
                  }`}
                >
                  {curr}
                </button>
              );
            })}
          </div>

          {/* Primary Sovereign Gold CTA */}
          <button
            type="button"
            onClick={() => handleNav('configurator')}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-[#0B0D12] bg-[#D4AF37] hover:bg-[#E3C358] rounded-[6px] transition-colors duration-180 cursor-pointer whitespace-nowrap shrink-0"
          >
            <span>{t.nav.ctaStart}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile Drawer Toggle */}
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="lg:hidden min-h-[42px] min-w-[42px] flex items-center justify-center rounded-[6px] bg-[#141821] border border-[#D4AF37]/25 text-[#F4F4F6] hover:border-[#D4AF37] cursor-pointer"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#0B0D12] border-b border-[#D4AF37]/20 px-4 pt-4 pb-6 space-y-5">
          {/* Language & Currency Controls on Mobile */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#D4AF37]/15">
            <div className="inline-flex items-center bg-[#141821] border border-[#D4AF37]/20 rounded-[6px] p-0.5">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => setLanguage(lang.code)}
                  className={`px-3 py-1.5 text-xs font-mono-code font-medium rounded-[4px] cursor-pointer ${
                    language === lang.code
                      ? 'bg-[#D4AF37] text-[#0B0D12] font-semibold'
                      : 'text-[#A1A7B5]'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>

            <div className="inline-flex items-center bg-[#141821] border border-[#D4AF37]/20 rounded-[6px] p-0.5">
              {currencies.map((curr) => (
                <button
                  key={curr}
                  type="button"
                  onClick={() => setCurrency(curr)}
                  className={`px-2.5 py-1.5 text-xs font-mono-code font-medium rounded-[4px] cursor-pointer ${
                    currency === curr
                      ? 'bg-[#D4AF37] text-[#0B0D12] font-semibold'
                      : 'text-[#A1A7B5]'
                  }`}
                >
                  {curr}
                </button>
              ))}
            </div>
          </div>

          <nav className="flex flex-col space-y-2">
            <button
              type="button"
              onClick={() => handleNav('poles')}
              className="text-left py-2.5 text-base font-medium text-[#F4F4F6] hover:text-[#D4AF37]"
            >
              01. {t.nav.poles}
            </button>
            <button
              type="button"
              onClick={() => handleNav('governance')}
              className="text-left py-2.5 text-base font-medium text-[#F4F4F6] hover:text-[#D4AF37]"
            >
              02. {t.nav.methodology}
            </button>
            <button
              type="button"
              onClick={() => handleNav('portfolio')}
              className="text-left py-2.5 text-base font-medium text-[#F4F4F6] hover:text-[#D4AF37]"
            >
              03. {t.nav.portfolio}
            </button>
            <button
              type="button"
              onClick={() => handleNav('configurator')}
              className="text-left py-2.5 text-base font-medium text-[#F4F4F6] hover:text-[#D4AF37]"
            >
              04. {t.nav.configurator}
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onOpenConcierge();
              }}
              className="text-left py-2.5 text-base font-medium text-[#D4AF37] inline-flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>{t.nav.concierge}</span>
            </button>
          </nav>

          <button
            type="button"
            onClick={() => handleNav('configurator')}
            className="w-full py-3 px-5 rounded-[6px] bg-[#D4AF37] text-[#0B0D12] font-semibold text-sm flex items-center justify-center gap-2"
          >
            <span>{t.nav.ctaStart}</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </header>
  );
};
