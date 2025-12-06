
import React, { useState } from 'react';
import { PackageType, SpiderPackage } from './types';
import { PricingCard } from './components/PricingCard';
import { NetworkBackground } from './components/NetworkBackground';
import { Globe, Shield, Users, BarChart3, ChevronDown, CheckCircle2, MessageCircle, XCircle } from 'lucide-react';
import { useLanguage } from './contexts/LanguageContext';
import { LANGUAGES } from './translations';
import { CustomerService } from './components/CustomerService';
import { ScrollToTop } from './components/ScrollToTop';

const PACKAGES: SpiderPackage[] = [
  {
    id: PackageType.BASIC,
    nameKey: "pkg_basic_name",
    price: 3000,
    spidersPerDayKey: "50,000 – 100,000+",
    recommendedForKey: "pkg_basic_rec",
    featuresKeys: [
      "pkg_basic_feat_1",
      "pkg_basic_feat_2",
      "pkg_basic_feat_3",
      "pkg_basic_feat_4",
      "pkg_basic_feat_5"
    ]
  },
  {
    id: PackageType.HIGH_VOLUME,
    nameKey: "pkg_high_name",
    price: 18000,
    spidersPerDayKey: "1,000,000+",
    recommendedForKey: "pkg_high_rec",
    featuresKeys: [
      "pkg_high_feat_1",
      "pkg_high_feat_2",
      "pkg_high_feat_3",
      "pkg_high_feat_4",
      "pkg_high_feat_5",
      "pkg_high_feat_6"
    ]
  }
];

const allEngines = [
  { name: 'Bing', available: true },
  { name: 'Google', available: true },
  { name: 'Sogou', available: true },
  { name: '360', available: true },
  { name: 'Baidu', available: true },
];

