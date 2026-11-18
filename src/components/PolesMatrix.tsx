import React from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency } from '../context/CurrencyContext';
import { PoleId, POLE_PRICING_CATALOG } from '../utils/pricingEngine';

interface PolesMatrixProps {
  selectedPoles: PoleId[];
  onTogglePole: (poleId: PoleId) => void;
  onSeeEstimate: () => void;
}

export const PolesMatrix: React.FC<PolesMatrixProps> = ({
  selectedPoles,
  onTogglePole,
  onSeeEstimate,
}) => {
  const { t } = useLanguage();
  const { formatPrice } = useCurrency();

  return (
    <section
      id="services"
      className="py-20 sm:py-28 px-5 sm:px-8 bg-[#EEF3F0]/60 border-b border-[#DCE4E0]"
    >
      <div className="max-w-6xl mx-auto">
        <div className="max-w-2xl mb-14 space-y-3">
          <h2 className="title text-[clamp(2rem,4vw,3.25rem)] text-[#0B241D]">
            {t.services.title}
          </h2>
          <p className="text-base sm:text-lg text-[#50645D]">{t.services.intro}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {t.services.items.map((service) => {
            const spec = POLE_PRICING_CATALOG[service.id];
            const active = selectedPoles.includes(service.id);

            return (
              <button
                key={service.id}
                type="button"
                onClick={() => onTogglePole(service.id)}
                aria-pressed={active}
                className={`text-left p-7 sm:p-8 rounded-2xl border transition-all press cursor-pointer flex flex-col justify-between gap-6 ${
                  active
                    ? 'bg-[#0E3A2F] border-[#0E3A2F] text-white on-dark shadow-lg'
                    : 'bg-white border-[#DCE4E0] hover:border-[#0B241D]/30 text-[#0B241D]'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
                      {service.name}
                    </h3>
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 border ${
                        active
                          ? 'bg-[#F77F00] border-[#F77F00] text-[#0B241D]'
                          : 'border-[#DCE4E0]'
                      }`}
                    >
                      {active && <Check className="w-3.5 h-3.5 stroke-[2.5]" />}
                    </span>
                  </div>

                  <p
                    className={`text-sm sm:text-base leading-relaxed ${
                      active ? 'text-white/80' : 'text-[#50645D]'
                    }`}
                  >
                    {service.line}
                  </p>
                </div>

                <div
                  className={`pt-4 border-t text-xs sm:text-sm font-medium tnum ${
                    active
                      ? 'border-white/15 text-[#F77F00]'
                      : 'border-[#DCE4E0] text-[#50645D]'
                  }`}
                >
                  {t.services.from(formatPrice(spec.minXof))}
                </div>
              </button>
            );
          })}
        </div>

        {selectedPoles.length > 0 && (
          <div className="mt-10 flex justify-start">
            <button
              type="button"
              onClick={onSeeEstimate}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#0E3A2F] hover:text-[#F77F00] transition-colors cursor-pointer"
            >
              <span>{t.services.seeEstimate(selectedPoles.length)}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
