import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const Hero = ({ isSignedIn, userName }) => {
    return (
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} className="relative rounded-[3.5rem] overflow-hidden mb-24 border border-white/10 glass-dark p-12 md:p-24 flex flex-col items-center text-center shadow-4xl group">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#2979FF]/10 via-transparent to-[#E04296]/10 opacity-50" />
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#2979FF]/10 rounded-full blur-[120px] pointer-events-none group-hover:scale-110 transition-transform duration-1000"></div>

            <div className="inline-flex items-center space-x-3 bg-black/40 backdrop-blur-md border border-white/10 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.4em] mb-10 relative z-10">
                <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                <span className="text-white/80">Neural Discovery <span className="text-blue-400">Active</span></span>
            </div>

            <h1 className="heading-jumbo mb-8 leading-tight">
                {isSignedIn ? <>Welcome back,<br /><span className="text-gradient-accent">{userName}</span></> : <>Discover Tomorrow's<br /><span className="text-gradient-accent">Fashion Today</span></>}
            </h1>
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
                <button
                    onClick={() => document.getElementById('product-discovery-grid')?.scrollIntoView({ behavior: 'smooth' })}
                    className="bg-gradient-to-r from-pink-500 to-purple-600 px-8 py-4 rounded-full text-white font-black text-xs uppercase tracking-widest shadow-xl flex items-center group/btn cursor-pointer"
                >
                    <Sparkles className="w-4 h-4 mr-2 group/btn:animate-spin" /> {isSignedIn ? "Generate Daily Edit" : "Explore Collections"}
                </button>
            </div>
        </motion.div>
    );
};

export default Hero;
