import React from 'react';
import { PackageType, SpiderPackage } from './types';
import { PricingCard } from './components/PricingCard';
import { Globe, Shield, Users, BarChart3, ChevronDown, CheckCircle2, MessageCircle } from 'lucide-react';

const PACKAGES: SpiderPackage[] = [
  {
    id: PackageType.BASIC,
    name: "基础灌溉套餐",
    price: 3000,
    spidersPerDay: "50,000 – 100,000+",
    recommendedFor: "中小站点 / 快速收录",
    features: [
      "覆盖 Bing / Google / Sogou / 360",
      "域名数量不限",
      "URL 提交数量不限",
      "独立系统后台权限",
      "2-5人小团合租"
    ]
  },
  {
    id: PackageType.HIGH_VOLUME,
    name: "高量站群套餐",
    price: 18000,
    spidersPerDay: "1,000,000+",
    recommendedFor: "大型站群 / 矩阵项目",
    features: [
      "超大规模蜘蛛集群",
      "适合海量内容索引",
      "域名数量不限",
      "URL 提交数量不限",
      "优先节点分配",
      "独立数据隔离"
    ]
  }
];

const engines = [
  { name: 'Bing', available: true },
  { name: 'Google', available: true },
  { name: 'Sogou', available: true },
  { name: '360', available: true },
  { name: 'Baidu', available: false, note: '仅限独享' },
];

