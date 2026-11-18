import React, { useState } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { PoleId } from '../utils/pricingEngine';
import { CaseStudy } from '../i18n/fr';

interface PortfolioSectionProps {
  onEstimateSimilar: (pole: PoleId) => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({
  onEstimateSimilar,
}) => {
  const { t } = useLanguage();
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);

  return (
    <section
      id="work"
      className="py-16 sm:py-24 px-5 sm:px-8 bg-[#EFECE6] border-b border-[#141311]/10"
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-10 pb-6 border-b border-[#141311]/10 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <h2 className="display-section text-2xl sm:text-3xl text-[#141311]">
            {t.work.title}
          </h2>
          <p className="text-sm text-[#141311]/60">{t.work.intro}</p>
        </div>

        <div className="divide-y divide-[#141311]/10 border-b border-[#141311]/10">
          {t.work.cases.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelectedCase(item)}
              className="w-full py-5 px-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left cursor-pointer hover:bg-[#E4DFD5] transition-colors group"
            >
              <div className="flex items-baseline gap-5">
                <span className="text-xs tnum text-[#141311]/45">0{idx + 1}</span>
                <div>
                  <div className="text-base font-semibold text-[#141311] tracking-[-0.01em]">
                    {item.client}
                  </div>
                  <div className="text-xs text-[#141311]/60 mt-0.5">
                    {item.sector} — {item.city}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-8 shrink-0">
                <div className="text-left sm:text-right">
                  <span className="text-xl font-semibold text-[#141311] tnum block">
                    {item.metric.value}
                  </span>
                  <span className="text-[11px] text-[#141311]/55">{item.metric.label}</span>
                </div>
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#E4DFD5] group-hover:bg-[#141311] group-hover:text-[#EFECE6] text-xs font-medium text-[#141311] transition-colors">
                  <span>{t.work.read}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {selectedCase && (
        <div
          className="fixed inset-0 z-[70] bg-[#141311]/50 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
          onClick={() => setSelectedCase(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={selectedCase.client}
            className="w-full max-w-lg bg-[#EFECE6] text-[#141311] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-5 border-b border-[#141311]/12 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs text-[#141311]/55 mb-1">
                  {selectedCase.sector} — {selectedCase.city}
                </p>
                <h3 className="display-section text-2xl text-[#141311]">
                  {selectedCase.client}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCase(null)}
                className="min-h-[34px] min-w-[34px] flex items-center justify-center bg-[#E4DFD5] hover:bg-[#141311] hover:text-[#EFECE6] text-[#141311] transition-colors cursor-pointer"
                aria-label={t.work.close}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
              <div className="grid grid-cols-3 gap-4 py-4 border-y border-[#141311]/12">
                {selectedCase.figures.map((fig, idx) => (
                  <div key={idx}>
                    <div className="text-2xl font-semibold text-[#141311] tnum">{fig.value}</div>
                    <div className="text-xs text-[#141311]/60 mt-0.5">{fig.label}</div>
                  </div>
                ))}
              </div>

              <div className="space-y-4 text-sm">
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-[0.08em] text-[#141311]/55 mb-1">
                    {t.work.challenge}
                  </h4>
                  <p className="text-[#141311]/85 leading-relaxed">{selectedCase.challenge}</p>
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-[0.08em] text-[#141311]/55 mb-1">
                    {t.work.solution}
                  </h4>
                  <p className="text-[#141311]/85 leading-relaxed">{selectedCase.solution}</p>
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-[0.08em] text-[#141311] mb-1">
                    {t.work.result}
                  </h4>
                  <p className="text-[#141311] font-medium leading-relaxed">{selectedCase.result}</p>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 bg-[#E4DFD5]/60 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => setSelectedCase(null)}
                className="px-3.5 py-2 hover:bg-[#E4DFD5] text-xs font-medium text-[#141311]/70 hover:text-[#141311] transition-colors cursor-pointer"
              >
                {t.work.close}
              </button>
              <button
                type="button"
                onClick={() => {
                  const pole = selectedCase.pole;
                  setSelectedCase(null);
                  onEstimateSimilar(pole);
                }}
                className="px-5 py-2.5 bg-[#141311] hover:bg-[#2C2925] text-[#EFECE6] text-xs font-medium uppercase tracking-[0.1em] press cursor-pointer"
              >
                {t.work.similar}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
