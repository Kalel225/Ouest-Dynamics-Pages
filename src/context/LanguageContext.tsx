import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, translations, Translations } from '../translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  showLangPrompt: boolean;
  dismissLangPrompt: () => void;
  acceptLangPrompt: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Default to English ('en') as requested: "un site aux standard americain avec une page en anglais"
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('od_lang');
    if (saved === 'en' || saved === 'fr') return saved;
    return 'en';
  });

  const [showLangPrompt, setShowLangPrompt] = useState<boolean>(false);

  useEffect(() => {
    const saved = localStorage.getItem('od_lang');
    const dismissed = sessionStorage.getItem('od_lang_prompt_dismissed');

    // Check device language
    const deviceLang = (navigator.language || '').toLowerCase();
    const isFrenchDevice = deviceLang.startsWith('fr');

    // If device is French and user has not set a preferred language yet and prompt was not dismissed
    if (isFrenchDevice && !saved && !dismissed) {
      setShowLangPrompt(true);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('od_lang', lang);
    setShowLangPrompt(false);
  };

  const dismissLangPrompt = () => {
    setShowLangPrompt(false);
    sessionStorage.setItem('od_lang_prompt_dismissed', 'true');
  };

  const acceptLangPrompt = () => {
    setLanguage('fr');
    setShowLangPrompt(false);
    sessionStorage.setItem('od_lang_prompt_dismissed', 'true');
  };

  const t = translations[language];

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        showLangPrompt,
        dismissLangPrompt,
        acceptLangPrompt,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
