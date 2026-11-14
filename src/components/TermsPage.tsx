import React from 'react';
import { ArrowLeft, FileText, Scale, CheckCircle2, ShieldAlert, Globe, Award } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { useLanguage } from '../context/LanguageContext';

interface TermsPageProps {
  onReturnHome: () => void;
  onNavigatePrivacy: () => void;
}

export const TermsPage: React.FC<TermsPageProps> = ({
  onReturnHome,
  onNavigatePrivacy,
}) => {
  const { language, setLanguage } = useLanguage();
  const isFr = language === 'fr';

  const articles = isFr
    ? [
        {
          icon: FileText,
          number: '01',
          title: 'Objet & Présentation du Service',
          content:
            'Les présentes Conditions Générales d’Utilisation et de Prestation (CGU) encadrent l’accès au site Ouest Dynamics ainsi que les modalités de collaboration pour la conception de sites web, boutiques e-commerce, applications mobiles, identités visuelles et stratégies de croissance digitale.',
        },
        {
          icon: CheckCircle2,
          number: '02',
          title: 'Validation sur Maquette Avant Développement',
          content:
            'Chaque projet débute par une phase d’écoute et de maquettage visuel. Aucun développement technique définitif n’est engagé avant la validation écrite de la maquette par le client. Ce fonctionnement garantit zéro mauvaise surprise sur le design et l’ergonomie finale.',
        },
        {
          icon: Award,
          number: '03',
          title: 'Transfert Intégral de Propriété Intellectuelle',
          content:
            'À la livraison et au règlement complet de la prestation convenue, Ouest Dynamics cède au client 100% des droits patrimoniaux sur le code source spécifique, les créations graphiques, les bases de données et les noms de domaine associés au projet.',
        },
        {
          icon: Globe,
          number: '04',
          title: 'Tarification, Devises & Modalités de Règlement',
          content:
            'Les estimations budgétaires affichées sur le site s’adaptent automatiquement à la région du visiteur (Franc CFA XOF, Euro EUR, Dollar USD, Livre GBP) à titre indicatif. Chaque mission fait l’objet d’un devis forfaitaire clair et détaillé, payable selon un échéancier lié aux étapes de validation du projet.',
        },
        {
          icon: ShieldAlert,
          number: '05',
          title: 'Garantie de Bon Fonctionnement (30 Jours Offerts)',
          content:
            'Après la mise en ligne officielle du projet, Ouest Dynamics assure un suivi technique gratuit de 30 jours calendaires comprenant la correction immédiate de toute anomalie éventuelle et l’accompagnement à la prise en main de votre outil.',
        },
        {
          icon: Scale,
          number: '06',
          title: 'Utilisation Loyale du Site & Protection Anti-Spam',
          content:
            'L’utilisateur s’engage à fournir des informations exactes lors d’une demande de devis et à ne pas tenter d’entraver le bon fonctionnement du site par des envois automatisés (robots, scripts ou spam). Tout abus est automatiquement filtré et bloqué par notre serveur.',
        },
      ]
    : [
        {
          icon: FileText,
          number: '01',
          title: 'Purpose & Scope of Services',
          content:
            'These Terms & Conditions of Use (CGU) govern access to the Ouest Dynamics website as well as the engagement framework for bespoke websites, e-commerce platforms, mobile applications, brand identities, and digital growth services.',
        },
        {
          icon: CheckCircle2,
          number: '02',
          title: 'Visual Mockup Approval Prior to Engineering',
          content:
            'Every engagement begins with a discovery and visual mockup phase. No production coding starts until the client explicitly approves the visual preview, guaranteeing total alignment on design and user experience.',
        },
        {
          icon: Award,
          number: '03',
          title: 'Full Transfer of Intellectual Property',
          content:
            'Upon project completion and final settlement, Ouest Dynamics transfers 100% ownership of the custom source code, visual identity assets, databases, and domain names directly to the client.',
        },
        {
          icon: Globe,
          number: '04',
          title: 'Pricing, Regional Currencies & Payment Milestones',
          content:
            'Budget brackets displayed on the site automatically calibrate to the visitor’s region (USD, EUR, XOF, GBP) for convenience. Every project is governed by a fixed-price written proposal paid across clear milestone approvals.',
        },
        {
          icon: ShieldAlert,
          number: '05',
          title: '30-Day Complimentary Post-Launch Warranty',
          content:
            'Following official launch, Ouest Dynamics provides 30 calendar days of complimentary post-launch care, including immediate resolution of any technical issue and hands-on training for your team.',
        },
        {
          icon: Scale,
          number: '06',
          title: 'Fair Use & Anti-Spam Enforcement',
          content:
            'Visitors agree to provide accurate contact details when requesting a quote and must not attempt automated scraping, bot submissions, or spam against our forms. Automated abuse is actively blocked at the server level.',
        },
      ];

  return (
    <div className="min-h-screen bg-[#F7F4EE] text-[#161412] flex flex-col justify-between">
      {/* Top Bar */}
      <header className="sticky top-0 z-40 bg-[#F7F4EE]/95 backdrop-blur-md border-b border-[#E2DDD5] px-4 sm:px-8 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={onReturnHome}
            className="cursor-pointer text-left"
          >
            <BrandLogo idPrefix="terms-page" size="md" variant="dark" />
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
              <span>{isFr ? 'Retour au site' : 'Back to Site'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl w-full mx-auto px-4 sm:px-8 py-12 sm:py-20">
        <div className="mb-12 pb-8 border-b border-[#E2DDD5]">
          <p className="text-xs font-mono-tabular font-semibold text-[#A64B2A] mb-3">
            {isFr
              ? 'CADRE CONTRACTUEL · CONDITIONS GÉNÉRALES D’UTILISATION (CGU)'
              : 'CONTRACTUAL FRAMEWORK · TERMS & CONDITIONS OF USE (CGU)'}
          </p>
          <h1 className="font-serif-display text-3xl sm:text-5xl font-semibold text-[#161412] tracking-tight mb-4">
            {isFr
              ? 'Conditions Générales d’Utilisation & de Prestation'
              : 'Terms & Conditions of Use and Service'}
          </h1>
          <p className="text-sm sm:text-base text-[#5C554E] leading-relaxed">
            {isFr
              ? 'Dernière mise à jour : Novembre 2026. Des règles transparentes, équilibrées et rédigées sans jargon juridique opaque.'
              : 'Last updated: November 2026. Transparent, balanced terms written in clear, everyday language.'}
          </p>
        </div>

        <div className="space-y-6">
          {articles.map((art) => {
            const Icon = art.icon;
            return (
              <article
                key={art.number}
                className="p-6 sm:p-8 rounded-xl bg-white border border-[#E2DDD5]"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-[#F7F4EE] border border-[#E2DDD5] flex items-center justify-center text-[#A64B2A] shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-mono-tabular font-semibold text-[#A64B2A] block">
                      Article {art.number}
                    </span>
                    <h2 className="font-serif-display text-lg sm:text-xl font-semibold text-[#161412]">
                      {art.title}
                    </h2>
                  </div>
                </div>
                <p className="text-sm sm:text-base text-[#5C554E] leading-relaxed">
                  {art.content}
                </p>
              </article>
            );
          })}
        </div>

        {/* Bottom Switch Box */}
        <div className="mt-10 p-6 sm:p-8 rounded-xl bg-[#EFECE6] border border-[#E2DDD5] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h3 className="font-serif-display text-lg font-semibold text-[#161412] mb-1">
              {isFr
                ? 'Protection de vos idées & de vos données'
                : 'Protection of your ideas & personal data'}
            </h3>
            <p className="text-xs sm:text-sm text-[#5C554E]">
              {isFr
                ? 'Consultez également notre charte de confidentialité et d’accord de non-divulgation (NDA).'
                : 'Also review our Privacy Charter and automatic Non-Disclosure Agreement (NDA).'}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onNavigatePrivacy}
              className="px-4 py-2.5 rounded-lg bg-white border border-[#E2DDD5] hover:border-[#A64B2A] text-xs font-semibold text-[#161412] transition-colors cursor-pointer"
            >
              {isFr ? 'Politique de Confidentialité →' : 'Privacy Policy →'}
            </button>
            <button
              type="button"
              onClick={onReturnHome}
              className="px-5 py-2.5 rounded-lg bg-[#A64B2A] hover:bg-[#8E3D20] text-[#F7F4EE] text-xs font-semibold transition-colors cursor-pointer"
            >
              {isFr ? 'Retour à l’accueil' : 'Return Home'}
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#E2DDD5] px-4 sm:px-8 py-6 text-xs text-[#5C554E]">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>© {new Date().getFullYear()} Ouest Dynamics.</span>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={onNavigatePrivacy}
              className="hover:text-[#161412] underline underline-offset-4 cursor-pointer"
            >
              {isFr ? 'Politique de Confidentialité' : 'Privacy Policy'}
            </button>
            <span>·</span>
            <button
              type="button"
              onClick={onReturnHome}
              className="hover:text-[#161412] underline underline-offset-4 cursor-pointer"
            >
              {isFr ? 'Accueil' : 'Home'}
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
