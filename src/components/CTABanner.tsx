import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, CheckCircle2, MessageSquare } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface CTABannerProps {
  onOpenProjectModal: () => void;
  onScrollToContact: () => void;
}

export const CTABanner: React.FC<CTABannerProps> = ({
  onOpenProjectModal,
  onScrollToContact,
}) => {
  const { language } = useLanguage();
  const isFr = language === 'fr';

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-8 bg-[#F7F4EE] border-b border-[#E2DDD5]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-2xl bg-[#181512] text-[#F7F4EE] border border-[#2C2621] p-8 sm:p-14 lg:p-16 relative overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: High-Impact Proposition */}
            <div className="lg:col-span-7 space-y-4">
              <p className="text-xs sm:text-sm font-semibold text-[#D49B6A]">
                {isFr
                  ? 'Démarrage Immédiat · Devis Gratuit & Sans Engagement'
                  : 'Immediate Onboarding · Free No-Obligation Estimate'}
              </p>

              <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#F7F4EE] leading-[1.12] tracking-tight [text-wrap:balance]">
                {isFr
                  ? 'Prêt à transformer votre ambition en une plateforme digitale de référence ?'
                  : 'Ready to turn your vision into a flagship digital platform?'}
              </h2>

              <p className="text-sm sm:text-base text-[#C8C1B6] leading-relaxed max-w-2xl">
                {isFr
                  ? 'Échangez directement avec notre équipe. Vous recevez sous 4 heures ouvrées une feuille de route claire, un calendrier de livraison précis et un budget transparent adapté à votre région.'
                  : 'Speak directly with our team. Within 4 business hours, you receive a plain-language roadmap, a clear delivery timeline, and a transparent estimate calibrated to your region.'}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-[#C8C1B6]">
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#D49B6A]" />
                  <span>{isFr ? 'Maquette validée avant code' : 'Visual mockup before code'}</span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#D49B6A]" />
                  <span>{isFr ? '100% Propriétaire dès le 1er jour' : '100% Ownership from day one'}</span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#D49B6A]" />
                  <span>{isFr ? 'NDA & Confidentialité garantie' : 'Guaranteed NDA protection'}</span>
                </span>
              </div>
            </div>

            {/* Right Column: Clear Primary & Secondary CTAs */}
            <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-3.5 justify-end">
              <button
                type="button"
                onClick={onOpenProjectModal}
                className="min-h-[54px] px-7 py-4 rounded-xl bg-[#A64B2A] hover:bg-[#8E3D20] text-[#F7F4EE] text-sm font-semibold inline-flex items-center justify-center gap-2.5 transition-colors cursor-pointer shadow-sm whitespace-nowrap shrink-0"
              >
                <span>
                  {isFr ? 'Obtenir mon devis gratuit en 2 min' : 'Get My Free Quote in 2 Min'}
                </span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onScrollToContact}
                className="min-h-[50px] px-7 py-3.5 rounded-xl bg-[#221E1A] hover:bg-[#2C2621] border border-[#3D352E] text-[#F7F4EE] text-xs sm:text-sm font-semibold inline-flex items-center justify-center gap-2 transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                <MessageSquare className="w-4 h-4 text-[#D49B6A]" />
                <span>
                  {isFr ? 'Remplir le formulaire détaillé' : 'Complete Detailed Inquiry Form'}
                </span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
