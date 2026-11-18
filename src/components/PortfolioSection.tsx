import React, { useState } from 'react';
import { ArrowRight, X } from 'lucide-react';
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
      className="py-20 sm:py-28 px-5 sm:px-8 bg-white border-b border-[#DCE4E0]"
    >
      <div className="max-w-6xl mx-auto">
        <div className="max-w-2xl mb-14 space-y-3">
          <h2 className="title text-[clamp(2rem,4vw,3.25rem)] text-[#0B241D]">
            {t.work.title}
          </h2>
          <p className="text-base sm:text-lg text-[#50645D]">{t.work.intro}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {t.work.cases.map((item) => (
            <article
              key={item.id}
              className="p-7 sm:p-8 rounded-2xl border border-[#DCE4E0] hover:border-[#0B241D]/30 transition-colors flex flex-col justify-between gap-6 bg-white"
            >
              <div className="space-y-4">
                <div className="flex items-baseline justify-between gap-3 text-xs text-[#50645D]">
                  <span className="font-semibold text-[#0E3A2F]">{item.client}</span>
                  <span>
                    {item.sector} · {item.city}
                  </span>
                </div>

                <div>
                  <div className="display text-4xl sm:text-5xl text-[#0B241D] tnum">
                    {item.metric.value}
                  </div>
                  <div className="text-xs sm:text-sm font-medium text-[#50645D] mt-1">
                    {item.metric.label}
                  </div>
                </div>

                <p className="text-sm sm:text-base text-[#0B241D]/85 leading-relaxed">
                  {item.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-[#DCE4E0] flex flex-wrap items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => setSelectedCase(item)}
                  className="text-xs sm:text-sm font-semibold text-[#0B241D] hover:text-[#F77F00] transition-colors cursor-pointer"
                >
                  {t.work.read}
                </button>

                <button
                  type="button"
                  onClick={() => onEstimateSimilar(item.pole)}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#0E3A2F] hover:text-[#F77F00] transition-colors cursor-pointer"
                >
                  <span>{t.work.similar}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {selectedCase && (
        <div
          className="fixed inset-0 z-[70] bg-[#0B241D]/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          onClick={() => setSelectedCase(null)}
        >
          <div
            className="w-full max-w-xl rounded-2xl bg-white border border-[#DCE4E0] text-[#0B241D] shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-5 border-b border-[#DCE4E0] flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-medium text-[#50645D] mb-1">
                  {selectedCase.sector} · {selectedCase.city}
                </p>
                <h3 className="title text-2xl text-[#0B241D]">{selectedCase.client}</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCase(null)}
                className="min-h-[36px] min-w-[36px] flex items-center justify-center rounded-full border border-[#DCE4E0] text-[#50645D] hover:text-[#0B241D] cursor-pointer"
                aria-label={t.work.close}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
              <div className="grid grid-cols-3 gap-4 py-4 border-y border-[#DCE4E0]">
                {selectedCase.figures.map((fig, idx) => (
                  <div key={idx}>
                    <div className="title text-2xl sm:text-3xl text-[#0E3A2F] tnum">
                      {fig.value}
                    </div>
                    <div className="text-xs text-[#50645D] mt-0.5">{fig.label}</div>
                  </div>
                ))}
              </div>

              <div className="space-y-4 text-sm">
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#50645D] mb-1">
                    {t.work.challenge}
                  </h4>
                  <p className="text-[#0B241D]/85 leading-relaxed">{selectedCase.challenge}</p>
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#50645D] mb-1">
                    {t.work.solution}
                  </h4>
                  <p className="text-[#0B241D]/85 leading-relaxed">{selectedCase.solution}</p>
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#00875A] mb-1">
                    {t.work.result}
                  </h4>
                  <p className="text-[#0B241D] font-medium leading-relaxed">
                    {selectedCase.result}
                  </p>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 bg-[#EEF3F0]/60 border-t border-[#DCE4E0] flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => setSelectedCase(null)}
                className="text-xs font-medium text-[#50645D] hover:text-[#0B241D] cursor-pointer"
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
                className="px-5 py-2.5 rounded-full bg-[#F77F00] hover:bg-[#E07100] text-[#0B241D] text-xs font-semibold inline-flex items-center gap-1.5 press cursor-pointer"
              >
                <span>{t.work.similar}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
