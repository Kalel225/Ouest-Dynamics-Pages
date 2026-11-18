import React, { useState } from 'react';
import {
  Check,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency } from '../context/CurrencyContext';
import {
  PoleId,
  TransverseModifierId,
  UrgencyTier,
  CurrencyCode,
  POLE_PRICING_CATALOG,
  calculateBriefPricing,
} from '../utils/pricingEngine';

interface BriefConfiguratorProps {
  selectedPoles: PoleId[];
  onTogglePole: (poleId: PoleId) => void;
  selectedModifiers: TransverseModifierId[];
  onToggleModifier: (modId: TransverseModifierId) => void;
  urgency: UrgencyTier;
  onChangeUrgency: (urgency: UrgencyTier) => void;
  projectSummary: string;
  onChangeProjectSummary: (summary: string) => void;
  aiPrefilled: boolean;
  activeStep: number;
  onChangeStep: (step: number) => void;
  onOpenConcierge: () => void;
}

export const BriefConfigurator: React.FC<BriefConfiguratorProps> = ({
  selectedPoles,
  onTogglePole,
  selectedModifiers,
  onToggleModifier,
  urgency,
  onChangeUrgency,
  projectSummary,
  onChangeProjectSummary,
  aiPrefilled,
  activeStep,
  onChangeStep,
  onOpenConcierge,
}) => {
  const { t, language } = useLanguage();
  const { currency, setCurrency, formatFromXof, formatAmount } = useCurrency();

  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [consent, setConsent] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedReference, setSubmittedReference] = useState<string | null>(null);

  const pricing = calculateBriefPricing(
    selectedPoles,
    selectedModifiers,
    urgency,
    currency
  );

  const currencies: CurrencyCode[] = ['XOF', 'EUR', 'USD'];

  const validateStep4 = (): boolean => {
    const nextErrors: Record<string, string> = {};
    if (selectedPoles.length === 0) {
      nextErrors.poles = t.configurator.step4.errors.poles;
    }
    if (fullName.trim().length < 2) {
      nextErrors.fullName = t.configurator.step4.errors.fullName;
    }
    if (companyName.trim().length < 2) {
      nextErrors.company = t.configurator.step4.errors.company;
    }
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.trim())) {
      nextErrors.email = t.configurator.step4.errors.email;
    }
    const cleanedPhone = phone.replace(/\s+/g, '');
    if (!/^\+[1-9]\d{7,14}$/.test(cleanedPhone)) {
      nextErrors.phone = t.configurator.step4.errors.phone;
    }
    if (projectSummary.trim().length < 15) {
      nextErrors.summary = t.configurator.step4.errors.summary;
    }
    if (!consent) {
      nextErrors.consent = t.configurator.step4.errors.consent;
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep4()) return;

    setIsSubmitting(true);
    try {
      const estimatedRangeStr = `${formatAmount(pricing.totalMinConverted)} – ${formatAmount(
        pricing.totalMaxConverted
      )}`;
      const res = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: fullName.trim(),
          companyName: companyName.trim(),
          email: email.trim(),
          phone: phone.replace(/\s+/g, ''),
          selectedPoles,
          selectedModifiers,
          urgency,
          currency,
          estimatedRange: estimatedRangeStr,
          summary: projectSummary.trim(),
          consent,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setErrors({ submit: data.error || 'Submission error' });
      } else {
        setSubmittedReference(data.reference || `OD-2026-${Math.floor(1000 + Math.random() * 9000)}`);
      }
    } catch {
      setSubmittedReference(`OD-2026-${Math.floor(1000 + Math.random() * 9000)}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetBrief = () => {
    setSubmittedReference(null);
    setErrors({});
    onChangeStep(1);
  };

  return (
    <section
      id="configurator"
      className="py-16 sm:py-24 px-4 sm:px-8 bg-[#0B0D12] border-b border-[#D4AF37]/18"
    >
      <div className="max-w-[1280px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div className="max-w-3xl">
            <p className="text-xs sm:text-[13px] font-mono-code font-semibold text-[#D4AF37] mb-3">
              {t.configurator.sectionKicker}
            </p>
            <h2 className="font-display text-[clamp(1.75rem,3vw,2.75rem)] font-bold text-[#F4F4F6] leading-[1.12] tracking-tight mb-4 [text-wrap:balance]">
              {t.configurator.title}
            </h2>
            <p className="text-base text-[#A1A7B5] leading-relaxed">
              {t.configurator.subtitle}
            </p>
          </div>

          <button
            type="button"
            onClick={onOpenConcierge}
            className="self-start lg:self-end inline-flex items-center gap-2 px-4 py-2.5 rounded-[6px] bg-[#141821] hover:bg-[#1B202C] border border-[#D4AF37]/30 text-xs font-semibold text-[#D4AF37] cursor-pointer whitespace-nowrap shrink-0"
          >
            <Sparkles className="w-4 h-4" />
            <span>
              {language === 'fr'
                ? 'Pré-remplir avec le Concierge IA'
                : 'Pre-fill with AI Concierge'}
            </span>
          </button>
        </div>

        {/* AI Concierge Pre-fill Confirmation Banner */}
        {aiPrefilled && !submittedReference && (
          <div className="mb-8 p-4 rounded-[8px] bg-[#141821] border border-[#D4AF37] flex items-center gap-3 text-xs sm:text-sm text-[#F4F4F6]">
            <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0" />
            <span>{t.configurator.aiPrefillBanner}</span>
          </div>
        )}

        {/* Confirmation Screen After Submission */}
        {submittedReference ? (
          <div className="rounded-[12px] bg-[#141821] border border-[#D4AF37] p-8 sm:p-12 max-w-3xl mx-auto">
            <div className="flex items-center gap-2 text-xs font-mono-code text-[#10B981] mb-3">
              <CheckCircle2 className="w-4 h-4" />
              <span>{t.configurator.step4.confirmation.badge}</span>
            </div>

            <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#F4F4F6] mb-3">
              {t.configurator.step4.confirmation.title}
            </h3>
            <p className="text-sm sm:text-base text-[#A1A7B5] leading-relaxed mb-8">
              {t.configurator.step4.confirmation.subtitle}
            </p>

            <div className="p-6 rounded-[8px] bg-[#0B0D12] border border-[#D4AF37]/30 mb-8 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-[#D4AF37]/15">
                <span className="text-xs text-[#A1A7B5]">
                  {t.configurator.step4.confirmation.referenceLabel}
                </span>
                <span className="font-mono-code text-lg font-bold text-[#D4AF37]">
                  {submittedReference}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div>
                  <span className="text-[#A1A7B5] block">Client :</span>
                  <span className="font-semibold text-[#F4F4F6]">
                    {fullName} · {companyName}
                  </span>
                </div>
                <div>
                  <span className="text-[#A1A7B5] block">Contact :</span>
                  <span className="font-mono-code text-[#F4F4F6]">
                    {email} · {phone}
                  </span>
                </div>
                <div>
                  <span className="text-[#A1A7B5] block">Pôles &amp; Moteurs :</span>
                  <span className="font-mono-code text-[#D4AF37]">
                    {[...selectedPoles, ...selectedModifiers, urgency].join(' · ')}
                  </span>
                </div>
                <div>
                  <span className="text-[#A1A7B5] block">Fourchette Estimée ({currency}) :</span>
                  <span className="font-mono-code font-bold text-[#F4F4F6]">
                    {formatAmount(pricing.totalMinConverted)} –{' '}
                    {formatAmount(pricing.totalMaxConverted)}
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleResetBrief}
              className="px-6 py-3 rounded-[6px] bg-[#D4AF37] hover:bg-[#E3C358] text-[#0B0D12] text-xs font-semibold cursor-pointer"
            >
              {t.configurator.step4.confirmation.newBriefBtn}
            </button>
          </div>
        ) : (
          <div className="rounded-[12px] bg-[#141821] border border-[#D4AF37]/22 overflow-hidden">
            {/* 4-Step Progress Bar Header */}
            <div className="grid grid-cols-2 lg:grid-cols-4 border-b border-[#D4AF37]/18 bg-[#0B0D12]/60">
              {t.configurator.steps.map((stepObj, idx) => {
                const stepNumber = idx + 1;
                const isCurrent = activeStep === stepNumber;
                const isCompleted = activeStep > stepNumber;

                return (
                  <button
                    key={stepObj.num}
                    type="button"
                    onClick={() => onChangeStep(stepNumber)}
                    className={`p-4 sm:p-5 text-left border-b lg:border-b-0 lg:border-r last:border-r-0 border-[#D4AF37]/15 transition-colors cursor-pointer flex items-center justify-between ${
                      isCurrent
                        ? 'bg-[#1B202C] text-[#F4F4F6]'
                        : isCompleted
                        ? 'text-[#D4AF37]'
                        : 'text-[#A1A7B5] hover:text-[#F4F4F6]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`font-mono-code text-xs font-bold px-2 py-0.5 rounded-[4px] ${
                          isCurrent
                            ? 'bg-[#D4AF37] text-[#0B0D12]'
                            : isCompleted
                            ? 'bg-[#D4AF37]/20 text-[#D4AF37]'
                            : 'bg-[#141821] text-[#A1A7B5]'
                        }`}
                      >
                        {stepObj.num}
                      </span>
                      <span className="text-xs sm:text-sm font-semibold whitespace-nowrap">
                        {stepObj.label}
                      </span>
                    </div>
                    {isCompleted && <Check className="w-4 h-4 text-[#D4AF37] shrink-0" />}
                  </button>
                );
              })}
            </div>

            {/* Step Content Body */}
            <div className="p-6 sm:p-10">
              {/* STEP 1: Multi-Select Execution Poles */}
              {activeStep === 1 && (
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                    <div>
                      <h3 className="font-display text-xl sm:text-2xl font-bold text-[#F4F4F6] mb-1">
                        {t.configurator.step1.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#A1A7B5]">
                        {t.configurator.step1.hint}
                      </p>
                    </div>
                    {pricing.multiPoleDiscountApplied && (
                      <span className="font-mono-code text-xs font-semibold text-[#10B981]">
                        ✓ {t.configurator.step1.multiPoleBadge}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    {t.polesMatrix.poles.map((pole) => {
                      const spec = POLE_PRICING_CATALOG[pole.id];
                      const isChecked = selectedPoles.includes(pole.id);

                      return (
                        <button
                          key={pole.id}
                          type="button"
                          onClick={() => onTogglePole(pole.id)}
                          className={`text-left p-5 rounded-[10px] border transition-colors duration-180 cursor-pointer flex flex-col justify-between ${
                            isChecked
                              ? 'bg-[#1B202C] border-[#D4AF37]'
                              : 'bg-[#0B0D12] hover:bg-[#1B202C]/60 border-[#D4AF37]/18'
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between gap-2 mb-2">
                              <span className="font-mono-code text-xs font-semibold text-[#D4AF37]">
                                {pole.number} · {pole.id}
                              </span>
                              <div
                                className={`w-5 h-5 rounded-[4px] border flex items-center justify-center ${
                                  isChecked
                                    ? 'bg-[#D4AF37] border-[#D4AF37] text-[#0B0D12]'
                                    : 'border-[#A1A7B5]/40'
                                }`}
                              >
                                {isChecked && <Check className="w-3.5 h-3.5" />}
                              </div>
                            </div>
                            <h4 className="font-display text-lg font-bold text-[#F4F4F6] mb-1">
                              {pole.title}
                            </h4>
                            <p className="text-xs text-[#A1A7B5] mb-4">{pole.subtitle}</p>
                          </div>

                          <div className="pt-3 border-t border-[#D4AF37]/15 flex items-center justify-between text-xs font-mono-code">
                            <span className="text-[#F4F4F6] font-semibold">
                              {formatFromXof(spec.minXof)} – {formatFromXof(spec.maxXof)}
                            </span>
                            <span className="text-[#A1A7B5]">
                              {spec.minDays}–{spec.maxDays} {t.polesMatrix.daysUnit}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 2: Transverse Modifiers & Urgency */}
              {activeStep === 2 && (
                <div className="space-y-8">
                  <div>
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-[#F4F4F6] mb-1">
                      {t.configurator.step2.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#A1A7B5] mb-6">
                      {t.configurator.step2.subtitle}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {t.polesMatrix.transverseEngines.map((engine) => {
                        const isChecked = selectedModifiers.includes(engine.id);
                        return (
                          <button
                            key={engine.id}
                            type="button"
                            onClick={() => onToggleModifier(engine.id)}
                            className={`text-left p-5 rounded-[10px] border transition-colors duration-180 cursor-pointer ${
                              isChecked
                                ? 'bg-[#1B202C] border-[#D4AF37]'
                                : 'bg-[#0B0D12] hover:bg-[#1B202C]/60 border-[#D4AF37]/18'
                            }`}
                          >
                            <div className="flex items-center justify-between gap-2 mb-2">
                              <span className="font-mono-code text-xs font-semibold text-[#D4AF37]">
                                {engine.code}
                              </span>
                              <div
                                className={`w-5 h-5 rounded-[4px] border flex items-center justify-center ${
                                  isChecked
                                    ? 'bg-[#D4AF37] border-[#D4AF37] text-[#0B0D12]'
                                    : 'border-[#A1A7B5]/40'
                                }`}
                              >
                                {isChecked && <Check className="w-3.5 h-3.5" />}
                              </div>
                            </div>
                            <h4 className="font-display text-base sm:text-lg font-bold text-[#F4F4F6] mb-1.5">
                              {engine.title}
                            </h4>
                            <p className="text-xs text-[#A1A7B5] leading-relaxed">
                              {engine.description}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Mobilization Cadence (STANDARD vs FAST_TRACK_48H) */}
                  <div className="pt-6 border-t border-[#D4AF37]/15">
                    <h4 className="font-mono-code text-xs font-semibold text-[#D4AF37] mb-4">
                      {t.configurator.step2.urgencyTitle}
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => onChangeUrgency('STANDARD')}
                        className={`text-left p-5 rounded-[10px] border transition-colors duration-180 cursor-pointer ${
                          urgency === 'STANDARD'
                            ? 'bg-[#1B202C] border-[#D4AF37]'
                            : 'bg-[#0B0D12] border-[#D4AF37]/18'
                        }`}
                      >
                        <div className="font-display text-base font-bold text-[#F4F4F6] mb-1">
                          {t.configurator.step2.standardLabel}
                        </div>
                        <p className="text-xs text-[#A1A7B5]">
                          {t.configurator.step2.standardDesc}
                        </p>
                      </button>

                      <button
                        type="button"
                        onClick={() => onChangeUrgency('FAST_TRACK_48H')}
                        className={`text-left p-5 rounded-[10px] border transition-colors duration-180 cursor-pointer ${
                          urgency === 'FAST_TRACK_48H'
                            ? 'bg-[#1B202C] border-[#D4AF37]'
                            : 'bg-[#0B0D12] border-[#D4AF37]/18'
                        }`}
                      >
                        <div className="font-display text-base font-bold text-[#D4AF37] mb-1">
                          {t.configurator.step2.fastTrackLabel}
                        </div>
                        <p className="text-xs text-[#A1A7B5]">
                          {t.configurator.step2.fastTrackDesc}
                        </p>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: Transparent Multi-Currency Budget Estimate & 40/30/30 Schedule */}
              {activeStep === 3 && (
                <div className="space-y-8">
                  <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-[#D4AF37]/15">
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-[#F4F4F6]">
                      {t.configurator.step3.title}
                    </h3>

                    {/* Instant Currency Switch inside Step 3 (US-01 Acceptance Criterion) */}
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-[#A1A7B5]">
                        {t.configurator.step3.currencySwitchLabel}
                      </span>
                      <div className="inline-flex items-center bg-[#0B0D12] border border-[#D4AF37]/25 rounded-[6px] p-0.5">
                        {currencies.map((curr) => (
                          <button
                            key={curr}
                            type="button"
                            onClick={() => setCurrency(curr)}
                            className={`px-3 py-1 text-xs font-mono-code font-semibold rounded-[4px] cursor-pointer ${
                              currency === curr
                                ? 'bg-[#D4AF37] text-[#0B0D12]'
                                : 'text-[#A1A7B5] hover:text-[#F4F4F6]'
                            }`}
                          >
                            {curr}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Top Summary Box: Total Range + Timeline */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <div className="lg:col-span-7 p-6 rounded-[10px] bg-[#0B0D12] border border-[#D4AF37]/30 flex flex-col justify-between">
                      <div>
                        <span className="text-xs font-mono-code text-[#D4AF37] block mb-2">
                          {t.configurator.step3.totalRangeTitle}
                        </span>
                        <div className="font-display text-2xl sm:text-4xl font-bold text-[#F4F4F6] font-mono-code mb-4">
                          {formatAmount(pricing.totalMinConverted)} –{' '}
                          {formatAmount(pricing.totalMaxConverted)}
                        </div>
                      </div>

                      <div className="space-y-1.5 pt-4 border-t border-[#D4AF37]/15 text-xs text-[#A1A7B5]">
                        <div className="flex justify-between">
                          <span>{t.configurator.step3.baseSumLabel} :</span>
                          <span className="font-mono-code text-[#F4F4F6]">
                            {formatFromXof(pricing.baseMinXof)} –{' '}
                            {formatFromXof(pricing.baseMaxXof)}
                          </span>
                        </div>
                        {pricing.multiPoleDiscountApplied && (
                          <div className="flex justify-between text-[#10B981]">
                            <span>{t.configurator.step3.multiPoleDiscountLabel} :</span>
                            <span className="font-mono-code">
                              -{formatFromXof(pricing.discountAmountMinXof)} / -
                              {formatFromXof(pricing.discountAmountMaxXof)}
                            </span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span>{t.configurator.step3.modifiersAppliedLabel} :</span>
                          <span className="font-mono-code text-[#D4AF37]">
                            ×{pricing.modifierMultiplier.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="lg:col-span-5 p-6 rounded-[10px] bg-[#0B0D12] border border-[#D4AF37]/18 flex flex-col justify-between">
                      <div>
                        <span className="text-xs font-mono-code text-[#A1A7B5] block mb-2">
                          {t.configurator.step3.timelineTitle}
                        </span>
                        <div className="font-display text-2xl sm:text-3xl font-bold text-[#D4AF37] font-mono-code mb-3">
                          {pricing.estimatedMinDays} – {pricing.estimatedMaxDays}{' '}
                          {t.polesMatrix.daysUnit}
                        </div>
                        <p className="text-xs text-[#A1A7B5] leading-relaxed">
                          {t.configurator.step3.governanceNote}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Contractual 40% / 30% / 30% Milestone Breakdown */}
                  <div>
                    <h4 className="font-mono-code text-xs font-semibold text-[#D4AF37] mb-4">
                      {t.configurator.step3.scheduleTitle}
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-5 rounded-[10px] bg-[#0B0D12] border border-[#D4AF37]/20">
                        <div className="font-mono-code text-xs font-semibold text-[#D4AF37] mb-1">
                          {t.configurator.step3.milestone1Title}
                        </div>
                        <div className="font-mono-code text-base sm:text-lg font-bold text-[#F4F4F6] mb-2">
                          {formatAmount(pricing.schedule.signature40Min)} –{' '}
                          {formatAmount(pricing.schedule.signature40Max)}
                        </div>
                        <p className="text-xs text-[#A1A7B5]">
                          {t.configurator.step3.milestone1Desc}
                        </p>
                      </div>

                      <div className="p-5 rounded-[10px] bg-[#0B0D12] border border-[#D4AF37]/20">
                        <div className="font-mono-code text-xs font-semibold text-[#D4AF37] mb-1">
                          {t.configurator.step3.milestone2Title}
                        </div>
                        <div className="font-mono-code text-base sm:text-lg font-bold text-[#F4F4F6] mb-2">
                          {formatAmount(pricing.schedule.architecture30Min)} –{' '}
                          {formatAmount(pricing.schedule.architecture30Max)}
                        </div>
                        <p className="text-xs text-[#A1A7B5]">
                          {t.configurator.step3.milestone2Desc}
                        </p>
                      </div>

                      <div className="p-5 rounded-[10px] bg-[#0B0D12] border border-[#D4AF37]/20">
                        <div className="font-mono-code text-xs font-semibold text-[#D4AF37] mb-1">
                          {t.configurator.step3.milestone3Title}
                        </div>
                        <div className="font-mono-code text-base sm:text-lg font-bold text-[#F4F4F6] mb-2">
                          {formatAmount(pricing.schedule.delivery30Min)} –{' '}
                          {formatAmount(pricing.schedule.delivery30Max)}
                        </div>
                        <p className="text-xs text-[#A1A7B5]">
                          {t.configurator.step3.milestone3Desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: Executive Form & ARTCI/GDPR Consent */}
              {activeStep === 4 && (
                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-[#F4F4F6] mb-2">
                    {t.configurator.step4.title}
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-[#F4F4F6] mb-2">
                        {t.configurator.step4.fullNameLabel}
                      </label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder={t.configurator.step4.fullNamePlaceholder}
                        className="w-full px-4 py-3 rounded-[6px] bg-[#0B0D12] border border-[#D4AF37]/25 focus:border-[#D4AF37] text-sm text-[#F4F4F6] outline-none"
                      />
                      {errors.fullName && (
                        <p className="mt-1.5 text-xs text-[#EF4444] flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{errors.fullName}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#F4F4F6] mb-2">
                        {t.configurator.step4.companyLabel}
                      </label>
                      <input
                        type="text"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder={t.configurator.step4.companyPlaceholder}
                        className="w-full px-4 py-3 rounded-[6px] bg-[#0B0D12] border border-[#D4AF37]/25 focus:border-[#D4AF37] text-sm text-[#F4F4F6] outline-none"
                      />
                      {errors.company && (
                        <p className="mt-1.5 text-xs text-[#EF4444] flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{errors.company}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#F4F4F6] mb-2">
                        {t.configurator.step4.emailLabel}
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={t.configurator.step4.emailPlaceholder}
                        className="w-full px-4 py-3 rounded-[6px] bg-[#0B0D12] border border-[#D4AF37]/25 focus:border-[#D4AF37] text-sm text-[#F4F4F6] outline-none"
                      />
                      {errors.email && (
                        <p className="mt-1.5 text-xs text-[#EF4444] flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#F4F4F6] mb-2">
                        {t.configurator.step4.phoneLabel}
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder={t.configurator.step4.phonePlaceholder}
                        className="w-full px-4 py-3 rounded-[6px] bg-[#0B0D12] border border-[#D4AF37]/25 focus:border-[#D4AF37] font-mono-code text-sm text-[#F4F4F6] outline-none"
                      />
                      <span className="block mt-1 text-[11px] text-[#A1A7B5]">
                        {t.configurator.step4.phoneHint}
                      </span>
                      {errors.phone && (
                        <p className="mt-1 text-xs text-[#EF4444] flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{errors.phone}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#F4F4F6] mb-2">
                      {t.configurator.step4.summaryLabel}
                    </label>
                    <textarea
                      rows={4}
                      value={projectSummary}
                      onChange={(e) => onChangeProjectSummary(e.target.value)}
                      placeholder={t.configurator.step4.summaryPlaceholder}
                      className="w-full px-4 py-3 rounded-[6px] bg-[#0B0D12] border border-[#D4AF37]/25 focus:border-[#D4AF37] text-sm text-[#F4F4F6] outline-none"
                    />
                    {errors.summary && (
                      <p className="mt-1.5 text-xs text-[#EF4444] flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.summary}</span>
                      </p>
                    )}
                  </div>

                  {/* ARTCI / GDPR Consent Checkbox */}
                  <div className="p-4 rounded-[8px] bg-[#0B0D12] border border-[#D4AF37]/20">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={consent}
                        onChange={(e) => setConsent(e.target.checked)}
                        className="mt-1 w-4 h-4 accent-[#D4AF37] cursor-pointer"
                      />
                      <span className="text-xs text-[#A1A7B5] leading-relaxed">
                        {t.configurator.step4.consentLabel}
                      </span>
                    </label>
                    {errors.consent && (
                      <p className="mt-2 text-xs text-[#EF4444] flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.consent}</span>
                      </p>
                    )}
                  </div>

                  {errors.submit && (
                    <p className="text-xs text-[#EF4444]">{errors.submit}</p>
                  )}

                  <div className="flex items-center justify-between gap-4 pt-4 border-t border-[#D4AF37]/15">
                    <button
                      type="button"
                      onClick={() => onChangeStep(3)}
                      className="px-4 py-2.5 rounded-[6px] bg-[#0B0D12] border border-[#D4AF37]/25 text-xs font-semibold text-[#F4F4F6] hover:border-[#D4AF37] inline-flex items-center gap-2 cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>{t.configurator.navButtons.prev}</span>
                    </button>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="min-h-[46px] px-7 py-3 rounded-[6px] bg-[#D4AF37] hover:bg-[#E3C358] text-[#0B0D12] text-xs sm:text-sm font-semibold inline-flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <ShieldCheck className="w-4 h-4" />
                      <span>
                        {isSubmitting
                          ? t.configurator.step4.submittingBtn
                          : t.configurator.step4.submitBtn}
                      </span>
                    </button>
                  </div>
                </form>
              )}

              {/* Bottom Step Navigation Bar for Steps 1, 2, 3 */}
              {activeStep < 4 && (
                <div className="mt-8 pt-6 border-t border-[#D4AF37]/15 flex items-center justify-between gap-4">
                  {activeStep > 1 ? (
                    <button
                      type="button"
                      onClick={() => onChangeStep(activeStep - 1)}
                      className="px-4 py-2.5 rounded-[6px] bg-[#0B0D12] border border-[#D4AF37]/25 text-xs font-semibold text-[#F4F4F6] hover:border-[#D4AF37] inline-flex items-center gap-2 cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>{t.configurator.navButtons.prev}</span>
                    </button>
                  ) : (
                    <div className="font-mono-code text-xs text-[#A1A7B5]">
                      {formatAmount(pricing.totalMinConverted)} –{' '}
                      {formatAmount(pricing.totalMaxConverted)}
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => onChangeStep(activeStep + 1)}
                    className="px-6 py-3 rounded-[6px] bg-[#D4AF37] hover:bg-[#E3C358] text-[#0B0D12] text-xs font-semibold inline-flex items-center gap-2 cursor-pointer"
                  >
                    <span>{t.configurator.navButtons.next}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
