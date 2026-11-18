import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export interface ConsentModeV2Receipt {
  essential: true;
  analytics: boolean;
  marketing: boolean;
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
  const { t } = useLanguage();

  const [visible, setVisible] = useState(false);
  const [customizing, setCustomizing] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed: ConsentModeV2Receipt = JSON.parse(raw);
        setAnalytics(Boolean(parsed.analytics));
        setMarketing(Boolean(parsed.marketing));
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

  const persistConsent = (allowAnalytics: boolean, allowMarketing: boolean) => {
    const receipt: ConsentModeV2Receipt = {
      essential: true,
      analytics: allowAnalytics,
      marketing: allowMarketing,
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

    setVisible(false);
    onCloseForceOpen();
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-5 z-[60] max-w-xs bg-[#E6E1D7] p-4 text-[#141311]">
      <p className="text-xs text-[#141311]/75 leading-relaxed mb-3">
        {t.cookies.text}{' '}
        <button
          type="button"
          onClick={onOpenLegalPrivacy}
          className="text-[#141311] underline cursor-pointer"
        >
          {t.cookies.policy}
        </button>
      </p>

      {customizing && (
        <div className="mb-3 p-3 bg-[#EFECE6] space-y-2 text-xs">
          <label className="flex items-center justify-between gap-3">
            <div>
              <span className="font-semibold block">{t.cookies.essential.label}</span>
              <span className="text-[11px] text-[#141311]/60">{t.cookies.essential.desc}</span>
            </div>
            <input type="checkbox" checked disabled className="w-3.5 h-3.5 accent-[#141311]" />
          </label>

          <label className="flex items-center justify-between gap-3 pt-2 border-t border-[#141311]/10 cursor-pointer">
            <div>
              <span className="font-semibold block">{t.cookies.analytics.label}</span>
              <span className="text-[11px] text-[#141311]/60">{t.cookies.analytics.desc}</span>
            </div>
            <input
              type="checkbox"
              checked={analytics}
              onChange={(e) => setAnalytics(e.target.checked)}
              className="w-3.5 h-3.5 accent-[#141311] cursor-pointer"
            />
          </label>

          <label className="flex items-center justify-between gap-3 pt-2 border-t border-[#141311]/10 cursor-pointer">
            <div>
              <span className="font-semibold block">{t.cookies.marketing.label}</span>
              <span className="text-[11px] text-[#141311]/60">{t.cookies.marketing.desc}</span>
            </div>
            <input
              type="checkbox"
              checked={marketing}
              onChange={(e) => setMarketing(e.target.checked)}
              className="w-3.5 h-3.5 accent-[#141311] cursor-pointer"
            />
          </label>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => persistConsent(true, true)}
            className="px-3.5 py-1.5 bg-[#141311] hover:bg-[#2C2925] text-[#EFECE6] text-[11px] font-medium press cursor-pointer"
          >
            {t.cookies.accept}
          </button>
          <button
            type="button"
            onClick={() => persistConsent(false, false)}
            className="px-3.5 py-1.5 bg-[#EFECE6] hover:bg-[#DDD7CB] text-[#141311] text-[11px] font-medium press cursor-pointer"
          >
            {t.cookies.refuse}
          </button>
        </div>

        {customizing ? (
          <button
            type="button"
            onClick={() => persistConsent(analytics, marketing)}
            className="text-[11px] font-semibold text-[#141311] underline cursor-pointer"
          >
            {t.cookies.save}
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setCustomizing(true)}
            className="text-[11px] text-[#141311]/65 hover:text-[#141311] cursor-pointer"
          >
            {t.cookies.customize}
          </button>
        )}
      </div>
    </div>
  );
};
