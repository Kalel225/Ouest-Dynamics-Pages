import React, { useState } from 'react';
import { ArrowUpRight, Globe, Smartphone, Palette, TrendingUp, Check, X, Clock, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ServicesProps {
  onSelectService: (serviceKey: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  const { t } = useLanguage();
  const [activeModalId, setActiveModalId] = useState<string | null>(null);

  // Icon mapping by service ID
  const iconsMap: Record<string, React.ComponentType<{ className?: string }>> = {
    web: Globe,
    mobile: Smartphone,
    design: Palette,
    growth: TrendingUp,
  };

  const activeService = t.services.items.find((item) => item.id === activeModalId);

  return (
    <section id="expertises" className="relative py-20 sm:py-28 px-4 sm:px-8 bg-[#0B0B0B] border-t border-white/[0.06] overflow-hidden">
      {/* Decorative ambient glassmorphic blooms */}
      <div className="absolute top-1/4 -left-20 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-[radial-gradient(circle,_rgba(212,175,55,0.05)_0%,_transparent_70%)] blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-[radial-gradient(circle,_rgba(212,175,55,0.05)_0%,_transparent_70%)] blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-20">
          <div className="inline-flex items-center gap-2 mb-3 sm:mb-4">
            <span className="h-[1px] w-5 sm:w-6 bg-[#D4AF37]/60" />
            <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] text-[#D4AF37] uppercase font-mono">
              {t.services.surtitle}
            </span>
          </div>

          <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold text-white tracking-[-0.03em] leading-tight mb-4 sm:mb-6 [text-wrap:balance]">
            {t.services.title}
          </h2>

          <p className="text-[#F4F4F6]/80 text-sm sm:text-base lg:text-lg leading-relaxed font-body">
            {t.services.subtitle}
          </p>
        </div>

        {/* Grille des 4 pôles - 100% Frameless & Mobile Responsive */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-14 lg:gap-16">
          {t.services.items.map((service) => {
            const Icon = iconsMap[service.id] || Globe;

            return (
              <div
                key={service.id}
                className="group flex flex-col justify-between"
              >
                {/* Top: Header, Number, Icon & Hairline */}
                <div>
                  <div className="flex items-center justify-between pb-3">
                    <div className="flex items-center gap-3">
                      <div className="text-[#D4AF37]">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="font-mono text-xs tracking-wider text-[#F4F4F6]/50 uppercase">
                        {t.services.pole} {service.number}
                      </span>
                    </div>

                    <span className="font-mono text-2xl sm:text-3xl font-light text-[#D4AF37]/40 group-hover:text-[#D4AF37] transition-colors">
                      {service.number}
                    </span>
                  </div>

                  {/* Fine technical hairline separator without card box */}
                  <div className="h-[1px] w-full bg-white/[0.08] group-hover:bg-[#D4AF37]/40 transition-colors mb-5 sm:mb-6" />

                  {/* Title & Subtitle */}
                  <h3 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2 group-hover:text-white transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-medium text-[#D4AF37] mb-4 sm:mb-5 font-mono">
                    {service.subtitle}
                  </p>

                  {/* Description in plain words */}
                  <p className="text-[#F4F4F6]/85 text-sm sm:text-base leading-relaxed mb-6 font-body">
                    {service.description}
                  </p>

                  {/* Deliverable bullets */}
                  <div className="space-y-2.5 mb-6 sm:mb-8">
                    {service.deliverables.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#F4F4F6]/80">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#D4AF37] shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Row / Metric & Actions */}
                <div className="pt-4 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-3">
                  {/* Metric indicator */}
                  <div>
                    <div className="font-mono text-base sm:text-lg font-bold text-white flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>{service.keyBenefit}</span>
                    </div>
                    <div className="text-[10px] sm:text-[11px] text-[#F4F4F6]/50 font-mono">
                      {service.keyBenefitLabel}
                    </div>
                  </div>

                  {/* Frameless Text Action Links with high-touch area */}
                  <div className="flex items-center gap-3 sm:gap-4">
                    <button
                      onClick={() => setActiveModalId(service.id)}
                      className="min-h-[44px] px-2 flex items-center text-xs font-mono text-[#F4F4F6]/70 hover:text-white transition-colors cursor-pointer"
                    >
                      {t.services.detailsBtn}
                    </button>
                    <button
                      onClick={() => onSelectService(service.id)}
                      className="min-h-[44px] px-3 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#D4AF37] hover:text-[#E2C255] transition-colors cursor-pointer group/btn"
                    >
                      <span>{t.services.selectBtn}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal for In-Depth Service Details (Beginner Friendly) */}
      {activeService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B0B0B]/85 backdrop-blur-xl animate-in fade-in duration-200">
          <div className="bg-[#121212]/95 backdrop-blur-2xl border border-white/[0.1] rounded-3xl max-w-2xl w-full p-6 sm:p-9 relative shadow-[0_25px_60px_rgba(0,0,0,0.95)] max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setActiveModalId(null)}
              className="absolute top-5 right-5 min-w-[44px] min-h-[44px] rounded-full bg-white/[0.04] hover:bg-white/[0.1] border border-white/[0.08] flex items-center justify-center text-[#F4F4F6]/60 hover:text-white transition-colors cursor-pointer"
              aria-label={t.services.closeModal}
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header */}
            <div className="mb-6">
              <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest block mb-1">
                {t.services.pole} {activeService.number} · {t.services.modalTitle}
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
                {activeService.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#D4AF37] mt-1 font-mono">
                {activeService.subtitle}
              </p>
            </div>

            <p className="text-sm text-[#F4F4F6]/85 leading-relaxed mb-6 font-body">
              {activeService.description}
            </p>

            {/* Turnaround badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-[#D4AF37] mb-6">
              <Clock className="w-3.5 h-3.5" />
              <span>{activeService.turnaround}</span>
            </div>

            {/* What's included */}
            <div className="space-y-3 mb-6">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-white font-mono">
                {t.services.includedTitle}
              </h4>
              <div className="space-y-2">
                {activeService.deliverables.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#F4F4F6]/85 font-body">
                    <Check className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Why your business will love it */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] mb-6">
              <h5 className="text-xs font-mono uppercase text-[#D4AF37] mb-1.5">
                {t.services.benefitsTitle}
              </h5>
              <p className="text-xs sm:text-sm text-[#F4F4F6]/80 leading-relaxed font-body">
                {activeService.whyChoose}
              </p>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
              <button
                onClick={() => setActiveModalId(null)}
                className="px-5 py-2.5 min-h-[44px] text-xs font-mono text-[#F4F4F6]/60 hover:text-white transition-colors cursor-pointer"
              >
                {t.services.closeModal}
              </button>

              <button
                onClick={() => {
                  onSelectService(activeService.id);
                  setActiveModalId(null);
                }}
                className="min-h-[48px] inline-flex items-center gap-2 px-7 py-3 text-xs font-semibold uppercase tracking-wider text-[#0B0B0B] bg-[#D4AF37] hover:bg-[#E2C255] rounded-full transition-all cursor-pointer shadow-[0_4px_15px_rgba(212,175,55,0.3)]"
              >
                <span>{t.services.selectBtn}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
