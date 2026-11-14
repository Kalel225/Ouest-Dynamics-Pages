import React, { useState, useEffect } from 'react';
import { Cookie, Check, Settings, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface CookieBannerProps {
  onOpenPrivacyPage: () => void;
}

interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  preferences: boolean;
  updatedAt: string;
}

const STORAGE_KEY = 'od_cookie_consent_v1';

export const CookieBanner: React.FC<CookieBannerProps> = ({ onOpenPrivacyPage }) => {
  const { language } = useLanguage();
  const isFr = language === 'fr';

  const [isVisible, setIsVisible] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);
  const [prefsEnabled, setPrefsEnabled] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      // Show cookie banner after loading screen finishes (1.5s)
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1600);
      return () => clearTimeout(timer);
    }
  }, []);

  const saveConsent = (analytics: boolean, preferences: boolean) => {
    const payload: CookiePreferences = {
      essential: true,
      analytics,
      preferences,
      updatedAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-16 sm:bottom-5 left-4 right-4 sm:left-6 sm:right-auto z-50 max-w-lg bg-white border border-[#E2DDD5] rounded-xl shadow-xl p-5 text-[#161412]">
      <div className="flex items-start justify-between gap-3 mb-2.5">
        <div className="flex items-center gap-2">
          <Cookie className="w-4 h-4 text-[#A64B2A] shrink-0" />
          <h3 className="font-serif-display text-sm sm:text-base font-semibold text-[#161412]">
            {isFr
              ? 'Respect de votre vie privée & Cookies'
              : 'Your Privacy & Cookie Preferences'}
          </h3>
        </div>
        <button
          type="button"
          onClick={() => saveConsent(false, false)}
          className="text-[#5C554E] hover:text-[#161412] p-1 cursor-pointer"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <p className="text-xs text-[#5C554E] leading-relaxed mb-4">
        {isFr
          ? 'Nous utilisons des cookies strictement nécessaires au bon fonctionnement du site (mémorisation de votre langue et de votre devise régionale) ainsi que des mesures d’audience anonymes pour améliorer votre confort de navigation.'
          : 'We use strictly necessary cookies to ensure smooth site operation (remembering your language and regional currency) along with anonymous analytics to improve your browsing experience.'}{' '}
        <button
          type="button"
          onClick={onOpenPrivacyPage}
          className="font-semibold text-[#A64B2A] underline underline-offset-4 hover:text-[#161412] cursor-pointer"
        >
          {isFr ? 'Politique de Confidentialité' : 'Privacy Policy'}
        </button>
      </p>

      {showCustomize && (
        <div className="mb-4 p-3.5 rounded-lg bg-[#F7F4EE] border border-[#E2DDD5] space-y-2.5 text-xs">
          <label className="flex items-center justify-between gap-3">
            <div>
              <span className="font-semibold text-[#161412] block">
                {isFr ? 'Cookies Essentiels (Obligatoires)' : 'Essential Cookies (Required)'}
              </span>
              <span className="text-[11px] text-[#5C554E]">
                {isFr
                  ? 'Sécurité, langue, devise régionale et sauvegarde du formulaire.'
                  : 'Security, language, regional currency, and form session.'}
              </span>
            </div>
            <input
              type="checkbox"
              checked
              disabled
              className="accent-[#A64B2A] w-4 h-4"
            />
          </label>

          <label className="flex items-center justify-between gap-3 pt-2 border-t border-[#E2DDD5] cursor-pointer">
            <div>
              <span className="font-semibold text-[#161412] block">
                {isFr ? 'Préférences & Confort UX' : 'UX Comfort & Preferences'}
              </span>
              <span className="text-[11px] text-[#5C554E]">
                {isFr
                  ? 'Adaptation fluide de l’affichage selon votre appareil.'
                  : 'Smooth display calibration tailored to your device.'}
              </span>
            </div>
            <input
              type="checkbox"
              checked={prefsEnabled}
              onChange={(e) => setPrefsEnabled(e.target.checked)}
              className="accent-[#A64B2A] w-4 h-4 cursor-pointer"
            />
          </label>

          <label className="flex items-center justify-between gap-3 pt-2 border-t border-[#E2DDD5] cursor-pointer">
            <div>
              <span className="font-semibold text-[#161412] block">
                {isFr ? 'Mesure d’Audience Anonyme' : 'Anonymous Performance Analytics'}
              </span>
              <span className="text-[11px] text-[#5C554E]">
                {isFr
                  ? 'Statistiques agrégées sans aucun pistage publicitaire.'
                  : 'Aggregated speed metrics with zero advertising trackers.'}
              </span>
            </div>
            <input
              type="checkbox"
              checked={analyticsEnabled}
              onChange={(e) => setAnalyticsEnabled(e.target.checked)}
              className="accent-[#A64B2A] w-4 h-4 cursor-pointer"
            />
          </label>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => saveConsent(true, true)}
            className="min-h-[38px] px-4 py-2 rounded-lg bg-[#A64B2A] hover:bg-[#8E3D20] text-[#F7F4EE] text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            <Check className="w-3.5 h-3.5" />
            <span>{isFr ? 'Tout accepter' : 'Accept All'}</span>
          </button>

          <button
            type="button"
            onClick={() => saveConsent(false, false)}
            className="min-h-[38px] px-3.5 py-2 rounded-lg bg-[#F7F4EE] hover:bg-[#EFECE6] border border-[#E2DDD5] text-[#161412] text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            {isFr ? 'Essentiels uniquement' : 'Essential Only'}
          </button>
        </div>

        {showCustomize ? (
          <button
            type="button"
            onClick={() => saveConsent(analyticsEnabled, prefsEnabled)}
            className="text-xs font-semibold text-[#A64B2A] hover:underline cursor-pointer px-2 py-1"
          >
            {isFr ? 'Enregistrer mes choix' : 'Save Preferences'}
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setShowCustomize(true)}
            className="text-xs font-medium text-[#5C554E] hover:text-[#161412] inline-flex items-center gap-1 cursor-pointer px-2 py-1"
          >
            <Settings className="w-3.5 h-3.5" />
            <span>{isFr ? 'Personnaliser' : 'Customize'}</span>
          </button>
        )}
      </div>
    </div>
  );
};
