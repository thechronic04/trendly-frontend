import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const articles = [
    { title: "The Rise of Archive Fashion", date: "Oct 24, 2026", category: "Trends" },
    { title: "How AI is Reshaping Retail", date: "Oct 20, 2026", category: "Tech" },
    { title: "Sustainable Micro-Trends", date: "Oct 15, 2026", category: "Culture" },
];

export default function Blog() {
    return (
        <div className="min-h-screen pt-40 px-6 max-w-[1400px] mx-auto text-black dark:text-white">
            <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-5xl md:text-7xl font-black italic tracking-tighter mb-16">The <span className="text-pink-500">Editorial</span></motion.h1>
            <div className="grid md:grid-cols-3 gap-8">
                {articles.map((article, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="group cursor-pointer">
                        <div className="aspect-[4/3] bg-black/5 dark:bg-white/5 rounded-3xl mb-6 overflow-hidden relative">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />
                            <img src={`https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80&sig=${i}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="" crossOrigin="anonymous"/>
                        </div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-[#2979FF] mb-2">{article.category} • {article.date}</p>
                        <h3 className="text-2xl font-black italic tracking-tighter group-hover:underline">{article.title}</h3>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
