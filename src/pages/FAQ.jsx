import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
    { q: "How does the Neural Search work?", a: "Our Neural Engine uses advanced computer vision to analyze fashion patterns and correlate them with real-time social media momentum." },
    { q: "What is an Alpha Sentiment?", a: "It is our proprietary metric measuring the forward momentum of a trend before it reaches mass adoption." },
    { q: "How often are trends updated?", a: "The system ingests and processes data continuously, updating the Trendly platform every few minutes." },
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState(null);

    return (
        <div className="min-h-screen pt-40 px-6 max-w-[800px] mx-auto text-black dark:text-white">
            <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter mb-16 text-center">Frequently Asked <span className="opacity-40">Questions</span></h1>
            <div className="space-y-4">
                {faqs.map((faq, i) => (
                    <div key={i} className="border border-black/10 dark:border-white/10 rounded-2xl overflow-hidden glass-card">
                        <button onClick={() => setOpenIndex(openIndex === i ? null : i)} className="w-full p-6 flex items-center justify-between text-left">
                            <h3 className="text-xl font-bold">{faq.q}</h3>
                            {openIndex === i ? <Minus className="w-5 h-5 text-[#2979FF]" /> : <Plus className="w-5 h-5" />}
                        </button>
                        <AnimatePresence>
                            {openIndex === i && (
                                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-6 pb-6 pt-2">
                                    <p className="opacity-60 leading-relaxed font-medium">{faq.a}</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </div>
    );
}
