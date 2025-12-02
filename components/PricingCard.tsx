import React from 'react';
import { Check, Users } from 'lucide-react';
import { SpiderPackage } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { LINKS } from '../translations';

interface PricingCardProps {
  pkg: SpiderPackage;
  isPopular?: boolean;
}

export const PricingCard: React.FC<PricingCardProps> = ({ pkg, isPopular }) => {
  const { t, language } = useLanguage();
  
  const isCN = language === 'zh-CN';
  const currencySymbol = isCN ? '￥' : '$';
  
  // Logic: Use WhatsApp for all languages except Simplified Chinese (zh-CN)
  const joinUrl = isCN ? LINKS.QQ : LINKS.WHATSAPP;
  
  // Define pricing mapping
  // Basic: 3000 CNY -> ~420 USD
  // High: 18000 CNY -> ~2500 USD
  const price = isCN ? pkg.price : (pkg.price === 3000 ? 420 : 2500);
  
  // Calculate lowest price per person based on max group size (5 people)
  const minPricePerPerson = Math.round(price / 5);

  const scrollToPricing = () => {
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={`relative flex flex-col p-5 sm:p-6 lg:p-8 rounded-2xl border transition-all duration-300 lg:hover:scale-105 lg:hover:shadow-[0_0_25px_rgba(0,255,157,0.2)] ${isPopular ? 'border-spider-green bg-spider-green/5' : 'border-zinc-800 bg-zinc-900/50 lg:hover:border-spider-green/50'}`}>
      {isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-spider-green text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg shadow-spider-green/20">
          {t('pricing_popular')}
        </div>
      )}
      
      <div className="mb-4">
        <h3 className="text-xl font-bold text-white mb-1">{t(pkg.nameKey)}</h3>
        <p className="text-gray-400 text-sm">{t(pkg.recommendedForKey)}</p>
      </div>

      {/* Pricing Section */}
      <div className="mb-6">
        <div className="flex flex-col gap-2">
          {/* Highlighted Per Person Price */}
          <div className="flex flex-wrap items-baseline gap-2">
            <span className="text-xs font-bold text-spider-green border border-spider-green/30 bg-spider-green/10 px-2 py-0.5 rounded whitespace-nowrap">
              {t('pricing_rent_low')}
            </span>
            <span className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              {currencySymbol}{minPricePerPerson.toLocaleString()}
            </span>
            <span className="text-gray-400 text-xs">
               {isCN ? '' : 'USDT'} {t('pricing_per_person')}
            </span>
          </div>
          
          {/* Full Package Price Context */}
          <div className="flex items-center gap-2 mt-1 px-2 py-1.5 bg-black/40 rounded border border-white/5 w-fit">
            <Users size={14} className="text-gray-400 shrink-0" />
            <p className="text-xs text-gray-500">
              {t('pricing_total')} <span className="text-gray-300 font-medium">{currencySymbol}{price.toLocaleString()}</span> {t('pricing_split_info')}
            </p>
          </div>
        </div>
      </div>

      <div className="mb-6 p-3 bg-black/40 rounded-lg border border-zinc-800">
        <div className="text-xs text-gray-400 mb-1 uppercase tracking-wide">{t('pricing_spiders_daily')}</div>
        <div className="text-base sm:text-lg font-mono text-white font-semibold flex items-center gap-2">
          🚀 {pkg.spidersPerDayKey === '50,000 – 100,000+' || pkg.spidersPerDayKey === '1,000,000+' ? pkg.spidersPerDayKey : t(pkg.spidersPerDayKey as any)}
        </div>
      </div>

      <div className="flex-1 space-y-3 mb-8">
        {pkg.featuresKeys.map((featureKey, idx) => (
          <div key={idx} className="flex items-start gap-3">
            <Check size={18} className="text-spider-green shrink-0 mt-0.5" />
            <span className="text-gray-300 text-sm">{t(featureKey)}</span>
          </div>
        ))}
      </div>

      <div className="space-y-3 mt-auto">
        <a 
          href={joinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`block w-full py-3 sm:py-4 rounded-xl font-bold text-center transition-all active:scale-95 ${
            isPopular 
              ? 'bg-spider-green text-black hover:bg-emerald-400 shadow-lg shadow-spider-green/20' 
              : 'bg-white text-black hover:bg-gray-200'
          }`}
        >
          {t('btn_pricing_join')}
        </a>

        <button
          onClick={scrollToPricing}
          className="block w-full py-2 rounded-xl text-xs sm:text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-all border border-transparent hover:border-white/10"
        >
          {t('pricing_rent_low')} <span className={isPopular ? "text-spider-green" : "text-white"}>{currencySymbol}{minPricePerPerson}</span> {t('pricing_per_person')}
        </button>
      </div>
    </div>
  );
};
