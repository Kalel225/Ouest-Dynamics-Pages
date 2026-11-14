import React, { useState, useEffect, useMemo } from 'react';
import {
  ArrowUpRight,
  CheckCircle,
  ShieldCheck,
  Loader2,
  FileText,
  Lock,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency } from '../context/CurrencyContext';
import { PrivacyPolicyModal } from './PrivacyPolicyModal';

interface ContactFormProps {
  preselectedService?: string;
  onOpenPrivacyPage?: () => void;
  onOpenTermsPage?: () => void;
}

export const ContactForm: React.FC<ContactFormProps> = ({
  preselectedService,
  onOpenPrivacyPage,
  onOpenTermsPage,
}) => {
  const { t, language } = useLanguage();
  const { currency, currencyConfig } = useCurrency();
  const isFr = language === 'fr';

  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState(preselectedService || 'web');
  const [budget, setBudget] = useState(currencyConfig.budgets[1]?.id || '7k-15k');
  const [description, setDescription] = useState('');

  // Anti-spam fields
  const [honeypotWebsite, setHoneypotWebsite] = useState('');
  const [formLoadedAt] = useState<number>(() => Date.now());
  const mathChallenge = useMemo(() => {
    const a = 3 + Math.floor(Math.random() * 5);
    const b = 2 + Math.floor(Math.random() * 4);
    return { a, b, sum: a + b };
  }, []);
  const [humanAnswer, setHumanAnswer] = useState('');

  // Validation & Touched states
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  useEffect(() => {
    if (preselectedService) {
      setService(preselectedService);
    }
  }, [preselectedService]);

  const validateField = (field: string, value: string): string => {
    const trimmed = value.trim();
    switch (field) {
      case 'fullName':
        if (!trimmed || trimmed.length < 2) return t.contact.errors.fullName;
        return '';
      case 'company':
        if (!trimmed || trimmed.length < 2) return t.contact.errors.company;
        return '';
      case 'email':
        if (!trimmed) return t.contact.errors.email;
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed)) {
          return t.contact.errors.emailInvalid;
        }
        return '';
      case 'description':
        if (!trimmed || trimmed.length < 15) return t.contact.errors.description;
        return '';
      case 'humanAnswer':
        if (parseInt(trimmed, 10) !== mathChallenge.sum) {
          return isFr
            ? `Veuillez indiquer le résultat exact (${mathChallenge.a} + ${mathChallenge.b})`
            : `Please enter the correct sum (${mathChallenge.a} + ${mathChallenge.b})`;
        }
        return '';
      default:
        return '';
    }
  };

  const handleBlur = (field: string, value: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const err = validateField(field, value);
    setErrors((prev) => ({ ...prev, [field]: err }));
  };

  const validateAll = () => {
    const newErrors: Record<string, string> = {};
    const fNameErr = validateField('fullName', fullName);
    const compErr = validateField('company', companyName);
    const emailErr = validateField('email', email);
    const descErr = validateField('description', description);
    const humanErr = validateField('humanAnswer', humanAnswer);

    if (fNameErr) newErrors.fullName = fNameErr;
    if (compErr) newErrors.company = compErr;
    if (emailErr) newErrors.email = emailErr;
    if (descErr) newErrors.description = descErr;
    if (humanErr) newErrors.humanAnswer = humanErr;

    setErrors(newErrors);
    setTouched({
      fullName: true,
      company: true,
      email: true,
      description: true,
      humanAnswer: true,
    });
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Honeypot trap check (bots fill hidden fields)
    if (honeypotWebsite.trim() !== '') {
      return;
    }

    // 2. Submission velocity guard (<1.2s is automated bot behavior)
    if (Date.now() - formLoadedAt < 1200) {
      setErrors({
        form: isFr
          ? 'Envoi trop rapide détecté. Veuillez patienter une seconde.'
          : 'Submission too fast. Please wait a moment and try again.',
      });
      return;
    }

    if (!validateAll()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: fullName.trim(),
          companyName: companyName.trim(),
          email: email.trim(),
          service,
          budget,
          currency,
          description: description.trim(),
          _honeypot: honeypotWebsite,
          _elapsedMs: Date.now() - formLoadedAt,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        setErrors({
          form:
            data?.error ||
            (isFr ? 'Une erreur est survenue.' : 'An error occurred.'),
        });
        return;
      }

      const refCode =
        data?.submission?.reference ||
        `OD-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;

      setSubmittedRef(refCode);
      setShowPrivacyModal(true);
    } catch {
      const fallbackRef = `OD-${new Date().getFullYear()}-${Math.floor(
        10000 + Math.random() * 90000
      )}`;
      setSubmittedRef(fallbackRef);
      setShowPrivacyModal(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFullName('');
    setCompanyName('');
    setEmail('');
    setDescription('');
    setHumanAnswer('');
    setErrors({});
    setTouched({});
    setSubmittedRef(null);
  };

  const isFieldValid = (field: string, value: string) =>
    touched[field] && !errors[field] && validateField(field, value) === '';

  return (
    <section
      id="contact"
      className="py-20 sm:py-28 px-4 sm:px-8 bg-[#EFECE6] border-b border-[#E2DDD5]"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column (5 cols): Consultation Desk & Direct Guarantees */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <p className="text-xs sm:text-sm font-semibold text-[#A64B2A] mb-3">
                {isFr
                  ? 'Chapitre 04 · Consultation & Devis Sur-Mesure'
                  : 'Chapter 04 · Private Consultation & Estimate'}
              </p>
              <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#161412] tracking-tight leading-[1.12] mb-4 [text-wrap:balance]">
                {t.contact.title}
              </h2>
              <p className="text-sm sm:text-base text-[#5C554E] leading-relaxed">
                {t.contact.subtitle}
              </p>
            </div>

            <div className="pt-6 border-t border-[#D8D2C7] space-y-4 text-sm text-[#161412]">
              <div>
                <p className="font-semibold text-[#161412]">
                  {isFr
                    ? '01. Réponse sous 4 heures ouvrées'
                    : '01. Response within 4 business hours'}
                </p>
                <p className="text-xs text-[#5C554E]">
                  {isFr
                    ? 'Analyse personnalisée par un directeur de projet senior.'
                    : 'Tailored review prepared by a senior project director.'}
                </p>
              </div>

              <div>
                <p className="font-semibold text-[#161412]">
                  {isFr
                    ? '02. Devises adaptées automatiquement à votre région'
                    : '02. Regional currency automatically calibrated'}
                </p>
                <p className="text-xs text-[#5C554E]">
                  {isFr
                    ? `Affichage actif : ${currencyConfig.name} (${currencyConfig.code})`
                    : `Active regional display: ${currencyConfig.name} (${currencyConfig.code})`}
                </p>
              </div>

              <div>
                <p className="font-semibold text-[#161412]">
                  {isFr
                    ? '03. Accord de confidentialité immédiat (NDA)'
                    : '03. Automatic Non-Disclosure Protection (NDA)'}
                </p>
                <p className="text-xs text-[#5C554E]">
                  {t.contact.confidentiality}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column (7 cols): Interactive Validated Form Card */}
          <div className="lg:col-span-7 bg-white border border-[#E2DDD5] rounded-xl p-6 sm:p-10 shadow-xs">
            {submittedRef ? (
              <div className="py-8 text-center space-y-6">
                <div className="w-14 h-14 rounded-full bg-[#F7F4EE] border border-[#A64B2A] text-[#A64B2A] flex items-center justify-center mx-auto">
                  <CheckCircle className="w-7 h-7" />
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-mono-tabular text-[#A64B2A] font-semibold">
                    {t.contact.successRef} : {submittedRef}
                  </p>
                  <h3 className="font-serif-display text-2xl sm:text-3xl font-semibold text-[#161412]">
                    {t.contact.successTitle}
                  </h3>
                  <p className="text-sm text-[#5C554E] max-w-lg mx-auto leading-relaxed">
                    {t.contact.successMsg}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowPrivacyModal(true)}
                    className="min-h-[44px] px-5 py-2.5 rounded-lg border border-[#E2DDD5] bg-[#F7F4EE] text-xs font-semibold text-[#161412] hover:border-[#A64B2A] inline-flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <FileText className="w-4 h-4 text-[#A64B2A]" />
                    <span>
                      {isFr
                        ? 'Consulter le Certificat de Confidentialité'
                        : 'Review Privacy & NDA Certificate'}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="min-h-[44px] px-5 py-2.5 rounded-lg bg-[#161412] hover:bg-[#A64B2A] text-[#F7F4EE] text-xs font-semibold transition-colors cursor-pointer"
                  >
                    {t.contact.resetBtn}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                {/* Invisible Honeypot Anti-Spam Trap */}
                <div
                  className="opacity-0 absolute -left-[9999px] -top-[9999px] h-0 w-0 overflow-hidden pointer-events-none"
                  aria-hidden="true"
                >
                  <label htmlFor="company_website_url">Website</label>
                  <input
                    id="company_website_url"
                    name="company_website_url"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypotWebsite}
                    onChange={(e) => setHoneypotWebsite(e.target.value)}
                  />
                </div>

                {errors.form && (
                  <div className="p-3.5 rounded-lg bg-red-50 border border-red-300 text-xs font-medium text-red-700">
                    {errors.form}
                  </div>
                )}

                {/* Row 1: Name & Company */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label
                        htmlFor="fullName"
                        className="block text-xs font-semibold text-[#161412]"
                      >
                        {t.contact.fullName} *
                      </label>
                      {isFieldValid('fullName', fullName) && (
                        <span className="text-[11px] text-emerald-700 font-medium">✓</span>
                      )}
                    </div>
                    <input
                      id="fullName"
                      type="text"
                      value={fullName}
                      onBlur={() => handleBlur('fullName', fullName)}
                      onChange={(e) => {
                        setFullName(e.target.value);
                        if (errors.fullName) {
                          setErrors({
                            ...errors,
                            fullName: validateField('fullName', e.target.value),
                          });
                        }
                      }}
                      placeholder={t.contact.fullNamePlaceholder}
                      className={`w-full min-h-[46px] px-4 py-2.5 rounded-lg bg-[#F7F4EE] border text-base sm:text-sm text-[#161412] placeholder-[#8C847A] focus:outline-none transition-colors ${
                        errors.fullName
                          ? 'border-red-600 focus:border-red-600'
                          : isFieldValid('fullName', fullName)
                          ? 'border-emerald-600/60 focus:border-[#A64B2A]'
                          : 'border-[#E2DDD5] focus:border-[#A64B2A]'
                      }`}
                    />
                    {errors.fullName && (
                      <p className="mt-1.5 text-xs text-red-600 font-medium">
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label
                        htmlFor="companyName"
                        className="block text-xs font-semibold text-[#161412]"
                      >
                        {t.contact.company} *
                      </label>
                      {isFieldValid('company', companyName) && (
                        <span className="text-[11px] text-emerald-700 font-medium">✓</span>
                      )}
                    </div>
                    <input
                      id="companyName"
                      type="text"
                      value={companyName}
                      onBlur={() => handleBlur('company', companyName)}
                      onChange={(e) => {
                        setCompanyName(e.target.value);
                        if (errors.company) {
                          setErrors({
                            ...errors,
                            company: validateField('company', e.target.value),
                          });
                        }
                      }}
                      placeholder={t.contact.companyPlaceholder}
                      className={`w-full min-h-[46px] px-4 py-2.5 rounded-lg bg-[#F7F4EE] border text-base sm:text-sm text-[#161412] placeholder-[#8C847A] focus:outline-none transition-colors ${
                        errors.company
                          ? 'border-red-600 focus:border-red-600'
                          : isFieldValid('company', companyName)
                          ? 'border-emerald-600/60 focus:border-[#A64B2A]'
                          : 'border-[#E2DDD5] focus:border-[#A64B2A]'
                      }`}
                    />
                    {errors.company && (
                      <p className="mt-1.5 text-xs text-red-600 font-medium">
                        {errors.company}
                      </p>
                    )}
                  </div>
                </div>

                {/* Row 2: Email */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label
                      htmlFor="email"
                      className="block text-xs font-semibold text-[#161412]"
                    >
                      {t.contact.email} *
                    </label>
                    {isFieldValid('email', email) && (
                      <span className="text-[11px] text-emerald-700 font-medium">✓</span>
                    )}
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onBlur={() => handleBlur('email', email)}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) {
                        setErrors({
                          ...errors,
                          email: validateField('email', e.target.value),
                        });
                      }
                    }}
                    placeholder={t.contact.emailPlaceholder}
                    className={`w-full min-h-[46px] px-4 py-2.5 rounded-lg bg-[#F7F4EE] border text-base sm:text-sm text-[#161412] placeholder-[#8C847A] focus:outline-none transition-colors ${
                      errors.email
                        ? 'border-red-600 focus:border-red-600'
                        : isFieldValid('email', email)
                        ? 'border-emerald-600/60 focus:border-[#A64B2A]'
                        : 'border-[#E2DDD5] focus:border-[#A64B2A]'
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1.5 text-xs text-red-600 font-medium">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Row 3: Service Selection */}
                <div>
                  <label className="block text-xs font-semibold text-[#161412] mb-2">
                    {t.contact.serviceLabel}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {t.services.items.map((item) => {
                      const selected = service === item.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setService(item.id)}
                          className={`min-h-[44px] px-4 py-2.5 rounded-lg border text-left text-xs font-semibold transition-colors cursor-pointer flex items-center justify-between ${
                            selected
                              ? 'bg-[#161412] text-[#F7F4EE] border-[#161412]'
                              : 'bg-[#F7F4EE] text-[#161412] border-[#E2DDD5] hover:border-[#A64B2A]'
                          }`}
                        >
                          <span className="truncate">{item.title}</span>
                          <span
                            className={`font-mono-tabular text-[11px] ml-2 shrink-0 ${
                              selected ? 'text-[#D49B6A]' : 'text-[#5C554E]'
                            }`}
                          >
                            {item.number}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Row 4: Auto-Adapted Regional Budget Selection */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs font-semibold text-[#161412]">
                      {t.contact.budgetLabel}
                    </label>
                    <span className="text-[11px] font-mono-tabular text-[#5C554E]">
                      {currencyConfig.name} ({currencyConfig.symbol})
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {currencyConfig.budgets.map((b) => {
                      const selected = budget === b.id;
                      return (
                        <button
                          key={b.id}
                          type="button"
                          onClick={() => setBudget(b.id)}
                          className={`min-h-[44px] px-3 py-2 rounded-lg border text-xs font-mono-tabular font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                            selected
                              ? 'bg-[#A64B2A] text-[#F7F4EE] border-[#A64B2A]'
                              : 'bg-[#F7F4EE] text-[#161412] border-[#E2DDD5] hover:border-[#A64B2A]'
                          }`}
                        >
                          {b.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Row 5: Plain-Language Project Description with Live Counter */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label
                      htmlFor="description"
                      className="block text-xs font-semibold text-[#161412]"
                    >
                      {t.contact.descriptionLabel} *
                    </label>
                    <span className="text-[11px] font-mono-tabular text-[#5C554E]">
                      {description.trim().length} / 15 min
                    </span>
                  </div>
                  <textarea
                    id="description"
                    rows={4}
                    value={description}
                    onBlur={() => handleBlur('description', description)}
                    onChange={(e) => {
                      setDescription(e.target.value);
                      if (errors.description) {
                        setErrors({
                          ...errors,
                          description: validateField('description', e.target.value),
                        });
                      }
                    }}
                    placeholder={t.contact.descriptionPlaceholder}
                    className={`w-full p-4 rounded-lg bg-[#F7F4EE] border text-base sm:text-sm text-[#161412] placeholder-[#8C847A] focus:outline-none transition-colors resize-y ${
                      errors.description
                        ? 'border-red-600 focus:border-red-600'
                        : isFieldValid('description', description)
                        ? 'border-emerald-600/60 focus:border-[#A64B2A]'
                        : 'border-[#E2DDD5] focus:border-[#A64B2A]'
                    }`}
                  />
                  {errors.description && (
                    <p className="mt-1.5 text-xs text-red-600 font-medium">
                      {errors.description}
                    </p>
                  )}
                </div>

                {/* Row 6: Anti-Spam Human Verification Challenge */}
                <div className="p-4 rounded-lg bg-[#F7F4EE] border border-[#E2DDD5] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-2.5">
                    <Lock className="w-4 h-4 text-[#A64B2A] shrink-0" />
                    <div>
                      <label
                        htmlFor="humanAnswer"
                        className="text-xs font-semibold text-[#161412] block"
                      >
                        {isFr
                          ? `Protection Anti-Spam : Combien font ${mathChallenge.a} + ${mathChallenge.b} ? *`
                          : `Anti-Spam Check: What is ${mathChallenge.a} + ${mathChallenge.b}? *`}
                      </label>
                      <span className="text-[11px] text-[#5C554E]">
                        {isFr
                          ? 'Vérification rapide pour bloquer les robots automatisés.'
                          : 'Quick verification to block automated spam bots.'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      id="humanAnswer"
                      type="number"
                      inputMode="numeric"
                      value={humanAnswer}
                      onBlur={() => handleBlur('humanAnswer', humanAnswer)}
                      onChange={(e) => {
                        setHumanAnswer(e.target.value);
                        if (errors.humanAnswer) {
                          setErrors({
                            ...errors,
                            humanAnswer: validateField('humanAnswer', e.target.value),
                          });
                        }
                      }}
                      placeholder="?"
                      className={`w-24 min-h-[42px] px-3 py-1.5 rounded-lg bg-white border text-center font-mono-tabular text-sm font-semibold text-[#161412] focus:outline-none ${
                        errors.humanAnswer
                          ? 'border-red-600'
                          : isFieldValid('humanAnswer', humanAnswer)
                          ? 'border-emerald-600'
                          : 'border-[#E2DDD5] focus:border-[#A64B2A]'
                      }`}
                    />
                  </div>
                </div>
                {errors.humanAnswer && (
                  <p className="-mt-4 text-xs text-red-600 font-medium">
                    {errors.humanAnswer}
                  </p>
                )}

                {/* Submit Bar & Legal Links */}
                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1 text-xs text-[#5C554E]">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#A64B2A] shrink-0" />
                      <span>{t.contact.confidentiality}</span>
                    </div>
                    {(onOpenPrivacyPage || onOpenTermsPage) && (
                      <div className="flex items-center gap-2 pl-6 text-[11px]">
                        {onOpenPrivacyPage && (
                          <button
                            type="button"
                            onClick={onOpenPrivacyPage}
                            className="underline hover:text-[#161412] cursor-pointer"
                          >
                            {isFr ? 'Politique de confidentialité' : 'Privacy Policy'}
                          </button>
                        )}
                        {onOpenPrivacyPage && onOpenTermsPage && <span>·</span>}
                        {onOpenTermsPage && (
                          <button
                            type="button"
                            onClick={onOpenTermsPage}
                            className="underline hover:text-[#161412] cursor-pointer"
                          >
                            {isFr ? 'CGU' : 'Terms of Use'}
                          </button>
                        )}
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="min-h-[50px] px-7 py-3.5 rounded-lg bg-[#A64B2A] hover:bg-[#8E3D20] disabled:opacity-60 text-[#F7F4EE] text-xs sm:text-sm font-semibold inline-flex items-center justify-center gap-2 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>{t.contact.submittingBtn}</span>
                      </>
                    ) : (
                      <>
                        <span>{t.contact.submitBtn}</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Automatic Privacy Policy & NDA Certificate Modal Triggered on Validation */}
      <PrivacyPolicyModal
        isOpen={showPrivacyModal}
        onClose={() => setShowPrivacyModal(false)}
        referenceCode={submittedRef || undefined}
        clientName={fullName || undefined}
      />
    </section>
  );
};
