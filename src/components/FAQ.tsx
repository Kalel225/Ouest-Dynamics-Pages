import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface FAQProps {
  onScrollToContact?: () => void;
}

export const FAQ: React.FC<FAQProps> = ({ onScrollToContact }) => {
  const { language } = useLanguage();
  const isFr = language === 'fr';
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqItems = isFr
    ? [
        {
          question:
            'Dois-je avoir des connaissances en informatique pour gérer mon site ou mon application après la livraison ?',
          answer:
            'Absolument pas. Nous concevons chaque projet avec un espace d’administration visuel ultra-intuitif (modifier un texte, ajouter une photo ou suivre vos ventes se fait aussi simplement que sur un réseau social). De plus, nous vous remettons un guide vidéo personnalisé et formons votre équipe à la livraison.',
        },
        {
          question:
            'Comment fonctionne la garantie « Maquette visuelle validée avant développement » ?',
          answer:
            'Avant d’écrire la moindre ligne de code, nous dessinons l’intégralité de votre futur site ou application sous forme de maquette interactive. Vous pouvez cliquer, tester l’ergonomie et demander toutes les modifications visuelles souhaitées jusqu’à validation complète.',
        },
        {
          question:
            'Comment se déroule le règlement et puis-je payer en plusieurs étapes ?',
          answer:
            'Oui. Aucun paiement intégral n’est demandé d’avance. L’investissement est réparti en 3 jalons transparents : 40% au lancement de l’étude et du design, 30% après votre validation officielle de la maquette interactive, et 30% à la mise en ligne finale.',
        },
        {
          question:
            'Suis-je propriétaire à 100% de mon site, de mon nom de domaine et des créations ?',
          answer:
            'Oui, sans aucune restriction ni abonnement caché envers notre agence. Dès la livraison finale, vous détenez 100% de la propriété intellectuelle : code source, design, visuels, bases de données et accès d’hébergement.',
        },
        {
          question:
            'Quels sont les délais moyens pour concevoir et mettre en ligne un projet ?',
          answer:
            'Un site vitrine ou une identité visuelle complète est généralement livré en 2 à 4 semaines. Une boutique e-commerce ou une application web/mobile sur-mesure prend entre 4 et 8 semaines selon les fonctionnalités souhaitées. Un calendrier précis est fixé dès le premier jour.',
        },
        {
          question:
            'Que se passe-t-il après la mise en ligne si j’ai besoin d’aide ou de nouveautés ?',
          answer:
            'Chaque réalisation inclut 6 mois de garantie technique gratuite couvrant la sécurité, les mises à jour de stabilité et la correction immédiate de toute anomalie. Au-delà, nous restons disponibles à la demande pour faire évoluer votre plateforme.',
        },
      ]
    : [
        {
          question:
            'Do I need any technical skills to manage my website or application after launch?',
          answer:
            'Not at all. Every platform we build includes a clean, plain-language visual dashboard where updating text, photos, products, or orders is as simple as posting on social media. We also provide a recorded video walkthrough and live training for your team upon delivery.',
        },
        {
          question:
            'How does the "Visual Mockup Approved Before Engineering" guarantee work?',
          answer:
            'Before writing a single line of code, we design an interactive visual prototype of your entire website or app. You can click through every screen on your computer or phone and request adjustments until you are 100% delighted with the look and feel.',
        },
        {
          question:
            'How are payments structured across the project timeline?',
          answer:
            'We never require full payment upfront. Project investments are structured into three clear milestones: 40% at kickoff and strategy, 30% upon your formal approval of the interactive design mockup, and 30% upon final testing and launch.',
        },
        {
          question:
            'Do I own 100% of my website, source code, and brand assets?',
          answer:
            'Yes, unconditionally. Unlike agencies that lock you into proprietary rental systems, full intellectual property—including all source code, custom designs, domain names, and databases—is transferred 100% to your company upon completion.',
        },
        {
          question:
            'How long does it typically take to design and launch a project?',
          answer:
            'A bespoke showcase website or brand identity typically launches in 2 to 4 weeks. Custom e-commerce platforms and web/mobile applications generally take 4 to 8 weeks depending on scope. You receive a fixed delivery schedule before we begin.',
        },
        {
          question:
            'What happens after launch if I need technical support or future updates?',
          answer:
            'Every project includes a complimentary 6-month technical warranty covering performance monitoring, security patches, and bug resolution at zero extra cost. Afterward, our team remains available on-demand whenever you wish to expand your platform.',
        },
      ];

  const toggleItem = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section
      id="faq"
      className="py-16 sm:py-24 px-4 sm:px-8 bg-[#F7F4EE] border-b border-[#E2DDD5]"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Editorial Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16"
        >
          <div>
            <p className="text-xs sm:text-sm font-semibold text-[#A64B2A] mb-2.5">
              {isFr
                ? 'Chapitre 04 · Questions Fréquentes (FAQ)'
                : 'Chapter 04 · Frequently Asked Questions'}
            </p>
            <h2 className="font-serif-display text-3xl sm:text-4xl font-semibold text-[#161412] tracking-tight leading-[1.14] [text-wrap:balance]">
              {isFr
                ? 'Tout savoir avant de lancer votre projet.'
                : 'Clear answers before we begin.'}
            </h2>
          </div>

          {onScrollToContact && (
            <button
              type="button"
              onClick={onScrollToContact}
              className="self-start md:self-end inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#A64B2A] hover:text-[#161412] underline underline-offset-4 transition-colors cursor-pointer shrink-0"
            >
              <span>
                {isFr ? 'Poser une autre question' : 'Ask another question'}
              </span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          )}
        </motion.div>

        {/* Accordion List */}
        <div className="divide-y divide-[#E2DDD5] border-y border-[#E2DDD5]">
          {faqItems.map((item, idx) => {
            const isOpen = openIndex === idx;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.5,
                  delay: idx * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <button
                  type="button"
                  onClick={() => toggleItem(idx)}
                  aria-expanded={isOpen}
                  className="w-full py-5 sm:py-6 flex items-start justify-between gap-6 text-left cursor-pointer group"
                >
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono-tabular text-xs font-semibold text-[#A64B2A] shrink-0">
                      0{idx + 1}
                    </span>
                    <span className="font-serif-display text-lg sm:text-xl font-semibold text-[#161412] group-hover:text-[#A64B2A] transition-colors">
                      {item.question}
                    </span>
                  </div>

                  <span
                    className={`mt-1 w-7 h-7 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                      isOpen
                        ? 'bg-[#A64B2A] border-[#A64B2A] text-[#F7F4EE]'
                        : 'bg-[#EFECE6] border-[#E2DDD5] text-[#161412] group-hover:border-[#A64B2A]'
                    }`}
                  >
                    {isOpen ? (
                      <Minus className="w-3.5 h-3.5" />
                    ) : (
                      <Plus className="w-3.5 h-3.5" />
                    )}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 pl-8 sm:pl-9 pr-4 text-sm sm:text-base text-[#5C554E] leading-relaxed max-w-3xl">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
