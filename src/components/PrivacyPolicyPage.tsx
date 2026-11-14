import React from 'react';
import { ArrowLeft, ShieldCheck, Lock, EyeOff, Award, Trash2, Cookie, Mail } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { useLanguage } from '../context/LanguageContext';

interface PrivacyPolicyPageProps {
  onReturnHome: () => void;
  onNavigateTerms: () => void;
}

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({
  onReturnHome,
  onNavigateTerms,
}) => {
  const { language, setLanguage } = useLanguage();
  const isFr = language === 'fr';

  const sections = isFr
    ? [
        {
          icon: Lock,
          number: '01',
          title: 'Accord de Non-Divulgation Immédiat (NDA Automatique)',
          content:
            'Dès que vous nous soumettez votre projet via notre formulaire de contact, toutes les informations transmises (concept commercial, modèle économique, cahier des charges, budget, documents) sont couvertes de plein droit par une obligation stricte de secret professionnel. Ouest Dynamics s’interdit de divulguer, reproduire ou exploiter vos idées pour le compte d’un tiers.',
        },
        {
          icon: EyeOff,
          number: '02',
          title: 'Données Collectées & Finalité Exclusive',
          content:
            'Nous collectons uniquement les données que vous renseignez volontairement : votre nom complet, le nom de votre entreprise ou projet, votre adresse email professionnelle, le pôle de service souhaité, votre tranche budgétaire et le descriptif de votre besoin. Ces informations servent exclusivement à étudier votre demande et à vous transmettre une proposition commerciale personnalisée sous 4 heures ouvrées. Aucune donnée n’est vendue, louée ou cédée à des courtiers publicitaires.',
        },
        {
          icon: ShieldCheck,
          number: '03',
          title: 'Sécurité du Stockage & Protection Anti-Spam',
          content:
            'Vos demandes sont enregistrées dans notre base de données sécurisée avec un numéro de référence unique (format OD-YYYY-XXXXX). Nos formulaires intègrent une protection anti-spam multi-couches (champ honeypot invisible, contrôle de vélocité, défi de vérification humain et limitation de débit serveur) sans jamais revendre votre empreinte de navigation à des services tiers.',
        },
        {
          icon: Award,
          number: '04',
          title: 'Propriété Intellectuelle Intégrale (100% Client)',
          content:
            'Contrairement aux agences qui retiennent les accès techniques, vous êtes propriétaire à 100% de l’ensemble des livrables conçus pour vous dès le premier jour : code source, maquettes graphiques, logos, bases de données et noms de domaine.',
        },
        {
          icon: Cookie,
          number: '05',
          title: 'Gestion des Cookies & Préférences Locales',
          content:
            'Ce site utilise un stockage local minimaliste pour mémoriser votre langue d’affichage (EN/FR), calibrer automatiquement votre devise régionale (FCFA, EUR, USD, GBP) et enregistrer votre choix concernant la bannière cookies. Vous pouvez modifier ou réinitialiser vos préférences à tout moment.',
        },
        {
          icon: Trash2,
          number: '06',
          title: 'Vos Droits d’Accès, de Rectification et d’Effacement (RGPD / CCPA)',
          content:
            'Conformément aux réglementations internationales sur la protection des données personnelles (RGPD européen, CCPA américain et loi ivoirienne n°2013-450 relative à la protection des données à caractère personnel), vous disposez d’un droit permanent d’accès, de rectification, de portabilité et de suppression définitive de votre dossier.',
        },
      ]
    : [
        {
          icon: Lock,
          number: '01',
          title: 'Immediate Non-Disclosure Protection (Automatic NDA)',
          content:
            'From the moment you submit an inquiry through our contact form, all shared information (business concept, revenue model, specifications, budget, and notes) is automatically protected under strict professional secrecy. Ouest Dynamics never discloses, reproduces, or uses your confidential concepts for any third party.',
        },
        {
          icon: EyeOff,
          number: '02',
          title: 'Data Collected & Exclusive Purpose',
          content:
            'We only collect the information you voluntarily provide: your full name, company or project name, business email address, selected service pillar, budget bracket, and project description. This data is used exclusively to review your project and deliver a tailored proposal within 4 business hours. We never sell, rent, or trade your data to third-party marketers.',
        },
        {
          icon: ShieldCheck,
          number: '03',
          title: 'Database Security & Anti-Spam Protection',
          content:
            'Every inquiry is recorded in our persistent database with a unique tracking reference (OD-YYYY-XXXXX). Our forms enforce multi-layer anti-spam protection (invisible honeypot trap, submission velocity guard, human verification challenge, and server-side rate limiting) without exposing your browsing data to external ad networks.',
        },
        {
          icon: Award,
          number: '04',
          title: '100% Client Intellectual Property Ownership',
          content:
            'Unlike agencies that lock clients into proprietary systems, you own 100% of all deliverables created for your project from day one: source code, visual mockups, brand assets, databases, and domain names.',
        },
        {
          icon: Cookie,
          number: '05',
          title: 'Cookies & Local Preferences Governance',
          content:
            'Our website uses minimal local storage to remember your preferred display language (EN/FR), calibrate your regional currency (USD, EUR, XOF, GBP), and store your cookie consent choice. You may review or reset these preferences at any time.',
        },
        {
          icon: Trash2,
          number: '06',
          title: 'Your Rights to Access, Rectify & Delete (GDPR / CCPA)',
          content:
            'In accordance with international data protection laws (GDPR, CCPA, and West African data protection statutes), you have the permanent right to request a copy, correction, or immediate permanent deletion of your project record.',
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
            <BrandLogo idPrefix="privacy-page" size="md" variant="dark" />
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
              ? 'DOCUMENT OFFICIEL · PROTECTION DES DONNÉES & SECRET PROFESSIONNEL'
              : 'OFFICIAL CHARTER · DATA PRIVACY & NON-DISCLOSURE'}
          </p>
          <h1 className="font-serif-display text-3xl sm:text-5xl font-semibold text-[#161412] tracking-tight mb-4">
            {isFr ? 'Politique de Confidentialité' : 'Privacy & Confidentiality Policy'}
          </h1>
          <p className="text-sm sm:text-base text-[#5C554E] leading-relaxed">
            {isFr
              ? 'Dernière mise à jour : Novembre 2026. Cette charte détaille en langage clair comment Ouest Dynamics protège vos idées, vos coordonnées et votre propriété intellectuelle.'
              : 'Last updated: November 2026. This charter explains in plain language how Ouest Dynamics safeguards your ideas, contact information, and intellectual property.'}
          </p>
        </div>

        <div className="space-y-6">
          {sections.map((sec) => {
            const Icon = sec.icon;
            return (
              <article
                key={sec.number}
                className="p-6 sm:p-8 rounded-xl bg-white border border-[#E2DDD5]"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-[#F7F4EE] border border-[#E2DDD5] flex items-center justify-center text-[#A64B2A] shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-mono-tabular font-semibold text-[#A64B2A] block">
                      Article {sec.number}
                    </span>
                    <h2 className="font-serif-display text-lg sm:text-xl font-semibold text-[#161412]">
                      {sec.title}
                    </h2>
                  </div>
                </div>
                <p className="text-sm sm:text-base text-[#5C554E] leading-relaxed">
                  {sec.content}
                </p>
              </article>
            );
          })}
        </div>

        {/* Direct Privacy Contact Box */}
        <div className="mt-10 p-6 sm:p-8 rounded-xl bg-[#EFECE6] border border-[#E2DDD5] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="font-serif-display text-lg font-semibold text-[#161412] flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#A64B2A]" />
              <span>
                {isFr
                  ? 'Exercer vos droits ou supprimer un dossier'
                  : 'Exercise your rights or delete a record'}
              </span>
            </h3>
            <p className="text-xs sm:text-sm text-[#5C554E]">
              {isFr
                ? 'Contactez notre responsable de la protection des données : privacy@ouestdynamics.com'
                : 'Contact our Data Protection Officer directly at: privacy@ouestdynamics.com'}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onNavigateTerms}
              className="px-4 py-2.5 rounded-lg bg-white border border-[#E2DDD5] hover:border-[#A64B2A] text-xs font-semibold text-[#161412] transition-colors cursor-pointer"
            >
              {isFr ? 'Consulter les CGU →' : 'View Terms of Use →'}
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
              onClick={onNavigateTerms}
              className="hover:text-[#161412] underline underline-offset-4 cursor-pointer"
            >
              {isFr ? 'Conditions Générales d’Utilisation (CGU)' : 'Terms & Conditions (CGU)'}
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
