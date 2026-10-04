import React from 'react';
import { ArrowUp, MapPin } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { useLanguage } from '../context/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#080808] border-t border-white/[0.06] text-[#F4F4F6]/70 pt-16 sm:pt-20 pb-24 sm:pb-12 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 pb-12 sm:pb-16 border-b border-white/[0.08]">
          {/* Col 1: Wordmark & Value Proposition */}
          <div className="md:col-span-5 space-y-5">
            <BrandLogo size="md" />

            <p className="text-xs sm:text-sm text-[#F4F4F6]/70 max-w-sm leading-relaxed font-body">
              {t.footer.tagline}
            </p>

            {/* Localisation : Uniquement Abidjan (Dakar et Paris retirés selon instruction) */}
            <div className="pt-2 flex items-center gap-3 text-xs font-mono text-[#F4F4F6]/60">
              <span className="flex items-center gap-1.5 text-white/90">
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" /> {t.footer.location}
              </span>
            </div>
          </div>

          {/* Col 2: Expertises */}
          <div className="md:col-span-3 space-y-4">
            <span className="block text-xs font-semibold uppercase tracking-wider text-white font-mono">
              {t.footer.domainsTitle}
            </span>
            <ul className="space-y-3 text-xs text-[#F4F4F6]/70 font-body">
              {t.services.items.map((s) => (
                <li key={s.id}>
                  <a href="#expertises" className="hover:text-[#D4AF37] transition-colors py-1 inline-block">
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Methodology */}
          <div className="md:col-span-2 space-y-4">
            <span className="block text-xs font-semibold uppercase tracking-wider text-white font-mono">
              {t.footer.methodologyTitle}
            </span>
            <ul className="space-y-3 text-xs text-[#F4F4F6]/70 font-body">
              {t.methodology.steps.map((st) => (
                <li key={st.number}>
                  <a href="#methodologie" className="hover:text-[#D4AF37] transition-colors py-1 inline-block">
                    {st.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Governance & Security */}
          <div className="md:col-span-2 space-y-4">
            <span className="block text-xs font-semibold uppercase tracking-wider text-white font-mono">
              {t.footer.governanceTitle}
            </span>
            <div className="space-y-3 text-xs text-[#F4F4F6]/70 font-body">
              <p className="text-[11px] leading-relaxed">
                {t.footer.confidentialityNote}
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-[11px] font-mono text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>ISO 27001</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col-reverse sm:flex-row items-center justify-between gap-6 text-xs text-[#F4F4F6]/50 font-mono">
          <div>
            &copy; {new Date().getFullYear()} Ouest Dynamics. {t.footer.rightsReserved}
          </div>

          <div className="flex flex-wrap items-center gap-5 sm:gap-6">
            <span className="hover:text-[#F4F4F6] cursor-pointer transition-colors">
              {t.footer.legalMentions}
            </span>
            <span>·</span>
            <span className="hover:text-[#F4F4F6] cursor-pointer transition-colors">
              {t.footer.privacyPolicy}
            </span>
            <span>·</span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
            >
              <span>{t.footer.backToTop}</span>
              <ArrowUp className="w-3.5 h-3.5 text-[#D4AF37]" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
