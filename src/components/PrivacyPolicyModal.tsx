import React from 'react';
import { X, ShieldCheck, CheckCircle2, Lock, EyeOff, FileText, ArrowUpRight, Award, Trash2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  dossierRef?: string;
  submissionDetails?: {
    fullName: string;
    companyName: string;
    email: string;
  };
}

export const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({
  isOpen,
  onClose,
  dossierRef,
  submissionDetails,
}) => {
  const { language } = useLanguage();

  if (!isOpen) return null;

  const isFr = language === 'fr';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-[#0B0B0B]/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-3xl bg-[#121212] border border-white/[0.12] shadow-[0_25px_60px_rgba(0,0,0,0.95)] overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        {/* Header with Luxury Champagne Accents */}
        <div className="p-5 sm:p-6 border-b border-white/[0.08] flex items-center justify-between shrink-0 bg-[#161616]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-[#D4AF37] block font-semibold">
                {isFr ? 'Charte de Protection des Données' : 'Data Privacy & Protection Charter'}
              </span>
              <h3 className="font-display text-lg sm:text-xl font-bold text-white">
                {isFr ? 'Politique de Confidentialité Officielle' : 'Official Privacy Policy'}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-[#F4F4F6]/70 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Fermer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-6 text-[#F4F4F6]/85 font-body text-xs sm:text-sm leading-relaxed">
          {/* Post-Submission Success Notice (when triggered by form validation) */}
          {dossierRef && (
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#D4AF37]/15 to-transparent border border-[#D4AF37]/30 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{isFr ? 'Dossier Enregistré avec Succès en Base de Données' : 'Dossier Successfully Saved to Database'}</span>
              </div>
              <div className="font-mono text-sm sm:text-base font-bold text-white">
                {isFr ? 'Référence de suivi :' : 'Tracking Reference:'}{' '}
                <span className="text-[#D4AF37]">{dossierRef}</span>
              </div>
              <p className="text-[11px] sm:text-xs text-[#F4F4F6]/75">
                {isFr
                  ? `Merci ${submissionDetails?.fullName || ''}. Toutes vos informations ont été validées et stockées de façon sécurisée. Un conseiller Ouest Dynamics analyse votre projet sous 24h.`
                  : `Thank you ${submissionDetails?.fullName || ''}. Your project details have been validated and securely stored. An Ouest Dynamics advisor will review your scope within 24 hours.`}
              </p>
            </div>
          )}

          {/* Intro text */}
          <p className="text-xs sm:text-sm text-[#F4F4F6]/80 font-normal">
            {isFr
              ? "Chez Ouest Dynamics, nous plaçons la confiance et la sérénité au cœur de notre travail. Aucun jargon juridique complexe : voici nos 5 engagements concrets pour protéger vos projets et vos données personnelles."
              : "At Ouest Dynamics, trust and peace of mind are our core foundations. No convoluted legal jargon: here are our 5 clear commitments to protecting your project ideas and personal information."}
          </p>

          {/* 5 Clear Pillars */}
          <div className="space-y-4">
            {/* 1. NDA & Confidentiality */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-start gap-3.5">
              <div className="p-2 rounded-lg bg-[#D4AF37]/10 text-[#D4AF37] shrink-0 mt-0.5">
                <Lock className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <h4 className="font-display text-sm font-bold text-white">
                  {isFr ? '1. Accord de Non-Divulgation Immédiat (NDA Automatique)' : '1. Immediate Non-Disclosure Agreement (Automatic NDA)'}
                </h4>
                <p className="text-xs text-[#F4F4F6]/75 leading-relaxed">
                  {isFr
                    ? "Dès l'instant où vous soumettez votre projet, vos idées, concepts, logos et données commerciales sont couverts par une obligation stricte de secret professionnel. Rien n'est partagé à l'extérieur."
                    : "From the moment you submit your project, your ideas, concepts, logos, and business data are covered by a strict non-disclosure covenant. Nothing is ever shared externally."}
                </p>
              </div>
            </div>

            {/* 2. Zero Spam / Zero Reselling */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-start gap-3.5">
              <div className="p-2 rounded-lg bg-[#D4AF37]/10 text-[#D4AF37] shrink-0 mt-0.5">
                <EyeOff className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <h4 className="font-display text-sm font-bold text-white">
                  {isFr ? '2. Zéro Revente de Données & Zéro Spam' : '2. Zero Data Reselling & Zero Spam'}
                </h4>
                <p className="text-xs text-[#F4F4F6]/75 leading-relaxed">
                  {isFr
                    ? "Nous ne vendons, ne louons et ne cédons jamais vos coordonnées à des tiers ou des régies publicitaires. Votre adresse e-mail sert exclusivement à notre équipe pour échanger avec vous."
                    : "We never sell, rent, or transfer your contact information to third parties or ad networks. Your email is exclusively used by our studio to communicate about your project."}
                </p>
              </div>
            </div>

            {/* 3. Secure Database Storage */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-start gap-3.5">
              <div className="p-2 rounded-lg bg-[#D4AF37]/10 text-[#D4AF37] shrink-0 mt-0.5">
                <FileText className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <h4 className="font-display text-sm font-bold text-white">
                  {isFr ? '3. Base de Données Sécurisée & Chiffrée' : '3. Secure Encrypted Database Storage'}
                </h4>
                <p className="text-xs text-[#F4F4F6]/75 leading-relaxed">
                  {isFr
                    ? "Toutes les soumissions sont enregistrées dans notre base de données sécurisée avec protocoles de chiffrement au repos et en transit (HTTPS / TLS)."
                    : "All project submissions are persisted in our secure server database with standard encryption in transit (HTTPS / TLS) and protected access control."}
                </p>
              </div>
            </div>

            {/* 4. Full Ownership */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-start gap-3.5">
              <div className="p-2 rounded-lg bg-[#D4AF37]/10 text-[#D4AF37] shrink-0 mt-0.5">
                <Award className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <h4 className="font-display text-sm font-bold text-white">
                  {isFr ? '4. Vous Êtes 100% Propriétaire de Vos Réalisations' : '4. You Retain 100% Intellectual Property'}
                </h4>
                <p className="text-xs text-[#F4F4F6]/75 leading-relaxed">
                  {isFr
                    ? "À la livraison de votre site web ou application, vous recevez tous les accès administrateurs, noms de domaine, codes sources et maquettes. Aucun abonnement caché pour rester propriétaire."
                    : "Upon delivery of your website or app, you receive all admin credentials, domains, source code, and design assets. Zero lock-in or hidden fees to remain owner."}
                </p>
              </div>
            </div>

            {/* 5. Right to delete / RGPD */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-start gap-3.5">
              <div className="p-2 rounded-lg bg-[#D4AF37]/10 text-[#D4AF37] shrink-0 mt-0.5">
                <Trash2 className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <h4 className="font-display text-sm font-bold text-white">
                  {isFr ? "5. Droit d'Accès & Suppression Définitive" : '5. Right of Access & Instant Deletion'}
                </h4>
                <p className="text-xs text-[#F4F4F6]/75 leading-relaxed">
                  {isFr
                    ? "Conformément aux normes internationales (RGPD & CCPA), vous pouvez demander à tout moment l'effacement immédiat de votre dossier sur simple demande par email à privacy@ouestdynamics.com."
                    : "In accordance with GDPR & CCPA privacy standards, you can request full extraction or permanent deletion of your dossier anytime by emailing privacy@ouestdynamics.com."}
                </p>
              </div>
            </div>
          </div>

          {/* Official Social Media Follow Banner */}
          <div className="pt-2 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#F4F4F6]/60 font-mono">
            <span>{isFr ? 'Réseaux Sociaux Officiels :' : 'Official Social Channels:'}</span>
            <div className="flex items-center gap-4">
              <a 
                href="https://www.tiktok.com/@ouestdynamics" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-[#D4AF37] transition-colors flex items-center gap-1"
              >
                TikTok <ArrowUpRight className="w-3 h-3" />
              </a>
              <a 
                href="https://www.facebook.com/ouestdynamics" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-[#D4AF37] transition-colors flex items-center gap-1"
              >
                Facebook <ArrowUpRight className="w-3 h-3" />
              </a>
              <a 
                href="https://www.instagram.com/ouestdynamics" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-[#D4AF37] transition-colors flex items-center gap-1"
              >
                Instagram <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-white/[0.08] bg-[#161616] flex items-center justify-end gap-3 shrink-0">
          <button
            onClick={onClose}
            className="w-full sm:w-auto min-h-[44px] px-7 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-[#0B0B0B] bg-[#D4AF37] hover:bg-[#E2C255] transition-all cursor-pointer shadow-[0_2px_15px_rgba(212,175,55,0.3)]"
          >
            {isFr ? 'Compris & Fermer' : 'Acknowledge & Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
