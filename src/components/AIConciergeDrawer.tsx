import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Sparkles,
  Send,
  CheckCircle2,
  ArrowUpRight,
  ShieldCheck,
} from 'lucide-react';
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
}

export const AIConciergeDrawer: React.FC<AIConciergeDrawerProps> = ({
  isOpen,
  onClose,
  onApplyDiagnostic,
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

    const nextHistory = [...messages, userMsg];
    setMessages(nextHistory);
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
        throw new Error(data.error || 'Error communicating with AI Concierge');
      }

      const diag: StructuredConciergeDiagnostic = data.diagnostic;
      const modelMsg: ChatMessage = {
        id: `m_${Date.now()}`,
        role: 'model',
        text: diag.reply_message,
        diagnostic: diag,
      };
      setMessages((prev) => [...prev, modelMsg]);
    } catch (err: any) {
      setErrorMsg(
        err?.message ||
          (language === 'fr'
            ? 'Le service Concierge IA est momentanément indisponible. Vous pouvez configurer votre brief directement.'
            : 'The AI Concierge service is temporarily unavailable. You may configure your brief directly.')
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[75] bg-black/70 backdrop-blur-xs flex justify-end"
      onClick={onClose}
    >
      <aside
        className="w-full max-w-xl bg-[#141821] border-l border-[#D4AF37]/30 h-full flex flex-col justify-between text-[#F4F4F6] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        aria-label={t.concierge.drawerTitle}
      >
        {/* Drawer Header */}
        <div className="px-6 py-5 bg-[#0B0D12] border-b border-[#D4AF37]/20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-[6px] bg-[#141821] border border-[#D4AF37] flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            </div>
            <div>
              <h2 className="font-display text-base sm:text-lg font-bold text-[#F4F4F6]">
                {t.concierge.drawerTitle}
              </h2>
              <p className="text-[11px] font-mono-code text-[#D4AF37]">
                {t.concierge.drawerSubtitle}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="min-h-[40px] min-w-[40px] flex items-center justify-center rounded-[6px] border border-[#D4AF37]/25 text-[#A1A7B5] hover:text-[#F4F4F6] cursor-pointer"
            aria-label="Close AI Concierge"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Conversation Feed */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* Initial Executive Welcome Card */}
          <div className="p-4 rounded-[10px] bg-[#0B0D12] border border-[#D4AF37]/20 text-xs sm:text-sm text-[#F4F4F6] leading-relaxed">
            {t.concierge.welcomeMessage}
          </div>

          {/* Sample One-Click Diagnostic Prompts */}
          {messages.length === 0 && (
            <div className="space-y-2.5">
              <p className="text-xs font-mono-code text-[#D4AF37]">
                {t.concierge.promptsTitle}
              </p>
              {t.concierge.samplePrompts.map((sample, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => sendMessage(sample)}
                  className="w-full text-left p-3.5 rounded-[8px] bg-[#0B0D12]/80 hover:bg-[#1B202C] border border-[#D4AF37]/18 hover:border-[#D4AF37] text-xs text-[#A1A7B5] hover:text-[#F4F4F6] transition-colors cursor-pointer"
                >
                  “{sample}”
                </button>
              ))}
            </div>
          )}

          {/* Messages & Structured Diagnostic Outputs */}
          {messages.map((msg) => (
            <div key={msg.id} className="space-y-3">
              {msg.role === 'user' ? (
                <div className="ml-8 p-4 rounded-[10px] bg-[#1B202C] border border-[#D4AF37]/30 text-xs sm:text-sm text-[#F4F4F6]">
                  {msg.text}
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="p-4 rounded-[10px] bg-[#0B0D12] border border-[#D4AF37]/20 text-xs sm:text-sm text-[#F4F4F6] leading-relaxed">
                    {msg.text}
                  </div>

                  {/* Structured Output Diagnostic Card */}
                  {msg.diagnostic && (
                    <div className="p-5 rounded-[10px] bg-[#0B0D12] border border-[#D4AF37] space-y-4">
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#D4AF37]/20">
                        <span className="font-mono-code text-xs font-semibold text-[#D4AF37]">
                          {t.concierge.diagnosticCardTitle}
                        </span>
                        <span
                          className={`font-mono-code text-[11px] font-semibold flex items-center gap-1 ${
                            msg.diagnostic.qualification_complete
                              ? 'text-[#10B981]'
                              : 'text-[#F59E0B]'
                          }`}
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>
                            {msg.diagnostic.qualification_complete
                              ? t.concierge.qualificationReadyBadge
                              : t.concierge.qualificationInProgressBadge}
                          </span>
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div>
                          <span className="text-[#A1A7B5] block mb-0.5">
                            {t.concierge.recommendedPolesLabel}
                          </span>
                          <span className="font-mono-code font-semibold text-[#F4F4F6]">
                            {msg.diagnostic.recommended_poles.join(', ') || 'WEB'}
                          </span>
                        </div>
                        <div>
                          <span className="text-[#A1A7B5] block mb-0.5">
                            {t.concierge.recommendedModifiersLabel}
                          </span>
                          <span className="font-mono-code font-semibold text-[#D4AF37]">
                            {msg.diagnostic.recommended_modifiers.length > 0
                              ? msg.diagnostic.recommended_modifiers.join(', ')
                              : '—'}
                          </span>
                        </div>
                        <div>
                          <span className="text-[#A1A7B5] block mb-0.5">
                            {t.concierge.urgencyLabel}
                          </span>
                          <span className="font-mono-code text-[#F4F4F6]">
                            {msg.diagnostic.urgency_tier}
                          </span>
                        </div>
                        <div>
                          <span className="text-[#A1A7B5] block mb-0.5">
                            {t.concierge.currencyLabel}
                          </span>
                          <span className="font-mono-code text-[#F4F4F6]">
                            {msg.diagnostic.suggested_currency}
                          </span>
                        </div>
                      </div>

                      {msg.diagnostic.synthesized_project_summary && (
                        <div className="p-3 rounded-[6px] bg-[#141821] border border-[#D4AF37]/15 text-xs">
                          <span className="font-mono-code text-[11px] text-[#D4AF37] block mb-1">
                            {t.concierge.summaryLabel}
                          </span>
                          <p className="text-[#F4F4F6] leading-relaxed">
                            {msg.diagnostic.synthesized_project_summary}
                          </p>
                        </div>
                      )}

                      {msg.diagnostic.next_follow_up_question && (
                        <div className="text-xs text-[#A1A7B5]">
                          <strong className="text-[#F4F4F6]">
                            {t.concierge.followUpLabel}
                          </strong>{' '}
                          {msg.diagnostic.next_follow_up_question}
                        </div>
                      )}

                      <button
                        type="button"
                        onClick={() => onApplyDiagnostic(msg.diagnostic!)}
                        className="w-full py-3 px-4 rounded-[6px] bg-[#D4AF37] hover:bg-[#E3C358] text-[#0B0D12] text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                      >
                        <span>{t.concierge.applyButton}</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="p-4 rounded-[10px] bg-[#0B0D12] border border-[#D4AF37]/25 text-xs font-mono-code text-[#D4AF37]">
              {t.concierge.thinkingLabel}
            </div>
          )}

          {errorMsg && (
            <div className="p-4 rounded-[10px] bg-[#0B0D12] border border-[#EF4444] text-xs text-[#EF4444]">
              {errorMsg}
            </div>
          )}

          <div ref={endRef} />
        </div>

        {/* Drawer Input Footer + ZDR Policy Note */}
        <div className="p-4 sm:p-5 bg-[#0B0D12] border-t border-[#D4AF37]/20 space-y-3">
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
              placeholder={t.concierge.inputPlaceholder}
              className="flex-1 px-3.5 py-2.5 rounded-[6px] bg-[#141821] border border-[#D4AF37]/25 focus:border-[#D4AF37] text-xs sm:text-sm text-[#F4F4F6] outline-none"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="px-4 py-2.5 rounded-[6px] bg-[#D4AF37] hover:bg-[#E3C358] disabled:opacity-50 text-[#0B0D12] text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0"
            >
              <span>{t.concierge.sendBtn}</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

          <div className="flex items-start gap-2 text-[11px] text-[#A1A7B5]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
            <span>{t.concierge.zdrNotice}</span>
          </div>
        </div>
      </aside>
    </div>
  );
};
