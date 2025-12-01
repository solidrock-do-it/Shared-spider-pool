import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from '../types';

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API_KEY is not defined");
  }
  return new GoogleGenAI({ apiKey });
};

export const streamChatResponse = async (
  history: ChatMessage[],
  newMessage: string,
  onChunk: (text: string) => void
): Promise<string> => {
  try {
    const ai = getClient();
    
    // Using a lightweight model for fast responses in an H5 context
    const model = 'gemini-2.5-flash'; 

    const chat = ai.chats.create({
      model: model,
      config: {
        systemInstruction: `You are Shigy-SEO's AI Consultant. You are an expert in SEO, search engine spiders, and link building.
        
        Your goal is to sell the "Spider-Pool" (蜘蛛池) service.
        
        Key Product Info:
        - Basic Plan: ¥3000/month, 50k-100k spiders/day. Good for regular sites.
        - High Volume Plan: ¥18,000/month, 1M+ spiders/day. Good for link farms/PBNs.
        - Supported Engines: Bing, Google, Sogou, 360.
        - Baidu is NOT supported for co-renting (only exclusive).
        - Co-renting rules: 2-5 people per group, shared cost, independent permissions/dashboards.
        
        Tone: Professional, knowledgeable, concise (suitable for chat), and persuasive.
        If users ask about SEO problems (not indexing), explain how high-frequency spider crawling helps fast indexing.
        
        Language: Respond in Chinese (Simplified) unless the user speaks English.`,
      },
      history: history.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }]
      }))
    });

    const result = await chat.sendMessageStream({ message: newMessage });
    
    let fullResponse = '';
    for await (const chunk of result) {
      const text = chunk.text;
      if (text) {
        fullResponse += text;
        onChunk(text);
      }
    }
    return fullResponse;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};

export const generateSeoOptimization = async (
  content: string,
  task: 'analyze' | 'title' | 'rewrite'
): Promise<string> => {
  try {
    const ai = getClient();
    const model = 'gemini-2.5-flash';

    let prompt = '';
    switch (task) {
      case 'analyze':
        prompt = `Act as an SEO expert. Analyze the following content for search engine optimization (focus on Bing/Google/Sogou).
        Identify:
        1. Main keywords detected.
        2. Content sentiment.
        3. Readability score estimate.
        4. Three specific improvements to increase indexing rate (Spider-Pool context).
        
        Content:
        ${content}`;
        break;
      case 'title':
        prompt = `Act as an SEO copywriter. Generate 5 high-CTR, SEO-friendly titles for the following content.
        Target Audience: Website owners looking for traffic.
        Tone: Professional, Attractive, Urgent.
        
        Content/Keywords:
        ${content}`;
        break;
      case 'rewrite':
        prompt = `Act as a content spinner/rewriter. Rewrite the following text to be unique (pseudo-original) while maintaining the original meaning.
        Goal: Bypass duplicate content filters in search engines.
        Optimize for: Spider crawling (clear structure, keyword rich).
        
        Content:
        ${content}`;
        break;
    }

    const result = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });

    return result.text || "生成失败，请重试。";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
