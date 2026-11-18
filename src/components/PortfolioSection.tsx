import React, { useState } from 'react';
import { ArrowUpRight, Check, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { PoleId } from '../utils/pricingEngine';
import { CaseStudyItem } from '../i18n/fr';

interface PortfolioSectionProps {
  onSelectPoleForBrief: (pole: PoleId) => void;
}

const CaseArchitecturalSvg: React.FC<{ caseId: string; pole: PoleId }> = ({
  caseId,
  pole,
}) => {
  return (
    <svg
      viewBox="0 0 480 270"
      className="w-full h-full object-cover"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={`Architectural schematic for ${caseId}`}
    >
      <rect width="480" height="270" fill="#0B0D12" />
      {/* Subtle Radial Gold Field */}
      <circle cx="380" cy="70" r="160" fill="#D4AF37" fillOpacity="0.06" />
      {/* Technical Grid Lines */}
      <line x1="0" y1="54" x2="480" y2="54" stroke="#D4AF37" strokeOpacity="0.12" />
      <line x1="0" y1="135" x2="480" y2="135" stroke="#D4AF37" strokeOpacity="0.12" />
      <line x1="0" y1="216" x2="480" y2="216" stroke="#D4AF37" strokeOpacity="0.12" />
      <line x1="120" y1="0" x2="120" y2="270" stroke="#D4AF37" strokeOpacity="0.12" />
      <line x1="240" y1="0" x2="240" y2="270" stroke="#D4AF37" strokeOpacity="0.12" />
      <line x1="360" y1="0" x2="360" y2="270" stroke="#D4AF37" strokeOpacity="0.12" />

      {pole === 'MOBILE_DESKTOP' && (
        <>
          <rect
            x="56"
            y="42"
            width="130"
            height="186"
            rx="10"
            fill="#141821"
            stroke="#D4AF37"
            strokeWidth="1.4"
          />
          <rect x="72" y="64" width="98" height="36" rx="4" fill="#0B0D12" />
          <rect x="72" y="112" width="98" height="20" rx="4" fill="#1B202C" />
          <rect x="72" y="140" width="98" height="20" rx="4" fill="#1B202C" />
          <circle cx="121" cy="196" r="12" fill="#D4AF37" fillOpacity="0.2" stroke="#D4AF37" />
          <path d="M186 135H258" stroke="#D4AF37" strokeWidth="1.5" strokeDasharray="4 4" />
          <rect
            x="258"
            y="68"
            width="166"
            height="134"
            rx="8"
            fill="#141821"
            stroke="#F4F4F6"
            strokeOpacity="0.25"
          />
          <text x="276" y="98" fill="#D4AF37" fontSize="10" fontFamily="JetBrains Mono, monospace">
            OFFLINE-FIRST QUEUE
          </text>
          <text x="276" y="122" fill="#F4F4F6" fontSize="13" fontWeight="700" fontFamily="Plus Jakarta Sans, sans-serif">
            SQLite Sync · 99.98%
          </text>
          <rect x="276" y="142" width="130" height="8" rx="4" fill="#0B0D12" />
          <rect x="276" y="142" width="118" height="8" rx="4" fill="#D4AF37" />
        </>
      )}

      {pole === 'BRANDING' && (
        <>
          <rect
            x="64"
            y="46"
            width="352"
            height="178"
            rx="8"
            fill="#141821"
            stroke="#D4AF37"
            strokeWidth="1.4"
          />
          <circle
            cx="154"
            cy="135"
            r="52"
            stroke="#D4AF37"
            strokeWidth="1.4"
          />
          <path d="M154 83L206 135L154 187L102 135L154 83Z" stroke="#D4AF37" strokeWidth="1.2" />
          <circle cx="154" cy="135" r="8" fill="#D4AF37" />
          <line x1="236" y1="68" x2="236" y2="202" stroke="#D4AF37" strokeOpacity="0.2" />
          <text x="258" y="96" fill="#D4AF37" fontSize="10" fontFamily="JetBrains Mono, monospace">
            W3C DESIGN TOKENS
          </text>
          <text x="258" y="122" fill="#F4F4F6" fontSize="14" fontWeight="700" fontFamily="Plus Jakarta Sans, sans-serif">
            Brand Monograph 360°
          </text>
          <rect x="258" y="142" width="28" height="28" rx="4" fill="#0B0D12" stroke="#D4AF37" />
          <rect x="294" y="142" width="28" height="28" rx="4" fill="#D4AF37" />
          <rect x="330" y="142" width="28" height="28" rx="4" fill="#F8F6F1" />
        </>
      )}

      {pole === 'GROWTH' && (
        <>
          <rect
            x="52"
            y="46"
            width="376"
            height="178"
            rx="8"
            fill="#141821"
            stroke="#D4AF37"
            strokeWidth="1.2"
          />
          <polyline
            points="84,186 156,154 228,128 304,88 388,66"
            fill="none"
            stroke="#D4AF37"
            strokeWidth="2.5"
          />
          <circle cx="156" cy="154" r="4" fill="#D4AF37" />
          <circle cx="228" cy="128" r="4" fill="#D4AF37" />
          <circle cx="304" cy="88" r="4" fill="#D4AF37" />
          <circle cx="388" cy="66" r="5" fill="#D4AF37" />
          <text x="84" y="84" fill="#D4AF37" fontSize="10" fontFamily="JetBrains Mono, monospace">
            SERVER-SIDE CAPI · CONSENT MODE V2
          </text>
          <text x="84" y="106" fill="#F4F4F6" fontSize="14" fontWeight="700" fontFamily="Plus Jakarta Sans, sans-serif">
            CAC -42% · 100% ARTCI/GDPR
          </text>
        </>
      )}

      {pole === 'WEB' && (
        <>
          <rect
            x="48"
            y="40"
            width="384"
            height="190"
            rx="8"
            fill="#141821"
            stroke="#D4AF37"
            strokeWidth="1.4"
          />
          <line x1="48" y1="70" x2="432" y2="70" stroke="#D4AF37" strokeOpacity="0.25" />
          <circle cx="68" cy="55" r="4" fill="#D4AF37" />
          <circle cx="82" cy="55" r="4" fill="#A1A7B5" fillOpacity="0.4" />
          <rect x="68" y="88" width="160" height="120" rx="6" fill="#0B0D12" stroke="#D4AF37" strokeOpacity="0.25" />
          <rect x="244" y="88" width="168" height="54" rx="6" fill="#0B0D12" stroke="#D4AF37" strokeOpacity="0.4" />
          <rect x="244" y="154" width="168" height="54" rx="6" fill="#0B0D12" stroke="#D4AF37" strokeOpacity="0.25" />
          <text x="84" y="118" fill="#D4AF37" fontSize="10" fontFamily="JetBrains Mono, monospace">
            SAAS ARCHITECTURE
          </text>
          <text x="84" y="142" fill="#F4F4F6" fontSize="13" fontWeight="700" fontFamily="Plus Jakarta Sans, sans-serif">
            LCP 1.1s · Gemini JSON
          </text>
          <text x="260" y="118" fill="#D4AF37" fontSize="10" fontFamily="JetBrains Mono, monospace">
            N8N + SUPABASE RLS
          </text>
        </>
      )}
    </svg>
  );
};

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({
  onSelectPoleForBrief,
}) => {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<'ALL' | PoleId>('ALL');
  const [selectedCase, setSelectedCase] = useState<CaseStudyItem | null>(null);

  const filterButtons: { id: 'ALL' | PoleId; label: string }[] = [
    { id: 'ALL', label: t.portfolio.filters.ALL },
    { id: 'BRANDING', label: t.portfolio.filters.BRANDING },
    { id: 'WEB', label: t.portfolio.filters.WEB },
    { id: 'MOBILE_DESKTOP', label: t.portfolio.filters.MOBILE_DESKTOP },
    { id: 'GROWTH', label: t.portfolio.filters.GROWTH },
  ];

  const filteredCases =
    activeFilter === 'ALL'
      ? t.portfolio.cases
      : t.portfolio.cases.filter((c) => c.pole === activeFilter);

  return (
    <section
      id="portfolio"
      className="py-16 sm:py-24 px-4 sm:px-8 bg-[#0B0D12] border-b border-[#D4AF37]/18"
    >
      <div className="max-w-[1280px] mx-auto">
        {/* Section Header + Functional Pole Filter Bar */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <p className="text-xs sm:text-[13px] font-mono-code font-semibold text-[#D4AF37] mb-3">
              {t.portfolio.sectionKicker}
            </p>
            <h2 className="font-display text-[clamp(1.75rem,3vw,2.75rem)] font-bold text-[#F4F4F6] leading-[1.12] tracking-tight mb-4 [text-wrap:balance]">
              {t.portfolio.title}
            </h2>
            <p className="text-base text-[#A1A7B5] leading-relaxed">
              {t.portfolio.subtitle}
            </p>
          </div>

          {/* Interactive Filter Controls */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            <div className="inline-flex items-center gap-1 p-1 bg-[#141821] border border-[#D4AF37]/20 rounded-[8px]">
              {filterButtons.map((btn) => {
                const isActive = activeFilter === btn.id;
                return (
                  <button
                    key={btn.id}
                    type="button"
                    onClick={() => setActiveFilter(btn.id)}
                    className={`px-3 py-1.5 rounded-[6px] text-xs font-medium transition-colors duration-180 cursor-pointer whitespace-nowrap shrink-0 ${
                      isActive
                        ? 'bg-[#D4AF37] text-[#0B0D12] font-semibold'
                        : 'text-[#A1A7B5] hover:text-[#F4F4F6]'
                    }`}
                  >
                    {btn.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 2-Column Case Study Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredCases.map((item) => (
            <article
              key={item.id}
              className="rounded-[12px] bg-[#141821] hover:bg-[#1B202C] border border-[#D4AF37]/18 transition-colors duration-180 overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* Lightweight Aspect-Video Architectural SVG Slot */}
                <div className="aspect-video w-full border-b border-[#D4AF37]/18 relative overflow-hidden bg-[#0B0D12]">
                  <CaseArchitecturalSvg caseId={item.id} pole={item.pole} />
                </div>

                <div className="p-6 sm:p-7">
                  {/* Unboxed Metadata Line */}
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono-code text-[#A1A7B5] pb-4 mb-4 border-b border-[#D4AF37]/15">
                    <span className="text-[#D4AF37] font-semibold">{item.poleLabel}</span>
                    <span>{item.location}</span>
                  </div>

                  <h3 className="font-display text-xl sm:text-2xl font-bold text-[#F4F4F6] mb-4 leading-snug">
                    {item.title}
                  </h3>

                  {/* Structured 3-Part Breakdown: Challenge -> Architecture/DA -> ROI Impact */}
                  <div className="space-y-3.5 text-xs sm:text-sm mb-6">
                    <div>
                      <span className="font-mono-code text-[11px] text-[#D4AF37] block mb-0.5">
                        01. {t.portfolio.labels.challenge}
                      </span>
                      <p className="text-[#A1A7B5] leading-relaxed">{item.challenge}</p>
                    </div>

                    <div>
                      <span className="font-mono-code text-[11px] text-[#D4AF37] block mb-0.5">
                        02. {t.portfolio.labels.architecture}
                      </span>
                      <p className="text-[#A1A7B5] leading-relaxed">
                        {item.architectureAndDa}
                      </p>
                    </div>

                    <div>
                      <span className="font-mono-code text-[11px] text-[#10B981] block mb-0.5">
                        03. {t.portfolio.labels.impact}
                      </span>
                      <p className="text-[#F4F4F6] font-medium leading-relaxed">
                        {item.roiImpact}
                      </p>
                    </div>
                  </div>

                  {/* Quantitative Metrics Row */}
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#D4AF37]/15">
                    {item.metrics.map((m, idx) => (
                      <div key={idx}>
                        <div className="font-mono-code text-lg sm:text-xl font-bold text-[#D4AF37]">
                          {m.value}
                        </div>
                        <div className="text-[11px] text-[#A1A7B5]">{m.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Actions */}
              <div className="px-6 sm:px-7 py-4 bg-[#0B0D12]/60 border-t border-[#D4AF37]/15 flex flex-wrap items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => setSelectedCase(item)}
                  className="text-xs font-semibold text-[#F4F4F6] hover:text-[#D4AF37] underline underline-offset-4 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  {t.portfolio.labels.inspectCase}
                </button>

                <button
                  type="button"
                  onClick={() => onSelectPoleForBrief(item.pole)}
                  className="px-3.5 py-2 rounded-[6px] bg-[#D4AF37] hover:bg-[#E3C358] text-[#0B0D12] text-xs font-semibold inline-flex items-center gap-1.5 transition-colors duration-180 cursor-pointer whitespace-nowrap shrink-0"
                >
                  <span>{t.portfolio.labels.configureSimilar}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Case Study Technical Modal */}
      {selectedCase && (
        <div
          className="fixed inset-0 z-[70] bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
          onClick={() => setSelectedCase(null)}
        >
          <div
            className="w-full max-w-2xl rounded-[12px] bg-[#141821] border border-[#D4AF37]/35 text-[#F4F4F6] overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-5 bg-[#0B0D12] border-b border-[#D4AF37]/20 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-mono-code text-[#D4AF37] mb-1">
                  {selectedCase.poleLabel} · {selectedCase.location}
                </p>
                <h3 className="font-display text-lg sm:text-xl font-bold text-[#F4F4F6]">
                  {selectedCase.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCase(null)}
                className="min-h-[40px] min-w-[40px] flex items-center justify-center rounded-[6px] border border-[#D4AF37]/25 text-[#A1A7B5] hover:text-[#F4F4F6] cursor-pointer"
                aria-label={t.portfolio.labels.closeModal}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 sm:p-7 space-y-5 max-h-[75vh] overflow-y-auto">
              <div className="text-xs font-mono-code text-[#A1A7B5]">
                <span>{selectedCase.sector}</span>
                <span aria-hidden="true"> · </span>
                <span>{selectedCase.clientType}</span>
              </div>

              <div className="space-y-4 text-sm">
                <div>
                  <h4 className="font-mono-code text-xs text-[#D4AF37] mb-1">
                    01. {t.portfolio.labels.challenge}
                  </h4>
                  <p className="text-[#A1A7B5] leading-relaxed">{selectedCase.challenge}</p>
                </div>

                <div>
                  <h4 className="font-mono-code text-xs text-[#D4AF37] mb-1">
                    02. {t.portfolio.labels.architecture}
                  </h4>
                  <p className="text-[#A1A7B5] leading-relaxed">
                    {selectedCase.architectureAndDa}
                  </p>
                </div>

                <div>
                  <h4 className="font-mono-code text-xs text-[#10B981] mb-1">
                    03. {t.portfolio.labels.impact}
                  </h4>
                  <p className="text-[#F4F4F6] font-medium leading-relaxed">
                    {selectedCase.roiImpact}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-[#D4AF37]/15">
                <h4 className="font-mono-code text-xs text-[#D4AF37] mb-3">
                  {t.portfolio.labels.deliverablesTitle}
                </h4>
                <ul className="space-y-2 mb-4">
                  {selectedCase.deliverables.map((del, dIdx) => (
                    <li
                      key={dIdx}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-[#F4F4F6]"
                    >
                      <Check className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                      <span>{del}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap items-center gap-2 text-xs font-mono-code text-[#A1A7B5]">
                  {selectedCase.stack.map((tech, tIdx) => (
                    <React.Fragment key={tIdx}>
                      {tIdx > 0 && <span aria-hidden="true">·</span>}
                      <span>{tech}</span>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>

            <div className="px-6 py-4 bg-[#0B0D12] border-t border-[#D4AF37]/20 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => setSelectedCase(null)}
                className="text-xs font-medium text-[#A1A7B5] hover:text-[#F4F4F6] cursor-pointer"
              >
                {t.portfolio.labels.closeModal}
              </button>
              <button
                type="button"
                onClick={() => {
                  const pole = selectedCase.pole;
                  setSelectedCase(null);
                  onSelectPoleForBrief(pole);
                }}
                className="px-4 py-2.5 rounded-[6px] bg-[#D4AF37] hover:bg-[#E3C358] text-[#0B0D12] text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer"
              >
                <span>{t.portfolio.labels.configureSimilar}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
