
import React, { useState, useRef, useEffect } from 'react';
import { askTutor } from '../services/geminiService';
import { Send, User, Bot, Sparkles, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface Message {
  role: 'user' | 'tutor';
  text: string;
}

interface AITutorProps {
  initialQuery?: string;
  onClearQuery?: () => void;
}

const AITutor: React.FC<AITutorProps> = ({ initialQuery = '', onClearQuery }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'tutor', text: 'Hai! Saya Cikgu AI. Ada apa-apa soalan tentang MIT App Inventor yang anda ingin tahu?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialQuery) {
      const sendInitial = async () => {
        // Wait a small moment to ensure component is fully rendered
        await new Promise(resolve => setTimeout(resolve, 300));
        setMessages(prev => [...prev, { role: 'user', text: initialQuery }]);
        setIsLoading(true);
        const aiResponse = await askTutor(initialQuery);
        setMessages(prev => [...prev, { role: 'tutor', text: aiResponse }]);
        setIsLoading(false);
        if (onClearQuery) onClearQuery();
      };
      sendInitial();
    }
  }, [initialQuery]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsLoading(true);

    const aiResponse = await askTutor(userMsg);
    setMessages(prev => [...prev, { role: 'tutor', text: aiResponse }]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 animate-fadeIn">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-orange-500 p-6 text-white flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
            <Sparkles size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold">Cikgu AI App Inventor</h3>
            <p className="text-orange-100 text-xs">Sedia membantu anda 24/7</p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50"
      >
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
              msg.role === 'user' ? 'bg-orange-100 text-orange-600' : 'bg-white text-slate-600 shadow-sm border border-slate-100'
            }`}>
              {msg.role === 'user' ? <User size={20} /> : <Bot size={20} />}
            </div>
            <div className={`max-w-[80%] p-4 rounded-2xl shadow-sm leading-relaxed ${
              msg.role === 'user' 
                ? 'bg-orange-600 text-white rounded-tr-none' 
                : 'bg-white text-slate-800 rounded-tl-none border border-slate-100 text-sm'
            }`}>
              {msg.role === 'user' ? (
                msg.text
              ) : (
                <div className="space-y-1">
                  <ReactMarkdown
                    components={{
                      h1: ({node, ...props}) => <h1 className="text-base font-extrabold text-slate-900 mt-3 mb-1" {...props} />,
                      h2: ({node, ...props}) => <h2 className="text-sm font-bold text-slate-900 mt-2.5 mb-1" {...props} />,
                      h3: ({node, ...props}) => <h3 className="text-xs font-bold text-slate-800 mt-2 mb-1" {...props} />,
                      p: ({node, ...props}) => <p className="mb-2 leading-relaxed text-slate-700" {...props} />,
                      ul: ({node, ...props}) => <ul className="list-disc pl-5 mb-2.5 space-y-1 text-slate-700" {...props} />,
                      ol: ({node, ...props}) => <ol className="list-decimal pl-5 mb-2.5 space-y-1 text-slate-700" {...props} />,
                      li: ({node, ...props}) => <li className="text-xs leading-relaxed" {...props} />,
                      code: ({node, ...props}) => <code className="bg-slate-100 text-pink-600 px-1.5 py-0.5 rounded font-mono text-xs font-semibold" {...props} />,
                      a: ({node, ...props}) => <a className="text-orange-600 hover:underline font-bold" target="_blank" rel="noopener noreferrer" {...props} />,
                      strong: ({node, ...props}) => <strong className="font-bold text-slate-900" {...props} />
                    }}
                  >
                    {msg.text}
                  </ReactMarkdown>
                </div>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm">
              <Bot size={20} className="text-slate-400" />
            </div>
            <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-slate-100 flex items-center gap-2">
              <Loader2 className="animate-spin text-orange-500" size={16} />
              <span className="text-slate-400 text-sm italic">Cikgu AI sedang berfikir...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-6 bg-white border-t border-slate-100">
        <div className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Tanya apa-apa (cth: Apa itu Palette?)"
            className="w-full pl-6 pr-16 py-4 bg-slate-100 border-none rounded-2xl focus:ring-2 focus:ring-orange-500 transition-all text-slate-800 placeholder:text-slate-400"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="absolute right-2 p-3 bg-orange-600 text-white rounded-xl hover:bg-orange-700 disabled:opacity-50 transition-all active:scale-95"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AITutor;
