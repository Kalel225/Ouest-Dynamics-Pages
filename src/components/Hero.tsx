import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface HeroProps {
  onEstimate: () => void;
  onOpenConcierge: () => void;
}

function getAbidjanTime(lang: 'fr' | 'en'): string {
  try {
    return new Intl.DateTimeFormat(lang === 'fr' ? 'fr-FR' : 'en-GB', {
      timeZone: 'Africa/Abidjan',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date());
  } catch {
    return '09:00';
  }
}

export const Hero: React.FC<HeroProps> = ({ onEstimate, onOpenConcierge }) => {
  const { t, language } = useLanguage();
  const [time, setTime] = useState(() => getAbidjanTime(language));

  useEffect(() => {
    setTime(getAbidjanTime(language));
    const timer = setInterval(() => setTime(getAbidjanTime(language)), 30_000);
    return () => clearInterval(timer);
  }, [language]);

  return (
    <section className="relative bg-white pt-16 sm:pt-24 pb-20 sm:pb-28 px-5 sm:px-8 border-b border-[#DCE4E0] overflow-hidden">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-8 space-y-7">
          <div className="inline-flex items-center gap-2 text-xs font-medium text-[#50645D] tnum">
            <span className="w-2 h-2 rounded-full bg-[#00875A]" aria-hidden="true" />
            <span>{t.hero.clock(time)}</span>
          </div>

          <h1 className="display text-[clamp(2.75rem,6.5vw,5.25rem)] text-[#0B241D] [text-wrap:balance]">
            {t.hero.title}
          </h1>

          <p className="text-lg sm:text-xl text-[#50645D] leading-relaxed max-w-2xl">
            {t.hero.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-2">
            <button
              type="button"
              onClick={onEstimate}
              className="min-h-[50px] px-7 py-3.5 rounded-full bg-[#F77F00] hover:bg-[#E07100] text-[#0B241D] font-semibold text-sm inline-flex items-center justify-center gap-2 press cursor-pointer whitespace-nowrap"
            >
              <span>{t.hero.primary}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={onOpenConcierge}
              className="min-h-[50px] px-6 py-3.5 rounded-full border border-[#DCE4E0] hover:border-[#0B241D] text-[#0B241D] font-medium text-sm inline-flex items-center justify-center press cursor-pointer whitespace-nowrap"
            >
              {t.hero.secondary}
            </button>
          </div>
        </div>

        {/* The single orchestrated moment: the West sun over the lagoon horizon */}
        <div className="lg:col-span-4 flex justify-center lg:justify-end">
          <div className="relative w-56 h-56 sm:w-72 sm:h-72 rounded-full bg-[#EEF3F0] flex items-end justify-center overflow-hidden">
            <div
              className="sunrise w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-[#F77F00] mb-10 sm:mb-12"
              aria-hidden="true"
            />
            <div
              className="absolute inset-x-0 bottom-0 h-14 sm:h-16 bg-[#0E3A2F]"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
