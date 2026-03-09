import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Send, Loader2 } from 'lucide-react';

const AIChatAssistant = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, role: 'bot', content: "Hi! I'm Trendly's Neural Assistant. How can I help you discover today's trends?" }
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const handleSend = () => {
        if (!input.trim()) return;

        const userMsg = { id: Date.now(), role: 'user', content: input };
        setMessages(prev => [...prev, userMsg]);
        setInput("");
        setIsTyping(true);

        // Simulated AI logic
        setTimeout(() => {
            let response = "That's a great question! Based on my neural scan of global fashion feeds, that style is currently showing a +25% momentum increase in Western Europe.";
            const lowInput = input.toLowerCase();
            if (lowInput.includes('milan')) {
                response = "Milan is currently obsessed with 'Quiet Luxury' silhouettes and oversized vintage leather jackets. We're seeing heavy engagement in the Brera district.";
            } else if (lowInput.includes('lipstick') || lowInput.includes('makeup')) {
                response = "Matte lipsticks with earthy undertones are peaking. The Kay Beauty collection is currently a top performer in our neural index.";
            } else if (lowInput.includes('paris') || lowInput.includes('france')) {
                response = "Parisian street style is leaning heavily into 'Balletcore' right now. Silk ribbons and lightweight tulle are trending across social signals.";
            }

            setMessages(prev => [...prev, { id: Date.now() + 1, role: 'bot', content: response }]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <div className="fixed bottom-8 right-8 z-[120]">
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        layoutId="chat-container"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        onClick={() => setIsOpen(true)}
                        className="w-16 h-16 bg-black dark:bg-[#2979FF] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform group relative"
                    >
                        <Sparkles className="w-6 h-6 group-hover:animate-pulse" />
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
                        className="w-[380px] h-[550px] bg-white dark:bg-[#0F0F0F] rounded-[2.5rem] shadow-3xl flex flex-col overflow-hidden border border-black/5 dark:border-white/10"
                    >
                        {/* Header */}
                        <div className="bg-black dark:bg-[#1A1A1A] p-6 flex justify-between items-center text-white">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-pink-500 to-blue-500 flex items-center justify-center">
                                    <Sparkles className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-black uppercase tracking-widest">Neural AI</h3>
                                    <p className="text-[8px] font-bold text-white/40 uppercase tracking-widest leading-none mt-1">Always Scanning...</p>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Messages */}
                        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                            {messages.map(msg => (
                                <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[80%] p-4 rounded-3xl text-sm leading-relaxed ${msg.role === 'user'
                                            ? 'bg-black dark:bg-[#2979FF] text-white rounded-tr-sm'
                                            : 'bg-black/5 dark:bg-white/5 dark:text-white rounded-tl-sm border border-black/5 dark:border-white/5'
                                        }`}>
                                        {msg.content}
                                    </div>
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-black/5 dark:bg-white/5 p-4 rounded-3xl rounded-tl-sm flex items-center gap-2">
                                        <Loader2 className="w-4 h-4 animate-spin dark:text-white" />
                                        <span className="text-[10px] font-black uppercase tracking-widest opacity-40 dark:text-white/40">Analyzing feeds...</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Input */}
                        <div className="p-6 bg-gray-50 dark:bg-black/20 border-t border-black/5 dark:border-white/5">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder="Ask about trends..."
                                    className="w-full bg-white dark:bg-black/50 border border-black/10 dark:border-white/10 rounded-2xl py-4 pl-4 pr-12 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 dark:text-white transition-all shadow-inner"
                                />
                                <button
                                    onClick={handleSend}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-black dark:bg-[#2979FF] text-white rounded-xl hover:scale-105 transition-transform"
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="mt-3 flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
                                {['Milan Trends?', 'Best Lipstick?', 'Paris Fashion'].map(tip => (
                                    <button
                                        key={tip}
                                        onClick={() => setInput(tip)}
                                        className="whitespace-nowrap px-3 py-1.5 bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-full text-[9px] font-black uppercase tracking-widest dark:text-white/60 hover:border-blue-500 transition-colors"
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
