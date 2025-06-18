'use client';

import { useState } from 'react';
import Chatbot from './Chatbot';
import Image from 'next/image';

const ChatbotPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen && (
        <div className="absolute bottom-16 right-0 transition-all duration-300 ease-in-out">
          <Chatbot />
        </div>
      )}
      
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-200"
      >
        <Image
          src="/chatbot-icon.png"
          alt="Chatbot"
          width={32}
          height={32}
          className="w-8 h-8"
        />
      </button>
    </div>
  );
};

export default ChatbotPopup; 