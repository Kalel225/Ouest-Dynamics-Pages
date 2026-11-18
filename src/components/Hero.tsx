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
    <section className="bg-[#EFECE6] pt-20 sm:pt-28 pb-20 sm:pb-28 px-5 sm:px-8 border-b border-[#141311]/10">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-xs uppercase tracking-[0.12em] text-[#141311]/55 tnum">
          {t.hero.clock(time)} GMT
        </div>

        <h1 className="display-hero text-[clamp(2.75rem,6vw,5.25rem)] text-[#141311] max-w-4xl [text-wrap:balance]">
          {t.hero.title}
        </h1>

        <p className="text-base sm:text-lg text-[#141311]/65 leading-relaxed max-w-xl">
          {t.hero.subtitle}
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            type="button"
            onClick={onEstimate}
            className="min-h-[46px] px-7 py-3 bg-[#141311] hover:bg-[#2C2925] text-[#EFECE6] text-xs font-medium uppercase tracking-[0.12em] inline-flex items-center gap-2.5 group press cursor-pointer whitespace-nowrap"
          >
            <span>{t.hero.primary}</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </button>

          <button
            type="button"
            onClick={onOpenConcierge}
            className="min-h-[46px] px-6 py-3 bg-[#E4DFD5] hover:bg-[#D8D1C4] text-[#141311] text-xs font-medium uppercase tracking-[0.12em] press cursor-pointer whitespace-nowrap"
          >
            {t.hero.secondary}
          </button>
        </div>
      </div>
    </section>
  );
};
