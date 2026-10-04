import React, { useState } from 'react';
import { ArrowUpRight, Globe, Smartphone, Palette, TrendingUp, Check, X } from 'lucide-react';
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
      <div className="absolute top-1/4 -left-20 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-[radial-gradient(circle,_rgba(212,175,55,0.06)_0%,_transparent_70%)] blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-[radial-gradient(circle,_rgba(212,175,55,0.06)_0%,_transparent_70%)] blur-3xl pointer-events-none" />

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

        {/* Grille des 4 domaines d'excellence - 100% Frameless & Mobile Responsive */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-12 lg:gap-16">
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

                    <span className="font-mono text-2xl sm:text-3xl font-light text-[#D4AF37]/50 group-hover:text-[#D4AF37] transition-colors">
                      {service.number}
                    </span>
                  </div>

                  {/* Fine technical hairline separator without card box */}
                  <div className="h-[1px] w-full bg-white/[0.08] group-hover:bg-[#D4AF37]/40 transition-colors mb-5 sm:mb-6" />

                  {/* Title & Subtitle */}
                  <h3 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2 group-hover:text-white transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs font-medium uppercase tracking-wider text-[#D4AF37] mb-4 sm:mb-5 font-mono">
                    {service.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-[#F4F4F6]/80 text-sm sm:text-base leading-relaxed mb-6 font-body">
                    {service.description}
                  </p>

                  {/* Key deliverable bullets */}
                  <div className="space-y-2.5 mb-6 sm:mb-8">
                    {service.deliverables.slice(0, 3).map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#F4F4F6]/80">
                        <span className="mt-1.5 w-1.5 h-1.5 bg-[#D4AF37] shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Row / Metric & Actions */}
                <div className="pt-4 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-3">
                  {/* Metric indicator */}
                  <div>
                    <div className="font-mono text-base sm:text-lg font-bold text-white">
                      {service.keyMetric}
                    </div>
                    <div className="text-[10px] sm:text-[11px] text-[#F4F4F6]/50 font-mono">
                      {service.metricLabel}
                    </div>
                  </div>

                  {/* Frameless Text Action Links with high-touch area */}
                  <div className="flex items-center gap-4 sm:gap-5">
                    <button
                      onClick={() => setActiveModalId(service.id)}
                      className="min-h-[44px] flex items-center text-xs font-mono text-[#F4F4F6]/60 hover:text-white transition-colors cursor-pointer"
                    >
                      {t.services.detailsBtn}
                    </button>
                    <button
                      onClick={() => onSelectService(service.id)}
                      className="min-h-[44px] inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#D4AF37] hover:text-[#E2C255] transition-colors cursor-pointer group/btn"
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

      {/* Modal for In-Depth Service Specifications */}
      {activeService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B0B0B]/85 backdrop-blur-xl animate-in fade-in duration-200">
          <div className="bg-[#121212]/95 backdrop-blur-2xl border border-white/[0.1] rounded-3xl max-w-2xl w-full p-6 sm:p-10 relative shadow-[0_25px_60px_rgba(0,0,0,0.95)] max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveModalId(null)}
              className="absolute top-5 right-5 sm:top-6 sm:right-6 min-w-[40px] min-h-[40px] rounded-full bg-white/[0.04] hover:bg-white/[0.1] border border-white/[0.08] flex items-center justify-center text-[#F4F4F6]/60 hover:text-white transition-colors cursor-pointer"
              aria-label={t.services.closeModal}
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-start justify-between mb-6 pb-4 border-b border-white/[0.08]">
              <div>
                <span className="text-[11px] font-mono uppercase text-[#D4AF37] tracking-wider">
                  {t.services.modalTitle} · {t.services.pole} {activeService.number}
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-white mt-1">
                  {activeService.title}
                </h3>
                <p className="text-xs text-[#D4AF37] mt-0.5 font-mono">
                  {activeService.subtitle}
                </p>
              </div>
            </div>

            <p className="text-sm text-[#F4F4F6]/85 mb-6 leading-relaxed font-body">
              {activeService.description}
            </p>

            <div className="mb-6">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-3">
                {t.services.deliverablesTitle}
              </h4>
              <ul className="space-y-2">
                {activeService.deliverables.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-[#F4F4F6]/80 font-body">
                    <Check className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-8 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <span className="text-[11px] font-mono uppercase text-[#D4AF37] block mb-2">
                {t.services.techStackTitle}
              </span>
              <div className="flex flex-wrap gap-2">
                {activeService.techStack.map((tech, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 text-xs font-mono rounded-md bg-white/[0.04] text-[#F4F4F6]/80 border border-white/[0.06]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/[0.08]">
              <div>
                <div className="font-mono text-xl font-bold text-white">
                  {activeService.keyMetric}
                </div>
                <div className="text-xs text-[#F4F4F6]/60 font-mono">
                  {activeService.metricLabel}
                </div>
              </div>

              <button
                onClick={() => {
                  const id = activeService.id;
                  setActiveModalId(null);
                  onSelectService(id);
                }}
                className="w-full sm:w-auto min-h-[44px] inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#0B0B0B] bg-[#D4AF37] hover:bg-[#E2C255] rounded-full transition-all cursor-pointer shadow-[0_4px_15px_rgba(212,175,55,0.3)]"
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
