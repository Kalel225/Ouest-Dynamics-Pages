import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Methodology: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section
      id="governance"
      className="py-16 sm:py-24 px-4 sm:px-8 bg-[#0B0D12] border-b border-[#D4AF37]/18"
    >
      <div className="max-w-[1280px] mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <p className="text-xs sm:text-[13px] font-mono-code font-semibold text-[#D4AF37] mb-3">
            {t.methodology.sectionKicker}
          </p>
          <h2 className="font-display text-[clamp(1.75rem,3vw,2.75rem)] font-bold text-[#F4F4F6] leading-[1.12] tracking-tight mb-4 [text-wrap:balance]">
            {t.methodology.title}
          </h2>
          <p className="text-base text-[#A1A7B5] leading-relaxed">
            {t.methodology.subtitle}
          </p>
        </div>

        {/* Part 1: Core & Elastic Guilds 3-Row Progression */}
        <div className="mb-14">
          <h3 className="text-xs sm:text-[13px] font-mono-code font-semibold text-[#D4AF37] mb-5">
            {t.methodology.guildModelTitle}
          </h3>

          <div className="divide-y divide-[#D4AF37]/18 border-y border-[#D4AF37]/18">
            {t.methodology.guildSteps.map((item) => (
              <div
                key={item.step}
                className="py-7 sm:py-8 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-baseline"
              >
                <div className="md:col-span-3 flex items-baseline gap-3">
                  <span className="font-mono-code text-2xl sm:text-3xl font-bold text-[#D4AF37]">
                    {item.step}
                  </span>
                  <span className="font-mono-code text-xs text-[#A1A7B5]">
                    · {item.duration}
                  </span>
                </div>

                <div className="md:col-span-6">
                  <h4 className="font-display text-lg sm:text-xl font-bold text-[#F4F4F6] mb-1.5">
                    {item.title}
                  </h4>
                  <p className="text-sm text-[#A1A7B5] leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="md:col-span-3 md:text-right">
                  <span className="text-xs font-mono-code text-[#D4AF37] block">
                    {item.deliverable}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Part 2: The 4 Contractual Governance Clauses */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
            <h3 className="text-xs sm:text-[13px] font-mono-code font-semibold text-[#F4F4F6]">
              {t.methodology.guaranteesTitle}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.methodology.guarantees.map((clause) => (
              <div
                key={clause.code}
                className="rounded-[12px] bg-[#141821] border border-[#D4AF37]/18 p-6 flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono-code text-xs font-semibold text-[#D4AF37] block mb-3">
                    {clause.code}
                  </span>
                  <h4 className="font-display text-base sm:text-lg font-bold text-[#F4F4F6] mb-2.5">
                    {clause.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#A1A7B5] leading-relaxed">
                    {clause.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
