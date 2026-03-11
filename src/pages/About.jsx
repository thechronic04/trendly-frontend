import React from 'react';
import { motion } from 'framer-motion';

export default function About() {
    return (
        <div className="min-h-screen pt-40 px-6 max-w-[1400px] mx-auto text-black dark:text-white">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto text-center mb-20">
                <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter mb-8">About <span className="text-[#2979FF]">Trendly.Ai</span></h1>
                <p className="text-xl opacity-60 leading-relaxed font-medium">
                    We are pioneers in the intersection of fashion, aesthetics, and artificial intelligence. 
                    Our neural engines scour the globe to identify cultural micro-trends before they hit the mainstream.
                </p>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-12 mt-20">
                <div className="glass-card p-12 rounded-[2rem] border border-black/5 dark:border-white/10">
                    <h2 className="text-3xl font-black italic tracking-tighter mb-4">Our Mission</h2>
                    <p className="opacity-60 leading-relaxed">To democratize trend forecasting by providing real-time, AI-driven insights to creators, brands, and consumers worldwide.</p>
                </div>
                <div className="glass-card p-12 rounded-[2rem] border border-black/5 dark:border-white/10">
                    <h2 className="text-3xl font-black italic tracking-tighter mb-4">Our Vision</h2>
                    <p className="opacity-60 leading-relaxed">A future where cultural movements are mapped in real-time, empowering sustainable and data-driven creation.</p>
                </div>
            </div>
        </div>
    );
}
