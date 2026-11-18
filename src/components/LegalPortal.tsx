import React from 'react';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export type LegalTab = 'privacy' | 'terms' | 'notices';

interface LegalPortalProps {
  activeTab: LegalTab;
  onChangeTab: (tab: LegalTab) => void;
  onBackToMain: () => void;
}

export const LegalPortal: React.FC<LegalPortalProps> = ({
  activeTab,
  onChangeTab,
  onBackToMain,
}) => {
  const { t } = useLanguage();

  const currentDoc =
    activeTab === 'privacy'
      ? t.legal.privacy
      : activeTab === 'terms'
      ? t.legal.terms
      : t.legal.notices;

  return (
    <section
      id="legal"
      className="min-h-[82vh] py-14 sm:py-20 px-4 sm:px-8 bg-[#F8F6F1] text-[#111318] border-b border-[#8A6D1B]/25"
    >
      <div className="max-w-[1040px] mx-auto">
        {/* Return to Main Platform Action */}
        <div className="mb-8">
          <button
            type="button"
            onClick={onBackToMain}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-[6px] bg-white border border-[#8A6D1B]/30 text-xs font-semibold text-[#111318] hover:border-[#8A6D1B] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#8A6D1B]" />
            <span>{t.legal.backToPlatform}</span>
          </button>
        </div>

        {/* Editorial Header on Ivory Canvas (#F8F6F1) with Accessible Gold (#8A6D1B) */}
        <div className="pb-8 mb-8 border-b border-[#8A6D1B]/25">
          <div className="flex items-center gap-2 text-xs font-mono-code font-semibold text-[#8A6D1B] mb-2.5">
            <ShieldCheck className="w-4 h-4" />
            <span>{t.legal.portalKicker}</span>
          </div>
          <h1 className="font-display text-2xl sm:text-4xl font-bold text-[#111318] tracking-tight mb-3 [text-wrap:balance]">
            {t.legal.portalTitle}
          </h1>
          <p className="text-sm sm:text-base text-[#111318]/75 leading-relaxed max-w-3xl">
            {t.legal.portalSubtitle}
          </p>

          {/* Segmented Legal View Switcher */}
          <div className="mt-7 inline-flex flex-wrap items-center gap-1.5 p-1 bg-white border border-[#8A6D1B]/25 rounded-[8px]">
            <button
              type="button"
              onClick={() => onChangeTab('privacy')}
              className={`px-4 py-2 rounded-[6px] text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                activeTab === 'privacy'
                  ? 'bg-[#8A6D1B] text-[#F8F6F1]'
                  : 'text-[#111318]/80 hover:text-[#111318]'
              }`}
            >
              {t.legal.tabs.privacy}
            </button>
            <button
              type="button"
              onClick={() => onChangeTab('terms')}
              className={`px-4 py-2 rounded-[6px] text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                activeTab === 'terms'
                  ? 'bg-[#8A6D1B] text-[#F8F6F1]'
                  : 'text-[#111318]/80 hover:text-[#111318]'
              }`}
            >
              {t.legal.tabs.terms}
            </button>
            <button
              type="button"
              onClick={() => onChangeTab('notices')}
              className={`px-4 py-2 rounded-[6px] text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                activeTab === 'notices'
                  ? 'bg-[#8A6D1B] text-[#F8F6F1]'
                  : 'text-[#111318]/80 hover:text-[#111318]'
              }`}
            >
              {t.legal.tabs.notices}
            </button>
          </div>
        </div>

        {/* Active Legal Document Content */}
        <article className="bg-white rounded-[12px] border border-[#8A6D1B]/25 p-6 sm:p-10 space-y-6">
          <div className="pb-5 border-b border-[#8A6D1B]/20">
            <p className="font-mono-code text-xs font-semibold text-[#8A6D1B] mb-1">
              {currentDoc.effectiveDate}
            </p>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-[#111318]">
              {currentDoc.title}
            </h2>
          </div>

          <div className="space-y-6">
            {currentDoc.sections.map((sec, idx) => (
              <div key={idx} className="space-y-2">
                <h3 className="font-display text-base sm:text-lg font-bold text-[#111318]">
                  {sec.heading}
                </h3>
                <p className="text-sm sm:text-base text-[#111318]/80 leading-relaxed">
                  {sec.body}
                </p>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
};
