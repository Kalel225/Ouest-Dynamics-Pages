import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useLanguage, Language } from '../context/LanguageContext';
import { useCurrency } from '../context/CurrencyContext';
import { CurrencyCode } from '../utils/pricingEngine';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const { language, setLanguage, t } = useLanguage();
  const { currency, setCurrency } = useCurrency();
  const [mobileOpen, setMobileOpen] = useState(false);

  const currencies: CurrencyCode[] = ['XOF', 'EUR', 'USD'];
  const languages: Language[] = ['fr', 'en'];

  const links = [
    { id: 'services', label: t.nav.services },
    { id: 'work', label: t.nav.work },
    { id: 'process', label: t.nav.process },
    { id: 'estimate', label: t.nav.estimate },
  ];

  const handleNav = (id: string) => {
    setMobileOpen(false);
    onNavigate(id);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/85 material backdrop-blur-xl border-b border-[#DCE4E0]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between gap-4">
        <a
          href="#"
          aria-label={t.nav.home}
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="inline-flex items-center gap-2.5 text-[#0B241D] font-semibold tracking-tight whitespace-nowrap shrink-0"
        >
          <span className="w-3 h-3 rounded-full bg-[#F77F00]" aria-hidden="true" />
          <span className="wide text-sm sm:text-[15px]">Ouest Dynamics</span>
        </a>

        <nav className="hidden md:flex items-center gap-7 text-sm text-[#50645D]">
          {links.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleNav(item.id)}
              className="hover:text-[#0B241D] transition-colors cursor-pointer whitespace-nowrap"
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <div
            className="hidden sm:inline-flex items-center gap-1 text-xs font-medium text-[#50645D]"
            role="group"
            aria-label={t.nav.language}
          >
            {languages.map((lang, i) => (
              <React.Fragment key={lang}>
                {i > 0 && <span className="text-[#DCE4E0]">/</span>}
                <button
                  type="button"
                  onClick={() => setLanguage(lang)}
                  className={`px-1 py-0.5 uppercase cursor-pointer ${
                    language === lang ? 'text-[#0B241D] font-semibold underline decoration-[#F77F00] decoration-2 underline-offset-4' : 'hover:text-[#0B241D]'
                  }`}
                >
                  {lang}
                </button>
              </React.Fragment>
            ))}
          </div>

          <div
            className="hidden lg:inline-flex items-center gap-1 text-xs font-medium text-[#50645D] pl-2 border-l border-[#DCE4E0]"
            role="group"
            aria-label={t.services.currency}
          >
            {currencies.map((curr, i) => (
              <React.Fragment key={curr}>
                {i > 0 && <span className="text-[#DCE4E0]">/</span>}
                <button
                  type="button"
                  onClick={() => setCurrency(curr)}
                  className={`px-1 py-0.5 cursor-pointer ${
                    currency === curr ? 'text-[#0B241D] font-semibold underline decoration-[#F77F00] decoration-2 underline-offset-4' : 'hover:text-[#0B241D]'
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
            className="hidden sm:inline-flex items-center px-4 py-2 rounded-full bg-[#0E3A2F] hover:bg-[#082820] text-white text-xs font-semibold press cursor-pointer whitespace-nowrap"
          >
            {t.nav.start}
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="md:hidden min-h-[38px] min-w-[38px] flex items-center justify-center rounded-full border border-[#DCE4E0] text-[#0B241D] cursor-pointer"
            aria-label={mobileOpen ? t.nav.closeMenu : t.nav.openMenu}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-white border-b border-[#DCE4E0] px-5 py-5 space-y-5">
          <div className="flex items-center justify-between gap-4 pb-4 border-b border-[#DCE4E0] text-xs font-medium">
            <div className="inline-flex items-center gap-2 text-[#50645D]">
              {languages.map((lang, i) => (
                <React.Fragment key={lang}>
                  {i > 0 && <span className="text-[#DCE4E0]">/</span>}
                  <button
                    type="button"
                    onClick={() => setLanguage(lang)}
                    className={`uppercase cursor-pointer ${
                      language === lang ? 'text-[#0B241D] font-semibold' : ''
                    }`}
                  >
                    {lang}
                  </button>
                </React.Fragment>
              ))}
            </div>

            <div className="inline-flex items-center gap-2 text-[#50645D]">
              {currencies.map((curr, i) => (
                <React.Fragment key={curr}>
                  {i > 0 && <span className="text-[#DCE4E0]">/</span>}
                  <button
                    type="button"
                    onClick={() => setCurrency(curr)}
                    className={`cursor-pointer ${
                      currency === curr ? 'text-[#0B241D] font-semibold' : ''
                    }`}
                  >
                    {curr}
                  </button>
                </React.Fragment>
              ))}
            </div>
          </div>

          <nav className="flex flex-col space-y-2">
            {links.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNav(item.id)}
                className="text-left py-2 text-base font-medium text-[#0B241D]"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => handleNav('estimate')}
            className="w-full py-3 px-5 rounded-full bg-[#0E3A2F] text-white font-semibold text-sm press"
          >
            {t.nav.start}
          </button>
        </div>
      )}
    </header>
  );
};
