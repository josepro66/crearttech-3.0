import React, { useState, useRef, useEffect } from 'react';
import { generateTechAdvice } from '../services/geminiService';
import { ChatMessage } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Greetings, user. I am C-Tech. How can I assist with your hardware upgrades today?' }
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMsg: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    const responseText = await generateTechAdvice(input);
    
    setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    setLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="w-80 md:w-96 h-[500px] bg-black/90 border border-cyan-500/50 rounded-lg shadow-[0_0_30px_rgba(0,243,255,0.2)] backdrop-blur-md flex flex-col overflow-hidden mb-4"
          >
            {/* Header */}
            <div className="bg-cyan-900/30 p-3 border-b border-cyan-500/30 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                <h3 className="text-cyan-400 font-mono font-bold text-sm tracking-wider">C-TECH AI SUPPORT</h3>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-cyan-600 hover:text-cyan-400 text-xl">&times;</button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div 
                    className={`max-w-[80%] p-3 rounded-lg text-sm ${
                        msg.role === 'user' 
                        ? 'bg-cyan-900/40 text-cyan-50 border border-cyan-700' 
                        : 'bg-gray-900/80 text-gray-300 border border-gray-700'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                   <div className="bg-gray-900/80 p-3 rounded-lg border border-gray-700">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce"></span>
                        <span className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce delay-75"></span>
                        <span className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce delay-150"></span>
                      </div>
                   </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t border-cyan-500/30 bg-black/50">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about specs..."
                  className="flex-1 bg-transparent border border-gray-700 rounded px-3 py-2 text-sm text-white focus:border-cyan-500 outline-none font-mono"
                />
                <button 
                  onClick={handleSend}
                  className="bg-cyan-600 hover:bg-cyan-500 text-black font-bold px-3 rounded transition-colors"
                >
                  &rarr;
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-cyan-500 hover:bg-cyan-400 rounded-full shadow-[0_0_20px_rgba(0,243,255,0.6)] flex items-center justify-center transition-all hover:scale-110 group"
      >
         <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-black group-hover:rotate-12 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
         </svg>
      </button>
    </div>
  );
};

export default AIAssistant;