import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { useLanguage } from '../context/LanguageContext';

interface NavbarProps {
  onOpenProjectModal: (service?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenProjectModal }) => {
  const { language, setLanguage, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 16);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 border-b ${
          scrolled
            ? 'bg-[#F7F4EE]/95 backdrop-blur-md border-[#E2DDD5] py-3.5'
            : 'bg-[#F7F4EE]/85 backdrop-blur-sm border-transparent py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between gap-8">
          {/* Zone 1: Single Text Element Wordmark */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#A64B2A]"
            title="Ouest Dynamics"
          >
            <BrandLogo idPrefix="nav" size="md" variant="dark" />
          </a>

          {/* Zone 2: Clean Single-Line Text Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#5C554E]">
            <button
              onClick={() => scrollTo('expertises')}
              className="hover:text-[#161412] transition-colors duration-150 cursor-pointer py-1 whitespace-nowrap shrink-0 border-b border-transparent hover:border-[#A64B2A]"
            >
              {t.nav.expertises}
            </button>
            <button
              onClick={() => scrollTo('portfolio')}
              className="hover:text-[#161412] transition-colors duration-150 cursor-pointer py-1 whitespace-nowrap shrink-0 border-b border-transparent hover:border-[#A64B2A]"
            >
              {t.nav.portfolio}
            </button>
            <button
              onClick={() => scrollTo('methodologie')}
              className="hover:text-[#161412] transition-colors duration-150 cursor-pointer py-1 whitespace-nowrap shrink-0 border-b border-transparent hover:border-[#A64B2A]"
            >
              {t.nav.methodology}
            </button>
            <button
              onClick={() => scrollTo('faq')}
              className="hover:text-[#161412] transition-colors duration-150 cursor-pointer py-1 whitespace-nowrap shrink-0 border-b border-transparent hover:border-[#A64B2A]"
            >
              FAQ
            </button>
            <button
              onClick={() => scrollTo('contact')}
              className="hover:text-[#161412] transition-colors duration-150 cursor-pointer py-1 whitespace-nowrap shrink-0 border-b border-transparent hover:border-[#A64B2A]"
            >
              {t.nav.contact}
            </button>
          </nav>

          {/* Zone 3: 1 Primary Action (Desktop) / Menu Toggle (Mobile) */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onOpenProjectModal()}
              className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-[#F7F4EE] bg-[#161412] hover:bg-[#A64B2A] rounded-lg transition-colors duration-150 cursor-pointer whitespace-nowrap shrink-0"
            >
              <span>{t.nav.launchProject}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg border border-[#E2DDD5] bg-white/80 text-[#161412] hover:border-[#A64B2A] transition-colors cursor-pointer"
              aria-label={mobileMenuOpen ? t.nav.close : t.nav.menu}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Architectural Mobile & Tablet Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden bg-[#F7F4EE] pt-20 pb-8 px-6 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-6">
            {/* Language Switcher in Mobile Drawer */}
            <div className="flex items-center justify-between pb-4 border-b border-[#E2DDD5]">
              <span className="text-xs font-medium text-[#5C554E]">
                {language === 'fr' ? 'Langue d’affichage' : 'Display Language'}
              </span>
              <div className="inline-flex items-center p-1 bg-[#EFECE6] rounded-lg border border-[#E2DDD5]">
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    language === 'en'
                      ? 'bg-[#161412] text-[#F7F4EE]'
                      : 'text-[#5C554E] hover:text-[#161412]'
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => setLanguage('fr')}
                  className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    language === 'fr'
                      ? 'bg-[#161412] text-[#F7F4EE]'
                      : 'text-[#5C554E] hover:text-[#161412]'
                  }`}
                >
                  Français
                </button>
              </div>
            </div>

            {/* Editorial Numbered Navigation Links */}
            <nav className="flex flex-col divide-y divide-[#E2DDD5]">
              <button
                onClick={() => scrollTo('expertises')}
                className="text-left py-4 text-xl font-serif-display font-medium text-[#161412] hover:text-[#A64B2A] transition-colors flex items-center justify-between min-h-[52px]"
              >
                <span>01. {t.nav.expertises}</span>
                <ArrowUpRight className="w-4 h-4 text-[#A64B2A]" />
              </button>
              <button
                onClick={() => scrollTo('portfolio')}
                className="text-left py-4 text-xl font-serif-display font-medium text-[#161412] hover:text-[#A64B2A] transition-colors flex items-center justify-between min-h-[52px]"
              >
                <span>02. {t.nav.portfolio}</span>
                <ArrowUpRight className="w-4 h-4 text-[#A64B2A]" />
              </button>
              <button
                onClick={() => scrollTo('methodologie')}
                className="text-left py-4 text-xl font-serif-display font-medium text-[#161412] hover:text-[#A64B2A] transition-colors flex items-center justify-between min-h-[52px]"
              >
                <span>03. {t.nav.methodology}</span>
                <ArrowUpRight className="w-4 h-4 text-[#A64B2A]" />
              </button>
              <button
                onClick={() => scrollTo('faq')}
                className="text-left py-4 text-xl font-serif-display font-medium text-[#161412] hover:text-[#A64B2A] transition-colors flex items-center justify-between min-h-[52px]"
              >
                <span>04. FAQ</span>
                <ArrowUpRight className="w-4 h-4 text-[#A64B2A]" />
              </button>
              <button
                onClick={() => scrollTo('contact')}
                className="text-left py-4 text-xl font-serif-display font-medium text-[#161412] hover:text-[#A64B2A] transition-colors flex items-center justify-between min-h-[52px]"
              >
                <span>05. {t.nav.contact}</span>
                <ArrowUpRight className="w-4 h-4 text-[#A64B2A]" />
              </button>
            </nav>

            {/* Official Social Channels */}
            <div className="pt-2">
              <p className="text-xs text-[#5C554E] mb-3">
                {language === 'fr' ? 'Canaux Officiels' : 'Official Channels'}
              </p>
              <div className="flex items-center gap-4 text-sm font-medium text-[#161412]">
                <a
                  href="https://www.tiktok.com/@ouestdynamics"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#A64B2A] underline underline-offset-4 transition-colors"
                >
                  TikTok
                </a>
                <span className="text-[#E2DDD5]">·</span>
                <a
                  href="https://www.facebook.com/ouestdynamics"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#A64B2A] underline underline-offset-4 transition-colors"
                >
                  Facebook
                </a>
                <span className="text-[#E2DDD5]">·</span>
                <a
                  href="https://www.instagram.com/ouestdynamics"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#A64B2A] underline underline-offset-4 transition-colors"
                >
                  Instagram
                </a>
              </div>
            </div>
          </div>

          {/* Primary Mobile CTA */}
          <div className="pt-6 border-t border-[#E2DDD5]">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenProjectModal();
              }}
              className="w-full min-h-[52px] px-6 py-3.5 rounded-lg bg-[#A64B2A] text-[#F7F4EE] font-semibold text-sm flex items-center justify-center gap-2 shadow-sm active:scale-[0.99] transition-transform cursor-pointer"
            >
              <span>{t.nav.launchProject}</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
