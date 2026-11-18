export type PoleId = 'BRANDING' | 'WEB' | 'MOBILE_DESKTOP' | 'GROWTH';
export type TransverseModifierId = 'TRANSVERSE_DA' | 'TRANSVERSE_AI';
export type UrgencyTier = 'STANDARD' | 'FAST_TRACK_48H';
export type CurrencyCode = 'XOF' | 'EUR' | 'USD';

export interface PolePricingSpec {
  id: PoleId;
  minXof: number;
  maxXof: number;
  minDays: number;
  maxDays: number;
}

export const EXCHANGE_RATES_TO_XOF: Record<CurrencyCode, number> = {
  XOF: 1,
  EUR: 655.957,
  USD: 606.06,
};

export const POLE_PRICING_CATALOG: Record<PoleId, PolePricingSpec> = {
  BRANDING: {
    id: 'BRANDING',
    minXof: 950_000,
    maxXof: 2_400_000,
    minDays: 10,
    maxDays: 15,
  },
  WEB: {
    id: 'WEB',
    minXof: 1_500_000,
    maxXof: 4_500_000,
    minDays: 15,
    maxDays: 25,
  },
  MOBILE_DESKTOP: {
    id: 'MOBILE_DESKTOP',
    minXof: 2_800_000,
    maxXof: 7_500_000,
    minDays: 25,
    maxDays: 40,
  },
  GROWTH: {
    id: 'GROWTH',
    minXof: 750_000,
    maxXof: 2_000_000,
    minDays: 7,
    maxDays: 14,
  },
};

export const MODIFIER_RATES = {
  TRANSVERSE_DA: 0.20, // +20%
  TRANSVERSE_AI: 0.25, // +25%
  FAST_TRACK_48H: 0.15, // +15%
  MULTI_POLE_DISCOUNT: 0.10, // -10% when >= 2 poles selected
} as const;

export interface PricingCalculationResult {
  baseMinXof: number;
  baseMaxXof: number;
  multiPoleDiscountApplied: boolean;
  discountAmountMinXof: number;
  discountAmountMaxXof: number;
  modifierMultiplier: number;
  totalMinXof: number;
  totalMaxXof: number;
  totalMinConverted: number;
  totalMaxConverted: number;
  schedule: {
    signature40Min: number;
    signature40Max: number;
    architecture30Min: number;
    architecture30Max: number;
    delivery30Min: number;
    delivery30Max: number;
  };
  estimatedMinDays: number;
  estimatedMaxDays: number;
}

export function convertFromXof(amountXof: number, targetCurrency: CurrencyCode): number {
  if (targetCurrency === 'XOF') {
    return Math.round(amountXof);
  }
  const rate = EXCHANGE_RATES_TO_XOF[targetCurrency];
  return Math.round(amountXof / rate);
}

export function formatCurrencyAmount(amount: number, currency: CurrencyCode): string {
  if (currency === 'XOF') {
    const formatted = Math.round(amount)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return `${formatted} FCFA`;
  }
  if (currency === 'EUR') {
    const formatted = Math.round(amount)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return `${formatted} €`;
  }
  // USD
  const formatted = Math.round(amount)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return `$${formatted}`;
}

