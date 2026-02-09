import { createContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { en } from './en';
import { he } from './he';
import type { Language, Translations, TranslationKey } from './types';

interface LanguageContextType {
  language: Language;
  translations: Translations;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: TranslationKey) => string;
  isRTL: boolean;
}

export const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  translations: en,
  setLanguage: () => {},
  toggleLanguage: () => {},
  t: (key: TranslationKey) => key,
  isRTL: false,
});

const translationsMap: Record<Language, Translations> = { en, he };

interface LanguageProviderProps {
  children: ReactNode;
  defaultLanguage?: Language;
}

export function LanguageProvider({ children, defaultLanguage }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>(() => {
    if (defaultLanguage) return defaultLanguage;
    const saved = localStorage.getItem('solari-language');
    return (saved === 'en' || saved === 'he') ? saved : 'en';
  });

  const translations = translationsMap[language];
  const isRTL = language === 'he';

  useEffect(() => {
    localStorage.setItem('solari-language', language);
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = language === 'he' ? 'he' : 'en';
  }, [language, isRTL]);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguageState((prev) => (prev === 'en' ? 'he' : 'en'));
  }, []);

  const t = useCallback(
    (key: TranslationKey): string => {
      return translations[key] || key;
    },
    [translations]
  );

  return (
    <LanguageContext.Provider
      value={{ language, translations, setLanguage, toggleLanguage, t, isRTL }}
    >
      {children}
    </LanguageContext.Provider>
  );
}
