import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useLanguage, Language } from '../context/LanguageContext';
import { useCurrency } from '../context/CurrencyContext';
import { CurrencyCode } from '../utils/pricingEngine';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  onOpenConcierge: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, onOpenConcierge }) => {
  const { language, setLanguage, t } = useLanguage();
  const { currency, setCurrency } = useCurrency();
  const [mobileOpen, setMobileOpen] = useState(false);

  const currencies: CurrencyCode[] = ['XOF', 'EUR', 'USD'];
  const languages: Language[] = ['en', 'fr'];

  const links = [
    { id: 'estimate', label: t.nav.estimate },
    { id: 'work', label: t.nav.work },
    { id: 'process', label: t.nav.process },
  ];

  const handleNav = (id: string) => {
    setMobileOpen(false);
    onNavigate(id);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#EFECE6]/90 backdrop-blur-md border-b border-[#141311]/10">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 h-14 flex items-center justify-between gap-4 text-xs tracking-[0.06em]">
        <a
          href="#"
          aria-label={t.nav.home}
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="font-semibold uppercase text-[#141311] whitespace-nowrap shrink-0 hover:opacity-70 transition-opacity"
        >
          Ouest Dynamics
        </a>

        <nav className="hidden md:flex items-center gap-1 text-[#141311]/65">
          {links.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleNav(item.id)}
              className="px-3 py-1.5 hover:text-[#141311] hover:bg-[#E4DFD5] transition-colors cursor-pointer whitespace-nowrap uppercase press"
            >
              {item.label}
            </button>
          ))}
          <button
            type="button"
            onClick={onOpenConcierge}
            className="px-3 py-1.5 hover:text-[#141311] hover:bg-[#E4DFD5] transition-colors cursor-pointer whitespace-nowrap uppercase press"
          >
            {t.nav.concierge}
          </button>
        </nav>

        <div className="flex items-center gap-4 shrink-0">
          <div
            className="hidden sm:inline-flex items-center gap-1 text-[11px] text-[#141311]/55"
            role="group"
            aria-label={t.nav.language}
          >
            {languages.map((lang, i) => (
              <React.Fragment key={lang}>
                {i > 0 && <span className="text-[#141311]/20">/</span>}
                <button
                  type="button"
                  onClick={() => setLanguage(lang)}
                  className={`px-1 py-0.5 uppercase cursor-pointer transition-colors ${
                    language === lang
                      ? 'text-[#141311] font-semibold underline underline-offset-4'
                      : 'hover:text-[#141311]'
                  }`}
                >
                  {lang}
                </button>
              </React.Fragment>
            ))}
          </div>

          <div
            className="hidden lg:inline-flex items-center gap-1 text-[11px] text-[#141311]/55 pl-3 border-l border-[#141311]/12"
            role="group"
            aria-label={t.services.currency}
          >
            {currencies.map((curr, i) => (
              <React.Fragment key={curr}>
                {i > 0 && <span className="text-[#141311]/20">/</span>}
                <button
                  type="button"
                  onClick={() => setCurrency(curr)}
                  className={`px-1 py-0.5 cursor-pointer transition-colors ${
                    currency === curr
                      ? 'text-[#141311] font-semibold underline underline-offset-4'
                      : 'hover:text-[#141311]'
                  }`}
                >
                  {curr}
                </button>
              </React.Fragment>
            ))}
          </div>

          <button
            type="button"
            onClick={() => handleNav('estimate')}
            className="hidden sm:inline-flex items-center px-4 py-2 bg-[#141311] hover:bg-[#2C2925] text-[#EFECE6] text-[11px] font-medium uppercase tracking-[0.1em] press cursor-pointer whitespace-nowrap"
          >
            {t.nav.start}
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="md:hidden min-h-[36px] min-w-[36px] flex items-center justify-center bg-[#E4DFD5] hover:bg-[#D8D1C4] text-[#141311] cursor-pointer press"
            aria-label={mobileOpen ? t.nav.closeMenu : t.nav.openMenu}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-[#EFECE6] border-b border-[#141311]/15 px-5 py-5 space-y-5 text-xs uppercase tracking-[0.08em]">
          <div className="flex items-center justify-between pb-3 border-b border-[#141311]/12">
            <div className="inline-flex items-center gap-2 text-[#141311]/60">
              {languages.map((lang, i) => (
                <React.Fragment key={lang}>
                  {i > 0 && <span className="text-[#141311]/20">/</span>}
                  <button
                    type="button"
                    onClick={() => setLanguage(lang)}
                    className={`uppercase cursor-pointer ${
                      language === lang ? 'text-[#141311] font-semibold underline' : ''
                    }`}
                  >
                    {lang}
                  </button>
                </React.Fragment>
              ))}
            </div>

            <div className="inline-flex items-center gap-2 text-[#141311]/60">
              {currencies.map((curr, i) => (
                <React.Fragment key={curr}>
                  {i > 0 && <span className="text-[#141311]/20">/</span>}
                  <button
                    type="button"
                    onClick={() => setCurrency(curr)}
                    className={`cursor-pointer ${
                      currency === curr ? 'text-[#141311] font-semibold underline' : ''
                    }`}
                  >
                    {curr}
                  </button>
                </React.Fragment>
              ))}
            </div>
          </div>

          <nav className="flex flex-col space-y-1">
            {links.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNav(item.id)}
                className="text-left py-2 px-2 text-[#141311] hover:bg-[#E4DFD5] transition-colors"
              >
                {item.label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onOpenConcierge();
              }}
              className="text-left py-2 px-2 text-[#141311] hover:bg-[#E4DFD5] transition-colors"
            >
              {t.nav.concierge}
            </button>
          </nav>

          <button
            type="button"
            onClick={() => handleNav('estimate')}
            className="w-full py-2.5 bg-[#141311] hover:bg-[#2C2925] text-[#EFECE6] text-xs uppercase tracking-[0.1em] press"
          >
            {t.nav.start}
          </button>
        </div>
      )}
    </header>
  );
};
