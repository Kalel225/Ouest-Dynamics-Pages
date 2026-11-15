import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  RotateCcw,
  ArrowUpRight,
  AlertCircle,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency } from '../context/CurrencyContext';

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
  isError?: boolean;
}

interface AIChatbotProps {
  onOpenProjectModal: () => void;
  onScrollToContact: () => void;
}

export const AIChatbot: React.FC<AIChatbotProps> = ({
  onOpenProjectModal,
  onScrollToContact,
}) => {
  const { language } = useLanguage();
  const { currencyConfig } = useCurrency();
  const isFr = language === 'fr';

  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const getNowTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Initialize or update greeting when language changes if no user messages yet
  useEffect(() => {
    setMessages((prev) => {
      if (prev.length <= 1 && (prev.length === 0 || prev[0].id === 'welcome')) {
        return [
          {
            id: 'welcome',
            role: 'model',
            text: isFr
              ? `Bienvenue chez Ouest Dynamics. En tant que Partenaire d’Ingénierie Digitale, je vous accompagne dans la conception sur-mesure de votre plateforme web, e-commerce ou application mobile (estimations en ${currencyConfig.code} ${currencyConfig.symbol}, délais et garanties). Quelle est votre ambition ?`
              : `Welcome to Ouest Dynamics. As your Luxury Engineering Partner, I can guide you through the bespoke architecture of your website, e-commerce flagship, or mobile application—including timelines, guarantees, and investment tiers in ${currencyConfig.code} (${currencyConfig.symbol}). What are you looking to build?`,
            timestamp: getNowTime(),
          },
        ];
      }
      return prev;
    });
  }, [isFr, currencyConfig.code, currencyConfig.symbol]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    }
  }, [isOpen, messages, isLoading]);

  const quickQuestions = isFr
    ? [
        `Quel investissement prévoir en ${currencyConfig.code} ?`,
        'Comment fonctionne la maquette avant code ?',
        'Quels sont vos délais de réalisation ?',
        'Comment m’accompagnez-vous de A à Z ?',
      ]
    : [
        `What are your investment tiers in ${currencyConfig.code}?`,
        'How does the visual mockup guarantee work?',
        'What are your typical delivery timelines?',
        'How do you guide us from concept to launch?',
      ];

  const handleReset = () => {
    setMessages([
      {
        id: 'welcome',
        role: 'model',
        text: isFr
          ? `Bienvenue chez Ouest Dynamics. Comment puis-je vous éclairer sur l’architecture et la réussite de votre projet digital ?`
          : `Welcome to Ouest Dynamics. How may I assist you with the architecture and growth of your digital project?`,
        timestamp: getNowTime(),
      },
    ]);
    setInput('');
  };

  const sendMessage = async (textToSend: string) => {
    const trimmed = textToSend.trim();
    if (!trimmed || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user_${Date.now()}`,
      role: 'user',
      text: trimmed,
      timestamp: getNowTime(),
    };

    const updatedHistory = [...messages, userMsg];
    setMessages(updatedHistory);
    setInput('');
    setIsLoading(true);

    try {
      const historyPayload = updatedHistory
        .filter((m) => !m.isError && m.id !== 'welcome')
        .slice(-10)
        .map((m) => ({
          role: m.role,
          text: m.text,
        }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: trimmed,
          history: historyPayload.slice(0, -1),
          language,
          currency: {
            code: currencyConfig.code,
            symbol: currencyConfig.symbol,
            budgets: currencyConfig.budgets.map((b) => ({
              label: b.label,
              desc: b.id,
            })),
          },
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error ||
            (isFr
              ? 'Le service IA est momentanément indisponible.'
              : 'The AI advisor is temporarily unavailable.')
        );
      }

      const aiMsg: ChatMessage = {
        id: `model_${Date.now()}`,
        role: 'model',
        text:
          data.reply ||
          (isFr
            ? 'Je suis à votre disposition. Souhaitez-vous que nous préparions une étude sur-mesure pour votre projet ?'
            : 'I am at your disposal. Would you like us to prepare a bespoke proposal for your project?'),
        timestamp: getNowTime(),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err: any) {
      const errorMsg: ChatMessage = {
        id: `err_${Date.now()}`,
        role: 'model',
        text:
          err?.message ||
          (isFr
            ? 'Une erreur est survenue lors de la connexion au conseiller IA. Vous pouvez également utiliser notre formulaire de contact direct.'
            : 'An error occurred while connecting to the AI advisor. You can also use our direct consultation form.'),
        timestamp: getNowTime(),
        isError: true,
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      {/* Floating Launcher Button (Positioned cleanly on desktop & above MobileBottomBar on mobile) */}
      <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40 flex flex-col items-end">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.96 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
              className="mb-3 w-[calc(100vw-2rem)] sm:w-[400px] h-[520px] max-h-[75vh] bg-[#F7F4EE] border border-[#E2DDD5] rounded-2xl shadow-2xl flex flex-col overflow-hidden"
            >
              {/* Chat Header */}
              <div className="px-4 py-3.5 bg-[#181512] text-[#F7F4EE] border-b border-[#2C2621] flex items-center justify-between gap-3 shrink-0">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-[#A64B2A] flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4 text-[#F7F4EE]" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-serif-display text-sm font-semibold text-[#F7F4EE] truncate">
                        {isFr ? 'Ouest Dynamics · Ingénierie & Conseil' : 'Ouest Dynamics · Luxury Engineering Partner'}
                      </h3>
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] text-[#C8C1B6]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80] inline-block" />
                      <span>
                        {isFr
                          ? 'Accompagnement Sur-Mesure · En ligne'
                          : 'Bespoke Advisory · Online'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={handleReset}
                    title={isFr ? 'Réinitialiser la conversation' : 'Reset conversation'}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-[#C8C1B6] hover:text-[#F7F4EE] hover:bg-[#221E1A] transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    aria-label={isFr ? 'Fermer le chat' : 'Close chat'}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-[#C8C1B6] hover:text-[#F7F4EE] hover:bg-[#221E1A] transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Scrollable Messages Area */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-[#F7F4EE]">
                {messages.map((msg) => {
                  const isUser = msg.role === 'user';
                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                    >
                      <div
                        className={`max-w-[86%] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${
                          isUser
                            ? 'bg-[#181512] text-[#F7F4EE] rounded-br-xs'
                            : msg.isError
                            ? 'bg-[#B91C1C]/10 border border-[#B91C1C]/30 text-[#B91C1C] rounded-bl-xs'
                            : 'bg-white border border-[#E2DDD5] text-[#161412] rounded-bl-xs shadow-2xs'
                        }`}
                      >
                        {msg.isError && (
                          <div className="flex items-center gap-1.5 font-semibold mb-1">
                            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                            <span>{isFr ? 'Info' : 'Notice'}</span>
                          </div>
                        )}
                        {msg.text}
                      </div>
                      <span className="mt-1 px-1 text-[10px] font-mono-tabular text-[#5C554E]">
                        {msg.timestamp}
                      </span>
                    </div>
                  );
                })}

                {/* Quick Starter Prompts (shown when only welcome message is present) */}
                {messages.length === 1 && !isLoading && (
                  <div className="pt-1 space-y-1.5">
                    <p className="text-[11px] font-medium text-[#5C554E] px-0.5">
                      {isFr ? 'Questions fréquentes :' : 'Suggested questions:'}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {quickQuestions.map((q, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => sendMessage(q)}
                          className="text-left text-xs px-3 py-1.5 rounded-lg bg-[#EFECE6] hover:bg-[#A64B2A] text-[#161412] hover:text-[#F7F4EE] border border-[#E2DDD5] hover:border-[#A64B2A] transition-colors cursor-pointer"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Typing Indicator */}
                {isLoading && (
                  <div className="flex items-start">
                    <div className="bg-white border border-[#E2DDD5] rounded-xl rounded-bl-xs px-4 py-3 inline-flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#A64B2A] animate-bounce [animation-delay:-0.3s]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#A64B2A] animate-bounce [animation-delay:-0.15s]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#A64B2A] animate-bounce" />
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Conversion Strip inside Chatbot */}
              <div className="px-3.5 py-2 bg-[#EFECE6] border-t border-[#E2DDD5] flex items-center justify-between gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    onOpenProjectModal();
                  }}
                  className="text-[11px] font-semibold text-[#A64B2A] hover:text-[#161412] inline-flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <span>
                    {isFr ? 'Lancer le configurateur de devis' : 'Open project estimator'}
                  </span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    onScrollToContact();
                  }}
                  className="text-[11px] font-medium text-[#5C554E] hover:text-[#161412] underline underline-offset-2 transition-colors cursor-pointer"
                >
                  {isFr ? 'Formulaire direct' : 'Direct form'}
                </button>
              </div>

              {/* Input Form */}
              <form
                onSubmit={handleFormSubmit}
                className="p-3 bg-white border-t border-[#E2DDD5] flex items-center gap-2 shrink-0"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={
                    isFr
                      ? 'Posez votre question ici...'
                      : 'Ask anything about your project...'
                  }
                  disabled={isLoading}
                  className="flex-1 min-w-0 px-3.5 py-2.5 text-xs sm:text-sm bg-[#F7F4EE] border border-[#E2DDD5] rounded-lg text-[#161412] placeholder:text-[#8C847B] focus:outline-none focus:border-[#A64B2A] transition-colors"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  aria-label={isFr ? 'Envoyer' : 'Send'}
                  className="min-h-[40px] min-w-[40px] rounded-lg bg-[#A64B2A] hover:bg-[#8E3D20] disabled:bg-[#E2DDD5] disabled:text-[#8C847B] text-[#F7F4EE] flex items-center justify-center transition-colors cursor-pointer disabled:cursor-not-allowed shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toggle Button */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="h-12 sm:h-13 px-4 sm:px-5 rounded-full bg-[#181512] hover:bg-[#A64B2A] text-[#F7F4EE] border border-[#332C26] shadow-lg flex items-center gap-2.5 transition-colors duration-200 cursor-pointer"
          aria-expanded={isOpen}
        >
          {isOpen ? (
            <>
              <X className="w-4 h-4 text-[#D49B6A]" />
              <span className="text-xs sm:text-sm font-semibold">
                {isFr ? 'Fermer' : 'Close'}
              </span>
            </>
          ) : (
            <>
              <span className="relative flex h-2 w-2">
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4ADE80]" />
              </span>
              <MessageSquare className="w-4 h-4 text-[#D49B6A]" />
              <span className="text-xs sm:text-sm font-semibold whitespace-nowrap">
                {isFr ? 'Conseiller IA' : 'AI Advisor'}
              </span>
            </>
          )}
        </button>
      </div>
    </>
  );
};