export function calculateBriefPricing(
  selectedPoles: PoleId[],
  selectedModifiers: TransverseModifierId[],
  urgency: UrgencyTier,
  currency: CurrencyCode
): PricingCalculationResult {
  const activePoles: PoleId[] = selectedPoles.length > 0 ? selectedPoles : ['WEB'];

  let baseMinXof = 0;
  let baseMaxXof = 0;
  let maxPoleMinDays = 0;
  let maxPoleMaxDays = 0;

  for (const poleId of activePoles) {
    const spec = POLE_PRICING_CATALOG[poleId];
    if (spec) {
      baseMinXof += spec.minXof;
      baseMaxXof += spec.maxXof;
      maxPoleMinDays = Math.max(maxPoleMinDays, spec.minDays);
      maxPoleMaxDays = Math.max(maxPoleMaxDays, spec.maxDays);
    }
  }

  // Parallel guild execution adds slight coordination overhead for multi-pole
  const extraPolesCount = Math.max(0, activePoles.length - 1);
  let estimatedMinDays = maxPoleMinDays + extraPolesCount * 4;
  let estimatedMaxDays = maxPoleMaxDays + extraPolesCount * 6;

  // 1. Multi-Pole Discount (-10% if >= 2 poles selected)
  const multiPoleDiscountApplied = activePoles.length >= 2;
  const discountFactor = multiPoleDiscountApplied ? 1 - MODIFIER_RATES.MULTI_POLE_DISCOUNT : 1;
  const discountedMinXof = baseMinXof * discountFactor;
  const discountedMaxXof = baseMaxXof * discountFactor;

  const discountAmountMinXof = baseMinXof - discountedMinXof;
  const discountAmountMaxXof = baseMaxXof - discountedMaxXof;

  // 2. Transverse Modifiers & Fast-Track (+20% DA, +25% AI, +15% Fast-Track 48h)
  let additiveBonus = 0;
  if (selectedModifiers.includes('TRANSVERSE_DA')) {
    additiveBonus += MODIFIER_RATES.TRANSVERSE_DA;
  }
  if (selectedModifiers.includes('TRANSVERSE_AI')) {
    additiveBonus += MODIFIER_RATES.TRANSVERSE_AI;
  }
  if (urgency === 'FAST_TRACK_48H') {
    additiveBonus += MODIFIER_RATES.FAST_TRACK_48H;
    estimatedMinDays = Math.max(5, Math.round(estimatedMinDays * 0.75));
    estimatedMaxDays = Math.max(8, Math.round(estimatedMaxDays * 0.75));
  }

  const modifierMultiplier = 1 + additiveBonus;

  const totalMinXof = Math.round(discountedMinXof * modifierMultiplier);
  const totalMaxXof = Math.round(discountedMaxXof * modifierMultiplier);

  const totalMinConverted = convertFromXof(totalMinXof, currency);
  const totalMaxConverted = convertFromXof(totalMaxXof, currency);

  return {
    baseMinXof,
    baseMaxXof,
    multiPoleDiscountApplied,
    discountAmountMinXof,
    discountAmountMaxXof,
    modifierMultiplier,
    totalMinXof,
    totalMaxXof,
    totalMinConverted,
    totalMaxConverted,
    schedule: {
      signature40Min: Math.round(totalMinConverted * 0.4),
      signature40Max: Math.round(totalMaxConverted * 0.4),
      architecture30Min: Math.round(totalMinConverted * 0.3),
      architecture30Max: Math.round(totalMaxConverted * 0.3),
      delivery30Min: Math.round(totalMinConverted * 0.3),
      delivery30Max: Math.round(totalMaxConverted * 0.3),
    },
    estimatedMinDays,
    estimatedMaxDays,
  };
}

/* ------------------------------------------------------------------ */
/* Locale-aware money formatting (Intl, no repeated currency in ranges) */
/* ------------------------------------------------------------------ */

export type DisplayLang = 'fr' | 'en';

const localeOf = (lang: DisplayLang) => (lang === 'fr' ? 'fr-FR' : 'en-US');

const symbolOf = (currency: CurrencyCode) =>
  currency === 'EUR' ? '€' : currency === 'USD' ? '$' : 'FCFA';

export const CURRENCY_LABELS: Record<CurrencyCode, string> = {
  XOF: 'FCFA',
  EUR: 'EUR',
  USD: 'USD',
};

/** Single amount, e.g. "950 000 FCFA", "1 448 €", "$1,567". */
export function formatMoney(amountXof: number, currency: CurrencyCode, lang: DisplayLang): string {
  const value = convertFromXof(amountXof, currency);
  const n = new Intl.NumberFormat(localeOf(lang), { maximumFractionDigits: 0 }).format(value);
  if (currency === 'XOF') return `${n}\u00A0FCFA`;
  return lang === 'fr' ? `${n}\u00A0${symbolOf(currency)}` : `${symbolOf(currency)}${n}`;
}

export interface MoneyRangeParts {
  low: string;
  high: string;
  unit: string;
}

/**
 * Range split into wrap-safe parts. Large FCFA amounts are expressed in millions
 * ("1,35 – 4,05 millions FCFA") so the figure stays readable at display size.
 */
export function moneyRangeParts(
  minXof: number,
  maxXof: number,
  currency: CurrencyCode,
  lang: DisplayLang
): MoneyRangeParts {
  const locale = localeOf(lang);

  if (currency === 'XOF' && maxXof >= 1_000_000) {
    const f = new Intl.NumberFormat(locale, { maximumFractionDigits: 2 });
    return {
      low: f.format(minXof / 1_000_000),
      high: f.format(maxXof / 1_000_000),
      unit: lang === 'fr' ? 'millions FCFA' : 'million FCFA',
    };
  }

  const f = new Intl.NumberFormat(locale, { maximumFractionDigits: 0 });
  const low = f.format(convertFromXof(minXof, currency));
  const high = f.format(convertFromXof(maxXof, currency));

  if (currency === 'XOF') return { low, high, unit: 'FCFA' };
  if (lang === 'fr') return { low, high, unit: symbolOf(currency) };
  return { low: `${symbolOf(currency)}${low}`, high: `${symbolOf(currency)}${high}`, unit: '' };
}

export function formatMoneyRange(
  minXof: number,
  maxXof: number,
  currency: CurrencyCode,
  lang: DisplayLang
): string {
  const p = moneyRangeParts(minXof, maxXof, currency, lang);
  return `${p.low} – ${p.high}${p.unit ? `\u00A0${p.unit}` : ''}`;
}
