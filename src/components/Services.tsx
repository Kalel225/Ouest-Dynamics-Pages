import React, { useState } from 'react';
import { ArrowUpRight, Check, X } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

interface ServicesProps {
  onSelectService: (serviceKey: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  const { t, language } = useLanguage();
  const [activeModalId, setActiveModalId] = useState<string | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const activeService = t.services.items.find((item) => item.id === activeModalId);

  const smoothEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.14,
        delayChildren: shouldReduceMotion ? 0 : 0.05,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 28,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.1 : 0.65,
        ease: smoothEase,
      },
    },
  };

  return (
    <section
      id="expertises"
      className="py-20 sm:py-28 px-4 sm:px-8 bg-[#F7F4EE] border-b border-[#E2DDD5]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Editorial Header with Scroll Entrance */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25, margin: '0px 0px -80px 0px' }}
          transition={{ duration: shouldReduceMotion ? 0.1 : 0.6, ease: smoothEase }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 mb-14 sm:mb-20 items-end"
        >
          <div className="lg:col-span-7">
            <p className="text-xs sm:text-sm font-semibold text-[#A64B2A] mb-3">
              {language === 'fr'
                ? 'Chapitre 01 · Nos Domaines d’Intervention'
                : 'Chapter 01 · Core Capabilities'}
            </p>
            <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#161412] tracking-tight leading-[1.12] [text-wrap:balance]">
              {t.services.title}
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-[#5C554E] text-sm sm:text-base leading-relaxed">
              {t.services.subtitle}
            </p>
          </div>
        </motion.div>

        {/* Asymmetric Architectural Bento Grid with Staggered Framer Motion Entrance */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15, margin: '0px 0px -80px 0px' }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8"
        >
          {t.services.items.map((service, idx) => {
            // Asymmetric spans: 01 (7 cols), 02 (5 cols), 03 (5 cols), 04 (7 cols)
            const colSpanClass =
              idx === 0 || idx === 3 ? 'lg:col-span-7' : 'lg:col-span-5';
            const surfaceClass =
              idx === 0
                ? 'bg-white border-[#E2DDD5]'
                : idx === 3
                ? 'bg-[#EFECE6] border-[#E2DDD5]'
                : 'bg-white border-[#E2DDD5]';

            return (
              <motion.article
                key={service.id}
                variants={cardVariants}
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : {
                        y: -4,
                        transition: { duration: 0.18, ease: smoothEase },
                      }
                }
                className={`${colSpanClass} ${surfaceClass} border rounded-xl p-6 sm:p-9 flex flex-col justify-between transition-colors duration-200 hover:border-[#A64B2A]`}
              >
                <div>
                  {/* Clean Unboxed Metadata Header */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-5 mb-6 border-b border-[#E2DDD5] text-xs text-[#5C554E]">
                    <span className="font-mono-tabular font-semibold text-[#A64B2A]">
                      {service.number}. {service.keyBenefit}
                    </span>
                    <span className="font-mono-tabular">{service.turnaround}</span>
                  </div>

                  {/* Editorial Title & Plain-Language Subtitle */}
                  <h3 className="font-serif-display text-2xl sm:text-3xl font-semibold text-[#161412] mb-2 leading-snug">
                    {service.title}
                  </h3>
                  <p className="text-sm font-medium text-[#A64B2A] mb-4">
                    {service.subtitle}
                  </p>
                  <p className="text-sm sm:text-base text-[#5C554E] leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Concrete Deliverables List */}
                  <ul className="space-y-2.5 mb-8">
                    {service.deliverables.map((item, dIdx) => (
                      <li
                        key={dIdx}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-[#161412]"
                      >
                        <Check className="w-4 h-4 text-[#A64B2A] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Bottom Actions */}
                <div className="pt-5 border-t border-[#E2DDD5] flex flex-wrap items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={() => setActiveModalId(service.id)}
                    className="text-xs sm:text-sm font-semibold text-[#5C554E] hover:text-[#161412] underline underline-offset-4 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  >
                    {t.services.detailsBtn}
                  </button>

                  <button
                    type="button"
                    onClick={() => onSelectService(service.id)}
                    className="min-h-[42px] inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#161412] hover:bg-[#A64B2A] text-[#F7F4EE] text-xs font-semibold transition-colors duration-150 cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <span>{t.services.selectBtn}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>

      {/* Plain-Language Service Detail Modal with AnimatePresence */}
      <AnimatePresence>
        {activeService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs"
            onClick={() => setActiveModalId(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16, scale: shouldReduceMotion ? 1 : 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: shouldReduceMotion ? 0 : 12, scale: shouldReduceMotion ? 1 : 0.98 }}
              transition={{ duration: 0.22, ease: smoothEase }}
              className="w-full max-w-2xl bg-[#F7F4EE] border border-[#E2DDD5] rounded-xl shadow-xl overflow-hidden text-[#161412]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-6 sm:px-8 py-5 bg-white border-b border-[#E2DDD5] flex items-center justify-between">
                <div>
                  <p className="text-xs font-mono-tabular text-[#A64B2A] mb-0.5">
                    {activeService.number} · {activeService.turnaround}
                  </p>
                  <h3 className="font-serif-display text-xl sm:text-2xl font-semibold text-[#161412]">
                    {activeService.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveModalId(null)}
                  className="min-h-[40px] min-w-[40px] flex items-center justify-center rounded-lg border border-[#E2DDD5] text-[#5C554E] hover:text-[#161412] cursor-pointer"
                  aria-label={t.services.closeModal}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
                <div>
                  <p className="text-base font-medium text-[#161412] mb-2">
                    {activeService.subtitle}
                  </p>
                  <p className="text-sm text-[#5C554E] leading-relaxed">
                    {activeService.description}
                  </p>
                </div>

                <div className="p-5 rounded-lg bg-white border border-[#E2DDD5]">
                  <h4 className="text-xs font-semibold text-[#A64B2A] mb-3">
                    {t.services.includedTitle}
                  </h4>
                  <ul className="space-y-2.5">
                    {activeService.deliverables.map((del, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-[#161412]">
                        <Check className="w-4 h-4 text-[#A64B2A] shrink-0 mt-0.5" />
                        <span>{del}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-5 rounded-lg bg-[#EFECE6] border border-[#E2DDD5]">
                  <h4 className="text-xs font-semibold text-[#161412] mb-1.5">
                    {t.services.benefitsTitle}
                  </h4>
                  <p className="text-sm text-[#5C554E] leading-relaxed">
                    {activeService.whyChoose}
                  </p>
                </div>
              </div>

              <div className="px-6 sm:px-8 py-4 bg-white border-t border-[#E2DDD5] flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => setActiveModalId(null)}
                  className="px-4 py-2 text-xs font-semibold text-[#5C554E] hover:text-[#161412] cursor-pointer"
                >
                  {t.services.closeModal}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const id = activeService.id;
                    setActiveModalId(null);
                    onSelectService(id);
                  }}
                  className="min-h-[44px] inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#A64B2A] hover:bg-[#8E3D20] text-[#F7F4EE] text-xs font-semibold transition-colors cursor-pointer"
                >
                  <span>{t.services.selectBtn}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