function App() {
  const scrollToPricing = () => {
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToflowCTA = () => {
    document.getElementById('flow_cta')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-spider-dark text-white selection:bg-spider-green selection:text-black pb-20">
      
      {/* Hero Section */}
      <header className="relative overflow-hidden pt-12 pb-20 px-4 sm:px-6 lg:px-8 border-b border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-900/20 via-spider-dark to-spider-dark z-0"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-spider-green/10 border border-spider-green/20 text-spider-green text-xs font-bold uppercase tracking-wider mb-6">
            <span className="w-2 h-2 rounded-full bg-spider-green animate-pulse"></span>
            Shigy-SEO-FullStack 出品
          </div>
          <h1 className="flex flex-col gap-4 text-4xl sm:text-6xl font-black tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-br from-white to-gray-500">
            <span>蜘蛛池 Spider-Pool</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 mx-3">
          合租计划
        </span>
          </h1>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed">
            多引擎高频蜘蛛灌溉 · 稳定 · 高效 · 站群必备。<br className="hidden sm:block"/>
            让搜索引擎主动爱上 你的网站!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={scrollToPricing}
              className="w-full sm:w-auto px-8 py-4 bg-spider-green text-black font-bold rounded-xl text-lg hover:bg-emerald-400 transition-all shadow-[0_0_20px_rgba(0,255,157,0.3)]"
            >
              查看套餐
            </button>
            <button onClick={scrollToflowCTA} className="w-full sm:w-auto px-8 py-4 bg-zinc-800 text-white font-bold rounded-xl text-lg border border-zinc-700 hover:bg-zinc-700 transition-all flex items-center justify-center gap-2 group">
              加入流程 <ChevronDown size={20} className="group-hover:translate-y-1 transition-transform"/>
            </button>

          </div>
        </div>
      </header>

      {/* Engine Status Bar - Redesigned */}
      <div className="border-y border-white/10 bg-black/40 backdrop-blur-md relative z-20">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Label */}
            <div className="flex items-center gap-3 shrink-0 mb-2 md:mb-0">
              <div className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-spider-green opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-spider-green"></span>
              </div>
              <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                引擎实时状态
              </span>
            </div>

            {/* Grid of Engines */}
            <div className="flex flex-wrap justify-center md:justify-end gap-3 sm:gap-4 w-full">
              {engines.map((e) => (
                <div 
                  key={e.name} 
                  className={`
                    relative group flex items-center gap-3 px-4 py-2.5 rounded-xl border transition-all duration-300 cursor-default
                    ${e.available 
                      ? 'bg-spider-green/10 border-spider-green/50 shadow-[0_0_10px_rgba(0,255,157,0.1)] hover:shadow-[0_0_20px_rgba(0,255,157,0.3)] hover:scale-105 hover:bg-spider-green/20' 
                      : 'bg-zinc-900/40 border-zinc-800 opacity-60 grayscale hover:grayscale-0 hover:opacity-100'}
                  `}
                >
                  <div className={`
                    flex items-center justify-center w-8 h-8 rounded-full 
                    ${e.available ? 'bg-spider-green text-black' : 'bg-zinc-800 text-gray-500'}
                  `}>
                    {e.available ? <CheckCircle2 size={16} strokeWidth={3} /> : <div className="w-2 h-2 rounded-full bg-red-500" />}
                  </div>

                  <div className="flex flex-col">
                    <span className={`font-black text-lg leading-none ${e.available ? 'text-white' : 'text-gray-400'}`}>
                      {e.name}
                    </span>
                    <span className={`text-[10px] font-bold uppercase tracking-wider mt-0.5 ${e.available ? 'text-spider-green' : 'text-red-400'}`}>
                      {e.available ? '支持合租' : e.note}
                    </span>
                  </div>
                  
                  {/* Active Indicator Glow */}
                  {e.available && <div className="absolute inset-0 rounded-xl border border-spider-green/20 pointer-events-none"></div>}
                </div>
              ))}
            </div>
            
          </div>
        </div>
      </div>

      {/* Flow & CTA */}
      <section className="py-20 px-4 text-center" id="flow_cta">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">合租流程</h2>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-400 mb-12 relative">
            <div className="z-10 bg-spider-dark px-2">提交需求</div>
            <div className="hidden sm:block h-px bg-zinc-800 flex-1"></div>
            <div className="z-10 bg-spider-dark px-2">自动组群</div>
            <div className="hidden sm:block h-px bg-zinc-800 flex-1"></div>
            <div className="z-10 bg-spider-dark px-2">平摊费用</div>
            <div className="hidden sm:block h-px bg-zinc-800 flex-1"></div>
            <div className="z-10 bg-spider-dark px-2">开始灌溉</div>
          </div>

          <div className="bg-gradient-to-b from-zinc-800 to-zinc-900 border border-zinc-700 p-8 rounded-2xl shadow-xl">
            <h3 className="text-xl font-bold text-white mb-2">加入合租 / 咨询合作</h3>
            <p className="text-gray-400 mb-6">请在群内回复以下格式：</p>
            
            <div className="bg-black/50 p-4 rounded-lg font-mono text-spider-green mb-6 border border-white/10 select-all">
              "合租 + 套餐名 + 渠道名"
            </div>
            
            <p className="text-sm text-gray-500 mb-8">例如：合租 3000 套餐 + Bing</p>
            
            <a 
              href="https://qm.qq.com/q/9ZlQXDZQ4g"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-spider-green to-emerald-600 text-black font-black text-lg rounded-full shadow-[0_0_25px_rgba(0,255,157,0.3)] hover:scale-105 hover:shadow-[0_0_40px_rgba(0,255,157,0.5)] transition-all duration-300 animate-pulse-slow"
            >
              <MessageCircle size={22} fill="currentColor" className="opacity-80"/>
              我要合租
            </a>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="pb-12 pt-5 px-4 mt-5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">产品套餐</h2>
            <p className="text-gray-400">统一价格，全渠道适配，按需选择</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {PACKAGES.map((pkg) => (
              <PricingCard key={pkg.id} pkg={pkg} isPopular={pkg.id === PackageType.BASIC} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 bg-zinc-900/20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-12">核心优势</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureItem 
              icon={<Globe className="text-blue-400" />} 
              title="多引擎覆盖" 
              desc="Bing, Google, Sogou, 360 全方位支持，提升综合索引率。" 
              tooltip="针对不同搜索引擎算法特征优化 UA 与爬取策略，最大化收录权重。"
            />
            <FeatureItem 
              icon={<BarChart3 className="text-purple-400" />} 
              title="高频抓取" 
              desc="模拟真实用户访问行为，高频次蜘蛛爬取，加速收录。" 
              tooltip="动态 IP 池轮转技术，规避反爬策略，确保蜘蛛全天候稳定访问。"
            />
            <FeatureItem 
              icon={<Shield className="text-spider-green" />} 
              title="稳定安全" 
              desc="系统长期稳定运行，日志实时可查，数据安全隔离。" 
              tooltip="采用分布式架构与企业级防火墙，保障 99.9% 业务在线率。"
            />
            <FeatureItem 
              icon={<Users className="text-yellow-400" />} 
              title="独立权限" 
              desc="每位成员分配独立系统后台，任务互不干扰。" 
              tooltip="每个人拥有独立的操作面板与数据报表，资源互不共享，隐私无忧。"
            />
          </div>
        </div>
      </section>

      {/* Co-Rent Rules */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 sm:p-10">
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
            <Users className="text-spider-green" /> 合租组团规则
          </h2>
          <div className="space-y-6">
            <RuleItem number="01" text="2–5 人即可成团，费用按人数透明平摊。" />
            <RuleItem number="02" text="组团后自动建立合租小群，沟通便捷。" />
            <RuleItem number="03" text="每位成员分配独立系统权限，数据隐私严格保护。" />
            <RuleItem number="04" text="URL 与任务完全隔离，确保互不干扰。" />
          </div>
        </div>
      </section>

      <footer className="py-8 text-center text-gray-600 text-sm border-t border-white/5">
        <p>© 2024 Shigy-SEO-Full Stack. All rights reserved.</p>
        <p className="mt-2">专业 · 稳定 · 可验证效果的蜘蛛池方案</p>
      </footer>
    </div>
  );
}

const FeatureItem = ({ icon, title, desc, tooltip }: { icon: React.ReactNode, title: string, desc: string, tooltip: string }) => (
  <div className="group relative bg-black/20 p-6 rounded-xl border border-white/5 hover:border-spider-green/30 transition-all duration-300 hover:bg-black/40 hover:-translate-y-1">
    <div className="mb-4 transition-transform duration-300 group-hover:scale-110">{icon}</div>
    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-spider-green transition-colors">{title}</h3>
    <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
    
    {/* Tooltip */}
    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-56 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none translate-y-2 group-hover:translate-y-0 z-20">
      <div className="bg-zinc-800 text-white text-xs p-3 rounded-lg border border-spider-green/30 shadow-xl shadow-black/50 text-center relative">
        <div className="font-semibold text-spider-green mb-1 flex items-center justify-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-spider-green animate-pulse"></span>
          SEO Pro Tip
        </div>
        {tooltip}
        {/* Arrow */}
        <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px] border-4 border-transparent border-t-zinc-800"></div>
      </div>
    </div>
  </div>
);

const RuleItem = ({ number, text }: { number: string, text: string }) => (
  <div className="flex items-start gap-4">
    <span className="font-mono text-spider-green font-bold text-lg opacity-80">{number}</span>
    <p className="text-gray-300 leading-relaxed">{text}</p>
  </div>
);

export default App;