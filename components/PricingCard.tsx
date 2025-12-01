import React from 'react';
import { Check, Info } from 'lucide-react';
import { SpiderPackage } from '../types';

interface PricingCardProps {
  pkg: SpiderPackage;
  isPopular?: boolean;
}

export const PricingCard: React.FC<PricingCardProps> = ({ pkg, isPopular }) => {
  return (
    <div className={`relative flex flex-col p-6 rounded-2xl border transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(0,255,157,0.2)] ${isPopular ? 'border-spider-green bg-spider-green/5' : 'border-zinc-800 bg-zinc-900/50 hover:border-spider-green/50'}`}>
      {isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-spider-green text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          最受欢迎 / Popular
        </div>
      )}
      
      <div className="mb-4">
        <h3 className="text-xl font-bold text-white mb-1">{pkg.name}</h3>
        <p className="text-gray-400 text-sm">{pkg.recommendedFor}</p>
      </div>

      <div className="mb-6 flex items-baseline">
        <span className="text-3xl font-bold text-spider-green">￥{pkg.price.toLocaleString()}</span>
        <span className="text-gray-500 ml-2">/ 月</span>
      </div>

      <div className="mb-6 p-3 bg-black/40 rounded-lg border border-zinc-800">
        <div className="text-xs text-gray-400 mb-1 uppercase tracking-wide">日均蜘蛛量</div>
        <div className="text-lg font-mono text-white font-semibold flex items-center gap-2">
          🚀 {pkg.spidersPerDay}
        </div>
      </div>

      <div className="flex-1 space-y-3 mb-8">
        {pkg.features.map((feature, idx) => (
          <div key={idx} className="flex items-start gap-3">
            <Check size={18} className="text-spider-green shrink-0 mt-0.5" />
            <span className="text-gray-300 text-sm">{feature}</span>
          </div>
        ))}
      </div>

      <a 
        href="https://qm.qq.com/q/9ZlQXDZQ4g"
        target="_blank"
        rel="noopener noreferrer"
        className={`block w-full py-3 rounded-xl font-bold text-center transition-all ${
          isPopular 
            ? 'bg-spider-green text-black hover:bg-emerald-400 shadow-lg shadow-spider-green/20' 
            : 'bg-white text-black hover:bg-gray-200'
        }`}
      >
        加入合租
      </a>
    </div>
  );
};