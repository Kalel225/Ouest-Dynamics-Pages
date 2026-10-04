import React from 'react';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import { Hero3DBackground } from './Hero3DBackground';
import { useLanguage } from '../context/LanguageContext';

interface HeroProps {
  onOpenProjectModal: () => void;
  onExploreServices: () => void;
  isLoaded?: boolean;
}

export const Hero: React.FC<HeroProps> = ({ onOpenProjectModal, onExploreServices, isLoaded = true }) => {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-[90vh] sm:min-h-[92vh] flex flex-col justify-center items-center pt-28 sm:pt-36 pb-16 sm:pb-20 px-4 sm:px-8 overflow-hidden bg-[#0B0B0B]">
      {/* 3D Animated Background - Re-intégré au niveau du Hero */}
      <Hero3DBackground />

      {/* Background Subtle Luxury Lighting & Grid */}
      <div className="absolute inset-0 pointer-events-none z-[1]">
        {/* Soft champagne radial bloom at center top */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[320px] sm:w-[800px] h-[300px] sm:h-[500px] bg-[radial-gradient(ellipse_at_center,_rgba(212,175,55,0.09)_0%,_rgba(11,11,11,0)_70%)] blur-3xl opacity-80" />
        
        {/* Hairline subtle geometric grid */}
        <div 
          className="absolute inset-0 opacity-[0.025]"
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
        <div className="inline-flex items-center gap-2 mb-5 sm:mb-8">
          <span className="h-[1px] w-4 sm:w-10 bg-[#D4AF37]/60" />
          <span className="text-[10px] sm:text-xs font-semibold tracking-[0.2em] sm:tracking-[0.22em] text-[#D4AF37] uppercase font-mono">
            {t.hero.surtitle}
          </span>
          <span className="h-[1px] w-4 sm:w-10 bg-[#D4AF37]/60" />
        </div>

        {/* Titre H1 (Plus Jakarta Sans, Blanc Pur) - Standard US & Responsive Fluide */}
        <h1 className="font-display text-3xl sm:text-5xl lg:text-7xl font-bold text-white tracking-[-0.03em] leading-[1.12] sm:leading-[1.08] mb-6 sm:mb-8 max-w-4xl mx-auto [text-wrap:balance]">
          {t.hero.title}
        </h1>

        {/* Sous-titre (Gris Perle) */}
        <p className="text-sm sm:text-lg lg:text-xl text-[#F4F4F6]/85 font-normal leading-relaxed max-w-3xl mx-auto mb-8 sm:mb-12 font-body [text-wrap:balance] px-2 sm:px-0">
          {t.hero.subtitle}
        </p>

        {/* Double CTA (Frameless Minimal Luxury, Touch-Friendly) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mb-12 sm:mb-16 w-full sm:w-auto px-4 sm:px-0">
          {/* Bouton principal (Fond Or Champagne, texte Noir Obsidienne) */}
          <button
            onClick={onOpenProjectModal}
            className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-3 px-8 sm:px-9 py-3.5 sm:py-4 text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#0B0B0B] bg-[#D4AF37] hover:bg-[#E2C255] active:bg-[#E2C255] rounded-full transition-all duration-200 cursor-pointer shadow-[0_4px_25px_rgba(212,175,55,0.35)] hover:shadow-[0_6px_35px_rgba(212,175,55,0.5)] group"
          >
            <span>{t.hero.ctaPrimary}</span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>

          {/* Bouton secondaire (Sans cadre, pur & élégant) */}
          <button
            onClick={onExploreServices}
            className="w-full sm:w-auto min-h-[44px] inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs sm:text-sm font-medium tracking-wide text-white hover:text-[#D4AF37] transition-all duration-200 cursor-pointer group"
          >
            <span>{t.hero.ctaSecondary}</span>
            <ChevronDown className="w-4 h-4 text-[#F4F4F6]/60 group-hover:text-[#D4AF37] transition-colors" />
          </button>
        </div>

        {/* Clean Proof & Standard Metas - Totalement sans cadre & Responsive */}
        <div className="inline-flex flex-wrap items-center justify-center gap-y-2.5 gap-x-4 sm:gap-x-8 text-[11px] sm:text-xs text-[#F4F4F6]/70 font-mono px-2 sm:px-0">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shrink-0" />
            <span className="text-[#FFFFFF]">{t.hero.sla}</span>
            <span className="text-[#F4F4F6]/50 hidden xs:inline">{t.hero.slaSub}</span>
          </div>
          <span className="text-white/20">|</span>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shrink-0" />
            <span className="text-[#FFFFFF]">{t.hero.volume}</span>
            <span className="text-[#F4F4F6]/50 hidden xs:inline">{t.hero.volumeSub}</span>
          </div>
          <span className="text-white/20 hidden sm:inline">|</span>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shrink-0" />
            <span className="text-[#FFFFFF]">{t.hero.code}</span>
            <span className="text-[#F4F4F6]/50 hidden xs:inline">{t.hero.codeSub}</span>
          </div>
          <span className="text-white/20">|</span>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shrink-0" />
            <span className="text-[#FFFFFF]">{t.hero.figma}</span>
            <span className="text-[#F4F4F6]/50 hidden xs:inline">{t.hero.figmaSub}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
