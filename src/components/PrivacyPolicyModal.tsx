import React from 'react';
import { X, ShieldCheck, CheckCircle2, Lock, EyeOff, FileText, Award, Trash2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  referenceCode?: string;
  clientName?: string;
}

export const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({
  isOpen,
  onClose,
  referenceCode,
  clientName,
}) => {
  const { language } = useLanguage();

  if (!isOpen) return null;

  const isFr = language === 'fr';

  const pillars = isFr
    ? [
        {
          icon: Lock,
          title: '01. Accord de Non-Divulgation Immédiat (NDA Automatique)',
          desc: 'Dès la réception de votre demande, votre idée de projet, votre concept commercial et vos informations stratégiques sont couverts par le secret professionnel strict.',
        },
        {
          icon: EyeOff,
          title: '02. Zéro Revente de Données & Zéro Prospection Intrusive',
          desc: 'Vos coordonnées (nom, email, entreprise) servent uniquement à préparer votre étude et votre devis. Elles ne sont jamais partagées, louées ou vendues à des tiers.',
        },
        {
          icon: ShieldCheck,
          title: '03. Stockage Sécurisé & Gouvernance des Données',
          desc: 'Vos informations sont enregistrées dans notre base de données dédiée avec numéro de dossier unique et accès strictement restreint à votre directeur de projet.',
        },
        {
          icon: Award,
          title: '04. Propriété Intellectuelle 100% Client dès le Premier Jour',
          desc: 'Tout ce que nous concevons pour vous (site web, application, code source, design, nom de domaine) vous appartient intégralement, sans blocage ni frais cachés.',
        },
        {
          icon: Trash2,
          title: '05. Droit d’Accès, de Modification et d’Effacement (RGPD / CCPA)',
          desc: 'Sur simple demande à privacy@ouestdynamics.com, vous pouvez consulter ou demander la suppression immédiate et définitive de votre dossier.',
        },
      ]
    : [
        {
          icon: Lock,
          title: '01. Immediate Non-Disclosure Protection (Automatic NDA)',
          desc: 'From the moment you submit your inquiry, your business concept, strategy, and project details are protected under strict professional confidentiality.',
        },
        {
          icon: EyeOff,
          title: '02. Zero Data Resale & Zero Unsolicited Marketing',
          desc: 'Your contact details (name, email, company) are used exclusively to prepare your project study and estimate. They are never shared, rented, or sold to third parties.',
        },
        {
          icon: ShieldCheck,
          title: '03. Secure Database Storage & Governance',
          desc: 'Your inquiry is stored in our dedicated database with a unique tracking reference and access strictly restricted to your assigned project director.',
        },
        {
          icon: Award,
          title: '04. 100% Client Intellectual Property Ownership',
          desc: 'Everything we build for you (website, mobile application, source code, visual identity, domain name) belongs 100% to you from day one.',
        },
        {
          icon: Trash2,
          title: '05. Right to Access, Modify & Permanently Delete (GDPR / CCPA)',
          desc: 'At any time, you may request a copy or permanent deletion of your project record by writing to privacy@ouestdynamics.com.',
        },
      ];

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl max-h-[90vh] bg-[#F7F4EE] text-[#161412] border border-[#E2DDD5] rounded-xl shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 sm:px-8 py-5 bg-white border-b border-[#E2DDD5] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-[#A64B2A] shrink-0" />
            <div>
              <p className="text-xs font-mono-tabular text-[#A64B2A] font-semibold">
                {isFr
                  ? 'CHARTE DE CONFIDENTIALITÉ & PROTECTION CLIENT'
                  : 'PRIVACY CHARTER & CLIENT NDA PROTECTION'}
              </p>
              <h3 className="font-serif-display text-lg sm:text-xl font-semibold text-[#161412]">
                {isFr
                  ? 'Politique de Confidentialité Ouest Dynamics'
                  : 'Ouest Dynamics Privacy & Confidentiality Policy'}
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="min-h-[40px] min-w-[40px] flex items-center justify-center rounded-lg border border-[#E2DDD5] text-[#5C554E] hover:text-[#161412] cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {/* Confirmation Banner if triggered after form submission */}
          {referenceCode && (
            <div className="p-4 rounded-lg bg-white border border-[#A64B2A] flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#A64B2A] shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm">
                <p className="font-semibold text-[#161412] mb-0.5">
                  {isFr
                    ? `Dossier enregistré avec succès${clientName ? ` pour ${clientName}` : ''} — Réf : ${referenceCode}`
                    : `Inquiry securely recorded${clientName ? ` for ${clientName}` : ''} — Ref: ${referenceCode}`}
                </p>
                <p className="text-[#5C554E]">
                  {isFr
                    ? 'Votre demande est désormais protégée par notre charte de confidentialité ci-dessous.'
                    : 'Your inquiry is now protected under our confidentiality charter detailed below.'}
                </p>
              </div>
            </div>
          )}

          {/* 5 Pillars */}
          <div className="space-y-4">
            {pillars.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-4 sm:p-5 rounded-lg bg-white border border-[#E2DDD5]"
                >
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <Icon className="w-4 h-4 text-[#A64B2A] shrink-0" />
                    <h4 className="font-serif-display text-sm sm:text-base font-semibold text-[#161412]">
                      {item.title}
                    </h4>
                  </div>
                  <p className="text-xs sm:text-sm text-[#5C554E] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Official Social Links inside Modal */}
          <div className="pt-4 border-t border-[#E2DDD5] flex flex-wrap items-center justify-between gap-4 text-xs text-[#5C554E]">
            <span>
              {isFr ? 'Réseaux officiels vérifiés :' : 'Verified official channels:'}
            </span>
            <div className="flex items-center gap-4 font-semibold text-[#161412]">
              <a
                href="https://www.tiktok.com/@ouestdynamics"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#A64B2A] underline underline-offset-4"
              >
                TikTok
              </a>
              <span>·</span>
              <a
                href="https://www.facebook.com/ouestdynamics"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#A64B2A] underline underline-offset-4"
              >
                Facebook
              </a>
              <span>·</span>
              <a
                href="https://www.instagram.com/ouestdynamics"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#A64B2A] underline underline-offset-4"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 sm:px-8 py-4 bg-white border-t border-[#E2DDD5] flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            className="min-h-[44px] px-6 py-2.5 rounded-lg bg-[#161412] hover:bg-[#A64B2A] text-[#F7F4EE] text-xs font-semibold transition-colors cursor-pointer"
          >
            {isFr ? 'J’ai pris connaissance · Fermer' : 'Acknowledged · Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
