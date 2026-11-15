import React from 'react';
import { ArrowUpRight, ArrowDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency } from '../context/CurrencyContext';

interface HeroProps {
  onOpenProjectModal: () => void;
  onExploreServices: () => void;
  isLoaded?: boolean;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenProjectModal,
  onExploreServices,
}) => {
  const { t, language, setLanguage } = useLanguage();
  const { currencyConfig } = useCurrency();

  const heroImageUrl = '/src/assets/images/hero_atelier_architecture_1794659548636.jpg';

  return (
    <section className="relative pt-28 sm:pt-36 pb-16 sm:pb-24 px-4 sm:px-8 bg-[#F7F4EE] border-b border-[#E2DDD5]">
      <div className="max-w-7xl mx-auto">
        {/* Top Metadata & Language Selector Bar (Below Header, Above Split) */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 sm:mb-12 border-b border-[#E2DDD5]">
          <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-[#5C554E]">
            <span className="font-semibold text-[#A64B2A]">
              {language === 'fr'
                ? 'Maison d’Ingénierie Digitale & Croissance'
                : 'Digital Architecture & Growth Practice'}
            </span>
            <span aria-hidden="true">·</span>
            <span>
              {language === 'fr'
                ? 'Conception & Développement Sur-Mesure'
                : 'Bespoke Digital Engineering & Design'}
            </span>
          </div>

          {/* Interactive Language Segmented Control */}
          <div className="inline-flex items-center gap-1 p-1 bg-[#EFECE6] rounded-lg border border-[#E2DDD5]">
            <button
              type="button"
              onClick={() => setLanguage('en')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                language === 'en'
                  ? 'bg-white text-[#161412] shadow-xs'
                  : 'text-[#5C554E] hover:text-[#161412]'
              }`}
            >
              English
            </button>
            <button
              type="button"
              onClick={() => setLanguage('fr')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                language === 'fr'
                  ? 'bg-white text-[#161412] shadow-xs'
                  : 'text-[#5C554E] hover:text-[#161412]'
              }`}
            >
              Français
            </button>
          </div>
        </div>

        {/* 2-Column Asymmetric Architectural Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left Column (7 cols): Editorial Headline, Plain-Language Value Prop & Single Primary CTA */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <h1 className="font-serif-display text-[clamp(2.25rem,4.2vw,4rem)] font-semibold text-[#161412] leading-[1.08] tracking-tight mb-6 [text-wrap:balance]">
                {t.hero.title}
              </h1>

              <p className="text-base sm:text-lg text-[#5C554E] leading-relaxed max-w-2xl mb-8">
                {t.hero.subtitle}
              </p>
            </div>

            <div className="space-y-8">
              {/* Primary Action & Quiet Editorial Secondary Link */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                <button
                  onClick={onOpenProjectModal}
                  className="min-h-[50px] inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-sm font-semibold text-[#F7F4EE] bg-[#A64B2A] hover:bg-[#8E3D20] rounded-lg transition-colors duration-150 cursor-pointer shadow-xs whitespace-nowrap shrink-0"
                >
                  <span>{t.hero.ctaPrimary}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-6 px-1">
                  <a
                    href="#portfolio"
                    className="text-sm font-semibold text-[#161412] hover:text-[#A64B2A] underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
                  >
                    {language === 'fr' ? 'Explorer le Portfolio' : 'Explore Selected Works'}
                  </a>
                  <span className="text-[#E2DDD5]" aria-hidden="true">/</span>
                  <button
                    onClick={onExploreServices}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-[#5C554E] hover:text-[#161412] transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <span>{t.hero.ctaSecondary}</span>
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Plain-Language Editorial Trust Note */}
              <div className="pt-6 border-t border-[#E2DDD5] flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[#5C554E]">
                <span>
                  {language === 'fr'
                    ? '01. Maquette visuelle validée avant tout développement'
                    : '01. Visual mockup approved before any engineering'}
                </span>
                <span aria-hidden="true">·</span>
                <span>
                  {language === 'fr'
                    ? '02. Zéro jargon technique'
                    : '02. Plain-language guidance'}
                </span>
                <span aria-hidden="true">·</span>
                <span>
                  {language === 'fr'
                    ? '03. Propriété intellectuelle 100% client'
                    : '03. 100% client intellectual property'}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column (5 cols): Architectural Visual Monograph Frame */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="relative flex-1 min-h-[280px] sm:min-h-[360px] lg:h-full rounded-xl overflow-hidden border border-[#E2DDD5] bg-[#181512]">
              <img
                src={heroImageUrl}
                alt={
                  language === 'fr'
                    ? 'Ouest Dynamics — Atelier d’architecture digitale'
                    : 'Ouest Dynamics — Digital Architecture Studio'
                }
                fetchPriority="high"
                decoding="async"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
              {/* Measured Contrast Scrim for Legible Caption */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent flex flex-col justify-end p-5 sm:p-6">
                <p className="text-xs font-mono-tabular text-[#F7F4EE]/80 mb-1">
                  {language === 'fr'
                    ? 'Atelier de Conception · Excellence Éditoriale'
                    : 'Design & Engineering Practice · Editorial Craft'}
                </p>
                <p className="font-serif-display text-base sm:text-lg text-[#F7F4EE] font-medium leading-snug">
                  {language === 'fr'
                    ? 'Des plateformes digitales durables, conçues avec la précision d’une œuvre architecturale.'
                    : 'Enduring digital platforms crafted with the precision of modern architecture.'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width 4-Column Quantitative Proof Row Below Hero Split */}
        <div className="mt-12 sm:mt-16 pt-8 sm:pt-10 border-t border-[#E2DDD5] grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <div>
            <div className="font-serif-display text-2xl sm:text-3xl font-semibold text-[#161412] font-mono-tabular mb-1">
              {currencyConfig.heroStat.amount}
            </div>
            <div className="text-xs sm:text-sm text-[#5C554E]">
              {t.hero.valueGenerated} ({currencyConfig.code})
            </div>
          </div>

          <div>
            <div className="font-serif-display text-2xl sm:text-3xl font-semibold text-[#161412] mb-1">
              {t.hero.custom}
            </div>
            <div className="text-xs sm:text-sm text-[#5C554E]">
              {t.hero.customSub}
            </div>
          </div>

          <div>
            <div className="font-serif-display text-2xl sm:text-3xl font-semibold text-[#161412] mb-1">
              {t.hero.guarantee}
            </div>
            <div className="text-xs sm:text-sm text-[#5C554E]">
              {t.hero.guaranteeSub}
            </div>
          </div>

          <div>
            <div className="font-serif-display text-2xl sm:text-3xl font-semibold text-[#161412] mb-1">
              {t.hero.ownership}
            </div>
            <div className="text-xs sm:text-sm text-[#5C554E]">
              {t.hero.ownershipSub}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
