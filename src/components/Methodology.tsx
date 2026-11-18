import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Methodology: React.FC = () => {
  const { t } = useLanguage();
  const [showGuarantees, setShowGuarantees] = useState(false);

  return (
    <section
      id="process"
      className="py-16 sm:py-24 px-5 sm:px-8 bg-[#EFECE6] border-b border-[#141311]/10"
    >
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="pb-6 border-b border-[#141311]/10">
          <h2 className="display-section text-2xl sm:text-3xl text-[#141311]">
            {t.process.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {t.process.steps.map((step, idx) => (
            <div key={idx} className="space-y-2 border-l border-[#141311]/15 pl-5">
              <div className="flex items-center justify-between text-xs text-[#141311]/55 tnum">
                <span className="font-semibold text-[#141311]">0{idx + 1}</span>
                <span>{step.duration}</span>
              </div>
              <h3 className="text-base font-semibold text-[#141311]">{step.title}</h3>
              <p className="text-sm text-[#141311]/65 leading-relaxed">{step.text}</p>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-[#141311]/10">
          <button
            type="button"
            onClick={() => setShowGuarantees((prev) => !prev)}
            aria-expanded={showGuarantees}
            className="px-4 py-2 bg-[#E4DFD5] hover:bg-[#D8D1C4] inline-flex items-center gap-2 text-xs font-medium text-[#141311] press cursor-pointer"
          >
            <span>{t.process.guaranteesToggle}</span>
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform duration-200 ${
                showGuarantees ? 'rotate-180' : ''
              }`}
            />
          </button>

          {showGuarantees && (
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {t.process.guarantees.map((item, idx) => (
                <div key={idx} className="text-sm text-[#141311]/75 border-l border-[#141311] pl-3">
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
