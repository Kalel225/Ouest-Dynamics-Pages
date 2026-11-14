import React from 'react';
import { ArrowLeft, ArrowUpRight, Compass } from 'lucide-react';
import { motion } from 'motion/react';
import { BrandLogo } from './BrandLogo';
import { useLanguage } from '../context/LanguageContext';

interface NotFoundPageProps {
  onReturnHome: () => void;
  onNavigateSection: (sectionId: string) => void;
  onOpenProjectModal: () => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({
  onReturnHome,
  onNavigateSection,
  onOpenProjectModal,
}) => {
  const { language, setLanguage } = useLanguage();
  const isFr = language === 'fr';

  return (
    <div className="min-h-screen bg-[#F7F4EE] text-[#161412] flex flex-col justify-between px-4 sm:px-8 py-6 sm:py-10">
      {/* Top Bar */}
      <header className="max-w-7xl w-full mx-auto flex items-center justify-between pb-5 border-b border-[#E2DDD5]">
        <button
          type="button"
          onClick={onReturnHome}
          className="cursor-pointer text-left focus-visible:outline-2 focus-visible:outline-[#A64B2A]"
        >
          <BrandLogo size="md" variant="dark" />
        </button>

        <div className="flex items-center gap-3">
          <div className="inline-flex items-center p-1 bg-[#EFECE6] rounded-lg border border-[#E2DDD5]">
            <button
              type="button"
              onClick={() => setLanguage('en')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                language === 'en'
                  ? 'bg-white text-[#161412] shadow-xs'
                  : 'text-[#5C554E] hover:text-[#161412]'
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLanguage('fr')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                language === 'fr'
                  ? 'bg-white text-[#161412] shadow-xs'
                  : 'text-[#5C554E] hover:text-[#161412]'
              }`}
            >
              FR
            </button>
          </div>

          <button
            type="button"
            onClick={onReturnHome}
            className="min-h-[40px] px-4 py-2 rounded-lg bg-[#161412] hover:bg-[#A64B2A] text-[#F7F4EE] text-xs font-semibold inline-flex items-center gap-2 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{isFr ? 'Retour à l’accueil' : 'Back to Home'}</span>
          </button>
        </div>
      </header>

      {/* Main 404 Architectural Monograph Card */}
      <main className="max-w-4xl w-full mx-auto my-12 sm:my-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white border border-[#E2DDD5] rounded-xl p-6 sm:p-12 shadow-xs"
        >
          <div className="flex flex-wrap items-center justify-between gap-2 pb-5 mb-8 border-b border-[#E2DDD5] text-xs font-mono-tabular text-[#5C554E]">
            <span className="font-semibold text-[#A64B2A]">
              {isFr ? 'ERREUR 404 · PAGE INTROUVABLE' : 'ERROR 404 · PAGE NOT FOUND'}
            </span>
            <span>Ouest Dynamics</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5">
              <div className="font-serif-display text-6xl sm:text-8xl font-semibold text-[#A64B2A] font-mono-tabular leading-none mb-3">
                404.
              </div>
              <p className="text-xs font-mono-tabular text-[#5C554E]">
                {isFr
                  ? 'Coordonnées hors du plan directeur'
                  : 'Coordinates outside master plan'}
              </p>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <div>
                <h1 className="font-serif-display text-2xl sm:text-4xl font-semibold text-[#161412] leading-tight mb-3 [text-wrap:balance]">
                  {isFr
                    ? 'Cette adresse ne correspond à aucune galerie de notre atelier.'
                    : 'This address does not match any gallery in our studio.'}
                </h1>
                <p className="text-sm sm:text-base text-[#5C554E] leading-relaxed">
                  {isFr
                    ? 'Le lien que vous avez suivi a peut-être été déplacé ou renommé. Vous pouvez rejoindre directement l’accueil, parcourir nos réalisations ou démarrer votre projet ci-dessous.'
                    : 'The link you followed may have been moved or renamed. You can return directly to the main studio, explore our selected works, or start your project below.'}
                </p>
              </div>

              {/* Primary Recovery Actions */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={onReturnHome}
                  className="min-h-[48px] px-6 py-3 rounded-lg bg-[#A64B2A] hover:bg-[#8E3D20] text-[#F7F4EE] text-xs sm:text-sm font-semibold inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>{isFr ? 'Revenir à l’accueil principal' : 'Return to Main Studio'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onReturnHome();
                    setTimeout(() => onOpenProjectModal(), 80);
                  }}
                  className="min-h-[48px] px-6 py-3 rounded-lg bg-[#EFECE6] hover:bg-[#161412] text-[#161412] hover:text-[#F7F4EE] border border-[#E2DDD5] text-xs sm:text-sm font-semibold inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <span>{isFr ? 'Demander un devis gratuit' : 'Request a Free Quote'}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>

              {/* Quick Directory Links */}
              <div className="pt-6 border-t border-[#E2DDD5]">
                <p className="text-xs font-semibold text-[#161412] mb-3 flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-[#A64B2A]" />
                  <span>
                    {isFr ? 'Accès rapide aux chapitres :' : 'Quick chapter directory:'}
                  </span>
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                  <button
                    type="button"
                    onClick={() => onNavigateSection('expertises')}
                    className="p-2.5 rounded-lg bg-[#F7F4EE] border border-[#E2DDD5] hover:border-[#A64B2A] text-left font-medium text-[#161412] transition-colors cursor-pointer"
                  >
                    01. {isFr ? 'Services' : 'Services'}
                  </button>
                  <button
                    type="button"
                    onClick={() => onNavigateSection('portfolio')}
                    className="p-2.5 rounded-lg bg-[#F7F4EE] border border-[#E2DDD5] hover:border-[#A64B2A] text-left font-medium text-[#161412] transition-colors cursor-pointer"
                  >
                    02. {isFr ? 'Réalisations' : 'Portfolio'}
                  </button>
                  <button
                    type="button"
                    onClick={() => onNavigateSection('methodologie')}
                    className="p-2.5 rounded-lg bg-[#F7F4EE] border border-[#E2DDD5] hover:border-[#A64B2A] text-left font-medium text-[#161412] transition-colors cursor-pointer"
                  >
                    03. {isFr ? 'Méthode' : 'Process'}
                  </button>
                  <button
                    type="button"
                    onClick={() => onNavigateSection('contact')}
                    className="p-2.5 rounded-lg bg-[#F7F4EE] border border-[#E2DDD5] hover:border-[#A64B2A] text-left font-medium text-[#161412] transition-colors cursor-pointer"
                  >
                    04. {isFr ? 'Contact' : 'Contact'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Bottom Bar */}
      <footer className="max-w-7xl w-full mx-auto pt-5 border-t border-[#E2DDD5] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#5C554E]">
        <span>© {new Date().getFullYear()} Ouest Dynamics.</span>
        <span>
          {isFr
            ? 'Ingénierie Web, Applications Mobiles & Design'
            : 'Web Engineering, Mobile Apps & Brand Design'}
        </span>
      </footer>
    </div>
  );
};
