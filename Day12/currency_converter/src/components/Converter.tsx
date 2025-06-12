import React, { useState, useEffect, useCallback } from 'react';
import { ArrowUpDown, RefreshCw, TrendingUp, AlertCircle } from 'lucide-react';
import "./styles.css";

interface Currency {
  code: string;
  name: string;
  symbol: string;
}

interface ExchangeRatesResponse {
  success: boolean;
  timestamp: number;
  base: string;
  date: string;
  rates: Record<string, number>;
}

interface ConversionResult {
  amount: number;
  from: string;
  to: string;
  result: number;
  rate: number;
  timestamp: number;
}

// Popular currencies with symbols
const CURRENCIES: Currency[] = [
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'Fr' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
  { code: 'NPR', name: 'Nepalese Rupee', symbol: 'रु' },
  { code: 'KRW', name: 'South Korean Won', symbol: '₩' },
  { code: 'BRL', name: 'Brazilian Real', symbol: 'R$' },
  { code: 'MXN', name: 'Mexican Peso', symbol: '$' },
  { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$' },
  { code: 'HKD', name: 'Hong Kong Dollar', symbol: 'HK$' },
  { code: 'NOK', name: 'Norwegian Krone', symbol: 'kr' },
  { code: 'SEK', name: 'Swedish Krona', symbol: 'kr' },
  { code: 'DKK', name: 'Danish Krone', symbol: 'kr' },
  { code: 'PLN', name: 'Polish Zloty', symbol: 'zł' },
  { code: 'CZK', name: 'Czech Koruna', symbol: 'Kč' },
  { code: 'HUF', name: 'Hungarian Forint', symbol: 'Ft' },
];

// API Service
class ExchangeRateService {
  private static readonly BASE_URL = 'https://api.exchangerate-api.com/v4/latest';
//   private static readonly FIXER_URL = 'https://api.fixer.io/latest';
  
  static async fetchRates(baseCurrency: string = 'USD'): Promise<ExchangeRatesResponse> {
    try {
      // Try primary API
      const response = await fetch(`${this.BASE_URL}/${baseCurrency}`);
      if (!response.ok) throw new Error('Primary API failed');
      
      const data = await response.json();
      return {
        success: true,
        timestamp: Date.now(),
        base: data.base,
        date: data.date,
        rates: data.rates
      };
    } catch (error) {
      // Fallback to mock data for demo purposes
      console.warn('API failed, using fallback data:', error);
      return this.getFallbackRates(baseCurrency);
    }
  }
  
  private static getFallbackRates(base: string): ExchangeRatesResponse {
    const mockRates: Record<string, number> = {
      USD: 1.0,
      EUR: 0.85,
      GBP: 0.73,
      JPY: 110.25,
      AUD: 1.35,
      CAD: 1.25,
      CHF: 0.92,
      CNY: 6.45,
      INR: 74.50,
      NPR: 119.20,
      KRW: 1180.00,
      BRL: 5.20,
      MXN: 20.15,
      SGD: 1.35,
      HKD: 7.80,
      NOK: 8.50,
      SEK: 8.75,
      DKK: 6.35,
      PLN: 3.85,
      CZK: 21.50,
      HUF: 295.00,
    };
    
    // Adjust rates based on base currency
    const baseRate = mockRates[base] || 1;
    const adjustedRates: Record<string, number> = {};
    
    Object.entries(mockRates).forEach(([currency, rate]) => {
      adjustedRates[currency] = rate / baseRate;
    });
    
    return {
      success: true,
      timestamp: Date.now(),
      base,
      date: new Date().toISOString().split('T')[0],
      rates: adjustedRates
    };
  }
}

// Components
const CurrencySelector: React.FC<{
  label: string;
  value: string;
  onChange: (value: string) => void;
  currencies: Currency[];
}> = ({ label, value, onChange, currencies }) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <select 
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white shadow-sm"
    >
      {currencies.map(currency => (
        <option key={currency.code} value={currency.code}>
          {currency.code} - {currency.name}
        </option>
      ))}
    </select>
  </div>
);

const AmountInput: React.FC<{
  value: string;
  onChange: (value: string) => void;
  currency: Currency;
}> = ({ value, onChange, currency }) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-700">Amount</label>
    <div className="relative">
      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
        {currency.symbol}
      </span>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none shadow-sm"
        placeholder="0.00"
        min="0"
        step="0.01"
      />
    </div>
  </div>
);

