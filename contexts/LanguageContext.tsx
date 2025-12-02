
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Language, translations, LINKS } from '../translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof translations['zh-CN']) => string;
  joinLink: string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('zh-CN');

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
