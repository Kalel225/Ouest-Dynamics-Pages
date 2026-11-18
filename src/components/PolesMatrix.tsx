import React from 'react';
import { Check, ArrowUpRight, Layers, Cpu } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency } from '../context/CurrencyContext';
import {
  PoleId,
  TransverseModifierId,
  POLE_PRICING_CATALOG,
} from '../utils/pricingEngine';

interface PolesMatrixProps {
  selectedPoles: PoleId[];
  selectedModifiers: TransverseModifierId[];
  onTogglePoleAndScroll: (poleId: PoleId) => void;
  onToggleModifierAndScroll: (modId: TransverseModifierId) => void;
}

export const PolesMatrix: React.FC<PolesMatrixProps> = ({
  selectedPoles,
  selectedModifiers,
  onTogglePoleAndScroll,
  onToggleModifierAndScroll,
}) => {
  const { t, language } = useLanguage();
  const { formatFromXof } = useCurrency();

  return (
    <section
      id="poles"
      className="py-16 sm:py-24 px-4 sm:px-8 bg-[#0B0D12] border-b border-[#D4AF37]/18"
    >
      <div className="max-w-[1280px] mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <p className="text-xs sm:text-[13px] font-mono-code font-semibold text-[#D4AF37] mb-3">
            {t.polesMatrix.sectionKicker}
          </p>
          <h2 className="font-display text-[clamp(1.75rem,3vw,2.75rem)] font-bold text-[#F4F4F6] leading-[1.12] tracking-tight mb-4 [text-wrap:balance]">
            {t.polesMatrix.title}
          </h2>
          <p className="text-base text-[#A1A7B5] leading-relaxed">
            {t.polesMatrix.subtitle}
          </p>
        </div>

        {/* Upper Band: 2 Transverse Engines (Direction Artistique Executive & Ingénierie IA / n8n) */}
        <div className="mb-12">
          <div className="flex items-center justify-between gap-4 mb-4">
            <h3 className="text-xs sm:text-[13px] font-mono-code font-semibold text-[#D4AF37]">
              {t.polesMatrix.transverseHeader}
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {t.polesMatrix.transverseEngines.map((engine, idx) => {
              const isSelected = selectedModifiers.includes(engine.id);
              const EngineIcon = idx === 0 ? Layers : Cpu;

              return (
                <div
                  key={engine.id}
                  className={`rounded-[12px] p-6 sm:p-7 transition-colors duration-180 border flex flex-col justify-between ${
                    isSelected
                      ? 'bg-[#1B202C] border-[#D4AF37]'
                      : 'bg-[#141821] hover:bg-[#1B202C] border-[#D4AF37]/22'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-3 pb-4 mb-4 border-b border-[#D4AF37]/15">
                      <span className="font-mono-code text-xs font-semibold text-[#D4AF37]">
                        {engine.code}
                      </span>
                      <EngineIcon className="w-4 h-4 text-[#D4AF37]" />
                    </div>

                    <h4 className="font-display text-xl font-bold text-[#F4F4F6] mb-2">
                      {engine.title}
                    </h4>

                    <p className="text-sm text-[#A1A7B5] leading-relaxed mb-5">
                      {engine.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#D4AF37]/15 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-2 text-xs font-mono-code text-[#A1A7B5]">
                      {engine.specs.map((spec, sIdx) => (
                        <React.Fragment key={sIdx}>
                          {sIdx > 0 && <span aria-hidden="true">·</span>}
                          <span>{spec}</span>
                        </React.Fragment>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => onToggleModifierAndScroll(engine.id)}
                      className={`px-3.5 py-2 rounded-[6px] text-xs font-semibold inline-flex items-center gap-1.5 transition-colors duration-180 cursor-pointer whitespace-nowrap shrink-0 ${
                        isSelected
                          ? 'bg-[#D4AF37] text-[#0B0D12]'
                          : 'bg-[#0B0D12] text-[#F4F4F6] border border-[#D4AF37]/30 hover:border-[#D4AF37]'
                      }`}
                    >
                      <span>
                        {isSelected
                          ? language === 'fr'
                            ? 'Moteur activé dans le Brief'
                            : 'Engine Enabled in Brief'
                          : language === 'fr'
                          ? 'Activer ce moteur'
                          : 'Enable Engine'}
                      </span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Lower Bento Grid: The 4 Execution Poles */}
        <div>
          <div className="flex items-center justify-between gap-4 mb-4">
            <h3 className="text-xs sm:text-[13px] font-mono-code font-semibold text-[#A1A7B5]">
              {t.polesMatrix.polesHeader}
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {t.polesMatrix.poles.map((pole, idx) => {
              const pricing = POLE_PRICING_CATALOG[pole.id];
              const isSelected = selectedPoles.includes(pole.id);
              // Asymmetric Bento spans: 01 (5 cols), 02 (7 cols), 03 (7 cols), 04 (5 cols)
              const colSpan =
                idx === 1 || idx === 2 ? 'lg:col-span-7' : 'lg:col-span-5';

              return (
                <article
                  key={pole.id}
                  className={`${colSpan} rounded-[12px] p-6 sm:p-7 border transition-colors duration-180 flex flex-col justify-between ${
                    isSelected
                      ? 'bg-[#1B202C] border-[#D4AF37]'
                      : 'bg-[#141821] hover:bg-[#1B202C] border-[#D4AF37]/18'
                  }`}
                >
                  <div>
                    {/* Unboxed Metadata Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-5 border-b border-[#D4AF37]/15 text-xs font-mono-code">
                      <span className="text-[#D4AF37] font-semibold">
                        {pole.number} · {pole.id}
                      </span>
                      <span className="text-[#A1A7B5]">
                        {t.polesMatrix.deliveryLabel} {pricing.minDays}–{pricing.maxDays}{' '}
                        {t.polesMatrix.daysUnit}
                      </span>
                    </div>

                    <h4 className="font-display text-xl sm:text-2xl font-bold text-[#F4F4F6] mb-1.5">
                      {pole.title}
                    </h4>
                    <p className="text-xs sm:text-sm font-medium text-[#D4AF37] mb-4">
                      {pole.subtitle}
                    </p>
                    <p className="text-sm text-[#A1A7B5] leading-relaxed mb-6">
                      {pole.description}
                    </p>

                    <ul className="space-y-2.5 mb-7">
                      {pole.deliverables.map((item, dIdx) => (
                        <li
                          key={dIdx}
                          className="flex items-start gap-2.5 text-xs sm:text-sm text-[#F4F4F6]"
                        >
                          <Check className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Card Footer: Real-Time Converted Indicative Range + Configurator Action */}
                  <div className="pt-5 border-t border-[#D4AF37]/15 flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <span className="block text-[11px] text-[#A1A7B5]">
                        {t.polesMatrix.indicativeRangeLabel}
                      </span>
                      <span className="font-mono-code text-sm sm:text-base font-semibold text-[#F4F4F6]">
                        {formatFromXof(pricing.minXof)} – {formatFromXof(pricing.maxXof)}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => onTogglePoleAndScroll(pole.id)}
                      className={`min-h-[40px] px-4 py-2 rounded-[6px] text-xs font-semibold inline-flex items-center gap-2 transition-colors duration-180 cursor-pointer whitespace-nowrap shrink-0 ${
                        isSelected
                          ? 'bg-[#D4AF37] text-[#0B0D12]'
                          : 'bg-[#0B0D12] hover:bg-[#D4AF37] text-[#F4F4F6] hover:text-[#0B0D12] border border-[#D4AF37]/30'
                      }`}
                    >
                      <span>
                        {isSelected
                          ? t.polesMatrix.selectedInConfigurator
                          : t.polesMatrix.selectInConfigurator}
                      </span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