const ConversionDisplay: React.FC<{
  result: ConversionResult | null;
  loading: boolean;
  error: string | null;
}> = ({ result, loading, error }) => {
  if (loading) {
    return (
      <div className="bg-gray-50 p-6 rounded-lg flex items-center justify-center">
        <RefreshCw className="w-6 h-6 animate-spin text-blue-500 mr-2" />
        <span className="text-gray-600">Converting...</span>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-red-50 p-6 rounded-lg flex items-center">
        <AlertCircle className="w-6 h-6 text-red-500 mr-2" />
        <span className="text-red-700">{error}</span>
      </div>
    );
  }
  
  if (!result) {
    return (
      <div className="bg-gray-50 p-6 rounded-lg text-center text-gray-500">
        Enter an amount to see conversion
      </div>
    );
  }
  
  const fromCurrency = CURRENCIES.find(c => c.code === result.from);
  const toCurrency = CURRENCIES.find(c => c.code === result.to);
  
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
      <div className="text-center space-y-3">
        <div className="text-3xl font-bold text-gray-900">
          {toCurrency?.symbol}{result.result.toLocaleString(undefined, { 
            minimumFractionDigits: 2, 
            maximumFractionDigits: 2 
          })}
        </div>
        <div className="text-sm text-gray-600">
          {fromCurrency?.symbol}{result.amount.toLocaleString(undefined, { 
            minimumFractionDigits: 2, 
            maximumFractionDigits: 2 
          })} {result.from} equals
        </div>
        <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
          <TrendingUp className="w-4 h-4" />
          <span>
            1 {result.from} = {result.rate.toLocaleString(undefined, {
              minimumFractionDigits: 4,
              maximumFractionDigits: 4
            })} {result.to}
          </span>
        </div>
        <div className="text-xs text-gray-400">
          Last updated: {new Date(result.timestamp).toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};

// Main Component
const CurrencyConverter: React.FC = () => {
  const [amount, setAmount] = useState<string>('100');
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('EUR');
  const [exchangeRates, setExchangeRates] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<number>(0);
  const [result, setResult] = useState<ConversionResult | null>(null);

  const fetchExchangeRates = useCallback(async (base: string = 'USD') => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await ExchangeRateService.fetchRates(base);
      setExchangeRates(data.rates);
      setLastUpdated(data.timestamp);
    } catch (err) {
      setError('Failed to fetch exchange rates. Please try again.');
      console.error('Exchange rate fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const calculateConversion = useCallback(() => {
    const numAmount = parseFloat(amount);
    
    if (!numAmount || numAmount <= 0 || !exchangeRates[fromCurrency] || !exchangeRates[toCurrency]) {
      setResult(null);
      return;
    }

    const fromRate = exchangeRates[fromCurrency];
    const toRate = exchangeRates[toCurrency];
    const rate = toRate / fromRate;
    const convertedAmount = numAmount * rate;

    setResult({
      amount: numAmount,
      from: fromCurrency,
      to: toCurrency,
      result: convertedAmount,
      rate,
      timestamp: Date.now()
    });
  }, [amount, fromCurrency, toCurrency, exchangeRates]);

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const refreshRates = () => {
    fetchExchangeRates('USD');
  };

  // Initial load
  useEffect(() => {
    fetchExchangeRates('USD');
  }, [fetchExchangeRates]);

  // Calculate conversion when inputs change
  useEffect(() => {
    calculateConversion();
  }, [calculateConversion]);

  // Auto-refresh every 5 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      fetchExchangeRates('USD');
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [fetchExchangeRates]);

  const fromCurrencyObj = CURRENCIES.find(c => c.code === fromCurrency) || CURRENCIES[0];
//   const toCurrencyObj = CURRENCIES.find(c => c.code === toCurrency) || CURRENCIES[1];

  return (
    <div className="converter-container">
      {/* Header */}
      <div className="converter-header">
        <h1 className="converter-title">Currency Converter</h1>
        <p className="converter-subtitle">Real-time exchange rates for global currencies</p>
        {lastUpdated > 0 && (
          <p className="last-updated">
            Last updated: {new Date(lastUpdated).toLocaleString()}
          </p>
        )}
      </div>
  
      {/* Main Converter Box */}
      <div className="converter-box">
        <div className="converter-grid">
          {/* Input Section (From) */}
          <div className="input-section">
            <CurrencySelector
              label="From"
              value={fromCurrency}
              onChange={setFromCurrency}
              currencies={CURRENCIES}
            />
            <AmountInput
              value={amount}
              onChange={setAmount}
              currency={fromCurrencyObj}
            />
          </div>
  
          {/* Output Section (To + Controls) */}
          <div className="output-section">
            <div className="controls">
              <CurrencySelector
                label="To"
                value={toCurrency}
                onChange={setToCurrency}
                currencies={CURRENCIES}
              />
              <div className="control-buttons">
                <button
                  onClick={swapCurrencies}
                  className="swap-button"
                  title="Swap currencies"
                >
                  <ArrowUpDown className="swap-icon" />
                </button>
                <button
                  onClick={refreshRates}
                  disabled={loading}
                  className="refresh-button"
                  title="Refresh rates"
                >
                  <RefreshCw className={`refresh-icon ${loading ? 'animate-spin' : ''}`} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      {/* Conversion Result */}
      <ConversionDisplay result={result} loading={loading} error={error} />
  
      {/* Popular Currencies Quick View */}
      {Object.keys(exchangeRates).length > 0 && (
        <div className="popular-rates-box">
          <h3 className="popular-rates-title">Popular Exchange Rates (1 USD)</h3>
          <div className="popular-rates-grid">
            {['EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF'].map(code => {
              const currency = CURRENCIES.find(c => c.code === code);
              const rate = exchangeRates[code];
              return (
                <div key={code} className="popular-rate-card">
                  <div className="popular-rate-code">{code}</div>
                  <div className="popular-rate-value">
                    {currency?.symbol}{rate?.toFixed(4) || 'N/A'}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
  
  
};

export default CurrencyConverter;