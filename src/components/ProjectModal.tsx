import React, { useState } from 'react';
import { X, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToForm: (serviceKey: string) => void;
  initialService?: string;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  isOpen,
  onClose,
  onNavigateToForm,
  initialService = 'web',
}) => {
  const { t } = useLanguage();
  const [selectedService, setSelectedService] = useState(initialService);

  if (!isOpen) return null;

  const handleContinue = () => {
    onNavigateToForm(selectedService);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B0B0B]/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="bg-[#141414]/95 backdrop-blur-2xl border border-white/[0.1] rounded-3xl max-w-xl w-full p-6 sm:p-9 relative shadow-[0_25px_60px_rgba(0,0,0,0.95)] max-h-[92vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 sm:top-6 sm:right-6 min-w-[44px] min-h-[44px] rounded-full bg-white/[0.04] hover:bg-white/[0.1] border border-white/[0.08] flex items-center justify-center text-[#F4F4F6]/60 hover:text-white transition-colors cursor-pointer"
          aria-label={t.projectModal.cancelBtn}
        >
          <X className="w-4 h-4" />
        </button>

        <div className="mb-6">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
            <span className="text-[10px] sm:text-[11px] font-mono uppercase text-[#D4AF37] tracking-wider">
              {t.projectModal.surtitle}
            </span>
          </div>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-white mt-1">
            {t.projectModal.title}
          </h3>
          <p className="text-xs sm:text-sm text-[#F4F4F6]/70 mt-1 font-body">
            {t.projectModal.subtitle}
          </p>
        </div>

        {/* Services Selection */}
        <div className="space-y-2.5 mb-6">
          <label className="block text-xs font-semibold uppercase tracking-wider text-white mb-2 font-mono">
            {t.projectModal.serviceLabel}
          </label>
          {t.services.items.map((srv) => (
            <div
              key={srv.id}
              onClick={() => setSelectedService(srv.id)}
              className={`p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between min-h-[56px] ${
                selectedService === srv.id
                  ? 'bg-white/[0.06] border-[#D4AF37] shadow-[inset_0_1px_1px_rgba(212,175,55,0.3)]'
                  : 'bg-white/[0.02] border-white/[0.08] hover:border-white/[0.15] hover:bg-white/[0.04]'
              }`}
            >
              <div>
                <span className="block text-xs sm:text-sm font-bold text-white">
                  {srv.title}
                </span>
                <span className="block text-[11px] text-[#F4F4F6]/60 line-clamp-1 font-body">
                  {srv.subtitle}
                </span>
              </div>
              <div
                className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ml-3 ${
                  selectedService === srv.id
                    ? 'border-[#D4AF37] bg-[#D4AF37] text-[#0B0B0B]'
                    : 'border-white/[0.2]'
                }`}
              >
                {selectedService === srv.id && <Check className="w-3 h-3 stroke-[3]" />}
              </div>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-[#F4F4F6]/60 font-body hidden sm:flex">
            <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Strict NDA Protocol</span>
          </div>

          <button
            onClick={handleContinue}
            className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-2 px-7 py-3 text-xs font-semibold uppercase tracking-wider text-[#0B0B0B] bg-[#D4AF37] hover:bg-[#E2C255] rounded-full transition-all cursor-pointer shadow-[0_4px_15px_rgba(212,175,55,0.3)]"
          >
            <span>{t.projectModal.continueBtn}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
