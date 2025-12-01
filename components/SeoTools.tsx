import React, { useState } from 'react';
import { generateSeoOptimization } from '../services/geminiService';
import { Wand2, Search, FileText, RefreshCw, Loader2, Copy, Check } from 'lucide-react';

export const SeoTools: React.FC = () => {
  const [content, setContent] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'analyze' | 'title' | 'rewrite'>('analyze');
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!content.trim()) return;
    setLoading(true);
    setResult('');
    setCopied(false);
    try {
      const response = await generateSeoOptimization(content, activeTab);
      setResult(response);
    } catch (e) {
      setResult('生成失败，请稍后重试。');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <section className="py-16 px-4 bg-zinc-900/30 border-y border-white/5">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8 justify-center">
          <div className="p-2 bg-spider-green/10 rounded-lg">
             <Wand2 className="text-spider-green" size={24} />
          </div>
          <h2 className="text-2xl font-bold text-white">Gemini 智能 SEO 工具箱</h2>
        </div>
        
        <div className="bg-spider-card border border-zinc-800 rounded-2xl p-4 sm:p-8 shadow-xl">
          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            <TabButton 
              active={activeTab === 'analyze'} 
              onClick={() => setActiveTab('analyze')} 
              icon={<Search size={16} />} 
              label="SEO 诊断" 
            />
            <TabButton 
              active={activeTab === 'title'} 
              onClick={() => setActiveTab('title')} 
              icon={<FileText size={16} />} 
              label="标题生成" 
            />
            <TabButton 
              active={activeTab === 'rewrite'} 
              onClick={() => setActiveTab('rewrite')} 
              icon={<RefreshCw size={16} />} 
              label="伪原创改写" 
            />
          </div>

          <div className="relative mb-4">
             <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={
                activeTab === 'analyze' ? "输入文章内容，AI 将分析关键词密度和收录概率..." :
                activeTab === 'title' ? "输入核心关键词或文章片段，生成 5 个爆款标题..." :
                "输入需要改写的段落，AI 将进行 SEO 友好的伪原创处理..."
              }
              className="w-full h-40 bg-black/50 border border-zinc-700 rounded-xl p-4 text-white focus:outline-none focus:border-spider-green transition-colors resize-none placeholder-zinc-600"
            />
             <div className="absolute bottom-3 right-3 text-xs text-gray-500">
               {content.length} 字
             </div>
          </div>

          <div className="flex justify-end">
             <button
              onClick={handleGenerate}
              disabled={loading || !content.trim()}
              className="px-6 py-2.5 bg-spider-green text-black font-bold rounded-lg hover:bg-emerald-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? <Loader2 size={18} className="animate-spin" /> : <Wand2 size={18} />}
              立即生成
            </button>
          </div>

          {result && (
            <div className="mt-8 pt-8 border-t border-zinc-800 animate-in fade-in slide-in-from-bottom-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">生成结果</h3>
                <button 
                  onClick={handleCopy}
                  className="text-spider-green text-xs flex items-center gap-1 hover:text-emerald-300 transition-colors"
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  {copied ? '已复制' : '复制结果'}
                </button>
              </div>
              <div className="bg-black/30 border border-zinc-800 rounded-xl p-6 text-gray-200 leading-relaxed whitespace-pre-wrap font-mono text-sm">
                {result}
              </div>
            </div>
          )}
        </div>
         <p className="text-center text-gray-500 text-xs mt-6">
            Powered by Google Gemini 2.5 Flash · 针对搜索引擎收录算法优化
          </p>
      </div>
    </section>
  );
};

const TabButton = ({ active, onClick, icon, label }: any) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all border ${
      active 
        ? 'bg-spider-green/10 border-spider-green text-spider-green' 
        : 'bg-zinc-900 border-zinc-800 text-gray-400 hover:text-white hover:border-zinc-700'
    }`}
  >
    {icon} {label}
  </button>
);
