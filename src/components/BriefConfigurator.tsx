import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Check, CheckCircle2, Sparkles } from 'lucide-react';
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

  const [step, setStep] = useState<'estimate' | 'contact' | 'done'>('estimate');
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
    setStep('estimate');
  };

  return (
    <section
      id="estimate"
      className="py-20 sm:py-28 px-5 sm:px-8 bg-[#EEF3F0]/60 border-b border-[#DCE4E0]"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl space-y-3">
            <h2 className="title text-[clamp(2rem,4vw,3.25rem)] text-[#0B241D]">
              {t.estimate.title}
            </h2>
            <p className="text-base sm:text-lg text-[#50645D]">{t.estimate.intro}</p>
          </div>

          <button
            type="button"
            onClick={onOpenConcierge}
            className="self-start md:self-end inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#DCE4E0] hover:border-[#0B241D] text-xs font-medium text-[#0B241D] press cursor-pointer whitespace-nowrap"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#F77F00]" />
            <span>{t.concierge.open}</span>
          </button>
        </div>

        {aiPrefilled && step !== 'done' && (
          <div className="mb-8 px-4 py-3 rounded-xl bg-white border border-[#00875A]/40 text-xs sm:text-sm text-[#0B241D] flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-[#F77F00] shrink-0" />
            <span>{t.estimate.prefilled}</span>
          </div>
        )}

        {step === 'done' ? (
          <div className="max-w-xl mx-auto p-8 sm:p-10 rounded-2xl bg-white border border-[#DCE4E0] space-y-6">
            <div className="w-10 h-10 rounded-full bg-[#EEF3F0] flex items-center justify-center text-[#00875A]">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div className="space-y-2">
              <h3 className="title text-3xl text-[#0B241D]">
                {t.estimate.done.title(fullName.split(' ')[0] || '')}
              </h3>
              <p className="text-sm sm:text-base text-[#50645D]">{t.estimate.done.text}</p>
            </div>
            {submittedRef && (
              <div className="p-4 rounded-xl bg-[#EEF3F0] flex items-center justify-between text-xs sm:text-sm">
                <span className="text-[#50645D]">{t.estimate.done.reference}</span>
                <span className="font-semibold text-[#0B241D] tnum">{submittedRef}</span>
              </div>
            )}
            <button
              type="button"
              onClick={resetAll}
              className="px-5 py-2.5 rounded-full bg-[#0E3A2F] hover:bg-[#082820] text-white text-xs font-semibold press cursor-pointer"
            >
              {t.estimate.done.again}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left column: Selection or Contact Form */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-[#DCE4E0] p-6 sm:p-8">
              {step === 'estimate' ? (
                <div className="space-y-8">
                  {/* Services */}
                  <div className="space-y-3">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-[#50645D]">
                      {t.estimate.services}
                    </h3>
                    <div className="divide-y divide-[#DCE4E0] border-y border-[#DCE4E0]">
                      {t.services.items.map((service) => {
                        const checked = selectedPoles.includes(service.id);
                        const spec = POLE_PRICING_CATALOG[service.id];
                        return (
                          <button
                            key={service.id}
                            type="button"
                            onClick={() => onTogglePole(service.id)}
                            aria-pressed={checked}
                            className="w-full py-4 flex items-center justify-between gap-4 text-left cursor-pointer group"
                          >
                            <div>
                              <div className="text-sm sm:text-base font-semibold text-[#0B241D] group-hover:text-[#0E3A2F]">
                                {service.name}
                              </div>
                              <div className="text-xs text-[#50645D] tnum mt-0.5">
                                {t.services.from(formatPrice(spec.minXof))}
                              </div>
                            </div>
                            <span
                              className={`w-5 h-5 rounded-full flex items-center justify-center border shrink-0 transition-colors ${
                                checked
                                  ? 'bg-[#0E3A2F] border-[#0E3A2F] text-white'
                                  : 'border-[#DCE4E0]'
                              }`}
                            >
                              {checked && <Check className="w-3 h-3 stroke-[2.5]" />}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Options */}
                  <div className="space-y-3">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-[#50645D]">
                      {t.estimate.options}
                    </h3>
                    <div className="divide-y divide-[#DCE4E0] border-y border-[#DCE4E0]">
                      {t.options.items.map((opt) => {
                        const checked = selectedModifiers.includes(opt.id);
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => onToggleModifier(opt.id)}
                            aria-pressed={checked}
                            className="w-full py-4 flex items-center justify-between gap-4 text-left cursor-pointer"
                          >
                            <div>
                              <div className="text-sm font-semibold text-[#0B241D]">
                                {opt.name}{' '}
                                <span className="text-xs font-medium text-[#50645D] tnum">
                                  ({opt.rate})
                                </span>
                              </div>
                              <div className="text-xs text-[#50645D] mt-0.5">{opt.line}</div>
                            </div>
                            <span
                              className={`w-5 h-5 rounded-full flex items-center justify-center border shrink-0 ${
                                checked
                                  ? 'bg-[#0E3A2F] border-[#0E3A2F] text-white'
                                  : 'border-[#DCE4E0]'
                              }`}
                            >
                              {checked && <Check className="w-3 h-3 stroke-[2.5]" />}
                            </span>
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
                        className="w-full py-4 flex items-center justify-between gap-4 text-left cursor-pointer"
                      >
                        <div>
                          <div className="text-sm font-semibold text-[#0B241D]">
                            {t.options.fastTrack.name}{' '}
                            <span className="text-xs font-medium text-[#50645D] tnum">
                              ({t.options.fastTrack.rate})
                            </span>
                          </div>
                          <div className="text-xs text-[#50645D] mt-0.5">
                            {t.options.fastTrack.line}
                          </div>
                        </div>
                        <span
                          className={`w-5 h-5 rounded-full flex items-center justify-center border shrink-0 ${
                            urgency === 'FAST_TRACK_48H'
                              ? 'bg-[#F77F00] border-[#F77F00] text-[#0B241D]'
                              : 'border-[#DCE4E0]'
                          }`}
                        >
                          {urgency === 'FAST_TRACK_48H' && (
                            <Check className="w-3 h-3 stroke-[2.5]" />
                          )}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <div className="flex items-center justify-between gap-4 pb-4 border-b border-[#DCE4E0]">
                    <div>
                      <h3 className="text-xl font-bold text-[#0B241D]">
                        {t.estimate.contact.title}
                      </h3>
                      <p className="text-xs text-[#50645D] mt-0.5">
                        {t.estimate.contact.intro}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setStep('estimate')}
                      className="text-xs font-medium text-[#50645D] hover:text-[#0B241D] inline-flex items-center gap-1 cursor-pointer shrink-0"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>{t.estimate.contact.back}</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-[#0B241D] mb-1.5">
                        {t.estimate.contact.name}
                      </label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder={t.estimate.contact.namePh}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#EEF3F0]/50 border border-[#DCE4E0] focus:border-[#0E3A2F] text-sm text-[#0B241D] outline-none"
                      />
                      {errors.fullName && (
                        <p className="mt-1 text-xs text-[#B42318]">{errors.fullName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#0B241D] mb-1.5">
                        {t.estimate.contact.company}
                      </label>
                      <input
                        type="text"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder={t.estimate.contact.companyPh}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#EEF3F0]/50 border border-[#DCE4E0] focus:border-[#0E3A2F] text-sm text-[#0B241D] outline-none"
                      />
                      {errors.companyName && (
                        <p className="mt-1 text-xs text-[#B42318]">{errors.companyName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#0B241D] mb-1.5">
                        {t.estimate.contact.email}
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={t.estimate.contact.emailPh}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#EEF3F0]/50 border border-[#DCE4E0] focus:border-[#0E3A2F] text-sm text-[#0B241D] outline-none"
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-[#B42318]">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#0B241D] mb-1.5">
                        {t.estimate.contact.phone}
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder={t.estimate.contact.phonePh}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#EEF3F0]/50 border border-[#DCE4E0] focus:border-[#0E3A2F] text-sm text-[#0B241D] outline-none tnum"
                      />
                      <span className="block mt-1 text-[11px] text-[#50645D]">
                        {t.estimate.contact.phoneHint}
                      </span>
                      {errors.phone && (
                        <p className="mt-1 text-xs text-[#B42318]">{errors.phone}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#0B241D] mb-1.5">
                      {t.estimate.contact.message}
                    </label>
                    <textarea
                      rows={4}
                      value={projectSummary}
                      onChange={(e) => onChangeProjectSummary(e.target.value)}
                      placeholder={t.estimate.contact.messagePh}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#EEF3F0]/50 border border-[#DCE4E0] focus:border-[#0E3A2F] text-sm text-[#0B241D] outline-none"
                    />
                    {errors.summary && (
                      <p className="mt-1 text-xs text-[#B42318]">{errors.summary}</p>
                    )}
                  </div>

                  <div>
                    <label className="flex items-start gap-2.5 cursor-pointer text-xs text-[#50645D]">
                      <input
                        type="checkbox"
                        checked={consent}
                        onChange={(e) => setConsent(e.target.checked)}
                        className="mt-0.5 w-4 h-4 accent-[#0E3A2F] cursor-pointer"
                      />
                      <span>
                        {t.estimate.contact.consentBefore}
                        <button
                          type="button"
                          onClick={onOpenPrivacy}
                          className="text-[#0B241D] underline underline-offset-2 cursor-pointer"
                        >
                          {t.estimate.contact.consentLink}
                        </button>
                        {t.estimate.contact.consentAfter}
                      </span>
                    </label>
                    {errors.consent && (
                      <p className="mt-1 text-xs text-[#B42318]">{errors.consent}</p>
                    )}
                  </div>

                  {errors.submit && (
                    <p className="text-xs text-[#B42318]">{errors.submit}</p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full min-h-[48px] px-6 py-3 rounded-full bg-[#F77F00] hover:bg-[#E07100] disabled:opacity-50 text-[#0B241D] text-sm font-semibold press cursor-pointer"
                  >
                    {isSubmitting
                      ? t.estimate.contact.submitting
                      : t.estimate.contact.submit}
                  </button>
                </form>
              )}
            </div>

            {/* Right column: Sticky Live Estimate */}
            <aside className="lg:col-span-5 lg:sticky lg:top-24 bg-[#0E3A2F] text-white on-dark rounded-2xl p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between gap-4 pb-4 border-b border-white/15">
                <span className="text-xs font-semibold uppercase tracking-wider text-white/70">
                  {t.estimate.result}
                </span>

                <div className="inline-flex items-center gap-2 text-xs font-medium">
                  {currencies.map((curr, i) => (
                    <React.Fragment key={curr}>
                      {i > 0 && <span className="text-white/25">/</span>}
                      <button
                        type="button"
                        onClick={() => setCurrency(curr)}
                        className={`cursor-pointer ${
                          currency === curr
                            ? 'text-[#F77F00] font-semibold'
                            : 'text-white/60 hover:text-white'
                        }`}
                      >
                        {curr}
                      </button>
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {!hasSelection ? (
                <p className="text-sm text-white/75 py-8">{t.estimate.empty}</p>
              ) : (
                <>
                  <div className="space-y-2">
                    <div className="display text-3xl sm:text-4xl text-white tnum">
                      {totalParts.low} – {totalParts.high}
                      {totalParts.unit && (
                        <span className="block text-base font-normal text-[#F77F00] mt-1">
                          {totalParts.unit}
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-white/75 tnum">
                      {t.estimate.duration(pricing.estimatedMinDays, pricing.estimatedMaxDays)}
                    </p>
                    {pricing.multiPoleDiscountApplied && (
                      <p className="text-xs text-[#F77F00] font-medium">
                        {t.estimate.discount}
                      </p>
                    )}
                  </div>

                  <div className="pt-4 border-t border-white/15 space-y-2">
                    <div className="text-xs font-semibold uppercase tracking-wider text-white/60">
                      {t.estimate.schedule}
                    </div>
                    <ul className="space-y-1.5 text-xs sm:text-sm text-white/85">
                      {t.estimate.milestones.map((m, idx) => (
                        <li key={idx}>· {m}</li>
                      ))}
                    </ul>
                  </div>

                  <p className="text-xs text-white/60 leading-relaxed">{t.estimate.note}</p>

                  {step === 'estimate' && (
                    <button
                      type="button"
                      onClick={() => setStep('contact')}
                      className="w-full min-h-[48px] px-6 py-3 rounded-full bg-[#F77F00] hover:bg-[#E07100] text-[#0B241D] text-sm font-semibold inline-flex items-center justify-center gap-2 press cursor-pointer"
                    >
                      <span>{t.estimate.next}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </>
              )}
            </aside>
          </div>
        )}
      </div>
    </section>
  );
};
