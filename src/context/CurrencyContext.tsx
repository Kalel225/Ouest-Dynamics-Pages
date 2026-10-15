import React, { createContext, useContext, useState, useEffect } from 'react';

export type CurrencyCode = 'USD' | 'EUR' | 'XOF' | 'GBP';

export interface BudgetOption {
  id: string;
  label: string;
}

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  name: string;
  shortLabel: string;
  flag: string;
  heroStat: {
    amount: string;
    labelEn: string;
    labelFr: string;
  };
  budgets: BudgetOption[];
}

export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  USD: {
    code: 'USD',
    symbol: '$',
    name: 'US Dollar',
    shortLabel: 'USD ($)',
    flag: '🇺🇸',
    heroStat: {
      amount: '+$15M',
      labelEn: 'Generated in Client Value',
      labelFr: 'Valeur Générée pour nos Clients',
    },
    budgets: [
      { id: '3k-7k', label: '$3,000 – $7,000' },
      { id: '7k-15k', label: '$7,000 – $15,000' },
      { id: '15k-35k', label: '$15,000 – $35,000' },
      { id: '35k+', label: '$35,000 +' },
    ],
  },
  EUR: {
    code: 'EUR',
    symbol: '€',
    name: 'Euro',
    shortLabel: 'EUR (€)',
    flag: '🇪🇺',
    heroStat: {
      amount: '+15M€',
      labelEn: 'Generated in Client Value',
      labelFr: 'Valeur Générée pour nos Clients',
    },
    budgets: [
      { id: '3k-7k', label: '3 000 € – 7 000 €' },
      { id: '7k-15k', label: '7 000 € – 15 000 €' },
      { id: '15k-35k', label: '15 000 € – 35 000 €' },
      { id: '35k+', label: '35 000 € +' },
    ],
  },
  XOF: {
    code: 'XOF',
    symbol: 'FCFA',
    name: 'Franc CFA (UEMOA)',
    shortLabel: 'FCFA',
    flag: '🇨🇮',
    heroStat: {
      amount: '+10 Mrds',
      labelEn: 'FCFA in Client Revenue',
      labelFr: 'FCFA Générés pour nos Clients',
    },
    budgets: [
      { id: '3k-7k', label: '2M – 5M FCFA' },
      { id: '7k-15k', label: '5M – 10M FCFA' },
      { id: '15k-35k', label: '10M – 25M FCFA' },
      { id: '35k+', label: '25M+ FCFA' },
    ],
  },
  GBP: {
    code: 'GBP',
    symbol: '£',
    name: 'British Pound',
    shortLabel: 'GBP (£)',
    flag: '🇬🇧',
    heroStat: {
      amount: '+£12M',
      labelEn: 'Generated in Client Value',
      labelFr: 'Valeur Générée pour nos Clients',
    },
    budgets: [
      { id: '3k-7k', label: '£2,500 – £6,000' },
      { id: '7k-15k', label: '£6,000 – £12,000' },
      { id: '15k-35k', label: '£12,000 – £30,000' },
      { id: '35k+', label: '£30,000 +' },
    ],
  },
};

interface CurrencyContextType {
  currency: CurrencyCode;
  currencyConfig: CurrencyConfig;
  setCurrency: (curr: CurrencyCode) => void;
  detectedCurrency: CurrencyCode;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

// Helper function to detect local currency based on user timezone and locale
function detectUserCurrency(): CurrencyCode {
  try {
    const tz = (Intl.DateTimeFormat().resolvedOptions().timeZone || '').toLowerCase();
    const languages = (navigator.languages || [navigator.language || '']).map((l) => l.toLowerCase());

    // Check West African / African regional timezones
    const westAfricanZones = [
      'abidjan',
      'dakar',
      'accra',
      'lagos',
      'casablanca',
      'douala',
      'bamako',
      'niamey',
      'ouagadougou',
      'lome',
      'cotonou',
      'libreville',
      'brazzaville',
      'kinshasa',
      'conakry',
    ];
    if (westAfricanZones.some((zone) => tz.includes(zone))) {
      return 'XOF';
    }

    // Check United Kingdom
    if (tz.includes('london') || languages.some((l) => l === 'en-gb')) {
      return 'GBP';
    }

    // Check Europe / Eurozone
    const euroZones = [
      'paris',
      'berlin',
      'madrid',
      'rome',
      'brussels',
      'amsterdam',
      'vienna',
      'lisbon',
      'dublin',
      'helsinki',
      'athens',
    ];
    if (euroZones.some((zone) => tz.includes(zone))) {
      return 'EUR';
    }

    // Check if device language is French in Europe
    if (languages.some((l) => l.startsWith('fr-fr') || l.startsWith('fr-be'))) {
      return 'EUR';
    }

    // Default to USD for global/American standard
    return 'USD';
  } catch {
    return 'USD';
  }
}

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [detectedCurrency] = useState<CurrencyCode>(detectUserCurrency);

  const [currency, setCurrencyState] = useState<CurrencyCode>(() => {
    const saved = localStorage.getItem('od_currency') as CurrencyCode | null;
    if (saved && CURRENCIES[saved]) {
      return saved;
    }
    return detectedCurrency;
  });

  const setCurrency = (curr: CurrencyCode) => {
    if (CURRENCIES[curr]) {
      setCurrencyState(curr);
      localStorage.setItem('od_currency', curr);
    }
  };

  const currencyConfig = CURRENCIES[currency] || CURRENCIES.USD;

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        currencyConfig,
        setCurrency,
        detectedCurrency,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = (): CurrencyContextType => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
