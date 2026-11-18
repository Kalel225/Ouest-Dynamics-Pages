import React, { createContext, useContext, useState } from 'react';
import {
  CurrencyCode,
  EXCHANGE_RATES_TO_XOF,
  convertFromXof,
  formatCurrencyAmount,
} from '../utils/pricingEngine';

interface CurrencyContextType {
  currency: CurrencyCode;
  setCurrency: (curr: CurrencyCode) => void;
  formatFromXof: (amountXof: number) => string;
  formatAmount: (amountInActiveCurrency: number) => string;
  convertXof: (amountXof: number) => number;
  parityLabel: string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

const STORAGE_KEY = 'od_v2_currency';

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Default to XOF (FCFA) as required by BUILD_PROMPT.md & AI_EXPORT_CONTEXT.md
  const [currency, setCurrencyState] = useState<CurrencyCode>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as CurrencyCode | null;
      if (saved === 'XOF' || saved === 'EUR' || saved === 'USD') {
        return saved;
      }
    } catch {
      // ignore storage errors
    }
    return 'XOF';
  });

  const setCurrency = (curr: CurrencyCode) => {
    setCurrencyState(curr);
    try {
      localStorage.setItem(STORAGE_KEY, curr);
    } catch {
      // ignore storage errors
    }
  };

  const convertXof = (amountXof: number) => convertFromXof(amountXof, currency);

  const formatFromXof = (amountXof: number) => {
    const converted = convertFromXof(amountXof, currency);
    return formatCurrencyAmount(converted, currency);
  };

  const formatAmount = (amountInActiveCurrency: number) => {
    return formatCurrencyAmount(amountInActiveCurrency, currency);
  };

  const parityLabel =
    currency === 'XOF'
      ? 'Devise pivot UEMOA (FCFA)'
      : currency === 'EUR'
      ? `1 EUR = ${EXCHANGE_RATES_TO_XOF.EUR} XOF`
      : `1 USD = ${EXCHANGE_RATES_TO_XOF.USD} XOF`;

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        formatFromXof,
        formatAmount,
        convertXof,
        parityLabel,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = (): CurrencyContextType => {
  const ctx = useContext(CurrencyContext);
  if (!ctx) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return ctx;
};
