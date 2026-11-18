import React, { useState, useEffect } from 'react';
import { ShieldCheck, Settings, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export interface ConsentModeV2Receipt {
  essential: true;
  analytics: boolean;
  marketing: boolean;
  aiConcierge: boolean;
  consentModeV2: {
    ad_storage: 'granted' | 'denied';
    analytics_storage: 'granted' | 'denied';
    ad_user_data: 'granted' | 'denied';
    ad_personalization: 'granted' | 'denied';
  };
  timestamp: string;
}

const STORAGE_KEY = 'od_v2_cmp_consent';

interface CookieConsentBannerProps {
  forceOpen: boolean;
  onCloseForceOpen: () => void;
  onOpenLegalPrivacy: () => void;
}

export const CookieConsentBanner: React.FC<CookieConsentBannerProps> = ({
  forceOpen,
  onCloseForceOpen,
  onOpenLegalPrivacy,
}) => {
  const { t, language } = useLanguage();

  const [visible, setVisible] = useState(false);
  const [customizing, setCustomizing] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [aiConcierge, setAiConcierge] = useState(true);
  const [savedReceipt, setSavedReceipt] = useState<ConsentModeV2Receipt | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed: ConsentModeV2Receipt = JSON.parse(raw);
        setSavedReceipt(parsed);
        setAnalytics(Boolean(parsed.analytics));
        setMarketing(Boolean(parsed.marketing));
        setAiConcierge(parsed.aiConcierge !== false);
      } else {
        setVisible(true);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  useEffect(() => {
    if (forceOpen) {
      setVisible(true);
      setCustomizing(true);
    }
  }, [forceOpen]);

  const persistConsent = (
    allowAnalytics: boolean,
    allowMarketing: boolean,
    allowAi: boolean
  ) => {
    const receipt: ConsentModeV2Receipt = {
      essential: true,
      analytics: allowAnalytics,
      marketing: allowMarketing,
      aiConcierge: allowAi,
      consentModeV2: {
        ad_storage: allowMarketing ? 'granted' : 'denied',
        analytics_storage: allowAnalytics ? 'granted' : 'denied',
        ad_user_data: allowMarketing ? 'granted' : 'denied',
        ad_personalization: allowMarketing ? 'granted' : 'denied',
      },
      timestamp: new Date().toISOString(),
    };

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(receipt));
    } catch {
      // ignore
    }

    setSavedReceipt(receipt);
    setVisible(false);
    onCloseForceOpen();
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-auto z-[60] max-w-xl rounded-[12px] bg-[#141821] border border-[#D4AF37]/40 p-5 text-[#F4F4F6] shadow-2xl">
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0" />
          <h3 className="font-display text-sm sm:text-base font-bold text-[#F4F4F6]">
            {t.cookies.title}
          </h3>
        </div>
      </div>

      <p className="text-xs text-[#A1A7B5] leading-relaxed mb-3">
        {t.cookies.description}{' '}
        <button
          type="button"
          onClick={onOpenLegalPrivacy}
          className="text-[#D4AF37] underline underline-offset-4 hover:text-[#E3C358] font-medium cursor-pointer"
        >
          {language === 'fr' ? 'Politique ARTCI & RGPD' : 'ARTCI & GDPR Policy'}
        </button>
      </p>

      {savedReceipt && (
        <div className="mb-3 px-3 py-1.5 rounded-[6px] bg-[#0B0D12] border border-[#D4AF37]/20 text-[11px] font-mono-code text-[#10B981]">
          {t.cookies.auditReceiptPrefix} {savedReceipt.timestamp} · ad_storage:{' '}
          {savedReceipt.consentModeV2.ad_storage}
        </div>
      )}

      {customizing && (
        <div className="mb-4 p-3.5 rounded-[8px] bg-[#0B0D12] border border-[#D4AF37]/20 space-y-2.5 text-xs">
          {/* Essential */}
          <label className="flex items-center justify-between gap-3">
            <div>
              <span className="font-semibold text-[#F4F4F6] block">
                {t.cookies.categories.essential.label}
              </span>
              <span className="text-[11px] text-[#A1A7B5]">
                {t.cookies.categories.essential.desc}
              </span>
            </div>
            <input
              type="checkbox"
              checked
              disabled
              className="w-4 h-4 accent-[#D4AF37]"
            />
          </label>

          {/* Analytics */}
          <label className="flex items-center justify-between gap-3 pt-2 border-t border-[#D4AF37]/15 cursor-pointer">
            <div>
              <span className="font-semibold text-[#F4F4F6] block">
                {t.cookies.categories.analytics.label}
              </span>
              <span className="text-[11px] text-[#A1A7B5]">
                {t.cookies.categories.analytics.desc}
              </span>
            </div>
            <input
              type="checkbox"
              checked={analytics}
              onChange={(e) => setAnalytics(e.target.checked)}
              className="w-4 h-4 accent-[#D4AF37] cursor-pointer"
            />
          </label>

          {/* Marketing / CAPI */}
          <label className="flex items-center justify-between gap-3 pt-2 border-t border-[#D4AF37]/15 cursor-pointer">
            <div>
              <span className="font-semibold text-[#F4F4F6] block">
                {t.cookies.categories.marketing.label}
              </span>
              <span className="text-[11px] text-[#A1A7B5]">
                {t.cookies.categories.marketing.desc}
              </span>
            </div>
            <input
              type="checkbox"
              checked={marketing}
              onChange={(e) => setMarketing(e.target.checked)}
              className="w-4 h-4 accent-[#D4AF37] cursor-pointer"
            />
          </label>

          {/* AI Concierge Context */}
          <label className="flex items-center justify-between gap-3 pt-2 border-t border-[#D4AF37]/15 cursor-pointer">
            <div>
              <span className="font-semibold text-[#F4F4F6] block">
                {t.cookies.categories.aiConcierge.label}
              </span>
              <span className="text-[11px] text-[#A1A7B5]">
                {t.cookies.categories.aiConcierge.desc}
              </span>
            </div>
            <input
              type="checkbox"
              checked={aiConcierge}
              onChange={(e) => setAiConcierge(e.target.checked)}
              className="w-4 h-4 accent-[#D4AF37] cursor-pointer"
            />
          </label>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => persistConsent(true, true, true)}
            className="px-3.5 py-2 rounded-[6px] bg-[#D4AF37] hover:bg-[#E3C358] text-[#0B0D12] text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0"
          >
            <Check className="w-3.5 h-3.5" />
            <span>{t.cookies.acceptAll}</span>
          </button>

          <button
            type="button"
            onClick={() => persistConsent(false, false, true)}
            className="px-3.5 py-2 rounded-[6px] bg-[#0B0D12] hover:bg-[#1B202C] border border-[#D4AF37]/30 text-[#F4F4F6] text-xs font-semibold cursor-pointer whitespace-nowrap shrink-0"
          >
            {t.cookies.essentialOnly}
          </button>
        </div>

        {customizing ? (
          <button
            type="button"
            onClick={() => persistConsent(analytics, marketing, aiConcierge)}
            className="text-xs font-semibold text-[#D4AF37] hover:underline cursor-pointer px-2 py-1"
          >
            {t.cookies.saveChoices}
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setCustomizing(true)}
            className="text-xs font-medium text-[#A1A7B5] hover:text-[#F4F4F6] inline-flex items-center gap-1 cursor-pointer px-2 py-1"
          >
            <Settings className="w-3.5 h-3.5" />
            <span>{t.cookies.customize}</span>
          </button>
        )}
      </div>
    </div>
  );
};
