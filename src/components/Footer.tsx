import React from 'react';
import { ArrowUp, ArrowUpRight } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { useLanguage } from '../context/LanguageContext';

interface FooterProps {
  onOpenPrivacyPolicy?: () => void;
  onOpenPrivacyPage?: () => void;
  onOpenTermsPage?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenPrivacyPolicy,
  onOpenPrivacyPage,
  onOpenTermsPage,
}) => {
  const { t, language } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#181512] text-[#F7F4EE] border-t border-[#2C2621] pt-16 sm:pt-20 pb-24 sm:pb-14 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-[#2C2621]">
          {/* Col 1: Brand & Official Social Channels (5 cols) */}
          <div className="sm:col-span-2 lg:col-span-5 space-y-5">
            <div>
              <BrandLogo idPrefix="footer" size="lg" variant="light" />
            </div>

            <p className="text-sm text-[#C8C1B6] leading-relaxed max-w-md">
              {t.footer.tagline}
            </p>

            {/* Unboxed Regional Presence */}
            <div className="text-xs text-[#C8C1B6]">
              <span className="font-semibold text-[#F7F4EE]">
                {language === 'fr' ? 'Siège & Atelier :' : 'Practice & Studio:'}
              </span>{' '}
              <span>
                {t.footer.location} ·{' '}
                {language === 'fr'
                  ? 'Ingénierie & Croissance Digitale'
                  : 'Digital Engineering & Growth'}
              </span>
            </div>

            {/* Official Social Links (TikTok, Facebook, Instagram) */}
            <div className="pt-2">
              <p className="text-xs text-[#C8C1B6] mb-3">
                {language === 'fr'
                  ? 'Réseaux Sociaux Officiels :'
                  : 'Official Social Channels:'}
              </p>
              <div className="flex flex-wrap items-center gap-5 text-xs font-semibold text-[#F7F4EE]">
                <a
                  href="https://www.tiktok.com/@ouestdynamics"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-[#D49B6A] transition-colors"
                >
                  <span>TikTok</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#D49B6A]" />
                </a>
                <span className="text-[#332C26]" aria-hidden="true">·</span>
                <a
                  href="https://www.facebook.com/ouestdynamics"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-[#D49B6A] transition-colors"
                >
                  <span>Facebook</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#D49B6A]" />
                </a>
                <span className="text-[#332C26]" aria-hidden="true">·</span>
                <a
                  href="https://www.instagram.com/ouestdynamics"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-[#D49B6A] transition-colors"
                >
                  <span>Instagram</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#D49B6A]" />
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Capabilities & Portfolio (3 cols) */}
          <div className="sm:col-span-1 lg:col-span-3 space-y-3">
            <p className="text-xs font-semibold text-[#D49B6A]">
              {t.footer.domainsTitle}
            </p>
            <ul className="space-y-2 text-xs text-[#C8C1B6]">
              <li>
                <a
                  href="#portfolio"
                  className="text-[#F7F4EE] hover:text-[#D49B6A] font-medium transition-colors inline-flex items-center gap-1 py-0.5"
                >
                  <span>{t.nav.portfolio}</span>
                  <ArrowUpRight className="w-3 h-3 text-[#D49B6A]" />
                </a>
              </li>
              {t.services.items.map((s) => (
                <li key={s.id}>
                  <a
                    href="#expertises"
                    className="hover:text-[#F7F4EE] transition-colors py-0.5 inline-block"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Process (2 cols) */}
          <div className="sm:col-span-1 lg:col-span-2 space-y-3">
            <p className="text-xs font-semibold text-[#D49B6A]">
              {t.footer.methodologyTitle}
            </p>
            <ul className="space-y-2 text-xs text-[#C8C1B6]">
              {t.methodology.steps.map((st) => (
                <li key={st.number}>
                  <a
                    href="#methodologie"
                    className="hover:text-[#F7F4EE] transition-colors py-0.5 inline-block"
                  >
                    {st.number}. {st.title}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#faq"
                  className="hover:text-[#F7F4EE] transition-colors py-0.5 inline-block text-[#F7F4EE] font-medium"
                >
                  04. {language === 'fr' ? 'Questions Fréquentes (FAQ)' : 'FAQ'}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Guarantees (2 cols) */}
          <div className="sm:col-span-2 lg:col-span-2 space-y-3">
            <p className="text-xs font-semibold text-[#D49B6A]">
              {t.footer.guaranteesTitle}
            </p>
            <p className="text-xs text-[#C8C1B6] leading-relaxed">
              {t.footer.confidentialityNote}
            </p>
          </div>
        </div>

        {/* Bottom Legal & Back to Top Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#C8C1B6]">
          <div className="flex flex-wrap items-center gap-3">
            <span>
              © {new Date().getFullYear()} Ouest Dynamics. {t.footer.rightsReserved}
            </span>
            <span aria-hidden="true">·</span>
            <button
              type="button"
              onClick={onOpenPrivacyPage || onOpenPrivacyPolicy}
              className="text-[#F7F4EE] hover:text-[#D49B6A] underline underline-offset-4 transition-colors cursor-pointer"
            >
              {t.footer.privacyPolicy}
            </button>
            {onOpenTermsPage && (
              <>
                <span aria-hidden="true">·</span>
                <button
                  type="button"
                  onClick={onOpenTermsPage}
                  className="text-[#F7F4EE] hover:text-[#D49B6A] underline underline-offset-4 transition-colors cursor-pointer"
                >
                  {language === 'fr' ? 'CGU & Mentions Légales' : 'Terms & Conditions (CGU)'}
                </button>
              </>
            )}
            <span aria-hidden="true">·</span>
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#C8C1B6] hover:text-[#D49B6A] transition-colors"
            >
              Sitemap
            </a>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 text-[#F7F4EE] hover:text-[#D49B6A] transition-colors cursor-pointer"
          >
            <span>{t.footer.backToTop}</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
