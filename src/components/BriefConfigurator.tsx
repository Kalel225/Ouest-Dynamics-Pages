import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
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
  onOpenConcierge: () => void;
  onOpenPrivacy: () => void;
}

const DisciplineGlyph: React.FC<{ id: PoleId; active: boolean }> = ({ id, active }) => {
  const stroke = active ? '#EFECE6' : '#141311';
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
      {id === 'BRANDING' && (
        <>
          <circle cx="18" cy="18" r="12" stroke={stroke} strokeWidth="1.1" />
          <circle cx="18" cy="18" r="3" fill={stroke} />
        </>
      )}
      {id === 'WEB' && (
        <>
          <rect x="6" y="8" width="24" height="20" stroke={stroke} strokeWidth="1.1" />
          <line x1="6" y1="14" x2="30" y2="14" stroke={stroke} strokeWidth="1.1" />
        </>
      )}
      {id === 'MOBILE_DESKTOP' && (
        <>
          <rect x="11" y="5" width="14" height="26" stroke={stroke} strokeWidth="1.1" />
          <line x1="15" y1="27" x2="21" y2="27" stroke={stroke} strokeWidth="1.1" />
        </>
      )}
      {id === 'GROWTH' && (
        <>
          <polyline points="6,26 14,18 20,22 30,10" stroke={stroke} strokeWidth="1.25" />
          <polyline points="24,10 30,10 30,16" stroke={stroke} strokeWidth="1.25" />
        </>
      )}
    </svg>
  );
};

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
  onOpenConcierge,
  onOpenPrivacy,
}) => {
  const { t } = useLanguage();
  const { currency, setCurrency, formatPrice, rangeParts } = useCurrency();

  const [step, setStep] = useState<'select' | 'contact' | 'done'>('select');
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [consent, setConsent] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState('');

  const hasSelection = selectedPoles.length > 0;
  const pricing = calculateBriefPricing(
    selectedPoles,
    selectedModifiers,
    urgency,
    currency
  );
  const totalParts = rangeParts(pricing.totalMinXof, pricing.totalMaxXof);
  const currencies: CurrencyCode[] = ['XOF', 'EUR', 'USD'];

  const validate = (): boolean => {
    const next: Record<string, string> = {};
    if (fullName.trim().length < 2) next.fullName = t.estimate.contact.errors.name;
    if (companyName.trim().length < 2) next.companyName = t.estimate.contact.errors.company;
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.trim())) {
      next.email = t.estimate.contact.errors.email;
    }
    const cleanPhone = phone.replace(/\s+/g, '');
    if (!/^\+[1-9]\d{7,14}$/.test(cleanPhone)) {
      next.phone = t.estimate.contact.errors.phone;
    }
    if (projectSummary.trim().length < 15) {
      next.summary = t.estimate.contact.errors.message;
    }
    if (!consent) {
      next.consent = t.estimate.contact.errors.consent;
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: fullName.trim(),
          companyName: companyName.trim(),
          email: email.trim(),
          phone: phone.replace(/\s+/g, ''),
          selectedPoles: hasSelection ? selectedPoles : ['WEB'],
          selectedModifiers,
          urgency,
          currency,
          estimatedRange: `${totalParts.low} – ${totalParts.high}${totalParts.unit ? ` ${totalParts.unit}` : ''}`,
          summary: projectSummary.trim(),
          consent,
        }),
      });

      const data = await res.json();
      if (res.status === 429) {
        setErrors({ submit: t.estimate.contact.errors.rateLimit });
        return;
      }
      if (!res.ok) {
        setErrors({ submit: data.error || t.estimate.contact.errors.server });
        return;
      }

      setSubmittedRef(data.reference || '');
      setStep('done');
    } catch {
      setErrors({ submit: t.estimate.contact.errors.network });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetAll = () => {
    setErrors({});
    setSubmittedRef('');
    setStep('select');
  };

  return (
    <section
      id="estimate"
      className="py-16 sm:py-24 px-5 sm:px-8 bg-[#EFECE6] border-b border-[#141311]/10"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-6 border-b border-[#141311]/10">
          <div className="space-y-1.5">
            <h2 className="display-section text-2xl sm:text-3xl text-[#141311]">
              {t.services.title}
            </h2>
            <p className="text-sm text-[#141311]/60">{t.services.intro}</p>
          </div>

          <button
            type="button"
            onClick={onOpenConcierge}
            className="self-start sm:self-end px-4 py-2 bg-[#E4DFD5] hover:bg-[#D8D1C4] text-[11px] font-medium uppercase tracking-[0.1em] text-[#141311] press cursor-pointer whitespace-nowrap"
          >
            {t.concierge.open}
          </button>
        </div>

        {aiPrefilled && step !== 'done' && (
          <div className="mb-6 px-4 py-3 bg-[#E4DFD5] text-xs text-[#141311]">
            {t.estimate.prefilled}
          </div>
        )}

        {step === 'done' ? (
          <div className="max-w-lg bg-[#E4DFD5]/60 p-8 space-y-6">
            <div className="space-y-2">
              <h3 className="display-section text-2xl text-[#141311]">
                {t.estimate.done.title(fullName.split(' ')[0] || '')}
              </h3>
              <p className="text-sm text-[#141311]/70">{t.estimate.done.text}</p>
            </div>
            {submittedRef && (
              <div className="py-3 border-y border-[#141311]/12 flex items-center justify-between text-xs uppercase">
                <span className="text-[#141311]/60">{t.estimate.done.reference}</span>
                <span className="font-semibold text-[#141311] tnum">{submittedRef}</span>
              </div>
            )}
            <button
              type="button"
              onClick={resetAll}
              className="px-6 py-2.5 bg-[#141311] hover:bg-[#2C2925] text-[#EFECE6] text-xs uppercase tracking-[0.1em] press cursor-pointer"
            >
              {t.estimate.done.again}
            </button>
          </div>
        ) : step === 'contact' ? (
          <div className="max-w-2xl bg-[#E4DFD5]/55 p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div className="flex items-center justify-between gap-4 pb-4 border-b border-[#141311]/12">
                <div>
                  <h3 className="text-base font-semibold text-[#141311]">
                    {t.estimate.contact.title}
                  </h3>
                  <p className="text-xs text-[#141311]/60 mt-1">{t.estimate.contact.intro}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setStep('select')}
                  className="px-3 py-1.5 bg-[#E4DFD5] hover:bg-[#D8D1C4] text-[11px] uppercase tracking-[0.08em] text-[#141311] press cursor-pointer shrink-0"
                >
                  {t.estimate.contact.back}
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.08em] text-[#141311]/75 mb-1.5">
                    {t.estimate.contact.name}
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={t.estimate.contact.namePh}
                    className="w-full px-3.5 py-2.5 bg-[#EFECE6] border-b border-[#141311]/25 focus:border-[#141311] text-sm text-[#141311] outline-none"
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-xs text-red-700">{errors.fullName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-[0.08em] text-[#141311]/75 mb-1.5">
                    {t.estimate.contact.company}
                  </label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder={t.estimate.contact.companyPh}
                    className="w-full px-3.5 py-2.5 bg-[#EFECE6] border-b border-[#141311]/25 focus:border-[#141311] text-sm text-[#141311] outline-none"
                  />
                  {errors.companyName && (
                    <p className="mt-1 text-xs text-red-700">{errors.companyName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-[0.08em] text-[#141311]/75 mb-1.5">
                    {t.estimate.contact.email}
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.estimate.contact.emailPh}
                    className="w-full px-3.5 py-2.5 bg-[#EFECE6] border-b border-[#141311]/25 focus:border-[#141311] text-sm text-[#141311] outline-none"
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-700">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-[0.08em] text-[#141311]/75 mb-1.5">
                    {t.estimate.contact.phone}
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={t.estimate.contact.phonePh}
                    className="w-full px-3.5 py-2.5 bg-[#EFECE6] border-b border-[#141311]/25 focus:border-[#141311] text-sm text-[#141311] outline-none tnum"
                  />
                  <span className="block mt-1 text-[11px] text-[#141311]/55">
                    {t.estimate.contact.phoneHint}
                  </span>
                  {errors.phone && (
                    <p className="mt-1 text-xs text-red-700">{errors.phone}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-[0.08em] text-[#141311]/75 mb-1.5">
                  {t.estimate.contact.message}
                </label>
                <textarea
                  rows={3}
                  value={projectSummary}
                  onChange={(e) => onChangeProjectSummary(e.target.value)}
                  placeholder={t.estimate.contact.messagePh}
                  className="w-full px-3.5 py-2.5 bg-[#EFECE6] border-b border-[#141311]/25 focus:border-[#141311] text-sm text-[#141311] outline-none"
                />
                {errors.summary && (
                  <p className="mt-1 text-xs text-red-700">{errors.summary}</p>
                )}
              </div>

              <div>
                <label className="flex items-start gap-2.5 cursor-pointer text-xs text-[#141311]/70">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-0.5 w-3.5 h-3.5 accent-[#141311] cursor-pointer"
                  />
                  <span>
                    {t.estimate.contact.consentBefore}
                    <button
                      type="button"
                      onClick={onOpenPrivacy}
                      className="text-[#141311] underline cursor-pointer"
                    >
                      {t.estimate.contact.consentLink}
                    </button>
                    {t.estimate.contact.consentAfter}
                  </span>
                </label>
                {errors.consent && (
                  <p className="mt-1 text-xs text-red-700">{errors.consent}</p>
                )}
              </div>

              {errors.submit && <p className="text-xs text-red-700">{errors.submit}</p>}

              <div className="pt-3 flex flex-wrap items-center justify-between gap-4 border-t border-[#141311]/12">
                <div className="text-xs text-[#141311]/70 tnum uppercase">
                  {totalParts.low} – {totalParts.high} {totalParts.unit}
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="min-h-[44px] px-7 py-2.5 bg-[#141311] hover:bg-[#2C2925] disabled:opacity-40 text-[#EFECE6] text-xs uppercase tracking-[0.12em] press cursor-pointer"
                >
                  {isSubmitting
                    ? t.estimate.contact.submitting
                    : t.estimate.contact.submit}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="space-y-8">
            {/* 4-Column Flat Beige Grid (borderless buttons with subtle fill contrast) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {t.services.items.map((service, idx) => {
                const spec = POLE_PRICING_CATALOG[service.id];
                const active = selectedPoles.includes(service.id);

                return (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => onTogglePole(service.id)}
                    aria-pressed={active}
                    className={`text-left p-6 transition-all press cursor-pointer flex flex-col justify-between gap-8 ${
                      active
                        ? 'bg-[#141311] text-[#EFECE6]'
                        : 'bg-[#E6E1D7] hover:bg-[#DDD7CB] text-[#141311]'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.1em]">
                      <span className="tnum opacity-60">0{idx + 1}</span>
                      <span className="font-medium">{active ? 'Active' : 'Select'}</span>
                    </div>

                    <div className="py-3 flex justify-center">
                      <DisciplineGlyph id={service.id} active={active} />
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-semibold text-sm tracking-[-0.01em]">
                        {service.name}
                      </h3>
                      <p
                        className={`text-xs leading-relaxed ${
                          active ? 'text-[#EFECE6]/75' : 'text-[#141311]/65'
                        }`}
                      >
                        {service.line}
                      </p>
                      <div className="pt-2 text-xs font-medium tnum">
                        {t.services.from(formatPrice(spec.minXof))}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Borderless Option Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {t.options.items.map((opt) => {
                const checked = selectedModifiers.includes(opt.id);
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => onToggleModifier(opt.id)}
                    aria-pressed={checked}
                    className={`px-4 py-2 text-xs font-medium transition-colors press cursor-pointer ${
                      checked
                        ? 'bg-[#141311] text-[#EFECE6]'
                        : 'bg-[#E4DFD5] hover:bg-[#D8D1C4] text-[#141311]'
                    }`}
                  >
                    {opt.name} ({opt.rate})
                  </button>
                );
              })}

              <button
                type="button"
                onClick={() =>
                  onChangeUrgency(
                    urgency === 'FAST_TRACK_48H' ? 'STANDARD' : 'FAST_TRACK_48H'
                  )
                }
                aria-pressed={urgency === 'FAST_TRACK_48H'}
                className={`px-4 py-2 text-xs font-medium transition-colors press cursor-pointer ${
                  urgency === 'FAST_TRACK_48H'
                    ? 'bg-[#141311] text-[#EFECE6]'
                    : 'bg-[#E4DFD5] hover:bg-[#D8D1C4] text-[#141311]'
                }`}
              >
                {t.options.fastTrack.name} ({t.options.fastTrack.rate})
              </button>
            </div>

            {/* Estimate Summary Row */}
            <div className="bg-[#E6E1D7]/70 p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
              {!hasSelection ? (
                <p className="text-sm text-[#141311]/60">{t.estimate.empty}</p>
              ) : (
                <div className="space-y-1.5">
                  <div className="flex items-center gap-4 text-[11px] uppercase tracking-[0.1em] text-[#141311]/60">
                    <span>{t.estimate.result}</span>
                    <div className="inline-flex items-center gap-1.5">
                      {currencies.map((curr, i) => (
                        <React.Fragment key={curr}>
                          {i > 0 && <span className="text-[#141311]/20">/</span>}
                          <button
                            type="button"
                            onClick={() => setCurrency(curr)}
                            className={`cursor-pointer ${
                              currency === curr ? 'text-[#141311] font-semibold underline' : ''
                            }`}
                          >
                            {curr}
                          </button>
                        </React.Fragment>
                      ))}
                    </div>
                  </div>

                  <div className="display-section text-3xl sm:text-4xl text-[#141311] tnum">
                    {totalParts.low} – {totalParts.high}{' '}
                    {totalParts.unit && (
                      <span className="text-base font-normal text-[#141311]/65">
                        {totalParts.unit}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#141311]/65 tnum">
                    <span>{t.estimate.duration(pricing.estimatedMinDays, pricing.estimatedMaxDays)}</span>
                    <span>{t.estimate.schedule}</span>
                    {pricing.multiPoleDiscountApplied && (
                      <span className="text-[#141311] font-semibold">{t.estimate.discount}</span>
                    )}
                  </div>
                </div>
              )}

              <button
                type="button"
                disabled={!hasSelection}
                onClick={() => setStep('contact')}
                className="min-h-[46px] px-7 py-3 bg-[#141311] hover:bg-[#2C2925] disabled:opacity-35 text-[#EFECE6] text-xs font-medium uppercase tracking-[0.12em] inline-flex items-center justify-center gap-2 group press cursor-pointer whitespace-nowrap shrink-0"
              >
                <span>{t.estimate.next}</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
