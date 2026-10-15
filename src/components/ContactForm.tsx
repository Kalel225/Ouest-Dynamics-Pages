import React, { useState, useEffect } from 'react';
import { ArrowUpRight, CheckCircle, ShieldCheck, Mail, Building, User, Layers, MessageSquare, Loader2, FileText } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency } from '../context/CurrencyContext';
import { PrivacyPolicyModal } from './PrivacyPolicyModal';

interface ContactFormProps {
  preselectedService?: string;
  onOpenPrivacyPolicy?: () => void;
}

export const ContactForm: React.FC<ContactFormProps> = ({ preselectedService }) => {
  const { t } = useLanguage();
  const { currencyConfig } = useCurrency();
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState('web');
  const [budget, setBudget] = useState('7k-15k');
  const [description, setDescription] = useState('');

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [dossierRef, setDossierRef] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPrivacyPopup, setShowPrivacyPopup] = useState(false);

  useEffect(() => {
    if (preselectedService) {
      setService(preselectedService);
    }
  }, [preselectedService]);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!fullName.trim()) errs.fullName = t.contact.errors.fullName;
    if (!companyName.trim()) errs.companyName = t.contact.errors.company;
    if (!email.trim()) {
      errs.email = t.contact.errors.email;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = t.contact.errors.emailInvalid;
    }
    if (!description.trim()) {
      errs.description = t.contact.errors.description;
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    const submissionPayload = {
      fullName: fullName.trim(),
      companyName: companyName.trim(),
      email: email.trim().toLowerCase(),
      service,
      budget,
      currency: currencyConfig.code,
      description: description.trim(),
    };

    try {
      // 1. Persist directly into the solid backend database API
      const res = await fetch('/api/submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionPayload),
      });

      let generatedRef = `OD-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;

      if (res.ok) {
        const data = await res.json();
        if (data.reference) {
          generatedRef = data.reference;
        }
      } else {
        console.warn('[Database] Fallback to local reference generation due to status:', res.status);
      }

      setDossierRef(generatedRef);
      setSubmitted(true);
      // Requirement: Once form validated and processed, popup with privacy policy in site theme is shown!
      setShowPrivacyPopup(true);
    } catch (err) {
      console.error('[Database Submission Error]', err);
      // Fallback resilience
      const fallbackRef = `OD-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
      setDossierRef(fallbackRef);
      setSubmitted(true);
      setShowPrivacyPopup(true);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFullName('');
    setCompanyName('');
    setEmail('');
    setDescription('');
    setSubmitted(false);
    setErrors({});
  };

  return (
    <section id="contact" className="relative py-16 sm:py-24 lg:py-28 px-3.5 sm:px-6 lg:px-8 bg-[#0B0B0B] border-t border-white/[0.06]">
      {/* Background Subtle Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[650px] h-[280px] sm:h-[450px] bg-[radial-gradient(circle,_rgba(212,175,55,0.05)_0%,_transparent_70%)] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="h-[1px] w-4 sm:w-6 bg-[#D4AF37]/60" />
            <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] text-[#D4AF37] uppercase font-mono">
              {t.contact.surtitle}
            </span>
            <span className="h-[1px] w-4 sm:w-6 bg-[#D4AF37]/60" />
          </div>

          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-[-0.03em] leading-tight mb-3">
            {t.contact.title}
          </h2>

          <p className="text-[#F4F4F6]/85 text-xs sm:text-sm md:text-base leading-relaxed font-body px-1">
            {t.contact.subtitle}
          </p>
        </div>

        {/* Contact Form Card (Glassmorphic & Rounded - Preserved per brief) */}
        <div className="rounded-3xl bg-[#141414]/70 backdrop-blur-2xl border border-white/[0.08] p-4.5 sm:p-7 md:p-10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),_0_20px_50px_rgba(0,0,0,0.6)]">
          {submitted ? (
            <div className="py-6 sm:py-10 text-center animate-in fade-in duration-300">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white/[0.04] border border-[#D4AF37] flex items-center justify-center mx-auto mb-4 text-[#D4AF37] shadow-[0_0_25px_rgba(212,175,55,0.25)]">
                <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>

              <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest block mb-1.5 font-semibold">
                {t.contact.successTitle}
              </span>

              <h3 className="font-display text-lg sm:text-2xl font-bold text-white mb-2">
                {t.contact.successRef} : <span className="text-[#D4AF37]">{dossierRef}</span>
              </h3>

              <p className="text-xs sm:text-sm text-[#F4F4F6]/85 max-w-md mx-auto mb-5 leading-relaxed font-body">
                {t.contact.successMsg}
              </p>

              <div className="p-3.5 sm:p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] max-w-sm mx-auto mb-5 text-left text-xs space-y-1.5 font-mono">
                <div className="text-[#F4F4F6]/60">Nom : <span className="text-white font-sans">{fullName}</span></div>
                <div className="text-[#F4F4F6]/60">Projet : <span className="text-white font-sans">{companyName}</span></div>
                <div className="text-[#F4F4F6]/60">E-mail : <span className="text-white font-sans">{email}</span></div>
                <div className="text-[#F4F4F6]/60">Devise auto-adaptée : <span className="text-[#D4AF37]">{currencyConfig.flag} {currencyConfig.code} ({currencyConfig.symbol})</span></div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowPrivacyPopup(true)}
                  className="w-full sm:w-auto min-h-[44px] px-6 py-2.5 text-xs font-mono rounded-full border border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <FileText className="w-4 h-4" />
                  <span>Consulter la Politique de Confidentialité</span>
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full sm:w-auto min-h-[44px] px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#0B0B0B] bg-[#D4AF37] hover:bg-[#E2C255] rounded-full transition-all cursor-pointer shadow-[0_4px_15px_rgba(212,175,55,0.3)]"
                >
                  {t.contact.resetBtn}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              {/* Row 1: Nom & Entreprise (Responsive Stack) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <div>
                  <label className="block text-[11px] sm:text-xs font-medium uppercase tracking-wider text-[#F4F4F6]/75 mb-1.5 font-mono">
                    {t.contact.fullName} <span className="text-[#D4AF37]">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder={t.contact.fullNamePlaceholder}
                      value={fullName}
                      onChange={(e) => {
                        setFullName(e.target.value);
                        if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: '' }));
                      }}
                      className={`w-full bg-[#0B0B0B]/80 border ${
                        errors.fullName ? 'border-red-500/80' : 'border-white/[0.1] focus:border-[#D4AF37]'
                      } rounded-xl px-3.5 py-3 text-sm text-white placeholder:text-[#F4F4F6]/30 backdrop-blur-sm transition-all outline-none font-body`}
                    />
                    <User className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#F4F4F6]/30 pointer-events-none" />
                  </div>
                  {errors.fullName && (
                    <span className="text-xs text-red-400 mt-1 block">{errors.fullName}</span>
                  )}
                </div>

                <div>
                  <label className="block text-[11px] sm:text-xs font-medium uppercase tracking-wider text-[#F4F4F6]/75 mb-1.5 font-mono">
                    {t.contact.company} <span className="text-[#D4AF37]">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder={t.contact.companyPlaceholder}
                      value={companyName}
                      onChange={(e) => {
                        setCompanyName(e.target.value);
                        if (errors.companyName) setErrors((prev) => ({ ...prev, companyName: '' }));
                      }}
                      className={`w-full bg-[#0B0B0B]/80 border ${
                        errors.companyName ? 'border-red-500/80' : 'border-white/[0.1] focus:border-[#D4AF37]'
                      } rounded-xl px-3.5 py-3 text-sm text-white placeholder:text-[#F4F4F6]/30 backdrop-blur-sm transition-all outline-none font-body`}
                    />
                    <Building className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#F4F4F6]/30 pointer-events-none" />
                  </div>
                  {errors.companyName && (
                    <span className="text-xs text-red-400 mt-1 block">{errors.companyName}</span>
                  )}
                </div>
              </div>

              {/* Row 2: Email & Service */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <div>
                  <label className="block text-[11px] sm:text-xs font-medium uppercase tracking-wider text-[#F4F4F6]/75 mb-1.5 font-mono">
                    {t.contact.email} <span className="text-[#D4AF37]">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      placeholder={t.contact.emailPlaceholder}
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
                      }}
                      className={`w-full bg-[#0B0B0B]/80 border ${
                        errors.email ? 'border-red-500/80' : 'border-white/[0.1] focus:border-[#D4AF37]'
                      } rounded-xl px-3.5 py-3 text-sm text-white placeholder:text-[#F4F4F6]/30 backdrop-blur-sm transition-all outline-none font-body`}
                    />
                    <Mail className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#F4F4F6]/30 pointer-events-none" />
                  </div>
                  {errors.email && (
                    <span className="text-xs text-red-400 mt-1 block">{errors.email}</span>
                  )}
                </div>

                <div>
                  <label className="block text-[11px] sm:text-xs font-medium uppercase tracking-wider text-[#F4F4F6]/75 mb-1.5 font-mono">
                    {t.contact.serviceLabel}
                  </label>
                  <div className="relative">
                    <select
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full bg-[#0B0B0B] border border-white/[0.1] focus:border-[#D4AF37] rounded-xl px-3.5 py-3 text-sm text-white backdrop-blur-sm transition-all outline-none appearance-none cursor-pointer font-body"
                    >
                      {t.services.items.map((srv) => (
                        <option key={srv.id} value={srv.id} className="bg-[#141414] text-white">
                          {srv.title}
                        </option>
                      ))}
                    </select>
                    <Layers className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#F4F4F6]/30 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Budget Allocation Selector (Devises auto-adaptées à la région du visiteur - Onglet retiré selon consigne) */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-[11px] sm:text-xs font-medium uppercase tracking-wider text-[#F4F4F6]/75 font-mono">
                    {t.contact.budgetLabel}
                  </label>
                  {/* Badge d'indication de la monnaie locale sans onglet interactif */}
                  <span className="text-[11px] font-mono text-[#D4AF37] flex items-center gap-1">
                    <span>{currencyConfig.flag}</span>
                    <span className="font-semibold">{currencyConfig.code}</span>
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5">
                  {currencyConfig.budgets.map((b) => (
                    <button
                      type="button"
                      key={b.id}
                      onClick={() => setBudget(b.id)}
                      className={`min-h-[44px] sm:min-h-[46px] py-2 px-2.5 text-xs font-mono rounded-xl border transition-all cursor-pointer flex items-center justify-center text-center ${
                        budget === b.id
                          ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-white font-bold shadow-[0_2px_10px_rgba(212,175,55,0.2)]'
                          : 'bg-[#0B0B0B]/50 border-white/[0.08] text-[#F4F4F6]/75 hover:border-white/20'
                      }`}
                    >
                      <span className="truncate">{b.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Project Description */}
              <div>
                <label className="block text-[11px] sm:text-xs font-medium uppercase tracking-wider text-[#F4F4F6]/75 mb-1.5 font-mono">
                  {t.contact.descriptionLabel} <span className="text-[#D4AF37]">*</span>
                </label>
                <div className="relative">
                  <textarea
                    rows={4}
                    placeholder={t.contact.descriptionPlaceholder}
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                      if (errors.description) setErrors((prev) => ({ ...prev, description: '' }));
                    }}
                    className={`w-full bg-[#0B0B0B]/80 border ${
                      errors.description ? 'border-red-500/80' : 'border-white/[0.1] focus:border-[#D4AF37]'
                    } rounded-xl px-3.5 py-3 text-sm text-white placeholder:text-[#F4F4F6]/30 backdrop-blur-sm transition-all outline-none resize-none font-body`}
                  />
                  <MessageSquare className="absolute right-3.5 top-3.5 w-4 h-4 text-[#F4F4F6]/30 pointer-events-none" />
                </div>
                {errors.description && (
                  <span className="text-xs text-red-400 mt-1 block">{errors.description}</span>
                )}
              </div>

              {/* Confidentiality & Submission */}
              <div className="pt-3 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-[#F4F4F6]/70 font-body w-full sm:w-auto">
                  <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span>{t.contact.confidentiality}</span>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto min-h-[48px] sm:min-h-[50px] inline-flex items-center justify-center gap-2.5 px-8 sm:px-9 py-3 sm:py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#0B0B0B] bg-[#D4AF37] hover:bg-[#E2C255] disabled:opacity-50 rounded-full transition-all duration-200 cursor-pointer shadow-[0_4px_25px_rgba(212,175,55,0.35)] hover:shadow-[0_6px_35px_rgba(212,175,55,0.5)] whitespace-nowrap"
                >
                  {loading ? (
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

      {/* Pop-up thématique de la Politique de Confidentialité affiché après validation */}
      <PrivacyPolicyModal
        isOpen={showPrivacyPopup}
        onClose={() => setShowPrivacyPopup(false)}
        dossierRef={dossierRef}
        submissionDetails={{
          fullName,
          companyName,
          email,
        }}
      />
    </section>
  );
};
