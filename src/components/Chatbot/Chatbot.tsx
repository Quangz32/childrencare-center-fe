'use client';

import { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { useEffect } from 'react';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        'Xin chào! Tôi là Tư vấn viên Ánh Dương 🌈. Tôi luôn sẵn sàng hỗ trợ bạn về các vấn đề liên quan đến trẻ tự kỷ, chậm phát triển. Bạn cần tư vấn gì, hãy nhắn cho tôi nhé!'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(true);

  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || '';
  const genAI = new GoogleGenerativeAI(apiKey);

  // Prompt định hướng chuyên môn
  const systemPrompt =
    'Bạn là một tư vấn viên chuyên nghiệp của Trung tâm Ánh Dương, chuyên hỗ trợ phụ huynh về trẻ tự kỷ, chậm phát triển. Hãy trả lời ngắn gọn, dễ hiểu, thân thiện và đúng chuyên môn.';

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

      // Gửi prompt định hướng + câu hỏi người dùng
      const result = await model.generateContent(systemPrompt + '\nCâu hỏi: ' + input);
      const response = await result.response;
      const text = response.text();

      const assistantMessage: Message = { role: 'assistant', content: text };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      console.error('Gemini API error:', err);
      let errorMessage = 'Đã xảy ra lỗi khi gọi Gemini API.';
      
      if (err instanceof Error) {
        if (err.message.includes('API key')) {
          errorMessage = 'Lỗi API key. Vui lòng kiểm tra lại API key của bạn.';
        } else if (err.message.includes('404')) {
          errorMessage = 'Không thể kết nối đến Gemini API. Vui lòng thử lại sau.';
        }
      }
      
      setError(errorMessage);
      const errorResponse: Message = { role: 'assistant', content: errorMessage };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="flex flex-col h-[600px] w-[400px] bg-white rounded-3xl border-2 border-black shadow-2xl overflow-hidden">
      <div className="p-4 bg-blue-theme bg-blue-600 text-white rounded-t-3xl flex items-center gap-3 justify-between border-b-2 border-black relative">
        <div className="flex items-center gap-3">
          <img src="/images/avatar.png" alt="avatar" className="w-14 h-14 rounded-full border-4 border-yellow-theme border-yellow-300 shadow-md bg-white" />
          <div>
            <h2 className="text-xl font-bold">Tư vấn viên Ánh Dương</h2>
            <p className="text-xs text-yellow-theme text-yellow-400 font-semibold">Chuyên gia hỗ trợ trẻ tự kỷ, chậm phát triển</p>
          </div>
        </div>
        <button 
          onClick={() => setIsOpen(false)}
          className="text-white hover:text-yellow-theme hover:text-yellow-400 focus:outline-none absolute right-4 top-4"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-theme bg-gray-100">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} items-end`}
          >
            {message.role === 'assistant' && (
              <img src="/images/avatar.png" alt="avatar" className="w-8 h-8 rounded-full border-2 border-yellow-theme border-yellow-300 mr-2 bg-white" />
            )}
            <div
              className={`max-w-[80%] p-3 rounded-2xl border-2 font-medium shadow-md ${
                message.role === 'user'
                  ? 'bg-blue-theme bg-blue-600 text-white border-black rounded-br-md'
                  : 'bg-white text-gray-900 border-yellow-theme border-yellow-300 rounded-bl-md'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex items-end justify-start">
            <img src="/images/avatar.png" alt="avatar" className="w-8 h-8 rounded-full border-2 border-yellow-theme border-yellow-300 mr-2 bg-white" />
            <div className="bg-white text-gray-900 border-2 border-yellow-theme border-yellow-300 rounded-2xl rounded-bl-md p-3 font-medium shadow-md flex items-center min-w-[60px]">
              <span className="dot-flashing"></span>
            </div>
          </div>
        )}
        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
      </div>

      <div className="p-4 border-t-2 border-black bg-white">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Nhập tin nhắn..."
            className="flex-1 p-3 border-2 border-black rounded-full focus:outline-none focus:ring-2 focus:ring-blue-theme focus:ring-blue-600 text-black bg-gray-theme bg-gray-100 shadow-sm"
          />
          <button
            onClick={handleSendMessage}
            disabled={isLoading}
            className="px-6 py-2 bg-blue-theme bg-blue-600 text-white rounded-full border-2 border-black font-semibold shadow-md hover:bg-yellow-theme hover:bg-yellow-400 hover:text-blue-theme hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-theme focus:ring-blue-600 disabled:opacity-50 transition-all"
          >
            Gửi
          </button>
        </div>
      </div>
      {/* Hiệu ứng ba chấm động */}
      <style>{`
        .dot-flashing {
          position: relative;
          width: 1.5em;
          height: 0.5em;
          display: flex;
          align-items: center;
          justify-content: flex-start;
        }
        .dot-flashing:before, .dot-flashing:after, .dot-flashing span {
          content: '';
          display: inline-block;
          width: 0.5em;
          height: 0.5em;
          margin-right: 0.2em;
          background: #FFD600;
          border-radius: 50%;
          animation: dotFlashing 1s infinite linear alternate;
        }
        .dot-flashing:after {
          animation-delay: 0.5s;
        }
        .dot-flashing span {
          animation-delay: 0.25s;
        }
        @keyframes dotFlashing {
          0% { opacity: 0.2; }
          50%, 100% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default Chatbot;
