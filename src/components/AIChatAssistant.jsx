import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Send, Loader2, Bot } from 'lucide-react';

const AIChatAssistant = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, role: 'bot', content: "Hi! I'm Trendly's Fashion AI Assistant.\n\nHow can I help you discover today's trends? ✨" }
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            setTimeout(() => {
                inputRef.current?.focus();
            }, 400); // 400ms buffer for layout transition
        }
    }, [isOpen]);

    const handleSend = async (customMsg = null) => {
        const textToSend = typeof customMsg === 'string' ? customMsg : input;
        if (!textToSend.trim()) return;

        const userMsg = { id: Date.now(), role: 'user', content: textToSend };
        setMessages(prev => [...prev, userMsg]);
        setInput("");
        setIsTyping(true);

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/assistant/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: textToSend,
                    history: messages.slice(-5).map(m => ({ role: (m.role === 'bot' ? 'assistant' : m.role), content: m.content }))
                }),
            });

            if (!response.ok) throw new Error("API Network Error");

            const data = await response.json();
            setMessages(prev => [...prev, { id: Date.now() + 1, role: 'bot', content: data.content }]);
        } catch (error) {
            console.error("Chat Error:", error);
            setMessages(prev => [...prev, { id: Date.now() + 1, role: 'bot', content: "Our neural links are experiencing high traffic. Please try again in a moment!" }]);
        } finally {
            setIsTyping(false);
        }
    };

    // Formatter to render Markdown-style bold **text** and linebreaks cleanly
    const formatMessage = (content) => {
        return content.split('\n').map((line, i) => (
            <React.Fragment key={i}>
                {line.split('**').map((part, index) => 
                    index % 2 === 1 ? <strong key={index} className="font-extrabold text-black dark:text-white drop-shadow-sm">{part}</strong> : part
                )}
                {i !== content.split('\n').length - 1 && <br />}
            </React.Fragment>
        ));
    };

    return (
        <div className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-[120]">
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        layoutId="chat-container"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        onClick={() => setIsOpen(true)}
                        className="w-14 h-14 sm:w-16 sm:h-16 bg-black dark:bg-[#2979FF] text-white rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(0,0,0,0.3)] hover:scale-110 transition-transform group relative"
                    >
                        <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 group-hover:animate-pulse" />
                        <span className="absolute -top-1 -right-1 flex h-4 w-4">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-4 w-4 bg-pink-500 border-2 border-white dark:border-black"></span>
                        </span>
                    </motion.button>
                )}

                {isOpen && (
                    <motion.div
                        layoutId="chat-container"
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 25 }}
                        className="w-[calc(100vw-2rem)] sm:w-[400px] h-[calc(100vh-6rem)] sm:h-[650px] bg-white dark:bg-[#0A0A0A] rounded-[2rem] sm:rounded-[2.5rem] shadow-[0_10px_50px_rgba(0,0,0,0.3)] dark:shadow-[0_10px_50px_rgba(41,121,255,0.15)] flex flex-col overflow-hidden border border-black/5 dark:border-white/10 origin-bottom-right"
                    >
                        {/* Header */}
                        <div className="bg-black dark:bg-[#1A1A1A] p-4 sm:p-6 flex justify-between items-center text-white shrink-0 z-10 shadow-md border-b border-white/10">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-pink-500 via-purple-500 to-blue-500 flex items-center justify-center shadow-lg transform transition-transform hover:rotate-12">
                                    <Sparkles className="w-5 h-5 text-white animate-pulse" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-black uppercase tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-pink-100 to-white">Trendly Gemini</h3>
                                    <div className="flex items-center mt-1">
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-400 mr-1.5 animate-pulse"></div>
                                        <p className="text-[8px] font-bold text-white/60 uppercase tracking-widest leading-none">Online - Powered by AI</p>
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/20 rounded-full transition-colors active:scale-90">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Messages */}
                        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 custom-scrollbar bg-slate-50 dark:bg-[#0A0A0A] relative">
                            {/* Decorative background element */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-[80px] pointer-events-none"></div>
                            
                            <AnimatePresence>
                                {messages.map((msg, index) => (
                                    <motion.div 
                                        initial={{ opacity: 0, y: 15, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        transition={{ duration: 0.3, ease: 'easeOut' }}
                                        key={msg.id} 
                                        className={`flex relative z-10 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        {msg.role === 'bot' && (
                                            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-pink-500 to-blue-500 flex items-center justify-center mr-2 shrink-0 mt-auto mb-1 shadow-sm">
                                                <Bot className="w-3 h-3 text-white" />
                                            </div>
                                        )}
                                        <div className={`max-w-[80%] p-4 rounded-3xl text-[13px] leading-relaxed relative group ${
                                            msg.role === 'user'
                                            ? 'bg-black dark:bg-gradient-to-tr dark:from-blue-600 dark:to-[#00E5FF] text-white rounded-br-sm shadow-[0_4px_15px_rgba(0,0,0,0.1)]'
                                            : 'bg-white dark:bg-[#1A1A1A] text-black/80 dark:text-white/90 rounded-bl-sm border border-black/5 dark:border-white/10 shadow-[0_4px_15px_rgba(0,0,0,0.03)]'
                                            }`}>
                                            {formatMessage(msg.content)}
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>

                            {isTyping && (
                                <motion.div 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex justify-start relative z-10"
                                >
                                    <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-pink-500 to-blue-500 flex items-center justify-center mr-2 shrink-0 mt-auto mb-1">
                                        <Bot className="w-3 h-3 text-white" />
                                    </div>
                                    <div className="bg-white dark:bg-[#1A1A1A] p-4 py-5 rounded-3xl rounded-bl-sm flex items-center gap-2 border border-black/5 dark:border-white/10 shadow-sm">
                                        <div className="flex gap-1.5">
                                            <motion.div animate={{y: [0, -4, 0]}} transition={{duration: 0.6, repeat: Infinity, delay: 0}} className="w-1.5 h-1.5 bg-[#2979FF] dark:bg-pink-500 rounded-full" />
                                            <motion.div animate={{y: [0, -4, 0]}} transition={{duration: 0.6, repeat: Infinity, delay: 0.2}} className="w-1.5 h-1.5 bg-[#2979FF] dark:bg-pink-500 rounded-full" />
                                            <motion.div animate={{y: [0, -4, 0]}} transition={{duration: 0.6, repeat: Infinity, delay: 0.4}} className="w-1.5 h-1.5 bg-[#2979FF] dark:bg-pink-500 rounded-full" />
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </div>

                        {/* Input Area */}
                        <div className="p-4 sm:p-5 bg-white dark:bg-[#111] border-t border-black/5 dark:border-white/5 shrink-0 relative z-20">
                            <div className="relative flex items-center">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder="Ask about global trends..."
                                    className="w-full bg-slate-50 dark:bg-black/50 border border-black/10 dark:border-white/10 rounded-2xl py-4 pl-5 pr-14 text-sm outline-none focus:ring-2 focus:ring-blue-500/40 dark:text-white transition-all shadow-inner placeholder-black/30 dark:placeholder-white/30"
                                />
                                <button
                                    onClick={() => handleSend()}
                                    disabled={!input.trim()}
                                    className={`absolute right-2 p-2.5 rounded-xl transition-all ${
                                        input.trim() 
                                        ? 'bg-black dark:bg-[#2979FF] text-white hover:scale-105 active:scale-95 shadow-md' 
                                        : 'bg-black/5 dark:bg-white/5 text-black/20 dark:text-white/20'
                                    }`}
                                >
                                    <Send className="w-4 h-4 ml-0.5" />
                                </button>
                            </div>
                            
                            {/* Suggestions */}
                            <div className="mt-4 flex gap-2 overflow-x-auto pb-1 custom-scrollbar hide-scrollbar">
                                {['Current Viral Trends?', 'Best Sneakers?', 'Quiet Luxury'].map(tip => (
                                    <button
                                        key={tip}
                                        onClick={() => handleSend(tip)}
                                        className="whitespace-nowrap px-4 py-2 bg-slate-50 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-full text-[9px] font-black uppercase tracking-widest dark:text-white/70 hover:bg-black hover:text-white dark:hover:bg-[#2979FF] dark:hover:text-white dark:hover:border-[#2979FF] transition-all shadow-[0_2px_5px_rgba(0,0,0,0.02)] active:scale-95"
                                    >
                                        {tip}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AIChatAssistant;
