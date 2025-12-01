import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles, Loader2 } from 'lucide-react';
import { streamChatResponse } from '../services/geminiService';
import { ChatMessage } from '../types';

export const AiConsultant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: '你好！我是 Shigy-SEO 的智能顾问。关于蜘蛛池套餐或 SEO 收录问题，随时问我！' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setIsLoading(true);

    const newMessages = [...messages, { role: 'user', text: userMsg } as ChatMessage];
    setMessages(newMessages);

    try {
      let assistantMessageText = '';
      setMessages(prev => [...prev, { role: 'model', text: '' }]);

      await streamChatResponse(
        newMessages.slice(0, -1), // Don't send the empty placeholder
        userMsg,
        (chunk) => {
          assistantMessageText += chunk;
          setMessages(prev => {
            const updated = [...prev];
            updated[updated.length - 1] = { role: 'model', text: assistantMessageText };
            return updated;
          });
        }
      );
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: '抱歉，连接超时，请稍后再试。' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-lg shadow-green-900/50 transition-all duration-300 hover:scale-105 ${isOpen ? 'hidden' : 'flex'} bg-gradient-to-r from-spider-green to-emerald-600 text-black font-bold items-center gap-2`}
      >
        <Sparkles size={24} />
        <span className="hidden sm:inline">AI 顾问</span>
      </button>

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full sm:max-w-md h-[85vh] sm:h-[600px] bg-spider-card border border-spider-accent sm:rounded-2xl rounded-t-2xl flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300">
            
            {/* Header */}
            <div className="p-4 border-b border-spider-accent flex justify-between items-center bg-spider-dark/50">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-spider-green/20 rounded-lg">
                  <Sparkles size={18} className="text-spider-green" />
                </div>
                <div>
                  <h3 className="font-bold text-white">Shigy AI 顾问</h3>
                  <p className="text-xs text-gray-400">Gemini 2.5 Flash 驱动</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-spider-dark/30">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-spider-green text-black font-medium rounded-tr-sm' 
                      : 'bg-zinc-800 text-gray-100 border border-zinc-700 rounded-tl-sm'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 bg-spider-card border-t border-spider-accent">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="询问套餐详情或 SEO 建议..."
                  className="w-full bg-spider-dark border border-zinc-700 text-white rounded-full pl-4 pr-12 py-3 focus:outline-none focus:border-spider-green focus:ring-1 focus:ring-spider-green/50 transition-all placeholder-gray-500"
                />
                <button 
                  type="submit" 
                  disabled={isLoading || !input.trim()}
                  className="absolute right-2 p-2 bg-spider-green text-black rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-emerald-400 transition-colors"
                >
                  {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};