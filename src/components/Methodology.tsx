import React, { useState } from 'react';
import { CheckCircle2, Eye, Smartphone, Rocket, HeartHandshake, ShieldCheck, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Methodology: React.FC = () => {
  const { t } = useLanguage();
  const [activeStep, setActiveStep] = useState(0);

  const stepIcons = [Eye, Smartphone, Rocket];

  return (
    <section id="methodologie" className="relative py-16 sm:py-24 lg:py-28 px-3.5 sm:px-6 lg:px-8 bg-[#0B0B0B] border-t border-white/[0.06] overflow-hidden">
      {/* Background grid accent */}
      <div 
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#D4AF37 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="h-[1px] w-4 sm:w-6 bg-[#D4AF37]/60" />
            <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] text-[#D4AF37] uppercase font-mono">
              {t.methodology.surtitle}
            </span>
          </div>

          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-[-0.03em] leading-tight mb-3 sm:mb-5">
            {t.methodology.title}
          </h2>

          <p className="text-[#F4F4F6]/80 text-xs sm:text-sm md:text-base leading-relaxed font-body">
            {t.methodology.subtitle}
          </p>
        </div>

        {/* Milestone Steps Navigation - Smooth touch scroll on mobile & tablet, grid on large desktop */}
        <div className="flex lg:grid lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8 mb-10 sm:mb-14 border-b border-white/[0.08] overflow-x-auto pb-4 lg:pb-0 scrollbar-none">
          {t.methodology.steps.map((step, idx) => {
            const Icon = stepIcons[idx] || Eye;
            const isSelected = activeStep === idx;
            return (
              <button
                key={step.number}
                onClick={() => setActiveStep(idx)}
                className={`text-left pb-4 sm:pb-5 transition-all duration-300 cursor-pointer relative -mb-[1px] border-b-2 min-w-[220px] sm:min-w-[240px] lg:min-w-0 shrink-0 ${
                  isSelected
                    ? 'border-[#D4AF37] opacity-100'
                    : 'border-transparent opacity-50 hover:opacity-85 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`font-mono text-xs font-bold tracking-wider ${isSelected ? 'text-[#D4AF37]' : 'text-[#F4F4F6]/50'}`}>
                    {t.methodology.stepPrefix} {step.number}
                  </span>
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-[#D4AF37]' : 'text-[#F4F4F6]/40'}`} />
                </div>

                <h3 className="font-display text-sm sm:text-base font-bold text-white mb-1">
                  {step.title}
                </h3>
                <p className="text-xs text-[#F4F4F6]/60 font-body line-clamp-2">
                  {step.tagline}
                </p>
              </button>
            );
          })}
        </div>

        {/* Active Step Spotlight - Frameless Editorial Layout */}
        <div id="gouvernance" className="transition-all">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
            {/* Left Column: Description & Friendly Checkpoints */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 mb-1">
                <span className="text-xs font-mono font-bold text-[#D4AF37]">
                  {t.methodology.stepPrefix} {t.methodology.steps[activeStep].number} {t.methodology.stepOf}
                </span>
                <span className="text-[#F4F4F6]/30">·</span>
                <span className="text-xs font-mono text-[#F4F4F6]/60">
                  {t.methodology.steps[activeStep].delay}
                </span>
              </div>

              <h3 className="font-display text-lg sm:text-2xl font-bold text-white mb-2">
                {t.methodology.steps[activeStep].title}
              </h3>

              <p className="text-[#F4F4F6]/85 text-xs sm:text-sm md:text-base leading-relaxed mb-6 font-body">
                {t.methodology.steps[activeStep].description}
              </p>

              {/* Simple Checkpoints */}
              <div className="space-y-2.5 mb-6">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-white font-mono">
                  {t.methodology.title === '3 Simple Steps. Zero Stress.' ? 'Key Milestones' : 'Ce qui se passe concrètement'}
                </h4>
                {t.methodology.steps[activeStep].checkpoints.map((cp, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#F4F4F6]/85 font-body">
                    <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                    <span>{cp}</span>
                  </div>
                ))}
              </div>

              {/* Deliverable notice */}
              <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
                <div>
                  <span className="block text-[10px] sm:text-[11px] font-mono uppercase text-[#D4AF37]">
                    {t.methodology.whatYouGet}
                  </span>
                  <span className="text-xs sm:text-sm text-white font-medium">
                    {t.methodology.steps[activeStep].deliverable}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: 3 Reassuring Guarantees (Frameless) */}
            <div className="lg:col-span-5 space-y-4 lg:pl-6 lg:border-l lg:border-white/[0.08]">
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                <span className="text-xs font-mono text-[#D4AF37] uppercase tracking-wider font-semibold">
                  Nos Engagements
                </span>
                <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {t.methodology.simpleStandard}
                </span>
              </div>

              <div className="space-y-4 text-xs font-body">
                {t.methodology.pillars.map((pillar, i) => (
                  <React.Fragment key={i}>
                    {i > 0 && <div className="h-[1px] w-full bg-white/[0.06]" />}
                    <div className="space-y-1">
                      <span className="text-[#D4AF37] block font-mono text-[11px] font-semibold">
                        {pillar.title}
                      </span>
                      <p className="text-[#F4F4F6]/75 text-xs leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
