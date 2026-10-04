import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, ShieldCheck } from 'lucide-react';
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
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'py-3' : 'py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="rounded-full bg-[#141414]/70 backdrop-blur-2xl border border-white/[0.08] py-2.5 sm:py-3 px-4 sm:px-7 flex items-center justify-between shadow-[inset_0_1px_1px_rgba(255,255,255,0.12),_0_15px_35px_rgba(0,0,0,0.6)]">
            {/* Zone 1: Brand Wordmark */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="group flex items-center transition-transform duration-200 hover:scale-[1.02]"
              title="Ouest Dynamics"
            >
              <BrandLogo idPrefix="nav" size="md" />
            </a>

            {/* Zone 2: Navigation Links (Desktop) */}
            <nav className="hidden md:flex items-center gap-7 text-xs sm:text-sm font-medium text-[#F4F4F6]/80">
              <button
                onClick={() => scrollTo('expertises')}
                className="hover:text-[#D4AF37] transition-colors duration-200 cursor-pointer"
              >
                {t.nav.expertises}
              </button>
              <button
                onClick={() => scrollTo('methodologie')}
                className="hover:text-[#D4AF37] transition-colors duration-200 cursor-pointer"
              >
                {t.nav.methodology}
              </button>
              <button
                onClick={() => scrollTo('gouvernance')}
                className="hover:text-[#D4AF37] transition-colors duration-200 cursor-pointer"
              >
                {t.nav.governance}
              </button>
              <button
                onClick={() => scrollTo('contact')}
                className="hover:text-[#D4AF37] transition-colors duration-200 cursor-pointer"
              >
                {t.nav.contact}
              </button>
            </nav>

            {/* Zone 3: Language Toggle & CTA (Desktop) */}
            <div className="hidden md:flex items-center gap-4">
              {/* Luxury Language Switcher */}
              <div className="flex items-center rounded-full bg-white/[0.04] border border-white/[0.1] p-0.5 text-xs font-mono">
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                    language === 'en'
                      ? 'bg-[#D4AF37] text-[#0B0B0B] font-bold shadow-[0_1px_8px_rgba(212,175,55,0.3)]'
                      : 'text-[#F4F4F6]/60 hover:text-white'
                  }`}
                  aria-label="Switch to English"
                >
                  EN
                </button>
                <button
                  onClick={() => setLanguage('fr')}
                  className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                    language === 'fr'
                      ? 'bg-[#D4AF37] text-[#0B0B0B] font-bold shadow-[0_1px_8px_rgba(212,175,55,0.3)]'
                      : 'text-[#F4F4F6]/60 hover:text-white'
                  }`}
                  aria-label="Passer en Français"
                >
                  FR
                </button>
              </div>

              {/* Primary Action Button */}
              <button
                onClick={() => onOpenProjectModal()}
                className="group relative inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#0B0B0B] bg-[#D4AF37] hover:bg-[#E2C255] rounded-full transition-all duration-200 cursor-pointer shadow-[0_4px_20px_rgba(212,175,55,0.3)] hover:shadow-[0_6px_25px_rgba(212,175,55,0.45)]"
              >
                <span>{t.nav.launchProject}</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>

            {/* Mobile Actions: Language + Burger Menu */}
            <div className="flex md:hidden items-center gap-2">
              <div className="flex items-center rounded-full bg-white/[0.05] border border-white/[0.1] p-0.5 text-[11px] font-mono">
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-2 py-0.5 rounded-full transition-all ${
                    language === 'en'
                      ? 'bg-[#D4AF37] text-[#0B0B0B] font-bold'
                      : 'text-[#F4F4F6]/60'
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => setLanguage('fr')}
                  className={`px-2 py-0.5 rounded-full transition-all ${
                    language === 'fr'
                      ? 'bg-[#D4AF37] text-[#0B0B0B] font-bold'
                      : 'text-[#F4F4F6]/60'
                  }`}
                >
                  FR
                </button>
              </div>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="min-w-[44px] min-h-[44px] rounded-full bg-white/[0.05] border border-white/[0.1] flex items-center justify-center text-[#F4F4F6] hover:text-[#D4AF37] active:scale-95 transition-all"
                aria-label={mobileMenuOpen ? t.nav.close : t.nav.menu}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer (Accessible, High-Touch Ergonomics) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#0B0B0B]/98 backdrop-blur-2xl md:hidden pt-28 px-6 flex flex-col justify-between pb-8 animate-in fade-in duration-200 overflow-y-auto">
          <div className="flex flex-col gap-5">
            <div className="pb-4 border-b border-white/[0.08] flex items-center justify-between">
              <BrandLogo size="md" />
              <span className="text-[10px] font-mono tracking-widest text-[#D4AF37] uppercase">
                Navigation
              </span>
            </div>

            <nav className="flex flex-col divide-y divide-white/[0.06]">
              <button
                onClick={() => scrollTo('expertises')}
                className="text-left py-4 text-xl font-display font-semibold text-white hover:text-[#D4AF37] active:text-[#D4AF37] transition-colors flex items-center justify-between"
              >
                <span>{t.nav.expertises}</span>
                <span className="text-xs font-mono text-[#D4AF37]/50">01</span>
              </button>
              <button
                onClick={() => scrollTo('methodologie')}
                className="text-left py-4 text-xl font-display font-semibold text-white hover:text-[#D4AF37] active:text-[#D4AF37] transition-colors flex items-center justify-between"
              >
                <span>{t.nav.methodology}</span>
                <span className="text-xs font-mono text-[#D4AF37]/50">02</span>
              </button>
              <button
                onClick={() => scrollTo('gouvernance')}
                className="text-left py-4 text-xl font-display font-semibold text-white hover:text-[#D4AF37] active:text-[#D4AF37] transition-colors flex items-center justify-between"
              >
                <span>{t.nav.governance}</span>
                <span className="text-xs font-mono text-[#D4AF37]/50">03</span>
              </button>
              <button
                onClick={() => scrollTo('contact')}
                className="text-left py-4 text-xl font-display font-semibold text-white hover:text-[#D4AF37] active:text-[#D4AF37] transition-colors flex items-center justify-between"
              >
                <span>{t.nav.contact}</span>
                <span className="text-xs font-mono text-[#D4AF37]/50">04</span>
              </button>
            </nav>
          </div>

          <div className="space-y-4 pt-6 border-t border-white/[0.08] mt-6">
            <div className="flex items-center gap-2 text-xs text-[#F4F4F6]/60 font-body">
              <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>Strict NDA protection on all initial inquiries</span>
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenProjectModal();
              }}
              className="w-full flex items-center justify-center gap-2 py-4 text-xs font-semibold uppercase tracking-wider text-[#0B0B0B] bg-[#D4AF37] hover:bg-[#E2C255] active:bg-[#E2C255] rounded-full transition-all shadow-[0_4px_20px_rgba(212,175,55,0.4)] cursor-pointer"
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
