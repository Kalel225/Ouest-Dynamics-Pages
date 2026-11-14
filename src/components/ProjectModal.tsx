import React, { useState, useEffect } from 'react';
import { X, ArrowUpRight, Check } from 'lucide-react';
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
  const [selected, setSelected] = useState(initialService);

  useEffect(() => {
    if (initialService) {
      setSelected(initialService);
    }
  }, [initialService]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleContinue = () => {
    onClose();
    onNavigateToForm(selected);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/65 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl bg-[#F7F4EE] text-[#161412] border border-[#E2DDD5] rounded-xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-5 bg-white border-b border-[#E2DDD5] flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-[#A64B2A] mb-0.5">
              {t.projectModal.surtitle}
            </p>
            <h3 className="font-serif-display text-xl sm:text-2xl font-semibold text-[#161412]">
              {t.projectModal.title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="min-h-[40px] min-w-[40px] flex items-center justify-center rounded-lg border border-[#E2DDD5] text-[#5C554E] hover:text-[#161412] cursor-pointer"
            aria-label={t.projectModal.cancelBtn}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          <p className="text-sm text-[#5C554E] leading-relaxed">
            {t.projectModal.subtitle}
          </p>

          <div className="space-y-2.5">
            <p className="text-xs font-semibold text-[#161412]">
              {t.projectModal.serviceLabel}
            </p>
            {t.services.items.map((item) => {
              const isSelected = selected === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelected(item.id)}
                  className={`w-full p-4 rounded-lg border text-left transition-colors cursor-pointer flex items-start justify-between gap-3 ${
                    isSelected
                      ? 'bg-white border-[#A64B2A]'
                      : 'bg-white/60 border-[#E2DDD5] hover:border-[#161412]'
                  }`}
                >
                  <div>
                    <div className="font-serif-display text-base font-semibold text-[#161412]">
                      {item.number}. {item.title}
                    </div>
                    <div className="text-xs text-[#5C554E] mt-0.5">
                      {item.subtitle}
                    </div>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                      isSelected
                        ? 'border-[#A64B2A] bg-[#A64B2A] text-[#F7F4EE]'
                        : 'border-[#D5CFC4]'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="px-6 py-4 bg-white border-t border-[#E2DDD5] flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-[#5C554E] hover:text-[#161412] cursor-pointer"
          >
            {t.projectModal.cancelBtn}
          </button>

          <button
            type="button"
            onClick={handleContinue}
            className="min-h-[44px] px-6 py-2.5 rounded-lg bg-[#A64B2A] hover:bg-[#8E3D20] text-[#F7F4EE] text-xs font-semibold inline-flex items-center gap-2 transition-colors cursor-pointer"
          >
            <span>{t.projectModal.continueBtn}</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
