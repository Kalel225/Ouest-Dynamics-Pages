import React from 'react';
import { Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Methodology: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section
      id="process"
      className="py-20 sm:py-28 px-5 sm:px-8 bg-[#0E3A2F] text-white on-dark"
    >
      <div className="max-w-6xl mx-auto">
        <div className="max-w-2xl mb-14">
          <h2 className="title text-[clamp(2rem,4vw,3.25rem)] text-white">
            {t.process.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-16 border-b border-white/15">
          {t.process.steps.map((step, idx) => (
            <div key={idx} className="space-y-3">
              <div className="flex items-baseline justify-between gap-2 text-xs text-white/60 tnum">
                <span className="font-semibold text-[#F77F00]">0{idx + 1}</span>
                <span>{step.duration}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                {step.title}
              </h3>
              <p className="text-sm sm:text-base text-white/75 leading-relaxed">
                {step.text}
              </p>
            </div>
          ))}
        </div>

        <div className="pt-12">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[#F77F00] mb-6">
            {t.process.guaranteesTitle}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.process.guarantees.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-sm text-white/85 leading-relaxed">
                <Check className="w-4 h-4 text-[#F77F00] shrink-0 mt-1" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
