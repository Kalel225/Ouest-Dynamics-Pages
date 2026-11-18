import React, { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';
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
      className="fixed inset-0 z-[75] bg-[#141311]/45 backdrop-blur-xs flex justify-end"
      onClick={onClose}
    >
      <aside
        className="w-full max-w-md bg-[#EFECE6] h-full flex flex-col justify-between text-[#141311]"
        onClick={(e) => e.stopPropagation()}
        aria-label={t.concierge.title}
      >
        <div className="px-6 py-4 border-b border-[#141311]/12 flex items-center justify-between gap-4">
          <h2 className="text-sm font-semibold uppercase tracking-[0.08em] text-[#141311]">
            {t.concierge.title}
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="min-h-[34px] min-w-[34px] flex items-center justify-center bg-[#E4DFD5] hover:bg-[#141311] hover:text-[#EFECE6] text-[#141311] transition-colors cursor-pointer"
            aria-label={t.concierge.close}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-5 text-sm">
          <p className="text-[#141311]/65 leading-relaxed">{t.concierge.intro}</p>

          {messages.length === 0 && (
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.08em] text-[#141311]/50">
                {t.concierge.examplesTitle}
              </p>
              {t.concierge.examples.map((sample, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => sendMessage(sample)}
                  className="w-full text-left p-3.5 bg-[#E4DFD5] hover:bg-[#D8D1C4] text-xs sm:text-sm text-[#141311] transition-colors cursor-pointer"
                >
                  “{sample}”
                </button>
              ))}
            </div>
          )}

          {messages.map((msg) => (
            <div key={msg.id} className="space-y-3">
              {msg.role === 'user' ? (
                <div className="ml-8 p-3.5 bg-[#141311] text-[#EFECE6]">{msg.text}</div>
              ) : (
                <div className="space-y-3">
                  <div className="p-3.5 bg-[#E4DFD5] text-[#141311] leading-relaxed">
                    {msg.text}
                  </div>

                  {msg.diagnostic && (
                    <div className="p-4 bg-[#E4DFD5]/65 space-y-3">
                      <div className="text-xs font-semibold uppercase tracking-[0.08em]">
                        {t.concierge.resultTitle}
                      </div>

                      <div className="space-y-1 text-xs">
                        <div>
                          <span className="text-[#141311]/55">{t.concierge.servicesLabel}: </span>
                          <span className="font-semibold">
                            {msg.diagnostic.recommended_poles.map(poleName).join(', ')}
                          </span>
                        </div>
                        {msg.diagnostic.recommended_modifiers.length > 0 && (
                          <div>
                            <span className="text-[#141311]/55">{t.concierge.optionsLabel}: </span>
                            <span>
                              {msg.diagnostic.recommended_modifiers.map(modName).join(', ')}
                            </span>
                          </div>
                        )}
                      </div>

                      {msg.diagnostic.next_follow_up_question && (
                        <p className="text-xs text-[#141311]/70">
                          <strong className="text-[#141311]">{t.concierge.followUp}: </strong>
                          {msg.diagnostic.next_follow_up_question}
                        </p>
                      )}

                      <button
                        type="button"
                        onClick={() => onApplyDiagnostic(msg.diagnostic!)}
                        className="w-full py-2.5 px-4 bg-[#141311] hover:bg-[#2C2925] text-[#EFECE6] text-xs uppercase tracking-[0.1em] press cursor-pointer"
                      >
                        {t.concierge.apply}
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}

          {isLoading && <div className="text-xs text-[#141311]/55">{t.concierge.thinking}</div>}

          {errorMsg && (
            <div className="p-3.5 bg-[#E4DFD5] space-y-2 text-xs">
              <p className="text-red-700">{errorMsg}</p>
              <button
                type="button"
                onClick={onEstimateDirect}
                className="font-medium text-[#141311] underline cursor-pointer"
              >
                {t.concierge.estimateDirect}
              </button>
            </div>
          )}

          <div ref={endRef} />
        </div>

        <div className="p-5 border-t border-[#141311]/12 space-y-3 bg-[#EFECE6]">
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
              className="flex-1 px-3.5 py-2.5 bg-[#E4DFD5]/60 border-b border-[#141311]/25 focus:border-[#141311] text-sm text-[#141311] outline-none"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="px-4 py-2.5 bg-[#141311] hover:bg-[#2C2925] disabled:opacity-40 text-[#EFECE6] text-xs uppercase tracking-[0.1em] press cursor-pointer whitespace-nowrap"
            >
              {t.concierge.send}
            </button>
          </form>

          <p className="text-[11px] text-[#141311]/50">{t.concierge.privacy}</p>
        </div>
      </aside>
    </div>
  );
};
