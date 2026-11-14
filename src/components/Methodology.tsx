import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Methodology: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <section
      id="methodologie"
      className="py-16 sm:py-24 px-4 sm:px-8 bg-[#F7F4EE] border-b border-[#E2DDD5]"
    >
      <div className="max-w-5xl mx-auto">
        {/* Minimalist Editorial Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 sm:mb-16"
        >
          <p className="text-xs sm:text-sm font-semibold text-[#A64B2A] mb-2.5">
            {language === 'fr'
              ? 'Chapitre 03 · Processus en 3 Étapes Simples'
              : 'Chapter 03 · Transparent 3-Step Process'}
          </p>
          <h2 className="font-serif-display text-3xl sm:text-4xl font-semibold text-[#161412] tracking-tight leading-[1.14] max-w-2xl [text-wrap:balance]">
            {t.methodology.title}
          </h2>
        </motion.div>

        {/* Ultra-Clean 3-Row Editorial Progression (No Dense Side-by-Side Cards) */}
        <div className="divide-y divide-[#E2DDD5] border-y border-[#E2DDD5]">
          {t.methodology.steps.map((step, idx) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.55,
                delay: idx * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="py-7 sm:py-9 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-baseline group"
            >
              {/* Col 1: Numeral & Timeline (3 cols) */}
              <div className="md:col-span-3 flex items-baseline gap-3">
                <span className="font-serif-display text-2xl sm:text-3xl font-semibold text-[#A64B2A] font-mono-tabular">
                  {step.number}
                </span>
                <span className="text-xs font-mono-tabular text-[#5C554E]">
                  · {step.delay}
                </span>
              </div>

              {/* Col 2: Step Title & Concise Explanation (6 cols) */}
              <div className="md:col-span-6">
                <h3 className="font-serif-display text-xl sm:text-2xl font-semibold text-[#161412] mb-1.5 group-hover:text-[#A64B2A] transition-colors">
                  {step.title}
                </h3>
                <p className="text-sm text-[#5C554E] leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Col 3: Single Concrete Deliverable (3 cols) */}
              <div className="md:col-span-3 md:text-right pt-1 md:pt-0">
                <span className="text-[11px] uppercase tracking-wider text-[#5C554E] block mb-0.5">
                  {t.methodology.whatYouGet}
                </span>
                <span className="text-xs sm:text-sm font-semibold text-[#161412]">
                  {step.deliverable}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Compact Single-Line Contractual Guarantee Strip */}
        <motion.div
          id="gouvernance"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm text-[#5C554E]"
        >
          <div className="inline-flex items-center gap-2 font-semibold text-[#161412]">
            <ShieldCheck className="w-4 h-4 text-[#A64B2A] shrink-0" />
            <span>
              {language === 'fr' ? 'Garanties Incluses :' : 'Included Guarantees:'}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
            {t.methodology.pillars.map((pillar, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && <span aria-hidden="true" className="text-[#E2DDD5]">·</span>}
                <span>{pillar.title}</span>
              </React.Fragment>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
