import React from 'react';
import { motion } from 'framer-motion';

export default function Contact() {
    return (
        <div className="min-h-screen pt-40 px-6 max-w-[1200px] mx-auto text-black dark:text-white">
            <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-7xl font-black italic tracking-tighter mb-4">Contact <span className="opacity-40">Us</span></motion.h1>
            <p className="opacity-60 mb-16 text-xl">Reach out to the Neural Team.</p>

            <div className="grid md:grid-cols-2 gap-16">
                <div>
                    <form className="space-y-6">
                        <div>
                            <label className="block text-[10px] font-black uppercase tracking-widest mb-2 opacity-60">Name</label>
                            <input type="text" className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 outline-none focus:border-[#2979FF] transition-colors" placeholder="Jane Doe" required />
                        </div>
                        <div>
                            <label className="block text-[10px] font-black uppercase tracking-widest mb-2 opacity-60">Email</label>
                            <input type="email" className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 outline-none focus:border-[#2979FF] transition-colors" placeholder="jane@example.com" required />
                        </div>
                        <div>
                            <label className="block text-[10px] font-black uppercase tracking-widest mb-2 opacity-60">Message</label>
                            <textarea rows="5" className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 outline-none focus:border-[#2979FF] transition-colors" placeholder="How can we help?" required></textarea>
                        </div>
                        <button type="submit" className="bg-black dark:bg-white text-white dark:text-black px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-[#2979FF] dark:hover:bg-[#2979FF] dark:hover:text-white transition-all shadow-xl">Send Message</button>
                    </form>
                </div>
                <div className="space-y-8 p-10 glass-card rounded-[2rem] border border-black/5 dark:border-white/10">
                    <div>
                        <h3 className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-2">Headquarters</h3>
                        <p className="text-2xl font-black italic">120 Neural Avenue<br/>San Francisco, CA 94105</p>
                    </div>
                    <div>
                        <h3 className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-2">General Inquiries</h3>
                        <p className="text-2xl font-black italic hover:text-[#2979FF] transition-colors cursor-pointer">hello@trendly.ai</p>
                    </div>
                    <div>
                        <h3 className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-2">Press</h3>
                        <p className="text-2xl font-black italic hover:text-[#2979FF] transition-colors cursor-pointer">press@trendly.ai</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
