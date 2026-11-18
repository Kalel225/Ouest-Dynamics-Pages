import React from 'react';
import { ArrowUpRight, Sparkles, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency } from '../context/CurrencyContext';

interface HeroProps {
  onConfigureBrief: () => void;
  onOpenConcierge: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onConfigureBrief, onOpenConcierge }) => {
  const { t, language } = useLanguage();
  const { currency, parityLabel } = useCurrency();

  return (
    <section className="relative pt-12 sm:pt-20 pb-16 sm:pb-24 px-4 sm:px-8 bg-[#0B0D12] border-b border-[#D4AF37]/18 overflow-hidden">
      {/* Subtle Architectural Radial Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-1/4 w-[640px] h-[640px] rounded-full opacity-15"
        style={{
          background:
            'radial-gradient(circle, rgba(212, 175, 55, 0.28) 0%, rgba(11, 13, 18, 0) 70%)',
        }}
      />

      <div className="max-w-[1280px] mx-auto relative z-10">
        {/* Top Authority Kicker & Currency Calibration Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-10 sm:mb-14 border-b border-[#D4AF37]/18 text-xs sm:text-[13px] text-[#A1A7B5]">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono-code text-[#D4AF37] font-medium">
              {t.hero.kicker}
            </span>
          </div>
          <div className="font-mono-code text-xs text-[#A1A7B5]">
            <span>
              {language === 'fr' ? 'Tarification active :' : 'Active pricing:'}{' '}
              <strong className="text-[#F4F4F6]">{currency}</strong> · {parityLabel}
            </span>
          </div>
        </div>

        {/* 2-Column Sovereign Split (7 cols Editorial Authority / 5 cols Precision SVG Blueprint) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left Column: Headline, 360° Proposition & Dual CTA */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <h1 className="font-display text-[clamp(2.25rem,4.5vw,4.25rem)] font-bold text-[#F4F4F6] leading-[1.08] tracking-tight mb-6 [text-wrap:balance]">
                {t.hero.title}
              </h1>

              <p className="text-base sm:text-lg text-[#A1A7B5] leading-relaxed max-w-2xl mb-10">
                {t.hero.subtitle}
              </p>
            </div>

            <div className="space-y-8">
              {/* Dual Action Block: Primary Configurator CTA + Secondary AI Concierge CTA */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <button
                  type="button"
                  onClick={onConfigureBrief}
                  className="min-h-[50px] inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-sm font-semibold text-[#0B0D12] bg-[#D4AF37] hover:bg-[#E3C358] rounded-[6px] transition-colors duration-180 cursor-pointer whitespace-nowrap shrink-0"
                >
                  <span>{t.hero.ctaPrimary}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={onOpenConcierge}
                  className="min-h-[50px] inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-[#F4F4F6] bg-[#141821] hover:bg-[#1B202C] border border-[#D4AF37]/30 hover:border-[#D4AF37] rounded-[6px] transition-colors duration-180 cursor-pointer whitespace-nowrap shrink-0"
                >
                  <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                  <span>{t.hero.ctaSecondary}</span>
                </button>
              </div>

              {/* Unboxed Governance Summary Line */}
              <div className="pt-6 border-t border-[#D4AF37]/18 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[#A1A7B5]">
                <span className="inline-flex items-center gap-1.5 text-[#F4F4F6] font-medium">
                  <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                  <span>Core &amp; Elastic Guilds</span>
                </span>
                <span aria-hidden="true">·</span>
                <span>
                  {language === 'fr'
                    ? '4 Pôles Spécialisés + 2 Moteurs Transverses'
                    : '4 Specialized Poles + 2 Transverse Engines'}
                </span>
                <span aria-hidden="true">·</span>
                <span>Zero-Data Retention (ARTCI / RGPD)</span>
              </div>
            </div>
          </div>

          {/* Right Column: High-Precision SVG Architectural Blueprint Matrix */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="relative flex-1 min-h-[340px] lg:h-full rounded-[12px] bg-[#141821] border border-[#D4AF37]/18 p-6 sm:p-7 flex flex-col justify-between overflow-hidden">
              <div className="flex items-center justify-between text-xs font-mono-code text-[#A1A7B5] pb-4 border-b border-[#D4AF37]/15">
                <span className="text-[#D4AF37]">OUEST DYNAMICS · CORE MATRIX V2.0</span>
                <span>ABIDJAN · INTL</span>
              </div>

              {/* Architectural Geometric SVG Diagram */}
              <div className="my-6 flex items-center justify-center">
                <svg
                  viewBox="0 0 420 230"
                  className="w-full max-w-[400px] h-auto"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  aria-label="Ouest Dynamics Core & Elastic Guilds Architectural Blueprint"
                >
                  {/* Outer Architectural Grid Frame */}
                  <rect
                    x="4"
                    y="4"
                    width="412"
                    height="222"
                    rx="8"
                    fill="#0B0D12"
                    stroke="#D4AF37"
                    strokeOpacity="0.22"
                  />
                  <line
                    x1="4"
                    y1="76"
                    x2="416"
                    y2="76"
                    stroke="#D4AF37"
                    strokeOpacity="0.18"
                    strokeDasharray="4 4"
                  />
                  <line
                    x1="210"
                    y1="4"
                    x2="210"
                    y2="226"
                    stroke="#D4AF37"
                    strokeOpacity="0.18"
                    strokeDasharray="4 4"
                  />

                  {/* Top Transverse Engine Nodes */}
                  <rect
                    x="22"
                    y="18"
                    width="172"
                    height="44"
                    rx="6"
                    fill="#141821"
                    stroke="#D4AF37"
                    strokeWidth="1.2"
                  />
                  <text
                    x="34"
                    y="37"
                    fill="#D4AF37"
                    fontSize="9"
                    fontFamily="JetBrains Mono, monospace"
                  >
                    ENGINE A · +20%
                  </text>
                  <text
                    x="34"
                    y="51"
                    fill="#F4F4F6"
                    fontSize="10.5"
                    fontWeight="600"
                    fontFamily="Plus Jakarta Sans, sans-serif"
                  >
                    Direction Artistique W3C
                  </text>

                  <rect
                    x="226"
                    y="18"
                    width="172"
                    height="44"
                    rx="6"
                    fill="#141821"
                    stroke="#D4AF37"
                    strokeWidth="1.2"
                  />
                  <text
                    x="238"
                    y="37"
                    fill="#D4AF37"
                    fontSize="9"
                    fontFamily="JetBrains Mono, monospace"
                  >
                    ENGINE B · +25%
                  </text>
                  <text
                    x="238"
                    y="51"
                    fill="#F4F4F6"
                    fontSize="10.5"
                    fontWeight="600"
                    fontFamily="Plus Jakarta Sans, sans-serif"
                  >
                    Ingénierie IA Gemini &amp; n8n
                  </text>

                  {/* 4 Specialized Execution Poles */}
                  <rect
                    x="22"
                    y="92"
                    width="172"
                    height="54"
                    rx="6"
                    fill="#141821"
                    stroke="#F4F4F6"
                    strokeOpacity="0.16"
                  />
                  <text
                    x="34"
                    y="112"
                    fill="#D4AF37"
                    fontSize="9"
                    fontFamily="JetBrains Mono, monospace"
                  >
                    PÔLE 01 · BRANDING
                  </text>
                  <text
                    x="34"
                    y="129"
                    fill="#F4F4F6"
                    fontSize="11"
                    fontWeight="600"
                    fontFamily="Plus Jakarta Sans, sans-serif"
                  >
                    Identité &amp; Brand Book 360°
                  </text>

                  <rect
                    x="226"
                    y="92"
                    width="172"
                    height="54"
                    rx="6"
                    fill="#141821"
                    stroke="#F4F4F6"
                    strokeOpacity="0.16"
                  />
                  <text
                    x="238"
                    y="112"
                    fill="#D4AF37"
                    fontSize="9"
                    fontFamily="JetBrains Mono, monospace"
                  >
                    PÔLE 02 · WEB &amp; SAAS
                  </text>
                  <text
                    x="238"
                    y="129"
                    fill="#F4F4F6"
                    fontSize="11"
                    fontWeight="600"
                    fontFamily="Plus Jakarta Sans, sans-serif"
                  >
                    Plateformes &amp; E-Commerce
                  </text>

                  <rect
                    x="22"
                    y="158"
                    width="172"
                    height="54"
                    rx="6"
                    fill="#141821"
                    stroke="#F4F4F6"
                    strokeOpacity="0.16"
                  />
                  <text
                    x="34"
                    y="178"
                    fill="#D4AF37"
                    fontSize="9"
                    fontFamily="JetBrains Mono, monospace"
                  >
                    PÔLE 03 · MOBILE &amp; DESKTOP
                  </text>
                  <text
                    x="34"
                    y="195"
                    fill="#F4F4F6"
                    fontSize="11"
                    fontWeight="600"
                    fontFamily="Plus Jakarta Sans, sans-serif"
                  >
                    Apps Offline-First iOS/Android
                  </text>

                  <rect
                    x="226"
                    y="158"
                    width="172"
                    height="54"
                    rx="6"
                    fill="#141821"
                    stroke="#F4F4F6"
                    strokeOpacity="0.16"
                  />
                  <text
                    x="238"
                    y="178"
                    fill="#D4AF37"
                    fontSize="9"
                    fontFamily="JetBrains Mono, monospace"
                  >
                    PÔLE 04 · GROWTH &amp; CAPI
                  </text>
                  <text
                    x="238"
                    y="195"
                    fill="#F4F4F6"
                    fontSize="11"
                    fontWeight="600"
                    fontFamily="Plus Jakarta Sans, sans-serif"
                  >
                    Paid Media, SEO/GEO &amp; CRO
                  </text>

                  {/* Center Sovereign Hub Node */}
                  <circle
                    cx="210"
                    cy="152"
                    r="14"
                    fill="#0B0D12"
                    stroke="#D4AF37"
                    strokeWidth="1.5"
                  />
                  <circle cx="210" cy="152" r="4.5" fill="#D4AF37" />
                </svg>
              </div>

              <div className="pt-4 border-t border-[#D4AF37]/15 flex items-center justify-between text-xs text-[#A1A7B5]">
                <span>LCP &lt; 1.8s · CLS = 0 · INP &lt; 100ms</span>
                <span className="font-mono-code text-[#D4AF37]">W3C TOKENS</span>
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width 4-Column Governance Proof Strip */}
        <div className="mt-12 sm:mt-16 pt-8 sm:pt-10 border-t border-[#D4AF37]/18 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {t.hero.governanceMetrics.map((metric, idx) => (
            <div key={idx} className="space-y-1.5">
              <div className="font-display text-2xl sm:text-3xl font-bold text-[#D4AF37] font-mono-code">
                {metric.value}
              </div>
              <div className="text-sm font-semibold text-[#F4F4F6]">{metric.label}</div>
              <div className="text-xs text-[#A1A7B5] leading-relaxed">{metric.detail}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