function App() {
  const { language, setLanguage, t, joinLink } = useLanguage();
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  const scrollToPricing = () => {
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToflowCTA = () => {
    document.getElementById('flow_cta')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Filter engines based on language
  // If simplified chinese (zh-CN), show all. Otherwise, show only Google and Bing.
  const engines = language === 'zh-CN' 
    ? allEngines 
    : allEngines.filter(e => e.name === 'Google' || e.name === 'Bing');

  return (
    <div className="min-h-screen bg-spider-dark text-white selection:bg-spider-green selection:text-black pb-20 overflow-x-hidden">
      
      {/* Hero Section */}
      <header className="relative pt-24 pb-16 sm:pt-32 sm:pb-24 px-4 sm:px-6 lg:px-8 border-b border-white/5 z-50">
        
        {/* Language Switcher - Top Right */}
        <div className="absolute top-4 right-4 z-50">
          <div className="relative">
            <button 
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              className="flex items-center gap-2 bg-black/50 hover:bg-black/80 text-white px-3 py-2 rounded-full border border-white/10 transition-all backdrop-blur-md"
            >
              <Globe size={16} className="text-spider-green" />
              <span className="text-xs font-medium">{LANGUAGES.find(l => l.code === language)?.flag} {LANGUAGES.find(l => l.code === language)?.label}</span>
              <ChevronDown size={12} className={`transition-transform ${isLangMenuOpen ? 'rotate-180' : ''}`}/>
            </button>
            
            {isLangMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 z-50">
                <div className="max-h-80 overflow-y-auto">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setIsLangMenuOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 text-sm flex items-center gap-3 hover:bg-zinc-800 transition-colors ${language === lang.code ? 'text-spider-green bg-spider-green/10' : 'text-gray-300'}`}
                    >
                      <span className="text-lg shrink-0">{lang.flag}</span>
                      <span className="truncate">{lang.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Background Layers - Order Matters for Visibility */}
        {/* 1. Base Gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-900/20 via-spider-dark to-spider-dark z-0 pointer-events-none"></div>
        {/* 2. Animated Network (On top of gradient, behind content) */}
        <NetworkBackground />
        
        {/* Main Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-spider-green/10 border border-spider-green/20 text-spider-green text-xs font-bold uppercase tracking-wider mb-6">
            <span className="w-2 h-2 rounded-full bg-spider-green animate-pulse"></span>
            {t('hero_badge')}
          </div>
          <h1 className="flex flex-col gap-2 sm:gap-4 text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-br from-white to-gray-500">
            <span>{t('hero_title_1')}</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 mx-1 sm:mx-3 py-1">
              {t('hero_title_2')}
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed px-2">
            {t('hero_desc')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto px-4 sm:px-0">
            <button 
              onClick={scrollToPricing}
              className="w-full sm:w-auto px-8 py-4 bg-spider-green text-black font-bold rounded-xl text-lg hover:bg-emerald-400 transition-all shadow-[0_0_20px_rgba(0,255,157,0.3)]"
            >
              {t('btn_packages')}
            </button>
            <button onClick={scrollToflowCTA} className="w-full sm:w-auto px-8 py-4 bg-zinc-800 text-white font-bold rounded-xl text-lg border border-zinc-700 hover:bg-zinc-700 transition-all flex items-center justify-center gap-2 group">
              {t('btn_flow')} <ChevronDown size={20} className="group-hover:translate-y-1 transition-transform"/>
            </button>

          </div>
        </div>
      </header>

      <main role="main">
        {/* Engine Status Bar - Refined */}
        <div className="border-y border-white/5 bg-zinc-900/60 backdrop-blur-lg relative z-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
              
              {/* Status Label */}
              <div className="flex items-center gap-4 px-6 py-3 rounded-full bg-black/40 border border-white/5 backdrop-blur-sm shadow-sm shrink-0">
                <div className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-spider-green opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-spider-green"></span>
                </div>
                <span className="text-sm font-bold text-gray-200 uppercase tracking-[0.2em]">
                  {t('engine_status')}
                </span>
              </div>

              {/* Engine Cards */}
              <div className="flex flex-wrap justify-center lg:justify-end gap-3 sm:gap-4 w-full lg:w-auto flex-1">
                {engines.map((e) => (
                  <div 
                    key={e.name} 
                    className={`
                      relative group flex items-center gap-3 sm:gap-4 px-3 py-2 sm:px-5 sm:py-3 rounded-xl border transition-all duration-300 select-none
                      ${e.available 
                        ? 'bg-gradient-to-br from-spider-green/10 to-transparent border-spider-green/30 hover:border-spider-green/60 hover:shadow-[0_0_15px_rgba(0,255,157,0.15)] hover:-translate-y-1' 
                        : 'bg-zinc-900/50 border-white/5 hover:border-red-500/30 hover:bg-red-500/5'}
                    `}
                  >
                    {/* Icon Box */}
                    <div className={`
                      flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full shrink-0 border
                      ${e.available 
                        ? 'bg-spider-green/20 border-spider-green/30 text-spider-green group-hover:bg-spider-green group-hover:text-black transition-colors' 
                        : 'bg-zinc-800/50 border-white/10 text-gray-500 group-hover:text-red-400 group-hover:border-red-500/30'}
                    `}>
                      {e.available 
                        ? <CheckCircle2 size={18} className="sm:w-5 sm:h-5" strokeWidth={2.5} /> 
                        : <XCircle size={18} className="sm:w-5 sm:h-5" strokeWidth={2.5} />
                      }
                    </div>

                    <div className="flex flex-col whitespace-nowrap">
                      <span className={`text-base sm:text-lg font-black tracking-tight leading-none ${e.available ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'}`}>
                        {e.name}
                      </span>
                      <span className={`text-[9px] sm:text-[10px] font-bold uppercase tracking-wider mt-0.5 sm:mt-1 ${e.available ? 'text-spider-green' : 'text-red-400/80'}`}>
                        {e.available ? t('engine_support_rent') : t('engine_exclusive')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              
            </div>
          </div>
        </div>

        {/* Flow & CTA */}
        <section className="py-16 sm:py-20 px-4 text-center" id="flow_cta">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-8">{t('flow_title')}</h2>
            <div className="flex flex-row justify-between items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-400 mb-12 relative px-2">
              <div className="z-10 bg-spider-dark px-1 sm:px-2 whitespace-nowrap">{t('flow_1')}</div>
              <div className="h-px bg-zinc-800 flex-1 min-w-[10px]"></div>
              <div className="z-10 bg-spider-dark px-1 sm:px-2 whitespace-nowrap">{t('flow_2')}</div>
              <div className="h-px bg-zinc-800 flex-1 min-w-[10px]"></div>
              <div className="z-10 bg-spider-dark px-1 sm:px-2 whitespace-nowrap">{t('flow_3')}</div>
              <div className="h-px bg-zinc-800 flex-1 min-w-[10px]"></div>
              <div className="z-10 bg-spider-dark px-1 sm:px-2 whitespace-nowrap">{t('flow_4')}</div>
            </div>

            <div className="bg-gradient-to-b from-zinc-800 to-zinc-900 border border-zinc-700 p-6 sm:p-8 rounded-2xl shadow-xl">
              <h3 className="text-xl font-bold text-white mb-2">{t('cta_title')}</h3>
              <p className="text-gray-400 mb-6 text-sm sm:text-base">{t('cta_desc')}</p>
              
              <div className="bg-black/50 p-4 rounded-lg font-mono text-spider-green mb-6 border border-white/10 select-all text-xs sm:text-sm break-all">
                {t('cta_format')}
              </div>
              
              <p className="text-sm text-gray-500 mb-8">{t('cta_example')}</p>
              
              <a 
                href={joinLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 sm:px-10 py-4 bg-gradient-to-r from-spider-green to-emerald-600 text-black font-black text-base sm:text-lg rounded-full shadow-[0_0_25px_rgba(0,255,157,0.3)] hover:scale-105 hover:shadow-[0_0_40px_rgba(0,255,157,0.5)] transition-all duration-300 animate-pulse-slow w-full sm:w-auto"
              >
                <MessageCircle size={22} fill="currentColor" className="opacity-80"/>
                {t('btn_join')}
              </a>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="pb-12 pt-5 px-4 mt-5">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">{t('pricing_title')}</h2>
              <p className="text-gray-400 text-sm sm:text-base">{t('pricing_desc')}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
              {PACKAGES.map((pkg) => (
                <PricingCard key={pkg.id} pkg={pkg} isPopular={pkg.id === PackageType.BASIC} />
              ))}
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-16 px-4 bg-zinc-900/20">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-12">{t('feat_title')}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <FeatureItem 
                icon={<Globe className="text-blue-400" />} 
                title={t('feat_1_title')}
                desc={t('feat_1_desc')}
                tooltip={t('feat_1_tip')}
              />
              <FeatureItem 
                icon={<BarChart3 className="text-purple-400" />} 
                title={t('feat_2_title')}
                desc={t('feat_2_desc')}
                tooltip={t('feat_2_tip')}
              />
              <FeatureItem 
                icon={<Shield className="text-spider-green" />} 
                title={t('feat_3_title')}
                desc={t('feat_3_desc')}
                tooltip={t('feat_3_tip')}
              />
              <FeatureItem 
                icon={<Users className="text-yellow-400" />} 
                title={t('feat_4_title')}
                desc={t('feat_4_desc')}
                tooltip={t('feat_4_tip')}
              />
            </div>
          </div>
        </section>

        {/* Co-Rent Rules */}
        <section className="py-16 px-4">
          <div className="max-w-3xl mx-auto bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 sm:p-10">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <Users className="text-spider-green" /> {t('rules_title')}
            </h2>
            <div className="space-y-6">
              <RuleItem number="01" text={t('rule_1')} />
              <RuleItem number="02" text={t('rule_2')} />
              <RuleItem number="03" text={t('rule_3')} />
              <RuleItem number="04" text={t('rule_4')} />
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 text-center text-gray-600 text-sm border-t border-white/5 px-4">
        <p>{t('footer_rights')}</p>
        <p className="mt-2">{t('footer_tag')}</p>
      </footer>
      
      <CustomerService />
      <ScrollToTop />
    </div>
  );
}

const FeatureItem = ({ icon, title, desc, tooltip }: { icon: React.ReactNode, title: string, desc: string, tooltip: string }) => {
  const { t } = useLanguage();
  return (
    <div className="group relative bg-black/20 p-6 rounded-xl border border-white/5 hover:border-spider-green/30 transition-all duration-300 hover:bg-black/40 lg:hover:-translate-y-2 lg:hover:scale-105 hover:shadow-xl hover:shadow-spider-green/5">
      <div className="mb-4 transition-transform duration-300 lg:group-hover:scale-110">{icon}</div>
      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-spider-green transition-colors">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
      
      {/* Tooltip - Hidden on mobile/touch, visible on hover on desktop */}
      <div className="hidden lg:block absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-56 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none translate-y-2 group-hover:translate-y-0 z-20">
        <div className="bg-zinc-800 text-white text-xs p-3 rounded-lg border border-spider-green/30 shadow-xl shadow-black/50 text-center relative">
          <div className="font-semibold text-spider-green mb-1 flex items-center justify-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-spider-green animate-pulse"></span>
            {t('tip_label')}
          </div>
          {tooltip}
          {/* Arrow */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px] border-4 border-transparent border-t-zinc-800"></div>
        </div>
      </div>
    </div>
  );
}

const RuleItem = ({ number, text }: { number: string, text: string }) => (
  <div className="flex items-start gap-4">
    <span className="font-mono text-spider-green font-bold text-lg opacity-80 shrink-0">{number}</span>
    <p className="text-gray-300 leading-relaxed text-sm sm:text-base">{text}</p>
  </div>
);

export default App;
