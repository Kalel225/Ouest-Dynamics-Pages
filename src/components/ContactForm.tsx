import React, { useState, useEffect } from 'react';
import { ArrowUpRight, CheckCircle, ShieldCheck, Mail, Building, User, Layers, MessageSquare, Loader2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ContactFormProps {
  preselectedService?: string;
}

export const ContactForm: React.FC<ContactFormProps> = ({ preselectedService }) => {
  const { t } = useLanguage();
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState('web');
  const [budget, setBudget] = useState('50k-100k');
  const [description, setDescription] = useState('');

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [dossierRef, setDossierRef] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    // Simulate high-tier server-side encryption and dossier generation
    setTimeout(() => {
      const generatedRef = `OD-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
      setDossierRef(generatedRef);
      setLoading(false);
      setSubmitted(true);
    }, 900);
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
    <section id="contact" className="relative py-20 sm:py-28 px-4 sm:px-8 bg-[#0B0B0B] border-t border-white/[0.06]">
      {/* Background Subtle Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[700px] h-[300px] sm:h-[500px] bg-[radial-gradient(circle,_rgba(212,175,55,0.05)_0%,_transparent_70%)] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 mb-3 sm:mb-4">
            <span className="h-[1px] w-5 sm:w-6 bg-[#D4AF37]/60" />
            <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] text-[#D4AF37] uppercase font-mono">
              {t.contact.surtitle}
            </span>
            <span className="h-[1px] w-5 sm:w-6 bg-[#D4AF37]/60" />
          </div>

          <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold text-white tracking-[-0.03em] leading-tight mb-3 sm:mb-4 [text-wrap:balance]">
            {t.contact.title}
          </h2>

          <p className="text-[#F4F4F6]/85 text-sm sm:text-base lg:text-lg leading-relaxed font-body px-2 sm:px-0">
            {t.contact.subtitle}
          </p>
        </div>

        {/* Contact Form Card (Glassmorphic & Rounded - Preserved per brief) */}
        <div className="rounded-3xl bg-[#141414]/60 backdrop-blur-2xl border border-white/[0.08] p-5 sm:p-8 md:p-12 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),_0_20px_50px_rgba(0,0,0,0.6)]">
          {submitted ? (
            <div className="py-8 sm:py-12 text-center animate-in fade-in duration-300">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/[0.04] border border-[#D4AF37] flex items-center justify-center mx-auto mb-5 sm:mb-6 text-[#D4AF37] shadow-[0_0_30px_rgba(212,175,55,0.25)]">
                <CheckCircle className="w-7 h-7 sm:w-8 sm:h-8" />
              </div>

              <span className="text-xs font-mono text-[#D4AF37] uppercase tracking-widest block mb-2">
                {t.contact.successTitle}
              </span>

              <h3 className="font-display text-xl sm:text-3xl font-bold text-white mb-3 mt-2">
                {t.contact.successRef} : {dossierRef}
              </h3>

              <p className="text-xs sm:text-base text-[#F4F4F6]/80 max-w-md mx-auto mb-6 sm:mb-8 leading-relaxed font-body">
                {t.contact.successMsg}
              </p>

              <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] max-w-sm mx-auto mb-6 sm:mb-8 text-left text-xs space-y-2 font-mono">
                <div className="text-[#F4F4F6]/60">Client : <span className="text-white">{fullName}</span></div>
                <div className="text-[#F4F4F6]/60">Organization : <span className="text-white">{companyName}</span></div>
                <div className="text-[#F4F4F6]/60">E-mail : <span className="text-white">{email}</span></div>
                <div className="text-[#F4F4F6]/60">Pillar : <span className="text-[#D4AF37] uppercase">{service}</span></div>
                <div className="text-[#F4F4F6]/60">Status : <span className="text-emerald-400">{t.contact.securityTag}</span></div>
              </div>

              <button
                onClick={handleReset}
                className="w-full sm:w-auto px-8 py-3 text-xs font-semibold uppercase tracking-wider text-[#0B0B0B] bg-[#D4AF37] hover:bg-[#E2C255] rounded-full transition-all cursor-pointer shadow-[0_4px_15px_rgba(212,175,55,0.3)]"
              >
                {t.contact.resetBtn}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
              {/* Row 1: Nom & Entreprise */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                <div>
                  <label className="block text-xs font-medium uppercase tracking-wider text-[#F4F4F6]/70 mb-2 font-mono">
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
                      className={`w-full bg-[#0B0B0B]/60 border ${
                        errors.fullName ? 'border-red-500/80' : 'border-white/[0.08] focus:border-[#D4AF37]'
                      } rounded-xl px-4 py-3 sm:py-3.5 text-base sm:text-sm text-white placeholder:text-[#F4F4F6]/30 backdrop-blur-sm transition-all outline-none font-body`}
                    />
                    <User className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#F4F4F6]/30 pointer-events-none" />
                  </div>
                  {errors.fullName && (
                    <span className="text-xs text-red-400 mt-1 block">{errors.fullName}</span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium uppercase tracking-wider text-[#F4F4F6]/70 mb-2 font-mono">
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
                      className={`w-full bg-[#0B0B0B]/60 border ${
                        errors.companyName ? 'border-red-500/80' : 'border-white/[0.08] focus:border-[#D4AF37]'
                      } rounded-xl px-4 py-3 sm:py-3.5 text-base sm:text-sm text-white placeholder:text-[#F4F4F6]/30 backdrop-blur-sm transition-all outline-none font-body`}
                    />
                    <Building className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#F4F4F6]/30 pointer-events-none" />
                  </div>
                  {errors.companyName && (
                    <span className="text-xs text-red-400 mt-1 block">{errors.companyName}</span>
                  )}
                </div>
              </div>

              {/* Row 2: Email & Service */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                <div>
                  <label className="block text-xs font-medium uppercase tracking-wider text-[#F4F4F6]/70 mb-2 font-mono">
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
                      className={`w-full bg-[#0B0B0B]/60 border ${
                        errors.email ? 'border-red-500/80' : 'border-white/[0.08] focus:border-[#D4AF37]'
                      } rounded-xl px-4 py-3 sm:py-3.5 text-base sm:text-sm text-white placeholder:text-[#F4F4F6]/30 backdrop-blur-sm transition-all outline-none font-body`}
                    />
                    <Mail className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#F4F4F6]/30 pointer-events-none" />
                  </div>
                  {errors.email && (
                    <span className="text-xs text-red-400 mt-1 block">{errors.email}</span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium uppercase tracking-wider text-[#F4F4F6]/70 mb-2 font-mono">
                    {t.contact.serviceLabel}
                  </label>
                  <div className="relative">
                    <select
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full bg-[#0B0B0B] border border-white/[0.08] focus:border-[#D4AF37] rounded-xl px-4 py-3 sm:py-3.5 text-base sm:text-sm text-white backdrop-blur-sm transition-all outline-none appearance-none cursor-pointer font-body"
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

              {/* Budget Allocation Selector */}
              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-[#F4F4F6]/70 mb-2 font-mono">
                  {t.contact.budgetLabel}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {t.contact.budgets.map((b) => (
                    <button
                      type="button"
                      key={b.id}
                      onClick={() => setBudget(b.id)}
                      className={`min-h-[44px] py-2.5 px-3 text-xs font-mono rounded-xl border transition-all cursor-pointer ${
                        budget === b.id
                          ? 'bg-[#D4AF37]/15 border-[#D4AF37] text-white font-semibold'
                          : 'bg-[#0B0B0B]/40 border-white/[0.08] text-[#F4F4F6]/60 hover:border-white/20'
                      }`}
                    >
                      {b.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Project Description */}
              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-[#F4F4F6]/70 mb-2 font-mono">
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
                    className={`w-full bg-[#0B0B0B]/60 border ${
                      errors.description ? 'border-red-500/80' : 'border-white/[0.08] focus:border-[#D4AF37]'
                    } rounded-xl px-4 py-3.5 text-base sm:text-sm text-white placeholder:text-[#F4F4F6]/30 backdrop-blur-sm transition-all outline-none resize-none font-body`}
                  />
                  <MessageSquare className="absolute right-3.5 top-4 w-4 h-4 text-[#F4F4F6]/30 pointer-events-none" />
                </div>
                {errors.description && (
                  <span className="text-xs text-red-400 mt-1 block">{errors.description}</span>
                )}
              </div>

              {/* Confidentiality & Submission */}
              <div className="pt-4 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-5 sm:gap-6">
                <div className="flex items-center gap-2 text-xs text-[#F4F4F6]/60 font-body w-full sm:w-auto">
                  <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span>{t.contact.confidentiality}</span>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-3 px-8 sm:px-9 py-3.5 sm:py-4 text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#0B0B0B] bg-[#D4AF37] hover:bg-[#E2C255] disabled:opacity-50 rounded-full transition-all duration-200 cursor-pointer shadow-[0_4px_25px_rgba(212,175,55,0.35)] hover:shadow-[0_6px_35px_rgba(212,175,55,0.5)] whitespace-nowrap"
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
    </section>
  );
};
