import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Sparkles, Info } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { chatSuggestions, chatResponses } from '../data/mockData';
import { aiAPI } from '../services/api';

export default function AIAssistant() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const { language, t } = useLanguage();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const sendMessage = async (text) => {
    if (!text.trim()) return;

    const userMsg = { id: Date.now(), role: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      // Call backend AI route (Gemini enabled)
      const res = await aiAPI.chat(text, language);
      const reply = res.reply;
      const botMsg = { id: Date.now() + 1, role: 'bot', text: reply };
      setMessages(prev => [...prev, botMsg]);
    } catch {
      // Fallback to local agricultural responses if network/server issue
      const matchKey = Object.keys(chatResponses).find(key =>
        text.toLowerCase().includes(key.toLowerCase())
      );
      const responseData = chatResponses[matchKey] || chatResponses.default;
      const responseText = language === 'bn' ? responseData.responseBn : responseData.response;
      const botMsg = { id: Date.now() + 1, role: 'bot', text: responseText };
      setMessages(prev => [...prev, botMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleChip = (suggestion) => {
    const text = language === 'bn' ? suggestion.textBn : suggestion.text;
    sendMessage(text);
  };

  return (
    <div className="min-h-screen bg-[#f8faf8] dark:bg-[#0a120a]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 flex flex-col" style={{ height: 'calc(100vh - 4rem)' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-4 flex-shrink-0"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#e8f5e9] dark:bg-[#2e7d32]/20 text-[#2e7d32] dark:text-[#81c784] text-sm font-medium mb-3">
            <Bot size={14} />
            <span>{t('aiAssistant.sampleBadge')}</span>
          </div>
          <h1 className="text-2xl font-bold text-[#1a1a2e] dark:text-white mb-1">
            {t('aiAssistant.title')}
          </h1>
          <p className="text-sm text-[#64748b] dark:text-[#94a3b8]">
            {t('aiAssistant.subtitle')}
          </p>
        </motion.div>

        {/* Disclaimer */}
        <div className="mb-4 p-2.5 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 flex items-center gap-2 flex-shrink-0">
          <Info size={14} className="text-amber-500 flex-shrink-0" />
          <p className="text-xs text-amber-700 dark:text-amber-300">{t('aiAssistant.disclaimer')}</p>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto custom-scrollbar mb-4 space-y-4 px-1">
          {messages.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center h-full text-center"
            >
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#2e7d32] to-[#4caf50] flex items-center justify-center mb-4 shadow-lg">
                <Bot size={36} className="text-white" />
              </div>
              <h3 className="text-lg font-semibold text-[#1a1a2e] dark:text-white mb-2">
                {language === 'bn' ? 'আপনার কৃষি প্রশ্ন জিজ্ঞাসা করুন!' : 'Ask your farming question!'}
              </h3>
              <p className="text-sm text-[#64748b] dark:text-[#94a3b8] max-w-sm mb-6">
                {language === 'bn' ? 'বাংলা বা ইংরেজিতে টাইপ করুন, অথবা নিচের একটি সাজেশনে ক্লিক করুন।' : 'Type in Bangla or English, or click a suggestion below.'}
              </p>

              {/* Suggestion chips */}
              <div className="flex flex-wrap justify-center gap-2 max-w-md">
                {chatSuggestions.map((suggestion, i) => (
                  <motion.button
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() => handleChip(suggestion)}
                    className="px-3 py-2 rounded-xl bg-white dark:bg-[#1a2e1a] border border-gray-200 dark:border-[#2d4a2d] text-sm text-[#1a1a2e] dark:text-white hover:border-[#4caf50] hover:bg-[#e8f5e9] dark:hover:bg-[#2e7d32]/10 transition-all cursor-pointer"
                  >
                    {language === 'bn' ? suggestion.textBn : suggestion.text}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                {/* Avatar */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  msg.role === 'user'
                    ? 'bg-[#e8f5e9] dark:bg-[#2e7d32]/30'
                    : 'bg-gradient-to-br from-[#2e7d32] to-[#4caf50]'
                }`}>
                  {msg.role === 'user' ? (
                    <User size={16} className="text-[#2e7d32] dark:text-[#81c784]" />
                  ) : (
                    <Bot size={16} className="text-white" />
                  )}
                </div>

                {/* Message bubble */}
                <div className={`max-w-[80%] ${msg.role === 'user' ? 'text-right' : ''}`}>
                  <div className={`inline-block p-3.5 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-[#2e7d32] text-white rounded-br-md'
                      : 'bg-white dark:bg-[#1a2e1a] border border-gray-100 dark:border-[#2d4a2d] text-[#1a1a2e] dark:text-white rounded-bl-md'
                  }`}>
                    {msg.role === 'bot' && (
                      <div className="flex items-center gap-1.5 mb-2">
                        <Sparkles size={13} className="text-[#2e7d32] dark:text-[#81c784]" />
                        <span className="text-[11px] font-bold text-[#2e7d32] dark:text-[#81c784] tracking-wide">
                          {language === 'bn' ? 'কিষাণঘর এআই বিশেষজ্ঞ' : 'KishanGhar AI Specialist'}
                        </span>
                      </div>
                    )}
                    <div className="whitespace-pre-wrap">{msg.text}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#2e7d32] to-[#4caf50] flex items-center justify-center flex-shrink-0">
                <Bot size={16} className="text-white" />
              </div>
              <div className="p-3.5 rounded-2xl rounded-bl-md bg-white dark:bg-[#1a2e1a] border border-gray-100 dark:border-[#2d4a2d]">
                <div className="flex items-center gap-1.5">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                      className="w-2 h-2 rounded-full bg-[#4caf50]"
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggestion chips (shown after messages exist) */}
        {messages.length > 0 && !isTyping && (
          <div className="flex flex-wrap gap-1.5 mb-3 flex-shrink-0">
            {chatSuggestions.slice(0, 3).map((suggestion, i) => (
              <button
                key={i}
                onClick={() => handleChip(suggestion)}
                className="px-2.5 py-1.5 rounded-lg bg-white dark:bg-[#1a2e1a] border border-gray-200 dark:border-[#2d4a2d] text-xs text-[#64748b] dark:text-[#94a3b8] hover:border-[#4caf50] hover:text-[#2e7d32] transition-all"
              >
                {language === 'bn' ? suggestion.textBn : suggestion.text}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <form onSubmit={handleSubmit} className="flex items-center gap-2 flex-shrink-0">
          <div className="flex-1 relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t('aiAssistant.placeholder')}
              className="input !pr-12 !py-3"
              disabled={isTyping}
            />
          </div>
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#2e7d32] to-[#4caf50] text-white flex items-center justify-center hover:shadow-lg disabled:opacity-40 transition-all flex-shrink-0"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}
