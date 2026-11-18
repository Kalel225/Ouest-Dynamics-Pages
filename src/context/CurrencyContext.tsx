import React, { createContext, useContext, useState } from 'react';
import {
  CurrencyCode,
  MoneyRangeParts,
  formatMoney,
  formatMoneyRange,
  moneyRangeParts,
} from '../utils/pricingEngine';
import { useLanguage } from './LanguageContext';

interface CurrencyContextType {
  currency: CurrencyCode;
  setCurrency: (curr: CurrencyCode) => void;
  /** Single amount from an XOF value, in the active currency and language. */
  formatPrice: (amountXof: number) => string;
  /** Range string from XOF values, e.g. "1,35 – 4,05 millions FCFA". */
  formatRange: (minXof: number, maxXof: number) => string;
  /** Range split into wrap-safe parts for display typography. */
  rangeParts: (minXof: number, maxXof: number) => MoneyRangeParts;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

const STORAGE_KEY = 'od_v2_currency';

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { language } = useLanguage();

  const [currency, setCurrencyState] = useState<CurrencyCode>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'XOF' || saved === 'EUR' || saved === 'USD') return saved;
    } catch {
      // storage unavailable
    }
    return 'XOF';
  });

  const setCurrency = (curr: CurrencyCode) => {
    setCurrencyState(curr);
    try {
      localStorage.setItem(STORAGE_KEY, curr);
    } catch {
      // storage unavailable
    }
  };

  const value: CurrencyContextType = {
    currency,
    setCurrency,
    formatPrice: (amountXof) => formatMoney(amountXof, currency, language),
    formatRange: (minXof, maxXof) => formatMoneyRange(minXof, maxXof, currency, language),
    rangeParts: (minXof, maxXof) => moneyRangeParts(minXof, maxXof, currency, language),
  };

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
};

export const useCurrency = (): CurrencyContextType => {
  const ctx = useContext(CurrencyContext);
  if (!ctx) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return ctx;
};
