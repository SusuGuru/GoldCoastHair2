import { createContext, useContext, useCallback, useState, useEffect } from 'react';

export interface Currency {
  code: string;
  name: string;
  flag: string;
  symbol: string;
  rate: number;
}

export const CURRENCIES: Record<string, Currency> = {
  USD: { code: 'USD', name: 'US Dollar', flag: '🇺🇸', symbol: '$', rate: 1 },
  GHS: { code: 'GHS', name: 'Ghana Cedi', flag: '🇬🇭', symbol: 'GH₵', rate: 12.05 },
  GBP: { code: 'GBP', name: 'British Pound', flag: '🇬🇧', symbol: '£', rate: 0.79 },
  EUR: { code: 'EUR', name: 'Euro', flag: '🇪🇺', symbol: '€', rate: 0.92 },
  NGN: { code: 'NGN', name: 'Nigerian Naira', flag: '🇳🇬', symbol: '₦', rate: 1500 },
};

export const CurrencyContext = createContext<{
  currency: Currency;
  setCurrency: (code: string) => void;
  formatPrice: (price: number) => string;
  isLoading: boolean;
}>({
  currency: CURRENCIES.USD,
  setCurrency: () => {},
  formatPrice: (price: number) => `$${price.toFixed(2)}`,
  isLoading: false,
});

export function useCurrencyContext() {
  return useContext(CurrencyContext);
}

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currencyCode, setCurrencyCode] = useState<string>('USD');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('gch_currency');
    if (saved && CURRENCIES[saved]) {
      setCurrencyCode(saved);
    }
  }, []);

  const currency = CURRENCIES[currencyCode] || CURRENCIES.USD;

  const setCurrency = useCallback((code: string) => {
    if (CURRENCIES[code]) {
      setIsLoading(true);
      setCurrencyCode(code);
      localStorage.setItem('gch_currency', code);
      setTimeout(() => setIsLoading(false), 300);
    }
  }, []);

  const formatPrice = useCallback((price: number) => {
    const converted = price * currency.rate;
    return `${currency.symbol}${converted.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }, [currency]);

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice, isLoading }}>
      {children}
    </CurrencyContext.Provider>
  );
}