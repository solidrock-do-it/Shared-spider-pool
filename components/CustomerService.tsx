
import React from 'react';
import { Headset } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const CustomerService: React.FC = () => {
  const { t, joinLink } = useLanguage();

  return (
    <a
      href={joinLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-spider-green text-black rounded-full shadow-[0_0_20px_rgba(0,255,157,0.4)] hover:scale-110 hover:shadow-[0_0_30px_rgba(0,255,157,0.6)] transition-all duration-300 group"
      aria-label={t('online_service')}
    >
      <Headset size={28} strokeWidth={2.5} />
      {/* Tooltip */}
      <span className="absolute right-full mr-4 px-3 py-1.5 bg-zinc-800 text-white text-xs font-bold rounded-lg border border-spider-green/30 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        {t('online_service')}
      </span>
      
      {/* Ping animation ring */}
      <span className="absolute inset-0 rounded-full border border-spider-green animate-[ping_2s_ease-in-out_infinite] opacity-50"></span>
    </a>
  );
};
