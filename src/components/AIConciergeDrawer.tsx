import React, { useState, useRef, useEffect } from 'react';
import { X, Send, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency } from '../context/CurrencyContext';
import {
  PoleId,
  TransverseModifierId,
  UrgencyTier,
  CurrencyCode,
} from '../utils/pricingEngine';

export interface StructuredConciergeDiagnostic {
  reply_message: string;
  detected_language: 'fr' | 'en';
  qualification_complete: boolean;
  recommended_poles: PoleId[];
  recommended_modifiers: TransverseModifierId[];
  urgency_tier: UrgencyTier;
  suggested_currency: CurrencyCode;
  synthesized_project_summary: string;
  next_follow_up_question: string;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  diagnostic?: StructuredConciergeDiagnostic;
}

interface AIConciergeDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyDiagnostic: (diagnostic: StructuredConciergeDiagnostic) => void;
  onEstimateDirect: () => void;
}

export const AIConciergeDrawer: React.FC<AIConciergeDrawerProps> = ({
  isOpen,
  onClose,
  onApplyDiagnostic,
  onEstimateDirect,
}) => {
  const { t, language } = useLanguage();
  const { currency } = useCurrency();

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      endRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isOpen, messages, isLoading]);

  const sendMessage = async (textToSend: string) => {
    const trimmed = textToSend.trim();
    if (!trimmed || isLoading) return;

    const userMsg: ChatMessage = {
      id: `u_${Date.now()}`,
      role: 'user',
      text: trimmed,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);
    setErrorMsg(null);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: trimmed,
          history: messages.map((m) => ({ role: m.role, text: m.text })),
          language,
          activeCurrency: currency,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || t.concierge.unavailable);
      }

      const diag: StructuredConciergeDiagnostic = data.diagnostic;
      const modelMsg: ChatMessage = {
        id: `m_${Date.now()}`,
        role: 'model',
        text: diag.reply_message,
        diagnostic: diag,
      };
      setMessages((prev) => [...prev, modelMsg]);
    } catch {
      setErrorMsg(t.concierge.unavailable);
    } finally {
      setIsLoading(false);
    }
  };

  const poleName = (id: PoleId) =>
    t.services.items.find((s) => s.id === id)?.name || id;

  const modName = (id: TransverseModifierId) =>
    t.options.items.find((o) => o.id === id)?.name || id;

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[75] bg-[#0B241D]/50 backdrop-blur-sm flex justify-end"
      onClick={onClose}
    >
      <aside
        className="w-full max-w-lg bg-white h-full flex flex-col justify-between text-[#0B241D] shadow-2xl border-l border-[#DCE4E0]"
        onClick={(e) => e.stopPropagation()}
        aria-label={t.concierge.title}
      >
        <div className="px-6 py-5 border-b border-[#DCE4E0] flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F77F00]" aria-hidden="true" />
            <h2 className="text-lg font-bold text-[#0B241D]">{t.concierge.title}</h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="min-h-[36px] min-w-[36px] flex items-center justify-center rounded-full border border-[#DCE4E0] text-[#50645D] hover:text-[#0B241D] cursor-pointer"
            aria-label={t.concierge.close}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          <p className="text-sm text-[#50645D] leading-relaxed">{t.concierge.intro}</p>

          {messages.length === 0 && (
            <div className="space-y-2.5">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#50645D]">
                {t.concierge.examplesTitle}
              </p>
              {t.concierge.examples.map((sample, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => sendMessage(sample)}
                  className="w-full text-left p-3.5 rounded-xl bg-[#EEF3F0]/60 hover:bg-[#EEF3F0] border border-[#DCE4E0] text-xs sm:text-sm text-[#0B241D] transition-colors cursor-pointer"
                >
                  “{sample}”
                </button>
              ))}
            </div>
          )}

          {messages.map((msg) => (
            <div key={msg.id} className="space-y-3">
              {msg.role === 'user' ? (
                <div className="ml-8 p-4 rounded-2xl bg-[#0E3A2F] text-white text-sm">
                  {msg.text}
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="p-4 rounded-2xl bg-[#EEF3F0]/70 border border-[#DCE4E0] text-sm text-[#0B241D] leading-relaxed">
                    {msg.text}
                  </div>

                  {msg.diagnostic && (
                    <div className="p-5 rounded-2xl border border-[#0E3A2F]/30 bg-white space-y-4">
                      <div className="text-xs font-semibold uppercase tracking-wider text-[#0E3A2F]">
                        {t.concierge.resultTitle}
                      </div>

                      <div className="space-y-2 text-xs sm:text-sm">
                        <div>
                          <span className="text-[#50645D]">{t.concierge.servicesLabel} : </span>
                          <span className="font-semibold text-[#0B241D]">
                            {msg.diagnostic.recommended_poles.map(poleName).join(', ')}
                          </span>
                        </div>
                        {msg.diagnostic.recommended_modifiers.length > 0 && (
                          <div>
                            <span className="text-[#50645D]">{t.concierge.optionsLabel} : </span>
                            <span className="font-medium text-[#0B241D]">
                              {msg.diagnostic.recommended_modifiers.map(modName).join(', ')}
                            </span>
                          </div>
                        )}
                      </div>

                      {msg.diagnostic.next_follow_up_question && (
                        <p className="text-xs text-[#50645D]">
                          <strong className="text-[#0B241D]">{t.concierge.followUp} : </strong>
                          {msg.diagnostic.next_follow_up_question}
                        </p>
                      )}

                      <button
                        type="button"
                        onClick={() => onApplyDiagnostic(msg.diagnostic!)}
                        className="w-full py-2.5 px-4 rounded-full bg-[#F77F00] hover:bg-[#E07100] text-[#0B241D] text-xs font-semibold inline-flex items-center justify-center gap-2 press cursor-pointer"
                      >
                        <span>{t.concierge.apply}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="text-xs text-[#50645D]">{t.concierge.thinking}</div>
          )}

          {errorMsg && (
            <div className="p-4 rounded-xl bg-[#EEF3F0] border border-[#DCE4E0] space-y-2 text-xs">
              <p className="text-[#B42318]">{errorMsg}</p>
              <button
                type="button"
                onClick={onEstimateDirect}
                className="font-semibold text-[#0E3A2F] underline cursor-pointer"
              >
                {t.concierge.estimateDirect}
              </button>
            </div>
          )}

          <div ref={endRef} />
        </div>

        <div className="p-5 border-t border-[#DCE4E0] space-y-3 bg-white">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage(input);
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t.concierge.placeholder}
              className="flex-1 px-4 py-2.5 rounded-full bg-[#EEF3F0]/60 border border-[#DCE4E0] focus:border-[#0E3A2F] text-sm text-[#0B241D] outline-none"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="px-4 py-2.5 rounded-full bg-[#0E3A2F] hover:bg-[#082820] disabled:opacity-40 text-white text-xs font-semibold inline-flex items-center gap-1.5 press cursor-pointer whitespace-nowrap"
            >
              <span>{t.concierge.send}</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

          <p className="text-[11px] text-[#50645D]">{t.concierge.privacy}</p>
        </div>
      </aside>
    </div>
  );
};
