import React from 'react';
import { ArrowUpRight, ChevronDown, CheckCircle2, Sparkles, ShieldCheck } from 'lucide-react';
import { Hero3DBackground } from './Hero3DBackground';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency } from '../context/CurrencyContext';

interface HeroProps {
  onOpenProjectModal: () => void;
  onExploreServices: () => void;
  isLoaded?: boolean;
}

export const Hero: React.FC<HeroProps> = ({ onOpenProjectModal, onExploreServices, isLoaded = true }) => {
  const { language, t } = useLanguage();
  const { currencyConfig } = useCurrency();

  return (
    <section className="relative min-h-[85vh] sm:min-h-[90vh] flex flex-col justify-center items-center pt-24 sm:pt-32 pb-14 sm:pb-20 px-3.5 sm:px-6 lg:px-8 overflow-hidden bg-[#0B0B0B]">
      {/* 3D Animated Background - Re-intégré exclusivement au niveau du Hero */}
      <Hero3DBackground />

      {/* Background Subtle Luxury Lighting & Grid */}
      <div className="absolute inset-0 pointer-events-none z-[1]">
        {/* Soft champagne radial bloom at center top */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] sm:w-[650px] lg:w-[850px] h-[250px] sm:h-[450px] bg-[radial-gradient(ellipse_at_center,_rgba(212,175,55,0.08)_0%,_rgba(11,11,11,0)_70%)] blur-3xl opacity-80" />
        
        {/* Hairline subtle geometric grid */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(#D4AF37 1px, transparent 1px), linear-gradient(90deg, #D4AF37 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
          }}
        />

        {/* Ambient vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0B0B0B]/40 to-[#0B0B0B]" />
      </div>

      <div
        className={`relative max-w-5xl mx-auto text-center z-10 transition-all duration-1000 transform ${
          isLoaded ? 'opacity-100 translate-y-0 filter-none' : 'opacity-0 translate-y-8 blur-[2px]'
        }`}
      >
        {/* Surtitre (Or Champagne, minuscule/espacé, avec hairlines signature) */}
        <div className="inline-flex items-center gap-2 mb-3.5 sm:mb-5">
          <span className="h-[1px] w-3.5 sm:w-8 bg-[#D4AF37]/60" />
          <span className="text-[10px] sm:text-xs font-semibold tracking-[0.18em] sm:tracking-[0.22em] text-[#D4AF37] uppercase font-mono">
            {t.hero.surtitle}
          </span>
          <span className="h-[1px] w-3.5 sm:w-8 bg-[#D4AF37]/60" />
        </div>

        {/* Titre H1 : Slogan préféré rétabli */}
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-[-0.03em] leading-[1.15] sm:leading-[1.12] mb-4 sm:mb-6 max-w-4xl mx-auto">
          {t.hero.title}
        </h1>

        {/* Sous-titre : Fluide, rassurant et élégant */}
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-[#F4F4F6]/85 font-normal leading-relaxed max-w-3xl mx-auto mb-7 sm:mb-10 font-body px-1">
          {t.hero.subtitle}
        </p>

        {/* Double CTA (Ergonomique, Touch-Friendly >= 48px) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-10 sm:mb-14 w-full sm:w-auto px-2">
          {/* Bouton principal (Fond Or Champagne, texte Noir Obsidienne) */}
          <button
            onClick={onOpenProjectModal}
            className="w-full sm:w-auto min-h-[48px] sm:min-h-[50px] inline-flex items-center justify-center gap-2.5 px-7 sm:px-9 py-3 sm:py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#0B0B0B] bg-[#D4AF37] hover:bg-[#E2C255] active:bg-[#E2C255] rounded-full transition-all duration-200 cursor-pointer shadow-[0_4px_25px_rgba(212,175,55,0.35)] hover:shadow-[0_6px_35px_rgba(212,175,55,0.5)] group"
          >
            <span>{t.hero.ctaPrimary}</span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>

          {/* Bouton secondaire (Sans cadre, pur & lisible) */}
          <button
            onClick={onExploreServices}
            className="w-full sm:w-auto min-h-[44px] inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-medium tracking-wide text-white hover:text-[#D4AF37] transition-all duration-200 cursor-pointer group"
          >
            <span>{t.hero.ctaSecondary}</span>
            <ChevronDown className="w-4 h-4 text-[#F4F4F6]/60 group-hover:text-[#D4AF37] transition-colors" />
          </button>
        </div>

        {/* Proof Bar : Responsive Grid sans déformation (2 cols smartphone, 4 cols tablet/desktop) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 max-w-4xl mx-auto w-full px-1">
          {/* 1. Sur-Mesure */}
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 py-2 px-2 sm:px-3 rounded-full bg-white/[0.03] border border-white/[0.08] text-[10px] sm:text-xs text-[#F4F4F6]/85 font-mono shadow-[0_2px_8px_rgba(0,0,0,0.3)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shrink-0" />
            <span className="text-white font-semibold truncate">{t.hero.custom}</span>
          </div>

          {/* 2. Statistique Monnaie Adaptée à la région */}
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 py-2 px-2 sm:px-3 rounded-full bg-white/[0.03] border border-white/[0.08] text-[10px] sm:text-xs text-[#F4F4F6]/85 font-mono shadow-[0_2px_8px_rgba(0,0,0,0.3)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shrink-0" />
            <span className="text-white font-semibold">{currencyConfig.heroStat.amount}</span>
            <span className="text-[#F4F4F6]/50 hidden sm:inline truncate">
              {language === 'fr' ? 'Générés' : 'Value'}
            </span>
          </div>

          {/* 3. Simplicité */}
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 py-2 px-2 sm:px-3 rounded-full bg-white/[0.03] border border-white/[0.08] text-[10px] sm:text-xs text-[#F4F4F6]/85 font-mono shadow-[0_2px_8px_rgba(0,0,0,0.3)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shrink-0" />
            <span className="text-white font-semibold truncate">{t.hero.simplicity}</span>
          </div>

          {/* 4. Maquette Avant Travaux */}
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 py-2 px-2 sm:px-3 rounded-full bg-white/[0.03] border border-white/[0.08] text-[10px] sm:text-xs text-[#F4F4F6]/85 font-mono shadow-[0_2px_8px_rgba(0,0,0,0.3)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shrink-0" />
            <span className="text-white font-semibold truncate">{t.hero.guarantee}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
