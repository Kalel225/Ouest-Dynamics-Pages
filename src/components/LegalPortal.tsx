import React from 'react';
import { ArrowLeft } from 'lucide-react';
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
      className="min-h-[82vh] py-14 sm:py-20 px-5 sm:px-8 bg-white text-[#0B241D]"
    >
      <div className="max-w-3xl mx-auto space-y-8">
        <button
          type="button"
          onClick={onBackToMain}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#0E3A2F] hover:text-[#F77F00] cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{t.legal.close}</span>
        </button>

        <div className="space-y-4 pb-6 border-b border-[#DCE4E0]">
          <h1 className="title text-3xl sm:text-4xl text-[#0B241D]">{t.legal.title}</h1>

          <div className="flex flex-wrap items-center gap-2 pt-2">
            {(['privacy', 'terms', 'notices'] as LegalTab[]).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => onChangeTab(tab)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium cursor-pointer transition-colors ${
                  activeTab === tab
                    ? 'bg-[#0E3A2F] text-white'
                    : 'bg-[#EEF3F0] text-[#50645D] hover:text-[#0B241D]'
                }`}
              >
                {t.legal.tabs[tab]}
              </button>
            ))}
          </div>
        </div>

        <article className="space-y-6">
          <div>
            <p className="text-xs text-[#50645D] mb-1">{currentDoc.updated}</p>
            <h2 className="text-2xl font-bold text-[#0B241D]">{currentDoc.title}</h2>
          </div>

          <div className="space-y-6">
            {currentDoc.sections.map((sec, idx) => (
              <div key={idx} className="space-y-1.5">
                <h3 className="text-base font-semibold text-[#0B241D]">{sec.heading}</h3>
                <p className="text-sm sm:text-base text-[#50645D] leading-relaxed">
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
