import React from 'react';
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
      className="min-h-[82vh] py-16 sm:py-24 px-5 sm:px-8 bg-[#EFECE6] text-[#141311]"
    >
      <div className="max-w-2xl mx-auto space-y-8">
        <button
          type="button"
          onClick={onBackToMain}
          className="px-3.5 py-1.5 bg-[#E4DFD5] hover:bg-[#D8D1C4] text-xs font-medium text-[#141311] press cursor-pointer"
        >
          ← {t.legal.close}
        </button>

        <div className="space-y-4 pb-6 border-b border-[#141311]/12">
          <h1 className="display-section text-3xl text-[#141311]">{t.legal.title}</h1>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            {(['privacy', 'terms', 'notices'] as LegalTab[]).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => onChangeTab(tab)}
                className={`px-3.5 py-1.5 text-xs font-medium cursor-pointer transition-colors ${
                  activeTab === tab
                    ? 'bg-[#141311] text-[#EFECE6]'
                    : 'bg-[#E4DFD5] hover:bg-[#D8D1C4] text-[#141311]'
                }`}
              >
                {t.legal.tabs[tab]}
              </button>
            ))}
          </div>
        </div>

        <article className="space-y-6">
          <div>
            <p className="text-xs text-[#141311]/55 mb-1">{currentDoc.updated}</p>
            <h2 className="text-xl font-semibold text-[#141311]">{currentDoc.title}</h2>
          </div>

          <div className="space-y-6">
            {currentDoc.sections.map((sec, idx) => (
              <div key={idx} className="space-y-1.5">
                <h3 className="text-sm font-semibold text-[#141311]">{sec.heading}</h3>
                <p className="text-sm text-[#141311]/70 leading-relaxed">{sec.body}</p>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
};
