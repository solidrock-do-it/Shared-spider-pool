import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Language, translations, LINKS, LANGUAGES } from '../translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof translations['zh-CN']) => string;
  joinLink: string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const COOKIE_NAME = 'app_lang';

// Helper to get cookie
const getCookie = (name: string): string | null => {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  if (match) return match[2];
  return null;
};

// Helper to set cookie
const setCookie = (name: string, value: string, days: number) => {
  const d = new Date();
  d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = "expires=" + d.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
};

// Helper to detect browser language
const getBrowserLanguage = (): Language => {
  if (typeof window === 'undefined') return 'zh-CN';
  
  const browserLang = navigator.language || (navigator.languages && navigator.languages[0]);
  if (!browserLang) return 'zh-CN';

  const lowerLang = browserLang.toLowerCase();

  // Specific Chinese handling
  if (lowerLang.startsWith('zh')) {
    // zh-cn, zh-sg -> Simplified
    if (lowerLang.includes('cn') || lowerLang.includes('sg')) return 'zh-CN';
    // zh-tw, zh-hk, zh-mo -> Traditional
    return 'zh-TW';
  }

  // Specific Portuguese handling
  if (lowerLang.startsWith('pt')) {
    if (lowerLang.includes('br')) return 'pt-BR';
    return 'pt-PT';
  }

  // Try to match the exact code or the prefix
  // First, check if the full code exists in our supported list (case insensitive check for safety)
  const supportedCode = LANGUAGES.find(l => l.code.toLowerCase() === lowerLang);
  if (supportedCode) return supportedCode.code;

  // Then check the language prefix (e.g., 'en' from 'en-US')
  const prefix = lowerLang.split('-')[0];
  const supportedPrefix = LANGUAGES.find(l => l.code === prefix);
  if (supportedPrefix) return supportedPrefix.code;

  return 'zh-CN';
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    // 1. Check Cookie
    const cookieLang = getCookie(COOKIE_NAME);
    const isValidCookie = LANGUAGES.some(l => l.code === cookieLang);
    if (cookieLang && isValidCookie) {
      return cookieLang as Language;
    }
    
    // 2. Check Browser
    return getBrowserLanguage();
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    setCookie(COOKIE_NAME, lang, 365); // Save for 1 year
  };

  const t = (key: keyof typeof translations['zh-CN']) => {
    return translations[language][key] || translations['zh-CN'][key];
  };

  const joinLink = language === 'zh-CN' ? LINKS.QQ : LINKS.WHATSAPP;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, joinLink }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};